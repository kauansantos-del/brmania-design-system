import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'

const tones: Record<Tone, string> = {
  neutral: 'bg-ink-800 text-ink-200 border-ink-700',
  brand:   'bg-brand-500/10 text-brand-400 border-brand-500/30',
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  danger:  'bg-rose-500/10 text-rose-400 border-rose-500/30',
  info:    'bg-sky-500/10 text-sky-400 border-sky-500/30',
}

export function Badge({
  children,
  tone = 'neutral',
  size = 'sm',
  className,
  dot,
}: {
  children: ReactNode
  tone?: Tone
  size?: 'sm' | 'md'
  className?: string
  dot?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium tracking-tight',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        tones[tone],
        className,
      )}
    >
      {dot && <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
