import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * ButtonText · BRMania Design System
 * Botão tipográfico (link-like), sem fundo. Para ações inline, links em formulários.
 * Variantes: primary (verde) · secondary (cinza) · red (vermelho) · codigo (azul, para "Enviar código")
 */
export type ButtonTextVariant = 'primary' | 'secondary' | 'red' | 'codigo'

export interface ButtonTextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonTextVariant
  icon?: ReactNode
}

const base =
  'inline-flex items-center gap-1 font-["Inter"] text-[16px] font-medium leading-[1.3] whitespace-nowrap ' +
  'transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e9b57]/40 rounded'

const variants: Record<ButtonTextVariant, string> = {
  primary:   'text-[#2a7e40] hover:text-[#203c25] active:text-[#3e9b57]',
  secondary: 'text-[#646464] hover:text-[#202020] active:text-[#202020]',
  red:       'text-[#ce2c31] hover:text-[#641723] active:text-[#e5484d]',
  codigo:    'text-[#107d98] hover:text-[#00a2c7] active:text-[#202020]',
}

export const ButtonText = forwardRef<HTMLButtonElement, ButtonTextProps>(function ButtonText(
  { variant = 'primary', icon, className, children, ...rest }, ref,
) {
  return (
    <button ref={ref} className={cn(base, variants[variant], className)} {...rest}>
      {children}
      {icon && <span className="inline-flex shrink-0 items-center">{icon}</span>}
    </button>
  )
})
