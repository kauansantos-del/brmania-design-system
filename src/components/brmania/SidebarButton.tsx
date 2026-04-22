import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { DSIcon } from './DSIcon'

/**
 * SidebarButton · BRMania Design System
 * Figma: nó 38:1345 — 6 presets × 3 estados
 *
 * Default → Hover (CSS :hover) → Selecionado (CSS :focus nativo)
 * Clicar = foca o botão = estado verde. Ao clicar fora ou em outro item,
 * o foco migra e o visual volta ao normal — sem necessidade de estado React.
 */

export const SIDEBAR_BUTTON_PRESETS = {
  inicio:        { label: 'Início',        icon: 'home-01',      danger: false },
  credenciais:   { label: 'Credenciais',   icon: 'smart-key',    danger: false },
  webhooks:      { label: 'Webhooks',      icon: 'link',         danger: false },
  historico:     { label: 'Histórico',     icon: 'clock-circle', danger: false },
  configuracoes: { label: 'Configurações', icon: 'store-01',     danger: false },
  desconectar:   { label: 'Desconectar',   icon: 'logout-01',    danger: true  },
} as const

export type SidebarButtonType = keyof typeof SIDEBAR_BUTTON_PRESETS

export interface SidebarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: SidebarButtonType
  label?: string
  customIcon?: ReactNode
}

const BASE =
  'group relative inline-flex w-full h-10 items-center gap-2 rounded-lg ' +
  'font-["Inter"] text-[14px] font-medium leading-[1.3] ' +
  'transition-all duration-200 ease-out select-none cursor-pointer ' +
  'focus:outline-none ' +
  'disabled:pointer-events-none disabled:opacity-50'

// Default → Hover → Focus (selected)
const STATE_NORMAL =
  'px-0 py-3 text-[#60655f] ' +
  'hover:bg-[#e6e9e7] hover:px-2 hover:text-[#1a211c] ' +
  'focus:bg-[#daf1db] focus:pl-3 focus:pr-2 focus:text-[#203c25] ' +
  'focus:hover:bg-[#ccebd0]'

const STATE_DANGER =
  'px-0 py-3 text-[#1a211c] ' +
  'hover:bg-[#feebec] hover:px-2 hover:text-[#641723] ' +
  'focus:bg-[#ffdbdc] focus:px-2 focus:text-[#641723] ' +
  'focus:hover:bg-[#ffd0d2]'

export const SidebarButton = forwardRef<HTMLButtonElement, SidebarButtonProps>(
  function SidebarButton(
    { type, label, customIcon, className, ...rest },
    ref,
  ) {
    const preset = SIDEBAR_BUTTON_PRESETS[type]
    const { danger } = preset
    const resolvedLabel = label ?? preset.label
    const resolvedIcon = customIcon ?? <DSIcon name={preset.icon} size={20} />

    return (
      <button
        ref={ref}
        type="button"
        className={cn(BASE, danger ? STATE_DANGER : STATE_NORMAL, className)}
        {...rest}
      >
        {/* Barra indicadora esquerda — só no focus, variante normal */}
        {!danger && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-[-0.5px] top-2 h-6 w-1 rounded-br rounded-tr bg-[#2a7e40] opacity-0 transition-opacity duration-200 group-focus:opacity-100"
          />
        )}

        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
          {resolvedIcon}
        </span>
        <span className="truncate">{resolvedLabel}</span>
      </button>
    )
  },
)
