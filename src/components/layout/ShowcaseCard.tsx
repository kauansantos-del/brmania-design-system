import { useState, type ReactNode } from 'react'
import { Code2, Eye, Info } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/Badge'
import { Tooltip } from '@/components/ui/Tooltip'
import { CodeBlock } from '@/components/ui/CodeBlock'

export function ShowcaseCard({
  id,
  name,
  description,
  status = 'stable',
  imports,
  propsDoc,
  code,
  children,
}: {
  id: string
  name: string
  description: string
  status?: 'stable' | 'beta' | 'alpha'
  imports?: string
  propsDoc?: { name: string; type: string; default?: string; description: string }[]
  code: string
  children: ReactNode
}) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const statusTone = status === 'stable' ? 'success' : status === 'beta' ? 'warning' : 'info'

  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-bold text-ink-50">{name}</h2>
            <Badge tone={statusTone as any} dot>
              {status === 'stable' ? 'Estável' : status === 'beta' ? 'Beta' : 'Alpha'}
            </Badge>
          </div>
          <p className="mt-1 text-[13.5px] text-ink-300 max-w-2xl">{description}</p>
        </div>
        {imports && (
          <Tooltip content="Caminho de import do componente" side="left">
            <code className="hidden md:inline-flex items-center gap-1.5 rounded-md border border-surface-border bg-surface-raised px-2.5 py-1.5 font-mono text-[11.5px] text-ink-300">
              <Info size={12} />
              {imports}
            </code>
          </Tooltip>
        )}
      </div>

      <div className="rounded-xl border border-surface-border bg-surface-raised overflow-hidden">
        {/* Tabs header */}
        <div className="flex items-center justify-between border-b border-surface-border bg-surface/50 px-3 py-2">
          <div className="flex items-center gap-1">
            <TabButton active={tab === 'preview'} onClick={() => setTab('preview')} icon={<Eye size={13} />}>
              Preview
            </TabButton>
            <TabButton active={tab === 'code'} onClick={() => setTab('code')} icon={<Code2 size={13} />}>
              Código
            </TabButton>
          </div>
          <a
            href={`#${id}`}
            className="text-[11px] text-ink-500 hover:text-ink-300 transition"
          >
            #{id}
          </a>
        </div>

        {/* Preview */}
        {tab === 'preview' && (
          <div className="bg-grid p-8 min-h-[180px] flex items-center justify-center flex-wrap gap-4">
            {children}
          </div>
        )}

        {/* Code */}
        {tab === 'code' && (
          <div className="p-4 bg-surface/60">
            <CodeBlock code={code} language="tsx" />
          </div>
        )}
      </div>

      {/* Props table */}
      {propsDoc && propsDoc.length > 0 && (
        <div className="mt-5 overflow-hidden rounded-xl border border-surface-border">
          <div className="border-b border-surface-border bg-surface-raised px-4 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">Props</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-surface-border bg-surface/50 text-left text-ink-400">
                  <th className="px-4 py-2 font-medium">Nome</th>
                  <th className="px-4 py-2 font-medium">Tipo</th>
                  <th className="px-4 py-2 font-medium">Default</th>
                  <th className="px-4 py-2 font-medium">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {propsDoc.map((p) => (
                  <tr key={p.name} className="border-b border-surface-border last:border-0 hover:bg-surface/40">
                    <td className="px-4 py-2.5 font-mono text-[12.5px] text-ink-100">{p.name}</td>
                    <td className="px-4 py-2.5">
                      <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[12px] text-brand-300">
                        {p.type}
                      </code>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[12px] text-ink-400">
                      {p.default ?? '—'}
                    </td>
                    <td className="px-4 py-2.5 text-ink-300">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] font-medium transition',
        active ? 'bg-surface-elevated text-ink-50' : 'text-ink-400 hover:text-ink-200',
      )}
    >
      {icon}
      {children}
    </button>
  )
}
