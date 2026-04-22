import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { SelectField } from '@/components/brmania'

const CONTROLS: PropControl[] = [
  { kind: 'text',   key: 'label',       label: 'Label',       default: 'Nome Completo' },
  { kind: 'text',   key: 'placeholder', label: 'Placeholder', default: 'Título' },
  { kind: 'text',   key: 'helper',      label: 'Helper',      default: '' },
  { kind: 'text',   key: 'error',       label: 'Error',       default: '' },
  { kind: 'toggle', key: 'disabled',    label: 'Disabled',    default: false },
]

const OPTIONS = [
  { value: 'sr',    label: 'Sr.' },
  { value: 'sra',   label: 'Sra.' },
  { value: 'dr',    label: 'Dr.' },
  { value: 'dra',   label: 'Dra.' },
  { value: 'outro', label: 'Outro' },
]

export function SelectFieldPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Formulários"
        title="SelectField"
        titleAccent="— dropdown com label."
        description="Select completo: label + trigger + menu (usando DropdownOption). Abre/fecha no click, dispara ESC para fechar. Figma 113:160210 + 113:160194."
        meta={[
          { label: 'Label + helper', tone: 'info' },
          { label: 'ESC dismiss', tone: 'success' },
          { label: 'Figma 113:160210', tone: 'neutral' },
        ]}
      />
      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="SelectField"
          description="Clique no campo para abrir o dropdown. Suporta estado controlado e uncontrolled."
          controls={CONTROLS}
          renderPreview={(s) => (
            <div className="w-[320px]">
              <SelectField
                label={s.label as string}
                placeholder={s.placeholder as string}
                helperText={s.helper ? (s.helper as string) : undefined}
                error={s.error ? (s.error as string) : undefined}
                disabled={!!s.disabled}
                options={OPTIONS}
              />
            </div>
          )}
          generateCode={(s) => `<SelectField
  label="${s.label}"
  placeholder="${s.placeholder}"${s.helper ? `\n  helperText="${s.helper}"` : ''}${s.error ? `\n  error="${s.error}"` : ''}${s.disabled ? '\n  disabled' : ''}
  options={options}
/>`}
        />
      </div>
    </div>
  )
}
