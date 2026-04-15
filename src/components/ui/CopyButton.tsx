import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/cn'
import { copyToClipboard } from '@/lib/clipboard'
import { Tooltip } from './Tooltip'

export function CopyButton({
  value,
  label = 'Copiar',
  tooltip,
  className,
  size = 'sm',
}: {
  value: string
  label?: string
  tooltip?: string
  className?: string
  size?: 'xs' | 'sm' | 'md'
}) {
  const [copied, setCopied] = useState(false)
  const handle = async () => {
    const ok = await copyToClipboard(value, label)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    }
  }

  const sizes = {
    xs: 'h-6 w-6 rounded-md',
    sm: 'h-7 w-7 rounded-md',
    md: 'h-8 w-8 rounded-md',
  }
  const icon = size === 'xs' ? 12 : size === 'sm' ? 14 : 16

  return (
    <Tooltip content={tooltip || (copied ? 'Copiado!' : 'Copiar')}>
      <button
        type="button"
        onClick={handle}
        aria-label={tooltip || 'Copiar'}
        className={cn(
          'inline-flex items-center justify-center border border-transparent',
          'text-ink-300 hover:text-ink-100 hover:bg-surface-elevated',
          'transition active:scale-95',
          copied && 'text-emerald-400',
          sizes[size],
          className,
        )}
      >
        {copied ? <Check size={icon} /> : <Copy size={icon} />}
      </button>
    </Tooltip>
  )
}
