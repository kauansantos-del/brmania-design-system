import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { StepTask, type StepTaskStatus } from '@/components/brmania'

const CONTROLS: PropControl[] = [
  { kind: 'text', key: 'title',       label: 'Título',    default: 'Gerar credenciais da API' },
  { kind: 'text', key: 'description', label: 'Descrição', default: 'Crie o Client ID e o Client Secret para autenticar chamadas' },
  {
    kind: 'select', key: 'status', label: 'Status', default: 'pending',
    options: [
      { value: 'pending', label: 'Pendente' },
      { value: 'success', label: 'Concluída' },
      { value: 'done',    label: 'Resolvida (dark)' },
    ],
  },
]

const ALL_STEPS = [
  { step: 1, title: 'Gerar credenciais da API',   description: 'Crie o Client ID e o Client Secret para autenticar chamadas' },
  { step: 2, title: 'Cadastrar seu primeiro webhook', description: 'Informe uma URL HTTPS e escolha os eventos que vai receber' },
  { step: 3, title: 'Enviar uma requisição de teste', description: 'Use o curl da tela de credenciais para validar' },
  { step: 4, title: 'Convidar membros do time', description: 'Adicione admins e viewers ao portal — opcional' },
]

export function StepTaskPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Dados"
        title="StepTask"
        titleAccent="— checklist numerado."
        description="Linha de tarefa de onboarding com status visual (pending/success/done). Figma 96:2909."
        meta={[
          { label: '3 estados', tone: 'info' },
          { label: 'Figma 96:2909', tone: 'neutral' },
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
              status={s.status as StepTaskStatus}
            />
          )}
          generateCode={(s) => `<StepTask
  step={1}
  title="${s.title}"
  description="${s.description}"
  status="${s.status}"
/>`}
          renderAll={() => (
            <div className="flex w-full flex-col gap-3">
              {ALL_STEPS.map((st, i) => {
                const status: StepTaskStatus = i === 0 ? 'success' : i === 3 ? 'done' : 'pending'
                return <StepTask key={st.step} {...st} status={status} />
              })}
            </div>
          )}
          generateAllCode={() => `const steps = [
  { step: 1, title: '…', description: '…', status: 'success' },
  { step: 2, title: '…', description: '…', status: 'pending' },
  { step: 3, title: '…', description: '…', status: 'pending' },
  { step: 4, title: '…', description: '…', status: 'done' },
]

steps.map((s) => <StepTask key={s.step} {...s} />)`}
        />
      </div>
    </div>
  )
}
