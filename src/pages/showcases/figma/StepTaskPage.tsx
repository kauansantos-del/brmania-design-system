import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { StepTask } from '@/components/brmania'

const CONTROLS: PropControl[] = [
  { kind: 'text', key: 'title',       label: 'Título',    default: 'Gerar credenciais da API' },
  { kind: 'text', key: 'description', label: 'Descrição', default: 'Crie o Client ID e o Client Secret para autenticar chamadas' },
  { kind: 'select', key: 'icon', label: 'Ícone', default: 'smart-key',
    options: [
      { value: 'rotate-lock',   label: 'Credenciais (rotate-lock)' },
      { value: 'usb',           label: 'Webhook (usb)' },
      { value: 'document-text', label: 'Requisição (document-text)' },
      { value: 'user',       label: 'Membros (user)' },
    ],
  },
  {
    kind: 'toggle', key: 'done', label: 'Concluído', default: false,
  },
]

const ALL_STEPS = [
  { step: 1, title: 'Gerar credenciais da API',      description: 'Crie o Client ID e o Client Secret para autenticar chamadas', icon: 'rotate-lock',   done: false },
  { step: 2, title: 'Cadastrar seu primeiro webhook', description: 'Informe uma URL HTTPS e escolha os eventos que ela recebe',   icon: 'usb',           done: false },
  { step: 3, title: 'Enviar uma requisição de teste', description: 'Use o curl da tela de credenciais para validar',              icon: 'document-text', done: false },
  { step: 4, title: 'Convidar membros do time',       description: 'Adicione admins e viewers ao portal — opcional',             icon: 'user',       done: false },
]

const ALL_STEPS_PARTIAL = ALL_STEPS.map((s, i) => ({ ...s, done: i < 2 }))

export function StepTaskPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Dados"
        title="StepTask"
        titleAccent="— checklist numerado."
        description="Linha de tarefa de onboarding. done=true substitui o ícone da direita pelo checkmark do Checkbox. Figma 96:2906."
        meta={[
          { label: 'done / pending', tone: 'info' },
          { label: 'Figma 96:2906', tone: 'neutral' },
        ]}
      />
      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="StepTask"
          description="Uma linha por etapa. Clique para navegar até a etapa."
          controls={CONTROLS}
          renderPreview={(s) => (
            <StepTask
              step={1}
              title={s.title as string}
              description={s.description as string}
              icon={s.icon as string}
              done={s.done as boolean}
            />
          )}
          generateCode={(s) => `<StepTask
  step={1}
  title="${s.title}"
  description="${s.description}"
  icon="${s.icon}"
  done={${s.done}}
/>`}
          renderAll={() => (
            <div className="w-full overflow-hidden rounded-lg border border-[#d7dad8]">
              {ALL_STEPS_PARTIAL.map((st) => (
                <StepTask key={st.step} {...st} />
              ))}
            </div>
          )}
          generateAllCode={() => `const steps = [
  { step: 1, title: 'Gerar credenciais da API',       description: '…', icon: 'rotate-lock',   done: true  },
  { step: 2, title: 'Cadastrar seu primeiro webhook',  description: '…', icon: 'usb',           done: true  },
  { step: 3, title: 'Enviar uma requisição de teste',  description: '…', icon: 'document-text', done: false },
  { step: 4, title: 'Convidar membros do time',        description: '…', icon: 'user',       done: false },
]

steps.map((s) => <StepTask key={s.step} {...s} />)`}
        />
      </div>
    </div>
  )
}
