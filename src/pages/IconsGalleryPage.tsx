import { useEffect, useMemo, useState, useDeferredValue, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Download, Copy, Check, Sparkles, X, Package, Loader2,
  FileArchive, FileJson, ChevronRight, LayoutGrid,
} from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/layout/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/cn'
import { copyToClipboard } from '@/lib/clipboard'
import {
  downloadAllIconsJson, downloadAllIconsZip,
  type IconStyle, type IconItem, type IconsManifest,
} from '@/lib/iconDownloads'

const STYLE_LABEL: Record<IconStyle, string> = {
  outline: 'Outline',
  solid:   'Sólidos',
  bulk:    'Bulk',
}
const STYLE_DESC: Record<IconStyle, string> = {
  outline: 'Stroke leve · ideal para UI densa',
  solid:   'Preenchidos · alto contraste',
  bulk:    'Duotone com camadas translúcidas',
}

const PAGE_SIZE = 240

export function IconsGalleryPage({ query }: { query: string }) {
  const [manifest, setManifest] = useState<IconsManifest | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [style, setStyle] = useState<IconStyle>('outline')
  const [group, setGroup] = useState<string>('all')
  const [localQuery, setLocalQuery] = useState('')
  const [page, setPage] = useState(1)
  const [active, setActive] = useState<IconItem | null>(null)
  const [downloading, setDownloading] = useState<null | { kind: 'zip' | 'json'; done: number; total: number }>(null)
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false)

  useEffect(() => {
    let alive = true
    fetch('/icons/manifest.json')
      .then((r) => { if (!r.ok) throw new Error(`${r.status}`); return r.json() })
      .then((m: IconsManifest) => { if (alive) setManifest(m) })
      .catch((e) => { if (alive) setErr(String(e)) })
    return () => { alive = false }
  }, [])

  const q = (localQuery || query).trim().toLowerCase()
  const deferredQ = useDeferredValue(q)

  // Aplica filtro (style + group + busca)
  const filtered = useMemo(() => {
    if (!manifest) return [] as IconItem[]
    return manifest.icons.filter((ic) => {
      if (ic.style !== style) return false
      if (group !== 'all' && ic.group !== group) return false
      if (!deferredQ) return true
      return (
        ic.name.toLowerCase().includes(deferredQ) ||
        ic.slug.includes(deferredQ) ||
        ic.tags.some((t) => t.toLowerCase().includes(deferredQ)) ||
        ic.group.toLowerCase().includes(deferredQ)
      )
    })
  }, [manifest, style, group, deferredQ])

  useEffect(() => { setPage(1) }, [style, group, deferredQ])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const countPerStyle = useMemo(() => {
    if (!manifest) return { outline: 0, solid: 0, bulk: 0 } as Record<IconStyle, number>
    const c: Record<IconStyle, number> = { outline: 0, solid: 0, bulk: 0 }
    for (const it of manifest.icons) c[it.style]++
    return c
  }, [manifest])

  const countPerGroup = useMemo(() => {
    if (!manifest) return {} as Record<string, number>
    const c: Record<string, number> = {}
    for (const it of manifest.icons) if (it.style === style) c[it.group] = (c[it.group] || 0) + 1
    return c
  }, [manifest, style])

  // Total que seria baixado no "baixar tudo atual" (respeita estilo selecionado)
  const handleDownload = async (kind: 'zip' | 'json', scope: 'all' | IconStyle) => {
    if (!manifest || downloading) return
    setDownloading({ kind, done: 0, total: scope === 'all' ? manifest.icons.length : countPerStyle[scope] })
    setDownloadMenuOpen(false)
    try {
      const onProgress = (done: number, total: number) =>
        setDownloading((d) => d ? { ...d, done, total } : d)
      if (kind === 'zip') await downloadAllIconsZip(manifest, scope, onProgress)
      else                await downloadAllIconsJson(manifest, scope, onProgress)
      toast.success(`${kind.toUpperCase()} gerado — download iniciado`)
    } catch (e) {
      toast.error('Falha ao gerar o pacote')
    } finally {
      setDownloading(null)
    }
  }

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Galeria · Ícones"
        title="Biblioteca de ícones"
        titleAccent="sólidos, bulk e outline."
        description="4.043 ícones do Huge Icons Pack, organizados por estilo e categoria. Busque por nome ou tag e copie em um clique — ou baixe tudo num ZIP categorizado."
        meta={[
          { label: `${manifest?.icons.length ?? '—'} ícones`, tone: 'neutral' },
          { label: '3 estilos', tone: 'brand' },
          { label: `${manifest?.groups.length ?? '—'} categorias`, tone: 'info' },
        ]}
        actions={
          <DownloadMenu
            open={downloadMenuOpen}
            setOpen={setDownloadMenuOpen}
            busy={!!downloading}
            style={style}
            styleCount={countPerStyle[style]}
            totalCount={manifest?.icons.length ?? 0}
            onPick={handleDownload}
          />
        }
      />

      <div className="mx-auto max-w-[1400px] px-8 py-8">
        {err && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-300">
            Erro ao carregar manifest: {err}
          </div>
        )}

        {!manifest && !err && <ShimmerGrid />}

        {manifest && (
          <>
            {/* Tabs de estilo */}
            <div className="mb-6 grid gap-3 md:grid-cols-3">
              {(['outline', 'solid', 'bulk'] as IconStyle[]).map((s) => {
                const isActive = style === s
                return (
                  <motion.button
                    key={s}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStyle(s)}
                    className={cn(
                      'group relative overflow-hidden rounded-xl border p-4 text-left transition',
                      isActive
                        ? 'border-brand-500/50 bg-brand-500/10 shadow-[0_12px_32px_-18px_rgba(70,167,104,0.6)]'
                        : 'border-surface-border bg-surface-raised/60 hover:bg-surface-elevated',
                    )}
                    aria-pressed={isActive}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="icon-style-underline"
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-brand-500 to-brand-700"
                      />
                    )}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className={cn('font-display text-base font-bold', isActive ? 'text-brand-200' : 'text-ink-100')}>
                          {STYLE_LABEL[s]}
                        </p>
                        <p className="mt-0.5 text-[12px] text-ink-400">{STYLE_DESC[s]}</p>
                      </div>
                      <Badge tone={isActive ? 'brand' : 'neutral'} size="sm">
                        {countPerStyle[s].toLocaleString('pt-BR')}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5">
                      {['briefcase-02', 'user-circle', 'home-01'].map((n) => {
                        const sample = manifest.icons.find((i) => i.style === s && i.slug.startsWith(n))
                        if (!sample) return null
                        return (
                          <div key={n} className="h-7 w-7 rounded-md bg-ink-900/70 p-1 ring-1 ring-white/5">
                            <IconImg item={sample} className="h-full w-full" />
                          </div>
                        )
                      })}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Layout: sidebar de categorias + conteúdo */}
            <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
              {/* Sidebar sticky */}
              <CategorySidebar
                groups={manifest.groups}
                counts={countPerGroup}
                totalStyle={countPerStyle[style]}
                current={group}
                onChange={setGroup}
              />

              {/* Conteúdo */}
              <div className="min-w-0">
                {/* Barra de busca */}
                <div className="sticky top-16 z-20 -mx-1 mb-4 rounded-xl border border-surface-border bg-surface/80 px-3 py-2 backdrop-blur-xl">
                  <label className="group flex h-10 items-center gap-2 rounded-lg bg-surface-raised/60 px-3 transition focus-within:bg-surface-elevated">
                    <Search size={14} className="text-ink-400 group-focus-within:text-ink-200" />
                    <input
                      value={localQuery}
                      onChange={(e) => {
                        const v = e.target.value
                        setLocalQuery(v)
                        // Ao começar a buscar, limpa a categoria pra evitar conflito de filtros
                        if (v.trim() && group !== 'all') setGroup('all')
                      }}
                      placeholder={`Buscar em ${filtered.length.toLocaleString('pt-BR')} ícones…`}
                      className="flex-1 bg-transparent text-[13px] text-ink-100 placeholder:text-ink-400 focus:outline-none"
                    />
                    {localQuery && (
                      <button
                        onClick={() => setLocalQuery('')}
                        className="rounded-md p-1 text-ink-400 hover:bg-surface-elevated hover:text-ink-100"
                        aria-label="Limpar busca"
                      >
                        <X size={12} />
                      </button>
                    )}
                    <kbd className="hidden sm:inline-flex items-center rounded border border-surface-border bg-surface/60 px-1.5 py-0.5 font-mono text-[10px] text-ink-400">
                      {filtered.length}
                    </kbd>
                  </label>

                  {(localQuery || group !== 'all') && (
                    <div className="mt-2 flex items-center gap-2 px-1 text-[11.5px] text-ink-400">
                      <Sparkles size={12} className="text-brand-300" />
                      <span>
                        {filtered.length.toLocaleString('pt-BR')} resultado{filtered.length === 1 ? '' : 's'}
                        {group !== 'all' && <> em <span className="font-semibold text-ink-200">{group}</span></>}
                        {localQuery && <> para <span className="font-semibold text-ink-200">"{localQuery}"</span></>}
                      </span>
                      <button
                        type="button"
                        onClick={() => { setLocalQuery(''); setGroup('all') }}
                        className="ml-2 text-ink-300 underline-offset-2 hover:underline"
                      >
                        limpar filtros
                      </button>
                    </div>
                  )}
                </div>

                {pageItems.length === 0 ? (
                  <EmptyState />
                ) : (
                  <motion.div
                    layout
                    className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 gap-2"
                  >
                    {pageItems.map((it, i) => (
                      <IconTile
                        key={it.id}
                        item={it}
                        index={i}
                        onOpen={() => setActive(it)}
                      />
                    ))}
                  </motion.div>
                )}

                {filtered.length > PAGE_SIZE && (
                  <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-surface-border bg-surface-raised/40 px-4 py-3 text-[12.5px] text-ink-300">
                    <span>
                      Página <b className="text-ink-100">{page}</b> de {totalPages} ·{' '}
                      mostrando <b className="text-ink-100">{pageItems.length}</b> de{' '}
                      {filtered.length.toLocaleString('pt-BR')}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                        className="rounded-md border border-surface-border bg-surface-raised/70 px-3 py-1.5 text-[12px] text-ink-200 disabled:opacity-40 hover:bg-surface-elevated"
                      >
                        Anterior
                      </button>
                      <button
                        type="button"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                        className="rounded-md border border-brand-500/40 bg-brand-500/10 px-3 py-1.5 text-[12px] font-semibold text-brand-300 disabled:opacity-40 hover:bg-brand-500/15"
                      >
                        Próxima
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Progress overlay */}
      <AnimatePresence>
        {downloading && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 right-6 z-50 flex w-80 items-center gap-3 rounded-xl border border-surface-border bg-surface-raised/95 p-4 shadow-2xl backdrop-blur"
          >
            <Loader2 size={18} className="animate-spin text-brand-300" />
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-semibold text-ink-100">
                Gerando {downloading.kind === 'zip' ? 'ZIP' : 'JSON'}…
              </p>
              <p className="text-[11px] text-ink-400">
                {downloading.done.toLocaleString('pt-BR')} de {downloading.total.toLocaleString('pt-BR')} ícones
              </p>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-border">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-500 to-brand-700"
                  initial={{ width: 0 }}
                  animate={{ width: `${(downloading.done / Math.max(1, downloading.total)) * 100}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {active && <IconModal item={active} onClose={() => setActive(null)} />}
    </div>
  )
}

// ---------- Sidebar de categorias ----------
function CategorySidebar({
  groups, counts, totalStyle, current, onChange,
}: {
  groups: string[]
  counts: Record<string, number>
  totalStyle: number
  current: string
  onChange: (g: string) => void
}) {
  const sorted = [...groups].sort((a, b) => (counts[b] ?? 0) - (counts[a] ?? 0))
  return (
    <aside className="lg:sticky lg:top-20 lg:self-start">
      <div className="rounded-xl border border-surface-border bg-surface-raised/40 backdrop-blur">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-surface-border/70">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-500">Categorias</p>
          <span className="rounded-md bg-surface-raised/70 px-1.5 py-0.5 font-mono text-[10px] text-ink-300">
            {groups.length}
          </span>
        </div>

        <ul className="max-h-[calc(100vh-220px)] overflow-y-auto p-1.5">
          <CategoryItem
            label="Todas"
            icon={<LayoutGrid size={13} />}
            count={totalStyle}
            active={current === 'all'}
            onClick={() => onChange('all')}
          />
          <li className="my-1.5 h-px bg-surface-border/60" />
          {sorted.map((g) => (
            <CategoryItem
              key={g}
              label={g}
              count={counts[g] ?? 0}
              active={current === g}
              onClick={() => onChange(g)}
            />
          ))}
        </ul>
      </div>
    </aside>
  )
}

function CategoryItem({
  label, icon, count, active, onClick,
}: {
  label: string
  icon?: React.ReactNode
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'group flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12.5px] transition',
          active
            ? 'bg-brand-500/15 text-brand-200'
            : 'text-ink-300 hover:bg-surface-elevated hover:text-ink-100',
        )}
      >
        {active && (
          <motion.span
            layoutId="icon-category-marker"
            className="h-1.5 w-1.5 rounded-full bg-brand-400"
          />
        )}
        {!active && icon && <span className="text-ink-500 group-hover:text-ink-300">{icon}</span>}
        {!active && !icon && <span className="h-1.5 w-1.5 rounded-full bg-surface-border group-hover:bg-ink-500" />}
        <span className="flex-1 truncate font-medium capitalize">{label}</span>
        <span className={cn(
          'rounded-md px-1.5 py-0.5 font-mono text-[10px] tabular-nums',
          active ? 'bg-brand-500/20 text-brand-300' : 'bg-surface-raised/70 text-ink-500',
        )}>
          {count.toLocaleString('pt-BR')}
        </span>
      </button>
    </li>
  )
}

// ---------- Menu de download ----------
function DownloadMenu({
  open, setOpen, busy, style, styleCount, totalCount, onPick,
}: {
  open: boolean
  setOpen: (v: boolean) => void
  busy: boolean
  style: IconStyle
  styleCount: number
  totalCount: number
  onPick: (kind: 'zip' | 'json', scope: 'all' | IconStyle) => void
}) {
  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(!open)}
        disabled={busy}
        className={cn(
          'inline-flex h-10 items-center gap-2 rounded-lg bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-4 text-[13px] font-bold text-white shadow-[0_12px_32px_-14px_rgba(70,167,104,.7)] transition hover:brightness-110',
          busy && 'opacity-70',
        )}
      >
        {busy ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
        Baixar ícones
        <ChevronRight size={14} className={cn('transition', open && 'rotate-90')} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 0.9, 0.28, 1] }}
              className="absolute right-0 top-full z-50 mt-2 w-[340px] overflow-hidden rounded-xl border border-surface-border bg-surface-raised/95 shadow-2xl backdrop-blur-xl"
            >
              <div className="border-b border-surface-border px-4 py-3">
                <p className="font-display text-sm font-bold text-ink-50">Central de download</p>
                <p className="text-[11.5px] text-ink-400">Tudo categorizado e pronto para consumir.</p>
              </div>

              <div className="p-2">
                <p className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-ink-500">
                  Bundle completo ({totalCount.toLocaleString('pt-BR')})
                </p>
                <DownloadRow
                  icon={<FileArchive size={14} />}
                  title="ZIP categorizado"
                  subtitle={`/<estilo>/<categoria>/<slug>.svg + manifest.json`}
                  highlight
                  onClick={() => onPick('zip', 'all')}
                />
                <DownloadRow
                  icon={<FileJson size={14} />}
                  title="JSON inline"
                  subtitle="Todos SVGs inline, agrupados por estilo e categoria"
                  onClick={() => onPick('json', 'all')}
                />

                <p className="px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-ink-500">
                  Só estilo atual — {STYLE_LABEL[style]} ({styleCount.toLocaleString('pt-BR')})
                </p>
                <DownloadRow
                  icon={<FileArchive size={14} />}
                  title={`ZIP · ${STYLE_LABEL[style]}`}
                  subtitle={`/<categoria>/<slug>.svg`}
                  onClick={() => onPick('zip', style)}
                />
                <DownloadRow
                  icon={<FileJson size={14} />}
                  title={`JSON · ${STYLE_LABEL[style]}`}
                  subtitle="SVGs inline do estilo selecionado"
                  onClick={() => onPick('json', style)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function DownloadRow({
  icon, title, subtitle, highlight, onClick,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  highlight?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition',
        highlight ? 'bg-brand-500/10 hover:bg-brand-500/15' : 'hover:bg-surface-elevated',
      )}
    >
      <span className={cn(
        'mt-0.5 grid h-7 w-7 place-items-center rounded-md ring-1',
        highlight ? 'bg-brand-500/20 text-brand-200 ring-brand-500/30' : 'bg-surface-raised/80 text-ink-200 ring-surface-border',
      )}>
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className={cn('text-[12.5px] font-semibold', highlight ? 'text-brand-200' : 'text-ink-100')}>
          {title}
        </p>
        <p className="font-mono text-[10.5px] text-ink-500 truncate">{subtitle}</p>
      </div>
      <Download size={12} className="mt-1 text-ink-500 group-hover:text-ink-200" />
    </button>
  )
}

// ---------- Tile + Modal (reaproveitados) ----------
function IconTile({ item, index, onOpen }: { item: IconItem; index: number; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.min(index * 0.003, 0.25), duration: 0.22, ease: [0.22, 0.9, 0.28, 1] }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="group/tile relative aspect-square rounded-lg border border-surface-border bg-surface-raised/60 p-2 transition hover:border-brand-500/40 hover:bg-surface-elevated"
      title={item.name}
      aria-label={item.name}
    >
      <IconImg item={item} className="h-full w-full transition-transform duration-300 group-hover/tile:scale-110" />
      <span className="pointer-events-none absolute inset-x-1 bottom-1 truncate rounded-sm bg-black/60 px-1 py-0.5 text-center font-mono text-[9px] text-ink-100 opacity-0 backdrop-blur transition group-hover/tile:opacity-100">
        {item.slug}
      </span>
    </motion.button>
  )
}

function IconImg({ item, className }: { item: IconItem; className?: string }) {
  const src = `/icons/${item.style}/${item.file}`
  return (
    <img
      src={src}
      alt={item.name}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn(
        'block h-full w-full select-none object-contain',
        '[filter:invert(0.92)_brightness(1.35)_saturate(0)]',
        className,
      )}
    />
  )
}

function IconModal({ item, onClose }: { item: IconItem; onClose: () => void }) {
  const [svg, setSvg] = useState<string | null>(null)
  const [copied, setCopied] = useState<'svg' | 'jsx' | null>(null)

  useEffect(() => {
    let alive = true
    fetch(`/icons/${item.style}/${item.file}`)
      .then((r) => r.text())
      .then((t) => { if (alive) setSvg(t) })
    return () => { alive = false }
  }, [item])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const download = useCallback(() => {
    if (!svg) return
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${item.slug}-${item.style}.svg`
    document.body.appendChild(a); a.click(); a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 500)
    toast.success('SVG baixado')
  }, [svg, item])

  const copySvg = useCallback(async () => {
    if (!svg) return
    const ok = await copyToClipboard(svg, 'SVG copiado')
    if (ok) { setCopied('svg'); setTimeout(() => setCopied(null), 1500) }
  }, [svg])

  const copyJsx = useCallback(async () => {
    if (!svg) return
    const jsx = svg
      .replace(/class=/g, 'className=')
      .replace(/fill-rule=/g, 'fillRule=')
      .replace(/clip-rule=/g, 'clipRule=')
      .replace(/stroke-width=/g, 'strokeWidth=')
      .replace(/stroke-linecap=/g, 'strokeLinecap=')
      .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
      .replace(/#28303F/gi, 'currentColor')
    const ok = await copyToClipboard(jsx, 'JSX copiado')
    if (ok) { setCopied('jsx'); setTimeout(() => setCopied(null), 1500) }
  }, [svg])

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 0.9, 0.28, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-surface-border bg-surface shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-surface-border px-5 py-3">
          <div className="min-w-0">
            <p className="truncate font-display text-[14px] font-semibold text-ink-50">{item.name}</p>
            <p className="truncate text-[11.5px] text-ink-400">
              {STYLE_LABEL[item.style]} · {item.group} · <span className="font-mono">{item.file}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-ink-400 hover:bg-surface-elevated hover:text-ink-100"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid gap-0 md:grid-cols-[1fr_1fr]">
          <div className="relative flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(70,167,104,0.12),transparent_60%)] p-8">
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="relative flex h-40 w-40 items-center justify-center rounded-2xl border border-surface-border bg-surface-raised/70 shadow-xl">
              <IconImg item={item} className="h-20 w-20" />
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-surface-border p-5 md:border-l md:border-t-0">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">Slug</p>
              <code className="font-mono text-[12.5px] text-ink-100">{item.slug}</code>
            </div>
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">Tags</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {item.tags.length > 0 ? item.tags.map((t) => (
                  <span key={t} className="rounded-md border border-surface-border bg-surface-raised/70 px-1.5 py-0.5 font-mono text-[10.5px] text-ink-300">
                    {t}
                  </span>
                )) : <span className="text-[11.5px] text-ink-500">—</span>}
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={download}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-3 text-[12.5px] font-bold text-white shadow-[0_10px_28px_-12px_rgba(70,167,104,.7)] transition hover:brightness-110"
              >
                <Download size={13} /> Baixar SVG
              </motion.button>
              <button
                onClick={copySvg}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-surface-border bg-surface-raised/70 px-3 text-[12px] text-ink-200 hover:bg-surface-elevated"
              >
                {copied === 'svg' ? <Check size={13} className="text-brand-300" /> : <Copy size={13} />}
                Copiar SVG
              </button>
              <button
                onClick={copyJsx}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-surface-border bg-surface-raised/70 px-3 text-[12px] text-ink-200 hover:bg-surface-elevated"
              >
                {copied === 'jsx' ? <Check size={13} className="text-brand-300" /> : <Copy size={13} />}
                Copiar JSX
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function ShimmerGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 gap-2">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-lg border border-surface-border bg-[linear-gradient(110deg,#121218_0%,#1A1A22_50%,#121218_100%)] bg-[length:200%_100%] animate-shimmer"
        />
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-surface-border p-12 text-center">
      <Package size={28} className="mx-auto mb-3 text-ink-500" />
      <p className="text-sm text-ink-300">Nenhum ícone encontrado.</p>
      <p className="text-[12px] text-ink-500">Tente outro termo ou limpe os filtros.</p>
    </div>
  )
}
