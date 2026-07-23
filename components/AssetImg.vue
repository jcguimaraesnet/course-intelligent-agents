<script setup lang="ts">
/**
 * AssetImg — <img> para arquivos da pasta `public/`, ciente do `base` do Vite,
 * com recorte (crop) lateral opcional.
 *
 * Por que existe:
 *   - `<img src="/foo.jpg">` (estático) quebra no build do Slidev (import guard / fs.allow).
 *   - `<img :src="'/foo.jpg'">` (runtime) funciona, mas NÃO recebe o prefixo do `--base`,
 *     então quebraria em produção num project site (ex.: /course-intelligent-agents/).
 *
 * Resolve o caminho contra `import.meta.env.BASE_URL`:
 *   dev        -> BASE_URL = "/"                  -> /foo.jpg
 *   produção   -> BASE_URL = "/course-intelligent-agents/" -> /course-intelligent-agents/foo.jpg
 *
 * Uso:
 *   <AssetImg src="foo.jpg" class="rounded-lg h-70 border-4 border-white" />
 *   <AssetImg src="foo.png" class="rounded-lg" crop-left="80px" crop-right="120px" />
 *
 * --- crop ---
 * `cropLeft` / `cropRight` aceitam qualquer medida CSS (prefira px/rem).
 * Usa `clip-path: inset()` (esconde a faixa) + margem negativa (colapsa o espaço
 * no layout, para não sobrar vão ao lado da imagem).
 *
 * Não tente cortar com um wrapper `overflow: hidden`: isso depende do wrapper
 * encolher (shrink-to-fit), e as colunas do deck costumam ser flex containers,
 * que "blockificam" os filhos (inline-block vira block). O resultado era o crop
 * da direita não funcionar. `clip-path` é relativo à própria imagem e independe disso.
 *
 * --- borda + crop não convivem ---
 * SEM crop, uma borda via `class` (ex.: `border-4 border-white`) funciona normalmente.
 * COM crop, o `clip-path` recorta o elemento INTEIRO — inclusive a borda —, então as
 * bordas esquerda/direita somem junto com a faixa cortada. Isso é aceito de propósito:
 * a alternativa (um wrapper para a moldura) foi descartada para manter a API simples.
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Caminho do arquivo dentro de `public/` (com ou sem "/" inicial). */
    src: string
    alt?: string
    /** Quanto recortar da borda esquerda (ex.: "80px", "2rem"). */
    cropLeft?: string
    /** Quanto recortar da borda direita (ex.: "120px", "2rem"). */
    cropRight?: string
  }>(),
  { cropLeft: '0px', cropRight: '0px' },
)

const resolved = computed(() => {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${props.src.replace(/^\//, '')}`
})

const isZero = (v: string) => Number.parseFloat(v) === 0
const hasCrop = computed(() => !isZero(props.cropLeft) || !isZero(props.cropRight))

const cropStyle = computed(() => {
  if (!hasCrop.value) return undefined
  return {
    display: 'block',
    clipPath: `inset(0 ${props.cropRight} 0 ${props.cropLeft})`,
    marginLeft: `-${props.cropLeft}`,
    marginRight: `-${props.cropRight}`,
  }
})
</script>

<template>
  <img :src="resolved" :alt="alt ?? ''" :style="cropStyle" />
</template>
