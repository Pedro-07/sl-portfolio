# SL Prod Studio — portfólio

Site-portfólio de **Sarah & Levi (SL Prod Studio)**, fotografia de retrato e editorial em São Luís — MA. Direção de arte **A "Corredor"**: preto absoluto, foto protagonista, tipografia grotesca, movimento de corredor de imagens.

A fonte da verdade do projeto é o **[SPEC.md](./SPEC.md)** — toda alteração visual/motion consulta ele primeiro.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build local
```

Stack: Vite + React + TypeScript · GSAP (ScrollTrigger, SplitText) · Lenis.

## Plugar as fotos reais

1. Exportar em **WebP/AVIF**, 2 tamanhos (mobile ~900px, desktop ~2000px), e colocar em `public/work/`.
2. Em **`src/data/work.ts`**:
   - `heroFrames`: preencher `src` (ex.: `"/work/hero-01.webp"`) — 8–12 verticais 3:4;
   - `chapters`: preencher `src`, `alt` e a `caption` real (`"nome do projeto — ano"`) de cada item.
3. O retrato da dupla está em `src/components/sections/About.tsx` (placeholder marcado com `[PREENCHER]`).

Quando `src` é preenchido, o placeholder tonal some sozinho.

## Pendências de conteúdo

Buscar por `[PREENCHER]` e `[REVISAR]` no código e no SPEC:

- WhatsApp e email em `src/components/sections/Contact.tsx` (montar link `https://wa.me/55DDDNÚMERO?text=...` com mensagem pré-preenchida);
- corpo do texto do "Sobre" (origem da dupla);
- confirmar as 3 linhas do método em `Process.tsx`;
- fonte definitiva: hoje usa **Instrument Sans** (local, `public/fonts/`); para trocar pela **Neue Montreal** (Pangram Pangram), substituir o arquivo e o `@font-face` em `src/styles/global.css`.

## Publicar

Build estático — qualquer host serve:

- **Vercel**: `npx vercel` na raiz (detecta Vite sozinho), ou importar o repo em vercel.com;
- **Netlify**: build command `npm run build`, publish dir `dist`.

Após ter domínio: trocar a `og:image` no `index.html` por URL absoluta e testar o link compartilhado. Rodar Lighthouse (meta: Performance ≥ 80 mobile, A11y ≥ 90) e testar em celular real.
