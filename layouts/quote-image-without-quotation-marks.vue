<script setup lang="ts">
/**
 * quote-image-without-quotation-marks — citação/texto com imagem ou vídeo à direita sem aspas decorativas.
 *
 * Baseado no layout `quote-image`: mesma tipografia (texto suave, ciano, sem itálico)
 * e mídia na coluna da direita, mas sem o ícone de aspas decorativas.
 *
 * Props (frontmatter):
 *   image?: string   -> caminho da imagem em `public/` (ou URL http/https)
 *   video?: string   -> caminho do vídeo (.mp4, etc.) em `public/` (ou URL http/https)
 *   autoplay?: boolean -> default: true (para vídeo)
 *   loop?: boolean     -> default: true (para vídeo)
 *   muted?: boolean    -> default: true (para vídeo)
 *   controls?: boolean -> default: true (para vídeo)
 *
 * Slots:
 *   ::title::   título (opcional)
 *   default     o texto + a autoria/fonte
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    image?: string
    video?: string
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
    controls?: boolean
  }>(),
  {
    autoplay: true,
    loop: true,
    muted: true,
    controls: true,
  }
)

const mediaSrc = computed(() => props.video || props.image || '')

const isVideo = computed(() => {
  if (props.video) return true
  if (props.image && /\.(mp4|webm|ogg|mov)$/i.test(props.image)) return true
  return false
})

/* Resolve contra o `base` do Vite (necessário no GitHub Pages, que serve
   o deck em /course-intelligent-agents/). URLs absolutas passam direto. */
const resolvedMedia = computed(() => {
  const src = mediaSrc.value
  if (!src) return ''
  if (/^https?:\/\//.test(src)) return src
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${src.replace(/^\//, '')}`
})
</script>

<template>
  <div class="slidev-layout quote-image-without-quotation-marks">
    <!-- Título opcional, largura total -->
    <div v-if="$slots.title" class="qiwq__title">
      <slot name="title" />
    </div>

    <div class="qiwq__row my-auto">
      <!-- Coluna do texto (sem as aspas decorativas) -->
      <div class="qiwq__text">
        <div class="qiwq__body">
          <slot />
        </div>
      </div>

      <!-- Coluna de mídia (imagem ou vídeo) -->
      <figure class="qiwq__media">
        <video
          v-if="isVideo"
          :src="resolvedMedia"
          :autoplay="autoplay"
          :loop="loop"
          :muted="muted"
          :controls="controls"
          playsinline
        />
        <img v-else-if="resolvedMedia" :src="resolvedMedia" alt="" />
      </figure>
    </div>
  </div>
</template>

<style scoped>
.quote-image-without-quotation-marks {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.qiwq__title :deep(:is(h1, h2)) {
  margin: 0;
}

.qiwq__row {
  display: flex;
  align-items: center;
  gap: 3rem;
  width: 100%;
}

/* --- Coluna do texto --- */
.qiwq__text {
  position: relative;
  flex: 1 1 58%;
  min-width: 0;
}

/* Texto citado: leve e numa cor distinta da dos títulos (roxo). */
.qiwq__body {
  font-weight: 300;
  font-size: 1.6rem;
  color: #8be9fd;
  opacity: 0.75;
}

/* O line-height precisa ir no <p>: o tema define um valor explícito nele,
   que venceria o valor apenas herdado do contêiner. */
.qiwq__body :deep(p) {
  line-height: 1.5;
  margin: 0;
}

/* Autoria/fonte (última linha) mais discreta. */
.qiwq__body :deep(p:last-child) {
  margin-top: 1.5rem;
  font-size: 1rem;
  line-height: 1.4;
  opacity: 0.7;
}

/* --- Coluna da mídia (imagem / vídeo) --- */
.qiwq__media {
  flex: 1 1 42%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.qiwq__media img,
.qiwq__media video {
  max-height: 55vh;
  max-width: 100%;
  object-fit: cover;
  border-radius: 1rem;
}
</style>
