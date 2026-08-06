"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type BucketId = "fde" | "swe" | "both";

type SortCard = {
  id: string;
  text: string;
  answer: BucketId;
};

type ScenarioCard = {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  answer: string;
  why: string;
};

type FlowStep = {
  id: string;
  text: string;
  order: number;
};

const SORT_BUCKETS: { id: BucketId; title: string; hint: string }[] = [
  { id: "fde", title: "FDE owns", hint: "Customer-facing delivery" },
  { id: "swe", title: "Platform / SWE owns", hint: "Productized core" },
  { id: "both", title: "Shared", hint: "Hand-off & productize" },
];

const SORT_CARDS: SortCard[] = [
  {
    id: "s1",
    text: "Embed with a customer ops team for two weeks to ship a working workflow",
    answer: "fde",
  },
  {
    id: "s2",
    text: "Design the shared platform API used by every customer deployment",
    answer: "swe",
  },
  {
    id: "s3",
    text: "Translate a messy business process into a usable data model on-site",
    answer: "fde",
  },
  {
    id: "s4",
    text: "Set the quarterly roadmap for the core product",
    answer: "swe",
  },
  {
    id: "s5",
    text: "Prototype an integration against a customer’s messy ERP under time pressure",
    answer: "fde",
  },
  {
    id: "s6",
    text: "Document a repeated customer need so the platform team can productize it",
    answer: "both",
  },
  {
    id: "s7",
    text: "Own a shared library consumed across all deployments",
    answer: "swe",
  },
  {
    id: "s8",
    text: "Run a workshop with stakeholders to define success metrics for a pilot",
    answer: "fde",
  },
];

const SCENARIOS: ScenarioCard[] = [
  {
    id: "sc1",
    prompt: "Customer wants a one-off Excel export that would break the data model.",
    options: [
      { id: "a", label: "Just ship the Excel hack — speed wins" },
      { id: "b", label: "Refuse and escalate to platform immediately" },
      {
        id: "c",
        label: "Explain the tradeoff, then propose a durable export that keeps the model clean",
      },
    ],
    answer: "c",
    why: "FDEs protect long-term system integrity while still unblocking the customer with a better path.",
  },
  {
    id: "sc2",
    prompt: "Pilot is failing because Monday data arrives late from a legacy feed.",
    options: [
      { id: "a", label: "Ask the customer to fix their legacy system first" },
      {
        id: "b",
        label: "Reproduce the failure, map the dependency, and ship a resilient workaround + clear owner",
      },
      { id: "c", label: "Rewrite the whole pipeline before the next demo" },
    ],
    answer: "b",
    why: "FDEs debug in the real environment, isolate ownership, and ship pragmatic resilience fast.",
  },
  {
    id: "sc3",
    prompt: "Stakeholders disagree on what “done” means for the deployment.",
    options: [
      { id: "a", label: "Keep coding until someone complains" },
      {
        id: "b",
        label: "Facilitate a short success workshop: users, metrics, and a dated pilot scope",
      },
      { id: "c", label: "Defer to the loudest stakeholder" },
    ],
    answer: "b",
    why: "Ambiguity is the job — FDEs create shared success criteria with the customer.",
  },
  {
    id: "sc4",
    prompt: "You keep rebuilding the same custom connector for every customer.",
    options: [
      {
        id: "a",
        label: "Keep rebuilding — every customer is unique",
      },
      {
        id: "b",
        label: "Package the pattern, write a short design note, and loop in platform for a reusable path",
      },
      { id: "c", label: "Stop taking connector work" },
    ],
    answer: "b",
    why: "Great FDEs turn repeated field pain into platform leverage.",
  },
];

const FLOW_STEPS: FlowStep[] = [
  { id: "f1", text: "Discover: map stakeholders, pain, and constraints on-site", order: 1 },
  { id: "f2", text: "Scope: define a dated pilot with measurable success", order: 2 },
  { id: "f3", text: "Build: ship a thin vertical slice against real systems", order: 3 },
  { id: "f4", text: "Validate: put it in users’ hands and watch where it breaks", order: 4 },
  { id: "f5", text: "Harden: fix ops gaps, docs, ownership, and handoff", order: 5 },
  { id: "f6", text: "Productize: feed repeated needs back to the platform", order: 6 },
];

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

type Round = "sort" | "scenarios" | "flow" | "done";

export default function DragployedPage() {
  const [round, setRound] = useState<Round>("sort");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackTone, setFeedbackTone] = useState<"correct" | "wrong" | "mixed" | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Round 1 — sort (stable order for SSR; shuffle after mount)
  const [pool, setPool] = useState<SortCard[]>(SORT_CARDS);
  const [placements, setPlacements] = useState<Record<string, BucketId | null>>(() =>
    Object.fromEntries(SORT_CARDS.map((c) => [c.id, null])),
  );
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Round 2 — scenarios
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scenarioChoice, setScenarioChoice] = useState<string | null>(null);

  // Round 3 — flow order (stable for SSR; shuffle after mount)
  const [flowOrder, setFlowOrder] = useState<FlowStep[]>(FLOW_STEPS);
  const [flowDragging, setFlowDragging] = useState<string | null>(null);

  const FEEDBACK_MS = 5500;

  useEffect(() => {
    setPool(shuffle(SORT_CARDS));
    setFlowOrder(shuffle(FLOW_STEPS));
  }, []);

  const bucketTitle = (id: BucketId) =>
    SORT_BUCKETS.find((b) => b.id === id)?.title ?? id;

  const placedCount = useMemo(
    () => Object.values(placements).filter(Boolean).length,
    [placements],
  );

  const placeCard = (cardId: string, bucket: BucketId) => {
    if (revealed) return;
    setPlacements((prev) => ({ ...prev, [cardId]: bucket }));
    setPool((prev) => prev.filter((c) => c.id !== cardId));
    setDraggingId(null);
    setSelectedId(null);
  };

  const returnToPool = (cardId: string) => {
    if (revealed) return;
    const card = SORT_CARDS.find((c) => c.id === cardId);
    if (!card) return;
    setPlacements((prev) => ({ ...prev, [cardId]: null }));
    setPool((prev) => (prev.some((c) => c.id === cardId) ? prev : [...prev, card]));
    setSelectedId(null);
  };

  const checkSort = () => {
    let correct = 0;
    const misses: string[] = [];
    for (const card of SORT_CARDS) {
      if (placements[card.id] === card.answer) {
        correct += 1;
      } else {
        misses.push(
          `“${card.text}” → ${bucketTitle(card.answer)} (you chose ${
            placements[card.id] ? bucketTitle(placements[card.id]!) : "none"
          })`,
        );
      }
    }
    setScore((s) => s + correct);
    setRevealed(true);
    const allCorrect = correct === SORT_CARDS.length;
    setFeedbackTone(allCorrect ? "correct" : correct === 0 ? "wrong" : "mixed");
    setFeedback(
      allCorrect
        ? `All ${correct}/${SORT_CARDS.length} correct. FDEs own customer-messy delivery; platform owns the reusable core; shared is the handoff that productizes field patterns.`
        : `${correct}/${SORT_CARDS.length} correct.\n\nCorrect placements:\n${misses.map((m) => `• ${m}`).join("\n")}\n\nRule of thumb: one customer’s messy reality → FDE; reusable for every customer → platform; documenting a repeated need so platform can absorb it → shared.`,
    );
    setTimeout(() => {
      setFeedback(null);
      setFeedbackTone(null);
      setRevealed(false);
      setRound("scenarios");
    }, FEEDBACK_MS);
  };

  const submitScenario = () => {
    const current = SCENARIOS[scenarioIndex];
    if (!scenarioChoice) return;
    const ok = scenarioChoice === current.answer;
    const correctOption = current.options.find((o) => o.id === current.answer);
    if (ok) setScore((s) => s + 1);
    setRevealed(true);
    setFeedbackTone(ok ? "correct" : "wrong");
    setFeedback(
      ok
        ? `Correct.\n\n${correctOption?.label}\n\nWhy: ${current.why}`
        : `Not quite.\n\nCorrect answer: ${correctOption?.label}\n\nWhy: ${current.why}`,
    );

    setTimeout(() => {
      setFeedback(null);
      setFeedbackTone(null);
      setRevealed(false);
      setScenarioChoice(null);
      if (scenarioIndex + 1 >= SCENARIOS.length) {
        setRound("flow");
      } else {
        setScenarioIndex((i) => i + 1);
      }
    }, FEEDBACK_MS);
  };

  const moveFlow = (fromId: string, toId: string) => {
    if (revealed) return;
    setFlowOrder((prev) => {
      const next = [...prev];
      const from = next.findIndex((s) => s.id === fromId);
      const to = next.findIndex((s) => s.id === toId);
      if (from < 0 || to < 0) return prev;
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
    setFlowDragging(null);
  };

  const checkFlow = () => {
    let correct = 0;
    flowOrder.forEach((step, index) => {
      if (step.order === index + 1) correct += 1;
    });
    setScore((s) => s + correct);
    setRevealed(true);
    const allCorrect = correct === FLOW_STEPS.length;
    setFeedbackTone(allCorrect ? "correct" : correct === 0 ? "wrong" : "mixed");
    const ideal = [...FLOW_STEPS]
      .sort((a, b) => a.order - b.order)
      .map((s, i) => `${i + 1}. ${s.text}`)
      .join("\n");
    setFeedback(
      allCorrect
        ? `Perfect sequence — ${correct}/${FLOW_STEPS.length}.\n\n${ideal}\n\nWhy this order: discover before you scope, ship a thin slice before you validate, harden only after real users touch it, then productize what keeps repeating.`
        : `${correct}/${FLOW_STEPS.length} steps in the right slot.\n\nCorrect order:\n${ideal}\n\nWhy: validate with real users before you harden and productize — otherwise you polish the wrong thing.`,
    );
    setTimeout(() => {
      setFeedback(null);
      setFeedbackTone(null);
      setRevealed(false);
      setRound("done");
    }, FEEDBACK_MS);
  };

  const resetGame = () => {
    setRound("sort");
    setScore(0);
    setFeedback(null);
    setFeedbackTone(null);
    setRevealed(false);
    setPool(shuffle(SORT_CARDS));
    setPlacements(Object.fromEntries(SORT_CARDS.map((c) => [c.id, null])));
    setScenarioIndex(0);
    setScenarioChoice(null);
    setFlowOrder(shuffle(FLOW_STEPS));
  };

  const maxScore = SORT_CARDS.length + SCENARIOS.length + FLOW_STEPS.length;

  const feedbackBoxClass =
    feedbackTone === "correct"
      ? "border-emerald-300 bg-emerald-50 text-emerald-950"
      : feedbackTone === "wrong"
        ? "border-rose-300 bg-rose-50 text-rose-950"
        : feedbackTone === "mixed"
          ? "border-amber-300 bg-amber-50 text-amber-950"
          : "";

  const resultClass = (ok: boolean) =>
    ok
      ? "border-emerald-300 bg-emerald-50 text-emerald-950"
      : "border-rose-300 bg-rose-50 text-rose-950";

  return (
    <main className="min-h-screen text-ink p-4 md:p-8 lg:p-12">
      <div className="diary-page max-w-6xl mx-auto px-8 md:px-16 py-10 md:py-14 space-y-8">
        <Link
          href="/hobbies"
          transitionTypes={["nav-back"]}
          className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent transition pl-3 md:pl-4"
        >
          <span>← Hobbies</span>
        </Link>

        <header className="pl-3 md:pl-4 space-y-3">
          <p className="diary-label">Interview Prep</p>
          <h1 className="diary-title text-5xl md:text-6xl">Dragployed</h1>
          <p className="text-ink-soft text-lg max-w-2xl leading-relaxed">
            A drag-and-drop crash course for Forward Deployed Engineer thinking — sort the
            role, pick the field move, then sequence the engagement.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-ink-soft">
            <span className="diary-pill px-3 py-1">Score {score}/{maxScore}</span>
            <span className="diary-chip px-3 py-1 font-medium">
              {round === "sort" && "Round 1 · Role Sort"}
              {round === "scenarios" && "Round 2 · Field Calls"}
              {round === "flow" && "Round 3 · Engagement Flow"}
              {round === "done" && "Complete"}
            </span>
          </div>
        </header>

        {feedback && (
          <div className="pl-3 md:pl-4">
            <p
              className={`rounded-xl border p-4 text-sm leading-relaxed whitespace-pre-line ${feedbackBoxClass}`}
            >
              {feedback}
            </p>
          </div>
        )}

        {round === "sort" && (
          <section className="pl-3 md:pl-4 space-y-5">
            <p className="text-sm text-ink-soft">
              Drag each card into a bucket — or tap a card, then tap a bucket.{" "}
              {selectedId ? "Bucket ready — tap where it belongs." : null}
            </p>

            <div className="flex flex-wrap gap-2 min-h-[3rem]">
              {pool.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  draggable={!revealed}
                  onDragStart={() => setDraggingId(card.id)}
                  onDragEnd={() => setDraggingId(null)}
                  onClick={() =>
                    setSelectedId((prev) => (prev === card.id ? null : card.id))
                  }
                  className={`diary-card max-w-xs text-left p-3 text-sm leading-snug cursor-grab active:cursor-grabbing transition ${
                    selectedId === card.id ? "border-accent shadow-[0_0_0_1px_var(--accent)]" : ""
                  }`}
                >
                  {card.text}
                </button>
              ))}
              {pool.length === 0 && !revealed && (
                <p className="text-sm text-ink-soft">All cards placed — check your sort.</p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {SORT_BUCKETS.map((bucket) => (
                <div
                  key={bucket.id}
                  onDragOver={(e) => {
                    if (!revealed) e.preventDefault();
                  }}
                  onDrop={() => {
                    if (draggingId) placeCard(draggingId, bucket.id);
                  }}
                  onClick={() => {
                    if (selectedId) placeCard(selectedId, bucket.id);
                  }}
                  className="diary-card min-h-[220px] p-4 space-y-3 border-dashed"
                >
                  <div>
                    <h2 className="font-semibold tracking-tight">{bucket.title}</h2>
                    <p className="text-xs text-ink-soft">{bucket.hint}</p>
                  </div>
                  <div className="space-y-2">
                    {SORT_CARDS.filter((c) => placements[c.id] === bucket.id).map((card) => {
                      const ok = card.answer === bucket.id;
                      return (
                        <button
                          key={card.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            returnToPool(card.id);
                          }}
                          className={`w-full text-left text-sm p-3 rounded-xl leading-snug transition border ${
                            revealed
                              ? resultClass(ok)
                              : "bg-chip border-transparent hover:bg-accent-soft"
                          }`}
                        >
                          {card.text}
                          {revealed && (
                            <span className="block text-xs mt-1 opacity-80">
                              {ok ? "Correct" : `Should be: ${bucketTitle(card.answer)}`}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              disabled={placedCount < SORT_CARDS.length || revealed}
              onClick={checkSort}
              className="diary-btn px-5 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Check sort
            </button>
          </section>
        )}

        {round === "scenarios" && (
          <section className="pl-3 md:pl-4 space-y-5 max-w-3xl">
            <p className="text-sm text-ink-soft">
              Scenario {scenarioIndex + 1} of {SCENARIOS.length} — pick the strongest first move.
            </p>
            <article className="diary-card p-6 space-y-4">
              <h2 className="text-lg font-semibold tracking-tight leading-snug">
                {SCENARIOS[scenarioIndex].prompt}
              </h2>
              <div className="space-y-2">
                {SCENARIOS[scenarioIndex].options.map((option) => {
                  const isCorrect = option.id === SCENARIOS[scenarioIndex].answer;
                  const isChosen = scenarioChoice === option.id;
                  let tone = "";
                  if (revealed) {
                    if (isCorrect) tone = resultClass(true);
                    else if (isChosen) tone = resultClass(false);
                    else tone = "opacity-50";
                  } else if (isChosen) {
                    tone = "border-accent shadow-[0_0_0_1px_var(--accent)]";
                  } else {
                    tone = "hover:border-accent/40";
                  }
                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={revealed}
                      onClick={() => setScenarioChoice(option.id)}
                      className={`w-full text-left diary-card p-4 text-sm leading-relaxed transition ${tone}`}
                    >
                      {option.label}
                      {revealed && isCorrect && (
                        <span className="block text-xs mt-1.5 font-medium opacity-80">
                          Correct answer
                        </span>
                      )}
                      {revealed && isChosen && !isCorrect && (
                        <span className="block text-xs mt-1.5 font-medium opacity-80">
                          Your answer
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </article>
            <button
              type="button"
              disabled={!scenarioChoice || revealed}
              onClick={submitScenario}
              className="diary-btn px-5 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Lock answer
            </button>
          </section>
        )}

        {round === "flow" && (
          <section className="pl-3 md:pl-4 space-y-5 max-w-2xl">
            <p className="text-sm text-ink-soft">
              Drag to reorder the Forward Deployed engagement loop (top = first).
            </p>
            <div className="space-y-2">
              {flowOrder.map((step, index) => {
                const ok = step.order === index + 1;
                return (
                  <div
                    key={step.id}
                    draggable={!revealed}
                    onDragStart={() => setFlowDragging(step.id)}
                    onDragOver={(e) => {
                      if (!revealed) e.preventDefault();
                    }}
                    onDrop={() => {
                      if (flowDragging) moveFlow(flowDragging, step.id);
                    }}
                    className={`diary-card p-4 flex items-start gap-3 border transition ${
                      revealed ? resultClass(ok) : "cursor-grab active:cursor-grabbing"
                    }`}
                  >
                    <span className="text-sm font-semibold w-5 shrink-0 pt-0.5 opacity-70">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm leading-relaxed">{step.text}</p>
                      {revealed && (
                        <p className="text-xs mt-1 opacity-80">
                          {ok ? "Correct slot" : `Belongs at step ${step.order}`}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={revealed}
                onClick={checkFlow}
                className="diary-btn px-5 py-2.5 text-sm disabled:opacity-40"
              >
                Check sequence
              </button>
              <button
                type="button"
                disabled={revealed}
                onClick={() => setFlowOrder(shuffle(FLOW_STEPS))}
                className="diary-btn-soft px-5 py-2.5 text-sm disabled:opacity-40"
              >
                Shuffle
              </button>
            </div>
          </section>
        )}

        {round === "done" && (
          <section className="pl-3 md:pl-4 space-y-5 max-w-2xl">
            <article className="diary-card p-6 space-y-4">
              <h2 className="diary-title text-3xl">Deployment complete</h2>
              <p className="text-ink-soft leading-relaxed">
                You scored <span className="text-ink font-semibold">{score}/{maxScore}</span>.
                Forward Deployed Engineers sit between customer reality and platform leverage —
                ship something usable, then feed the pattern back.
              </p>
              <ul className="list-disc list-outside ml-5 text-sm text-ink-soft space-y-2 leading-relaxed">
                <li>Own the messy on-site problem end-to-end.</li>
                <li>Define success with stakeholders before you overbuild.</li>
                <li>Prefer durable fixes over clever one-offs.</li>
                <li>Turn repeated field pain into platform product.</li>
              </ul>
              <button type="button" onClick={resetGame} className="diary-btn px-5 py-2.5 text-sm">
                Play again
              </button>
            </article>
          </section>
        )}
      </div>
    </main>
  );
}
