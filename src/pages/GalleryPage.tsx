import { useEffect, useMemo, useState, useCallback } from 'react'
import { DSIcon } from '@/components/brmania'
import { PageHeader } from '@/components/layout/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'
import { LazyImage } from '@/components/ui/LazyImage'
import { SpotlightCard } from '@/components/ui/effects/SpotlightCard'
import { gallery, type GalleryItem } from '@/data/gallery'
import { copyImageAsBlob, copyToClipboard, downloadFile } from '@/lib/clipboard'
import { cn } from '@/lib/cn'
import { IconsGalleryPage } from './IconsGalleryPage'

export function GalleryPage({ sub, query }: { sub: string; query: string }) {
  if (sub === 'icones') return <IconsGalleryPage query={query} />
  return <GalleryImagesPage sub={sub} query={query} />
}

function GalleryImagesPage({ sub, query }: { sub: string; query: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const q = query.trim().toLowerCase()
  const filtered = useMemo(() => {
    return gallery.filter((g) => {
      if (sub === 'icones-3d' && g.category !== 'Ícones 3D') return false
      // "todos" doesn't filter by category
      if (!q) return true
      return [g.name, g.category, g.tags.join(' ')].some((t) => t.toLowerCase().includes(q))
    })
  }, [sub, q])

  const open = useCallback((i: number) => setOpenIdx(i), [])
  const close = useCallback(() => setOpenIdx(null), [])

  const title = sub === 'icones-3d' ? 'Ícones 3D' : 'Galeria completa'

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow={sub === 'icones-3d' ? 'Coleção · Ícones 3D' : 'Assets'}
        title={title}
        titleAccent={sub === 'icones-3d' ? 'prontos para embutir.' : 'para copiar e baixar.'}
        description="Miniaturas carregam sob demanda. Clique em qualquer imagem para abrir em alta resolução, copiar para o clipboard ou baixar o arquivo."
        meta={[
          { label: `${filtered.length} de ${gallery.length} itens`, tone: 'neutral' },
          { label: 'Lazy-loaded', tone: 'info' },
          { label: 'PNG transparente', tone: 'success' },
        ]}
      />

      <div className="mx-auto max-w-6xl px-8 py-10">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-surface-border p-12 text-center">
            <DSIcon name="image-01" size={32} className="mx-auto mb-3 text-ink-500" />
            <p className="text-sm text-ink-300">Nenhuma imagem encontrada.</p>
            <p className="text-[12px] text-ink-500">Tente outro termo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={i}
                onOpen={() => open(i)}
              />
            ))}
          </div>
        )}
      </div>

      {openIdx !== null && (
        <GalleryModal
          items={filtered}
          index={openIdx}
          onClose={close}
          onIndexChange={setOpenIdx}
        />
      )}
    </div>
  )
}

function GalleryCard({
  item, index, onOpen,
}: {
  item: GalleryItem
  index: number
  onOpen: () => void
}) {
  return (
    <SpotlightCard
      className="animate-slide-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="block w-full text-left"
        aria-label={`Abrir ${item.name}`}
      >
        <div className="relative bg-checkered">
          <div className="aspect-[4/3] overflow-hidden">
            <LazyImage src={item.src} alt={item.name} className="h-full w-full [&>img]:object-contain [&>img]:p-6 transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="pointer-events-none absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition">
            <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-black/50 backdrop-blur px-2 py-1 text-[11px] font-medium text-white">
              <DSIcon name="maximize-01" size={11} /> Expandir
            </span>
          </div>
        </div>
      </button>

      <div className="px-4 py-3 border-t border-surface-border">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-display text-[14px] font-semibold text-ink-50">{item.name}</p>
            {item.description && (
              <p className="mt-0.5 line-clamp-2 text-[11.5px] leading-relaxed text-ink-400">
                {item.description}
              </p>
            )}
          </div>
          <Badge size="sm" tone="neutral">{item.category}</Badge>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1">
            {item.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-md border border-surface-border bg-surface/60 px-1.5 py-0.5 font-mono text-[10px] text-ink-400"
              >
                <DSIcon name="tag-01" size={9} /> {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Tooltip content="Copiar imagem para o clipboard">
              <button
                onClick={(e) => { e.stopPropagation(); copyImageAsBlob(item.src) }}
                className="rounded-md p-1.5 text-ink-400 hover:bg-surface-elevated hover:text-ink-100 transition"
                aria-label="Copiar imagem"
              >
                <DSIcon name="copy" size={13} />
              </button>
            </Tooltip>
            <Tooltip content="Baixar arquivo">
              <button
                onClick={(e) => { e.stopPropagation(); downloadFile(item.src, item.src.split('/').pop()) }}
                className="rounded-md p-1.5 text-ink-400 hover:bg-surface-elevated hover:text-ink-100 transition"
                aria-label="Baixar imagem"
              >
                <DSIcon name="download-01" size={13} />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </SpotlightCard>
  )
}

function GalleryModal({
  items, index, onClose, onIndexChange,
}: {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onIndexChange: (i: number) => void
}) {
  const item = items[index]

  const prev = useCallback(() => onIndexChange((index - 1 + items.length) % items.length), [index, items.length, onIndexChange])
  const next = useCallback(() => onIndexChange((index + 1) % items.length), [index, items.length, onIndexChange])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [prev, next, onClose])

  if (!item) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-ink-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 border-b border-surface-border/60 bg-surface/40 backdrop-blur px-4 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-semibold text-ink-50">{item.name}</p>
          <p className="truncate text-[11.5px] text-ink-400">
            {item.category} · <span className="font-mono">{item.src}</span> · {index + 1} de {items.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip content="Copiar URL pública">
            <Button size="sm" variant="ghost" leftIcon={<DSIcon name="link" size={14} />} onClick={() => copyToClipboard(window.location.origin + item.src, 'URL copiada')}>
              URL
            </Button>
          </Tooltip>
          <Tooltip content="Copiar imagem para o clipboard">
            <Button size="sm" variant="secondary" leftIcon={<DSIcon name="copy" size={14} />} onClick={() => copyImageAsBlob(item.src)}>
              Copiar
            </Button>
          </Tooltip>
          <Tooltip content="Baixar arquivo">
            <Button size="sm" variant="primary" leftIcon={<DSIcon name="download-01" size={14} />} onClick={() => downloadFile(item.src, item.src.split('/').pop())}>
              Baixar
            </Button>
          </Tooltip>
          <Tooltip content="Fechar (Esc)">
            <Button size="icon" variant="ghost" onClick={onClose} aria-label="Fechar">
              <DSIcon name="multiply-circle" size={16} />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Prev/Next */}
      {items.length > 1 && (
        <>
          <Tooltip content="Anterior (←)" side="right">
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-surface-border bg-surface-raised/80 backdrop-blur text-ink-100 hover:bg-surface-elevated transition flex items-center justify-center"
              aria-label="Imagem anterior"
            >
              <DSIcon name="direction-left" size={22} />
            </button>
          </Tooltip>
          <Tooltip content="Próxima (→)" side="left">
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-surface-border bg-surface-raised/80 backdrop-blur text-ink-100 hover:bg-surface-elevated transition flex items-center justify-center"
              aria-label="Próxima imagem"
            >
              <DSIcon name="direction-right" size={22} />
            </button>
          </Tooltip>
        </>
      )}

      {/* Image area */}
      <div
        className="bg-checkered relative flex items-center justify-center w-full max-w-[1400px] max-h-[calc(100vh-180px)] rounded-xl overflow-hidden border border-surface-border animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={item.src}
          src={item.src}
          alt={item.name}
          className="block max-w-full max-h-[calc(100vh-200px)] object-contain p-10"
        />
      </div>

      {/* Bottom thumbnails */}
      {items.length > 1 && (
        <div
          className="absolute inset-x-0 bottom-0 border-t border-surface-border/60 bg-surface/40 backdrop-blur px-4 py-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto max-w-5xl flex items-center gap-2 overflow-x-auto">
            {items.map((g, i) => (
              <button
                key={g.id}
                onClick={() => onIndexChange(i)}
                className={cn(
                  'shrink-0 h-14 w-14 rounded-md overflow-hidden border-2 bg-checkered transition',
                  i === index ? 'border-brand-500 shadow-glow' : 'border-surface-border opacity-60 hover:opacity-100',
                )}
                aria-label={`Ver ${g.name}`}
              >
                <img src={g.src} alt="" loading="lazy" className="h-full w-full object-contain p-1.5" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
