"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ExternalLink, Wheat } from "lucide-react";

type Book = {
  title: string;
  author: string;
  image: string;
  link: string;
  bookId: string;
  monthYear?: string;
};

type GoodreadsPayload = {
  profileUrl: string;
  currentlyReading: Book[];
  recentlyRead: Book[];
  error?: string;
};

function BookRow({ book, showDate = false }: { book: Book; showDate?: boolean }) {
  return (
    <a
      href={book.link}
      target="_blank"
      rel="noopener noreferrer"
      className="diary-card flex items-center gap-4 p-3 hover:border-accent/40 transition"
    >
      {book.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={book.image}
          alt={book.title}
          className="w-12 h-[72px] object-cover rounded-md bg-chip shrink-0"
        />
      ) : (
        <div className="w-12 h-[72px] rounded-md bg-chip flex items-center justify-center shrink-0">
          <BookOpen className="w-4 h-4 text-ink-soft" />
        </div>
      )}
      <div className="min-w-0 space-y-0.5 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="font-semibold tracking-tight text-ink truncate">{book.title}</p>
          {showDate && book.monthYear ? (
            <span className="text-xs text-ink-soft whitespace-nowrap shrink-0 pt-0.5">
              {book.monthYear}
            </span>
          ) : null}
        </div>
        <p className="text-sm text-ink-soft truncate">{book.author}</p>
      </div>
    </a>
  );
}

export default function HobbiesPage() {
  const [data, setData] = useState<GoodreadsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/goodreads");
        const json = (await response.json()) as GoodreadsPayload;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) {
          setData({
            profileUrl: "https://www.goodreads.com/user/show/201501144-shun-bin",
            currentlyReading: [],
            recentlyRead: [],
            error: "Couldn’t load reading list right now.",
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

  return (
    <main className="min-h-screen text-ink p-4 md:p-8 lg:p-12">
      <div className="diary-page max-w-6xl mx-auto px-8 md:px-16 py-10 md:py-14 space-y-10">
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent transition pl-3 md:pl-4"
        >
          <span>← Home</span>
        </Link>

        <header className="pl-3 md:pl-4 space-y-3">
          <h1 className="diary-title text-5xl md:text-6xl">Hobbies</h1>
          <p className="text-ink-soft text-lg max-w-xl">
            Things I do outside work — books, bread, and staying active.
          </p>
        </header>

        <section className="pl-3 md:pl-4 space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="diary-label">Reading</h2>
            <a
              href="https://www.goodreads.com/user/show/201501144-shun-bin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:text-accent-deep inline-flex items-center gap-1"
            >
              Goodreads profile
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {loading ? (
            <p className="text-sm text-ink-soft">Loading latest reads…</p>
          ) : data?.error &&
            data.currentlyReading.length === 0 &&
            data.recentlyRead.length === 0 ? (
            <p className="text-sm text-ink-soft">{data.error}</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-ink">Currently reading</h3>
                {data?.currentlyReading?.length ? (
                  <div className="space-y-2">
                    {data.currentlyReading.map((book) => (
                      <BookRow key={`${book.bookId}-${book.title}`} book={book} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-ink-soft">Nothing marked as currently reading.</p>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-ink">Recently read</h3>
                {data?.recentlyRead?.length ? (
                  <div className="space-y-2">
                    {data.recentlyRead.map((book) => (
                      <BookRow key={`${book.bookId}-${book.title}`} book={book} showDate />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-ink-soft">No recent finishes yet.</p>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="pl-3 md:pl-4 space-y-4">
          <h2 className="diary-label">Baking</h2>
          <article className="diary-card p-6 space-y-3">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight">I bake sourdough</h3>
              <p className="text-ink-soft leading-relaxed">
                {
                  "Feeding starters, shaping loaves, and learning patience one bake at a time. Occasional crumbs and crust shots live on Instagram."
                }
              </p>
            </div>
            <a
              href="https://www.instagram.com/shunbake"
              target="_blank"
              rel="noopener noreferrer"
              className="diary-btn-soft inline-flex items-center gap-2 px-4 py-2 text-sm"
            >
              <Wheat className="w-4 h-4 text-accent" />
              <span>@shunbake on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 text-ink-soft" />
            </a>
          </article>
        </section>

        <section className="pl-3 md:pl-4 space-y-4">
          <h2 className="diary-label">Sports</h2>
          <article className="diary-card p-6 space-y-3">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight">Staying active</h3>
              <p className="text-ink-soft leading-relaxed">
                {
                  "Running 5Ks regularly, plus swimming, badminton, and gym sessions to keep the week moving."
                }
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Running · 5Ks", "Swimming", "Badminton", "Gym"].map((sport) => (
                <span key={sport} className="diary-chip px-3.5 py-1.5 text-sm font-medium">
                  {sport}
                </span>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
