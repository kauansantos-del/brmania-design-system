import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * IconButton · BRMania Design System
 * Botão só de ícone. Comum pra back, close, mais ações, etc.
 * Variantes: filled (quadrado arredondado com borda) · ghost (só ícone)
 */
export type IconButtonVariant = 'filled' | 'ghost'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant
  icon: ReactNode
  'aria-label': string
}

const base =
  'inline-flex items-center justify-center select-none transition-[background-color,border-color,color,transform] duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e9b57]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ' +
  'disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.96]'

const variants: Record<IconButtonVariant, string> = {
  filled:
    'h-12 w-12 rounded-xl border-[1.5px] border-[#d9d9d9] bg-[#fcfcfc] text-[#202020] ' +
    'hover:bg-[#f0f0f0] hover:border-[#cecece] active:bg-[#e0e0e0] active:border-[#bbb]',
  ghost:
    'h-10 w-10 rounded-lg bg-transparent text-[#646464] ' +
    'hover:bg-[#f0f0f0] hover:text-[#202020] active:bg-[#e8e8e8] active:text-[#202020]',
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'filled', icon, className, ...rest }, ref,
) {
  return (
    <button ref={ref} className={cn(base, variants[variant], className)} {...rest}>
      {icon}
    </button>
  )
})
