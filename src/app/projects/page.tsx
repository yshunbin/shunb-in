"use client";

import Link from "next/link";
import { ProjectCard } from "../page";

export default function Projects() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-emerald-400 transition">
          <span>← Back to Home</span>
        </Link>
        <header className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Projects</h1>
          <p className="text-slate-400 text-sm mt-1">Explore my technical projects</p>
        </header>
        <section>
          <ProjectCard />
        </section>
      </div>
    </main>
  );
}
