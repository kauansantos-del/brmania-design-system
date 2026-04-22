import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { DSIcon } from './DSIcon'

/**
 * Tabs · BRMania Design System
 * Figma: nó 147:42657
 *
 * Tabs horizontais com underline animado. Cada tab aceita ícone + label.
 * Active → texto verde + underline verde. Inactive → texto gray-11.
 */

export type TabItem = {
  value: string
  label: ReactNode
  icon?: string
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  'aria-label'?: string
}

const TAB_BASE =
  'relative inline-flex items-center gap-2 px-4 py-3 ' +
  "font-['Inter'] text-[14px] font-medium leading-[1.3] " +
  'transition-colors duration-150 ease-out cursor-pointer select-none ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7e40]/40 focus-visible:ring-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-50'

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  'aria-label': ariaLabel = 'Abas',
}: TabsProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value ?? '')
  const current = isControlled ? value! : internal

  const handle = (v: string) => {
    if (!isControlled) setInternal(v)
    onValueChange?.(v)
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-stretch gap-0 border-b border-[#d7dad8]',
        className,
      )}
    >
      {items.map((it) => {
        const selected = it.value === current
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={selected}
            disabled={it.disabled}
            onClick={() => handle(it.value)}
            className={cn(
              TAB_BASE,
              selected
                ? 'text-[#2a7e40]'
                : 'text-[#60655f] hover:text-[#1a211c]',
            )}
          >
            {it.icon && <DSIcon name={it.icon} size={18} />}
            <span>{it.label}</span>
            {/* Underline indicator */}
            <span
              aria-hidden
              className={cn(
                'absolute inset-x-0 bottom-[-1px] h-[2px] rounded-t transition-opacity duration-200',
                selected ? 'bg-[#2a7e40] opacity-100' : 'bg-transparent opacity-0',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
