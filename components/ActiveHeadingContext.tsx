"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

type ActiveHeadingContextType = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

const ActiveHeadingContext = createContext<ActiveHeadingContextType | null>(null);

export function ActiveHeadingProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDocumentClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-section-heading]")) return;
    setActiveId(null);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  return (
    <ActiveHeadingContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </ActiveHeadingContext.Provider>
  );
}

export function useActiveHeading() {
  const ctx = useContext(ActiveHeadingContext);
  return ctx ?? { activeId: null, setActiveId: () => {} };
}
