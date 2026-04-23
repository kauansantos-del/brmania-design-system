import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { DSIcon } from './DSIcon'
import { NavItem } from './MenuItem'

/**
 * SidebarItem · BRMania Design System
 * Molecule: compõe NavItem com os 6 presets de navegação do portal.
 * Figma: nó 38:1345 — 6 presets × 3 estados
 *
 * Default → Hover (CSS :hover) → Selecionado (CSS :focus ou prop active)
 */

export const SIDEBAR_ITEM_PRESETS = {
  inicio:        { label: 'Início',        icon: 'home-01',      danger: false },
  credenciais:   { label: 'Credenciais',   icon: 'smart-key',    danger: false },
  webhooks:      { label: 'Webhooks',      icon: 'link',         danger: false },
  historico:     { label: 'Histórico',     icon: 'clock-circle', danger: false },
  configuracoes: { label: 'Configurações', icon: 'store-01',     danger: false },
  desconectar:   { label: 'Desconectar',   icon: 'logout-01',    danger: true  },
} as const

export type SidebarItemType = keyof typeof SIDEBAR_ITEM_PRESETS

export interface SidebarItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type: SidebarItemType
  label?: string
  active?: boolean
}

export const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  function SidebarItem({ type, label, active, className, ...rest }, ref) {
    const preset = SIDEBAR_ITEM_PRESETS[type]
    // Override NavItem's default padding to match sidebar flush-left behavior
    const sidebarClass = preset.danger
      ? 'px-0 py-3 hover:px-2 focus:px-2'
      : 'px-0 py-3 hover:px-2 focus:pl-3 focus:pr-2'

    return (
      <NavItem
        ref={ref}
        icon={<DSIcon name={preset.icon} size={20} />}
        label={label ?? preset.label}
        active={active}
        danger={preset.danger}
        className={cn(sidebarClass, className)}
        {...rest}
      />
    )
  },
)

// ─── Backward compatibility ──────────────────────────────────────────────────

/** @deprecated Use SIDEBAR_ITEM_PRESETS */
export const SIDEBAR_BUTTON_PRESETS = SIDEBAR_ITEM_PRESETS
/** @deprecated Use SidebarItemType */
export type SidebarButtonType = SidebarItemType
/** @deprecated Use SidebarItemProps */
export type SidebarButtonProps = SidebarItemProps
/** @deprecated Use SidebarItem */
export const SidebarButton = SidebarItem
