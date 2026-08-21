---
layout: section
routeAlias: etapa1-4
---

## Etapa 1.4 - Tema Relacionado
<br/>

### **Chatbots**


---

# Projetos de Chatbots mais conhecidos

#### **Todos os projetos se enquadram na categoria "Conversational AI Frameworks"**

<br/>

<div class="[&_table]:w-full text-xs">

| Projeto | ⭐&nbsp;GitHub | Facilidade | Foco principal |
| --- | --- | --- | --- |
| [Gradio](https://github.com/gradio-app/gradio) | ~43k | ⭐⭐⭐⭐⭐ | Chat simples, extremamente rápido, indicado para agentes mais simples |
| [Chainlit](https://github.com/Chainlit/chainlit) | ~12k | ⭐⭐⭐⭐ | Chat mais avançado com mecanismos para mostrar etapas da execução (reasoning) antes da resposta final |
| [NiceGUI](https://github.com/zauberzeug/nicegui) | ~16k | ⭐⭐⭐⭐ | Framework web em Python que permite construir chatbots mais personalizados, com parâmetros, escolha de vários agentes, etc. |
| [Panel](https://github.com/holoviz/panel) | ~5.7k | ⭐⭐⭐ | Combinar chat com visualizações (gráficos) e componentes interativos |
| [Mesop](https://github.com/google/mesop) | ~6k | ⭐⭐⭐⭐ | Feito pelo Google, permite construir app web usando Python, sem precisar desenvolver o frontend |

</div>

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Gradio Docs
source: https://www.gradio.app/docs
---

# Exemplo usando Gradio

#### **O Gradio se destaca pela simplicidade**

::left::

```python [Gradio + OpenAI Agents SDK]{maxHeight:'320px'}
import asyncio
import gradio as gr
from dotenv import load_dotenv
from agents import (Agent, Runner, set_default_openai_api, 
                set_tracing_disabled)

load_dotenv()
set_default_openai_api("chat_completions")
set_tracing_disabled(True)

agent = Agent(
    name="Professor",
    instructions="Você é um professor de história."
)

async def responder(mensagem, historico):
    result = await Runner.run(agent, mensagem)
    return result.final_output

async def main():
    gr.ChatInterface(responder).launch()

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

```bash [instalar o Gradio]
uv add gradio
```

<div class="h-10" />

> [!NOTE]
> O Gradio gera automaticamente a interface de chat — sem necessidade de HTML, CSS ou JavaScript.

---
layout: default
layoutClass: gap-8
---

# Gradio: codificação assistida por IA

#### **Prompt para gerar um agente com Gradio**

<div class="h-7" />

<WindowMockup color="dark" padding="0.5rem 0.5rem 0.5rem 0.5rem" title="prompt.md" codeblock>

```md {*}{maxHeight:'290px'}
# Papel
Você é um engenheiro de IA especialista em sistemas agênticos.

# Tarefa
Desenvolva um chatbot em Python usando Gradio como interface,
com um agente criado com o OpenAI Agents SDK.

# Contexto
1. Script principal "main.py" com programação assíncrona;
   variáveis de ambiente lidas do ".env" via python-dotenv.
2. Configure o SDK para usar a API de chat completions:
   `set_default_openai_api("chat_completions")` e
   `set_tracing_disabled(True)`.
3. Crie um `Agent` com nome e instruções de um especialista
   de sua escolha.
4. Implemente a função `async def responder(mensagem, historico)`
   que usa `Runner.run(agent, mensagem)` e retorna
   `result.final_output`.
5. No `async def main()`, inicie a interface com
   `gr.ChatInterface(responder).launch()`.
6. Use `if __name__ == "__main__": asyncio.run(main())`
   como entry point.

# Saída e Verificação
- Gere apenas o arquivo main.py.
- O código deve ser totalmente funcional e executável com
  `uv run main.py` após `uv add gradio openai-agents python-dotenv`.
```
</WindowMockup>
