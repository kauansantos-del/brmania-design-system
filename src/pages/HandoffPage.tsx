import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Figma } from 'lucide-react'
import { DSIcon } from '@/components/brmania'
import { toast } from 'sonner'
import { PageHeader } from '@/components/layout/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { SpotlightCard } from '@/components/ui/effects/SpotlightCard'
import { Meteors } from '@/components/ui/effects/Meteors'
import { CopyButton } from '@/components/ui/CopyButton'
import { cn } from '@/lib/cn'
import {
  buildBundleJson, buildColorsJson, buildSpacingJson, buildTypographyJson,
  downloadResource, type DSResource,
} from '@/lib/downloads'

type ResourceMeta = {
  resource: DSResource
  title: string
  subtitle: string
  filename: string
  iconSlug: string
  gradient: string
  ring: string
  accent: string
  bullets: string[]
}

const RESOURCES: ResourceMeta[] = [
  {
    resource: 'colors',
    title: 'Cores',
    subtitle: 'Escala Radix 1–12 · Dark + Light',
    filename: 'brmania-cores.tokens.json',
    iconSlug: 'paint-board',
    gradient: 'from-brand-400/80 via-brand-500/50 to-transparent',
    ring: 'shadow-[0_12px_32px_-16px_rgba(70,167,104,.55)]',
    accent: 'text-brand-300',
    bullets: ['2 temas (dark/light)', 'Grupos semânticos', 'HEX + alpha por step'],
  },
  {
    resource: 'typography',
    title: 'Tipografia',
    subtitle: 'Sora · Inter · JetBrains Mono',
    filename: 'brmania-tipografia.tokens.json',
    iconSlug: 'font-size',
    gradient: 'from-indigo-400/80 via-indigo-500/40 to-transparent',
    ring: 'shadow-[0_12px_32px_-16px_rgba(99,102,241,.55)]',
    accent: 'text-indigo-300',
    bullets: ['3 famílias', '9 níveis de escala', 'Pesos, line-height e tracking'],
  },
  {
    resource: 'spacing',
    title: 'Espaçamento',
    subtitle: 'Escala 4pt · xs → 4xl',
    filename: 'brmania-espacamento.tokens.json',
    iconSlug: 'ruler',
    gradient: 'from-amber-300/80 via-amber-400/40 to-transparent',
    ring: 'shadow-[0_12px_32px_-16px_rgba(251,191,36,.55)]',
    accent: 'text-amber-300',
    bullets: ['8 níveis (4–64px)', 'Valores em px e rem', 'Múltiplos de 4'],
  },
]

async function getSize(resource: DSResource): Promise<number> {
  let s: string
  switch (resource) {
    case 'colors':     s = await buildColorsJson(); break
    case 'typography': s = buildTypographyJson();   break
    case 'spacing':    s = buildSpacingJson();      break
    case 'all':        s = await buildBundleJson(); break
  }
  return new Blob([s]).size
}

function fmtSize(bytes: number | null): string {
  if (bytes === null) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

export function HandoffPage() {
  const [sizes, setSizes] = useState<Record<string, number | null>>({
    colors: null, typography: null, spacing: null, all: null,
  })
  const [bundleSize, setBundleSize] = useState<number | null>(null)
  const [busy, setBusy] = useState<DSResource | null>(null)
  const [done, setDone] = useState<DSResource | null>(null)
  const [copied, setCopied] = useState<DSResource | null>(null)

  useEffect(() => {
    let alive = true
    Promise.all([
      getSize('colors'), getSize('typography'), getSize('spacing'), getSize('all'),
    ]).then(([c, t, s, all]) => {
      if (!alive) return
      setSizes({ colors: c, typography: t, spacing: s, all })
      setBundleSize(all)
    }).catch(() => {})
    return () => { alive = false }
  }, [])

  const handleDownload = async (resource: DSResource) => {
    if (busy) return
    setBusy(resource)
    try {
      await downloadResource(resource)
      toast.success('Download iniciado')
      setDone(resource)
      setTimeout(() => setDone(null), 1500)
    } catch {
      toast.error('Falha ao gerar o arquivo')
    } finally {
      setBusy(null)
    }
  }

  const handleCopyJson = async (resource: DSResource) => {
    try {
      let s: string
      switch (resource) {
        case 'colors':     s = await buildColorsJson(); break
        case 'typography': s = buildTypographyJson();   break
        case 'spacing':    s = buildSpacingJson();      break
        case 'all':        s = await buildBundleJson(); break
      }
      await navigator.clipboard.writeText(s)
      toast.success('JSON copiado para a área de transferência')
      setCopied(resource)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      toast.error('Falha ao copiar o JSON')
    }
  }

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Documentação · Handoff"
        title="Leve o Design System"
        titleAccent="para qualquer stack."
        description="Exporte os tokens do BRMania em JSON estruturado (DTCG-ready). Baixe separadamente por categoria ou o bundle completo com tudo empacotado."
        meta={[
          { label: 'DTCG-ready', tone: 'brand' },
          { label: 'v1.0.0',     tone: 'info' },
          { label: `${fmtSize(bundleSize)} · bundle`, tone: 'neutral' },
        ]}
      />

      <div className="mx-auto max-w-6xl px-8 py-10">
        {/* Bundle card – destaque */}
        <SpotlightCard className="relative mb-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_400px_at_80%_-20%,rgba(70,167,104,0.18),transparent_50%)]" />
          <Meteors number={14} />
          <div className="relative grid gap-8 p-8 md:grid-cols-[1fr_320px] md:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300">
                <DSIcon name="package-01" size={12} />
                Bundle completo
              </div>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-ink-50">
                Baixe tudo de uma vez.<br />
                <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-emerald-300 bg-clip-text text-transparent">
                  Cores, tipografia e espaçamento.
                </span>
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-300">
                Um único arquivo JSON com todos os tokens do sistema. Plug direto no seu pipeline — Style Dictionary, Tailwind, CSS Variables, Figma Tokens ou o que mais o seu time usar.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleDownload('all')}
                  className="group inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-5 text-[13px] font-bold text-white shadow-[0_12px_32px_-14px_rgba(70,167,104,.7)] transition hover:brightness-110"
                >
                  {busy === 'all' ? (
                    <DSIcon name="loading-01" size={16} className="animate-spin" />
                  ) : done === 'all' ? (
                    <DSIcon name="check-mark-circle" size={16} />
                  ) : (
                    <DSIcon name="download-01" size={16} />
                  )}
                  design-system.json
                  <span className="rounded-md bg-black/15 px-1.5 py-0.5 font-mono text-[10.5px] tabular-nums">
                    {fmtSize(sizes.all)}
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleCopyJson('all')}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-surface-border bg-surface-raised/70 px-4 text-[12.5px] font-semibold text-ink-200 transition hover:bg-surface-elevated"
                >
                  {copied === 'all' ? <DSIcon name="check-mark-circle" size={14} className="text-brand-300" /> : <DSIcon name="task-check" size={14} />}
                  Copiar JSON
                </motion.button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-[11.5px] text-ink-400">
                <span className="inline-flex items-center gap-1.5">
                  <DSIcon name="file-01" size={12} className="text-ink-300" />
                  Formato JSON (DTCG-ready)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <DSIcon name="link" size={12} className="text-ink-300" />
                  v1.0.0
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Figma size={12} className="text-ink-300" />
                  Sincronizado com Figma
                </span>
              </div>
            </div>

            {/* Preview do JSON à direita */}
            <div className="relative hidden md:block">
              <div className="rounded-xl border border-surface-border bg-[#0A0A10] p-4 font-mono text-[11px] leading-relaxed text-ink-300 shadow-inner">
                <p className="text-brand-300">{'{'}</p>
                <p className="pl-3"><span className="text-sky-300">"name"</span>: <span className="text-amber-200">"BRMania · Tokens"</span>,</p>
                <p className="pl-3"><span className="text-sky-300">"version"</span>: <span className="text-amber-200">"1.0.0"</span>,</p>
                <p className="pl-3"><span className="text-sky-300">"colors"</span>: {'{ themes: {...} },'}</p>
                <p className="pl-3"><span className="text-sky-300">"typography"</span>: {'{ ... },'}</p>
                <p className="pl-3"><span className="text-sky-300">"spacing"</span>: {'{ ... }'}</p>
                <p className="text-brand-300">{'}'}</p>
              </div>
              <motion.div
                aria-hidden
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-3 -top-3 rounded-lg border border-brand-500/30 bg-surface-raised/90 px-2.5 py-1 text-[10px] font-semibold text-brand-300 backdrop-blur"
              >
                .json
              </motion.div>
            </div>
          </div>
        </SpotlightCard>

        {/* Cards individuais */}
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-ink-100">Downloads individuais</h3>
            <p className="text-[13px] text-ink-400">Escolha só o que você precisa.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {RESOURCES.map((r, i) => {
            const size = sizes[r.resource] ?? null
            const isBusy = busy === r.resource
            const isDone = done === r.resource
            const isCopied = copied === r.resource
            return (
              <motion.div
                key={r.resource}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 0.9, 0.28, 1] }}
              >
                <SpotlightCard className={cn('relative overflow-hidden h-full', r.ring)}>
                  {/* topo com gradient */}
                  <div className={cn('relative h-24 w-full overflow-hidden border-b border-surface-border bg-gradient-to-br', r.gradient)}>
                    <div
                      className="absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.6) 1px, transparent 1px)',
                        backgroundSize: '18px 18px',
                      }}
                    />
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900/70 ring-1 ring-white/10 backdrop-blur-md"
                    >
                      <DSIcon name={r.iconSlug} size={22} className={r.accent} />
                    </motion.div>
                    <span className="absolute right-4 top-4 rounded-md bg-black/35 px-2 py-0.5 font-mono text-[10px] text-ink-100 backdrop-blur">
                      {fmtSize(size)}
                    </span>
                  </div>

                  <div className="p-5">
                    <h4 className="font-display text-base font-bold text-ink-50">{r.title}</h4>
                    <p className="text-[12px] text-ink-400">{r.subtitle}</p>

                    <ul className="mt-3 space-y-1.5">
                      {r.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-[12px] text-ink-300">
                          <span className={cn('h-1.5 w-1.5 rounded-full', r.accent.replace('text-', 'bg-'))} />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex items-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleDownload(r.resource)}
                        disabled={isBusy}
                        className={cn(
                          'group inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-surface-border bg-surface-raised/70 px-3 text-[12.5px] font-semibold text-ink-100 transition hover:bg-surface-elevated',
                          isBusy && 'opacity-60',
                        )}
                      >
                        {isBusy ? (
                          <DSIcon name="loading-01" size={13} className="animate-spin" />
                        ) : isDone ? (
                          <DSIcon name="check-mark-circle" size={13} className="text-brand-300" />
                        ) : (
                          <DSIcon name="download-01" size={13} />
                        )}
                        Baixar
                      </motion.button>
                      <CopyButton
                        value={r.resource}
                        // sobrescreve comportamento: copia JSON em vez do valor literal
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopyJson(r.resource)}
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-surface-border bg-surface-raised/70 px-3 text-[12px] font-medium text-ink-300 transition hover:bg-surface-elevated hover:text-ink-100"
                        aria-label={`Copiar JSON de ${r.title}`}
                      >
                        {isCopied ? <DSIcon name="check-mark-circle" size={13} className="text-brand-300" /> : <DSIcon name="task-check" size={13} />}
                        Copiar
                      </button>
                    </div>

                    <p className="mt-3 truncate font-mono text-[10.5px] text-ink-500">{r.filename}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>

        {/* Como usar */}
        <div className="mt-12">
          <h3 className="mb-4 font-display text-lg font-bold text-ink-100">Como usar</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <UsageCard
              step="01"
              title="Style Dictionary"
              body="Importe o JSON no seu pipeline de tokens. Exporte para Sass, CSS, Android/iOS ou JSON plano."
            />
            <UsageCard
              step="02"
              title="Tailwind CSS"
              body="Gere o mapa de cores do seu tailwind.config.js a partir de colors.themes. Suporta dark/light."
            />
            <UsageCard
              step="03"
              title="Figma"
              body="Compatível com o plugin Tokens Studio for Figma. Fonte única de verdade entre design e dev."
            />
          </div>
        </div>

        {/* Changelog / versão */}
        <div className="mt-12 rounded-xl border border-surface-border bg-surface-raised/40 p-5">
          <div className="flex items-center gap-2">
            <Badge tone="brand" dot size="sm">v1.0.0</Badge>
            <span className="text-[11.5px] text-ink-400">· Release inicial · Abril 2026</span>
          </div>
          <p className="mt-2 text-[13px] text-ink-300">
            Primeira versão estável com todos os fundamentos sincronizados com o Figma. Quebras de contrato serão sinalizadas no campo <code className="font-mono text-brand-300">version</code> do JSON.
          </p>
        </div>
      </div>
    </div>
  )
}

function UsageCard({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <SpotlightCard className="h-full">
      <div className="p-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold text-brand-300">{step}</span>
          <span className="h-px flex-1 bg-surface-border" />
        </div>
        <h4 className="mt-3 font-display text-base font-bold text-ink-50">{title}</h4>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink-400">{body}</p>
      </div>
    </SpotlightCard>
  )
}
