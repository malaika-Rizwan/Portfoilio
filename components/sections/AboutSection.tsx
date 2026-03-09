"use client";

import Image from "next/image";
import SectionCard from "./SectionCard";
import StarBorder from "@/components/StarBorder";

const ABOUT_IMAGE = "/gg.jpeg";
const keywords = [
  "Next.js",
  "MERN",
  "JWT",
  "OTP",
  "Stripe",
  "MongoDB Atlas",
];

export default function AboutSection() {
  return (
    <SectionCard id="about" className="relative overflow-hidden">
      {/* Background: small moons + purple crystals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {/* Small moons */}
        <div className="absolute top-[10%] left-[8%] w-8 h-8 rounded-full bg-white/10 blur-[1px]" />
        <div className="absolute top-[25%] right-[15%] w-5 h-5 rounded-full bg-white/15 blur-[0.5px]" />
        <div className="absolute bottom-[20%] left-[12%] w-6 h-6 rounded-full bg-white/10 blur-[1px]" />
        <div className="absolute bottom-[35%] right-[8%] w-4 h-4 rounded-full bg-white/12" />
        <div className="absolute top-[50%] left-[5%] w-3 h-3 rounded-full bg-white/10" />
        {/* Purple crystals - dark purple, clearer */}
        <div
          className="absolute top-[5%] right-[10%] w-16 h-20 opacity-35"
          style={{
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            background: "#2d1b4e",
          }}
        />
        <div
          className="absolute bottom-[15%] right-[20%] w-12 h-14 opacity-30"
          style={{
            clipPath: "polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)",
            background: "#2d1b4e",
          }}
        />
        <div
          className="absolute top-[30%] right-[5%] w-10 h-12 opacity-25"
          style={{
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            background: "#2d1b4e",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[20%] w-8 h-10 opacity-30"
          style={{
            clipPath: "polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%)",
            background: "#2d1b4e",
          }}
        />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start pt-4 min-h-[480px] md:min-h-[520px]">
        {/* Overlay image: desaturated, semi-transparent, angular left edge */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block"
          aria-hidden
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-[85%] max-w-4xl grayscale opacity-30 relative"
            style={{
              clipPath:
                "polygon(28% 0, 100% 0, 100% 100%, 0 100%, 0 55%, 22% 28%)",
            }}
          >
            <Image
              src={ABOUT_IMAGE}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 0px, 80vw"
            />
          </div>
        </div>

        {/* Left: about paragraphs + keywords */}
        <div className="relative z-10 space-y-6 order-2 lg:order-1">
          <div className="text-gray-400 text-base sm:text-lg leading-relaxed space-y-4">
            <p>
              Professionally connected to the web development world. I&apos;m a
              Full Stack Developer focused on building robust, scalable
              applications with modern stacks.
            </p>
            <p>
              I specialize in{" "}
              <span className="text-orange-400 font-medium">Next.js</span> and
              the{" "}
              <span className="text-orange-400 font-medium">MERN</span> stack,
              implementing secure authentication with{" "}
              <span className="text-orange-400 font-medium">JWT</span> and{" "}
              <span className="text-orange-400 font-medium">OTP</span> email
              verification, and integrating payments via{" "}
              <span className="text-orange-400 font-medium">Stripe</span>.
            </p>
            <p>
              I deploy production databases on{" "}
              <span className="text-orange-400 font-medium">MongoDB Atlas</span>{" "}
              and build admin dashboards, protected routes, and end-to-end
              flows that are maintainable and performant—from API design to UI
              polish.
            </p>
            <p>
              If you&apos;re looking for a developer who can own features from
              concept to deployment, I&apos;d love to connect.
            </p>
          </div>

          <p className="text-white font-semibold text-sm">Built with &amp; focus areas</p>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <StarBorder
                key={keyword}
                as="span"
                color="magenta"
                speed="5s"
                thickness={0}
                className="[&_.inner-content]:!py-1.5 [&_.inner-content]:!px-3 [&_.inner-content]:!text-sm [&_.inner-content]:!bg-secondary/60 [&_.inner-content]:!border-accent/30 [&_.inner-content]:!text-orange-400"
              >
                {keyword}
              </StarBorder>
            ))}
          </div>
        </div>

        {/* Right: heading + tagline */}
        <div className="relative z-10 flex flex-col justify-center order-1 lg:order-2">
          <h2 className="cursor-pointer text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight transition-colors duration-300 hover:text-orange-400">
            <span className="block">Hi, I&apos;m Malaika</span>
            <span className="block mt-1">Full Stack Developer</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-orange-400 text-base sm:text-lg font-normal">
            Next.js & MERN Specialist / Creative Problem Solver
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
