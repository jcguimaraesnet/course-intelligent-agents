<script setup lang="ts">
import { computed } from 'vue'
import AssetImg from './AssetImg.vue'

interface Props {
  label?: string
  iconSrc?: string
  scale?: number | string
  showWarning?: boolean
  connector?: 'plus' | 'arrow' | 'none'
  // Configuração das conexões inferiores (sub-nós de IA)
  showSubnodes?: boolean
  chatModelLabel?: string
  memoryLabel?: string
  toolLabel?: string
  chatModelRequired?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: 'AI Agent',
  iconSrc: 'n8n/nodes/ai-agent.svg',
  scale: 1,
  showWarning: false,
  connector: 'plus',
  showSubnodes: true,
  chatModelLabel: 'Chat Model',
  memoryLabel: 'Memory',
  toolLabel: 'Tool',
  chatModelRequired: true,
})
</script>

<template>
  <div
    class="inline-flex flex-col items-center select-none font-sans origin-center text-left"
    :style="scale !== 1 ? { transform: `scale(${scale})` } : undefined"
  >
    <!-- Nó Principal no Canvas -->
    <div class="relative">
      <!-- Handle Esquerdo (Entrada) -->
      <div class="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-gray-600 rounded-full shadow-sm z-10" />

      <!-- Card do Nó AI Agent (Fundo Branco, Borda Arredondada) -->
      <div
        class="relative w-64 h-24 bg-white border-2 border-gray-400 rounded-2xl shadow-md flex items-center px-4 gap-3"
      >
        <!-- Ícone do Robô/Agente -->
        <div class="w-12 h-12 flex items-center justify-center shrink-0">
          <AssetImg
            v-if="iconSrc"
            :src="iconSrc"
            class="w-full h-full object-contain filter drop-shadow"
          />
          <svg v-else class="w-10 h-10 text-gray-800 fill-current" viewBox="0 0 24 24">
            <path d="M12 2a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v2h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h1V7a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm-3 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
          </svg>
        </div>

        <!-- Título do Nó -->
        <span class="text-lg font-medium text-gray-800 tracking-tight select-none">
          {{ label }}
        </span>

        <!-- Ícone de Alerta (Triângulo Vermelho) na parte inferior direita -->
        <div v-if="showWarning" class="absolute right-3 bottom-2">
          <div class="w-5 h-5 bg-red-600 rounded-sm flex items-center justify-center shadow-sm">
            <span class="text-white text-xs font-black leading-none">!</span>
          </div>
        </div>
      </div>

      <!-- Handle Direito (Saída) + Reta + Botão '+' -->
      <div
        v-if="connector !== 'none'"
        class="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-gray-600 rounded-full shadow-sm flex items-center z-10"
      >
        <!-- Linha horizontal saindo do conector -->
        <div class="absolute left-full top-1/2 -translate-y-1/2 w-[50px] h-[2px] bg-gray-400 pointer-events-none">
          <!-- Quadrado com '+' (padrão do n8n) -->
          <div
            class="absolute left-full top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-400 border border-gray-600 rounded-sm shadow-sm flex items-center justify-center text-gray-800 text-xs font-bold leading-none select-none"
          >
            +
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Conexões Inferiores (Diamantes + Linhas + Rótulos + Botões '+') -->
    <div v-if="showSubnodes" class="w-64 grid grid-cols-3 relative -mt-2">
      <!-- Sub-nó 1: Chat Model -->
      <div class="relative flex flex-col items-center">
        <!-- Linha vertical contínua de fundo -->
        <div class="absolute top-1.5 bottom-2 w-[2px] bg-gray-400 z-0" />
        <!-- Diamante encostado na borda do nó -->
        <div class="w-3.5 h-3.5 bg-white border border-gray-600 rotate-45 shadow-sm z-10 mb-2" />
        <!-- Rótulo -->
        <span class="z-10 text-[11px] font-normal text-white leading-tight mb-5">
          {{ chatModelLabel }}<span v-if="chatModelRequired" class="text-red-500 font-semibold">*</span>
        </span>
        <!-- Botão '+' -->
        <div class="w-4 h-4 bg-gray-400 border border-gray-600 rounded-sm shadow-sm flex items-center justify-center text-gray-800 text-xs font-bold leading-none select-none z-10">
          +
        </div>
      </div>

      <!-- Sub-nó 2: Memory -->
      <div class="relative flex flex-col items-center">
        <!-- Linha vertical contínua de fundo -->
        <div class="absolute top-1.5 bottom-2 w-[2px] bg-gray-400 z-0" />
        <!-- Diamante encostado na borda do nó -->
        <div class="w-3.5 h-3.5 bg-white border border-gray-600 rotate-45 shadow-sm z-10 mb-2" />
        <!-- Rótulo -->
        <span class="z-10 text-[11px] font-normal text-white leading-tight mb-5">
          {{ memoryLabel }}
        </span>
        <!-- Botão '+' -->
        <div class="w-4 h-4 bg-gray-400 border border-gray-600 rounded-sm shadow-sm flex items-center justify-center text-gray-800 text-xs font-bold leading-none select-none z-10">
          +
        </div>
      </div>

      <!-- Sub-nó 3: Tool -->
      <div class="relative flex flex-col items-center">
        <!-- Linha vertical contínua de fundo -->
        <div class="absolute top-1.5 bottom-2 w-[2px] bg-gray-400 z-0" />
        <!-- Diamante encostado na borda do nó -->
        <div class="w-3.5 h-3.5 bg-white border border-gray-600 rotate-45 shadow-sm z-10 mb-2" />
        <!-- Rótulo -->
        <span class="z-10 text-[11px] font-normal text-white leading-tight mb-5">
          {{ toolLabel }}
        </span>
        <!-- Botão '+' -->
        <div class="w-4 h-4 bg-gray-400 border border-gray-600 rounded-sm shadow-sm flex items-center justify-center text-gray-800 text-xs font-bold leading-none select-none z-10">
          +
        </div>
      </div>
    </div>
  </div>
</template>
