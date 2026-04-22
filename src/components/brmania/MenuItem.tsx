import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * MenuItem · BRMania Design System
 *
 * Item de navegação para sidebar / menu lateral.
 * Os estados visuais seguem o Figma — são gerenciados por CSS, não por prop:
 *
 *   Default  →  repouso (texto cinza, sem fundo, sem borda visível)
 *   Hover    →  mouse sobre (borda aparece, fundo claro, indent +8 px)
 *   Focus    →  selecionado via prop `active` (fundo verde, borda verde)
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │  DESIGN TOKENS (Figma → Code)                          │
 * ├─────────────────────────────────────────────────────────┤
 * │                                                         │
 * │  TEXT                                                   │
 * │  idle          #646464   Texto em repouso               │
 * │  hover         #202020   Texto ao passar o mouse        │
 * │  active        #15803D   Texto do item selecionado      │
 * │  danger        #ce2c31   Texto destrutivo               │
 * │  danger-dark   #641723   Texto destrutivo selecionado   │
 * │                                                         │
 * │  BACKGROUND                                             │
 * │  hover         #fcfcfc   Fundo ao passar o mouse        │
 * │  active        #e6f4eb   Fundo selecionado              │
 * │  active-hover  #d8ecdf   Fundo selecionado + mouse      │
 * │  danger-hover  #fff5f5   Fundo destrutivo hover         │
 * │  danger-active #f9c4c7   Fundo destrutivo selecionado   │
 * │                                                         │
 * │  BORDER                                                 │
 * │  hover         #e0e0e0   Borda ao passar o mouse        │
 * │  active        #b6dfc2   Borda selecionado              │
 * │  active-hover  #93cea4   Borda selecionado + mouse      │
 * │  danger-hover  #f8bcbf   Borda destrutivo hover         │
 * │  danger-active #eba4a8   Borda destrutivo selecionado   │
 * │                                                         │
 * │  SIZING                                                 │
 * │  icon          20px      Tamanho padrão dos ícones      │
 * │  icon-box      22px      Wrapper do ícone               │
 * │  radius        8px       rounded-lg                     │
 * │  transition    200ms     ease-out                       │
 * │  hover-indent  +8px      Padding-left extra no hover    │
 * │                                                         │
 * └─────────────────────────────────────────────────────────┘
 */

// ─── Props ───────────────────────────────────────────────────────

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ícone à esquerda. Recomendado: <DSIcon name="..." size={20} /> */
  icon?: ReactNode
  /** Texto do item */
  label: string
  /** Item selecionado / página atual (aplica estilo "focus" do Figma) */
  active?: boolean
  /** Aplica cores de ação destrutiva (vermelho) */
  danger?: boolean
  /** Ocupa 100% da largura do container (padrão: true) */
  fullWidth?: boolean
}

// ─── Estilos ─────────────────────────────────────────────────────

// Borda sempre presente (transparente no idle) para evitar layout shift no hover.
const BASE =
  'inline-flex items-center gap-3 pl-3 pr-3 py-2.5 ' +
  'border-[1.5px] border-transparent ' +
  'font-["Inter"] text-[15px] font-medium leading-[1.3] ' +
  'rounded-lg select-none cursor-pointer ' +
  'transition-all duration-200 ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E]/40 ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

// ── Idle (default) ───────────────────────────────────────────
// Sem fundo, texto cinza. Hover: borda aparece + indent +8px.
const IDLE =
  'text-[#646464] ' +
  'hover:text-[#202020] hover:bg-[#fcfcfc] hover:border-[#e0e0e0] hover:pl-5'

// ── Active (focus / selecionado) ─────────────────────────────
// Fundo verde, borda verde. Sem indent — já é visualmente destacado.
const ACTIVE =
  'bg-[#e6f4eb] border-[#b6dfc2] text-[#15803D] ' +
  'hover:bg-[#d8ecdf] hover:border-[#93cea4]'

// ── Danger idle ──────────────────────────────────────────────
const DANGER_IDLE =
  'text-[#ce2c31] ' +
  'hover:bg-[#fff5f5] hover:border-[#f8bcbf] hover:pl-5'

// ── Danger active ────────────────────────────────────────────
const DANGER_ACTIVE =
  'bg-[#f9c4c7] border-[#eba4a8] text-[#641723] ' +
  'hover:bg-[#f4b1b5]'

// ─── Componente ──────────────────────────────────────────────────

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  function MenuItem(
    { icon, label, active = false, danger = false, fullWidth = true, className, ...rest },
    ref,
  ) {
    const style = danger
      ? (active ? DANGER_ACTIVE : DANGER_IDLE)
      : (active ? ACTIVE : IDLE)

    return (
      <button
        ref={ref}
        className={cn(BASE, style, fullWidth && 'w-full justify-start', className)}
        aria-current={active ? 'page' : undefined}
        {...rest}
      >
        {icon && (
          <span className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center">
            {icon}
          </span>
        )}
        <span className="truncate">{label}</span>
      </button>
    )
  },
)
