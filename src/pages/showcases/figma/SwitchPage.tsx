import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { Switch, type SwitchLabelPlacement } from '@/components/brmania'

const CONTROLS: PropControl[] = [
  { kind: 'text',   key: 'label',       label: 'Label',       default: 'Definir como padrão' },
  { kind: 'text',   key: 'helper',      label: 'Helper text', default: '' },
  {
    kind: 'select', key: 'labelPlacement', label: 'Posição da label', default: 'right',
    options: [
      { value: 'left',  label: 'Esquerda' },
      { value: 'right', label: 'Direita' },
      { value: 'none',  label: 'Sem label' },
    ],
  },
  { kind: 'toggle', key: 'disabled', label: 'Disabled', default: false },
  { kind: 'toggle', key: 'defaultOn', label: 'Inicia ligado', default: false },
]

export function SwitchPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Formulários"
        title="Switch"
        titleAccent="— toggle on/off."
        description="Switch 50×24 sobre checkbox nativo (acessível). Verde principal quando ligado. Figma 108:128526."
        meta={[
          { label: 'Checkbox nativo', tone: 'success' },
          { label: 'A11y', tone: 'info' },
          { label: 'Figma 108:128526', tone: 'neutral' },
        ]}
      />
      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="Switch"
          description="Controla um booleano com label semanticamente ligada."
          controls={CONTROLS}
          renderPreview={(s) => (
            <Interactive
              label={s.label as string}
              helper={s.helper as string}
              placement={s.labelPlacement as SwitchLabelPlacement}
              disabled={!!s.disabled}
              defaultOn={!!s.defaultOn}
            />
          )}
          generateCode={(s) => `<Switch
  label="${s.label}"${s.helper ? `\n  helperText="${s.helper}"` : ''}
  labelPlacement="${s.labelPlacement}"${s.defaultOn ? '\n  defaultChecked' : ''}${s.disabled ? '\n  disabled' : ''}
/>`}
        />
      </div>
    </div>
  )
}

function Interactive({
  label, helper, placement, disabled, defaultOn,
}: { label: string; helper: string; placement: SwitchLabelPlacement; disabled: boolean; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <Switch
      checked={on}
      onChange={(e) => setOn(e.currentTarget.checked)}
      label={label}
      helperText={helper || undefined}
      labelPlacement={placement}
      disabled={disabled}
    />
  )
}
