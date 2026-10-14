// Prerenders every route to static HTML. Runs via the postbuild npm hook,
// so `npm run build` always ends with a complete static site and the deploy
// workflow needs no changes.
//
// 1. Bundles src/entry-server.jsx with `vite build --ssr`.
// 2. Renders every route with react-dom/server + StaticRouter.
// 3. Injects each render into a copy of the built index.html (so asset
//    fingerprints and base path stay exactly as Vite emitted them):
//    /                    → index.html
//    /page/2 … /page/N    → page/N/index.html (only while N > 1 exists)
//    /about … /donate     → about/index.html, …
//    /proof/NNN           → proof/NNN/index.html, one per entry file
//    (missing route)      → 404.html (GitHub Pages serves this for bad URLs)
// 4. Emits sitemap.xml, robots.txt (only if missing), search-index.json.
// 5. Deletes the temporary SSR bundle.
//
// Respects `--outDir <dir>` (default `dist`) so alternate build dirs work.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const siteDir = join(here, '..')

const args = process.argv.slice(2)
function flag(name, fallback) {
  const i = args.findIndex((a) => a === name || a.startsWith(`${name}=`))
  if (i === -1) return fallback
  const hit = args[i]
  if (hit.includes('=')) return hit.slice(hit.indexOf('=') + 1)
  return args[i + 1] ?? fallback
}
const outDir = join(siteDir, flag('--outDir', 'dist'))
const serverDir = join(siteDir, 'dist-server')

function fail(msg) {
  console.error(`prerender: ${msg}`)
  process.exit(1)
}

// Single-slot template fill: replaces exactly one occurrence and fails the
// build otherwise, so a template change can never silently duplicate content
// or leave a placeholder unfilled.
function fillOnce(haystack, needle, replacement, what) {
  const parts = haystack.split(needle)
  if (parts.length !== 2) fail(`template has ${parts.length - 1} ${what} slots, expected exactly 1`)
  return parts.join(replacement)
}

// React's HTML escaping for text nodes (used to verify renders).
function reactEsc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#x27;')
    .replace(/"/g, '&quot;')
}

function attrEsc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

// 1. SSR bundle (vite binary resolved explicitly — no PATH or shell needed).
const viteBin = join(siteDir, 'node_modules', 'vite', 'bin', 'vite.js')
if (!existsSync(viteBin)) fail(`vite binary not found at ${viteBin} — run npm install first`)
execFileSync(process.execPath, [viteBin, 'build', '--ssr', 'src/entry-server.jsx', '--outDir', 'dist-server'], {
  cwd: siteDir,
  stdio: 'inherit'
})
const serverFile = join(serverDir, 'entry-server.js')
if (!existsSync(serverFile)) fail('SSR bundle was not emitted')
const { render } = await import(pathToFileURL(serverFile).href)

// 2. Data, template, shared pagination.
const entries = JSON.parse(
  readFileSync(join(siteDir, 'src', 'data', 'entries.generated.json'), 'utf8')
)
if (!entries.length) fail('no entries in entries.generated.json — run the build, not this script alone')
const { totalPages } = await import(pathToFileURL(join(siteDir, 'src', 'lib', 'pagination.js')).href)
const templateFile = join(outDir, 'index.html')
if (!existsSync(templateFile)) fail(`${templateFile} missing — the client build must run first`)
const template = readFileSync(templateFile, 'utf8')
if (!template.includes('<div id="root"></div>')) fail('template has no <div id="root"></div>')
const titleTag = template.match(/<title>.*?<\/title>/)?.[0] ?? fail('template has no <title>')
const homeTitle = titleTag.slice(7, -8)
const descTag = template.match(/<meta name="description"[^>]*>/)?.[0] ?? fail('template has no meta description')
const homeDesc = descTag.match(/content="([^"]*)"/)?.[1] ?? fail('template meta description has no content')

const SITE = 'https://bloomproof.org'
const pageCount = totalPages(entries.length)

const STATIC_META = {
  '/about': {
    title: 'Why this exists — Bloom Proof',
    desc: 'Why Bloom Proof exists: one public record where every AI story links to real, checkable proof — reviewed by a human before it publishes.',
    expect: 'Why this exists.'
  },
  '/submit': {
    title: 'Share your project — Bloom Proof',
    desc: 'Built something with AI that helped a real person? Tell us in plain words — about 10 minutes. A real human reads every submission.',
    expect: 'Send for review'
  },
  '/developers': {
    title: 'How the record is built — Bloom Proof',
    desc: "How the record is built: one public repo, no servers, no database — automated checks confirm the format and a human confirms it's real.",
    expect: 'How the record is built'
  },
  '/donate': {
    title: 'Keep the record independent — Bloom Proof',
    desc: 'Bloom Proof is free forever. Donations keep the record independent — Bitcoin only, straight to the project, no accounts or sign-ups.',
    expect: 'Keep the record independent.'
  }
}

const pages = [
  {
    route: '/',
    file: 'index.html',
    title: homeTitle,
    desc: homeDesc,
    keepDesc: true,
    type: 'website',
    expect: 'see-all-text',
    expectCount: { pattern: 'ledger-row', count: entries.length }
  }
]
for (let n = 2; n <= pageCount; n += 1) {
  pages.push({
    route: `/page/${n}`,
    file: `page/${n}/index.html`,
    title: `Every story, page ${n} — Bloom Proof`,
    desc: `Browse every story, page ${n} of ${pageCount} — real AI projects, checked by a human, newest first.`,
    type: 'website',
    expect: 'Story pages'
  })
}
for (const [route, meta] of Object.entries(STATIC_META)) {
  pages.push({ route, file: `${route.slice(1)}/index.html`, ...meta, type: 'website' })
}
for (const e of entries) {
  pages.push({
    route: `/proof/${e.id}`,
    file: `proof/${e.id}/index.html`,
    title: `${e.title} — Bloom Proof`,
    desc: e.problem,
    type: 'article',
    expect: reactEsc(e.title)
  })
}
const notFound = {
  route: '/__missing__',
  file: '404.html',
  title: 'Page not found — Bloom Proof',
  desc: 'Hmm, that page does not exist. The stories are all back on the home page.',
  type: 'website',
  expect: 'that page does not exist'
}

// 3. Render every page.
function buildPage(page) {
  const html = render(page.route)
  if (!html) fail(`route ${page.route} rendered empty — refusing to emit a broken page`)
  if (page.expect && !html.includes(page.expect)) {
    fail(`route ${page.route} rendered without its marker — refusing to emit a broken page`)
  }
  if (page.expectCount != null) {
    const found = html.split(page.expectCount.pattern).length - 1
    if (found !== page.expectCount.count) {
      fail(`route ${page.route} rendered ${found} ${page.expectCount.pattern} markers, expected ${page.expectCount.count}`)
    }
  }
  if (html.includes('Gathering real stories')) fail(`route ${page.route} rendered the loading shell`)
  const og = [
    `<meta property="og:title" content="${attrEsc(page.title)}">`,
    `<meta property="og:description" content="${attrEsc(page.desc)}">`,
    `<meta property="og:type" content="${page.type}">`,
    `<meta property="og:url" content="${SITE}${page.route === '/' ? '/' : page.route}">`,
    `<meta property="og:image" content="${SITE}/site-logo.png">`
  ].join('\n    ')
  let out = fillOnce(template, '<div id="root"></div>', `<div id="root">${html}</div>`, 'root div')
  out = fillOnce(out, titleTag, `<title>${reactEsc(page.title)}</title>`, 'title tag')
  if (!page.keepDesc) {
    out = fillOnce(out, descTag, `<meta name="description" content="${attrEsc(page.desc)}">`, 'meta description')
  }
  out = fillOnce(out, '\n  </head>', `\n    ${og}\n  </head>`, 'head close')
  const dest = join(outDir, page.file)
  mkdirSync(dirname(dest), { recursive: true })
  writeFileSync(dest, out)
}

for (const page of pages) buildPage(page)
buildPage({ ...notFound, route: '/__missing__' })

// 4. Sitemap, robots, search index.
const locs = pages.map((p) => (p.route === '/' ? `${SITE}/` : `${SITE}${p.route}`))
writeFileSync(
  join(outDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs
    .map((loc) => `  <url><loc>${loc}</loc></url>`)
    .join('\n')}\n</urlset>\n`
)
if (!existsSync(join(outDir, 'robots.txt'))) {
  writeFileSync(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
}
writeFileSync(
  join(outDir, 'search-index.json'),
  JSON.stringify(entries.map((e) => ({ id: e.id, title: e.title, summary: e.problem, kind: e.kind })))
)

// 5. Cleanup.
rmSync(serverDir, { recursive: true, force: true })
console.log(`prerender: ${pages.length + 1} pages + sitemap.xml + robots.txt + search-index.json → ${outDir}`)
