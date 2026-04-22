import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { UserCard, SidebarButton, SIDEBAR_BUTTON_PRESETS, type SidebarButtonType } from '@/components/brmania'

const CONTROLS: PropControl[] = [
  { kind: 'text', key: 'name',         label: 'Nome',         default: 'Carlos Henrique' },
  { kind: 'text', key: 'organization', label: 'Organização',  default: 'Heineken' },
  { kind: 'text', key: 'avatarUrl',    label: 'Avatar URL',   default: '' },
]

const NAV_TYPES = Object.keys(SIDEBAR_BUTTON_PRESETS).filter(
  (t) => t !== 'desconectar',
) as Exclude<SidebarButtonType, 'desconectar'>[]

export function UserCardPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Navegação"
        title="UserCard"
        titleAccent="— footer da sidebar."
        description="Avatar + nome + organização. Usado no rodapé da sidebar, logo acima do botão Desconectar. Figma 144:24857."
        meta={[
          { label: 'Iniciais fallback', tone: 'info' },
          { label: 'Composição: Sidebar', tone: 'success' },
          { label: 'Figma 144:24857', tone: 'neutral' },
        ]}
      />
      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="UserCard"
          description="Quando sem avatarUrl, mostra as iniciais do nome num círculo verde."
          controls={CONTROLS}
          renderPreview={(s) => (
            <div className="w-[210px]">
              <UserCard
                name={s.name as string}
                organization={s.organization as string}
                avatarUrl={(s.avatarUrl as string) || undefined}
              />
            </div>
          )}
          generateCode={(s) => `<UserCard
  name="${s.name}"
  organization="${s.organization}"${s.avatarUrl ? `\n  avatarUrl="${s.avatarUrl}"` : ''}
/>`}
          renderAll={() => <SidebarTemplate />}
          generateAllCode={() => `// Template: sidebar completa
<nav className="flex h-full flex-col gap-1 w-[210px] p-4">
  {NAV_TYPES.map((t) => <SidebarButton key={t} type={t} />)}

  <div className="mt-auto border-t border-[#e0e0e0] pt-3 space-y-2">
    <UserCard name="Carlos Henrique" organization="Heineken" />
    <SidebarButton type="desconectar" />
  </div>
</nav>`}
        />
      </div>
    </div>
  )
}

function SidebarTemplate() {
  return (
    <nav
      aria-label="Navegação principal"
      className="flex h-[560px] w-[210px] flex-col gap-1 rounded-2xl border border-[#e6e9e7] bg-white p-4"
    >
      {NAV_TYPES.map((t) => (
        <SidebarButton key={t} type={t} />
      ))}
      <div className="mt-auto space-y-2 border-t border-[#e6e9e7] pt-3">
        <UserCard name="Carlos Henrique" organization="Heineken" />
        <SidebarButton type="desconectar" />
      </div>
    </nav>
  )
}
