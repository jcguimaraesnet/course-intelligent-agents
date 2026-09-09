---
layout: section
routeAlias: etapa7
---

## **Etapa 7:** Gerenciamento de Erros e Integração

---
layout: default
---

# Codificação assistida por IA - Live coding (1)
#### **Workflow de secretaria acadêmica com tratamento de erro avançado**

<div class="w-full h-[calc(100%-80px)] grid grid-cols-2 items-center justify-items-center gap-8">

<div class="w-full flex items-left">

<Transform :scale="0.9" origin="center">

```mermaid {theme: 'dark'}
flowchart TB
    A["⚡ Webhook<br/>(pergunta)"] --> Sub
    subgraph Sub [" "]
        E["🤖 AI Agent<br/>(Atendimento)"] --> D["📋 Data Table<br/>(requerimentos)"]
    end
    Sub --> J["📤 Respond to Webhook"]
```

</Transform>

</div>

<div class="w-full flex items-left">

<Transform :scale="1.7" origin="center">

```mermaid {theme: 'dark'}
flowchart TB
    ET["🚨 Error Trigger"] --> N8N["n8n"]
    
    N8N --> Sub1
    subgraph Sub1 [" "]
        B1["🤖 AI Agent<br/>(Classifica tipo erro)"] --> DT1["📋 Data Table<br/>(tipo_erro_responsável)"]
    end
    Sub1 --> GM["📧 Gmail<br/>(Enviar mensagem)"]
    
    N8N --> Sub2
    subgraph Sub2 [" "]
        AG["🤖 AI Agent"] --> DT2["📋 Data Table<br/>(tipo_erro_acao)"]
        AG --> GC["📅 Google Calendar Tool"]
        AG --> GS["📊 Google Sheets Tool"]
    end
```

</Transform>

</div>

</div>

<!--
## notes slides

### O workflow processa perguntas via Webhook com consulta agêntica (AI Agent)
### Ao final, a resposta é devolvida ao aluno via nó Respond to Webhook
-->

---
layout: default
layoutClass: gap-8
---

# Codificação assistida por IA - Live coding (2)
#### **Workflow de secretaria acadêmica com tratamento de erro avançado**

<div class="h-7" />

<WindowMockup color="dark" padding="0.5rem 0.5rem 0.5rem 0.5rem" title="prompt.md" codeblock>

```md {*}{maxHeight:'290px'}
# Papel
Você é um engenheiro de automação especialista em n8n, construção de workflows agênticos e gestão avançada de erros.

# Tarefa
Crie dois workflows no n8n para atendimento de secretaria acadêmica com tratamento de erro avançado:
1. **Workflow Principal (Atendimento):** Recebe uma pergunta de aluno via Webhook, processa via AI Agent conectado à Data Table `requerimentos` e responde de volta via Respond to Webhook.
2. **Workflow de Tratamento de Erro (Error Handling):** Acionado por um nó Error Trigger para tratar falhas no workflow principal, dividindo em duas ramificações paralela:
   - **Ramificação 1 (Classificação e Notificação):** AI Agent classifica o tipo de erro, consulta a Data Table `tipo_erro_responsável` e notifica o responsável via Gmail.
   - **Ramificação 2 (Ação Corretiva Agêntica):** AI Agent consulta a Data Table `tipo_erro_acao` e executa ações de correção via ferramentas (Google Calendar Tool e Google Sheets Tool).

# Contexto
## 1. Tabelas de Dados (`Data Tables`)
- `requerimentos`: Armazena os requerimentos dos alunos (REQ-XXX, nome, tipo, status, data).
- `tipo_erro_responsável`: Mapeia os tipos de erro e os e-mails/responsáveis por cada categoria.
- `tipo_erro_acao`: Mapeia os tipos de erro e as ações automatizadas a serem executadas.

## 2. Detalhamento dos Workflows

### Workflow 1: Atendimento Principal
1. Nó Webhook para receber a pergunta do aluno.
2. Subgráfico com nó AI Agent (Atendimento) conectado à Data Table Tool (`requerimentos`).
3. Nó Respond to Webhook para devolver a resposta gerada ao aluno.

### Workflow 2: Error Handling (Tratamento de Erro)
1. Nó Error Trigger escutando falhas do Workflow Principal (recebe mensagem de erro, id do workflow e data)
2. Nó n8n que obtem dados do workflow via API REST do n8n com base no id do workflow recebido do Erro Trigger. Esse nó deve ramificar em duas ramificações:
3. **Ramificação 1:**
   - AI Agent (Classifica tipo erro).
   - Data Table Tool (`tipo_erro_responsável`).
   - Nó Gmail (Enviar mensagem para o responsável).
4. **Ramificação 2:**
   - Subgráfico contendo AI Agent de resolução.
   - Data Table Tool (`tipo_erro_acao`).
   - Ferramentas `Google Calendar Tool` e `Google Sheets Tool`.

## 3. Mais detalhamento do workflow
1. Configure as System Messages dos AI Agents com seus papéis específicos.
2. Simule dados na tabela `requerimentos`.
3. Simule dados nas tabelas `tipo_erro_responsável` e `tipo_erro_acao` considerando os tipos de erro: `falha_conexao` e `fonte_inexistente`.
4. Adicione um Stick Note para explicar os dois tipos de erro que podem ser configurados propositalmente: `falha_conexao` (API KEY errada) e `fonte_inexistente` (ID da tabela errado).
5. Adicione Stick Notes explicativos com instruções de teste e configuração das credenciais e Error Trigger.

# Regras de Expressões e Boas Práticas
- Sempre use aspas simples (') ao referenciar nomes de nós em expressões n8n.
```
</WindowMockup>

<!--
## notes slides

### O prompt orienta a criação completa da solução em dois workflows no n8n: Atendimento Principal e Tratamento de Erros
### Detalha o uso de AI Agents, Data Tables específicas (requerimentos, tipo_erro_responsável, tipo_erro_acao) e ferramentas de integração (Gmail, Calendar, Sheets)
-->

---
layout: default
sourceLabel: Error Handling
source: https://docs.n8n.io/flow-logic/error-handling/
---

# Tool node (sub-nodes)
#### **O n8n oferece dezenas de nós do tipo Tool (sub-node) para realizar uma ação**

<div class="h-2" />

<div class="[&_table]:w-full text-sm">

| **Nó / Recurso** | **Descrição** |
| --- | --- |
| **Gmail (Node / Tool)** | Envia alertas e relatórios formatados de incidentes por e-mail para as equipes responsáveis |
| **Google Calendar Tool** | Executa ações agênticas de reparo, como o agendamento de reuniões/eventos de manutenção técnica |
| **Google Sheets Tool** | Registra logs de auditoria e inconsistências em planilhas para análise de causa raiz |

</div>

<!--
## notes slides

### O n8n integra gatilhos de erro, API de gerenciamento e ferramentas de comunicação e ação para remediação autônoma
### As estratégias abrangem desde a notificação automatizada de incidentes até a execução agêntica de ações corretivas
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: Google OAuth2
source: https://docs.n8n.io/integrations/builtin/credentials/google/
---

# Google Tool Node (sub-node)
#### **Os nós de action/tool do google exigem algumas configurações externas**

<div class="h-5" />

::left::

<div class="text-sx w-full self-start [&_ul]:my-5 [&_li]:mb-6">

- Exigem a criação de uma aplicação no **Google Cloud Console** para obtenção das credenciais OAuth2 (**Client ID** e **Client Secret**).
- Requerem a habilitação da API desejada (ex: Gmail API) e a configuração dos **OAuth Scopes** e URLs de redirecionamento no n8n.

</div>

::right::

<div class="flex items-center justify-center h-full">
  <N8nNode
    icon-src="n8n/nodes/gmail.svg"
    label="Gmail Tool"
    type="action"
    scale="1.4"
  />
</div>

<!--
## notes slides

### Os nós e ferramentas do Google exigem autenticação OAuth2 configurada externamente via Google Cloud Console
### É necessário registrar um projeto, gerar o Client ID e Client Secret e configurar os escopos de permissão corretos
-->


