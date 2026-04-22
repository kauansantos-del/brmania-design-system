import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { Pagination } from '@/components/brmania'

const CONTROLS: PropControl[] = [
  {
    kind: 'select', key: 'count', label: 'Total de páginas', default: '8',
    options: [
      { value: '3', label: '3 páginas' },
      { value: '5', label: '5 páginas' },
      { value: '8', label: '8 páginas' },
      { value: '12', label: '12 páginas' },
    ],
  },
]

export function PaginationPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Navegação"
        title="Pagination"
        titleAccent="— controle numerado."
        description="Paginação numerada com chevron prev/next. Cada número é um PageButton (3 estados). Figma 115:160887 + 115:160880."
        meta={[
          { label: 'Atom: PageButton', tone: 'info' },
          { label: 'aria-current', tone: 'success' },
          { label: 'Figma 115:160887', tone: 'neutral' },
        ]}
      />
      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="Pagination"
          description="Clique nos números ou nos chevrons pra mudar de página."
          controls={CONTROLS}
          renderPreview={(s) => <Interactive count={Number(s.count)} />}
          generateCode={(s) => `<Pagination
  count={${s.count}}
  page={page}
  onPageChange={setPage}
/>`}
        />
      </div>
    </div>
  )
}

function Interactive({ count }: { count: number }) {
  const [page, setPage] = useState(1)
  return <Pagination count={count} page={Math.min(page, count)} onPageChange={setPage} />
}
