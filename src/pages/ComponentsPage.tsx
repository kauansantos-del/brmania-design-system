import { Figma } from 'lucide-react'
import { DSIcon } from '@/components/brmania'
import { PageHeader } from '@/components/layout/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SpotlightCard } from '@/components/ui/effects/SpotlightCard'
import { Meteors } from '@/components/ui/effects/Meteors'
import { sections, type NavLeaf } from '@/data/navigation'
import { ButtonPage } from './showcases/ButtonPage'
import { ButtonTextPage } from './showcases/ButtonTextPage'
import { IconButtonPage } from './showcases/IconButtonPage'
import { InputPage } from './showcases/InputPage'
import { CheckboxPage } from './showcases/CheckboxPage'
import { NavItemPage } from './showcases/MenuItemPage'
import { IconPage } from './showcases/IconPage'
import { SidebarButtonPage } from './showcases/figma/SidebarButtonPage'
import { EnvironmentTogglePage } from './showcases/figma/EnvironmentTogglePage'
import { InfoTooltipPage } from './showcases/figma/InfoTooltipPage'
import { SwitchPage } from './showcases/figma/SwitchPage'
import { StepTaskPage } from './showcases/figma/StepTaskPage'
import { ExportCardPage } from './showcases/figma/ExportCardPage'
import { RoleCardPage } from './showcases/figma/RoleCardPage'
import { FeatureCardPage } from './showcases/figma/FeatureCardPage'
import { EventOptionCardPage } from './showcases/figma/EventOptionCardPage'
import { SelectFieldPage } from './showcases/figma/SelectFieldPage'
import { PaginationPage } from './showcases/figma/PaginationPage'
import { TabsPage } from './showcases/figma/TabsPage'
import { ActionToastPage } from './showcases/figma/ActionToastPage'
import { UserCardPage } from './showcases/figma/UserCardPage'

function findItem(items: NavLeaf[], key: string): NavLeaf | undefined {
  for (const it of items) {
    if (it.key === key) return it
    if (it.children) {
      const found = findItem(it.children, key)
      if (found) return found
    }
  }
  return undefined
}

export function ComponentsPage({ sub, query: _query }: { sub: string; query: string }) {
  const cfg = sections.componentes
  const allItems = cfg.groups.flatMap((g) => g.items)
  const current = findItem(allItems, sub)

  if (sub === 'visao-geral' || !current) return <Overview />

  // Componentes Figma (Vibra) — design system Radix tokens
  if (sub === 'sidebar-item' || sub === 'sidebar-button') return <SidebarButtonPage />
  if (sub === 'environment-toggle')  return <EnvironmentTogglePage />
  if (sub === 'info-tooltip')        return <InfoTooltipPage />
  if (sub === 'switch')              return <SwitchPage />
  if (sub === 'step-task')           return <StepTaskPage />
  if (sub === 'export-card')         return <ExportCardPage />
  if (sub === 'role-card')           return <RoleCardPage />
  if (sub === 'feature-card')        return <FeatureCardPage />
  if (sub === 'event-option-card')   return <EventOptionCardPage />
  if (sub === 'select-field')        return <SelectFieldPage />
  if (sub === 'pagination')          return <PaginationPage />
  if (sub === 'tabs')                return <TabsPage />
  if (sub === 'action-toast')        return <ActionToastPage />
  if (sub === 'user-card')           return <UserCardPage />

  // Páginas individuais (uma por componente)
  if (sub === 'button')       return <ButtonPage />
  if (sub === 'button-text')  return <ButtonTextPage />
  if (sub === 'icon-button')  return <IconButtonPage />
  if (sub === 'input')        return <InputPage />
  if (sub === 'checkbox')     return <CheckboxPage />
  if (sub === 'nav-item' || sub === 'menu-item') return <NavItemPage />
  if (sub === 'icon')         return <IconPage />

  return <CategoryEmpty title={current.label} description={current.description || ''} />
}

type AtomicLevel = 'Átomo' | 'Molécula'
type ComponentEntry = { key: string; label: string; icon: string; desc: string; level: AtomicLevel }
type ComponentCluster = { title: string; items: ComponentEntry[] }

const ATOM_CLUSTERS: ComponentCluster[] = [
  {
    title: 'Ações',
    items: [
      { key: 'button',      label: 'Button',     icon: 'input-cursor-move', desc: 'CTA principal — 5 variantes',      level: 'Átomo' },
      { key: 'button-text', label: 'ButtonText', icon: 'link',              desc: 'Link / texto — 4 variantes',       level: 'Átomo' },
      { key: 'icon-button', label: 'IconButton', icon: 'plus-rectangle',    desc: 'Só ícone — filled / ghost',        level: 'Átomo' },
    ],
  },
  {
    title: 'Formulários',
    items: [
      { key: 'input',    label: 'Input',    icon: 'text-area',         desc: 'Campo, search, textarea', level: 'Átomo' },
      { key: 'checkbox', label: 'Checkbox', icon: 'check-mark-circle', desc: 'Seleção com label',       level: 'Átomo' },
      { key: 'switch',   label: 'Switch',   icon: 'switch',            desc: 'Toggle on/off',           level: 'Átomo' },
    ],
  },
  {
    title: 'Navegação',
    items: [
      { key: 'nav-item', label: 'NavItem', icon: 'menu-line-horizontal-01', desc: 'Item de sidebar — CSS states', level: 'Átomo' },
    ],
  },
  {
    title: 'Fundamentos',
    items: [
      { key: 'icon', label: 'Icon', icon: 'plus-rectangle', desc: 'Wrapper de ícones SVG', level: 'Átomo' },
    ],
  },
]

const MOLECULE_CLUSTERS: ComponentCluster[] = [
  {
    title: 'Ações',
    items: [
      { key: 'environment-toggle', label: 'EnvironmentToggle', icon: 'test-tube', desc: 'Sandbox / Produção', level: 'Molécula' },
    ],
  },
  {
    title: 'Formulários',
    items: [
      { key: 'select-field', label: 'SelectField', icon: 'arrow-down', desc: 'Dropdown com label', level: 'Molécula' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { key: 'info-tooltip', label: 'InfoTooltip', icon: 'information',  desc: 'Tooltip com ícone info', level: 'Molécula' },
      { key: 'action-toast', label: 'ActionToast', icon: 'notification', desc: 'Notificação com ação',   level: 'Molécula' },
    ],
  },
  {
    title: 'Navegação',
    items: [
      { key: 'sidebar-item', label: 'SidebarItem', icon: 'menu-line-horizontal', desc: 'Compõe NavItem · 6 presets × 3 estados', level: 'Molécula' },
      { key: 'tabs',         label: 'Tabs',        icon: 'menu-line-horizontal', desc: 'Tabs com underline',                     level: 'Molécula' },
      { key: 'pagination',   label: 'Pagination',  icon: 'arrow-right',          desc: 'Paginação numerada',                     level: 'Molécula' },
    ],
  },
  {
    title: 'Dados',
    items: [
      { key: 'user-card',         label: 'UserCard',        icon: 'security',     desc: 'Avatar + nome + organização', level: 'Molécula' },
      { key: 'step-task',         label: 'StepTask',        icon: 'tick',         desc: 'Linha de checklist',          level: 'Molécula' },
      { key: 'export-card',       label: 'ExportCard',      icon: 'file-01',      desc: 'Card de formato de export',   level: 'Molécula' },
      { key: 'role-card',         label: 'RoleCard',        icon: 'security',     desc: 'Card de papel de usuário',    level: 'Molécula' },
      { key: 'feature-card',      label: 'FeatureCard',     icon: 'star',         desc: 'Card de acesso rápido',       level: 'Molécula' },
      { key: 'event-option-card', label: 'EventOptionCard', icon: 'notification', desc: 'Opção selecionável',          level: 'Molécula' },
    ],
  },
]

const totalInClusters = (clusters: ComponentCluster[]) =>
  clusters.reduce((sum, c) => sum + c.items.length, 0)

const ATOMS_COUNT = totalInClusters(ATOM_CLUSTERS)
const MOLECULES_COUNT = totalInClusters(MOLECULE_CLUSTERS)
const ALL_COUNT = ATOMS_COUNT + MOLECULES_COUNT

function Overview() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Biblioteca"
        title="Componentes organizados por"
        titleAccent="Atomic Design."
        description="Átomos são as peças básicas — botões, inputs, ícones. Moléculas são compostos de átomos que formam padrões reutilizáveis. Clique em qualquer card para explorar."
        meta={[
          { label: 'React + TypeScript', tone: 'info' },
          { label: `${ALL_COUNT} componentes`, tone: 'brand' },
          { label: 'A11y first', tone: 'success' },
        ]}
        actions={
          <>
            <Button variant="secondary" leftIcon={<Figma size={14} />}>
              Abrir Figma
            </Button>
            <Button variant="primary" rightIcon={<DSIcon name="arrow-right" size={14} />}>
              Começar
            </Button>
          </>
        }
      />

      <div className="mx-auto max-w-6xl px-8 py-10">
        <LevelSection
          tag="Átomos"
          title="Blocos fundamentais"
          description="Componentes primitivos — não se dividem em peças menores de UI."
          count={ATOMS_COUNT}
          tone="info"
          clusters={ATOM_CLUSTERS}
        />

        <div className="h-14" />

        <LevelSection
          tag="Moléculas"
          title="Compostos reutilizáveis"
          description="Combinações de átomos que formam padrões com propósito específico."
          count={MOLECULES_COUNT}
          tone="brand"
          clusters={MOLECULE_CLUSTERS}
        />
      </div>
    </div>
  )
}

function LevelSection({
  tag,
  title,
  description,
  count,
  tone,
  clusters,
}: {
  tag: string
  title: string
  description: string
  count: number
  tone: 'info' | 'brand'
  clusters: ComponentCluster[]
}) {
  let cardIndex = 0
  return (
    <section>
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <Badge dot tone={tone}>{tag}</Badge>
          <h3 className="mt-3 font-display text-xl font-bold text-ink-50">{title}</h3>
          <p className="text-[14px] text-ink-300">{description}</p>
        </div>
        <Badge size="sm" tone="neutral">{count} componentes</Badge>
      </div>

      <div className="flex flex-col gap-9">
        {clusters.map((cluster) => (
          <div key={cluster.title}>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-300">
                {cluster.title}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-surface-border/80 via-surface-border/40 to-transparent" />
              <span className="text-[11px] font-mono tabular-nums text-ink-400">
                {String(cluster.items.length).padStart(2, '0')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cluster.items.map((comp) => {
                const delay = cardIndex++ * 40
                return (
                  <SpotlightCard key={comp.key} className="animate-slide-up cursor-pointer" style={{ animationDelay: `${delay}ms` }}>
                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/20 to-brand-600/10 border border-brand-500/20">
                          <DSIcon name={comp.icon} size={20} className="text-brand-400" />
                        </div>
                        <Badge size="sm" tone={tone}>{comp.level}</Badge>
                      </div>
                      <p className="font-display text-[16px] font-bold text-ink-50">{comp.label}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-ink-300">{comp.desc}</p>
                      <div className="mt-4 flex items-center gap-1.5 text-[13px] font-medium text-brand-400">
                        Ver componente <DSIcon name="arrow-right" size={14} />
                      </div>
                    </div>
                  </SpotlightCard>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CategoryEmpty({ title, description }: { title: string; description: string }) {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Categoria"
        title={title}
        description={description}
        meta={[{ label: '0 componentes', tone: 'neutral' }]}
      />

      <div className="mx-auto max-w-6xl px-8 py-10">
        <div className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface-raised">
          <Meteors number={14} />
          <div className="relative p-10 sm:p-16 text-center">
            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow">
              <DSIcon name="grid-01" size={22} className="text-white" />
            </div>
            <h3 className="font-display text-2xl font-extrabold text-ink-50">
              Nenhum componente em <span className="text-brand-400">{title}</span> ainda.
            </h3>
            <p className="mx-auto mt-2 max-w-md text-[14px] text-ink-300">
              Assim que os componentes forem adicionados a essa categoria, eles aparecerão aqui com preview
              interativo e código pronto para copiar.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button variant="secondary" leftIcon={<Figma size={14} />}>
                Ver no Figma
              </Button>
              <Button variant="ghost" rightIcon={<DSIcon name="arrow-right" size={14} />}>
                Voltar ao início
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
