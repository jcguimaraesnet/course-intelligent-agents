---
layout: section
routeAlias: etapa9
---

## **Etapa 9:** Agentes Assíncronos

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: FastAPI
source: https://github.com/fastapi/fastapi
---

# FastAPI: um framework para Web API

#### **FastAPI é um dos frameworks mais usados para construir Web API em Python**

::left::

<div class="text-lg w-full self-start [&_ul]:my-3 [&_li]:mb-4">

- Suporte para **funções assíncronas** e **tarefas em segundo plano**
- Integração com **modelos Pydantic** para validação de dados
- **Documentação automática** no padrão OpenAPI (antigo Swagger)
- Utiliza o **uvicorn** como servidor web básico (escuta conexões HTTP e encaminha)

</div>

::right::

<div class="flex flex-col items-center justify-center w-full">

<Transform :scale="0.70" origin="top">

```mermaid {theme: 'dark'}
---
config:
  theme: dark
---
flowchart TD
Req["Cliente (Usuário)"]
Uvi["Uvicorn (HTTP)"]
FAPI["FastAPI"]
Agent["Agente"]
Req -- Request --> Uvi
Uvi -- Invoke --> FAPI
FAPI -- Invoke --> Agent
Agent -- Return --> FAPI
FAPI -- Return --> Uvi
Uvi -- Response --> Req
```

</Transform>

</div>
