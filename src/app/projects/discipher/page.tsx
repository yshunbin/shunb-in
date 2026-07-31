"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  QrCode, 
  Zap, 
  Target, 
  Users, 
  ShieldCheck, 
  FileText,
  Smartphone,
  ChevronRight,
  RefreshCw
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
    color: "border-rose-500 text-rose-400",
    bgLight: "bg-rose-500/10",
  },
  I: {
    label: "I - Influential",
    title: "Enthusiastic & Social",
    desc: "Relationship-driven, expressive, big-picture thinker.",
    focus: "Lifestyle, status, peace of mind, trends.",
    color: "border-amber-500 text-amber-400",
    bgLight: "bg-amber-500/10",
  },
  S: {
    label: "S - Steady",
    title: "Patient & Safety-Conscious",
    desc: "Risk-averse, warm, values security and low pressure.",
    focus: "Step-by-step security, family protection.",
    color: "border-emerald-500 text-emerald-400",
    bgLight: "bg-emerald-500/10",
  },
  C: {
    label: "C - Conscientious",
    title: "Analytical & Detail-Oriented",
    desc: "Data-driven, cautious, wants facts and proof.",
    focus: "Facts, numbers, systematic evaluation.",
    color: "border-sky-500 text-sky-400",
    bgLight: "bg-sky-500/10",
  },
};

export default function FAChatPage() {
  // Form State
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [discType, setDiscType] = useState<DiscType>("S");
  const [painPoint, setPainPoint] = useState("Retirement Gap");
  const [useLocalTone, setUseLocalTone] = useState(true);
  
  // Output State
  const [generatedMessages, setGeneratedMessages] = useState<string[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showQR, setShowQR] = useState(false);

  // DISC Message Generation Logic
  const handleGenerate = () => {
    const name = clientName.trim() || "there";
    const tonePrefix = useLocalTone ? "Hey " : "Hi ";

    let msgs: string[] = [];

    if (discType === "D") {
      msgs = [
        `${tonePrefix}${name}, noticed a quick gap in your ${painPoint.toLowerCase()} strategy. I’ve cut down a 15-min breakdown on how to fix this—no fluff. Free for a quick 10-min call this Thursday or Friday?`,
        `${name}, bottom line: most folks overlook ${painPoint.toLowerCase()} until it costs them extra. Got 2 streamlined options to review. Let me know if Tue or Wed afternoon works better to glance through.`,
        `${tonePrefix}${name}, checking in directly on your ${painPoint.toLowerCase()} setup. If you want to streamline this efficiently, let’s sync up briefly this week.`
      ];
    } else if (discType === "I") {
      msgs = [
        `${tonePrefix}${name}! Hope you're having an awesome week! Was chatting with a few friends about ${painPoint.toLowerCase()} and thought of you. Would love to grab a quick coffee/catchup soon and share some cool insights! ☕`,
        `Hey ${name}! Long time! Was looking into some really interesting trends regarding ${painPoint.toLowerCase()} that make a huge difference for lifestyle planning. Let's catch up over coffee this week!`,
        `${tonePrefix}${name}, hope all is well! Got some fresh updates on ${painPoint.toLowerCase()} that I think you'll really appreciate. Let's hang out briefly sometime this week!`
      ];
    } else if (discType === "S") {
      msgs = [
        `${tonePrefix}${name}, hope you're having a smooth week. No rush at all, but I’ve been reviewing some safe step-by-step approaches for ${painPoint.toLowerCase()} to ensure your family is fully covered. Happy to share whenever you have a quiet moment.`,
        `Hi ${name}, just a gentle check-in. Many clients tell me ${painPoint.toLowerCase()} can feel overwhelming, so I put together a low-pressure, step-by-step summary. Let me know if you'd like me to drop it over!`,
        `${tonePrefix}${name}, hope things are peaceful on your side. Whenever you're free, I’d love to share a non-obligatory guide on securing your ${painPoint.toLowerCase()}. No rush!`
      ];
    } else { // C Type
      msgs = [
        `${tonePrefix}${name}, I’ve put together a structured analysis regarding ${painPoint.toLowerCase()}, comparing current market rates and policy benchmarks. I can drop over the data comparison for your review. Let me know if Thursday works.`,
        `Hi ${name}, following up with some quantitative insights on ${painPoint.toLowerCase()}. I have a clear breakdown detailing potential yield and risk buffers. Let me know if you'd like the figures sent over.`,
        `${tonePrefix}${name}, hope week is going well. I have compiled a factual review addressing key inefficiencies in ${painPoint.toLowerCase()}. Happy to share the logic and numbers whenever convenient.`
      ];
    }

    setGeneratedMessages(msgs);
    setSelectedMessage(msgs[0]);
    setCopiedIndex(null);
  };

  // Format WhatsApp URL
  const cleanPhone = phone.replace(/\D/g, "");
  const formattedPhone = cleanPhone.startsWith("65") ? cleanPhone : `65${cleanPhone}`;
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(selectedMessage)}`;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Zap className="w-4 h-4" />
              <span>DISC-Ciphere Engine</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">FA Cold-to-Appointment Assistant</h1>
            <p className="text-slate-400 text-sm mt-1">
              Reduce agent inertia & craft high-conversion outreach using DISC behavior model.
            </p>
          </div>
          
          <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 p-2 rounded-xl text-xs text-slate-300">
            <span className="font-medium px-2">SG Tone Context:</span>
            <button
              onClick={() => setUseLocalTone(!useLocalTone)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                useLocalTone ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"
              }`}
            >
              {useLocalTone ? "Warm / Local" : "Formal"}
            </button>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6 bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-sm">
            
            {/* Client Meta */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                1. Client Information
              </h2>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Client Name</label>
                <input
                  type="text"
                  placeholder="e.g. Marcus"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Mobile Number (Singapore)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">+65</span>
                  <input
                    type="tel"
                    placeholder="91234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-2.5 text-sm font-mono focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Primary Pain Point / Topic</label>
                <select
                  value={painPoint}
                  onChange={(e) => setPainPoint(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="Retirement Gap">Retirement Planning / Wealth Gap</option>
                  <option value="Newborn Protection">Newborn / Family Protection</option>
                  <option value="Policy Review">Annual Policy Review & Optimization</option>
                  <option value="Wealth Accumulation">Wealth Accumulation / Investments</option>
                  <option value="Mortgage Insurance">Property / Mortgage Risk Coverage</option>
                </select>
              </div>
            </div>

            <hr className="border-slate-800" />

            {/* DISC Selector */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" />
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
                          : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold block">{item.label}</span>
                        <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active DISC Helper Card */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                <div className="font-semibold text-slate-300">{DISC_PROFILES[discType].title}</div>
                <div className="text-slate-400">{DISC_PROFILES[discType].desc}</div>
                <div className="text-emerald-400/90 font-mono text-[11px] pt-1">
                  Target Focus: {DISC_PROFILES[discType].focus}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleGenerate}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/10 transition flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate Tailored Messages</span>
            </button>

          </div>

          {/* Right Column: Output & Action Hub (7 cols) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                3. Generated Text Variations
              </h2>

              {generatedMessages.length === 0 ? (
                <div className="border border-dashed border-slate-800 rounded-2xl p-12 text-center space-y-3 bg-slate-900/20">
                  <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm text-slate-500">
                    Fill in client details and hit <span className="text-slate-300 font-medium">Generate</span> to craft DISC-optimized appointment hooks.
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
                        className={`p-4 rounded-2xl border transition cursor-pointer relative ${
                          isSelected
                            ? "bg-slate-900 border-emerald-500/80 shadow-md shadow-emerald-500/5"
                            : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <p className="text-sm text-slate-200 leading-relaxed font-sans">{msg}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(msg, idx);
                            }}
                            className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800/60 rounded-lg hover:bg-slate-800 transition shrink-0"
                            title="Copy to Clipboard"
                          >
                            {copiedIndex === idx ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {isSelected && (
                          <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                            <ChevronRight className="w-3 h-3" /> Selected for WhatsApp Link / QR
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Action Card (WhatsApp & QR) */}
            {selectedMessage && (
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Send Message to Client</span>
                  </div>
                  {phone && (
                    <span className="text-xs font-mono text-slate-400">To: +65 {phone}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Mobile Direct Launch */}
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
                    className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold text-sm transition ${
                      phone
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                  </a>

                  {/* Desktop QR Modal Toggle */}
                  <button
                    onClick={() => {
                      if (!phone) {
                        alert("Please enter a mobile phone number first!");
                        return;
                      }
                      setShowQR(!showQR);
                    }}
                    className="flex items-center justify-center space-x-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-sm transition border border-slate-700"
                  >
                    <QrCode className="w-4 h-4 text-emerald-400" />
                    <span>{showQR ? "Hide QR Code" : "Scan Mobile QR"}</span>
                  </button>
                </div>

                {/* QR Code Container */}
                {showQR && phone && (
                  <div className="pt-4 border-t border-slate-800 flex flex-col items-center space-y-3 bg-slate-950 p-4 rounded-xl">
                    <div className="p-3 bg-white rounded-xl shadow-lg">
                      <QRCodeSVG value={whatsappUrl} size={150} />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-xs font-medium text-slate-300 flex items-center justify-center gap-1">
                        <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                        Scan with phone camera to open WhatsApp
                      </p>
                      <p className="text-[11px] text-slate-500">
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