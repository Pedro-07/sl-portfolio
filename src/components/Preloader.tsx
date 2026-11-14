import "./Preloader.css";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

/**
 * Preloader: contador + marca, no máximo ~2s, terminando numa transição
 * que já é o início do hero (a cortina sobe revelando o corredor).
 * Reduced motion: não aparece.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  useEffect(() => {
    if (reduced) onDone();
  }, [reduced, onDone]);

  useGSAP(
    () => {
      if (reduced) return;
      const num = scope.current!.querySelector<HTMLElement>(".preloader__num")!;
      const counter = { v: 0 };

      const tl = gsap.timeline({ onComplete: onDone });
      tl.to(counter, {
        v: 100,
        duration: 1.3,
        ease: "power2.inOut",
        onUpdate: () => {
          num.textContent = String(Math.round(counter.v)).padStart(3, "0");
        },
      })
        .to(
          scope.current!.querySelector(".preloader__mark"),
          { scale: 0.92, duration: 0.3, ease: "power2.in" },
          "-=0.2",
        )
        // a cortina sobe — primeiro gesto de movimento do site
        .to(scope.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "expo.inOut",
        });
    },
    { scope },
  );

  if (reduced) return null;

  return (
    <div className="preloader" ref={scope} aria-hidden="true">
      <div className="preloader__mark">SL</div>
      <span className="preloader__num label">000</span>
    </div>
  );
}
