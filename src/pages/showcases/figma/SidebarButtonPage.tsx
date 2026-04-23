import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { SidebarItem, type SidebarItemType, SIDEBAR_ITEM_PRESETS } from '@/components/brmania'

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
]

export function SidebarButtonPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Navegação"
        title="SidebarItem"
        titleAccent="— 6 presets × 3 estados."
        description="Molecule que compõe NavItem com os 6 presets de navegação do portal (Figma 38:1345). 3 estados: default, hover (CSS) e selecionado (CSS :focus ou prop active)."
        meta={[
          { label: 'Molecule: NavItem', tone: 'brand' },
          { label: '6 presets', tone: 'info' },
          { label: 'Figma 38:1345', tone: 'neutral' },
        ]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="SidebarItem"
          description="Passe o mouse para ver o hover. Clique para ver o estado selecionado (CSS :focus nativo)."
          tags={[{ label: 'interativo', tone: 'success' }]}
          controls={CONTROLS}
          renderPreview={(s) => (
            <div className="w-[210px]">
              <SidebarItem type={s.type as SidebarItemType} />
            </div>
          )}
          generateCode={(s) => `<SidebarItem type="${s.type}" />`}
          renderAll={() => <SidebarPreview />}
          generateAllCode={() => ALL_CODE}
        />
      </div>
    </div>
  )
}

const NAV_TYPES = Object.keys(SIDEBAR_ITEM_PRESETS).filter(
  (t) => t !== 'desconectar',
) as Exclude<SidebarItemType, 'desconectar'>[]

function SidebarPreview() {
  return (
    <nav className="flex flex-col gap-1 w-[210px]" aria-label="Navegação lateral">
      {NAV_TYPES.map((t) => (
        <SidebarItem key={t} type={t} />
      ))}
      <div className="mt-3 border-t border-[#e0e0e0] pt-3">
        <SidebarItem type="desconectar" />
      </div>
    </nav>
  )
}

const ALL_CODE = `import { SidebarItem } from '@/components/brmania'

export function AppSidebar() {
  return (
    <nav className="flex flex-col gap-1 w-[210px]">
      <SidebarItem type="inicio" />
      <SidebarItem type="credenciais" />
      <SidebarItem type="webhooks" />
      <SidebarItem type="historico" />
      <SidebarItem type="configuracoes" />

      <div className="mt-3 border-t border-gray-200 pt-3">
        <SidebarItem type="desconectar" />
      </div>
    </nav>
  )
}`
