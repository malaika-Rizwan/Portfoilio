"use client";

import { useLenisRef } from "./LenisProvider";
import StarBorder from "@/components/StarBorder";
import Logo from "@/components/Logo";

export default function HomeHeader() {
  const lenisRef = useLenisRef();

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("contact");
    if (target) {
      if (lenisRef.current && typeof (lenisRef.current as unknown as { scrollTo: (el: Element, o?: object) => void }).scrollTo === "function") {
        (lenisRef.current as unknown as { scrollTo: (el: Element, o?: object) => void }).scrollTo(target, { lerp: 0.06, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <a
        href="#home"
        className="flex items-center gap-2 text-xl font-semibold text-white hover:text-gray-300 transition-colors"
        aria-label="Malaika - Home"
      >
        <Logo size="md" variant="white" />
        Malaika
      </a>
      <StarBorder
        as="a"
        href="#contact"
        onClick={scrollToContact}
        color="magenta"
        speed="5s"
        className="!p-0 [&_.inner-content]:!py-2 [&_.inner-content]:!px-5 [&_.inner-content]:!bg-white/10 [&_.inner-content]:!border-white/20 [&_.inner-content]:hover:!bg-white/20"
      >
        Contact Me
      </StarBorder>
    </header>
  );
}
