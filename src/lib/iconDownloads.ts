import JSZip from 'jszip'
import { downloadTextFile } from './downloads'

export type IconStyle = 'outline' | 'solid' | 'bulk'

export type IconItem = {
  id: string
  style: IconStyle
  name: string
  slug: string
  file: string
  group: string
  tags: string[]
}

export type IconsManifest = {
  generatedAt: string
  styles: IconStyle[]
  groups: string[]
  icons: IconItem[]
}

export async function fetchIconSvg(item: IconItem): Promise<string> {
  const res = await fetch(`/icons/${item.style}/${item.file}`)
  if (!res.ok) throw new Error(`Falha ao carregar ${item.file}: ${res.status}`)
  return await res.text()
}

type Progress = (done: number, total: number) => void

async function mapWithConcurrency<T, R>(
  items: T[], limit: number, fn: (it: T, i: number) => Promise<R>, onProgress?: Progress,
): Promise<R[]> {
  const out: R[] = new Array(items.length)
  let i = 0
  let done = 0
  const total = items.length
  const workers = Array.from({ length: Math.min(limit, total) }).map(async () => {
    while (true) {
      const idx = i++
      if (idx >= total) return
      out[idx] = await fn(items[idx], idx)
      done++
      onProgress?.(done, total)
    }
  })
  await Promise.all(workers)
  return out
}

/**
 * Baixa todos os SVGs e entrega um ZIP com estrutura:
 *   <style>/<group>/<slug>.svg
 *   manifest.json
 *   README.md
 */
export async function downloadAllIconsZip(
  manifest: IconsManifest,
  scope: 'all' | IconStyle = 'all',
  onProgress?: Progress,
): Promise<void> {
  const zip = new JSZip()
  const icons = scope === 'all' ? manifest.icons : manifest.icons.filter((i) => i.style === scope)

  // Adiciona manifest resumido
  const summary = {
    $schema: 'https://brmania.design-system/tokens/icons.schema.json',
    name: 'BRMania Design System · Ícones',
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    source: 'Huge Icons Pack',
    styles: scope === 'all' ? manifest.styles : [scope],
    groups: Array.from(new Set(icons.map((i) => i.group))).sort(),
    total: icons.length,
    icons: icons.map(({ id, style, name, slug, group, tags, file }) => ({
      id, style, name, slug, group, tags,
      path: `${style}/${group}/${slug}.svg`,
      originalFile: file,
    })),
  }
  zip.file('manifest.json', JSON.stringify(summary, null, 2))
  zip.file('README.md',
`# BRMania Design System · Ícones
${icons.length} ícones do Huge Icons Pack organizados por estilo e categoria.

## Estrutura
\`\`\`
<style>/<category>/<slug>.svg
\`\`\`

- **Estilos**: ${summary.styles.join(', ')}
- **Categorias**: ${summary.groups.length}
- **Total**: ${icons.length}

Gerado em ${new Date().toLocaleString('pt-BR')}.
`)

  // Busca os SVGs em paralelo (limitado)
  await mapWithConcurrency(icons, 32, async (it) => {
    try {
      const svg = await fetchIconSvg(it)
      const path = `${it.style}/${it.group}/${it.slug}.svg`
      zip.file(path, svg)
    } catch {
      // ignora e continua
    }
  }, onProgress)

  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = scope === 'all'
    ? 'brmania-icons-bundle.zip'
    : `brmania-icons-${scope}.zip`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 500)
}

/**
 * Gera um JSON único com todos os ícones (SVG inline). Útil pra consumir sem filesystem.
 */
export async function downloadAllIconsJson(
  manifest: IconsManifest,
  scope: 'all' | IconStyle = 'all',
  onProgress?: Progress,
): Promise<void> {
  const icons = scope === 'all' ? manifest.icons : manifest.icons.filter((i) => i.style === scope)

  type Entry = { id: string; name: string; slug: string; style: IconStyle; group: string; tags: string[]; svg: string }
  const entries = await mapWithConcurrency(icons, 32, async (it) => {
    const svg = await fetchIconSvg(it)
    return { id: it.id, name: it.name, slug: it.slug, style: it.style, group: it.group, tags: it.tags, svg } as Entry
  }, onProgress)

  // Agrupa por estilo → grupo
  const byStyleGroup: Record<string, Record<string, Entry[]>> = {}
  for (const e of entries) {
    byStyleGroup[e.style] ??= {}
    byStyleGroup[e.style][e.group] ??= []
    byStyleGroup[e.style][e.group].push(e)
  }

  const payload = {
    $schema: 'https://brmania.design-system/tokens/icons.schema.json',
    name: 'BRMania Design System · Ícones (inline)',
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    source: 'Huge Icons Pack',
    total: entries.length,
    styles: Object.keys(byStyleGroup),
    categories: byStyleGroup,
  }

  const filename = scope === 'all' ? 'brmania-icons.tokens.json' : `brmania-icons-${scope}.tokens.json`
  downloadTextFile(filename, JSON.stringify(payload, null, 2))
}
