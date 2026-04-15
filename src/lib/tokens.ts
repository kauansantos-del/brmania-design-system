export type ColorToken = {
  group: string
  scale: string
  step: string
  hex: string
  alpha: number
  path: string
}

type TokenNode = {
  $type?: string
  $value?: { hex?: string; alpha?: number; components?: number[] }
} & Record<string, any>

export async function loadColorTokens(url: string): Promise<{ groups: Record<string, Record<string, ColorToken[]>>; all: ColorToken[] }> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load tokens: ${res.status}`)
  const json = await res.json()
  const all: ColorToken[] = []
  walk(json, [], all)

  const groups: Record<string, Record<string, ColorToken[]>> = {}
  for (const t of all) {
    groups[t.group] ??= {}
    groups[t.group][t.scale] ??= []
    groups[t.group][t.scale].push(t)
  }
  for (const g of Object.values(groups)) {
    for (const s of Object.values(g)) {
      s.sort((a, b) => {
        const na = Number(a.step); const nb = Number(b.step)
        if (!isNaN(na) && !isNaN(nb)) return na - nb
        return a.step.localeCompare(b.step)
      })
    }
  }
  return { groups, all }
}

function walk(node: TokenNode, path: string[], out: ColorToken[]) {
  if (!node || typeof node !== 'object') return
  if (node.$type === 'color' && node.$value && typeof node.$value === 'object' && 'hex' in node.$value) {
    const hex = String(node.$value.hex).toUpperCase().startsWith('#') ? String(node.$value.hex).toUpperCase() : `#${String(node.$value.hex).toUpperCase()}`
    const alpha = typeof node.$value.alpha === 'number' ? node.$value.alpha : 1
    const group = path[0] ?? 'Tokens'
    const scale = path[1] ?? 'Default'
    const step = path.slice(2).join('.') || 'base'
    out.push({ group, scale, step, hex, alpha, path: path.join('/') })
    return
  }
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$')) continue
    if (v && typeof v === 'object') walk(v as TokenNode, [...path, k], out)
  }
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([A-F0-9]{6})$/i.exec(hex)
  if (!m) return null
  const int = parseInt(m[1], 16)
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 }
}

export function contrastOn(hex: string): 'light' | 'dark' {
  const rgb = hexToRgb(hex)
  if (!rgb) return 'light'
  const lum = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  return lum > 0.6 ? 'dark' : 'light'
}
