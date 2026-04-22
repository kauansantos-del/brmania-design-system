import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { SidebarButton, type SidebarButtonType, SIDEBAR_BUTTON_PRESETS } from '@/components/brmania'

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
        title="SidebarButton"
        titleAccent="— 6 presets × 3 estados."
        description="Botão de navegação lateral sincronizado com o Figma (nó 38:1345). 6 tipos pré-configurados com ícone e label; 3 estados: default, hover (CSS) e selecionado (CSS :focus)."
        meta={[
          { label: '6 presets', tone: 'brand' },
          { label: '3 estados', tone: 'info' },
          { label: 'Figma 38:1345', tone: 'neutral' },
        ]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="SidebarButton"
          description="Passe o mouse para ver o hover. Clique para ver o estado selecionado (CSS :focus nativo)."
          tags={[{ label: 'interativo', tone: 'success' }]}
          controls={CONTROLS}
          renderPreview={(s) => (
            <div className="w-[210px]">
              <SidebarButton type={s.type as SidebarButtonType} />
            </div>
          )}
          generateCode={(s) => `<SidebarButton type="${s.type}" />`}
          renderAll={() => <SidebarPreview />}
          generateAllCode={() => ALL_CODE}
        />
      </div>
    </div>
  )
}

const NAV_TYPES = Object.keys(SIDEBAR_BUTTON_PRESETS).filter(
  (t) => t !== 'desconectar',
) as Exclude<SidebarButtonType, 'desconectar'>[]

function SidebarPreview() {
  return (
    <nav className="flex flex-col gap-1 w-[210px]" aria-label="Navegação lateral">
      {NAV_TYPES.map((t) => (
        <SidebarButton key={t} type={t} />
      ))}
      <div className="mt-3 border-t border-[#e0e0e0] pt-3">
        <SidebarButton type="desconectar" />
      </div>
    </nav>
  )
}

const ALL_CODE = `import { SidebarButton } from '@/components/brmania'

export function AppSidebar() {
  return (
    <nav className="flex flex-col gap-1 w-[210px]">
      <SidebarButton type="inicio" />
      <SidebarButton type="credenciais" />
      <SidebarButton type="webhooks" />
      <SidebarButton type="historico" />
      <SidebarButton type="configuracoes" />

      <div className="mt-3 border-t border-gray-200 pt-3">
        <SidebarButton type="desconectar" />
      </div>
    </nav>
  )
}`
