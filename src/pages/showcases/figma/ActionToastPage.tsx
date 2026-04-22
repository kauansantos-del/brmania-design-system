import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { ActionToast, type ToastTone } from '@/components/brmania'

const TONES: { value: ToastTone; label: string }[] = [
  { value: 'success',  label: 'Success' },
  { value: 'danger',   label: 'Danger' },
  { value: 'info',     label: 'Info' },
  { value: 'download', label: 'Download' },
  { value: 'pending',  label: 'Pending' },
]

const CONTROLS: PropControl[] = [
  { kind: 'select', key: 'tone', label: 'Tom', default: 'success', options: TONES },
  { kind: 'text',   key: 'title',       label: 'Título',     default: 'Item excluído' },
  { kind: 'text',   key: 'description', label: 'Descrição',  default: 'Item excluído' },
  { kind: 'text',   key: 'actionLabel', label: 'Ação',       default: 'Desfazer' },
]

export function ActionToastPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Feedback"
        title="ActionToast"
        titleAccent="— notificação com ação."
        description="Toast horizontal com ícone + título + descrição + botão (ex.: 'Desfazer'). 5 tons semânticos. Figma 176:51949."
        meta={[
          { label: '5 tons', tone: 'brand' },
          { label: 'aria-live', tone: 'success' },
          { label: 'Figma 176:51949', tone: 'neutral' },
        ]}
      />
      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="ActionToast"
          description="Um toast estático pra preview. Em produção, use dentro de um Toaster com queue."
          controls={CONTROLS}
          renderPreview={(s) => (
            <ActionToast
              tone={s.tone as ToastTone}
              title={s.title as string}
              description={s.description as string}
              actionLabel={s.actionLabel as string}
            />
          )}
          generateCode={(s) => `<ActionToast
  tone="${s.tone}"
  title="${s.title}"
  description="${s.description}"
  actionLabel="${s.actionLabel}"
  onAction={() => undo()}
/>`}
          renderAll={() => (
            <div className="flex w-full max-w-md flex-col gap-3">
              {TONES.map((t) => (
                <ActionToast
                  key={t.value}
                  tone={t.value}
                  title="Item excluído"
                  description="Item excluído"
                />
              ))}
            </div>
          )}
          generateAllCode={() => `(['success','danger','info','download','pending'] as const).map((t) => (
  <ActionToast key={t} tone={t} title="Item excluído" description="Item excluído" />
))`}
        />
      </div>
    </div>
  )
}
