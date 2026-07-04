"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MinistryGallery from "../../components/MinistryGallery";

export default function MissionOutreach() {
  // Update page title
  useEffect(() => {
    document.title = "FBM - Missionary Outreach";
  }, []);
  // Central active state controller for the global ministries index matrix
  const [activeTab, setActiveTab] = useState<"education" | "medical" | "theology" | "planting">("education");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-emerald-600 selection:text-white flex flex-col antialiased">
      <Navbar />

      {/* Hero Core Matrix Section */}
      <header className="relative bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
              ⚜️ The Great Commission • Matthew 28:19-20
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-none">
              Go. Make Disciples. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Plant Self-Sustaining Churches
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              We leave behind temporary aid to train local men and women to plant independent, self-governing, self-supporting, and self-propagating churches that multiply within their own cultures.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
               <button 
                onClick={() => setActiveTab("medical")}
                className="rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white shadow-md hover:bg-slate-800 transition-all"
              >
                Explore Medical Ministry
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
                  <p className="text-xs text-slate-700 font-semibold mt-0.5">Early Literacy, Reading Readiness & Confessional Discipleship</p>
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
            { title: "Christian Faith Academy", desc: "From Pre-Primary to Junior School with academic excellence rooted in biblical truth", color: "border-t-emerald-500 text-emerald-600" },
            { title: "Medical Mission Hospital", desc: "Healthcare as a divine appointment to share the Gospel with every patient", color: "border-t-blue-500 text-blue-600" },
            { title: "Bible College", desc: "Equipping local pastors with solid biblical teaching and sound theology", color: "border-t-amber-500 text-amber-600" },
              { title: "Church Planting", desc: "Training indigenous leaders to plant self-sustaining churches in their own cultures", color: "border-t-purple-500 text-purple-600" }
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
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">Pre-Primary Through Junior School</span>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Christian Faith Academy</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Foundational education from Pre-Primary to Junior School, integrating academic excellence with uncompromised biblical truth.
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
                    <h4 className="font-bold text-slate-900 text-sm">PP1 & PP2 Frameworks</h4>
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
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">Healing & Evangelism</span>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Mission Hospital</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We utilize our healthcare services, deeds, and actions as a divine appointment to evangelize, witness, and share the life-changing Gospel with every patient who walks through our doors.
                  </p>
                  <div className="pt-2">
                    <a href="/hospital-project" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
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
                    <h4 className="font-bold text-slate-900 text-sm">Maternal & Child Health</h4>
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
                  <span className="bg-amber-50 text-amber-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">Equipping Leaders</span>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Bible College</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Empowering and training local pastors and church leaders with solid biblical teaching, sound theology, and a deep knowledge of the Word of God so they can successfully reach their communities for Christ.
                  </p>
                  <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">📚 Confessional Discipleship Core</h4>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      Our academic program bypasses secularized matrices, training student cohorts to unpack the organic integrity of standard biblical parameters accurately.
                    </p>
                  </div>
                  <div className="pt-2">
                    <a href="/bible-college" className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">
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
                  <p className="text-xs text-slate-500 mt-1">Training local men and women to plant self-governing, self-supporting, and self-propagating independent churches that multiply within their own cultures.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { phase: "Phase 01", title: "Train Indigenous Leaders", desc: "Equipping local men and women with biblical knowledge and ministry skills at our Bible College to lead their own people." },
                    { phase: "Phase 02", title: "Plant Local Churches", desc: "Supporting trained leaders as they establish independent Baptist churches in their own communities and languages." },
                    { phase: "Phase 03", title: "Multiply & Replicate", desc: "Each new church becomes self-governing, self-supporting, and self-propagating, sending out its own missionaries." }
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
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Join Our Community of Faith</span>
                    <p className="text-xs text-slate-300">Download our mission brochure and learn how you can partner with us in reaching more communities with the Gospel.</p>
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
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Our Ministry in Action</h2>
            <p className="text-xs text-slate-500">Witness the impact of our evangelism, discipleship, and community transformation across Kenya and beyond.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
             
  {
    src: "/church/mission.jpg",
    title: "Bible College Graduation",
    desc: "Celebrating graduates equipped with biblical knowledge, ministry training, and a passion to serve Christ faithfully."
  },
  {
    src: "/church/mgt.png",
    title: "Mission Outreach & Community Impact",
    desc: "Sharing the love of Christ through evangelism, discipleship, prayer, and compassionate ministry within local communities."
  }
].map((img, idx) => (
              <div key={idx} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-hidden bg-slate-100">
                  <img
                    src={img.src}
                    alt={img.title}
className="w-full h-64 object-cover object-[50%_30%]"                  />
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
              ⚜️ Help Us Reach More Communities
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight">Support Our Mission Projects</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Partner with us as we obey the Great Commission, train indigenous leaders, and plant self-sustaining churches across Kenya and beyond.
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

      {/* Gallery Section */}
      <MinistryGallery
        categories={["church-community", "mission-projects"]}
        title="Mission Outreach Gallery"
        subtitle="Witness the impact of our evangelism and community development initiatives across Kenya and beyond."
        ministrySlug="missionary-outreach"
      />

      <Footer />
    </div>
  );
}