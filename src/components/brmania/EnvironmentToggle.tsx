import { forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
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

// Hover preview usa cores ligeiramente mais suaves que o estado ativo
const PILL = {
  sandbox: { active: { bg: '#fef2a4', border: '#ebbc00' }, preview: { bg: '#fff8bb', border: '#efd36c' } },
  producao: { active: { bg: '#b5e9f0', border: '#3db9cf' }, preview: { bg: '#caf1f6', border: '#7dcedc' } },
}

const TEXT = {
  sandbox: { active: '#35290f', hover: '#946800', idle: '#60655f' },
  producao: { active: '#107d98', hover: '#107d98', idle: '#60655f' },
}

export const EnvironmentToggle = forwardRef<HTMLDivElement, EnvironmentToggleProps>(
  function EnvironmentToggle({ value, onChange, className, disabled }, ref) {
    const [hoveredEnv, setHoveredEnv] = useState<Environment | null>(null)

    const handle = (env: Environment) => () => {
      if (disabled || value === env) return
      onChange?.(env)
    }

    // A pílula segue o hover; se não houver hover, fica no valor ativo
    const displayEnv = hoveredEnv ?? value
    const isSandbox = displayEnv === 'sandbox'
    const isPreview = hoveredEnv !== null && hoveredEnv !== value

    const pill = PILL[displayEnv][isPreview ? 'preview' : 'active']

    const sandboxColor =
      value === 'sandbox' ? TEXT.sandbox.active
      : hoveredEnv === 'sandbox' ? TEXT.sandbox.hover
      : TEXT.sandbox.idle

    const prodColor =
      value === 'producao' ? TEXT.producao.active
      : hoveredEnv === 'producao' ? TEXT.producao.hover
      : TEXT.producao.idle

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="Ambiente da API"
        className={cn(
          'relative inline-flex h-10 w-[219px] items-center justify-center p-1',
          'rounded-full border border-[#d7dad8] bg-[#f8faf8] overflow-hidden',
          className,
        )}
      >
        {/* Pílula deslizante — largura exata de metade menos o padding */}
        <motion.div
          aria-hidden
          className="absolute top-1 left-1 bottom-1 rounded-full border pointer-events-none"
          style={{ width: 'calc(50% - 4px)' }}
          animate={{
            x: isSandbox ? 0 : '100%',
            y: isPreview ? -1 : 0,
            backgroundColor: pill.bg,
            borderColor: pill.border,
          }}
          transition={{
            x: { type: 'spring', stiffness: 480, damping: 40, mass: 0.85 },
            y: { type: 'spring', stiffness: 600, damping: 35 },
            backgroundColor: { duration: 0.18, ease: 'easeOut' },
            borderColor: { duration: 0.18, ease: 'easeOut' },
          }}
        />

        <button
          type="button"
          role="tab"
          aria-selected={value === 'sandbox'}
          disabled={disabled}
          onClick={handle('sandbox')}
          onMouseEnter={() => !disabled && setHoveredEnv('sandbox')}
          onMouseLeave={() => setHoveredEnv(null)}
          className={cn(
            'relative z-10 flex-1 inline-flex items-center justify-center gap-1',
            'px-3 py-2 rounded-full font-["Inter"] text-[14px] font-medium leading-[1.3]',
            'cursor-pointer select-none transition-colors duration-150',
            'disabled:pointer-events-none disabled:opacity-50',
          )}
          style={{ color: sandboxColor }}
        >
          <DSIcon name="test-tube" size={16} aria-hidden />
          <span>Sandbox</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={value === 'producao'}
          disabled={disabled}
          onClick={handle('producao')}
          onMouseEnter={() => !disabled && setHoveredEnv('producao')}
          onMouseLeave={() => setHoveredEnv(null)}
          className={cn(
            'relative z-10 flex-1 inline-flex items-center justify-center gap-1',
            'px-3 py-2 rounded-full font-["Inter"] text-[14px] font-medium leading-[1.3]',
            'cursor-pointer select-none transition-colors duration-150',
            'disabled:pointer-events-none disabled:opacity-50',
          )}
          style={{ color: prodColor }}
        >
          <DSIcon name="wireless-charging" size={16} aria-hidden />
          <span>Produção</span>
        </button>
      </div>
    )
  },
)
