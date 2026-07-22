#!/usr/bin/env node
// Localiza slides do deck pelo número exibido na apresentação.
// Usa o próprio parser do Slidev para que os `src:` includes de slides-ai-agents.md
// sejam resolvidos exatamente como no build.
//
// Uso:
//   node locate-slide.mjs 37        -> localiza o slide 37
//   node locate-slide.mjs 12 37     -> localiza vários de uma vez
//   node locate-slide.mjs --list    -> índice de todos os slides
//   node locate-slide.mjs 37 --json -> saída JSON

import { createRequire } from 'node:module'
import { realpathSync, existsSync, readFileSync } from 'node:fs'
import { relative, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// A skill vive em .claude/skills/locate-slide/scripts/, então a raiz do repo
// está quatro níveis acima. Confirmamos procurando o slides-ai-agents.md.
function findRoot() {
  let dir = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..')
  for (let i = 0; i < 6; i++) {
    if (existsSync(resolve(dir, 'slides-ai-agents.md'))) return dir
    dir = dirname(dir)
  }
  throw new Error('slides-ai-agents.md não encontrado — rode a partir do repositório do deck.')
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

const args = process.argv.slice(2)
const json = args.includes('--json')
const list = args.includes('--list')
const numbers = args.filter((a) => /^\d+$/.test(a)).map(Number)

const root = findRoot()
const { load } = await loadParser(root)
const data = await load({ roots: [], userRoot: root }, resolve(root, 'slides-ai-agents.md'))
const total = data.slides.length

if (list || numbers.length === 0) {
  const all = data.slides.map((s, i) => describe(s, i + 1, total, root))
  if (json) {
    console.log(JSON.stringify(all, null, 2))
  } else {
    console.log(`${total} slides\n`)
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
