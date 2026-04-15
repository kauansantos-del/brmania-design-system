import { PageHeader } from '@/components/layout/PageHeader'
import { ComponentShowcase } from '@/components/layout/ComponentShowcase'
import { MenuItem, DSIcon } from '@/components/brmania'

export function NavegacaoShowcase() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Navegação"
        title="Itens de menu"
        titleAccent="e navegação lateral."
        description="Item de menu com 3 visuais e um modificador de perigo, cobrindo os estados da sidebar do portal BRMania."
        meta={[{ label: '1 componente', tone: 'brand' }]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <ComponentShowcase
          title="MenuItem"
          description="Item de navegação da sidebar. Três visuais: ghost (normal), outlined (hover/secundário) e active (selected). Aceita `danger` para ações destrutivas."
          tags={[{ label: 'sidebar', tone: 'info' }, { label: '3 variantes', tone: 'neutral' }]}
          preview={
            <div className="flex w-full max-w-[880px] items-start justify-center gap-10">
              <MenuColumn title="Ghost" variant="ghost" />
              <MenuColumn title="Outlined" variant="outlined" />
              <MenuColumn title="Active" variant="active" />
            </div>
          }
          code={CODE_MENU_ITEM}
        />
      </div>
    </div>
  )
}

function MenuColumn({ title, variant }: { title: string; variant: 'ghost' | 'outlined' | 'active' }) {
  return (
    <div className="flex w-[220px] flex-col gap-2">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#646464]">{title}</p>
      <MenuItem icon={<DSIcon name="home-01" size={16} />}      label="Início"            variant={variant} />
      <MenuItem icon={<DSIcon name="smart-key" size={16} />}    label="Credenciais"       variant={variant} />
      <MenuItem icon={<DSIcon name="link" size={16} />}         label="Webhooks"          variant={variant} />
      <MenuItem icon={<DSIcon name="clock-circle" size={16} />} label="Histórico"         variant={variant} />
      <MenuItem icon={<DSIcon name="store-01" size={16} />}     label="Empresa e usuários" variant={variant} />
      <div className="mt-4">
        <MenuItem icon={<DSIcon name="logout-01" size={16} />} label="Desconectar" variant={variant} danger />
      </div>
    </div>
  )
}

const CODE_MENU_ITEM = `import { MenuItem, DSIcon } from '@/components/brmania'

export function Sidebar() {
  return (
    <nav className="flex flex-col gap-2 w-[220px]">
      <MenuItem variant="active"   icon={<DSIcon name="home-01" size={16} />}     label="Início" />
      <MenuItem variant="ghost"    icon={<DSIcon name="smart-key" size={16} />}   label="Credenciais" />
      <MenuItem variant="outlined" icon={<DSIcon name="link" size={16} />}        label="Webhooks" />
      <MenuItem variant="ghost" danger icon={<DSIcon name="logout-01" size={16} />} label="Desconectar" />
    </nav>
  )
}`
