import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { DSIcon } from '@/components/brmania'
import { PageHeader } from '@/components/layout/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { CopyButton } from '@/components/ui/CopyButton'
import { Tooltip } from '@/components/ui/Tooltip'
import { Popover } from '@/components/ui/Popover'
import { ColorIllustration } from '@/components/ui/ColorIllustration'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { DownloadJsonButton } from '@/components/ui/DownloadJsonButton'
import { SpotlightCard } from '@/components/ui/effects/SpotlightCard'
import { cn } from '@/lib/cn'
import { copyToClipboard } from '@/lib/clipboard'
import { contrastOn, loadColorTokens, type ColorToken } from '@/lib/tokens'
import { buildColorsJson, buildSpacingJson, buildTypographyJson } from '@/lib/downloads'

import { HandoffPage } from './HandoffPage'

export function DocumentationPage({ sub, query }: { sub: string; query: string }) {
  if (sub === 'cores') return <ColorsDoc query={query} />
  if (sub === 'tipografia') return <TypographyDoc />
  if (sub === 'espacamento') return <SpacingDoc />
  if (sub === 'handoff') return <HandoffPage />
  // fallback
  return <ColorsDoc query={query} />
}

// Radix Colors — significado semântico dos 12 steps
// https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
const RADIX_STEPS: Record<string, { title: string; use: string; group: 'bg' | 'interactive' | 'border' | 'solid' | 'text' }> = {
  '1':  { title: 'App background',              use: 'Fundo principal da aplicação',                     group: 'bg' },
  '2':  { title: 'Subtle background',           use: 'Fundo sutil (cards, áreas secundárias)',           group: 'bg' },
  '3':  { title: 'UI element background',       use: 'Fundo de componentes (inputs, botões ghost)',      group: 'interactive' },
  '4':  { title: 'Hovered UI element',          use: 'Hover do fundo de componentes',                    group: 'interactive' },
  '5':  { title: 'Active / Selected UI',        use: 'Estado ativo ou selecionado de componentes',       group: 'interactive' },
  '6':  { title: 'Subtle borders & separators', use: 'Bordas sutis e divisórias',                         group: 'border' },
  '7':  { title: 'UI element border',           use: 'Borda padrão de inputs e cards',                    group: 'border' },
  '8':  { title: 'Hovered border / focus ring', use: 'Hover de borda ou anel de foco',                    group: 'border' },
  '9':  { title: 'Solid backgrounds',           use: 'Fundo sólido de alta saturação (ex.: primary CTA)', group: 'solid' },
  '10': { title: 'Hovered solid backgrounds',   use: 'Hover do fundo sólido',                             group: 'solid' },
  '11': { title: 'Low-contrast text',           use: 'Texto secundário / labels',                         group: 'text' },
  '12': { title: 'High-contrast text',          use: 'Texto principal de alta legibilidade',              group: 'text' },
}

const RADIX_GROUP_META: Record<string, { label: string; color: string }> = {
  bg:          { label: 'Backgrounds',   color: 'text-sky-300' },
  interactive: { label: 'Interativos',   color: 'text-indigo-300' },
  border:      { label: 'Bordas',        color: 'text-amber-300' },
  solid:       { label: 'Sólidos',       color: 'text-brand-300' },
  text:        { label: 'Texto',         color: 'text-rose-300' },
}

// =========================================================
// Cores
// =========================================================
function ColorsDoc({ query }: { query: string }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [data, setData] = useState<{ groups: Record<string, Record<string, ColorToken[]>>; all: ColorToken[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    setLoading(true); setError(null)
    loadColorTokens(`/tokens/${theme === 'dark' ? 'Dark' : 'Light'}.tokens.json`)
      .then((r) => { if (alive) setData(r) })
      .catch((e) => { if (alive) setError(String(e)) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [theme])

  const q = query.trim().toLowerCase()
  const filteredGroups = useMemo(() => {
    if (!data) return null
    if (!q) return data.groups
    const out: typeof data.groups = {}
    for (const [group, scales] of Object.entries(data.groups)) {
      const matchedScales: typeof scales = {}
      for (const [scale, tokens] of Object.entries(scales)) {
        const matched = tokens.filter((t) =>
          [t.group, t.scale, t.step, t.hex].some((v) => v.toLowerCase().includes(q)),
        )
        if (matched.length) matchedScales[scale] = matched
      }
      if (Object.keys(matchedScales).length) out[group] = matchedScales
    }
    return out
  }, [data, q])

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Fundamentos · Cores"
        title="Paleta de cores"
        titleAccent="viva e consistente."
        description="Tokens exportados direto do Figma. Clique em qualquer swatch para copiar o HEX, ou use os botões ao lado para copiar a variável CSS."
        meta={[
          { label: 'Tokens Figma', tone: 'brand' },
          { label: 'Dark-first', tone: 'info' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-surface-border bg-surface-raised/70 p-1 backdrop-blur">
              <Tooltip content="Tema escuro">
                <button
                  onClick={() => setTheme('dark')}
                  className={cn(
                    'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium transition',
                    theme === 'dark' ? 'bg-surface-elevated text-ink-50' : 'text-ink-400 hover:text-ink-200',
                  )}
                >
                  <DSIcon name="half-moon" size={13} /> Dark
                </button>
              </Tooltip>
              <Tooltip content="Tema claro">
                <button
                  onClick={() => setTheme('light')}
                  className={cn(
                    'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium transition',
                    theme === 'light' ? 'bg-surface-elevated text-ink-50' : 'text-ink-400 hover:text-ink-200',
                  )}
                >
                  <DSIcon name="sun" size={13} /> Light
                </button>
              </Tooltip>
            </div>
            <DownloadJsonButton resource="colors" />
          </div>
        }
      />

      <div className="mx-auto max-w-6xl px-8 py-10">
        {loading && <ShimmerGrid />}
        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-300">
            Erro ao carregar tokens: {error}
          </div>
        )}

        {filteredGroups && Object.entries(filteredGroups).map(([group, scales], gi) => (
          <section key={group} className="mb-12 animate-slide-up" style={{ animationDelay: `${gi * 50}ms` }}>
            <div className="mb-4 flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-ink-100">{group}</h3>
              <Badge size="sm">{Object.values(scales).flat().length} tokens</Badge>
            </div>

            <RadixLegend />

            <div className="space-y-8">
              {Object.entries(scales).map(([scale, tokens]) => (
                <div key={scale}>
                  <div className="mb-3 flex items-center gap-2">
                    <p className="text-sm font-semibold text-ink-200">{scale}</p>
                    <span className="text-[11px] text-ink-500">{tokens.length} variações · escala Radix 1–12</span>
                  </div>
                  <ScaleRow tokens={tokens} />
                </div>
              ))}
            </div>
          </section>
        ))}

        {filteredGroups && Object.keys(filteredGroups).length === 0 && !loading && (
          <div className="rounded-xl border border-dashed border-surface-border p-10 text-center">
            <p className="text-sm text-ink-400">Nenhum token encontrado para "{query}"</p>
          </div>
        )}

        <TokensJsonSection
          title="Tokens de cores em JSON"
          description="Estrutura completa para importar no seu pipeline. Inclui os temas Dark e Light, com cada step Radix (1–12) e seus HEX."
          filename="brmania-cores.tokens.json"
          resource="colors"
          loader={buildColorsJson}
        />
      </div>
    </div>
  )
}

// =========================================================
// Seção de JSON no rodapé das páginas de fundamentos
// =========================================================
function TokensJsonSection({
  title,
  description,
  filename,
  resource,
  loader,
}: {
  title: string
  description: string
  filename: string
  resource: 'colors' | 'typography' | 'spacing'
  loader: () => string | Promise<string>
}) {
  const [code, setCode] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    Promise.resolve(loader())
      .then((c) => { if (alive) setCode(c) })
      .catch((e) => { if (alive) setErr(String(e)) })
    return () => { alive = false }
  }, [loader])

  return (
    <section className="mt-16 border-t border-surface-border pt-10">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1 inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-raised/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            Handoff
          </p>
          <h3 className="font-display text-xl font-bold text-ink-50">{title}</h3>
          <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-ink-400">{description}</p>
        </div>
        <DownloadJsonButton resource={resource} />
      </div>

      {err && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-300">
          Erro: {err}
        </div>
      )}

      {!err && code === null && (
        <div className="h-[320px] animate-pulse rounded-lg border border-surface-border bg-surface-raised/40" />
      )}

      {!err && code !== null && (
        <CodeBlock language={`${filename}`} code={code} maxHeight={420} />
      )}
    </section>
  )
}

function RadixLegend() {
  const entries = Object.entries(RADIX_GROUP_META)
  return (
    <div className="mb-5 rounded-xl border border-surface-border bg-surface-raised/40 p-3">
      <div className="flex items-center gap-2 text-[11px] text-ink-400">
        <DSIcon name="information-circle" size={12} className="text-ink-300" />
        <span>
          Escala inspirada em{' '}
          <a
            href="https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale"
            target="_blank"
            rel="noreferrer"
            className="text-brand-300 underline-offset-2 hover:underline"
          >
            Radix Colors
          </a>{' '}— cada step tem um uso semântico. Passe o mouse em cada cor para ver o papel.
        </span>
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10.5px]">
        {entries.map(([k, meta]) => (
          <span key={k} className={cn('inline-flex items-center gap-1.5 font-medium', meta.color)}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
            {meta.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function ScaleRow({ tokens }: { tokens: ColorToken[] }) {
  // Ordena por step numérico e renderiza um card por step Radix (1..12).
  const byStep = new Map<string, ColorToken>()
  tokens.forEach((t) => byStep.set(String(t.step), t))
  const steps = ['1','2','3','4','5','6','7','8','9','10','11','12']

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
      {steps.map((step, i) => {
        const token = byStep.get(step)
        if (!token) return <EmptySwatch key={step} step={step} />
        return <SwatchCard key={token.path} token={token} step={step} index={i} />
      })}
    </div>
  )
}

function EmptySwatch({ step }: { step: string }) {
  const info = RADIX_STEPS[step]
  return (
    <div className="rounded-lg border border-dashed border-surface-border/70 bg-surface-raised/20 p-2 text-center">
      <p className="font-mono text-[11px] font-semibold text-ink-500">{step}</p>
      <p className="mt-1 text-[9.5px] leading-tight text-ink-500">{info?.title ?? '—'}</p>
    </div>
  )
}

function SwatchCard({ token, step, index }: { token: ColorToken; step: string; index: number }) {
  const fg = contrastOn(token.hex) === 'dark' ? 'text-ink-950' : 'text-ink-50'
  const cssVar = `--color-${token.group.toLowerCase()}-${token.scale.toLowerCase()}-${token.step}`
  const info = RADIX_STEPS[step]
  const groupMeta = info ? RADIX_GROUP_META[info.group] : null

  const trigger = (
    <SpotlightCard
      className="group/swatch relative overflow-hidden w-full cursor-pointer"
    >
      <motion.button
        type="button"
        onClick={() => copyToClipboard(token.hex, `Hex ${token.hex} copiado`)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="block w-full"
        aria-label={`Step ${step} — ${info?.title ?? token.hex}`}
      >
        <div
          className={cn(
            'relative aspect-square w-full flex flex-col justify-between px-2 py-2',
            fg,
          )}
          style={{ backgroundColor: token.hex }}
        >
          <div className="flex items-start justify-between">
            <span className="font-mono text-[13px] font-bold leading-none tabular-nums opacity-95 drop-shadow-sm">
              {step}
            </span>
            {groupMeta && (
              <span
                className="h-1.5 w-1.5 rounded-full opacity-70"
                style={{ background: 'currentColor' }}
                aria-hidden
              />
            )}
          </div>
          {/* brilho radial no hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/swatch:opacity-100"
               style={{ background: 'radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.18), transparent 60%)' }}
          />
        </div>
      </motion.button>
    </SpotlightCard>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.45), ease: [0.22, 0.9, 0.28, 1] }}
      className="relative"
    >
      <Popover
        side="auto"
        offset={16}
        maxWidth={260}
        estimatedHeight={320}
        triggerClassName="!flex w-full"
        trigger={trigger}
      >
        <div className="p-3.5">
          {/* Cabeçalho do popover */}
          <div className="mb-3 flex items-center gap-2">
            <span
              className="inline-flex h-6 w-6 items-center justify-center rounded-md font-mono text-[11px] font-bold ring-1 ring-white/10"
              style={{
                background: token.hex,
                color: contrastOn(token.hex) === 'dark' ? '#0B0B0F' : '#F7F7F8',
              }}
            >
              {step}
            </span>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-ink-50 leading-tight">
                {info?.title ?? 'Swatch'}
              </p>
              {groupMeta && (
                <p className={cn('text-[10px] font-medium uppercase tracking-wider leading-tight', groupMeta.color)}>
                  {groupMeta.label}
                </p>
              )}
            </div>
          </div>

          {/* Ilustração animada */}
          <div className="mb-3">
            <ColorIllustration step={step} hex={token.hex} />
          </div>

          {/* Explicação */}
          {info && (
            <p className="text-[11.5px] leading-snug text-ink-300">{info.use}</p>
          )}

          {/* Rodapé com hex */}
          <div className="mt-3 border-t border-surface-border/80 pt-2.5">
            <p className="font-mono text-[11px] text-ink-200 truncate">{token.hex}</p>
            <p className="font-mono text-[9.5px] text-ink-500 truncate">var({cssVar})</p>
          </div>

          <p className="mt-2 text-center text-[10px] text-ink-500">Clique no swatch para copiar o HEX</p>
        </div>
      </Popover>
    </motion.div>
  )
}

function ShimmerGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-lg border border-surface-border bg-[linear-gradient(110deg,#151520_0%,#1D1D28_50%,#151520_100%)] bg-[length:200%_100%] animate-shimmer"
        />
      ))}
    </div>
  )
}

// =========================================================
// Tipografia
// =========================================================
function TypographyDoc() {
  const scale = [
    { name: 'Display 72', font: "'Sora'",  size: 72, weight: 800, sample: 'Combustível de confiança' },
    { name: 'Display 56', font: "'Sora'",  size: 56, weight: 800, sample: 'Mania de Abastecer' },
    { name: 'Display 44', font: "'Sora'",  size: 44, weight: 800, sample: 'Encha o tanque do seu negócio' },
    { name: 'Heading 32', font: "'Sora'",  size: 32, weight: 700, sample: 'Painel de controle' },
    { name: 'Heading 24', font: "'Sora'",  size: 24, weight: 700, sample: 'Últimas transações' },
    { name: 'Heading 20', font: "'Sora'",  size: 20, weight: 600, sample: 'Meus webhooks' },
    { name: 'Body 16',    font: "'Inter'", size: 16, weight: 400, sample: 'Integre sua plataforma em minutos com nossa API robusta e escalável.' },
    { name: 'Body 14',    font: "'Inter'", size: 14, weight: 400, sample: 'Leia a documentação completa para mais detalhes sobre a implementação.' },
    { name: 'Caption 12', font: "'Inter'", size: 12, weight: 500, sample: 'AUXILIAR · LABEL · METADADOS' },
  ]

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Fundamentos · Tipografia"
        title="Escala tipográfica"
        titleAccent="com personalidade."
        description="Sora para display e headings. Inter para corpo e UI. JetBrains Mono para código e tokens. Clique em qualquer peso para copiar a declaração CSS."
        actions={<DownloadJsonButton resource="typography" />}
      />

      <div className="mx-auto max-w-6xl px-8 py-10">
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FontCard name="Sora" role="Display + Headings" weights="400, 600, 700, 800" sample="Aa" />
          <FontCard name="Inter" role="Body + UI" weights="400, 500, 600, 700" sample="Aa" />
          <FontCard name="JetBrains Mono" role="Código + Tokens" weights="400, 500, 600" sample="Aa" mono />
        </div>

        <div className="mb-10 space-y-4">
          {scale.map((s, i) => (
            <SpotlightCard
              key={s.name}
              className="animate-slide-up"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-sm font-semibold text-ink-100">{s.name}</p>
                    <Badge size="sm">{s.size}px · {s.weight}</Badge>
                    <Badge size="sm" tone="neutral">{s.font}</Badge>
                  </div>
                  <CopyButton
                    value={`font: ${s.weight} ${s.size}px/1.2 ${s.font}, sans-serif;`}
                    tooltip="Copiar declaração CSS"
                  />
                </div>
                <p
                  className="text-ink-50 leading-tight truncate"
                  style={{
                    fontFamily: s.font === "'Sora'" ? "'Sora', sans-serif" : "'Inter', sans-serif",
                    fontSize: s.size,
                    fontWeight: s.weight,
                  }}
                >
                  {s.sample}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <div>
          <h3 className="mb-3 font-display text-base font-semibold text-ink-100">Instalação</h3>
          <CodeBlock
            language="html"
            code={`<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">`}
          />
        </div>

        <TokensJsonSection
          title="Tokens de tipografia em JSON"
          description="Famílias, escala completa, pesos, line-heights e letter-spacing prontos para o seu sistema."
          filename="brmania-tipografia.tokens.json"
          resource="typography"
          loader={buildTypographyJson}
        />
      </div>
    </div>
  )
}

function FontCard({
  name, role, weights, sample, mono,
}: { name: string; role: string; weights: string; sample: string; mono?: boolean }) {
  return (
    <SpotlightCard className="p-5">
      <div
        className="text-5xl font-extrabold text-ink-50 leading-none mb-3"
        style={{ fontFamily: mono ? "'JetBrains Mono', monospace" : name === 'Sora' ? "'Sora', sans-serif" : "'Inter', sans-serif" }}
      >
        {sample}
      </div>
      <p className="font-display text-base font-bold text-ink-100">{name}</p>
      <p className="text-[12px] text-ink-400">{role}</p>
      <p className="mt-2 font-mono text-[11px] text-ink-500">Pesos: {weights}</p>
    </SpotlightCard>
  )
}

// =========================================================
// Espaçamento
// =========================================================
type SpacingToken = {
  name: string
  value: number
  usage: string
  example: 'gap' | 'padding' | 'stack' | 'section'
}

const SPACING_SCALE: SpacingToken[] = [
  { name: 'xs',  value: 4,  usage: 'Gap entre ícone e label; padding interno compacto.',           example: 'gap'     },
  { name: 'sm',  value: 8,  usage: 'Gap mínimo entre elementos relacionados.',                      example: 'gap'     },
  { name: 'md',  value: 12, usage: 'Padding horizontal de botões médios; gap em listas densas.',    example: 'padding' },
  { name: 'lg',  value: 16, usage: 'Padding padrão de cards; ritmo de leitura confortável.',        example: 'padding' },
  { name: 'xl',  value: 24, usage: 'Gap entre cards; padding interno de containers.',               example: 'stack'   },
  { name: '2xl', value: 32, usage: 'Gap entre grupos de componentes dentro da mesma seção.',        example: 'stack'   },
  { name: '3xl', value: 48, usage: 'Separação visual entre blocos/sections.',                        example: 'section' },
  { name: '4xl', value: 64, usage: 'Respiro entre grandes áreas; topo/rodapé de páginas.',           example: 'section' },
]

function SpacingDoc() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Fundamentos · Espaçamento"
        title="Escala de espaçamento"
        titleAccent="baseada em 4px."
        description="Múltiplos de 4px para ritmo visual consistente. Cada token mostra um exemplo do uso real — clique para copiar em px ou rem."
        actions={<DownloadJsonButton resource="spacing" />}
      />

      <div className="mx-auto max-w-6xl px-8 py-10">
        {/* Régua macro */}
        <SpacingRuler tokens={SPACING_SCALE} />

        {/* Cards detalhados */}
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {SPACING_SCALE.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 0.9, 0.28, 1] }}
            >
              <SpacingCard token={s} />
            </motion.div>
          ))}
        </div>

        <TokensJsonSection
          title="Tokens de espaçamento em JSON"
          description="Escala completa em px e rem, com nomes semânticos (xs…4xl) para o seu sistema."
          filename="brmania-espacamento.tokens.json"
          resource="spacing"
          loader={buildSpacingJson}
        />
      </div>
    </div>
  )
}

function SpacingRuler({ tokens }: { tokens: SpacingToken[] }) {
  const max = Math.max(...tokens.map((t) => t.value))
  return (
    <SpotlightCard className="overflow-hidden">
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="font-display text-base font-semibold text-ink-100">Régua visual</h3>
            <p className="text-[12px] text-ink-400">Proporção relativa de cada token.</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-surface-border bg-surface-raised/60 px-3 py-1 text-[11px] text-ink-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" /> Base · 4pt
          </div>
        </div>

        <div className="space-y-2.5">
          {tokens.map((t, i) => (
            <div key={t.name} className="flex items-center gap-3">
              <div className="w-14 shrink-0">
                <code className="font-mono text-[12.5px] font-semibold text-ink-100">{t.name}</code>
                <p className="font-mono text-[10px] text-ink-500 tabular-nums">{t.value}px</p>
              </div>
              <div className="relative h-5 flex-1 rounded bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:8px_100%]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(t.value / max) * 100}%` }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 0.9, 0.28, 1] }}
                  className="absolute inset-y-0 left-0 rounded bg-gradient-to-r from-brand-600/70 via-brand-500 to-brand-400 shadow-[0_0_20px_-4px_rgba(70,167,104,0.5)]"
                />
              </div>
              <span className="w-16 text-right font-mono text-[10.5px] text-ink-500 tabular-nums">
                {t.value / 16}rem
              </span>
            </div>
          ))}
        </div>
      </div>
    </SpotlightCard>
  )
}

function SpacingCard({ token }: { token: SpacingToken }) {
  return (
    <SpotlightCard className="overflow-hidden h-full">
      <div className="flex flex-col lg:flex-row">
        {/* Coluna de info */}
        <div className="flex-1 p-5">
          <div className="flex items-center gap-2">
            <code className="font-mono text-[15px] font-bold text-ink-50">{token.name}</code>
            <Badge size="sm" tone="brand">{token.value}px</Badge>
            <Badge size="sm">{token.value / 16}rem</Badge>
          </div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-ink-300">{token.usage}</p>
          <div className="mt-4 flex items-center gap-1.5">
            <CopyButton size="sm" value={`${token.value}px`} tooltip="Copiar px" />
            <CopyButton size="sm" value={`${token.value / 16}rem`} tooltip="Copiar rem" />
            <CopyButton size="sm" value={`space-${token.name}`} tooltip="Copiar token" />
          </div>
        </div>

        {/* Coluna de ilustração */}
        <div className="relative flex w-full items-center justify-center border-t border-surface-border bg-[#0A0A10] p-5 lg:w-[240px] lg:border-l lg:border-t-0">
          <SpacingPreview token={token} />
        </div>
      </div>
    </SpotlightCard>
  )
}

function SpacingPreview({ token }: { token: SpacingToken }) {
  const px = token.value
  switch (token.example) {
    case 'gap':
      return (
        <div className="flex w-full items-center justify-center">
          <Block />
          <Gap px={px} />
          <Block />
          <span className="sr-only">Gap de {px}px</span>
        </div>
      )
    case 'padding':
      return (
        <div className="flex flex-col items-center gap-2">
          <div
            className="relative rounded-lg border border-dashed border-brand-500/40 bg-brand-500/5"
            style={{ padding: px }}
          >
            <div className="rounded bg-surface-elevated px-3 py-1.5 text-[11px] font-medium text-ink-100">
              Conteúdo
            </div>
            <PaddingLabel px={px} />
          </div>
        </div>
      )
    case 'stack':
      return (
        <div className="flex w-full flex-col items-stretch">
          <StackRow />
          <Gap vertical px={px} />
          <StackRow />
          <Gap vertical px={px} />
          <StackRow />
        </div>
      )
    case 'section':
      return (
        <div className="flex w-full flex-col">
          <SectionRow title="Seção A" />
          <div className="relative" style={{ height: Math.min(px, 96) }}>
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-brand-500/40" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border border-brand-500/40 bg-brand-500/10 px-2 py-0.5 font-mono text-[10px] text-brand-300">
              {px}px
            </div>
          </div>
          <SectionRow title="Seção B" />
        </div>
      )
  }
}

function Block() {
  return (
    <div className="h-10 w-10 rounded-md bg-gradient-to-br from-surface-elevated to-surface-raised ring-1 ring-surface-border" />
  )
}

function Gap({ px, vertical }: { px: number; vertical?: boolean }) {
  const label = (
    <div className="flex items-center gap-1 rounded bg-surface-raised/90 px-1.5 py-0.5 font-mono text-[9.5px] text-brand-300 ring-1 ring-brand-500/30">
      {px}px
    </div>
  )
  if (vertical) {
    return (
      <div className="relative flex items-center justify-center" style={{ height: Math.min(px, 64) }}>
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-brand-500/40" />
        <div className="relative">{label}</div>
      </div>
    )
  }
  return (
    <div className="relative flex items-center" style={{ width: Math.max(px, 16) }}>
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-brand-500/40" />
      <div className="relative mx-auto">{label}</div>
    </div>
  )
}

function PaddingLabel({ px }: { px: number }) {
  return (
    <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded bg-surface-raised/90 px-1.5 font-mono text-[9.5px] text-brand-300 ring-1 ring-brand-500/30">
      padding · {px}px
    </span>
  )
}

function StackRow() {
  return (
    <div className="flex items-center gap-2 rounded-md border border-surface-border bg-surface-elevated px-2.5 py-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
      <span className="h-2 w-16 rounded bg-white/10" />
      <span className="ml-auto h-2 w-6 rounded bg-white/10" />
    </div>
  )
}

function SectionRow({ title }: { title: string }) {
  return (
    <div className="rounded-md border border-surface-border bg-surface-raised px-3 py-2">
      <p className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">{title}</p>
      <div className="mt-1 h-1.5 w-20 rounded bg-white/10" />
    </div>
  )
}
