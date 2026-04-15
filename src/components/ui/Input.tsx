import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode
  rightSlot?: ReactNode
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, leftIcon, rightSlot, invalid, ...rest },
  ref,
) {
  return (
    <div
      className={cn(
        'group flex h-10 items-center gap-2 rounded-lg border bg-surface-raised px-3',
        'transition focus-within:border-brand-500/60 focus-within:shadow-[0_0_0_3px_rgba(255,138,0,.12)]',
        invalid ? 'border-rose-500/60' : 'border-surface-border',
        className,
      )}
    >
      {leftIcon && <span className="text-ink-400 group-focus-within:text-ink-200 shrink-0">{leftIcon}</span>}
      <input
        ref={ref}
        className={cn(
          'flex-1 bg-transparent text-sm text-ink-100 placeholder:text-ink-400',
          'focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed',
        )}
        {...rest}
      />
      {rightSlot && <span className="shrink-0">{rightSlot}</span>}
    </div>
  )
})
