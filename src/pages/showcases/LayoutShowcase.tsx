import { PageHeader } from '@/components/layout/PageHeader'
import { ComponentShowcase } from '@/components/layout/ComponentShowcase'
import { DSIcon } from '@/components/brmania'

export function LayoutShowcase() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Componentes · Layout"
        title="Blocos estruturais"
        titleAccent="e primitivos visuais."
        description="Wrappers e helpers para compor interfaces consistentes."
        meta={[{ label: '1 componente', tone: 'brand' }]}
      />

      <div className="mx-auto max-w-5xl px-8 py-10">
        <ComponentShowcase
          title="Icon"
          description="Wrapper universal para ícones do IconJar via `DSIcon`. Tamanho é livre (px), cor via `className` (SVGs usam currentColor)."
          tags={[{ label: 'primitive', tone: 'info' }, { label: 'DSIcon', tone: 'neutral' }]}
          preview={
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-end gap-6 text-[#3e9b57]">
                <DSIcon name="home-01" size={20} />
                <DSIcon name="home-01" size={24} />
                <DSIcon name="home-01" size={28} />
                <DSIcon name="home-01" size={32} />
                <DSIcon name="home-01" size={36} />
                <DSIcon name="home-01" size={48} />
              </div>
              <div className="flex items-center gap-4">
                <DSIcon name="shield" size={24} className="text-[#107d98]" />
                <DSIcon name="star" size={24} className="text-[#dc3d43]" />
                <DSIcon name="flash" size={24} className="text-[#3e9b57]" />
                <DSIcon name="heart" size={24} className="text-[#ce2c31]" />
              </div>
              <p className="text-[11.5px] text-[#646464]">
                Qualquer cor via <code className="font-mono">className</code>. Qualquer tamanho via prop <code className="font-mono">size</code>.
              </p>
            </div>
          }
          code={CODE_ICON}
        />
      </div>
    </div>
  )
}

const CODE_ICON = `import { DSIcon } from '@/components/brmania'

export function Example() {
  return (
    <div className="flex items-end gap-4 text-[#3e9b57]">
      <DSIcon name="home-01" size={20} />
      <DSIcon name="home-01" size={24} />
      <DSIcon name="home-01" size={32} />

      <DSIcon name="shield" size={24} className="text-[#107d98]" />
    </div>
  )
}`
