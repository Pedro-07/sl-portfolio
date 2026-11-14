import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * Inicializa scroll suave (Lenis) acoplado ao ticker do GSAP.
 * Respeita prefers-reduced-motion: não liga o smooth scroll.
 * Retorna uma função de cleanup.
 */
export function initScroll(): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Sem scroll suave; ainda assim mantém o ScrollTrigger coerente.
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => {};
  }

  const lenis = new Lenis({ lerp: 0.1 });

  lenis.on("scroll", ScrollTrigger.update);

  const onTick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  // Recalcula posições quando fontes/imagens críticas carregarem.
  document.fonts.ready.then(() => ScrollTrigger.refresh());

  return () => {
    gsap.ticker.remove(onTick);
    lenis.destroy();
  };
}
