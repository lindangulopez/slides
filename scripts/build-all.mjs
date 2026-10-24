// Build every deck in decks/ into dist/<name>/ and write an index page.
// Usage: node scripts/build-all.mjs [base]   (base defaults to /slides/)
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const base = (process.argv[2] || '/slides/').replace(/\/?$/, '/')
const decksDir = join(root, 'decks')
const distDir = join(root, 'dist')

const escape = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

const titleOf = (file) => {
  const frontmatter = readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/)
  const title = frontmatter?.[1].match(/^title:\s*(.+)$/m)?.[1]
  return title ? title.trim().replace(/^["']|["']$/g, '') : basename(file, '.md')
}

rmSync(distDir, { recursive: true, force: true })
mkdirSync(distDir, { recursive: true })

const decks = readdirSync(decksDir).filter(f => f.endsWith('.md')).sort()
for (const file of decks) {
  const name = basename(file, '.md')
  console.log(`\n▶ Building ${name}`)
  execFileSync('npx', ['slidev', 'build', join(decksDir, file), '--base', `${base}${name}/`, '--out', join(distDir, name)], { stdio: 'inherit', cwd: root })
}

const items = decks
  .map(f => `      <li><a href="./${basename(f, '.md')}/">${escape(titleOf(join(decksDir, f)))}</a></li>`)
  .join('\n')

writeFileSync(join(distDir, 'index.html'), `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Slides — Linda Angulo Lopez</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 3rem auto; padding: 0 1rem; line-height: 1.6; color: #222; background: #fff; }
    @media (prefers-color-scheme: dark) { body { color: #eee; background: #181818; } a { color: #8ab4f8; } }
    li { margin: .4rem 0; }
  </style>
</head>
<body>
  <h1>Slides</h1>
  <ul>
${items}
  </ul>
</body>
</html>
`)

console.log(`\n✓ Built ${decks.length} deck(s) into dist/`)
