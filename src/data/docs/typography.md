# 🔤 Design System — Typography

> **Versão:** 1.0.0  
> **Última atualização:** Abril 2026  
> **Mantido por:** Time de Design

---

## Visão Geral

Este documento define toda a escala tipográfica do nosso Design System. Ele é a **fonte única da verdade** para desenvolvedores implementarem tipografia de forma consistente em todos os produtos.

### Fontes do Sistema

| Papel | Família | Google Fonts |
|---|---|---|
| **Primária** (Display + Heading) | `Sora` | [fonts.google.com/specimen/Sora](https://fonts.google.com/specimen/Sora) |
| **Secundária** (Body) | `Inter` | [fonts.google.com/specimen/Inter](https://fonts.google.com/specimen/Inter) |

---

## Instalação das Fontes

### Via Google Fonts (CDN)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Via npm (fontsource — recomendado para frameworks)

```bash
# Sora
npm install @fontsource/sora

# Inter
npm install @fontsource/inter
```

```js
// No seu entry point (main.js / main.tsx / _app.tsx)
import '@fontsource/sora/400.css';
import '@fontsource/sora/600.css';
import '@fontsource/sora/700.css';
import '@fontsource/sora/800.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
```

### Via `@font-face` (self-hosted)

```css
@font-face {
  font-family: 'Sora';
  src: url('/fonts/Sora-ExtraBold.woff2') format('woff2');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}
/* Repetir para cada peso necessário */
```

---

## CSS Custom Properties (Design Tokens)

Copie e cole o bloco abaixo no seu arquivo de variáveis globais (`variables.css`, `tokens.css`, ou `:root` do seu projeto).

```css
:root {
  /* ============================================
     FONT FAMILIES
     ============================================ */
  --font-primary: 'Sora', sans-serif;
  --font-secondary: 'Inter', sans-serif;

  /* ============================================
     FONT WEIGHTS
     ============================================ */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* ============================================
     DISPLAY — Sora ExtraBold | line-height: 110% | letter-spacing: 1px
     ============================================ */
  --display-72: 800 72px/1.1 var(--font-primary);
  --display-68: 800 68px/1.1 var(--font-primary);
  --display-64: 800 64px/1.1 var(--font-primary);
  --display-56: 800 56px/1.1 var(--font-primary);
  --display-52: 800 52px/1.1 var(--font-primary);
  --display-48: 800 48px/1.1 var(--font-primary);
  --display-44: 800 44px/1.1 var(--font-primary);
  --display-40: 800 40px/1.1 var(--font-primary);
  --display-36: 800 36px/1.1 var(--font-primary);
  --display-32: 800 32px/1.1 var(--font-primary);

  --display-letter-spacing: 1px;

  /* ============================================
     HEADING — Sora | line-height: 100% | letter-spacing: 0
     ============================================ */
  
  /* Heading Bold */
  --heading-bold-32: 700 32px/1 var(--font-primary);
  --heading-bold-28: 700 28px/1 var(--font-primary);
  --heading-bold-24: 700 24px/1 var(--font-primary);
  --heading-bold-20: 700 20px/1 var(--font-primary);
  --heading-bold-18: 700 18px/1 var(--font-primary);
  --heading-bold-16: 700 16px/1 var(--font-primary);

  /* Heading Semibold */
  --heading-semibold-32: 600 32px/1 var(--font-primary);
  --heading-semibold-28: 600 28px/1 var(--font-primary);
  --heading-semibold-24: 600 24px/1 var(--font-primary);
  --heading-semibold-20: 600 20px/1 var(--font-primary);
  --heading-semibold-18: 600 18px/1 var(--font-primary);
  --heading-semibold-16: 600 16px/1 var(--font-primary);

  /* Heading Extrabold */
  --heading-extrabold-32: 800 32px/1 var(--font-primary);
  --heading-extrabold-28: 800 28px/1 var(--font-primary);
  --heading-extrabold-24: 800 24px/1 var(--font-primary);
  --heading-extrabold-20: 800 20px/1 var(--font-primary);
  --heading-extrabold-18: 800 18px/1 var(--font-primary);
  --heading-extrabold-16: 800 16px/1 var(--font-primary);

  --heading-letter-spacing: 0;

  /* ============================================
     BODY — Inter | line-height: 130% | letter-spacing: 0
     ============================================ */

  /* Body Bold */
  --body-bold-20: 700 20px/1.3 var(--font-secondary);
  --body-bold-18: 700 18px/1.3 var(--font-secondary);
  --body-bold-16: 700 16px/1.3 var(--font-secondary);
  --body-bold-14: 700 14px/1.3 var(--font-secondary);
  --body-bold-12: 700 12px/1.3 var(--font-secondary);

  /* Body Semibold */
  --body-semibold-20: 600 20px/1.3 var(--font-secondary);
  --body-semibold-18: 600 18px/1.3 var(--font-secondary);
  --body-semibold-16: 600 16px/1.3 var(--font-secondary);
  --body-semibold-14: 600 14px/1.3 var(--font-secondary);
  --body-semibold-12: 600 12px/1.3 var(--font-secondary);

  /* Body Medium */
  --body-medium-20: 500 20px/1.3 var(--font-secondary);
  --body-medium-18: 500 18px/1.3 var(--font-secondary);
  --body-medium-16: 500 16px/1.3 var(--font-secondary);
  --body-medium-14: 500 14px/1.3 var(--font-secondary);
  --body-medium-12: 500 12px/1.3 var(--font-secondary);

  /* Body Regular */
  --body-regular-20: 400 20px/1.3 var(--font-secondary);
  --body-regular-18: 400 18px/1.3 var(--font-secondary);
  --body-regular-16: 400 16px/1.3 var(--font-secondary);
  --body-regular-14: 400 14px/1.3 var(--font-secondary);
  --body-regular-12: 400 12px/1.3 var(--font-secondary);

  --body-letter-spacing: 0;
}
```

---

## Utility Classes (CSS)

Classes utilitárias prontas para copiar e colar. Cada classe mapeia diretamente para um token.

```css
/* ============================================
   DISPLAY CLASSES
   ============================================ */
.display-72 { font: var(--display-72); letter-spacing: var(--display-letter-spacing); }
.display-68 { font: var(--display-68); letter-spacing: var(--display-letter-spacing); }
.display-64 { font: var(--display-64); letter-spacing: var(--display-letter-spacing); }
.display-56 { font: var(--display-56); letter-spacing: var(--display-letter-spacing); }
.display-52 { font: var(--display-52); letter-spacing: var(--display-letter-spacing); }
.display-48 { font: var(--display-48); letter-spacing: var(--display-letter-spacing); }
.display-44 { font: var(--display-44); letter-spacing: var(--display-letter-spacing); }
.display-40 { font: var(--display-40); letter-spacing: var(--display-letter-spacing); }
.display-36 { font: var(--display-36); letter-spacing: var(--display-letter-spacing); }
.display-32 { font: var(--display-32); letter-spacing: var(--display-letter-spacing); }

/* ============================================
   HEADING BOLD CLASSES
   ============================================ */
.heading-bold-32 { font: var(--heading-bold-32); letter-spacing: var(--heading-letter-spacing); }
.heading-bold-28 { font: var(--heading-bold-28); letter-spacing: var(--heading-letter-spacing); }
.heading-bold-24 { font: var(--heading-bold-24); letter-spacing: var(--heading-letter-spacing); }
.heading-bold-20 { font: var(--heading-bold-20); letter-spacing: var(--heading-letter-spacing); }
.heading-bold-18 { font: var(--heading-bold-18); letter-spacing: var(--heading-letter-spacing); }
.heading-bold-16 { font: var(--heading-bold-16); letter-spacing: var(--heading-letter-spacing); }

/* ============================================
   HEADING SEMIBOLD CLASSES
   ============================================ */
.heading-semibold-32 { font: var(--heading-semibold-32); letter-spacing: var(--heading-letter-spacing); }
.heading-semibold-28 { font: var(--heading-semibold-28); letter-spacing: var(--heading-letter-spacing); }
.heading-semibold-24 { font: var(--heading-semibold-24); letter-spacing: var(--heading-letter-spacing); }
.heading-semibold-20 { font: var(--heading-semibold-20); letter-spacing: var(--heading-letter-spacing); }
.heading-semibold-18 { font: var(--heading-semibold-18); letter-spacing: var(--heading-letter-spacing); }
.heading-semibold-16 { font: var(--heading-semibold-16); letter-spacing: var(--heading-letter-spacing); }

/* ============================================
   HEADING EXTRABOLD CLASSES
   ============================================ */
.heading-extrabold-32 { font: var(--heading-extrabold-32); letter-spacing: var(--heading-letter-spacing); }
.heading-extrabold-28 { font: var(--heading-extrabold-28); letter-spacing: var(--heading-letter-spacing); }
.heading-extrabold-24 { font: var(--heading-extrabold-24); letter-spacing: var(--heading-letter-spacing); }
.heading-extrabold-20 { font: var(--heading-extrabold-20); letter-spacing: var(--heading-letter-spacing); }
.heading-extrabold-18 { font: var(--heading-extrabold-18); letter-spacing: var(--heading-letter-spacing); }
.heading-extrabold-16 { font: var(--heading-extrabold-16); letter-spacing: var(--heading-letter-spacing); }

/* ============================================
   BODY BOLD CLASSES
   ============================================ */
.body-bold-20 { font: var(--body-bold-20); letter-spacing: var(--body-letter-spacing); }
.body-bold-18 { font: var(--body-bold-18); letter-spacing: var(--body-letter-spacing); }
.body-bold-16 { font: var(--body-bold-16); letter-spacing: var(--body-letter-spacing); }
.body-bold-14 { font: var(--body-bold-14); letter-spacing: var(--body-letter-spacing); }
.body-bold-12 { font: var(--body-bold-12); letter-spacing: var(--body-letter-spacing); }

/* ============================================
   BODY SEMIBOLD CLASSES
   ============================================ */
.body-semibold-20 { font: var(--body-semibold-20); letter-spacing: var(--body-letter-spacing); }
.body-semibold-18 { font: var(--body-semibold-18); letter-spacing: var(--body-letter-spacing); }
.body-semibold-16 { font: var(--body-semibold-16); letter-spacing: var(--body-letter-spacing); }
.body-semibold-14 { font: var(--body-semibold-14); letter-spacing: var(--body-letter-spacing); }
.body-semibold-12 { font: var(--body-semibold-12); letter-spacing: var(--body-letter-spacing); }

/* ============================================
   BODY MEDIUM CLASSES
   ============================================ */
.body-medium-20 { font: var(--body-medium-20); letter-spacing: var(--body-letter-spacing); }
.body-medium-18 { font: var(--body-medium-18); letter-spacing: var(--body-letter-spacing); }
.body-medium-16 { font: var(--body-medium-16); letter-spacing: var(--body-letter-spacing); }
.body-medium-14 { font: var(--body-medium-14); letter-spacing: var(--body-letter-spacing); }
.body-medium-12 { font: var(--body-medium-12); letter-spacing: var(--body-letter-spacing); }

/* ============================================
   BODY REGULAR CLASSES
   ============================================ */
.body-regular-20 { font: var(--body-regular-20); letter-spacing: var(--body-letter-spacing); }
.body-regular-18 { font: var(--body-regular-18); letter-spacing: var(--body-letter-spacing); }
.body-regular-16 { font: var(--body-regular-16); letter-spacing: var(--body-letter-spacing); }
.body-regular-14 { font: var(--body-regular-14); letter-spacing: var(--body-letter-spacing); }
.body-regular-12 { font: var(--body-regular-12); letter-spacing: var(--body-letter-spacing); }
```

---

## Tailwind CSS Config

Se o projeto utiliza Tailwind, adicione no `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    fontFamily: {
      primary: ['Sora', 'sans-serif'],
      secondary: ['Inter', 'sans-serif'],
    },
    fontSize: {
      // Display (Sora ExtraBold, line-height 110%, letter-spacing 1px)
      'display-72': ['72px', { lineHeight: '1.1', letterSpacing: '1px', fontWeight: '800' }],
      'display-68': ['68px', { lineHeight: '1.1', letterSpacing: '1px', fontWeight: '800' }],
      'display-64': ['64px', { lineHeight: '1.1', letterSpacing: '1px', fontWeight: '800' }],
      'display-56': ['56px', { lineHeight: '1.1', letterSpacing: '1px', fontWeight: '800' }],
      'display-52': ['52px', { lineHeight: '1.1', letterSpacing: '1px', fontWeight: '800' }],
      'display-48': ['48px', { lineHeight: '1.1', letterSpacing: '1px', fontWeight: '800' }],
      'display-44': ['44px', { lineHeight: '1.1', letterSpacing: '1px', fontWeight: '800' }],
      'display-40': ['40px', { lineHeight: '1.1', letterSpacing: '1px', fontWeight: '800' }],
      'display-36': ['36px', { lineHeight: '1.1', letterSpacing: '1px', fontWeight: '800' }],
      'display-32': ['32px', { lineHeight: '1.1', letterSpacing: '1px', fontWeight: '800' }],

      // Heading (Sora, line-height 100%, letter-spacing 0)
      'heading-32': ['32px', { lineHeight: '1', letterSpacing: '0' }],
      'heading-28': ['28px', { lineHeight: '1', letterSpacing: '0' }],
      'heading-24': ['24px', { lineHeight: '1', letterSpacing: '0' }],
      'heading-20': ['20px', { lineHeight: '1', letterSpacing: '0' }],
      'heading-18': ['18px', { lineHeight: '1', letterSpacing: '0' }],
      'heading-16': ['16px', { lineHeight: '1', letterSpacing: '0' }],

      // Body (Inter, line-height 130%, letter-spacing 0)
      'body-20': ['20px', { lineHeight: '1.3', letterSpacing: '0' }],
      'body-18': ['18px', { lineHeight: '1.3', letterSpacing: '0' }],
      'body-16': ['16px', { lineHeight: '1.3', letterSpacing: '0' }],
      'body-14': ['14px', { lineHeight: '1.3', letterSpacing: '0' }],
      'body-12': ['12px', { lineHeight: '1.3', letterSpacing: '0' }],
    },
    extend: {},
  },
  plugins: [],
};
```

### Uso no Tailwind

```html
<!-- Display -->
<h1 class="font-primary text-display-72">Hero Title</h1>

<!-- Heading Bold -->
<h2 class="font-primary text-heading-32 font-bold">Section Title</h2>

<!-- Heading Semibold -->
<h3 class="font-primary text-heading-24 font-semibold">Subsection</h3>

<!-- Heading Extrabold -->
<h3 class="font-primary text-heading-24 font-extrabold">Emphasis Heading</h3>

<!-- Body Regular -->
<p class="font-secondary text-body-16 font-normal">Paragraph text.</p>

<!-- Body Medium -->
<p class="font-secondary text-body-16 font-medium">Medium emphasis text.</p>

<!-- Body Semibold -->
<span class="font-secondary text-body-14 font-semibold">Label</span>

<!-- Body Bold -->
<strong class="font-secondary text-body-14 font-bold">Strong label</strong>
```

---

## Instruções para a IA (Antigravity)

> **IMPORTANTE:** Cada seção abaixo deve ser implementada como um componente **expand/collapse (accordion)**. A página NÃO deve mostrar todos os exemplos abertos ao mesmo tempo. O estado padrão é **colapsado**.

---

### Estrutura Geral da Página

Crie uma página de documentação interativa com a seguinte hierarquia:

```
Typography
├── Display (Bold)          ← categoria, accordion
│   └── Extrabold           ← subcategoria, accordion interno
│       ├── 72px
│       ├── 68px
│       ├── 64px
│       ├── 56px
│       ├── 52px
│       ├── 48px
│       ├── 44px
│       ├── 40px
│       ├── 36px
│       └── 32px
│
├── Heading                 ← categoria, accordion
│   ├── Bold                ← subcategoria, accordion interno
│   │   ├── 32px
│   │   ├── 28px
│   │   ├── 24px
│   │   ├── 20px
│   │   ├── 18px
│   │   └── 16px
│   ├── Semibold            ← subcategoria, accordion interno
│   │   └── (mesmos tamanhos)
│   └── Extrabold           ← subcategoria, accordion interno
│       └── (mesmos tamanhos)
│
└── Body                    ← categoria, accordion
    ├── Bold                ← subcategoria, accordion interno
    │   ├── 20px
    │   ├── 18px
    │   ├── 16px
    │   ├── 14px
    │   └── 12px
    ├── Semibold            ← subcategoria, accordion interno
    │   └── (mesmos tamanhos)
    ├── Medium              ← subcategoria, accordion interno
    │   └── (mesmos tamanhos)
    └── Regular             ← subcategoria, accordion interno
        └── (mesmos tamanhos)
```

---

### Regras de Implementação

1. **Cada categoria (Display, Heading, Body) é um componente accordion separado.**  
2. **Dentro de cada categoria, cada peso (Bold, Semibold, Extrabold, Medium, Regular) é outro accordion aninhado.**  
3. **Estado padrão: tudo colapsado.** O dev expande somente o que precisa ver.  
4. **Cada item de tamanho deve exibir:**  
   - O texto de exemplo renderizado no estilo correto (com a fonte correta carregada)  
   - Uma tabela de propriedades com: `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`  
   - Um bloco de código copiável com a classe CSS utilitária  
   - Um bloco de código copiável com o uso do design token (CSS custom property)  
   - Um bloco de código copiável com o uso no Tailwind  
5. **Botão "Copiar" (clipboard)** em cada bloco de código.  
6. **Texto de exemplo:** Use `"The quick brown fox jumps over the lazy dog"` para Latin e `"Design System Typography"` para o preview principal.

---

### Especificação por Categoria

---

#### 📌 DISPLAY (Bold)

> **Implementar como:** Accordion de categoria chamado "Display"  
> **Subcategoria interna:** `Extrabold` (único peso, ainda assim dentro de accordion)

| Propriedade | Valor |
|---|---|
| Font Family | `Sora` |
| Font Weight | `800` (Extrabold) |
| Line Height | `110%` (`1.1`) |
| Letter Spacing | `1px` |

**Tamanhos:** 72, 68, 64, 56, 52, 48, 44, 40, 36, 32

Para cada tamanho, exibir:

```
┌─────────────────────────────────────────────────────┐
│  Display System Typography                          │  ← texto renderizado no estilo
│                                                     │
│  Font: Sora | Weight: Extrabold (800)               │
│  Size: 72px | Line Height: 110% | Spacing: 1px     │
│                                                     │
│  CSS Class:                                         │
│  ┌───────────────────────────────────┐ [Copiar]     │
│  │ class="display-72"               │              │
│  └───────────────────────────────────┘              │
│                                                     │
│  CSS Token:                                         │
│  ┌───────────────────────────────────┐ [Copiar]     │
│  │ font: var(--display-72);         │              │
│  │ letter-spacing: var(             │              │
│  │   --display-letter-spacing);     │              │
│  └───────────────────────────────────┘              │
│                                                     │
│  Tailwind:                                          │
│  ┌───────────────────────────────────┐ [Copiar]     │
│  │ font-primary text-display-72     │              │
│  └───────────────────────────────────┘              │
└─────────────────────────────────────────────────────┘
```

---

#### 📌 HEADING

> **Implementar como:** Accordion de categoria chamado "Heading"  
> **Subcategorias internas (3 accordions):** `Bold`, `Semibold`, `Extrabold`

| Propriedade | Valor |
|---|---|
| Font Family | `Sora` |
| Font Weights | `700` (Bold), `600` (Semibold), `800` (Extrabold) |
| Line Height | `100%` (`1`) |
| Letter Spacing | `0` |

**Tamanhos:** 32, 28, 24, 20, 18, 16

Para cada combinação peso × tamanho, exibir o mesmo layout de card da seção Display, com os valores corretos. Exemplo para Heading Bold 32:

```
┌─────────────────────────────────────────────────────┐
│  Heading Bold Typography                            │  ← renderizado em Sora Bold 32px
│                                                     │
│  Font: Sora | Weight: Bold (700)                    │
│  Size: 32px | Line Height: 100% | Spacing: 0       │
│                                                     │
│  CSS Class:                                         │
│  ┌───────────────────────────────────┐ [Copiar]     │
│  │ class="heading-bold-32"          │              │
│  └───────────────────────────────────┘              │
│                                                     │
│  CSS Token:                                         │
│  ┌───────────────────────────────────┐ [Copiar]     │
│  │ font: var(--heading-bold-32);    │              │
│  │ letter-spacing: var(             │              │
│  │   --heading-letter-spacing);     │              │
│  └───────────────────────────────────┘              │
│                                                     │
│  Tailwind:                                          │
│  ┌───────────────────────────────────┐ [Copiar]     │
│  │ font-primary text-heading-32     │              │
│  │ font-bold                        │              │
│  └───────────────────────────────────┘              │
└─────────────────────────────────────────────────────┘
```

---

#### 📌 BODY

> **Implementar como:** Accordion de categoria chamado "Body"  
> **Subcategorias internas (4 accordions):** `Bold`, `Semibold`, `Medium`, `Regular`

| Propriedade | Valor |
|---|---|
| Font Family | `Inter` |
| Font Weights | `700` (Bold), `600` (Semibold), `500` (Medium), `400` (Regular) |
| Line Height | `130%` (`1.3`) |
| Letter Spacing | `0` |

**Tamanhos:** 20, 18, 16, 14, 12

Mesmo padrão de card, com valores correspondentes. Exemplo para Body Regular 16:

```
┌─────────────────────────────────────────────────────┐
│  The quick brown fox jumps over the lazy dog        │  ← renderizado em Inter Regular 16px
│                                                     │
│  Font: Inter | Weight: Regular (400)                │
│  Size: 16px | Line Height: 130% | Spacing: 0       │
│                                                     │
│  CSS Class:                                         │
│  ┌───────────────────────────────────┐ [Copiar]     │
│  │ class="body-regular-16"          │              │
│  └───────────────────────────────────┘              │
│                                                     │
│  CSS Token:                                         │
│  ┌───────────────────────────────────┐ [Copiar]     │
│  │ font: var(--body-regular-16);    │              │
│  │ letter-spacing: var(             │              │
│  │   --body-letter-spacing);        │              │
│  └───────────────────────────────────┘              │
│                                                     │
│  Tailwind:                                          │
│  ┌───────────────────────────────────┐ [Copiar]     │
│  │ font-secondary text-body-16      │              │
│  │ font-normal                      │              │
│  └───────────────────────────────────┘              │
└─────────────────────────────────────────────────────┘
```

---

## Tabela de Referência Rápida

### Display

| Token | Família | Peso | Tamanho | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `--display-72` | Sora | 800 | 72px | 110% | 1px |
| `--display-68` | Sora | 800 | 68px | 110% | 1px |
| `--display-64` | Sora | 800 | 64px | 110% | 1px |
| `--display-56` | Sora | 800 | 56px | 110% | 1px |
| `--display-52` | Sora | 800 | 52px | 110% | 1px |
| `--display-48` | Sora | 800 | 48px | 110% | 1px |
| `--display-44` | Sora | 800 | 44px | 110% | 1px |
| `--display-40` | Sora | 800 | 40px | 110% | 1px |
| `--display-36` | Sora | 800 | 36px | 110% | 1px |
| `--display-32` | Sora | 800 | 32px | 110% | 1px |

### Heading

| Token | Família | Peso | Tamanho | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `--heading-bold-32` | Sora | 700 | 32px | 100% | 0 |
| `--heading-bold-28` | Sora | 700 | 28px | 100% | 0 |
| `--heading-bold-24` | Sora | 700 | 24px | 100% | 0 |
| `--heading-bold-20` | Sora | 700 | 20px | 100% | 0 |
| `--heading-bold-18` | Sora | 700 | 18px | 100% | 0 |
| `--heading-bold-16` | Sora | 700 | 16px | 100% | 0 |
| `--heading-semibold-32` | Sora | 600 | 32px | 100% | 0 |
| `--heading-semibold-28` | Sora | 600 | 28px | 100% | 0 |
| `--heading-semibold-24` | Sora | 600 | 24px | 100% | 0 |
| `--heading-semibold-20` | Sora | 600 | 20px | 100% | 0 |
| `--heading-semibold-18` | Sora | 600 | 18px | 100% | 0 |
| `--heading-semibold-16` | Sora | 600 | 16px | 100% | 0 |
| `--heading-extrabold-32` | Sora | 800 | 32px | 100% | 0 |
| `--heading-extrabold-28` | Sora | 800 | 28px | 100% | 0 |
| `--heading-extrabold-24` | Sora | 800 | 24px | 100% | 0 |
| `--heading-extrabold-20` | Sora | 800 | 20px | 100% | 0 |
| `--heading-extrabold-18` | Sora | 800 | 18px | 100% | 0 |
| `--heading-extrabold-16` | Sora | 800 | 16px | 100% | 0 |

### Body

| Token | Família | Peso | Tamanho | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `--body-bold-20` | Inter | 700 | 20px | 130% | 0 |
| `--body-bold-18` | Inter | 700 | 18px | 130% | 0 |
| `--body-bold-16` | Inter | 700 | 16px | 130% | 0 |
| `--body-bold-14` | Inter | 700 | 14px | 130% | 0 |
| `--body-bold-12` | Inter | 700 | 12px | 130% | 0 |
| `--body-semibold-20` | Inter | 600 | 20px | 130% | 0 |
| `--body-semibold-18` | Inter | 600 | 18px | 130% | 0 |
| `--body-semibold-16` | Inter | 600 | 16px | 130% | 0 |
| `--body-semibold-14` | Inter | 600 | 14px | 130% | 0 |
| `--body-semibold-12` | Inter | 600 | 12px | 130% | 0 |
| `--body-medium-20` | Inter | 500 | 20px | 130% | 0 |
| `--body-medium-18` | Inter | 500 | 18px | 130% | 0 |
| `--body-medium-16` | Inter | 500 | 16px | 130% | 0 |
| `--body-medium-14` | Inter | 500 | 14px | 130% | 0 |
| `--body-medium-12` | Inter | 500 | 12px | 130% | 0 |
| `--body-regular-20` | Inter | 400 | 20px | 130% | 0 |
| `--body-regular-18` | Inter | 400 | 18px | 130% | 0 |
| `--body-regular-16` | Inter | 400 | 16px | 130% | 0 |
| `--body-regular-14` | Inter | 400 | 14px | 130% | 0 |
| `--body-regular-12` | Inter | 400 | 12px | 130% | 0 |

---

## Guia de Uso Semântico

| Contexto | Token Recomendado |
|---|---|
| Hero / Landing page title | `display-72` ou `display-64` |
| Page title | `display-48` ou `display-40` |
| Section title | `heading-bold-32` ou `heading-bold-28` |
| Card title | `heading-semibold-24` ou `heading-bold-20` |
| Subtitle / Overline | `heading-semibold-16` |
| Body text (padrão) | `body-regular-16` |
| Body text (emphasis) | `body-medium-16` ou `body-semibold-16` |
| Small text / Caption | `body-regular-14` ou `body-regular-12` |
| Label / Tag | `body-semibold-12` |
| Button text (large) | `body-semibold-16` ou `body-bold-16` |
| Button text (small) | `body-semibold-14` |
| Input text | `body-regular-16` |
| Input label | `body-medium-14` |
| Tooltip | `body-regular-12` |
| Navigation link | `body-semibold-14` ou `body-medium-16` |
| Footer text | `body-regular-14` |
| Badge / Chip | `body-semibold-12` |
| Table header | `body-semibold-14` |
| Table cell | `body-regular-14` |

---

## Responsividade

Recomendação de escala responsiva para breakpoints:

```css
/* Mobile-first approach */

/* Base (mobile): 0 - 767px */
.page-title   { font: var(--display-36); letter-spacing: var(--display-letter-spacing); }
.section-title { font: var(--heading-bold-24); }
.body-text     { font: var(--body-regular-16); }

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .page-title   { font: var(--display-48); letter-spacing: var(--display-letter-spacing); }
  .section-title { font: var(--heading-bold-28); }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .page-title   { font: var(--display-64); letter-spacing: var(--display-letter-spacing); }
  .section-title { font: var(--heading-bold-32); }
}

/* Large Desktop: 1440px+ */
@media (min-width: 1440px) {
  .page-title   { font: var(--display-72); letter-spacing: var(--display-letter-spacing); }
}
```

---

## Acessibilidade

- **Tamanho mínimo de body:** `14px` para conteúdo principal, `12px` apenas para labels e captions secundários.
- **Contraste:** Todos os textos devem respeitar WCAG 2.1 AA (ratio mínimo de `4.5:1` para texto normal, `3:1` para texto grande ≥ 18px bold ou ≥ 24px regular).
- **`font-display: swap`:** Sempre utilizar para evitar FOIT (Flash of Invisible Text).
- **Unidades relativas:** Considere usar `rem` ao invés de `px` em projetos que precisam suportar zoom do navegador. Equivalência: `1rem = 16px` (padrão).

---

## Changelog

| Versão | Data | Descrição |
|---|---|---|
| 1.0.0 | Abril 2026 | Lançamento inicial — Display, Heading e Body |
