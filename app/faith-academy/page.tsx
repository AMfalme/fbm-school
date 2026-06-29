"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Update page title
useEffect(() => {
  document.title = "FBM - Christian Faith Academy";
}, []);

export default function FaithAcademy() {
  const [activeTab, setActiveTab] = useState<"academics" | "philosophy" | "admissions">("academics");

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a] flex flex-col antialiased">
      {/* Dynamic Status Alert Ticker */}
      <div className="bg-[#003d7a] text-center px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white z-20 shadow-sm">
        📣 Now Enrolling for the Current Term: PP1, PP2, &amp; Grade 1 (CBC Track)
      </div>

      <Navbar />

      {/* Hero Section */}
      <header className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/10 uppercase tracking-wider">
            📖 Nurturing Mind &amp; Spirit • Early Years Foundation
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-none max-w-4xl mx-auto">
            Where Biblical Truth <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055b8] to-[#16a34a]">
              Meets Academic Excellence
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Christian Faith Academy delivers an enriched Competency Based Curriculum (CBC) designed to foster deep personal discovery, rigorous foundational literacy, and an unwavering love for Christ.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button 
              onClick={() => setActiveTab("admissions")}
              className="rounded-xl bg-[#003d7a] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-800 transition-all"
            >
              Begin Application Process
            </button>
            <button 
              onClick={() => setActiveTab("philosophy")}
              className="rounded-xl bg-white border border-slate-200 px-5 py-3 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-all"
            >
              Explore Freedom-Based Learning
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24 w-full mx-auto">
        {/* Core Attributes Matrix */}
        <section className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl text-white p-8 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-800 text-center">
            <div className="pt-2 sm:pt-0">
              <span className="text-2xl font-black text-amber-400 block">CBC Compliant</span>
              <p className="text-[11px] text-slate-300 font-medium mt-1">Fully integrated pathways across early years cohorts</p>
            </div>
            <div className="pt-4 sm:pt-0 lg:pl-4">
              <span className="text-2xl font-black text-emerald-400 block">Small Cohorts</span>
              <p className="text-[11px] text-slate-300 font-medium mt-1">Intense, individualized attention per child profile</p>
            </div>
            <div className="pt-4 sm:pt-0 lg:pl-4">
              <span className="text-2xl font-black text-blue-400 block">Christ-Centered</span>
              <p className="text-[11px] text-slate-300 font-medium mt-1">Every lesson mapped onto a scriptural framework</p>
            </div>
            <div className="pt-4 sm:pt-0 lg:pl-4">
              <span className="text-2xl font-black text-purple-400 block">Balanced Discovery</span>
              <p className="text-[11px] text-slate-300 font-medium mt-1">Freedom-based exploration within protective structures</p>
            </div>
          </div>
        </section>

        {/* Tabbed Information Panel */}
        <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          {/* Controls */}
          <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
            {[
              { id: "academics", label: "🏛️ Academic Classes & Literacy" },
              { id: "philosophy", label: "🌱 Freedom-Based Philosophy" },
              { id: "admissions", label: "📝 Admissions & Enrollment" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  activeTab === tab.id 
                    ? "bg-[#003d7a] text-white shadow-sm" 
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Academics */}
          {activeTab === "academics" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-150">
              <div className="lg:col-span-4 space-y-4">
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">2-6-3-3 Education Structure</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  We offer comprehensive education from Pre-Primary through Junior School, following the Competency Based Curriculum (CBC) framework from PP1 through Grade 9.
                </p>
                <div className="p-4 bg-amber-50/50 border border-amber-200/60 rounded-xl space-y-1">
                  <h4 className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">💡 Strategic Literacy Core Focus</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    We bypass mechanical memorization, implementing phonological awareness and interactive narrative storytelling to unlock authentic early textual confidence.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { tag: "Pre-Primary", duration: "2 Years", title: "PP1 & PP2", desc: "Focuses on play-based learning, social socialization, and foundational motor development. Ages 4-6.", focus: "Play & socialization" },
                  { tag: "Lower Primary", duration: "Grades 1-3", title: "Grades 1, 2, & 3", desc: "Solidifies foundational literacy, core numeracy, and environmental exploration skills.", focus: "Literacy & numeracy" },
                  { tag: "Upper Primary", duration: "Grades 4-6", title: "Grades 4, 5, & 6", desc: "Transitions into broader learning areas utilizing comprehensive class-based formative assessments.", focus: "Formative tracking" },
                  { tag: "Junior School", duration: "Grades 7-9", title: "Grades 7, 8, & 9", desc: "Identifies explicit technical talents, mental gifts, and initial elective career exploration streams.", focus: "Talent identification" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#FFFDF9] border border-slate-200/60 p-5 rounded-xl space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="bg-slate-100 text-slate-700 text-[9px] font-bold uppercase px-2 py-0.5 rounded-md">{item.tag}</span>
                      <span className="text-[11px] font-medium text-slate-400">{item.duration}</span>
                    </div>
                    <h4 className="font-bold text-slate-950 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    <div className="pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-600">
                      🎯 Target: {item.focus}
                    </div>
                  </div>
                ))}
                <div className="bg-[#FFFDF9] border border-slate-200/60 p-5 rounded-xl space-y-2 shadow-xs sm:col-span-2">
                  <span className="bg-rose-50 text-rose-700 text-[9px] font-bold uppercase px-2 py-0.5 rounded-md">Enriched Tracks</span>
                  <h4 className="font-bold text-slate-950 text-sm">Additional Co-Curricular Enrichment</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Alongside standard CBC mandates, students participate in scripture memorization modules, foundational music rhythmics, creative arts exploration, and introductory agricultural stewardship lessons.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Philosophy */}
          {activeTab === "philosophy" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-150">
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">Christian Freedom-Based Learning</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  True education avoids rigid, production-line factory schooling. We combine fixed biblical standards with structural individual agency, fostering internal self-governance.
                </p>
                <blockquote className="text-xs text-slate-700 italic border-l-2 border-[#003d7a] pl-3 py-1 font-medium bg-slate-50">
                  "Where the Spirit of the Lord is, there is liberty. We apply this principle to learning by guiding children to explore creation without fear of failure."
                </blockquote>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex gap-3">
                  <span className="text-lg shrink-0">🛡️</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">Internal Discipline</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">Students are taught actions motivated by a clear love for God, replacing punitive performance anxiety with genuine character formation.</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex gap-3">
                  <span className="text-lg shrink-0">🎨</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">Independent Inquiry</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">We grant children safe spaces to ask deep questions, engage with object lessons, and investigate concepts first-hand.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Admissions */}
          {activeTab === "admissions" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">The Application Lifecycle</h3>
                <p className="text-xs text-slate-500 font-medium">We maintain a clear three-step onboarding framework to guarantee baseline pedagogical alignment.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { step: "Step 01", title: "Document Submission", desc: "Submit the official birth registration certificate copy, medical clinic immunization history, and filled application papers to our office." },
                  { step: "Step 02", title: "Parent Interview", desc: "Both parents meet our board to confirm intentional structural alignment regarding educational expectations and moral philosophies." },
                  { step: "Step 03", title: "Placement Consultation", desc: "A pressure-free evaluation helps verify reading readiness and motor coordination levels to determine proper PP1 or PP2 grouping." }
                ].map((phase, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-5 rounded-xl border border-slate-200/60">
                    <span className="text-xs font-bold text-[#003d7a] block">{phase.step}</span>
                    <h4 className="font-bold text-slate-950 text-sm mt-1">{phase.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{phase.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200/50 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold text-[#003d7a] uppercase block">Ready to proceed?</span>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">Download our complete fee catalog, uniform requirements, and enrollment packet documents instantly.</p>
                </div>
                <a href="/admissions-pack.pdf" className="inline-flex h-10 items-center justify-center rounded-xl bg-[#003d7a] px-4 text-xs font-bold text-white hover:bg-blue-800 transition-all shrink-0 shadow-xs">
                  📥 Download Admissions Pack
                </a>
              </div>
            </div>
          )}
        </section>

        {/* Bible College Gallery & Graduate Showcase */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
              Equipping Leaders for Kingdom Service
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">Faith Bible College in Action</h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">Witness the transformative journey of our graduates—from intensive classroom discipleship to deployed field ministry across East Africa.</p>
          </div>

          {/* Graduate Success Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 p-6 rounded-xl text-center">
              <span className="text-3xl font-black text-amber-700 block">50+</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1 uppercase tracking-wider">Graduates Deployed</h4>
              <p className="text-[11px] text-slate-600 mt-1">Active in church planting & pastoral ministry</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60 p-6 rounded-xl text-center">
              <span className="text-3xl font-black text-emerald-700 block">12</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1 uppercase tracking-wider">Native Churches Planted</h4>
              <p className="text-[11px] text-slate-600 mt-1">Led directly by our alumni network</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60 p-6 rounded-xl text-center">
              <span className="text-3xl font-black text-blue-700 block">100%</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1 uppercase tracking-wider">Confessional Alignment</h4>
              <p className="text-[11px] text-slate-600 mt-1">1689 LBCF doctrinal standard maintained</p>
            </div>
          </div>

          {/* Clean Static Gallery Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-hidden bg-slate-100">
                <img 
                  src="/bible-college/bible class.jpeg" 
                  alt="Students in intensive Bible study session" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 border-t border-slate-100">
                <h4 className="font-bold text-sm text-slate-900">Classroom Discipleship</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Graduate cohorts engage in verse-by-verse exposition, text-critical analysis, and historical context mapping of both Testaments.</p>
              </div>
            </div>

            <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-hidden bg-slate-100">
                <img 
                  src="/bible-college/bible college class.jpg" 
                  alt="Pastoral ministry practical training" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 border-t border-slate-100">
                <h4 className="font-bold text-sm text-slate-900">Pastoral Mentorship Cycles</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Students shadow experienced elders through hospital visits, home fellowships, and crisis counseling scenarios.</p>
              </div>
            </div>
          </div>

          {/* Alumni Impact Stories */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white max-w-5xl mx-auto">
            <div className="text-center space-y-3 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">From Classroom to Calling</span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Alumni Now Leading Indigenous Works</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">EO</div>
                  <div>
                    <h4 className="font-bold text-sm">Pastor Emmanuel O.</h4>
                    <p className="text-[10px] text-slate-300">Class of 2023 • Kakamega</p>
                  </div>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">"The exegetical rigor trained me to preach Christ expositionally. Today I lead a congregation of 65+ souls with complete indigenous autonomy."</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">IK</div>
                  <div>
                    <h4 className="font-bold text-sm">Evangelist Isaac K.</h4>
                    <p className="text-[10px] text-slate-300">Class of 2024 • Narok</p>
                  </div>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">"The practical ministry cycles prepared me for nomadic outreach. We've seen 12 baptisms and 45 children in catechism within our first year."</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">TM</div>
                  <div>
                    <h4 className="font-bold text-sm">Pastor Titus M.</h4>
                    <p className="text-[10px] text-slate-300">Alumni Network • Kilifi</p>
                  </div>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">"The doctrinal consolidation modules equipped me to protect new converts from syncretistic false teachings on the coast."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Module */}
        <section className="bg-amber-50 border border-amber-200/50 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">📅 Space is strictly limited to support cohort density caps</span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Secure Your Child's Academic Foundation</h3>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Don't compromise during the most critical developmental window of your child's early life. Join an intentional community of Christian parents tracking toward true excellence.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <button 
              onClick={() => setActiveTab("admissions")}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#003d7a] px-5 text-xs font-bold text-white hover:bg-blue-800 transition-all shadow-xs"
            >
              Review Application Details
            </button>
            <a href="mailto:admissions@faithacademy.com" className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all">
              📧 Schedule an In-Person Campus Tour
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}