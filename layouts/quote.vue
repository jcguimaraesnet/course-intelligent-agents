<script setup lang="ts">
/**
 * quote — layout de citação (sobrescreve o `quote` do tema dracula).
 *
 * Ícone de aspas decorativo no canto superior direito.
 *
 * Slots:
 *   ::title::   título (opcional)
 *   default     o texto citado + a autoria
 *
 * Uso:
 *   ---
 *   layout: quote
 *   ---
 *
 *   ::title::
 *   # O que é um agente?
 *
 *   ::default::
 *   Um agente é um LLM operando num loop com ferramentas.
 *
 *   — Anthropic, *Building Effective Agents*
 */
</script>

<template>
  <div class="slidev-layout quote">
    <!-- Aspas decorativas (canto superior direito) -->
    <ri-double-quotes-r class="quote__mark" aria-hidden="true" />

    <!-- Título opcional -->
    <div v-if="$slots.title" class="quote__title">
      <slot name="title" />
    </div>

    <!-- Texto citado -->
    <div class="quote__body my-auto">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.quote {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Aspas: grandes, no canto superior direito e bem discretas. */
.quote__mark {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  font-size: 8rem;
  line-height: 1;
  color: #8be9fd;
  opacity: 0.15;
  pointer-events: none;
}

.quote__title :deep(:is(h1, h2)) {
  margin: 0;
}

/* Texto citado: leve e numa cor distinta da dos títulos (roxo). */
.quote__body {
  max-width: 46ch;
  font-weight: 300;
  font-size: 2rem;
  color: #8be9fd;
  opacity: 0.75;
}

/* O line-height precisa ser aplicado no <p>: o tema define um valor
   explícito nele, que venceria o valor apenas herdado do contêiner. */
.quote__body :deep(p) {
  line-height: 1.5;
  margin: 0;
}

/* A autoria/fonte (última linha) fica ainda mais discreta. */
.quote__body :deep(p:last-child) {
  margin-top: 1.75rem;
  font-size: 1.1rem;
  line-height: 1.4;
  opacity: 0.7;
}
</style>
