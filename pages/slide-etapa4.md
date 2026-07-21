---
layout: section
routeAlias: etapa4
---

## **Etapa 4:** Otimização de Agentes

---
layoutClass: gap-8
sourceLabel: OpenAI Agents SDK
source: https://openai.github.io/openai-agents-python
---

# Principais primitivos do OpenAI Agents SDK

#### **O Agents SDK fornece seis principais abstrações para sistemas agenticos**

<br/>

<Transform :scale="0.8">

<v-clicks every="2">

| Conceito | O que é |
|---|---|
| **Agent** | Um LLM com nome, instruções, ferramentas e possíveis _handoffs_ — o agente em si. |
| **Runner** | Motor de execução: roda o loop de raciocínio, faz _retries_ e impõe limites de segurança. |
| **Tools** | Funções Python (ou APIs/agentes) que o modelo descobre e invoca quando necessário. |
| **Handoffs** | Delegação de controle e do contexto de um agente para outro (fluxos multiagente). |
| **Guardrails** | Checagens de política em cada passo, mantendo saídas e chamadas dentro das regras. |
| **Tracing** | Logs estruturados de prompts, respostas e chamadas — para _debug_ e observabilidade. |

</v-clicks>

</Transform>


---
layout: quote-image
image: /paper-tran-multiagent-system.png
sourceLabel: Multi-Agent Collaboration Mechanisms - A Survey of LLMs
source: https://arxiv.org/html/2501.06322v1
---

::title::

# Sistemas multiagentes

::default::

"São sistemas onde **grupos de agentes** inteligentes baseados em LLM coordenam-se para resolver tarefas complexas coletivamente, em escala."

— Tran et al. "Multi-Agent Collaboration Mechanisms: A Survey of LLMs", 2025

<!--
# Tran et al. organizam a colaboração em tipos, estruturas e estratégias.

# Tipos de colaboração
> Cooperação: 
os agentes alinham seus objetivos e trabalham juntos em direção a um objetivo comum.
> Competição
os agentes priorizam seus próprios objetivos, que podem entrar em conflito com outros.
> Cooperação/competição
enquanto agentes colaboram em tarefas compartilhadas, alguns competem com outros agentes.

# Estratégia

> Baseada em regras

> Baseadas em papel

> baseada em modelo
Tomada de decisão baseada em probabilidade, tendências e estatística.


# nota importante: Tenha agentes especializados que se destaquem em uma única tarefa, em vez de ter um agente de uso geral que se espera que seja bom em tudo.
-->

---
layout: default
sourceLabel: Multi-agent patterns
source: https://developers.googleblog.com/developers-guide-to-multi-agent-patterns-in-adk/
---

# Padrões de arquitetura em sistemas multiagentes

#### **Alguns padrões de arquitetura para sistemas multiagentes têm sido propostos**

<div class="h-2" />

<div class="[&_table]:w-full text-xs">

| *Padrão* | *Descrição* | *Tipo* |
|---|---|---|
| **Sequential Pipeline** | Agentes em sequência fixa; cada um processa a saída do anterior | Determinístico |
| **Coordinator/Dispatcher** | Um agente central analisa a entrada e decide qual agente especializado aciona | Não determinístico |
| **Parallel Fan-Out** | Vários agentes atuam em paralelo com perspectivas complementares; um agente final consolida | Determinístico |
| **Hierarchical Decomposition** | Um agente de alto nível divide a tarefa em subtarefas para agentes subordinados | Não determinístico |
| **Generator and Critic** | Um agente gera a solução e outro critica; se a validação falha, o feedback volta ao gerador | Não determinístico |
| **Iterative Refinement** | Um agente gerador, outro sugere melhorias e um terceiro refina ao longo de várias iterações | Não determinístico |
| **Human-in-the-Loop** | O agente produz uma solução que depende de aprovação humana | Determinístico |
| **Composite Patterns** | Um fluxo que combina vários padrões: coordenação, paralelismo, validação e aprovação humana | Misto |

</div>

<!--
# O link do google para arquiteturas multiagentes é uma das maiores referências atuais para o assunto

> https://developers.googleblog.com/developers-guide-to-multi-agent-patterns-in-adk/
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: Orquestração de agentes
source: https://openai.github.io/openai-agents-python/multi_agent/
---

# Orquestrações de agentes

#### **Há duas maneiras de orquestrar a colaboração entre agentes**

<div class="h-1" />

::left::

<div class="text-left w-full self-start [&_ul]:my-10 [&_li]:mb-5">

- **Orquestração via código:** fluxo mais determinístico e previsível em termos de desempenho e custo.
- **Orquestração via LLM:** agente equipado com instruções que planeja e delega tarefas para outros agentes executarem.

</div>

::right::

<div class="h-full flex items-center justify-center">
    <AssetImg src="multiagent-patterns-architecture.png" class="w-full max-w-[440px] rounded-lg" />
</div>

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Orquestração de agentes
source: https://openai.github.io/openai-agents-python/multi_agent/
---

# Orquestração via código (coordinator)

#### **Um agente classifica e o código roteia para outro agente**

<div class="h-2" />

::left::

```python [main.py] {17|37-43}{maxHeight:'320px',at:'+1'}
import asyncio
from dataclasses import dataclass
from dotenv import load_dotenv
from agents import (Agent, Runner,
                    set_default_openai_api, set_tracing_disabled)

@dataclass
class Classification:
    category: str  # "pre_venda" ou "pos_venda"

classifier = Agent(
    name="Classificador",
    instructions=(
        "Classifique a mensagem do cliente em 'pre_venda' "
        "(antes da compra) ou 'pos_venda' (após a compra)."
    ),
    output_type=Classification,
)

pre_sale = Agent(
    name="Pré-venda",
    instructions="Tire dúvidas de clientes antes da compra.",
)

post_sale = Agent(
    name="Pós-venda",
    instructions="Atenda clientes após a compra (entrega, troca).",
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    question = input("Cliente: ")

    # 1) o agente classifica (saída estruturada)
    result = await Runner.run(classifier, question)

    # 2) o código roteia para o agente certo
    target = (post_sale if result.final_output.category == "pos_venda"
              else pre_sale)
    response = await Runner.run(target, question)

    print(f"[{result.final_output.category}] {response.final_output}")

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

<v-click at="+1">

> [!NOTE]
> A saída estruturada do classificador (`category`) é o que permite o **código rotear** para o agente de pré-venda ou pós-venda.

</v-click>

<!--
# inputs de teste (input do console)

# pré-venda:
Vocês parcelam a compra no cartão?

# pós-venda:
Meu pedido ainda não chegou, como faço?
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Orquestração de agentes
source: https://openai.github.io/openai-agents-python/multi_agent/
---

# Orquestração via código (sequential)

#### **Um agente executa a tarefa e encaminha a saída para outro agente**

<div class="h-2" />

::left::

```python [main.py] {26|29}{maxHeight:'320px',at:'+1'}
import asyncio
from dotenv import load_dotenv
from agents import (Agent, Runner,
                    set_default_openai_api, set_tracing_disabled)

consultant = Agent(
    name="Consultor",
    instructions=("Entenda a necessidade do cliente "
                  "e recomende um produto."),
)

writer = Agent(
    name="Redator de proposta",
    instructions=("Transforme a recomendação em uma "
                  "mensagem de venda persuasiva."),
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    question = input("Cliente: ")

    # 1) o primeiro agente trata a solicitação
    recommendation = await Runner.run(consultant, question)

    # 2) a saída do primeiro vira a entrada do segundo (sequencial)
    proposal = await Runner.run(writer, recommendation.final_output)

    print(proposal.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

<v-click at="+1">

> [!NOTE]
> Dois agentes especializados atuam em **sequência**: a saída do primeiro (`recommendation`) vira a entrada do segundo.

</v-click>

<!--
# inputs de teste (input do console)

# exemplo 1:
Quero um presente para alguém que gosta de corrida.

# exemplo 2:
Preciso de um notebook para trabalho e jogos leves.
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Orquestração de agentes
source: https://openai.github.io/openai-agents-python/multi_agent/
---

# Orquestração via código (generator/critic)

#### **Um agente executa a tarefa e outro avalia**

<div class="h-2" />

::left::

```python [main.py] {22|33-40}{maxHeight:'320px',at:'+1'}
import asyncio
from dataclasses import dataclass
from dotenv import load_dotenv
from agents import (Agent, Runner,
                    set_default_openai_api, set_tracing_disabled)

@dataclass
class Review:
    score: int      # nota de 0 a 10
    feedback: str   # sugestões de melhoria

generator = Agent(
    name="Vendedor",
    instructions=("Escreva uma mensagem de venda "
                  "para o pedido do cliente."),
)

critic = Agent(
    name="Crítico",
    instructions=("Avalie a mensagem de venda de 0 a 10 "
                  "e sugira melhorias."),
    output_type=Review,
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    request = input("Cliente: ")
    message = (await Runner.run(generator, request)).final_output

    while True:
        # o crítico avalia com nota (saída estruturada)
        review = (await Runner.run(critic, message)).final_output
        if review.score >= 8:  # nota razoável -> encerra
            break
        # o gerador reescreve com o feedback do crítico
        revision = f"{request}\n\nMelhore com: {review.feedback}"
        message = (await Runner.run(generator, revision)).final_output

    print(message)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

<v-click at="+1">

> [!NOTE]
> Dois agentes atuam num **loop `while`**: o gerador escreve e o crítico avalia com uma **nota** (saída estruturada). O loop repete até a nota ser razoável (`score >= 8`).

</v-click>

<!--
# inputs de teste (input do console)

# exemplo 1:
Quero uma mensagem de venda para um tênis de corrida.

# exemplo 2:
Crie um anúncio para um notebook gamer.
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Orquestração de agentes
source: https://openai.github.io/openai-agents-python/multi_agent/
---

# Orquestração via código (fan-out)

#### **Dois agentes executam em paralelo e outro consolida**

<div class="h-2" />

::left::

```python [main.py] {31-35|37-40}{maxHeight:'320px',at:'+1'}
import asyncio
from dotenv import load_dotenv
from agents import (Agent, Runner,
                    set_default_openai_api, set_tracing_disabled)

benefits_agent = Agent(
    name="Benefícios",
    instructions=("Liste os principais benefícios "
                  "do produto para o cliente."),
)

objections_agent = Agent(
    name="Objeções",
    instructions=("Antecipe objeções do cliente "
                  "e sugira respostas."),
)

consolidator = Agent(
    name="Consolidador",
    instructions=("Monte uma mensagem de venda final "
                  "usando os benefícios e as objeções."),
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    request = input("Cliente: ")

    # os dois agentes rodam em paralelo
    benefits, objections = await asyncio.gather(
        Runner.run(benefits_agent, request),
        Runner.run(objections_agent, request),
    )

    # o terceiro agente consolida as duas saídas
    briefing = (f"Benefícios: {benefits.final_output}\n\n"
                f"Objeções: {objections.final_output}")
    message = await Runner.run(consolidator, briefing)

    print(message.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

<v-click at="+1">

> [!NOTE]
> Os dois agentes rodam de forma **assíncrona/paralela** com `asyncio.gather`, e um terceiro **consolida** as duas saídas numa mensagem final.

</v-click>

<!--
# inputs de teste (input do console)

# exemplo 1:
Quero vender um plano de academia para iniciantes.

# exemplo 2:
Preciso convencer um cliente a comprar um seguro de carro.
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: Handoffs
source: https://openai.github.io/openai-agents-python/handoffs/
---

# Orquestração de agentes com handoff

#### **Handoff é uma das principais primitivas do SDK Agents**

<div class="h-1" />

::left::

<div class="text-left w-full self-start [&_ul]:my-10 [&_li]:mb-5">

- **handoff** pode ser usado de duas formas para orquestrar agentes: como **parâmetro** e como uma **função**.
- Um agente com handoff se transforma em um **tool** que pode ser invocada por outro agente.

</div>

::right::

<div class="h-full flex items-center justify-center">
    <AssetImg src="multiagent-patterns-architecture.png" class="w-full max-w-[440px] rounded-lg" />
</div>

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Handoffs
source: https://openai.github.io/openai-agents-python/handoffs/
---

# Handoff como parâmetro

#### **O parâmetro `handoff` é a maneira mais simples de orquestrar agentes**

<div class="h-2" />

::left::

```python [main.py] {22|5,10,18}{maxHeight:'320px',at:'+1'}
import asyncio
from dotenv import load_dotenv
from agents import (Agent, Runner,
                    set_default_openai_api, set_tracing_disabled)
from agents.extensions.handoff_prompt import RECOMMENDED_PROMPT_PREFIX

refund_agent = Agent(
    name="Reembolso",
    instructions=(
        f"{RECOMMENDED_PROMPT_PREFIX}\n"
        "Você resolve pedidos de reembolso de forma objetiva."
    ),
)

triage_agent = Agent(
    name="Triagem",
    instructions=(
        f"{RECOMMENDED_PROMPT_PREFIX}\n"
        "Atenda o cliente. Se ele pedir reembolso, "
        "transfira para o agente de Reembolso."
    ),
    handoffs=[refund_agent],  # handoff como parâmetro
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    question = input("Cliente: ")
    result = await Runner.run(triage_agent, question)
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

<v-click at="1">

> [!NOTE]
> O `RECOMMENDED_PROMPT_PREFIX` ensina o modelo a usar o mecanismo de handoff. Sem ele, o agente pode não entender que deve **transferir** a conversa, reduzindo a precisão das delegações.

</v-click>

<!--
`esse código não é funcional porque tem prompts simplificados`
# inputs de teste (input do console)

# aciona o handoff:
Comprei o ingresso #A123 mas o show foi cancelado, quero reembolso.

# não aciona (fica na triagem):
Quais são as formas de pagamento aceitas?
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Handoffs
source: https://openai.github.io/openai-agents-python/handoffs/
---

# Handoff como função

#### **A função `handoff()` é a maneira mais poderosa de orquestrar agentes**

<div class="h-2" />

::left::

```python [main.py] {32-36,8-11}{maxHeight:'320px',at:'+1'}
import asyncio
from dataclasses import dataclass
from dotenv import load_dotenv
from agents import (Agent, Runner, handoff, RunContextWrapper,
                    set_default_openai_api, set_tracing_disabled)
from agents.extensions.handoff_prompt import RECOMMENDED_PROMPT_PREFIX

@dataclass
class EscalationData:
    order_id: str   # pedido relacionado
    reason: str     # motivo da escalada

async def on_escalation(ctx: RunContextWrapper, data: EscalationData):
    print(f"[LOG] Reembolso do pedido {data.order_id}: {data.reason}")

refund_agent = Agent(
    name="Reembolso",
    instructions=(
        f"{RECOMMENDED_PROMPT_PREFIX}\n"
        "Você resolve pedidos de reembolso de forma objetiva."
    ),
)

triage_agent = Agent(
    name="Triagem",
    instructions=(
        f"{RECOMMENDED_PROMPT_PREFIX}\n"
        "Atenda o cliente. Se ele pedir reembolso, "
        "transfira para o agente de Reembolso."
    ),
    handoffs=[
        handoff(
            agent=refund_agent,
            on_handoff=on_escalation,
            input_type=EscalationData,
        )
    ],
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    question = input("Cliente: ")
    result = await Runner.run(triage_agent, question)
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!IMPORTANT]
> O parâmetro `input_type` permite indicar uma classe para ser preenchida antes de delegar para outro agente. Uma função de callback `on_handoff` é obrigatória e acionada antes da delegação.



<!--
# inputs de teste (input do console)

# aciona o handoff (o modelo preenche order_id e reason):
Comprei o ingresso #A123 mas o show foi cancelado, quero reembolso.

# não aciona (fica na triagem):
Quais são as formas de pagamento aceitas?

# input_type exige on_handoff (mantido mínimo: só um log).
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Um modelo para cada agente

#### **A escolha do modelo para cada agente é uma decisão de projeto importante**

<div class="h-1" />

::left::

<div class="text-left w-full self-start [&_ul]:my-8 [&_li]:mb-3">

- **Custo** — modelos com menor custo sem prejudicar a qualidade (medido em milhão de tokens por dólar)
- **Desempenho** — modelos mais inteligentes e especialistas por tipo de tarefa (medido por pontuação em benchmarks).
- **Latência** — modelos rápidos quando agilidade é necessária (medido por tempo de resposta).

</div>

::right::

<div class="h-full flex items-center justify-center">
    <AssetImg src="modelos-4-logotipos.jpg" class="w-full max-w-[180px] rounded-lg" />
</div>

<!--
`mostrar um exemplo de notícia:`

https://oglobo.globo.com/economia/tecnologia/noticia/2026/07/19/tokenmaxxing-flopou-agentes-de-ia-prometeram-eficiencia-mas-estao-entregando-boletos-altissimos.ghtml

# Custo, desempenho (benchmark) e latencia são as métricas mais consideradas, não as únicas.

> Tipo do modelo (imagem, multimodal, código, vídeo)

> Tamanho da Janela de contexto

> Modelo aberto ou fechado

> outros
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Onde comparar modelos

#### **Escolhas de modelos é uma decisão de engenharia (nem sempre equilibrio é possível)**

<div class="h-1" />

::left::

<div class="text-left w-full self-start [&_ul]:my-10 [&_li]:mb-5">

- [**openrouter.ai/models**](https://openrouter.ai/models) — agrega centenas de modelos de vários provedores, com **preço** e contexto lado a lado.
- [**artificialanalysis.ai**](https://artificialanalysis.ai) — site independente que publica o **Intelligence Index** (composto de vários benchmarks), além de outros recortes.

</div>

::right::

<div class="h-full flex items-center justify-center">
    <AssetImg src="benchmark-artificialanalysis.png" class="w-full max-w-[380px] rounded-lg" />
</div>

<!--

**openrouter.ai** agregador de LLM com página de ranking e comparações

**Artificial Analysis (artificialanalysis.ai):** tambem traz recortes de código, matemática, por tipo de industria (saúde, engenharia, computação, jurídico) além de métricas operacionais como velocidade (tokens/s), latência (time-to-first-token) e preço.

 # Benchmarks clássicos saturaram (MMLU, HumanEval, etc) os modelos de ponta já acertam mais de 90%, por isso o Artificial Analysis usa versões mais difíceis ou sucessores (MMLU-Pro, LiveCodeBench, AIME).

# LMArena (antigo Chatbot Arena)
https://lmarena.ai
Um leaderboard (ranking ao vivo), onde humanos votam às cegas em qual de duas respostas é melhor, e isso vira um ranking ao vivo.

-->

---
layout: default
sourceLabel: Seleção de modelo
source: https://developers.openai.com/api/docs/guides/model-selection
---

# Recomendações por tipo de tarefa

#### **Alguns tipos de tarefas podem ser resolvidos por três grupos de modelos**

<div class="h-8" />

<div class="text-sm leading-tight [&_td]:py-2.5 [&_th]:py-2.5 [&_td]:px-2 [&_th]:px-2">

| Tipo de tarefa | Descrição | Modelo |
|---|---|---|
| **Classificar** | Rotular a mensagem do cliente (ex.: pré-venda ou pós-venda) | Modelo rápido/econômico |
| **Resumir** | Condensar uma conversa longa em poucos pontos-chave | Modelo rápido/econômico |
| **Consolidar** | Unir benefícios e objeções numa mensagem de venda final | Modelo intermediário |
| **Responder** | Tirar dúvidas do cliente sobre um produto ou pedido | Modelo intermediário |
| **Criticar** | Avaliar uma resposta, dar nota e sugerir melhorias | Modelo avançado |
| **Planejar** | Decompor a tarefa e delegar aos agentes certos | Modelo avançado |

</div>

<!--
# A recomendação é um ponto de partida, não uma regra fixa — depende do domínio e da dificuldade real de cada tarefa.

# Tarefas de rotular/condensar (classificar, resumir) toleram modelos econômicos: pouca ou nenhuma cadeia de raciocínio.

# Tarefas de julgamento e coordenação (criticar, planejar) pedem modelos avançados: exigem raciocínio, comparação e decisão.

# Responder e consolidar ficam no meio: precisam de boa escrita e coerência, mas sem raciocínio profundo.

# nem todo provedor fornece uma família de modelos em três níveis, e nesse caso pode fazer sentido considerar combinar modelos de outras famílias.
-->

---
layout: two-cols-header
layoutClass: gap-8
---

# Dois agentes, dois modelos

#### **Exemplo de sistema multiagente usando modelos diferentes**

<div class="h-2" />

::left::

```python [main.py] {8,15,18|all}{maxHeight:'320px',at:+1}
import asyncio
from dotenv import load_dotenv
from agents import (Agent, Runner, handoff,
                    set_default_openai_api, set_tracing_disabled)

specialist = Agent(
    name="Especialista",
    model="deepseek-v4-pro",
    instructions=("Resolva reclamações complexas de reembolso, "
                  "avaliando o caso e propondo uma solução."),
)

triage = Agent(
    name="Triagem",
    model="deepseek-v4-flash",
    instructions=("Responda dúvidas simples do cliente. "
                  "Se for um caso de reembolso, use o handoff."),
    handoffs=[handoff(specialist)],
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    question = input("Cliente: ")
    result = await Runner.run(triage, question)
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!NOTE]
> A **triagem** roda no modelo econômico (`deepseek-v4-fast`), e ao encontrar um reembolso, o **handoff** transfere o controle para o **especialista**, no modelo avançado (`deepseek-v4-pro`).


<!--
# inputs de teste (input do console)
`o código não é tão funcional porque não tem base de conhecimento, apenas para fins de exemplificação`

# dúvida simples (fica na triagem, modelo econômico):
Qual o horário de atendimento de vocês?

# caso de reembolso (handoff para o especialista, modelo avançado):
Comprei o produto errado e quero meu dinheiro de volta, o que faço?
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Orquestração de agentes
source: https://openai.github.io/openai-agents-python/multi_agent/
---

# Dois agentes, dois modelos, *dois* provedores

#### **Classe `AsyncOpenAI` e `OpenAIChatCompletionsModel` para diferentes provedores**

<div class="h-2" />

::left::

```python [main.py] {10-17,21-22,29-30|all}{maxHeight:'320px',at:+1}
import asyncio
import os
from dotenv import load_dotenv
from openai import AsyncOpenAI
from agents import (Agent, Runner, handoff,
                    OpenAIChatCompletionsModel, set_tracing_disabled)

load_dotenv()

openrouter = AsyncOpenAI(
    base_url=os.environ["OPENROUTER_BASE_URL"],
    api_key=os.environ["OPENROUTER_API_KEY"],
)
anthropic = AsyncOpenAI(
    base_url=os.environ["ANTHROPIC_BASE_URL"],
    api_key=os.environ["ANTHROPIC_API_KEY"],
)

specialist = Agent(
    name="Especialista",
    model=OpenAIChatCompletionsModel(
        model="claude-fable-5", openai_client=anthropic),
    instructions=("Resolva reclamações complexas de reembolso, "
                  "avaliando o caso e propondo uma solução."),
)

triage = Agent(
    name="Triagem",
    model=OpenAIChatCompletionsModel(
        model="deepseek-v4-flash", openai_client=openrouter),
    instructions=("Responda dúvidas simples do cliente. "
                  "Se for um caso de reembolso, use o handoff."),
    handoffs=[handoff(specialist)],
)

async def main():
    set_tracing_disabled(True)
    question = input("Cliente: ")
    result = await Runner.run(triage, question)
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!NOTE]
> As variáveis `OPENAI_API_KEY` e `OPENAI_DEFAULT_MODEL` só servem quando **todos os modelos são do mesmo provedor**. Com provedores diferentes, cada agente recebe seu próprio `base_url` e `api_key` via `OpenAIChatCompletionsModel`.

<!--
# .env (como se existisse):
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_API_KEY=sk-or-...
ANTHROPIC_BASE_URL=https://api.anthropic.com/v1
ANTHROPIC_API_KEY=sk-ant-...

# cada AsyncOpenAI aponta para um provedor (base_url + api_key próprios);
# o OpenAIChatCompletionsModel liga o agente àquele cliente/modelo.

# a triagem (econômico) roda no deepseek-v4-flash via OpenRouter;
# o especialista (avançado) roda no Fable via Anthropic.
-->
