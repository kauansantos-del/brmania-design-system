import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { DSIcon } from '@/components/brmania'

const ICON_MAP: Record<string, string> = {
  home:     'home-01',
  shield:   'shield',
  sparkles: 'star',
  zap:      'flash',
  heart:    'heart',
  user:     'user',
  bell:     'notification-01',
  search:   'search-01',
  settings: 'setting',
}
type IconKey = keyof typeof ICON_MAP

const COLOR_MAP: Record<string, string> = {
  ink:    '#202020',
  green:  '#3e9b57',
  red:    '#dc3d43',
  blue:   '#107d98',
  gray:   '#646464',
  dark:   '#203c25',
}

const CONTROLS: PropControl[] = [
  {
    kind: 'select', key: 'icon', label: 'Ícone', default: 'home',
    options: (Object.keys(ICON_MAP) as IconKey[]).map((k) => ({ value: k, label: k })),
  },
  {
    kind: 'variant', key: 'size', label: 'Size (px)',
    options: ['16', '20', '24', '28', '32', '40', '48'] as const, default: '24',
  },
  {
    kind: 'select', key: 'color', label: 'Cor', default: 'ink',
    options: [
      { value: 'ink',   label: 'ink · #202020' },
      { value: 'green', label: 'principal · #3e9b57' },
      { value: 'red',   label: 'vermelho · #dc3d43' },
      { value: 'blue',  label: 'azul · #107d98' },
      { value: 'gray',  label: 'gray/11 · #646464' },
      { value: 'dark',  label: 'principal/12 · #203c25' },
    ],
  },
]

export function IconPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Layout"
        title="Icon"
        titleAccent="— primitivo visual."
        description="Renderize qualquer SVG do IconJar via `DSIcon`. Tamanho em px livre, cor via `className` (os SVGs usam currentColor)."
        meta={[
          { label: 'primitive', tone: 'info' },
          { label: 'DSIcon', tone: 'neutral' },
        ]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="Live playground"
          description="Escolha ícone, tamanho e cor. O código gerado já inclui o import correto."
          tags={[{ label: 'interativo', tone: 'success' }]}
          controls={CONTROLS}
          renderPreview={(s) => {
            const slug = ICON_MAP[(s.icon as IconKey) ?? 'home'] ?? 'home-01'
            const size = Number(s.size)
            const color = COLOR_MAP[s.color as string] ?? '#202020'
            return (
              <div className="flex items-center justify-center rounded-xl border border-dashed border-[#e0e0e0] bg-white px-12 py-10" style={{ color }}>
                <DSIcon name={slug} size={size} />
              </div>
            )
          }}
          generateCode={(s) => generateCode(s as any)}
          renderAll={() => (
            <div className="flex flex-col gap-6">
              <div className="flex items-end gap-6 text-[#3e9b57]">
                {[16, 20, 24, 28, 32, 40, 48].map((sz) => (
                  <DSIcon key={sz} name="home-01" size={sz} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 text-[#202020] sm:grid-cols-5 md:grid-cols-9">
                {(Object.entries(ICON_MAP) as [IconKey, string][]).map(([k, slug]) => (
                  <div key={k} className="flex flex-col items-center gap-1 rounded-md border border-[#e8e8e8] bg-white p-3">
                    <DSIcon name={slug} size={24} />
                    <span className="font-mono text-[10px] text-[#646464]">{k}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          generateAllCode={() => `import { DSIcon } from '@/components/brmania'

export function AllSizes() {
  return (
    <div className="flex items-end gap-4 text-[#3e9b57]">
      <DSIcon name="home-01" size={16} />
      <DSIcon name="home-01" size={20} />
      <DSIcon name="home-01" size={24} />
      <DSIcon name="home-01" size={28} />
      <DSIcon name="home-01" size={32} />
      <DSIcon name="home-01" size={40} />
      <DSIcon name="home-01" size={48} />
    </div>
  )
}`}
        />
      </div>
    </div>
  )
}

function generateCode({ icon, size, color }: { icon: string; size: string; color: string }) {
  const slug = ICON_MAP[icon] ?? 'home-01'
  const col = COLOR_MAP[color] ?? '#202020'
  return `import { DSIcon } from '@/components/brmania'

export function Example() {
  return (
    <span style={{ color: '${col}' }}>
      <DSIcon name="${slug}" size={${size}} />
    </span>
  )
}`
}
