import { useEffect, useState } from "react";
import { initScroll } from "./lib/scroll";
import { Preloader } from "./components/Preloader";
import { Marquee } from "./components/Marquee";
import { Hero } from "./components/sections/Hero";
import { Manifesto } from "./components/sections/Manifesto";
import { Work } from "./components/sections/Work";
import { About } from "./components/sections/About";
import { Process } from "./components/sections/Process";
import { Contact } from "./components/sections/Contact";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cleanup = initScroll();
    return cleanup;
  }, []);

  return (
    <>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <main>
        <Hero play={ready} />
        <Manifesto />
        <Marquee />
        <Work />
        <About />
        <Process />
        <Contact />
      </main>
    </>
  );
}
