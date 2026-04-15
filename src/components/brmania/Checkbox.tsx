import {
  forwardRef, useId, useState, useEffect, useRef, useImperativeHandle,
  type InputHTMLAttributes, type ReactNode,
} from 'react'
import { cn } from '@/lib/cn'

/**
 * Checkbox · BRMania Design System
 * Caixa de seleção com label à esquerda ou direita.
 * Funciona como controlled (prop `checked`) ou uncontrolled (prop `defaultChecked`).
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: ReactNode
  direction?: 'left' | 'right'
  icon?: ReactNode
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, direction = 'left', icon, id, className, checked, defaultChecked, onChange, disabled, ...rest }, ref,
) {
  const uid = useId()
  const inputId = id ?? uid
  const inputRef = useRef<HTMLInputElement | null>(null)
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [])

  const isControlled = checked !== undefined
  const [internal, setInternal] = useState<boolean>(!!defaultChecked)
  const effectiveChecked = isControlled ? !!checked : internal

  // Sincroniza o input nativo (para envio de forms)
  useEffect(() => {
    if (inputRef.current) inputRef.current.checked = effectiveChecked
  }, [effectiveChecked])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternal(e.currentTarget.checked)
    onChange?.(e)
  }

  const info = (
    <span className="inline-flex items-center gap-1 font-['Inter'] text-[16px] leading-[1.3] text-[#202020]">
      {icon && <span className="inline-flex shrink-0 items-center">{icon}</span>}
      {label}
    </span>
  )

  const box = (
    <span
      aria-hidden
      className={cn(
        'relative grid h-5 w-5 shrink-0 place-items-center rounded-[4px] transition-colors duration-150',
        effectiveChecked
          ? 'border-[1.25px] border-[#3e9b57] bg-[#3e9b57]'
          : 'border-[1.25px] border-[#d9d9d9] bg-[#fcfcfc]',
        !disabled && !effectiveChecked && 'hover:border-[#cecece] hover:bg-[#e8e8e8]',
        !disabled && effectiveChecked && 'hover:border-[#2a7e40] hover:bg-[#2a7e40]',
        disabled && 'opacity-50',
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        width={14}
        height={14}
        aria-hidden
        className={cn(
          'text-white transition-opacity duration-150',
          effectiveChecked ? 'opacity-100' : 'opacity-0',
        )}
      >
        <path d="M5 12.5 10 17.5 19 7.5" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-center gap-2 select-none',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        className,
      )}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="checkbox"
        checked={isControlled ? checked : undefined}
        defaultChecked={isControlled ? undefined : defaultChecked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
        {...rest}
      />
      {direction === 'left' ? <>{box}{info}</> : <>{info}{box}</>}
    </label>
  )
})
