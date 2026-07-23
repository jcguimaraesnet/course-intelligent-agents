---
theme: dracula
title: "Projeto de Bloco"
info: |
  Projeto de Bloco — Agentes Inteligentes
  Desenvolvimento de Agentes Inteligentes
# hash: reload num slide bate em .../block-project/ (index da pasta), o GitHub
# Pages serve 200 e a SPA roteia pelo hash. Evita 404 em subpath sem rewrite.
routerMode: hash
colorSchema: dark
fonts:
  sans: DM Sans
  weights: "200,400,600,700"
contextMenu: false
highlighter: shiki
lineNumbers: true
transition: fade-out
layout: cover
footer: false
presenter: true
---

# Projeto de Bloco

Desenvolvimento de Agentes Inteligentes

---
routeAlias: ementa
---

# Ementa do projeto

- **Etapa 1** — <Link to="etapa1" title="Visão Geral do Projeto"/>
- **Etapa 2** — <Link to="etapa2" title="Ferramentas, Raciocínio e Memória"/>
- **Etapa 3** — <Link to="etapa3" title="Exposição via FastAPI"/>
- **Etapa 4** — <Link to="etapa4" title="Operacionalização com MCP"/>
- **Etapa 5** — <Link to="etapa5" title="Integração com n8n"/>

<!--
Ementa do projeto — visão geral das 5 etapas.
-->

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

<div class="h-10" />

Um **assistente de atendimento para um e-commerce**, disponível através de um chatbot.

O cliente faz **dois tipos de pedido**, que exigem capacidades diferentes:

- **Tirar dúvidas** — políticas, trocas, catálogo _(o agente precisa saber e lembrar)_
- **Consultar um pedido** — status de entrega em tempo real _(o agente precisa agir sobre um sistema externo)_


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
src: ./pages/block-project/slide-etapa1.md
---

---
src: ./pages/block-project/slide-etapa2.md
---

---
src: ./pages/block-project/slide-etapa3.md
---

---
src: ./pages/block-project/slide-etapa4.md
---

---
src: ./pages/block-project/slide-etapa5.md
---
