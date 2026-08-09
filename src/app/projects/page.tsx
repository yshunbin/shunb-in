"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

type Project = {
  id: string;
  label: string;
  title: string;
  dateLabel: string;
  sortKey: string; // YYYY-MM for sorting
  href: string;
  external?: boolean;
  actionLabel?: string;
  description: string;
  tags: string[];
  preview: ReactNode;
};

function TaskTrackerPreview() {
  return (
    <div className="h-full min-h-[160px] rounded-xl bg-chip border border-border p-4 flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-ink-soft uppercase tracking-wider">
          My lists
        </span>
        <span className="text-[10px] text-accent font-semibold">+ New</span>
      </div>
      {["Ship portfolio updates", "Review Aruba scripts", "Prep FDE cases"].map((task, i) => (
        <div
          key={task}
          className="flex items-center gap-2 rounded-lg bg-surface border border-border px-2.5 py-2"
        >
          <span
            className={`w-3.5 h-3.5 rounded border shrink-0 ${
              i === 0 ? "bg-accent border-accent" : "border-border bg-white"
            }`}
          />
          <span className={`text-xs truncate ${i === 0 ? "text-ink-soft line-through" : "text-ink"}`}>
            {task}
          </span>
        </div>
      ))}
    </div>
  );
}

function DiscipherPreview() {
  return (
    <div className="h-full min-h-[160px] rounded-xl bg-chip border border-border p-4 flex flex-col gap-2">
      <div className="text-[11px] font-semibold text-ink-soft uppercase tracking-wider">
        Outreach draft
      </div>
      <div className="rounded-2xl rounded-bl-md bg-accent text-white text-xs leading-relaxed px-3 py-2.5 max-w-[95%] self-end">
        Hi Sarah — based on your DISC profile, a short planning chat this week could unlock clarity
        on cashflow.
      </div>
      <div className="rounded-xl bg-white border border-border px-3 py-2 text-[11px] text-ink-soft flex items-center justify-between">
        <span>WhatsApp · QR ready</span>
        <span className="text-accent font-semibold">Send</span>
      </div>
    </div>
  );
}

function FypPreview() {
  return (
    <div className="h-full min-h-[160px] rounded-xl bg-chip border border-border p-3 grid grid-cols-3 gap-2">
      {[
        { label: "Original", fill: "from-sky-200 to-emerald-100" },
        { label: "Masked", fill: "from-stone-200 to-stone-300", hole: true },
        { label: "Restored", fill: "from-sky-200 to-emerald-100" },
      ].map((panel) => (
        <div key={panel.label} className="flex flex-col gap-1.5 min-w-0">
          <span className="text-[10px] text-ink-soft font-medium truncate">{panel.label}</span>
          <div
            className={`relative flex-1 min-h-[100px] rounded-lg bg-gradient-to-br ${panel.fill} border border-border overflow-hidden`}
          >
            {panel.hole ? (
              <div className="absolute inset-[28%] bg-ink/90 rounded-sm" />
            ) : (
              <div className="absolute inset-[28%] rounded-sm border border-white/50 bg-white/20" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function NozzieMozziePreview() {
  return (
    <div className="h-full min-h-[160px] rounded-xl bg-chip border border-border p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-semibold text-ink-soft uppercase tracking-wider">
          Dengue clusters
        </span>
        <span className="text-[10px] text-red-600 font-semibold">12 active</span>
      </div>
      <div className="relative flex-1 min-h-[120px] rounded-lg bg-gradient-to-br from-emerald-50 to-sky-100 border border-border overflow-hidden">
        {/* map grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* street-ish lines */}
        <div className="absolute left-[18%] top-0 bottom-0 w-px bg-slate-300/70" />
        <div className="absolute left-0 right-0 top-[42%] h-px bg-slate-300/70" />
        <div className="absolute left-[62%] top-0 bottom-0 w-px bg-slate-300/60" />
        {/* dengue polygons */}
        <div className="absolute left-[12%] top-[18%] w-[28%] h-[32%] rounded-lg bg-red-500/35 border border-red-500/50 rotate-[-8deg]" />
        <div className="absolute right-[14%] top-[28%] w-[34%] h-[26%] rounded-md bg-orange-400/40 border border-orange-500/45 rotate-[6deg]" />
        <div className="absolute left-[38%] bottom-[14%] w-[24%] h-[22%] rounded-lg bg-red-600/30 border border-red-600/40 rotate-[3deg]" />
        <div className="absolute left-[22%] top-[48%] w-2 h-2 rounded-full bg-red-600 shadow-sm" />
        <div className="absolute right-[28%] top-[36%] w-2 h-2 rounded-full bg-orange-500 shadow-sm" />
      </div>
    </div>
  );
}

function BluejayGaslessPreview() {
  return (
    <div className="h-full min-h-[160px] rounded-xl bg-chip border border-border p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-ink-soft uppercase tracking-wider">
          CRT transfer
        </span>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
          Relayed
        </span>
      </div>
      <div className="rounded-lg bg-white border border-border px-3 py-2 space-y-0.5">
        <p className="text-[10px] text-ink-soft">Recipient</p>
        <p className="text-xs font-mono truncate">0xA1b2…9fC4</p>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-[10px] text-ink-soft">Amount</p>
          <p className="text-xl font-semibold tracking-tight">12 CRT</p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-[10px] text-ink-soft line-through">Gas ~0.004 ETH</p>
          <p className="text-xs font-semibold text-accent">Relayer pays</p>
        </div>
      </div>
      <div className="mt-auto h-8 rounded-full bg-accent/90 text-white text-[11px] font-semibold flex items-center justify-center">
        Sign &amp; send
      </div>
    </div>
  );
}

const PROJECTS: Project[] = [
  {
    id: "discipher",
    label: "AI Tool",
    title: "DISCipher",
    dateLabel: "Jul 2026",
    sortKey: "2026-07",
    href: "/projects/discipher",
    description:
      "A mobile-friendly outreach assistant for financial planning agents. Uses the DISC behavioral model and local Singapore context to generate high-conversion appointment hooks with instant WhatsApp linking and dynamic QR codes.",
    tags: ["Next.js", "Tailwind CSS", "WhatsApp Web API", "DISC Framework", "Gemini"],
    preview: <DiscipherPreview />,
  },
  {
    id: "task-tracker",
    label: "Full-stack",
    title: "Task Tracker",
    dateLabel: "Jul 2025",
    sortKey: "2025-07",
    href: "https://github.com/yshunbin/task-tracker",
    external: true,
    description:
      "Full-stack task manager with CRUD for lists and tasks — Java Spring Boot and PostgreSQL on the backend, React and TypeScript on the frontend, run via Docker Compose.",
    tags: ["Java", "Spring", "PostgreSQL", "React", "TypeScript", "Docker"],
    preview: <TaskTrackerPreview />,
  },
  {
    id: "fyp",
    label: "FYP",
    title: "Self-supervised Image Prediction",
    dateLabel: "May 2023",
    sortKey: "2023-05",
    href: "/projects/fyp-image-prediction",
    description:
      "NTU final-year project: a self-supervised autoencoder that restores randomly missing image patches from context. Try it live — upload an image, mask a patch, and see reconstruction accuracy.",
    tags: ["Self-supervised", "Autoencoder", "Inpainting", "TensorFlow"],
    preview: <FypPreview />,
  },
  {
    id: "bluejay-gasless-token",
    label: "Blockchain",
    title: "Bluejay Gasless Token",
    dateLabel: "Nov 2021",
    sortKey: "2021-11",
    href: "/projects/bluejay-gasless-token",
    description:
      "CZ4153 Ethereum dApp for fee-free ChickenRiceToken (ERC-20) transfers via a gas relayer, with a course paper on the security trade-offs of meta-transactions.",
    tags: ["Ethereum", "Solidity", "ERC-20", "Meta-tx", "React"],
    preview: <BluejayGaslessPreview />,
  },
  {
    id: "nozziemozzie",
    label: "Android",
    title: "NozzieMozzie",
    dateLabel: "Apr 2021",
    sortKey: "2021-04",
    href: "/projects/nozziemozzie",
    description:
      "Android app that visualises dengue clusters as interactive map polygons so residents and health officials can spot high-risk areas at a glance.",
    tags: ["Java", "Android Studio", "Postman", "GeoJSON"],
    preview: <NozzieMozziePreview />,
  },
].sort((a, b) => b.sortKey.localeCompare(a.sortKey));

function ProjectRow({ project }: { project: Project }) {
  const title = project.external ? (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="diary-title text-3xl hover:text-accent transition block"
    >
      {project.title}
    </a>
  ) : (
    <Link
      href={project.href}
      transitionTypes={["nav-forward"]}
      className="diary-title text-3xl hover:text-accent transition block"
    >
      {project.title}
    </Link>
  );

  const action = project.external ? (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="diary-btn-soft text-xs flex items-center gap-1 px-3 py-1.5 shrink-0"
    >
      <span>{project.actionLabel ?? "GitHub"}</span>
      <ExternalLink className="w-3.5 h-3.5" />
    </a>
  ) : (
    <Link
      href={project.href}
      transitionTypes={["nav-forward"]}
      className="diary-btn-soft text-xs flex items-center gap-1 px-3 py-1.5 shrink-0"
    >
      <span>View</span>
      <ExternalLink className="w-3.5 h-3.5" />
    </Link>
  );

  return (
    <article className="diary-card p-5 md:p-6">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <p className="diary-label">{project.label}</p>
            <span className="text-sm text-ink-soft whitespace-nowrap shrink-0 pt-0.5">
              {project.dateLabel}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            {title}
            {action}
          </div>

          <p className="text-base text-ink-soft leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2 text-sm">
            {project.tags.map((tag) => (
              <span key={tag} className="diary-chip px-3 py-1 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:w-[280px] xl:w-[320px] shrink-0">{project.preview}</div>
      </div>
    </article>
  );
}

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
          <p className="text-ink-soft text-lg">
            A few things I’ve built and explored — newest first.
          </p>
        </header>
        <section className="pl-3 md:pl-4 space-y-4">
          {PROJECTS.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </section>
      </div>
    </main>
  );
}
