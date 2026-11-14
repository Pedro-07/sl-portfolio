# SPEC — SL Prod Studio

> Fonte da verdade do projeto. Toda implementação consulta este arquivo.
> Direção **A — Corredor**. Página única, dark, foto protagonista, movimento de corredor de imagens.

---

## 1. Briefing e direção

**Marca:** SL Prod Studio — dupla **Sarah & Levi (SL)**, fotografia de **retrato e editorial** em **São Luís — MA**. Instagram: [@sl.prodstudio](https://instagram.com/sl.prodstudio).

**Objetivo:** portfólio / branding. Impressionar e firmar reputação. CTA de contato discreto (sem conversão agressiva).

**Personalidade:** autoral · minimalista · luxo. **Não é:** fofo, casual, corporativo, stock.

**Direção A — Corredor:** silêncio suíço. Preto absoluto, a foto é a única cor da tela. Tipografia grotesca pesada herdada da logo (placa branca, "SL"). Dois momentos "wow": o **corredor de imagens 3D** no hero e a **galeria horizontal com pin**. Todo o resto é reveal sutil e consistente.

**Gesto central:** imagens viajando do fundo preto até o olhar, num corredor contínuo (perspectiva CSS + GSAP). Referências do cliente: `ImageStreamHero` (21st.dev, perspectiva CSS) e `Endless` (GSAP sobre #000) — mesmo gesto.

**Idioma:** português. Narrativa "nós" (dupla).

---

## 2. Tokens de design

```css
:root {
  /* cor */
  --ink:    #060606;   /* fundo — preto sala */
  --ink-2:  #0f0e0d;   /* painéis / elevação sutil */
  --ink-3:  #141414;   /* grafite */
  --bone:   #ECE7DF;   /* texto principal — osso quente */
  --grey:   #857f78;   /* texto secundário / labels */
  --grey-2: #55504a;   /* texto terciário */
  --steel:  #9BB0BE;   /* acento frio, uso mínimo (foco, detalhes) */
  --line:   rgba(236,231,223,.12);
  --line-2: rgba(236,231,223,.22);

  /* tipografia */
  --font-display: "Neue Montreal", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-text:    "Neue Montreal", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-mono:    ui-monospace, "SF Mono", Menlo, Consolas, monospace; /* labels, legendas, numeração */

  /* escala fluida */
  --fs-hero:  clamp(2.6rem, 8vw, 7.5rem);
  --fs-h2:    clamp(2rem, 6vw, 5.5rem);
  --fs-body:  clamp(1rem, 1.1vw, 1.2rem);
  --fs-label: 0.6875rem; /* 11px — mono, tracking .2em, uppercase */

  --space-section: clamp(6rem, 14vw, 14rem);
  --gutter: clamp(1.25rem, 4vw, 4rem);

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1); /* expo.out */
  --maxw: 1280px;
}
```

**Regras de tipografia:** uma família (Neue Montreal) em pesos Regular/Medium/Bold + mono só em labels/legendas/numeração. Títulos grandes com `letter-spacing: -.03em` e `line-height` entre 0.9 e 1.0. Labels em mono, uppercase, `letter-spacing: .2em`. Fonte de produção: **Neue Montreal** (Pangram Pangram, grátis) — baixar `.woff2` e servir local com `font-display: swap` + `<link rel="preload">`. Alternativa paga: Söhne.

**Regras de cor:** o acento `--steel` entra com disciplina (foco de teclado, 1-2 detalhes), nunca como enchimento. Fundo sempre preto; a foto traz toda a cor.

**Grão:** overlay de ruído SVG a 4-6% de opacidade sobre o fundo, para tirar o aspecto plástico digital. Sutil — nunca textura óbvia.

---

## 3. Stack e estrutura

**Stack:** Vite + React + TypeScript · GSAP + ScrollTrigger + SplitText + `@gsap/react` · Lenis (scroll suave). Sem React Three Fiber — o corredor é perspectiva CSS/GSAP, não WebGL. CSS com variáveis (Tailwind opcional; se usar, mapear tokens no tema).

```
src/
  main.tsx
  App.tsx
  lib/
    scroll.ts          # init Lenis + GSAP ticker + ScrollTrigger.refresh
    gsap.ts            # registerPlugin
  styles/
    tokens.css         # os tokens acima
    global.css
  components/
    Corridor.tsx       # o corredor de imagens (hero)
    Header.tsx
    sections/
      Hero.tsx
      Manifesto.tsx
      Work.tsx         # galeria horizontal com pin
      About.tsx
      Process.tsx
      Contact.tsx
  data/
    work.ts            # categorias + lista de fotos (placeholder → real)
public/
  fonts/               # NeueMontreal-*.woff2
  work/                # fotos reais (webp/avif, 2 tamanhos)
  noise.svg
```

**Regra:** não usar Framer Motion e GSAP no mesmo elemento. GSAP cuida de todo o scroll/movimento.

---

## 4. Fichas de seção

### Seção 1 — Hero / Corredor
- **Objetivo:** abrir com o gesto central; a fotografia vindo até você.
- **Conteúdo:** nome `SL PROD STUDIO`; linha `Fotografia de retrato e editorial. São Luís.`; no rodapé da seção, em mono: `Role para entrar` · `Sarah & Levi`.
- **Assets:** 8–12 fotos verticais (3:4) fortes, recortadas, em webp. Placeholder até entrarem as reais.
- **Layout desktop:** corredor em tela cheia (duas trilhas, esquerda/direita, inclinadas ±22°) sobre `--ink`; vinheta radial escurece as bordas; copy ancorada embaixo à esquerda.
- **Layout mobile:** mesmo corredor, trilhas mais estreitas (cards ~34vw), copy em bloco inferior. Usar `svh`/`dvh`.
- **Entrada:** no load, fade do preto; o nome sobe `y:40 → 0`, `opacity 0→1`, 1.1s, `expo.out`, após `document.fonts.ready`.
- **Scroll:** o corredor é **ambiente** (loop contínuo, independente do scroll). Ao rolar pra fora, a seção faz leve parallax/fade. Sem scroll-jacking.
- **Hover:** nenhum.
- **Reduced motion:** corredor **congela** mid-flight (`animation-play-state: paused`) virando uma composição estática; nome aparece sem translate.
- **Perf:** animar só `transform` + `opacity`; cards com `will-change` só enquanto animam; limitar `devicePixelRatio`.

### Seção 2 — Manifesto
- **Objetivo:** dar o peso atemporal da marca com uma frase.
- **Conteúdo (travado):**
  > **O tempo passa.
  > A imagem fica.**
  Legenda pequena (mono, ao lado/abaixo): `Retrato, editorial e moda — com tempo, luz e intenção.`
- **Assets:** nenhum. Só tipografia sobre preto.
- **Layout desktop:** título gigante (`--fs-h2`+) alinhado à esquerda, muito ar em volta; legenda minúscula deslocada.
- **Layout mobile:** mesmo, título reduz pela escala fluida.
- **Entrada:** reveal por linha com máscara — `SplitText` type `lines`, `mask: lines`, `yPercent:100 → 0`, `stagger .08`, 1.2s, `expo.out`, trigger `top 80%`.
- **Scroll / Hover:** nenhum extra.
- **Reduced motion:** texto estático, visível.

### Seção 3 — O trabalho (galeria horizontal com pin)
- **Objetivo:** o portfólio; segundo momento "wow".
- **Conteúdo:** três capítulos — **Retrato**, **Editorial**, **Ensaios**. Cada foto com legenda discreta em mono: `nome do projeto — ano` `[PREENCHER]`.
- **Assets:** fotos reais por categoria (mix vertical/horizontal), webp/avif, 2 tamanhos (mobile ~900px, desktop ~2000px). `[PREENCHER]`
- **Layout desktop:** seção com `pin`; o scroll vertical vira movimento horizontal (`x: -(scrollWidth - innerWidth)`, `scrub`). Título do capítulo fixo/atualizando à margem enquanto as fotos passam.
- **Layout mobile:** **sem pin** — vira lista/carrossel vertical por capítulo, cada foto com reveal simples ao entrar (clip-path + leve scale).
- **Entrada:** fotos entram por `clip-path inset(100% → 0)` + `scale 1.1 → 1`, 1.4s, `expo.out`.
- **Scroll:** `pin: true`, `scrub: 1`, `invalidateOnRefresh: true`, `end: () => "+=" + distance`.
- **Hover (desktop):** legenda da foto aparece em fade; cursor vira indicador discreto. Opcional.
- **Reduced motion:** sem pin nem scrub; grade/lista vertical estática com fade curto.

### Seção 4 — Sobre (Sarah & Levi)
- **Objetivo:** aterrissar no humano; quem são.
- **Conteúdo:** abertura (travada):
  > **Fotografamos pessoas no instante em que esquecem da câmera.**
  Corpo: `[REVISAR tom — origem da dupla? desde quando?]`. Assinatura: **Sarah & Levi** · São Luís — MA.
- **Assets:** um retrato da dupla (horizontal ou vertical). `[PREENCHER]`
- **Layout desktop:** duas colunas assimétricas — retrato de um lado, texto curto do outro, desalinhados de propósito.
- **Layout mobile:** foto acima, texto abaixo.
- **Entrada:** foto por clip-path; texto por reveal de linhas, `stagger`.
- **Scroll:** parallax sutil (5–12%) entre foto e texto via `data-speed`.
- **Reduced motion:** estático.

### Seção 5 — Como trabalhamos
- **Objetivo:** mostrar o método sem cara de "features".
- **Conteúdo (confirmar):**
  > `01` Conversa antes da câmera.
  > `02` Luz natural, direção leve.
  > `03` Entrega tratada, no tempo certo.
- **Assets:** nenhum (ou 1 foto de bastidor discreta). `[CONFIRMAR método]`
- **Layout:** três linhas numeradas (numeração em mono/steel), muito espaçamento vertical, sem ícones, sem cards.
- **Entrada:** cada linha entra por máscara com `stagger`, trigger individual.
- **Reduced motion:** estático.

### Seção 6 — Contato
- **Objetivo:** fechar com CTA discreto.
- **Conteúdo:**
  > **Vamos fotografar.**
  `Instagram @sl.prodstudio` · `WhatsApp [PREENCHER]` · `Email [PREENCHER]` · `São Luís — MA`.
- **Assets:** nenhum.
- **Layout:** tela preta, título grande, links em linha (mono) com underline sutil no hover.
- **Entrada:** título por máscara; links em fade com `stagger`.
- **Hover (desktop):** underline cresce da esquerda; botão principal (WhatsApp) pode ser **magnético** (quando houver número) — único magnético do site.
- **Reduced motion:** estático; sem magnético.

---

## 5. Regras de movimento do projeto

- No máximo **1 momento "wow" por seção**, **2 no site** (corredor do hero + galeria com pin).
- O resto é reveal sutil e consistente: máscara de linhas e clip-path de imagem.
- **Easings:** `expo.out` para entradas; `power2.inOut` para transições; `none` só em scrub.
- **Durações:** 0.8s–1.4s nas entradas; nada abaixo de 0.4s exceto hover.
- **Parallax:** diferenças de 5–20% entre camadas, nunca mais.
- **Sempre** usar `gsap.matchMedia` separando `desktop` / `mobile` / `reduced-motion`. `useGSAP` com `scope` para limpeza no unmount.
- **Nada** de scroll-jacking que impeça rolar normalmente.
- `document.fonts.ready.then(() => ScrollTrigger.refresh())` após carregar fontes/imagens críticas.

---

## 6. Checklist de assets

| Asset | Status | Nota |
|---|---|---|
| Logo SL (ideal SVG) | tem (JPG) | `logo-sl.jpg` — vetorizar ou recriar "SL" em grotesca; usar branco sobre preto |
| Fotos hero (8–12 verticais 3:4) | **falta** | placeholders por enquanto |
| Fotos galeria — Retrato | **falta** | webp/avif, 2 tamanhos |
| Fotos galeria — Editorial | **falta** | " |
| Fotos galeria — Ensaios | **falta** | " |
| Retrato da dupla (Sobre) | **falta** | 1 imagem |
| Fonte | **tem (substituta)** | Instrument Sans variável local; trocar por Neue Montreal se baixada |
| noise.svg (grão) | tem | overlay 5% |
| favicon.svg | tem | placa SL |
| og.png 1200×630 | tem | trocar por URL absoluta no deploy |
| WhatsApp + email | **[PREENCHER]** | entram no contato/rodapé |
| Legendas de projeto (nome — ano) | **[PREENCHER]** | por foto |
| Texto do "Sobre" + método | **[REVISAR]** | confirmar tom/origem da dupla |

---

## 7. QA (antes de entregar)

- **Perf:** animar só `transform`/`opacity`/`clip-path`; imagens AVIF/WebP com `srcset`+`sizes`, `loading="lazy"` fora da dobra, `fetchpriority="high"` nas do hero; Lighthouse mobile Performance ≥ 80, LCP < 2,5s.
- **Responsivo:** testar 390 / 768 / 1440 / 1920px; mobile tem layout próprio (pin vira lista); `svh`/`dvh` em telas cheias.
- **Acessibilidade:** `prefers-reduced-motion` em tudo; contraste ≥ 4.5:1; foco visível (usa `--steel`); alt nas imagens; nada essencial só dentro do corredor.
- **SEO/entrega:** `<h1>` único, `h2` por seção; title + meta description + OG 1200×630; favicon; `lang="pt-BR"`; link de WhatsApp com mensagem pré-preenchida quando houver número; deploy (Vercel/Netlify) e teste em celular real.

---

## 8. Ordem de construção

1. Setup (Vite + React + TS + GSAP + Lenis + tokens + fonte).
2. **Hero / Corredor** (o coração — fazer primeiro e acertar).
3. Manifesto.
4. Galeria com pin (desktop) + fallback mobile.
5. Sobre.
6. Como trabalhamos.
7. Contato.
8. Grão, QA, performance, deploy.

Construir **uma seção por vez**: layout estático perfeito (desktop + mobile) → movimento → screenshot → comparar com este SPEC e com o checklist anti-IA da skill → corrigir → mostrar.
