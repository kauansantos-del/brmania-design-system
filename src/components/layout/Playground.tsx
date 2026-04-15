import { useMemo, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DSIcon } from '@/components/brmania'
import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/Badge'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { SpotlightCard } from '@/components/ui/effects/SpotlightCard'

// ===================================================================
// Tipos
// ===================================================================

export type PropControl<V extends string = string> =
  | { kind: 'variant'; key: string; label: string; options: readonly V[]; default: V }
  | { kind: 'toggle';  key: string; label: string; default?: boolean; hint?: string }
  | { kind: 'select';  key: string; label: string; options: readonly { value: string; label: string }[]; default: string }
  | { kind: 'text';    key: string; label: string; default: string; placeholder?: string }

export type PropState = Record<string, string | boolean>

// ===================================================================
// Playground (um componente)
// ===================================================================

export interface PlaygroundProps {
  title: string
  description?: string
  tags?: { label: string; tone?: 'brand' | 'info' | 'neutral' | 'success' | 'warning' }[]
  controls: PropControl[]
  /** Render live do componente com o state atual. */
  renderPreview: (state: PropState) => ReactNode
  /** Gera o snippet de código com base no state atual. */
  generateCode: (state: PropState) => string
  /** (opcional) Quando o "ver todos" está ativo, renderiza a grade de todas as variantes. */
  renderAll?: () => ReactNode
  /** (opcional) Código para o "ver todos". */
  generateAllCode?: () => string
  /** Lang para o CodeBlock. */
  language?: string
}

export function Playground({
  title, description, tags, controls, renderPreview, generateCode,
  renderAll, generateAllCode, language = 'tsx',
}: PlaygroundProps) {
  const initial = useMemo(() => {
    const s: PropState = {}
    for (const c of controls) {
      if (c.kind === 'toggle') s[c.key] = c.default ?? false
      else s[c.key] = c.default
    }
    return s
  }, [controls])

  const [state, setState] = useState<PropState>(initial)
  const [mode, setMode] = useState<'single' | 'all'>('single')

  const set = (key: string, value: string | boolean) =>
    setState((s) => ({ ...s, [key]: value }))

  const code = mode === 'all' && generateAllCode
    ? generateAllCode()
    : generateCode(state)

  return (
    <SpotlightCard className="mb-6 overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-surface-border px-5 py-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-[15px] font-bold text-ink-50">{title}</h3>
            {tags?.map((t) => (
              <Badge key={t.label} size="sm" tone={t.tone ?? 'neutral'}>{t.label}</Badge>
            ))}
          </div>
          {description && (
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-400">{description}</p>
          )}
        </div>

        {/* Toggle single/all */}
        {renderAll && (
          <div className="inline-flex rounded-lg border border-surface-border bg-surface-raised/70 p-1">
            <ModeButton active={mode === 'single'} onClick={() => setMode('single')}>
              <DSIcon name="focus" size={12} /> Um a um
            </ModeButton>
            <ModeButton active={mode === 'all'} onClick={() => setMode('all')}>
              <DSIcon name="grid-01" size={12} /> Ver todos
            </ModeButton>
          </div>
        )}
      </div>

      {/* Controles (props) */}
      {mode === 'single' && controls.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-surface-border bg-surface-raised/30 px-5 py-3">
          <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">
            <DSIcon name="filter-01" size={11} /> Propriedades
          </div>
          {controls.map((c) => (
            <PropField key={c.key} control={c} value={state[c.key]} onChange={(v) => set(c.key, v)} />
          ))}
        </div>
      )}

      {/* Preview */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #fcfcfc 0%, #f5f5f5 100%)' }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 flex flex-wrap items-center justify-center gap-4 p-8 min-h-[200px]"
          >
            {mode === 'all' && renderAll ? renderAll() : renderPreview(state)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Código sempre visível */}
      <div className="border-t border-surface-border p-4">
        <CodeBlock code={code} language={language} maxHeight={420} />
      </div>
    </SpotlightCard>
  )
}

// ===================================================================
// Subcomponentes
// ===================================================================

function ModeButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium transition',
        active ? 'bg-surface-elevated text-ink-50' : 'text-ink-400 hover:text-ink-200',
      )}
    >
      {children}
    </button>
  )
}

function PropField({
  control, value, onChange,
}: {
  control: PropControl
  value: string | boolean
  onChange: (v: string | boolean) => void
}) {
  if (control.kind === 'variant') {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-medium uppercase tracking-wider text-ink-500">{control.label}</span>
        <div className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-surface-border bg-surface-raised/70 p-1">
          {control.options.map((opt) => {
            const active = value === opt
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={cn(
                  'rounded-md px-2.5 py-1 text-[11.5px] font-medium transition',
                  active ? 'bg-brand-500/15 text-brand-200 ring-1 ring-brand-500/30' : 'text-ink-400 hover:text-ink-100 hover:bg-surface-elevated',
                )}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (control.kind === 'select') {
    return (
      <label className="flex flex-col gap-1">
        <span className="text-[10px] font-medium uppercase tracking-wider text-ink-500">{control.label}</span>
        <select
          value={value as string}
          onChange={(e) => onChange(e.currentTarget.value)}
          className="h-8 rounded-lg border border-surface-border bg-surface-raised/70 px-2 text-[12px] text-ink-100 focus:border-brand-500/60 focus:outline-none"
        >
          {control.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>
    )
  }

  if (control.kind === 'toggle') {
    const on = !!value
    return (
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-medium uppercase tracking-wider text-ink-500">&nbsp;</span>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => onChange(!on)}
          title={control.hint}
          className={cn(
            'group inline-flex h-8 items-center gap-2.5 rounded-lg border px-2.5 text-[11.5px] font-medium transition-colors',
            on
              ? 'border-brand-500/40 bg-brand-500/10 text-brand-100'
              : 'border-surface-border bg-surface-raised/70 text-ink-300 hover:border-surface-border/80 hover:text-ink-100',
          )}
        >
          <span
            aria-hidden
            className={cn(
              'relative inline-block h-[18px] w-[32px] shrink-0 rounded-full transition-colors duration-200',
              on ? 'bg-brand-500' : 'bg-surface-border/70',
            )}
          >
            <span
              className={cn(
                'absolute top-1/2 left-0 h-[14px] w-[14px] -translate-y-1/2 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.35)] transition-transform duration-200 ease-out',
                on ? 'translate-x-[16px]' : 'translate-x-[2px]',
              )}
            />
          </span>
          <span className="leading-none">{control.label}</span>
        </button>
      </div>
    )
  }

  // text
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-medium uppercase tracking-wider text-ink-500">{control.label}</span>
      <input
        type="text"
        value={value as string}
        placeholder={control.placeholder}
        onChange={(e) => onChange(e.currentTarget.value)}
        className="h-8 min-w-[150px] rounded-lg border border-surface-border bg-surface-raised/70 px-2.5 text-[12px] text-ink-100 placeholder:text-ink-500 focus:border-brand-500/60 focus:outline-none"
      />
    </label>
  )
}
