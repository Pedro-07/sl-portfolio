import "./Marquee.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const LINE = (
  <>
    Retrato <em>·</em> Editorial <em>·</em> Moda <em>·</em> Ensaios <em>·</em>{" "}
    São Luís <em>·</em>{" "}
  </>
);

/**
 * Marquee infinito: conteúdo duplicado, xPercent -50 em loop.
 * Decorativo (aria-hidden). Reduced motion: fica parado.
 */
export function Marquee() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".marquee__track", {
          xPercent: -50,
          repeat: -1,
          ease: "none",
          duration: 24,
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div className="marquee" ref={scope} aria-hidden="true">
      <div className="marquee__track">
        <span className="marquee__chunk">{LINE}</span>
        <span className="marquee__chunk">{LINE}</span>
      </div>
    </div>
  );
}
