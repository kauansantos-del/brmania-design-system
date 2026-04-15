import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { ComponentShowcase } from '@/components/layout/ComponentShowcase'
import { Input, Checkbox, DSIcon } from '@/components/brmania'

export function FormulariosShowcase() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Formulários"
        title="Entrada de dados"
        titleAccent="clara e acessível."
        description="Inputs, textareas, search, checkboxes e suas variações de estado — todos com label, helper text, erro, ícones e suporte a tooltip."
        meta={[
          { label: '2 componentes', tone: 'brand' },
          { label: 'A11y first', tone: 'success' },
        ]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <ComponentShowcase
          title="Input"
          description="Campo de entrada padrão. Três variantes: input · mensagem (textarea) · search. Suporta label, ícones, prefixo BRL, tooltip, erro e estados desabilitado/normal."
          tags={[{ label: 'text', tone: 'info' }, { label: 'error', tone: 'warning' }]}
          preview={<InputPreview />}
          code={CODE_INPUT}
        />

        <ComponentShowcase
          title="Checkbox"
          description="Caixa de seleção com label. A direção pode ser `left` (label à direita) ou `right` (label à esquerda). Funciona como controlled ou uncontrolled."
          tags={[{ label: 'toggle', tone: 'info' }]}
          preview={<CheckboxPreview />}
          code={CODE_CHECKBOX}
        />
      </div>
    </div>
  )
}

function InputPreview() {
  const [value, setValue] = useState('')
  return (
    <div className="grid w-full max-w-[880px] gap-6 sm:grid-cols-2">
      <Input label="Nome" placeholder="Fulano da Silva" value={value} onChange={(e) => setValue(e.currentTarget.value)} />
      <Input label="E-mail" placeholder="voce@brmania.com.br" iconLeft={<DSIcon name="mail" size={16} />} />
      <Input label="Senha" type="password" iconLeft={<DSIcon name="lock" size={16} />} helperText="Mínimo 8 caracteres" />
      <Input label="CPF" placeholder="000.000.000-00" error="CPF inválido" />
      <Input kind="search" placeholder="Procure seu evento…" />
      <Input label="Valor" placeholder="0,00" brl />
      <Input label="Tooltip" placeholder="Passe o mouse no ícone" tooltip="Este campo aceita apenas dígitos" iconLeft={<DSIcon name="user" size={16} />} />
      <Input label="Desabilitado" placeholder="Não editável" disabled />
      <div className="sm:col-span-2">
        <Input kind="mensagem" label="Mensagem" placeholder="Escreva sua observação…" helperText="Até 500 caracteres." />
      </div>
    </div>
  )
}

function CheckboxPreview() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  return (
    <div className="flex flex-col gap-4">
      <Checkbox label="Lembrar conta" checked={a} onChange={(e) => setA(e.currentTarget.checked)} />
      <Checkbox label="Lembrar conta" direction="right" checked={b} onChange={(e) => setB(e.currentTarget.checked)} />
      <Checkbox label="Aceito os termos" defaultChecked />
      <Checkbox label="Receber novidades por e-mail" />
    </div>
  )
}

const CODE_INPUT = `import { Input, DSIcon } from '@/components/brmania'

export function Example() {
  return (
    <div className="grid gap-4">
      <Input label="E-mail"
             placeholder="voce@brmania.com.br"
             iconLeft={<DSIcon name="mail" size={16} />} />

      <Input label="Senha" type="password"
             iconLeft={<DSIcon name="lock" size={16} />}
             helperText="Mínimo 8 caracteres" />

      <Input label="CPF"
             placeholder="000.000.000-00"
             error="CPF inválido" />

      <Input kind="search" placeholder="Procure seu evento…" />

      <Input label="Valor" placeholder="0,00" brl />

      <Input kind="mensagem"
             label="Mensagem"
             placeholder="Escreva sua observação…"
             helperText="Até 500 caracteres." />
    </div>
  )
}`

const CODE_CHECKBOX = `import { useState } from 'react'
import { Checkbox } from '@/components/brmania'

export function Example() {
  const [remember, setRemember] = useState(true)
  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Lembrar conta"
        checked={remember}
        onChange={(e) => setRemember(e.currentTarget.checked)}
      />
      <Checkbox label="Lembrar conta" direction="right" />
      <Checkbox label="Aceito os termos" defaultChecked />
    </div>
  )
}`
