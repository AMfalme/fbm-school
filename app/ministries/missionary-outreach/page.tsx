"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function MissionOutreach() {
  // Update page title
  useEffect(() => {
    document.title = "FBM - Missionary Outreach";
  }, []);
  // Central active state controller for the global ministries index matrix
  const [activeTab, setActiveTab] = useState<"education" | "medical" | "theology" | "planting">("education");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-emerald-600 selection:text-white flex flex-col antialiased">
        {/* Global Impact Notification Ticker */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-center px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm z-20">
          📢 Spreading the Gospel • Planting Churches • Teaching the Gospel to All
        </div>

      <Navbar />

      {/* Hero Core Matrix Section */}
      <header className="relative bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
              🎯 Holistic Gospel Transformation • Institutional Foundations
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-none">
              Preaching Christ, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Healing Communities
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Our central framework operates across four core institutional branches—mapping spiritual development, physical healing, and deep theological training onto an integrated gospel infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <button 
                onClick={() => setActiveTab("medical")}
                className="rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white shadow-md hover:bg-slate-800 transition-all"
              >
                Explore Medical Wing
              </button>
              <button 
                onClick={() => setActiveTab("planting")}
                className="rounded-xl bg-white border border-slate-200 px-5 py-3 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-all"
              >
                View Church Plants
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-20 blur-lg" />
              <div className="relative bg-white p-3 rounded-2xl border border-slate-200 shadow-xl">
                <img 
                  src="/church/academic.jpg" 
                  alt="Children engaging with early literacy stories inside an active classroom context" 
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Current Focus Matrix</span>
                  <p className="text-xs text-slate-700 font-semibold mt-0.5">Early Literacy, Reading Readiness &amp; Confessional Discipleship</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24 w-full mx-auto">
        {/* Four Branches Minimal Stat Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Christian Faith Academy", desc: "Fully integrated CBC framework pathways across early years cohorts", color: "border-t-emerald-500 text-emerald-600" },
            { title: "Medical Mission Hospital", desc: "Intense, individualized attention per patient profile and critical wellness wing", color: "border-t-blue-500 text-blue-600" },
            { title: "Bible College", desc: "Every lesson mapped onto a scriptural framework for leadership development", color: "border-t-amber-500 text-amber-600" },
            { title: "Church Planting", desc: "Freedom-based exploration within protective regional structures", color: "border-t-purple-500 text-purple-600" }
          ].map((attr, idx) => (
            <div key={idx} className={`bg-white border-t-4 ${attr.color} border-x border-b border-slate-200/60 p-6 rounded-xl shadow-xs transition-transform hover:-translate-y-0.5`}>
              <h3 className="text-sm font-bold text-slate-900">{attr.title}</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{attr.desc}</p>
            </div>
          ))}
        </section>

        {/* Dynamic Branch Matrix Portal */}
        <section className="space-y-8">
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center p-1 bg-slate-200/80 rounded-xl gap-1">
              {[
                { id: "education", label: "🏛️ Christian Faith Academy", component: "Faith Academy" },
                { id: "medical", label: "🏥 Mission Hospital", component: "Medical Wing" },
                { id: "theology", label: "📜 Bible College", component: "Bible College" },
                { id: "planting", label: "🌱 Church Planting", component: "Church Planting" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-xs min-h-[420px] flex flex-col justify-between">
            {/* TAB CONTENT: SCHOOL */}
            {activeTab === "education" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
                <div className="lg:col-span-5 space-y-4">
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">Primary &amp; Junior Track</span>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Christian Faith Academy</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Delivering a complete 2-6-3-3 Competency Based Curriculum framework from Pre-Primary through Junior School levels. We combine core academic rigors with intense early textual literacy structures.
                  </p>
                  <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">💡 Strategic Literacy Core Focus</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Children explore reading readiness through interactive narrative storytelling and structural phonological exercises designed to bypass mechanical memorization.
                    </p>
                  </div>
                  <div className="pt-2">
                    <a href="/christian-faith-academy" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                      Explore Academy Hub Page &rarr;
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50/50 border border-slate-200 p-5 rounded-xl space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">PP1 &amp; PP2 Frameworks</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Focus on play, socialization, and foundational motor skills for cohorts aged 4-6 years.</p>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-200 p-5 rounded-xl space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Lower Primary (Grades 1-3)</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Focuses heavily on core literacy, mathematical numeracy, and environmental activities.</p>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-200 p-5 rounded-xl space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Upper Primary (Grades 4-6)</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Transitions into broad learning domains using active class-based formative assessments.</p>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-200 p-5 rounded-xl space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Junior School (Grades 7-9)</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Students explore specific talent pathways, career diagnostics, and initial elective specialization.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: MEDICAL */}
            {activeTab === "medical" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
                <div className="lg:col-span-5 space-y-4">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">Compassionate Healthcare</span>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Medical Mission Hospital Wing</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Providing essential clinical interventions, specialized clinical treatment matrices, and maternal-child health infrastructure to underserved regional communities.
                  </p>
                  <blockquote className="text-xs text-slate-600 italic border-l-4 border-blue-500 pl-4 py-2 bg-slate-50 rounded-r-lg font-medium">
                    "Healing the physical body while extending the ultimate hope of the Gospel to every patient passing through our outpatient clusters."
                  </blockquote>
                  <div className="pt-2">
                    <a href="/branches/hospital" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                      Explore Hospital Registry Page &rarr;
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50/50 border border-slate-200 p-5 rounded-xl space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">Outpatient Emergency Care</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">24/7 triaging networks handling acute medical diagnostics and primary stabilization workflows.</p>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-200 p-5 rounded-xl space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">Maternal &amp; Child Health</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Comprehensive antenatal monitoring, safe deliveries, and strict newborn immunization tracking.</p>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-200 p-5 rounded-xl sm:col-span-2 space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">Mobile Village Clinics</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Extending rural healthcare accessibility footprints to remote outposts via structured diagnostic outreach excursions.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: THEOLOGY */}
            {activeTab === "theology" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
                <div className="lg:col-span-5 space-y-4">
                  <span className="bg-amber-50 text-amber-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">Leadership Endowment</span>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Bible College</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Equipping national pastors, church leaders, and lay ministers with rigorous biblical exposition, historical text mechanics, and foundational ministerial methodology.
                  </p>
                  <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">📚 Confessional Discipleship Core</h4>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      Our academic program bypasses secularized matrices, training student cohorts to unpack the organic integrity of standard biblical parameters accurately.
                    </p>
                  </div>
                  <div className="pt-2">
                    <a href="/branches/bible-college" className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">
                      Explore Theological Programs &rarr;
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50/50 border border-slate-200 p-5 rounded-xl space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">Exegetical Theology</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Systematic, verse-by-verse analyses of Old and New Testament scripts within historical contexts.</p>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-200 p-5 rounded-xl space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">Pastoral Ministry Track</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Practical training focusing on church dynamics, administration structures, and personal counseling rules.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CHURCH PLANTING */}
            {activeTab === "planting" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-4">
                  <span className="bg-purple-50 text-purple-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">Gospel Expansion</span>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-2">The Church Planting Network</h3>
                  <p className="text-xs text-slate-500 mt-1">Deploying baseline integration lifecycles to cultivate healthy, self-sustaining regional congregations.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { phase: "Phase 01", title: "Document & Scout Mapping", desc: "Evaluating specific local socio-economic characteristics and language boundaries via our central office to locate optimal target sectors." },
                    { phase: "Phase 02", title: "Parental & Elder Mobilization", desc: "Cultivating mutual cross-structural alignment regarding institutional confessional standards through deliberate local community interface cycles." },
                    { phase: "Phase 03", title: "Baseline Fellowship Placement", desc: "Establishing pressure-free devotional evaluations and small-group prayer hubs before scaling into full structural execution tracks." }
                  ].map((proc, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest block">{proc.phase}</span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">{proc.title}</h4>
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{proc.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-950 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
                  <div className="text-center sm:text-left space-y-0.5">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Want to join our regional network coordinates?</span>
                    <p className="text-xs text-slate-300">Download our complete field deployment blueprint catalog and mission support documents instantly.</p>
                  </div>
                  <a href="/admissions-pack.pdf" className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-all shrink-0 shadow-sm">
                    📥 Download Mission Briefing
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Clean Static Gallery Layout */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Field Operations &amp; Campus Environments</h2>
            <p className="text-xs text-slate-500">Take an inside look at our structural outreach environments, active clinic networks, and educational communities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { src: "/school/playground.jpeg", title: "Active Community Engagement", desc: "Structured play, baseline physical execution, and targeted community field health programs are prioritized weekly." },
              { src: "/school/playground 1.jpeg", title: "Insulated, Safe Environments", desc: "A wholesome atmosphere where emerging leadership cohorts develop securely, free from competing ideological parameters." }
            ].map((img, idx) => (
              <div key={idx} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-hidden bg-slate-100">
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 border-t border-slate-100">
                  <h4 className="font-bold text-sm text-slate-900">{img.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Module */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 max-w-4xl mx-auto text-center shadow-xl space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 ring-1 ring-inset ring-amber-500/20">
              📅 Current Deployments are capped based on strict structural density limitations
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight">Support Our Core Institutional Infrastructures</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Don't compromise during this critical global developmental window. Partner with an intentional community of Christian strategists driving true structural excellence across the fields.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-3 justify-center pt-2">
            <button 
              onClick={() => setActiveTab("planting")}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-5 text-xs font-bold text-white hover:bg-emerald-500 transition-all shadow-md"
            >
              Review Active Project Details
            </button>
            <a href="mailto:admissions@faithacademy.com" className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-xs px-5 text-xs font-bold text-white hover:bg-white/20 transition-all">
              📧 Contact Central Missions Office
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

