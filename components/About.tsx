"use client";

import { useRef, useEffect, useState } from "react";

const keywords = [
  "Next.js",
  "MERN",
  "JWT",
  "OTP",
  "Stripe",
  "MongoDB Atlas",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-primary via-accent-light/10 to-secondary/40"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          About Me
        </h2>
        <p
          className={`text-accent-light text-sm uppercase tracking-widest mb-8 transition-all duration-700 delay-100 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          Professional Overview
        </p>

        <div
          className={`max-w-3xl text-gray-300 text-lg leading-relaxed transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="mb-4">
            I&apos;m a Full Stack Developer focused on building robust,
            scalable applications with modern stacks. I specialize in{" "}
            <span className="text-accent-light font-medium">Next.js</span> and
            the{" "}
            <span className="text-accent-light font-medium">MERN</span> stack,
            implementing secure authentication with{" "}
            <span className="text-accent-light font-medium">JWT</span> and{" "}
            <span className="text-accent-light font-medium">OTP</span> email
            verification, and integrating payments via{" "}
            <span className="text-accent-light font-medium">Stripe</span>.
          </p>
          <p className="mb-4">
            I deploy production databases on{" "}
            <span className="text-accent-light font-medium">MongoDB Atlas</span>{" "}
            and build admin dashboards, protected routes, and end-to-end flows
            that are maintainable and performant. I aim to deliver
            job-ready, production-grade solutions—from API design to UI
            polish.
          </p>
          <p>
            If you&apos;re looking for a developer who can own features from
            concept to deployment, I&apos;d love to connect.
          </p>
        </div>

        <div
          className={`mt-8 flex flex-wrap gap-2 transition-all duration-700 delay-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="px-3 py-1.5 rounded-lg bg-secondary/60 text-accent-light text-sm font-medium border border-accent/30"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
