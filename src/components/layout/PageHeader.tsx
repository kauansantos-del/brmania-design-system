import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/Badge'
import { GradientText } from '@/components/ui/effects/GradientText'
import { AuroraBackground } from '@/components/ui/effects/AuroraBackground'
import { cn } from '@/lib/cn'

export function PageHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  actions,
  meta,
  aurora = true,
  className,
}: {
  eyebrow?: string
  title: string
  titleAccent?: string
  description?: string
  actions?: ReactNode
  meta?: { label: string; tone?: 'brand' | 'info' | 'success' | 'neutral' | 'warning' }[]
  aurora?: boolean
  className?: string
}) {
  const content = (
    <div className={cn('relative border-b border-surface-border', className)}>
      <div className="mx-auto max-w-6xl px-8 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0 animate-slide-up">
            {eyebrow && (
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-raised/70 backdrop-blur px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-brand-300">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-50 sm:text-5xl">
              {title}
              {titleAccent && (
                <>
                  <br className="hidden sm:inline" />{' '}
                  <GradientText>{titleAccent}</GradientText>
                </>
              )}
            </h1>
            {description && (
              <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-ink-300">
                {description}
              </p>
            )}
            {meta && meta.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {meta.map((m, i) => (
                  <Badge key={i} tone={m.tone ?? 'neutral'} dot>
                    {m.label}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap items-center gap-2 animate-fade-in">{actions}</div>}
        </div>
      </div>
    </div>
  )

  return aurora ? <AuroraBackground>{content}</AuroraBackground> : content
}
