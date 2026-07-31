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

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Tools
source: https://openai.github.io/openai-agents-python/tools/
---

# Docstring e type hint na escolha de ferramentas

#### **Boa documentação resolve a ambiguidade entre ferramentas semelhantes**

<div class="h-2" />

::left::

```python [main.py] {9-10,21-22|all}{maxHeight:'320px',at:+1}
import asyncio
from datetime import datetime
from zoneinfo import ZoneInfo
from dotenv import load_dotenv
from agents import (Agent, Runner, function_tool,
                    set_default_openai_api, set_tracing_disabled)

@function_tool
def get_current_datetime_v1(timezone: str) -> str:
    """Retorna a HORA atual (HH:MM:SS) no fuso informado.
    Use quando o usuário pergunta as horas.
    Args:
        timezone: Adapte para o padrão IANA.
            Exemplos: Brasilia -> 'America/Sao_Paulo',
                      Lisboa -> 'Europe/Lisbon',
                      Nova Iorque -> 'America/New_York'
    """
    return datetime.now(ZoneInfo(timezone)).strftime("%H:%M:%S")

@function_tool
def get_current_datetime_v2(timezone: str) -> str:
    """Retorna a DATA atual (DD/MM/AAAA) no fuso informado.
    Use quando o usuário pergunta o dia ou a data.
    Args:
        timezone: Adapte para o padrão IANA.
            Exemplos: Brasilia -> 'America/Sao_Paulo',
                      Lisboa -> 'Europe/Lisbon',
                      Nova Iorque -> 'America/New_York'
    """
    return datetime.now(ZoneInfo(timezone)).strftime("%d/%m/%Y")

assistant = Agent(
    name="Assistente",
    instructions="Você é um assistente pessoal",
    tools=[get_current_datetime_v1, get_current_datetime_v2],
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    result = await Runner.run(starting_agent=assistant,
                              input="Que dia é hoje em Tóquio?")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!NOTE]
> **Duas ferramentas semelhante** para o LLM escolher. 
> 
> Com **docstring** e **type hint**, o LLM sabe qual das duas ferramentas usar, e **como** preencher o `timezone`.
>
> \* De modo proposital, o nome das duas funções são parecidas. Defina bons nomes para cada função.

<!--
## a primeira linha da docstring é o que desambigua as duas funções (HORA e DATA)

## o type hint (str) e docstring ajudam o LLM preencher o parâmetro timezone
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Streaming
source: https://openai.github.io/openai-agents-python/streaming/
---

# Investigando a escolha da ferramenta

#### **O evento `tool_called` revela qual ferramenta o agente escolheu**

<div class="h-2" />

::left::

```python [main.py] {43-51|all}{maxHeight:'320px',at:+1}
import asyncio
from datetime import datetime
from zoneinfo import ZoneInfo
from dotenv import load_dotenv
from agents import (Agent, Runner, function_tool,
                    set_default_openai_api, set_tracing_disabled)

@function_tool
def get_current_datetime_v1(timezone: str) -> str:
    """Retorna a HORA atual (HH:MM:SS) no fuso informado.
    Use quando o usuário pergunta as horas.
    Args:
        timezone: Adapte para o padrão IANA.
            Exemplos: Brasilia -> 'America/Sao_Paulo',
                      Lisboa -> 'Europe/Lisbon',
                      Nova Iorque -> 'America/New_York'
    """
    return datetime.now(ZoneInfo(timezone)).strftime("%H:%M:%S")

@function_tool
def get_current_datetime_v2(timezone: str) -> str:
    """Retorna a DATA atual (DD/MM/AAAA) no fuso informado.
    Use quando o usuário pergunta o dia ou a data.
    Args:
        timezone: Adapte para o padrão IANA.
            Exemplos: Brasilia -> 'America/Sao_Paulo',
                      Lisboa -> 'Europe/Lisbon',
                      Nova Iorque -> 'America/New_York'
    """
    return datetime.now(ZoneInfo(timezone)).strftime("%d/%m/%Y")

assistant = Agent(
    name="Assistente",
    instructions="Você é um assistente pessoal",
    tools=[get_current_datetime_v1, get_current_datetime_v2],
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    result = Runner.run_streamed(starting_agent=assistant,
                                 input="Que dia é hoje em Tóquio?")

    async for event in result.stream_events():
        if (event.type == "run_item_stream_event"
                and event.name == "tool_called"):
            print(f"[ferramenta escolhida: {event.item.raw_item.name}]")

    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!NOTE]
> No fluxo do streaming é possível capturar, pelo tipo e nome do evento **(tool_called)**, que ferramenta foi escolhida e disparada no loop do agente.

<!--
# investigar a escolha = capturar o evento tool_called no fluxo de streaming.

# event.item é um ToolCallItem; event.item.raw_item.name é o nome da tool, e .arguments traz os argumentos (JSON).

# aqui, "Que dia é hoje..." deve acionar get_current_datetime_v2; troque para "Que horas..." para ver o v1 ser escolhido.
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Faker
source: https://faker.readthedocs.io/
---

# Dados fictícios reproduzíveis com Faker

#### **O pacote `faker` gera dados e o método `seed` garante dados fixos**

<div class="h-2" />

::left::

```python [seed_faker.py] {6-8|all}{maxHeight:'320px',at:+1}
import json
import random
from faker import Faker

def gerar_funcionarios():
    fake = Faker(locale="pt_BR")
    Faker.seed(seed=42)   # seed do Faker (nomes)
    random.seed(42)       # seed do random (salário e idade)

    funcionarios = [
        {
            "nome": fake.name(),
            "salario": round(random.uniform(2000, 15000), 2),
            "idade": random.randint(18, 65),
        }
        for _ in range(5)
    ]

    with open("funcionarios.json", "w", encoding="utf-8") as f:
        json.dump(funcionarios, f, ensure_ascii=False, indent=2)

    print(f"{len(funcionarios)} funcionários salvos em funcionarios.json")

if __name__ == "__main__":
    gerar_funcionarios()
```

::right::

> [!NOTE]
> Usando o método `seed` com **random** e **Faker**, cada geração de dados gera **exatamente os mesmos** dados, facilitando **reprodução** de testes.

<!--
# seed fixa = geração determinística: mesma seed -> mesmos dados em qualquer máquina/execução.

# são duas fontes de aleatoriedade: o Faker (nomes) e o random (salário/idade); cada uma precisa da sua própria seed.

# temática de RH (funcionários) só para não repetir a de produtos usada na prova; a técnica é idêntica.
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Tools
source: https://openai.github.io/openai-agents-python/tools/
---

# Ferramenta como meio para buscar dados

#### **Ferramentas são úteis para busca de dados privados e externos ao LLM**

<div class="h-2" />

::left::

```python [main.py] {9-20,28|all}{maxHeight:'320px',at:+1}
import asyncio
import json
from pathlib import Path
from dotenv import load_dotenv
from agents import (Agent, Runner, function_tool,
                    set_default_openai_api, set_tracing_disabled)
from seed_faker import gerar_funcionarios

@function_tool
def buscar_salario(nome: str) -> str:
    """Busca o salário de um funcionário por nome de funcionário.
    Args:
        nome: Nome (ou parte do nome) do funcionário a procurar.
    """
    dados = json.loads(
        Path("funcionarios.json").read_text(encoding="utf-8"))
    for f in dados:
        if nome.lower() in f["nome"].lower():
            return f"Salário: R$ {f['salario']:.2f}"
    return "Funcionário não encontrado."

assistant = Agent(
    name="Assistente de RH",
    instructions=(
        "Responda dúvidas de RH e inclua os resultados de "
        "todas as chamadas de ferramentas na resposta final"
    ),    
    tools=[buscar_salario],
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)
    gerar_funcionarios()

    result = await Runner.run(starting_agent=assistant,
                              input="Qual é o salário da Brenda Alves?")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!IMPORTANT]
> O uso de ferramentas adiciona capacidade ao agente de **perceber e agir sobre o ambiente**: **buscar dados** que não estão no seu conhecimento (pesos internos) e **executar ações** com efeitos no mundo real.

<!--
## a pergunta ("salário da Brenda Alves") obriga o agente a chamar a tool, que lê o arquivo e retorna o registro real.

## os nomes dependem da versão do Faker; ajuste o nome da pergunta para um que exista no seu funcionarios.json.

## exemplos práticos de perceber o ambientet: navegar em uma página na internet, obter o clima atual em uma cidade, etc.

## exemplos práticos de agir sobre o ambiente: enviar um e-mail, inserir um registro no banco de dados, criar uma agenda no calendário, etc
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Forcing tool use
source: https://openai.github.io/openai-agents-python/agents/
---

# Forçando a seleção de uma ferramenta

#### **O parâmetro `tool_choice` permite forçar que o agente invoque uma ferramenta**

<div class="h-2" />

::left::

```python [main.py] {22-28,36-37|all}{maxHeight:'320px',at:+1}
import asyncio
import json
from pathlib import Path
from dotenv import load_dotenv
from agents import (Agent, Runner, ModelSettings, function_tool,
                    set_default_openai_api, set_tracing_disabled)
from seed_faker import gerar_funcionarios

@function_tool
def buscar_salario(nome: str) -> str:
    """Busca o salário de um funcionário por nome de funcionário.
    Args:
        nome: Nome (ou parte do nome) do funcionário a procurar.
    """
    dados = json.loads(
        Path("funcionarios.json").read_text(encoding="utf-8"))
    for f in dados:
        if nome.lower() in f["nome"].lower():
            return f"Salário: R$ {f['salario']:.2f}"
    return "Funcionário não encontrado."

@function_tool
def calcular_folha_total() -> str:
    """Soma os salários de todos os funcionários (folha de pagamento)."""
    dados = json.loads(
        Path("funcionarios.json").read_text(encoding="utf-8"))
    total = sum(f["salario"] for f in dados)
    return f"Folha total: R$ {total:.2f}"

assistant = Agent(
    name="Assistente de RH",
    instructions=(
        "Responda dúvidas de RH e inclua os resultados de "
        "todas as chamadas de ferramentas na resposta final"
    ),
    tools=[buscar_salario, calcular_folha_total],
    model_settings=ModelSettings(tool_choice="calcular_folha_total"),
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)
    gerar_funcionarios()

    result = await Runner.run(starting_agent=assistant,
                              input="Qual é o salário da Brenda Alves?")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!NOTE]
> Mesmo que o user prompt não tenha indicações explícitas para chamada de uma ferramenta, `tool_choice` obriga o agente invocar uma ferramenta.

<!--
# valores de tool_choice: "auto" (padrão, o modelo decide), "required" (obriga ALGUMA tool), "none" (proíbe tools) ou o NOME de uma tool (obriga aquela).

# confirmação: a folha total é calculada mesmo o texto pedindo o salário da Brenda -> prova que o comportamento mudou vs. execução livre.

# o SDK reseta o tool_choice após a chamada forçada, evitando loop infinito (senão o modelo seria obrigado a chamar a tool para sempre).

# a instrução ("inclua os resultados de TODAS as ferramentas") faz o total forçado aparecer na resposta — solução leve via prompt; muda o texto, não o fluxo/custo.

# outro cenário do enunciado (encerrar assim que a tool retorna, sem texto extra p/ baratear): tool_use_behavior="stop_on_first_tool" no Agent.
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Tool use behavior
source: https://openai.github.io/openai-agents-python/agents/
---

# Encerrando o loop na primeira ferramenta

#### **`tool_use_behavior` e `stop_on_first_tool` permitem controle fino do loop agêntico**

<div class="h-2" />

::left::

```python [main.py] {36-37,50|all}{maxHeight:'320px',at:+1}
import asyncio
import json
from pathlib import Path
from dotenv import load_dotenv
from agents import (Agent, Runner, function_tool,
                    set_default_openai_api, set_tracing_disabled)
from seed_faker import gerar_funcionarios

@function_tool
def buscar_salario(nome: str) -> str:
    """Busca o salário de um funcionário por nome de funcionário.
    Args:
        nome: Nome (ou parte do nome) do funcionário a procurar.
    """
    dados = json.loads(
        Path("funcionarios.json").read_text(encoding="utf-8"))
    for f in dados:
        if nome.lower() in f["nome"].lower():
            return f"Salário: R$ {f['salario']:.2f}"
    return "Funcionário não encontrado."

@function_tool
def calcular_folha_total() -> str:
    """Soma os salários de todos os funcionários (folha de pagamento)."""
    dados = json.loads(
        Path("funcionarios.json").read_text(encoding="utf-8"))
    total = sum(f["salario"] for f in dados)
    return f"Folha total: R$ {total:.2f}"

assistant = Agent(
    name="Assistente de RH",
    instructions=(
        "Responda dúvidas de RH e inclua os resultados de "
        "todas as chamadas de ferramentas na resposta final"
    ),
    tools=[buscar_salario, calcular_folha_total],
    tool_use_behavior="stop_on_first_tool",
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    gerar_funcionarios()

    result = await Runner.run(starting_agent=assistant,
        input="Qual é o total da folha de pagamento?")
    print(result.final_output)
    print(f"Chamadas ao modelo: {result.context_wrapper.usage.requests}")

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!IMPORTANT]
> A observabilidade é um tema importante em sistemas agênticos. 
> 
> É possível acompanhar a **quantidade de chamadas aos modelos** através do atributo `result.context_wrapper .usage.requests`

<!--
## cenário de uso 1: É comum sistemas agênticos lidar com dezenas de ferramentas. A possibilidade de controlar o loop agêntico é interessante para evitar chamadas de ferramentas desnecessárias.

## cenário de uso 2: economia de custo em segundas chamadas de modelos que normalmente só formatam a resposta. Se a ferramenta traz uma resposta pronta, talvez não faça sentido uma segunda chamada de LLM

## Com `tool_use_behavior="stop_on_first_tool"`, garanto que a segunda chamada ao LLM não será feita. A resposta da tool já é a resposta final do agente.

# stop_on_first_tool: o retorno da 1ª ferramenta é tratado como final_output; não há 2ª chamada de LLM para redigir a resposta.

# comparação (Questão 2): modo livre "run_llm_again" (padrão) = 2 chamadas ao modelo; stop_on_first_tool = 1 chamada. usage.requests confirma.

# result.context_wrapper.usage.requests = total de requisições feitas à API do modelo no run.

# trade-off: a resposta é o texto CRU da tool (sem o LLM formatar/explicar); ótimo quando a tool já devolve o resultado pronto.
-->
