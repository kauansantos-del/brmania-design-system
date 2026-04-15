import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DSIcon } from '@/components/brmania'
import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/Badge'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { SpotlightCard } from '@/components/ui/effects/SpotlightCard'

export interface ComponentShowcaseProps {
  title: string
  description?: string
  tags?: { label: string; tone?: 'brand' | 'info' | 'neutral' | 'success' | 'warning' }[]
  /** preview é renderizado em superfície clara (o DS nativo do BRMania é light-mode). */
  preview: ReactNode
  code: string
  language?: string
  /** se true, inicia com o código aberto. */
  defaultOpen?: boolean
}

export function ComponentShowcase({
  title, description, tags, preview, code, language = 'tsx', defaultOpen = false,
}: ComponentShowcaseProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [open, setOpen] = useState(defaultOpen)

  return (
    <SpotlightCard className="mb-6 overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-surface-border px-5 py-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-[15px] font-bold text-ink-50">{title}</h3>
            {tags?.map((t) => (
              <Badge key={t.label} size="sm" tone={t.tone ?? 'neutral'}>
                {t.label}
              </Badge>
            ))}
          </div>
          {description && (
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-400">{description}</p>
          )}
        </div>

        {/* Toggle Preview / Code */}
        <div className="inline-flex rounded-lg border border-surface-border bg-surface-raised/70 p-1">
          <button
            type="button"
            onClick={() => setTab('preview')}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium transition',
              tab === 'preview' ? 'bg-surface-elevated text-ink-50' : 'text-ink-400 hover:text-ink-200',
            )}
          >
            <DSIcon name="view" size={12} /> Preview
          </button>
          <button
            type="button"
            onClick={() => { setTab('code'); setOpen(true) }}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium transition',
              tab === 'code' ? 'bg-surface-elevated text-ink-50' : 'text-ink-400 hover:text-ink-200',
            )}
          >
            <DSIcon name="file-01" size={12} /> Código
          </button>
        </div>
      </div>

      {/* Preview panel */}
      {tab === 'preview' && (
        <motion.div
          key="preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="relative overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, #fcfcfc 0%, #f5f5f5 100%)',
            }}
          />
          {/* grid sutil */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative z-10 p-8 flex flex-wrap items-center justify-center gap-4 min-h-[160px]">
            {preview}
          </div>
        </motion.div>
      )}

      {/* Code panel */}
      <AnimatePresence initial={false}>
        {(tab === 'code' || open) && (
          <motion.div
            key="code"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 0.9, 0.28, 1] }}
          >
            <div className="border-t border-surface-border p-4">
              <CodeBlock code={code} language={language} maxHeight={420} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle code visibility quando em preview */}
      {tab === 'preview' && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-center gap-1.5 border-t border-surface-border bg-surface-raised/40 py-2 text-[11.5px] font-medium text-ink-400 hover:text-ink-100 hover:bg-surface-elevated/60"
        >
          <DSIcon name="direction-down" size={12} className={cn('transition-transform', open && 'rotate-180')} />
          {open ? 'Ocultar código' : 'Ver código'}
        </button>
      )}
    </SpotlightCard>
  )
}
