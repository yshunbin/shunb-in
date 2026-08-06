"use client";

import Link from "next/link";
import { FypImagePredictionCard, LeetCodeProjectCard, ProjectCard } from "../page";

export default function Projects() {
  return (
    <main className="min-h-screen text-ink p-4 md:p-8 lg:p-12">
      <div className="diary-page max-w-6xl mx-auto px-8 md:px-16 py-10 md:py-14 space-y-8">
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent transition pl-3 md:pl-4"
        >
          <span>← Home</span>
        </Link>
        <header className="pl-3 md:pl-4 space-y-3">
          <h1 className="diary-title text-5xl md:text-6xl">Projects</h1>
          <p className="text-ink-soft text-lg max-w-xl">
            A few things I’ve built and shipped.
          </p>
        </header>
        <section className="pl-3 md:pl-4 space-y-4">
          <FypImagePredictionCard />
          <ProjectCard />
          <LeetCodeProjectCard />
        </section>
      </div>
    </main>
  );
}
