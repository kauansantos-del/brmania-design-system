import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Wrapper com borda cônica animada girando ao redor do conteúdo.
 * Inspirado em Aceternity "moving border".
 */
export function AnimatedBorder({
  children,
  className,
  radius = 14,
  duration = 6,
}: {
  children: ReactNode
  className?: string
  radius?: number
  duration?: number
}) {
  return (
    <div
      className={cn('relative p-[1px] overflow-hidden', className)}
      style={{ borderRadius: radius }}
    >
      <span
        className="absolute inset-[-60%] animate-spin-slow"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0 65%, #FFA933 70%, #FF5E00 80%, transparent 90% 100%)',
          animationDuration: `${duration}s`,
        }}
      />
      <div
        className="relative bg-surface-raised"
        style={{ borderRadius: radius - 1 }}
      >
        {children}
      </div>
    </div>
  )
}
