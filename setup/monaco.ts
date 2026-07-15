import { defineMonacoSetup } from '@slidev/types'

export default defineMonacoSetup(() => {
  return {
    editorOptions: {
      wordWrap: 'on',
      lineNumbers: 'on',
      readOnly: true,
      language: 'python'
    },
  }
})
