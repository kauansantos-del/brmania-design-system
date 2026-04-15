import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Card({
  className,
  children,
  interactive,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { interactive?: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-surface-border bg-surface-raised shadow-card',
        interactive && 'transition hover:border-ink-600 hover:-translate-y-0.5',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('px-5 pt-5 pb-3', className)}>{children}</div>
}
export function CardBody({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('px-5 pb-5', className)}>{children}</div>
}
export function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <h3 className={cn('font-display text-base font-semibold text-ink-100', className)}>{children}</h3>
}
export function CardDescription({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn('text-sm text-ink-300', className)}>{children}</p>
}
