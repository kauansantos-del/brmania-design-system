import type { DSResource } from '@/lib/downloads'

export type SectionKey = 'componentes' | 'documentacao' | 'galeria'

export type NavLeaf = {
  key: string
  label: string
  /** Slug do IconJar (outline). Renderizado via DSIcon. */
  icon: string
  description?: string
  badge?: { tone: 'brand' | 'info' | 'success' | 'warning' | 'neutral'; text: string }
  count?: number
  href?: string
  download?: DSResource
  disabled?: boolean
  children?: NavLeaf[]
  nonNavigable?: boolean
}

export type NavSubgroup = {
  title: string
  items: NavLeaf[]
}

export type NavGroup = {
  title: string
  items: NavLeaf[]
  /** Opcional: agrupa `items` em subcategorias visuais (mesma lista, só que segmentada). */
  subgroups?: NavSubgroup[]
}

export type SectionConfig = {
  key: SectionKey
  label: string
  shortLabel: string
  icon: string
  description: string
  accent: string
  activeTab: string
  ring: string
  marker: string
  text: string
  softBg: string
  groups: NavGroup[]
  defaultSub: string
}

export const sections: Record<SectionKey, SectionConfig> = {
  componentes: {
    key: 'componentes',
    label: 'Componentes',
    shortLabel: 'Componentes',
    icon: 'grid-01',
    description: 'Biblioteca de componentes React sincronizada com o Figma',
    accent: 'from-brand-500 to-brand-700',
    activeTab: 'from-brand-500 via-brand-600 to-brand-700',
    ring: 'shadow-[0_8px_24px_-12px_rgba(34,197,94,0.55)]',
    marker: 'bg-brand-500',
    text: 'text-brand-300',
    softBg: 'bg-brand-500/10',
    defaultSub: 'visao-geral',
    groups: [
      {
        title: 'Início',
        items: [
          { key: 'visao-geral', label: 'Visão geral', icon: 'star', description: 'Apresentação da biblioteca e próximos passos' },
        ],
      },
      {
        title: 'Átomos',
        items: [
          { key: 'button',      label: 'Button',      icon: 'input-cursor-move',       description: 'CTA principal — 5 variantes' },
          { key: 'button-text', label: 'ButtonText',  icon: 'link',                    description: 'Link / texto — 4 variantes' },
          { key: 'icon-button', label: 'IconButton',  icon: 'plus-rectangle',          description: 'Só ícone — filled / ghost' },
          { key: 'input',       label: 'Input',       icon: 'text-area',               description: 'Campo, search, textarea' },
          { key: 'checkbox',    label: 'Checkbox',    icon: 'check-mark-circle',       description: 'Seleção com label' },
          { key: 'switch',      label: 'Switch',      icon: 'switch',                  description: 'Toggle on/off — Figma 108:128526' },
          { key: 'nav-item',    label: 'NavItem',     icon: 'menu-line-horizontal-01', description: 'Item de sidebar — default / hover / focus' },
          { key: 'icon',        label: 'Icon',        icon: 'plus-rectangle',          description: 'Wrapper de ícones SVG' },
        ],
        subgroups: [
          {
            title: 'Ações',
            items: [
              { key: 'button',      label: 'Button',      icon: 'input-cursor-move', description: 'CTA principal — 5 variantes' },
              { key: 'button-text', label: 'ButtonText',  icon: 'link',              description: 'Link / texto — 4 variantes' },
              { key: 'icon-button', label: 'IconButton',  icon: 'plus-rectangle',    description: 'Só ícone — filled / ghost' },
            ],
          },
          {
            title: 'Formulários',
            items: [
              { key: 'input',    label: 'Input',    icon: 'text-area',         description: 'Campo, search, textarea' },
              { key: 'checkbox', label: 'Checkbox', icon: 'check-mark-circle', description: 'Seleção com label' },
              { key: 'switch',   label: 'Switch',   icon: 'switch',            description: 'Toggle on/off — Figma 108:128526' },
            ],
          },
          {
            title: 'Navegação',
            items: [
              { key: 'nav-item', label: 'NavItem', icon: 'menu-line-horizontal-01', description: 'Item de sidebar — default / hover / focus' },
            ],
          },
          {
            title: 'Fundamentos',
            items: [
              { key: 'icon', label: 'Icon', icon: 'plus-rectangle', description: 'Wrapper de ícones SVG' },
            ],
          },
        ],
      },
      {
        title: 'Moléculas',
        items: [
          { key: 'environment-toggle', label: 'EnvironmentToggle', icon: 'test-tube',            description: 'Sandbox / Produção — Figma 70:1040' },
          { key: 'select-field',       label: 'SelectField',       icon: 'arrow-down',           description: 'Dropdown com label — Figma 113:160210' },
          { key: 'info-tooltip',       label: 'InfoTooltip',       icon: 'information',          description: 'Tooltip com ícone info — Figma 96:4771' },
          { key: 'action-toast',       label: 'ActionToast',       icon: 'notification',         description: 'Notificação com ação — Figma 176:51949' },
          { key: 'sidebar-item',       label: 'SidebarItem',       icon: 'menu-line-horizontal', description: '6 presets × 3 estados — Figma 38:1345' },
          { key: 'tabs',               label: 'Tabs',              icon: 'menu-line-horizontal', description: 'Tabs com underline — Figma 147:42657' },
          { key: 'pagination',         label: 'Pagination',        icon: 'arrow-right',          description: 'Paginação numerada — Figma 115:160887' },
          { key: 'user-card',          label: 'UserCard',          icon: 'security',             description: 'Avatar + nome + org — Figma 144:24857' },
          { key: 'step-task',          label: 'StepTask',          icon: 'tick',                 description: 'Linha de checklist — Figma 96:2909' },
          { key: 'export-card',        label: 'ExportCard',        icon: 'file-01',              description: 'Card de formato de export — Figma 143:13712' },
          { key: 'role-card',          label: 'RoleCard',          icon: 'security',             description: 'Card de papel de usuário — Figma 143:13712' },
          { key: 'feature-card',       label: 'FeatureCard',       icon: 'star',                 description: 'Card de acesso rápido — Figma 75:1313' },
          { key: 'event-option-card',  label: 'EventOptionCard',   icon: 'notification',         description: 'Opção selecionável — Figma 111:129416' },
        ],
        subgroups: [
          {
            title: 'Ações',
            items: [
              { key: 'environment-toggle', label: 'EnvironmentToggle', icon: 'test-tube', description: 'Sandbox / Produção — Figma 70:1040' },
            ],
          },
          {
            title: 'Formulários',
            items: [
              { key: 'select-field', label: 'SelectField', icon: 'arrow-down', description: 'Dropdown com label — Figma 113:160210' },
            ],
          },
          {
            title: 'Feedback',
            items: [
              { key: 'info-tooltip', label: 'InfoTooltip', icon: 'information',  description: 'Tooltip com ícone info — Figma 96:4771' },
              { key: 'action-toast', label: 'ActionToast', icon: 'notification', description: 'Notificação com ação — Figma 176:51949' },
            ],
          },
          {
            title: 'Navegação',
            items: [
              { key: 'sidebar-item', label: 'SidebarItem', icon: 'menu-line-horizontal', description: '6 presets × 3 estados — Figma 38:1345' },
              { key: 'tabs',         label: 'Tabs',        icon: 'menu-line-horizontal', description: 'Tabs com underline — Figma 147:42657' },
              { key: 'pagination',   label: 'Pagination',  icon: 'arrow-right',          description: 'Paginação numerada — Figma 115:160887' },
            ],
          },
          {
            title: 'Dados',
            items: [
              { key: 'user-card',         label: 'UserCard',        icon: 'security',     description: 'Avatar + nome + org — Figma 144:24857' },
              { key: 'step-task',         label: 'StepTask',        icon: 'tick',         description: 'Linha de checklist — Figma 96:2909' },
              { key: 'export-card',       label: 'ExportCard',      icon: 'file-01',      description: 'Card de formato de export — Figma 143:13712' },
              { key: 'role-card',         label: 'RoleCard',        icon: 'security',     description: 'Card de papel de usuário — Figma 143:13712' },
              { key: 'feature-card',      label: 'FeatureCard',     icon: 'star',         description: 'Card de acesso rápido — Figma 75:1313' },
              { key: 'event-option-card', label: 'EventOptionCard', icon: 'notification', description: 'Opção selecionável — Figma 111:129416' },
            ],
          },
        ],
      },
    ],
  },
  documentacao: {
    key: 'documentacao',
    label: 'Documentação',
    shortLabel: 'Docs',
    icon: 'file-01',
    description: 'Fundamentos, tokens e diretrizes do sistema',
    accent: 'from-sky-500 to-indigo-700',
    activeTab: 'from-sky-500 via-indigo-600 to-indigo-700',
    ring: 'shadow-[0_8px_24px_-12px_rgba(79,70,229,0.65)]',
    marker: 'bg-indigo-400',
    text: 'text-indigo-300',
    softBg: 'bg-indigo-500/10',
    defaultSub: 'cores',
    groups: [
      {
        title: 'Fundamentos',
        items: [
          { key: 'cores',       label: 'Cores',       icon: 'paint-board', description: 'Paleta, semântica e tokens do Figma', badge: { tone: 'brand', text: 'Tokens' } },
          { key: 'tipografia',  label: 'Tipografia',  icon: 'font-size',   description: 'Escala Sora + Inter + JetBrains Mono' },
          { key: 'espacamento', label: 'Espaçamento', icon: 'ruler',       description: 'Escala baseada em múltiplos de 4px' },
        ],
      },
      {
        title: 'Handoff',
        items: [
          { key: 'handoff',             label: 'Central de downloads', icon: 'package-01',  description: 'Página dedicada com todos os tokens em JSON', badge: { tone: 'brand', text: 'Novo' } },
          { key: 'download-all',        label: 'Baixar tudo',          icon: 'download-01', description: 'Bundle completo: cores + tipografia + espaçamento', download: 'all' },
          { key: 'download-colors',     label: 'Cores',                icon: 'download-01', description: 'brmania-cores.tokens.json',       download: 'colors' },
          { key: 'download-typography', label: 'Tipografia',           icon: 'download-01', description: 'brmania-tipografia.tokens.json',  download: 'typography' },
          { key: 'download-spacing',    label: 'Espaçamento',          icon: 'download-01', description: 'brmania-espacamento.tokens.json', download: 'spacing' },
        ],
      },
      {
        title: 'Recursos',
        items: [
          { key: 'google-fonts',  label: 'Google Fonts',  icon: 'link', href: 'https://fonts.google.com', description: 'Abrir Google Fonts em nova aba' },
          { key: 'tailwind-docs', label: 'Tailwind Docs', icon: 'link', href: 'https://tailwindcss.com/docs', description: 'Documentação oficial do Tailwind' },
        ],
      },
    ],
  },
  galeria: {
    key: 'galeria',
    label: 'Galeria',
    shortLabel: 'Galeria',
    icon: 'view',
    description: 'Assets visuais prontos para download e cópia',
    accent: 'from-violet-500 to-fuchsia-700',
    activeTab: 'from-violet-500 via-fuchsia-600 to-purple-700',
    ring: 'shadow-[0_8px_24px_-12px_rgba(168,85,247,0.65)]',
    marker: 'bg-violet-400',
    text: 'text-violet-300',
    softBg: 'bg-violet-500/10',
    defaultSub: 'todos',
    groups: [
      {
        title: 'Coleções',
        items: [
          { key: 'todos',     label: 'Todos',     icon: 'view',       count: 3 },
          { key: 'icones-3d', label: 'Ícones 3D', icon: 'star',       count: 3, badge: { tone: 'success', text: 'Novo' } },
          { key: 'icones',    label: 'Ícones',    icon: 'grid-01',    count: 4043, badge: { tone: 'brand', text: 'Huge' }, description: 'Biblioteca com 4 mil+ ícones em 3 estilos' },
        ],
      },
    ],
  },
}

export const sectionOrder: SectionKey[] = ['componentes', 'documentacao', 'galeria']
