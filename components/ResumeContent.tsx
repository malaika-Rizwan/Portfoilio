"use client";

import { forwardRef } from "react";

const SKILLS = [
  { name: "HTML/CSS", level: 5 },
  { name: "JavaScript", level: 5 },
  { name: "React", level: 5 },
  { name: "Next.js", level: 5 },
  { name: "MongoDB", level: 4 },
  { name: "Git", level: 5 },
  { name: "RESTful APIs", level: 4 },
  { name: "Express.js", level: 4 },
  { name: "Node.js", level: 4 },
  { name: "Problem Solving", level: 5 },
  { name: "SQL", level: 4 },
  { name: "Docker", level: 3 },
  { name: "TypeScript", level: 4 },
  { name: "Bootstrap", level: 5 },
];

const LANGUAGES = [
  { name: "English", level: 5 },
  { name: "Urdu", level: 5 },
  { name: "Pashto", level: 5 },
];

function Dots({ level }: { level: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`inline-block w-2 h-2 rounded-full ${i <= level ? "bg-gray-900" : "bg-gray-300"}`}
        />
      ))}
    </span>
  );
}

/**
 * Resume content matching the provided layout.
 * Left: header, personal details, skills (with dots), languages.
 * Right: education, projects. Used for display and PDF download.
 */
const ResumeContent = forwardRef<HTMLDivElement, object>(function ResumeContent(_, ref) {
  return (
    <div
      ref={ref}
      className="resume-pdf-target bg-white text-gray-900 w-full max-w-[900px] mx-auto shadow-lg"
      style={{ minHeight: "297mm" }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[280px] flex-shrink-0 bg-gray-700 text-white">
          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold">Malaika Rizwan</h1>
            <p className="text-sm mt-1 opacity-90">Full stack developer</p>
          </div>
          <div className="px-6 pb-6 pt-2 bg-white text-gray-900">
            <h2 className="text-lg font-bold mb-4">Personal details</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-gray-500">👤</span>
                Malaika Rizwan
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">✉</span>
                malaikarizwan121@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">📞</span>
                +923348351721
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">🏠</span>
                Nowshera, KPK, Pakistan
              </li>
            </ul>
            <h2 className="text-lg font-bold mt-8 mb-4">Skills</h2>
            <ul className="space-y-2 text-sm">
              {SKILLS.map((s) => (
                <li key={s.name} className="flex items-center justify-between gap-2">
                  <span>{s.name}</span>
                  <Dots level={s.level} />
                </li>
              ))}
            </ul>
            <h2 className="text-lg font-bold mt-8 mb-4">Languages</h2>
            <ul className="space-y-2 text-sm">
              {LANGUAGES.map((lang) => (
                <li key={lang.name} className="flex items-center justify-between gap-2">
                  <span>{lang.name}</span>
                  <Dots level={lang.level} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1 p-6 md:p-8">
          <h2 className="text-lg font-bold mb-4">Education</h2>
          <div className="mb-6">
            <p className="font-semibold text-gray-900">
              BS Computer Science
              <span className="float-right text-sm font-normal text-gray-600">
                Mar 2024 - Mar 2028
              </span>
            </p>
            <p className="text-gray-700 text-sm">Northern University, Nowshera</p>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              Hi, I&apos;m Malaika Rizwan, a passionate Full Stack Web Developer. I enjoy building
              modern, responsive, and scalable web applications using JavaScript, React, Next.js,
              Node.js, Express.js, and MongoDB. I focus on real-world projects that demonstrate both
              frontend and backend development.
            </p>
          </div>
          <h2 className="text-lg font-bold mb-4">Projects</h2>
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900">E-Commerce Web Application</h3>
            <p className="text-sm text-gray-700 mt-1">
              A full stack online shopping platform where users can browse products, add to cart, and
              place orders.
            </p>
            <p className="text-xs font-semibold text-gray-800 mt-2">Key Features:</p>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-0.5">
              <li>Product listing and details, cart, user auth, secure APIs, MongoDB, responsive UI</li>
            </ul>
            <p className="text-xs font-semibold text-gray-800 mt-2">Tech Stack:</p>
            <ul className="text-sm text-gray-700 list-disc list-inside">
              <li>Next.js, Node.js, Express.js, MongoDB Atlas, Tailwind CSS</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Job Portal Web Application</h3>
            <p className="text-sm text-gray-700 mt-1">
              A full stack job portal where companies post jobs and job seekers explore opportunities.
            </p>
            <p className="text-xs font-semibold text-gray-800 mt-2">Key Features:</p>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-0.5">
              <li>Job posting, search, listings, auth, company-candidate interaction, backend API</li>
            </ul>
            <p className="text-xs font-semibold text-gray-800 mt-2">Tech Stack:</p>
            <ul className="text-sm text-gray-700 list-disc list-inside">
              <li>React/Next.js, Node.js, Express.js, MongoDB, REST APIs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResumeContent;
