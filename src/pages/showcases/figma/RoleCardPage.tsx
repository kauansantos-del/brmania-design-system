import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { RoleCard, USER_ROLES, type UserRole } from '@/components/brmania'

const CONTROLS: PropControl[] = [
  {
    kind: 'select', key: 'role', label: 'Papel', default: 'admin',
    options: [
      { value: 'admin',  label: 'Admin' },
      { value: 'viewer', label: 'Viewer' },
    ],
  },
  { kind: 'toggle', key: 'selected', label: 'Selected', default: false },
]

export function RoleCardPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Dados"
        title="RoleCard"
        titleAccent="— papel de usuário."
        description="Card detalhado de permissão: ícone, nome, descrição e capacidades (com line-through para o que não está disponível). Figma 143:13712."
        meta={[
          { label: '2 papéis', tone: 'brand' },
          { label: 'Capacidades visíveis', tone: 'success' },
          { label: 'Figma 143:13712', tone: 'neutral' },
        ]}
      />
      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="RoleCard"
          description="Clique para marcar. Pattern de radio group em forma de card."
          controls={CONTROLS}
          renderPreview={(s) => (
            <RoleCard role={s.role as UserRole} selected={!!s.selected} />
          )}
          generateCode={(s) => `<RoleCard role="${s.role}"${s.selected ? ' selected' : ''} />`}
          renderAll={() => <Gallery />}
          generateAllCode={() => `const [selected, setSelected] = useState<UserRole>('admin')

USER_ROLES.map((r) => (
  <RoleCard
    key={r}
    role={r}
    selected={r === selected}
    onClick={() => setSelected(r)}
  />
))`}
        />
      </div>
    </div>
  )
}

function Gallery() {
  const [sel, setSel] = useState<UserRole>('admin')
  return (
    <div className="flex flex-wrap gap-4">
      {USER_ROLES.map((r) => (
        <RoleCard key={r} role={r} selected={r === sel} onClick={() => setSel(r)} />
      ))}
    </div>
  )
}
