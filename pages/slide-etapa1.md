---
layout: section
routeAlias: etapa1
---

## **Etapa 1:** introdução




---
layout: quote-image
image: /agent-3-components.png
---

::title::

# O que é um Agente?

::default::

"Um **agente** é composto por três componentes principais: *cérebro*, *percepção* e *ação*."


— Xi et. al. "The Rise and Potential of Large Language Model Based Agents: A Survey”, 2025



---
layout: quote
---

::title::

# O que é um Agente?

::default::

“Um agente é qualquer coisa que possa ser vista como capaz de perceber seu ambiente por meio de **sensores** e agir sobre esse ambiente por meio de **atuadores**.”

— Stuart Russell e Peter Norvig, *Inteligência Artificial: Uma Abordagem Moderna*


---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# O que é um Agente?
#### **Agentes de IA são mais poderoso que chatbots de IA**

::left::

- **sensores** -> capta informação (prompt, texto, documentos, imagens, arquivos, markdown, html, etc)
- **autuadores** -> usa *ferramentas* para agir sobre o ambiente (invocar API, executar código, navegar em páginas web, etc)

::right::

<Transform :scale="1.2" origin="center center">
    <AssetImg
    src="agentes-sensores-autuadores.png"
    class="rounded-lg max-w-none w-[500px] border-10 border-white"
    crop-left="95px"
    crop-right="145px"
    />
</Transform>



---
layout: default
sourceLabel: Lista completa
source: https://openrouter.ai/models
---

# Large Language Models (LLMs)

#### **O cérebro dos agentes são os LLMs**

<br/>

|  descrição   |  OpenAI   |  Google   |
| --- | --- | --- |
| rápido e econômico | **gpt-5.6-luna** | **gemini-3.1-flash-lite** |
| equilíbrio | **gpt-5.6-terra** | **gemini-3.5-flash** |
| raciocínio complexo | **gpt-5.6-sol** | **gemini-3.1-pro** |
| imagens | **gpt-image-2** | **gemini-3.1-flash-image** |
| | [developers.openai.com](https://developers.openai.com/api/docs/models) | [ai.google.dev](https://ai.google.dev/gemini-api/docs/models) |


---
layout: section
---

## Instalação e configuração de **ambiente**

<!--

Parar a aula e pedir alunos

-->


---
sourceLabel: Downloads
source: https://www.python.org/downloads/
---

# Versões do Python

#### **Use sempre versões estáveis (fase de bugfix)**



<Transform :scale="0.7" origin="center">
    <AssetImg
    src="release-cycle.svg"
    class="rounded-lg border-10 border-white"
    />
</Transform>


<!-- 
Python tem um ciclo de cinco fases com versão estável (bugfixes) a cada dois meses 

**Cinco fases**: 
- feature, 
- prerelease, 
- bugfix, 
- security, 
- end-of-life
-->

---
layout: default
sourceLabel: Install UV
source: https://docs.astral.sh/uv/getting-started/installation
---

# Instalação Python e UV

<br/>

#### **Instalação do Python em múltiplas plataformas**

<br/>

::code-group

```sh [cross plataform]
uv python install 3.12
```

```sh [windows]
winget install --id Python.Python.3.12 --scope user
```

```sh [linux]
sudo apt-get install -y python3.12
```

```sh [macOS]
brew install python@3.12
```

```sh [instalador]
python-*.exe ou python-*.pkg
```
::

<br/><br/>

#### **Instalação UV: uma opção rápida e simplificada para gerenciar projetos python**
<br/>


::code-group

```sh [windows]
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

```sh [macOS/linux]
curl -LsSf https://astral.sh/uv/install.sh | sh
```

::



---
layout: default
sourceLabel: Install UV
source: https://docs.astral.sh/uv/getting-started/installation
footer: true
---

# Gerenciador de projetos UV

#### **uv é um gerenciador de projetos ultrarrápido escrito em Rust pela Astral (OpenAI)**

<br/>

| | |  |
| --- | --- | --- |
| instalação python | `instalador oficial` | ```uv python install``` |
| versão python | `python --version` | ```uv run python --version``` |
| criar ambiente/projeto | `python -m venv .venv` | `uv init <projeto>` |
| ativar ambiente virtual | `.venv/Scripts/activate` | ``-`` *(automático)* |
| instalar pacote | `pip install <pacote>` | ```uv add <pacote>``` |
| executar script | `python script.py` | ```uv run script.py``` |


<!--
instalação:
https://docs.astral.sh/uv/getting-started/installation/

wsl: curl -LsSf https://astral.sh/uv/install.sh | sh

powershell: <br/>
```powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"```

-->


---
layout: default
sourceLabel: Install UV
source: https://docs.astral.sh/uv/getting-started/installation
footer: true
---

# Mais sobre o gerenciador UV

#### **Mais rápido e mais simples**

<br/>

| | |  |
| --- | --- | --- |
| criar projeto | `-` *não tem* | ```uv init <projeto>``` |
| congelar pacotes | `pip freeze > requirements.txt` | `automático` *arquivo uv.lock* |
| arquivo do projeto | `requirements.txt` | ```pyproject.toml``` |
| recriar ambiente | `pip install -r requirements.txt` | `uv sync` |


<!-- 
usando forma tradicional para recriar ambiente:
pip install -r requirements.txt (só instala)

Usando UV para recriar ambiente respeitando o lock:
uv sync (instala, desinstala e atualiza) 
-->


---
layout: section
---

## Meu primeiro **Agente** de IA
**Configuração e princípios básicos**


---
layout: default
sourceLabel: Install UV
source: https://docs.astral.sh/uv/getting-started/installation
---

# Configuração do projeto Python

#### **Meu primeiro agente de IA**

<br/>

::code-group

```sh [uv]
mkdir my-first-agent
cd my-first-agent
uv python install 3.14
uv init --python 3.14
uv add openai-agents python-dotenv
echo "OPENAI_API_KEY=sk-proj-xxxxxxxx" >> .env
echo "GEMINI_API_KEY=AIzaSyxxxxxxxx" >> .env
uv run main.py
```

```sh [pip]
mkdir my-first-agent
cd my-first-agent
python -m venv .venv
source .venv/bin/activate
pip install openai-agents python-dotenv
echo "OPENAI_API_KEY=sk-proj-xxxxxxxx" >> .env
echo "GEMINI_API_KEY=AIzaSyxxxxxxxx" >> .env
pip freeze > requirements.txt
python main.py
```
::


<!-- 
o comando abaixo substitui tres linhas de comandos:
```shell
uv init my-first-agent --python 3.12
```
```shell
mkdir my-first-agent
uv python install 3.14
uv init --python 3.14
```
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Install UV
source: https://docs.astral.sh/uv/getting-started/installation
---

# Chamadas síncronas e assíncronas em Python

#### **Chamadas assíncronas 'não melhora' perfomance, mas permite concorrência**

::left::

```python {none|5|9-11|14}{at:+1}
import time
t = time.perf_counter()

def download(file):
    time.sleep(5)  # ⛔ trava tudo
    print(f"{time.perf_counter()-t:.0f}s ✓{file}")

def main():
    download("A")
    download("B")
    download("C")

if __name__ == "__main__":
    main()
```


::right::

```python {none|5|8-11|14}{at:1}
import asyncio, time
t = time.perf_counter()

async def download(file):
    await asyncio.sleep(5)  # ✅ libera a thread
    print(f"{time.perf_counter()-t:.0f}s ✓{file}")

async def main():
    await asyncio.gather(
        download("A"), download("B"), download("C")
    )

if __name__ == "__main__":
    asyncio.run(main())
```



---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Install UV
source: https://docs.astral.sh/uv/getting-started/installation
---

# Demo: chamada síncrona x assíncrona

#### **Chamada assíncrona otimiza o tempo de ociosidade, executando outras tarefas**

::left::

```python {monaco-run} {autorun: false, height: 'auto'}
import time
t = time.perf_counter()

def download(file):
    time.sleep(5)  # ⛔ trava tudo
    print(f"{time.perf_counter()-t:.0f}s ✓{file}")

def main():
    download("A")
    download("B")
    download("C")

main()

```


::right::

```python {monaco-run} {autorun: false, height: 'auto'}
import asyncio, time
t = time.perf_counter()

async def download(file):
    await asyncio.sleep(5)  # ✅ libera a thread
    print(f"{time.perf_counter()-t:.0f}s ✓{file}")

async def main():
    await asyncio.gather(
        download("A"), download("B"), download("C")
    )

await main()

```


<!-- 
não é possível usar asyncio.run(main()) porque o código já envelopado em Pyodide 

await não significa "espere aqui". Significa "posso ser interrompido aqui — vá fazer outra coisa enquanto isso". É contraintuitivo pela palavra, e é a fonte de metade da confusão com async. 

código assincrono começa ter ganho a longo prazo, quando as chamadas começam a empilhar

#### sobre guarda de execução:
_não existe entrypoint no python_ 
```
uv run main.py
# python prenche com:
 __name__ = "__main__"
```

```
import main
# python preenche
 __name__ = "main"
```

-->

---
layoutClass: gap-8
sourceLabel: OpenAI Agents Sdk
source: https://openai.github.io/openai-agents-python
---

# SDK e Frameworks para agentes de IA

<Transform :scale="0.7">

| **Framework / SDK** | **Repositório** | **Estrelas**⭐ | **Cenário** |
|-----------------|-------------|------------|:---|
| LangChain | [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 139.663 | Genérico |
| AutoGen (Microsoft) | [microsoft/autogen](https://github.com/microsoft/autogen) | 59.062 | Em fusão |
| CrewAI | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | 53.924 | Multiagente |
| LlamaIndex | [run-llama/llama_index](https://github.com/run-llama/llama_index) | 50.218 | RAG |
| LangGraph | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 35.162 | Líder, baseado em Grafo |
| Semantic Kernel (Microsoft) | [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) | 28.160 | Em fusão |
| smolagents (Hugging Face) | [huggingface/smolagents](https://github.com/huggingface/smolagents) | 27.927 | Minimalista, simplicidade |
| **OpenAI Agents SDK** | [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | 27.248 | Provedor |
| Google ADK | [google/adk-python](https://github.com/google/adk-python) | 20.172 | Provedor |
| Pydantic AI | [pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) | 17.844 | Tipagem Pydantic |

</Transform>

<!--
- o llamaIndex teve novas funcionalidades para fluxo agentico, mas nasceu com identidade para RAG - comunidade mais ativa para RAG
- Langchain direciona fluxos agenticos para LangGraph
- 
-->


---
layoutClass: gap-8
sourceLabel: OpenAI Agents SDK
source: https://openai.github.io/openai-agents-python
---

# OpenAI Agents SDK

#### **Principais abstrações (primitivos)**

<br/>

<Transform :scale="0.8">

<v-clicks every="2">

| Conceito | O que é |
|---|---|
| **Agent** | Um LLM com nome, instruções, ferramentas e possíveis _handoffs_ — o agente em si. |
| **Runner** | Motor de execução: roda o loop de raciocínio, faz _retries_ e impõe limites de segurança. |
| **Tools** | Funções Python (ou APIs/agentes) que o modelo descobre e invoca quando necessário. |
| **Handoffs** | Delegação de controle e do contexto de um agente para outro (fluxos multiagente). |
| **Guardrails** | Checagens de política em cada passo, mantendo saídas e chamadas dentro das regras. |
| **Tracing** | Logs estruturados de prompts, respostas e chamadas — para _debug_ e observabilidade. |

</v-clicks>

</Transform>


---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Agent
source: https://openai.github.io/openai-agents-python/agents/
---

# Um agente básico

#### **Agent é o primitivo mais elementar e usado no SDK Agents da OpenAI**

::left::

```python [main.py] {all|4|5|6-7|all}{at:+1}

from agents import Agent

agent = Agent(
    name="Software Engineer Agent",
    model="gpt-5.4-mini",
    instructions=("Você é um agente de IA especialista "
                  "em engenharia de software."),
)
```
::right::

**Agent** é uma camada fina que define quem o agente é o que ele deve fazer. Os três parâmetros abaixo são necessários para uma definição inicial de agente.

- *name* -> identificador do agente
- *model* -> id do modelo; que dá inteligência
- *instructions* -> prompt de instrução



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
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Runner
source: https://openai.github.io/openai-agents-python/ref/run/
---

# Runner para executar agentes

#### **Runner é o mecanismo de execução dos agentes**

::left::

```python {11-16}{maxHeight:'320px',at:+1}
from agents import Agent, Runner

async def main():
    agent = Agent(
        name="Software Engineer Agent",
        model="gpt-5.4-mini",
        instructions="""Você é especialista em engenharia 
            de software."""
    )

    result = await Runner.run(
        starting_agent=agent, 
        input="""
            Quais são os tipos de padrões 
            de projetos usados em programação?
        """)
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```



::right::

Além de executar os agentes, gerencia chamadas LLMs, e realiza orquestração entre agentes.

- *starting_agent* -> O agente inicial.
- *input* -> A solicitação (prompt) para o agente.


<!-- 

<v-click>

RESERVAR ISSO PARA ETAPA 5

> [!TIP]
> O runner é um workflow, executado na forma de um **loop**, até que uma saída final seja gerada.

</v-click>

O runner executa esses passos na forma de um loop:

1. O agente é invocado com a entrada fornecida.
2. Se houver uma saída final, o loop termina.
3. Se houver handoff, o loop é executado novamente.
4. Se houver chamadas de ferramentas, o loop é executado novamente.

A regra para determinar se a saída do LLM é considerada uma "saída final" é que ela produza um texto com o tipo desejado e não haja chamadas de ferramentas.

fonte: https://openai.github.io/openai-agents-python/ref/run/
fonte: https://openai.github.io/openai-agents-python/running_agents/

-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Running agents
source: https://openai.github.io/openai-agents-python/running_agents/
---

# Runner assíncrono e síncrono

::left::

```python [Runner assíncrono]
import asyncio
from agents import Agent, Runner

agent = Agent(name="Software Engineer Agent",
        instructions=("Você é especialista "
        "em engenharia de software."))

async def main():
    result = await Runner.run(
        agent, "O que é injeção de dependência?")
    print(result.final_output)

asyncio.run(main())
```

::right::

```python [Runner síncrono]
from agents import Agent, Runner

agent = Agent(
    name="Software Engineer Agent",
    instructions=("Você é especialista "
                  "em engenharia de software."))

result = Runner.run_sync(
    agent, "O que é injeção de dependência?")

print(result.final_output)

```

::bottom::

<Transform :scale="0.7" origin="top left">

> [!TIP]
> Prefira a forma **assíncrona** já que fluxos agenticos dependem de chamadas de LLM (rede).

</Transform>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Criação de API Key na plataforma da OpenAI

#### **OpenAI, Anthropic e Google fornecem experiências parecidas para criação de Api Key**

::left::

<div class="text-left w-full">

Na plataforma da OpenAI é possível criar e administrar **Api Key**, formas de pagamento, adicionar créditos, acompanhar custos e traces.
- [platform.openai.com](https://platform.openai.com)


<br/>

<v-click>

> [!TIP]
> Nesta primeira etapa teremos uma experência inicial com a OpenAI, provedor e líder de mercado. Na segunda etapa iremos escolher outro provedor ou agregador independente.




</v-click>

</div>



::right::

<Transform :scale="1.4" origin="center">
    <AssetImg
    src="openai-plataform-developer.png"
    class="max-w-none w-[400px] border-0 border-white"
    crop-left="2px"
    crop-right="115px"
    />
</Transform>


<!--

1. Acessar: https://platform.openai.com
1. Cadastrar
2. Acessar profile: https://platform.openai.com/settings/organization/billing/overview
3. Adiciona crédito
4. Criar API Key
5. No hand-ons disponibilizar chave temporária para alunos - explicar que na segunda etapa vamos decidir

plataformas do tipo **Gateway de LLM** como a _[openrouter.ai](https://openrouter.ai)_ são interessantes para acessar família de modelos de vários provedores (Anthropic, Google, OpenAI, Deepseek). 

-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Antigravity IDE

#### **IDE da Google para desenvolvimento de software com agente de codificação**

::left::

<div class="text-left w-full">

Download e documentação em:
- [antigravity.google/download](https://antigravity.google/download#antigravity-ide)
- [antigravity.google/docs/ide/overview](https://antigravity.google/docs/ide/overview)

<br/>

<v-click>

> [!TIP]
> A Google decidiu dividir o produto Antigravity em dois: Antigravity 2.0 e Antigravity IDE. 

</v-click>

</div>

::right::

<Transform :scale="0.9" origin="center">
    <AssetImg
    src="ide-google-antigravity.png"
    class="rounded-lg"
    />
</Transform>

<!-- 
- checar se todos tem o Antigravity instalado
- mostrar rapidamente o chatbot agentico
 -->

---
layout: section
---

## Live Coding

🤖 &nbsp;**Agente 1:** um agente para responder um Hello Word

🤖 &nbsp;**Agente 2:** um agente de Q&A para assuntos de engenharia de software

<!--
=================================================================
AGENTE 1 — Hello World

```python
import os
from dotenv import load_dotenv
from agents import Agent, Runner

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    print("Error: OPENAI_API_KEY not found. Please set it in your.env file.")
else:
    print("API Key loaded successfully.")

agent = Agent(name="Echo Agent", instructions="Return the words 'Hello Word!'")
result = Runner.run_sync(agent, "Run agent")
print(result.final_output)
```

=================================================================
AGENTE 2 — Q&A de engenharia de software

O código que estava nesta nota era uma cópia idêntica do Agente 1 (o Echo Agent
do Hello Word), então o Q&A ainda precisa ser escrito. Partindo do Agente 1,
muda só o miolo:

```python
agent = Agent(
    name="QA Agent",
    instructions="Você é um especialista em engenharia de software. Seja objetivo.",
)
result = Runner.run_sync(agent, "O que é injeção de dependência?")
print(result.final_output)
```

>>> O gancho: mesmo esqueleto, muda só o instructions e a pergunta.
-->  

---
layout: default
---

# Hands-on

<br/>

🤖 &nbsp;**Exercício \#1:** Agente para responder Hello Word

🤖 &nbsp;**Exercício \#2:** Agente de QA para qualquer assunto

🤖 &nbsp;**Exercício \#3:** Crie duas versões de um agente: síncrono e assíncrono

🤖 &nbsp;**Exercício \#4:** Rode o mesmo agente em dois provedores gratuitos

- [ ] download antigravity
- [ ] crie projeto
- [ ] instale uv/python
- [ ] adicione os pacotes
- [ ] crie a API KEY na OpenAI `ou use do professor`
- [ ] use as classes Agent e Runner

<br/>

<!--
Criar uma chave aleatória e exclusiva para usar somente nesta aula. Explique na próxima etapa que cada aluno escolherá um provedor final.
-->