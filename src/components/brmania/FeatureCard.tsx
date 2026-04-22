import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { DSIcon } from './DSIcon'

/**
 * FeatureCard · BRMania Design System
 * Figma: nó 75:1313
 *
 * Card de acesso rápido a uma feature. 257.5×222, radius 12.
 * Ícone em tile 48×48 com gradiente · Título · Descrição · CTA "Acessar" sublinhado.
 *
 * Estados:
 *   default → fundo branco, borda gray-6
 *   hover   → fundo f8 + shadow + borda gray-7
 *   active  → fundo gray-4 (pressionado) — CSS :active nativo
 *
 * Use com `preset` (quatro pré-configurações prontas) OU passe campos custom.
 */

export type FeatureCardPreset =
  | 'credenciais'
  | 'webhooks'
  | 'historico'
  | 'gerenciamento'

const PRESETS: Record<FeatureCardPreset, {
  title: string
  description: string
  icon: string
  tileBorder: string
  tileGradient: string
}> = {
  credenciais: {
    title: 'Credenciais',
    description: 'Visualize o Client ID, Client Secret e dados da integração da API',
    icon: 'smart-key',
    tileBorder: 'border-[#65ba74]',
    tileGradient: 'bg-[linear-gradient(135deg,#46a758_0%,#203c25_100%)]',
  },
  webhooks: {
    title: 'Webhooks',
    description: 'Cadastre e gerencie os webhooks que recebem eventos da sua integração',
    icon: 'link',
    tileBorder: 'border-[#ebbc00]',
    tileGradient: 'bg-[linear-gradient(135deg,#ebbc00_0%,#35290f_100%)]',
  },
  historico: {
    title: 'Histórico',
    description: 'Visualize tentativas e resultados das requisições da API em tempo real',
    icon: 'document-text',
    tileBorder: 'border-[#aa99ec]',
    tileGradient: 'bg-[linear-gradient(135deg,#6e56cf_0%,#2f265f_100%)]',
  },
  gerenciamento: {
    title: 'Gerenciamento',
    description: 'Gerencie dados da empresa, usuários secundários e segurança.',
    icon: 'store-01',
    tileBorder: 'border-[#3db9cf]',
    tileGradient: 'bg-[linear-gradient(135deg,#00a2c7_0%,#0d3c48_100%)]',
  },
}

export interface FeatureCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  /** Pré-configuração rápida — sobrescrita por title/description/icon se fornecidos. */
  preset?: FeatureCardPreset
  title?: ReactNode
  description?: ReactNode
  icon?: string
  customIcon?: ReactNode
  /** Tom do tile do ícone (se custom). */
  tone?: 'green' | 'yellow' | 'violet' | 'blue'
  ctaLabel?: string
}

const TONE_STYLES: Record<NonNullable<FeatureCardProps['tone']>, { border: string; gradient: string }> = {
  green:  { border: 'border-[#65ba74]', gradient: 'bg-[linear-gradient(135deg,#46a758_0%,#203c25_100%)]' },
  yellow: { border: 'border-[#ebbc00]', gradient: 'bg-[linear-gradient(135deg,#ebbc00_0%,#35290f_100%)]' },
  violet: { border: 'border-[#aa99ec]', gradient: 'bg-[linear-gradient(135deg,#6e56cf_0%,#2f265f_100%)]' },
  blue:   { border: 'border-[#3db9cf]', gradient: 'bg-[linear-gradient(135deg,#00a2c7_0%,#0d3c48_100%)]' },
}

const SHELL =
  "group flex h-[222px] w-[257.5px] flex-col items-start justify-between overflow-hidden rounded-xl border p-4 font-['Inter'] text-left " +
  'transition-[background,border-color,box-shadow,transform] duration-200 ease-out ' +
  'cursor-pointer select-none ' +
  'bg-[#fcfcfc] border-[#d7dad8] ' +
  'hover:bg-[#f8faf8] hover:border-[#cbcfcc] hover:shadow-[0_4px_8px_rgba(32,32,32,0.15)] hover:-translate-y-[3px] ' +
  'active:bg-[#e6e9e7] active:border-[#b8bcb9] active:shadow-none active:translate-y-0 ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7e40]/40 ' +
  'disabled:pointer-events-none disabled:opacity-50'

export const FeatureCard = forwardRef<HTMLButtonElement, FeatureCardProps>(
  function FeatureCard(
    { preset, title, description, icon, customIcon, tone, ctaLabel = 'Acessar', className, ...rest },
    ref,
  ) {
    const p = preset ? PRESETS[preset] : undefined
    const resolvedTitle = title ?? p?.title
    const resolvedDesc = description ?? p?.description
    const resolvedIconName = icon ?? p?.icon ?? 'star'

    const tileBorder = tone ? TONE_STYLES[tone].border : p?.tileBorder ?? 'border-[#65ba74]'
    const tileGrad = tone ? TONE_STYLES[tone].gradient : p?.tileGradient ?? TONE_STYLES.green.gradient

    return (
      <button ref={ref} type="button" className={cn(SHELL, className)} {...rest}>
        <span className="flex w-full flex-col items-start gap-6">
          <span
            aria-hidden
            className={cn(
              'inline-flex size-12 items-center justify-center rounded-xl border',
              tileBorder,
              tileGrad,
            )}
          >
            {customIcon ?? <DSIcon name={resolvedIconName} size={28} className="text-white" />}
          </span>
          <span className="flex flex-col gap-3">
            <span className="font-['Sora'] text-[16px] font-semibold leading-[1.1] text-[#1a211c]">
              {resolvedTitle}
            </span>
            <span className="text-[14px] leading-[1.3] text-[#60655f]">
              {resolvedDesc}
            </span>
          </span>
        </span>

        <span className="inline-flex items-center gap-1 text-[16px] leading-[1.3] text-[#2a7e40] underline">
          {ctaLabel}
          <DSIcon name="maximize-01" size={18} />
        </span>
      </button>
    )
  },
)

export const FEATURE_CARD_PRESETS = Object.keys(PRESETS) as FeatureCardPreset[]
