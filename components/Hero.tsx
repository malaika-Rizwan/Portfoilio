"use client";

import Image from "next/image";
import OrbitImages from "./OrbitImages";

const orbitImages = [
  "/heroport.png",
  "/heroport.png",
  "/heroport.png",
  "/heroport.png",
  "/heroport.png",
  "/heroport.png",
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary/40 to-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-accent/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(239,136,173,0.25)_0%,rgba(165,56,96,0.1)_40%,transparent_70%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-12">
        <div className="flex-1 text-center lg:text-left pt-4">
          <p
            className="text-accent-light font-medium text-sm uppercase tracking-widest mb-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            Full Stack Developer
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            Malaika Rizwan
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-300 mb-2 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            Full Stack Developer | Next.js & MERN Specialist
          </p>
          <p
            className="max-w-2xl mx-auto lg:mx-0 text-gray-400 text-base md:text-lg mb-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            I build scalable, production-ready web applications with
            authentication, payment systems, and admin dashboards.
          </p>

          <div
            className="flex flex-wrap justify-center lg:justify-start gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-light text-white font-semibold transition-all duration-300 shadow-soft hover:shadow-soft-hover hover:-translate-y-0.5"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download
              className="px-6 py-3 rounded-xl border-2 border-accent/50 text-accent-light hover:bg-accent/20 font-semibold transition-all duration-300"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl bg-secondary/80 hover:bg-secondary text-white font-semibold transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end min-h-[320px] lg:min-h-[400px]">
          <div
            className="w-full max-w-[340px] lg:max-w-[400px] aspect-square opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <OrbitImages
              images={orbitImages}
              shape="ellipse"
              radiusX={340}
              radiusY={80}
              rotation={-8}
              duration={30}
              itemSize={80}
              responsive={true}
              radius={160}
              direction="normal"
              fill
              showPath={false}
              paused={false}
              centerContent={
                <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden shadow-soft border-2 border-accent/30 ring-4 ring-primary/80">
                  <Image
                    src="/heroport.png"
                    alt="Malaika Rizwan"
                    fill
                    sizes="(max-width: 1024px) 160px, 192px"
                    className="object-cover object-center"
                    priority
                  />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
