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
              <p className="text-lg md:text-xl text-ink-soft max-w-2xl leading-relaxed">
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
                <p className="text-xs text-ink-soft mt-1">Still learning</p>
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
                <p className="text-sm text-ink-soft leading-relaxed">
                  Full-stack task tracker with CRUD, Maven/PostgreSQL persistence, React frontend,
                  and Dockerized delivery.
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
                <p className="text-sm text-ink-soft leading-relaxed">
                  Android app with clickable dengue cluster polygons across Singapore via Google
                  Maps SDK and the NEA API.
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
                  role: "Software Engineer",
                  dates: "Jan 2026 – Present",
                  active: true,
                  points: [
                    "Developed and deployed a systems monitoring tool with Java 17, Spring Boot, and SQLite, using PowerShell probes to automate software asset changes and alert on backup failures.",
                    "Built Dataiku dashboards and trained AI agents to analyse trends across data files and automate policy comparisons for compliance stakeholders.",
                  ],
                },
                {
                  company: "Hewlett Packard Enterprise",
                  role: "Software Engineer",
                  dates: "Jul 2023 – Jan 2025",
                  active: false,
                  points: [
                    "Developed real-time shell scripts for Aruba (AOS-CX) using SNMP, CLI, and API calls to automate data collection and configuration changes, while driving SDLC improvements through module migrations and issue resolution.",
                  ],
                },
                {
                  company: "Hewlett Packard Enterprise",
                  role: "Software Engineer Intern",
                  dates: "Jan 2023 – May 2023",
                  active: false,
                  points: [
                    "Reduced support tasks by automating unit test frameworks to evaluate network performance in a pre-prod environment.",
                  ],
                },
                {
                  company: "Acronis",
                  role: "Software Engineer Intern",
                  dates: "Jun 2022 – Dec 2022",
                  active: false,
                  points: [
                    "Deployed hardware-encrypted GCP infrastructure on Intel and AMD-SEV servers to benchmark performance and host Docker containers in confidential computing Linux KVM environments.",
                    "Implemented an ELK stack pipeline to index and search backup metadata across large-scale databases and configuration files.",
                  ],
                },
                {
                  company: "Pixium Digital",
                  role: "Software Engineer Intern",
                  dates: "Jan 2022 – May 2022",
                  active: false,
                  points: [
                    "Developed full-stack web applications and HR tools with PHP, Yii 2.0, jQuery, and AJAX, using AWS S3 and LocalStack for scalable cloud data management.",
                  ],
                },
                {
                  company: "Hubble",
                  role: "Software Engineer Intern",
                  dates: "Aug 2021 – Nov 2021",
                  active: false,
                  points: [
                    "Migrated a monolithic backend to Ruby on Rails microservices with Docker Compose and Kubernetes, with full API validation via Postman.",
                    "Built asynchronous React features with Redux Saga for control flow and backend integration.",
                  ],
                },
              ].map((job) => (
                <div
                  key={`${job.company}-${job.role}-${job.dates}`}
                  className="grid md:grid-cols-[1fr_auto] gap-2 md:gap-8"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${job.active ? "bg-accent" : "bg-border"}`}
                      />
                      <h3 className="text-lg font-semibold tracking-tight">{job.company}</h3>
                    </div>
                    <p className={`text-sm font-medium ${job.active ? "text-accent" : "text-ink-soft"}`}>
                      {job.role}
                    </p>
                    <ul className="list-disc list-inside text-sm text-ink-soft space-y-1.5 leading-relaxed">
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-ink-soft md:text-right whitespace-nowrap">{job.dates}</p>
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
        <p className="diary-label">Featured</p>
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
