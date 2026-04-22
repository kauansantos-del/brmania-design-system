import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { DSIcon } from './DSIcon'

/**
 * EnvironmentToggle · BRMania Design System
 * Figma: nó 70:1040
 *
 * Toggle segmentado para alternar entre Sandbox (amarelo) e Produção (azul).
 * Pílula 219×40px · radius 64px · border gray-6 · padding interno 4px.
 * Cada segmento tem padding 8×12, radius 64, gap 4 (ícone + label).
 */

export type Environment = 'sandbox' | 'producao'

export interface EnvironmentToggleProps {
  value: Environment
  onChange?: (env: Environment) => void
  className?: string
  disabled?: boolean
}

const WRAPPER =
  'inline-flex h-10 w-[219px] items-center justify-center gap-0 p-1 ' +
  'rounded-full border border-[#d7dad8] bg-[#f8faf8] ' +
  'transition-colors duration-200'

const SEG_BASE =
  'relative flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 ' +
  'rounded-full font-["Inter"] text-[14px] font-medium leading-[1.3] ' +
  'transition-[background,border-color,color] duration-200 ease-out ' +
  'cursor-pointer select-none border border-transparent ' +
  'disabled:pointer-events-none disabled:opacity-50'

// Sandbox (amarelo/warm)
const SAND_IDLE = 'text-[#60655f] hover:bg-[#fff8bb] hover:border-[#efd36c] hover:text-[#946800]'
const SAND_ACTIVE = 'bg-[#fef2a4] border-[#ebbc00] text-[#35290f]'

// Produção (azul)
const PROD_IDLE = 'text-[#60655f] hover:bg-[#caf1f6] hover:border-[#7dcedc] hover:text-[#107d98]'
const PROD_ACTIVE = 'bg-[#b5e9f0] border-[#3db9cf] text-[#107d98]'

export const EnvironmentToggle = forwardRef<HTMLDivElement, EnvironmentToggleProps>(
  function EnvironmentToggle({ value, onChange, className, disabled }, ref) {
    const handle = (env: Environment) => () => {
      if (disabled || value === env) return
      onChange?.(env)
    }

    const isSandbox = value === 'sandbox'
    const isProd = value === 'producao'

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="Ambiente da API"
        className={cn(WRAPPER, className)}
      >
        <button
          type="button"
          role="tab"
          aria-selected={isSandbox}
          disabled={disabled}
          onClick={handle('sandbox')}
          className={cn(SEG_BASE, isSandbox ? SAND_ACTIVE : SAND_IDLE)}
        >
          <DSIcon name="test-tube" size={16} aria-hidden />
          <span>Sandbox</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={isProd}
          disabled={disabled}
          onClick={handle('producao')}
          className={cn(SEG_BASE, isProd ? PROD_ACTIVE : PROD_IDLE)}
        >
          <DSIcon name="wireless-charging" size={16} aria-hidden />
          <span>Produção</span>
        </button>
      </div>
    )
  },
)
