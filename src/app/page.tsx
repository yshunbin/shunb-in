export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 md:p-16 font-sans">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">Shun Bin Yeoh</h1>
            <p className="text-lg text-emerald-400 font-mono mt-1">Software Engineer | Java & Distributed Systems</p>
          </div>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded transition text-sm"
          >
            <span>Download Resume (PDF)</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          </a>
        </header>

        {/* Core Technical Skills */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono">Core Competencies</h2>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {["Java 17", "Spring Boot", "PostgreSQL", "Docker", "Git", "Python", "SQL", "Bash", "SQLite", "PowerShell", "Dataiku"].map((skill) => (
              <span key={skill} className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Featured Systems / Projects */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono">Featured Technical Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100">Event-Driven Core Banking & Analytics</h3>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                  Microservices
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Architected two decoupled services communicating over Kafka to evaluate real-time portfolio risk using Gemini AI.
              </p>
              <div className="text-[11px] font-mono text-slate-500 pt-1">
                Java 17 • Spring Boot • Kafka • PostgreSQL • Docker
              </div>
            </div>

            <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100">Task Tracking Web Engine</h3>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                  Personal Project
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Full-stack task manager built with full CRUD execution, database persistence, and containerized deployments[cite: 1].
              </p>
              <div className="text-[11px] font-mono text-slate-500 pt-1">
                Java • Spring • PostgreSQL • React • Docker[cite: 1]
              </div>
            </div>

          </div>
        </section>

        {/* Work Experience Timeline */}
        <section className="space-y-6">
          <h2 className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono">Work Experience</h2>
          
          <div className="space-y-6 border-l-2 border-slate-800 pl-4 md:pl-6">
            
            {/* DSTA */}
            <div className="space-y-1 relative">
              <div className="absolute -left-[21px] md:-left-[29px] top-1.5 w-2.5 h-2.5 bg-emerald-400 rounded-full"></div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-100">Defence Science and Technology Agency</h3>
                <span className="text-xs font-mono text-slate-400">Jan 2026 – Present</span>
              </div>
              <p className="text-xs text-emerald-400 font-mono">Software Engineer</p>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1 leading-relaxed">
                <li>Developed server monitoring tools in Java 17 and Spring Boot with SQLite, leveraging PowerShell probes to automate software asset changes and backup alert mechanisms[cite: 1].</li>
                <li>Trained AI agents and Dataiku dashboards to analyze complex data file trends and automate policy comparisons for compliance stakeholders[cite: 1].</li>
              </ul>
            </div>

            {/* HPE */}
            <div className="space-y-1 relative">
              <div className="absolute -left-[21px] md:-left-[29px] top-1.5 w-2.5 h-2.5 bg-slate-700 rounded-full"></div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-100">Hewlett Packard Enterprise</h3>
                <span className="text-xs font-mono text-slate-400">Jan 2023 – Jan 2025</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Software Engineer / Software Engineer Intern</p>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1 leading-relaxed">
                <li>Developed real-time network automation scripts for Aruba (AOS-CX) utilizing SNMP, CLI, and API calls to drive data collection and configuration management[cite: 1].</li>
                <li>Automated unit testing frameworks in pre-prod environments to evaluate network performance and minimize operational support overhead[cite: 1].</li>
              </ul>
            </div>

            {/* Acronis */}
            <div className="space-y-1 relative">
              <div className="absolute -left-[21px] md:-left-[29px] top-1.5 w-2.5 h-2.5 bg-slate-700 rounded-full"></div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-100">Acronis</h3>
                <span className="text-xs font-mono text-slate-400">Jun 2022 – Dec 2022</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Software Engineer Intern</p>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1 leading-relaxed">
                <li>Implemented ELK stack pipeline to index and search backup metadata, streamlining large-scale database data retrieval[cite: 1].</li>
                <li>Deployed hardware-encrypted GCP infrastructure with Docker containers in confidential computing KVM environments[cite: 1].</li>
              </ul>
            </div>

            {/* Pixium & Hubble */}
            <div className="space-y-1 relative">
              <div className="absolute -left-[21px] md:-left-[29px] top-1.5 w-2.5 h-2.5 bg-slate-700 rounded-full"></div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-100">Pixium Digital & Hubble</h3>
                <span className="text-xs font-mono text-slate-400">Aug 2021 – May 2022</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Software Engineer Internships</p>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Migrated monolithic backend data systems to Ruby on Rails microservices on K8s[cite: 1], and built full-stack web application tools with PostgreSQL and AWS cloud infrastructure[cite: 1].
              </p>
            </div>

          </div>
        </section>

        {/* Education */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono">Education</h2>
          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Nanyang Technological University</h3>
              <p className="text-xs text-slate-400">Bachelor of Computer Science (Elective Focus in AI & Machine Learning)</p>
            </div>
            <span className="text-xs font-mono text-slate-400">2019 – 2023</span>
          </div>
        </section>

        {/* Footer Links */}
        <footer className="pt-8 border-t border-slate-800 flex justify-between items-center text-slate-400 text-xs font-mono">
          <div className="flex gap-6">
            <a href="https://github.com/yshunbin" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition">LinkedIn</a>
          </div>
          <span>yshunbin@gmail.com</span>
        </footer>

      </div>
    </main>
  );
}