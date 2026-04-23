import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/Badge'
import { Tooltip } from '@/components/ui/Tooltip'
import { DSIcon } from '@/components/brmania'
import { sections, sectionOrder, type SectionConfig, type SectionKey, type NavLeaf } from '@/data/navigation'
import { downloadResource } from '@/lib/downloads'
import { PROJECT } from '@/data/project'

function containsActiveChild(item: NavLeaf, activeKey: string): boolean {
  if (!item.children) return false
  return item.children.some((c) => c.key === activeKey || containsActiveChild(c, activeKey))
}

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

  // Expansão dos submenus (persistida em memória — reabre automaticamente o que contém o ativo)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  // Expansão dos grupos de topo (Início, Átomos, Moléculas) — vêm fechados
  const [groupsExpanded, setGroupsExpanded] = useState<Record<string, boolean>>({})

  // Quando a rota ativa está dentro de um submenu, garante que esteja aberto
  useEffect(() => {
    const next: Record<string, boolean> = { ...expanded }
    cfg.groups.forEach((g) => g.items.forEach((it) => {
      if (containsActiveChild(it, sub)) next[it.key] = true
    }))
    const changed = Object.keys(next).some((k) => next[k] !== expanded[k])
    if (changed) setExpanded(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sub, section])

  // Abre automaticamente o grupo de topo que contém a rota ativa
  useEffect(() => {
    const next: Record<string, boolean> = { ...groupsExpanded }
    let changed = false
    cfg.groups.forEach((g) => {
      const flatItems = [
        ...g.items,
        ...(g.subgroups?.flatMap((sg) => sg.items) ?? []),
      ]
      const hasActive = flatItems.some(
        (it) => it.key === sub || containsActiveChild(it, sub),
      )
      if (hasActive && !next[g.title]) {
        next[g.title] = true
        changed = true
      }
    })
    if (changed) setGroupsExpanded(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sub, section])

  const toggleExpanded = (key: string) =>
    setExpanded((e) => ({ ...e, [key]: !e[key] }))

  const toggleGroup = (title: string) =>
    setGroupsExpanded((g) => ({ ...g, [title]: !g[title] }))

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
  const matchItem = (it: NavLeaf): boolean => {
    if (!q) return true
    const self =
      it.label.toLowerCase().includes(q) ||
      (it.description || '').toLowerCase().includes(q)
    const inChildren = it.children?.some(matchItem) ?? false
    return self || inChildren
  }

  const filterGroups = cfg.groups
    .map((g) => {
      const items = g.items.filter(matchItem)
      const subgroups = g.subgroups
        ?.map((sg) => ({ ...sg, items: sg.items.filter(matchItem) }))
        .filter((sg) => sg.items.length > 0)
      return { ...g, items, subgroups }
    })
    .filter((g) => g.items.length > 0 || (g.subgroups && g.subgroups.length > 0))

  // Em modo busca, abre automaticamente submenus com match
  useEffect(() => {
    if (!q) return
    const open: Record<string, boolean> = {}
    cfg.groups.forEach((g) => g.items.forEach((it) => {
      if (it.children && it.children.some(matchItem)) open[it.key] = true
    }))
    if (Object.keys(open).length) setExpanded((e) => ({ ...e, ...open }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  // Em modo busca, abre também os grupos de topo que sobreviveram ao filtro
  useEffect(() => {
    if (!q) return
    const open: Record<string, boolean> = {}
    filterGroups.forEach((g) => { open[g.title] = true })
    if (Object.keys(open).length) setGroupsExpanded((g) => ({ ...g, ...open }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  // Renderiza um item de navegação (recursivo, suporta children)
  const renderItem = (it: NavLeaf, i: number, depth: number): React.ReactNode => {
    const isExternal = !!it.href
    const isDownload = !!it.download
    const hasChildren = !!it.children && it.children.length > 0
    const isActive = !isExternal && !isDownload && !hasChildren && sub === it.key
    const isParentOfActive = hasChildren && containsActiveChild(it, sub)
    const isOpen = expanded[it.key] ?? isParentOfActive
    const isBusy = downloading === it.key
    const isDone = justDone === it.key

    const base = (
      <div
        className={cn(
          'group relative flex w-full items-center gap-3 text-left',
          'transition-[background,color] duration-200 ease-out',
          depth === 0 ? 'px-5 py-2.5' : 'pr-5 py-2 pl-4',
          isActive
            ? cn(cfg.softBg, cfg.text)
            : isParentOfActive
              ? 'text-ink-100'
              : 'text-ink-300 hover:bg-surface-elevated/70 hover:text-ink-100',
        )}
      >
        {isActive && (
          <span className={cn('absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full', cfg.marker)} />
        )}
        {isBusy ? (
          <DSIcon name="loading-01" size={depth === 0 ? 18 : 15} className="shrink-0 animate-spin text-brand-300" />
        ) : isDone ? (
          <DSIcon name="check-mark-circle" size={depth === 0 ? 18 : 15} className="shrink-0 text-brand-300" />
        ) : (
          <DSIcon name={it.icon} size={depth === 0 ? 18 : 15} className={cn('shrink-0', isParentOfActive && !isActive && cfg.text)} />
        )}
        <span className={cn('flex-1 truncate font-medium', depth === 0 ? 'text-[14px]' : 'text-[14px]')}>
          {it.label}
        </span>
        {it.count !== undefined && !hasChildren && (
          <span className={cn(
            'rounded-md px-1.5 py-0.5 text-[14px] font-semibold tabular-nums',
            isActive ? cn(cfg.softBg, cfg.text) : 'bg-surface-elevated text-ink-300',
          )}>
            {it.count}
          </span>
        )}
        {it.badge && <Badge tone={it.badge.tone} size="sm">{it.badge.text}</Badge>}
        {hasChildren && (
          <DSIcon
            name="direction-right"
            size={14}
            className={cn('shrink-0 text-ink-300 transition-transform duration-200 ease-out', isOpen && 'rotate-90')}
          />
        )}
        {isExternal && <DSIcon name="link" size={14} className="text-ink-300 group-hover:text-ink-300 transition-colors duration-200" />}
      </div>
    )

    const li = (
      <li key={it.key} className="animate-slide-up" style={{ animationDelay: `${i * 25}ms` }}>
        <Tooltip
          content={it.description || it.label}
          side="right"
          delay={500}
          wrapperClassName="!flex w-full"
        >
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
          ) : hasChildren ? (
            <button
              type="button"
              onClick={() => {
                toggleExpanded(it.key)
                if (!it.nonNavigable) onSubChange(it.key)
              }}
              className="block w-full"
              aria-expanded={isOpen}
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

        {/* Submenu animado */}
        {hasChildren && (
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.ul
                key="sub"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 0.9, 0.28, 1] }}
                className="overflow-hidden"
              >
                <div className="relative mt-1 ml-5 pl-3 border-l border-surface-border/60">
                  {it.children!.map((c, ci) => renderItem(c, ci, depth + 1))}
                </div>
              </motion.ul>
            )}
          </AnimatePresence>
        )}
      </li>
    )
    return li
  }

  return (
    <aside
      // key=section força a re-animação quando troca de seção
      key={section}
      className="flex h-full w-[260px] shrink-0 flex-col border-r border-surface-border/80 bg-surface-raised/30 backdrop-blur-sm"
    >
      {/* Section header */}
      <SectionHeader cfg={cfg} section={section} />

      {/* Groups */}
      <nav className="flex-1 overflow-y-auto py-4 animate-slide-in-left">
        {filterGroups.length === 0 && (
          <div className="px-5 py-6 text-center">
            <p className="text-[15px] text-ink-200">Nada encontrado</p>
            <p className="text-[14px] text-ink-300">Tente outro termo.</p>
          </div>
        )}

        {filterGroups.map((group, gi) => {
          const groupCount = group.subgroups
            ? group.subgroups.reduce((n, sg) => n + sg.items.length, 0)
            : group.items.length
          const isOpen = groupsExpanded[group.title] ?? false
          return (
            <div key={group.title} className={cn('pb-3', gi < filterGroups.length - 1 && 'mb-2 border-b border-surface-border/60')}>
              <button
                type="button"
                onClick={() => toggleGroup(group.title)}
                aria-expanded={isOpen}
                className={cn(
                  'group/g flex w-full items-center gap-2 px-5 pt-2 pb-2.5',
                  'text-[11px] font-semibold uppercase tracking-[0.14em]',
                  'text-ink-400 transition-colors duration-150 hover:text-ink-200',
                )}
              >
                <DSIcon
                  name="direction-right"
                  size={11}
                  className={cn(
                    'shrink-0 text-ink-500 transition-transform duration-200 ease-out',
                    isOpen && 'rotate-90 text-ink-300',
                  )}
                />
                <span className="flex-1 text-left">{group.title}</span>
                <span className="rounded-md bg-surface-elevated/60 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-ink-400 tracking-normal normal-case">
                  {groupCount}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="group-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 0.9, 0.28, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-1 pb-1">
                      {group.subgroups && group.subgroups.length > 0 ? (
                        <div className="flex flex-col gap-3">
                          {group.subgroups.map((sg, si) => (
                            <div key={sg.title} className={cn(si === 0 ? 'mt-0' : 'mt-1')}>
                              <p className="px-5 pb-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-500/80">
                                {sg.title}
                              </p>
                              <ul className="flex flex-col gap-1.5">
                                {sg.items.map((it, i) => renderItem(it, i, 0))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="flex flex-col gap-1.5">
                          {group.items.map((it, i) => renderItem(it, i, 0))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-surface-border p-4">
        <a
          href={PROJECT.deployUrl}
          target="_blank"
          rel="noreferrer"
          className="block rounded-lg border border-surface-border/70 bg-surface/50 p-3 transition hover:border-brand-500/30 hover:bg-surface/70"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <p className="text-[12px] font-medium text-ink-200">Deploy live</p>
            <span className="ml-auto rounded-md bg-brand-500/15 px-1.5 py-0.5 font-mono text-[11px] text-brand-300">
              v{PROJECT.version}
            </span>
          </div>
          <p className="mt-1 truncate font-mono text-[11px] leading-relaxed text-ink-400">
            {PROJECT.deployUrl.replace('https://', '')}
          </p>
        </a>
      </div>
    </aside>
  )
}

function SectionHeader({
  cfg,
  section,
}: {
  cfg: SectionConfig
  section: SectionKey
}) {
  const sectionIdx = sectionOrder.indexOf(section) + 1
  const sectionTotal = sectionOrder.length

  const totalItems = cfg.groups.reduce((sum, g) => sum + g.items.length, 0)
  const subgroupCount = cfg.groups.reduce(
    (n, g) => n + (g.subgroups?.length ?? 0),
    0,
  )

  return (
    <div className="relative overflow-hidden border-b border-surface-border/60 animate-slide-in-left">
      {/* Ambient glow canto superior */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-gradient-to-br blur-3xl opacity-30',
          cfg.accent,
        )}
      />
      {/* Linha de divisor em gradiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-surface-border to-transparent"
      />

      <div className="relative px-5 pt-4 pb-5">
        {/* Eyebrow */}
        <div className="mb-3.5 flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-500">
            Seção
          </p>
          <p className="font-mono text-[10px] tabular-nums text-ink-500">
            {String(sectionIdx).padStart(2, '0')} / {String(sectionTotal).padStart(2, '0')}
          </p>
        </div>

        <div className="flex items-start gap-3">
          {/* Icon box com highlight glassy */}
          <div
            className={cn(
              'relative h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br grid place-items-center',
              cfg.accent,
              cfg.ring,
            )}
          >
            <DSIcon name={cfg.icon} size={20} className="relative z-10 text-white" />
            {/* Inner ring */}
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/25" />
            {/* Top highlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-2 top-0.5 h-1/2 rounded-t-lg bg-gradient-to-b from-white/25 to-transparent"
            />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <p className="font-display text-[17px] font-extrabold leading-tight text-ink-50">
              {cfg.label}
            </p>
            <p className="mt-1 text-[12px] leading-[1.45] text-ink-400 line-clamp-2">
              {cfg.description}
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-4 flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1.5 text-ink-400">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={cn(
                  'absolute inline-flex h-full w-full animate-ping rounded-full opacity-60',
                  cfg.marker,
                )}
              />
              <span className={cn('relative inline-flex h-1.5 w-1.5 rounded-full', cfg.marker)} />
            </span>
            <span className="font-mono tabular-nums text-ink-200">
              {String(totalItems).padStart(2, '0')}
            </span>
            <span className="uppercase tracking-[0.14em]">itens</span>
          </span>

          {subgroupCount > 0 && (
            <>
              <span aria-hidden className="h-3 w-px bg-surface-border/70" />
              <span className="flex items-center gap-1.5 text-ink-400">
                <span className="font-mono tabular-nums text-ink-200">
                  {String(subgroupCount).padStart(2, '0')}
                </span>
                <span className="uppercase tracking-[0.14em]">subgrupos</span>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

