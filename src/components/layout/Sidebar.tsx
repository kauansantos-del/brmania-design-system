import { useState } from 'react'
import { ExternalLink, Loader2, Check } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/Badge'
import { Tooltip } from '@/components/ui/Tooltip'
import { sections, type SectionKey } from '@/data/navigation'
import { downloadResource } from '@/lib/downloads'
import { PROJECT } from '@/data/project'

export function Sidebar({
  section,
  sub,
  onSubChange,
  query,
}: {
  section: SectionKey
  sub: string
  onSubChange: (key: string) => void
  query: string
}) {
  const cfg = sections[section]
  const q = query.trim().toLowerCase()
  const [downloading, setDownloading] = useState<string | null>(null)
  const [justDone, setJustDone] = useState<string | null>(null)

  const handleDownload = async (itemKey: string, resource: 'colors' | 'typography' | 'spacing' | 'all') => {
    if (downloading) return
    setDownloading(itemKey)
    try {
      await downloadResource(resource)
      toast.success('Download iniciado')
      setJustDone(itemKey)
      setTimeout(() => setJustDone(null), 1400)
    } catch (e) {
      toast.error('Falha ao gerar o arquivo')
    } finally {
      setDownloading(null)
    }
  }
  const filterGroups = cfg.groups
    .map((g) => ({
      ...g,
      items: g.items.filter((it) =>
        !q ||
        it.label.toLowerCase().includes(q) ||
        (it.description || '').toLowerCase().includes(q),
      ),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <aside
      // key=section força a re-animação quando troca de seção
      key={section}
      className="flex h-full w-[260px] shrink-0 flex-col border-r border-surface-border bg-surface-raised/40 backdrop-blur"
    >
      {/* Section header */}
      <div className="px-5 pt-5 pb-4 border-b border-surface-border/60 animate-slide-in-left">
        <div className="flex items-center gap-2.5">
          <div className={cn(
            'h-8 w-8 rounded-lg bg-gradient-to-br grid place-items-center shadow-inner',
            cfg.accent,
          )}>
            <cfg.icon size={15} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-[13.5px] font-bold leading-tight text-ink-50 truncate">
              {cfg.label}
            </p>
            <p className="text-[11px] text-ink-400 leading-tight truncate">
              {cfg.description}
            </p>
          </div>
        </div>
      </div>

      {/* Groups */}
      <nav className="flex-1 overflow-y-auto py-4 animate-slide-in-left">
        {filterGroups.length === 0 && (
          <div className="px-5 py-6 text-center">
            <p className="text-sm text-ink-400">Nada encontrado</p>
            <p className="text-[11px] text-ink-500">Tente outro termo.</p>
          </div>
        )}

        {filterGroups.map((group, gi) => (
          <div key={group.title} className={cn('pb-4', gi < filterGroups.length - 1 && 'mb-2 border-b border-surface-border/60')}>
            <p className="px-5 pt-1 pb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-500">
              {group.title}
            </p>
            <ul className="flex flex-col gap-1.5">
              {group.items.map((it, i) => {
                const Icon = it.icon
                const isExternal = !!it.href
                const isDownload = !!it.download
                const isActive = !isExternal && !isDownload && sub === it.key
                const isBusy = downloading === it.key
                const isDone = justDone === it.key
                const base = (
                  <div
                    className={cn(
                      'group relative flex w-full items-center gap-3 px-5 py-2.5 text-left',
                      'transition-[background,color] duration-150',
                      isActive
                        ? cn(cfg.softBg, cfg.text)
                        : 'text-ink-300 hover:bg-surface-elevated/70 hover:text-ink-100',
                    )}
                  >
                    {isActive && (
                      <span className={cn('absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full', cfg.marker)} />
                    )}
                    {isBusy ? (
                      <Loader2 size={16} className="shrink-0 animate-spin text-brand-300" />
                    ) : isDone ? (
                      <Check size={16} className="shrink-0 text-brand-300" />
                    ) : (
                      <Icon size={16} className="shrink-0" />
                    )}
                    <span className="flex-1 truncate text-[13px] font-medium">{it.label}</span>
                    {it.count !== undefined && (
                      <span
                        className={cn(
                          'rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular-nums',
                          isActive
                            ? cn(cfg.softBg, cfg.text)
                            : 'bg-surface-elevated text-ink-400',
                        )}
                      >
                        {it.count}
                      </span>
                    )}
                    {it.badge && (
                      <Badge tone={it.badge.tone} size="sm">
                        {it.badge.text}
                      </Badge>
                    )}
                    {isExternal && <ExternalLink size={11} className="text-ink-500 group-hover:text-ink-300" />}
                  </div>
                )
                return (
                  <li key={it.key} className="animate-slide-up" style={{ animationDelay: `${i * 25}ms` }}>
                    <Tooltip content={it.description || it.label} side="right" delay={500} wrapperClassName="!flex w-full">
                      {isExternal ? (
                        <a href={it.href} target="_blank" rel="noreferrer" className="block w-full">{base}</a>
                      ) : isDownload ? (
                        <button
                          type="button"
                          onClick={() => handleDownload(it.key, it.download!)}
                          className="block w-full"
                          disabled={isBusy}
                          aria-label={`Baixar ${it.label}`}
                        >
                          {base}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onSubChange(it.key)}
                          className="block w-full"
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {base}
                        </button>
                      )}
                    </Tooltip>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-surface-border p-4">
        <a
          href={PROJECT.deployUrl}
          target="_blank"
          rel="noreferrer"
          className="block rounded-lg border border-surface-border bg-surface/60 p-3 transition hover:border-brand-500/40 hover:bg-surface/80"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <p className="text-[11.5px] font-medium text-ink-200">Deploy live</p>
            <span className="ml-auto rounded-md bg-brand-500/15 px-1.5 py-0.5 font-mono text-[10px] text-brand-300">
              v{PROJECT.version}
            </span>
          </div>
          <p className="mt-1 truncate font-mono text-[10.5px] leading-relaxed text-ink-400">
            {PROJECT.deployUrl.replace('https://', '')}
          </p>
        </a>
      </div>
    </aside>
  )
}
