"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
  // Update page title
  useEffect(() => {
    document.title = "FBM - Church Planting";
  }, []);

  const [churchPlants] = useState<ChurchPlant[]>([
    {
      id: "plant-1",
      name: "Sovereign Grace Baptist Fellowship",
      region: "Western Frontier (Kakamega)",
      status: "Established",
      pastor: "Pastor Emmanuel Omondi (Class of 2023)",
      foundedYear: "2024",
      featuredImage: "/bible-college/mission bible college.png",
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
        "/bible-college/bible class.jpeg",
        "bible-college/bible college class.jpg",
        "/bible-college/mission bible college.png"
      ]
    },
    {
      id: "plant-2",
      name: "Freedom Baptist Mission Outpost",
      region: "Rift Valley Ridge (Narok Line)",
      status: "Staging",
      pastor: "Evangelist Isaac Kiprop (Class of 2024)",
      foundedYear: "2025",
      featuredImage: "/church/management.png",
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
        "/church/management.png",
        "/church/graduant.jpg",
        "/church/prayer.jpg"
      ]
    },
    {
      id: "plant-3",
      name: "Grace Covenant Reformed Baptist",
      region: "Coastal Strip (Kilifi)",
      status: "Core Group Formed",
      pastor: "Pastor Titus Mwangi (Alumni Network)",
      foundedYear: "2026",
      featuredImage: "church/outreach.jpg",
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
        "/bible-college/bible college 2.jpg",
        "/bible-college/bible college 3.jpg",
        "/bible-college/bible college 2.jpg"
      ]
    }
  ]);

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

  const displayedPlants = selectedRegionFilter === "ALL" 
    ? churchPlants 
    : churchPlants.filter(p => p.status === selectedRegionFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-emerald-600 selection:text-white flex flex-col antialiased">
      {/* Global Impact Notification Ticker */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-center px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-sm z-20">
        📢 Spreading the Gospel • Planting Churches • Teaching the Gospel to All
      </div>

      <Navbar />

      {/* Hero Section */}
      <header className="relative bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
            🌱 Freedom Baptist Bible Mission • Church Planting Desk
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-none max-w-4xl mx-auto">
            Seeding Autonomous <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Local Baptist Churches
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We do not establish dependent tracking stations. We train, deploy, and support native men to plant fully self-governing, self-supporting, and self-propagating local networks.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a href="#active-deployments" className="rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white shadow-md hover:bg-slate-800 transition-all">
              View Active Mission Blueprint
            </a>
            <a href="#methodology" className="rounded-xl bg-white border border-slate-200 px-5 py-3 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-all">
              Our 3-Step Indigenous Methodology
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24 w-full mx-auto">
        {/* Live Field Metrics Operational Summary */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "24+", title: "Established Plants", desc: "Holding clear land titles or permanent leases", color: "border-t-emerald-500 text-emerald-600" },
            { value: "3", title: "Active Staging Cells", desc: "Currently receiving target circuit preaching modules", color: "border-t-blue-500 text-blue-600" },
            { value: "1,800+", title: "Total Baptized Members", desc: "Logged across all combined historical outposts", color: "border-t-amber-500 text-amber-600" },
            { value: "100%", title: "Native Oversight", desc: "Zero reliance on foreign permanent pastoral residence", color: "border-t-purple-500 text-purple-600" }
          ].map((attr, idx) => (
            <div key={idx} className={`bg-white border-t-4 ${attr.color} border-x border-b border-slate-200/60 p-6 rounded-xl shadow-xs transition-transform hover:-translate-y-0.5`}>
              <span className="text-2xl font-black block tracking-tight">{attr.value}</span>
              <h3 className="text-xs font-bold text-slate-900 mt-1">{attr.title}</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{attr.desc}</p>
            </div>
          ))}
        </section>

        {/* Primary Field Platform & Interactive Register */}
        <section id="active-deployments" className="space-y-8 scroll-mt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                Live Regional Mission Mapping Matrix
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Active Fields &amp; Mission Outposts</h2>
            </div>
            <div className="flex flex-wrap p-1 bg-slate-200/80 rounded-xl gap-1">
              {[
                { id: "ALL", label: "🎯 All Fields" },
                { id: "Established", label: "🏛️ Established" },
                { id: "Staging", label: "⚡ Staging" },
                { id: "Core Group Formed", label: "👥 New Starts" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegionFilter(tab.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all whitespace-nowrap ${
                    selectedRegionFilter === tab.id 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Strategic Content Column */}
            <div className="lg:col-span-4 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs space-y-4">
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">Protection of the Flock</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every structural church plant under our administration is built exclusively upon the <strong>1689 London Baptist Confession of Faith</strong> or equivalent landmark historical fundamental articles.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 leading-relaxed">
                🚫 <strong>Zero Tolerance:</strong> No plant is permitted to transition into financial assistance phases if they deviate from clean expositional textual practices.
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
                  className="w-full text-left bg-white border border-slate-200 rounded-2xl p-4 shadow-xs group hover:shadow-md hover:border-slate-300 transition-all block"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 relative">
                    <img 
                      src={plant.featuredImage} 
                      alt={plant.name} 
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-102"
                    />
                    <span className={`absolute bottom-3 left-3 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-md tracking-wider shadow-sm ${
                      plant.status === "Established" ? "bg-emerald-600" : plant.status === "Staging" ? "bg-amber-600" : "bg-blue-600"
                    }`}>
                      {plant.status}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/95 text-slate-900 border border-slate-200/50 text-[9px] font-bold uppercase px-2 py-0.5 rounded-md shadow-xs">
                      Est. {plant.foundedYear}
                    </span>
                  </div>

                  <div className="mt-4 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-slate-900 text-sm leading-tight group-hover:text-emerald-600 transition-colors">
                        {plant.name}
                      </h4>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Open File &rarr;
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">📍 {plant.region}</p>
                    <p className="text-xs text-slate-700 font-semibold pt-1">{plant.pastor}</p>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 pt-0.5">{plant.historicalContext}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Active Field Modal Interactive Portal */}
        {selectedPlant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" onClick={() => setSelectedPlant(null)} />
            <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-md ${
                    selectedPlant.status === "Established" ? "bg-emerald-600" : selectedPlant.status === "Staging" ? "bg-amber-600" : "bg-blue-600"
                  }`}>
                    {selectedPlant.status}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-1">{selectedPlant.name}</h3>
                </div>
                <button onClick={() => setSelectedPlant(null)} className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Slider Module */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900">
                <img src={selectedPlant.journalSlider[activeSliderIndex]} alt="Deployment log" className="w-full h-full object-cover" />
                <button onClick={handlePrevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md text-slate-900 flex items-center justify-center font-bold hover:bg-white transition-all">‹</button>
                <button onClick={handleNextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md text-slate-900 flex items-center justify-center font-bold hover:bg-white transition-all">›</button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 bg-slate-950/40 px-2.5 py-1.5 rounded-full">
                  {selectedPlant.journalSlider.map((_, idx) => (
                    <button key={idx} onClick={() => setActiveSliderIndex(idx)} className={`h-1.5 rounded-full transition-all ${idx === activeSliderIndex ? 'w-3 bg-white' : 'w-1.5 bg-white/50'}`} />
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {selectedPlant.metrics.map((metric, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                    <span className="text-lg font-bold text-emerald-600 block">{metric.value}</span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5 block">{metric.label}</span>
                  </div>
                ))}
              </div>

              {/* Logs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-6 text-xs text-slate-600 leading-relaxed">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">📜 Historical Logging</h4>
                  <p className="font-semibold text-slate-800">Oversight: {selectedPlant.pastor}</p>
                  <p>{selectedPlant.historicalContext}</p>
                </div>
                <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">⚙️ Strategic Logistics</h4>
                  <p className="font-semibold text-emerald-700">Primary Vernacular: {selectedPlant.vernacularLanguage}</p>
                  <p>{selectedPlant.strategicLogistics}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Methodology Track Protocols */}
        <section id="methodology" className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Structural Integrity</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Our Strict Indigenous Methodology</h2>
            <p className="text-xs text-slate-500">We purposefully reject dependency models to protect the long-term standing of new native fields.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", label: "SEED", title: "Vernacular Evangelism", desc: "Deployed native graduates enter target communities to execute deep village crusades, door-to-door distribution, and localized cottage prayer meetings explicitly utilizing the regional tongue." },
              { step: "02", label: "ROOT", title: "Doctrinal Consolidation", desc: "Converts are systematically structured into intensive local discipleship modules. Men demonstrating biblical parameters are selected for additional text-critical leadership oversight." },
              { step: "03", label: "RISE", title: "Autonomous Autonomy", desc: "The assembly formally charters under its own native elder board. Financial support structures transition fully to local stewardship lines, allowing the work to stand completely independent." }
            ].map((proc, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-6 rounded-xl relative flex flex-col justify-between shadow-xs">
                <span className="absolute top-4 right-6 text-4xl font-extrabold text-slate-100 pointer-events-none select-none">{proc.step}</span>
                <div className="space-y-3">
                  <span className="inline-block bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-600 tracking-wider">{proc.label}</span>
                  <h4 className="font-bold text-slate-900 text-sm">{proc.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{proc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Module */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 max-w-4xl mx-auto text-center shadow-xl space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">Expand Deeper into Unreached Fields</span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Sponsor a New Church Plant Outpost</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              While we protect local works from dependency, initial staging phases require resources for building provisions, localized scripture prints, or heavy-terrain transport assets.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-3 justify-center pt-2">
            <a href="/support-us" className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-5 text-xs font-bold text-white hover:bg-emerald-500 transition-all shadow-md">
              Review Church Plant Needs
            </a>
            <a href="/bible-college" className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-xs px-5 text-xs font-bold text-white hover:bg-white/20 transition-all">
              View College Training System
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}