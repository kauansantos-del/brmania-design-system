import { useRef, useState, type ReactNode, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/**
 * Card com spotlight radial que segue o cursor (inspirado em Aceternity).
 * Tem também uma borda gradiente que acende no hover.
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(70,167,104,0.22)',
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  spotlightColor?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -200, y: -200 })
  const [active, setActive] = useState(false)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  return (
    <div
      ref={ref}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={onMove}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-surface-border bg-surface-raised',
        'transition-[border-color,transform] duration-300',
        active && 'border-ink-600',
        className,
      )}
      {...rest}
    >
      {/* spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* animated gradient border (mask trick) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(250px circle at ${pos.x}px ${pos.y}px, rgba(70,167,104,0.55), transparent 40%)`,
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
