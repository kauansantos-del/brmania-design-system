import { useMemo, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { DSIcon } from '@/components/brmania'
import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/Badge'
import { CodeBlock } from '@/components/ui/CodeBlock'

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
// Playground — layout em scroll: Todos → Editar → Código
// ===================================================================

export interface PlaygroundProps {
  title: string
  description?: string
  tags?: { label: string; tone?: 'brand' | 'info' | 'neutral' | 'success' | 'warning' }[]
  controls: PropControl[]
  renderPreview: (state: PropState) => ReactNode
  generateCode: (state: PropState) => string
  renderAll?: () => ReactNode
  generateAllCode?: () => string
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

  const set = (key: string, value: string | boolean) =>
    setState((s) => ({ ...s, [key]: value }))

  // O código SEMPRE reflete o estado atual dos controles
  const code = generateCode(state)

  return (
    <div className="space-y-6">
      {/* ─── SEÇÃO 1 · TODOS ─────────────────────────────────── */}
      {renderAll && (
        <Section
          icon="grid-01"
          label="Todos"
          title={title}
          description={description}
          tags={tags}
        >
          <PreviewArea>
            {renderAll()}
          </PreviewArea>
        </Section>
      )}

      {/* ─── SEÇÃO 2 · EDITAR ────────────────────────────────── */}
      <Section
        icon="focus"
        label="Editar"
        title="Propriedades"
        description="Configure os atributos e veja o componente reagir ao vivo."
      >
        {/* Controles */}
        {controls.length > 0 && (
          <div className="flex flex-wrap items-end gap-x-5 gap-y-3 border-b border-surface-border bg-surface-raised/20 px-5 py-4">
            {controls.map((c) => (
              <PropField key={c.key} control={c} value={state[c.key]} onChange={(v) => set(c.key, v)} />
            ))}
          </div>
        )}

        {/* Preview unitário */}
        <PreviewArea>
          <motion.div
            key={JSON.stringify(state)}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {renderPreview(state)}
          </motion.div>
        </PreviewArea>
      </Section>

      {/* ─── SEÇÃO 3 · CÓDIGO ────────────────────────────────── */}
      <Section
        icon="file-01"
        label="Código"
        title="Snippet"
        description="Atualiza automaticamente conforme os atributos acima."
      >
        <div className="p-4">
          <CodeBlock code={code} language={language} maxHeight={480} />
        </div>
      </Section>
    </div>
  )
}

// ===================================================================
// Section — card com header sutil
// ===================================================================

function Section({
  icon, label, title, description, tags, children,
}: {
  icon: string
  label: string
  title: string
  description?: string
  tags?: { label: string; tone?: 'brand' | 'info' | 'neutral' | 'success' | 'warning' }[]
  children: ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-surface-border bg-surface-raised">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-surface-border px-5 py-3">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface-elevated text-ink-400">
          <DSIcon name={icon} size={14} />
        </span>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">{label}</span>
          <span className="text-ink-600">·</span>
          <p className="text-[14px] font-semibold text-ink-100 truncate">{title}</p>
          {tags?.map((t) => (
            <Badge key={t.label} size="sm" tone={t.tone ?? 'neutral'}>{t.label}</Badge>
          ))}
        </div>
        {description && (
          <p className="ml-auto text-[12px] text-ink-400 max-w-xs text-right shrink-0">{description}</p>
        )}
      </div>

      {children}
    </div>
  )
}

// ===================================================================
// PreviewArea — fundo branco com padrão de pontos
// ===================================================================

function PreviewArea({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-white" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #c8c8c8 0.75px, transparent 0.75px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 p-10 min-h-[200px]">
        {children}
      </div>
    </div>
  )
}

// ===================================================================
// PropField — controles dos atributos
// ===================================================================

function PropField({
  control, value, onChange,
}: {
  control: PropControl
  value: string | boolean
  onChange: (v: string | boolean) => void
}) {
  if (control.kind === 'variant') {
    return (
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-400">{control.label}</span>
        <div className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-surface-border bg-surface-raised/70 p-1">
          {control.options.map((opt) => {
            const active = value === opt
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-[14px] font-medium transition-colors duration-200',
                  active
                    ? 'bg-brand-500/15 text-brand-200 ring-1 ring-brand-500/30'
                    : 'text-ink-300 hover:text-ink-100 hover:bg-surface-elevated',
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
      <label className="flex flex-col gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-400">{control.label}</span>
        <select
          value={value as string}
          onChange={(e) => onChange(e.currentTarget.value)}
          className="h-9 rounded-lg border border-surface-border bg-surface-raised/70 px-2.5 text-[14px] text-ink-100 transition-colors duration-200 focus:border-brand-500/60 focus:outline-none"
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
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-400">{control.label}</span>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => onChange(!on)}
          title={control.hint}
          className={cn(
            'group inline-flex h-9 items-center gap-2.5 rounded-lg border px-3 text-[14px] font-medium transition-colors duration-200',
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
          <span className="leading-none">{on ? 'Sim' : 'Não'}</span>
        </button>
      </div>
    )
  }

  // text
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-400">{control.label}</span>
      <input
        type="text"
        value={value as string}
        placeholder={control.placeholder}
        onChange={(e) => onChange(e.currentTarget.value)}
        className="h-9 min-w-[160px] rounded-lg border border-surface-border bg-surface-raised/70 px-3 text-[14px] text-ink-100 placeholder:text-ink-300 transition-colors duration-200 focus:border-brand-500/60 focus:outline-none"
      />
    </label>
  )
}
