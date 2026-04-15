import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { Button, DSIcon, type ButtonVariant } from '@/components/brmania'

const VARIANTS = ['primary', 'secondary', 'tertiary', 'red', 'disabled'] as const

const CONTROLS: PropControl[] = [
  { kind: 'variant', key: 'variant', label: 'Variant', options: VARIANTS, default: 'primary' },
  { kind: 'toggle',  key: 'iconLeft',  label: 'Ícone à esquerda' },
  { kind: 'toggle',  key: 'iconRight', label: 'Ícone à direita' },
  { kind: 'text',    key: 'text',      label: 'Label',   default: 'Label', placeholder: 'Texto do botão' },
]

export function ButtonPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Ações"
        title="Button"
        titleAccent="— CTA principal."
        description="Botão de chamada principal. 5 variantes visuais e suporte a ícones à esquerda/direita. Hover e active são nativos (CSS)."
        meta={[
          { label: '5 variantes', tone: 'brand' },
          { label: 'Sora · 16px', tone: 'info' },
        ]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="Live playground"
          description="Altere as props acima e veja o código atualizar em tempo real. Use 'Ver todos' para exportar todas as variantes."
          tags={[{ label: 'interativo', tone: 'success' }]}
          controls={CONTROLS}
          renderPreview={(s) => (
            <Button
              variant={s.variant as ButtonVariant}
              iconLeft={s.iconLeft ? <DSIcon name="home-01" size={18} /> : undefined}
              iconRight={s.iconRight ? <DSIcon name="arrow-right" size={18} /> : undefined}
            >
              {String(s.text || 'Label')}
            </Button>
          )}
          generateCode={(s) => generateCode(s as any)}
          renderAll={() => (
            <div className="grid w-full max-w-[720px] [grid-template-columns:repeat(auto-fit,minmax(160px,max-content))] items-center justify-center gap-3">
              {VARIANTS.map((v) => (
                <Button key={v} variant={v}>Label</Button>
              ))}
            </div>
          )}
          generateAllCode={() => `import { Button } from '@/components/brmania'

export function AllVariants() {
  return (
    <div className="flex flex-wrap gap-3">
${VARIANTS.map((v) => `      <Button variant="${v}">Label</Button>`).join('\n')}
    </div>
  )
}`}
        />
      </div>
    </div>
  )
}

function generateCode({
  variant, iconLeft, iconRight, text,
}: { variant: string; iconLeft: boolean; iconRight: boolean; text: string }) {
  const props: string[] = [`variant="${variant}"`]
  if (iconLeft)  props.push('iconLeft={<DSIcon name="home-01" size={18} />}')
  if (iconRight) props.push('iconRight={<DSIcon name="arrow-right" size={18} />}')
  const needsDSIcon = iconLeft || iconRight
  const importLine = needsDSIcon
    ? "import { Button, DSIcon } from '@/components/brmania'"
    : "import { Button } from '@/components/brmania'"
  return `${importLine}

export function Example() {
  return (
    <Button ${props.join(' ')}>
      ${text || 'Label'}
    </Button>
  )
}`
}
