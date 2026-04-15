// Script utilitário: lê o IconJar "huge icons pack", copia os SVGs divididos
// por estilo (Outline/Solid/Bulk) e gera /public/icons/manifest.json.
import fs from 'node:fs'
import path from 'node:path'

const ICONJAR_DIR = path.resolve('design-source/iconjar/huge icons pack.iconjar')
const SRC_ICONS   = path.join(ICONJAR_DIR, 'icons')
const META_JSON   = path.resolve('tmp-iconjar-meta.json')
const OUT_DIR     = path.resolve('public/icons')

const meta = JSON.parse(fs.readFileSync(META_JSON, 'utf8'))

const setId2 = Object.fromEntries(Object.entries(meta.sets || {}).map(([id, s]) => [id, s]))
const groupId2 = Object.fromEntries(Object.entries(meta.groups || {}).map(([id, g]) => [id, g]))

const STYLES = ['outline', 'solid', 'bulk']
for (const s of STYLES) fs.mkdirSync(path.join(OUT_DIR, s), { recursive: true })

function slug(s) {
  return String(s || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const manifest = { generatedAt: new Date().toISOString(), styles: ['outline', 'solid', 'bulk'], groups: [], icons: [] }
const groupNames = new Set()

let copied = 0, missing = 0
for (const it of Object.values(meta.items || {})) {
  const set = setId2[it.parent]
  if (!set) continue
  const styleName = (set.name || '').toLowerCase() // outline | solid | bulk
  if (!STYLES.includes(styleName)) continue

  const group = groupId2[set.parent]
  const groupName = group?.name || 'outros'
  groupNames.add(groupName)

  const srcFile = path.join(SRC_ICONS, it.file)
  if (!fs.existsSync(srcFile)) { missing++; continue }
  const destFile = path.join(OUT_DIR, styleName, it.file)
  fs.copyFileSync(srcFile, destFile)
  copied++

  manifest.icons.push({
    id: it.identifier,
    style: styleName,
    name: it.name,
    slug: slug(it.name),
    file: it.file,
    group: groupName,
    tags: String(it.tags || '').split(/[,;]/).map(t => t.trim()).filter(Boolean),
  })
}

manifest.groups = Array.from(groupNames).sort()

fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest))
console.log(`Copiados ${copied} ícones (missing=${missing}). Groups=${manifest.groups.length}. Ícones totais=${manifest.icons.length}.`)
