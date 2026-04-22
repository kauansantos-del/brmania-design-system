import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { InfoTooltip, type TooltipPlacement, type TooltipAlign } from '@/components/brmania'

const CONTROLS: PropControl[] = [
  { kind: 'text',    key: 'text',      label: 'Texto',    default: 'Texto explicativo' },
  {
    kind: 'select', key: 'placement', label: 'Posição', default: 'top',
    options: [
      { value: 'top',    label: 'Acima' },
      { value: 'bottom', label: 'Abaixo' },
    ],
  },
  {
    kind: 'select', key: 'align', label: 'Alinhamento', default: 'start',
    options: [
      { value: 'start', label: 'Direita → Esquerda (start)' },
      { value: 'end',   label: 'Esquerda → Direita (end)' },
    ],
  },
]

export function InfoTooltipPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Feedback"
        title="InfoTooltip"
        titleAccent="— ícone info com dica."
        description="Tooltip CSS-only disparado em :hover e :focus-visible. Suporta 2 posições × 2 alinhamentos. Figma 96:4771."
        meta={[
          { label: '2 posições', tone: 'info' },
          { label: 'CSS-only', tone: 'success' },
          { label: 'Figma 96:4771', tone: 'neutral' },
        ]}
      />
      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="InfoTooltip"
          description="Passe o mouse pra ver o tooltip (ou Tab pra focar)."
          controls={CONTROLS}
          renderPreview={(s) => (
            <div className="flex h-32 items-center justify-center">
              <InfoTooltip
                text={s.text as string}
                placement={s.placement as TooltipPlacement}
                align={s.align as TooltipAlign}
              />
            </div>
          )}
          generateCode={(s) => `<InfoTooltip
  text="${s.text}"
  placement="${s.placement}"
  align="${s.align}"
/>`}
        />
      </div>
    </div>
  )
}
