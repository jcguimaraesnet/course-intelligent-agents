<script setup lang="ts">
import { computed } from 'vue'
import AssetImg from './AssetImg.vue'

interface Props {
  iconSrc?: string
  label?: string
  subtitle?: string
  type?: 'trigger' | 'action' | 'default'
  scale?: number | string
  connector?: 'plus' | 'arrow' | 'none'
  arrow?: boolean
  firstOutput?: boolean | string
  secondOutput?: boolean | string
  thirdOutput?: boolean | string
}

const props = withDefaults(defineProps<Props>(), {
  iconSrc: 'n8n/nodes/manual-trigger.svg',
  label: 'When clicking ‘Test workflow’',
  subtitle: undefined,
  type: 'trigger',
  scale: 1,
  connector: 'plus',
  arrow: false,
  firstOutput: true,
  secondOutput: false,
  thirdOutput: false,
})

const getLabel = (val?: boolean | string) => {
  return typeof val === 'string' && val !== 'true' ? val : undefined
}

const outputs = computed(() => {
  if (props.connector === 'none') return []
  if (props.thirdOutput !== undefined && props.thirdOutput !== false && props.thirdOutput !== 'false') {
    return [
      { id: 1, posClass: 'top-3 -translate-y-1/2', label: getLabel(props.firstOutput) },
      { id: 2, posClass: 'top-1/2 -translate-y-1/2', label: getLabel(props.secondOutput) },
      { id: 3, posClass: 'bottom-3 translate-y-1/2', label: getLabel(props.thirdOutput) },
    ]
  }
  if (props.secondOutput !== undefined && props.secondOutput !== false && props.secondOutput !== 'false') {
    return [
      { id: 1, posClass: 'top-5 -translate-y-1/2', label: getLabel(props.firstOutput) },
      { id: 2, posClass: 'bottom-5 translate-y-1/2', label: getLabel(props.secondOutput) },
    ]
  }
  return [
    { id: 1, posClass: 'top-1/2 -translate-y-1/2', label: getLabel(props.firstOutput) },
  ]
})
</script>

<template>
  <div
    class="inline-flex flex-col items-center select-none font-sans origin-center"
    :style="scale !== 1 ? { transform: `scale(${scale})` } : undefined"
  >
    <!-- Card do Nó n8n -->
    <div
      class="relative flex items-center justify-center bg-white hover:bg-gray-50 transition-colors shadow-lg border-2 border-gray-400"
      :class="[
        type === 'trigger'
          ? 'w-24 h-24 rounded-l-[3rem] rounded-r-xl'
          : 'w-24 h-24 rounded-xl'
      ]"
    >
      <!-- Output Handles (lado direito) -->
      <div
        v-for="out in outputs"
        :key="out.id"
        class="absolute -right-2 w-4 h-4 bg-white border border-gray-600 rounded-full group-hover:border-[#ff6d5a] transition-colors shadow-sm flex items-center z-10"
        :class="out.posClass"
      >
        <!-- Linha horizontal saindo do conector -->
        <div class="absolute left-full top-1/2 -translate-y-1/2 w-[50px] h-[2px] bg-gray-400 pointer-events-none">
          <!-- Rótulo/Legenda acima da linha, centralizado em relação à linha -->
          <span
            v-if="out.label"
            class="absolute left-1/2 -translate-x-1/2 bottom-full mb-[1px] text-[10px] font-semibold text-white whitespace-nowrap leading-none pointer-events-none"
          >
            {{ out.label }}
          </span>

          <!-- Seta ou Quadrado com '+' no extremo direito da reta -->
          <!-- Seta -->
          <div
            v-if="arrow || connector === 'arrow'"
            class="absolute left-full top-1/2 -translate-y-1/2 -translate-x-[2px] flex items-center justify-center text-gray-400 select-none"
          >
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </div>

          <!-- Quadrado com '+' (padrão) -->
          <div
            v-else
            class="absolute left-full top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-400 border border-gray-600 rounded-sm shadow-sm flex items-center justify-center text-gray-800 text-xs font-bold leading-none select-none"
          >
            +
          </div>
        </div>
      </div>

      <!-- Ícone Central -->
      <div class="w-12 h-12 flex items-center justify-center p-1">
        <AssetImg :src="iconSrc" class="w-full h-full object-contain filter drop-shadow" />
      </div>
    </div>

    <!-- Label / Subtítulo abaixo do nó -->
    <div class="mt-3 text-center max-w-[200px] flex flex-col items-center">
      <span class="text-sm font-semibold text-gray-100 leading-snug tracking-tight">
        {{ label }}
      </span>
      <span v-if="subtitle" class="text-xs text-gray-400 mt-0.5 font-normal">
        {{ subtitle }}
      </span>
    </div>
  </div>
</template>
