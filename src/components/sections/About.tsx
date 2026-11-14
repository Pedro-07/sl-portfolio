import "./About.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "../../lib/gsap";

export function About() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = scope.current!;
        const media = section.querySelector<HTMLElement>(".about__media");
        const lead = section.querySelector<HTMLElement>(".about__lead");
        const rest = gsap.utils.toArray<HTMLElement>("[data-about-in]", section);

        if (media) {
          gsap.fromTo(
            media,
            { clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 1.4,
              ease: "expo.out",
              scrollTrigger: { trigger: media, start: "top 75%" },
            },
          );

          // Parallax sutil entre foto e texto (dentro da faixa do SPEC: 5-12%).
          gsap.to(media, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        document.fonts.ready.then(() => {
          if (lead) {
            const split = SplitText.create(lead, { type: "lines", mask: "lines" });
            gsap.from(split.lines, {
              yPercent: 100,
              duration: 1.2,
              ease: "expo.out",
              stagger: 0.08,
              scrollTrigger: { trigger: lead, start: "top 80%" },
            });
          }
          gsap.from(rest, {
            opacity: 0,
            y: 24,
            duration: 1,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: { trigger: lead ?? section, start: "top 80%" },
          });
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section className="about" ref={scope} aria-label="Sobre Sarah e Levi">
      <div className="about__inner wrap">
        <figure className="about__figure">
          {/* Retrato da dupla — [PREENCHER]. Placeholder tonal até lá. */}
          <span
            className="about__media"
            style={{ background: "linear-gradient(150deg,#242019,#0b0a08 70%)" }}
            aria-hidden="true"
          />
        </figure>

        <div className="about__copy">
          <h2 className="about__lead">
            Fotografamos pessoas no instante em que esquecem da câmera.
          </h2>
          <p className="about__body" data-about-in>
            Dois olhares, um estúdio. Em São Luís, Sarah &amp; Levi fazem
            retrato, editorial e moda com tempo, luz e direção leve.
            {/* [REVISAR] — origem da dupla, desde quando, tom pessoal */}
          </p>
          <span className="label about__sign" data-about-in>
            Sarah &amp; Levi · São Luís — MA
          </span>
        </div>
      </div>
    </section>
  );
}
