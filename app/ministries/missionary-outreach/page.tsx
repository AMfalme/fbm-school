"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function FaithAcademy() {
  // Central active state controller for the section tab navigation matrix
  const [activeTab, setActiveTab] = useState<"academics" | "philosophy" | "admissions">("academics");

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a] flex flex-col">
      {/* Dynamic Status Alert Ticker */}
      <div className="bg-[#003d7a] text-center px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white z-50">
        📣 NOW ENROLLING FOR THE CURRENT TERM: PP1, PP2, &amp; Grade 1 (CBC Track)
      </div>

      <Navbar />

      <main className="flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-20 sm:space-y-28 w-full">
        {/* ================= HERO INTRODUCTORY HERO NODE ================= */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
              📖 Nurturing Mind &amp; Spirit • Early Years Foundation
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.1]">
              Where Biblical Truth <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055b8] to-[#16a34a]">
                Meets Academic Excellence
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              Christian Faith Academy delivers an enriched Competency Based Curriculum (CBC) designed to foster deep personal discovery, rigorous foundational literacy, and an unwavering love for Christ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => setActiveTab("admissions")}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#003d7a] px-6 text-xs font-bold text-white hover:bg-blue-800 transition-all shadow-sm"
              >
                Begin Application Process
              </button>
              <button 
                onClick={() => setActiveTab("philosophy")}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Explore Freedom-Based Learning
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-[32px] opacity-10 blur-xl"></div>
            <div className="relative border border-slate-100 bg-white p-4 rounded-[32px] shadow-md">
              <img 
                src="https://christchurchcressage.co.uk/wp-content/uploads/2026/01/CCS-119-scaled-450x350.jpg" 
                alt="Children engaging with early literacy stories inside an active classroom library context" 
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">Current Focus Matrix</span>
                <p className="text-xs text-slate-700 font-bold mt-1">Early Literacy, Reading Readiness &amp; Confessional Discipleship</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CORE OPERATIONAL ATTRIBUTES SYSTEM ================= */}
        <section className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-[40px] text-white p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:gap-y-8 lg:divide-x divide-slate-800 text-center">
            <div className="pt-4 sm:pt-0">
              <span className="text-3xl font-black text-amber-400 block">CBC Compliant</span>
              <p className="text-xs text-slate-300 font-medium mt-1">Fully integrated pathways across early years cohorts</p>
            </div>
            <div className="pt-6 sm:pt-0 lg:pl-4">
              <span className="text-3xl font-black text-emerald-400 block">Small Cohorts</span>
              <p className="text-xs text-slate-300 font-medium mt-1">Intense, individualized attention per child profile</p>
            </div>
            <div className="pt-6 sm:pt-0 lg:pl-4">
              <span className="text-3xl font-black text-blue-400 block">Christ-Centered</span>
              <p className="text-xs text-slate-300 font-medium mt-1">Every lesson mapped onto a scriptural framework</p>
            </div>
            <div className="pt-6 sm:pt-0 lg:pl-4">
              <span className="text-3xl font-black text-purple-400 block">Balanced Discovery</span>
              <p className="text-xs text-slate-300 font-medium mt-1">Freedom-based exploration within protective structures</p>
            </div>
          </div>
        </section>

        {/* ================= TABBED INFORMATION PORTAL ENGINE ================= */}
        <section className="bg-white border border-slate-100 rounded-[40px] p-6 sm:p-10 shadow-sm space-y-10">
          
          {/* Tab Navigation Controls Bar */}
          <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
            <button
              onClick={() => setActiveTab("academics")}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all focus:outline-none ${
                activeTab === "academics" 
                  ? "bg-[#003d7a] text-white shadow-sm" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              🏛️ Academic Classes &amp; Literacy
            </button>
            <button
              onClick={() => setActiveTab("philosophy")}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all focus:outline-none ${
                activeTab === "philosophy" 
                  ? "bg-[#003d7a] text-white shadow-sm" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              🌱 Freedom-Based Philosophy
            </button>
            <button
              onClick={() => setActiveTab("admissions")}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all focus:outline-none ${
                activeTab === "admissions" 
                  ? "bg-[#003d7a] text-white shadow-sm" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              📝 Admissions &amp; Enrollment Process
            </button>
          </div>

          {/* TAB CONTENT: ACADEMICS & CLASSES */}
          {activeTab === "academics" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-2xl font-black text-slate-950 tracking-tight">Active Early Years CBC Cohorts</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Our core primary architecture supports foundational developmental tracks. We deliver explicit instructional focus to guarantee that basic cognitive, motor, and lexical milestones are secured efficiently.
                </p>
                <div className="p-4 bg-amber-50/50 border border-amber-200/60 rounded-2xl space-y-2">
                  <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">💡 Strategic Literacy Core Focus</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Early Literacy &amp; Language Development:</strong> We bypass mechanical memorization. Children learn reading readiness through interactive narrative storytelling, phonological awareness exercises, and structural language exploration designed to unlock early textual confidence.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FFFDF9] border border-slate-100 p-5 rounded-2xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">Level 01</span>
                    <span className="text-xs font-bold text-slate-400">Ages 4-5</span>
                  </div>
                  <h4 className="font-bold text-slate-950 text-base">Pre-Primary 1 (PP1)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Introduces foundational social-emotional frameworks, physical coordination exercises, and introductory math concepts alongside phonetic awareness routines.
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-600">
                    📚 Focus: Auditory recognition &amp; baseline motor control
                  </div>
                </div>

                <div className="bg-[#FFFDF9] border border-slate-100 p-5 rounded-2xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">Level 02</span>
                    <span className="text-xs font-bold text-slate-400">Ages 5-6</span>
                  </div>
                  <h4 className="font-bold text-slate-950 text-base">Pre-Primary 2 (PP2)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Advances analytical reasoning, conversational proficiency, and sentence formation. Prepares children rigorously for immediate entry into Grade 1 primary formats.
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-600">
                    📖 Focus: Reading readiness &amp; structured logic tracking
                  </div>
                </div>

                <div className="bg-[#FFFDF9] border border-slate-100 p-5 rounded-2xl space-y-3 shadow-xs sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-purple-50 text-purple-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">Enriched Tracks</span>
                    <span className="text-xs font-bold text-slate-400">All Levels</span>
                  </div>
                  <h4 className="font-bold text-slate-950 text-base">Additional Co-Curricular Enrichment</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Alongside standard CBC mandates, our students rotate through foundational music rhythmics, scripture memorization modules, creative arts exploration, and basic agricultural stewardship lessons.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: PHILOSOPHY */}
          {activeTab === "philosophy" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-2xl font-black text-slate-950 tracking-tight">Christian Freedom-Based Learning</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  True education recognizes that every child is an individual created in the image of God. We explicitly avoid industrial, rigid, factory-style schooling environments. 
                </p>
                <div>
                  <p className="text-xs text-slate-700 italic border-l-2 border-[#003d7a] pl-3 py-1 font-medium bg-slate-50">
                    "Where the Spirit of the Lord is, there is liberty. We apply this principle to learning by guiding children to explore creation without fear of failure."
                  </p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Our model builds deep internal self-governance. We combine clear biblical moral absolutes with individual agency, training children to take personal responsibility for their attention, tasks, and actions.
                </p>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3">
                  <span className="text-xl shrink-0">🛡️</span>
                  <div>
                    <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider">Internal Discipline vs. External Fear</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">Students are taught the intrinsic logic of right actions based on love for God, replacing punitive performance anxiety with true character formation.</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3">
                  <span className="text-xl shrink-0">🎨</span>
                  <div>
                    <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider">Independent Inquiry Frameworks</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">We grant children the tactical space to ask complex questions, engage heavily with object lessons, and investigate natural science concepts first-hand.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: ADMISSIONS */}
          {activeTab === "admissions" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-2xl font-black text-slate-950 tracking-tight">The Application &amp; Integration Lifecycle</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">We maintain an intentional, step-by-step admissions policy to ensure complete institutional alignment with families.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 relative">
                  <span className="text-xs font-black text-[#003d7a] block">Step 01</span>
                  <h4 className="font-bold text-slate-950 text-sm mt-1">Document Submission</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Provide the child's official birth registration copy, historical clinic tracking immunization data, and completed application files via our central office.
                  </p>
                </div>

                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 relative">
                  <span className="text-xs font-black text-[#003d7a] block">Step 02</span>
                  <h4 className="font-bold text-slate-950 text-sm mt-1">Parental Interview Matrix</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Both parents meet with the administrative board to confirm mutual structural alignment regarding our confessional standards and freedom-based educational philosophies.
                  </p>
                </div>

                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 relative">
                  <span className="text-xs font-black text-[#003d7a] block">Step 03</span>
                  <h4 className="font-bold text-slate-950 text-sm mt-1">Placement Consultation</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    A short, pressure-free evaluation helps determine the student's current baseline literacy and motor coordination to guarantee ideal assignment within PP1 or PP2 classes.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-black text-[#003d7a] uppercase block">Ready to proceed?</span>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">Download our complete fee catalog, uniform list, and enrollment documents packet instantly.</p>
                </div>
                <a href="/admissions-pack.pdf" className="inline-flex h-10 items-center justify-center rounded-xl bg-[#003d7a] px-4 text-xs font-bold text-white hover:bg-blue-800 transition-all shrink-0 shadow-xs">
                  📥 Download Admissions Pack
                </a>
              </div>
            </div>
          )}
        </section>

        {/* ================= EXTRA GENERAL CAMPUS LIFE CAROUSEL ================= */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Life at Christian Faith Academy</h2>
            <p className="text-xs text-slate-500 font-medium">Take a look inside our intentional early learning environments, secure recreation zones, and community discovery spaces.</p>
          </div>

          {/* Stacked programmatic imagery components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-xs bg-white p-3">
              <img 
                src="https://media.istockphoto.com/id/1470158757/photo/group-of-multi-cultural-elementary-school-pupils-running-along-walkway-outdoors-at-school.jpg?s=612x612&w=0&k=20&c=yKyzqXFhKGYApsLCvFuEILECNxkfqcA3WftPp3TGMKI=" 
                alt="Happy elementary school children running along a walkway outdoors in a school yard" 
                className="w-full h-56 object-cover rounded-xl"
              />
              <div className="p-3">
                <h4 className="font-bold text-sm text-slate-950">Active Outdoor &amp; Physical Coordination</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Structured play and gross motor exercises are prioritized daily to support optimal physical development.</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-xs bg-white p-3">
              <div className="w-full h-56 bg-gradient-to-br from-emerald-800 to-teal-900 rounded-xl flex flex-col items-center justify-center p-6 text-center text-white relative">
                <span className="text-3xl mb-2">🌿</span>
                <h4 className="font-bold text-sm">Spiritual Safeguards &amp; Community Care</h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed max-w-xs">
                  Our learning spaces are heavily secured, fully staff-supervised, and intentionally insulated from secular agendas. We protect your child's moral and emotional environment completely.
                </p>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-sm text-slate-950">Safe, Insulated Environments</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">A wholesome atmosphere where young minds grow securely, away from ideological distractions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CORE CALL TO ACTION MODULE ================= */}
        <section className="bg-amber-50 border border-amber-200/50 rounded-[40px] p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-black text-amber-800 uppercase tracking-widest block">📅 Space is strictly limited due to caps on class density</span>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">Secure Your Child's Academic Foundation</h3>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Don't compromise during the most critical developmental window of your child's life. Join an intentional community of Christian parents tracking towards true excellence.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
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