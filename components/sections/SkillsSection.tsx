"use client";

import Image from "next/image";
import Link from "next/link";
import SectionCard from "./SectionCard";
import SectionHeading from "@/components/SectionHeading";

type SkillItem = { src: string; alt: string };

const skillGroups: { label: string; skills: SkillItem[] }[] = [
  {
    label: "Frontend",
    skills: [
      { src: "/html-5.png", alt: "HTML5" },
      { src: "/css_icon.webp", alt: "CSS3" },
      { src: "/js.png", alt: "JavaScript" },
      { src: "/React.png", alt: "React" },
      { src: "/nextjs_icon.webp", alt: "Next.js" },
      { src: "/bootstrap.png", alt: "Bootstrap" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { src: "/nodejs.png", alt: "Node.js" },
      { src: "/mongodb.png", alt: "MongoDB" },
      { src: "/postman.png", alt: "Postman" },
      { src: "/confidentiality.png", alt: "Confidentiality" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { src: "/github.png", alt: "GitHub" },
      { src: "/figma_logo.webp", alt: "Figma" },
      { src: "/vsco.webp", alt: "Visual Studio Code" },
      { src: "/cursor.png", alt: "Cursor.ai" },
      { src: "/jira.png", alt: "Jira" },
    ],
  },
];

const LINKEDIN_URL = "https://www.linkedin.com/in/malaika-rizwan-a47b3a3ab?utm_source=share_via&utm_content=profile&utm_medium=member_android";

export default function SkillsSection() {
  return (
    <SectionCard id="skills" className="relative overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-[12%] right-[10%] w-14 h-18 opacity-35" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", background: "#2d1b4e" }} />
        <div className="absolute bottom-[18%] left-[8%] w-10 h-14 opacity-30" style={{ clipPath: "polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)", background: "#2d1b4e" }} />
        <div className="absolute top-[45%] right-[6%] w-8 h-12 opacity-25" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", background: "#2d1b4e" }} />
      </div>

      <div className="relative z-10">
        <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest mb-3">
          A problem is an opportunity to do your best.
        </p>
        <SectionHeading
          id="skills"
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 block text-white"
        >
          Skills & Experience
        </SectionHeading>

        <div className="max-w-3xl space-y-4 mb-12">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            I specialize in crafting engaging and high-quality client-side and
            full-stack web applications.
          </p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            My experience includes HTML, CSS, and JavaScript, building projects
            with React and Next.js, developing custom features and APIs,
            creating animations, and coding interactive layouts. I also have
            full-stack experience, including working with Node.js, MongoDB, and
            modern tooling.
          </p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            For a deeper look at my work and experience, visit my{" "}
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 font-medium underline underline-offset-2 transition-colors"
            >
              LinkedIn
            </Link>
            .
          </p>
        </div>

        {/* Skills: horizontal row by group, fully responsive */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-8 xl:gap-12">
          {skillGroups.map((group, index) => (
            <div
              key={group.label}
              className={`flex flex-col gap-4 flex-1 min-w-0 ${index > 0 ? "lg:border-l lg:border-white/10 lg:pl-8 xl:pl-12" : ""}`}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                {group.label}
              </span>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                {group.skills.map((skill) => {
                  const isWhiteBg = skill.alt === "GitHub" || skill.alt === "Next.js";
                  return (
                  <div
                    key={skill.src}
                    className="group flex flex-shrink-0 flex-col items-center gap-2.5"
                  >
                    <div className={`relative h-14 w-14 sm:h-16 sm:w-16 rounded-xl border flex items-center justify-center p-2.5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-black/20 ${
                      isWhiteBg
                        ? "bg-white border-white/30 group-hover:border-white/50"
                        : "border-white/10 bg-white/5 group-hover:border-white/20 group-hover:bg-white/10"
                    }`}>
                      <Image
                        src={skill.src}
                        alt={skill.alt}
                        width={64}
                        height={64}
                        className="object-contain w-full h-full select-none"
                      />
                    </div>
                    <span className="text-white text-sm font-medium text-center max-w-[4.5rem] leading-tight">
                      {skill.alt}
                    </span>
                  </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
