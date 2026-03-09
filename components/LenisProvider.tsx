"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

type LenisContextValue = {
  lenisRef: React.RefObject<Lenis | null>;
  scrollY: number;
};

const LenisContext = createContext<LenisContextValue | null>(null);

export function useLenisScroll() {
  const ctx = useContext(LenisContext);
  return ctx?.scrollY ?? 0;
}

export function useLenisRef() {
  const ctx = useContext(LenisContext);
  return ctx?.lenisRef ?? { current: null };
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);

  useLayoutEffect(() => {
    let mounted = true;
    const lenis = new Lenis({
      lerp: 0.06,
      duration: 1.4,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      if (!mounted) return;
      lenis.raf(time);
      const scroll = "scroll" in lenis ? (lenis as { scroll: number }).scroll : window.scrollY;
      setScrollY(scroll);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      mounted = false;
      lenis.destroy();
      lenisRef.current = null;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenisRef, scrollY }}>
      {children}
    </LenisContext.Provider>
  );
}
