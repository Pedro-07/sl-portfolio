import "./Hero.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "../../lib/gsap";
import { Corridor } from "../Corridor";
import { heroFrames } from "../../data/work";

export function Hero({ play }: { play: boolean }) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!play) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const title = scope.current?.querySelector<HTMLElement>(".hero__title");
        const rest = gsap.utils.toArray<HTMLElement>(
          "[data-hero-in]",
          scope.current,
        );

        // Espera as fontes para a revelação não "pular" na troca de fonte.
        document.fonts.ready.then(() => {
          if (title) {
            const split = SplitText.create(title, {
              type: "lines",
              mask: "lines",
            });
            gsap.fromTo(
              split.lines,
              { yPercent: 110 },
              {
                yPercent: 0,
                duration: 1.3,
                ease: "expo.out",
                stagger: 0.09,
                delay: 0.05,
              },
            );
            gsap.set(title, { opacity: 1 });
          }
          gsap.fromTo(
            rest,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.1,
              delay: 0.35,
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope, dependencies: [play] },
  );

  return (
    <section className="hero" ref={scope}>
      <Corridor frames={heroFrames} />
      <div className="hero__veil" />

      <div className="hero__inner wrap">
        <div className="hero__top">
          <div className="hero__mark" aria-hidden="true">
            SL
          </div>
          <span className="label">São Luís · MA</span>
        </div>

        <div className="hero__bottom">
          <div className="hero__headline">
            <span className="label hero__kicker" data-hero-in>
              Estúdio de fotografia
            </span>
            <h1 className="hero__title">
              SL Prod
              <br />
              Studio
            </h1>
            <p className="hero__sub" data-hero-in>
              Fotografia de retrato e editorial. São Luís.
            </p>
          </div>

          <div className="hero__meta label" data-hero-in>
            <span className="hero__scroll">Role para entrar</span>
            <span style={{ display: "block", marginTop: "0.5rem" }}>
              Sarah &amp; Levi
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
