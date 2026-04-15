import { PageHeader } from '@/components/layout/PageHeader'
import { ComponentShowcase } from '@/components/layout/ComponentShowcase'
import { Button, ButtonText, IconButton, DSIcon } from '@/components/brmania'

export function AcoesShowcase() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Ações"
        title="Botões e ações"
        titleAccent="para todas as CTAs."
        description="Variantes e estados prontos para uso. Cada componente tem preview ao vivo e código copiável — basta colar no seu projeto."
        meta={[
          { label: '3 componentes', tone: 'brand' },
          { label: 'Sora + Inter', tone: 'info' },
        ]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <ComponentShowcase
          title="Button"
          description="Botão principal de CTA. Variantes: primary · secondary · tertiary · red · disabled. Aceita ícone à esquerda e/ou direita. Estados hover e active via CSS nativo."
          tags={[{ label: 'primary', tone: 'brand' }, { label: '+4 variantes', tone: 'neutral' }]}
          preview={
            <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(160px,max-content))] items-center justify-items-start">
              <Button variant="primary">Label</Button>
              <Button variant="secondary">Label</Button>
              <Button variant="tertiary">Label</Button>
              <Button variant="red">Label</Button>
              <Button variant="disabled">Label</Button>
              <Button variant="primary" iconLeft={<DSIcon name="home-01" size={18} />}>Início</Button>
              <Button variant="primary" iconRight={<DSIcon name="arrow-right" size={18} />}>Avançar</Button>
              <Button variant="secondary" iconLeft={<DSIcon name="plus-01" size={18} />}>Adicionar</Button>
            </div>
          }
          code={CODE_BUTTON}
        />

        <ComponentShowcase
          title="ButtonText"
          description="Botão tipográfico (link-like) sem fundo. Ideal para ações inline em formulários, “Esqueci a senha”, “Enviar código”, etc."
          tags={[{ label: 'link', tone: 'info' }, { label: '4 variantes', tone: 'neutral' }]}
          preview={
            <div className="flex flex-wrap items-center gap-6">
              <ButtonText variant="primary">Criar conta</ButtonText>
              <ButtonText variant="secondary">Criar conta</ButtonText>
              <ButtonText variant="red">Remover</ButtonText>
              <ButtonText variant="codigo">Enviar código</ButtonText>
              <ButtonText variant="primary" icon={<DSIcon name="arrow-right" size={16} />}>Saiba mais</ButtonText>
            </div>
          }
          code={CODE_BUTTON_TEXT}
        />

        <ComponentShowcase
          title="IconButton"
          description="Botão somente com ícone. Variantes filled (com borda) e ghost (discreto). Sempre obriga `aria-label` para acessibilidade."
          tags={[{ label: 'a11y', tone: 'success' }, { label: '2 variantes', tone: 'neutral' }]}
          preview={
            <div className="flex items-center gap-4">
              <IconButton variant="filled" aria-label="Voltar" icon={<DSIcon name="direction-left" size={20} />} />
              <IconButton variant="ghost" aria-label="Voltar" icon={<DSIcon name="direction-left" size={20} />} />
              <IconButton variant="ghost" aria-label="Fechar" icon={<DSIcon name="multiply-circle" size={20} />} />
              <IconButton variant="filled" aria-label="Adicionar" icon={<DSIcon name="plus-01" size={20} />} />
            </div>
          }
          code={CODE_ICON_BUTTON}
        />
      </div>
    </div>
  )
}

const CODE_BUTTON = `import { Button, DSIcon } from '@/components/brmania'

export function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Label</Button>
      <Button variant="secondary">Label</Button>
      <Button variant="tertiary">Label</Button>
      <Button variant="red">Label</Button>
      <Button variant="disabled">Label</Button>

      <Button variant="primary" iconLeft={<DSIcon name="home-01" size={18} />}>
        Início
      </Button>
      <Button variant="primary" iconRight={<DSIcon name="arrow-right" size={18} />}>
        Avançar
      </Button>
    </div>
  )
}`

const CODE_BUTTON_TEXT = `import { ButtonText, DSIcon } from '@/components/brmania'

export function Example() {
  return (
    <div className="flex gap-6">
      <ButtonText variant="primary">Criar conta</ButtonText>
      <ButtonText variant="secondary">Criar conta</ButtonText>
      <ButtonText variant="red">Remover</ButtonText>
      <ButtonText variant="codigo">Enviar código</ButtonText>
      <ButtonText variant="primary" icon={<DSIcon name="arrow-right" size={16} />}>
        Saiba mais
      </ButtonText>
    </div>
  )
}`

const CODE_ICON_BUTTON = `import { IconButton, DSIcon } from '@/components/brmania'

export function Example() {
  return (
    <div className="flex gap-3">
      <IconButton variant="filled" aria-label="Voltar"  icon={<DSIcon name="direction-left" size={20} />} />
      <IconButton variant="ghost"  aria-label="Voltar"  icon={<DSIcon name="direction-left" size={20} />} />
      <IconButton variant="ghost"  aria-label="Fechar"  icon={<DSIcon name="multiply-circle" size={20} />} />
      <IconButton variant="filled" aria-label="Adicionar" icon={<DSIcon name="plus-01" size={20} />} />
    </div>
  )
}`
