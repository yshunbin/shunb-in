"use client";

import { useEffect, useState } from "react";
import LoadingGame from "./loading-game";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("sourdough_played") !== "true") {
      setHasEntered(false);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("sourdough_played", "true");
    setHasEntered(true);
  };

  return (
    <>
      {!hasEntered && <LoadingGame onComplete={handleComplete} />}

      <main className="min-h-screen text-ink p-4 md:p-8 lg:p-12">
        <div className="diary-page max-w-6xl mx-auto w-full px-8 md:px-16 py-10 md:py-16 space-y-14">
          <header className="pl-3 md:pl-4 space-y-8">
            <div className="space-y-5">
              <p className="text-sm text-ink-soft">hello · welcome to my portfolio</p>
              <h1 className="diary-title text-5xl md:text-7xl">Shun Bin Yeoh</h1>
              <div className="flex flex-wrap gap-2">
                <span className="diary-pill px-3.5 py-1.5 text-sm">Software Engineer</span>
                <span className="diary-pill px-3.5 py-1.5 text-sm">Java</span>
                <span className="diary-pill px-3.5 py-1.5 text-sm">Distributed Systems</span>
              </div>
              <p className="text-lg md:text-xl text-ink-soft max-w-2xl leading-relaxed text-pretty">
                I build reliable backend systems — from monitoring tools and automation to
                cloud infrastructure — with a focus on clarity, scale, and craft.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                transitionTypes={["nav-forward"]}
                className="diary-btn inline-flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <span>Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="diary-btn-soft inline-flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <span>Download Resume</span>
              </a>
              <Link
                href="/hobbies"
                transitionTypes={["nav-forward"]}
                className="diary-btn-soft inline-flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <span>Hobbies</span>
              </Link>
              <a
                href="mailto:yshunbin@gmail.com"
                className="diary-btn-soft inline-flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <span>Contact</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md pt-2">
              <div>
                <p className="text-2xl md:text-3xl font-semibold tracking-tight text-ink">4+</p>
                <p className="text-xs text-ink-soft mt-1">Years building</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-semibold tracking-tight text-ink">6+</p>
                <p className="text-xs text-ink-soft mt-1">Roles & teams</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-semibold tracking-tight text-ink">∞</p>
                <p className="text-xs text-ink-soft mt-1">Ever learning</p>
              </div>
            </div>
          </header>

          <section className="space-y-4 pl-3 md:pl-4">
            <h2 className="diary-label">Skills</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {[
                "Java",
                "Python",
                "SQL",
                "Bash",
                "Docker",
                "Git",
                "Spring Boot",
                "React",
                "TypeScript",
                "PostgreSQL",
                "SQLite",
                "PowerShell",
                "Dataiku",
              ].map((skill) => (
                <span key={skill} className="diary-chip px-3.5 py-1.5 text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="space-y-4 pl-3 md:pl-4">
            <h2 className="diary-label">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <article className="diary-card p-6 space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    Task Tracking Web Application
                  </h3>
                  <span className="diary-pill shrink-0 text-[11px] px-2.5 py-1">May – Jun 2025</span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed text-pretty">
                  Task tracker with CRUD, PostgreSQL, React UI, and Docker deploys.
                </p>
                <p className="text-xs text-accent font-medium pt-1">
                  Java · Spring · PostgreSQL · Node.js · Docker
                </p>
              </article>

              <article className="diary-card p-6 space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <h3 className="text-lg font-semibold tracking-tight">NozzieMozzie</h3>
                  <span className="diary-pill shrink-0 text-[11px] px-2.5 py-1">Jan – Apr 2021</span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed text-pretty">
                  Android app mapping Singapore dengue clusters as interactive polygons with Google
                  Maps SDK and the NEA GeoJSON API.
                </p>
                <p className="text-xs text-accent font-medium pt-1">
                  Java · Android Studio · Postman · GeoJSON
                </p>
              </article>
            </div>
          </section>

          <section className="space-y-6 pl-3 md:pl-4">
            <h2 className="diary-label">Experience</h2>
            <div className="space-y-8">
              {[
                {
                  company: "Defence Science and Technology Agency",
                  active: true,
                  roles: [
                    {
                      title: "Software Engineer",
                      dates: "Jan 2026 – Present",
                      points: [
                        "Streamlined software EOS/EOL tracking with Lovable AI (Gemini) and a colour-coded Dataiku dashboard so ops and management can triage risk without one-by-one lookups.",
                        "Built a Java 17 / Spring Boot / SQLite systems monitor with PowerShell probes that automate software asset changes and alert on backup failures.",
                        "Partnered with compliance stakeholders to train AI agents and ship Dataiku dashboards that analyse trends and automate policy comparisons.",
                      ],
                    },
                  ],
                },
                {
                  company: "Hewlett Packard Enterprise",
                  active: false,
                  roles: [
                    {
                      title: "Software Engineer",
                      dates: "Jul 2023 – Jan 2025",
                      points: [
                        "Developed real-time Aruba (AOS-CX) automation with SNMP, CLI, and APIs for data collection, config changes, and SDLC module migrations.",
                      ],
                    },
                    {
                      title: "Software Engineer Intern",
                      dates: "Jan 2023 – May 2023",
                      points: [
                        "Reduced support load by automating unit-test frameworks that evaluate network performance in pre-prod.",
                      ],
                    },
                  ],
                },
                {
                  company: "Acronis",
                  active: false,
                  roles: [
                    {
                      title: "Software Engineer Intern",
                      dates: "Jun 2022 – Dec 2022",
                      points: [
                        "Deployed hardware-encrypted GCP hosts on Intel/AMD-SEV to benchmark and run Docker in confidential Linux KVM environments.",
                        "Built an ELK pipeline to index and search backup metadata across large-scale databases and config files.",
                      ],
                    },
                  ],
                },
                {
                  company: "Pixium Digital",
                  active: false,
                  roles: [
                    {
                      title: "Software Engineer Intern",
                      dates: "Jan 2022 – May 2022",
                      points: [
                        "Developed full-stack HR tools with PHP, Yii 2.0, jQuery, and AJAX on AWS S3 and LocalStack for scalable cloud data.",
                      ],
                    },
                  ],
                },
                {
                  company: "Hubble",
                  active: false,
                  roles: [
                    {
                      title: "Software Engineer Intern",
                      dates: "Aug 2021 – Nov 2021",
                      points: [
                        "Migrated a monolith to Ruby on Rails microservices with Docker Compose, Kubernetes, and Postman API validation.",
                        "Built async React features with Redux Saga for control flow and backend integration.",
                      ],
                    },
                  ],
                },
              ].map((job) => (
                <div key={job.company} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${job.active ? "bg-accent" : "bg-border"}`}
                    />
                    <h3 className="text-lg font-semibold tracking-tight">{job.company}</h3>
                  </div>
                  <div className="space-y-4 pl-4">
                    {job.roles.map((role) => (
                      <div key={`${role.title}-${role.dates}`} className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                          <p
                            className={`text-sm font-medium ${job.active ? "text-accent" : "text-ink-soft"}`}
                          >
                            {role.title}
                          </p>
                          <p className="text-sm text-ink-soft whitespace-nowrap shrink-0">
                            {role.dates}
                          </p>
                        </div>
                        <ul className="list-disc list-outside ml-4 pl-0 text-sm text-ink-soft space-y-1.5 leading-relaxed text-pretty">
                          {role.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 pl-3 md:pl-4">
            <h2 className="diary-label">Education</h2>
            <div className="space-y-3">
              {[
                {
                  school: "Nanyang Technological University",
                  detail: "Bachelor of Computer Science · Elective Focus in AI & ML",
                  dates: "Aug 2019 – May 2023",
                },
                {
                  school: "Civil Aviation University of China (Tianjin)",
                  detail: "Overseas Industrial Training Program",
                  dates: "Mar 2016",
                },
                {
                  school: "Singapore Polytechnic",
                  detail: "Diploma in Aerospace Electronics",
                  dates: "2014 – 2017",
                },
              ].map((edu) => (
                <div
                  key={edu.school}
                  className="diary-card p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
                >
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">{edu.school}</h3>
                    <p className="text-sm text-ink-soft">{edu.detail}</p>
                  </div>
                  <span className="text-sm text-ink-soft whitespace-nowrap">{edu.dates}</span>
                </div>
              ))}
            </div>
          </section>

          <footer className="pt-4 border-t border-border flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center text-sm text-ink-soft pl-3 md:pl-4">
            <div className="flex gap-5">
              <a
                href="https://github.com/yshunbin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-deep transition"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/yshunbin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-deep transition"
              >
                LinkedIn
              </a>
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
    <article className="diary-card p-6 space-y-4">
      <div className="flex justify-between items-start">
        <p className="diary-label">AI Tool</p>
        <Link
          href="/projects/discipher"
          transitionTypes={["nav-forward"]}
          className="diary-btn-soft text-xs flex items-center gap-1 px-3 py-1.5"
        >
          <span>View</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <Link href="/projects/discipher" transitionTypes={["nav-forward"]}>
        <h3 className="diary-title text-3xl hover:text-accent transition">DISCipher</h3>
      </Link>
      <p className="text-base text-ink-soft leading-relaxed">
        A mobile-friendly outreach assistant for financial planning agents. Uses the DISC
        behavioral model and local Singapore context to generate high-conversion appointment
        hooks with instant WhatsApp linking and dynamic QR codes.
      </p>

      <div className="flex flex-wrap gap-2 text-sm">
        {["Next.js", "Tailwind CSS", "WhatsApp Web API", "DISC Framework"].map((tag) => (
          <span key={tag} className="diary-chip px-3 py-1 font-medium">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export function LeetCodeProjectCard() {
  return (
    <article className="diary-card p-6 space-y-4">
      <div className="flex justify-between items-start">
        <p className="diary-label">Tracker</p>
        <Link
          href="/projects/leetcode"
          transitionTypes={["nav-forward"]}
          className="diary-btn-soft text-xs flex items-center gap-1 px-3 py-1.5"
        >
          <span>View</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <Link href="/projects/leetcode" transitionTypes={["nav-forward"]}>
        <h3 className="diary-title text-3xl hover:text-accent transition">LeetCode Progress</h3>
      </Link>
      <p className="text-base text-ink-soft leading-relaxed">
        Live view of my Java LeetCode sheet — most and least practised topics, plus the
        latest problems I’ve completed.
      </p>

      <div className="flex flex-wrap gap-2 text-sm">
        {["Google Sheets", "Java", "Algorithms", "Trends"].map((tag) => (
          <span key={tag} className="diary-chip px-3 py-1 font-medium">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export function DragployedProjectCard() {
  return (
    <article className="diary-card p-6 space-y-4">
      <div className="flex justify-between items-start">
        <p className="diary-label">Interview Prep</p>
        <Link
          href="/hobbies/dragployed"
          transitionTypes={["nav-forward"]}
          className="diary-btn-soft text-xs flex items-center gap-1 px-3 py-1.5"
        >
          <span>View</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <Link href="/hobbies/dragployed" transitionTypes={["nav-forward"]}>
        <h3 className="diary-title text-3xl hover:text-accent transition">Dragployed</h3>
      </Link>
      <p className="text-base text-ink-soft leading-relaxed">
        A drag-and-drop crash course for Forward Deployed Engineer interviews — sort FDE vs
        platform work, pick field moves, and sequence a real engagement.
      </p>

      <div className="flex flex-wrap gap-2 text-sm">
        {["FDE", "Drag & Drop", "Interview Prep", "Scenarios"].map((tag) => (
          <span key={tag} className="diary-chip px-3 py-1 font-medium">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export function FypImagePredictionCard() {
  return (
    <article className="diary-card p-6 space-y-4">
      <div className="flex justify-between items-start">
        <p className="diary-label">FYP</p>
        <Link
          href="/projects/fyp-image-prediction"
          transitionTypes={["nav-forward"]}
          className="diary-btn-soft text-xs flex items-center gap-1 px-3 py-1.5"
        >
          <span>View</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <Link href="/projects/fyp-image-prediction" transitionTypes={["nav-forward"]}>
        <h3 className="diary-title text-3xl hover:text-accent transition">
          FYP — Self-supervised Model for Image Prediction
        </h3>
      </Link>
      <p className="text-base text-ink-soft leading-relaxed">
        NTU final-year project: a self-supervised autoencoder that restores randomly missing
        image patches from context. Try it live — upload an image, mask a patch, and see
        reconstruction accuracy.
      </p>

      <div className="flex flex-wrap gap-2 text-sm">
        {["Self-supervised", "Autoencoder", "Inpainting", "TensorFlow"].map((tag) => (
          <span key={tag} className="diary-chip px-3 py-1 font-medium">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
