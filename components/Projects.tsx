"use client";

import { useRef, useEffect, useState } from "react";

const features = [
  "JWT authentication",
  "OTP email verification",
  "Stripe integration",
  "Admin dashboard",
  "Wishlist",
  "Protected routes",
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-secondary/30 via-accent-light/10 to-primary"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Featured Project
        </h2>
        <p
          className={`text-accent-light text-sm uppercase tracking-widest mb-12 transition-all duration-700 delay-100 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          MK Store
        </p>

        <div
          className={`rounded-2xl bg-primary/80 border border-secondary/50 overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-video md:aspect-auto bg-secondary/40 flex items-center justify-center min-h-[240px]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
              <div className="relative z-10 text-center p-6">
                <div className="w-full h-32 md:h-40 rounded-xl bg-secondary/60 border border-accent/20 flex items-center justify-center text-gray-500 text-sm">
                  Project image placeholder
                </div>
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-2">MK Store</h3>
              <p className="text-gray-400 mb-6">
                Full-featured e-commerce platform built with Next.js and
                MongoDB.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-gray-300 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-light" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-light text-white font-semibold text-sm transition-colors"
                  aria-label="Live demo of MK Store"
                >
                  Live Demo
                </a>
                <a
                  href="#"
                  className="px-5 py-2.5 rounded-xl border border-accent/50 text-accent-light hover:bg-accent/20 font-semibold text-sm transition-colors"
                  aria-label="MK Store on GitHub"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
