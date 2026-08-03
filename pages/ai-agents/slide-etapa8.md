---
layout: section
routeAlias: etapa8
---

## **Etapa 8:** Memória Persistente

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-start justify-center
---

# RAG: indexação em fragmentos (chunks)

#### **Indexar um documento em fragmentos (chunks) pode melhorar a recuperação**

::left::

<div class="text-lg w-full self-start [&_ul]:my-5 [&_li]:mb-4">

<div class="h-5" />

- Em sistemas RAG, a fragmentação consiste em **dividir um texto** longo em segmentos menores, permitindo injetar contextos menores nos LLMs.
- A fragmentação ajuda LLMs a se concentrar **nas partes mais importantes do texto** e a evitar partes irrelevantes ou repetitivas.
<!--

- Também ajuda a reduzir o custo e a latência nas chamadas dos LLMs, além de aprimorar a qualidade e a relevância das respostas.
-->

</div>

::right::

<div class="flex flex-col items-center justify-center w-full">

<div class="text-center text-sm my-1">Indexação</div>

<Transform :scale="0.75" origin="top">

```mermaid {theme: 'dark'}
---
config:
  theme: dark
---
flowchart TD
Docs["Documentos"]
Chunks["Chunks"]
Embed["Embeddings"]
VDB[("Vector DB")]
Docs --> Chunks --> Embed --> VDB
style Chunks fill:#f59e0b,stroke:#b45309,color:#000
```

</Transform>

</div>

---
layout: default
---

# RAG: chunks e janelas de contextos

#### **Uma das razões do uso de chunks se dá pela limitação da janela de contexto dos LLMs**

<br/>

<div class="[&_table]:w-full text-14px">

| LLM | Janela de contexto | Qtde páginas (aprox.) |
| --- | --- | --- |
| Turbo GPT-3.5 | 4 mil tokens | 5 páginas |
| GPT-4 | 8 mil tokens | 10 páginas |
| GPT-4 32K | 32 mil tokens | 40 páginas |
| GPT-4 Turbo, GPT-4o | 128 mil tokens | 300 páginas |

</div>

<div class="h-8" />

<Transform :scale="0.8" origin="left bottom">

> [!NOTE]
> Mesmo embora o tamanho das janelas de contexto tenha aumentado recentemente, o uso de chunks continuará sendo uma boa técnica para gerenciamento de contexto, custo e latência.

</Transform>
