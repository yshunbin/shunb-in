import { NextResponse } from "next/server";

const SHEET_ID = "1qu-YAGKsVtb0mqTG9TGTWmpXuiFYHCuAkmu_8KDueMI";
const JAVA_GID = "617383786";

export type LeetCodeProblem = {
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

export type TopicStat = {
  key: string;
  label: string;
  attempts: number;
  problems: number;
  lastSolvedAt?: string;
  lastSolvedDate?: string;
};

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      cell = "";
    } else if (ch !== "\r") {
      cell += ch;
    }
  }

  if (cell.length || row.length) {
    row.push(cell);
    if (row.some((value) => value.trim())) rows.push(row);
  }

  return rows;
}

function parseDate(raw: string): Date | null {
  const value = raw.trim();
  if (!value) return null;
  const match = value.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (match) {
    const parsed = new Date(`${match[1]} ${match[2]}, ${match[3]} 12:00:00`);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) return parsed;
  return null;
}

function formatSolvedDate(date: Date) {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/\(premium\)/gi, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${JAVA_GID}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; shunb-in-portfolio/1.0; +https://github.com/yshunbin/shunb-in)",
      },
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      throw new Error(`Google Sheets export failed (${response.status})`);
    }

    const csv = await response.text();
    if (csv.trim().startsWith("<!DOCTYPE") || csv.includes("Sign in")) {
      throw new Error("Sheet is not publicly accessible.");
    }

    const rows = parseCsv(csv);
    if (rows.length < 2) {
      throw new Error("Sheet has no problem rows.");
    }

    const header = rows[0].map((h) => h.trim().toLowerCase());
    const idx = {
      number: header.findIndex((h) => h === "no." || h === "no"),
      question: header.findIndex((h) => h.startsWith("question")),
      difficulty: header.findIndex((h) => h.startsWith("difficulty")),
      attempts: header.findIndex((h) => h.includes("attempt")),
      date: header.findIndex((h) => h.includes("last solved")),
      notes: header.findIndex((h) => h.startsWith("notes")),
      topic: header.findIndex((h) => h.includes("sub-topic") || h.includes("topic")),
    };

    const problems: LeetCodeProblem[] = [];

    for (const row of rows.slice(1)) {
      const title = (row[idx.question] || "").trim();
      const number = (row[idx.number] || "").trim();
      const dateRaw = (row[idx.date] || "").trim();
      const date = parseDate(dateRaw);
      if (!title || !date) continue;

      problems.push({
        number,
        title,
        difficulty: (row[idx.difficulty] || "").trim() || "Unknown",
        attempts: Number((row[idx.attempts] || "0").trim()) || 0,
        solvedAt: date.toISOString(),
        solvedDate: formatSolvedDate(date),
        notes: (row[idx.notes] || "").trim(),
        topic: (row[idx.topic] || "").trim(),
        url: `https://leetcode.com/problems/${toSlug(title)}/`,
      });
    }

    problems.sort(
      (a, b) => new Date(b.solvedAt).getTime() - new Date(a.solvedAt).getTime(),
    );

    const byDifficulty = problems.reduce<Record<string, number>>((acc, problem) => {
      acc[problem.difficulty] = (acc[problem.difficulty] || 0) + 1;
      return acc;
    }, {});

    const topicMap = new Map<
      string,
      { attempts: number; problems: number; lastSolvedAt: number }
    >();

    for (const problem of problems) {
      const topic = problem.topic || "Other";
      const existing = topicMap.get(topic) || {
        attempts: 0,
        problems: 0,
        lastSolvedAt: 0,
      };
      existing.attempts += Math.max(problem.attempts, 1);
      existing.problems += 1;
      existing.lastSolvedAt = Math.max(
        existing.lastSolvedAt,
        new Date(problem.solvedAt).getTime(),
      );
      topicMap.set(topic, existing);
    }

    const topicStats: TopicStat[] = [...topicMap.entries()].map(([label, value]) => ({
      key: label,
      label,
      attempts: value.attempts,
      problems: value.problems,
      lastSolvedAt: value.lastSolvedAt
        ? new Date(value.lastSolvedAt).toISOString()
        : undefined,
      lastSolvedDate: value.lastSolvedAt
        ? formatSolvedDate(new Date(value.lastSolvedAt))
        : undefined,
    }));

    const topTriedTopics = [...topicStats]
      .sort(
        (a, b) =>
          b.attempts - a.attempts ||
          b.problems - a.problems ||
          a.label.localeCompare(b.label),
      )
      .slice(0, 3);

    const leastTriedTopics = [...topicStats]
      .sort(
        (a, b) =>
          a.attempts - b.attempts ||
          a.problems - b.problems ||
          a.label.localeCompare(b.label),
      )
      .slice(0, 3);

    return NextResponse.json({
      sheetUrl: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=${JAVA_GID}`,
      total: problems.length,
      byDifficulty,
      topTriedTopics,
      leastTriedTopics,
      latest: problems.slice(0, 5),
      problems,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to load LeetCode sheet.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
