"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type TopicStat = {
  key: string;
  label: string;
  attempts: number;
  problems: number;
  lastSolvedAt?: string;
  lastSolvedDate?: string;
};

type LeetCodeProblem = {
  number: string;
  title: string;
  difficulty: string;
  attempts: number;
  solvedAt: string;
  solvedDate: string;
  notes: string;
  topic: string;
  url: string;
};

type Payload = {
  sheetUrl: string;
  total: number;
  byDifficulty: Record<string, number>;
  topTriedTopics: TopicStat[];
  leastTriedTopics: TopicStat[];
  latest: LeetCodeProblem[];
  error?: string;
};

function difficultyClass(difficulty: string) {
  const value = difficulty.toLowerCase();
  if (value.includes("easy")) return "bg-emerald-50 text-emerald-800";
  if (value.includes("medium")) return "bg-amber-50 text-amber-800";
  if (value.includes("hard")) return "bg-rose-50 text-rose-800";
  return "bg-chip text-ink-soft";
}

function TopicList({ topics }: { topics: TopicStat[] }) {
  return (
    <div className="space-y-2">
      {topics.map((topic, index) => (
        <div
          key={topic.key}
          className="diary-card p-4 flex items-center justify-between gap-3"
        >
          <div className="min-w-0 flex items-center gap-3">
            <span className="text-sm font-semibold text-ink-soft w-5 shrink-0">
              {index + 1}
            </span>
            <div className="min-w-0">
              <p className="font-semibold tracking-tight truncate">{topic.label}</p>
              <p className="text-sm text-ink-soft">
                {topic.problems} problem{topic.problems === 1 ? "" : "s"} · {topic.attempts}{" "}
                attempt{topic.attempts === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <span className="text-xs text-ink-soft whitespace-nowrap shrink-0">
            {topic.attempts} tries
          </span>
        </div>
      ))}
    </div>
  );
}

export default function LeetCodeProjectPage() {
  const [data, setData] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/leetcode");
        const json = (await response.json()) as Payload;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) {
          setData({
            sheetUrl:
              "https://docs.google.com/spreadsheets/d/1qu-YAGKsVtb0mqTG9TGTWmpXuiFYHCuAkmu_8KDueMI/edit#gid=617383786",
            total: 0,
            byDifficulty: {},
            topTriedTopics: [],
            leastTriedTopics: [],
            latest: [],
            error: "Couldn’t load LeetCode progress right now.",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const difficultyOrder = useMemo(() => ["Easy", "Medium", "Hard"], []);

  return (
    <main className="min-h-screen text-ink p-4 md:p-8 lg:p-12">
      <div className="diary-page max-w-6xl mx-auto px-8 md:px-16 py-10 md:py-14 space-y-10">
        <Link
          href="/hobbies"
          transitionTypes={["nav-back"]}
          className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent transition pl-3 md:pl-4"
        >
          <span>← Hobbies</span>
        </Link>

        <header className="pl-3 md:pl-4 space-y-3">
          <p className="diary-label">Ever learning</p>
          <h1 className="diary-title text-5xl md:text-6xl">LeetCode Progress</h1>
          <p className="text-ink-soft text-lg max-w-2xl">
            {
              "My Java problem sheet — most and least practised topics, plus latest solves."
            }
          </p>
        </header>

        {loading ? (
          <p className="pl-3 md:pl-4 text-sm text-ink-soft">Loading progress…</p>
        ) : data?.error && data.total === 0 ? (
          <p className="pl-3 md:pl-4 text-sm text-ink-soft">{data.error}</p>
        ) : (
          <>
            <section className="pl-3 md:pl-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="diary-card p-4">
                <p className="text-xs text-ink-soft">Total solved</p>
                <p className="text-3xl font-semibold tracking-tight mt-1">{data?.total ?? 0}</p>
              </div>
              {difficultyOrder.map((level) => (
                <div key={level} className="diary-card p-4">
                  <p className="text-xs text-ink-soft">{level}</p>
                  <p className="text-3xl font-semibold tracking-tight mt-1">
                    {data?.byDifficulty?.[level] ?? 0}
                  </p>
                </div>
              ))}
            </section>

            <section className="pl-3 md:pl-4 space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="diary-label">Topic focus</h2>
                <a
                  href={data?.sheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:text-accent-deep inline-flex items-center gap-1"
                >
                  Open Java sheet
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-ink">Top 3 practised</h3>
                  {data?.topTriedTopics?.length ? (
                    <TopicList topics={data.topTriedTopics} />
                  ) : (
                    <p className="text-sm text-ink-soft">No topics yet.</p>
                  )}
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-ink">Least 3 practised</h3>
                  {data?.leastTriedTopics?.length ? (
                    <TopicList topics={data.leastTriedTopics} />
                  ) : (
                    <p className="text-sm text-ink-soft">No topics yet.</p>
                  )}
                </div>
              </div>
            </section>

            <section className="pl-3 md:pl-4 space-y-4">
              <h2 className="diary-label">Latest solved</h2>
              <div className="space-y-2">
                {data?.latest?.map((problem) => (
                  <a
                    key={`${problem.number}-${problem.title}-${problem.solvedAt}`}
                    href={problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="diary-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-accent/40 transition"
                  >
                    <div className="min-w-0 space-y-1">
                      <p className="font-semibold tracking-tight truncate">
                        {problem.number ? `#${problem.number} · ` : ""}
                        {problem.title}
                      </p>
                      <p className="text-sm text-ink-soft truncate">
                        {problem.topic || problem.notes || "LeetCode"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyClass(problem.difficulty)}`}
                      >
                        {problem.difficulty}
                      </span>
                      <span className="text-xs text-ink-soft whitespace-nowrap">
                        {problem.solvedDate}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
