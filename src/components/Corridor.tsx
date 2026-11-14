import "./Corridor.css";
import type { Frame } from "../data/work";

type CorridorProps = {
  frames: Frame[];
  /** Segundos para uma moldura atravessar o corredor. @default 15 */
  speed?: number;
};

/**
 * Corredor de imagens: duas trilhas inclinadas de molduras viajando do
 * fundo preto até o olhar. Perspectiva CSS pura — sem WebGL, sem JS no loop.
 * O movimento é ambiente (não depende do scroll). O gesto central do site.
 *
 * `aria-hidden`: é decorativo; o conteúdo com significado vive no Hero por cima.
 */
export function Corridor({ frames, speed = 15 }: CorridorProps) {
  const count = frames.length;
  const rails: Array<"l" | "r"> = ["l", "r"];

  return (
    <div className="corridor" aria-hidden="true">
      <div className="corridor__stage">
        <div className="corridor__world">
          {rails.map((rail, railIndex) => (
            <div key={rail} className={`corridor__rail corridor__rail--${rail}`}>
              {frames.map((frame, i) => {
                // Delay negativo distribui as molduras ao longo do corredor,
                // já cheio no primeiro frame. Trilha direita defasada em meio
                // passo para as trilhas se intercalarem.
                const step = speed / count;
                const delay = -(i * step + railIndex * (step / 2));
                return (
                  <div
                    key={`${rail}-${i}`}
                    className="corridor__frame"
                    style={{
                      animationDuration: `${speed}s`,
                      animationDelay: `${delay}s`,
                      background: frame.tone, // visível enquanto a imagem carrega
                    }}
                  >
                    {frame.src ? (
                      <img
                        src={frame.src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
