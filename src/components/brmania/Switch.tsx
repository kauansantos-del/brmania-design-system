import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Switch · BRMania Design System
 * Figma: nó 108:128526
 *
 * Toggle switch 50×24 · radius full. Verde principal-10 quando on.
 * Pode ser usado isolado ou com label à esquerda/direita.
 *
 * Acessibilidade: input checkbox real (semântica nativa + keyboard + form submit).
 */

export type SwitchLabelPlacement = 'left' | 'right' | 'none'

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode
  helperText?: ReactNode
  labelPlacement?: SwitchLabelPlacement
}

const TRACK =
  'relative inline-flex h-6 w-[50px] shrink-0 items-center rounded-full ' +
  'bg-[#d7dad8] transition-colors duration-200 ease-out ' +
  'peer-checked:bg-[#3e9b57] ' +
  'peer-focus-visible:ring-2 peer-focus-visible:ring-[#2a7e40]/40 ' +
  'peer-disabled:opacity-50'

const THUMB =
  'pointer-events-none absolute left-0.5 top-1/2 -translate-y-1/2 ' +
  'h-5 w-5 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.15)] ' +
  'transition-transform duration-200 ease-out ' +
  'group-has-[:checked]:translate-x-[26px]'

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(
    { label, helperText, labelPlacement = 'right', className, id, disabled, ...rest },
    ref,
  ) {
    const reactId = useId()
    const autoId = id ?? reactId
    const trackNode = (
      <span className="group relative inline-flex">
        <input
          ref={ref}
          id={autoId}
          type="checkbox"
          disabled={disabled}
          className="peer sr-only"
          {...rest}
        />
        <span aria-hidden className={TRACK}>
          <span className={THUMB} />
        </span>
      </span>
    )

    if (labelPlacement === 'none' || !label) {
      return <span className={cn('inline-flex', className)}>{trackNode}</span>
    }

    const labelNode = (
      <label htmlFor={autoId} className="cursor-pointer select-none">
        <span className="block font-['Inter'] text-[16px] font-normal leading-[1.3] text-[#1a211c]">
          {label}
        </span>
        {helperText && (
          <span className="mt-1 block font-['Inter'] text-[14px] leading-[1.3] text-[#60655f]">
            {helperText}
          </span>
        )}
      </label>
    )

    return (
      <span className={cn('inline-flex items-center gap-2', className)}>
        {labelPlacement === 'left' && labelNode}
        {trackNode}
        {labelPlacement === 'right' && labelNode}
      </span>
    )
  },
)

