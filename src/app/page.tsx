export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-8 md:p-24 font-sans">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <header className="space-y-2 border-b border-slate-800 pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Shun Bin</h1>
          <p className="text-xl text-emerald-400 font-mono">Software Engineer | Java & Distributed Systems</p>
        </header>

        {/* Bio / Focus */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">Focus & Architecture</h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            Specializing in high-throughput enterprise backend development, microservices architecture, and event-driven data streaming.
          </p>
        </section>

        {/* Placeholder Projects Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">Featured Systems (Coming Soon)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition">
              <h3 className="font-bold text-slate-200">Event-Driven Core Banking</h3>
              <p className="text-sm text-slate-400 mt-1">Spring Boot • Kafka • PostgreSQL</p>
            </div>
            <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition">
              <h3 className="font-bold text-slate-200">Market AI Analytics Engine</h3>
              <p className="text-sm text-slate-400 mt-1">Spring AI • Gemini API • Microservices</p>
            </div>
          </div>
        </section>

        {/* Footer Links */}
        <footer className="pt-8 border-t border-slate-800 flex gap-6 text-slate-400 text-sm font-mono">
          <a href="https://github.com" target="_blank" className="hover:text-emerald-400 transition">GitHub</a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-emerald-400 transition">LinkedIn</a>
        </footer>
      </div>
    </main>
  );
}