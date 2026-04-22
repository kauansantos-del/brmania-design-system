import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { EventOptionCard } from '@/components/brmania'

const CONTROLS: PropControl[] = [
  { kind: 'text',   key: 'title',       label: 'Título',    default: 'Order.select' },
  { kind: 'text',   key: 'description', label: 'Descrição', default: 'Quando um novo pedido é criado' },
  { kind: 'toggle', key: 'selected',    label: 'Selected',  default: false },
]

const EVENTS = [
  { id: 'order.select',  title: 'Order.select',  description: 'Quando um novo pedido é criado' },
  { id: 'order.update',  title: 'Order.update',  description: 'Quando um pedido é atualizado' },
  { id: 'order.cancel',  title: 'Order.cancel',  description: 'Quando um pedido é cancelado' },
  { id: 'payment.paid',  title: 'Payment.paid',  description: 'Quando um pagamento é confirmado' },
]

export function EventOptionCardPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Dados"
        title="EventOptionCard"
        titleAccent="— opção com checkbox."
        description="Card selecionável grande para escolher eventos, permissões ou qualquer boolean escopado. Figma 111:129416."
        meta={[
          { label: '3 estados', tone: 'info' },
          { label: 'role="checkbox"', tone: 'success' },
          { label: 'Figma 111:129416', tone: 'neutral' },
        ]}
      />
      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="EventOptionCard"
          description="Toggle múltipla — cada card pode ser selecionado independentemente."
          controls={CONTROLS}
          renderPreview={(s) => (
            <div className="w-[420px]">
              <EventOptionCard
                title={s.title as string}
                description={s.description as string}
                selected={!!s.selected}
              />
            </div>
          )}
          generateCode={(s) => `<EventOptionCard
  title="${s.title}"
  description="${s.description}"${s.selected ? '\n  selected' : ''}
/>`}
          renderAll={() => <Gallery />}
          generateAllCode={() => `const [selected, setSelected] = useState<Set<string>>(new Set())

events.map((e) => (
  <EventOptionCard
    key={e.id}
    title={e.title}
    description={e.description}
    selected={selected.has(e.id)}
    onClick={() => toggle(e.id)}
  />
))`}
        />
      </div>
    </div>
  )
}

function Gallery() {
  const [sel, setSel] = useState<Set<string>>(new Set(['order.select']))
  const toggle = (id: string) =>
    setSel((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  return (
    <div className="flex w-[420px] flex-col gap-2">
      {EVENTS.map((e) => (
        <EventOptionCard
          key={e.id}
          title={e.title}
          description={e.description}
          selected={sel.has(e.id)}
          onClick={() => toggle(e.id)}
        />
      ))}
    </div>
  )
}
