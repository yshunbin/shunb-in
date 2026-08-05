"use client";

import Link from "next/link";
import { ProjectCard } from "../page";

export default function Projects() {
  return (
    <main className="min-h-screen bg-background text-stone-800 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-stone-500 hover:text-emerald-700 transition">
          <span>← Back to Home</span>
        </Link>
        <header className="border-b border-border pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900">Projects</h1>
          <p className="text-stone-600 text-sm mt-1">Explore my technical projects</p>
        </header>
        <section>
          <ProjectCard />
        </section>
      </div>
    </main>
  );
}
