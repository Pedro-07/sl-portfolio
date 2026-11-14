/**
 * Fonte de dados do portfólio.
 * Enquanto as fotos reais não entram, `src` fica vazio e o componente
 * renderiza uma moldura tonal (placeholder dark on-brand).
 * Para plugar fotos reais: preencher `src` com caminhos em /public/work/.
 */

export type Frame = {
  /** Caminho da imagem real (ex.: "/work/retrato-01.webp"). Vazio = placeholder. */
  src?: string;
  alt?: string;
  /** Tom do placeholder (gradiente escuro). Usado só quando não há src. */
  tone?: string;
};

/** Molduras do corredor do hero — 10 verticais 3:4. */
export const heroFrames: Frame[] = [
  { tone: "linear-gradient(150deg,#262220,#0b0a09 70%)" },
  { tone: "linear-gradient(150deg,#1b1917,#070707 70%)" },
  { tone: "linear-gradient(150deg,#2a2422,#100e0c 70%)" },
  { tone: "linear-gradient(150deg,#181512,#060606 70%)" },
  { tone: "linear-gradient(150deg,#221d1a,#0c0a09 70%)" },
  { tone: "linear-gradient(150deg,#15120f,#050505 70%)" },
  { tone: "linear-gradient(150deg,#2d2623,#0e0c0b 70%)" },
  { tone: "linear-gradient(150deg,#1e1a17,#080807 70%)" },
  { tone: "linear-gradient(150deg,#241f1c,#0a0908 70%)" },
  { tone: "linear-gradient(150deg,#17140f,#060605 70%)" },
];
