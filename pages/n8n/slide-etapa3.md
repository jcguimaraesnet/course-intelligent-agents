---
layout: section
routeAlias: etapa3
---

## **Etapa 3:** Gestão Avançada de Erros

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: Error Trigger
source: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger
---

# Error Trigger (action node)
#### **O nó Error Trigger permite criar workflows de tratamento de erro em outros workflows**

::left::

<div class="text-sx w-full self-start [&_ul]:my-15 [&_li]:mb-6">

- O **Error Trigger** é disparado toda vez que um erro ocorre no workflow principal.
- O workflow que usa um **Error Trigger** se torna um workflow de tratamento de erro, e pode ser usado para registrar em log (ex: tabela) o nome do workflow, último nó e mensagem de erro.


</div>

::right::

<div class="flex items-center justify-center h-full">
  <N8nNode
    icon-src="n8n/nodes/error-trigger.svg"
    label="Error Trigger"
    type="trigger"
    scale="1.4"
  />
</div>

<!--
## notes slides

### O workflow de tratamento de erro precisa estar publicado (ativo) para poder ser selecionado nas configurações do workflow principal
### O Error Trigger é acionado apenas em execuções de produção (quando o workflow principal está ativo e falha)
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: Error Trigger
source: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger
---

# Error Trigger - pré-requisitos
#### **Alguns pré-requisitos para nó Error Trigger funcionar:**

::left::

<div class="text-sx w-full self-start [&_ol]:my-10 [&_li]:mb-4">

1. Ambos os workflows (principal e de erro) devem estar **publicados (ativos)**.
2. O **workflow principal** deve ser configurado para usar o workflow de erro em caso de falha (_Workflow Settings > Error Workflow_).
3. Para simular erros, **não podem ser usadas execuções manuais** no editor, apenas execuções reais que acionem o gatilho em produção.

</div>

::right::

<div class="flex items-center justify-center h-full">
  <N8nNode
    icon-src="n8n/nodes/error-trigger.svg"
    label="Error Trigger"
    type="trigger"
    scale="1.4"
  />
</div>

<!--
## notes slides

### Se o Error Workflow estiver inativo, ele não aparecerá disponível para seleção nas configurações do workflow principal
### O n8n suprime o Error Workflow em execuções manuais de teste porque o erro já é exibido na tela para o usuário
### erros forçados de exemplo: URL de HTTP errado. Nome de tabela errada. Diretório de Write file errado.
-->
