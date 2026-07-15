---
theme: dracula
title: "Agentes com Python"
info: |
  Fundamentos de Agentes com Python e APIs
  Desenvolvimento de Agentes Inteligentes
colorSchema: dark
fonts:
  sans: DM Sans
  weights: "200,400,600,700"
highlighter: shiki
lineNumbers: true
transition: fade-out
comark: true
layout: cover
glowSeed: 229
footer: false
presenter: true
drawings:
  presenterOnly: true
addons:
  - slidev-component-pager
  - window-mockup
  - slidev-addon-python-runner
# Optional configuration for this runner
python:
  # Install packages from PyPI. Default: []
  installs: []

  # Automatically load the imported builtin packages. Default: true
  loadPackagesFromImports: true

  # Disable annoying warning from `pandas`. Default: true
  suppressDeprecationWarnings: true

  # Always reload the Python environment when the code changes. Default: false
  alwaysReload: false

  # Options passed to `loadPyodide`. Default: {}
  loadPyodideOptions: {}
---

# Fundamentos de Agentes com Python e APIs

Desenvolvimento de Agentes Inteligentes

<!-- ##### Prof. Júlio César Guimarães -->

<!--
nota 123
-->

---

# Ementa do curso

- **Etapa 1** — Introdução
- **Etapa 2** — OpenAI Agents SDK
- **Etapa 3** — Configuração de Agentes
- **Etapa 4** — Otimização de Agentes
- **Etapa 5** — Uso de Ferramentas
- **Etapa 6** — Modelos Pydantic
- **Etapa 7** — Agentes com Memória
- **Etapa 8** — Memória Persistente
- **Etapa 9** — Agentes Assíncronos

<!--
Ementa do curso — visão geral das 9 etapas.
-->

---
title: Sobre mim
layout: custom-author
imageSide: right
---

::title::
# Júlio César Guimarães

::image::
![image](https://github.com/jcguimaraesnet.png?size=500)

::default::
- Professor desde 2020 no Infnet
- Mestrando em EngSoft com IA (UFRJ)
- MBA em Engenharia de Software (UFRJ)
- \+ 20 anos de experiência
- \+ 10 Certificações Microsoft
- 6x MCT (Microsoft Certified Trainer)



::links::
<div><logos-linkedin-icon /> <a href="https://linkedin.com/in/jcguimaraesnet" target="_blank">linkedin.com/in/jcguimaraesnet</a></div>

<div><GitHubIcon /> <a href="https://github.com/jcguimaraesnet" target="_blank">jcguimaraesnet</a></div>

<!--
nota 123
-->


---
layout: image-x
imageOrder: 2
glowSeed: 314
image: /pessoas-apresentacao.jpg
---

::title::

# Apresentação

::default::

- Estágio?
- Transição de carreira?
- Desenvolve?
- Expectativa?


---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: playlist
source: https://learning.oreilly.com/playlists/28c7e41a-c907-4940-8353-15994ad0d830
---

# Bibliografia do curso

::left::

<AssetImg src="book-building-agents-with-openai-sdk.jpg" class="rounded-lg h-70" />

::right::

<AssetImg src="book-an-illustrtated-guide.jpg" class="rounded-lg h-70" />

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: playlist
source: https://learning.oreilly.com/playlists/28c7e41a-c907-4940-8353-15994ad0d830
---

# Bibliografia do curso

::left::

<AssetImg src="book-generative-ai-in-action.jpg" class="rounded-lg h-70" />

::right::

<AssetImg src="book-beginning-chatgpt-for-python.jpg" class="rounded-lg h-70" />


---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Bibliografia do curso

::left::

<div class="flex flex-col items-center gap-4">
  <teenyicons-doc-outline class="text-7xl text-cyan-400" />
  <a href="https://openai.github.io/openai-agents-python/" target="_blank">openai.github.io/openai-agents-python</a>
</div>

::right::

<div class="flex flex-col items-center gap-4">
  <teenyicons-doc-outline class="text-7xl text-cyan-400" />
  <a href="https://antigravity.google/docs/ide/overview" target="_blank">antigravity.google/docs/ide/overview</a>
</div>


---
layout: section
---

## **Conceitos**: o que é um Agente?




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
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Prompts e Agentes

#### **Prompts definem o papel do agente e o que deve fazer**

::left::

- **Persona** → Direciona a área de atuaçao
- **Task** → Define o objetivo
- **Context** → regras, restrições, conhecimento
- **Format** → saída estruturada

::right::

<WindowMockup color="dark" padding="0.5rem 0.5rem 0.5rem" title="prompt.md" codeblock>

```md
# Você é um especialista em ...

# Sua tarefa é ...

# Considere a informação abaixo ...

# Retorne no formato JSON abaixo ...
```

</WindowMockup>


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

# Mais sobre o gerenciado UV

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

## Meu primeiro **Agente** de Inteligência Artificial


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
    await main()
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

# OpenAI Agents SDK

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

::left::

```python {all|4|5|7-10|12-15|17-19|7-19|all}{at:+1}
from agents import Agent

Engineer_agent = Agent(
    name="Software Engineer Agent"
    model="gpt-5.4-mini"
    instructions="""
        # Papel
        Você é um agente de IA 
        especialista em engenharia 
        de software.

        # Tarefa
        Sua tarefa consiste em 
        responder perguntas 
        sobre engenharia de software.

        # Formato de saída
        Responda de forma objetiva 
        com tom informal.
    """
)
```
::right::

**Agent** é uma camada fina que transforma um LLM em um agente autônomo. 

- *name* -> identificador do agente
- *model* -> id do modelo; que dá inteligência
- *instructions* -> prompt de instrução

<br/>

<v-click at="+6">

> [!TIP]
> **instructions** -> existem muitos padrões proposto para elaboraçao de prompts estruturados. 
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




async def main():
  agent = Agent(name="Assistant", 
                instructions="You are an AI agent",
                model="gpt-4o")

  result = await Runner.run(agent, "Tell me a joke")

  print(result.final_output)

if __name__ == "__main__":
    await main() 
    
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Runner
source: https://openai.github.io/openai-agents-python/ref/run/
---

::left::

```python {11-16}{at:+1}
from agents import Agent, Runner

async def main():
    Engineer_agent = Agent(
        name="Software Engineer Agent"
        model="gpt-5.4-mini"
        instructions="""Você é especialista em 
        engenharia de software."""
    )

    result = await Runner.run(
        starting_agent=agent, 
        input="""
            Quais são os tipos de padrões 
            de projetos usados em programação?
        """)
    print(result.final_output)

if __name__ == "__main__":
    await main() 
```



::right::

**Runner** é o mecanismo de execução dos agentes, gerenciando chamadas LLMs, impondo limites de segurança e realizando transferencia de tarefas (handoff) entre agentes.

- *starting_agent* -> O agente inicial.
- *input* -> A solicitação (prompt) para o agente.



<p>&nbsp;</p>

<v-click>

**Existem 3 opções para executar um Runner.**

::code-group

```python [assincrono] {2}
agent = Agent(name="Assistant", instructions="")
result = await Runner.run(agent, "Input")
```

```python [sincrono] {2}
agent = Agent(name="Assistant", instructions="")
result = Runner.run_sync(agent, "Input")
```

```python [stream] {2}
agent = Agent(name="Assistant", instructions="")
result = Runner.run_streamed(agent, "Input")
```



::

</v-click>

<!-- 

<v-click>

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
class: flex items-center justify-center
---

# Criando API Key

#### **Os provedores mais conhecidos de modelos de IA: OpenAI, Anthropic e Google**

::left::

<div class="text-left w-full">

Cadastre e crie uma API Key em um provedor: 
- [platform.openai.com](https://platform.openai.com)
- [console.cloud.google.com](https://console.cloud.google.com)

<br/>

<v-click>

> [!TIP]
> plataformas do tipo **Gateway de LLM** como a _[openrouter.ai](https://openrouter.ai)_ são interessantes para acessar família de modelos de vários provedores (Anthropic, Google, OpenAI, Deepseek). 

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

-->

---

## Diferença entre APIs de LLM

---

## IDE com Agente de Codificação


---

## Live Coding


---

## Hands-on

- Exercício 1
- Exercício 2
- Exercício 3

---

## Etapa 2


---

## Resumo

| Espaço | Para quê |
|--------|----------|
| Editor | Escrever/editar código |
| Agent Manager | Delegar e acompanhar agentes |
| Playground | Experimentar rápido |

---
layout: cover
glowSeed: 105
---

# 1.2 — Planning Mode vs Fast Mode

**Subcompetência:** Distinguir Planning Mode e Fast Mode do Antigravity por tipo de tarefa.

---

## A ideia

O Antigravity tem dois modos de trabalho do agente.

**Escolher o modo certo = velocidade + qualidade.**

---
layout: two-cols
layoutClass: gap-8
---

## 🗺️ Planning Mode

- O agente **planeja antes de agir**: quebra a tarefa em passos.
- Você revisa o plano e aprova.
- Melhor para tarefas **grandes, ambíguas ou de vários arquivos**.

> Ex.: "refatorar este módulo", "criar a estrutura do projeto".

::right::

## ⚡ Fast Mode

- O agente **age direto**, sem etapa de planejamento.
- Resposta mais rápida, menos cerimônia.
- Melhor para tarefas **pequenas e bem definidas**.

> Ex.: "renomeie esta variável", "escreva esta função simples".

---
layout: center
---

## Como escolher

| Pergunta | Modo |
|----------|------|
| Tarefa grande ou ambígua? | **Planning** |
| Mexe em vários arquivos? | **Planning** |
| Tarefa pequena e clara? | **Fast** |
| Quero resposta imediata? | **Fast** |

---
layout: cover
glowSeed: 180
---

# 1.3 — Tab Completion e Command

**Subcompetência:** Gerar código com Tab Completion e Command no editor do Antigravity.

---

## Duas formas de gerar código no Editor

<v-clicks>

- **Tab Completion** → enquanto você digita.
- **Command** → quando você pede em linguagem natural.

</v-clicks>

---
layout: two-cols
layoutClass: gap-8
---

## ⌨️ Tab Completion

- A IA **sugere o próximo trecho** de código.
- Você aceita pressionando **Tab**.
- Fluxo contínuo: você digita, ela completa.

> Ótimo para repetições, boilerplate e linhas previsíveis.

::right::

## 💬 Command

- Você seleciona um trecho e **descreve a mudança** em linguagem natural.
- A IA reescreve/gera o código no lugar.

> Ex.: "transforme este loop em list comprehension", "adicione tratamento de erro aqui".

---
layout: center
---

## Quando usar cada um

| Situação | Ferramenta |
|----------|-----------|
| Continuar digitando | **Tab Completion** |
| Pedir uma mudança específica | **Command** |
| Gerar algo do zero por instrução | **Command** |


---

## Configurar a API key


> A chave vem da plataforma da OpenAI. **Nunca** versione a chave no Git.


---
layout: cover
glowSeed: 256
---

# 1.5 — async / await e asyncio.run()

**Subcompetência:** Aplicar async/await e asyncio.run() em chamadas assíncronas ao Agents SDK.

---

## Por que assíncrono?

<v-clicks>

- Chamar um modelo é uma operação de **espera** (rede).
- Código assíncrono não trava o programa enquanto espera a resposta.
- `Runner.run(...)` é **assíncrono** → precisa de `await`.

</v-clicks>

---

## As três peças

| Palavra | Função |
|---------|--------|
| `async def` | declara uma função assíncrona (corrotina) |
| `await` | espera o resultado sem bloquear |
| `asyncio.run()` | inicia o loop e executa a corrotina |

---

## Exemplo mínimo

```python {all|1|3|5-7|9-10}
import asyncio
from agents import Agent, Runner

agent = Agent(name="Assistant", instructions="You are a helpful assistant")

async def main():
    result = await Runner.run(agent, "Write a haiku about recursion in programming.")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

---

## O fluxo

<v-clicks>

1. `asyncio.run(main())` liga o loop de eventos.
2. Dentro de `main`, o `await` espera o `Runner.run`.
3. Quando a resposta chega, seguimos para o `print`.

</v-clicks>

<div v-click class="mt-4">

> `await` só pode ser usado **dentro** de uma função `async def`.

</div>

---

## Alternativa síncrona

Sem querer lidar com async? Use `Runner.run_sync` (ver slide 1.6):

```python
result = Runner.run_sync(agent, "Write a haiku about recursion.")
print(result.final_output)
```

<div class="text-sm opacity-70 mt-4">

Fonte: OpenAI Agents SDK — *Running agents* · <https://openai.github.io/openai-agents-python/running_agents/>

</div>

---
layout: cover
glowSeed: 338
---

# 1.6 — O primeiro agente: Agent e Runner

**Subcompetência:** Construir o primeiro agente com Agent e Runner no Antigravity IDE.

---

## Dois conceitos centrais

<v-clicks>

- **`Agent`** → *o que* é o agente (nome + instruções + modelo).
- **`Runner`** → *executa* o agente sobre uma entrada.

</v-clicks>

---

## Definir o agente

```python {all|2|4-5|all}
from agents import Agent

agent = Agent(
    name="History Tutor",
    instructions="You answer history questions clearly and concisely.",
)
```

- `name` → identifica o agente.
- `instructions` → o "system prompt": define o papel/comportamento.
- `model` (opcional) → ex. `model="gpt-5-nano"`.

---
layout: two-cols
layoutClass: gap-8
---

## Executar (assíncrono)

```python
import asyncio
from agents import Agent, Runner

async def main():
    result = await Runner.run(
        agent,
        "When did the Roman Empire fall?",
    )
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

## Executar (síncrono)

```python
from agents import Agent, Runner

agent = Agent(
    name="Assistant",
    instructions="You are a helpful assistant",
)

result = Runner.run_sync(
    agent,
    "Write a haiku about recursion.",
)
print(result.final_output)
```

> `run_sync` apenas roda o `run` por baixo dos panos.

---

## Métodos do Runner

| Método | Tipo | Quando usar |
|--------|------|-------------|
| `Runner.run` | assíncrono | caso geral (com `await`) |
| `Runner.run_sync` | síncrono | scripts simples, sem async |
| `Runner.run_streamed` | streaming | resposta em tempo real |

---
layout: center
---

## O resultado

- `result.final_output` → a resposta final em texto.
- `result.last_agent` → qual agente respondeu.

```python
print(result.final_output)
print(f"Answered by: {result.last_agent.name}")
```

<div class="text-sm opacity-70 mt-4">

Fonte: OpenAI Agents SDK — *Quickstart* e *Running agents* · <https://openai.github.io/openai-agents-python/quickstart/>

</div>
