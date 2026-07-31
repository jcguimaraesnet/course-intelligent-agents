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
