"use client";

import { useActiveHeading } from "./ActiveHeadingContext";

type Props = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionHeading({ id, children, className = "" }: Props) {
  const { activeId, setActiveId } = useActiveHeading();
  const isActive = activeId === id;

  return (
    <button
      type="button"
      data-section-heading
      onClick={() => setActiveId(isActive ? null : id)}
      className={`text-left transition-colors duration-300 cursor-pointer bg-transparent border-none p-0 hover:text-orange-400 ${isActive ? "text-orange-400 -translate-y-0.5" : "text-white"} ${className}`}
    >
      {children}
    </button>
  );
}
