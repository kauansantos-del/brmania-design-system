import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/cn'

/**
 * Popover portal-based com animação framer-motion.
 * Inspirado nos cards/hover-cards do Aceternity e Radix.
 * - Evita clipping de `overflow:hidden` em containers ancestrais.
 * - Posiciona com base no rect do trigger, ajustando na mudança de scroll/resize.
 */
type Side = 'top' | 'bottom' | 'left' | 'right' | 'auto'
type ResolvedSide = Exclude<Side, 'auto'>

export function Popover({
  trigger,
  children,
  side = 'auto',
  offset = 14,
  delay = 180,
  closeDelay = 100,
  className,
  triggerClassName,
  maxWidth = 280,
  estimatedHeight = 320,
}: {
  trigger: ReactNode
  children: ReactNode
  side?: Side
  offset?: number
  delay?: number
  closeDelay?: number
  className?: string
  triggerClassName?: string
  maxWidth?: number
  /** Usado só para decisão "auto": estimativa para evitar clipping vertical. */
  estimatedHeight?: number
}) {
  const triggerRef = useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(false)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const openT = useRef<number | null>(null)
  const closeT = useRef<number | null>(null)

  const show = () => {
    if (closeT.current) window.clearTimeout(closeT.current)
    if (openT.current) window.clearTimeout(openT.current)
    openT.current = window.setTimeout(() => {
      if (triggerRef.current) setRect(triggerRef.current.getBoundingClientRect())
      setOpen(true)
    }, delay)
  }
  const hide = () => {
    if (openT.current) window.clearTimeout(openT.current)
    if (closeT.current) window.clearTimeout(closeT.current)
    closeT.current = window.setTimeout(() => setOpen(false), closeDelay)
  }

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return
    const onUpdate = () => {
      if (triggerRef.current) setRect(triggerRef.current.getBoundingClientRect())
    }
    window.addEventListener('scroll', onUpdate, true)
    window.addEventListener('resize', onUpdate)
    return () => {
      window.removeEventListener('scroll', onUpdate, true)
      window.removeEventListener('resize', onUpdate)
    }
  }, [open])

  useEffect(() => () => {
    if (openT.current) window.clearTimeout(openT.current)
    if (closeT.current) window.clearTimeout(closeT.current)
  }, [])

  // Decisão de lado: prioriza lateral (right/left), cai para bottom/top.
  const resolvedSide: ResolvedSide = (() => {
    if (side !== 'auto') return side
    if (!rect) return 'right'
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1920
    const vh = typeof window !== 'undefined' ? window.innerHeight : 1080
    const spaceRight  = vw - rect.right
    const spaceLeft   = rect.left
    const spaceBottom = vh - rect.bottom
    const spaceTop    = rect.top
    const needed = maxWidth + offset + 8

    if (spaceRight >= needed) return 'right'
    if (spaceLeft  >= needed) return 'left'
    if (spaceBottom >= Math.min(estimatedHeight, spaceBottom) && spaceBottom > spaceTop) return 'bottom'
    return 'top'
  })()

  const pos = (() => {
    if (!rect) return { top: 0, left: 0, transformOrigin: 'center center', translate: '-50% -100%' }
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    switch (resolvedSide) {
      case 'top':    return { top: rect.top - offset,    left: cx, transformOrigin: 'center bottom', translate: '-50% -100%' }
      case 'bottom': return { top: rect.bottom + offset, left: cx, transformOrigin: 'center top',    translate: '-50% 0%' }
      case 'left':   return { top: cy, left: rect.left - offset,  transformOrigin: 'right center',   translate: '-100% -50%' }
      case 'right':  return { top: cy, left: rect.right + offset, transformOrigin: 'left center',    translate: '0% -50%' }
    }
  })()

  const initialOffset =
    resolvedSide === 'top' ? 6 : resolvedSide === 'bottom' ? -6 : resolvedSide === 'left' ? 6 : -6
  const axis: 'x' | 'y' = resolvedSide === 'left' || resolvedSide === 'right' ? 'x' : 'y'

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className={cn('relative inline-flex', triggerClassName)}
      >
        {trigger}
      </span>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, [axis]: initialOffset }}
              animate={{ opacity: 1, scale: 1, [axis]: 0 }}
              exit={{ opacity: 0, scale: 0.97, [axis]: initialOffset * 0.5 }}
              transition={{ duration: 0.2, ease: [0.22, 0.9, 0.28, 1] }}
              style={{
                position: 'fixed',
                top: pos.top,
                left: pos.left,
                transform: `translate(${(pos as any).translate ?? '-50% -100%'})`,
                transformOrigin: pos.transformOrigin,
                maxWidth,
                zIndex: 80,
              }}
              // outer wrapper é pointer-events-none para não roubar clique de vizinhos;
              // controles internos reativam pointer-events via classe `pointer-events-auto`.
              className={cn(
                'pointer-events-none rounded-xl border border-surface-border bg-ink-900/95 backdrop-blur-xl shadow-2xl',
                'ring-1 ring-white/5',
                className,
              )}
              role="tooltip"
              aria-hidden="true"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
