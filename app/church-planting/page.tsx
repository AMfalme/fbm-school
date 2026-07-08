"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MinistryGallery from "../components/MinistryGallery";

interface ChurchPlant {
  id: string;
  name: string;
  region: string;
  status: "Completed" | "Under Construction" | "Planning Phase";
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
      name: "Congregational service at Mission Bible College",
      region: "Nyanza Region",
      status: "Completed",
      pastor: "Bishop Reverend Benard Curry (Class of 2023)",
      foundedYear: "2024",
      featuredImage: "/bible-college/mission bible college.png",
      vernacularLanguage: "Luhya / Swahili",
      historicalContext: "Training passionate local leaders at our Bible College to share the Gospel and establish healthy, independent churches in their own communities.",
      strategicLogistics: "This training center equips pastors and evangelists with biblical knowledge and practical ministry skills to serve effectively across Kenya.",
      metrics: [
        { label: "Church Family", value: "65 Members" },
        { label: "Weekly Worship", value: "110+" },
        { label: "Local Leaders", value: "2 Trained" },
        { label: "Self-Support", value: "85%" }
      ],
      journalSlider: [
        "/bible-college/mission bible college.png"
      ]
    },
    {
      id: "plant-2",
      name: "Freedom Baptist Mission Outreach",
      region: "",
      status: "Under Construction",
      pastor: "Mission Team with Bishop Reverend Benard Curry",
      foundedYear: "2025 February",
      featuredImage: "/church/management.png",
      vernacularLanguage: "Maa / Swahili",
      historicalContext: "Demonstrating Christ's love through practical care and community outreach as we plant a new church in Narok.",
      strategicLogistics: "The leadership team receives ongoing training and support from FBM, with regular visits to encourage and strengthen the growing congregation.",
      metrics: [
        { label: "Community Members", value: "32 Adults" },
        { label: "Children in Bible Study", value: "45" },
        { label: "Baptisms", value: "12" },
        { label: "Meeting Place", value: "Permanent Building" }
      ],
      journalSlider: [
        "/church/management.png",
        "/church/graduant.jpg",
        "/church/prayer.jpg"
      ]
    },
    {
      id: "plant-3",
      name: "Freedom Baptist Mission Training Outreach",
      region: "",
      status: "Planning Phase",
      pastor: "Awana program with Missionary Richard",
      foundedYear: "2026",
      featuredImage: "church/outreach.jpg",
      vernacularLanguage: "Giryama / Swahili",
      historicalContext: "A compassionate community outreach serving the coastal region. A small group of local believers requested additional biblical teaching and support as they grow in their faith and protect their families from misleading teachings.",
      strategicLogistics: "This community group is receiving ongoing biblical instruction and pastoral care from FBM-trained leaders as they prepare to share Christ with their neighbors.",
      metrics: [
        { label: "Starting Families", value: "8 Families" },
        { label: "Weekly Bible Study", value: "18 Adults" },
        { label: "Currently Studying", value: "Book of Romans" },
        { label: "Support Level", value: "Full Partnership" }
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
      <Navbar />

      {/* Hero Section */}
      <header className="relative bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
            🌱 Freedom Baptist Mission • Church Planting
          </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-none max-w-4xl mx-auto">
            Plant Self-Sustaining <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Independent Churches
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Training local men and women to plant self-governing, self-supporting, and self-propagating churches that multiply within their own cultures.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a href="#active-deployments" className="rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white shadow-md hover:bg-slate-800 transition-all">
              View Our Church Plants
            </a>
            <a href="#methodology" className="rounded-xl bg-white border border-slate-200 px-5 py-3 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-all">
              How We Partner Together
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24 w-full mx-auto">
        {/* Community Impact Summary */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "14+", title: "Local Churches", desc: "serving their communities", color: "border-t-emerald-500 text-emerald-600" },
            { value: "3", title: "New Church Plants", desc: "growing with pastoral support", color: "border-t-blue-500 text-blue-600" },
            { value: "300+", title: "Baptized Members", desc: "across all our church families", color: "border-t-amber-500 text-amber-600" },
            { value: "100%", title: "Local Leadership", desc: "trained and sent by FBM", color: "border-t-purple-500 text-purple-600" }
          ].map((attr, idx) => (
            <div key={idx} className={`bg-white border-t-4 ${attr.color} border-x border-b border-slate-200/60 p-6 rounded-xl shadow-xs transition-transform hover:-translate-y-0.5`}>
              <span className="text-2xl font-black block tracking-tight">{attr.value}</span>
              <h3 className="text-xs font-bold text-slate-900 mt-1">{attr.title}</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{attr.desc}</p>
            </div>
          ))}
        </section>

        {/* Church Planting Projects */}
        <section id="active-deployments" className="space-y-8 scroll-mt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Obeying the Great Commission
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Church Planting Projects</h2>
          </div>
            <div className="flex flex-wrap p-1 bg-slate-200/80 rounded-xl gap-1">
              {[
                { id: "ALL", label: "🎯 All Projects" },
                { id: "Completed", label: "✅ Completed" },
                { id: "Under Construction", label: "🔨 Under Construction" },
                { id: "Planning Phase", label: "📋 Planning Phase" }
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
            {/* About Our Approach */}
            <div className="lg:col-span-4 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs space-y-4">
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">Our Foundation</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every church we help establish is built upon the timeless truths of the <strong>1689 London Baptist Confession of Faith</strong>, ensuring solid biblical foundations for generations to come.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 leading-relaxed">
                💙 <strong>Our Commitment:</strong> We provide guidance and support to churches that faithfully teach God's Word, helping them grow toward complete self-sufficiency and local leadership.
              </div>
            </div>

            {/* Church Plant Cards */}
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
                      plant.status === "Completed" ? "bg-emerald-600" : plant.status === "Under Construction" ? "bg-amber-600" : "bg-blue-600"
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
                        Learn More →
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

        {/* Church Detail Modal */}
        {selectedPlant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" onClick={() => setSelectedPlant(null)} />
            <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-md ${
                    selectedPlant.status === "Completed" ? "bg-emerald-600" : selectedPlant.status === "Under Construction" ? "bg-amber-600" : "bg-blue-600"
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

              {/* Image Slider */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900">
                <img src={selectedPlant.journalSlider[activeSliderIndex]} alt="Church community" className="w-full h-full object-cover" />
                <button onClick={handlePrevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md text-slate-900 flex items-center justify-center font-bold hover:bg-white transition-all">‹</button>
                <button onClick={handleNextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md text-slate-900 flex items-center justify-center font-bold hover:bg-white transition-all">›</button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 bg-slate-950/40 px-2.5 py-1.5 rounded-full">
                  {selectedPlant.journalSlider.map((_, idx) => (
                    <button key={idx} onClick={() => setActiveSliderIndex(idx)} className={`h-1.5 rounded-full transition-all ${idx === activeSliderIndex ? 'w-3 bg-white' : 'w-1.5 bg-white/50'}`} />
                  ))}
                </div>
              </div>

              {/* Community Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {selectedPlant.metrics.map((metric, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                    <span className="text-lg font-bold text-emerald-600 block">{metric.value}</span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5 block">{metric.label}</span>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-6 text-xs text-slate-600 leading-relaxed">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">📜 Our Story</h4>
                  <p className="font-semibold text-slate-800">Led by: {selectedPlant.pastor}</p>
                  <p>{selectedPlant.historicalContext}</p>
                </div>
                <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">🤝 How We Support</h4>
                  <p className="font-semibold text-emerald-700">Language: {selectedPlant.vernacularLanguage}</p>
                  <p>{selectedPlant.strategicLogistics}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How We Work Together */}
        <section id="methodology" className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">How We Work Together</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Partnering with Local Leaders</h2>
              <p className="text-xs text-slate-500">We train local men and women at our Bible College, then support them as they plant independent Baptist churches in their own communities and languages.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", label: "PRAYERFUL PREPARATION", title: "Train Indigenous Leaders", desc: "We equip dedicated students at our Bible College with solid biblical knowledge and ministry skills. Graduates return to their home regions passionate about sharing Christ with their own people in their own language." },
              { step: "02", label: "GROWING TOGETHER", title: "Plant Local Churches", desc: "Trained leaders establish independent Baptist churches in their own communities. We provide ongoing teaching resources and pastoral mentorship as each congregation grows." },
              { step: "03", label: "FULL INDEPENDENCE", title: "Multiply & Replicate", desc: "Each new church becomes self-governing, self-supporting, and self-propagating, sending out its own missionaries to reach more communities with the Gospel." }
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

        {/* Call to Action */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 max-w-4xl mx-auto text-center shadow-xl space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">Help Us Reach More Communities</span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Support a New Local Church</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Every new church begins with dedicated local leaders and a passionate community. Your support provides Bibles, training materials, and helps cover transportation to remote villages where these families live and worship.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-3 justify-center pt-2">
            <a href="/support-us" className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-5 text-xs font-bold text-white hover:bg-emerald-500 transition-all shadow-md">
              Support Church Planting
            </a>
            <a href="/bible-college" className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-xs px-5 text-xs font-bold text-white hover:bg-white/20 transition-all">
              Learn About Our Training
            </a>
          </div>
        </section>
      </main>

      {/* Gallery Section */}
      <MinistryGallery
        categories={["church-community"]}
        title="Church Planting Gallery"
        subtitle="See our indigenous church plants across Kenya - self-governing, self-supporting, and self-propagating."
        ministrySlug="church-planting"
      />

      <Footer />
    </div>
  );
}