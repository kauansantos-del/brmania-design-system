import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { DSIcon } from './DSIcon'

/**
 * Pagination · BRMania Design System
 * Figma: nós 115:160887 (completo) e 115:160880 (botão atômico)
 *
 * Controle de paginação numerado. Renderiza todas as páginas (adequado até ~20).
 * Para datasets maiores, estender com ellipsis — fora do escopo do Figma.
 */

// ─── Atom: PageButton ──────────────────────────────────────────────
export interface PageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

const PAGE_BASE =
  'inline-flex size-8 items-center justify-center rounded-md ' +
  "font-['Inter'] text-[14px] font-medium leading-none transition-colors duration-150 ease-out " +
  'cursor-pointer select-none ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7e40]/40 ' +
  'disabled:pointer-events-none disabled:opacity-50'

export const PageButton = forwardRef<HTMLButtonElement, PageButtonProps>(
  function PageButton({ selected = false, className, children, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-current={selected ? 'page' : undefined}
        className={cn(
          PAGE_BASE,
          selected
            ? 'bg-[#2a7e40] text-white hover:bg-[#246d38]'
            : 'bg-[#e6e9e7] text-[#1a211c] hover:bg-[#d7dad8]',
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

// ─── Pagination ────────────────────────────────────────────────────
export interface PaginationProps {
  count: number
  page: number
  onPageChange?: (page: number) => void
  className?: string
}

export function Pagination({ count, page, onPageChange, className }: PaginationProps) {
  const go = (p: number) => {
    if (p < 1 || p > count || p === page) return
    onPageChange?.(p)
  }

  return (
    <nav
      aria-label="Paginação"
      className={cn('inline-flex items-center gap-1', className)}
    >
      <button
        type="button"
        aria-label="Página anterior"
        disabled={page <= 1}
        onClick={() => go(page - 1)}
        className={cn(
          PAGE_BASE,
          'bg-transparent text-[#60655f] hover:bg-[#e6e9e7] hover:text-[#1a211c]',
        )}
      >
        <DSIcon name="arrow-left" size={16} />
      </button>

      {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
        <PageButton key={n} selected={n === page} onClick={() => go(n)}>
          {n}
        </PageButton>
      ))}

      <button
        type="button"
        aria-label="Próxima página"
        disabled={page >= count}
        onClick={() => go(page + 1)}
        className={cn(
          PAGE_BASE,
          'bg-transparent text-[#60655f] hover:bg-[#e6e9e7] hover:text-[#1a211c]',
        )}
      >
        <DSIcon name="arrow-right" size={16} />
      </button>
    </nav>
  )
}
