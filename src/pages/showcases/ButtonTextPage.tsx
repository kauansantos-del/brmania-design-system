import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { ButtonText, DSIcon, type ButtonTextVariant } from '@/components/brmania'

const VARIANTS = ['primary', 'secondary', 'red', 'codigo'] as const

const CONTROLS: PropControl[] = [
  { kind: 'variant', key: 'variant', label: 'Variant', options: VARIANTS, default: 'primary' },
  { kind: 'toggle',  key: 'icon',    label: 'Ícone à direita' },
  { kind: 'text',    key: 'text',    label: 'Texto', default: 'Criar conta', placeholder: 'Texto' },
]

export function ButtonTextPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Ações"
        title="ButtonText"
        titleAccent="— ação tipográfica."
        description="Botão link-like sem fundo. Indicado para ações inline, links em formulários, “Esqueci a senha”, “Enviar código”."
        meta={[
          { label: '4 variantes', tone: 'brand' },
          { label: 'Inter · 16px', tone: 'info' },
        ]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="Live playground"
          description="Clique em uma variante, altere o texto e copie o código pronto."
          tags={[{ label: 'interativo', tone: 'success' }]}
          controls={CONTROLS}
          renderPreview={(s) => (
            <ButtonText
              variant={s.variant as ButtonTextVariant}
              icon={s.icon ? <DSIcon name="arrow-right" size={16} /> : undefined}
            >
              {String(s.text || 'Criar conta')}
            </ButtonText>
          )}
          generateCode={(s) => generateCode(s as any)}
          renderAll={() => (
            <div className="flex flex-wrap items-center gap-6">
              {VARIANTS.map((v) => (
                <ButtonText key={v} variant={v}>{v === 'codigo' ? 'Enviar código' : 'Criar conta'}</ButtonText>
              ))}
            </div>
          )}
          generateAllCode={() => `import { ButtonText } from '@/components/brmania'

export function AllVariants() {
  return (
    <div className="flex flex-wrap gap-6">
${VARIANTS.map((v) => `      <ButtonText variant="${v}">${v === 'codigo' ? 'Enviar código' : 'Criar conta'}</ButtonText>`).join('\n')}
    </div>
  )
}`}
        />
      </div>
    </div>
  )
}

function generateCode({ variant, icon, text }: { variant: string; icon: boolean; text: string }) {
  const importLine = icon
    ? "import { ButtonText, DSIcon } from '@/components/brmania'"
    : "import { ButtonText } from '@/components/brmania'"
  const iconProp = icon ? ' icon={<DSIcon name="arrow-right" size={16} />}' : ''
  return `${importLine}

export function Example() {
  return (
    <ButtonText variant="${variant}"${iconProp}>
      ${text || 'Criar conta'}
    </ButtonText>
  )
}`
}
