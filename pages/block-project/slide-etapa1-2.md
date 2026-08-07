---
layout: section
routeAlias: etapa1-2
---

## Etapa 1.2 - Tema Relacionado
<br/>

### **Harness Engineering e Claude Code**

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel:
source: https://zhanghandong.github.io/harness-engineering-from-cc-to-ai-coding/en/
---

# Harness Engineering

#### **O termo "harness" vem de arnês, rédeas ou arreios de cavalo**

<div class="h-5" />

::left::

<div class="text-18px w-full self-start [&_ul]:my-1 [&_li]:mb-4">

- Um cavalo é veloz e forte, mas sem rédeas, corre sem rumo.
- O modelo de IA é o cavalo, com muita capacidade bruta, mas sozinho não se governa.
- O modelo é o motor. O harness é o carro.
- O harness é o conjunto de regras, limites e direções no agente que evitam que LLMs alucinem ou fuja do objetivo.

</div>

::right::

<div class="h-full flex items-start justify-center">
    <AssetImg src="harness-what-is.jpg" class="w-full max-w-[220px] rounded-lg mt-[0px]" />
</div>

<!--

## Um arnês (ou arreio) é um equipamento de fixação com tiras ou cintas que se prendem ao corpo de pessoas, animais ou objetos para garantir segurança, tração ou suporte em diversas atividades.

## Handong realizou uma análise detalhada do código do Claude Code vazado e trouxe uma visão detalhada de como funciona o harness do Claude Code em https://ccunpacked.dev/

## Handong defende que linguagens com sistemas de tipos fortes e compilador rigoroso como o Rust oferecem a "malha de verificação" (feedback loop) ideal para validar o código gerado por LLMs.

-->

---
layout: quote-image
image: /agent-harness.png
sourceLabel: LangChain
source: https://www.langchain.com/blog/the-anatomy-of-an-agent-harness
---

::title::

# O que é o Harness?

::default::

**Agente = LLM + Harness.**<br/><br/>
_Se você não é o modelo, você é o Harness._ Um harness é todo o código, configuração e lógica de execução que não é o próprio modelo."


— LangChain, 2026

<!--



-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: Terminal bench 2
source: https://www.tbench.ai/leaderboard/terminal-bench/2.1
---

# O harness é mais importante que o modelo?

#### **Alguns experimentos têm provado que o harness é mais importante que o modelo**

<div class="h-2" />

::left::

<div class="text-18px w-full self-start [&_ul]:my-1 [&_li]:mb-4">

- O ranking do Terminal Bench 2.0 evidencia que **um mesmo LLM** pode ter pontuações muito distintas **em harness diferentes**.
- A LangChain melhorou um agente de codificação do top 30 para o top 5 no Terminal Bench 2.0 **apenas alterando o harness**, mantendo **o mesmo modelo**.
- O harness do **Claude Code** e **Codex** são os dois harness mais avançados do mundo.

</div>

::right::

<div class="h-full flex items-start justify-center">
    <AssetImg src="terminal-bench.png" class="w-full max-w-[350px] rounded-lg mt-[40px]" />
</div>


<!--
## O TerminalBench-2 avalia agentes de IA em 89 tarefas complexas em ambiente de linha de comando (CLI).

## existe também o índice geral artificial anallysis para área de agentes

-->

---
sourceLabel: Claude Code
source: https://claude.com/product/claude-code
---

# Claude Code

#### **O Claude Code existe via CLI, _IDE Extension_, Claude Desktop, Claude Mobile, Claude.ai**

<div class="h-3" />

<Transform :scale="0.85" origin="center">
    <AssetImg
    src="claude-code.png"
    class="rounded-lg border-0 border-white"
    />
</Transform>

<!--

## instalar a extensão do Claude Code via marketplace do Antigravity
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: 9Router
source: https://9router.dev
---

# 9Router

#### **O 9Router permite usar o melhor harness (Claude Code) com vários LLMs**

<div class="h-0" />

::left::

<div class="text-18px w-full self-start [&_ul]:my-8 [&_li]:mb-4">

- É um roteador que conecta seu harness (agente de codificação) com mais de 60 provedores de LLM, inclusive gratuitos
- Compatível com a maioria dos agentes de codificação (Copilot, Claude Code, Codex, Cursor, etc)
- Mais de 24 mil estrelas no Github

</div>

::right::

<div class="h-full flex items-start justify-center">
    <AssetImg src="9router.jpg" class="w-full max-w-[350px] rounded-lg mt-[40px]" />
</div>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
source: http://localhost:20128
sourceLabel: 9Router
---

# 9Router - configuração

#### **O 9Router pode ser instalado usando os gerenciadores npm ou pnpm**

::left::

> [!TIP]
> Verifique se você tem o npm ou pnpm instalado usando o comando `npm --version` ou `pnpm --version` 

::right::

<WindowMockup color="dark" padding="0.5rem 0.5rem 0.5rem 0.5rem" title="prompt" codeblock>

```md
pnpm install -g 9router

9router

# acessar http://localhost:20128/login

# 1 - criar api key

# 2 - Menu Provedores -> provedor Antigravity

# 3 - Menu Ferramentas CLI -> Claude Code (para usar 9router)
```
</WindowMockup>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
source: https://code.claude.com/docs/en/memory#claude-md-files
sourceLabel: Claude.md
---

# Sobre o CLAUDE.md

#### **O arquivo CLAUDE.md permite definir regras, preferências e contextos do seu projeto**

<div class="h-0" />

::left::

<div class="text-16px w-full self-start [&_ul]:my-2 [&_li]:mb-4">

- É análogo aos arquivos **GEMINI.md** (Antigravity) e **AGENTS.md** (Codex) na raiz do projeto ou por subdiretórios
- É carregado no início de cada sessão (nova conversa)
- Pode conter convenções de código, regras de projeto, instruções de build/test, arquitetura, bibliotecas preferidas, restrições, etc
- Não é indicado que tenha muitas linhas, e pode ser usado como índice para outros arquivos

</div>

::right::

<div class="h-full flex items-start justify-center">
    <AssetImg src="claude-md.png" class="w-full max-w-[350px] rounded-lg mt-[40px]" />
</div>

<!--

## dar o exemplo de verificação no CLAUDE.md usando check de compilação usando `uvx ruff check main.py`

-->