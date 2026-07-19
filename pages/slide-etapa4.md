---
layout: section
routeAlias: etapa4
---

## **Etapa 4:** Otimização de Agentes

---
layout: quote-image
image: /paper-tran-multiagent-system.png
sourceLabel: Multi-Agent Collaboration Mechanisms - A Survey of LLMs
source: https://arxiv.org/html/2501.06322v1
---

::title::

# Sistemas multiagentes

::default::

"São sistemas onde **grupos de agentes** inteligentes baseados em LLM coordenam-se para resolver tarefas complexas coletivamente, em escala."

— Tran et al. "Multi-Agent Collaboration Mechanisms: A Survey of LLMs", 2025

<!--
Tran et al. organizam a colaboração em tipos, estruturas e estratégias.

# Tipos de colaboração
> Cooperação: 
os agentes alinham seus objetivos e trabalham juntos em direção a um objetivo comum.
> Competição
os agentes priorizam seus próprios objetivos, que podem entrar em conflito com outros.
> Cooperação/competição
enquanto agentes colaboram em tarefas compartilhadas, alguns competem com outros agentes.

# Estratégia

> Baseada em regras

> Baseadas em papel

> baseada em modelo
Tomada de decisão baseada em probabilidade, tendências e estatística.
-->

---
layout: default
sourceLabel: Multi-agent patterns
source: https://developers.googleblog.com/developers-guide-to-multi-agent-patterns-in-adk/
---

# Padrões de arquitetura em sistemas multiagentes

#### **Alguns padrões de arquitetura para sistemas multiagentes têm sido propostos**

<div class="h-2" />

<div class="[&_table]:w-full text-xs">

| *Padrão* | *Descrição* | *Tipo* |
|---|---|---|
| **Sequential Pipeline** | Agentes em sequência fixa; cada um processa a saída do anterior | Determinístico |
| **Coordinator/Dispatcher** | Um agente central analisa a entrada e decide qual agente especializado aciona | Não determinístico |
| **Parallel Fan-Out** | Vários agentes atuam em paralelo com perspectivas complementares; um agente final consolida | Determinístico |
| **Hierarchical Decomposition** | Um agente de alto nível divide a tarefa em subtarefas para agentes subordinados | Não determinístico |
| **Generator and Critic** | Um agente gera a solução e outro critica; se a validação falha, o feedback volta ao gerador | Não determinístico |
| **Iterative Refinement** | Um gera, outro sugere melhorias e um terceiro refina ao longo de várias iterações | Não determinístico |
| **Human-in-the-Loop** | O agente produz uma solução que depende de aprovação humana | Determinístico |
| **Composite Patterns** | Um fluxo que combina vários padrões: coordenação, paralelismo, validação e aprovação humana | Misto |

</div>

<!--
# O link do google para arquiteturas multiagentes é uma das maiores referências atuais para o assunto

> https://developers.googleblog.com/developers-guide-to-multi-agent-patterns-in-adk/
-->
