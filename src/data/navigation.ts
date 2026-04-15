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

export type NavGroup = {
  title: string
  items: NavLeaf[]
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
    ring: 'shadow-[0_8px_24px_-12px_rgba(70,167,104,0.65)]',
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
        title: 'Categorias',
        items: [
          {
            key: 'acoes', label: 'Ações', icon: 'package-01', count: 3, description: 'Button, ButtonText, IconButton',
            nonNavigable: true,
            children: [
              { key: 'button',       label: 'Button',      icon: 'input-cursor-move', description: 'CTA principal — 5 variantes' },
              { key: 'button-text',  label: 'ButtonText',  icon: 'link',              description: 'Link / texto — 4 variantes' },
              { key: 'icon-button',  label: 'IconButton',  icon: 'plus-rectangle',    description: 'Só ícone — filled / ghost' },
            ],
          },
          {
            key: 'formularios', label: 'Formulários', icon: 'edit', count: 2, description: 'Input, Checkbox',
            nonNavigable: true,
            children: [
              { key: 'input',    label: 'Input',    icon: 'text-area',         description: 'Campo, search, textarea' },
              { key: 'checkbox', label: 'Checkbox', icon: 'check-mark-circle', description: 'Seleção com label' },
            ],
          },
          { key: 'feedback', label: 'Feedback', icon: 'notification-01', count: 0, description: 'Toast, Modal, Alert, Tooltip…' },
          { key: 'dados',    label: 'Dados',    icon: 'grid-01',         count: 0, description: 'Tabela, Card, Badge, Avatar…' },
          {
            key: 'navegacao', label: 'Navegação', icon: 'menu-line-horizontal', count: 1, description: 'MenuItem',
            nonNavigable: true,
            children: [
              { key: 'menu-item', label: 'MenuItem', icon: 'menu-line-horizontal-01', description: 'Item de sidebar — 3 variantes' },
            ],
          },
          {
            key: 'layout', label: 'Layout', icon: 'grid-01', count: 1, description: 'Icon',
            nonNavigable: true,
            children: [
              { key: 'icon', label: 'Icon', icon: 'plus-rectangle', description: 'Wrapper de ícones SVG' },
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
