import { cloneElement, isValidElement, type ReactElement, type SVGProps } from 'react'
import { cn } from '@/lib/cn'

/**
 * Icon · BRMania Design System
 * Wrapper universal para ícones SVG (compatível com lucide-react, hugeicons, etc).
 *
 * Passe o componente de ícone via `children` (elemento) ou `as` (componente).
 * O wrapper aplica tamanho e cor consistentes. Escolha um tamanho livre (px) — sem
 * lista fechada de variantes.
 */
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** Elemento JSX do ícone (ex: `<Home />`) OU passe via `as`. */
  children?: ReactElement
  /** Componente de ícone como factory (ex: `Home` de lucide-react). */
  as?: React.ComponentType<SVGProps<SVGSVGElement>>
  /** Tamanho em px. Padrão: 24. */
  size?: number
  /** strokeWidth usado por ícones line-based. */
  strokeWidth?: number
  /** Cor via className (ex: `text-[#3e9b57]`). Default herda currentColor. */
  className?: string
}

export function Icon({
  children, as: Component, size = 24, strokeWidth = 1.75, className, ...rest
}: IconProps) {
  const cls = cn('inline-block shrink-0', className)

  if (Component) {
    return <Component width={size} height={size} strokeWidth={strokeWidth} className={cls} {...rest} />
  }

  if (children && isValidElement(children)) {
    const el = children as ReactElement<SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>
    return cloneElement(el, {
      width: size,
      height: size,
      strokeWidth,
      ...rest,
      className: cn(cls, el.props.className),
    })
  }

  return null
}
