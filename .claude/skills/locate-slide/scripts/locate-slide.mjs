#!/usr/bin/env node
// Localiza slides de um deck pelo número exibido na apresentação.
// Usa o próprio parser do Slidev para que os `src:` includes do deck
// sejam resolvidos exatamente como no build.
//
// O repositório pode ter vários decks na raiz (slides-ai-agents.md,
// slides-n8n.md, ...). Escolha qual com --deck; se houver só um, ele é o padrão.
//
// Uso:
//   node locate-slide.mjs 37                 -> localiza o slide 37 (deck único)
//   node locate-slide.mjs --deck n8n 37      -> escolhe o deck slides-n8n.md
//   node locate-slide.mjs --deck n8n --list  -> índice do deck n8n
//   node locate-slide.mjs 12 37              -> vários de uma vez
//   node locate-slide.mjs 37 --json          -> saída JSON

import { createRequire } from 'node:module'
import { realpathSync, existsSync, readFileSync, readdirSync } from 'node:fs'
import { relative, resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const DECK_PATTERN = /^slides-.*\.md$/

// Lista os decks (slides-*.md) na raiz do repo, em ordem estável.
function listDecks(root) {
  return readdirSync(root).filter((f) => DECK_PATTERN.test(f)).sort()
}

// Converte o basename do deck no nome curto usado em --deck (slides-n8n.md -> n8n).
function deckShortName(file) {
  return file.replace(/^slides-/, '').replace(/\.md$/, '')
}

// A skill vive em .claude/skills/locate-slide/scripts/, então a raiz do repo
// está quatro níveis acima. Confirmamos procurando qualquer deck slides-*.md.
function findRoot() {
  let dir = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..')
  for (let i = 0; i < 6; i++) {
    if (existsSync(dir) && listDecks(dir).length > 0) return dir
    dir = dirname(dir)
  }
  throw new Error('nenhum slides-*.md encontrado — rode a partir do repositório do deck.')
}

// Resolve qual deck usar. `--deck` aceita nome curto (n8n), basename
// (slides-n8n.md) ou caminho .md. Sem `--deck`: usa o único deck se houver
// apenas um; com vários, exige a escolha explícita.
function resolveDeck(root, deckArg) {
  if (deckArg) {
    const candidates = deckArg.endsWith('.md')
      ? [resolve(root, deckArg), resolve(process.cwd(), deckArg)]
      : [resolve(root, `slides-${deckArg}.md`)]
    const match = candidates.find((c) => existsSync(c))
    if (match) return match
    throw new Error(`deck não encontrado: ${deckArg}`)
  }
  const decks = listDecks(root)
  if (decks.length === 1) return resolve(root, decks[0])
  const names = decks.map(deckShortName).join(', ')
  throw new Error(`há vários decks (${names}) — escolha com --deck <nome>, ex: --deck n8n`)
}

// @slidev/parser não é dependência direta do projeto, então não aparece em
// node_modules/@slidev/. Resolvemos a partir do realpath do CLI: isso pega a
// versão que o CLI realmente usa (o store do pnpm pode ter outras, antigas)
// e evita depender do hash do diretório .pnpm, que muda a cada reinstalação.
async function loadParser(root) {
  const cliPkg = resolve(root, 'node_modules/@slidev/cli/package.json')
  if (!existsSync(cliPkg)) {
    throw new Error('@slidev/cli não instalado — rode `pnpm install` primeiro.')
  }
  const req = createRequire(realpathSync(cliPkg))
  return import(req.resolve('@slidev/parser/fs'))
}

function firstContentLine(filepath, contentStart, end) {
  const lines = readFileSync(filepath, 'utf8').split('\n')
  for (let i = contentStart; i < end && i < lines.length; i++) {
    if (lines[i].trim() !== '') return i + 1
  }
  return contentStart + 1
}

function describe(slide, n, total, root) {
  const src = slide.source
  const file = relative(root, src.filepath)
  // O parser usa índices 0-based; editores contam a partir de 1.
  const sepLine = src.start + 1
  const endLine = src.end
  const hasFrontmatter = src.contentStart > src.start + 1
  return {
    slide: n,
    total,
    file,
    title: slide.title ?? null,
    lines: `${sepLine}-${endLine}`,
    separatorLine: sepLine,
    frontmatterLines: hasFrontmatter ? `${sepLine + 1}-${src.contentStart}` : null,
    contentLine: firstContentLine(src.filepath, src.contentStart, src.end),
    frontmatter: slide.frontmatter ?? {},
  }
}

// Lê o valor de uma flag, aceitando "--deck n8n" e "--deck=n8n".
function flagValue(args, name) {
  const eq = args.find((arg) => arg.startsWith(`${name}=`))
  if (eq) return eq.slice(name.length + 1)
  const idx = args.indexOf(name)
  return idx >= 0 && idx + 1 < args.length ? args[idx + 1] : null
}

const args = process.argv.slice(2)
const json = args.includes('--json')
const list = args.includes('--list')
const deckArg = flagValue(args, '--deck')
const numbers = args.filter((arg) => /^\d+$/.test(arg)).map(Number)

// Erros de configuração (deck ambíguo, deck inexistente, parser ausente) são
// esperados e acionáveis: mostramos só a mensagem, sem stack trace.
let root, deckPath, load
try {
  root = findRoot()
  deckPath = resolveDeck(root, deckArg)
  ;({ load } = await loadParser(root))
} catch (err) {
  console.error(err.message)
  process.exit(1)
}

const data = await load({ roots: [], userRoot: root }, deckPath)
const total = data.slides.length

if (list || numbers.length === 0) {
  const all = data.slides.map((s, i) => describe(s, i + 1, total, root))
  if (json) {
    console.log(JSON.stringify(all, null, 2))
  } else {
    console.log(`${total} slides — ${basename(deckPath)}\n`)
    for (const s of all) {
      console.log(`${String(s.slide).padStart(3)} | ${s.file}:${s.contentLine} | ${s.title ?? '(sem título)'}`)
    }
  }
  process.exit(0)
}

const found = []
for (const n of numbers) {
  if (n < 1 || n > total) {
    console.error(`slide ${n}: fora do intervalo — o deck tem ${total} slides (1-${total}).`)
    process.exitCode = 1
    continue
  }
  found.push(describe(data.slides[n - 1], n, total, root))
}

if (json) {
  console.log(JSON.stringify(found, null, 2))
} else {
  for (const s of found) {
    console.log(`slide ${s.slide}/${s.total}`)
    console.log(`file:      ${s.file}`)
    console.log(`title:     ${s.title ?? '(sem título)'}`)
    console.log(`lines:     ${s.lines}    (separador \`---\` na linha ${s.separatorLine})`)
    if (s.frontmatterLines) console.log(`frontmatter: ${s.frontmatterLines}`)
    console.log(`content:   ${s.file}:${s.contentLine}`)
    console.log()
  }
}
