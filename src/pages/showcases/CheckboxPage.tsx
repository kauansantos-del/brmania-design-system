import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { Checkbox } from '@/components/brmania'

const CONTROLS: PropControl[] = [
  { kind: 'variant', key: 'direction', label: 'Direção', options: ['left', 'right'] as const, default: 'left' },
  { kind: 'toggle',  key: 'defaultChecked', label: 'Marcado por padrão' },
  { kind: 'toggle',  key: 'disabled', label: 'Desabilitado' },
  { kind: 'text',    key: 'label', label: 'Label', default: 'Lembrar conta', placeholder: 'Texto do label' },
]

export function CheckboxPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Formulários"
        title="Checkbox"
        titleAccent="— seleção com label."
        description="Caixa de seleção acessível. Funciona como controlled (via prop `checked`) ou uncontrolled (via `defaultChecked`). Direção do label configurável."
        meta={[
          { label: 'A11y first', tone: 'success' },
          { label: 'Inter · 16px', tone: 'info' },
        ]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="Live playground"
          description="Clique no checkbox abaixo para ver o toggle em ação. O estado é resetado quando você muda 'Marcado por padrão'."
          tags={[{ label: 'interativo', tone: 'success' }]}
          controls={CONTROLS}
          renderPreview={(s) => (
            <CheckboxDemo
              direction={s.direction as 'left' | 'right'}
              defaultChecked={!!s.defaultChecked}
              disabled={!!s.disabled}
              label={String(s.label || 'Lembrar conta')}
            />
          )}
          generateCode={(s) => generateCode(s as any)}
          renderAll={() => (
            <div className="flex flex-col gap-4">
              <Checkbox label="Não marcado" />
              <Checkbox label="Marcado" defaultChecked />
              <Checkbox label="Label à direita" direction="right" defaultChecked />
              <Checkbox label="Desabilitado" disabled />
              <Checkbox label="Desabilitado marcado" disabled defaultChecked />
            </div>
          )}
          generateAllCode={() => `import { Checkbox } from '@/components/brmania'

export function AllStates() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox label="Não marcado" />
      <Checkbox label="Marcado" defaultChecked />
      <Checkbox label="Label à direita" direction="right" defaultChecked />
      <Checkbox label="Desabilitado" disabled />
      <Checkbox label="Desabilitado marcado" disabled defaultChecked />
    </div>
  )
}`}
        />
      </div>
    </div>
  )
}

function CheckboxDemo({
  direction, defaultChecked, disabled, label,
}: { direction: 'left' | 'right'; defaultChecked: boolean; disabled: boolean; label: string }) {
  // usa key pra remountar quando defaultChecked muda
  const [mountKey] = useState(`${direction}-${defaultChecked}-${disabled}`)
  return (
    <Checkbox
      key={`${direction}-${defaultChecked}-${disabled}-${label}-${mountKey}`}
      direction={direction}
      defaultChecked={defaultChecked}
      disabled={disabled}
      label={label}
    />
  )
}

function generateCode({
  direction, defaultChecked, disabled, label,
}: { direction: string; defaultChecked: boolean; disabled: boolean; label: string }) {
  const props: string[] = [`label="${label || 'Lembrar conta'}"`]
  if (direction !== 'left')      props.push(`direction="${direction}"`)
  if (defaultChecked)            props.push('defaultChecked')
  if (disabled)                  props.push('disabled')
  return `import { Checkbox } from '@/components/brmania'

export function Example() {
  return (
    <Checkbox
      ${props.join('\n      ')}
    />
  )
}`
}
