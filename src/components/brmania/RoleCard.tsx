import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { DSIcon } from './DSIcon'

/**
 * RoleCard · BRMania Design System
 * Figma: nó 143:13712 (variante "novo usuário")
 *
 * Card de permissão / papel de usuário selecionável via checkbox (visual).
 * 2 papéis (Admin, Viewer) × 3 estados (default, hover, selected).
 * Lista de capacidades marcadas (check-circle) ou ausentes (minus-circle riscado).
 */

export type UserRole = 'admin' | 'viewer'

type Capability = { label: string; granted: boolean }

const ROLE_PRESETS: Record<UserRole, {
  label: string
  description: string
  icon: string
  tileBorder: string
  tileGradient: string
  capabilities: Capability[]
}> = {
  admin: {
    label: 'Admin',
    description: 'Gerencia integração, credenciais e usuários',
    icon: 'security',
    tileBorder: 'border-[#65ba74]',
    tileGradient: 'bg-[linear-gradient(135deg,#46a758_0%,#203c25_100%)]',
    capabilities: [
      { label: 'Criar e editar webhooks', granted: true },
      { label: 'Rotacionar credenciais', granted: true },
      { label: 'Visualizar histórico completo', granted: true },
      { label: 'Convidar outros usuários', granted: true },
    ],
  },
  viewer: {
    label: 'Viewer',
    description: 'Ideal para times de observabilidade e suporte',
    icon: 'eye',
    tileBorder: 'border-[#b8bcb9]',
    tileGradient: 'bg-[linear-gradient(135deg,#868e8b_0%,#1a211c_100%)]',
    capabilities: [
      { label: 'Visualizar webhooks e eventos', granted: true },
      { label: 'Visualizar histórico completo', granted: true },
      { label: 'Criar e editar webhooks', granted: false },
      { label: 'Rotacionar credenciais', granted: false },
    ],
  },
}

export interface RoleCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  role: UserRole
  selected?: boolean
}

const SHELL =
  'group flex w-[315.5px] flex-col items-start gap-3 rounded-lg p-4 ' +
  "font-['Inter'] text-left transition-[background,border-color] duration-200 ease-out " +
  'cursor-pointer select-none border ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7e40]/40 ' +
  'disabled:pointer-events-none disabled:opacity-50'

const SHELL_IDLE = 'bg-[#f8faf8] border-[#d7dad8] hover:bg-[#f5fbf5] hover:border-[#94ce9a]'
const SHELL_SELECTED = 'bg-[#e9f6e9] border-[#65ba74]'

export const RoleCard = forwardRef<HTMLButtonElement, RoleCardProps>(
  function RoleCard({ role, selected = false, className, ...rest }, ref) {
    const preset = ROLE_PRESETS[role]
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={selected}
        className={cn(SHELL, selected ? SHELL_SELECTED : SHELL_IDLE, className)}
        {...rest}
      >
        {/* Header: icon + name + checkbox */}
        <span className="flex w-full items-center justify-between">
          <span className="flex items-center gap-2">
            <span
              aria-hidden
              className={cn(
                'inline-flex size-10 items-center justify-center rounded-lg border',
                preset.tileBorder,
                preset.tileGradient,
              )}
            >
              <DSIcon name={preset.icon} size={24} className="text-white" />
            </span>
            <span className="font-['Sora'] text-[16px] font-semibold leading-[1.1] text-[#1a211c]">
              {preset.label}
            </span>
          </span>
          {/* Checkbox visual */}
          <span
            aria-hidden
            className={cn(
              'relative grid size-5 shrink-0 place-items-center rounded-[4px] border-[1.25px] transition-colors duration-200',
              selected
                ? 'bg-[#22C55E] border-[#22C55E]'
                : 'bg-[#fcfcfc] border-[#d7dad8] group-hover:bg-[#e6e9e7] group-hover:border-[#cbcfcc]',
            )}
          >
            <svg viewBox="0 0 24 24" fill="none" width={14} height={14} aria-hidden
              className={cn('text-white transition-opacity duration-150', selected ? 'opacity-100' : 'opacity-0')}
            >
              <path d="M5 12.5 10 17.5 19 7.5" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>

        {/* Description */}
        <span className="w-full text-[14px] leading-[1.3] text-[#60655f]">
          {preset.description}
        </span>

        {/* Capabilities */}
        <span className="flex w-full flex-col gap-2">
          {preset.capabilities.map((cap) => (
            <span key={cap.label} className="flex items-center gap-1">
              <DSIcon
                name={cap.granted ? 'check-mark-circle' : 'minus-circle'}
                style="solid"
                size={20}
                className={cap.granted ? 'text-[#3e9b57]' : 'text-[#b8bcb9]'}
              />
              <span
                className={cn(
                  'flex-1 text-[14px] font-medium leading-[1.3]',
                  cap.granted ? 'text-[#1a211c]' : 'text-[#7f847d] line-through',
                )}
              >
                {cap.label}
              </span>
            </span>
          ))}
        </span>
      </button>
    )
  },
)

export const USER_ROLES = Object.keys(ROLE_PRESETS) as UserRole[]
