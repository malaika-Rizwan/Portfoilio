"use client";

import { useState, useEffect, useCallback } from "react";
import { useLenisRef } from "./LenisProvider";
import StarBorder from "@/components/StarBorder";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const lenisRef = useLenisRef();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => ({
      id: l.href.slice(1),
      el: document.getElementById(l.href.slice(1)),
    })).filter((s) => s.el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = (entry.target as HTMLElement).id;
          if (id) setActiveId(id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach(({ el }) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const target = document.querySelector(href);
      if (target) {
        if (lenisRef.current && typeof lenisRef.current.scrollTo === "function") {
          e.preventDefault();
          (lenisRef.current as unknown as { scrollTo: (el: Element, opts?: object) => void }).scrollTo(target, { lerp: 0.08, duration: 1.2 });
        }
      }
      setMobileOpen(false);
    },
    [lenisRef]
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-0 py-4 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="flex items-center gap-2 text-xl font-semibold text-white hover:text-accent-light transition-colors"
          aria-label="Home"
        >
          <Logo size="md" variant="white" />
          Malaika<span className="text-accent-light">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeId === id;
            const isContact = link.label === "Contact";
            return (
              <li key={link.href}>
                {isContact ? (
                  <StarBorder
                    as="a"
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    color="magenta"
                    speed="5s"
                    className={`!p-0 [&_.inner-content]:!py-2 [&_.inner-content]:!px-4 [&_.inner-content]:!text-sm [&_.inner-content]:!bg-transparent [&_.inner-content]:!border-accent/30 ${
                      isActive
                        ? "[&_.inner-content]:!text-accent-light [&_.inner-content]:!border-accent"
                        : "[&_.inner-content]:!text-gray-300 [&_.inner-content]:hover:!text-accent-light"
                    }`}
                  >
                    {link.label}
                  </StarBorder>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-accent-light"
                        : "text-gray-300 hover:text-accent-light"
                    }`}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="md:hidden p-2 text-gray-300 hover:text-accent-light rounded-lg hover:bg-secondary/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = activeId === id;
              const isContact = link.label === "Contact";
              return (
                <li key={link.href}>
                  {isContact ? (
                    <StarBorder
                      as="a"
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      color="magenta"
                      speed="5s"
                      className={`!p-0 [&_.inner-content]:!py-2 [&_.inner-content]:!px-4 [&_.inner-content]:!bg-transparent [&_.inner-content]:!border-accent/30 ${
                        isActive
                          ? "[&_.inner-content]:!text-accent-light"
                          : "[&_.inner-content]:!text-gray-300"
                      }`}
                    >
                      {link.label}
                    </StarBorder>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      className={`block font-medium transition-colors ${
                        isActive
                          ? "text-accent-light"
                          : "text-gray-300 hover:text-accent-light"
                      }`}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
