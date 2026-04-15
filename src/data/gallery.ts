export type GalleryItem = {
  id: string
  src: string
  name: string
  category: 'Ícones 3D'
  tags: string[]
  description?: string
}

export const gallery: GalleryItem[] = [
  {
    id: '3d-email',
    src: '/gallery/icons-3d/icon3d-email.png',
    name: 'Ícone 3D — Email',
    category: 'Ícones 3D',
    tags: ['icon', 'email', 'contato', '3d'],
    description: 'Ícone de envelope 3D para fluxos de e-mail, confirmações e comunicação.',
  },
  {
    id: '3d-senha',
    src: '/gallery/icons-3d/icon3d-senha.png',
    name: 'Ícone 3D — Senha',
    category: 'Ícones 3D',
    tags: ['icon', 'senha', 'segurança', 'lock', '3d'],
    description: 'Ícone de cadeado 3D para fluxos de autenticação, reset de senha e segurança.',
  },
  {
    id: '3d-sucesso',
    src: '/gallery/icons-3d/icon3d-sucesso.png',
    name: 'Ícone 3D — Sucesso',
    category: 'Ícones 3D',
    tags: ['icon', 'check', 'sucesso', 'confirmação', '3d'],
    description: 'Ícone de check 3D para confirmações, estados de sucesso e feedbacks positivos.',
  },
]

export const categories = ['Ícones 3D'] as const
export type Category = (typeof categories)[number]
