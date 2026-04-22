import { useId, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { DSIcon } from './DSIcon'

/**
 * InfoTooltip · BRMania Design System
 * Figma: nó 96:4771
 *
 * Ícone info 16px disparando tooltip no :hover ou :focus-visible.
 * Fundo gray-4 (#e6e9e7) · texto gray-12 · seta decorativa 11.3px.
 * Posicionamento por CSS puro — sem Popper/portal.
 */

export type TooltipPlacement = 'top' | 'bottom'
export type TooltipAlign = 'start' | 'end'

export interface InfoTooltipProps {
  text: string
  placement?: TooltipPlacement
  align?: TooltipAlign
  children?: ReactNode
  className?: string
  maxWidth?: number
}

const SURFACE =
  'pointer-events-none absolute z-20 whitespace-nowrap rounded ' +
  'bg-[#e6e9e7] px-4 py-3 text-[14px] font-medium leading-[1.3] text-[#1a211c] ' +
  "font-['Inter'] shadow-[0_2px_8px_-3px_rgba(32,32,32,0.25)] " +
  'opacity-0 translate-y-1 transition-[opacity,transform] duration-150 ease-out ' +
  'group-hover:opacity-100 group-hover:translate-y-0 ' +
  'group-focus-within:opacity-100 group-focus-within:translate-y-0'

const ARROW =
  'absolute block h-[11.3px] w-[11.3px] rotate-45 bg-[#e6e9e7]'

export function InfoTooltip({
  text,
  placement = 'top',
  align = 'start',
  children,
  className,
  maxWidth = 420,
}: InfoTooltipProps) {
  const id = useId()

  const surfacePos =
    placement === 'top'
      ? 'bottom-full mb-2'
      : 'top-full mt-2'

  const alignPos =
    align === 'start' ? 'right-[-8px]' : 'left-[-8px]'

  const arrowPos =
    placement === 'top'
      ? cn('bottom-[-5px]', align === 'start' ? 'right-3' : 'left-3')
      : cn('top-[-5px]', align === 'start' ? 'right-3' : 'left-3')

  return (
    <span className={cn('group relative inline-flex', className)}>
      <button
        type="button"
        aria-describedby={id}
        className={
          'inline-flex size-4 shrink-0 items-center justify-center rounded-full ' +
          'text-[#60655f] transition-colors duration-150 ' +
          'hover:text-[#1a211c] focus:outline-none focus-visible:text-[#1a211c] ' +
          'focus-visible:ring-2 focus-visible:ring-[#2a7e40]/30'
        }
      >
        {children ?? <DSIcon name="information" size={16} />}
      </button>
      <span
        id={id}
        role="tooltip"
        style={{ maxWidth }}
        className={cn(SURFACE, surfacePos, alignPos)}
      >
        {text}
        <span aria-hidden className={cn(ARROW, arrowPos)} />
      </span>
    </span>
  )
}
