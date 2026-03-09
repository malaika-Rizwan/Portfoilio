"use client";

import Image from "next/image";
import SectionCard from "./SectionCard";
import StarBorder from "@/components/StarBorder";

const HERO_IMAGE = "/gg.jpeg";

export default function HomeSection() {
  return (
    <SectionCard id="home" className="pt-0 pb-0 relative overflow-hidden">
      {/* Purple crystals background - dark purple, clearer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-[10%] right-[12%] w-14 h-18 opacity-35" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", background: "#2d1b4e" }} />
        <div className="absolute bottom-[25%] left-[8%] w-10 h-14 opacity-30" style={{ clipPath: "polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)", background: "#2d1b4e" }} />
        <div className="absolute top-[40%] right-[5%] w-8 h-12 opacity-25" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", background: "#2d1b4e" }} />
        <div className="absolute bottom-[10%] right-[20%] w-12 h-16 opacity-30" style={{ clipPath: "polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%)", background: "#2d1b4e" }} />
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-10 gap-4 md:gap-4 items-center min-h-[85vh] md:min-h-[100vh]">
        <div className="md:col-span-5 flex flex-col justify-center text-left w-full">
          <h1 className="cursor-pointer text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight w-full transition-colors duration-300 hover:text-orange-400">
            <span className="block">Full Stack Web Developer</span>
            <span className="block">Malaika Rizwan</span>
          </h1>
          <p className="mt-6 md:mt-8 w-full text-gray-400 text-lg md:text-xl lg:text-2xl font-normal leading-relaxed mb-6">
            Full Stack Developer | <span className="text-orange-400">Next.js & MERN Specialist</span>. I build scalable,
            production-ready web applications with authentication, payment
            systems, and admin dashboards.
          </p>
          <div className="flex flex-wrap justify-start gap-3">
            <StarBorder
              as="a"
              href="#projects"
              color="magenta"
              speed="5s"
              className="[&_.inner-content]:!bg-accent [&_.inner-content]:hover:!bg-accent-light [&_.inner-content]:!border-accent/30"
            >
              View Projects
            </StarBorder>
          </div>
        </div>
        <div className="md:col-span-5 flex items-center justify-center">
          <div className="relative w-full aspect-[4/3] max-w-5xl mx-auto md:max-w-none md:aspect-auto md:h-[100vh] md:min-h-[600px] animate-float">
            <Image
              src={HERO_IMAGE}
              alt="Developer workstation"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
