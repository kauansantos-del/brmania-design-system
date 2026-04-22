import { Figma } from 'lucide-react'
import { DSIcon } from '@/components/brmania'
import { PageHeader } from '@/components/layout/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SpotlightCard } from '@/components/ui/effects/SpotlightCard'
import { Meteors } from '@/components/ui/effects/Meteors'
import { AnimatedBorder } from '@/components/ui/effects/AnimatedBorder'
import { sections, type NavLeaf } from '@/data/navigation'
import { ButtonPage } from './showcases/ButtonPage'
import { ButtonTextPage } from './showcases/ButtonTextPage'
import { IconButtonPage } from './showcases/IconButtonPage'
import { InputPage } from './showcases/InputPage'
import { CheckboxPage } from './showcases/CheckboxPage'
import { MenuItemPage } from './showcases/MenuItemPage'
import { IconPage } from './showcases/IconPage'
import { AcoesShowcase } from './showcases/AcoesShowcase'
import { FormulariosShowcase } from './showcases/FormulariosShowcase'
import { NavegacaoShowcase } from './showcases/NavegacaoShowcase'
import { LayoutShowcase } from './showcases/LayoutShowcase'
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
  if (sub === 'sidebar-button')      return <SidebarButtonPage />
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
  if (sub === 'menu-item')    return <MenuItemPage />
  if (sub === 'icon')         return <IconPage />

  // Páginas de categoria (lista todos os componentes da categoria)
  if (sub === 'acoes')       return <AcoesShowcase />
  if (sub === 'formularios') return <FormulariosShowcase />
  if (sub === 'navegacao')   return <NavegacaoShowcase />
  if (sub === 'layout')      return <LayoutShowcase />

  return <CategoryEmpty title={current.label} description={current.description || ''} />
}

const COMPONENTS = [
  { key: 'button',      label: 'Button',     icon: 'input-cursor-move', desc: 'CTA principal — 5 variantes',               category: 'Ações' },
  { key: 'button-text', label: 'ButtonText', icon: 'link',              desc: 'Link / texto — 4 variantes',                 category: 'Ações' },
  { key: 'icon-button', label: 'IconButton', icon: 'plus-rectangle',    desc: 'Só ícone — filled / ghost',                  category: 'Ações' },
  { key: 'input',       label: 'Input',      icon: 'text-area',         desc: 'Campo, search e textarea',                   category: 'Formulários' },
  { key: 'checkbox',    label: 'Checkbox',   icon: 'check-mark-circle', desc: 'Seleção com label',                          category: 'Formulários' },
  { key: 'menu-item',   label: 'MenuItem',   icon: 'menu-line-horizontal-01', desc: 'Item de sidebar — CSS states',         category: 'Navegação' },
  { key: 'icon',        label: 'Icon',       icon: 'plus-rectangle',    desc: 'Wrapper de ícones SVG',                      category: 'Layout' },
]

function Overview() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Biblioteca"
        title="Uma biblioteca de componentes,"
        titleAccent="sincronizada com o Figma."
        description="Cada componente abaixo tem preview interativo, código copiável e props documentadas. Clique em qualquer card para explorar."
        meta={[
          { label: 'React + TypeScript', tone: 'info' },
          { label: `${COMPONENTS.length} componentes`, tone: 'brand' },
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
        {/* Componentes disponíveis */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-ink-50">Componentes</h3>
            <p className="text-[14px] text-ink-300">Clique em qualquer um para ver o preview e código.</p>
          </div>
          <Badge dot tone="brand">{COMPONENTS.length} publicados</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {COMPONENTS.map((comp, i) => (
            <SpotlightCard key={comp.key} className="animate-slide-up cursor-pointer" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/20 to-brand-600/10 border border-brand-500/20">
                    <DSIcon name={comp.icon} size={20} className="text-brand-400" />
                  </div>
                  <Badge size="sm" tone="neutral">{comp.category}</Badge>
                </div>
                <p className="font-display text-[16px] font-bold text-ink-50">{comp.label}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-ink-300">{comp.desc}</p>
                <div className="mt-4 flex items-center gap-1.5 text-[13px] font-medium text-brand-400">
                  Ver componente <DSIcon name="arrow-right" size={14} />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Categorias */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-ink-50">Categorias</h3>
            <p className="text-[14px] text-ink-300">Veja todos os componentes agrupados.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cfg_categories().map((cat, i) => (
            <SpotlightCard key={cat.key} className="animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-surface-border bg-surface-raised">
                    <DSIcon name={cat.icon} size={18} className="text-ink-300" />
                  </div>
                  <Badge size="sm" tone="neutral">{cat.count} itens</Badge>
                </div>
                <p className="font-display text-[15px] font-bold text-ink-50">{cat.label}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-ink-300">{cat.description}</p>
                <div className="mt-4 flex items-center gap-1 text-[13px] font-medium text-ink-400">
                  Explorar <DSIcon name="arrow-right" size={14} />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  )
}

function cfg_categories() {
  return sections.componentes.groups.find((g) => g.title === 'Categorias')?.items ?? []
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
