import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { Tabs, type TabItem } from '@/components/brmania'

const TABS: TabItem[] = [
  { value: 'empresa',  label: 'Dados da empresa',   icon: 'store-01' },
  { value: 'usuarios', label: 'Usuários secundários', icon: 'security' },
  { value: 'seguranca', label: 'Segurança',          icon: 'smart-key' },
]

const CONTROLS: PropControl[] = [
  {
    kind: 'select', key: 'value', label: 'Aba ativa', default: 'empresa',
    options: TABS.map((t) => ({ value: t.value, label: String(t.label) })),
  },
  { kind: 'toggle', key: 'withIcons', label: 'Com ícones', default: true },
]

export function TabsPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Navegação"
        title="Tabs"
        titleAccent="— underline animado."
        description="Tabs horizontais com underline 2px verde. Suporta ícones + label. Figma 147:42657."
        meta={[
          { label: 'Controlado / uncontrolled', tone: 'info' },
          { label: 'Keyboard nav', tone: 'success' },
          { label: 'Figma 147:42657', tone: 'neutral' },
        ]}
      />
      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="Tabs"
          description="Clique pra trocar. O estado pode ser controlado pelo parent ou pelo próprio componente."
          controls={CONTROLS}
          renderPreview={(s) => (
            <Tabs
              items={TABS.map((t) => ({ ...t, icon: s.withIcons ? t.icon : undefined }))}
              value={s.value as string}
            />
          )}
          generateCode={(s) => `<Tabs
  value="${s.value}"
  onValueChange={setTab}
  items={[
    { value: 'empresa',   label: 'Dados da empresa'${s.withIcons ? ", icon: 'store-01'" : ''} },
    { value: 'usuarios',  label: 'Usuários secundários'${s.withIcons ? ", icon: 'security'" : ''} },
    { value: 'seguranca', label: 'Segurança'${s.withIcons ? ", icon: 'smart-key'" : ''} },
  ]}
/>`}
        />
      </div>
    </div>
  )
}
