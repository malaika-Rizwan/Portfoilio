"use client";

import Image from "next/image";
import SectionCard from "./SectionCard";
import SectionHeading from "@/components/SectionHeading";
import StarBorder from "@/components/StarBorder";
import { motion } from "motion/react";

const project1 = {
  category: "E-COMMERCE APPLICATION",
  title: "E-COMMERCE APPLICATION",
  description:
    "Full-featured e-commerce platform built with Next.js and MongoDB.",
  image: "/project1.jpeg",
  imageAlt: "MK Store e-commerce project screenshot",
  liveUrl: "https://e-commernce-mk-store.vercel.app",
  codeUrl: "https://github.com/malaika-Rizwan/e-commernce-mk-store",
  techStack: [
    "Next.js",
    "MongoDB",
    "JWT",
    "Admin dashboard",
    "Wishlist",
    "Protected routes",
  ],
  features: [
    "JWT authentication",
    "Admin dashboard",
    "Wishlist",
    "Protected routes",
  ],
};

const project2 = {
  category: "JOB PORTAL",
  title: "Job Portal",
  description:
    "Job portal where users can register, login, find jobs, find talent, and manage job history.",
  frontendOnlyNote: "Frontend only — backend is in progress.",
  image: "/project2.jpeg",
  imageAlt: "Job Portal project screenshot",
  liveUrl: "https://job-portal-puce-five.vercel.app",
  codeUrl: "https://github.com/malaika-Rizwan/Job_Portal",
  techStack: [
    "User auth",
    "Find jobs",
    "Find talent",
    "Job hunters",
    "Job history",
  ],
  features: [
    "User register & login",
    "Find jobs",
    "Find talent",
    "Job hunters",
    "Job history",
  ],
};

const projects = [project1, project2];

export default function ProjectsSection() {
  return (
    <SectionCard id="projects" className="relative overflow-hidden">
      {/* Purple crystals background - dark purple, clearer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-[8%] right-[15%] w-14 h-18 opacity-35" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", background: "#2d1b4e" }} />
        <div className="absolute bottom-[20%] left-[10%] w-10 h-14 opacity-30" style={{ clipPath: "polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)", background: "#2d1b4e" }} />
        <div className="absolute top-[35%] left-[5%] w-8 h-12 opacity-25" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", background: "#2d1b4e" }} />
        <div className="absolute bottom-[12%] right-[12%] w-12 h-16 opacity-30" style={{ clipPath: "polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%)", background: "#2d1b4e" }} />
      </div>

      <SectionHeading
        id="projects"
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 block"
      >
        Featured Projects
      </SectionHeading>

      {/* Intro - scroll reveals projects below naturally */}
      <section className="text-center px-4 py-8 md:py-12 mb-12 md:mb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 transition-colors duration-300 hover:text-orange-400">
            Portfolio & Previous Projects
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            I&apos;ve built a variety of projects tailored to different aspects
            of each client&apos;s business. If you&apos;d like to see more
            examples beyond what&apos;s showcased here, feel free to get in
            touch — I&apos;d be happy to share. For more details, visit my{" "}
            <a
              href="https://www.linkedin.com/in/malaika-rizwan-a47b3a3ab?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 font-medium underline underline-offset-2 transition-colors"
            >
              LinkedIn
            </a>
            .
          </p>
          <p className="text-gray-400 text-sm">
            Scroll down to view each project.
          </p>
        </div>
      </section>

      {projects.map((project, index) => (
        <motion.section
          key={project.title}
          id={index === 0 ? "project-first" : undefined}
          className={`px-4 py-8 md:py-12 ${index > 0 ? "border-t border-white/10" : ""}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className={`w-full max-w-6xl mx-auto grid grid-cols-1 gap-8 lg:gap-12 items-center ${project.title === "Job Portal" ? "lg:grid-cols-5" : "lg:grid-cols-2"}`}>
            {/* Left: Project info */}
            <div className={`order-2 flex flex-col justify-center ${project.title === "Job Portal" ? "lg:order-1 lg:col-span-2" : "lg:order-1"}`}>
              {project.category !== "JOB PORTAL" && (
                <p className="text-white text-xs uppercase tracking-widest mb-2">
                  {project.category}
                </p>
              )}
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {project.title}
              </h3>
              {"frontendOnlyNote" in project && project.frontendOnlyNote && (
                <p className="text-amber-400/90 text-sm font-medium mb-3">
                  {project.frontendOnlyNote}
                </p>
              )}
              <p className="text-gray-400 text-base mb-6">
                {project.description}
              </p>

              <p className="text-white font-semibold text-sm mb-2">
                Built with:
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-secondary/60 text-white text-xs font-medium border border-accent/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-white font-semibold text-sm mb-2">
                Key features:
              </p>
              <ul className="space-y-2 mb-8">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-white text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <StarBorder
                  as="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="magenta"
                  speed="5s"
                  className="[&_.inner-content]:!bg-accent [&_.inner-content]:hover:!bg-accent-light [&_.inner-content]:!text-sm [&_.inner-content]:!py-2.5 [&_.inner-content]:!px-5"
                  aria-label={`Live demo of ${project.title}`}
                >
                  Live Demo
                </StarBorder>
                <StarBorder
                  as="a"
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="magenta"
                  speed="5s"
                  className="[&_.inner-content]:!bg-transparent [&_.inner-content]:!border-accent/50 [&_.inner-content]:!text-white [&_.inner-content]:hover:!bg-accent/20 [&_.inner-content]:!text-sm [&_.inner-content]:!py-2.5 [&_.inner-content]:!px-5"
                  aria-label={`View ${project.title} source code`}
                >
                  GitHub
                </StarBorder>
              </div>
            </div>

            {/* Right: Project screenshot */}
            <div className={`order-1 relative aspect-video rounded-2xl overflow-hidden border border-secondary/50 bg-secondary/40 shadow-soft hover:shadow-soft-hover transition-shadow duration-300 ${project.title === "Job Portal" ? "lg:order-2 lg:col-span-3 lg:min-h-[380px]" : "lg:order-2 lg:aspect-auto lg:min-h-[340px]"}`}>
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                className="object-cover object-center"
                sizes={project.title === "Job Portal" ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 50vw"}
              />
            </div>
          </div>
        </motion.section>
      ))}
    </SectionCard>
  );
}
