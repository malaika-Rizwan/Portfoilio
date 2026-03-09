"use client";

import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import { ActiveHeadingProvider } from "@/components/ActiveHeadingContext";

export default function Home() {
  return (
    <ActiveHeadingProvider>
      <div className="pt-20">
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </ActiveHeadingProvider>
  );
}
