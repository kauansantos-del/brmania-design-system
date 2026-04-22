import { PageHeader } from '@/components/layout/PageHeader'
import { Playground, type PropControl } from '@/components/layout/Playground'
import { Input, DSIcon, type InputKind } from '@/components/brmania'

const ICON_SLUGS: Record<string, string | null> = {
  none:   null,
  mail:   'mail',
  lock:   'lock',
  user:   'user',
  search: 'search-01',
}
type IconKey = keyof typeof ICON_SLUGS

const CONTROLS: PropControl[] = [
  { kind: 'variant', key: 'kind', label: 'Kind', options: ['input', 'mensagem', 'search'] as const, default: 'input' },
  { kind: 'text',    key: 'label',       label: 'Label',       default: 'E-mail' },
  { kind: 'text',    key: 'placeholder', label: 'Placeholder', default: 'voce@brmania.com.br' },
  { kind: 'text',    key: 'helperText',  label: 'Helper text', default: '' },
  { kind: 'text',    key: 'error',       label: 'Error',       default: '' },
  {
    kind: 'select', key: 'iconLeft', label: 'Ícone esquerdo', default: 'mail',
    options: [
      { value: 'none', label: 'Nenhum' }, { value: 'mail', label: 'Mail' },
      { value: 'lock', label: 'Lock' },   { value: 'user', label: 'User' },
      { value: 'search', label: 'Search' },
    ],
  },
  { kind: 'toggle', key: 'brl',     label: 'Prefixo BRL' },
  { kind: 'toggle', key: 'tooltip', label: 'Tooltip' },
  { kind: 'toggle', key: 'disabled', label: 'Desabilitado' },
]

export function InputPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Formulários"
        title="Input"
        titleAccent="— entrada de dados."
        description="Campo universal. 3 kinds: input (padrão), mensagem (textarea) e search. Suporta label, helper text, erro, ícones, prefixo BRL e tooltip."
        meta={[
          { label: '3 kinds', tone: 'brand' },
          { label: 'A11y first', tone: 'success' },
        ]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <Playground
          title="Live playground"
          description="Edite label, placeholder, helper e erro. Mude o kind para ver search e textarea."
          tags={[{ label: 'interativo', tone: 'success' }]}
          controls={CONTROLS}
          renderPreview={(s) => {
            const slug = ICON_SLUGS[(s.iconLeft as IconKey) ?? 'none']
            return (
              <div className="w-full max-w-[420px]">
                <Input
                  kind={s.kind as InputKind}
                  label={String(s.label)}
                  placeholder={String(s.placeholder)}
                  helperText={s.helperText ? String(s.helperText) : undefined}
                  error={s.error ? String(s.error) : undefined}
                  iconLeft={slug ? <DSIcon name={slug} size={18} /> : null}
                  brl={!!s.brl}
                  tooltip={s.tooltip ? 'Este campo é apenas demonstrativo' : undefined}
                  disabled={!!s.disabled}
                />
              </div>
            )
          }}
          generateCode={(s) => generateCode(s as any)}
          renderAll={() => (
            <div className="grid w-full max-w-[820px] gap-5 sm:grid-cols-2">
              <Input label="Input padrão" placeholder="Digite algo…" />
              <Input label="Com ícone" iconLeft={<DSIcon name="mail" size={18} />} placeholder="voce@brmania.com.br" />
              <Input label="Helper" placeholder="Mínimo 8 caracteres" helperText="Precisa ter 8+ caracteres" />
              <Input label="Erro" placeholder="CPF" error="CPF inválido" />
              <Input kind="search" placeholder="Procure seu evento…" />
              <Input label="Valor" placeholder="0,00" brl />
              <Input label="Disabled" placeholder="Não editável" disabled />
              <div className="sm:col-span-2">
                <Input kind="mensagem" label="Mensagem" placeholder="Escreva aqui…" helperText="Até 500 caracteres." />
              </div>
            </div>
          )}
          generateAllCode={() => `import { Input, DSIcon } from '@/components/brmania'

export function AllStates() {
  return (
    <div className="grid gap-4">
      <Input label="Input padrão" placeholder="Digite algo…" />
      <Input label="Com ícone" iconLeft={<DSIcon name="mail" size={18} />} placeholder="voce@brmania.com.br" />
      <Input label="Helper" placeholder="…" helperText="Precisa ter 8+ caracteres" />
      <Input label="Erro" placeholder="CPF" error="CPF inválido" />
      <Input kind="search" placeholder="Procure seu evento…" />
      <Input label="Valor" placeholder="0,00" brl />
      <Input label="Disabled" placeholder="Não editável" disabled />
      <Input kind="mensagem" label="Mensagem" placeholder="Escreva aqui…" />
    </div>
  )
}`}
        />
      </div>
    </div>
  )
}

function generateCode(s: any) {
  const slug = ICON_SLUGS[s.iconLeft]
  // Sempre mostra todos os atributos no código
  return `import { Input, DSIcon } from '@/components/brmania'

export function Example() {
  return (
    <Input
      kind="${s.kind || 'input'}"
      label="${s.label || ''}"
      placeholder="${s.placeholder || ''}"
      helperText="${s.helperText || ''}"
      error="${s.error || ''}"
      iconLeft={${slug ? `<DSIcon name="${slug}" size={18} />` : 'undefined'}}
      brl={${!!s.brl}}
      tooltip={${s.tooltip ? '"Este campo é apenas demonstrativo"' : 'undefined'}}
      disabled={${!!s.disabled}}
    />
  )
}`
}
