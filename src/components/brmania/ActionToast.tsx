import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { DSIcon } from './DSIcon'

/**
 * ActionToast · BRMania Design System
 * Figma: nó 176:51949
 *
 * Layout: ícone 28px + título (Sora 16 SemiBold) + subtítulo (Inter 14) + ação (Raleway 14 SemiBold).
 * 5 tons: success, danger, info, download, pending.
 */

export type ToastTone = 'success' | 'danger' | 'info' | 'download' | 'pending'

const TONE: Record<ToastTone, { icon: string; iconClass: string }> = {
  success:  { icon: 'check-circle',    iconClass: 'text-[#2a7e40]' },
  danger:   { icon: 'warning-error',   iconClass: 'text-[#e5484d]' },
  info:     { icon: 'information',     iconClass: 'text-[#c08c00]' },
  download: { icon: 'folder-download', iconClass: 'text-[#0891b2]' },
  pending:  { icon: 'loading',         iconClass: 'text-[#60655f]' },
}

export interface ActionToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: ToastTone
  title: ReactNode
  description?: ReactNode
  actionLabel?: string
  onAction?: () => void
  customIcon?: ReactNode
}

export const ActionToast = forwardRef<HTMLDivElement, ActionToastProps>(
  function ActionToast(
    { tone = 'success', title, description, actionLabel = 'Desfazer', onAction, customIcon, className, ...rest },
    ref,
  ) {
    const t = TONE[tone]
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          'flex w-full max-w-md items-center gap-8 rounded-lg p-4 ' +
          "bg-[#fcfcfc] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.15)]",
          className,
        )}
        {...rest}
      >
        {/* Esquerda: ícone (28px bulk) + texto, gap 8px entre eles */}
        <span className="flex flex-1 min-w-0 items-center gap-2">
          <span
            aria-hidden
            className={cn('inline-flex size-7 shrink-0 items-center justify-center', t.iconClass)}
          >
            {customIcon ?? <DSIcon name={t.icon} style="bulk" size={28} />}
          </span>

          <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-[16px] font-semibold font-['Sora'] leading-[1.1] text-[#1a211c]">
              {title}
            </span>
            {description && (
              <span className="text-[14px] font-normal font-['Inter'] leading-[1.3] text-[#60655f]">
                {description}
              </span>
            )}
          </span>
        </span>

        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="shrink-0 font-['Inter'] text-[14px] font-semibold leading-[1.3] text-[#ce2c31] transition-opacity duration-150 hover:opacity-70 focus:outline-none focus-visible:underline"
          >
            {actionLabel}
          </button>
        )}
      </div>
    )
  },
)
