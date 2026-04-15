import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
type Size = 'sm' | 'md' | 'lg' | 'icon'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-br from-brand-500 to-brand-700 text-white hover:from-brand-400 hover:to-brand-600 active:from-brand-600 active:to-brand-800 shadow-[0_0_0_1px_rgba(70,167,104,.25),0_8px_24px_-12px_rgba(70,167,104,.65)]',
  secondary:
    'bg-surface-elevated text-ink-100 hover:bg-ink-700 border border-surface-border',
  ghost:
    'bg-transparent text-ink-200 hover:bg-surface-elevated hover:text-ink-100',
  outline:
    'bg-transparent text-ink-100 border border-surface-border hover:border-brand-500/50 hover:text-brand-300',
  danger:
    'bg-rose-500/90 text-white hover:bg-rose-500',
}

const sizes: Record<Size, string> = {
  sm:   'h-8 px-3 text-xs rounded-md gap-1.5',
  md:   'h-9 px-3.5 text-sm rounded-md gap-2',
  lg:   'h-11 px-5 text-sm rounded-lg gap-2',
  icon: 'h-9 w-9 rounded-md',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', leftIcon, rightIcon, loading, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-medium whitespace-nowrap select-none',
        'transition-[background,color,border-color,transform,box-shadow] duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25" />
          <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  )
})
