import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Button · BRMania Design System
 * Equivalente React ao componente "ButtonMain" do Figma.
 * Variantes: primary · secondary · tertiary · red · disabled
 * Estados (hover/active) são via pseudoclasses — não passe como prop.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'red' | 'disabled'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  iconLeft?: ReactNode
  iconRight?: ReactNode
  fullWidth?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-8 py-5 font-["Sora"] text-[16px] font-semibold leading-[1.1] whitespace-nowrap select-none ' +
  'transition-[background-color,border-color,color,box-shadow,transform] duration-150 active:scale-[0.99] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e9b57] focus-visible:ring-offset-2 focus-visible:ring-offset-white ' +
  'disabled:cursor-not-allowed'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[#3e9b57] text-[#fbfefb] hover:bg-[#2a7e40] active:bg-[#203c25]',
  secondary:
    'bg-[#fcfcfc] border-[1.5px] border-[#d9d9d9] text-[#202020] ' +
    'hover:bg-[#f0f0f0] hover:border-[#cecece] ' +
    'active:bg-[#e0e0e0] active:border-[#bbb]',
  tertiary:
    'bg-transparent text-[#646464] hover:text-[#202020] active:text-[#202020]',
  red:
    'bg-[#dc3d43] text-[#fffcfc] hover:bg-[#ce2c31] active:bg-[#641723]',
  disabled:
    'bg-[#e8e8e8] text-[#646464]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', iconLeft, iconRight, fullWidth, className, disabled, children, ...rest }, ref,
) {
  const isDisabled = variant === 'disabled' || disabled
  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={cn(base, variants[isDisabled ? 'disabled' : variant], fullWidth && 'w-full', className)}
      {...rest}
    >
      {iconLeft && <span className="inline-flex shrink-0 items-center">{iconLeft}</span>}
      {children}
      {iconRight && <span className="inline-flex shrink-0 items-center">{iconRight}</span>}
    </button>
  )
})
