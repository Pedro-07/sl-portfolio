import "./Manifesto.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "../../lib/gsap";

export function Manifesto() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const title = scope.current?.querySelector<HTMLElement>(
          "[data-manifesto-title]",
        );
        const aside = scope.current?.querySelector<HTMLElement>(
          "[data-manifesto-aside]",
        );
        if (!title) return;

        // Split depois das fontes, senão as linhas quebram errado.
        document.fonts.ready.then(() => {
          const split = SplitText.create(title, {
            type: "lines",
            mask: "lines",
          });
          gsap.from(split.lines, {
            yPercent: 100,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: title, start: "top 80%" },
            onComplete: () => split.revert(), // máscara cortaria descendentes
          });

          if (aside) {
            gsap.from(aside, {
              opacity: 0,
              y: 24,
              duration: 1,
              ease: "expo.out",
              delay: 0.2,
              scrollTrigger: { trigger: title, start: "top 80%" },
            });
          }
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section className="manifesto" ref={scope}>
      <div className="manifesto__inner wrap">
        <h2 className="manifesto__title" data-manifesto-title>
          O tempo passa.
          <br />
          A imagem fica.
        </h2>
        <p className="label manifesto__aside" data-manifesto-aside>
          Retrato, editorial e moda — com tempo, luz e intenção.
        </p>
      </div>
    </section>
  );
}
