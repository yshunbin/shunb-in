"use client";

import { useState } from "react";
import LoadingGame from "./loading-game";
import Link from "next/link";
import { Zap, ExternalLink } from "lucide-react";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("sourdough_played") === "true";
    }
    return true;
  });

  const handleComplete = () => {
    sessionStorage.setItem("sourdough_played", "true");
    setHasEntered(true);
  };

  return (
    <>
      {/* Minigame overlay (shows until 5 sourdoughs are caught) */}
      {!hasEntered && (
        <LoadingGame onComplete={handleComplete} />
      )}

      {/* Main Portfolio Webpage */}
      <main className="min-h-screen bg-background text-stone-800 flex flex-col justify-between p-6 md:p-16 font-sans">
        <div className="max-w-4xl mx-auto w-full space-y-12">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-stone-900">Shun Bin Yeoh</h1>
              <p className="text-lg text-emerald-700 font-mono">Software Engineer | Java & Distributed Systems</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-white font-bold px-4 py-2 rounded transition text-sm border border-stone-700"
              >
                <span>Projects</span>
                <Zap className="w-4 h-4 text-emerald-400" />
              </Link>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded transition text-sm"
              >
                <span>Download Resume (PDF)</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </a>
            </div>
          </header>

          {/* Core Technical Skills */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-stone-500 uppercase font-mono">Core Competencies</h2>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {["Java 17", "Spring Boot", "PostgreSQL", "Docker", "Git", "Python", "SQL", "Bash", "SQLite", "PowerShell", "Dataiku"].map((skill) => (
                <span key={skill} className="bg-surface border border-border text-stone-700 px-3 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Featured Technical Projects */}
          <section className="space-y-4">
            <h2 className="text-xs font-semibold tracking-wider text-stone-500 uppercase font-mono">Featured Technical Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-lg bg-surface border border-border hover:border-stone-400 transition space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-stone-900">Task Tracking Web Engine</h3>
                  <span className="text-[10px] font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-border">
                    Personal Project
                  </span>
                </div>
                <p className="text-xs text-stone-600">
                  Full-stack task manager built with full CRUD execution, database persistence, and containerized deployments[cite: 1].
                </p>
                <div className="text-[11px] font-mono text-stone-500 pt-1">
                  Java • Spring • PostgreSQL • React • Docker[cite: 1]
                </div>
              </div>

              <div className="p-5 rounded-lg bg-surface border border-border hover:border-stone-400 transition space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-stone-900">Nozzie Mozzie App</h3>
                  <span className="text-[10px] font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-border">
                    Academic Project
                  </span>
                </div>
                <p className="text-xs text-stone-600">
                  Android mobile app with clickable data visualisations mapping dengue clusters in Singapore via Google Maps SDK & NEA API[cite: 1].
                </p>
                <div className="text-[11px] font-mono text-stone-500 pt-1">
                  Java • Android Studio • Postman • GeoJSON[cite: 1]
                </div>
              </div>

            </div>
          </section>

          {/* Work Experience Timeline */}
          <section className="space-y-6">
            <h2 className="text-xs font-semibold tracking-wider text-stone-500 uppercase font-mono">Work Experience</h2>
            
            <div className="space-y-6 border-l-2 border-border pl-4 md:pl-6">
              
              {/* DSTA */}
              <div className="space-y-1 relative">
                <div className="absolute -left-[21px] md:-left-[29px] top-1.5 w-2.5 h-2.5 bg-emerald-600 rounded-full"></div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-stone-900">Defence Science and Technology Agency</h3>
                  <span className="text-xs font-mono text-stone-500">Jan 2026 – Present</span>
                </div>
                <p className="text-xs text-emerald-700 font-mono">Software Engineer</p>
                <ul className="list-disc list-inside text-xs text-stone-700 space-y-1 pt-1 leading-relaxed">
                  <li>Developed server monitoring tools using Java 17, Spring Boot, and SQLite, leveraging PowerShell probes to automate software asset changes[cite: 1].</li>
                  <li>Trained AI agents and Dataiku dashboards to analyze complex data trends and automate policy comparisons for compliance stakeholders.</li>
                </ul>
              </div>

              {/* HPE */}
              <div className="space-y-1 relative">
                <div className="absolute -left-[21px] md:-left-[29px] top-1.5 w-2.5 h-2.5 bg-stone-400 rounded-full"></div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-stone-900">Hewlett Packard Enterprise</h3>
                  <span className="text-xs font-mono text-stone-500">Jul 2023 – Jan 2025</span>
                </div>
                <p className="text-xs text-stone-500 font-mono">Software Engineer / Intern</p>
                <ul className="list-disc list-inside text-xs text-stone-700 space-y-1 pt-1 leading-relaxed">
                  <li>Developed real-time network automation scripts for Aruba (AOS-CX) utilizing SNMP, CLI, and API calls.</li>
                  <li>Automated unit testing frameworks in pre-prod environments to evaluate network performance and minimize operational support tasks.</li>
                </ul>
              </div>

              {/* Acronis */}
              <div className="space-y-1 relative">
                <div className="absolute -left-[21px] md:-left-[29px] top-1.5 w-2.5 h-2.5 bg-stone-400 rounded-full"></div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-stone-900">Acronis</h3>
                  <span className="text-xs font-mono text-stone-500">Jun 2022 – Dec 2022</span>
                </div>
                <p className="text-xs text-stone-500 font-mono">Software Engineer Intern</p>
                <ul className="list-disc list-inside text-xs text-stone-700 space-y-1 pt-1 leading-relaxed">
                  <li>Implemented ELK stack pipeline to index and search backup metadata across large-scale databases[cite: 1].</li>
                  <li>Deployed hardware-encrypted GCP infrastructure with Docker containers in confidential computing KVM environments[cite: 1].</li>
                </ul>
              </div>

              {/* Pixium & Hubble */}
              <div className="space-y-1 relative">
                <div className="absolute -left-[21px] md:-left-[29px] top-1.5 w-2.5 h-2.5 bg-stone-400 rounded-full"></div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-stone-900">Pixium Digital & Hubble</h3>
                  <span className="text-xs font-mono text-stone-500">Aug 2021 – May 2022</span>
                </div>
                <p className="text-xs text-stone-500 font-mono">Software Engineer Internships</p>
                <p className="text-xs text-stone-700 leading-relaxed pt-1">
                  Migrated monolithic backend data systems to Ruby on Rails microservices on K8s[cite: 1], and built full-stack web application tools with PostgreSQL and AWS cloud infrastructure[cite: 1].
                </p>
              </div>

            </div>
          </section>

          {/* Education */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-stone-500 uppercase font-mono">Education</h2>
            <div className="p-4 rounded-lg bg-surface border border-border flex justify-between items-center">
              <div>
                <h3 className="font-bold text-stone-900 text-sm">Nanyang Technological University</h3>
                <p className="text-xs text-stone-600">Bachelor of Computer Science (Elective Focus in AI & Machine Learning)</p>
              </div>
              <span className="text-xs font-mono text-stone-500">2019 – 2023</span>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-border flex justify-between items-center text-stone-500 text-xs font-mono">
            <div className="flex gap-6">
              <a href="https://github.com/yshunbin" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition">GitHub</a>
              <a href="https://www.linkedin.com/in/yshunbin/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition">LinkedIn</a>
            </div>
            <span>yshunbin@gmail.com</span>
          </footer>

        </div>
      </main>
    </>
  );
}

export function ProjectCard() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 hover:border-stone-400 transition">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-emerald-600/10 border border-emerald-600/20 rounded-xl text-emerald-700">
          <Zap className="w-6 h-6" />
        </div>
        <Link
          href="/projects/discipher"
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-background px-3 py-1.5 rounded-lg border border-border"
        >
          <span>Try App</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <Link href="/projects/discipher">
        <h3 className="text-xl font-bold text-stone-900 mb-2 hover:text-emerald-700 transition">DISCipher</h3>
      </Link>
      <p className="text-sm text-stone-600 mb-4 leading-relaxed">
        A mobile-friendly outreach assistant for financial planning agents. Uses the DISC behavioral model and local Singapore context to generate high-conversion appointment hooks with instant 1-click WhatsApp linking and dynamic QR codes.
      </p>

      <div className="flex flex-wrap gap-2 text-xs font-mono text-stone-600">
        <span className="bg-background px-2.5 py-1 rounded-md border border-border">Next.js</span>
        <span className="bg-background px-2.5 py-1 rounded-md border border-border">Tailwind CSS</span>
        <span className="bg-background px-2.5 py-1 rounded-md border border-border">WhatsApp Web API</span>
        <span className="bg-background px-2.5 py-1 rounded-md border border-border">DISC Framework</span>
      </div>
    </div>
  );
}
