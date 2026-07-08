"use client";

import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MinistryGallery from "../../components/MinistryGallery";

export default function BibleCollegeMission() {
  useEffect(() => {
    document.title = "FBM - Freedom Baptist Mission - Bible College";
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a]">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-20 sm:space-y-28">
        <Navbar />

        {/* ================= HERO SECTION ================= */}
        <section className="bg-slate-900 text-white rounded-[32px] py-16 sm:py-20 px-6 text-center shadow-lg relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold tracking-wider uppercase text-xs px-4 py-1.5 rounded-full">
              Freedom Baptist Mission • Academic Division
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
              Freedom Baptist Bible College
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
              Empowering and training local pastors and church leaders with solid biblical teaching, sound theology, and a deep knowledge of the Word of God so they can successfully reach their communities for Christ.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#mission" className="inline-flex h-12 items-center justify-center rounded-xl bg-amber-500 px-6 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-all shadow-sm">
                Explore Our Mission
              </a>
              <a href="#gallery" className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 px-6 text-xs font-bold text-white hover:bg-slate-800 transition-all">
                View Gallery
              </a>
            </div>
          </div>
        </section>

        {/* ================= MISSION, VISION & PILLARS ================= */}
        <section id="mission" className="grid md:grid-cols-2 gap-8 scroll-mt-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-3">
            <div className="text-[#0055b8] font-bold text-xl">Our Mission</div>
            <p className="text-slate-600 leading-relaxed text-sm">
              To train, mentor, and prepare men and women for Christian service by grounding them in the uncompromised Word of God, instilling a strong work ethic, and fostering a heart for church planting and community outreach.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-3">
            <div className="text-[#0055b8] font-bold text-xl">Our Core Pillars</div>
            <ul className="list-disc list-inside text-slate-600 text-sm space-y-2">
              <li><strong>Sound Doctrine:</strong> Unapologetic emphasis on biblical authority and literal hermeneutics.</li>
              <li><strong>Practical Ministry:</strong> Hands-on experience in local church outreach and field missions.</li>
              <li><strong>Global Vision:</strong> Dedicated focus on indigenous church planting and local leadership growth.</li>
            </ul>
          </div>
        </section>

        {/* ================= ACADEMIC COUNTER STRATEGY (BENTO METRICS) ================= */}
        <section className="bg-gradient-to-br from-[#003d7a] to-[#004da8] rounded-[32px] text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-[#FFD966]">36</span>
              <h4 className="text-sm font-bold mt-2 text-blue-100">Credit Hours</h4>
              <p className="text-[11px] text-blue-100/70 mt-1">Intense structural modules per curriculum track.</p>
            </div>
            <div className="pt-6 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-[#FFD966]">100%</span>
              <h4 className="text-sm font-bold mt-2 text-blue-100">Vernacular Mastery</h4>
              <p className="text-[11px] text-blue-100/70 mt-1">Expository preaching focused directly on regional tongues.</p>
            </div>
            <div className="pt-6 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-[#FFD966]">400+</span>
              <h4 className="text-sm font-bold mt-2 text-blue-100">Field Hours</h4>
              <p className="text-[11px] text-blue-100/70 mt-1">Mandatory practical village evangelism assignments.</p>
            </div>
            <div className="pt-6 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-[#FFD966]">15+</span>
              <h4 className="text-sm font-bold mt-2 text-blue-100">Active Plants</h4>
              <p className="text-[11px] text-blue-100/70 mt-1">Churches currently manned or supported by current alumni.</p>
            </div>
          </div>
        </section>

        {/* ================= DETAILED CURRICULUM ================= */}
        <section className="bg-white border border-slate-100 rounded-[32px] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0055b8]">Rigorous Foundations</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Core Systematic Training Modules</h3>
            <p className="text-xs text-slate-500">Every student is subjected to uncompromised, professional academic categories designed to instill permanent structural capacity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">Biblical Hermeneutics</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Training men to systematically unpack scripture using the literal, grammatical, historical method—preserving original authorial intent perfectly.</p>
            </div>
            <div className="p-5 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">Systematic Theology</h4>
              <p className="text-xs text-slate-600 leading-relaxed">A complete study of standard core doctrines: Bibliology, Theology Proper, Christology, Pneumatology, Ecclesiology, and Eschatology.</p>
            </div>
            <div className="p-5 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">Homiletics & Expository Drill</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Developing effective sermon structural clarity. Students undergo intense practical preaching laboratories evaluated by senior faculty chairs.</p>
            </div>
            <div className="p-5 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">Pastoral Epistles & Admin</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Providing foundational wisdom regarding local church management, church discipline tracking, administrative integrity, and local self-support strategy.</p>
            </div>
            <div className="p-5 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">Baptist History & Polity</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Traced documentation of historical fundamental beliefs, local church autonomy laws, and biblical division models from apostate organizations.</p>
            </div>
            <div className="p-5 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">Missions & Church Planting</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Practical strategy profiling for entering new fields, assessing socio-cultural environments, and seeding initial local convert cells responsibly.</p>
            </div>
          </div>
        </section>

        {/* ================= MINISTRY GALLERY COMPONENT ================= */}
        <section id="gallery" className="scroll-mt-12">
          <MinistryGallery
            categories={["bible-college"]}
            title="Bible College Gallery"
            subtitle="Witness the transformative journey of our students and graduates across East Africa."
            ministrySlug="bible-college"
          />
        </section>

        {/* ================= HISTORICAL MILESTONES TIMELINE ================= */}
        <section id="milestones" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#16a34a]">Institutional Growth</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Historical Milestones</h2>
            <p className="text-slate-600 font-medium text-sm">Key systemic operations executed by the Bible College desk.</p>
          </div>

          <div className="relative border-l-2 border-slate-200 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-10">
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 bg-[#0055b8] w-4 h-4 rounded-full border-4 border-[#FFFDF9]" />
              <div className="space-y-2">
                <span className="inline-block bg-blue-50 text-[#0055b8] text-xs font-bold px-2 py-0.5 rounded-md">Annual Theological Conference</span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">The 2025 Sovereign Grace Convocation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Brought together pastors and church planters across East Africa focusing on defending fundamental Baptist distinctives, pastoral epistles exegesis, and field training modules.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 bg-[#16a34a] w-4 h-4 rounded-full border-4 border-[#FFFDF9]" />
              <div className="space-y-2">
                <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-md">Strategic Infrastructure Dev</span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">Inaugural Textual Library Expansion</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Established a theological research desk supplied with physical commentary volumes, text-critical lexicons, and systematic theology resources.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 bg-amber-500 w-4 h-4 rounded-full border-4 border-[#FFFDF9]" />
              <div className="space-y-2">
                <span className="inline-block bg-amber-50 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-md">Evangelism Operations</span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">Western Kenya Village Crusades</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bible College students and graduates conducted village outreach in local languages, leading to 3 new local church plants.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CALL TO ACTION ================= */}
        <section className="bg-[#fff7eb] border-2 border-[#FFD966]/40 rounded-[32px] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0055b8]">Invest in the Generational Harvest</span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Support a Future Indigenous Church Planter</h3>
          <p className="text-slate-600 text-sm leading-relaxed max-w-xl mx-auto">
            Sponsor a student to help cover tuition, textbooks, and field deployment resources for dedicated men and women of God.
          </p>
          <div className="pt-2">
            <a href="/support-us" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0055b8] px-8 text-xs font-bold text-white hover:bg-[#003d7a] transition-all">
              Review College Support Options
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}