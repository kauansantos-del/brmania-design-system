import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * NavItem · BRMania Design System
 * Atom: item de navegação lateral reutilizável.
 *
 *   Default  → repouso (texto cinza, sem fundo)
 *   Hover    → fundo cinza + indent +8px
 *   Selected → barra verde esquerda + fundo verde + texto escuro
 *
 * Selected via prop `active` (controlado) OU via CSS :focus (não controlado).
 * Compose este átomo para construir moléculas como SidebarItem.
 */

export interface NavItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  icon?: ReactNode
  label: string
  active?: boolean
  danger?: boolean
  fullWidth?: boolean
}

/** @deprecated Use NavItemProps */
export type MenuItemProps = NavItemProps

const BASE =
  'group relative inline-flex h-10 items-center gap-2 rounded-lg ' +
  "font-['Inter'] text-[14px] font-medium leading-[1.3] " +
  'transition-all duration-200 ease-out select-none cursor-pointer ' +
  'focus:outline-none ' +
  'disabled:pointer-events-none disabled:opacity-50'

const IDLE =
  'px-3 text-[#60655f] ' +
  'hover:bg-[#e6e9e7] hover:pl-5 hover:text-[#1a211c] ' +
  'focus:bg-[#daf1db] focus:pl-5 focus:text-[#203c25] focus:hover:bg-[#ccebd0]'

const SELECTED =
  'bg-[#daf1db] pl-5 pr-3 text-[#203c25] hover:bg-[#ccebd0]'

const DANGER_IDLE =
  'px-3 text-[#1a211c] ' +
  'hover:bg-[#feebec] hover:pl-5 hover:text-[#641723] ' +
  'focus:bg-[#ffdbdc] focus:pl-5 focus:text-[#641723]'

const DANGER_SELECTED =
  'bg-[#ffdbdc] pl-5 pr-3 text-[#641723] hover:bg-[#ffd0d2]'

export const NavItem = forwardRef<HTMLButtonElement, NavItemProps>(
  function NavItem(
    { icon, label, active = false, danger = false, fullWidth = true, className, ...rest },
    ref,
  ) {
    const stateClass = danger
      ? (active ? DANGER_SELECTED : DANGER_IDLE)
      : (active ? SELECTED : IDLE)

    return (
      <button
        ref={ref}
        type="button"
        className={cn(BASE, stateClass, fullWidth && 'w-full justify-start', className)}
        aria-current={active ? 'page' : undefined}
        {...rest}
      >
        {/* Barra indicadora esquerda — visível quando active ou quando em :focus */}
        {!danger && (
          <span
            aria-hidden
            className={cn(
              'pointer-events-none absolute left-[-0.5px] top-2 h-6 w-1 rounded-br rounded-tr bg-[#2a7e40] transition-opacity duration-200',
              active ? 'opacity-100' : 'opacity-0 group-focus:opacity-100',
            )}
          />
        )}

        {icon && (
          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
            {icon}
          </span>
        )}
        <span className="truncate">{label}</span>
      </button>
    )
  },
)

/** @deprecated Use NavItem */
export const MenuItem = NavItem
