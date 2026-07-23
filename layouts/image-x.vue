<script setup lang="ts">
/**
 * image-x — imagem de um lado, conteúdo (slot) do outro.
 * Baseado no layout `image-x` do tema Purplin (moudev/slidev-theme-purplin).
 *
 * Props (frontmatter do slide):
 *   image: string       -> URL/caminho da imagem (obrigatório)
 *   imageOrder: 1 | 2    -> 1 = imagem à ESQUERDA + texto à DIREITA
 *                           2 = imagem à DIREITA  + texto à ESQUERDA (padrão)
 *
 * textAlignment é derivado de imageOrder (como no layout original):
 * o texto se alinha para o lado oposto à imagem.
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    image: string
    imageOrder?: number
  }>(),
  { imageOrder: 2 },
)

/* Resolve a imagem contra o `base` do Vite (necessário no GitHub Pages,
   que serve o deck em /course-intelligent-agents/). Ignora URLs absolutas (http/https). */
const resolvedImage = computed(() => {
  if (/^https?:\/\//.test(props.image)) return props.image
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${props.image.replace(/^\//, '')}`
})

const imageOrder = computed(() => (props.imageOrder === 1 ? 'order-1' : 'order-2'))
const textAlignment = computed(() =>
  props.imageOrder === 1
    ? 'text-right order-2 justify-end'
    : 'text-left order-1 justify-start',
)
</script>

<template>
  <div class="slidev-layout h-full flex flex-col image-x">
    <!-- Título opcional no topo, ocupando a largura toda. -->
    <div v-if="$slots.title" class="image-x__title">
      <slot name="title" />
    </div>

    <div class="my-auto flex w-full">
      <div
        class="w-1/2 flex justify-center items-center p-8"
        :class="imageOrder"
      >
        <img :src="resolvedImage" class="image-x__img" />
      </div>
      <div
        class="w-1/2 flex flex-col justify-center image-x__content"
        :class="textAlignment"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Cabeçalho no topo do slide (slot ::title::). */
.image-x__title :deep(:is(h1, h2)) {
  margin: 0;
}

/* Conteúdo do slot default: fonte um pouco maior que o padrão. */
.image-x__content {
  font-size: 1.5rem;
  line-height: 1.6;
}

.image-x__img {
  max-height: 70vh;
  object-fit: cover;
  border-radius: 1rem;
  border: 4px solid var(--slidev-theme-primary, #bd93f9);
}
</style>
