"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Define strict typing for our archive records
interface GalleryRecord {
  id: string;
  title: string;
  cohort: string;
  category: string;
  location: string;
  url: string; // Featured image
  description: string;
  extendedSummary: string;
  deploymentImpact: string;
  stats: {
    label: string;
    value: string;
  }[];
  sliderImages: string[]; // Images for the interactive slider within the modal
}

export default function BibleCollege() {
  // 1. Central active record archive dataset with extended modal metrics
  const [galleryRecords] = useState<GalleryRecord[]>([
    {
      id: "rec-1",
      title: "Pastoral Ministry Commencement",
      cohort: "Class of 2024",
      category: "Ordination Track",
      location: "Central Campus Grounds",
      url: "/bible-college/bible college.jpg",
      description: "A high-moment showing our trained native ministers receiving their official theological commissions before being systematically sent out to modern village deployment lines.",
      extendedSummary: "This milestone event marked the completion of our intensive 3-year pastoral module system. The final examinations culminated in a public ordination council review led by senior fundamental Baptist pastors from across East Africa.",
      deploymentImpact: "Graduates from this cohort were successfully deployed into unreached pockets of Western and Coastal Kenya, establishing 4 new independent mission works within 90 days of commencement.",
      stats: [
        { label: "Ordained Ministers", value: "14 Men" },
        { label: "Hours in Practicum", value: "450 Hrs" },
        { label: "Target Villages", value: "6 Zones" },
        { label: "Initial Converts", value: "120+" }
      ],
      sliderImages: [
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1525921429624-479b6c294521?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "rec-2",
      title: "Academic Degree Conferral",
      cohort: "Class of 2023",
      category: "Academic Module",
      location: "Main Assembly Hall",
      url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
      description: "Showcasing our senior operational leadership providing the standard text-critical modules, final assessments, and official recognition keys to our regional field evangelists.",
      extendedSummary: "Focused entirely on building structural academic excellence, this conferral recognized men who completed rigorous advancements in original Greek/Hebrew text-critical methodologies and historical church polity modules.",
      deploymentImpact: "These graduates have taken up key structural posts as instructors within regional Bible institutes and technical leadership roles across our primary urban church planting operations.",
      stats: [
        { label: "Degrees Awarded", value: "11 Th.B." },
        { label: "Exegesis Portfolios", value: "22 Papers" },
        { label: "Languages Covered", value: "3 Tracks" },
        { label: "Assigned Institutes", value: "3 Stations" }
      ],
      sliderImages: [
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1525921429624-479b6c294521?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "rec-3",
      title: "Regional Field Agent Assemblies",
      cohort: "Class of 2022",
      category: "Alumni Network",
      location: "Rift Valley Mission Outpost",
      url: "https://images.unsplash.com/photo-1525921429624-479b6c294521?auto=format&fit=crop&w=600&q=80",
      description: "Our previous graduates returning to base camp to coordinate, map geographical target profiles, and build comprehensive expansion protocols for new church planting zones.",
      extendedSummary: "A critical accountability and tactical planning framework. Our deployed alumni returned to the primary campus lines to exchange field logs, review regional linguistic challenges, and reinforce doctrinal unity.",
      deploymentImpact: "Coordinated strategy mapping from this specific assembly resulted in a multi-state network expansion, connecting isolated rural outposts with centralized logistical supply chains.",
      stats: [
        { label: "Active Alumni Present", value: "28 Field Agents" },
        { label: "Mapped Outposts", value: "18 Stations" },
        { label: "Languages Handled", value: "5 Vernaculars" },
        { label: "New Plant Budgets", value: "Fully Sourced" }
      ],
      sliderImages: [
        "https://images.unsplash.com/photo-1525921429624-479b6c294521?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ]);

  // 2. Modal UI States
  const [selectedRecord, setSelectedRecord] = useState<GalleryRecord | null>(null);
  const [activeSliderIndex, setActiveSliderIndex] = useState<number>(0);

  // Helper to safely change slider images within the modal
  const handlePrevSlide = () => {
    if (!selectedRecord) return;
    setActiveSliderIndex((prev) => (prev === 0 ? selectedRecord.sliderImages.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    if (!selectedRecord) return;
    setActiveSliderIndex((prev) => (prev === selectedRecord.sliderImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a]">
      {/* Shared Global Banner Announcement */}
      <div className="bg-[#16a34a] text-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
        📢 Transforming Lives Across Kenya & Beyond Through Spreading The Gospel
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-24 sm:space-y-32">
        <Navbar />

        {/* ================= HERO SECTION ================= */}
        <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
            📜 Freedom Baptist Bible Mission College • Academic Division
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.1]">
            Training Native Pastors <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055b8] to-amber-600">
              For Exponential Gospel Impact
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Providing institutional structural stability, advanced text-critical hermeneutics, and rigorous hands-on field deployment models for East Africa's upcoming generation of leaders.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#historical-gallery" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0055b8] px-6 text-xs font-bold text-white hover:bg-[#003d7a] transition-all shadow-sm">
              Explore Historical Gallery Archives
            </a>
            <a href="#milestones" className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all">
              Review Historical Milestones
            </a>
          </div>
        </section>

        {/* ================= ACADEMIC COUNTER STRATEGY (BENTO METRICS) ================= */}
        <section className="bg-gradient-to-br from-[#003d7a] to-[#004da8] rounded-[40px] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
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

        {/* ================= PREMIUM GALLERY SHOWCASE WITH SELECTION CONTROLS ================= */}
        <section id="historical-gallery" className="bg-white border border-slate-100 rounded-[40px] p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-12">
          {/* Header Bar matching your administrative layout style */}
          <div className="border-b border-slate-100 pb-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0055b8] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#16a34a]"></span>
                Verified Institutional Heritage Portal
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Graduation & Field Deployment Gallery</h2>
              <p className="text-slate-500 text-xs font-medium">
                A formal registry displaying previous personnel cohorts, ordination settings, and structural milestones achieved across greater East Africa. Click any card to view deep archives.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <span className="inline-block bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2 text-xs font-bold text-slate-700">
                📚 Active Catalogue: <span className="text-[#0055b8] font-black">{galleryRecords.length} Authenticated Records</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Hand Column: Archive Filter Controller Hub */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-4">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">1. Select Historical Cohort</label>
                <div className="grid grid-cols-1 gap-2">
                  <button className="w-full text-left p-3 rounded-xl border-2 border-[#0055b8] bg-blue-50/30 text-xs font-bold text-[#003d7a] flex items-center justify-between">
                    <span>✨ Show All Historic Cohorts</span>
                    <span className="bg-[#0055b8] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">Full Registry</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-xl border border-slate-200 bg-[#FFFDF9] text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-between">
                    <span>Class of 2024 Track</span>
                    <span className="text-slate-400 text-[11px]">Active</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-xl border border-slate-200 bg-[#FFFDF9] text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-between">
                    <span>Class of 2023 Track</span>
                    <span className="text-slate-400 text-[11px]">Archived</span>
                  </button>
                </div>
              </div>

              {/* Categorization & Integrity Overview Box */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1.5">2. Registry Classifications</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5">📜 Ordination Programs</span>
                    <span className="font-bold text-slate-900">Verified</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5">📖 Academic Frameworks</span>
                    <span className="font-bold text-slate-900">Certified</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5">🌍 Village Crusade Operations</span>
                    <span className="font-bold text-slate-900">Documented</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed font-medium">
                  🛡️ <strong>Administrative Integrity:</strong> Every graduate depicted has satisfied thirty-six hours of foundational modules and completed full pastoral board reviews.
                </div>
              </div>
            </div>

            {/* Right Hand Column: Clickable Media Record Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryRecords.map((record) => (
                <button
                  key={record.id}
                  onClick={() => {
                    setSelectedRecord(record);
                    setActiveSliderIndex(0);
                  }}
                  className="w-full text-left bg-[#FFFDF9] border border-slate-100 rounded-3xl p-4 shadow-sm space-y-4 group hover:shadow-md hover:border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 transition-all block"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 relative">
                    <img 
                      src={record.url} 
                      alt={record.title} 
                      className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                    />
                    <span className="absolute bottom-3 left-3 bg-[#003d7a] text-white text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-wider">
                      {record.cohort}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/95 text-slate-900 border border-slate-200/50 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider shadow-sm">
                      {record.category}
                    </span>
                  </div>
                  <div className="px-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-slate-950 text-sm leading-tight group-hover:text-[#0055b8] transition-colors">
                        {record.title}
                      </h4>
                      <span className="text-[10px] text-[#0055b8] font-bold uppercase tracking-wider shrink-0 whitespace-nowrap bg-blue-50 px-2 py-0.5 rounded-md mt-0.5">
                        View Log →
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-[#0055b8]">📍 {record.location}</p>
                    <p className="text-xs text-slate-500 leading-relaxed pt-1 line-clamp-2">{record.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ACTIVE MODAL POP-UP OVERLAY SYSTEM ================= */}
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur Lock */}
            <div 
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
              onClick={() => setSelectedRecord(null)}
            />

            {/* Modal Body Box Container */}
            <div className="relative bg-white border border-slate-100 rounded-[32px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Sticky Close Header Handle */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md z-20 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0055b8] bg-blue-50 px-2.5 py-1 rounded-md">
                    {selectedRecord.cohort} • {selectedRecord.category}
                  </span>
                  <h3 className="text-lg font-black text-slate-950 tracking-tight mt-1">
                    {selectedRecord.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedRecord(null)}
                  className="p-2 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all focus:outline-none"
                  aria-label="Close panel"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Grid Sheet Content */}
              <div className="p-6 sm:p-8 space-y-8">
                
                {/* 1. PREMIUM GALLERY SLIDER BLOCK */}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                    📸 Deployment Photo Journal Gallery ({activeSliderIndex + 1} / {selectedRecord.sliderImages.length})
                  </label>
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 group">
                    <img 
                      src={selectedRecord.sliderImages[activeSliderIndex]} 
                      alt={`Slide highlight ${activeSliderIndex + 1}`}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                    
                    {/* Directional Action Toggles */}
                    <button 
                      onClick={handlePrevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-md border border-slate-200/50 hover:scale-105 transition-all focus:outline-none"
                    >
                      ‹
                    </button>
                    <button 
                      onClick={handleNextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-md border border-slate-200/50 hover:scale-105 transition-all focus:outline-none"
                    >
                      ›
                    </button>

                    {/* Bullet Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-slate-950/40 px-3 py-1.5 rounded-full backdrop-blur-xs">
                      {selectedRecord.sliderImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSliderIndex(idx)}
                          className={`h-2 rounded-full transition-all ${idx === activeSliderIndex ? 'w-4 bg-white' : 'w-2 bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. DYNAMIC RECORD STATS TARGET GRID */}
                <div className="space-y-3">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                    📊 Cohort Verified Performance Stats & Field Metrics
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {selectedRecord.stats.map((stat, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                        <span className="text-xl sm:text-2xl font-black text-[#0055b8] block">{stat.value}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1 block">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. NARRATIVE DOCUMENTATION TRACK */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">🎓 The Graduation Setting</h4>
                    <p className="text-sm font-bold text-slate-900 leading-snug">📍 {selectedRecord.location}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{selectedRecord.extendedSummary}</p>
                  </div>
                  <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">🌍 Field Deployment Logistics</h4>
                    <p className="text-sm font-bold text-[#16a34a] leading-snug">⚡ Active Mission Footprint Established</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{selectedRecord.deploymentImpact}</p>
                  </div>
                </div>

                {/* Bottom Status Footer */}
                <div className="bg-[#FFFDF9] border border-amber-200/50 rounded-2xl p-4 text-center text-xs text-slate-600 font-medium flex items-center justify-center gap-2">
                  <span>🛡️</span>
                  <span>This historical field record has been audited and compiled by the <strong>Freedom Baptist Academic Desk</strong>.</span>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ================= CHRONOLOGICAL TIMELINE: EVENTS OCCURRED ================= */}
        <section id="milestones" className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#16a34a]">Institutional Maturity</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Showcase of Historical Milestones</h2>
            <p className="text-slate-600 font-medium text-sm">A deep timeline layout highlighting key systemic operations executed by the Bible Mission College desk.</p>
          </div>

          <div className="relative border-l-2 border-slate-200 max-w-3xl mx-auto ml-4 sm:mx-auto pl-6 sm:pl-8 space-y-12">
            {/* Event 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 bg-[#0055b8] w-4 h-4 rounded-full border-4 border-[#FFFDF9]" />
              <div className="space-y-2">
                <span className="inline-block bg-blue-50 text-[#0055b8] text-xs font-bold px-2 py-0.5 rounded-md">Annual Theological Conference</span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">The 2025 Sovereign Grace Convocation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our centerpiece event brought together pastors and church planters from four separate East African regions. The modules focused cleanly on defending historical Baptist distinctives, strict pastoral epistles exegesis, and combating syncretistic local tribal movements. Over 150 local leaders completed the specialized field training course.
                </p>
              </div>
            </div>

            {/* Event 2 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 bg-[#16a34a] w-4 h-4 rounded-full border-4 border-[#FFFDF9]" />
              <div className="space-y-2">
                <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-md">Strategic Infrastructure Dev</span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">Inaugural Textual Library Expansion</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We successfully completed a critical institutional structural milestone: establishing a sound theological research desk. This structural asset supplies physical commentary volumes, text-critical lexicons, and systematic theology papers, ensuring students formulate messages directly from untainted original context fields.
                </p>
              </div>
            </div>

            {/* Event 3 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 bg-amber-500 w-4 h-4 rounded-full border-4 border-[#FFFDF9]" />
              <div className="space-y-2">
                <span className="inline-block bg-amber-50 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-md">Evangelism Operations</span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">The Western Kenya Village Crusades</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A massive, field-coordinated effort where our senior college module student base deployed to remote, unreached rural markets. Operating purely in regional vernacular languages, the teams conducted intensive open-air operations, door-to-door counseling, and established the foundation structures for 3 new local mission outposts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= DETAILED MODULE BREAKDOWN CURRICULUM ================= */}
        <section className="bg-white border border-slate-100 rounded-[40px] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0055b8]">Rigorous Foundations</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Core Areas of Systematic Training</h3>
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

        {/* ================= COMPREHENSIVE BOTTOM CALL-TO-ACTION ================= */}
        <section className="bg-[#fff7eb] border-2 border-[#FFD966]/40 rounded-[40px] p-8 sm:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0055b8]">Invest in the Generational Harvest</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Support a Future Indigenous Church Planter</h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
              Our academic operations run strictly independent of state or ecumenical funding models. By aligning with our student sponsorship plans via our secure <a href="/support-us" className="text-[#0055b8] font-bold underline">Support Us panel</a>, you fund tuition, physical module textbooks, and field deployment transport assets for a qualified native man.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3 w-full">
            <a href="/support-us" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0055b8] text-xs font-bold text-white hover:bg-[#003d7a] transition-all text-center w-full">
              Review College Support Options
            </a>
            <a href="/about" className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all text-center w-full">
              Read Our Doctrinal Statement
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}