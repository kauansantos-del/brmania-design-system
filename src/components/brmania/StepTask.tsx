import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { DSIcon } from './DSIcon'

/**
 * StepTask · BRMania Design System
 * Figma: nó 96:2909
 *
 * Linha de tarefa numerada para onboarding / checklist.
 * 3 status:
 *   pending  → número em círculo cinza, texto normal, seta maximize
 *   success  → número em círculo verde, texto realçado
 *   done     → fundo escuro (gray-12), texto claro — item já resolvido
 *
 * Clicável como botão (navega pra etapa).
 */

export type StepTaskStatus = 'pending' | 'success' | 'done'

export interface StepTaskProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  step: number
  title: string
  description: string
  status?: StepTaskStatus
}

const BASE =
  'group relative flex w-full items-center gap-4 rounded-xl px-4 py-4 ' +
  "font-['Inter'] text-left transition-colors duration-200 ease-out " +
  'cursor-pointer select-none border ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7e40]/40 ' +
  'disabled:pointer-events-none disabled:opacity-50'

const VARIANTS: Record<StepTaskStatus, { shell: string; bullet: string; title: string; desc: string; action: string }> = {
  pending: {
    shell: 'bg-[#f8faf8] border-[#d7dad8] hover:bg-[#f5fbf5] hover:border-[#94ce9a]',
    bullet: 'bg-[#e6e9e7] text-[#60655f]',
    title: 'text-[#1a211c]',
    desc: 'text-[#60655f]',
    action: 'text-[#60655f] group-hover:text-[#2a7e40]',
  },
  success: {
    shell: 'bg-[#f5fbf5] border-[#94ce9a] hover:bg-[#e9f6e9]',
    bullet: 'bg-[#3e9b57] text-white',
    title: 'text-[#203c25]',
    desc: 'text-[#2a7e40]',
    action: 'text-[#2a7e40]',
  },
  done: {
    shell: 'bg-[#1a211c] border-[#1a211c] text-white hover:bg-[#0f1411]',
    bullet: 'bg-[#e6e9e7] text-[#1a211c]',
    title: 'text-white',
    desc: 'text-[#a9aeac]',
    action: 'text-[#a9aeac]',
  },
}

export const StepTask = forwardRef<HTMLButtonElement, StepTaskProps>(
  function StepTask({ step, title, description, status = 'pending', className, ...rest }, ref) {
    const v = VARIANTS[status]
    return (
      <button ref={ref} type="button" className={cn(BASE, v.shell, className)} {...rest}>
        <span
          aria-hidden
          className={cn(
            'inline-flex size-7 shrink-0 items-center justify-center rounded-full font-semibold text-[14px]',
            v.bullet,
          )}
        >
          {status === 'success' ? <DSIcon name="tick" size={14} /> : step}
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className={cn('truncate text-[14px] font-semibold leading-[1.3]', v.title)}>
            {title}
          </span>
          <span className={cn('truncate text-[13px] leading-[1.3]', v.desc)}>
            {description}
          </span>
        </span>

        <span className={cn('inline-flex shrink-0 transition-colors', v.action)}>
          <DSIcon name="maximize-01" size={18} />
        </span>
      </button>
    )
  },
)
