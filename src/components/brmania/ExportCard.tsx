import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { DSIcon } from './DSIcon'

/**
 * ExportCard · BRMania Design System
 * Figma: nó 143:13712 (variante "Export")
 *
 * Card selecionável de formato de exportação. 3 formatos, 3 estados.
 *
 * ┌────────────────────────────────────────────────────────┐
 * │  [icon-tile gradiente]                                  │
 * │                                                         │
 * │  Título (Sora SemiBold 16)                             │
 * │  Descrição (Inter Regular 14)                          │
 * └────────────────────────────────────────────────────────┘
 */

export type ExportFormat = 'csv' | 'json' | 'excel'

const FORMAT_PRESETS: Record<ExportFormat, {
  label: string
  description: string
  icon: string
  tileBorder: string
  tileGradient: string
}> = {
  csv: {
    label: 'CSV',
    description: 'Planilhas e análise de dados',
    icon: 'file-01',
    tileBorder: 'border-[#65ba74]',
    tileGradient: 'bg-[linear-gradient(135deg,#46a758_0%,#203c25_100%)]',
  },
  json: {
    label: 'JSON',
    description: 'Integrações e scripts',
    icon: 'file-sharing',
    tileBorder: 'border-[#ebbc00]',
    tileGradient: 'bg-[linear-gradient(135deg,#ebbc00_0%,#35290f_100%)]',
  },
  excel: {
    label: 'Excel',
    description: 'Abrir no Microsoft Excel',
    icon: 'files',
    tileBorder: 'border-[#aa99ec]',
    tileGradient: 'bg-[linear-gradient(135deg,#6e56cf_0%,#2f265f_100%)]',
  },
}

export interface ExportCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  format: ExportFormat
  selected?: boolean
}

const BASE =
  'group flex w-[219px] flex-col items-start justify-center gap-6 rounded-lg p-4 ' +
  "font-['Inter'] text-left transition-[background,border-color,transform] duration-200 ease-out " +
  'cursor-pointer select-none border ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7e40]/40 ' +
  'disabled:pointer-events-none disabled:opacity-50'

const SHELL_IDLE = 'bg-[#f8faf8] border-[#d7dad8] hover:bg-[#f5fbf5] hover:border-[#94ce9a]'
const SHELL_SELECTED = 'bg-[#daf1db] border-[#65ba74] hover:bg-[#c8e9cb]'

export const ExportCard = forwardRef<HTMLButtonElement, ExportCardProps>(
  function ExportCard({ format, selected = false, className, ...rest }, ref) {
    const preset = FORMAT_PRESETS[format]
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        className={cn(BASE, selected ? SHELL_SELECTED : SHELL_IDLE, className)}
        {...rest}
      >
        <span
          aria-hidden
          className={cn(
            'inline-flex size-11 items-center justify-center rounded-lg border text-white',
            preset.tileBorder,
            preset.tileGradient,
          )}
        >
          <DSIcon name={preset.icon} size={24} className="text-white" />
        </span>
        <span className="flex flex-col gap-3">
          <span className="font-['Sora'] text-[16px] font-semibold leading-[1.1] text-[#1a211c]">
            {preset.label}
          </span>
          <span className="text-[14px] leading-[1.3] text-[#60655f]">
            {preset.description}
          </span>
        </span>
      </button>
    )
  },
)

export const EXPORT_FORMATS = Object.keys(FORMAT_PRESETS) as ExportFormat[]
