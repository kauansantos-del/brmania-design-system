import { Figma, Blocks, ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SpotlightCard } from '@/components/ui/effects/SpotlightCard'
import { Meteors } from '@/components/ui/effects/Meteors'
import { AnimatedBorder } from '@/components/ui/effects/AnimatedBorder'
import { sections } from '@/data/navigation'

export function ComponentsPage({ sub, query: _query }: { sub: string; query: string }) {
  const cfg = sections.componentes
  const current = cfg.groups.flatMap((g) => g.items).find((it) => it.key === sub)

  if (sub === 'visao-geral' || !current) {
    return <Overview />
  }

  return <CategoryEmpty title={current.label} description={current.description || ''} />
}

function Overview() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Biblioteca"
        title="Uma biblioteca de componentes,"
        titleAccent="sincronizada com o Figma."
        description="Em breve, cada componente do Figma ficará disponível aqui — com preview ao vivo, código copiável e props documentadas. Use a sidebar à esquerda para navegar pelas categorias."
        meta={[
          { label: 'React + TypeScript', tone: 'info' },
          { label: 'Tailwind + Tokens', tone: 'neutral' },
          { label: 'A11y first', tone: 'success' },
        ]}
        actions={
          <>
            <Button variant="secondary" leftIcon={<Figma size={14} />}>
              Abrir Figma
            </Button>
            <Button variant="primary" rightIcon={<ArrowRight size={14} />}>
              Começar
            </Button>
          </>
        }
      />

      <div className="mx-auto max-w-6xl px-8 py-10">
        {/* Hero empty-state */}
        <AnimatedBorder className="mb-10" radius={20}>
          <div className="relative overflow-hidden rounded-[19px] bg-gradient-to-br from-surface-raised to-surface p-10 min-h-[260px]">
            <Meteors number={16} />
            <div className="relative z-10 max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-300">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
                Aguardando sincronização
              </div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-50 sm:text-3xl">
                Os componentes chegam em breve.
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-300">
                A biblioteca está preparada para receber os componentes desenhados no Figma. Cada categoria à
                esquerda já aponta para um espaço dedicado. Assim que os designs forem importados, o preview,
                código e props aparecerão aqui automaticamente.
              </p>
            </div>
          </div>
        </AnimatedBorder>

        <div className="mb-6 flex items-end justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-ink-50">Categorias</h3>
            <p className="text-[13px] text-ink-400">Clique em qualquer uma para ver o status atual.</p>
          </div>
          <Badge dot tone="neutral">0 componentes publicados</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cfg_categories().map((cat, i) => (
            <SpotlightCard key={cat.key} className="animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-surface-border bg-surface-raised">
                    <cat.icon size={18} className="text-brand-400" />
                  </div>
                  <Badge size="sm" tone="neutral">{cat.count} itens</Badge>
                </div>
                <p className="font-display text-[15px] font-bold text-ink-50">{cat.label}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-400">
                  {cat.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[12px] text-brand-400">
                  Explorar <ArrowRight size={12} />
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
              <Blocks size={22} className="text-white" />
            </div>
            <h3 className="font-display text-2xl font-extrabold text-ink-50">
              Nenhum componente em <span className="text-brand-400">{title}</span> ainda.
            </h3>
            <p className="mx-auto mt-2 max-w-md text-[13.5px] text-ink-300">
              Assim que os componentes forem adicionados a essa categoria, eles aparecerão aqui com preview
              interativo e código pronto para copiar.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button variant="secondary" leftIcon={<Figma size={14} />}>
                Ver no Figma
              </Button>
              <Button variant="ghost" rightIcon={<ArrowRight size={14} />}>
                Voltar ao início
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
