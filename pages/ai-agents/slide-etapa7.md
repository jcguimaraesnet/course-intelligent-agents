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

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Busca semântica por similaridade de cosseno 

#### **A busca por similaridade é o "equivalente" a uma query de igualdade em banco de dados**

<div class="h-2" />

::left::

<div class="text-16px w-full self-start [&_ul]:my-0 [&_li]:mb-4">

- Cada palavra é um **vetor** com centenas de índices (dimensões), onde cada índice representa uma característica.
- As palavras **aeronave** e **avião** têm representações vetoriais com números parecidos, portanto mais **similares**.
- A **similaridade de cosseno** é um dos algoritmos matemáticos mais usados para comparar dois trechos de texto, usando seu significado semântico (os embeddings).

</div>

::right::

<div class="h-full flex items-start justify-center">
    <AssetImg src="embeddings.png" class="w-full max-w-[380px] rounded-lg mt-[8px]" />
</div>

---
layout: default
---

# A similaridade de cosseno (em detalhes)

#### **Exemplo prático de similaridade de cosseno**

<div class="h-2" />

<div class="text-14px">

| User Prompt | Embedding | Frases (de uma notícia) | Embedding | Similaridade Cosseno |
| --- | --- | --- | --- | --- |
| Quem gosta de jogar poker? | `[0.91, 0.12, 0.40, …]` | Poker exige muita estratégia | `[0.26, 0.81, 0.49, …]` | **0.67** |
| Quem gosta de jogar poker? | `[0.91, 0.12, 0.40, …]` | Poker é um jogo difícil | `[0.31, 0.76, 0.54, …]` | **0.71** |
| Quem gosta de jogar poker? | `[0.91, 0.12, 0.40, …]` | Neymar deve jogar poker amanhã | `[0.74, 0.33, 0.58, …]` | **0.85** |
| Quem gosta de jogar poker? | `[0.91, 0.12, 0.40, …]` | Neymar aprecia jogos de poker | `[0.89, 0.15, 0.42, …]` | **0.98** |

</div>

<div class="h-2" />

> [!NOTE]
> A similaridade de cosseno é calculada medindo o cosseno do ângulo entre dois vetores de embeddings em um espaço multidimensional. Valores variam entre **-1** e **1** (ou normalizados entre **0** e **1**), onde valores mais próximos de **1** indicam alta similaridade semântica, e próximos de **0** indicam pouca ou nenhuma similaridade.

<!--
## O valor varia entre -1 e 1 (ou 0 e 1 dependendo da normalização), onde:
## 1 significa que os vetores apontam na mesma direção (alta similaridade semântica)
## 0 significa ortogonalidade (sem correlação)
## -1 significa direções opostas (significados opostos)
-->

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-start justify-center
---

# Bancos de dados vetoriais (Vector DB)

#### **Vector DB armazena embeddings e executa buscas por similaridade em larga escala**

::left::

<div class="text-16px w-full self-start [&_ul]:my-0 [&_li]:mb-4">

<div class="h-2" />

- Para centenas de documentos, calcular a similaridade de cosseno um a um em memória é viável.
- Para **milhões de documentos**, precisamos de um **banco de dados especializado**: o banco vetorial.
- Ele armazena o texto junto com seu vetor (embedding) e usa algoritmos de busca aproximada (ANN - _Approximate Nearest Neighbors_) para responder em milissegundos.

</div>

::right::

<div class="flex flex-col items-center">

<div class="h-0" />

<Transform :scale="0.85" origin="top">

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
Doc["Documento"] --> Split["Chunks"]
Split --> Embed["Embedding Model"]
Embed --> VectorDB[("Vector DB")]
Query["User Query"] --> QEmbed["Embedding Model"]
QEmbed --> Search["Busca Cosseno / ANN"]
VectorDB --> Search
Search --> Context["Top-K Chunks"]
```

</Transform>

</div>

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-start justify-center
---

# Principais Bancos Vetoriais do Mercado

#### **Soluções dedicadas e extensões para bancos relacionais existentes**

<div class="h-2" />

::left::

<div class="text-15px w-full self-start [&_ul]:my-0 [&_li]:mb-3">

**Bancos Vetoriais Dedicados:**
- **ChromaDB** — open-source, leve, roda embutido ou como serviço (ideal para protótipos e ensino).
- **Qdrant** — escrito em Rust, alta performance, filtros avançados.
- **Pinecone** — totalmente gerenciado (SaaS), escala massiva na nuvem.
- **Milvus** — projetado para bilhões de vetores em escala corporativa.

</div>

::right::

<div class="text-15px w-full self-start [&_ul]:my-0 [&_li]:mb-3">

**Extensões em Bancos Tradicionais:**
- **PostgreSQL + pgvector** — adiciona busca vetorial diretamente ao Postgres (a escolha mais popular em produção).
- **Redis** — busca vetorial ultra-rápida em memória.
- **MongoDB Atlas Vector** — busca vetorial no MongoDB gerenciado.

> [!TIP]
> Para quem já usa PostgreSQL, o **pgvector** costuma ser a melhor escolha inicial para evitar manter mais um banco na infraestrutura.

</div>

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: ChromaDB
source: https://docs.trychroma.com/
---

# RAG com ChromaDB (exemplo prático)

#### **Indexando documentos e consultando por similaridade semântica**

<div class="h-2" />

::left::

```python [chroma_rag.py] {6,11-15,18-20|all}{maxHeight:'320px',at:+1}
import chromadb

# 1. Cria cliente ChromaDB em memória
client = chromadb.Client()
collection = client.create_collection(
    name="noticias_futebol"
)

# 2. Adiciona documentos (Chroma calcula embeddings)
collection.add(
    documents=[
        "Poker exige muita estratégia e concentração",
        "Poker é um jogo de cartas difícil de dominar",
        "Neymar deve jogar poker amanhã no torneio",
        "Neymar aprecia jogos de poker nas horas vagas",
    ],
    ids=["doc1", "doc2", "doc3", "doc4"]
)

# 3. Busca os 2 documentos mais similares
results = collection.query(
    query_texts=["Quem gosta de jogar poker?"],
    n_results=2
)
print(results["documents"])
# Retorna: [['Neymar aprecia...', 'Neymar deve...']]
```

::right::

> [!IMPORTANT]
> O **ChromaDB** embute por padrão o modelo `all-MiniLM-L6-v2` para gerar embeddings automaticamente ao adicionar textos.
> 
> A chamada `collection.query()` calcula a similaridade de cosseno debaixo dos panos e já devolve os **Top-K** documentos mais relevantes!

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: RAG + Agent
source: https://openai.github.io/openai-agents-python/tools/
---

# Conectando o RAG ao Agente de IA

#### **Integrando o Vector DB como uma Tool Function para o Agente**

<div class="h-2" />

::left::

```python [agent_rag.py] {8-16,21|all}{maxHeight:'320px',at:+1}
import asyncio
from dotenv import load_dotenv
from agents import (Agent, Runner, function_tool,
                    set_default_openai_api, set_tracing_disabled)
import chromadb

client = chromadb.Client()
collection = client.get_collection("noticias_futebol")

@function_tool
def buscar_base_conhecimento(query: str) -> str:
    """Busca trechos relevantes na base de documentos."""
    res = collection.query(query_texts=[query], n_results=2)
    docs = res["documents"][0]
    return "\n---\n".join(docs)

rag_agent = Agent(
    name="Assistente de Notícias",
    instructions=("Você é um assistente que responde dúvidas "
                  "consultando a ferramenta buscar_base_conhecimento."),
    tools=[buscar_base_conhecimento],
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)
    res = await Runner.run(starting_agent=rag_agent,
                           input="Qual famoso gosta de poker?")
    print(res.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!NOTE]
> O agente decide **autonomamente** quando precisa consultar o banco vetorial através da descrição da ferramenta (`function_tool`).
> 
> Ele recebe o contexto recuperado e gera uma resposta precisa e embasada.

---
layout: section
routeAlias: etapa8
---

## **Etapa 8:** Agentes Multiagentes

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Do agente único ao multiagente

#### **Como sistemas evoluem de agentes individuais para equipes colaborativas**

<div class="h-1" />

::left::

<div class="text-17px w-full self-start [&_ul]:my-6 [&_li]:mb-4">

- **Limitações do agente único:** complexidade excessiva no prompt, context window saturada, alucinação por sobrecarga de papéis.
- **Princípio da especialização:** cada agente tem um papel focado, poucas ferramentas e instruções precisas.
- **Orquestração:** um coordenador divide o problema e delega tarefas aos especialistas.

</div>

::right::

<div class="h-full flex items-start justify-center">
    <AssetImg src="multiagent-collaboration.png" class="w-full max-w-[380px] rounded-lg mt-[30px]" />
</div>

---
layout: default
---

# Padrões de colaboração multiagente

#### **Os quatro padrões arquiteturais mais comuns em sistemas multiagentes**

<div class="h-4" />

<div class="grid grid-cols-2 gap-6 text-15px">

<div class="border border-[#444] rounded-lg p-4 bg-[#1a1a2e]/40">

### 1. Handoff (Transmissão de Turno)
Um agente transfere o controle totalmente para outro quando o contexto muda de domínio.
- _Exemplo:_ Triagem direciona cliente para Suporte Técnico ou Vendas.
</div>

<div class="border border-[#444] rounded-lg p-4 bg-[#1a1a2e]/40">

### 2. Supervisor / Roteador
Um agente central recebe a solicitação, decide qual agente especialista deve agir e sintetiza a resposta.
- _Exemplo:_ Editor-chefe delegando pesquisa e redação.
</div>

<div class="border border-[#444] rounded-lg p-4 bg-[#1a1a2e]/40">

### 3. Pipeline Sequencial
A saída de um agente serve diretamente como entrada para o próximo em uma esteira de processamento.
- _Exemplo:_ Agente Extrator $\rightarrow$ Agente Analista $\rightarrow$ Agente Formatador.
</div>

<div class="border border-[#444] rounded-lg p-4 bg-[#1a1a2e]/40">

### 4. Debate / Consenso
Múltiplos agentes analisam o mesmo problema sob perspectivas diferentes e chegam a um veredito comum.
- _Exemplo:_ Agente Pró vs. Agente Contra para avaliar risco de crédito.
</div>

</div>

---
layout: two-cols-header
layoutClass: gap-8
sourceLabel: Handoffs
source: https://openai.github.io/openai-agents-python/handoffs/
---

# Exemplo de Handoff com OpenAI Agents SDK

#### **Transferência transparente de responsabilidade entre agentes especialistas**

<div class="h-2" />

::left::

```python [handoff.py] {14,21|all}{maxHeight:'320px',at:+1}
import asyncio
from dotenv import load_dotenv
from agents import (Agent, Runner,
                    set_default_openai_api, set_tracing_disabled)

suporte_tecnico = Agent(
    name="Suporte Técnico",
    instructions="Resolva problemas de TI e bugs de software.",
)

agente_triagem = Agent(
    name="Triagem",
    instructions="Encaminhe dúvidas técnicas para o suporte.",
    handoffs=[suporte_tecnico],
)

async def main():
    load_dotenv()
    set_default_openai_api("chat_completions")
    set_tracing_disabled(True)

    result = await Runner.run(
        starting_agent=agente_triagem,
        input="Meu app está dando erro de conexão 500."
    )
    print(f"Agente final: {result.last_agent.name}")
    print(f"Resposta: {result.final_output}")

if __name__ == "__main__":
    asyncio.run(main())
```

::right::

> [!IMPORTANT]
> Ao usar `handoffs=[suporte_tecnico]`, o SDK transforma a transferência em uma **ferramenta nativa** que o modelo aciona quando identifica que a solicitação foge da sua área.
> 
> O histórico completo da conversa acompanha a troca de agente sem perdas!



---
layout: center
class: text-center
---

# Parabéns! 🎓

### Você completou o ciclo de fundamentos, ferramentas, memória e multiagentes!

<div class="h-6" />

[Voltar ao Início](#1)
