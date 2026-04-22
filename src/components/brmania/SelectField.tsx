import { useState, useRef, useEffect, forwardRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { DSIcon } from './DSIcon'
import { DropdownOption } from './DropdownOption'

/**
 * SelectField · BRMania Design System
 * Figma: nó 113:160210
 *
 * Campo select/dropdown completo: label + trigger + menu de opções.
 * Trigger fechado mostra chevron-right; aberto, chevron-down.
 * Foco → borda verde (principal-7). Menu de opções usa DropdownOption.
 *
 * Uncontrolled por padrão; aceita value/onValueChange para uso controlado.
 */

export type SelectOption = { value: string; label: string }

export interface SelectFieldProps {
  label?: ReactNode
  options: SelectOption[]
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  error?: string
  helperText?: ReactNode
  className?: string
  name?: string
  id?: string
}

export const SelectField = forwardRef<HTMLButtonElement, SelectFieldProps>(
  function SelectField(
    {
      label,
      options,
      placeholder = 'Selecione',
      value,
      defaultValue,
      onValueChange,
      disabled,
      error,
      helperText,
      className,
      name,
      id,
    },
    ref,
  ) {
    const isControlled = value !== undefined
    const [internal, setInternal] = useState(defaultValue ?? '')
    const current = isControlled ? value! : internal
    const [open, setOpen] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!open) return
      const onClick = (e: MouseEvent) => {
        if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
      }
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
      document.addEventListener('mousedown', onClick)
      document.addEventListener('keydown', onKey)
      return () => {
        document.removeEventListener('mousedown', onClick)
        document.removeEventListener('keydown', onKey)
      }
    }, [open])

    const selectedLabel = options.find((o) => o.value === current)?.label

    const handleSelect = (v: string) => {
      if (!isControlled) setInternal(v)
      onValueChange?.(v)
      setOpen(false)
    }

    return (
      <div ref={rootRef} className={cn('flex w-full flex-col gap-2', className)}>
        {label && (
          <label htmlFor={id} className="font-['Inter'] text-[14px] leading-[1.3] text-[#1a211c]">
            {label}
          </label>
        )}
        <button
          ref={ref}
          id={id}
          name={name}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'flex h-10 w-full items-center justify-between gap-2 rounded-md border bg-[#f8faf8] px-3',
            "font-['Inter'] text-[14px] leading-[1.3] transition-[background,border-color] duration-150",
            'focus:outline-none cursor-pointer',
            error
              ? 'border-[#e5484d] text-[#1a211c] focus:border-[#e5484d]'
              : open
                ? 'border-[#65ba74] bg-white text-[#1a211c]'
                : 'border-[#d7dad8] text-[#1a211c] hover:border-[#cbcfcc] focus:border-[#65ba74]',
            disabled && 'opacity-50',
          )}
        >
          <span className={cn('truncate', !selectedLabel && 'text-[#8c918d]')}>
            {selectedLabel ?? placeholder}
          </span>
          <DSIcon
            name={open ? 'arrow-down' : 'arrow-right'}
            size={16}
            className="shrink-0 text-[#60655f]"
          />
        </button>

        {error ? (
          <span className="font-['Inter'] text-[13px] leading-[1.3] text-[#e5484d]">{error}</span>
        ) : helperText ? (
          <span className="font-['Inter'] text-[13px] leading-[1.3] text-[#60655f]">{helperText}</span>
        ) : null}

        {open && (
          <div
            role="listbox"
            className="mt-1 flex flex-col gap-1 rounded-lg border border-[#d7dad8] bg-white p-1 shadow-[0_8px_24px_-8px_rgba(32,32,32,0.18)]"
          >
            {options.map((o) => (
              <DropdownOption
                key={o.value}
                label={o.label}
                selected={o.value === current}
                onClick={() => handleSelect(o.value)}
              />
            ))}
          </div>
        )}
      </div>
    )
  },
)
