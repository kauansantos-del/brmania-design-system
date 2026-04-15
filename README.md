# BRMania · Design System

Biblioteca visual e de tokens do **BRMania · Mania de Abastecer** — fundamentos (cores, tipografia, espaçamento), componentes React, galeria de assets e 4.043 ícones prontos pra uso, tudo exportável em JSON (DTCG-ready) e ZIP categorizado.

> **Stack**: Vite · React 18 · TypeScript · TailwindCSS · Framer Motion · Sonner

---

## Visão geral

- **Cores** — escala Radix 1–12 em tema Dark e Light com popover ilustrado por step (app background → high-contrast text).
- **Tipografia** — Sora (display) · Inter (body) · JetBrains Mono (código), com 9 níveis de escala.
- **Espaçamento** — escala 4pt (xs → 4xl) com ilustração em contexto (gap, padding, stack, section).
- **Ícones** — 4.043 ícones do Huge Icons Pack em 3 estilos (Outline / Sólidos / Bulk), 22 categorias, com sidebar sticky, busca e downloads em ZIP/JSON.
- **Handoff** — central de downloads com bundle completo + preview JSON animado.

## Estrutura

```
design-system-app/
├── src/                     código da aplicação (React + TS)
│   ├── components/          UI + layout
│   ├── pages/               Documentation, Components, Gallery, Handoff, Icons
│   ├── data/                navegação e manifests estáticos
│   ├── lib/                 downloads, tokens, clipboard, utils
│   └── styles/              globals.css + Tailwind
├── public/
│   ├── tokens/              Dark.tokens.json · Light.tokens.json
│   ├── icons/               /<style>/<file>.svg + manifest.json (4.043 ícones)
│   └── gallery/             assets (ícones 3D, etc.)
├── docs/                    documentação dos fundamentos (markdown)
├── design-source/           fontes originais (Figma tokens + IconJar)
└── build-icons.mjs          script que gera /public/icons a partir do IconJar
```

## Desenvolvimento

```bash
npm install
npm run dev          # vite em localhost:5174
npm run build        # gera /dist para produção
npm run preview      # serve /dist localmente
```

### Reimportar ícones

Se precisar regenerar a biblioteca de ícones a partir do IconJar:

```bash
gunzip -c "design-source/iconjar/huge icons pack.iconjar/META" > tmp-iconjar-meta.json
node build-icons.mjs
```

## Tokens exportáveis

Todos os fundamentos podem ser baixados em JSON DTCG-ready pela UI (botão download em cada página) ou via helpers em [`src/lib/downloads.ts`](src/lib/downloads.ts):

- `brmania-cores.tokens.json` — temas Dark + Light completos
- `brmania-tipografia.tokens.json` — famílias, escala, pesos, line-heights
- `brmania-espacamento.tokens.json` — escala 4pt (px + rem)
- `brmania-design-system.tokens.json` — bundle completo
- `brmania-icons-bundle.zip` — 4.043 ícones organizados por `<estilo>/<categoria>/<slug>.svg`

## Atalhos

- `⌘/Ctrl + K` — foca a busca da TopBar
- `←` / `→` — navega entre imagens no modal da Galeria
- `Esc` — fecha modais

## Deploy

Deploy contínuo na **Vercel** — framework Vite detectado automaticamente, build `npm run build`, output `dist/`.

## Licença

MIT · © BRMania
