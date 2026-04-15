import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

export function LazyImage({
  src,
  alt,
  className,
  onLoad,
}: {
  src: string
  alt: string
  className?: string
  onLoad?: () => void
}) {
  const ref = useRef<HTMLImageElement>(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true)
            io.disconnect()
            break
          }
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        !loaded && 'bg-[linear-gradient(110deg,#151520_0%,#1D1D28_50%,#151520_100%)] bg-[length:200%_100%] animate-shimmer',
        className,
      )}
    >
      <img
        ref={ref}
        src={visible ? src : undefined}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => { setLoaded(true); onLoad?.() }}
        className={cn(
          'block h-full w-full object-cover transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )
}
