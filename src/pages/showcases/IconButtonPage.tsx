import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { IconButton, DSIcon, type IconButtonVariant } from '@/components/brmania'

const VARIANTS = ['filled', 'ghost'] as const

const ICON_SLUGS: Record<string, string> = {
  back:  'direction-left',
  close: 'multiply-circle',
  add:   'plus-01',
  edit:  'pencil',
  trash: 'trash-01',
}
type IconKey = keyof typeof ICON_SLUGS

const CONTROLS: PropControl[] = [
  { kind: 'variant', key: 'variant', label: 'Variant', options: VARIANTS, default: 'filled' },
  {
    kind: 'select', key: 'icon', label: 'Ícone', default: 'back',
    options: [
      { value: 'back',  label: 'back (←)' },
      { value: 'close', label: 'close (×)' },
      { value: 'add',   label: 'add (+)' },
      { value: 'edit',  label: 'edit' },
      { value: 'trash', label: 'trash' },
    ],
  },
  { kind: 'text', key: 'aria', label: 'aria-label', default: 'Voltar', placeholder: 'Descrição para SR' },
]

export function IconButtonPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Ações"
        title="IconButton"
        titleAccent="— ações só com ícone."
        description="Botão compacto, só ícone. Sempre exige `aria-label` para acessibilidade. Duas variantes: filled (com borda) e ghost (discreto)."
        meta={[
          { label: '2 variantes', tone: 'brand' },
          { label: 'A11y first', tone: 'success' },
        ]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="Live playground"
          description="Troque ícone e variante. O código já traz o import do DSIcon."
          tags={[{ label: 'interativo', tone: 'success' }]}
          controls={CONTROLS}
          renderPreview={(s) => {
            const slug = ICON_SLUGS[(s.icon as IconKey) ?? 'back'] ?? 'direction-left'
            return (
              <IconButton
                variant={s.variant as IconButtonVariant}
                aria-label={String(s.aria || 'Botão')}
                icon={<DSIcon name={slug} size={20} />}
              />
            )
          }}
          generateCode={(s) => generateCode(s as any)}
          renderAll={() => (
            <div className="grid w-full max-w-[600px] grid-cols-2 items-center justify-items-center gap-8">
              {VARIANTS.map((v) => (
                <div key={v} className="flex flex-col items-center gap-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#646464]">{v}</p>
                  <div className="flex items-center gap-3">
                    <IconButton variant={v} aria-label="Voltar"    icon={<DSIcon name="direction-left" size={20} />} />
                    <IconButton variant={v} aria-label="Fechar"    icon={<DSIcon name="multiply-circle" size={20} />} />
                    <IconButton variant={v} aria-label="Adicionar" icon={<DSIcon name="plus-01" size={20} />} />
                  </div>
                </div>
              ))}
            </div>
          )}
          generateAllCode={() => `import { IconButton, DSIcon } from '@/components/brmania'

export function AllVariants() {
  return (
    <div className="flex gap-6">
      <IconButton variant="filled" aria-label="Voltar"    icon={<DSIcon name="direction-left" size={20} />} />
      <IconButton variant="filled" aria-label="Fechar"    icon={<DSIcon name="multiply-circle" size={20} />} />
      <IconButton variant="filled" aria-label="Adicionar" icon={<DSIcon name="plus-01" size={20} />} />

      <IconButton variant="ghost"  aria-label="Voltar"    icon={<DSIcon name="direction-left" size={20} />} />
      <IconButton variant="ghost"  aria-label="Fechar"    icon={<DSIcon name="multiply-circle" size={20} />} />
      <IconButton variant="ghost"  aria-label="Adicionar" icon={<DSIcon name="plus-01" size={20} />} />
    </div>
  )
}`}
        />
      </div>
    </div>
  )
}

function generateCode({ variant, icon, aria }: { variant: string; icon: string; aria: string }) {
  const slug = ICON_SLUGS[icon] ?? 'direction-left'
  return `import { IconButton, DSIcon } from '@/components/brmania'

export function Example() {
  return (
    <IconButton
      variant="${variant}"
      aria-label="${aria || 'Botão'}"
      icon={<DSIcon name="${slug}" size={20} />}
    />
  )
}`
}
