---
layout: section
routeAlias: etapa2
---
## **Etapa 2:** OpenAI Agents SDK 
**Entendendo o básico**

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-start justify-center
sourceLabel: Tracing
source: https://openai.github.io/openai-agents-python/tracing/
---

# Rastreamento

#### **O Agents SDK rastreia de forma automática vários eventos na execução de agentes**

<br/>

::left::

<div class="text-left w-full">

> [!IMPORTANT]
> Para modelos **não OpenAI**, desative o rastreamento.

<div class="h-2" />

<v-click>

Há três maneiras para desativar:

- `set_tracing_disabled(True)` &nbsp;⭐
- `OPENAI_AGENTS_DISABLE_TRACING=1`
- `RunConfig.tracing_disabled = true`


</v-click>

</div>

::right::

<div class="flex flex-col items-center gap-3">

<Transform :scale="1" origin="top">
    <AssetImg
    src="openai-plataform-developer-traces.png"
    class="rounded-lg border-10 border-white"
    />
</Transform>


</div>

---
layout: default
sourceLabel: Install UV
source: https://docs.astral.sh/uv/getting-started/installation
---

# Diferença entre tipos de APIs da OpenAI

#### **A OpenAI evoluiu suas APIs ao longo do tempo**

<br/>

<Transform :scale="0.8">

| | Completions | Assistants | **Chat Completions API** | **Responses API** |
| --- | --- | --- | --- | --- |
| ano | 2020 | 2023 | 2023 | 2025 |
| endpoint | /v1/completions | /v1/assistants | `/v1/chat/completions` | `/v1/responses` |
| entrada | string | Threads Runs | messages[] `array` | items[] `array` |
| estado | stateless | stateful | *stateless* | *stateful* opcional |
| ferramentas | nenhuma | file/code | *nenhuma* | web, file, code, etc |
| status | legada | descontinuada | **suportada** | **recomendada** |

</Transform>


---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Install UV
source: https://docs.astral.sh/uv/getting-started/installation
---

# Chat Completions API vs Responses API

<!-- #### **O que acontece por debaixo do capô quando você roda Runner.Run(agent, ...)** -->


::left::

```python [Chat Completions API]
from openai import OpenAI

client = OpenAI()
resp = client.chat.completions.create(
    model="gpt-5",
    messages=[
        {"role": "system",
         "content": "Você é um professor."},
        {"role": "user",
         "content": "Qual a capital da França?"},
    ],
)
print(resp.choices[0].message.content)
```


::right::

```python [Responses API]
from openai import OpenAI

client = OpenAI()

resp = client.responses.create(
    model="gpt-5",
    instructions="Você é um professor.",
    input="Qual a capital da França?",
)

print(resp.output_text)
```

::bottom::

<Transform :scale="0.7" origin="top left">

> [!IMPORTANT]
> Os dois exemplos usam diretamente lib da OpenAI. <br/>
> O SDK Agents usa a lib da OpenAI.

</Transform>

---
layout: default
---

# Quando usar Chat Completions e Responses API

#### **A importância das duas APIs**

<br/>

<v-clicks every="1">

- OpenAI Agents SDK usa por padrão a Responses API
- Praticamente nenhum provedor usa o padrão de Response API (ou suporta parcialmente)
- OpenAI definiu um formato (Chat Completions), e o mercado copiou (OpenAI-compatible).
- A API Chat Completions se tornou língua universal na industria (DeepSeek, Perplexity, OpenRouter, etc)
- Anthropic e Google oferecem outros formatos de API (com alguma compatibilidade com a Chat Completions API)
- **Para usar modelos não OpenAI, use obrigatoriamente a Chat Completions API**
- **Para usar modelos OpenAI, prefira a Responses API**

</v-clicks>

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Ativando Chat Completions
source: https://openai.github.io/openai-agents-python/models/#responses-api-support
---

::left::

```python {all|5,7,15|all}{at:+1} 
import asyncio, os
from dotenv import load_dotenv
from agents import Agent, Runner, set_default_openai_api

os.environ["OPENAI_BASE_URL"] = "https://api.deepseek.com"

set_default_openai_api("chat_completions")

async def main():
    load_dotenv()

    agent = Agent(
        name="Assistant",
        instructions="You are a history professor.",
        model="deepseek-v4-fast"
    )

    result = await Runner.run(agent, 
        "What's the capital of France?")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```


::right::

> [!TIP]
> O OpenAI Agents SDK permite **ativar/desativar** o uso da Chat Completions API para usar com outros modelos não OpenAI. 

<br/>

<v-clicks every="2" at="+1">

- O método `set_default_openai_api` precisa invocado
- As variáveis `OPENAI_API_KEY` e `OPENAI_BASE_URL` devem ser preenchidas com as informações do provedor não OpenAI.

</v-clicks>


---
layout: default
sourceLabel: API Google Pricing
source: https://ai.google.dev/gemini-api/docs/pricing
---

# Gateway/Provedores com API gratuita

#### **Plataformas do tipo agregador de provedores oferecem dezenas de modelos gratuitos**

<br/>

<Transform :scale="0.8">

| Provedor | Modelo (exemplo) | Plataforma | Cartão |
|---|---|---|---|
| Google | `gemini-3.5-flash` | [aistudio.google.com](https://aistudio.google.com) | não |
| Groq | `llama-3.3-70b-versatile` | [console.groq.com](https://console.groq.com) | não |
| OpenRouter | `deepseek/deepseek-r1:free` | [openrouter.ai](https://openrouter.ai/models?max_price=0) | não |
| NVIDIA | `meta/llama-3.3-70b-instruct` | [build.nvidia.com](https://build.nvidia.com) | não |
| Hugging Face | `meta-llama/Llama-3.3-70B-Instruct` | [huggingface.co](https://huggingface.co) | não |
| OpenAI | `gpt-5` *(sem tier grátis)* | [platform.openai.com](https://platform.openai.com) | **sim** |


</Transform>



---
layout: default
---

# Histórico de mensagens e tipos de papeis

#### **As roles *system*, *user* e *assistant* são importantes para desenvolver chats contextuais**

<br/>

<Transform :scale="0.8">

| role | quem&nbsp;escreve | conteúdo (exemplo) |
|---|---|---|
| `system` | você (dev) | Você é um especialista em engenharia de software. Seja objetivo. |
| `user` | usuário | O que é injeção de dependência? |
| `assistant` | modelo | É fornecer as dependências de uma classe por fora, em vez de ela mesma criá-las. |
| `user` | usuário | E que vantagem isso traz nos testes? **tem contexto** |
| `assistant` | modelo | Permite trocar a dependência real por um dublê e testar a classe isolada. |

</Transform>


---
layout: two-cols-header
layoutClass: gap-8
---

# Chat Contextual com Chat Completions API

::left::


```python [main.py]{15-19,22}{maxHeight:'320px'}
import asyncio
from dotenv import load_dotenv
from agents import Agent, Runner, set_default_openai_api, set_tracing_disabled

load_dotenv()
set_default_openai_api("chat_completions")
set_tracing_disabled(True)

agent = Agent(
    name="Professor",
    # role: system
    instructions="Você é um professor de história.",
)

history = [
    {"role": "user", "content": "Qual a capital da França?"},
    {"role": "assistant", "content": "É Paris."},
    {"role": "user", "content": "E a população dela?"},
]

async def main():
    result = await Runner.run(agent, history)
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```



::right::

> [!CAUTION]
> O histórico de mensagens é necessário para que o modelo entenda o contexto da última mensagem.

<!--
# Este é um exemplo fixo para fins didático.

# Faça o teste usando Open Router
OPENAI_API_KEY=
OPENAI_BASE_URL=https://openrouter.ai/api/v1
OPENAI_DEFAULT_MODEL=google/gemma-4-26b-a4b-it:free
-->

---
layout: two-cols-header
layoutClass: gap-8
---

# Chat multi-turno com Chat Completions API

::left::


```python [main.py]{16,23,25,29}{maxHeight:'320px'}
import asyncio
from dotenv import load_dotenv
from agents import Agent, Runner, set_default_openai_api, set_tracing_disabled

load_dotenv()
set_default_openai_api("chat_completions")
set_tracing_disabled(True)

agent = Agent(
    name="Professor",
    # role: system
    instructions="Você é um professor de história.",
)

async def main():
    history = []
    while True:
        pergunta = input("> ")
        if pergunta.strip().lower() == "sair":
            break

        # role: user
        history.append({"role": "user", "content": pergunta})

        result = await Runner.run(agent, history)
        print(result.final_output)

        # role: assistant
        history.append({"role": "assistant", "content": result.final_output})

if __name__ == "__main__":
    asyncio.run(main())
```



::right::

> [!IMPORTANT]
> O histórico de mensagens deve ser armazenado e reenviado a cada nova requisição para que o modelo entenda o contexto.

<!--
> Qual a capital da França?

> E a população dela?

> E quem a fundou?

> Em que ano ela passou a existir?
-->

---
layout: two-cols-header
layoutClass: gap-8
---

# Chat multi-turno com Responses API

::left::


```python [main.py]{15,25,30}{maxHeight:'320px'}
import asyncio
from dotenv import load_dotenv
from agents import Agent, Runner, set_tracing_disabled

load_dotenv()
set_tracing_disabled(True)

agent = Agent(
    name="Professor",
    # role: system
    instructions="Você é um professor de história.",
)

async def main():
    previous_id = None
    while True:
        pergunta = input("> ")
        if pergunta.strip().lower() == "sair":
            break

        # role: user -> só a pergunta nova, sem histórico
        result = await Runner.run(
            agent,
            pergunta,
            previous_response_id=previous_id,
        )
        print(result.final_output)

        # o servidor da OpenAI guarda a conversa; levamos só o id
        previous_id = result.last_response_id

if __name__ == "__main__":
    asyncio.run(main())
```



::right::

> [!TIP]
> O histórico não é reenviado: cada requisição leva apenas a nova mensagem e o identificador da resposta anterior. A OpenAI guarda a conversa.

<!--
O histórico de mensagens é armazenado nos servidores da OpenAI por 30 dias.
-->

---
layout: default
sourceLabel: ModelSettings
source: https://openai.github.io/openai-agents-python/models/#common-advanced-modelsettings-options
---

# Objeto ModelSettings

#### **O objeto Model Settings oferece vários parâmetros para usar com LLMs**

<br/>

<Transform :scale="0.7">

| Propriedade | Descrição | Valores&nbsp;possíveis&nbsp;&nbsp;&nbsp;&nbsp; | Default |
|---|---|---|---|
| `temperature` | Aleatoriedade na escolha do próximo token | `0.0` a `2.0` | `None` |
| `top_p` | Limita a escolha aos tokens mais prováveis | `0.0` a `1.0` | `None` |
| `max_tokens` | Limite de tokens gerados na resposta | `> 0` | `None` |
| `frequency_penalty` | Penaliza tokens já usados, reduzindo repetição | `-2.0` a `2.0`| `None` |

</Transform>

<Transform :scale="0.7" origin="top left">

> [!IMPORTANT]
> A família **GPT-5** (raciocínio) não suporta `temperature` nem `top_p`. <br/>
> No lugar deles, configure `reasoning.effort` e `verbosity`.

</Transform>

<!--
temperatura ->  ex.: `0.2` factual, `1.4` criativo
top_p -> — ex.: `0.9` = top 90% da massa 
max_tokens -> até o teto do modelo — ex.: `500`
frequency_penalty ->  ex.: `0.5` 


Default `None` não é zero: o SDK omite o parâmetro da chamada e vale o default do provedor.
Na OpenAI, omitir significa temperature=1.0, top_p=1.0 e frequency_penalty=0.0.
Os intervalos são da API da OpenAI — o SDK aceita qualquer float e só repassa.
Nem todo modelo/provedor suporta todos eles.

A substituição no GPT-5 NÃO é automática: o SDK não converte temperature em effort, ele repassa o valor cru
e a API rejeita com 400 "Unsupported parameter: 'temperature' is not supported with this model".
Os defaults de effort/verbosity só entram quando você NÃO passa model_settings — se passar o seu, ele substitui inteiro.
Exceção: os aliases gpt-5-chat-latest não são de raciocínio e aceitam temperature normalmente.
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-start justify-center
---

# Sobre o top_p

#### **O `top_p` soma as chances de cima para baixo — e risca o resto do cardápio**

<br/>

::left::

<div class="text-left w-full">

> [!IMPORTANT]
> O `top_p` **retira** sabores do cardápio. <br/>
> Quando uma palavra é retirada, o cardápio encolhe.

<div class="h-2" />

<v-clicks every="1">

- `top_p = 0.1` → o cardápio encolhe até sobrar a palavra **Chocolate**.
- `top_p = 1.0` → cardápio inteiro, inclusive a palavra **Flocos**.

</v-clicks>

</div>

::right::

<div class="flex flex-col items-center gap-3">

<Transform :scale="1" origin="top">

| Sabor | Chance | Soma |
|---|---|---|
| Chocolate | 60% | 60% |
| Morango | 20% | **80%** |
| ~~Baunilha~~ | ~~15%~~ | ~~95%~~ |
| ~~Pistache~~ | ~~4%~~ | ~~99%~~ |
| ~~Flocos~~ | ~~1%~~ | ~~100%~~ |

</Transform>

<div class="text-sm opacity-70">ex: <code>top_p = 0.8</code></div>

</div>

<!--
A tabela mostra o corte com top_p = 0.8: soma 60 + 20 = 80, bateu o limite, o resto é riscado.
Os bullets falam dos extremos 0.1 e 1.0 porque são os valores que rodam no exemplo de código.

Se perguntarem por que com top_p=0.1 o Chocolate sobrevive, já que 60% passa de 10%:
o primeiro da lista nunca é cortado — senão não sobraria nada para escolher.

É a MESMA lista do slide "Sobre a temperatura", de propósito: a turma vê os dois botões agindo sobre ela.
Lá o Flocos continua no cardápio e ganha chance; aqui ele é riscado e não sai nunca mais.
Essa é a diferença entre os dois parâmetros — se sobrar só uma ideia da aula, que seja essa.
-->

---
layout: two-cols-header
layoutClass: gap-8
---

# Ajuste de aleatoriedade com top_p

::left::

```python [main.py]{3,11,15}{maxHeight:'320px'}
import asyncio, os
from dotenv import load_dotenv
from agents import (Agent, Runner, ModelSettings,
                    set_default_openai_api, set_tracing_disabled)

load_dotenv() 
set_default_openai_api("chat_completions")
set_tracing_disabled(True)

async def main():
    for p in (0.1, 1.0):
        agent = Agent(
            name="Sorveteiro",
            instructions="Responda com uma única palavra.",
            model_settings=ModelSettings(top_p=p),
        )
        print(f"\n=== top_p={p} ===")
        for i in range(3):
            result = await Runner.run(agent, "Diga um sabor de sorvete.")
            print(f"{i+1}. {result.final_output}")

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!TIP]
> É como o **cardápio** da sorveteria: `top_p` baixo deixa só os sabores mais prováveis, enquanto `top_p` alto considera o cardápio inteiro, inclusive os menos comuns. <br/>
> *O sorteio continua, o que muda é o tamanho do cardápio.*

<!--
Mesmo experimento do slide anterior, trocando o botão: top_p=0.1 repete o sabor mais provável, top_p=1.0 varia.

Se perguntarem "então top_p é o número de opções?": não exatamente. O corte é por massa de probabilidade
acumulada, não por contagem — 0.1 pode deixar 1 sabor numa pergunta óbvia e vários numa pergunta ambígua.
O cardápio encolhe e cresce sozinho conforme o quanto o modelo está seguro. Só entre nesse detalhe se puxarem.

Repare que aqui NÃO passamos temperature — ela fica no default do provedor (1.0).
É de propósito: é o que respeita o CAUTION do slide anterior (mexer em um OU no outro).
Se alguém puser temperature=0 junto, o top_p vira decoração: com temperatura zero não há sorteio para restringir.

Por que 0.1 e não 0.0: o intervalo é 0 a 1, mas top_p=0 é um caso de borda que cada provedor trata
de um jeito (alguns dão erro, outros viram greedy). 0.1 já é extremo o bastante e funciona em todos.

Contraste com temperatura: temperature reescala as probabilidades (achata ou exagera a curva);
top_p descarta a cauda e re-normaliza o que sobrou. Efeito parecido na tela, mecanismos diferentes.
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-start justify-center
---

# Sobre a temperatura

#### **A temperatura ajusta a preferência por palavras mais ou menos prováveis**

<br/>

::left::

<div class="text-left w-full">

> [!IMPORTANT]
> A temperatura **não tira ninguém do cardápio**. <br/>
> Ela só mexe nas chances.

<div class="h-2" />

<v-clicks every="1">

- `temperature = 0` → respostas com palavras mais prováveis: **Chocolate**.
- `temperature = 2` → as chances se achatam: até **Flocos** (1%) vira uma saída provável.

</v-clicks>

</div>

::right::

<div class="flex flex-col items-center gap-3">

<Transform :scale="1" origin="top">

| Sabor | Chance |
|---|---|
| Chocolate | 60% |
| Morango | 20% |
| Baunilha | 15% |
| Pistache | 4% |
| Flocos | 1% |

</Transform>

</div>

<!--
# É importante mencionar que os modelos são treinados em corpos de textos, onde cada palavra pode aparecer mais ou menos durante o treinamento. 

Os números são ilustrativos, para dar o que apontar na tela — não são a saída real de nenhum modelo.

O ponto do IMPORTANT é o que separa temperature de top_p, e só faz sentido junto com o slide do top_p:
aqui ninguém sai da lista, então com temperatura alta o Flocos PODE sair.
Lá o Flocos é riscado da lista, então por mais que se rode, ele NUNCA sai.
Um reequilibra as chances, o outro elimina candidatos.
-->

---
layout: two-cols-header
layoutClass: gap-8
---

# Ajuste de aleatoriedade com temperatura

::left::

```python [main.py]{3,11,15}{maxHeight:'320px'}
import asyncio, os
from dotenv import load_dotenv
from agents import (Agent, Runner, ModelSettings,
                    set_default_openai_api, set_tracing_disabled)

load_dotenv() 
set_default_openai_api("chat_completions")
set_tracing_disabled(True)

async def main():
    for temp in (0.0, 2.0):
        agent = Agent(
            name="Sorveteiro",
            instructions="Responda com uma única palavra.",
            model_settings=ModelSettings(temperature=temp),
        )
        print(f"\n=== temperature={temp} ===")
        for i in range(3):
            result = await Runner.run(agent, "Diga um sabor de sorvete.")
            print(f"{i+1}. {result.final_output}")

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!CAUTION]
> Ajuste `temperature` **ou** `top_p`, nunca os dois juntos: ambos mexem no mesmo sorteio e o efeito combinado é difícil de prever.

<!--
O .env precisa das 3 variáveis (exemplo com Groq):
OPENAI_API_KEY=gsk_...
OPENAI_BASE_URL=https://api.groq.com/openai/v1
OPENAI_MODEL=llama-3.3-70b-versatile
A OPENAI_BASE_URL é lida sozinha pela lib da OpenAI; trocar de provedor é trocar o .env, sem tocar no código.

Por que slogan e não uma pergunta factual: com temperatura alta, "qual a capital da França?" continua respondendo Paris.
Aleatoriedade só aparece quando existe mais de uma resposta boa — tarefa criativa. Para extração/classificação, use temperatura baixa.

O loop roda a MESMA pergunta 3 vezes: é o jeito de mostrar a variação ao vivo, com uma execução só.
Rode de novo com temperature=0.0 e compare — as 3 saídas ficam praticamente idênticas.

A recomendação de não mexer nos dois é da própria doc da OpenAI ("altering this or top_p but not both").
Na Groq, temperature=0 vira 1e-8 internamente; o intervalo aceito é 0 a 2.
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-start justify-center
---

# Sobre o max_tokens

#### **Limita a quantidade de tokens da resposta (raciocínio e saída)**

<br/>

::left::

<div class="text-left w-full">

> [!IMPORTANT]
> O `max_tokens` limita **só o output** — e o raciocínio está dentro dele.

<div class="h-2" />

<v-clicks every="1">

- A conta soma **três** partes: input, reasoning e resposta.
- `max_tokens = 200` no exemplo ao lado → o reasoning sozinho estoura o limite e a **resposta vem vazia**: você paga e não recebe texto.

</v-clicks>

</div>

::right::

<div class="flex flex-col items-center gap-3">

<Transform :scale="0.8" origin="top">

| Parte | Tokens | |
|---|---|---|
| **input** — *"Quantos R tem em morango?"* | 18 | ✅ |
| **reasoning** — invisível | 200 | ✅ |
| **resposta** — *"Tem 1 letra R."* | 6 | ❌ |
| **output** = reasoning + resposta | **206** | ✂️ |
| **custo** = input + output | **218** | |

</Transform>

</div>

<!--
Números ilustrativos, como nos slides de temperatura e top_p.

O reasoning É output: no SDK, reasoning_tokens vive dentro de output_tokens_details.
Por isso o max_tokens o inclui — e por isso um limite baixo pode devolver resposta vazia.

O max_tokens NÃO toca no input. Num chat com histórico (slides 40 e 41), o que cresce é o input
sendo reenviado a cada turno — e contra isso o max_tokens não faz nada. É teto de segurança, não economia.

Não é pedido de brevidade: o modelo é cortado no meio da frase ao bater o limite.
Se quer resposta curta, peça nas instructions.

Se perguntarem como medir: result.context_wrapper.usage tem input_tokens, output_tokens e total_tokens.
-->

---
layout: two-cols-header
layoutClass: gap-8
---

# Limitando a saída com max_tokens

::left::

```python [main.py]{11,15}{maxHeight:'320px'}
import asyncio, os
from dotenv import load_dotenv
from agents import (Agent, Runner, ModelSettings,
                    set_default_openai_api, set_tracing_disabled)

load_dotenv() 
set_default_openai_api("chat_completions")
set_tracing_disabled(True)

async def main():
    for limite in (100, 500):
        agent = Agent(
            name="Assistente",
            instructions="Responda de forma direta.",
            model_settings=ModelSettings(max_tokens=limite),
        )
        result = await Runner.run(agent, "Quantos R tem em morango?")
        u = result.context_wrapper.usage

        print(f"\n=== max_tokens={limite} ===")
        print(f"input:     {u.input_tokens}")
        print(f"reasoning: {u.output_tokens_details.reasoning_tokens}")
        print(f"output:    {u.output_tokens}")
        print(f"resposta:  {result.final_output!r}")

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!TIP]
> Para respostas mais curtas, o campo indicado é o `instructions` — é lá que você pede brevidade ao modelo. <br/>
> O `max_tokens` serve como **teto de segurança**: garante que nenhuma resposta estoure o tamanho (e o custo) desejado.

<!--
# só funciona com um modelo de RACIOCÍNIO.

# alguns modelos não tem raciocínio

# é um tipo de parâmetro mais usado como guardrail, para restringir em uso indevido.
-->

---
layout: section
---

## Live Coding
🤖 **Agente:** um atendente de sorveteria que conversa, lembra do que você disse e mostra o custo de cada turno

<!--
Cobre toda a Etapa 2 sem tocar na Responses API: .env + provedor gratuito, chat_completions,
tracing desligado, instructions (role system), roles user/assistant, histórico, loop multi-turno,
ModelSettings (temperature/max_tokens) e usage.

=================================================================
PARTE 0 — o .env (mostrar antes de escrever qualquer código)

OPENAI_API_KEY=...
OPENAI_BASE_URL=https://openrouter.ai/api/v1
OPENAI_DEFAULT_MODEL=gpt-5-nano

=================================================================
PARTE 1 — conectar e falar UMA vez

import asyncio
from dotenv import load_dotenv
from agents import Agent, Runner, set_default_openai_api, set_tracing_disabled

load_dotenv()
set_default_openai_api("chat_completions")  # modelo não OpenAI
set_tracing_disabled(True)                  # modelo não OpenAI

agent = Agent(
    name="Atendente",
    instructions="Você é o atendente de uma sorveteria. Seja simpático e direto.",
)

async def main():
    result = await Runner.run(agent, "Oi, o que você tem hoje?")
    print(result.final_output)

asyncio.run(main())

>>> RODE. Se respondeu, a conexão com o provedor está de pé.
>>> Aponte: instructions é a role system. Ninguém digitou isso, é você que definiu.

=================================================================
PARTE 2 — o agente não lembra

Troque só a main(), mantendo o resto:

history = [
    {"role": "user", "content": "Quero algo com chocolate."},
    {"role": "assistant", "content": "Temos chocolate belga e chocolate branco."},
    {"role": "user", "content": "Qual dos dois é mais doce?"},
]

async def main():
    result = await Runner.run(agent, history)
    print(result.final_output)

>>> "Qual dos DOIS" só faz sentido com contexto.
>>> Apague as duas primeiras linhas do history e rode de novo: o agente se perde. É a lição.

=================================================================
PARTE 3 — conversa de verdade

async def main():
    history = []
    while True:
        pergunta = input("\nvocê> ")
        if pergunta.strip().lower() == "sair":
            break

        history.append({"role": "user", "content": pergunta})
        result = await Runner.run(agent, history)
        print(f"atendente> {result.final_output}")

        history = result.to_input_list()   # histórico + a resposta nova

>>> Agora dá para perguntar "e qual combina com ele?" que o agente entende.

=================================================================
PARTE 4 — ModelSettings

from agents import ModelSettings

agent = Agent(
    name="Atendente",
    instructions="Você é o atendente de uma sorveteria. Seja simpático e direto.",
    model_settings=ModelSettings(temperature=1.2, max_tokens=200),
)

>>> Peça "me surpreenda com uma combinação" duas vezes: respostas diferentes.
>>> Baixe para temperature=0.0 e repita: sai igual. É o slide da temperatura, ao vivo.

=================================================================
PARTE 5 — o custo (o fecho da aula)

Dentro do loop, logo após imprimir a resposta:

        u = result.context_wrapper.usage
        print(f"[input={u.input_tokens} output={u.output_tokens} total={u.total_tokens}]")

>>> Rode 4 ou 5 turnos e aponte o INPUT CRESCENDO a cada turno.
>>> É o histórico inteiro sendo reenviado — prova ao vivo do slide 41.
>>> E amarra o slide 48: o max_tokens segura o output, mas contra o input crescente não faz nada.
-->

---
layout: default
---

# Hands-on

<br/>

🤖 &nbsp;**Exercício \#1:** Prove que o agente esquece: a mesma pergunta com e sem `history`

🤖 &nbsp;**Exercício \#2:** Crie um agente barista/tipo de café e varie `temperature`/`top_p`.

🤖 &nbsp;**Exercício \#3:** Analise as diferenças entre execuções no exec #3 e tire conclusões.

🤖 &nbsp;**Exercício \#4:** Meça os tokens de cada chamada e force uma resposta vazia com `max_tokens`


- [ ] escolher provedor gratuito e criar a API Key
- [ ] configurar o `.env`: key, base URL e modelo
- [ ] ativar Chat Completions e desativar o tracing
- [ ] montar o `history` com as roles `user` e `assistant`
- [ ] configurar o `ModelSettings`: temperature, top_p e max_tokens
- [ ] ler o `usage` para comparar os tokens

<br/>
