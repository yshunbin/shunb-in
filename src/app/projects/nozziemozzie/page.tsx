"use client";

import Link from "next/link";
import { ExternalLink, Map, ShieldCheck, Bug, FileWarning } from "lucide-react";

const DEMO_VIDEO_ID = "1SnBLVU-tOiL-Psnu8MO2edOSX9zCRRK4";
const GITHUB_URL = "https://github.com/yshunbin/nozziemozzie";
const DEMO_DRIVE_URL = `https://drive.google.com/file/d/${DEMO_VIDEO_ID}/view`;

const FLOW = [
  {
    icon: ShieldCheck,
    title: "Sign in",
    body: "Firebase Auth handles register, login, and password reset so each user gets a personal profile.",
  },
  {
    icon: Map,
    title: "See dengue clusters",
    body: "The map pulls NEA-style cluster data and draws colour-coded polygons over high-risk areas. Search a place or use GPS to see what’s near you.",
  },
  {
    icon: Bug,
    title: "Mozzie & symptom checks",
    body: "Walk through prevention checklists and a symptom screener so households know what to look out for.",
  },
  {
    icon: FileWarning,
    title: "Report & notify",
    body: "File a breeding-site report and get reminders — designed for residents and officers who need a quick signal, not a dense dashboard.",
  },
];

export default function NozzieMozziePage() {
  return (
    <main className="min-h-screen text-ink p-4 md:p-8 lg:p-12">
      <div className="diary-page max-w-6xl mx-auto px-8 md:px-16 py-10 md:py-14 space-y-10">
        <Link
          href="/projects"
          transitionTypes={["nav-back"]}
          className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent transition pl-3 md:pl-4"
        >
          <span>← Projects</span>
        </Link>

        <header className="pl-3 md:pl-4 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-3">
              <p className="diary-label">Android · Apr 2021</p>
              <h1 className="diary-title text-5xl md:text-6xl">NozzieMozzie</h1>
              <p className="text-ink-soft text-lg max-w-2xl leading-relaxed">
                An Android app that maps Singapore dengue clusters as interactive polygons so
                residents can spot risk at a glance — plus prevention checklists, symptom checks,
                and reporting.
              </p>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="diary-btn-soft text-sm inline-flex items-center gap-1.5 px-4 py-2 shrink-0"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            {["Java", "Android Studio", "Firebase", "Google Maps", "GeoJSON", "Volley"].map(
              (tag) => (
                <span key={tag} className="diary-chip px-3 py-1 font-medium">
                  {tag}
                </span>
              ),
            )}
          </div>
        </header>

        <section className="pl-3 md:pl-4 space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="diary-label">Demo video</h2>
            <a
              href={DEMO_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:text-accent-deep inline-flex items-center gap-1"
            >
              Open in Drive
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="diary-card overflow-hidden rounded-xl border border-border bg-chip">
            <div className="relative w-full aspect-video">
              <iframe
                title="NozzieMozzie demo video"
                src={`https://drive.google.com/file/d/${DEMO_VIDEO_ID}/preview`}
                className="absolute inset-0 h-full w-full border-0"
                allow="autoplay"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section className="pl-3 md:pl-4 space-y-4">
          <h2 className="diary-label">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FLOW.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="diary-card p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="diary-pill text-[11px] px-2.5 py-1 shrink-0">
                      {index + 1}
                    </span>
                    <Icon className="w-4 h-4 text-accent shrink-0" />
                    <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed">{step.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="pl-3 md:pl-4 space-y-4">
          <h2 className="diary-label">Under the hood</h2>
          <article className="diary-card p-6 space-y-3">
            <p className="text-base text-ink-soft leading-relaxed">
              Cluster locations come from a public dengue feed, parsed into lat/lng rings and drawn
              with the Google Maps Android SDK. Places autocomplete and GPS help centre the map on
              where you are. Auth and profile flows sit on Firebase; optional PHP stubs under{" "}
              <code className="text-sm bg-chip px-1.5 py-0.5 rounded">Database Details</code> show
              how a local XAMPP backend could plug in later.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="diary-btn text-sm inline-flex items-center gap-1.5 px-4 py-2"
              >
                View source on GitHub
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={DEMO_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="diary-btn-soft text-sm inline-flex items-center gap-1.5 px-4 py-2"
              >
                Full demo on Drive
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
