import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { FeatureCard, FEATURE_CARD_PRESETS, type FeatureCardPreset } from '@/components/brmania'

const CONTROLS: PropControl[] = [
  {
    kind: 'select', key: 'preset', label: 'Preset', default: 'credenciais',
    options: FEATURE_CARD_PRESETS.map((p) => ({ value: p, label: p.charAt(0).toUpperCase() + p.slice(1) })),
  },
]

export function FeatureCardPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Dados"
        title="FeatureCard"
        titleAccent="— acesso rápido."
        description="Card dashboard 257×222 com ícone em tile, título, descrição e CTA 'Acessar'. Hover eleva o card. Figma 75:1313."
        meta={[
          { label: '4 presets', tone: 'brand' },
          { label: 'Hover elevation', tone: 'success' },
          { label: 'Figma 75:1313', tone: 'neutral' },
        ]}
      />
      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="FeatureCard"
          description="Passe o mouse para ver a elevação. Clique para simular active state."
          controls={CONTROLS}
          renderPreview={(s) => <FeatureCard preset={s.preset as FeatureCardPreset} />}
          generateCode={(s) => `<FeatureCard preset="${s.preset}" />`}
          renderAll={() => (
            <div className="flex flex-wrap gap-4">
              {FEATURE_CARD_PRESETS.map((p) => <FeatureCard key={p} preset={p} />)}
            </div>
          )}
          generateAllCode={() => `FEATURE_CARD_PRESETS.map((p) => (
  <FeatureCard key={p} preset={p} />
))`}
        />
      </div>
    </div>
  )
}
