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
| 1 | Qual Gatilho n8n? | Telegram, Chatbot, Aplicativo Web, Gmail, Google Sheet, etc |
| 2 | Jornada do Usuário | Qual informação estruturada e não estruturada? Ambos obrigatório |
| 2 | Diagrama de arquitetura | Diagrama no formato de imagem com os 9 componentes |
| 3 | Descrição textual da arquitetura | O que cada um dos 9 componentes devem fazer |
| 4 | Exemplo do fluxo de dados  | Exemplo passo-a-passo da entrada do usuário passando por cada componente até o resultado final  |
| 6 | Dado estrururado | Quais informações serão armazenadas/consultadas (banco de dados, JSON ou API)? |
| 7 | Demais itens do TP2 | Todo o restante do enunciado do TP2 |

</div>

---
layout: default
---

# Arquitetura do Projeto de Bloco
#### **Diagrama da arquitetura do projeto de bloco (resumido para caber no slide)**

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
> **Fluxo:** O usuário fornece uma dúvida, que é classificada como dúvida sobre base de conhecimento (ex: política de reembolso), ou dúvida sobre dado estruturado em API/banco/JSON (ex: pedidos de reembolso). _Pergunta exemplo: "Qual é o prazo para solicitar reembolso e qual é o status atual do meu pedido #9876?"_

  </div>
</div>



