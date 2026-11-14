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
