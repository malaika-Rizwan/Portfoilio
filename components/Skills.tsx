"use client";

import { useRef, useEffect, useState } from "react";

const categories = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "Redux"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "JWT", "Stripe", "OTP"],
  },
  {
    title: "Database",
    items: ["MongoDB", "MongoDB Atlas", "Mongoose", "Data Modeling"],
  },
  {
    title: "Tools",
    items: ["Git", "VS Code", "Postman", "Vercel", "Figma"],
  },
];

export default function Skills() {
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
      id="skills"
      ref={sectionRef}
      className="py-20 bg-secondary/30 bg-[linear-gradient(180deg,rgba(239,136,173,0.12)_0%,transparent_35%)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Skills
        </h2>
        <p
          className={`text-accent-light text-sm uppercase tracking-widest mb-12 transition-all duration-700 delay-100 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          Technologies I work with
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, i) => (
            <div
              key={category.title}
              className={`rounded-2xl bg-primary/80 border border-secondary/50 p-6 shadow-soft hover:shadow-soft-hover hover:border-accent/40 hover:-translate-y-1 transition-all duration-500 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${100 + i * 80}ms` }}
            >
              <h3 className="text-accent-light font-semibold text-lg mb-4 border-b border-accent/30 pb-2">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="text-gray-300 text-sm hover:text-accent-light transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
