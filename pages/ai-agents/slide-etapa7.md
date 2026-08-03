---
layout: section
routeAlias: etapa7
---

## **Etapa 7:** Agentes com Memória

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Padrões de memória e conhecimento

#### **Agentes possuem memória e conhecimento com padrões bem conhecidos**

<div class="h-1" />

::left::

<div class="text-17px w-full self-start [&_ul]:my-6 [&_li]:mb-4">

- **Memória de curto prazo** — histórico da conversa dentro da sessão.
- **Memória de longo prazo** — persistência entre sessões.
- **Conhecimento de treinamento** — o que o modelo guarda nos seus pesos internos.
- **Conhecimento recuperado** — dados em tempo real com recuperação de informação (RAG).

</div>

::right::

<div class="h-full flex items-start justify-center">
    <AssetImg src="agent-memory-knowledge-pattern.png" class="w-full max-w-[380px] rounded-lg mt-[30px]" />
</div>

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

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Sessions
source: https://openai.github.io/openai-agents-python/sessions/
---

# Agente com histórico de mensagens (sessão)

#### **Exemplo de histórico gerenciado automaticamente com `SQLiteSession`**

<div class="h-2" />

::left::

```python [main.py] {16,20|all}{maxHeight:'320px',at:+1}
import asyncio
from dotenv import load_dotenv
from agents import (Agent, Runner, SQLiteSession,
                    set_default_openai_api, set_tracing_disabled)

agent = Agent(
    name="Assistente",
    instructions="Você é um assistente pessoal",
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    session = SQLiteSession("first_session", db_path="messages.db")
    while True:
        question = input("You: ")
        result = await Runner.run(starting_agent=agent,
                                  input=question, session=session)
        print("Agent: ", result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!IMPORTANT]
> Com uma `Session`, o SDK grava e recupera o histórico de forma automática.
> 
> Com `SQLiteSession` a conversa é persistida no disco e sobrevive ao reinício do programa.

<!--
## evolução dos 2 slides anteriores: nada de messages, append ou to_input_list. A sessão cuida de armazenar e reinjetar o histórico.

## você passa apenas a pergunta nova (input=question); a Session antepõe automaticamente o histórico salvo antes de chamar o modelo.

## db_path=":memory:" (padrão) guarda em memória e some ao encerrar; com um arquivo (messages.db) a conversa é persistida.

## o session_id ("first_session") isola conversas: sessões diferentes = históricos independentes no mesmo banco.

## há outros backends de Session (ex.: em memória, Redis, etc.); SQLiteSession é o mais simples para persistência local.
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-start justify-center
---

# RAG - Retrieve Augmented Generation

#### **RAG amplia a capacidade de resposta de LLMs usando bases externas**

::left::

<div class="text-left w-full self-start [&_ul]:my-0 [&_li]:mb-3">

<div class="h-5" />

RAG consiste em três etapas:

- **Recuperar:** recupera informações relevantes com base na solicitação do usuário.
- **Aumentar:** adiciona as informações recuperadas como contexto ao prompt do usuário.
- **Gerar:** o LLM produz uma resposta com base no contexto e no prompt do usuário.

</div>

::right::

<div class="flex flex-col items-center">

<div class="h-0" />

<Transform :scale="0.65" origin="top">

```mermaid {theme: 'dark', flowchart: { subGraphTitleMargin: { top: 10, bottom: 10 } }}
---
config:
  theme: dark
  flowchart:
    subGraphTitleMargin:
      top: 10
      bottom: 10
---
flowchart TD
Prompt["Prompt"]
subgraph RAG["RAG"]
  Retrieve["Retrieve"]
  Augment["Augment"]
  Generate["Generate"]
  Retrieve --> Augment --> Generate
end
Answer["Answer"]
Prompt --> Retrieve
Generate --> Answer
```

</Transform>

</div>

<!--
## RAG: Recuperação aumentada por recuperação
-->

---
layout: quote-image
image: /rag-icon.png
---

::title::

# Porque usar RAG?

<div class="h-15" />

::default::

O conhecimento do LLM, que vem do treinamento, é **interno, estático, fixo e público**. O RAG permite adicionar conhecimento **externo, dinâmico, evolutivo e privado**.

&nbsp;

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-start justify-center
---

# RAG: dois tipos de recuperação

#### **A abordagem de recuperar pode mudar quando o dado é estruturado ou não estruturado**

::left::

<div class="text-left w-full self-start [&_ul]:my-0 [&_li]:mb-3">

<div class="h-20" />

- **Dado estruturado:** chamada de ferramenta usando API ou consultas a bancos de dados (já visto na etapa 5).
- **Dado não estruturado:** busca semântica em corpus de textos **(PDF, Docx, HTML)** armazenados como vetores de dados.

</div>

::right::

<div class="flex flex-col items-center">

<div class="h-10" />

```mermaid {theme: 'dark', flowchart: { subGraphTitleMargin: { top: 50, bottom: 10 } }}
---
config:
  theme: dark
  flowchart:
    subGraphTitleMargin:
      top: 10
      bottom: 10
---
flowchart TD
Retriever["Retriever"]
Data{"Data"}
Structured["Structured"]
NotStructured["Not structured"]
DBAPI["Database / API / JSON"]
Embeddings["Embeddings"]
Retriever --> Data
Data --> Structured
Data --> NotStructured
Structured --> DBAPI
NotStructured --> Embeddings
```

</div>

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Tools
source: https://openai.github.io/openai-agents-python/tools/
---

# RAG com dados estruturados

#### **Exemplos de dados estruturados: API, banco de dados, arquivo csv, json, xml**

<div class="h-2" />

::left::

```python [main.py] {7-14,19|all}{maxHeight:'320px',at:+1}
import asyncio
import requests
from dotenv import load_dotenv
from agents import (Agent, Runner, function_tool,
                    set_default_openai_api, set_tracing_disabled)

@function_tool
def get_price_of_bitcoin() -> str:
    """Get the price of Bitcoin."""
    url = ("https://api.coingecko.com/api/v3/simple/price"
           "?ids=bitcoin&vs_currencies=usd")
    response = requests.get(url)
    price = response.json()["bitcoin"]["usd"]
    return f"${price:,.2f} USD."

crypto_agent = Agent(
    name="Assistente Cripto",
    instructions=("Você é um assistente de criptomoedas. "
                  "Use ferramentas para obter dados em tempo real."),
    tools=[get_price_of_bitcoin],
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    result = await Runner.run(starting_agent=crypto_agent,
                              input="Qual é o preço do Bitcoin?")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!NOTE]
> O uso de **tool function** não é obrigatório para caracterizar um sistema de RAG, mas simplifica o sistema.
> 
> O resultado da tool function é adicionado como **contexto ao prompt do usuário**.

---
layout: quote-image
image: /embeddings.png
---

::title::

# RAG, dados não estruturados e embeddings

<div class="h-15" />

::default::

**Embeddings** são representações vetoriais de palavras, e é um dos meios mais comuns de se **compreender contexto** e **semântica da linguagem humana** na área de _Natural Language Processing_ (NLP).

&nbsp;

<!--

## Explicação da imagem: Palavras viram vetores de números

## Processamento de linguagem natural (NLP) é um subcampo da ciência da computação e da inteligência artificial (IA) que usa aprendizado de máquina para permitir que computadores entendam e se comuniquem com a linguagem humana.

-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Porque usar embeddings?

#### **Embeddings permite a _busca semântica_ em grandes volumes de textos**

<div class="h-1" />

::left::

<div class="text-17px w-full self-start [&_ul]:my-0 [&_li]:mb-4">

- Quando a resposta a uma pergunta é uma informação **estruturada** em banco de dados/API, basta uma query/request.
- E quando a resposta a uma pergunta está em um **parágrafo** de um documento com centenas de páginas, **como identificar esse parágrafo?**
- Os embeddings são indicados para cenários com **dados não estruturados**, armazenados tipicamente em grandes documentos **(pdf, html, docx, txt)**

</div>

::right::

<Transform :scale="0.6" origin="top">

<div class="h-full flex items-start justify-center">
    <AssetImg src="pdf-page.png" class="w-full max-w-[380px] rounded-lg mt-[10px]" />
</div>

</Transform>