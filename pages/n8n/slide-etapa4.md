---
layout: section
routeAlias: etapa4
---

## **Etapa 4:** Integração HTTP com n8n

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: HTTP Request
source: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest
---

# HTTP Request (action node)
#### **O nó de requisição HTTP permite fazer requisições HTTP em uma Web API REST**

<div class="h-3" />

::left::

<div class="text-sx w-full self-start [&_ul]:my-0 [&_li]:mb-6">

- Permite realizar todas as configurações para uma chamada HTTP, incluindo envio dos parâmetros de **verbo, cabeçalho, corpo**, além de **receber a resposta** para encaminhar para o fluxo seguinte.
- É possível importar chamadas HTTP em curl diretamente no nó HTTP Request (opção Import cURL).

</div>

::right::

<div class="flex items-center justify-center h-full">
  <N8nNode
    icon-src="n8n/nodes/http-request.svg"
    label="HTTP Request"
    type="action"
    scale="1.4"
  />
</div>

<!--
## notes slides

### O nó HTTP Request é o principal nó de integração do n8n com APIs REST externas
### A utilização de Credenciais separadas do workflow garante segurança e reutilização entre múltiplos fluxos
-->

