---
layout: section
routeAlias: etapa7
---

## **Etapa 7:** Agentes com Memória

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Conversations
source: https://openai.github.io/openai-agents-python/running_agents/
---

# Agente com histórico de mensagens (manual)

#### **Exemplo de histórico de mensagens gerenciando manualmente**

<div class="h-2" />

::left::

```python [main.py] {16,19,22-23|all}{maxHeight:'320px',at:+1}
import asyncio
from dotenv import load_dotenv
from agents import (Agent, Runner,
                    set_default_openai_api, set_tracing_disabled)

agent = Agent(
    name="Assistente",
    instructions="Você é um assistente pessoal",
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    messages = []
    while True:
        question = input("You: ")
        messages.append({"role": "user", "content": question})
        result = await Runner.run(starting_agent=agent, input=messages)
        print("Agent: ", result.final_output)
        messages.append(
            {"role": "assistant", "content": result.final_output})

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!IMPORTANT]
> O array **messages** é uma lista de **Response InputItem**, construída manualmente.
> 
> Cada mensagem é escrita de forma **verbosa**: as chaves role, content, user, assistant, estrutura do objeto, tudo na mão.

<!--
## sem histórico, cada Runner.run é isolado: o agente não lembra do turno anterior. Acumular messages dá memória de curto prazo à conversa.

## o input do Runner aceita uma lista de ResponseInputItem (o mesmo formato de messages[] do chat completions).

## a cada volta: acrescenta a pergunta do usuário, roda, imprime, e acrescenta a resposta do assistente ao histórico.

## verboso e propenso a erro: você monta na mão cada dict com "role"/"content"; esquecer de anexar a resposta quebra a memória.

## input() é bloqueante; num serviço real troque o while True por um handler de requisições.
-->

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Conversations
source: https://openai.github.io/openai-agents-python/running_agents/
---

# Agente com histórico de mensagens (polido)

#### **Exemplo de histórico de mensagens melhor gerenciado com `to_input_list()`**

<div class="h-2" />

::left::

```python [main.py] {16,22|all}{maxHeight:'320px',at:+1}
import asyncio
from dotenv import load_dotenv
from agents import (Agent, Runner, TResponseInputItem,
                    set_default_openai_api, set_tracing_disabled)

agent = Agent(
    name="Assistente",
    instructions="Você é um assistente pessoal",
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    messages: list[TResponseInputItem] = []
    while True:
        question = input("You: ")
        messages.append({"role": "user", "content": question})
        result = await Runner.run(starting_agent=agent, input=messages)
        print("Agent: ", result.final_output)
        messages = result.to_input_list()

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!IMPORTANT]
> `result.to_input_list()` devolve **todo o histórico** já no formato **ResponseInputItem**.
> 
> Inclui o que você enviou **e tudo que o agente gerou**, evitando o acúmulo manual e propenso a erro.

<!--
## to_input_list() reconstrói a lista de entrada a partir do resultado: entrada original + todos os itens novos gerados no run.

## substitui o append manual da resposta: menos código, sem esquecer campos, e captura mais do que só texto (ex.: chamadas de ferramenta).

## a pergunta do usuário ainda é anexada antes do run; o to_input_list cuida do resto do histórico após o run.

## é o padrão recomendado para manter conversas multi-turno no Agents SDK sem gerenciar o formato à mão.
-->

