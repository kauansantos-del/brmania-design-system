import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { ComponentShowcase } from '@/components/layout/ComponentShowcase'
import { NavItem, DSIcon } from '@/components/brmania'

export function NavegacaoShowcase() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Navegação"
        title="Itens de menu"
        titleAccent="e navegação lateral."
        description="Item de menu com estados CSS nativos: default (idle), hover (mouse sobre — indent 8px + borda), focus (selecionado via prop `active`). Modifier `danger` para ações destrutivas."
        meta={[{ label: '1 componente', tone: 'brand' }, { label: 'CSS states', tone: 'info' }]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <ComponentShowcase
          title="NavItem"
          description="Sidebar interativa — passe o mouse para ver o hover, clique para selecionar. O item 'Desconectar' usa o modifier `danger`."
          tags={[{ label: 'sidebar', tone: 'info' }, { label: 'interativo', tone: 'success' }]}
          preview={<InteractiveSidebar />}
          code={CODE}
        />
      </div>
    </div>
  )
}

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

const CODE = `import { useState } from 'react'
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
}`
