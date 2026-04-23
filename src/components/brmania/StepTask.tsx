import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { DSIcon } from './DSIcon'

/**
 * StepTask · BRMania Design System
 * Figma: nó 96:2906
 *
 * Linha de tarefa numerada para onboarding/checklist.
 * Layout flat (somente border-b), sem rounded corners no item.
 * done=true → ícone da direita vira checkmark verde (mesmo visual do Checkbox).
 */

export interface StepTaskProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  step: number
  title: string
  description: string
  /** Slug DSIcon exibido no container azul (ex: 'smart-key', 'link', 'send', 'users-02') */
  icon?: string
  done?: boolean
}

export const StepTask = forwardRef<HTMLButtonElement, StepTaskProps>(
  function StepTask({ step, title, description, icon, done = false, className, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'group flex w-full items-center justify-between gap-3',
          "font-['Inter'] cursor-pointer select-none text-left",
          'border-b border-[#d7dad8] bg-[#fcfcfc] px-3 py-4',
          'transition-colors duration-150',
          'hover:bg-[#eef1ef] hover:border-b-[#cbcfcc]',
          'active:bg-[#e6e9e7]',
          'focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-[#2a7e40]/40',
          'disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        {...rest}
      >
        {/* Left group: número + container de ícone + texto */}
        <span className="flex min-w-0 flex-1 items-center gap-2">
          {/* Número do passo */}
          <span className="w-[11px] shrink-0 font-medium text-[16px] leading-[1.3] text-[#1a211c]">
            {step}
          </span>

          {/* Container do ícone (azul) */}
          {icon && (
            <span
              aria-hidden
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-[8px] border border-[#9ddde7] bg-[#f2fafb]"
            >
              <DSIcon name={icon} style="outline" size={24} className="text-[#0891b2]" />
            </span>
          )}

          {/* Título + descrição */}
          <span className="flex min-w-0 flex-1 flex-col gap-[8px]">
            <span className="truncate font-medium text-[16px] leading-[1.3] text-[#1a211c]">
              {title}
            </span>
            <span className="truncate text-[14px] font-normal leading-[1.3] text-[#60655f]">
              {description}
            </span>
          </span>
        </span>

        {/* Direita: maximize ou checkmark quando done */}
        {done ? (
          <span
            aria-hidden
            className="relative grid size-5 shrink-0 place-items-center rounded-[4px] border-[1.25px] border-[#22C55E] bg-[#22C55E]"
          >
            <svg viewBox="0 0 24 24" fill="none" width={12} height={12} aria-hidden>
              <path
                d="M5 12.5 10 17.5 19 7.5"
                stroke="white"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center text-[#60655f]">
            <DSIcon name="maximize-01" size={20} />
          </span>
        )}
      </button>
    )
  },
)
