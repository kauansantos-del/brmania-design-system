// Patches all SVGs in public/icons/{outline,solid,bulk}/ so that hardcoded
// hex colors become `currentColor`, letting the DSIcon component drive color
// via CSS `color`. Idempotent — safe to re-run.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', 'public', 'icons')
const STYLES = ['outline', 'solid', 'bulk']

let patched = 0
let skipped = 0

for (const style of STYLES) {
  const dir = join(ROOT, style)
  let files
  try { files = readdirSync(dir) } catch { continue }
  for (const file of files) {
    if (!file.endsWith('.svg')) continue
    const full = join(dir, file)
    if (!statSync(full).isFile()) continue
    const src = readFileSync(full, 'utf8')
    // Replace every hex color (3 or 6 digits) in fill="..." / stroke="..." with currentColor.
    // Leave fill="none" / stroke="none" alone.
    const next = src
      .replace(/(fill|stroke)="#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})"/g, '$1="currentColor"')
    if (next !== src) {
      writeFileSync(full, next)
      patched++
    } else {
      skipped++
    }
  }
}

console.log(`patched ${patched}, already-ok ${skipped}`)
