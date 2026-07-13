<script setup lang="ts">
/**
 * quote-image — citação com uma imagem à direita.
 *
 * Variante do layout `quote`: mesma tipografia (texto suave, ciano, sem itálico)
 * e as aspas decorativas, mas com uma imagem ocupando a coluna da direita.
 *
 * Props (frontmatter):
 *   image: string   -> caminho da imagem em `public/` (ou URL http/https)
 *
 * Slots:
 *   ::title::   título (opcional)
 *   default     o texto citado + a autoria
 *
 * Uso:
 *   ---
 *   layout: quote-image
 *   image: /foto.jpg
 *   ---
 *
 *   ::title::
 *   # O que é um Agente?
 *
 *   ::default::
 *   "A citação vai aqui."
 *
 *   — Autor, *Obra*
 */
import { computed } from 'vue'

const props = defineProps<{
  image: string
}>()

/* Resolve contra o `base` do Vite (necessário no GitHub Pages, que serve
   o deck em /course-ai-agents/). URLs absolutas passam direto. */
const resolvedImage = computed(() => {
  if (/^https?:\/\//.test(props.image)) return props.image
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${props.image.replace(/^\//, '')}`
})
</script>

<template>
  <div class="slidev-layout quote-image">
    <!-- Título opcional, largura total -->
    <div v-if="$slots.title" class="qi__title">
      <slot name="title" />
    </div>

    <div class="qi__row my-auto">
      <!-- Coluna do texto (com as aspas decorativas) -->
      <div class="qi__text">
        <ri-double-quotes-r class="qi__mark" aria-hidden="true" />
        <div class="qi__body">
          <slot />
        </div>
      </div>

      <!-- Coluna da imagem -->
      <figure class="qi__image">
        <img :src="resolvedImage" alt="" />
      </figure>
    </div>
  </div>
</template>

<style scoped>
.quote-image {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.qi__title :deep(:is(h1, h2)) {
  margin: 0;
}

.qi__row {
  display: flex;
  align-items: center;
  gap: 3rem;
  width: 100%;
}

/* --- Coluna do texto --- */
.qi__text {
  position: relative;
  flex: 1 1 58%;
  min-width: 0;
}

/* Aspas: discretas, ancoradas ACIMA do texto e à direita da COLUNA DE TEXTO
   (não do slide, para não colidir com a imagem).
   `bottom: 100%` garante que fiquem inteiramente fora do bloco de texto,
   sem sobrepor as primeiras linhas da citação. */
.qi__mark {
  position: absolute;
  bottom: calc(100% + 0.5rem);
  right: 0;
  font-size: 5rem;
  line-height: 1;
  color: #8be9fd;
  opacity: 0.15;
  pointer-events: none;
}

/* Texto citado: leve e numa cor distinta da dos títulos (roxo). */
.qi__body {
  font-weight: 300;
  font-size: 1.6rem;
  color: #8be9fd;
  opacity: 0.75;
}

/* O line-height precisa ir no <p>: o tema define um valor explícito nele,
   que venceria o valor apenas herdado do contêiner. */
.qi__body :deep(p) {
  line-height: 1.5;
  margin: 0;
}

/* Autoria/fonte (última linha) mais discreta. */
.qi__body :deep(p:last-child) {
  margin-top: 1.5rem;
  font-size: 1rem;
  line-height: 1.4;
  opacity: 0.7;
}

/* --- Coluna da imagem --- */
.qi__image {
  flex: 1 1 42%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.qi__image img {
  max-height: 55vh;
  max-width: 100%;
  object-fit: cover;
  border-radius: 1rem;
}
</style>
