import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search, Command as CmdIcon, CornerDownLeft, ArrowUp, ArrowDown,
  Blocks, BookOpen, Images, Palette, Type, Ruler, Shapes, Package,
  Sparkles, Hash, ExternalLink, Github, Figma,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { sections, type SectionKey } from '@/data/navigation'
import { PROJECT } from '@/data/project'
import { TYPOGRAPHY_TOKENS, SPACING_TOKENS } from '@/lib/downloads'

// ---------- Tipos ----------
export type PaletteResult = {
  id: string
  title: string
  subtitle?: string
  section: SectionKey | 'external' | 'token'
  sub?: string
  icon: LucideIcon
  category: string
  keywords: string
  kind: 'navigate' | 'external' | 'token'
  href?: string
  hex?: string // pro preview de cor
}

type NavigateHandler = (section: SectionKey, sub?: string) => void

// ---------- Index estático (nav + tokens) ----------
function buildStaticIndex(): PaletteResult[] {
  const out: PaletteResult[] = []

  // Seções + subseções
  const secIcons: Record<SectionKey, LucideIcon> = {
    componentes: Blocks,
    documentacao: BookOpen,
    galeria: Images,
  }

  for (const [key, cfg] of Object.entries(sections)) {
    const sk = key as SectionKey
    out.push({
      id: `nav:${key}`,
      title: cfg.label,
      subtitle: cfg.description,
      section: sk,
      icon: secIcons[sk],
      category: 'Seções',
      kind: 'navigate',
      keywords: `${cfg.label} ${cfg.description} ${cfg.shortLabel}`,
    })

    for (const group of cfg.groups) {
      for (const item of group.items) {
        // Download actions viram externos ou handoff
        if ((item as any).download) continue
        if (item.href) {
          out.push({
            id: `ext:${key}:${item.key}`,
            title: item.label,
            subtitle: item.description,
            section: 'external',
            icon: item.icon as LucideIcon,
            category: `${cfg.label} · ${group.title}`,
            kind: 'external',
            href: item.href,
            keywords: `${item.label} ${item.description ?? ''} ${group.title}`,
          })
          continue
        }
        out.push({
          id: `nav:${key}:${item.key}`,
          title: item.label,
          subtitle: item.description ?? cfg.label,
          section: sk,
          sub: item.key,
          icon: item.icon as LucideIcon,
          category: `${cfg.label} · ${group.title}`,
          kind: 'navigate',
          keywords: `${item.label} ${item.description ?? ''} ${group.title} ${cfg.label}`,
        })
      }
    }
  }

  // Tipografia — cada estilo da escala
  for (const t of TYPOGRAPHY_TOKENS.scale) {
    out.push({
      id: `type:${t.name}`,
      title: t.name,
      subtitle: `${t.font} · ${t.size}px · ${t.weight}`,
      section: 'documentacao',
      sub: 'tipografia',
      icon: Type,
      category: 'Tipografia',
      kind: 'navigate',
      keywords: `${t.name} ${t.font} ${t.size} ${t.weight} tipografia`,
    })
  }

  // Espaçamento
  for (const s of SPACING_TOKENS.scale) {
    out.push({
      id: `space:${s.name}`,
      title: `space-${s.name}`,
      subtitle: `${s.px}px · ${s.rem}rem`,
      section: 'documentacao',
      sub: 'espacamento',
      icon: Ruler,
      category: 'Espaçamento',
      kind: 'navigate',
      keywords: `space-${s.name} ${s.px}px ${s.rem}rem espacamento padding gap`,
    })
  }

  // Atalhos externos úteis
  out.push(
    {
      id: 'ext:github',
      title: 'Abrir no GitHub',
      subtitle: 'kauansantos-del/brmania-design-system',
      section: 'external',
      icon: Github,
      category: 'Recursos',
      kind: 'external',
      href: PROJECT.githubUrl,
      keywords: 'github repo repositório código source',
    },
    {
      id: 'ext:figma',
      title: 'Abrir no Figma',
      subtitle: 'API externa · Vibra',
      section: 'external',
      icon: Figma,
      category: 'Recursos',
      kind: 'external',
      href: PROJECT.figmaUrl,
      keywords: 'figma design arquivo fonte',
    },
    {
      id: 'ext:release',
      title: `Release v${PROJECT.version}`,
      subtitle: 'Changelog no GitHub',
      section: 'external',
      icon: Sparkles,
      category: 'Recursos',
      kind: 'external',
      href: `${PROJECT.githubUrl}/releases/tag/v${PROJECT.version}`,
      keywords: `release versao version changelog v${PROJECT.version}`,
    },
  )

  return out
}

// ---------- Carregamento dos tokens de cor + ícones ----------
type DynamicIndex = {
  colors: PaletteResult[]
  icons: PaletteResult[]
}

async function loadDynamicIndex(): Promise<DynamicIndex> {
  const dyn: DynamicIndex = { colors: [], icons: [] }

  // Cores (tema dark)
  try {
    const res = await fetch('/tokens/Dark.tokens.json')
    if (res.ok) {
      const json = await res.json()
      for (const [groupName, groupNode] of Object.entries<any>(json)) {
        for (const [scaleName, scaleNode] of Object.entries<any>(groupNode)) {
          for (const [stepName, stepNode] of Object.entries<any>(scaleNode)) {
            if (stepName.startsWith('$')) continue
            const hex = stepNode?.$value?.hex
            if (!hex) continue
            const hexUp = String(hex).toUpperCase().startsWith('#') ? String(hex).toUpperCase() : `#${String(hex).toUpperCase()}`
            dyn.colors.push({
              id: `color:${groupName}:${scaleName}:${stepName}`,
              title: `${scaleName} · step ${stepName}`,
              subtitle: `${groupName} · ${hexUp}`,
              section: 'documentacao',
              sub: 'cores',
              icon: Palette,
              category: 'Cores',
              kind: 'navigate',
              keywords: `${groupName} ${scaleName} ${stepName} ${hexUp} cor color radix`,
              hex: hexUp,
            })
          }
        }
      }
    }
  } catch {}

  // Ícones (manifest)
  try {
    const res = await fetch('/icons/manifest.json')
    if (res.ok) {
      const m = await res.json()
      for (const it of m.icons as any[]) {
        dyn.icons.push({
          id: `icon:${it.id}`,
          title: it.name,
          subtitle: `${it.style} · ${it.group}`,
          section: 'galeria',
          sub: 'icones',
          icon: Shapes,
          category: 'Ícones',
          kind: 'navigate',
          keywords: `${it.name} ${it.slug} ${it.style} ${it.group} ${(it.tags || []).join(' ')}`,
        })
      }
    }
  } catch {}

  return dyn
}

// ---------- Scoring e filtro ----------
function scoreResult(r: PaletteResult, q: string): number {
  if (!q) return 0
  const title = r.title.toLowerCase()
  const kw = r.keywords.toLowerCase()
  if (title === q) return 1000
  if (title.startsWith(q)) return 500
  if (title.includes(q)) return 300
  if (kw.includes(q)) return 100
  // match token fuzzy simples (todos os tokens aparecem?)
  const tokens = q.split(/\s+/).filter(Boolean)
  if (tokens.length > 0 && tokens.every((t) => kw.includes(t))) return 50
  return 0
}

// ---------- Componente ----------
export function CommandPalette({
  open, onClose, initialQuery, onNavigate,
}: {
  open: boolean
  onClose: () => void
  initialQuery?: string
  onNavigate: NavigateHandler
}) {
  const [query, setQuery] = useState(initialQuery ?? '')
  const [dyn, setDyn] = useState<DynamicIndex>({ colors: [], icons: [] })
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState(0)
  const staticIdx = useMemo(() => buildStaticIndex(), [])

  // Carregamento lazy do índice dinâmico
  useEffect(() => {
    let alive = true
    loadDynamicIndex().then((d) => { if (alive) setDyn(d) })
    return () => { alive = false }
  }, [])

  // Sincroniza query quando o modal abre
  useEffect(() => {
    if (open) {
      setQuery(initialQuery ?? '')
      setSelected(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open, initialQuery])

  // Lock de scroll
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  // Filtragem + ordenação (memo)
  const { groups, flat } = useMemo(() => {
    const q = query.trim().toLowerCase()

    // Sem query: mostra seções principais + recursos (atalhos rápidos)
    if (!q) {
      const quick = staticIdx.filter((r) => r.id.startsWith('nav:') && !r.id.includes(':', 4))
      const shortcuts = staticIdx.filter((r) => r.category === 'Recursos')
      const subs = staticIdx.filter((r) => r.id.startsWith('nav:') && r.sub)
      const groupOrder: [string, PaletteResult[]][] = [
        ['Seções',   quick],
        ['Navegar',  subs],
        ['Recursos', shortcuts],
      ]
      const flat = groupOrder.flatMap(([, arr]) => arr)
      return { groups: groupOrder, flat }
    }

    const all = [...staticIdx, ...dyn.colors, ...dyn.icons]
    const scored = all
      .map((r) => ({ r, s: scoreResult(r, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)

    const byCat = new Map<string, PaletteResult[]>()
    const MAX_PER_CAT = 8
    for (const { r } of scored) {
      const arr = byCat.get(r.category) ?? []
      if (arr.length >= MAX_PER_CAT) continue
      arr.push(r)
      byCat.set(r.category, arr)
    }

    // Ordem preferencial das categorias
    const preferred = ['Seções', 'Recursos', 'Cores', 'Tipografia', 'Espaçamento', 'Ícones']
    const entries = Array.from(byCat.entries()).sort(([a], [b]) => {
      const ia = preferred.indexOf(a); const ib = preferred.indexOf(b)
      if (ia === -1 && ib === -1) return a.localeCompare(b)
      if (ia === -1) return 1
      if (ib === -1) return -1
      return ia - ib
    })
    const flat = entries.flatMap(([, arr]) => arr)
    return { groups: entries, flat }
  }, [query, staticIdx, dyn])

  // Teclado
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((i) => Math.min(flat.length - 1, i + 1)) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((i) => Math.max(0, i - 1)) }
      else if (e.key === 'Enter') {
        e.preventDefault()
        const r = flat[selected]
        if (r) pick(r)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, flat, selected])

  // Reset selected quando muda query
  useEffect(() => { setSelected(0) }, [query])

  // Scroll do item selecionado
  useEffect(() => {
    if (!open || !listRef.current) return
    const el = listRef.current.querySelector<HTMLElement>(`[data-idx="${selected}"]`)
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [selected, open])

  const pick = (r: PaletteResult) => {
    if (r.kind === 'external' && r.href) {
      window.open(r.href, '_blank', 'noopener,noreferrer')
      onClose()
      return
    }
    if (r.kind === 'navigate' && (r.section === 'componentes' || r.section === 'documentacao' || r.section === 'galeria')) {
      onNavigate(r.section, r.sub)
      onClose()
      return
    }
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[12vh] bg-ink-950/70 backdrop-blur-md"
          onClick={onClose}
          aria-hidden
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Busca global"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 0.9, 0.28, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[640px] overflow-hidden rounded-2xl border border-surface-border bg-ink-900/95 shadow-2xl backdrop-blur-xl ring-1 ring-white/5"
          >
            {/* Input */}
            <div className="relative flex items-center gap-3 border-b border-surface-border/80 px-4">
              <Search size={16} className="text-ink-300" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar no design system — componentes, tokens, ícones, docs…"
                className="h-14 flex-1 bg-transparent text-[14px] text-ink-50 placeholder:text-ink-500 focus:outline-none"
                aria-label="Busca"
              />
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-surface-border/70 bg-surface-raised/80 px-2 py-0.5 font-mono text-[10px] text-ink-400 hover:text-ink-200"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[55vh] overflow-y-auto p-2">
              {flat.length === 0 ? (
                <EmptyState query={query} />
              ) : (
                groups.map(([cat, items]) => (
                  <div key={cat} className="mb-2">
                    <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-500">
                      {cat}
                    </p>
                    <ul>
                      {items.map((r) => {
                        const idx = flat.indexOf(r)
                        const active = idx === selected
                        return (
                          <li key={r.id}>
                            <button
                              type="button"
                              data-idx={idx}
                              onMouseEnter={() => setSelected(idx)}
                              onClick={() => pick(r)}
                              className={cn(
                                'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition',
                                active ? 'bg-brand-500/12 ring-1 ring-brand-500/20' : 'hover:bg-surface-elevated/70',
                              )}
                            >
                              <ResultGlyph r={r} active={active} />
                              <div className="min-w-0 flex-1">
                                <p className={cn(
                                  'truncate text-[13px] font-medium',
                                  active ? 'text-brand-100' : 'text-ink-100',
                                )}>
                                  {r.title}
                                </p>
                                {r.subtitle && (
                                  <p className="truncate text-[11.5px] text-ink-400">{r.subtitle}</p>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                {r.kind === 'external' && <ExternalLink size={12} className="text-ink-500" />}
                                {active && (
                                  <span className="inline-flex items-center gap-1 rounded-md border border-brand-500/30 bg-brand-500/10 px-1.5 py-0.5 font-mono text-[10px] text-brand-300">
                                    <CornerDownLeft size={10} /> Enter
                                  </span>
                                )}
                              </div>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>

            {/* Footer / legend */}
            <div className="flex items-center justify-between gap-3 border-t border-surface-border/80 px-4 py-2 text-[11px] text-ink-400">
              <div className="flex items-center gap-3">
                <Legend icon={<ArrowUp size={10} />} label="navegar" />
                <Legend icon={<ArrowDown size={10} />} label="navegar" />
                <Legend icon={<CornerDownLeft size={10} />} label="abrir" />
              </div>
              <div className="flex items-center gap-1.5 text-ink-500">
                <CmdIcon size={11} /> <span>K para abrir de qualquer lugar</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function ResultGlyph({ r, active }: { r: PaletteResult; active: boolean }) {
  if (r.hex) {
    return (
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-md ring-1 ring-white/10"
        style={{ background: r.hex }}
        aria-hidden
      >
        <Hash size={12} className="text-white/60" />
      </span>
    )
  }
  const Icon = r.icon
  return (
    <span className={cn(
      'grid h-9 w-9 shrink-0 place-items-center rounded-md ring-1',
      active ? 'bg-brand-500/15 text-brand-200 ring-brand-500/30' : 'bg-surface-raised/70 text-ink-300 ring-surface-border',
    )}>
      <Icon size={14} />
    </span>
  )
}

function Legend({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <kbd className="inline-flex h-4 min-w-[1rem] items-center justify-center rounded border border-surface-border bg-surface/60 px-1 font-mono text-[10px] text-ink-300">
        {icon}
      </kbd>
      <span className="text-ink-500">{label}</span>
    </span>
  )
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="px-4 py-10 text-center">
      <div className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface-raised/70 ring-1 ring-surface-border">
        <Package size={18} className="text-ink-400" />
      </div>
      <p className="text-[13px] font-semibold text-ink-100">Nada encontrado</p>
      <p className="mt-1 text-[12px] text-ink-400">
        Não achamos nada para <span className="font-mono text-ink-200">"{query}"</span>. Tente buscar por tokens, ícones, componentes ou "handoff".
      </p>
    </div>
  )
}

