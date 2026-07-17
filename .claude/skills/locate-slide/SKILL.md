---
name: locate-slide
description: Localiza em qual arquivo e linha vive um slide do deck Slidev, a partir do número exibido na apresentação. Use sempre que o usuário se referir a um slide por número — "o slide 37", "muda o layout do slide 12", "o que tem no slide 5", "adiciona um bullet no 23", "os slides 30 a 35" — inclusive quando o número aparece de passagem dentro de um pedido maior. É um passo de apoio: resolve a localização para que a ação seguinte (ler, editar, mover) atinja o slide certo. Não use para localizar slide por título ou conteúdo (um grep resolve), nem para tarefas sem número de slide envolvido.
---

# Localizar slide por número

O número que o usuário enxerga na apresentação **não corresponde a nenhuma
contagem simples de arquivo**. [slides.md](slides.md) traz os slides de abertura
e depois puxa as etapas via `src:`, então o slide 37 pode estar na linha 170 de
`pages/slide-etapa2.md`. Contar separadores `---` na mão erra: eles também delimitam
frontmatter, e os includes deslocam tudo.

Por isso, resolva com o parser do próprio Slidev — mesma numeração do build:

```bash
node .claude/skills/locate-slide/scripts/locate-slide.mjs 37
```

```
slide 37/38
file:      pages/slide-etapa2.md
title:     Gateway/Provedores com API gratuita
lines:     164-191    (separador `---` na linha 164)
frontmatter: 165-168
content:   pages/slide-etapa2.md:170
```

Vários de uma vez: `... locate-slide.mjs 12 37`. Índice completo: `--list`.
Saída estruturada: `--json`.

## Como usar o resultado

Cada campo aponta para uma parte diferente do slide — escolha pelo que a tarefa
pede:

- `content` — primeira linha de conteúdo (normalmente o `#`). Ponto de partida
  para ler ou editar o corpo do slide.
- `frontmatter` — o bloco YAML do slide (`layout:`, `class:`, `source:`…).
  Ausente quando o slide não declara frontmatter; nesse caso, criar um significa
  inserir um bloco `---` logo abaixo do separador.
- `lines` — o slide inteiro, do separador `---` até o fim. Use para mover,
  remover ou duplicar o slide sem cortar o vizinho.

Ao citar o slide para o usuário, use o caminho clicável (`pages/slide-etapa2.md:170`).

## Escopo

Esta skill só localiza. Ela não lê nem altera o slide — quem faz isso é a tarefa
que vem depois, já sabendo onde mexer. Rodá-la sozinha, sem uma ação em seguida,
só faz sentido quando o usuário perguntou explicitamente onde o slide está.

Duas coisas que o script assume e que valem ser lembradas se algo sair errado:
o deck precisa ter as dependências instaladas (`pnpm install`), porque o parser
vem junto do `@slidev/cli`; e a numeração é volátil — inserir um slide na etapa 1
desloca todos os números das etapas seguintes, então trate o resultado como
válido para o estado atual dos arquivos, não como algo a memorizar entre sessões.
