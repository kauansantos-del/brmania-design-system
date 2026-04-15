import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { MenuItem, DSIcon, type MenuItemVariant } from '@/components/brmania'

const VARIANTS = ['ghost', 'outlined', 'active'] as const

const ICON_SLUGS: Record<string, string> = {
  home: 'home-01',
  key:  'smart-key',
  hook: 'link',
  hist: 'clock-circle',
  biz:  'store-01',
  out:  'logout-01',
}
type IconKey = keyof typeof ICON_SLUGS

const CONTROLS: PropControl[] = [
  { kind: 'variant', key: 'variant', label: 'Variant', options: VARIANTS, default: 'ghost' },
  { kind: 'toggle',  key: 'danger',  label: 'Danger' },
  {
    kind: 'select', key: 'icon', label: 'Ícone', default: 'home',
    options: [
      { value: 'home', label: 'Home' }, { value: 'key', label: 'Credenciais' },
      { value: 'hook', label: 'Webhooks' }, { value: 'hist', label: 'Histórico' },
      { value: 'biz', label: 'Empresa' }, { value: 'out', label: 'LogOut' },
    ],
  },
  { kind: 'text', key: 'label', label: 'Label', default: 'Início' },
]

export function MenuItemPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Navegação"
        title="MenuItem"
        titleAccent="— item de sidebar."
        description="Item padronizado para navegação lateral. 3 visuais (ghost / outlined / active) e modificador `danger` para ações destrutivas."
        meta={[
          { label: '3 variantes', tone: 'brand' },
          { label: '+danger', tone: 'warning' },
        ]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="Live playground"
          description="Monte seu item de menu. `active` é o estado selecionado, `ghost` é o repouso, `outlined` é uma variante secundária."
          tags={[{ label: 'interativo', tone: 'success' }]}
          controls={CONTROLS}
          renderPreview={(s) => {
            const slug = ICON_SLUGS[(s.icon as IconKey) ?? 'home'] ?? 'home-01'
            return (
              <div className="w-[240px]">
                <MenuItem
                  variant={s.variant as MenuItemVariant}
                  danger={!!s.danger}
                  icon={<DSIcon name={slug} size={16} />}
                  label={String(s.label || 'Início')}
                />
              </div>
            )
          }}
          generateCode={(s) => generateCode(s as any)}
          renderAll={() => (
            <div className="flex w-full max-w-[760px] items-start justify-center gap-6">
              {VARIANTS.map((v) => (
                <div key={v} className="flex w-[220px] flex-col gap-2">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#646464]">{v}</p>
                  <MenuItem icon={<DSIcon name="home-01" size={16} />}      label="Início"            variant={v} />
                  <MenuItem icon={<DSIcon name="smart-key" size={16} />}    label="Credenciais"       variant={v} />
                  <MenuItem icon={<DSIcon name="link" size={16} />}         label="Webhooks"          variant={v} />
                  <MenuItem icon={<DSIcon name="clock-circle" size={16} />} label="Histórico"         variant={v} />
                  <MenuItem icon={<DSIcon name="store-01" size={16} />}     label="Empresa e usuários" variant={v} />
                  <div className="mt-4">
                    <MenuItem icon={<DSIcon name="logout-01" size={16} />} label="Desconectar" variant={v} danger />
                  </div>
                </div>
              ))}
            </div>
          )}
          generateAllCode={() => `import { MenuItem, DSIcon } from '@/components/brmania'

export function Sidebar() {
  return (
    <nav className="flex w-[220px] flex-col gap-2">
      <MenuItem variant="active"   icon={<DSIcon name="home-01" size={16} />}     label="Início" />
      <MenuItem variant="ghost"    icon={<DSIcon name="smart-key" size={16} />}   label="Credenciais" />
      <MenuItem variant="outlined" icon={<DSIcon name="link" size={16} />}        label="Webhooks" />
      <MenuItem variant="ghost" danger icon={<DSIcon name="logout-01" size={16} />} label="Desconectar" />
    </nav>
  )
}`}
        />
      </div>
    </div>
  )
}

function generateCode({
  variant, danger, icon, label,
}: { variant: string; danger: boolean; icon: string; label: string }) {
  const slug = ICON_SLUGS[icon] ?? 'home-01'
  const props: string[] = [`variant="${variant}"`]
  if (danger) props.push('danger')
  props.push(`icon={<DSIcon name="${slug}" size={16} />}`)
  props.push(`label="${label || 'Início'}"`)
  return `import { MenuItem, DSIcon } from '@/components/brmania'

export function Example() {
  return (
    <MenuItem ${props.join(' ')} />
  )
}`
}
