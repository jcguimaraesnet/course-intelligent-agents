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

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: Wait node
source: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait
---

# Wait (action node)
#### **O nó de Espera permite interromper o workflow e retomar a execução após uma condição**

<div class="h-12" />

::left::

<div class="text-sx w-full self-start [&_ul]:my-0 [&_li]:mb-6">

- O nó de espera é útil para usar em chamadas HTTP com padrão de **polling** (retentativas).
- O nó de espera pode retomar a execução do workflow com base em **intervalo de tempo**, em um **horário específico**, **callback de webhook** e ao **receber resposta de um forms**.

</div>

::right::

<div class="flex items-center justify-center h-full">
  <N8nNode
    icon-src="n8n/nodes/wait.svg"
    label="Wait"
    type="action"
    scale="1.4"
  />
</div>

<!--
## notes slides

### Em produção, o nó Wait descarrega a execução da memória e persiste no banco até o momento da retomada
### Suporta diferentes modos de espera: After time interval, At specified time, On webhook call e On form submission
-->


