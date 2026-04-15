import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * MenuItem · BRMania Design System
 * Item de menu da sidebar. Três variantes visuais:
 *  - ghost: só ícone + texto em cinza (estado normal)
 *  - outlined: bordado (estado hover / secundário)
 *  - active: preenchido verde (selected)
 * E um modifier `danger` para ações destrutivas (ex.: "Desconectar").
 */
export type MenuItemVariant = 'ghost' | 'outlined' | 'active'

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  label: string
  variant?: MenuItemVariant
  danger?: boolean
  fullWidth?: boolean
}

const base =
  'inline-flex items-center gap-2.5 px-3 py-2.5 font-["Inter"] text-[14px] font-medium rounded-lg select-none ' +
  'transition-[background-color,border-color,color] duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e9b57]/40 ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

type StateDef = { normal: string; danger: string }

const variants: Record<MenuItemVariant, StateDef> = {
  ghost: {
    normal: 'bg-transparent text-[#646464] hover:text-[#202020] hover:bg-[#f5f5f5]',
    danger: 'bg-transparent text-[#ce2c31] hover:bg-[#fff5f5]',
  },
  outlined: {
    normal:
      'bg-[#fcfcfc] border-[1.5px] border-[#e0e0e0] text-[#202020] hover:border-[#cecece] hover:bg-[#f0f0f0]',
    danger:
      'bg-[#fcfcfc] border-[1.5px] border-[#f8bcbf] text-[#ce2c31] hover:bg-[#fff5f5] hover:border-[#f19ea1]',
  },
  active: {
    normal:
      'bg-[#e6f4eb] border-[1.5px] border-[#b6dfc2] text-[#203c25] ' +
      'hover:bg-[#d8ecdf] hover:border-[#93cea4]',
    danger:
      'bg-[#f9c4c7] border-[1.5px] border-[#eba4a8] text-[#641723] hover:bg-[#f4b1b5]',
  },
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  { icon, label, variant = 'ghost', danger = false, fullWidth = true, className, ...rest }, ref,
) {
  const styles = variants[variant][danger ? 'danger' : 'normal']
  return (
    <button
      ref={ref}
      className={cn(base, styles, fullWidth ? 'w-full justify-start' : '', className)}
      {...rest}
    >
      {icon && <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span>}
      <span className="truncate">{label}</span>
    </button>
  )
})
