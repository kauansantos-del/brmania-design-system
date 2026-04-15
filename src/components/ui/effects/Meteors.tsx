import { useMemo } from 'react'
import { cn } from '@/lib/cn'

/** Meteors decorativos (Aceternity). Puros CSS/SVG — sem runtime cost. */
export function Meteors({ number = 20, className }: { number?: number; className?: string }) {
  const meteors = useMemo(
    () =>
      Array.from({ length: number }).map((_, i) => {
        const top = Math.floor(Math.random() * -50) + '%'
        const left = Math.floor(Math.random() * 100) + '%'
        const delay = (Math.random() * 1.5).toFixed(2) + 's'
        const duration = (Math.random() * 8 + 4).toFixed(2) + 's'
        return { id: i, top, left, delay, duration }
      }),
    [number],
  )

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
      aria-hidden
    >
      {meteors.map((m) => (
        <span
          key={m.id}
          className="meteor"
          style={{
            top: m.top,
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  )
}
