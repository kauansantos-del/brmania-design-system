import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

export type DSIconStyle = 'outline' | 'solid' | 'bulk'

export interface DSIconProps {
  name: string
  style?: DSIconStyle
  size?: number
  className?: string
  'aria-label'?: string
  'aria-hidden'?: boolean
}

type CacheEntry = { markup: string | null; promise?: Promise<string | null> }
const cache = new Map<string, CacheEntry>()

let manifestLoading: Promise<Map<string, string>> | null = null
let manifestIndex: Map<string, string> | null = null

function ensureManifest(): Promise<Map<string, string>> {
  if (manifestIndex) return Promise.resolve(manifestIndex)
  if (manifestLoading) return manifestLoading
  manifestLoading = fetch('/icons/manifest.json')
    .then((r) => r.json())
    .then((json: { icons: { style: string; slug: string; file: string }[] }) => {
      const idx = new Map<string, string>()
      for (const it of json.icons) idx.set(`${it.style}/${it.slug}`, it.file)
      manifestIndex = idx
      return idx
    })
    .catch(() => new Map())
  return manifestLoading
}

async function loadIcon(style: DSIconStyle, name: string): Promise<string | null> {
  const key = `${style}/${name}`
  const hit = cache.get(key)
  if (hit) return hit.promise ? await hit.promise : hit.markup

  const promise = (async () => {
    const idx = await ensureManifest()
    const file = idx.get(key)
    if (!file) return null
    const res = await fetch(`/icons/${style}/${file}`)
    if (!res.ok) return null
    const raw = await res.text()
    // Normaliza: remove width/height fixos pra o CSS controlar, garante currentColor como fallback.
    const normalized = raw
      .replace(/<svg([^>]*)\swidth="[^"]*"/, '<svg$1')
      .replace(/<svg([^>]*)\sheight="[^"]*"/, '<svg$1')
    return normalized
  })()

  cache.set(key, { markup: null, promise })
  const markup = await promise
  cache.set(key, { markup })
  return markup
}

export function DSIcon({
  name, style = 'outline', size = 16, className,
  'aria-label': ariaLabel, 'aria-hidden': ariaHidden = !ariaLabel,
}: DSIconProps) {
  const [markup, setMarkup] = useState<string | null>(() => {
    const hit = cache.get(`${style}/${name}`)
    return hit && !hit.promise ? hit.markup : null
  })

  useEffect(() => {
    let alive = true
    const hit = cache.get(`${style}/${name}`)
    if (hit && !hit.promise) { setMarkup(hit.markup); return }
    loadIcon(style, name).then((m) => { if (alive) setMarkup(m) })
    return () => { alive = false }
  }, [style, name])

  return (
    <span
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      className={cn('inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full', className)}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={markup ? { __html: markup } : undefined}
    />
  )
}
