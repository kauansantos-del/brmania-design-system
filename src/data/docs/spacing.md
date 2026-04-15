# 📐 Design System — Espaçamento

> **Versão:** 1.0.0  
> **Última atualização:** Abril 2026  
> **Mantido por:** Time de Design  
> **Baseado em:** Material Design 4px Baseline Grid

---

## Visão Geral

Nosso sistema de espaçamento segue o **grid de 4px** do Material Design. Todos os valores de margin, padding, gap, e dimensões de componentes devem ser **múltiplos de 4px**. Isso garante ritmo visual, alinhamento preciso entre elementos, e renderização limpa em todas as densidades de tela (1x, 1.5x, 2x, 3x).

### Por que 4px?

- Múltiplos de 4 nunca geram meios-pixels em telas 1.5x (4 × 1.5 = 6px — inteiro).
- Oferece mais granularidade que o grid de 8px para interfaces densas (mobile, dashboards).
- É o padrão adotado pelo Material Design e pela maioria dos design systems modernos.

### Regra de ouro

> **Todo valor de espaçamento no CSS deve ser divisível por 4.**
> Se você está escrevendo `margin: 7px` ou `padding: 15px`, está errado. Use `8px` ou `16px`.

---

## Escala de Espaçamento

A escala define os valores permitidos. Use **somente estes valores** no projeto.

| Token | Valor | rem | Uso Primário |
|---|---|---|---|
| `--space-0` | `0px` | `0` | Reset / sem espaço |
| `--space-1` | `4px` | `0.25rem` | Micro gaps — entre ícone e label, gap de tags inline |
| `--space-2` | `8px` | `0.5rem` | Gap interno compacto — entre items de lista, padding de badges |
| `--space-3` | `12px` | `0.75rem` | Gap intermediário — padding de small buttons, gap de form fields inline |
| `--space-4` | `16px` | `1rem` | **Padrão geral** — padding de componentes, gap de form fields, margin entre parágrafos |
| `--space-5` | `20px` | `1.25rem` | Gap entre grupos de fields, padding de cards compactos |
| `--space-6` | `24px` | `1.5rem` | Padding de cards, gap entre seções dentro de um card |
| `--space-7` | `32px` | `2rem` | Separação entre seções, margin entre blocos de conteúdo |
| `--space-8` | `40px` | `2.5rem` | Gap entre seções grandes, padding de containers |
| `--space-9` | `48px` | `3rem` | Margin de hero sections, padding vertical de sections |
| `--space-10` | `64px` | `4rem` | Separação entre sections de página |
| `--space-11` | `80px` | `5rem` | Padding de page sections (landing pages) |
| `--space-12` | `96px` | `6rem` | Spacing de hero / header sections |
| `--space-13` | `128px` | `8rem` | Separação máxima entre blocos de alto nível |

---

## CSS Design Tokens

```css
:root {
  /* ============================================
     SPACING SCALE (4px grid)
     ============================================ */
  --space-0:  0px;
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-7:  32px;
  --space-8:  40px;
  --space-9:  48px;
  --space-10: 64px;
  --space-11: 80px;
  --space-12: 96px;
  --space-13: 128px;

  /* ============================================
     SEMANTIC SPACING ALIASES
     ============================================ */

  /* Component internals */
  --padding-xs:       var(--space-1);  /* 4px  — badges, tags */
  --padding-sm:       var(--space-2);  /* 8px  — small buttons, compact inputs */
  --padding-md:       var(--space-4);  /* 16px — default component padding */
  --padding-lg:       var(--space-6);  /* 24px — cards, modals */
  --padding-xl:       var(--space-8);  /* 40px — hero sections, large containers */

  /* Gaps between items */
  --gap-xs:           var(--space-1);  /* 4px  — icon-to-label, inline tags */
  --gap-sm:           var(--space-2);  /* 8px  — list items, tight groups */
  --gap-md:           var(--space-4);  /* 16px — form fields, card grids */
  --gap-lg:           var(--space-6);  /* 24px — section groups inside card */
  --gap-xl:           var(--space-7);  /* 32px — major content blocks */

  /* Section spacing */
  --section-gap-sm:   var(--space-7);  /* 32px */
  --section-gap-md:   var(--space-9);  /* 48px */
  --section-gap-lg:   var(--space-10); /* 64px */
  --section-gap-xl:   var(--space-12); /* 96px */

  /* ============================================
     BORDER RADIUS (4px grid)
     ============================================ */
  --radius-xs:  4px;
  --radius-sm:  8px;
  --radius-md:  12px;
  --radius-lg:  16px;
  --radius-xl:  24px;
  --radius-full: 9999px; /* pill / circle */

  /* ============================================
     COMPONENT SIZING (4px grid)
     ============================================ */
  --size-icon-sm:     16px;
  --size-icon-md:     20px;
  --size-icon-lg:     24px;

  --size-button-sm:   32px;  /* height */
  --size-button-md:   40px;
  --size-button-lg:   48px;

  --size-input-sm:    32px;  /* height */
  --size-input-md:    40px;
  --size-input-lg:    48px;

  --size-avatar-sm:   24px;
  --size-avatar-md:   32px;
  --size-avatar-lg:   40px;
  --size-avatar-xl:   48px;
}
```

---

## Tailwind CSS Config

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    spacing: {
      '0':  '0px',
      '1':  '4px',
      '2':  '8px',
      '3':  '12px',
      '4':  '16px',
      '5':  '20px',
      '6':  '24px',
      '7':  '32px',
      '8':  '40px',
      '9':  '48px',
      '10': '64px',
      '11': '80px',
      '12': '96px',
      '13': '128px',
    },
    borderRadius: {
      'none': '0',
      'xs':   '4px',
      'sm':   '8px',
      'md':   '12px',
      'lg':   '16px',
      'xl':   '24px',
      'full': '9999px',
    },
    extend: {},
  },
};
```

### Uso no Tailwind

```html
<!-- Padding interno de 16px (space-4) -->
<div class="p-4">

<!-- Gap de 8px entre items (space-2) -->
<div class="flex gap-2">

<!-- Margin top de 32px entre seções (space-7) -->
<section class="mt-7">

<!-- Card com padding 24px e radius 16px -->
<div class="p-6 rounded-lg">
```

---

## Guia de Aplicação por Componente

### 📌 Buttons

| Variante | Height | Padding Horizontal | Gap (ícone-label) | Border Radius |
|---|---|---|---|---|
| **Small** | `32px` | `12px` | `4px` | `8px` |
| **Medium** (default) | `40px` | `16px` | `8px` | `8px` |
| **Large** | `48px` | `24px` | `8px` | `12px` |

```css
.btn-sm  { height: 32px; padding: 0 12px; gap: 4px;  border-radius: 8px; }
.btn-md  { height: 40px; padding: 0 16px; gap: 8px;  border-radius: 8px; }
.btn-lg  { height: 48px; padding: 0 24px; gap: 8px;  border-radius: 12px; }
```

---

### 📌 Inputs / Form Fields

| Variante | Height | Padding Horizontal | Border Radius |
|---|---|---|---|
| **Small** | `32px` | `8px` | `8px` |
| **Medium** (default) | `40px` | `12px` | `8px` |
| **Large** | `48px` | `16px` | `12px` |

| Contexto | Espaçamento |
|---|---|
| Gap entre label e input | `4px` |
| Gap entre input e helper text | `4px` |
| Gap entre fields no form | `16px` |
| Gap entre grupos de fields | `24px` |

```css
.form-field { display: flex; flex-direction: column; gap: 4px; }
.form-group { display: flex; flex-direction: column; gap: 16px; }
.form-section { display: flex; flex-direction: column; gap: 24px; }
```

---

### 📌 Cards

| Propriedade | Valor |
|---|---|
| Padding | `24px` (padrão) / `16px` (compacto) |
| Gap interno entre seções | `16px` |
| Border Radius | `16px` |
| Gap entre cards em grid | `16px` |

```css
.card {
  padding: 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.card--compact { padding: 16px; }
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
```

---

### 📌 Badges / Tags

| Propriedade | Valor |
|---|---|
| Padding vertical | `4px` |
| Padding horizontal | `8px` |
| Gap (ícone-texto) | `4px` |
| Border Radius | `9999px` (pill) ou `8px` (rounded) |

```css
.badge {
  padding: 4px 8px;
  border-radius: 9999px;
  gap: 4px;
}
```

---

### 📌 Tooltips

| Propriedade | Valor |
|---|---|
| Padding | `4px 8px` |
| Border Radius | `8px` |
| Distância do trigger | `4px` |
| Max Width | `240px` |

```css
.tooltip {
  padding: 4px 8px;
  border-radius: 8px;
  max-width: 240px;
}
```

---

### 📌 Modals / Dialogs

| Propriedade | Valor |
|---|---|
| Padding | `24px` |
| Border Radius | `16px` |
| Gap entre título e conteúdo | `16px` |
| Gap entre conteúdo e ações | `24px` |
| Gap entre botões de ação | `8px` |

```css
.modal {
  padding: 24px;
  border-radius: 16px;
}
.modal__header   { margin-bottom: 16px; }
.modal__actions  { margin-top: 24px; display: flex; gap: 8px; justify-content: flex-end; }
```

---

### 📌 Tables

| Propriedade | Valor |
|---|---|
| Cell padding | `8px 12px` (compact) / `12px 16px` (default) |
| Header padding | `8px 12px` |
| Border radius da tabela | `12px` |

---

### 📌 Sidebar / Navigation

| Propriedade | Valor |
|---|---|
| Sidebar width | `240px` (default) / `280px` (wide) |
| Sidebar padding | `8px` |
| Nav item padding | `8px 12px` |
| Nav item border radius | `8px` |
| Gap entre items | `4px` |
| Gap entre seções | `16px` |

---

### 📌 Lists / Stack

| Contexto | Gap |
|---|---|
| Items compactos (chips, tags) | `4px` |
| Items de lista padrão | `8px` |
| Items de lista com descrição | `12px` |
| Cards em stack | `16px` |
| Seções | `24px`–`32px` |

---

### 📌 Page Layout

| Contexto | Espaçamento |
|---|---|
| Content max-width | `1200px` |
| Content padding horizontal | `16px` (mobile) / `24px` (tablet) / `32px` (desktop) |
| Espaço entre header e conteúdo | `32px` |
| Espaço entre seções de página | `48px`–`64px` |
| Espaço entre seções em landing pages | `80px`–`96px` |

```css
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}
@media (min-width: 768px) { .page-container { padding: 0 24px; } }
@media (min-width: 1024px) { .page-container { padding: 0 32px; } }

.page-section + .page-section { margin-top: 48px; }
.landing-section + .landing-section { margin-top: 80px; }
```

---

## Regras Fundamentais (Do & Don't)

### ✅ DO

- **Todo valor de espaçamento é múltiplo de 4px.** Sem exceções.
- **Use tokens CSS** (`var(--space-4)`) em vez de valores crus. Assim, se a escala mudar, tudo atualiza.
- **Mantenha consistência vertical.** Se o gap entre itens de uma lista é `8px`, o gap de TODAS as listas similares é `8px`.
- **Use `gap` ao invés de margins individuais.** `display: flex; gap: 16px;` é mais limpo que `margin-bottom: 16px` em cada filho.
- **Border radius também é 4px grid.** Use os tokens `--radius-sm`, `--radius-md`, etc.
- **Heights de componentes interativos são 4px grid.** Buttons, inputs e selects devem ter altura de 32, 40 ou 48px.

### ❌ DON'T

- **Nunca use valores quebrados:** `5px`, `7px`, `15px`, `17px` — todos fora do grid.
- **Nunca use `margin` para criar espaço entre filhos** quando `gap` resolve. Margin é para espaçamento externo ao componente.
- **Nunca misture escala.** Se você usa `8px` de gap em um lugar, não use `10px` em outro similar.
- **Nunca use `padding: 0` em componentes interativos.** Mínimo de `4px` para área de toque/legibilidade.
- **Nunca invente valores fora da escala.** Se `16px` é pouco e `24px` é muito, use `20px` (que está na escala). Se `20px` não funciona, reavalie o layout.

---

## Referência Rápida — Spacing por Contexto

| Contexto | Token | Valor |
|---|---|---|
| Ícone ao lado de texto | `--space-1` | 4px |
| Tags lado a lado | `--space-2` | 8px |
| Label acima de input | `--space-1` | 4px |
| Fields em formulário | `--space-4` | 16px |
| Padding de badge | `--space-1` / `--space-2` | 4px / 8px |
| Padding de button | `--space-3` / `--space-4` | 12px / 16px |
| Padding de card | `--space-6` | 24px |
| Padding de modal | `--space-6` | 24px |
| Gap de card grid | `--space-4` | 16px |
| Separação entre seções | `--space-7` | 32px |
| Separação entre page sections | `--space-9` ou `--space-10` | 48px / 64px |
| Hero section padding vertical | `--space-12` | 96px |

---

## Instruções para a IA (Antigravity)

### Estrutura da Página

```
Spacing
├── Escala Visual (sempre visível)           ← barra visual mostrando todos os valores
│
├── Tokens & Variáveis                       ← accordion
│   ├── CSS Custom Properties                ← accordion interno
│   └── Tailwind Config                      ← accordion interno
│
├── Ilustrações de Uso                       ← accordion
│   ├── Anatomia de um Button                ← accordion interno (SVG inline)
│   ├── Anatomia de um Card                  ← accordion interno (SVG inline)
│   ├── Anatomia de um Form                  ← accordion interno (SVG inline)
│   ├── Anatomia de uma Page                 ← accordion interno (SVG inline)
│   └── Grid de 4px (Overlay Demo)           ← accordion interno (interativo)
│
├── Componentes                              ← accordion
│   ├── Buttons                              ← accordion interno
│   ├── Inputs                               ← accordion interno
│   ├── Cards                                ← accordion interno
│   ├── Badges / Tags                        ← accordion interno
│   ├── Tooltips                             ← accordion interno
│   ├── Modals                               ← accordion interno
│   ├── Tables                               ← accordion interno
│   ├── Sidebar / Nav                        ← accordion interno
│   └── Page Layout                          ← accordion interno
│
└── Do & Don't (visual)                      ← accordion
    ├── Correto vs Incorreto                 ← accordion interno (side-by-side visual)
    └── Detecção de Erros Comuns             ← accordion interno
```

### Regras de Implementação Visual

1. **Escala visual no topo:** Barra horizontal mostrando cada step como um retângulo proporcional ao tamanho, com o token e valor em px.
2. **Cada ilustração é um SVG inline** mostrando as dimensões com linhas de cota (dimension lines) e labels de espaçamento.
3. **Toggle de 4px grid overlay** — um botão que exibe um grid de 4px semitransparente sobre qualquer componente para verificar alinhamento.
4. **Cada bloco de código tem botão "Copiar"** (clipboard).
5. **Na seção Do & Don't**, mostrar side-by-side: componente com espaçamento correto (verde) vs componente com espaçamento incorreto (vermelho), com os valores comparados.

---

## Changelog

| Versão | Data | Descrição |
|---|---|---|
| 1.0.0 | Abril 2026 | Lançamento inicial — Escala, tokens, componentes, ilustrações |
