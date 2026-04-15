import { cn } from '@/lib/cn'
import { CopyButton } from './CopyButton'

export function CodeBlock({
  code,
  language = 'tsx',
  className,
  maxHeight = 360,
}: {
  code: string
  language?: string
  className?: string
  maxHeight?: number
}) {
  return (
    <div className={cn('code-surface group relative overflow-hidden rounded-lg', className)}>
      <div className="flex items-center justify-between border-b border-surface-border px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-ink-400">
            {language}
          </span>
        </div>
        <CopyButton value={code} label="Código copiado" tooltip="Copiar código" />
      </div>
      <pre
        className="font-mono text-[12.5px] leading-relaxed text-ink-200 overflow-auto px-4 py-3"
        style={{ maxHeight }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
