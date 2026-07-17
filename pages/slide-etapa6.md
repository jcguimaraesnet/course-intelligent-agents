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
- **Auto-documentação** — contratos descritos no formato **JSON Schema**.

</div>

::right::

<div class="h-full flex flex-col code-wide">

```python [modelo.py]

from pydantic import BaseModel

class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]

```

</div>

<style>
.code-wide {
  width: 85%;
}
</style>

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
class CalendarEvent:
    def __init__(self, name: str, date: str,
                 participants: list[str]):
        self.name = name
        self.date = date
        self.participants = participants

# Python ignora os tipos de dados
evento = CalendarEvent(
    name=42,
    date="2026-07-17",
    participants="ninguém",
)

print("Evento: ", evento.name)

```


::right::

```python {monaco-run} {autorun: false, height: 'auto'}
from pydantic import BaseModel

class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]

# os mesmos tipos errados agora falham:
evento = CalendarEvent(
    name=42,
    date="2026-07-17",
    participants="ninguém",
)

print("Evento: ", evento.name)
```

<!--

Versão funcional: com dados válidos, o Pydantic aceita e constrói o objeto sem erro.

```python
from pydantic import BaseModel

class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]

evento = CalendarEvent(
    name="Reunião",
    date="2026-07-17",
    participants=["Ana", "Bruno"],
)

print("Evento: ", evento.name)  # Evento:  Reunião
```

-->
