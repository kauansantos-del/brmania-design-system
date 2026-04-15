# 🎨 Design System — Cores

> **Versão:** 1.0.0  
> **Última atualização:** Abril 2026  
> **Mantido por:** Time de Design  
> **Baseado em:** Radix Colors Scale (12 steps)

---

## Visão Geral

Nosso sistema de cores segue a arquitetura da **Radix Colors**, com escalas de 12 steps. Cada step tem um propósito funcional bem definido. As cores são divididas em duas camadas:

| Camada | Escalas | Papel |
|---|---|---|
| **Primitivas** | `Gray`, `Principal` (verde) | Neutros e cor de marca/acento |
| **Semânticas** | `Vermelho`, `Amarelo`, `Azul`, `Violeta` | Feedback e comunicação de estados |

O sistema suporta **Light Mode** e **Dark Mode** nativamente — os mesmos tokens semânticos apontam para valores diferentes em cada tema.

---

## A Escala de 12 Steps (Radix)

Cada escala segue o padrão Radix de 12 steps. Esta é a regra fundamental do sistema — **todo dev deve internalizar essa tabela.**

| Step | Uso Primário | Quando Usar |
|---|---|---|
| **1** | App background | Fundo principal da aplicação |
| **2** | Subtle background | Fundo de cards, sidebars, blocos de código, tabelas listradas |
| **3** | UI element background | Estado **default** de componentes interativos (buttons, inputs, selects) |
| **4** | Hovered UI element background | Estado **hover** de componentes |
| **5** | Active / Selected UI element background | Estado **pressed**, **active** ou **selected** |
| **6** | Subtle borders and separators | Bordas sutis em elementos **não-interativos** (cards, separadores, headers) |
| **7** | UI element border and focus rings | Bordas de componentes **interativos** e **focus rings** |
| **8** | Hovered UI element border | Borda em estado **hover** de componentes interativos |
| **9** | Solid backgrounds | Fundo sólido de destaque — a cor **mais pura** da escala (botões primários, badges, banners) |
| **10** | Hovered solid backgrounds | Estado **hover** quando o step 9 é o background default |
| **11** | Low-contrast text | Texto secundário, placeholders, labels de baixo contraste |
| **12** | High-contrast text | Texto principal, títulos, alto contraste |

### Regra de ouro

> **Steps 1–2** = backgrounds → **3–5** = component states → **6–8** = borders → **9–10** = solid/accent → **11–12** = text

---

## Paleta Completa

### Primitivas — Gray

| Step | Light | Dark | CSS Token |
|---|---|---|---|
| 1 | `#FCFCFC` | `#111111` | `--gray-1` |
| 2 | `#F0F0F0` | `#191919` | `--gray-2` |
| 3 | `#F0F0F0` | `#222222` | `--gray-3` |
| 4 | `#E8E8E8` | `#2A2A2A` | `--gray-4` |
| 5 | `#E0E0E0` | `#313131` | `--gray-5` |
| 6 | `#D9D9D9` | `#3A3A3A` | `--gray-6` |
| 7 | `#CECECE` | `#484848` | `--gray-7` |
| 8 | `#BBBBBB` | `#606060` | `--gray-8` |
| 9 | `#8D8D8D` | `#6E6E6E` | `--gray-9` |
| 10 | `#838383` | `#7B7B7B` | `--gray-10` |
| 11 | `#646464` | `#B4B4B4` | `--gray-11` |
| 12 | `#202020` | `#EEEEEE` | `--gray-12` |

### Primitivas — Principal (Green / Brand)

| Step | Light | Dark | CSS Token |
|---|---|---|---|
| 1 | `#FBFEFB` | `#0E1511` | `--principal-1` |
| 2 | `#F5FBF5` | `#141A15` | `--principal-2` |
| 3 | `#E9F6E9` | `#1B2A1E` | `--principal-3` |
| 4 | `#DAF1DB` | `#1D3A24` | `--principal-4` |
| 5 | `#C9E8CA` | `#25482D` | `--principal-5` |
| 6 | `#B2DDB5` | `#2D5736` | `--principal-6` |
| 7 | `#94CE9A` | `#366740` | `--principal-7` |
| 8 | `#65BA74` | `#3E7949` | `--principal-8` |
| 9 | `#46A758` | `#46A760` | `--principal-9` |
| 10 | `#3E9B57` | `#53B36D` | `--principal-10` |
| 11 | `#2A7E40` | `#71D08A` | `--principal-11` |
| 12 | `#203C25` | `#C2F0CE` | `--principal-12` |

### Semânticas — Vermelho (Error / Danger)

| Step | Light | Dark | CSS Token |
|---|---|---|---|
| 1 | `#FFFCFC` | `#191111` | `--vermelho-1` |
| 2 | `#FFF7F7` | `#201314` | `--vermelho-2` |
| 3 | `#FEEBEC` | `#3B1219` | `--vermelho-3` |
| 4 | `#FFDBDC` | `#500F1C` | `--vermelho-4` |
| 5 | `#FFCDCE` | `#611623` | `--vermelho-5` |
| 6 | `#FDBDBE` | `#72232D` | `--vermelho-6` |
| 7 | `#F4A9AA` | `#8C333A` | `--vermelho-7` |
| 8 | `#EB8E90` | `#B54548` | `--vermelho-8` |
| 9 | `#E5484D` | `#E5484D` | `--vermelho-9` |
| 10 | `#DC3D43` | `#EC5D5E` | `--vermelho-10` |
| 11 | `#CE2C31` | `#FF9592` | `--vermelho-11` |
| 12 | `#641723` | `#FFD1D9` | `--vermelho-12` |

### Semânticas — Amarelo (Warning)

| Step | Light | Dark | CSS Token |
|---|---|---|---|
| 1 | `#FDFDF9` | `#14120B` | `--amarelo-1` |
| 2 | `#FFFCE8` | `#1B180F` | `--amarelo-2` |
| 3 | `#FFFBD1` | `#2D2305` | `--amarelo-3` |
| 4 | `#FFF8BB` | `#362B00` | `--amarelo-4` |
| 5 | `#FEF2A4` | `#433500` | `--amarelo-5` |
| 6 | `#F9E68C` | `#524202` | `--amarelo-6` |
| 7 | `#EFD36C` | `#665417` | `--amarelo-7` |
| 8 | `#EBBC00` | `#836A21` | `--amarelo-8` |
| 9 | `#F5D90A` | `#FFC53D` | `--amarelo-9` |
| 10 | `#F7CE00` | `#FFFF57` | `--amarelo-10` |
| 11 | `#946800` | `#F5E147` | `--amarelo-11` |
| 12 | `#35290F` | `#F6EEB4` | `--amarelo-12` |

### Semânticas — Azul (Info)

| Step | Light | Dark | CSS Token |
|---|---|---|---|
| 1 | `#FAFDFE` | `#0B161A` | `--azul-1` |
| 2 | `#F2FAFB` | `#101B20` | `--azul-2` |
| 3 | `#DEF7F9` | `#082C36` | `--azul-3` |
| 4 | `#CAF1F6` | `#003848` | `--azul-4` |
| 5 | `#B5E9F0` | `#004558` | `--azul-5` |
| 6 | `#9DDDE7` | `#045468` | `--azul-6` |
| 7 | `#7DCEDC` | `#12677E` | `--azul-7` |
| 8 | `#3DB9CF` | `#11809C` | `--azul-8` |
| 9 | `#00A2C7` | `#00A2C7` | `--azul-9` |
| 10 | `#0797B9` | `#23AFD0` | `--azul-10` |
| 11 | `#107D98` | `#4CCCE6` | `--azul-11` |
| 12 | `#0D3C48` | `#B6ECF7` | `--azul-12` |

### Semânticas — Violeta (Accent secundário / Informativo)

| Step | Light | Dark | CSS Token |
|---|---|---|---|
| 1 | `#FDFCFE` | `#14121F` | `--violeta-1` |
| 2 | `#FAF8FF` | `#1B1525` | `--violeta-2` |
| 3 | `#F4F0FE` | `#291F43` | `--violeta-3` |
| 4 | `#EBE4FF` | `#33255B` | `--violeta-4` |
| 5 | `#E1D9FF` | `#3C2E69` | `--violeta-5` |
| 6 | `#D4CAFE` | `#473876` | `--violeta-6` |
| 7 | `#C2B5F5` | `#56468B` | `--violeta-7` |
| 8 | `#AA99EC` | `#6958AD` | `--violeta-8` |
| 9 | `#6E56CF` | `#6E56CF` | `--violeta-9` |
| 10 | `#654DC4` | `#7D66D9` | `--violeta-10` |
| 11 | `#6550B9` | `#BAA7FF` | `--violeta-11` |
| 12 | `#2F265F` | `#E2DDFE` | `--violeta-12` |

---

## CSS Design Tokens

Copie e cole no seu arquivo de tokens globais. O sistema usa `data-theme` no `<html>` para alternar entre temas.

```css
/* ============================================
   COLOR TOKENS — LIGHT THEME (default)
   ============================================ */
:root,
[data-theme="light"] {

  /* --- Gray --- */
  --gray-1: #FCFCFC;
  --gray-2: #F0F0F0;
  --gray-3: #F0F0F0;
  --gray-4: #E8E8E8;
  --gray-5: #E0E0E0;
  --gray-6: #D9D9D9;
  --gray-7: #CECECE;
  --gray-8: #BBBBBB;
  --gray-9: #8D8D8D;
  --gray-10: #838383;
  --gray-11: #646464;
  --gray-12: #202020;

  /* --- Principal (Brand / Green) --- */
  --principal-1: #FBFEFB;
  --principal-2: #F5FBF5;
  --principal-3: #E9F6E9;
  --principal-4: #DAF1DB;
  --principal-5: #C9E8CA;
  --principal-6: #B2DDB5;
  --principal-7: #94CE9A;
  --principal-8: #65BA74;
  --principal-9: #46A758;
  --principal-10: #3E9B57;
  --principal-11: #2A7E40;
  --principal-12: #203C25;

  /* --- Vermelho (Error) --- */
  --vermelho-1: #FFFCFC;
  --vermelho-2: #FFF7F7;
  --vermelho-3: #FEEBEC;
  --vermelho-4: #FFDBDC;
  --vermelho-5: #FFCDCE;
  --vermelho-6: #FDBDBE;
  --vermelho-7: #F4A9AA;
  --vermelho-8: #EB8E90;
  --vermelho-9: #E5484D;
  --vermelho-10: #DC3D43;
  --vermelho-11: #CE2C31;
  --vermelho-12: #641723;

  /* --- Amarelo (Warning) --- */
  --amarelo-1: #FDFDF9;
  --amarelo-2: #FFFCE8;
  --amarelo-3: #FFFBD1;
  --amarelo-4: #FFF8BB;
  --amarelo-5: #FEF2A4;
  --amarelo-6: #F9E68C;
  --amarelo-7: #EFD36C;
  --amarelo-8: #EBBC00;
  --amarelo-9: #F5D90A;
  --amarelo-10: #F7CE00;
  --amarelo-11: #946800;
  --amarelo-12: #35290F;

  /* --- Azul (Info) --- */
  --azul-1: #FAFDFE;
  --azul-2: #F2FAFB;
  --azul-3: #DEF7F9;
  --azul-4: #CAF1F6;
  --azul-5: #B5E9F0;
  --azul-6: #9DDDE7;
  --azul-7: #7DCEDC;
  --azul-8: #3DB9CF;
  --azul-9: #00A2C7;
  --azul-10: #0797B9;
  --azul-11: #107D98;
  --azul-12: #0D3C48;

  /* --- Violeta --- */
  --violeta-1: #FDFCFE;
  --violeta-2: #FAF8FF;
  --violeta-3: #F4F0FE;
  --violeta-4: #EBE4FF;
  --violeta-5: #E1D9FF;
  --violeta-6: #D4CAFE;
  --violeta-7: #C2B5F5;
  --violeta-8: #AA99EC;
  --violeta-9: #6E56CF;
  --violeta-10: #654DC4;
  --violeta-11: #6550B9;
  --violeta-12: #2F265F;
}

/* ============================================
   COLOR TOKENS — DARK THEME
   ============================================ */
[data-theme="dark"] {

  /* --- Gray --- */
  --gray-1: #111111;
  --gray-2: #191919;
  --gray-3: #222222;
  --gray-4: #2A2A2A;
  --gray-5: #313131;
  --gray-6: #3A3A3A;
  --gray-7: #484848;
  --gray-8: #606060;
  --gray-9: #6E6E6E;
  --gray-10: #7B7B7B;
  --gray-11: #B4B4B4;
  --gray-12: #EEEEEE;

  /* --- Principal (Brand / Green) --- */
  --principal-1: #0E1511;
  --principal-2: #141A15;
  --principal-3: #1B2A1E;
  --principal-4: #1D3A24;
  --principal-5: #25482D;
  --principal-6: #2D5736;
  --principal-7: #366740;
  --principal-8: #3E7949;
  --principal-9: #46A760;
  --principal-10: #53B36D;
  --principal-11: #71D08A;
  --principal-12: #C2F0CE;

  /* --- Vermelho (Error) --- */
  --vermelho-1: #191111;
  --vermelho-2: #201314;
  --vermelho-3: #3B1219;
  --vermelho-4: #500F1C;
  --vermelho-5: #611623;
  --vermelho-6: #72232D;
  --vermelho-7: #8C333A;
  --vermelho-8: #B54548;
  --vermelho-9: #E5484D;
  --vermelho-10: #EC5D5E;
  --vermelho-11: #FF9592;
  --vermelho-12: #FFD1D9;

  /* --- Amarelo (Warning) --- */
  --amarelo-1: #14120B;
  --amarelo-2: #1B180F;
  --amarelo-3: #2D2305;
  --amarelo-4: #362B00;
  --amarelo-5: #433500;
  --amarelo-6: #524202;
  --amarelo-7: #665417;
  --amarelo-8: #836A21;
  --amarelo-9: #FFC53D;
  --amarelo-10: #FFFF57;
  --amarelo-11: #F5E147;
  --amarelo-12: #F6EEB4;

  /* --- Azul (Info) --- */
  --azul-1: #0B161A;
  --azul-2: #101B20;
  --azul-3: #082C36;
  --azul-4: #003848;
  --azul-5: #004558;
  --azul-6: #045468;
  --azul-7: #12677E;
  --azul-8: #11809C;
  --azul-9: #00A2C7;
  --azul-10: #23AFD0;
  --azul-11: #4CCCE6;
  --azul-12: #B6ECF7;

  /* --- Violeta --- */
  --violeta-1: #14121F;
  --violeta-2: #1B1525;
  --violeta-3: #291F43;
  --violeta-4: #33255B;
  --violeta-5: #3C2E69;
  --violeta-6: #473876;
  --violeta-7: #56468B;
  --violeta-8: #6958AD;
  --violeta-9: #6E56CF;
  --violeta-10: #7D66D9;
  --violeta-11: #BAA7FF;
  --violeta-12: #E2DDFE;
}
```

---

## Semantic Aliases (Tokens Funcionais)

Além dos tokens de escala, defina **aliases semânticos** para que os devs nunca precisem decorar números. Estes aliases mapeiam para os steps corretos automaticamente.

```css
:root,
[data-theme="light"],
[data-theme="dark"] {

  /* ============================================
     BACKGROUNDS
     ============================================ */
  --color-bg-app:           var(--gray-1);
  --color-bg-subtle:        var(--gray-2);
  --color-bg-component:     var(--gray-3);
  --color-bg-hover:         var(--gray-4);
  --color-bg-active:        var(--gray-5);

  --color-bg-brand:         var(--principal-9);
  --color-bg-brand-hover:   var(--principal-10);
  --color-bg-brand-subtle:  var(--principal-3);

  /* ============================================
     BORDERS
     ============================================ */
  --color-border-subtle:    var(--gray-6);
  --color-border-default:   var(--gray-7);
  --color-border-hover:     var(--gray-8);
  --color-border-brand:     var(--principal-7);
  --color-border-focus:     var(--principal-8);

  /* ============================================
     TEXT
     ============================================ */
  --color-text-primary:     var(--gray-12);
  --color-text-secondary:   var(--gray-11);
  --color-text-brand:       var(--principal-11);
  --color-text-on-brand:    #FFFFFF;  /* texto sobre principal-9 */
  --color-text-link:        var(--azul-11);

  /* ============================================
     STATUS — ERROR
     ============================================ */
  --color-error-bg:         var(--vermelho-3);
  --color-error-bg-hover:   var(--vermelho-4);
  --color-error-bg-active:  var(--vermelho-5);
  --color-error-border:     var(--vermelho-7);
  --color-error-solid:      var(--vermelho-9);
  --color-error-solid-hover:var(--vermelho-10);
  --color-error-text:       var(--vermelho-11);
  --color-error-text-hi:    var(--vermelho-12);

  /* ============================================
     STATUS — WARNING
     ============================================ */
  --color-warning-bg:         var(--amarelo-3);
  --color-warning-bg-hover:   var(--amarelo-4);
  --color-warning-bg-active:  var(--amarelo-5);
  --color-warning-border:     var(--amarelo-7);
  --color-warning-solid:      var(--amarelo-9);
  --color-warning-solid-hover:var(--amarelo-10);
  --color-warning-text:       var(--amarelo-11);
  --color-warning-text-hi:    var(--amarelo-12);

  /* ============================================
     STATUS — INFO
     ============================================ */
  --color-info-bg:          var(--azul-3);
  --color-info-bg-hover:    var(--azul-4);
  --color-info-bg-active:   var(--azul-5);
  --color-info-border:      var(--azul-7);
  --color-info-solid:       var(--azul-9);
  --color-info-solid-hover: var(--azul-10);
  --color-info-text:        var(--azul-11);
  --color-info-text-hi:     var(--azul-12);

  /* ============================================
     STATUS — SUCCESS (usa Principal / Green)
     ============================================ */
  --color-success-bg:         var(--principal-3);
  --color-success-bg-hover:   var(--principal-4);
  --color-success-bg-active:  var(--principal-5);
  --color-success-border:     var(--principal-7);
  --color-success-solid:      var(--principal-9);
  --color-success-solid-hover:var(--principal-10);
  --color-success-text:       var(--principal-11);
  --color-success-text-hi:    var(--principal-12);

  /* ============================================
     ACCENT — VIOLETA
     ============================================ */
  --color-accent-bg:          var(--violeta-3);
  --color-accent-bg-hover:    var(--violeta-4);
  --color-accent-bg-active:   var(--violeta-5);
  --color-accent-border:      var(--violeta-7);
  --color-accent-solid:       var(--violeta-9);
  --color-accent-solid-hover: var(--violeta-10);
  --color-accent-text:        var(--violeta-11);
  --color-accent-text-hi:     var(--violeta-12);
}
```

---

## Tailwind CSS Config

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',

      gray: {
        1: 'var(--gray-1)',
        2: 'var(--gray-2)',
        3: 'var(--gray-3)',
        4: 'var(--gray-4)',
        5: 'var(--gray-5)',
        6: 'var(--gray-6)',
        7: 'var(--gray-7)',
        8: 'var(--gray-8)',
        9: 'var(--gray-9)',
        10: 'var(--gray-10)',
        11: 'var(--gray-11)',
        12: 'var(--gray-12)',
      },
      principal: {
        1: 'var(--principal-1)',
        2: 'var(--principal-2)',
        3: 'var(--principal-3)',
        4: 'var(--principal-4)',
        5: 'var(--principal-5)',
        6: 'var(--principal-6)',
        7: 'var(--principal-7)',
        8: 'var(--principal-8)',
        9: 'var(--principal-9)',
        10: 'var(--principal-10)',
        11: 'var(--principal-11)',
        12: 'var(--principal-12)',
      },
      vermelho: {
        1: 'var(--vermelho-1)',
        2: 'var(--vermelho-2)',
        3: 'var(--vermelho-3)',
        4: 'var(--vermelho-4)',
        5: 'var(--vermelho-5)',
        6: 'var(--vermelho-6)',
        7: 'var(--vermelho-7)',
        8: 'var(--vermelho-8)',
        9: 'var(--vermelho-9)',
        10: 'var(--vermelho-10)',
        11: 'var(--vermelho-11)',
        12: 'var(--vermelho-12)',
      },
      amarelo: {
        1: 'var(--amarelo-1)',
        2: 'var(--amarelo-2)',
        3: 'var(--amarelo-3)',
        4: 'var(--amarelo-4)',
        5: 'var(--amarelo-5)',
        6: 'var(--amarelo-6)',
        7: 'var(--amarelo-7)',
        8: 'var(--amarelo-8)',
        9: 'var(--amarelo-9)',
        10: 'var(--amarelo-10)',
        11: 'var(--amarelo-11)',
        12: 'var(--amarelo-12)',
      },
      azul: {
        1: 'var(--azul-1)',
        2: 'var(--azul-2)',
        3: 'var(--azul-3)',
        4: 'var(--azul-4)',
        5: 'var(--azul-5)',
        6: 'var(--azul-6)',
        7: 'var(--azul-7)',
        8: 'var(--azul-8)',
        9: 'var(--azul-9)',
        10: 'var(--azul-10)',
        11: 'var(--azul-11)',
        12: 'var(--azul-12)',
      },
      violeta: {
        1: 'var(--violeta-1)',
        2: 'var(--violeta-2)',
        3: 'var(--violeta-3)',
        4: 'var(--violeta-4)',
        5: 'var(--violeta-5)',
        6: 'var(--violeta-6)',
        7: 'var(--violeta-7)',
        8: 'var(--violeta-8)',
        9: 'var(--violeta-9)',
        10: 'var(--violeta-10)',
        11: 'var(--violeta-11)',
        12: 'var(--violeta-12)',
      },
    },
  },
};
```

### Uso no Tailwind

```html
<!-- Fundo do app -->
<body class="bg-gray-1 text-gray-12">

<!-- Card com borda sutil -->
<div class="bg-gray-2 border border-gray-6 rounded-lg">

<!-- Botão primário com hover -->
<button class="bg-principal-9 hover:bg-principal-10 text-white">
  Confirmar
</button>

<!-- Badge de erro -->
<span class="bg-vermelho-3 text-vermelho-11 border border-vermelho-7">
  Erro
</span>
```

---

## Guia de Aplicação por Componente

Esta seção mostra **exatamente quais tokens usar** para cada tipo de componente. Não adivinhe — consulte aqui.

---

### 📌 Buttons

#### Primary Button (Brand)

| Estado | Propriedade | Token |
|---|---|---|
| Default | `background` | `--principal-9` |
| Default | `color` | `#FFFFFF` |
| Hover | `background` | `--principal-10` |
| Active | `background` | `--principal-10` + darken ou `filter: brightness(0.95)` |
| Disabled | `background` | `--gray-3` |
| Disabled | `color` | `--gray-8` |

```css
.btn-primary {
  background: var(--principal-9);
  color: #FFFFFF;
  border: none;
  cursor: pointer;
}
.btn-primary:hover { background: var(--principal-10); }
.btn-primary:active { filter: brightness(0.95); }
.btn-primary:disabled {
  background: var(--gray-3);
  color: var(--gray-8);
  cursor: not-allowed;
}
```

#### Secondary / Outline Button

| Estado | Propriedade | Token |
|---|---|---|
| Default | `background` | transparente |
| Default | `border` | `--gray-7` |
| Default | `color` | `--gray-12` |
| Hover | `background` | `--gray-3` |
| Active | `background` | `--gray-4` |

```css
.btn-secondary {
  background: transparent;
  border: 1px solid var(--gray-7);
  color: var(--gray-12);
}
.btn-secondary:hover { background: var(--gray-3); }
.btn-secondary:active { background: var(--gray-4); }
```

#### Ghost Button

| Estado | Propriedade | Token |
|---|---|---|
| Default | `background` | transparente |
| Default | `color` | `--gray-12` |
| Hover | `background` | `--gray-3` |
| Active | `background` | `--gray-4` |

```css
.btn-ghost {
  background: transparent;
  border: none;
  color: var(--gray-12);
}
.btn-ghost:hover { background: var(--gray-3); }
.btn-ghost:active { background: var(--gray-4); }
```

#### Danger Button

| Estado | Propriedade | Token |
|---|---|---|
| Default | `background` | `--vermelho-9` |
| Default | `color` | `#FFFFFF` |
| Hover | `background` | `--vermelho-10` |

```css
.btn-danger {
  background: var(--vermelho-9);
  color: #FFFFFF;
}
.btn-danger:hover { background: var(--vermelho-10); }
```

---

### 📌 Inputs / Form Fields

| Estado | Propriedade | Token |
|---|---|---|
| Default | `background` | `--gray-1` ou transparente |
| Default | `border` | `--gray-7` |
| Default | `color` | `--gray-12` |
| Placeholder | `color` | `--gray-9` |
| Hover | `border` | `--gray-8` |
| Focus | `border` | `--principal-8` |
| Focus | `box-shadow` (ring) | `0 0 0 2px var(--principal-7)` |
| Error | `border` | `--vermelho-7` |
| Error Focus | `box-shadow` | `0 0 0 2px var(--vermelho-7)` |
| Disabled | `background` | `--gray-3` |
| Disabled | `color` | `--gray-8` |

```css
.input {
  background: var(--gray-1);
  border: 1px solid var(--gray-7);
  color: var(--gray-12);
  border-radius: 8px;
  padding: 8px 12px;
}
.input::placeholder { color: var(--gray-9); }
.input:hover { border-color: var(--gray-8); }
.input:focus {
  outline: none;
  border-color: var(--principal-8);
  box-shadow: 0 0 0 2px var(--principal-7);
}
.input--error { border-color: var(--vermelho-7); }
.input--error:focus { box-shadow: 0 0 0 2px var(--vermelho-7); }
.input:disabled {
  background: var(--gray-3);
  color: var(--gray-8);
  cursor: not-allowed;
}
```

---

### 📌 Badges

Badges usam o padrão **step 3 (background)** + **step 11 (texto)** + opcionalmente **step 7 (borda)**.

| Variante | Background | Text | Border (opcional) |
|---|---|---|---|
| **Default / Neutral** | `--gray-3` | `--gray-11` | `--gray-7` |
| **Brand / Success** | `--principal-3` | `--principal-11` | `--principal-7` |
| **Error** | `--vermelho-3` | `--vermelho-11` | `--vermelho-7` |
| **Warning** | `--amarelo-3` | `--amarelo-11` | `--amarelo-7` |
| **Info** | `--azul-3` | `--azul-11` | `--azul-7` |
| **Accent** | `--violeta-3` | `--violeta-11` | `--violeta-7` |

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 9999px;
  font: var(--body-semibold-12); /* do typography DS */
}
.badge--neutral  { background: var(--gray-3);      color: var(--gray-11); }
.badge--success  { background: var(--principal-3);  color: var(--principal-11); }
.badge--error    { background: var(--vermelho-3);   color: var(--vermelho-11); }
.badge--warning  { background: var(--amarelo-3);    color: var(--amarelo-11); }
.badge--info     { background: var(--azul-3);       color: var(--azul-11); }
.badge--accent   { background: var(--violeta-3);    color: var(--violeta-11); }
```

#### Tailwind

```html
<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold
  bg-vermelho-3 text-vermelho-11">Erro</span>

<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold
  bg-principal-3 text-principal-11">Ativo</span>
```

---

### 📌 Tooltips

| Propriedade | Token |
|---|---|
| `background` | `--gray-12` (inverte — escuro no light, claro no dark) |
| `color` | `--gray-1` (inverte) |
| `border-radius` | `6px` |
| `padding` | `4px 8px` |
| `font` | `--body-medium-12` |

```css
.tooltip {
  background: var(--gray-12);
  color: var(--gray-1);
  padding: 4px 8px;
  border-radius: 6px;
  font: var(--body-medium-12);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

> **Regra:** Tooltips sempre usam a inversão gray-12/gray-1 para máximo contraste em ambos os temas.

---

### 📌 Alerts / Banners

Alerts usam o padrão **step 2 (background)** + **step 7 (borda lateral)** + **step 11 (texto/ícone)** + **step 12 (título)**.

| Variante | Bg | Border-left | Icon/Text | Title |
|---|---|---|---|---|
| **Success** | `--principal-2` | `--principal-9` | `--principal-11` | `--principal-12` |
| **Error** | `--vermelho-2` | `--vermelho-9` | `--vermelho-11` | `--vermelho-12` |
| **Warning** | `--amarelo-2` | `--amarelo-9` | `--amarelo-11` | `--amarelo-12` |
| **Info** | `--azul-2` | `--azul-9` | `--azul-11` | `--azul-12` |

```css
.alert {
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid;
}
.alert--success {
  background: var(--principal-2);
  border-left-color: var(--principal-9);
  color: var(--principal-11);
}
.alert--success .alert__title { color: var(--principal-12); }

.alert--error {
  background: var(--vermelho-2);
  border-left-color: var(--vermelho-9);
  color: var(--vermelho-11);
}
.alert--error .alert__title { color: var(--vermelho-12); }

.alert--warning {
  background: var(--amarelo-2);
  border-left-color: var(--amarelo-9);
  color: var(--amarelo-11);
}
.alert--warning .alert__title { color: var(--amarelo-12); }

.alert--info {
  background: var(--azul-2);
  border-left-color: var(--azul-9);
  color: var(--azul-11);
}
.alert--info .alert__title { color: var(--azul-12); }
```

---

### 📌 Cards

| Propriedade | Token |
|---|---|
| `background` | `--gray-2` |
| `border` | `--gray-6` |
| Hover `border` | `--gray-7` |
| Hover `background` | `--gray-3` (se card clicável) |
| Title | `--gray-12` |
| Description | `--gray-11` |

```css
.card {
  background: var(--gray-2);
  border: 1px solid var(--gray-6);
  border-radius: 12px;
  padding: 16px;
}
.card--interactive:hover {
  background: var(--gray-3);
  border-color: var(--gray-7);
  cursor: pointer;
}
.card__title { color: var(--gray-12); }
.card__description { color: var(--gray-11); }
```

---

### 📌 Tables

| Parte | Token |
|---|---|
| Header bg | `--gray-2` |
| Header text | `--gray-12` |
| Row bg (par) | `--gray-1` |
| Row bg (ímpar) | `--gray-2` |
| Row hover | `--gray-3` |
| Border | `--gray-6` |
| Cell text | `--gray-12` |
| Cell secondary text | `--gray-11` |

```css
.table { border-collapse: collapse; width: 100%; }
.table th {
  background: var(--gray-2);
  color: var(--gray-12);
  border-bottom: 1px solid var(--gray-6);
  text-align: left;
  padding: 8px 12px;
}
.table td {
  color: var(--gray-12);
  border-bottom: 1px solid var(--gray-6);
  padding: 8px 12px;
}
.table tr:nth-child(even) { background: var(--gray-2); }
.table tr:hover { background: var(--gray-3); }
```

---

### 📌 Sidebar / Navigation

| Parte | Token |
|---|---|
| Sidebar bg | `--gray-2` |
| Nav item text | `--gray-11` |
| Nav item hover bg | `--gray-3` |
| Nav item active bg | `--principal-3` |
| Nav item active text | `--principal-11` |
| Nav item active indicator | `--principal-9` |
| Section divider | `--gray-6` |

```css
.sidebar { background: var(--gray-2); }
.nav-item {
  color: var(--gray-11);
  padding: 8px 12px;
  border-radius: 6px;
}
.nav-item:hover { background: var(--gray-3); }
.nav-item--active {
  background: var(--principal-3);
  color: var(--principal-11);
}
```

---

### 📌 Modals / Dialogs

| Parte | Token |
|---|---|
| Overlay | `rgba(0, 0, 0, 0.5)` ou `var(--gray-12)` com `opacity: 0.5` |
| Modal bg | `--gray-1` |
| Modal border | `--gray-6` |
| Modal title | `--gray-12` |
| Modal body text | `--gray-11` |
| Close button hover | `--gray-3` |

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
}
.modal {
  background: var(--gray-1);
  border: 1px solid var(--gray-6);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
}
```

---

### 📌 Tags / Chips (Removível)

Mesmo padrão de badge, mas com botão de fechar:

```css
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--gray-3);
  color: var(--gray-11);
  font: var(--body-medium-12);
}
.tag__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  cursor: pointer;
}
.tag__close:hover { background: var(--gray-5); }
```

---

### 📌 Toggle / Switch

| Estado | Propriedade | Token |
|---|---|---|
| Off — track | `background` | `--gray-5` |
| Off — hover | `background` | `--gray-6` |
| On — track | `background` | `--principal-9` |
| On — hover | `background` | `--principal-10` |
| Thumb | `background` | `#FFFFFF` |
| Focus ring | `box-shadow` | `0 0 0 2px var(--principal-7)` |

---

### 📌 Skeleton / Loading

| Propriedade | Token |
|---|---|
| Base | `--gray-3` |
| Shimmer | `--gray-5` |
| Border radius | Igual ao componente que substitui |

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--gray-3) 0%,
    var(--gray-5) 50%,
    var(--gray-3) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## Regras Fundamentais (Do & Don't)

### ✅ DO

- **Sempre use tokens CSS**, nunca hex codes hardcoded no CSS dos componentes.
- **Respeite a escala de 12 steps** — cada número tem um propósito. Consulte a tabela no início.
- **Use aliases semânticos** (`--color-error-solid`) para componentes. Use tokens de escala (`--vermelho-9`) quando precisar de controle granular.
- **Teste em ambos os temas.** Os tokens trocam automaticamente, mas verifique visualmente.
- **Para texto sobre step 9 (solid backgrounds):** use branco para Principal, Vermelho, Azul e Violeta. Use `--gray-12` (escuro) para Amarelo (fundos claros).

### ❌ DON'T

- **Nunca use step 9 para texto.** Steps 9–10 são para backgrounds sólidos.
- **Nunca use step 1 para bordas.** Steps 1–2 são exclusivos para backgrounds.
- **Nunca pule steps nos estados.** Se o default é step 3, o hover DEVE ser step 4 e o active step 5. Manter a progressão.
- **Nunca use gray-11 para texto principal.** Use gray-12. O step 11 é para texto de baixo contraste apenas.
- **Nunca misture escalas diferentes para o mesmo componente** (ex: border de `azul` em um card que usa `principal` como acento).
- **Nunca invente grays fora da escala.** Se precisar de um gray intermediário, provavelmente você está usando o step errado.

---

## Regra de Contraste (Acessibilidade)

| Combinação | Ratio mínimo | Regra |
|---|---|---|
| Step 11 sobre Step 2 (mesma escala) | ≥ Lc 60 APCA | Garantido pelo Radix |
| Step 12 sobre Step 2 (mesma escala) | ≥ Lc 90 APCA | Garantido pelo Radix |
| Branco sobre Step 9 | ≥ 4.5:1 WCAG AA | Para Principal, Vermelho, Azul, Violeta |
| Step 12 (escuro) sobre Step 9 | Use para Amarelo | Amarelo step 9 é claro demais para texto branco |

> **Atenção especial ao Amarelo:** Como a escala amarela tem steps 9 e 10 muito claros (luminosos), sempre use **texto escuro** sobre fundos amarelos sólidos. Nunca branco.

---

## Dark Mode — Implementação

### Via `data-theme`

```html
<html data-theme="light">
<!-- ou -->
<html data-theme="dark">
```

```js
// Toggle
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}
```

### Via `prefers-color-scheme` (automático)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --gray-1: #111111;
    --gray-2: #191919;
    /* ... todos os tokens dark ... */
  }
}
```

### Tailwind (dark mode)

```js
// tailwind.config.js
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  // ...
};
```

---

## Instruções para a IA (Antigravity)

> **IMPORTANTE:** A documentação visual de cores deve seguir o mesmo padrão de accordion da tipografia.

### Estrutura da Página

```
Colors
├── Escalas de 12 Steps (referência visual)    ← sempre visível no topo
│
├── Primitivas                                  ← accordion
│   ├── Gray                                    ← accordion interno
│   │   └── Steps 1-12 com swatches
│   └── Principal                               ← accordion interno
│       └── Steps 1-12 com swatches
│
├── Semânticas                                  ← accordion
│   ├── Vermelho (Error)                        ← accordion interno
│   ├── Amarelo (Warning)                       ← accordion interno
│   ├── Azul (Info)                             ← accordion interno
│   └── Violeta (Accent)                        ← accordion interno
│
├── Aliases Semânticos                          ← accordion
│   ├── Backgrounds                             ← accordion interno
│   ├── Borders                                 ← accordion interno
│   ├── Text                                    ← accordion interno
│   └── Status (Error/Warning/Info/Success)     ← accordion interno
│
└── Componentes                                 ← accordion
    ├── Buttons                                 ← accordion interno
    ├── Inputs                                  ← accordion interno
    ├── Badges                                  ← accordion interno
    ├── Tooltips                                ← accordion interno
    ├── Alerts                                  ← accordion interno
    ├── Cards                                   ← accordion interno
    ├── Tables                                  ← accordion interno
    └── ... (demais componentes)                ← accordion interno
```

### Regras de Implementação Visual

1. **Cada escala de cor mostra os 12 swatches lado a lado** com o hex, o número do step, e o token CSS.
2. **Cada swatch é clicável** — copia o token CSS para o clipboard.
3. **Toggle Light/Dark no topo** para visualizar ambos os temas ao vivo.
4. **Na seção de componentes**, cada accordion mostra um preview renderizado do componente em todos os seus estados (default, hover, active, disabled) + o código CSS copiável.
5. **Cada bloco de código tem botão "Copiar"** (clipboard).
6. **Referência cruzada:** Em cada escala, mostra quais componentes usam quais steps (ex: "Step 9 é usado em: Botão Primário, Badge solid, Alert border-left").

---

## Changelog

| Versão | Data | Descrição |
|---|---|---|
| 1.0.0 | Abril 2026 | Lançamento inicial — todas as escalas, aliases, componentes |
