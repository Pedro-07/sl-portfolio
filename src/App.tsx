import { useEffect } from "react";
import { initScroll } from "./lib/scroll";
import { Hero } from "./components/sections/Hero";
import { Manifesto } from "./components/sections/Manifesto";

export default function App() {
  useEffect(() => {
    const cleanup = initScroll();
    return cleanup;
  }, []);

  return (
    <main>
      <Hero />
      <Manifesto />
    </main>
  );
}
