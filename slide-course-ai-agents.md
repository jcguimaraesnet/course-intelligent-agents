---
theme: dracula
title: "Agentes com Python"
info: |
  Fundamentos de Agentes com Python e APIs
  Desenvolvimento de Agentes Inteligentes
colorSchema: dark
fonts:
  sans: DM Sans
  weights: "200,400,600,700"
contextMenu: false
highlighter: shiki
lineNumbers: true
transition: fade-out
comark: true
layout: cover
glowSeed: 229
footer: false
presenter: true
drawings:
  presenterOnly: true
addons:
  - window-mockup
  - slidev-addon-python-runner
# Optional configuration for this runner
python:
  # Install packages from PyPI. Default: []
  installs: []

  # Automatically load the imported builtin packages. Default: true
  loadPackagesFromImports: true

  # Disable annoying warning from `pandas`. Default: true
  suppressDeprecationWarnings: true

  # Always reload the Python environment when the code changes. Default: false
  alwaysReload: false

  # Options passed to `loadPyodide`. Default: {}
  loadPyodideOptions: {}
---

# Fundamentos de Agentes com Python e APIs

Desenvolvimento de Agentes Inteligentes

<!-- ##### Prof. Júlio César Guimarães -->

<!--
nota 123
-->

---

# Ementa do curso

- **Etapa 1** — <Link to="etapa1" title="Introdução"/>
- **Etapa 2** — <Link to="etapa2" title="OpenAI Agents SDK"/>
- **Etapa 3** — <Link to="etapa3" title="Configuração de Agentes"/>
- **Etapa 4** — <Link to="etapa4" title="Otimização de Agentes"/>
- **Etapa 5** — <Link to="etapa5" title="Uso de Ferramentas"/>
- **Etapa 6** — <Link to="etapa6" title="Modelos Pydantic"/>
- **Etapa 7** — <Link to="etapa7" title="Agentes com Memória"/>
- **Etapa 8** — <Link to="etapa8" title="Memória Persistente"/>
- **Etapa 9** — <Link to="etapa9" title="Agentes Assíncronos"/>

<!--
Ementa do curso — visão geral das 9 etapas.
-->

---
title: Sobre mim
layout: custom-author
imageSide: right
---

::title::
# Júlio César Guimarães

::image::
![image](https://github.com/jcguimaraesnet.png?size=500)

::default::
- Professor desde 2020 no Infnet
- Mestrando em EngSoft com IA (UFRJ)
- MBA em Engenharia de Software (UFRJ)
- \+ 20 anos de experiência
- \+ 10 Certificações Microsoft
- 6x MCT (Microsoft Certified Trainer)



::links::
<div><logos-linkedin-icon /> <a href="https://linkedin.com/in/jcguimaraesnet" target="_blank">linkedin.com/in/jcguimaraesnet</a></div>

<div><GitHubIcon /> <a href="https://github.com/jcguimaraesnet" target="_blank">jcguimaraesnet</a></div>

<!--
nota 123
-->


---
layout: image-x
imageOrder: 2
glowSeed: 314
image: /pessoas-apresentacao.jpg
---

::title::

# Apresentação

::default::

- Estágio?
- Transição de carreira?
- Desenvolve?
- Expectativa?


---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: playlist
source: https://learning.oreilly.com/playlists/28c7e41a-c907-4940-8353-15994ad0d830
---

# Bibliografia do curso

::left::

<AssetImg src="book-building-agents-with-openai-sdk.jpg" class="rounded-lg h-70" />

::right::

<AssetImg src="book-an-illustrtated-guide.jpg" class="rounded-lg h-70" />

---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
sourceLabel: playlist
source: https://learning.oreilly.com/playlists/28c7e41a-c907-4940-8353-15994ad0d830
---

# Bibliografia do curso

::left::

<AssetImg src="book-generative-ai-in-action.jpg" class="rounded-lg h-70" />

::right::

<AssetImg src="book-beginning-chatgpt-for-python.jpg" class="rounded-lg h-70" />


---
layout: two-cols-header
layoutClass: gap-8
class: flex items-center justify-center
---

# Bibliografia do curso

::left::

<div class="flex flex-col items-center gap-4">
  <teenyicons-doc-outline class="text-7xl text-cyan-400" />
  <a href="https://openai.github.io/openai-agents-python/" target="_blank">openai.github.io/openai-agents-python</a>
</div>

::right::

<div class="flex flex-col items-center gap-4">
  <teenyicons-doc-outline class="text-7xl text-cyan-400" />
  <a href="https://antigravity.google/docs/ide/overview" target="_blank">antigravity.google/docs/ide/overview</a>
</div>

---
src: ./slide-etapa1.md  # This slide only contains a frontmatter
---


---
src: ./slide-etapa2.md  # This slide only contains a frontmatter
---


