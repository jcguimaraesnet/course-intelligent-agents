<script setup lang="ts">
import AssetImg from './AssetImg.vue'

interface Props {
  iconSrc?: string
  label?: string
  subtitle?: string
  type?: 'trigger' | 'action' | 'default'
  scale?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  iconSrc: 'n8n/nodes/manual-trigger.svg',
  label: 'When clicking ‘Test workflow’',
  subtitle: undefined,
  type: 'trigger',
  scale: 1,
})
</script>

<template>
  <div
    class="inline-flex flex-col items-center select-none font-sans origin-center"
    :style="scale !== 1 ? { transform: `scale(${scale})` } : undefined"
  >
    <!-- Card do Nó n8n -->
    <div
      class="relative flex items-center justify-center bg-white hover:bg-gray-50 transition-colors shadow-lg border border-gray-200"
      :class="[
        type === 'trigger'
          ? 'w-24 h-24 rounded-l-[3rem] rounded-r-xl'
          : 'w-24 h-24 rounded-xl'
      ]"
    >
      <!-- Output Handle (lado direito) -->
      <div
        class="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center group-hover:border-[#ff6d5a] transition-colors shadow-sm"
      >
        <div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
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
