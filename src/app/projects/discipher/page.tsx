"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import LoadingGame from "./loading-game";
import { Zap, ExternalLink, Eye, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const [gameCompleted, setGameCompleted] = useState(false);
  const [pageViews, setPageViews] = useState<number>(0);

  // 1. Page View Counter
  useEffect(() => {
    // Check local storage or increment count
    const storedViews = localStorage.getItem("shunb_page_views");
    const currentViews = storedViews ? parseInt(storedViews, 10) : 100; // starting base
    const updatedViews = currentViews + 1;
    
    localStorage.setItem("shunb_page_views", updatedViews.toString());
    setPageViews(updatedViews);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {!gameCompleted ? (
        /* Sourdough Catching Game Overlay with Skip Button */
        <LoadingGame onComplete={() => setGameCompleted(true)} />
      ) : (
        /* Main Portfolio Home Page Content */
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
          
          {/* Top Bar / Navigation */}
          <header className="flex items-center justify-between border-b border-slate-800/80 pb-6">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-mono font-bold text-emerald-400">
                SB
              </div>
              <span className="font-bold text-lg tracking-tight">shunb.in</span>
            </div>

            {/* Page View Counter Badge */}
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-slate-400 font-mono">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>Views:</span>
              <span className="text-emerald-400 font-bold">{pageViews.toLocaleString()}</span>
            </div>
          </header>

          {/* Hero Section */}
          <section className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Software & Product Portfolio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100">
              Building intelligent tools & high-impact products.
            </h1>
            <p className="text-slate-400 text-base leading-relaxed">
              Explore featured projects, interactive web tools, and technical experiments below.
            </p>
          </section>

          {/* Featured Projects Section */}
          <section className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
                <span>Featured Projects</span>
              </h2>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Discipher Project Card */}
              <div className="group bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-emerald-500/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      Featured
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition">
                      Discipher
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                      A psychological outreach assistant for Singapore financial agents. Converts hesitant leads into booked appointments using the DISC behavioral framework and 1-click WhatsApp linking.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                    <span className="bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">Next.js</span>
                    <span className="bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">Tailwind</span>
                    <span className="bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">WhatsApp Web API</span>
                    <span className="bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">DISC Model</span>
                  </div>

                  <Link
                    href="/projects/discipher"
                    className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-500/10"
                  >
                    <span>Launch Discipher</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </section>

          {/* Footer */}
          <footer className="pt-12 border-t border-slate-800/80 text-xs text-slate-500 flex justify-between items-center">
            <p>© {new Date().getFullYear()} shunb.in</p>
            <p className="font-mono text-slate-600">Built with Next.js & React</p>
          </footer>

        </div>
      )}
    </main>
  );
}