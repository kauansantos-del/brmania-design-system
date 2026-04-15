import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Fundo com blobs suaves animados (Aceternity aurora). */
export function AuroraBackground({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('relative isolate overflow-hidden', className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-brand-500/20 blur-3xl animate-aurora-1" />
        <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl animate-aurora-2" />
        <div className="absolute -bottom-40 left-1/3 h-[460px] w-[460px] rounded-full bg-sky-500/10 blur-3xl animate-aurora-3" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_60%)]" />
      </div>
      {children}
    </div>
  )
}
