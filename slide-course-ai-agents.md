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
addons:
  - slidev-component-pager
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
---

# Bibliografia do curso

::left::

<AssetImg src="book-building-agents-with-openai-sdk.jpg" class="rounded-lg h-70" />

::right::

<AssetImg src="book-an-illustrtated-guide.jpg" class="rounded-lg h-70" />

::bottom::
playlist: https://learning.oreilly.com/playlists/28c7e41a-c907-4940-8353-15994ad0d830

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Bibliografia do curso

::left::

<AssetImg src="book-generative-ai-in-action.jpg" class="rounded-lg h-70" />

::right::

<AssetImg src="book-beginning-chatgpt-for-python.jpg" class="rounded-lg h-70" />

::bottom::
playlist: https://learning.oreilly.com/playlists/28c7e41a-c907-4940-8353-15994ad0d830


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
layout: quote
---

::title::

# O que é um Agente?

::default::

“Um agente é qualquer coisa que possa ser vista como capaz de **perceber seu ambiente** por meio de sensores e **agir** sobre esse ambiente por meio de atuadores.”

— Stuart Russell e Peter Norvig, *Inteligência Artificial: Uma Abordagem Moderna*

---

## O que é o Antigravity?

<v-clicks>

- IDE **agent-first**: foi desenhada para você trabalhar *com* agentes de IA, não só escrever código.
- Tem três espaços principais, cada um com um propósito.

</v-clicks>

---

## 🧑‍💻 Editor

<v-clicks>

- Onde você escreve e edita código (como um VS Code).
- Tab Completion e Command vivem aqui (ver slide 1.3).
- É o espaço do trabalho **manual + assistido**.

</v-clicks>

---

## 🤖 Agent Manager

<v-clicks>

- Onde você **delega tarefas** a agentes que executam vários passos.
- Acompanha o progresso, planos e resultados do agente.
- É o espaço do trabalho **autônomo / supervisionado**.

</v-clicks>

---

## 🧪 Playground

<v-clicks>

- Espaço para **experimentar** prompts e ideias rapidamente.
- Testa comportamento de modelo/agente sem mexer no projeto.
- É o espaço da **exploração**.

</v-clicks>

---
layout: center
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
layout: cover
glowSeed: 7
---

# 1.4 — Projeto Python: venv + API key

**Subcompetência:** Configurar projeto Python com virtualenv e API key no Antigravity.

---

## Passo 1 — Criar o projeto e o ambiente virtual

```bash {1|2|3}
mkdir my_project
cd my_project
python -m venv .venv
```

> O `venv` isola as dependências do projeto.

---
layout: two-cols
layoutClass: gap-8
---

## Passo 2 — Ativar o venv

**macOS / Linux:**

```bash
source .venv/bin/activate
```

**Windows:**

```bash
.venv\Scripts\activate
```

::right::

## Passo 3 — Instalar o SDK

```bash
pip install openai-agents
```

---

## Passo 4 — Configurar a API key

**macOS / Linux:**

```bash
export OPENAI_API_KEY=sk-...
```

**Windows (PowerShell):**

```powershell
$env:OPENAI_API_KEY = "sk-..."
```

> A chave vem da plataforma da OpenAI. **Nunca** versione a chave no Git.

---
layout: center
---

## Resumo

```text {1|2|3|4}{lines:false}
python -m venv .venv          → cria o ambiente
source .venv/bin/activate     → ativa
pip install openai-agents     → instala o SDK
export OPENAI_API_KEY=...      → autentica
```

<div class="text-sm opacity-70 mt-4">

Fonte: OpenAI Agents SDK — *Quickstart* · <https://openai.github.io/openai-agents-python/quickstart/>

</div>

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
