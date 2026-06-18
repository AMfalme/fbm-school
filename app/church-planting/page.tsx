"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Define structural typing for active church plant modules
interface ChurchPlant {
  id: string;
  name: string;
  region: string;
  status: "Established" | "Staging" | "Core Group Formed";
  pastor: string;
  foundedYear: string;
  featuredImage: string;
  vernacularLanguage: string;
  historicalContext: string;
  strategicLogistics: string;
  metrics: {
    label: string;
    value: string;
  }[];
  journalSlider: string[];
}

export default function ChurchPlanting() {
  // Central field dataset tracking expanding outposts
  const [churchPlants] = useState<ChurchPlant[]>([
    {
      id: "plant-1",
      name: "Sovereign Grace Baptist Fellowship",
      region: "Western Frontier (Kakamega)",
      status: "Established",
      pastor: "Pastor Emmanuel Omondi (Class of 2023)",
      foundedYear: "2024",
      featuredImage: "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&w=600&q=80",
      vernacularLanguage: "Luhya / Swahili",
      historicalContext: "Seeded directly after the Western Kenya Village Crusades. The core work started in an open-air market stall with seven local convert families. Following intense house-to-house visitation, the work established institutional permanence by securing land titles independently.",
      strategicLogistics: "Currently serves as our primary logistical supply base for sending circuit-rider preachers deeper into rural sub-counties.",
      metrics: [
        { label: "Charter Members", value: "65 Souls" },
        { label: "Weekly Attendance", value: "110+" },
        { label: "Native Elders", value: "2 Trained" },
        { label: "Self-Support Ratio", value: "85%" }
      ],
      journalSlider: [
        "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1525921429624-479b6c294521?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "plant-2",
      name: "Freedom Baptist Mission Outpost",
      region: "Rift Valley Ridge (Narok Line)",
      status: "Staging",
      pastor: "Evangelist Isaac Kiprop (Class of 2024)",
      foundedYear: "2025",
      featuredImage: "https://images.unsplash.com/photo-1525921429624-479b6c294521?auto=format&fit=crop&w=600&q=80",
      vernacularLanguage: "Maa / Swahili",
      historicalContext: "Established following targeted geographical profiles identifying nomadic pastoralist lines lacking sound expository biblical preaching. Meetings are currently held under a reinforced semi-permanent structure.",
      strategicLogistics: "Requires intentional transport asset provisions due to deep geographical isolation and rugged terrain parameters.",
      metrics: [
        { label: "Active Core Group", value: "32 Adults" },
        { label: "Children in Catechism", value: "45" },
        { label: "Baptisms Logged", value: "12" },
        { label: "Buildings Staged", value: "1 Phase" }
      ],
      journalSlider: [
        "https://images.unsplash.com/photo-1525921429624-479b6c294521?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "plant-3",
      name: "Grace Covenant Reformed Baptist",
      region: "Coastal Strip (Kilifi)",
      status: "Core Group Formed",
      pastor: "Pastor Titus Mwangi (Alumni Network)",
      foundedYear: "2026",
      featuredImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
      vernacularLanguage: "Giryama / Swahili",
      historicalContext: "A critical tactical operation addressing highly syncretistic coastal elements. A tiny handful of indigenous converts requested systematic biblical oversight to prevent exposure to false word-of-faith models operating nearby.",
      strategicLogistics: "The core group is currently undergoing specialized doctrinal consolidation modules before executing public launch campaigns.",
      metrics: [
        { label: "Founding Families", value: "8 Nucleus" },
        { label: "Weekly Midweek Study", value: "18 Adults" },
        { label: "Doctrinal Lessons", value: "Book of Romans" },
        { label: "Funding Status", value: "Core Plant Plan" }
      ],
      journalSlider: [
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1525921429624-479b6c294521?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ]);

  // Modal Interactive States
  const [selectedPlant, setSelectedPlant] = useState<ChurchPlant | null>(null);
  const [activeSliderIndex, setActiveSliderIndex] = useState<number>(0);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>("ALL");

  const handlePrevSlide = () => {
    if (!selectedPlant) return;
    setActiveSliderIndex((prev) => (prev === 0 ? selectedPlant.journalSlider.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    if (!selectedPlant) return;
    setActiveSliderIndex((prev) => (prev === selectedPlant.journalSlider.length - 1 ? 0 : prev + 1));
  };

  // Filtered Plants list execution
  const displayedPlants = selectedRegionFilter === "ALL" 
    ? churchPlants 
    : churchPlants.filter(p => p.status === selectedRegionFilter);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a]">
      {/* Global Context Notice */}
      <div className="bg-[#003d7a] text-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
        🌍 Indigenous Expansion: Securing Local Church Autonomy Throughout East Africa
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-24 sm:space-y-32">
        <Navbar />

        {/* ================= HERO SECTION ================= */}
        <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
            🌱 Freedom Baptist Bible Mission • Church Planting Desk
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.1]">
            Seeding Autonomous <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] to-[#0055b8]">
              Local Baptist Churches
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            We do not establish dependent tracking stations. We train, deploy, and support native men to plant fully self-governing, self-supporting, and self-propagating local networks.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#active-deployments" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#16a34a] px-6 text-xs font-bold text-white hover:bg-emerald-700 transition-all shadow-sm">
              View Active Mission Blueprint
            </a>
            <a href="#methodology" className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all">
              Our 3-Step Indigenous Methodology
            </a>
          </div>
        </section>

        {/* ================= LIVE FIELD METRICS OPERATIONAL SUMMARY ================= */}
        <section className="bg-gradient-to-br from-[#111827] to-[#1f2937] rounded-[40px] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="pt-4 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-[#16a34a]">24+</span>
              <h4 className="text-sm font-bold mt-2 text-slate-200">Established Plants</h4>
              <p className="text-[11px] text-slate-400 mt-1">Holding clear land titles or permanent leases.</p>
            </div>
            <div className="pt-6 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-amber-500">3</span>
              <h4 className="text-sm font-bold mt-2 text-slate-200">Active Staging Cells</h4>
              <p className="text-[11px] text-slate-400 mt-1">Currently receiving target circuit preaching modules.</p>
            </div>
            <div className="pt-6 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-blue-400">1,800+</span>
              <h4 className="text-sm font-bold mt-2 text-slate-200">Total Baptized Members</h4>
              <p className="text-[11px] text-slate-400 mt-1">Logged across all combined historical outposts.</p>
            </div>
            <div className="pt-6 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-purple-400">100%</span>
              <h4 className="text-sm font-bold mt-2 text-slate-200">Native Oversight</h4>
              <p className="text-[11px] text-slate-400 mt-1">Zero reliance on foreign permanent pastoral residence.</p>
            </div>
          </div>
        </section>

        {/* ================= PRIMARY FIELD PLATFORM & INTERACTIVE REGISTER ================= */}
        <section id="active-deployments" className="bg-white border border-slate-100 rounded-[40px] p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-12">
          
          {/* Top Panel Registry Identity Bar */}
          <div className="border-b border-slate-100 pb-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16a34a] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
                Live Regional Mission Mapping Matrix
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Active Fields & Mission Outposts</h2>
              <p className="text-slate-500 text-xs font-medium">
                Review current geographical church targets, staging groups, and fully operational assemblies under native pastoral oversight. Click any profile card to view historical field records.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <span className="inline-block bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2 text-xs font-bold text-slate-700">
                🔍 Total Tracked Outposts: <span className="text-[#16a34a] font-black">{churchPlants.length} Stations</span>
              </span>
            </div>
          </div>

          {/* Column Layout Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Controller Panel Side Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-4">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">1. Filter Operational Phase</label>
                <div className="grid grid-cols-1 gap-2">
                  <button 
                    onClick={() => setSelectedRegionFilter("ALL")}
                    className={`w-full text-left p-3 rounded-xl border-2 text-xs font-bold flex items-center justify-between transition-all ${selectedRegionFilter === "ALL" ? "border-[#16a34a] bg-emerald-50/30 text-emerald-900" : "border-slate-200 bg-[#FFFDF9] text-slate-700 hover:bg-slate-50"}`}
                  >
                    <span>🎯 Show Entire Grid Checklist</span>
                    <span className="bg-[#16a34a] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">Master Log</span>
                  </button>
                  <button 
                    onClick={() => setSelectedRegionFilter("Established")}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${selectedRegionFilter === "Established" ? "border-[#16a34a] bg-emerald-50/30 text-emerald-900" : "border-slate-200 bg-[#FFFDF9] text-slate-700 hover:bg-slate-50"}`}
                  >
                    <span>🏛️ Fully Established Works</span>
                    <span className="text-emerald-600 text-[10px] font-bold">Stable</span>
                  </button>
                  <button 
                    onClick={() => setSelectedRegionFilter("Staging")}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${selectedRegionFilter === "Staging" ? "border-amber-500 bg-amber-50/30 text-amber-900" : "border-slate-200 bg-[#FFFDF9] text-slate-700 hover:bg-slate-50"}`}
                  >
                    <span>⚡ Active Staging Outposts</span>
                    <span className="text-amber-600 text-[10px] font-bold">In-Progress</span>
                  </button>
                  <button 
                    onClick={() => setSelectedRegionFilter("Core Group Formed")}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${selectedRegionFilter === "Core Group Formed" ? "border-blue-500 bg-blue-50/30 text-blue-900" : "border-slate-200 bg-[#FFFDF9] text-slate-700 hover:bg-slate-50"}`}
                  >
                    <span>👥 Initial Nucleus Core Groups</span>
                    <span className="text-blue-600 text-[10px] font-bold">Seeding</span>
                  </button>
                </div>
              </div>

              {/* Doctrinal Stability Reference Box */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1.5">2. Protection of the flock</p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Every structural church plant under our administration is built exclusively upon the <strong>1689 London Baptist Confession of Faith</strong> or equivalent landmark historical fundamental articles. 
                </p>
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                  🚫 <strong>Zero Tolerance:</strong> No plant is permitted to transition into financial assistance phases if they deviate from clean expositional textual practices.
                </div>
              </div>
            </div>

            {/* Right Interactive Card Grid Column */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedPlants.map((plant) => (
                <button
                  key={plant.id}
                  onClick={() => {
                    setSelectedPlant(plant);
                    setActiveSliderIndex(0);
                  }}
                  className="w-full text-left bg-[#FFFDF9] border border-slate-100 rounded-3xl p-4 shadow-sm space-y-4 group hover:shadow-md hover:border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all block"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 relative">
                    <img 
                      src={plant.featuredImage} 
                      alt={plant.name} 
                      className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                    />
                    
                    {/* Dynamic Badging systems matching layout constraints */}
                    <span className={`absolute bottom-3 left-3 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-wider ${
                      plant.status === "Established" ? "bg-emerald-600" : plant.status === "Staging" ? "bg-amber-600" : "bg-blue-600"
                    }`}>
                      {plant.status}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/95 text-slate-900 border border-slate-200/50 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider shadow-sm">
                      Est. {plant.foundedYear}
                    </span>
                  </div>

                  <div className="px-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-slate-950 text-sm leading-tight group-hover:text-[#16a34a] transition-colors">
                        {plant.name}
                      </h4>
                      <span className="text-[10px] text-[#16a34a] font-bold uppercase tracking-wider shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md mt-0.5">
                        Open File →
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-500">📍 {plant.region}</p>
                    <p className="text-xs text-slate-600 font-bold pt-1">{plant.pastor}</p>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 pt-0.5">{plant.historicalContext}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ACTIVE FIELD MODAL INTERACTIVE PORTAL ================= */}
        {selectedPlant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Background Light Interlocking Overlay */}
            <div 
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
              onClick={() => setSelectedPlant(null)}
            />

            {/* Modal Sheet Window Panel */}
            <div className="relative bg-white border border-slate-100 rounded-[32px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Top Sticky Header Node */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md z-20 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-widest text-white px-2.5 py-1 rounded-md ${
                    selectedPlant.status === "Established" ? "bg-emerald-600" : selectedPlant.status === "Staging" ? "bg-amber-600" : "bg-blue-600"
                  }`}>
                    Operational Phase: {selectedPlant.status}
                  </span>
                  <h3 className="text-lg font-black text-slate-950 tracking-tight mt-1.5">
                    {selectedPlant.name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedPlant(null)}
                  className="p-2 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all focus:outline-none"
                  aria-label="Close field details"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Main Structural Modal Body */}
              <div className="p-6 sm:p-8 space-y-8">
                
                {/* 1. INTERACTIVE JOURNAL SLIDER */}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                    📸 Deployment Photo Journal Gallery ({activeSliderIndex + 1} / {selectedPlant.journalSlider.length})
                  </label>
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 group">
                    <img 
                      src={selectedPlant.journalSlider[activeSliderIndex]} 
                      alt={`Field slide documentation ${activeSliderIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Prev Toggle Button */}
                    <button 
                      onClick={handlePrevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-md border border-slate-200/50 hover:scale-105 transition-all focus:outline-none"
                    >
                      ‹
                    </button>
                    {/* Next Toggle Button */}
                    <button 
                      onClick={handleNextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-md border border-slate-200/50 hover:scale-105 transition-all focus:outline-none"
                    >
                      ›
                    </button>

                    {/* Bottom Floating Dash Bullets */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-slate-950/40 px-3 py-1.5 rounded-full backdrop-blur-xs">
                      {selectedPlant.journalSlider.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSliderIndex(idx)}
                          className={`h-2 rounded-full transition-all ${idx === activeSliderIndex ? 'w-4 bg-white' : 'w-2 bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. DYNAMIC FIELD DATA MATRIX */}
                <div className="space-y-3">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                    📊 Audited Field Metrics & Vital Statistics
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {selectedPlant.metrics.map((metric, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                        <span className="text-xl sm:text-2xl font-black text-[#16a34a] block">{metric.value}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1 block">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. NARRATIVE DOCUMENT LOGS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">📜 Historical Field Logging</h4>
                    <p className="text-sm font-bold text-slate-900 leading-snug">Oversight: {selectedPlant.pastor}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{selectedPlant.historicalContext}</p>
                  </div>
                  <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">⚙️ Strategic Logistics & Language</h4>
                    <p className="text-sm font-bold text-emerald-700 leading-snug">Primary Vernacular: {selectedPlant.vernacularLanguage}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{selectedPlant.strategicLogistics}</p>
                  </div>
                </div>

                {/* Modal Internal Notice */}
                <div className="bg-[#FFFDF9] border border-emerald-200/50 rounded-2xl p-4 text-center text-xs text-slate-600 font-medium">
                  📡 This file serves as an official transparency asset monitored via our central <strong>Church Planting Operations Group</strong>.
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ================= METHODOLOGY TRACK PROTOCOLS ================= */}
        <section id="methodology" className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#16a34a]">Structural Integrity</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Our Strict Indigenous Methodology</h2>
            <p className="text-slate-600 font-medium text-sm">We purposefully reject dependency models. Our structure protects the maturity and long-term standing of new native fields.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4 shadow-xs relative">
              <span className="absolute top-4 right-6 text-5xl font-black text-slate-100/80 pointer-events-none select-none">01</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16a34a] flex items-center justify-center font-black text-xs">SEED</div>
              <h3 className="font-bold text-slate-950 text-base">Vernacular Evangelism</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Deployed native graduates enter target communities to execute deep village crusades, door-to-door distribution, and localized cottage prayer meetings explicitly utilizing the regional tongue.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4 shadow-xs relative">
              <span className="absolute top-4 right-6 text-5xl font-black text-slate-100/80 pointer-events-none select-none">02</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs">ROOT</div>
              <h3 className="font-bold text-slate-950 text-base">Doctrinal Consolidation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Converts are systematically structured into intensive local discipleship modules. Men demonstrating biblical parameters are selected for additional text-critical leadership oversight.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4 shadow-xs relative">
              <span className="absolute top-4 right-6 text-5xl font-black text-slate-100/80 pointer-events-none select-none">03</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xs">RISE</div>
              <h3 className="font-bold text-slate-950 text-base">Autonomous Autonomy</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                The assembly formally charters under its own native elder board. Financial support structures transition fully to local stewardship lines, allowing the work to stand completely independent.
              </p>
            </div>
          </div>
        </section>

        {/* ================= COOPERATIVE MISSION CALL TO ACTION ================= */}
        <section className="bg-[#f0fdf4] border-2 border-emerald-200/40 rounded-[40px] p-8 sm:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#16a34a]">Expand Deeper into Unreached Fields</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Sponsor a New Church Plant Outpost</h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
              While we protect local works from long-term financial dependency, the initial staging phase requires vital resources. You can directly fund structural building provisions, localized scripture prints, or heavy-terrain transport assets by checking out our <a href="/support-us" className="text-[#16a34a] font-bold underline">Support Us portal</a>.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3 w-full">
            <a href="/support-us" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#16a34a] text-xs font-bold text-white hover:bg-emerald-700 transition-all text-center w-full">
              Review Church Plant Needs
            </a>
            <a href="/bible-college" className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all text-center w-full">
              View College Training System
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}