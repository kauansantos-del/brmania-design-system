import {
  forwardRef, useId, useState,
  type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode,
} from 'react'
import { DSIcon } from './DSIcon'
import { cn } from '@/lib/cn'

/**
 * Input · BRMania Design System
 * Três variantes: input padrão, mensagem (textarea) e search.
 * Estado de erro renderiza borda/fundo vermelhos + mensagem abaixo.
 */
export type InputKind = 'input' | 'mensagem' | 'search'

type BaseProps = {
  label?: string
  error?: string
  helperText?: string
  tooltip?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  brl?: boolean
  kind?: InputKind
}

type InputElProps = BaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>
type TextareaElProps = BaseProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>

export type InputProps = InputElProps | TextareaElProps

const LABEL_CLS = 'inline-flex items-center gap-1 font-["Inter"] text-[14px] font-medium text-[#202020]'

// Dupla borda: borda 1.5px sólida (#d9d9d9) + ring externo de 3px com
// opacidade reduzida, dando a sensação de dupla borda vista no Figma.
const FIELD_BASE =
  'w-full rounded-[8px] bg-[#fcfcfc] px-3 py-2.5 font-["Inter"] text-[15px] text-[#202020] ' +
  'placeholder:font-["Inter"] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#a7a7a7] ' +
  'outline-none transition-[border-color,background-color,box-shadow] duration-200 ease-out ' +
  'border-[1.5px] border-[#d9d9d9] ' +
  'disabled:cursor-not-allowed disabled:bg-[#f0f0f0] disabled:text-[#8f8f8f]'

const FIELD_NORMAL =
  'shadow-[0_0_0_3px_rgba(217,217,217,0.12)] ' +
  'hover:border-[#cecece] hover:shadow-[0_0_0_3px_rgba(206,206,206,0.18)] ' +
  'focus:border-[#22C55E] focus:bg-[#f6fbf7] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.16)]'

const FIELD_ERROR =
  'border-[#dc3d43] bg-[#fff5f5] shadow-[0_0_0_3px_rgba(220,61,67,0.10)] ' +
  'focus:border-[#ce2c31] focus:shadow-[0_0_0_3px_rgba(220,61,67,0.18)]'

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(function Input(
  props, ref,
) {
  const {
    label, error, helperText, tooltip,
    iconLeft, iconRight, brl, kind = 'input',
    id, className, disabled, ...rest
  } = props as BaseProps & { id?: string; className?: string; disabled?: boolean }

  const uid = useId()
  const fieldId = id ?? uid
  const errorId = `${fieldId}-error`
  const hasError = !!error
  const [focused, setFocused] = useState(false)

  const isSearch = kind === 'search'
  const isTextarea = kind === 'mensagem'

  const leftSlot = isSearch ? <DSIcon name="search-01" size={18} className="text-[#8f8f8f]" /> : iconLeft
  const rightSlot = brl ? (
    <span className="text-[14px] font-semibold text-[#646464]">BRL</span>
  ) : iconRight

  const fieldProps = {
    id: fieldId,
    className: cn(
      FIELD_BASE,
      hasError ? FIELD_ERROR : FIELD_NORMAL,
      leftSlot && 'pl-10',
      rightSlot && 'pr-12',
      isTextarea && 'min-h-[120px] resize-y leading-[1.5]',
      className,
    ),
    disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    'aria-invalid': hasError || undefined,
    'aria-describedby': hasError ? errorId : undefined,
    ...rest,
  }

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={fieldId} className={LABEL_CLS}>
          {label}
          {tooltip && (
            <span
              title={tooltip}
              aria-label={tooltip}
              className="inline-flex cursor-help items-center text-[#8f8f8f] hover:text-[#646464]"
            >
              <DSIcon name="information-circle" size={14} />
            </span>
          )}
        </label>
      )}

      <div className={cn('relative', focused && 'is-focused')}>
        {leftSlot && (
          <span className="pointer-events-none absolute left-3.5 top-0 bottom-0 flex items-center justify-center text-[#646464]">
            {leftSlot}
          </span>
        )}

        {isTextarea ? (
          <textarea ref={ref as React.Ref<HTMLTextAreaElement>} {...(fieldProps as any)} />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type={isSearch ? 'search' : 'text'}
            {...(fieldProps as any)}
          />
        )}

        {rightSlot && (
          <span className="pointer-events-none absolute right-3.5 top-0 bottom-0 flex items-center justify-center text-[#646464]">
            {rightSlot}
          </span>
        )}
      </div>

      {hasError ? (
        <p id={errorId} className="inline-flex items-center gap-1 font-['Inter'] text-[14px] text-[#ce2c31]">
          <DSIcon name="warning" size={14} /> {error}
        </p>
      ) : helperText ? (
        <p className="font-['Inter'] text-[14px] text-[#646464]">{helperText}</p>
      ) : null}
    </div>
  )
})
