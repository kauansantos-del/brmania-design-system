import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/**
 * DropdownOption · BRMania Design System
 * Figma: nó 113:160194
 *
 * Opção atômica usada dentro de Select/Menu/Dropdown.
 * 3 estados (default · hover · selected) × 2 alinhamentos (left / right).
 */

export interface DropdownOptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  selected?: boolean
  align?: 'left' | 'right'
}

const BASE =
  'block w-full rounded-md px-3 py-2 text-[14px] leading-[1.3] ' +
  "font-['Inter'] transition-colors duration-150 ease-out " +
  'cursor-pointer select-none ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7e40]/40 ' +
  'disabled:pointer-events-none disabled:opacity-50'

export const DropdownOption = forwardRef<HTMLButtonElement, DropdownOptionProps>(
  function DropdownOption({ label, selected = false, align = 'left', className, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        role="option"
        aria-selected={selected}
        className={cn(
          BASE,
          align === 'right' ? 'text-right' : 'text-left',
          selected
            ? 'bg-[#daf1db] text-[#203c25]'
            : 'bg-white text-[#1a211c] hover:bg-[#e6e9e7]',
          className,
        )}
        {...rest}
      >
        {label}
      </button>
    )
  },
)
