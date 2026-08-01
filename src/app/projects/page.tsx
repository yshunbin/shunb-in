"use client";

import Link from "next/link";
import { ProjectCard } from "../page";

export default function Projects() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 md:p-16 font-sans">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <header className="text-center space-y-4">
          <div className="flex justify-start">
            <Link href="/" className="text-xs font-mono text-slate-500 hover:text-emerald-400 transition flex items-center gap-1">
              <span>← Back to Home</span>
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Projects</h1>
          <p className="text-lg text-emerald-400 font-mono mt-2">Explore my technical projects</p>
        </header>
        <section>
          <ProjectCard />
        </section>
      </div>
    </main>
  );
}
