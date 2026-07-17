<!--
  Botão extra na barra de navegação inferior: vai para o slide de Ementa.

  O Slidev resolve este arquivo pelo módulo virtual `#slidev/custom-nav-controls`
  e o renderiza dentro da NavControls, depois do contador de slides.

  O alvo é o `routeAlias: ementa` (slides.md), e não o número do slide: assim o
  botão não quebra quando slides são inseridos antes dele.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import IconButton from '@slidev/client/internals/IconButton.vue'

const { go, currentSlideRoute } = useNav()

const naEmenta = computed(() => currentSlideRoute.value?.meta?.slide?.frontmatter?.routeAlias === 'ementa')
</script>

<template>
  <IconButton
    title="Ementa do curso"
    :active="naEmenta"
    @click="go('ementa')"
  >
    <div class="i-carbon:list" />
  </IconButton>
</template>
