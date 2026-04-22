import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { SidebarButton, type SidebarButtonType, SIDEBAR_BUTTON_PRESETS } from '@/components/brmania'

// ─── Controles do playground ─────────────────────────────────────

const CONTROLS: PropControl[] = [
  {
    kind: 'select',
    key: 'type',
    label: 'Tipo',
    default: 'inicio',
    options: [
      { value: 'inicio',        label: 'Início' },
      { value: 'credenciais',   label: 'Credenciais' },
      { value: 'webhooks',      label: 'Webhooks' },
      { value: 'historico',     label: 'Histórico' },
      { value: 'configuracoes', label: 'Configurações' },
      { value: 'desconectar',   label: 'Desconectar' },
    ],
  },
  { kind: 'toggle', key: 'active', label: 'Active', default: false },
]

// ─── Página ──────────────────────────────────────────────────────

export function SidebarButtonPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Navegação"
        title="SidebarButton"
        titleAccent="— 6 presets × 3 estados."
        description="Botão de navegação lateral sincronizado com o Figma (nó 38:1345). 6 tipos pré-configurados com ícone e label; 3 estados: default, hover (CSS) e active."
        meta={[
          { label: '6 presets', tone: 'brand' },
          { label: '3 estados', tone: 'info' },
          { label: 'Figma 38:1345', tone: 'neutral' },
        ]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="SidebarButton"
          description="Passe o mouse para ver o hover. Use o toggle Active para simular a página selecionada."
          tags={[{ label: 'interativo', tone: 'success' }]}
          controls={CONTROLS}
          renderPreview={(s) => (
            <div className="w-[210px]">
              <SidebarButton
                type={s.type as SidebarButtonType}
                active={!!s.active}
              />
            </div>
          )}
          generateCode={(s) => generateCode(s as { type: string; active: boolean })}
          renderAll={() => <SidebarPreview />}
          generateAllCode={() => ALL_CODE}
        />
      </div>
    </div>
  )
}

// ─── Preview "ver todos" — sidebar interativa ─────────────────────

const NAV_TYPES = Object.keys(SIDEBAR_BUTTON_PRESETS).filter(
  (t) => t !== 'desconectar',
) as Exclude<SidebarButtonType, 'desconectar'>[]

function SidebarPreview() {
  const [active, setActive] = useState<SidebarButtonType>('inicio')

  return (
    <nav className="flex flex-col gap-1 w-[210px]" aria-label="Navegação lateral">
      {NAV_TYPES.map((t) => (
        <SidebarButton
          key={t}
          type={t}
          active={active === t}
          onClick={() => setActive(t)}
        />
      ))}
      <div className="mt-3 border-t border-[#e0e0e0] pt-3">
        <SidebarButton
          type="desconectar"
          active={active === 'desconectar'}
          onClick={() => setActive('desconectar')}
        />
      </div>
    </nav>
  )
}

// ─── Geradores de código ──────────────────────────────────────────

function generateCode({ type, active }: { type: string; active: boolean }) {
  return `import { SidebarButton } from '@/components/brmania'

export function Example() {
  return (
    <SidebarButton
      type="${type}"
      active={${active}}
    />
  )
}`
}

const ALL_CODE = `import { useState } from 'react'
import { SidebarButton } from '@/components/brmania'

type NavItem = 'inicio' | 'credenciais' | 'webhooks' | 'historico' | 'configuracoes'

const NAV_ITEMS: NavItem[] = [
  'inicio', 'credenciais', 'webhooks', 'historico', 'configuracoes',
]

export function AppSidebar() {
  const [active, setActive] = useState<NavItem>('inicio')

  return (
    <nav className="flex flex-col gap-1 w-[186px]">
      {NAV_ITEMS.map((item) => (
        <SidebarButton
          key={item}
          type={item}
          active={active === item}
          onClick={() => setActive(item)}
        />
      ))}

      <div className="mt-3 border-t border-gray-200 pt-3">
        <SidebarButton type="desconectar" onClick={handleLogout} />
      </div>
    </nav>
  )
}`
