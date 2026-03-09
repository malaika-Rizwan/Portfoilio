"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useLenisRef } from "./LenisProvider";

const SECTIONS = [
  { id: "home", label: "00" },
  { id: "about", label: "01" },
  { id: "skills", label: "02" },
  { id: "projects", label: "03" },
  { id: "contact", label: "04" },
];

export default function ScrollIndicator() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const lenisRef = useLenisRef();

  useEffect(() => {
    const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (sectionEls.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = (entry.target as HTMLElement).id;
          const index = SECTIONS.findIndex((s) => s.id === id);
          if (index >= 0) setActiveIndex(index);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sectionEls.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback(
    (e: React.MouseEvent, index: number) => {
      const id = SECTIONS[index]?.id;
      const target = id ? document.getElementById(id) : null;
      if (target) {
        e.preventDefault();
        if (lenisRef.current && typeof (lenisRef.current as { scrollTo?: (el: Element, o?: object) => void }).scrollTo === "function") {
          (lenisRef.current as { scrollTo: (el: Element, opts?: object) => void }).scrollTo(target, { lerp: 0.08, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [lenisRef]
  );

  const scrollToTop = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const home = document.getElementById("home");
      if (home && lenisRef.current && typeof (lenisRef.current as { scrollTo?: (el: Element, o?: object) => void }).scrollTo === "function") {
        (lenisRef.current as { scrollTo: (el: Element, opts?: object) => void }).scrollTo(home, { lerp: 0.08, duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [lenisRef]
  );

  if (pathname !== "/") return null;

  return (
    <div className="fixed right-5 top-24 bottom-24 z-30 hidden md:flex flex-col items-end h-[calc(100vh-12rem)]" aria-label="Page sections">
      <div className="relative flex flex-col items-end justify-between flex-1 w-full pr-2 min-h-0">
        {/* Vertical line full height */}
        <div className="absolute right-[9px] top-0 bottom-0 w-px bg-white/30" />
        {SECTIONS.map((section, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={section.id}
              type="button"
              onClick={(e) => scrollToSection(e, index)}
              className="relative flex items-center gap-3 group shrink-0"
              aria-label={`Go to ${section.id}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className={`text-xs font-mono tabular-nums transition-colors ${isActive ? "text-white" : "text-white/50 group-hover:text-white/70"}`}>
                {section.label}
              </span>
              <span className={`block transition-all duration-300 ${isActive ? "w-2 h-10 bg-white" : "w-0.5 h-3 bg-white/40 group-hover:bg-white/50"}`} />
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={scrollToTop}
        className="flex flex-col items-center gap-1.5 text-white/50 hover:text-white transition-colors shrink-0 pt-4"
        aria-label="Back to top"
      >
        <span className="text-xl leading-none">^</span>
        <span className="text-[10px] font-medium uppercase tracking-widest" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          Back To Top
        </span>
      </button>
    </div>
  );
}
