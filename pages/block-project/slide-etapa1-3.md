---
layout: section
routeAlias: etapa1-3
---

## Etapa 1.3 - Tema Relacionado
<br/>

### **Prompt Engineering e Evals**


---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
source: https://arxiv.org/abs/2201.11903v6
---

# Chain of Thought (CoT)

#### **CoT foi apresentado por pesquisadores Google e sua pesquisa tem mais de 37k citações**

<div class="h-2" />

::left::

<div class="text-18px w-full self-start [&_ul]:my-0 [&_li]:mb-4">

- O CoT é apresentado como **uma técnica** para **aprimorar o raciocínio** em modelos de linguagem
- A técnica consiste em fornecer **cadeias de pensamento** como exemplos no prompt
- Eles **evidenciaram** que o CoT  **melhora o desempenho** em tarefas matemáticas, raciocínio lógico e resposta a perguntas

</div>

::right::

<div class="h-full flex items-start justify-center">
    <AssetImg src="chain-of-thought.png" class="w-full max-w-[320px] rounded-lg mt-[0px]" />
</div>

---
layout: two-cols-header
sourceLabel: Chain-of-Thought Prompting
source: https://promptingguide.ai/techniques/cot
---

# Chain-of-Thought: exemplo

#### **Uso de CoT (a direita) para instruir LLM em mostrar raciocínio e resposta final em Q&A**

<div class="h-10" />

<Transform :scale="0.70" origin="top">
    <AssetImg
    src="chain-of-thought-paper-image.png"
    class="rounded-lg border-0 border-white"
    />
</Transform>

