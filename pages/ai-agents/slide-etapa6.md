---
layout: section
routeAlias: etapa6
---

## **Etapa 6:** Modelos Pydantic

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: Pydantic
source: https://pydantic.dev/docs/validation
---

# Modelos Pydantic

#### **Modelos Pydantic são úteis para descrever conjunto de dados com classes python**

<br/>

::left::

<div class="text-left w-full self-start [&_ul]:my-0 [&_li]:mb-5">

- **Validação automática** — dados fora do formato falham logo na entrada, com mensagem de erro.
- **Conversão de tipos** — converte o valor para o tipo declarado quando possível (ex.: o texto `"42"` vira o número `42`)
- **Auto-documentação** — contratos descritos no formato **JSON Schema** e mais assertividade.

</div>

::right::

<div class="h-full flex flex-col code-wide">

```python [modelo.py]

from datetime import date
from pydantic import BaseModel

class Employee(BaseModel):
    name: str
    birth_date: date
    salary: float

```

</div>

<style>
.code-wide {
  width: 85%;
}
</style>


<!-- 
## a vantagem adicional da validação de entrada não-LLM . Se o LLM "alucinar" e transmitir dados formatados incorretamente, o SDK detectará o problema gerando um erro. 

## entrada estruturada de dados em ferramentas (objetos complexos)

-->


---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Pydantic
source: https://pydantic.dev/docs/validation
---

# Python puro x Pydantic

#### **Sem validação, dados inválidos passam despercebidos; com Pydantic, falham na entrada**

::left::

```python {monaco-run} {autorun: false, height: 'auto'}
from datetime import date

class Employee:
    def __init__(self, name: str, birth_date: date,
                 salary: float):
        self.name = name
        self.birth_date = birth_date
        self.salary = salary

# Python ignora os tipos de dados
employee = Employee(
    name=42,
    birth_date="32/05/1982",
    salary="muito",
)

print("Funcionário: ", employee.name)

```


::right::

```python {monaco-run} {autorun: false, height: 'auto'}
from datetime import date
from pydantic import BaseModel

class Employee(BaseModel):
    name: str
    birth_date: date
    salary: float


# os mesmos tipos errados agora falham
employee = Employee(
    name=42,
    birth_date="32/05/1982",
    salary="muito",
)

print("Funcionário: ", employee.name)
```

<!--

## os tres parametros são fornecidos como tipos inválidos, e o python instancia a classe com sucesso, enquanto o pydantic não. 

## Pydantic oferece sistemas agenticos mais seguros

## data precisa ser passada no formato ISO
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: Pydantic
source: https://pydantic.dev/docs/validation
---

# Saídas estruturadas com schema JSON

#### **LLMs recebem o resultado do `model_json_schema()` para gerar outputs tipados/JSON**

<div class="h-2" />


::left::


```python [main.py] {maxHeight:'260px'}
import json
from datetime import date
from pydantic import BaseModel

class Employee(BaseModel):
    name: str
    birth_date: date
    salary: float

print(json.dumps(
    Employee.model_json_schema(), indent=2))
```

::right::

<WindowMockup color="dark" padding="0.5rem 0.5rem 0.5rem 0.5rem" title="console" codeblock style="width: 380px">

```json {*}{maxHeight:'210px'}
{
  "properties": {
    "name": {
      "title": "Name",
      "type": "string"
    },
    "birth_date": {
      "format": "date",
      "title": "Birth Date",
      "type": "string"
    },
    "salary": {
      "title": "Salary",
      "type": "number"
    }
  },
  "required": [
    "name",
    "birth_date",
    "salary"
  ],
  "title": "Employee",
  "type": "object"
}
```
</WindowMockup>

<!--
## o model_json_schema() traduz o modelo Pydantic para JSON Schema, o formato que o LLM entende para produzir saídas estruturadas.

## note como o campo date vira "type": string + "format": date; o LLM recebe esse contrato e devolve dados no formato certo.

## required lista os campos obrigatórios; o SDK valida a resposta do LLM contra esse schema antes de entregar o objeto.
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Output types
source: https://openai.github.io/openai-agents-python/agents/
---

# Saída estruturada (tipado/JSON)

#### **O uso do Pydantic fornece um schema seguro de tipos de dados**

<div class="h-2" />

::left::

```python [main.py] {8-11,30,40|all}{maxHeight:'320px',at:+1}
import asyncio
from datetime import date
from dotenv import load_dotenv
from pydantic import BaseModel
from agents import (Agent, Runner, function_tool,
                    set_default_openai_api, set_tracing_disabled)

class Employee(BaseModel):
    name: str
    birth_date: date
    salary: float

@function_tool
def buscar_funcionario(nome: str) -> str:
    """Busca os dados de um funcionário por nome de funcionário.
    Args:
        nome: Nome (ou parte do nome) do funcionário a procurar.
    """
    return ("A funcionária Brenda Alves tem um salário "
            "de 5 mil reais e sua data de nascimento "
            "é 30/07/1982.")

assistant = Agent(
    name="Assistente de RH",
    instructions=(
        "Responda dúvidas de RH e inclua os resultados de "
        "todas as chamadas de ferramentas na resposta final"
    ),
    tools=[buscar_funcionario],
    output_type=Employee,
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    result = await Runner.run(starting_agent=assistant,
                              input="Quais os dados da Brenda Alves?")
    if isinstance(result.final_output, Employee):
        print(result.final_output)
        print(result.final_output.model_dump_json(indent=2))

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!IMPORTANT]
> Com `output_type`, o agente devolve uma instância de **Employee** (e não um texto livre)
> 
> O LLM extrai os dados da string da ferramenta e o SDK **valida** contra o schema Pydantic antes de entregar.

<!--
## a tool devolve texto em linguagem natural; quem estrutura os dados no formato Employee é o LLM, guiado pelo output_type.

## output_type=Employee vira um JSON Schema (slide anterior) enviado ao modelo; a resposta é validada e convertida em objeto tipado.

## result.final_output deixa de ser str e passa a ser um Employee -> acesse result.final_output.salary, .birth_date, etc.

## note a data "30/07/1982" no texto: o modelo a converte para o tipo date do schema; formatos inválidos falhariam na validação.

## não há gerar_funcionarios() nem leitura de JSON aqui: o foco é a saída estruturada, não a fonte do dado.
-->
