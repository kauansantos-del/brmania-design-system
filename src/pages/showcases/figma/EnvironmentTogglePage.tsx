import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { EnvironmentToggle, type Environment } from '@/components/brmania'

const CONTROLS: PropControl[] = [
  {
    kind: 'select', key: 'value', label: 'Ambiente ativo', default: 'sandbox',
    options: [
      { value: 'sandbox',  label: 'Sandbox' },
      { value: 'producao', label: 'Produção' },
    ],
  },
  { kind: 'toggle', key: 'disabled', label: 'Disabled', default: false },
]

export function EnvironmentTogglePage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Ações"
        title="EnvironmentToggle"
        titleAccent="— Sandbox ↔ Produção."
        description="Toggle segmentado para alternar ambiente de API. Sandbox usa tom amarelo (teste/risco baixo), Produção usa tom azul (dados reais). Sincronizado com o Figma (nó 70:1040)."
        meta={[
          { label: 'Sandbox', tone: 'warning' },
          { label: 'Produção', tone: 'info' },
          { label: 'Figma 70:1040', tone: 'neutral' },
        ]}
      />
      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="EnvironmentToggle"
          description="Clique num segmento pra mudar o ambiente. O outro fica só no hover."
          controls={CONTROLS}
          renderPreview={(s) => (
            <Interactive initial={s.value as Environment} disabled={!!s.disabled} />
          )}
          generateCode={(s) => `<EnvironmentToggle
  value={env}
  onChange={setEnv}${s.disabled ? '\n  disabled' : ''}
/>`}
        />
      </div>
    </div>
  )
}

function Interactive({ initial, disabled }: { initial: Environment; disabled: boolean }) {
  const [env, setEnv] = useState<Environment>(initial)
  return <EnvironmentToggle value={env} onChange={setEnv} disabled={disabled} />
}
