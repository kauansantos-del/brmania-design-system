import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import { AnimatePresence, motion } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { Sidebar } from '@/components/layout/Sidebar'
import { ComponentsPage } from '@/pages/ComponentsPage'
import { DocumentationPage } from '@/pages/DocumentationPage'
import { GalleryPage } from '@/pages/GalleryPage'
import { sections, type SectionKey } from '@/data/navigation'

const STORAGE_KEY = 'brmania-ds-nav'

type NavState = { section: SectionKey; sub: string }

function parseHash(): Partial<NavState> {
  const h = location.hash.replace('#', '')
  if (!h) return {}
  const [section, sub] = h.split('/') as [SectionKey, string | undefined]
  if (!sections[section]) return {}
  return { section, sub: sub || sections[section].defaultSub }
}

function loadStored(): Partial<NavState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (parsed.section && sections[parsed.section as SectionKey]) {
      return {
        section: parsed.section,
        sub: parsed.sub || sections[parsed.section as SectionKey].defaultSub,
      }
    }
  } catch {}
  return {}
}

export default function App() {
  const initial: NavState = (() => {
    const fromHash = parseHash()
    const fromStore = loadStored()
    const section = fromHash.section || fromStore.section || 'componentes'
    const sub = fromHash.sub || fromStore.sub || sections[section].defaultSub
    return { section, sub }
  })()

  const [nav, setNav] = useState<NavState>(initial)
  const [query, setQuery] = useState('')

  const setSection = (s: SectionKey) => {
    setNav({ section: s, sub: sections[s].defaultSub })
    setQuery('')
  }
  const setSub = (sub: string) => setNav((n) => ({ ...n, sub }))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nav))
    const hash = `#${nav.section}/${nav.sub}`
    if (location.hash !== hash) history.replaceState(null, '', hash)
    // scroll to top on sub/section change
    const main = document.getElementById('ds-main')
    if (main) main.scrollTop = 0
  }, [nav])

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-surface text-ink-100">
      <TopBar
        section={nav.section}
        onSectionChange={setSection}
        query={query}
        onQueryChange={setQuery}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          section={nav.section}
          sub={nav.sub}
          onSubChange={setSub}
          query={query}
        />

        <main id="ds-main" className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${nav.section}/${nav.sub}`}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.22, 0.9, 0.28, 1] }}
            >
              {nav.section === 'componentes' && <ComponentsPage sub={nav.sub} query={query} />}
              {nav.section === 'documentacao' && <DocumentationPage sub={nav.sub} query={query} />}
              {nav.section === 'galeria' && <GalleryPage sub={nav.sub} query={query} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#121218',
            border: '1px solid #25252E',
            color: '#EEEEEF',
          },
        }}
      />
    </div>
  )
}
