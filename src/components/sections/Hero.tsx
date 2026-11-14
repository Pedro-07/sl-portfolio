import "./Hero.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";
import { Corridor } from "../Corridor";
import { heroFrames } from "../../data/work";

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-hero-in]");
        gsap.set(targets, { opacity: 0, y: 40 });

        // Espera as fontes para a revelação não "pular" na troca de fonte.
        document.fonts.ready.then(() => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.12,
            delay: 0.15,
          });
        });
      });

      return () => mm.revert();
    },
    { scope },
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
            <h1 className="hero__title" data-hero-in>
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
