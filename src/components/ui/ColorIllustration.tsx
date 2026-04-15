import { motion } from 'framer-motion'
import { DSIcon } from '@/components/brmania'
import { contrastOn } from '@/lib/tokens'

/**
 * Pequenas ilustrações que mostram o uso de cada step Radix.
 * Cada ilustração recebe o hex do swatch e renderiza uma mini-cena.
 */
export function ColorIllustration({ step, hex }: { step: string; hex: string }) {
  const fg = contrastOn(hex) === 'dark' ? '#0B0B0F' : '#F7F7F8'
  switch (step) {
    case '1':  return <IllAppBackground hex={hex} />
    case '2':  return <IllSubtleBackground hex={hex} />
    case '3':  return <IllUIElement hex={hex} fg={fg} />
    case '4':  return <IllHoveredUI hex={hex} fg={fg} />
    case '5':  return <IllActiveUI hex={hex} fg={fg} />
    case '6':  return <IllBorders hex={hex} />
    case '7':  return <IllElementBorder hex={hex} />
    case '8':  return <IllFocusRing hex={hex} />
    case '9':  return <IllSolidBg hex={hex} fg={fg} />
    case '10': return <IllSolidHover hex={hex} fg={fg} />
    case '11': return <IllLowContrastText hex={hex} />
    case '12': return <IllHighContrastText hex={hex} />
    default:   return <IllGeneric hex={hex} />
  }
}

// ---------- Frame base ----------
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-24 w-full overflow-hidden rounded-lg border border-surface-border bg-[#0B0B0F]">
      {children}
    </div>
  )
}

// ---------- 1. App background ----------
function IllAppBackground({ hex }: { hex: string }) {
  return (
    <Frame>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0"
        style={{ background: hex }}
      />
      <div className="absolute left-0 right-0 top-0 h-4 border-b border-white/10 bg-black/30 px-2 flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
      </div>
      <motion.div
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.35 }}
        className="absolute left-4 top-7 h-2.5 w-16 rounded bg-white/15"
      />
      <motion.div
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className="absolute left-4 top-12 h-1.5 w-24 rounded bg-white/8"
      />
      <motion.div
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.35 }}
        className="absolute left-4 top-16 h-1.5 w-20 rounded bg-white/8"
      />
    </Frame>
  )
}

// ---------- 2. Subtle background ----------
function IllSubtleBackground({ hex }: { hex: string }) {
  return (
    <Frame>
      <div className="absolute inset-0 bg-[#0B0B0F]" />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-x-4 inset-y-3 rounded-md border border-white/5"
        style={{ background: hex }}
      >
        <div className="p-2">
          <div className="h-1.5 w-12 rounded bg-white/20" />
          <div className="mt-1.5 h-1.5 w-20 rounded bg-white/8" />
          <div className="mt-1 h-1.5 w-16 rounded bg-white/8" />
        </div>
      </motion.div>
    </Frame>
  )
}

// ---------- 3. UI element ----------
function IllUIElement({ hex, fg }: { hex: string; fg: string }) {
  return (
    <Frame>
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex h-7 items-center gap-2 rounded-md px-3 text-[10.5px] font-semibold"
          style={{ background: hex, color: fg }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: fg, opacity: 0.6 }} />
          Button
        </motion.div>
      </div>
    </Frame>
  )
}

// ---------- 4. Hovered UI ----------
function IllHoveredUI({ hex, fg }: { hex: string; fg: string }) {
  return (
    <Frame>
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="relative flex h-7 items-center gap-2 rounded-md px-3 text-[10.5px] font-semibold shadow-[0_0_0_2px_rgba(255,255,255,0.05)]"
          style={{ background: hex, color: fg }}
        >
          Hover
          <motion.span
            animate={{ x: [0, 2, 0], y: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-2 -right-2"
          >
            <DSIcon name="input-cursor-move" size={12} className="text-white/90 drop-shadow" />
          </motion.span>
        </motion.div>
      </div>
    </Frame>
  )
}

// ---------- 5. Active / Selected ----------
function IllActiveUI({ hex, fg }: { hex: string; fg: string }) {
  return (
    <Frame>
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: [0.96, 1.02, 0.98, 1], opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="flex h-7 items-center gap-2 rounded-md px-3 text-[10.5px] font-semibold ring-1 ring-white/15"
          style={{ background: hex, color: fg }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
          Selected
        </motion.div>
      </div>
    </Frame>
  )
}

// ---------- 6. Subtle borders & separators ----------
function IllBorders({ hex }: { hex: string }) {
  return (
    <Frame>
      <div className="absolute inset-0 bg-[#0B0B0F]" />
      <div className="absolute left-4 right-4 top-3">
        <div className="h-1.5 w-16 rounded bg-white/25" />
        <div className="mt-1.5 h-1 w-24 rounded bg-white/10" />
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="absolute left-4 right-4 top-10 h-px origin-left"
        style={{ background: hex }}
      />
      <div className="absolute left-4 right-4 top-12">
        <div className="h-1 w-20 rounded bg-white/10" />
        <div className="mt-1.5 h-1 w-28 rounded bg-white/10" />
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.55, delay: 0.25 }}
        className="absolute left-4 right-4 bottom-3 h-px origin-left"
        style={{ background: hex }}
      />
    </Frame>
  )
}

// ---------- 7. UI element border ----------
function IllElementBorder({ hex }: { hex: string }) {
  return (
    <Frame>
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex h-7 w-36 items-center rounded-md bg-[#0F0F14] px-2 text-[10.5px]"
          style={{ border: `1px solid ${hex}` }}
        >
          <span className="text-white/50">Your input…</span>
        </motion.div>
      </div>
    </Frame>
  )
}

// ---------- 8. Hovered border / focus ring ----------
function IllFocusRing({ hex }: { hex: string }) {
  return (
    <Frame>
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative flex h-7 w-36 items-center rounded-md bg-[#0F0F14] px-2 text-[10.5px]"
          style={{ border: `1px solid ${hex}` }}
        >
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.25, 0.9, 0.25] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-[3px] rounded-md"
            style={{ boxShadow: `0 0 0 3px ${hex}66` }}
          />
          <span className="relative text-white/75">Focused…</span>
          <span className="relative ml-1 h-3 w-px bg-white/60 animate-pulse" />
        </motion.div>
      </div>
    </Frame>
  )
}

// ---------- 9. Solid backgrounds ----------
function IllSolidBg({ hex, fg }: { hex: string; fg: string }) {
  return (
    <Frame>
      <div className="absolute inset-0 grid place-items-center">
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex h-8 items-center gap-2 rounded-md px-4 text-[11px] font-bold shadow-lg"
          style={{ background: hex, color: fg }}
        >
          Call to Action
          <span style={{ color: fg }}>→</span>
        </motion.button>
      </div>
    </Frame>
  )
}

// ---------- 10. Hovered solid ----------
function IllSolidHover({ hex, fg }: { hex: string; fg: string }) {
  return (
    <Frame>
      <div className="absolute inset-0 grid place-items-center">
        <motion.button
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: [1, 1.04, 1], opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex h-8 items-center gap-2 rounded-md px-4 text-[11px] font-bold"
          style={{
            background: hex,
            color: fg,
            boxShadow: `0 8px 24px -8px ${hex}88`,
          }}
        >
          Hovered CTA
          <span>→</span>
          <DSIcon name="input-cursor-move" size={12} className="absolute -bottom-2 -right-2 text-white/90 drop-shadow" />
        </motion.button>
      </div>
    </Frame>
  )
}

// ---------- 11. Low-contrast text ----------
function IllLowContrastText({ hex }: { hex: string }) {
  return (
    <Frame>
      <div className="absolute inset-0 flex flex-col justify-center gap-1 px-4">
        <p className="text-[10px] font-semibold text-white/90">Título principal</p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-[9.5px] leading-snug"
          style={{ color: hex }}
        >
          Texto secundário, legendas e metadados usam este tom.
        </motion.p>
      </div>
    </Frame>
  )
}

// ---------- 12. High-contrast text ----------
function IllHighContrastText({ hex }: { hex: string }) {
  return (
    <Frame>
      <div className="absolute inset-0 flex flex-col justify-center gap-1 px-4">
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[13px] font-extrabold tracking-tight"
          style={{ color: hex }}
        >
          Texto principal
        </motion.p>
        <p className="text-[9.5px] text-white/40">Para leitura crítica e headings.</p>
      </div>
    </Frame>
  )
}

function IllGeneric({ hex }: { hex: string }) {
  return (
    <Frame>
      <div className="absolute inset-0" style={{ background: hex }} />
    </Frame>
  )
}
