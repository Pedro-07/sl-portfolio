import "./Work.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";
import { chapters } from "../../data/work";

/**
 * Seção 3 — O trabalho. Segundo momento "wow" do site.
 * Desktop: a seção pinna e o scroll vertical vira movimento horizontal.
 * Mobile: sem pin — lista vertical, cada foto revela ao entrar.
 * Reduced motion: tudo estático.
 */
export function Work() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px)",
        },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as {
            motion: boolean;
            desktop: boolean;
          };
          if (!motion) return;

          const section = scope.current!;
          const track = section.querySelector<HTMLElement>("[data-track]")!;
          const media = gsap.utils.toArray<HTMLElement>(".work__media", section);

          if (desktop) {
            const distance = () => track.scrollWidth - window.innerWidth;

            const tween = gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: section.querySelector("[data-viewport]"),
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                end: () => "+=" + distance(),
                invalidateOnRefresh: true,
              },
            });

            // Reveal por clip-path conforme a foto entra pela direita,
            // dirigido pelo movimento do trilho (containerAnimation).
            media.forEach((el) => {
              gsap.fromTo(
                el,
                { clipPath: "inset(0% 100% 0% 0%)", scale: 1.15 },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  scale: 1,
                  duration: 1.4,
                  ease: "expo.out",
                  scrollTrigger: {
                    trigger: el,
                    containerAnimation: tween,
                    start: "left 92%",
                  },
                },
              );
            });

            return; // cleanup fica por conta do contexto do matchMedia
          }

          // Mobile: reveal vertical simples, foto a foto.
          media.forEach((el) => {
            gsap.fromTo(
              el,
              { clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                duration: 1.4,
                ease: "expo.out",
                scrollTrigger: { trigger: el, start: "top 80%" },
              },
            );
          });
        },
      );

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section className="work" ref={scope} aria-label="Portfólio">
      <div className="work__head wrap">
        <span className="label">O trabalho</span>
        <span className="label">Retrato · Editorial · Ensaios</span>
      </div>

      <div className="work__viewport" data-viewport>
        <div className="work__track" data-track>
          {chapters.map((chapter, c) => (
            <div style={{ display: "contents" }} key={chapter.title}>
              <div className="work__chapter">
                <span className="label">
                  {String(c + 1).padStart(2, "0")} /{" "}
                  {String(chapters.length).padStart(2, "0")}
                </span>
                <h3>{chapter.title}</h3>
              </div>

              {chapter.items.map((item, i) => (
                <div
                  key={`${chapter.title}-${i}`}
                  className={`work__item work__item--${item.ratio}`}
                >
                  <figure className="work__figure">
                    {item.src ? (
                      <img
                        className="work__media"
                        src={item.src}
                        alt={item.alt ?? item.caption}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span
                        className="work__media work__media--tone"
                        style={{ background: item.tone }}
                        aria-hidden="true"
                      />
                    )}
                  </figure>
                  <span className="work__caption">{item.caption}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
