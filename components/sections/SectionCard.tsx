"use client";

import { type ReactNode } from "react";

export default function SectionCard({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`min-h-screen py-20 px-0 max-w-6xl mx-auto w-full ${className}`}
    >
      {children}
    </section>
  );
}
