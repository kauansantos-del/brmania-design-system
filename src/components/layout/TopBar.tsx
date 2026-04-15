import { Command, Search, Github, Figma } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/Badge'
import { Tooltip } from '@/components/ui/Tooltip'
import { sections, sectionOrder, type SectionKey } from '@/data/navigation'
import { PROJECT } from '@/data/project'

export function TopBar({
  section,
  onSectionChange,
  onOpenPalette,
}: {
  section: SectionKey
  onSectionChange: (s: SectionKey) => void
  query?: string
  onQueryChange?: (q: string) => void
  onOpenPalette: (seed?: string) => void
}) {

  return (
    <header className="sticky top-0 z-40 border-b border-surface-border bg-surface/75 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-8 px-8">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0 w-[260px] pr-4 border-r border-surface-border/60">
          <img
            src="/Logo-BRMANIA.svg"
            alt="BR Mania"
            className="h-7 w-auto select-none"
            draggable={false}
          />
          <div className="flex items-center gap-2 min-w-0">
            <div className="min-w-0 leading-tight">
              <p className="text-[10.5px] font-medium tracking-wider uppercase text-ink-400">
                Design System
              </p>
            </div>
            <Tooltip content={`v${PROJECT.version} — ${PROJECT.release} · ver release no GitHub`} side="bottom">
              <a
                href={`${PROJECT.githubUrl}/releases/tag/v${PROJECT.version}`}
                target="_blank"
                rel="noreferrer"
                className="transition hover:brightness-110"
                aria-label={`Versão ${PROJECT.version}`}
              >
                <Badge tone="brand" size="sm">v{PROJECT.version.split('.').slice(0, 2).join('.')}</Badge>
              </a>
            </Tooltip>
          </div>
        </div>

        {/* Section tabs */}
        <nav className="flex items-center gap-1 rounded-xl border border-surface-border bg-surface-raised/60 p-1 shrink-0">
          {sectionOrder.map((k) => {
            const cfg = sections[k]
            const Icon = cfg.icon
            const active = section === k
            return (
              <Tooltip key={k} content={cfg.description} side="bottom" delay={400}>
                <button
                  type="button"
                  onClick={() => onSectionChange(k)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[12.5px] font-medium transition',
                    active
                      ? 'text-ink-50'
                      : 'text-ink-400 hover:text-ink-100',
                  )}
                >
                  {active && (
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-0 rounded-lg bg-gradient-to-br opacity-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
                        cfg.activeTab,
                        cfg.ring,
                      )}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <Icon size={14} className={active ? 'text-white' : ''} />
                    <span className={active ? 'text-white' : ''}>{cfg.shortLabel}</span>
                  </span>
                </button>
              </Tooltip>
            )
          })}
        </nav>

        {/* Search — abre a command palette global */}
        <div className="flex-1 max-w-xl mx-auto">
          <button
            type="button"
            onClick={() => onOpenPalette('')}
            className="group flex h-10 w-full items-center gap-2.5 rounded-lg border border-surface-border bg-surface-raised/70 px-3.5 text-left transition hover:border-brand-500/40 hover:bg-surface-elevated focus:outline-none focus:border-brand-500/60 focus:shadow-[0_0_0_3px_rgba(70,167,104,.14)]"
            aria-label="Abrir busca global"
          >
            <Search size={14} className="text-ink-400 group-hover:text-ink-200" />
            <span className="flex-1 text-[13px] text-ink-400 group-hover:text-ink-300">
              Buscar componentes, tokens, ícones, docs…
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-surface-border bg-surface/60 px-1.5 py-0.5 font-mono text-[10px] text-ink-400">
              <Command size={10} /> K
            </kbd>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0 pl-4 border-l border-surface-border/60">
          <Tooltip content="Abrir arquivo no Figma · API externa Vibra" side="bottom">
            <a
              href={PROJECT.figmaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-surface-border bg-surface-raised/60 px-2.5 text-[12px] font-medium text-ink-200 hover:text-ink-50 hover:bg-surface-elevated transition"
              aria-label="Arquivo do Figma"
            >
              <Figma size={14} className="text-pink-400" />
              <span className="hidden sm:inline">Figma</span>
            </a>
          </Tooltip>
          <Tooltip content="Abrir repositório no GitHub" side="bottom">
            <a
              href={PROJECT.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-surface-border bg-surface-raised/60 px-2.5 text-[12px] font-medium text-ink-200 hover:text-ink-50 hover:bg-surface-elevated transition"
              aria-label="Repositório no GitHub"
            >
              <Github size={14} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}
