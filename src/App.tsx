import { useEffect } from "react";
import { initScroll } from "./lib/scroll";
import { Hero } from "./components/sections/Hero";
import { Manifesto } from "./components/sections/Manifesto";
import { Work } from "./components/sections/Work";

export default function App() {
  useEffect(() => {
    const cleanup = initScroll();
    return cleanup;
  }, []);

  return (
    <main>
      <Hero />
      <Manifesto />
      <Work />
    </main>
  );
}
