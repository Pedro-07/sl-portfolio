import "./Process.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "../../lib/gsap";

// [CONFIRMAR método com Sarah & Levi]
const steps = [
  "Conversa antes da câmera.",
  "Luz natural, direção leve.",
  "Entrega tratada, no tempo certo.",
];

export function Process() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lines = gsap.utils.toArray<HTMLElement>(
          ".process__text",
          scope.current,
        );

        document.fonts.ready.then(() => {
          lines.forEach((line) => {
            const split = SplitText.create(line, { type: "lines", mask: "lines" });
            gsap.from(split.lines, {
              yPercent: 100,
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: { trigger: line, start: "top 85%" },
            });
          });
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section className="process" ref={scope} aria-label="Como trabalhamos">
      <div className="wrap">
        <div className="process__head">
          <span className="label">Como trabalhamos</span>
        </div>
        <ol className="process__list">
          {steps.map((text, i) => (
            <li className="process__step" key={i}>
              <span className="process__num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="process__text">{text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
