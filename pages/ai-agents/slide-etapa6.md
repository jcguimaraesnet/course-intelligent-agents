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
layout: default
sourceLabel: Pydantic Fields
source: https://docs.pydantic.dev/latest/concepts/fields/
---

# Enriquecendo o schema de validação

#### **Recursos do Pydantic que dão mais contexto ao LLM e endurecem a validação**

<br/>

<div class="[&_table]:w-full text-12px leading-tight [&_td]:py-2 [&_th]:py-3">

| Recurso | O que faz | Exemplo |
| --- | --- | --- |
| `Field` | Container que enriquece o campo | `x: str = Field(...)` |
| `description` | Descreve o campo para o LLM | `Field(description="...")` |
| `ge` `le` `gt` `lt` | Restringem valores (≥ ≤ > <) | `Field(ge=0, le=100)` |
| `Literal` | Conjunto fechado de opções | `Literal["RH", "TI"]` |
| `min_length` `max_length` | Tamanho de string | `Field(min_length=2)` |
| `\| None = None` | Campo opcional | `obs: str \| None = None` |
| `= valor` | Valor default | `active: bool = True` |
| `date` `datetime` | Formato de data / data-hora | `birth_date: date` |
| `EmailStr` `HttpUrl` | Formato de e-mail / URL | `email: EmailStr` |

</div>


<!--
## cada recurso vira uma chave no JSON Schema (description, enum, minimum, maxLength, format...) que o LLM lê como instrução de formato.

## restrições fortes (Literal/enum, description) costumam ser bem seguidas; faixas (ge/le) e pattern podem ser tratadas como sugestão por alguns provedores.

## a garantia dura vem sempre da validação local do Pydantic ao instanciar o objeto: se o LLM sair da faixa, estoura ali.

## EmailStr e HttpUrl exigem o extra: uv add "pydantic[email]".
-->

---
layout: default
layoutClass: gap-8
sourceLabel: Pydantic Fields
source: https://docs.pydantic.dev/latest/concepts/fields/
---

# Um modelo Employee com schema rico

#### **Quanto mais rico o schema, mais o modelo tende a acertar a saída.**

<div class="h-7" />

```python [modelo.py] {*}{maxHeight:'320px'}
from typing import Literal
from datetime import date, datetime
from pydantic import BaseModel, Field, EmailStr, HttpUrl

class Employee(BaseModel):
    """Cadastro de funcionário do RH."""              # descrição do modelo
    name: str = Field(description="Nome completo",
                      min_length=2, max_length=100)    # Field + string
    age: int = Field(ge=18, le=65)                     # ge, le
    salary: float = Field(gt=0,
                          description="Salário bruto mensal (R$)")
    department: Literal["RH", "TI", "Financeiro"]      # conjunto fechado
    email: EmailStr                                    # formato e-mail
    site: HttpUrl | None = None                        # opcional + URL
    birth_date: date                                   # formato data
    admitted_at: datetime                              # formato data-hora
    active: bool = True                                # valor default
```

<!--
## a docstring da classe vira a description do objeto inteiro no schema.

## age com ge/le vira minimum/maximum; salary com gt vira exclusiveMinimum; department vira enum.

## email/site usam EmailStr/HttpUrl -> "format": "email"/"uri"; birth_date/admitted_at -> "format": date/date-time.

## site é opcional (| None = None) e sai do required; active tem default True e também sai do required.

## rode Employee.model_json_schema() para ver todas essas restrições no JSON que o LLM recebe.
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
## a tool devolve texto em linguagem natural; quem estrutura os dados no formato Employee é o LLM, guiado pelo output_type `model_json_schema()`.

## note a data "30/07/1982" e o valor 5 MIL REAIS no texto: o modelo a converte.

-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Faker
source: https://faker.readthedocs.io/
---

# Saída estruturadas e aninhadas - parte 1

#### **O Pydantic funciona muito bem com estruturas aninhadas**

<div class="h-2" />

::left::

```python [seed_faker.py] {5-15,27|all}{maxHeight:'320px',at:+1}
import json
import random
from faker import Faker

def gerar_folha():
    folha = []
    for _ in range(3):
        hours = random.randint(160, 200)
        hourly_rate = round(random.uniform(30, 120), 2)
        folha.append({
            "hours": hours,
            "hourly_rate": hourly_rate,
            "total": round(hours * hourly_rate, 2),
        })
    return folha

def gerar_funcionarios_folha():
    fake = Faker(locale="pt_BR")
    Faker.seed(seed=42)   # seed do Faker (nomes e datas)
    random.seed(42)       # seed do random (horas e valor/hora)

    funcionarios = [
        {
            "name": fake.name(),
            "birth_date": fake.date_of_birth(
                minimum_age=18, maximum_age=65).isoformat(),
            "payroll": gerar_folha(),
        }
        for _ in range(5)
    ]

    with open("funcionarios.json", "w", encoding="utf-8") as f:
        json.dump(funcionarios, f, ensure_ascii=False, indent=2)

    print(f"{len(funcionarios)} funcionários salvos.")

if __name__ == "__main__":
    gerar_funcionarios_folha()
```

::right::

> [!NOTE]
> Cada funcionário carrega uma **lista aninhada** (`payroll`) com 3 meses. No próximo slide, o Pydantic modela isso com **modelos aninhados** (um modelo dentro do outro).

<!--
## estrutura aninhada: o funcionário deixa de ser "plano" e passa a conter uma lista de objetos (a folha de pagamento).

## gerar_folha() devolve 3 meses; cada mês tem hours, hourly_rate e total (= hours * hourly_rate).

## as duas seeds continuam garantindo reprodutibilidade, mesmo com a estrutura mais complexa.

## parte 2: criar os modelos Pydantic Payroll e Employee (com payroll: list[Payroll]) para validar essa árvore.
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Output types
source: https://openai.github.io/openai-agents-python/agents/
---

# Saída estruturadas e aninhadas - parte 2

#### **O `output_type` é uma estrutura aninhada de Employee -> Payroll**

<div class="h-2" />

::left::

```python [main.py] {11-19,41,51|all}{maxHeight:'320px',at:+1}
import asyncio
import json
from pathlib import Path
from datetime import date
from dotenv import load_dotenv
from pydantic import BaseModel
from agents import (Agent, Runner, function_tool,
                    set_default_openai_api, set_tracing_disabled)
from seed_faker import gerar_funcionarios_folha

class Payroll(BaseModel):
    hours: int
    hourly_rate: float
    total: float

class Employee(BaseModel):
    name: str
    birth_date: date
    payroll: list[Payroll]

@function_tool
def buscar_funcionario(nome: str) -> str:
    """Busca os dados e a folha de um funcionário pelo nome.
    Args:
        nome: Nome (ou parte do nome) do funcionário a procurar.
    """
    dados = json.loads(
        Path("funcionarios.json").read_text(encoding="utf-8"))
    for f in dados:
        if nome.lower() in f["name"].lower():
            return json.dumps(f, ensure_ascii=False)
    raise ValueError(f"Funcionário '{nome}' não encontrado.")

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
    gerar_funcionarios_folha()

    result = await Runner.run(starting_agent=assistant,
                              input="Retorne toda a folha da Brenda Alves")
    if isinstance(result.final_output, Employee):
        print(result.final_output)
        print(result.final_output.model_dump_json(indent=2))
        print(f"Qtde de calls: {result.context_wrapper.usage.requests}")

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!IMPORTANT]
> O LLM lê o retorno da ferramenta e converte para um `Employee` com a lista de `Payroll`.

<!--
## modelos aninhados: Employee contém uma lista de Payroll; o Pydantic valida cada nível da árvore.

## a tool lê o funcionarios.json (gerado por gerar_funcionarios_folha) e devolve o registro bruto; o output_type reestrutura em objetos tipados.

## result.final_output é um Employee -> result.final_output.payroll é uma list[Payroll]; acesse .payroll[0].total, etc.

## a pergunta pede "toda a folha" -> o modelo retorna os 3 meses aninhados, não só um valor plano.
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Tool use behavior
source: https://openai.github.io/openai-agents-python/agents/
---

# Saída estruturadas e aninhadas - parte 2

#### **`stop_on_first_tool` e tool tipada permite reduzir custo pela metade**

<div class="h-2" />

::left::

```python [main.py] {22,31,41-42,56|all}{maxHeight:'320px',at:+1}
import asyncio
import json
from pathlib import Path
from datetime import date
from dotenv import load_dotenv
from pydantic import BaseModel
from agents import (Agent, Runner, function_tool,
                    set_default_openai_api, set_tracing_disabled)
from seed_faker import gerar_funcionarios_folha

class Payroll(BaseModel):
    hours: int
    hourly_rate: float
    total: float

class Employee(BaseModel):
    name: str
    birth_date: date
    payroll: list[Payroll]

@function_tool
def buscar_funcionario(nome: str) -> Employee:
    """Busca os dados e a folha de um funcionário pelo nome.
    Args:
        nome: Nome (ou parte do nome) do funcionário a procurar.
    """
    dados = json.loads(
        Path("funcionarios.json").read_text(encoding="utf-8"))
    for f in dados:
        if nome.lower() in f["name"].lower():
            return Employee(**f)
    raise ValueError(f"Funcionário '{nome}' não encontrado.")

assistant = Agent(
    name="Assistente de RH",
    instructions=(
        "Responda dúvidas de RH e inclua os resultados de "
        "todas as chamadas de ferramentas na resposta final"
    ),
    tools=[buscar_funcionario],
    output_type=Employee,
    tool_use_behavior="stop_on_first_tool",
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)
    gerar_funcionarios_folha()

    result = await Runner.run(starting_agent=assistant,
                              input="Retorne toda a folha da Brenda Alves")
    if isinstance(result.final_output, Employee):
        print(result.final_output)
        print(result.final_output.model_dump_json(indent=2))
        print(f"Qtde de calls: {result.context_wrapper.usage.requests}")

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!IMPORTANT]
> Neste exemplo, a tool devolve um tipo **Employee** (e não uma string). 
> 
> Combinando com **stop_on_first_tool**, o Runner não faz a segunda chamada ao LLM.

<!--
## Employee(**f) é o operador de desempacotamento de dicionário. O **f "abre" o dicionário e passa cada par chave→valor como argumento nomeado para o construtor.

## diferença para a parte 2: lá a tool devolve texto e um 2º LLM estrutura o Employee (2 calls); aqui a tool JÁ devolve o Employee.

## stop_on_first_tool: o retorno da 1ª tool é o final_output; o loop encerra sem nova chamada de modelo -> usage.requests == 1.

## o output_type=Employee evita a conversão para str do retorno da tool (comportamento do SDK quando não há output_type).

## trade-off: economiza uma chamada de LLM, mas a resposta é exatamente o objeto da tool (o modelo não redige/for­mata texto).
-->

---
layout: section
---

## Live Coding
📚 **Agente:** bibliotecário que consulta o acervo e responde sobre os livros disponíveis.

##### **1. Use um modelo Pydantic para o livro**
##### **2. Use um modelo Pydantic para o histórico de empréstimos**
##### **3. Gere dados de cinco livros com históricos**
##### **4. Use um prompt para retornar um livro com histórico (saída tipada)**

<!--
=================================================================
ARQUIVO 1 — seed_faker.py  (gera 5 livros, cada um com histórico)

import json
import random
from faker import Faker

def gerar_emprestimos(fake):
    return [
        {
            "borrower": fake.name(),
            "loan_date": fake.date_this_decade().isoformat(),
            "returned": random.choice([True, False]),
        }
        for _ in range(random.randint(1, 3))
    ]

def gerar_livros():
    fake = Faker(locale="pt_BR")
    Faker.seed(seed=42)   # seed do Faker (títulos, autores, nomes)
    random.seed(42)       # seed do random (ano, devolução, qtde)

    livros = [
        {
            "title": fake.sentence(nb_words=3).rstrip("."),
            "author": fake.name(),
            "year": random.randint(1950, 2024),
            "loans": gerar_emprestimos(fake),
        }
        for _ in range(5)
    ]

    with open("livros.json", "w", encoding="utf-8") as f:
        json.dump(livros, f, ensure_ascii=False, indent=2)

    print(f"{len(livros)} livros salvos em livros.json")

if __name__ == "__main__":
    gerar_livros()

=================================================================
ARQUIVO 2 — main.py  (parte 1: modelos Pydantic aninhados)

import asyncio
import json
from pathlib import Path
from datetime import date
from dotenv import load_dotenv
from pydantic import BaseModel
from agents import (Agent, Runner, function_tool,
                    set_default_openai_api, set_tracing_disabled)
from seed_faker import gerar_livros

class Loan(BaseModel):
    borrower: str
    loan_date: date
    returned: bool

class Book(BaseModel):
    title: str
    author: str
    year: int
    loans: list[Loan]

-----------------------------------------------------------------
main.py  (parte 2: a function tool que lê o JSON)

@function_tool
def buscar_livro(titulo: str) -> str:
    """Busca um livro e seu histórico pelo título no livros.json.
    Args:
        titulo: Título (ou parte do título) do livro a procurar.
    """
    dados = json.loads(
        Path("livros.json").read_text(encoding="utf-8"))
    for livro in dados:
        if titulo.lower() in livro["title"].lower():
            return json.dumps(livro, ensure_ascii=False)
    raise ValueError(f"Livro '{titulo}' não encontrado.")

-----------------------------------------------------------------
main.py  (parte 3: o agente com saída tipada)

assistant = Agent(
    name="Bibliotecário",
    instructions=(
        "Responda dúvidas sobre o acervo e inclua os resultados "
        "de todas as chamadas de ferramentas na resposta final"
    ),
    tools=[buscar_livro],
    output_type=Book,
)

-----------------------------------------------------------------
main.py  (parte 4: gera o JSON e executa)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)
    gerar_livros()

    result = await Runner.run(starting_agent=assistant,
        input="Retorne o livro X com seu histórico de empréstimos")
    if isinstance(result.final_output, Book):
        print(result.final_output.model_dump_json(indent=2))

if __name__ == "__main__":
    asyncio.run(main())

=================================================================
INPUTS DE TESTE (digite no console)

# os títulos dependem da versão do Faker; abra o livros.json gerado e
# use um título que exista lá.

# saída tipada: result.final_output é um Book -> .loans é list[Loan];
# acesse result.final_output.loans[0].borrower, etc.

# estrutura aninhada: Book contém uma lista de Loan (histórico de empréstimos).
-->

---
layout: default
layoutClass: gap-8
---

# Live coding: codificação assistida por IA

#### **Prompt para gerar o assistente bibliotecário (saída tipada com Pydantic)**

<div class="h-7" />

<WindowMockup color="dark" padding="0.5rem 0.5rem 0.5rem 0.5rem" title="prompt.md" codeblock>

```md {*}{maxHeight:'290px'}
# Papel
Você é um engenheiro de IA especialista em sistemas agênticos.

# Tarefa
Desenvolva um assistente bibliotecário que retorna um livro e seu
histórico de empréstimos como saída tipada (Pydantic aninhado).

# Contexto
1. Em "seed_faker.py", gere um "livros.json" com 5 livros usando Faker
   (locale "pt_BR") com SEED FIXA (`Faker.seed(42)` e `random.seed(42)`),
   salvando com `json.dump(..., ensure_ascii=False, indent=2)`. Cada livro
   tem title, author, year e uma lista "loans" (borrower, loan_date, returned).
2. Em "main.py", defina dois modelos Pydantic aninhados: `Loan` (borrower,
   loan_date, returned) e `Book` (title, author, year, loans: list[Loan]).
3. Use o OpenAI Agents SDK, assíncrono, lendo o ".env"; configure
   `set_default_openai_api("chat_completions")` e `set_tracing_disabled(True)`.
4. Crie uma `@function_tool` "buscar_livro" com type hints e docstring que
   lê o "livros.json" e retorna o livro pelo título (ValueError se não achar).
5. Crie um agente Bibliotecário com `output_type=Book`, para a resposta vir
   validada como objeto tipado (com a lista de Loan aninhada).
6. Demonstre com uma pergunta de usuário definida no script:
   - "Retorne o livro <titulo> com seu histórico de empréstimos" (use um
     título real presente no livros.json gerado)

# Saída e Verificação
- Gere seed_faker.py, livros.json e main.py.
- O código deve ser funcional e pronto para execução
```
</WindowMockup>

---
layout: default
---

# Hands-on

<br/>

🛠️ &nbsp;**Exercício \#1:** Crie um modelo Pydantic com validação de tipos.

🛠️ &nbsp;**Exercício \#2:** Crie um agente com output_type e saída tipada.

🛠️ &nbsp;**Exercício \#3:** Adicione um segundo modelo Pydantic aninhado.

🛠️ &nbsp;**Exercício \#4:** Adicione uma tool que retorna a instância com stop_on_first_tool.


- [ ] declare os campos com type hints e teste dados inválidos
- [ ] defina output_type com o seu modelo no Agent
- [ ] aninhe modelos usando list de outro modelo
- [ ] retorne a instância na tool e use stop_on_first_tool

<br/>

<!--
# Exercício #1 — Validação de tipos
Crie um BaseModel com campos tipados. Passe valores errados e veja a exceção.
Compare com uma classe Python comum, que aceita qualquer tipo.

# Exercício #2 — Saída tipada
Defina output_type com o seu modelo no Agent. O final_output deixa de ser texto
e vira uma instância validada. Confirme com isinstance antes de usar.

# Exercício #3 — Estrutura aninhada
Modele um objeto que contém uma lista de outro modelo. Gere os dados com Faker
e seed fixa. O Pydantic valida a árvore inteira.

# Exercício #4 — Retorno direto da tool
A tool constrói e devolve a instância. Com stop_on_first_tool o Runner encerra
sem a segunda chamada ao modelo. Mantenha output_type para não virar string.
-->
