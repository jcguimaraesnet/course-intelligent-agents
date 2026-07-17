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
