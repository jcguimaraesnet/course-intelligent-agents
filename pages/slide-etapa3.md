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

```python [main.py] {9|18-19|21-22|all}{at:+1, maxHeight:'320px'}
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

    result = await Runner.run(
        agent,
        "Forneça quatro sabores de sorvetes",
    )
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

```python [main.py] {7-10|15|27-28|all}{at:+1, maxHeight:'320px'}
import asyncio
from typing import TypedDict
from dotenv import load_dotenv
from agents import (Agent, Runner, ModelSettings,
                    set_default_openai_api, set_tracing_disabled)

class Sorvete(TypedDict):
    sabor: str
    preco: float
    disponivel: bool

agent = Agent(
    name="Sorveteiro",
    instructions="Você é um especialista em sorvetes",
    output_type=Sorvete,
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    result = await Runner.run(
        agent,
        "Descreva o sorvete de flor de sal",
    )
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

```python [main.py] {7-11|16|28-29|all}{at:+1, maxHeight:'320px'}
import asyncio
from dataclasses import dataclass
from dotenv import load_dotenv
from agents import (Agent, Runner, ModelSettings,
                    set_default_openai_api, set_tracing_disabled)

@dataclass
class Sorvete:
    sabor: str
    preco: float
    disponivel: bool

agent = Agent(
    name="Sorveteiro",
    instructions="Você é um especialista em sorvetes",
    output_type=Sorvete,
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    result = await Runner.run(
        agent,
        "Descreva o sorvete de flor de sal",
    )
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
# Enfatize que aqui o acesso é por atributo (.sabor), diferente do TypedDict que usa chave.
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Agent
source: https://openai.github.io/openai-agents-python/agents/
---

# Comportamento de agentes no system message

#### **Use técnicas de prompt engineering no campo instructions (`system message`)**

<div class="h-2" />

::left::

```python [main.py] {5-21}{maxHeight:'320px'}
from agents import Agent

agent = Agent(
    name="Software Engineer Agent",
    instructions="""
        # Papel
        - Você é um agente de IA especialista 
        em engenharia de software.

        # Instructions
        - Responda apenas sobre perguntas de engenharia 
        de software. Se o usuário perguntar sobre outro 
        assunto, recuse educadamente.

        # Tarefa
        Sua tarefa consiste em responder perguntas 
        sobre engenharia de software.

        # Formato de saída
        - Responda de forma objetiva com tom informal.
    """
)
```
::right::

<v-click at="+6">

> [!NOTE]
> **instructions** -> existem muitos padrões proposto para prompts estruturados de agentes. 
- RTF (Role, Task, Format, etc)
- PTCF (Persona, Task, Context, Format)

</v-click>

<!-- 

- Todas as seções não são obrigatórias, use quando fizer sentido

[https://developers.openai.com/cookbook/examples/gpt4-1_prompting_guide](https://developers.openai.com/cookbook/examples/gpt4-1_prompting_guide#prompt-structure)

#### OpenAI propõe uma estrutura de documento com seções nomeadas

- Role and Objective
- Instructions
- Reasoning Steps
- Output Format
- Examples
- Context
- Final instructions

-->

---
layout: default
sourceLabel: OpenAI Prompting Guide
source: https://developers.openai.com/cookbook/examples/gpt4-1_prompting_guide#prompt-structure
---

# Estrutura de prompt sugerida pela OpenAI

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
