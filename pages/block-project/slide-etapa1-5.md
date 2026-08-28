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
| 6 | Dado estruturado | Quais informações serão armazenadas/consultadas (banco de dados ou API)? |
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
| 1 | Agente 2 (Operações e Pedidos) | Agente especialista em ação/ferramentas que consulta banco de dados/API e verifica o status dos pedidos. |
| 7 | Merge n8n | Unifica as respostas dos dois agentes quando houver execução paralela antes de responder ao usuário. |

</div>

---

# Entregável 5: Exemplo do fluxo de dados
#### **Exemplo de fluxo de dados (resumido pra caber no slide)**

<div class="h-3" />

<div class="[&_table]:w-full text-10px">

| **Etapa / Ator** | **Componente** | **Ação / Dado Trafegado no Fluxo** |
| --- | --- | --- |
| 1. Usuário | Canal de Comunicação | _"Qual é o prazo para solicitar reembolso e qual é o status atual do meu pedido #9876?"_ |
| 2. n8n Router | Agente n8n (Classificador) | Detecta dupla intenção (conceitual + operacional) e aciona ambos os agentes em paralelo. |
| 3. Agente 1 | Políticas (Python) | Consulta base de conhecimento e retorna que o prazo de reembolso é de até 7 dias. |
| 4. Agente 2 | Tools + Pedidos (Python) | Executa ferramenta de busca no banco/JSON e retorna que o pedido #9876 está "Em análise". |
| 5. n8n Merge | Merge & Consolidação | Combina as duas respostas e envia ao Telegram: prazo de 7 dias + status em análise. |

</div>

---

# Entregável 6: Dado estruturado
#### **Exemplo de modelo de dados estruturado (banco de dados ou API)**

<div class="h-3" />

<div class="[&_table]:w-full text-11px">

| **Nome do Campo** | **Descrição** |
| --- | --- |
| `id_pedido` | Identificador único do pedido/compra (ex: `#9876`). |
| `nome_cliente` | Nome completo do comprador associado à transação. |
| `evento` | Nome do show, partida ou evento referente ao ingresso adquirido. |
| `data_compra` | Data e horário em que o pedido foi emitido e confirmado. |
| `valor_total` | Valor total pago em reais pelo ingresso e taxas de serviço. |
| `status` | Situação atual do pedido (ex: `Aprovado`, `Em análise`, `Reembolsado`, `Cancelado`). |

</div>

---

# Outros cenários de negócio
#### **Pense na pergunta do usuário e nos dados (estruturado e não estruturado) do seu tema**

<div class="h-1" />

<div class="[&_table]:w-full text-9px">

| **Cenário de Negócio** | **Pergunta do Usuário** | **Dados (Estruturado vs. Não Estruturado)** |
| --- | --- | --- |
| **Portal de RH** | _"Quais as regras para licença-paternidade e quantos dias de férias ainda tenho de saldo?"_ | **Não estruturado:** Guia de benefícios/CLT (doc)<br/>**Estruturado:** Tabela de saldo de férias/colaborador (banco/API) |
| **Clínica Médica** | _"Qual o preparo para o exame de sangue e tem horário livre amanhã com dr. Carlos?"_ | **Não estruturado:** Manual de instruções de preparo (doc)<br/>**Estruturado:** Agenda de consultas e horários vagos (banco/API) |
| **Suporte de TI** | _"Como configurar a VPN no Linux e qual o status do meu chamado #4521?"_ | **Não estruturado:** Base de conhecimento / FAQ técnico (doc)<br/>**Estruturado:** Tabela de tickets e chamados de TI (banco/API) |
| **Secretaria Acadêmica** | _"Qual o prazo para trancar matéria e tranque 'Banco de Dados' para mim?"_ | **Não estruturado:** Regimento e calendário acadêmico (doc)<br/>**Estruturado:** Tabela de matrículas e status de disciplina (banco/API) |
| **Hotelaria / Turismo** | _"Qual o horário do café da manhã e estenda minha reserva #H-4321 por mais 1 dia?"_ | **Não estruturado:** Guia de serviços e regras do hotel (doc)<br/>**Estruturado:** Tabela de reservas e disponibilidade de quartos (banco/API) |

</div>

---
layout: default
---

# Hands-on

<br/>

🛠️ &nbsp;**Exercício \#1:** Defina o gatilho de entrada n8n (canal/interface) para o seu tema.

🛠️ &nbsp;**Exercício \#2:** Especifique a fonte estruturada (banco/API) e a não estruturada (documento).

🛠️ &nbsp;**Exercício \#3:** Elabore o diagrama de arquitetura contendo os 9 componentes interligados.

🛠️ &nbsp;**Exercício \#4:** Escreva a descrição textual detalhando o papel de cada um dos componentes.

🛠️ &nbsp;**Exercício \#5:** Mapeie um exemplo de fluxo de dados com pergunta de dupla intenção.

🛠️ &nbsp;**Exercício \#6:** Modele os campos e tipos do dado estruturado da sua aplicação.

<br/>

- [ ] &nbsp;Versione o entregável no seu projeto de bloco atual
- [ ] &nbsp;Faça o seu TP2 normalmente, e entregue também os exercícios do 1 ao 6 no TP2
