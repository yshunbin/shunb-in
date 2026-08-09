"use client";

import React, { useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import {
  MessageSquare,
  Send,
  Copy,
  Check,
  QrCode,
  Target,
  Users,
  ShieldCheck,
  FileText,
  Smartphone,
  ChevronRight,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

type DiscType = "D" | "I" | "S" | "C";

interface DiscInfo {
  label: string;
  title: string;
  desc: string;
  focus: string;
  color: string;
  bgLight: string;
}

const DISC_PROFILES: Record<DiscType, DiscInfo> = {
  D: {
    label: "D - Dominant",
    title: "Direct & Results-Driven",
    desc: "Hates fluff, values time, bottom-line focused.",
    focus: "Time saved, ROI, quick decisions.",
    color: "border-rose-500 text-rose-700",
    bgLight: "bg-rose-50",
  },
  I: {
    label: "I - Influential",
    title: "Enthusiastic & Social",
    desc: "Relationship-driven, expressive, big-picture thinker.",
    focus: "Lifestyle, status, peace of mind, trends.",
    color: "border-accent text-accent-deep",
    bgLight: "bg-accent-soft",
  },
  S: {
    label: "S - Steady",
    title: "Patient & Safety-Conscious",
    desc: "Risk-averse, warm, values security and low pressure.",
    focus: "Step-by-step security, family protection.",
    color: "border-emerald-600 text-emerald-800",
    bgLight: "bg-emerald-50",
  },
  C: {
    label: "C - Conscientious",
    title: "Analytical & Detail-Oriented",
    desc: "Data-driven, cautious, wants facts and proof.",
    focus: "Facts, numbers, systematic evaluation.",
    color: "border-sky-600 text-sky-800",
    bgLight: "bg-sky-50",
  },
};

export default function FAChatPage() {
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [discType, setDiscType] = useState<DiscType>("S");
  const [painPoint, setPainPoint] = useState("Retirement Gap");
  const [useLocalTone, setUseLocalTone] = useState(true);

  const [generatedMessages, setGeneratedMessages] = useState<string[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/discipher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName: clientName.trim(),
          discType,
          painPoint,
          useLocalTone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate messages.");
      }

      setGeneratedMessages(data.messages);
      setSelectedMessage(data.messages[0]);
      setCopiedIndex(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const cleanPhone = phone.replace(/\D/g, "");
  const formattedPhone = cleanPhone.startsWith("65") ? cleanPhone : `65${cleanPhone}`;
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(selectedMessage)}`;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen text-ink p-4 md:p-8 lg:p-12">
      <div className="diary-page max-w-6xl mx-auto px-8 md:px-16 py-10 md:py-14 space-y-7">
        <Link
          href="/projects"
          transitionTypes={["nav-back"]}
          className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent transition pl-3 md:pl-4"
        >
          <span>← Back to projects</span>
        </Link>

        <header className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 pl-3 md:pl-4">
          <div>
            <h1 className="diary-title text-3xl md:text-4xl">
              FA Cold-to-Appointment Assistant
            </h1>
            <p className="text-ink-soft text-base mt-2">
              Reduce agent inertia & craft high-conversion outreach using DISC behavior model.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/yshunbin/discipher"
              target="_blank"
              rel="noopener noreferrer"
              className="diary-btn-soft text-sm inline-flex items-center gap-1.5 px-3 py-1.5"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="flex items-center space-x-3 diary-card p-2 rounded-xl text-sm text-ink-soft">
              <span className="font-semibold px-2">SG Tone:</span>
              <button
                onClick={() => setUseLocalTone(!useLocalTone)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                  useLocalTone ? "diary-btn" : "diary-btn-soft"
                }`}
              >
                {useLocalTone ? "Warm / Local" : "Formal"}
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pl-3 md:pl-4">
          <div className="lg:col-span-5 space-y-6 diary-card p-6 rounded-xl">
            <div className="space-y-4">
              <h2 className="diary-title text-xl flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                1. Client Information
              </h2>

              <div>
                <label className="block text-sm text-ink-soft mb-1">Client Name</label>
                <input
                  type="text"
                  placeholder="e.g. Marcus"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-base text-ink focus:outline-none focus:border-accent transition"
                />
              </div>

              <div>
                <label className="block text-sm text-ink-soft mb-1">Mobile Number (Singapore)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-sm text-ink-soft">+65</span>
                  <input
                    type="tel"
                    placeholder="91234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl pl-12 pr-4 py-2.5 text-base text-ink focus:outline-none focus:border-accent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-ink-soft mb-1">Primary Pain Point / Topic</label>
                <select
                  value={painPoint}
                  onChange={(e) => setPainPoint(e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-base text-ink focus:outline-none focus:border-accent transition"
                >
                  <option value="Retirement Gap">Retirement Planning / Wealth Gap</option>
                  <option value="Newborn Protection">Newborn / Family Protection</option>
                  <option value="Policy Review">Annual Policy Review & Optimization</option>
                  <option value="Wealth Accumulation">Wealth Accumulation / Investments</option>
                  <option value="Mortgage Insurance">Property / Mortgage Risk Coverage</option>
                </select>
              </div>
            </div>

            <hr className="border-border" />

            <div className="space-y-4">
              <h2 className="diary-title text-xl flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                2. Client DISC Archetype
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(DISC_PROFILES) as DiscType[]).map((key) => {
                  const item = DISC_PROFILES[key];
                  const isSelected = discType === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setDiscType(key)}
                      className={`text-left p-3 rounded-xl border transition flex flex-col justify-between ${
                        isSelected
                          ? `${item.color} ${item.bgLight} border-current`
                          : "border-border bg-surface hover:border-accent/40"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-semibold block">{item.label}</span>
                        <span className="text-xs text-ink-soft line-clamp-1 mt-0.5">
                          {item.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 bg-surface border border-border rounded-xl text-sm space-y-1">
                <div className="font-semibold text-ink">{DISC_PROFILES[discType].title}</div>
                <div className="text-ink-soft">{DISC_PROFILES[discType].desc}</div>
                <div className="text-accent text-xs pt-1">
                  Target Focus: {DISC_PROFILES[discType].focus}
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className={`w-full font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-2 ${
                isLoading
                  ? "bg-accent-deep/50 text-surface cursor-not-allowed"
                  : "diary-btn"
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              <span>{isLoading ? "Writing with Gemini AI..." : "Generate Tailored Messages"}</span>
            </button>

            {errorMessage && (
              <div className="p-3 bg-rose-700/10 border border-rose-700/30 rounded-xl text-sm text-rose-900 space-y-1">
                <div className="font-semibold">Generation Error</div>
                <div>{errorMessage}</div>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="diary-title text-xl flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                3. Generated Text Variations
              </h2>

              {generatedMessages.length === 0 ? (
                <div className="border border-dashed border-border rounded-xl p-12 text-center space-y-3 bg-surface/70">
                  <FileText className="w-10 h-10 text-ink-soft mx-auto" />
                  <p className="text-base text-ink-soft">
                    Fill in client details and hit{" "}
                    <span className="text-ink font-semibold not-italic">Generate</span> to craft
                    DISC-optimized appointment hooks.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {generatedMessages.map((msg, idx) => {
                    const isSelected = selectedMessage === msg;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedMessage(msg)}
                        className={`p-4 rounded-xl border transition cursor-pointer relative ${
                          isSelected
                            ? "diary-card border-accent/60"
                            : "bg-surface/80 border-border hover:border-accent/35"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <p className="text-base text-ink leading-relaxed">{msg}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(msg, idx);
                            }}
                            className="p-2 text-ink-soft hover:text-accent diary-btn-soft rounded-xl transition shrink-0"
                            title="Copy to Clipboard"
                          >
                            {copiedIndex === idx ? (
                              <Check className="w-4 h-4 text-accent" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {isSelected && (
                          <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-accent">
                            <ChevronRight className="w-3 h-3" /> Selected for WhatsApp Link / QR
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {selectedMessage && (
              <div className="diary-card p-5 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-base font-semibold text-ink">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>Send Message to Client</span>
                  </div>
                  {phone && (
                    <span className="text-sm text-ink-soft">To: +65 {phone}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={phone ? whatsappUrl : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!phone) {
                        e.preventDefault();
                        alert("Please enter a mobile phone number first!");
                      }
                    }}
                    className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold text-sm transition ${
                      phone ? "diary-btn" : "bg-border text-ink-soft cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      if (!phone) {
                        alert("Please enter a mobile phone number first!");
                        return;
                      }
                      setShowQR(!showQR);
                    }}
                    className="diary-btn-soft flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold text-sm"
                  >
                    <QrCode className="w-4 h-4 text-accent" />
                    <span>{showQR ? "Hide QR Code" : "Scan Mobile QR"}</span>
                  </button>
                </div>

                {showQR && phone && (
                  <div className="pt-4 border-t border-border flex flex-col items-center space-y-3 bg-surface p-4 rounded-xl">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-border">
                      <QRCodeSVG value={whatsappUrl} size={150} />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-sm font-medium text-ink flex items-center justify-center gap-1">
                        <Smartphone className="w-3.5 h-3.5 text-accent" />
                        Scan with phone camera to open WhatsApp
                      </p>
                      <p className="text-xs text-ink-soft">
                        Message & recipient will auto-populate on your phone instantly.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
