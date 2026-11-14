import "./Contact.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "../../lib/gsap";

export function Contact() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const title = scope.current?.querySelector<HTMLElement>(
          ".contact__title",
        );
        const links = gsap.utils.toArray<HTMLElement>(
          ".contact__link",
          scope.current,
        );

        document.fonts.ready.then(() => {
          if (title) {
            const split = SplitText.create(title, { type: "lines", mask: "lines" });
            gsap.from(split.lines, {
              yPercent: 100,
              duration: 1.2,
              ease: "expo.out",
              stagger: 0.08,
              scrollTrigger: { trigger: title, start: "top 80%" },
              onComplete: () => split.revert(), // máscara cortaria descendentes
            });
          }
          gsap.from(links, {
            opacity: 0,
            y: 16,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: title ?? scope.current, start: "top 75%" },
          });
        });
      });

      // CTA magnético — só no link principal (Instagram), só desktop.
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
          if (!motion || !desktop) return;

          const btn = scope.current?.querySelector<HTMLElement>(
            "[data-magnetic]",
          );
          if (!btn) return;

          const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });

          const onMove = (e: PointerEvent) => {
            const r = btn.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
          };
          const onLeave = () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "elastic.out(1, 0.4)",
            });
          };

          btn.addEventListener("pointermove", onMove);
          btn.addEventListener("pointerleave", onLeave);
          return () => {
            btn.removeEventListener("pointermove", onMove);
            btn.removeEventListener("pointerleave", onLeave);
          };
        },
      );

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section className="contact" ref={scope} aria-label="Contato">
      <div className="wrap">
        <h2 className="contact__title">Vamos fotografar.</h2>
      </div>

      <div className="wrap">
        <div className="contact__links">
            <a
              className="contact__link"
              data-magnetic
              href="https://instagram.com/sl.prodstudio"
              target="_blank"
              rel="noreferrer"
            >
              Instagram — @sl.prodstudio
            </a>
            {/* [PREENCHER] WhatsApp: trocar por link wa.me com mensagem pré-preenchida */}
            <span className="contact__link contact__link--pending">
              WhatsApp — em breve
            </span>
            {/* [PREENCHER] email */}
            <span className="contact__link contact__link--pending">
              Email — em breve
            </span>
        </div>
      </div>

      <div className="wrap">
        <footer className="contact__footer label">
          <span>SL Prod Studio</span>
          <span>São Luís — MA</span>
        </footer>
      </div>
    </section>
  );
}
