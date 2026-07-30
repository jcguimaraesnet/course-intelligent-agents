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
3. Se houver um output final do LMM, o loop termina.
4. Se houver um output com handoff do LMM, o loop é executado novamente com o novo agente.
5. Se houver um output com tool calling do LMM, o loop é executado novamente com o agente atual.

</div>

<!-- </Transform> -->

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
# o loop do Runner: invoca o agente, checa a saída; se final, encerra; se handoff, repete com o novo agente; se tool call, repete com o agente atual.

# cada volta que termina em tool call ou handoff dispara uma nova chamada de LLM (ver slide anterior sobre nº de chamadas).
-->
