---
layout: section
routeAlias: etapa1-5
---

## Etapa 1.5 - Tema Relacionado
<br/>

### **Entregáveis TP2**


---

# Entregáveis do TP2
#### **Principais componentes da segunda entrega**

<div class="h-5" />

<div class="[&_table]:w-full text-12px">

| **#** | **Entregável** | **Observação** |
| --- | --- | --- |
| 1 | Qual Gatilho n8n | Telegram, Chatbot, Aplicativo Web, Gmail, Google Sheet, etc |
| 2 | Fonte de Informações | Qual informação estruturada (API/DB/JSON) e não estruturada (doc)? Ambas obrigatório |
| 3 | Diagrama de arquitetura | Diagrama no formato de imagem com os 9 componentes |
| 4 | Descrição textual da arquitetura | O que cada um dos 9 componentes devem fazer |
| 5 | Exemplo do fluxo de dados  | Exemplo passo-a-passo da entrada do usuário passando por cada componente até o resultado final  |
| 6 | Dado estruturado | Quais informações serão armazenadas/consultadas (banco de dados, JSON ou API)? |
| 7 | Demais itens do TP2 | Todo o restante do enunciado do TP2 |

</div>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: integrations n8n
source: https://n8n.io/integrations/
---

# Entregável 1: Qual Gatilho n8n
#### **Analise como você desejar que o usuário interaja com o seu agente**

<div class="h-5" />

::left::

<div class="text-sx w-full self-start [&_ul]:my-2 [&_li]:mb-6">

- O modo mais comum de interface agentica é um **chatbot** (Telegram, chatbot app), mas você pode pensar em um **aplicativo web de cadastro** (cadastrar perguntas de usuário)
- Ou ainda, você pode pesquisar as **centenas de integrações do n8n**, e receber as perguntas do usuário através dessas integrações (Gmail, Slack, Google Sheet, etc)

</div>

::right::

<div class="flex items-start justify-center h-full mt-0">
  <AssetImg src="n8n-integracao.png" class="rounded-lg w-[350px] border-0 border-white" />
</div>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Entregável 2: Fonte de informação
#### **Defina as fontes estruturadas e não estruturadas que alimentarão o sistema**

<div class="h-5" />

::left::

<div class="text-sm w-full self-start [&_ul]:my-2 [&_li]:mb-6">

- O projeto exige **duas fontes de informação distintas**: um banco de dados estruturado e uma base de conhecimento não estruturada.
- **Exemplo (venda de ingressos):** Consulta de pedidos em tabela de banco de dados com status, valor e data da compra. E documento textual de política de vendas (regras de cancelamento, prazos e exceções).
- Pense na pergunta do usuário: _"Qual é o prazo para solicitar reembolso e qual é o status atual do meu pedido #9876?"_

</div>

::right::

<div class="flex flex-col items-center justify-center w-full">

<Transform :scale="1.3" origin="center">

```mermaid {theme: 'dark'}
flowchart TD
    User["💬 Pergunta<br/>usuário"]
    User --> DB[("🗄️ Pedidos de<br/> ingresso)</i>")]
    User --> Doc["📄 Política de Vendas<br/><i>(Documento)</i>"]
```

</Transform>

</div>

---
layout: default
---

# Entregável 3: Diagrama de arquitetura
#### **Diagrama da arquitetura do projeto de bloco _(resumido aqui para caber no slide)_**

<div class="h-[calc(100%-80px)] flex flex-col justify-between">

  <div class="flex-1 flex items-center justify-center">

<Transform :scale="3" origin="center">

```mermaid {theme: 'dark'}
flowchart LR
    UI["📱 Telegram<br/>💬 Chatbot<br/>💻 App Web"] --> Trigger["⚡ #9 Gatilho<br/>n8n"]
    Trigger --> AgentN8N["🤖 #8 Agente<br/>n8n (classificador)"]

    AgentN8N -->|"#5"| API1["🌐 #4 API /run<br/>🤖 #1 Agente 1<br/>🧠 #2 Memoria<br/>📚 #3 RAG"]
    API1 --> Loop1["🔁 Loop<br/>Polling"]
    Loop1 -->|"#5"| Status1["🌐 #4 /status"]
    Status1 -->|"pending"| Loop1
    Status1 -->|"done"| Merge["🔀 #7 Merge<br/>n8n"]

    AgentN8N -->|"#5"| API2["🌐 #4 API /run<br/>🤖 #1 Agente 2<br/>🔧 #6 MCP/Tool"]
    API2 --> Loop2["🔁 Loop<br/>Polling"]
    Loop2 -->|"#5"| Status2["🌐 #4 /status"]
    Status2 -->|"pending"| Loop2
    Status2 -->|"done"| Merge

    Merge --> Response["📤 Resposta<br/>Usuário"]
```

</Transform>

  </div>
  
  <div class="text-xs w-full">

> [!NOTE]
> **Fluxo:** O usuário fornece uma dúvida, que é classificada como dúvida sobre base de conhecimento (ex: política de reembolso), ou dúvida sobre dado estruturado em API/banco/JSON (ex: pedidos de reembolso). 

  </div>
</div>

---

# Entregável 4: Descrição textual da arquitetura
#### **Exemplo de descrição de arquitetura (resumido pra caber no slide)**

<div class="h-3" />

<div class="[&_table]:w-full text-10px">

| **#** | **Componente** | **Descrição** |
| --- | --- | --- |
| - | Canal de comunicação (Telegram) | Interface de entrada onde o usuário envia perguntas e recebe as respostas finais do agente. |
| 8 | Agente n8n (Classificador) | Classifica a pergunta do usuário entre dúvida conceitual (base de conhecimento) ou operacional (dados/pedidos). |
| 1 | Agente 1 (Políticas e Dúvidas) | Agente especialista em conhecimento que responde regras, prazos e diretrizes consultando a base de políticas. |
| 1 | Agente 2 (Operações e Pedidos) | Agente especialista em ação/ferramentas que consulta banco de dados/JSON e verifica o status dos pedidos. |
| 7 | Merge n8n | Unifica as respostas dos dois agentes quando houver execução paralela antes de responder ao usuário. |

</div>



