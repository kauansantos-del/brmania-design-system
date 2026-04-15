/**
 * Helpers para exportar/baixar os tokens do design system em JSON.
 * Fontes:
 *  - Cores: /tokens/Dark.tokens.json e /tokens/Light.tokens.json (formato DTCG/Figma)
 *  - Tipografia e espaçamento: definidos em código (fonte única aqui)
 */

export type DSColorStep = { step: string; hex: string; alpha: number }
export type DSColorScale = { name: string; steps: DSColorStep[] }
export type DSColorGroup = { name: string; scales: DSColorScale[] }
export type DSColorTheme = { theme: 'dark' | 'light'; groups: DSColorGroup[] }

export const TYPOGRAPHY_TOKENS = {
  version: '1.0.0',
  fontFamilies: {
    display: "'Sora', sans-serif",
    body:    "'Inter', sans-serif",
    mono:    "'JetBrains Mono', ui-monospace, monospace",
  },
  scale: [
    { name: 'display-72', font: 'Sora',  size: 72, weight: 800, lineHeight: 1.05, letterSpacing: '-0.02em' },
    { name: 'display-56', font: 'Sora',  size: 56, weight: 800, lineHeight: 1.08, letterSpacing: '-0.02em' },
    { name: 'display-44', font: 'Sora',  size: 44, weight: 800, lineHeight: 1.1,  letterSpacing: '-0.015em' },
    { name: 'heading-32', font: 'Sora',  size: 32, weight: 700, lineHeight: 1.2,  letterSpacing: '-0.01em' },
    { name: 'heading-24', font: 'Sora',  size: 24, weight: 700, lineHeight: 1.25, letterSpacing: '-0.005em' },
    { name: 'heading-20', font: 'Sora',  size: 20, weight: 600, lineHeight: 1.3,  letterSpacing: '0' },
    { name: 'body-16',    font: 'Inter', size: 16, weight: 400, lineHeight: 1.55, letterSpacing: '0' },
    { name: 'body-14',    font: 'Inter', size: 14, weight: 400, lineHeight: 1.5,  letterSpacing: '0' },
    { name: 'caption-12', font: 'Inter', size: 12, weight: 500, lineHeight: 1.4,  letterSpacing: '0.04em' },
  ],
} as const

export const SPACING_TOKENS = {
  version: '1.0.0',
  base: 4,
  unit: 'px',
  scale: [
    { name: 'xs',  px: 4,  rem: 0.25 },
    { name: 'sm',  px: 8,  rem: 0.5 },
    { name: 'md',  px: 12, rem: 0.75 },
    { name: 'lg',  px: 16, rem: 1 },
    { name: 'xl',  px: 24, rem: 1.5 },
    { name: '2xl', px: 32, rem: 2 },
    { name: '3xl', px: 48, rem: 3 },
    { name: '4xl', px: 64, rem: 4 },
  ],
} as const

// -------- Cores --------

export async function fetchColorTheme(theme: 'dark' | 'light'): Promise<DSColorTheme> {
  const url = `/tokens/${theme === 'dark' ? 'Dark' : 'Light'}.tokens.json`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Falha ao carregar tokens ${theme}: ${res.status}`)
  const json = await res.json()

  const groups: DSColorGroup[] = []
  for (const [groupName, groupNode] of Object.entries<any>(json)) {
    const scales: DSColorScale[] = []
    for (const [scaleName, scaleNode] of Object.entries<any>(groupNode)) {
      const steps: DSColorStep[] = []
      for (const [stepName, stepNode] of Object.entries<any>(scaleNode)) {
        if (stepName.startsWith('$')) continue
        const v = stepNode?.$value
        if (!v?.hex) continue
        steps.push({
          step: stepName,
          hex: String(v.hex).toUpperCase().startsWith('#') ? String(v.hex).toUpperCase() : `#${String(v.hex).toUpperCase()}`,
          alpha: typeof v.alpha === 'number' ? v.alpha : 1,
        })
      }
      steps.sort((a, b) => {
        const na = Number(a.step); const nb = Number(b.step)
        if (!isNaN(na) && !isNaN(nb)) return na - nb
        return a.step.localeCompare(b.step)
      })
      if (steps.length) scales.push({ name: scaleName, steps })
    }
    if (scales.length) groups.push({ name: groupName, scales })
  }
  return { theme, groups }
}

export async function buildColorsJson(): Promise<string> {
  const [dark, light] = await Promise.all([fetchColorTheme('dark'), fetchColorTheme('light')])
  const payload = {
    $schema: 'https://brmania.design-system/tokens/colors.schema.json',
    name: 'BRMania Design System · Cores',
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    notes: 'Escala inspirada em Radix Colors (12 steps com semântica por papel).',
    themes: { dark, light },
  }
  return JSON.stringify(payload, null, 2)
}

// -------- Tipografia --------

export function buildTypographyJson(): string {
  return JSON.stringify(
    {
      $schema: 'https://brmania.design-system/tokens/typography.schema.json',
      name: 'BRMania Design System · Tipografia',
      ...TYPOGRAPHY_TOKENS,
      generatedAt: new Date().toISOString(),
    },
    null,
    2,
  )
}

// -------- Espaçamento --------

export function buildSpacingJson(): string {
  return JSON.stringify(
    {
      $schema: 'https://brmania.design-system/tokens/spacing.schema.json',
      name: 'BRMania Design System · Espaçamento',
      ...SPACING_TOKENS,
      generatedAt: new Date().toISOString(),
    },
    null,
    2,
  )
}

// -------- Bundle --------

export async function buildBundleJson(): Promise<string> {
  const [dark, light] = await Promise.all([fetchColorTheme('dark'), fetchColorTheme('light')])
  const bundle = {
    $schema: 'https://brmania.design-system/tokens/bundle.schema.json',
    name: 'BRMania Design System · Tokens',
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    colors:     { themes: { dark, light } },
    typography: TYPOGRAPHY_TOKENS,
    spacing:    SPACING_TOKENS,
  }
  return JSON.stringify(bundle, null, 2)
}

// -------- Trigger download --------

export function downloadTextFile(filename: string, content: string, mime = 'application/json') {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 500)
}

export type DSResource = 'colors' | 'typography' | 'spacing' | 'all'

export async function downloadResource(resource: DSResource) {
  switch (resource) {
    case 'colors': {
      const json = await buildColorsJson()
      downloadTextFile('brmania-cores.tokens.json', json)
      return
    }
    case 'typography': {
      downloadTextFile('brmania-tipografia.tokens.json', buildTypographyJson())
      return
    }
    case 'spacing': {
      downloadTextFile('brmania-espacamento.tokens.json', buildSpacingJson())
      return
    }
    case 'all': {
      const json = await buildBundleJson()
      downloadTextFile('brmania-design-system.tokens.json', json)
      return
    }
  }
}
