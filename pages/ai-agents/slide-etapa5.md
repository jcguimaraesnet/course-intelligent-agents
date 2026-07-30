---
layout: section
routeAlias: etapa5
---

## **Etapa 5:** Uso de Ferramentas

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-start justify-center
---

# O que é chamada de ferramenta (tool calling)

#### **O conceito de _tool calling_ também é conhecido como _function calling_**



::left::

<div class="text-left w-full self-start [&_ul]:my-0 [&_li]:mb-3">

<div class="h-5" />

- LLMs são treinados em dados e só podem fornecer informações até a **data final** do seu treinamento. 
- LLMs não sabem **que horas são**, não sabem o **clima atual**, o **preço de uma ação em tempo real**.
- O _tool calling_ revolucionou a capacidade dos LLMs, permitindo _perceber e agir_ sobre o _ambiente_ externo. 

<!-- <Transform :scale="0.85">

> [!IMPORTANT]
> 

</Transform> -->

</div>

::right::

<div class="flex flex-col items-center">

<div class="h-0" />

<Transform :scale="0.65" origin="top">

```mermaid {theme: 'dark', flowchart: { subGraphTitleMargin: { top: 10, bottom: 10 } }}
---
config:
  theme: dark
  flowchart:
    subGraphTitleMargin:
      top: 10
      bottom: 10
---
flowchart TD
Task["User"]
subgraph Agent["Runner"]
  LLM["Agent"]
  Tools["Tools (1, 2, 3, ...)"]
end
Env["Environment"]
Task -->|Prompt| LLM
LLM -->|Answer| Task
LLM -->|"LLM 1<br/>(choice)"| Tools
Tools -->|"LLM 2<br/>(output)"| LLM
Tools -->|invoke| Env
Env -->|return| Tools
```

</Transform>

</div>

<!--
# tool calling = function calling: o modelo indica qual função chamar e com quais argumentos (em JSON), mas NÃO roda a função.

# quem executa a função é a aplicação (nosso código); o retorno é devolvido ao modelo como observação.

# o modelo pode encadear várias chamadas antes de produzir a resposta final ao usuário.
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-start justify-center
---

# O loop na chamada de ferramentas (tool calling)

#### **No SDK Agents, o Runner gerencia um loop quando um fluxo é executado**



::left::

<!-- <Transform :scale="0.85" origin="top"> -->

<div class="text-17px w-full self-start [&_ul]:my-0 [&_ol]:my-0 [&_li]:mb-3">

<div class="h-5" />

1. Runner.Run executa e e inicia um loop.
2. O agente é invocado com o prompt e tools fornecidos.
3. Se o LLM gerar um output final, o loop termina.
4. Se o LLM gerar um output com handoff, o **loop é executado novamente** com o novo agente.
5. Se o LLM gerar um output com tool calling, o **loop é executado novamente** com o agente atual.

</div>

::right::

<div class="flex flex-col items-center">

<div class="h-0" />

<Transform :scale="0.65" origin="top">

```mermaid {theme: 'dark', flowchart: { subGraphTitleMargin: { top: 10, bottom: 10 } }}
---
config:
  theme: dark
  flowchart:
    subGraphTitleMargin:
      top: 10
      bottom: 10
---
flowchart TD
Task["User"]
subgraph Agent["Runner"]
  LLM["Agent"]
  Tools["Tools (1, 2, 3, ...)"]
end
Env["Environment"]
Task -->|Prompt| LLM
LLM -->|Answer| Task
LLM -->|"LLM 1<br/>(choice)"| Tools
Tools -->|"LLM 2<br/>(output)"| LLM
Tools -->|invoke| Env
Env -->|return| Tools
```

</Transform>

</div>

<!--
## Importante: O LLM não tem capacidade de invocar ferramenta; LLM gera texto; Quem invoca ferramenta é o Runner, é o sistema agêntico que você desenvolve.

## cada volta que termina em tool call ou handoff dispara uma nova chamada de LLM (ver slide anterior sobre nº de chamadas).
-->

---
layout: default
sourceLabel: Tools
source: https://openai.github.io/openai-agents-python/tools/
---

# Tipos de ferramentas no Agents SDK

#### **O Agents SDK oferece diferentes categorias de ferramentas**

<div class="h-8" />

<div class="text-sm leading-tight [&_td]:py-2.5 [&_th]:py-2.5 [&_td]:px-2 [&_th]:px-2">

| Tipo de ferramenta | Descrição |
|---|---|
| **Chamada de função** | **Encapsula qualquer `função Python` como ferramenta.** |
| Ferramentas hospedadas na OpenAI | Executa ferramenta no servidor da OpenAI (web, arquivos, code interpreter, imagem). |
| Ferramentas locais | Permite usar ComputerTool e ShellTool no seu ambiente. |
| Agentes como ferramentas | Expõe um agente como ferramenta sem handoff. |
| Ferramenta Codex | Executa tarefas do Codex (beta experimental). |

</div>

<div class="h-10" />

<div class="text-sm">

> [!NOTE]
> A **chamada de função** (_function calling_) é a mais usada e compatível com **modelos não-OpenAI**.

</div>

<!--
## function calling é o caminho mais sem atrito para usar com modelos não openAI, funciona em qualquer provedor via chat completions.

## ferramentas hospedadas (web search, file search, etc.), ComputerTool/ShellTool e a ferramenta Codex dependem da stack da OpenAI.

## "agentes como ferramentas" difere do handoff: chama o agente e recebe o resultado, sem transferir o controle do fluxo.

## ferramenta Codex permite que um agente no SDK envie comandos(prompts) para um workspace (com acesso ao sistema de arquivos) do Codex
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Tools
source: https://openai.github.io/openai-agents-python/tools/
---

# Chamadas de ferramentas com funções Python

#### **Funções Python se tornam ferramentas usando o decorador `@function_tool`**

<div class="h-2" />

::left::

```python [main.py] {7-9,14|all}{maxHeight:'320px',at:+1}
import asyncio
from datetime import datetime
from dotenv import load_dotenv
from agents import (Agent, Runner, function_tool,
                    set_default_openai_api, set_tracing_disabled)

@function_tool
def get_current_time():
    return datetime.now().strftime("%H:%M:%S")

assistant = Agent(
    name="Assistente",
    instructions="Você é um assistente pessoal",
    tools=[get_current_time],
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    result = await Runner.run(starting_agent=assistant,
                              input="Que horas são nesse exato momento?")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!NOTE]
> O nome da ferramenta será o **nome da função Python**, e devem ser nomes com boa semântica para serem **escolhidas pelos LLMs** oportunamente.

<!--
# inputs de teste (input do console)

# aciona a ferramenta get_current_time:
Que horas são nesse exato momento?

# o LLM sozinho não sabe a hora atual: ele decide chamar a tool, o Runner executa a função e devolve o resultado ao modelo, que então responde.
-->
