import { forwardRef, type ReactNode, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { DSIcon } from './DSIcon'

/**
 * ActionToast · BRMania Design System
 * Figma: nó 176:51949
 *
 * Notificação com ícone + título + subtítulo + botão de ação (ex. "Desfazer").
 * 5 tons: success, danger, info, download, pending (loading).
 *
 * Renderiza estático — para dispatch/fila use um Toaster por fora.
 */

export type ToastTone = 'success' | 'danger' | 'info' | 'download' | 'pending'

const TONE_STYLES: Record<ToastTone, { icon: string; iconStyle: 'outline' | 'solid'; iconWrap: string; action: string }> = {
  success:  { icon: 'tick',               iconStyle: 'solid',   iconWrap: 'bg-[#daf1db] text-[#2a7e40]', action: 'text-[#e5484d]' },
  danger:   { icon: 'warning',            iconStyle: 'solid',   iconWrap: 'bg-[#feebec] text-[#e5484d]', action: 'text-[#e5484d]' },
  info:     { icon: 'information',        iconStyle: 'outline', iconWrap: 'bg-[#fef2a4] text-[#946800]', action: 'text-[#e5484d]' },
  download: { icon: 'download',           iconStyle: 'outline', iconWrap: 'bg-[#caf1f6] text-[#107d98]', action: 'text-[#e5484d]' },
  pending:  { icon: 'notification',       iconStyle: 'outline', iconWrap: 'bg-[#e6e9e7] text-[#60655f]', action: 'text-[#e5484d]' },
}

export interface ActionToastProps extends HTMLAttributes<HTMLDivElement> {
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
    const t = TONE_STYLES[tone]
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          'flex w-full max-w-md items-center gap-3 rounded-xl bg-white p-3 ' +
            "font-['Inter'] shadow-[0_8px_24px_-8px_rgba(32,32,32,0.20)] border border-[#e6e9e7]",
          className,
        )}
        {...rest}
      >
        <span
          aria-hidden
          className={cn('inline-flex size-9 shrink-0 items-center justify-center rounded-full', t.iconWrap)}
        >
          {customIcon ?? <DSIcon name={t.icon} style={t.iconStyle} size={18} />}
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-[14px] font-semibold leading-[1.3] text-[#1a211c]">
            {title}
          </span>
          {description && (
            <span className="truncate text-[13px] leading-[1.3] text-[#60655f]">
              {description}
            </span>
          )}
        </span>

        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className={cn(
              'shrink-0 rounded-md px-2 py-1 text-[14px] font-semibold leading-[1.3] transition-colors duration-150',
              'hover:bg-[#feebec] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]/30',
              t.action,
            )}
          >
            {actionLabel}
          </button>
        )}
      </div>
    )
  },
)
