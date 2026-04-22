import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { ExportCard, EXPORT_FORMATS, type ExportFormat } from '@/components/brmania'

const CONTROLS: PropControl[] = [
  {
    kind: 'select', key: 'format', label: 'Formato', default: 'csv',
    options: EXPORT_FORMATS.map((f) => ({ value: f, label: f.toUpperCase() })),
  },
  { kind: 'toggle', key: 'selected', label: 'Selected', default: false },
]

export function ExportCardPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Dados"
        title="ExportCard"
        titleAccent="— formato de exportação."
        description="Card selecionável (CSV / JSON / Excel). Cada formato tem um gradiente próprio no tile de ícone. Figma 143:13712."
        meta={[
          { label: '3 formatos', tone: 'brand' },
          { label: '3 estados', tone: 'info' },
          { label: 'Figma 143:13712', tone: 'neutral' },
        ]}
      />
      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="ExportCard"
          description="Clique para selecionar. Só um fica selecionado por vez."
          controls={CONTROLS}
          renderPreview={(s) => (
            <ExportCard format={s.format as ExportFormat} selected={!!s.selected} />
          )}
          generateCode={(s) => `<ExportCard format="${s.format}"${s.selected ? ' selected' : ''} />`}
          renderAll={() => <Gallery />}
          generateAllCode={() => `const [selected, setSelected] = useState<ExportFormat>('csv')

EXPORT_FORMATS.map((f) => (
  <ExportCard
    key={f}
    format={f}
    selected={f === selected}
    onClick={() => setSelected(f)}
  />
))`}
        />
      </div>
    </div>
  )
}

function Gallery() {
  const [sel, setSel] = useState<ExportFormat>('csv')
  return (
    <div className="flex flex-wrap gap-4">
      {EXPORT_FORMATS.map((f) => (
        <ExportCard key={f} format={f} selected={f === sel} onClick={() => setSel(f)} />
      ))}
    </div>
  )
}
