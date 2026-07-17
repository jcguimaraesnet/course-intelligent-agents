<script setup lang="ts">
/**
 * slide-bottom — barra inferior padronizada, renderizada em TODOS os slides.
 *
 * Por que `slide-bottom` e não `global-bottom`/`global-top`:
 *   - Global layers são INSTÂNCIA ÚNICA, compartilhada entre todos os slides.
 *     A própria doc do Slidev avisa que, se o layer depende de estado de
 *     navegação (é o caso do número da página), o export exige `--per-slide` para sair
 *     correto — e recomenda usar slide layers no lugar.
 *   - `slide-bottom` cria UMA INSTÂNCIA POR SLIDE, então cada uma enxerga o
 *     frontmatter do SEU slide via useSlideContext(). É isso que permite o
 *     `source` funcionar em QUALQUER layout, sem precisar de slot.
 *
 * Conteúdo da barra:
 *   esquerda -> página / total (<SlideCurrentNo/> / <SlidesTotal/>, nativos)
 *   centro   -> link do GitHub; só aparece quando o slide NÃO define `source`
 *   direita  -> a fonte/link do slide, vinda do frontmatter
 *
 * Frontmatter (por slide):
 *   footer: false          -> oculta a barra neste slide (padrão: exibir)
 *   source: <url>          -> link exibido à direita
 *   sourceLabel: <texto>   -> rótulo antes do link (opcional)
 *
 * Exemplo:
 *   ---
 *   source: https://openrouter.ai/models
 *   sourceLabel: Lista completa
 *   ---
 */
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'

const { $frontmatter } = useSlideContext()

// Exibe por padrão; só oculta quando `footer: false` for definido no slide.
const showFooter = computed(() => $frontmatter.footer !== false)

const source = computed<string | undefined>(() => $frontmatter.source)
const sourceLabel = computed<string | undefined>(() => $frontmatter.sourceLabel)

// Apenas para exibição: remove o prefixo `http://` ou `https://`. O `:href`
// continua usando `source` (URL completa), então o link segue direcionando
// corretamente.
const sourceDisplay = computed<string | undefined>(() =>
  source.value?.replace(/^https?:\/\//, ''),
)
</script>

<template>
  <footer v-if="showFooter" class="slidev-footer">
    <div class="slidev-footer__start">
      <SlideCurrentNo />/<SlidesTotal />
    </div>

    <a
      v-if="!source"
      class="slidev-footer__center"
      href="https://github.com/jcguimaraesnet/course-ai-agents"
      target="_blank"
    >
      <ri-github-fill />
      <span>jcguimaraesnet</span>
    </a>

    <div v-if="source" class="slidev-footer__end">
      <span v-if="sourceLabel">{{ sourceLabel }}:</span>
      <a :href="source" target="_blank">{{ sourceDisplay }}</a>
    </div>
  </footer>
</template>

<style scoped>
.slidev-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.4rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.78rem;
  line-height: 1;
  opacity: 0.75;
  z-index: 20;
}

.slidev-footer__start,
.slidev-footer__end {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

/* Centraliza no slide, não entre os irmãos: o `space-between` do footer jogaria
   o link para a borda quando o `__end` não existe. */
.slidev-footer__center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: inherit;
  text-decoration: none;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.slidev-footer__center:hover {
  opacity: 1;
}
</style>
