import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { NavItem, DSIcon } from '@/components/brmania'

const CONTROLS: PropControl[] = [
  { kind: 'toggle', key: 'active',   label: 'Active' },
  { kind: 'toggle', key: 'danger',   label: 'Danger' },
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

const ICON_SLUGS: Record<string, string> = {
  home: 'home-01', key: 'smart-key', hook: 'link',
  hist: 'clock-circle', biz: 'store-01', out: 'logout-01',
}

export function NavItemPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Navegação"
        title="NavItem"
        titleAccent="— item de sidebar."
        description="Item de navegação lateral. Os estados (default → hover → focus) são CSS puro — passe o mouse para ver o hover com indent de 8 px, e use a prop `active` para marcar o item selecionado."
        meta={[
          { label: 'CSS states', tone: 'brand' },
          { label: '+active', tone: 'success' },
          { label: '+danger', tone: 'warning' },
        ]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="NavItem"
          description="Passe o mouse nos itens para ver o hover. Clique para mudar a seleção."
          tags={[{ label: 'interativo', tone: 'success' }]}
          controls={CONTROLS}
          renderPreview={(s) => {
            const slug = ICON_SLUGS[(s.icon as string) ?? 'home'] ?? 'home-01'
            return (
              <div className="w-[260px]">
                <NavItem
                  active={!!s.active}
                  danger={!!s.danger}
                  icon={<DSIcon name={slug} size={20} />}
                  label={String(s.label || 'Início')}
                />
              </div>
            )
          }}
          generateCode={(s) => {
            const slug = ICON_SLUGS[(s.icon as string) ?? 'home'] ?? 'home-01'
            return `import { NavItem, DSIcon } from '@/components/brmania'

export function Example() {
  return (
    <NavItem
      label="${s.label || 'Início'}"
      icon={<DSIcon name="${slug}" size={20} />}
      active={${!!s.active}}
      danger={${!!s.danger}}
      fullWidth={true}
    />
  )
}`
          }}
          renderAll={() => <InteractiveSidebar />}
          generateAllCode={() => `import { useState } from 'react'
import { NavItem, DSIcon } from '@/components/brmania'

const MENU = [
  { key: 'inicio',      label: 'Início',             icon: 'home-01' },
  { key: 'credenciais', label: 'Credenciais',        icon: 'smart-key' },
  { key: 'webhooks',    label: 'Webhooks',           icon: 'link' },
  { key: 'historico',   label: 'Histórico',          icon: 'clock-circle' },
  { key: 'empresa',     label: 'Empresa e usuários', icon: 'store-01' },
]

export function Sidebar() {
  const [active, setActive] = useState('inicio')

  return (
    <nav className="flex w-[260px] flex-col gap-1">
      {MENU.map((item) => (
        <NavItem
          key={item.key}
          icon={<DSIcon name={item.icon} size={20} />}
          label={item.label}
          active={active === item.key}
          onClick={() => setActive(item.key)}
        />
      ))}
      <div className="mt-4">
        <NavItem
          icon={<DSIcon name="logout-01" size={20} />}
          label="Desconectar"
          danger
        />
      </div>
    </nav>
  )
}`}
        />
      </div>
    </div>
  )
}

/** Sidebar interativa — clique muda o active, hover mostra o estado hover */
function InteractiveSidebar() {
  const [active, setActive] = useState('inicio')

  const items = [
    { key: 'inicio',      label: 'Início',             icon: 'home-01' },
    { key: 'credenciais', label: 'Credenciais',        icon: 'smart-key' },
    { key: 'webhooks',    label: 'Webhooks',           icon: 'link' },
    { key: 'historico',   label: 'Histórico',          icon: 'clock-circle' },
    { key: 'empresa',     label: 'Empresa e usuários', icon: 'store-01' },
  ]

  return (
    <nav className="flex w-[280px] flex-col gap-1">
      {items.map((item) => (
        <NavItem
          key={item.key}
          icon={<DSIcon name={item.icon} size={20} />}
          label={item.label}
          active={active === item.key}
          onClick={() => setActive(item.key)}
        />
      ))}
      <div className="mt-4">
        <NavItem
          icon={<DSIcon name="logout-01" size={20} />}
          label="Desconectar"
          danger
        />
      </div>
    </nav>
  )
}
