import { defineMermaidSetup } from '@slidev/types'

// Configuração do Mermaid oficial (renderizador padrão do Slidev).
// - look: 'handDrawn'  → estilo "desenhado à mão" (rough.js), Mermaid v11+.
// - theme: 'dark'      → combina com o deck (`colorSchema: dark`).
// - fontFamily         → mesma `fonts.sans` do deck (DM Sans).
export default defineMermaidSetup(() => {
  return {
    look: 'handDrawn',
    theme: 'dark',
    fontFamily: 'DM Sans, sans-serif',
  }
})
