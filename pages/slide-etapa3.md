---
layout: section
routeAlias: etapa3
---

## **Etapa 3:** Configuração de Agentes

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Output types
source: https://openai.github.io/openai-agents-python/agents/#output-types
---

# Saídas estruturadas com output_types

#### **Saídas estruturadas podem gerar `listas simples` do Python**

<div class="h-2" />

::left::

```python [main.py] {9|17-18|19-20|all}{at:+1, maxHeight:'320px'}
import asyncio
from dotenv import load_dotenv
from agents import (Agent, Runner, ModelSettings,
                    set_default_openai_api, set_tracing_disabled)

agent = Agent(
    name="Sorveteiro",
    instructions="Você é um especialista em sorvetes",
    output_type=list[str],
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    pergunta = input("Pergunta: ")
    result = await Runner.run(agent, pergunta)
    for sabor in result.final_output:
        print(sabor)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!TIP]
> Use `list[...]` quando a resposta é naturalmente uma **coleção de itens do mesmo tipo** — tags, palavras-chave, uma lista de nomes.

<br/>

> ℹ️ `list` é a coleção ordenada do Python, com vários itens em sequência.


<!--

# Inputs de teste — digite no console (input) quando rodar:

Forneça quatro sabores de sorvetes
Liste três coberturas para sorvete

# Enfatize que o loop para imprimir os sabores foi viabilizado através de saída estruturada.
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Output types
source: https://openai.github.io/openai-agents-python/agents/#output-types
---

# Saídas estruturadas com output_types

#### **Saídas estruturadas também podem gerar `dicionários tipados` com `TypedDict`**

<div class="h-2" />

::left::

```python [main.py] {7-10|15|25-26|all}{at:+1, maxHeight:'320px'}
import asyncio
from typing import TypedDict
from dotenv import load_dotenv
from agents import (Agent, Runner, ModelSettings,
                    set_default_openai_api, set_tracing_disabled)

class Sorvete(TypedDict):
    sabor: str
    preco_de_mercado: float
    citrico: bool

agent = Agent(
    name="Sorveteiro",
    instructions="Você é um especialista em sorvetes",
    output_type=Sorvete,
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    pergunta = input("Pergunta: ")
    result = await Runner.run(agent, pergunta)
    print(result.final_output)
    print(result.final_output["sabor"])

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!TIP]
> Use `TypedDict` quando desejar respostas baseadas em **dicionário** para acessar campos com chave `result.final_output["sabor"]`.

<br/>

> ℹ️ `TypedDict` é um dicionário do Python com chaves e tipos fixos, declarados como uma classe.


<!--

# Inputs de teste — digite no console (input) quando rodar:

Descreva o sorvete de limão
Descreva o sorvete de pistache

# Enfatize que a resposta foi impressa no console acessando uma chave, porque o retorno é um dicionário.
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Output types
source: https://openai.github.io/openai-agents-python/agents/#output-types
---

# Saídas estruturadas com output_types

#### **Saídas estruturadas também podem gerar `objetos tipados` com `dataclass`**

<div class="h-2" />

::left::

```python [main.py] {7-11|16|26-27|all}{at:+1, maxHeight:'320px'}
import asyncio
from dataclasses import dataclass
from dotenv import load_dotenv
from agents import (Agent, Runner, ModelSettings,
                    set_default_openai_api, set_tracing_disabled)

@dataclass
class Sorvete:
    sabor: str
    preco_de_mercado: float
    citrico: bool

agent = Agent(
    name="Sorveteiro",
    instructions="Você é um especialista em sorvetes",
    output_type=Sorvete,
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    pergunta = input("Pergunta: ")
    result = await Runner.run(agent, pergunta)
    print(result.final_output)
    print(result.final_output.sabor)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!TIP]
> Use `dataclass` quando quiser um **objeto tipado** acessando os campos por atributo `result.final_output.sabor`.

<br/>

> ℹ️ `dataclass` é uma classe do Python para agrupar dados, com campos acessados por atributo.

<!--

# Inputs de teste — digite no console (input) quando rodar:

Descreva o sorvete de chocolate belga
Descreva o sorvete de morango

# Enfatize que aqui o acesso é por atributo (.sabor), diferente do TypedDict que usa chave.
-->

---
layout: default
sourceLabel: OpenAI Prompting Guide
source: https://developers.openai.com/cookbook/examples/gpt4-1_prompting_guide#prompt-structure
---

# Estrutura de prompt para agentes

#### **A OpenAI sugere organizar o campo `instructions` em seções nomeadas**

<br/>

<Transform :scale="0.7">

| Seção | Descrição |
|---|---|
| `Role and Objective` | Quem o modelo é e o que ele deve alcançar na interação |
| `Instructions` | Regras e diretrizes de comportamento que o modelo deve seguir |
| `Reasoning Steps` | Sequência lógica ou método a aplicar ao resolver o problema |
| `Output Format` | Como a resposta deve ser estruturada e apresentada |
| `Examples` | Exemplos de entrada e saída que ilustram o comportamento desejado |
| `Context` | Informações de apoio, documentos ou dados que o modelo deve consultar |
| `Final instructions` | Meta-orientação final, ex.: pedir para "pensar passo a passo" |

<div class="h-10" />

> As seções são **opcionais**: adicione ou remova conforme o caso de uso do seu agente.

</Transform>


<!--
As seções não são obrigatórias — adicione ou remova conforme o caso de uso.
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: OpenAI Prompting Guide
source: https://developers.openai.com/cookbook/examples/gpt4-1_prompting_guide#prompt-structure
---

# Comportamento de agentes no system message

#### **Use técnicas de prompt engineering no campo instructions (`system message`)**

<div class="h-2" />

::left::

```python [main.py] {8-29}{maxHeight:'320px'}
import asyncio
from dotenv import load_dotenv
from agents import (Agent, Runner,
                    set_default_openai_api, set_tracing_disabled)

agent = Agent(
    name="Software Engineer Agent",
    instructions="""
        # Papel
        Você é um agente especialista em
        engenharia de software.

        # Instruções
        - Responda apenas a perguntas de
          engenharia de software.
        - Se a pergunta for de outro domínio,
          recuse com: "Só posso ajudar com
          engenharia de software."

        # Tarefas
        Responder dúvidas técnicas de forma
        didática e correta.

        # Formato de saída
        Responda em Markdown com as seções:
        **Resumo:** uma frase direta.
        **Detalhes:** até 3 linhas.
        **Exemplo:** um trecho de código.
    """,
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    pergunta = input("Pergunta: ")
    result = await Runner.run(agent, pergunta)
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```
::right::

<v-click at="+6">

> [!NOTE]
> **instructions** -> existem muitos padrões proposto para prompts estruturados de agentes. 
- RTF (Role, Task, Format, etc)
- PTCF (Persona, Task, Context, Format)

</v-click>

<!--
# inputs 1
O que é uma função recursiva?
`enfatizar a influencia da seção FORMATO DE SAIDA impacta na resposta`

# input 2
Qual o melhor sabor de sorvete para o verão?
`enfatizar a influencia da seção INSTRUCTIONS impacta na resposta`
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Engenharia de contexto com agentes

#### **Existem muitas maneiras de gerenciar contexto com agentes**

<div class="h-1" />

::left::

<div class="text-left w-full self-start [&_ul]:my-0 [&_li]:mb-5">

- **`instructions` (`system message`)** é um dos caminhos mais simples para injetar base de conhecimento.
- Cenários de **pequenas bases de conhecimento** são indicados para injetar diretamente no campo `instructions`.
- Carregar bases de conhecimento condicionalmente com **`dynamic instructions`** é uma técnica consolidada.

</div>

::right::

<div class="h-full flex items-center justify-center">
    <AssetImg src="context-engineering.png" class="w-full max-w-[440px] rounded-lg" />
</div>

<!--
# A engenharia de contexto é diferente da de engenharia de prompting. 

# Os dois conceitos serão abordados inevitavelmente na disciplina, mas serão abordados de forma sistemática na outra disciplina.

# A engenharia de contexto é bastante complexa porque aborda muitos problemas de contexto:
- memória de longo prazo
- memória de curto prazo
- busca de informação em grandes bases de conhecimento (RAG)
- troca de informações estruturadas entre agentes
- uso de ferramentas de modo assertivo
- e muito mais
-->

---
layout: section
---

## Live Coding 
🎟️ **Agente:** um assistente virtual que responde dúvidas sobre compra de ingressos a partir de uma FAQ (base de conhecimento), com saída estruturada e restrição de escopo.

<!--

=================================================================
ARQUIVO 1 — faq.md  (mesma pasta do main.py)

# FAQ — Venda de Ingressos

**Como posso comprar ingressos para os jogos?**
Você pode comprar ingressos diretamente em nosso site ou aplicativo móvel. Basta selecionar o jogo desejado, escolher o setor e assento, fazer o login na sua conta e prosseguir para o pagamento.

**Quais são as formas de pagamento aceitas?**
Aceitamos diversas formas de pagamento para sua comodidade, incluindo cartões de crédito (Visa, Mastercard, Elo), PIX, carteiras digitais (Apple Pay e Google Pay) e boleto bancário.

**É seguro comprar ingressos neste site?**
Sim, a sua segurança é a nossa prioridade. Utilizamos criptografia de ponta a ponta e protocolos de segurança avançados (certificados SSL) para proteger seus dados pessoais e transações. Suas informações estão seguras conosco.

**Como recebo o meu ingresso após a compra?**
Após a confirmação do pagamento, seu ingresso digital (e-ticket) estará imediatamente disponível na seção "Meus Ingressos" da sua conta. Você também receberá uma cópia em PDF através do e-mail cadastrado.

**Preciso imprimir o meu ingresso para entrar no estádio?**
Não é necessário. Você pode apresentar o ingresso digital (QR Code) diretamente na tela do seu smartphone ou tablet nas catracas do estádio. Certifique-se apenas de ter bateria suficiente no momento da entrada.

**Posso cancelar ou solicitar reembolso do meu ingresso?**
Sim, de acordo com o Código de Defesa do Consumidor, os cancelamentos podem ser solicitados em até 7 dias corridos após a compra. No entanto, a solicitação deve ser feita com no mínimo 48 horas de antecedência do horário da partida.

**Existe um limite de compra de ingressos por pessoa?**
Sim. Para garantir um acesso justo a todos os torcedores e evitar a ação de cambistas, limitamos a compra a um máximo de 4 ingressos por CPF/conta para cada partida.

**Posso transferir meu ingresso para outra pessoa?**
Sim, a transferência de titularidade do ingresso é permitida e pode ser feita de forma fácil pelo nosso aplicativo ou site. O procedimento deve ser realizado até 24 horas antes do início do jogo, bastando informar os dados do destinatário.

**O que acontece se o jogo for adiado ou cancelado?**
Caso a partida seja adiada, seus ingressos continuarão válidos automaticamente para a nova data e horário definidos pela organização. Se o evento for totalmente cancelado, o valor pago será estornado integralmente para a mesma forma de pagamento utilizada na compra.

**Como funciona a política de meia-entrada?**
A meia-entrada está disponível para estudantes, idosos, pessoas com deficiência e jovens de baixa renda, conforme a legislação vigente. É obrigatório apresentar o documento comprobatório válido e original junto com um documento com foto nas catracas do estádio no dia do jogo.

=================================================================
ARQUIVO 2 — prompts.py

SYSTEM_PROMPT = """
# Papel
Você é um assistente virtual de uma plataforma de venda de ingressos
para jogos de futebol.

# Instruções
- Responda apenas a perguntas sobre a compra e o uso de ingressos.
- Use SOMENTE a base de conhecimento abaixo para formular a resposta.
- Se a pergunta for sobre ingressos (o negócio), mas a resposta NÃO
  estiver na base de conhecimento, responda de forma genérica:
  "No momento não tenho essa informação. Por favor, entre em contato
  com o nosso atendimento pelo site ou aplicativo."
- Se a pergunta for de outro domínio (não relacionada a ingressos),
  recuse educadamente informando o seu escopo de atuação.

# Base de conhecimento
{base_de_conhecimento}

# Formato de saída
- resposta: o texto da resposta ao cliente.
- nivel_de_dificuldade: "facil", "media" ou "dificil".
- pergunta_na_base: true se a resposta veio da base, senão false.
"""

=================================================================
ARQUIVO 3 — main.py

import asyncio
from pathlib import Path
from dataclasses import dataclass

from dotenv import load_dotenv
from agents import (Agent, Runner,
                    set_default_openai_api, set_tracing_disabled)

from prompts import SYSTEM_PROMPT

BASE_DIR = Path(__file__).parent


@dataclass
class RespostaAssistente:
    resposta: str
    nivel_de_dificuldade: str
    pergunta_na_base: bool


faq = (BASE_DIR / "faq.md").read_text(encoding="utf-8")

agent = Agent(
    name="Assistente de Ingressos",
    instructions=SYSTEM_PROMPT.format(base_de_conhecimento=faq),
    output_type=RespostaAssistente,
)


async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    pergunta = input("Pergunta: ")
    result = await Runner.run(agent, pergunta)

    r = result.final_output
    print(r.resposta)
    print(f"[dificuldade={r.nivel_de_dificuldade} na_base={r.pergunta_na_base}]")


if __name__ == "__main__":
    asyncio.run(main())

=================================================================
INPUTS DE TESTE (digite no console)

# Dentro da base (pergunta_na_base=True):
Quais são as formas de pagamento aceitas?

# No negócio, mas FORA da base -> resposta genérica padrão (pergunta_na_base=False):
Qual é o valor do ingresso para a final do campeonato?

# Fora de domínio -> recusa educada informando o escopo:
Qual a previsão do tempo para amanhã?
-->

---
layout: default
---

# Hands-on

<br/>

🤖 &nbsp;**Exercício \#1:** Assistente virtual para outro cenário de negócio.

🤖 &nbsp;**Exercício \#2:** Assistente virtual com duas bases de conhecimento (condicional).

🤖 &nbsp;**Exercício \#3:** Assistente virtual com seção de exemplos enriquecida (categorização).

🤖 &nbsp;**Exercício \#4:** Assistente virtual de nutrição que sugere almoço saudável (ingrediente e gramas).


- [ ] criar os arquivos `main.py`, `prompts.py` e `faq.md` na mesma pasta
- [ ] carregar a base e injetá-la no prompt com `.format()`
- [ ] definir a saída estruturada com `@dataclass`
- [ ] incluir a seção de instruções com a restrição de domínio
- [ ] obter a pergunta do usuário com `input()` no console
- [ ] testar perguntas dentro da base, fora da base e fora do domínio

<br/>

<!--
# Exercício #1 — Assistente para outro cenário de negócio
Reaproveite a estrutura do live coding (main.py + prompts.py + faq.md) trocando o
domínio: e-commerce, clínica, escola, academia etc. Monte uma nova FAQ, ajuste o
papel e a restrição de escopo, e mantenha a saída estruturada em dataclass.

# Exercício #2 — Duas bases de conhecimento (condicional)
O assistente tem duas FAQs (ex.: "antes da compra" e "pós-venda"). O programa decide
qual base injetar no prompt se a pessoa é um COMPRADOR ou um CLIENTE (dynamic instructions / condicional). Enfatiza carregamento condicional de contexto.

# Exercício #3 — Seção de exemplos enriquecida (categorização)
Adicione ao prompt uma seção de EXEMPLOS (few-shot) com pares pergunta -> categoria,
para o agente classificar cada pergunta (ex.: "pagamento", "reembolso", "acesso").
A saída estruturada ganha um atributo categoria. Enfatiza a seção Examples do prompt.

# Exercício #4 — Assistente de nutrição (almoço saudável)
Dado um objetivo/restrição do usuário, o agente sugere um almoço saudável. A saída
estruturada é uma lista de itens, cada um com ingrediente e quantidade em gramas
(ex.: dataclass Item(ingrediente: str, gramas: int) e output_type=list[Item]).
Enfatiza saída estruturada aninhada (lista de objetos).
-->
