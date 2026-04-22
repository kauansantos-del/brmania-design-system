import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * UserCard · BRMania Design System
 * Figma: nó 144:24857 (footer da sidebar)
 *
 * Exibe avatar (ou iniciais), nome e organização. Usado no rodapé da sidebar
 * logo acima do botão "Desconectar".
 */

export interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  organization?: string
  avatarUrl?: string
  avatarFallback?: ReactNode
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

export const UserCard = forwardRef<HTMLDivElement, UserCardProps>(
  function UserCard({ name, organization, avatarUrl, avatarFallback, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 rounded-lg py-2 font-['Inter']",
          className,
        )}
        {...rest}
      >
        <span className="inline-flex size-9 shrink-0 overflow-hidden rounded-full bg-[#daf1db] text-[#203c25] items-center justify-center text-[13px] font-semibold">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            avatarFallback ?? initials(name)
          )}
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[14px] font-semibold leading-[1.3] text-[#1a211c]">
            {name}
          </span>
          {organization && (
            <span className="truncate text-[13px] leading-[1.3] text-[#60655f]">
              {organization}
            </span>
          )}
        </span>
      </div>
    )
  },
)
