---
name: "site-marca-premium"
description: "Cria sites e landing pages de marca com visual premium (GSAP, parallax, 3D, motion) a partir de briefing, direção de arte e SPEC, sem cara de site feito por IA."
---

# Site de marca premium

Esta skill conduz a criação de um site ou landing page de marca com acabamento de estúdio: tipografia forte, imagem real, movimento com intenção (GSAP, parallax, scroll, 3D quando fizer sentido) e nenhum sinal de "template gerado por IA".

O princípio central: **o que faz um site parecer caro é direção, não efeito.** Marca clara, tipografia com personalidade, fotografia boa, muito espaço e poucos momentos de movimento bem executados. Efeito sem direção vira template.

## Regra de ouro

Não escreva código antes de ter, aprovados pelo usuário:
1. o briefing (Fase 1),
2. a direção de arte escolhida (Fase 2),
3. os textos reais (Fase 3),
4. o SPEC.md com storyboard de movimento (Fase 5).

Se o usuário pedir para pular etapas, explique em uma frase que é isso que evita o resultado genérico e ofereça a versão rápida: um briefing curto de 6 perguntas + SPEC enxuto. Nunca pule o SPEC.

---

## Fase 1 — Briefing

Faça as perguntas em blocos pequenos (use a ferramenta de perguntas de múltipla escolha quando existir; senão, no máximo 5 perguntas por mensagem). Não pergunte o que o usuário já respondeu. Se ele não souber algo, registre como "a definir" e siga.

**Bloco A — Marca**
- Nome da marca, o que vende, para quem, e em que cidade/mercado.
- O diferencial real (o que ela faz que o concorrente não faz). Peça um fato concreto, não um adjetivo.
- 3 a 5 adjetivos de personalidade (ex.: artesanal, técnico, sofisticado, tropical, irreverente).
- O que a marca **não** é (ex.: "não é barata", "não é corporativa").
- Concorrentes ou marcas que admira, com links.

**Bloco B — Objetivo**
- Tipo: landing page de conversão, site institucional, lançamento de produto, portfólio.
- Ação principal (uma só): WhatsApp, formulário, compra, agendamento, download.
- Métrica de sucesso, se houver.

**Bloco C — Materiais existentes**
- Logo (ideal em SVG), paleta e fontes da marca, manual de marca.
- Fotos de produto, ambiente, equipe. Qualidade? Fundo removível?
- Vídeos, modelos 3D, ilustrações.
- Textos já escritos, números reais (anos de mercado, clientes, produção), depoimentos reais.

**Bloco D — Referências visuais**
- 3 a 10 sites de referência (Awwwards, Godly, Land-book, Savee, Siteinspire). Para cada um, pergunte **o que exatamente** agrada: a tipografia, uma transição, o ritmo, as cores.
- Nível de movimento desejado: sutil / marcante / experiência imersiva.
- Interesse em 3D: nenhum / um objeto-herói / cena interativa.

**Bloco E — Técnico**
- Stack preferida ou restrições (padrão desta skill abaixo).
- Hospedagem e domínio, prazo, idiomas, necessidade de SEO, analytics, painel de edição.
- Público majoritariamente mobile? (em negócio local no Brasil, quase sempre sim).

Ao final, escreva um **resumo do briefing** em até 15 linhas e peça confirmação.

---

## Fase 2 — Direção de arte

Proponha **2 ou 3 direções distintas**, cada uma com:
- **Conceito** em uma frase (ex.: "A fruta como protagonista: cor que invade a tela a cada sabor").
- **Ideia visual central**: o único gesto que o site inteiro repete e que alguém lembraria depois. Todo site premium tem um.
- **Tipografia**: 1 fonte display + 1 de texto, com nome e fonte (Google Fonts, Fontshare, Pangram Pangram, fontes da marca).
- **Paleta**: fundo, tinta, 1 a 2 acentos, em hex.
- **Movimento**: o "momento wow" principal e o tom do resto (ex.: "reveals lentos com expo.out, um pin horizontal nos produtos").
- **Referência**: qual site do Bloco D inspira o quê.

O usuário escolhe uma (ou mistura). Registre a escolha.

---

## Fase 3 — Conteúdo e narrativa

Defina a sequência de seções como uma história, não como um checklist de componentes. Estrutura base de LP (adapte):
1. **Gancho** (hero): uma frase forte + a imagem ou o gesto central.
2. **Desejo ou problema**: por que isso importa para quem lê.
3. **Produto/serviço**: o que é, mostrado, não listado.
4. **Prova**: números reais, processo, clientes, depoimentos reais.
5. **Diferencial ou bastidores**: o que só essa marca tem.
6. **Ação**: CTA claro e repetido no rodapé.

Escreva os textos finais de cada seção. Regras de copy:
- Frases curtas. Um título por seção, no máximo 8 palavras.
- Fatos concretos no lugar de adjetivos ("polpa congelada em até 4 horas após a colheita" em vez de "qualidade incomparável").
- Proibido: "Eleve", "Transforme", "Revolucione", "Potencialize", "Descubra o poder de", "soluções inovadoras", "de ponta", "seu parceiro ideal", "experiência única", "no próximo nível", emojis em títulos, excesso de travessões.
- Nunca invente números, clientes ou depoimentos. Se faltar, deixe marcado como [PREENCHER] e avise.
- Escreva no tom dos adjetivos do briefing. Leia em voz alta: se soar como anúncio genérico, reescreva.

Peça aprovação dos textos antes de seguir.

---

## Fase 4 — Tokens de design

Defina em variáveis CSS antes de qualquer tela:

```css
:root {
  --paper: #f4efe6;      /* fundo */
  --ink: #161412;        /* texto */
  --accent: #e2531d;     /* 1 acento principal */
  --accent-2: #2f5d3a;   /* opcional */

  --font-display: "Nome Display", serif;
  --font-text: "Nome Texto", sans-serif;

  /* escala fluida */
  --fs-hero: clamp(3.5rem, 11vw, 12rem);
  --fs-h2: clamp(2.25rem, 6vw, 6rem);
  --fs-body: clamp(1rem, 1.1vw, 1.2rem);

  --space-section: clamp(6rem, 14vw, 14rem);
  --gutter: clamp(1rem, 4vw, 4rem);

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1); /* equivalente a expo.out */
}
```

Regras: no máximo 2 famílias tipográficas, no máximo 2 acentos, espaçamento generoso entre seções, títulos grandes com `letter-spacing` levemente negativo e `line-height` entre 0.9 e 1.05.

---

## Fase 5 — SPEC.md com storyboard de movimento

Crie um arquivo `SPEC.md` no projeto. Ele é a fonte da verdade; toda implementação consulta este arquivo.

Conteúdo obrigatório:
1. Resumo do briefing e da direção escolhida.
2. Tokens (copiados da Fase 4).
3. Stack e estrutura de pastas.
4. **Uma ficha por seção**, neste formato:

```
## Seção 2 — Sabores
Objetivo: mostrar a variedade e fazer a cor da marca "respirar"
Conteúdo: [textos finais]
Assets: fruta-caju.webp, fruta-acerola.webp, fruta-cupuacu.webp (fundo removido)
Layout desktop: fruta centralizada, nome do sabor em display 20vw atrás, em --accent com 12% de opacidade
Layout mobile: lista vertical, fruta acima do nome
Entrada: fruta sobe de y:80 e opacity 0→1, 1s, expo.out
Scroll: pin por 300vh; a cada 1/3 troca o sabor; o fundo interpola para a cor do sabor
Hover: nenhum
Mobile: sem pin; cada sabor com reveal simples ao entrar
Reduced motion: estático, cores fixas
```

5. **Regras de movimento do projeto**:
   - No máximo 1 momento "wow" por seção, e no máximo 3 no site inteiro.
   - O resto é reveal sutil e consistente.
   - Easings do projeto: `expo.out` para entradas, `power2.inOut` para transições, `none` só em scrub.
   - Durações entre 0.8s e 1.4s para entradas; nada abaixo de 0.4s exceto hover.
6. Checklist de assets com status (tem / falta / gerar).

Peça aprovação do SPEC.

---

## Fase 6 — Assets

Assets fracos derrubam qualquer código. Antes de construir, garanta:

- **Fotos**: produto com fundo removido (PNG/WebP com alfa), exportadas em AVIF/WebP, 2 tamanhos (mobile ~900px, desktop ~2000px).
- **Vídeo**: MP4 H.264 curto e sem áudio, até ~4 MB para background. Para vídeo controlado por scroll, reencode com todos os quadros-chave:
  `ffmpeg -i in.mp4 -c:v libx264 -g 1 -crf 23 -an -movflags +faststart -vf scale=1600:-2 out.mp4`
  Em iOS, sequência de imagens em canvas é mais confiável que scrub de vídeo.
- **Sequência de imagens** (efeito "3D" leve e muito bonito): renderize o objeto girando no Blender ou extraia quadros de um vídeo, 60 a 150 quadros em WebP.
  `ffmpeg -i in.mp4 -vf "fps=30,scale=1200:-2" frames/%04d.webp`
- **3D real** (.glb): Blender, Sketchfab (confira licença) ou geração por IA. Sempre otimize:
  `npx @gltf-transform/cli optimize in.glb out.glb --compress draco --texture-compress webp`
  Meta: abaixo de 3 MB.
- **Textura**: um grão/ruído sutil (SVG ou PNG pequeno em overlay com 4 a 8% de opacidade) tira o aspecto "plástico" digital.

Se faltar asset, diga claramente o que falta e proponha alternativa (ex.: tipografia como protagonista no lugar da foto). Nunca preencha com gradiente genérico ou foto de banco óbvia sem avisar.

---

## Fase 7 — Construção

### Stack padrão
- Vite + React + TypeScript (ou HTML/JS puro para LP simples de uma página).
- GSAP + ScrollTrigger + SplitText + `@gsap/react` (GSAP e todos os plugins são gratuitos).
- Lenis para scroll suave.
- React Three Fiber + drei **somente** se houver 3D interativo real.
- CSS com variáveis (Tailwind é opcional; se usar, mapeie os tokens no tema).
- Não use Framer Motion e GSAP no mesmo elemento: os dois disputam o `transform`. Escolha GSAP para scroll; Framer Motion só se o projeto já depender dele para UI.

### Modo de trabalho
- Construa **uma seção por vez**, na ordem do SPEC.
- Primeiro o layout estático perfeito (desktop e mobile), depois o movimento.
- Ao terminar cada seção: rode, tire screenshot (desktop 1440px e mobile 390px, se houver ferramenta de browser), compare com o SPEC e com a checklist anti-IA abaixo, corrija, e só então mostre ao usuário.
- Componentes de terceiros (21st.dev, Codrops, CodePen) entram como peças: adapte aos tokens, remova o que não serve, mantenha o aviso de licença exigido.

### Setup base (Lenis + GSAP)

```ts
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initScroll() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

// Depois que fontes e imagens críticas carregarem, recalcule posições
document.fonts.ready.then(() => ScrollTrigger.refresh());
```

### Padrão de animação em componente React

```tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export function Section() {
  const scope = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 768px)" },
      (ctx) => {
        const { motion, desktop } = ctx.conditions!;
        if (!motion) return;
        // animações aqui; use `desktop` para pins e efeitos pesados
      }
    );
  }, { scope });
  return <section ref={scope}>...</section>;
}
```

`useGSAP` com `scope` limpa tudo ao desmontar. Sempre use `gsap.matchMedia` para separar desktop, mobile e reduced motion.

### Catálogo de técnicas

Use o que o SPEC pedir. Não use tudo.

**Reveal de título por linha (máscara)**
```ts
const split = SplitText.create(el, { type: "lines", mask: "lines" });
gsap.from(split.lines, {
  yPercent: 100, duration: 1.2, ease: "expo.out", stagger: 0.08,
  scrollTrigger: { trigger: el, start: "top 80%" },
});
```

**Parallax por camada**
```ts
gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
  gsap.to(el, {
    yPercent: -15 * Number(el.dataset.speed), ease: "none",
    scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
  });
});
```
Parallax bom é sutil: diferenças de 5 a 20% entre camadas.

**Imagem revelada por clip-path**
```ts
gsap.fromTo(img,
  { clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 },
  { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.4, ease: "expo.out",
    scrollTrigger: { trigger: img, start: "top 75%" } });
```

**Scroll horizontal com pin**
```ts
const distance = () => track.scrollWidth - window.innerWidth;
gsap.to(track, {
  x: () => -distance(), ease: "none",
  scrollTrigger: { trigger: section, pin: true, scrub: 1,
    end: () => "+=" + distance(), invalidateOnRefresh: true },
});
```

**Sequência de imagens em canvas (objeto "3D" girando no scroll)**
```ts
const images = Array.from({ length: COUNT }, (_, i) => {
  const img = new Image();
  img.src = `/frames/${String(i + 1).padStart(4, "0")}.webp`;
  return img;
});
const state = { frame: 0 };
const draw = () => {
  const img = images[state.frame];
  if (!img.complete) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};
images[0].onload = draw;
gsap.to(state, {
  frame: COUNT - 1, snap: "frame", ease: "none", onUpdate: draw,
  scrollTrigger: { trigger: section, start: "top top", end: "+=250%", pin: true, scrub: 0.5 },
});
```
Ajuste o canvas ao `devicePixelRatio` (limite em 2).

**Cor de fundo que muda por seção**
```ts
gsap.utils.toArray<HTMLElement>("[data-bg]").forEach((sec) => {
  ScrollTrigger.create({
    trigger: sec, start: "top 50%", end: "bottom 50%",
    onToggle: (self) => self.isActive && gsap.to(document.body, {
      "--paper": sec.dataset.bg, "--ink": sec.dataset.ink ?? "#161412",
      duration: 0.8, ease: "power2.inOut",
    }),
  });
});
```

**Marquee infinito** (para frases da marca, logos de clientes): duplique o conteúdo e anime `xPercent: -50` com `repeat: -1, ease: "none"`; acelere levemente com a velocidade do scroll via `ScrollTrigger.getVelocity()` se o SPEC pedir.

**Botão magnético** (só em desktop, só no CTA principal): em `pointermove`, `gsap.quickTo(btn, "x")` e `"y"` com 30% da distância ao centro; volte a 0 em `pointerleave` com `elastic.out(1, 0.4)`.

**3D com React Three Fiber** (quando o SPEC exigir cena real)
```tsx
<Canvas dpr={[1, 1.75]} camera={{ fov: 35, position: [0, 0, 6] }} gl={{ antialias: true }}>
  <Suspense fallback={null}>
    <Environment preset="studio" />
    <Model /> {/* useGLTF("/model.glb") */}
  </Suspense>
</Canvas>
```
Carregue o Canvas com `lazy()` só quando a seção estiver perto da viewport. Conecte a rotação ao scroll lendo o progresso de um ScrollTrigger em `useFrame`. No mobile, considere trocar a cena por sequência de imagens ou vídeo.

**Preloader**: só se houver assets pesados. Simples (contador ou logo), no máximo 2 s, e ele deve terminar em uma transição que já é o início do hero.

---

## Checklist anti-"cara de IA"

Revise cada seção contra esta lista antes de mostrar ao usuário. Qualquer item marcado deve ser corrigido ou justificado pelo SPEC.

**Visual**
- [ ] Gradiente roxo/azul/rosa genérico, "blob" desfocado de fundo, ou glassmorphism sem motivo de marca.
- [ ] Só Inter/Poppins/Montserrat, tudo no mesmo peso e tamanho parecido.
- [ ] Hero padrão: título centralizado + subtítulo + dois botões + imagem ao lado.
- [ ] Grade de 3 ou 4 cards iguais com ícone, título e parágrafo.
- [ ] Tudo com `rounded-2xl` e `shadow-lg`; ícones Lucide em tudo; emojis como ícones.
- [ ] Layout 100% simétrico e centralizado do início ao fim.
- [ ] Espaçamento apertado entre seções.
- [ ] Foto de banco óbvia ou imagem gerada com aparência artificial.

**Movimento**
- [ ] Todos os elementos com o mesmo fade-up, na mesma duração.
- [ ] Animação em cada elemento da página (movimento em excesso = amador).
- [ ] Easing `linear` ou padrão do navegador em entradas.
- [ ] Efeito que não tem relação com a ideia visual central.
- [ ] Scroll-jacking que impede o usuário de rolar normalmente.

**Conteúdo**
- [ ] Palavras proibidas da Fase 3.
- [ ] Números, depoimentos ou clientes inventados.
- [ ] Lorem ipsum ou placeholder esquecido.

**O que fazer no lugar**: grades assimétricas e editoriais, tipografia gigante como elemento gráfico, uma cor de acento usada com disciplina, fotos reais recortadas, grão sutil, alinhamentos deliberados, texto pequeno e bem espaçado ao lado de títulos enormes, detalhes de marca (numeração de seções, legendas, linhas finas).

---

## Fase 8 — Acabamento e QA

**Performance**
- Anime apenas `transform`, `opacity`, `clip-path` e variáveis de cor. Nunca `top/left/width/height` em scroll.
- `will-change` só durante a animação, não global.
- Imagens em AVIF/WebP com `srcset` e `sizes`; `loading="lazy"` fora da primeira dobra; `fetchpriority="high"` na imagem do hero.
- Fontes: `<link rel="preload">` para a display, `font-display: swap`, subset quando possível.
- Lighthouse mobile: Performance ≥ 80, Acessibilidade ≥ 90, LCP < 2,5 s.

**Responsivo**
- Teste em 390px, 768px, 1440px e 1920px.
- Mobile tem layout próprio, não só versão encolhida. Pins longos e scroll horizontal geralmente viram lista vertical.
- Use `svh`/`dvh` em vez de `vh` em seções de tela cheia.

**Acessibilidade**
- `prefers-reduced-motion` respeitado em todas as animações.
- Contraste mínimo 4.5:1 no texto.
- Navegação por teclado com foco visível; textos alternativos nas imagens.
- Nenhum conteúdo importante existe apenas dentro de canvas ou 3D.

**SEO e entrega**
- Título, meta description, Open Graph com imagem 1200×630, favicon, `lang` correto.
- HTML semântico (um `h1`, seções com `h2`).
- Link de WhatsApp com mensagem pré-preenchida quando for a ação principal.
- Analytics se pedido.
- Deploy (Vercel, Netlify ou hospedagem do cliente) e teste no celular real.

---

## Entrega ao usuário

Ao final, entregue: o site rodando (link ou projeto), o `SPEC.md` atualizado com o que mudou na construção, a lista de pendências (textos [PREENCHER], assets faltando) e uma sugestão de próximo passo. Não recapitule cada etapa feita.