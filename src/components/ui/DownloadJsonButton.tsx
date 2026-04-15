import { useState } from 'react'
import { Download, Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { downloadResource, type DSResource } from '@/lib/downloads'

const LABELS: Record<DSResource, string> = {
  colors:     'cores.json',
  typography: 'tipografia.json',
  spacing:    'espacamento.json',
  all:        'design-system.json',
}

/**
 * Botão de "download rápido" usado no header das páginas de fundamentos.
 * Gera o JSON estruturado do recurso escolhido e entrega como arquivo.
 */
export function DownloadJsonButton({
  resource,
  tone = 'brand',
  className,
}: {
  resource: DSResource
  tone?: 'brand' | 'neutral'
  className?: string
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  const onClick = async () => {
    if (status === 'loading') return
    setStatus('loading')
    try {
      await downloadResource(resource)
      toast.success(`Download iniciado — ${LABELS[resource]}`)
      setStatus('done')
      setTimeout(() => setStatus('idle'), 1600)
    } catch (e) {
      toast.error(`Falha ao gerar ${LABELS[resource]}`)
      setStatus('idle')
    }
  }

  const toneCls =
    tone === 'brand'
      ? 'bg-brand-500/10 border-brand-500/30 text-brand-300 hover:bg-brand-500/15 hover:border-brand-500/50'
      : 'bg-surface-raised/70 border-surface-border text-ink-200 hover:bg-surface-elevated'

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-[12.5px] font-semibold transition',
        toneCls,
        className,
      )}
      aria-label={`Baixar ${LABELS[resource]}`}
    >
      {status === 'loading' ? (
        <Loader2 size={14} className="animate-spin" />
      ) : status === 'done' ? (
        <Check size={14} />
      ) : (
        <Download size={14} />
      )}
      <span className="font-mono text-[11.5px] tabular-nums">{LABELS[resource]}</span>
    </motion.button>
  )
}
