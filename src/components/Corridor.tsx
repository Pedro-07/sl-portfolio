import "./Corridor.css";
import { useId, useMemo } from "react";
import type { Frame } from "../data/work";

/*
 * O corredor — geometria portada da referência do cliente (ImageStreamHero).
 *
 * Duas trilhas de cards viajam do fundo da tela em direção ao olhar.
 * A projeção em perspectiva faz o trabalho de duas animações: conforme o
 * z cresce, o card aumenta E varre para fora do ponto de fuga.
 *
 * Três decisões de forma (cada uma evita um defeito específico):
 * 1. A profundidade é autorada como tamanho aparente, geometricamente —
 *    cada card mantém razão constante de tamanho com o de trás, então a
 *    fita continua sólida nas duas pontas.
 * 2. As trilhas abrem forte no primeiro trecho e depois seguram (fan > 1):
 *    a fita sai do centro como banda chata, dobra uma vez e corre na
 *    diagonal.
 * 3. O card nasce CRUZANDO o eixo (railBirth negativo): o centro nunca
 *    abre um buraco, e o recém-nascido entra atrás de cards que já o
 *    cobrem — não precisa de fade-in.
 *
 * Tudo em cqw (% da largura do container): proporções idênticas em
 * qualquer tamanho de tela.
 */

type CorridorPath = {
  perspective: number;
  cardWidth: number;
  cardHeight: number;
  cardRadius: number;
  birthHeight: number;
  exitHeight: number;
  railBirth: number;
  railExit: number;
  fan: number;
  turnBirth: number;
  turnExit: number;
  stops: number;
};

const PATH: CorridorPath = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 24, // 3:4, proporção das fotos do estúdio
  cardRadius: 0.3,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

/** Amostra o caminho para que os keyframes CSS tracem a curva real. */
function keyframes(dir: 1 | -1, name: string, p: CorridorPath) {
  const steps: string[] = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    // Geométrico no tamanho aparente: razão constante entre cards vizinhos.
    const scale =
      (p.birthHeight / p.cardHeight) *
      Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail =
      p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(2)}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`,
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

type CorridorProps = {
  frames: Frame[];
  /** Cards por trilha. Mais cards = corredor mais denso, não mais rápido. @default 9 */
  cards?: number;
  /** Segundos para um card atravessar o corredor inteiro. @default 18 */
  speed?: number;
  /** Altura do eixo do corredor, em % da altura. @default 55 */
  axis?: number;
};

export function Corridor({
  frames,
  cards = 9,
  speed = 18,
  axis = 55,
}: CorridorProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `cor-r-${id}`;
  const left = `cor-l-${id}`;

  const css = useMemo(
    () => keyframes(1, right, PATH) + keyframes(-1, left, PATH),
    [right, left],
  );

  return (
    <div className="corridor" aria-hidden="true">
      <style>{css}</style>
      <div
        className="corridor__stage"
        style={{
          perspective: `${PATH.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div className="corridor__world">
          {[right, left].map((name) =>
            Array.from({ length: cards }, (_, i) => {
              // As duas trilhas percorrem a mesma sequência: a esquerda
              // espelha a direita em cada profundidade.
              const frame = frames[i % Math.max(frames.length, 1)];
              return (
                <div
                  key={`${name}-${i}`}
                  className="corridor__frame"
                  style={{
                    left: "50%",
                    top: `${axis}%`,
                    width: `${PATH.cardWidth}cqw`,
                    height: `${PATH.cardHeight}cqw`,
                    marginLeft: `${-PATH.cardWidth / 2}cqw`,
                    marginTop: `${-PATH.cardHeight / 2}cqw`,
                    borderRadius: `${PATH.cardRadius}cqw`,
                    animation: `${name} ${speed}s linear infinite`,
                    // Delay negativo solta cada card no meio do voo:
                    // o corredor já está cheio no primeiro frame.
                    animationDelay: `${-(i * speed) / cards}s`,
                    background: frame?.tone,
                  }}
                >
                  {frame?.src ? (
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
            }),
          )}
        </div>
      </div>
    </div>
  );
}
