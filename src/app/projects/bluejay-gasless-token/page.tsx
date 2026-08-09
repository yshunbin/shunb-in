"use client";

import Link from "next/link";
import {
  ExternalLink,
  FileText,
  Fuel,
  Coins,
  ShieldAlert,
  Wallet,
} from "lucide-react";

const GITHUB_URL = "https://github.com/yshunbin/cz4153";
const REPORT_ID = "1-YzjsR0J6o0Gi-7-j5KvQs9wfQ-vZroNoi-4C2cllOs";
const REPORT_URL = `https://docs.google.com/document/d/${REPORT_ID}/edit?usp=sharing`;
const REPORT_PREVIEW = `https://docs.google.com/document/d/${REPORT_ID}/preview`;

const STEPS = [
  {
    icon: Coins,
    title: "ERC-20 token",
    body: "ChickenRiceToken (CRT) implements the ERC-20 standard so wallets can hold and transfer a custom on-chain asset.",
  },
  {
    icon: Wallet,
    title: "Signed intent",
    body: "Rather than broadcasting a conventional Ethereum transaction, the user signs a message that encodes the intended transfer.",
  },
  {
    icon: Fuel,
    title: "Relayed execution",
    body: "A third-party relayer (Biconomy / OpenZeppelin GSN) pays gas and submits the transaction to the network on the user’s behalf.",
  },
  {
    icon: ShieldAlert,
    title: "Security analysis",
    body: "The course paper examines Denial-of-Service and single-point-of-failure risks from a centralized relayer, as well as reentrancy considerations in Solidity.",
  },
];

export default function BluejayGaslessTokenPage() {
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
              <p className="diary-label">Blockchain · Nov 2021</p>
              <h1 className="diary-title text-5xl md:text-6xl">Bluejay Gasless Token</h1>
              <p className="text-ink-soft text-lg max-w-2xl leading-relaxed">
                NTU CZ4153 Blockchain Technology — an Ethereum dApp for fee-free ERC-20 transfers
                via meta-transactions and a gas relayer.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="diary-btn-soft text-sm inline-flex items-center gap-1.5 px-4 py-2"
              >
                GitHub
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={REPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="diary-btn-soft text-sm inline-flex items-center gap-1.5 px-4 py-2"
              >
                Report
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            {["Ethereum", "Solidity", "ERC-20", "Meta-tx / GSN", "Biconomy", "React"].map(
              (tag) => (
                <span key={tag} className="diary-chip px-3 py-1 font-medium">
                  {tag}
                </span>
              ),
            )}
          </div>
        </header>

        <section className="pl-3 md:pl-4">
          <article className="diary-card p-6 space-y-3 border-accent/25 bg-accent-soft/40">
            <p className="diary-label">Overview</p>
            <p className="text-base text-ink leading-relaxed">
              Developed for the CZ4153{" "}
              <span className="font-semibold">Bluejay Gasless Token</span> option, this project
              implements a <span className="font-semibold">ChickenRiceToken (CRT)</span> ERC-20
              contract and a companion front-end that lets wallet users transfer tokens without
              paying an Ethereum transaction fee. Gas costs are covered by a relayer network that
              submits signed intents on the user’s behalf. The accompanying term paper analyses the{" "}
              <span className="font-semibold">security</span> implications of that architecture,
              including centralized-relayer availability risks (DoS / single point of failure) and
              reentrancy exposure in smart contracts.
            </p>
            <p className="text-sm text-ink-soft leading-relaxed">
              The public GitHub repository demonstrates the same gasless pattern with an
              OpenZeppelin GSN{" "}
              <code className="text-xs bg-chip px-1.5 py-0.5 rounded">Counter</code> contract: an
              on-chain counter can be incremented without the end user funding gas.
            </p>
          </article>
        </section>

        <section className="pl-3 md:pl-4 space-y-4">
          <h2 className="diary-label">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STEPS.map((step, index) => {
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
          <h2 className="diary-label">Interface concept</h2>
          <div className="diary-card p-5 md:p-6">
            <div className="max-w-md mx-auto rounded-xl border border-border bg-chip p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">ChickenRiceToken</span>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-full">
                  Gas: relayed
                </span>
              </div>
              <div className="rounded-lg bg-white border border-border px-3 py-2.5 space-y-1">
                <p className="text-[11px] text-ink-soft uppercase tracking-wider">Recipient</p>
                <p className="text-sm font-mono truncate">0xA1b2…9fC4</p>
              </div>
              <div className="rounded-lg bg-white border border-border px-3 py-2.5 space-y-1">
                <p className="text-[11px] text-ink-soft uppercase tracking-wider">Amount</p>
                <p className="text-2xl font-semibold tracking-tight">
                  12 <span className="text-base text-ink-soft font-medium">CRT</span>
                </p>
              </div>
              <button
                type="button"
                className="w-full diary-btn py-2.5 text-sm pointer-events-none"
                tabIndex={-1}
              >
                Sign &amp; send
              </button>
              <p className="text-xs text-ink-soft text-center leading-relaxed">
                Conceptual UI. The repository ships a GSN Counter client against a local Ganache /
                OpenZeppelin network for hands-on verification of gasless calls.
              </p>
            </div>
          </div>
        </section>

        <section className="pl-3 md:pl-4 space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="diary-label">Course report</h2>
            <a
              href={REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:text-accent-deep inline-flex items-center gap-1"
            >
              Open in Google Docs
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="diary-card overflow-hidden rounded-xl border border-border bg-chip">
            <div className="relative w-full min-h-[520px] h-[70vh]">
              <iframe
                title="CZ4153 Bluejay Gasless Token report"
                src={REPORT_PREVIEW}
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
          <p className="text-sm text-ink-soft inline-flex items-start gap-2">
            <FileText className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>
              CE/CZ4153 security, privacy, and scalability term paper by Daryl Neo, Koo Jian Yang,
              and Yeoh Shun Bin — focused on the security of gasless relayed transfers.
            </span>
          </p>
        </section>

        <section className="pl-3 md:pl-4">
          <div className="flex flex-wrap gap-3">
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
              href={REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="diary-btn-soft text-sm inline-flex items-center gap-1.5 px-4 py-2"
            >
              Full report
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
