import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Texto com gradiente animado (Aceternity). Ideal para títulos. */
export function GradientText({
  children,
  className,
  from = '#4ADE80',
  via = '#22C55E',
  to = '#15803D',
}: {
  children: ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
}) {
  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]',
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(90deg, ${from}, ${via}, ${to}, ${via}, ${from})`,
      }}
    >
      {children}
    </span>
  )
}
