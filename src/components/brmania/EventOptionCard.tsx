import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/**
 * EventOptionCard · BRMania Design System
 * Figma: nó 111:129416
 *
 * Card selecionável (pattern "checkbox em forma de card") para escolher
 * eventos de webhook, permissões ou qualquer opção booleana grande.
 *
 * Estados:
 *   default  → fundo branco, borda gray-6
 *   hover    → fundo principal-2, borda principal-7
 *   selected → fundo principal-3, borda principal-8, checkbox preenchido
 */

export interface EventOptionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  description: string
  selected?: boolean
}

const SHELL =
  'group flex w-full items-start gap-3 rounded-lg border p-3 ' +
  "font-['Inter'] text-left transition-[background,border-color] duration-200 ease-out " +
  'cursor-pointer select-none ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7e40]/40 ' +
  'disabled:pointer-events-none disabled:opacity-50'

const SHELL_IDLE = 'bg-white border-[#d7dad8] hover:bg-[#f5fbf5] hover:border-[#94ce9a]'
const SHELL_ON = 'bg-[#e9f6e9] border-[#65ba74]'

export const EventOptionCard = forwardRef<HTMLButtonElement, EventOptionCardProps>(
  function EventOptionCard({ title, description, selected = false, className, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={selected}
        className={cn(SHELL, selected ? SHELL_ON : SHELL_IDLE, className)}
        {...rest}
      >
        {/* Checkbox */}
        <span
          aria-hidden
          className={cn(
            'mt-0.5 relative grid size-5 shrink-0 place-items-center rounded-[4px] border-[1.25px] transition-colors duration-200',
            selected
              ? 'bg-[#22C55E] border-[#22C55E]'
              : 'bg-[#fcfcfc] border-[#d7dad8] group-hover:bg-[#e6e9e7] group-hover:border-[#cbcfcc]',
          )}
        >
          <svg viewBox="0 0 24 24" fill="none" width={12} height={12} aria-hidden
            className={cn('text-white transition-opacity duration-150', selected ? 'opacity-100' : 'opacity-0')}
          >
            <path d="M5 12.5 10 17.5 19 7.5" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-[14px] font-semibold leading-[1.3] text-[#1a211c]">
            {title}
          </span>
          <span className="text-[13px] leading-[1.3] text-[#60655f]">
            {description}
          </span>
        </span>
      </button>
    )
  },
)
