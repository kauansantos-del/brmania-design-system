import {
  Blocks, BookOpen, Images,
  Palette, Type, Ruler, Globe, Wind, Layers,
  Box, FormInput, MessageSquare, BarChart3, Navigation as NavIcon,
  Sparkles, Download, Package, Shapes,
  type LucideIcon,
} from 'lucide-react'
import type { DSResource } from '@/lib/downloads'

export type SectionKey = 'componentes' | 'documentacao' | 'galeria'

export type NavLeaf = {
  key: string
  label: string
  icon: LucideIcon
  description?: string
  badge?: { tone: 'brand' | 'info' | 'success' | 'warning' | 'neutral'; text: string }
  count?: number
  href?: string // external link
  download?: DSResource // dispara download de tokens (handoff)
  disabled?: boolean
}

export type NavGroup = {
  title: string
  items: NavLeaf[]
}

export type SectionConfig = {
  key: SectionKey
  label: string
  shortLabel: string
  icon: LucideIcon
  description: string
  accent: string // gradient tokens para ícone/badge da sidebar
  activeTab: string // gradient para a aba ativa da TopBar
  ring: string // classe de ring/glow usada no estado ativo da sidebar
  marker: string // cor da barra lateral do item ativo
  text: string // cor do texto do item ativo
  softBg: string // background suave do item ativo
  groups: NavGroup[]
  defaultSub: string
}

export const sections: Record<SectionKey, SectionConfig> = {
  componentes: {
    key: 'componentes',
    label: 'Componentes',
    shortLabel: 'Componentes',
    icon: Blocks,
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
          {
            key: 'visao-geral',
            label: 'Visão geral',
            icon: Sparkles,
            description: 'Apresentação da biblioteca e próximos passos',
          },
        ],
      },
      {
        title: 'Categorias',
        items: [
          { key: 'acoes',       label: 'Ações',       icon: Box,          count: 0, description: 'Buttons, IconButtons, FAB…' },
          { key: 'formularios', label: 'Formulários', icon: FormInput,    count: 0, description: 'Inputs, Selects, Checkboxes…' },
          { key: 'feedback',    label: 'Feedback',    icon: MessageSquare,count: 0, description: 'Toast, Modal, Alert, Tooltip…' },
          { key: 'dados',       label: 'Dados',       icon: BarChart3,    count: 0, description: 'Tabela, Card, Badge, Avatar…' },
          { key: 'navegacao',   label: 'Navegação',   icon: NavIcon,      count: 0, description: 'Tabs, Menu, Breadcrumbs…' },
          { key: 'layout',      label: 'Layout',      icon: Layers,       count: 0, description: 'Container, Grid, Stack, Divider…' },
        ],
      },
    ],
  },
  documentacao: {
    key: 'documentacao',
    label: 'Documentação',
    shortLabel: 'Docs',
    icon: BookOpen,
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
          { key: 'cores',       label: 'Cores',       icon: Palette, description: 'Paleta, semântica e tokens do Figma', badge: { tone: 'brand', text: 'Tokens' } },
          { key: 'tipografia',  label: 'Tipografia',  icon: Type,    description: 'Escala Sora + Inter + JetBrains Mono' },
          { key: 'espacamento', label: 'Espaçamento', icon: Ruler,   description: 'Escala baseada em múltiplos de 4px' },
        ],
      },
      {
        title: 'Handoff',
        items: [
          { key: 'handoff',             label: 'Central de downloads', icon: Package,  description: 'Página dedicada com todos os tokens em JSON', badge: { tone: 'brand', text: 'Novo' } },
          { key: 'download-all',        label: 'Baixar tudo',          icon: Download, description: 'Bundle completo: cores + tipografia + espaçamento', download: 'all' },
          { key: 'download-colors',     label: 'Cores',                icon: Download, description: 'brmania-cores.tokens.json',       download: 'colors' },
          { key: 'download-typography', label: 'Tipografia',           icon: Download, description: 'brmania-tipografia.tokens.json',  download: 'typography' },
          { key: 'download-spacing',    label: 'Espaçamento',          icon: Download, description: 'brmania-espacamento.tokens.json', download: 'spacing' },
        ],
      },
      {
        title: 'Recursos',
        items: [
          { key: 'google-fonts',  label: 'Google Fonts',  icon: Globe, href: 'https://fonts.google.com', description: 'Abrir Google Fonts em nova aba' },
          { key: 'tailwind-docs', label: 'Tailwind Docs', icon: Wind,  href: 'https://tailwindcss.com/docs', description: 'Documentação oficial do Tailwind' },
        ],
      },
    ],
  },
  galeria: {
    key: 'galeria',
    label: 'Galeria',
    shortLabel: 'Galeria',
    icon: Images,
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
          { key: 'todos',     label: 'Todos',      icon: Images,   count: 3 },
          { key: 'icones-3d', label: 'Ícones 3D',  icon: Sparkles, count: 3, badge: { tone: 'success', text: 'Novo' } },
          { key: 'icones',    label: 'Ícones',     icon: Shapes,   count: 4043, badge: { tone: 'brand', text: 'Huge' }, description: 'Biblioteca com 4 mil+ ícones em 3 estilos' },
        ],
      },
    ],
  },
}

export const sectionOrder: SectionKey[] = ['componentes', 'documentacao', 'galeria']
