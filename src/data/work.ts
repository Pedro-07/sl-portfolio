/**
 * Fonte de dados do portfólio.
 *
 * FOTOS ATUAIS = TEMPLATE (Unsplash, licença livre), só para desenvolvimento
 * e validação do movimento. Trocar pelas fotos reais de Sarah & Levi:
 * colocar os arquivos em /public/work/ e apontar `src` para eles
 * (ex.: "/work/retrato-01.webp"). Ver README.
 */

export type Frame = {
  /** Caminho/URL da imagem. Vazio = placeholder tonal. */
  src?: string;
  alt?: string;
  /** Tom de fundo enquanto a imagem carrega (ou placeholder se não houver src). */
  tone?: string;
};

export type WorkItem = Frame & {
  /** Legenda editorial: "nome do projeto — ano". [PREENCHER] por foto real. */
  caption: string;
  /** Proporção da moldura na galeria. */
  ratio: "portrait" | "landscape";
};

export type Chapter = {
  title: string;
  items: WorkItem[];
};

/** Crop vertical 3:4 (hero e retratos da galeria). */
const v = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${Math.round((w * 4) / 3)}&fit=crop&q=80&auto=format`;

/** Crop horizontal 3:2 (paisagens da galeria). */
const h = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${Math.round((w * 2) / 3)}&fit=crop&q=80&auto=format`;

/** Molduras do corredor do hero — 10 verticais 3:4. */
export const heroFrames: Frame[] = [
  { src: v("photo-1494790108377-be9c29b29330", 600), tone: "#1b1917" },
  { src: v("photo-1507003211169-0a1dd7228f2d", 600), tone: "#262220" },
  { src: v("photo-1529626455594-4ff0802cfb7e", 600), tone: "#2a2422" },
  { src: v("photo-1534528741775-53994a69daeb", 600), tone: "#181512" },
  { src: v("photo-1517841905240-472988babdf9", 600), tone: "#221d1a" },
  { src: v("photo-1524504388940-b1c1722653e1", 600), tone: "#15120f" },
  { src: v("photo-1539571696357-5a69c17a67c6", 600), tone: "#2d2623" },
  { src: v("photo-1506794778202-cad84cf45f1d", 600), tone: "#1e1a17" },
  { src: v("photo-1544005313-94ddf0286df2", 600), tone: "#241f1c" },
  { src: v("photo-1463453091185-61582044d556", 600), tone: "#17140f" },
];

/** Capítulos da galeria — Retrato / Editorial / Ensaios. */
export const chapters: Chapter[] = [
  {
    title: "Retrato",
    items: [
      { src: v("photo-1488426862026-3ee34a7d66df"), caption: "Projeto — ano", ratio: "portrait", tone: "#262220" },
      { src: h("photo-1552374196-c4e7ffc6e126"), caption: "Projeto — ano", ratio: "landscape", tone: "#1b1917" },
      { src: v("photo-1531746020798-e6953c6e8e04"), caption: "Projeto — ano", ratio: "portrait", tone: "#2a2422" },
      { src: v("photo-1506794778202-cad84cf45f1d"), caption: "Projeto — ano", ratio: "portrait", tone: "#181512" },
    ],
  },
  {
    title: "Editorial",
    items: [
      { src: h("photo-1492562080023-ab3db95bfbce"), caption: "Projeto — ano", ratio: "landscape", tone: "#221d1a" },
      { src: v("photo-1515886657613-9f3515b0c78f"), caption: "Projeto — ano", ratio: "portrait", tone: "#15120f" },
      { src: v("photo-1496440737103-cd596325d314"), caption: "Projeto — ano", ratio: "portrait", tone: "#2d2623" },
      { src: h("photo-1502323777036-f29e3972d82f"), caption: "Projeto — ano", ratio: "landscape", tone: "#1e1a17" },
    ],
  },
  {
    title: "Ensaios",
    items: [
      { src: v("photo-1521146764736-56c929d59c83"), caption: "Projeto — ano", ratio: "portrait", tone: "#241f1c" },
      { src: h("photo-1524504388940-b1c1722653e1"), caption: "Projeto — ano", ratio: "landscape", tone: "#17140f" },
      { src: v("photo-1544005313-94ddf0286df2"), caption: "Projeto — ano", ratio: "portrait", tone: "#262220" },
    ],
  },
];

/** Retrato da dupla no "Sobre" — template até a foto real. [PREENCHER] */
export const aboutPortrait: Frame = {
  src: v("photo-1517841905240-472988babdf9", 1000),
  alt: "Retrato — template até a foto real de Sarah & Levi",
  tone: "#242019",
};
