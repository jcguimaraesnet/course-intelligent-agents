---
layout: section
routeAlias: etapa1
---

## **Etapa 1.1:** Visão Geral do Projeto

---

# Cronograma 1T (parte 1)

#### **Cada etapa corresponde a duas semanas (duas aulas), e um TP**

<br/>

<Transform :scale="0.85">

| Aula | Etapa | Tema | TP |
| --- | --- | --- | --- |
| Semana 1 | Etapa 1 | _Visão Geral e TP1_ | |
| Semana 2 | Etapa 1 | Tema relacionado | Prazo TP1 |
| Semana 3 | Etapa 2 | _Leitura e discussão do TP2_ | |
| Semana 4 | Etapa 2 | Tema relacionado | Prazo TP2 |
| Semana 5 | Etapa 3 | _Leitura e discussão do TP3_ | |
| Semana 6 | Etapa 3 | Tema relacionado | Prazo TP3 |

</Transform>

---

# Cronograma 1T (parte 2)

#### **Cada etapa corresponde a duas semanas (duas aulas), e um TP**

<br/>

<Transform :scale="0.85">

| Aula | Etapa | Tema | TP |
| --- | --- | --- | --- |
| Semana 7 | Etapa 4 | _Leitura e discussão do TP4_ | |
| Semana 8 | Etapa 4 | Tema relacionado | Prazo TP4 |
| Semana 9 | Etapa 5 | _Leitura e discussão do TP5_ | |
| Semana 10 | Etapa 5 | Tema relacionado | Prazo TP5 |

</Transform>

---

# Cronograma 2T (parte 3)

#### **6 semanas dedicadas para dúvidas e suporte**

<br/>

<Transform :scale="0.85">

| Aula | Etapa | Tema | TP |
| --- | --- | --- | --- |
| Semana 1 | Etapa 6 | _(sem tema) dúvida e suporte_ | (semana de reentrega) |
| Semana 2 | Etapa 6 | _(sem tema) dúvida e suporte_ |  |
| Semana 3 | Etapa 7 | _(sem tema) dúvida e suporte_ | |
| Semana 4 | Etapa 7 | _(sem tema) dúvida e suporte_ |  |
| Semana 5 | Etapa 8 | _(sem tema) dúvida e suporte_ | |
| Semana 6 | Etapa 8 | _(sem tema) dúvida e suporte_ |  |

</Transform>

---

# Cronograma 2T (parte 4)

#### **Duas semanas para últimos ajustes, entrega e duas semanas de apresentação**

<br/>

<Transform :scale="0.85">

| Aula | Etapa | Tema | TP |
| --- | --- | --- | --- |
| Semana 7 | Etapa 9 | _Entrega moodle_ | Entrega Final |
| Semana 8 | Etapa 9 | _Entrega moodle_ | Entrega Final |
| Semana 9 | Etapa 10 | _Apresentação_ | |
| Semana 10 | Etapa 10 | _Apresentação_ |  |

</Transform>

---

# Principais entregáveis do projeto

#### **Listagem com os principais componentes do sistema**

<div class="h-2" />

<Transform :scale="0.9">

<div class="[&_table]:w-full text-xs">

| #Req | Descrição |
| --- | --- |
| 1 | Dois agentes Python independentes, cada um projeto separado com responsabilidade distinta |
| 2 | Um agente com memória conversacional persistente com `SQLiteSession` (apenas o primeiro) |
| 3 | Primeiro agente (com memória) e RAG/embeddings para recuperação de contexto semântico |
| 4 | Os dois agentes expostos via API REST, com duas APIs: `run` (executar) e `status` (consultar) |
| 5 | Workflow n8n invoca de forma assíncrona os dois agentes (background task e polling) |
| 6 | Servidor MCP deve expor as ferramentas de ao menos um dos agentes |
| 7 | Orquestração dos dois agentes no n8n, com roteamento e merge |
| 8 | Terceiro agente dentro do n8n (Agent node), para roteamento e/ou merge |
| 9 | Gatilho (trigger) que dispara o workflow n8n — webhook, agendamento ou manual |

</div>

</Transform>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Caso de uso de exemplo
#### **Este cenário não deve ser usado por nenhum aluno**

::left::

<div class="w-full flex flex-col gap-1">

Um **assistente de atendimento para um e-commerce**, disponível através de um chatbot.

O cliente faz **dois tipos de pedido**, que exigem capacidades diferentes:

- **Tirar dúvidas** — políticas, trocas, catálogo _(o agente precisa saber e lembrar)_
- **Consultar um pedido** — status de entrega em tempo real _(o agente precisa agir sobre um sistema externo)_

</div>

::right::

<div class="flex items-center justify-center h-full">
  <div class="i-ri-customer-service-2-line text-[15rem] text-purple-300" />
</div>

<!--
Para trocar o ícone por uma imagem própria: coloque o arquivo em public/ e
substitua o bloco <div>...</div> do ::right:: por, por exemplo:
  <AssetImg src="seu-arquivo.png" class="rounded-lg w-[420px] border-8 border-white" />
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Req 1 — Dois agentes independentes
#### **Dois projetos Python separados, com responsabilidades distintas**

::left::

<div class="h-10" />

- **Agente Atendente** — responde dúvidas: políticas, trocas, catálogo
- **Agente Rastreador** — consulta o status de um pedido específico
- Cada um é um projeto próprio; **não se chamam entre si** — quem coordena é o n8n

::right::

<div class="flex items-center justify-center h-full">
  <div class="i-ri-robot-2-line text-[15rem] text-purple-300" />
</div>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Req 2 — Memória conversacional
#### **Histórico persistente com `SQLiteSession` — apenas no Atendente**

::left::

<div class="h-10" />

- O **Atendente** lembra do histórico do cliente entre sessões distintas
- Persistência real em SQLite — não some ao reiniciar o processo
- O Rastreador não precisa: é uma consulta pontual

::right::

<div class="flex items-center justify-center h-full">
  <div class="i-ri-brain-line text-[15rem] text-purple-300" />
</div>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Req 3 — RAG / embeddings
#### **Recuperação de contexto sobre a base de conhecimento — no Atendente**

::left::

<div class="h-10" />

- O Atendente responde consultando, via RAG, a base da loja: políticas, FAQ, catálogo
- Impede o agente de "inventar" política — resposta ancorada no material real
- O backend dos vetores é livre (vector DB, FAISS, etc.)

::right::

<div class="flex items-center justify-center h-full">
  <div class="i-ri-file-search-line text-[15rem] text-purple-300" />
</div>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Req 4 — APIs REST (run e status)
#### **Cada agente exposto por FastAPI, com dois endpoints**

::left::

<div class="h-10" />

- `run` (executar) — submete a tarefa e devolve um identificador na hora
- `status` (consultar) — busca o resultado quando estiver pronto
- Mesmo padrão nos dois agentes

::right::

<div class="flex items-center justify-center h-full">
  <div class="i-ri-plug-line text-[15rem] text-purple-300" />
</div>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Req 5 — Invocação assíncrona
#### **O n8n dispara `run` e faz polling do `status` (background task)**

::left::

<div class="h-10" />

- O agente processa em background — não segura a conexão HTTP
- O n8n dispara `run`, recebe o identificador e consulta `status` até concluir
- Laço de espera no próprio workflow (ideal: um sub-workflow reutilizável)

::right::

<div class="flex items-center justify-center h-full">
  <div class="i-ri-loop-left-line text-[15rem] text-purple-300" />
</div>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Req 6 — Servidor MCP
#### **Ferramentas de ao menos um agente publicadas via MCP**

::left::

<div class="h-10" />

- A ferramenta `consultar_pedido` do Rastreador é exposta por um servidor MCP
- Vira serviço padronizado e reutilizável — deixa de estar "presa" ao agente
- O atendimento humano pode usá-la no Claude Desktop, sem abrir o ERP

::right::

<div class="flex items-center justify-center h-full">
  <div class="i-ri-tools-line text-[15rem] text-purple-300" />
</div>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Req 7 — Orquestração no n8n
#### **Roteamento entre os agentes e merge das respostas**

::left::

<div class="h-10" />

- Roteia pela intenção: dúvida → Atendente, pedido → Rastreador, misto → os dois
- O **Merge** junta as saídas numa resposta única
- O n8n é o **único** orquestrador

::right::

<div class="flex items-center justify-center h-full">
  <div class="i-ri-flow-chart text-[15rem] text-purple-300" />
</div>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Req 8 — Terceiro agente (Agent node)
#### **Um agente dentro do n8n, para roteamento e/ou consolidação**

::left::

<div class="h-10" />

- Um **Agent node** no orquestrador — o "cérebro do maestro"
- Classifica a intenção para decidir o roteamento e consolida a resposta final
- Não é par dos dois agentes Python — é capacidade do próprio n8n

::right::

<div class="flex items-center justify-center h-full">
  <div class="i-ri-mind-map text-[15rem] text-purple-300" />
</div>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Req 9 — Gatilho do workflow
#### **O evento que dispara toda a orquestração**

::left::

<div class="h-10" />

- Um **webhook**: o cliente envia mensagem no chat → o n8n inicia o fluxo
- O tipo é livre: webhook, agendamento ou manual
- É o ponto de entrada de tudo

::right::

<div class="flex items-center justify-center h-full">
  <div class="i-ri-webhook-line text-[15rem] text-purple-300" />
</div>

---

# Outros casos de uso possíveis
#### **Exemplos que se encaixam na arquitetura de dois agentes**

<div class="h-8" />



<div class="[&_table]:w-full text-xs">

| Caso de uso | Descrição |
| --- | --- |
| Suporte de TI interno | Um agente resolve chamados consultando runbooks e a base de conhecimento; outro verifica status de sistemas e ativos via API |
| Portal de RH do colaborador | Um agente responde sobre políticas e benefícios; outro consulta holerite e férias e abre solicitações no sistema de RH |
| Análise de contratos | Um agente extrai cláusulas e dados do documento; outro avalia riscos consultando a base de jurisprudência e políticas internas |
| Atendimento de clínica | Um agente esclarece convênios, preparos e procedimentos; outro consulta e agenda horários disponíveis via API |

</div>

<div class="h-10" />

<div class="text-xs opacity-60 mt-4">Em todos, um agente <b>sabe e lembra</b> (memória + RAG) e outro <b>age sobre um sistema externo</b> (ferramenta) — orquestrados pelo n8n.</div>

---
layout: section
---

## Leitura do TP1

---

# Entregáveis do TP1
#### **Principais componentes da primeira entrega**

<div class="h-2" />

<Transform :scale="0.9">

<div class="[&_table]:w-full text-xs">

| # | Entregável |
| --- | --- |
| 1 | Descrição do problema |
| 2 | Dois requisitos funcionais mínimos e verificáveis |
| 3 | Inputs, outputs e restrições técnicas |
| 4 | Arquitetura inicial |
| 5 | Agente Python funcional |
| 6 | Prompts documentados |
| 7 | Saída JSON |
| 8 | Entrega (PDF, repo, vídeo e ZIP no Moodle) |

</div>

</Transform>
