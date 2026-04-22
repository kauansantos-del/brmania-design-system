import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DSIcon } from '@/components/brmania'
import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/Badge'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { SpotlightCard } from '@/components/ui/effects/SpotlightCard'

const TRANSITION = { duration: 0.2, ease: [0.22, 0.9, 0.28, 1] }

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
  const [showCode, setShowCode] = useState(defaultOpen)

  return (
    <SpotlightCard className="mb-6 overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border px-5 py-3.5">
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
            <p className="mt-1 text-[13px] leading-relaxed text-ink-300">{description}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowCode((v) => !v)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition-colors duration-200',
            showCode
              ? 'border-brand-500/30 bg-brand-500/10 text-brand-200'
              : 'border-surface-border bg-surface-raised/70 text-ink-300 hover:text-ink-200',
          )}
        >
          <DSIcon name="file-01" size={14} /> Código
        </button>
      </div>

      {/* Preview — fundo branco puro com padrão de pontos */}
      <div className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-white" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, #c8c8c8 0.75px, transparent 0.75px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10 p-10 flex flex-wrap items-center justify-center gap-4 min-h-[180px]">
          {preview}
        </div>
      </div>

      {/* Code panel — colapsável */}
      <AnimatePresence initial={false}>
        {showCode && (
          <motion.div
            key="code"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={TRANSITION}
            className="overflow-hidden"
          >
            <div className="border-t border-surface-border p-4">
              <CodeBlock code={code} language={language} maxHeight={420} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SpotlightCard>
  )
}
