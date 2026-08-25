---
layout: section
routeAlias: etapa2
---

## **Etapa 2:** Construção de Workflows Avançados

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Ativando URL de produção de webhook
#### **Existem diferenças entre o modo de teste e o fluxo ativo em produção**

::left::

<div class="text-sx w-full self-start [&_ul]:my-10 [&_li]:mb-6">

- A **Test URL** só funciona enquanto você estiver com o n8n aberto aguardando eventos com o botão _Listen for test event_.
- A **Production URL** só responde após o workflow ser **publicado** no canto superior do editor.

</div>

::right::

<div class="flex items-center justify-center h-full">
  <AssetImg src="n8n/webhook-url-test-production.png" class="rounded-lg shadow-md max-w-[380px]" />
</div>

<!--
## notes slides

### Durante o desenvolvimento, utilize a Test URL para inspecionar os dados recebidos em tempo real no editor
### Para integrações reais e chamadas de sistemas externos em produção, ative o workflow e aponte para a Production URL
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Visualizando as execuções de um workflow
#### **O painel de execuções permite visualizar o histórico de disparos e os dados processados**

::left::

<div class="text-sx w-full self-start [&_ul]:my-10 [&_li]:mb-6">

- O painel **Executions** lista todas as execuções (manuais, agendadas ou de produção) com status de sucesso, erro ou em andamento.
- Permite abrir qualquer execução passada para **inspecionar os dados de entrada e saída nó a nó**, facilitando a auditoria e correção de erros.

</div>

::right::

<div class="flex items-center justify-center h-full">
  <AssetImg src="n8n/execution-panel.png" class="rounded-lg shadow-md max-w-[200px]" />
</div>

<!--
## notes slides

### Por padrão, o n8n salva execuções com erro; nas configurações do workflow é possível definir se execuções com sucesso também devem ser salvas
### Você pode reexecutar (retry) execuções com falha diretamente a partir do painel de histórico
-->

