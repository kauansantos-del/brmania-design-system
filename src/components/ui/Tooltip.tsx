import { useState, useRef, useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Side = 'top' | 'right' | 'bottom' | 'left'

export function Tooltip({
  children,
  content,
  side = 'top',
  delay = 250,
  className,
  wrapperClassName,
}: {
  children: ReactNode
  content: ReactNode
  side?: Side
  delay?: number
  className?: string
  wrapperClassName?: string
}) {
  const [open, setOpen] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current) }, [])

  const show = () => {
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(true), delay)
  }
  const hide = () => {
    if (timer.current) window.clearTimeout(timer.current)
    setOpen(false)
  }

  const pos: Record<Side, string> = {
    top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left:   'right-full top-1/2 -translate-y-1/2 mr-2',
    right:  'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <span
      className={cn('relative inline-flex', wrapperClassName)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-50 whitespace-nowrap rounded-md border border-surface-border',
            'bg-ink-900/95 backdrop-blur px-2.5 py-1.5 text-xs font-medium text-ink-100 shadow-xl',
            'animate-fade-in',
            pos[side],
            className,
          )}
        >
          {content}
        </span>
      )}
    </span>
  )
}
