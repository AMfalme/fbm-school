"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MinistryGallery from "../components/MinistryGallery";

interface GalleryRecord {
  id: string;
  title: string;
  cohort: string;
  category: string;
  location: string;
  url: string;
  description: string;
  extendedSummary: string;
  deploymentImpact: string;
  stats: {
    label: string;
    value: string;
  }[];
  sliderImages: string[];
}

export default function BibleCollege() {
  useEffect(() => {
    document.title = "FBM - Freedom Baptist Mission - Bible College";
  }, []);

  const [galleryRecords] = useState<GalleryRecord[]>([
    {
      id: "rec-1",
      title: "Pastoral Ministry Graduation",
      cohort: "Class of 2024",
      category: "Ordination Track",
      location: "Central Campus Grounds",
      url: "/bible-college/graduation.jpeg",
      description: "Celebrating our trained pastors receiving their commissioning before being sent out to share the Gospel in villages across Kenya.",
      extendedSummary: "This graduation marked the completion of our 3-year pastoral training program. The final exams included a public ordination review led by senior Baptist pastors from across East Africa.",
      deploymentImpact: "Graduates from this class went into unreached areas of Western and Coastal Kenya, starting 4 new church plants within 90 days of graduation.",
      stats: [
        { label: "Ordained Ministers", value: "14 Men" },
        { label: "Hours in Practicum", value: "450 Hrs" },
        { label: "Target Villages", value: "6 Zones" },
        { label: "Initial Converts", value: "120+" }
      ],
      sliderImages: [
        "/bible-college/graduation.jpeg",
        "/bible-college/graduation.jpg",
        "/bible-college/bible college.jpg",
        "/bible-college/bible college 2.jpg"
      ]
    },
    {
      id: "rec-2",
      title: "Academic Degree Graduation",
      cohort: "Class of 2023",
      category: "Academic Module",
      location: "Main Assembly Hall",
      url: "/church/graduant.jpg",
      description: "Our senior leaders awarding degrees to men who completed intensive Bible study, original language training, and church history courses.",
      extendedSummary: "This ceremony recognized men who completed advanced studies in Greek and Hebrew, Bible interpretation methods, and historic church teachings.",
      deploymentImpact: "These graduates now serve as teachers in regional Bible institutes and lead church planting efforts in our main urban centers.",
      stats: [
        { label: "Degrees Awarded", value: "11 Th.B." },
        { label: "Research Papers", value: "22 Papers" },
        { label: "Languages Studied", value: "3 Tracks" },
        { label: "Teaching Stations", value: "3 Institutes" }
      ],
      sliderImages: [
        "/church/management.png",
        "/church/outreach.jpg",
        "/church/visiting.jpg"
      ]
    },
    {
      id: "rec-3",
      title: "Regional Alumni Gathering",
      cohort: "Class of 2022",
      category: "Alumni Network",
      location: "Mission Outpost",
      url: "/bible-college/class.jpeg",
      description: "Our graduates returned to share updates, encourage one another, and plan new church planting strategies together.",
      extendedSummary: "This gathering brought our deployed alumni back to campus to share field reports, discuss language challenges, and strengthen unity in doctrine and mission.",
      deploymentImpact: "The strategies developed at this meeting helped connect our remote churches with central supply lines and support networks.",
      stats: [
        { label: "Alumni Present", value: "28 Graduates" },
        { label: "Churches Represented", value: "18 Stations" },
        { label: "Languages Used", value: "5 Local Languages" },
        { label: "New Plants Funded", value: "Fully Supported" }
      ],
      sliderImages: [
        "/bible-college/mission bible college.png",
        "/bible-college/bible class.jpeg",
        "/bible-college/graduation.jpg"
      ]
    }
  ]);

  const [selectedRecord, setSelectedRecord] = useState<GalleryRecord | null>(null);
  const [activeSliderIndex, setActiveSliderIndex] = useState<number>(0);

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
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-24 sm:space-y-32">
        <Navbar />

        {/* ================= HERO SECTION ================= */}
        <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
            📜 Freedom Baptist Mission • Bible College
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.1]">
            Training Faithful Pastors <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055b8] to-amber-600">
              To Fulfill the Great Commission
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            &ldquo;Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you.&rdquo; — <strong>Matthew 28:19-20</strong>
          </p>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            We equip local pastors and church leaders with solid Bible teaching, sound doctrine, and a deep love for God&rsquo;s Word so they can faithfully reach their communities for Christ.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#historical-gallery" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0055b8] px-6 text-xs font-bold text-white hover:bg-[#003d7a] transition-all shadow-sm">
              View Graduation Gallery
            </a>
            <a href="#milestones" className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all">
              See Our Journey
            </a>
          </div>
        </section>

        {/* ================= KEY STATS ================= */}
        <section className="bg-gradient-to-br from-[#003d7a] to-[#004da8] rounded-[40px] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-[#FFD966]">36</span>
              <h4 className="text-sm font-bold mt-2 text-blue-100">Credit Hours</h4>
              <p className="text-[11px] text-blue-100/70 mt-1">In-depth courses per program track.</p>
            </div>
            <div className="pt-6 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-[#FFD966]">100%</span>
              <h4 className="text-sm font-bold mt-2 text-blue-100">Local Language Focus</h4>
              <p className="text-[11px] text-blue-100/70 mt-1">Teaching in the heart languages of the people.</p>
            </div>
            <div className="pt-6 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-[#FFD966]">400+</span>
              <h4 className="text-sm font-bold mt-2 text-blue-100">Field Hours</h4>
              <p className="text-[11px] text-blue-100/70 mt-1">Hands-on evangelism and ministry practice.</p>
            </div>
            <div className="pt-6 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-[#FFD966]">15+</span>
              <h4 className="text-sm font-bold mt-2 text-blue-100">Active Churches</h4>
              <p className="text-[11px] text-blue-100/70 mt-1">Started and led by our graduates.</p>
            </div>
          </div>
        </section>

        {/* ================= GALLERY SHOWCASE ================= */}
        <section id="historical-gallery" className="bg-white border border-slate-100 rounded-[40px] p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-12">
          <div className="border-b border-slate-100 pb-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0055b8] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#16a34a]"></span>
                Graduation & Field Ministry Gallery
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Celebrating Our Graduates</h2>
              <p className="text-slate-500 text-xs font-medium">
                Men and women equipped with God&rsquo;s Word, trained for ministry, and sent out to share the Gospel across Kenya and beyond.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <span className="inline-block bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2 text-xs font-bold text-slate-700">
                📚 Records: <span className="text-[#0055b8] font-black">{galleryRecords.length} Graduating Classes</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Filters */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-4">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">1. Select a Class</label>
                <div className="grid grid-cols-1 gap-2">
                  <button className="w-full text-left p-3 rounded-xl border-2 border-[#0055b8] bg-blue-50/30 text-xs font-bold text-[#003d7a] flex items-center justify-between">
                    <span>✨ All Graduating Classes</span>
                    <span className="bg-[#0055b8] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">Full List</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-xl border border-slate-200 bg-[#FFFDF9] text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-between">
                    <span>Class of 2024</span>
                    <span className="text-slate-400 text-[11px]">Active</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-xl border border-slate-200 bg-[#FFFDF9] text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-between">
                    <span>Class of 2023</span>
                    <span className="text-slate-400 text-[11px]">Archived</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1.5">2. Program Categories</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5">📜 Pastoral Training</span>
                    <span className="font-bold text-slate-900">Active</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5">📖 Academic Studies</span>
                    <span className="font-bold text-slate-900">Active</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5">🌍 Evangelism Outreach</span>
                    <span className="font-bold text-slate-900">Ongoing</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed font-medium">
                  🛡️ Every graduate completed 36 credit hours of Bible study and passed a final review by senior pastors.
                </div>
              </div>
            </div>

            {/* Right Column: Record Grid */}
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
                        View →
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

        {/* ================= MODAL ================= */}
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div 
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
              onClick={() => setSelectedRecord(null)}
            />

            <div className="relative bg-white border border-slate-100 rounded-[32px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200">
              
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

              <div className="p-6 sm:p-8 space-y-8">
                {/* Slider */}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                    📸 Photo Gallery ({activeSliderIndex + 1} / {selectedRecord.sliderImages.length})
                  </label>
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 group">
                    <img 
                      src={selectedRecord.sliderImages[activeSliderIndex]} 
                      alt={`Slide ${activeSliderIndex + 1}`}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                    
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

                {/* Stats */}
                <div className="space-y-3">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                    📊 Class Impact Statistics
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

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">🎓 About This Graduation</h4>
                    <p className="text-sm font-bold text-slate-900 leading-snug">📍 {selectedRecord.location}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{selectedRecord.extendedSummary}</p>
                  </div>
                  <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">🌍 Gospel Impact</h4>
                    <p className="text-sm font-bold text-[#16a34a] leading-snug">⚡ Church Planting Results</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{selectedRecord.deploymentImpact}</p>
                  </div>
                </div>

                <div className="bg-[#FFFDF9] border border-amber-200/50 rounded-2xl p-4 text-center text-xs text-slate-600 font-medium flex items-center justify-center gap-2">
                  <span>🛡️</span>
                  <span>All records are maintained by the <strong>Freedom Baptist Bible College</strong> academic office.</span>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ================= TIMELINE ================= */}
        <section id="milestones" className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#16a34a]">God&rsquo;s Faithfulness Through the Years</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Our Journey So Far</h2>
            <p className="text-slate-600 font-medium text-sm">Key moments in the life of our Bible College as we fulfill the Great Commission.</p>
          </div>

          <div className="relative border-l-2 border-slate-200 max-w-3xl mx-auto ml-4 sm:mx-auto pl-6 sm:pl-8 space-y-12">
            {/* Event 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 bg-[#0055b8] w-4 h-4 rounded-full border-4 border-[#FFFDF9]" />
              <div className="space-y-2">
                <span className="inline-block bg-blue-50 text-[#0055b8] text-xs font-bold px-2 py-0.5 rounded-md">Annual Conference</span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">2025 Sovereign Grace Conference</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our main event brought together pastors and church planters from four East African regions. The focus was on teaching sound Baptist doctrine, studying the pastoral letters, and equipping leaders to stand firm against false teaching. Over 150 local leaders completed the training course.
                </p>
              </div>
            </div>

            {/* Event 2 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 bg-[#16a34a] w-4 h-4 rounded-full border-4 border-[#FFFDF9]" />
              <div className="space-y-2">
                <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-md">Library Development</span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">Theological Library Expansion</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We completed a major step for our students: establishing a proper theological research library. This resource provides Bible commentaries, Greek and Hebrew study tools, and theology books so students can study God&rsquo;s Word deeply and accurately.
                </p>
              </div>
            </div>

            {/* Event 3 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 bg-amber-500 w-4 h-4 rounded-full border-4 border-[#FFFDF9]" />
              <div className="space-y-2">
                <span className="inline-block bg-amber-50 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-md">Evangelism Outreach</span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">Western Kenya Village Crusades</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Bible College students and graduates traveled to remote communities across Western Kenya. They shared the Good News of Jesus Christ in local languages through open-air meetings, home visits, and community gatherings. As a result, 3 new local churches were established.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CURRICULUM ================= */}
        <section className="bg-white border border-slate-100 rounded-[40px] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0055b8]">Built on God&rsquo;s Word</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">What Our Students Learn</h3>
            <p className="text-xs text-slate-500">Every student receives thorough training in these core areas to be equipped for faithful ministry.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">How to Study the Bible</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Learning to read and explain Scripture correctly, understanding what God originally meant and how it applies today.</p>
            </div>
            <div className="p-5 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">What the Bible Teaches</h4>
              <p className="text-xs text-slate-600 leading-relaxed">A complete study of key Christian doctrines: God, Jesus Christ, the Holy Spirit, the Church, salvation, and end times.</p>
            </div>
            <div className="p-5 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">How to Preach</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Students practice preparing and preaching Bible-based sermons, with feedback from experienced pastors and teachers.</p>
            </div>
            <div className="p-5 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">Leading a Church</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Practical wisdom on how to manage a local church, care for members, handle conflict, and lead with integrity.</p>
            </div>
            <div className="p-5 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">Church History & Baptist Beliefs</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Understanding where we come from, what Baptists believe and why, and how to stand firm on the truth.</p>
            </div>
            <div className="p-5 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">Missions & Starting Churches</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Practical training on how to enter new communities, share the Gospel, and start healthy new churches.</p>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="bg-[#fff7eb] border-2 border-[#FFD966]/40 rounded-[40px] p-8 sm:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0055b8]">Invest in the Harvest</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Support a Future Church Planter</h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
              &ldquo;The harvest is plentiful, but the laborers are few.&rdquo; — <strong>Matthew 9:37</strong>
            </p>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
              You can help train a pastor or missionary. Your support provides tuition, study materials, and field ministry resources for a called servant of God. Visit our <a href="/support-us" className="text-[#0055b8] font-bold underline">Support page</a> to learn more.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3 w-full">
            <a href="/support-us" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0055b8] text-xs font-bold text-white hover:bg-[#003d7a] transition-all text-center w-full">
              Support Bible College
            </a>
            <a href="/about" className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all text-center w-full">
              Read Our Beliefs
            </a>
          </div>
        </section>
      </main>

      <MinistryGallery
        categories={["bible-college"]}
        title="Bible College Gallery"
        subtitle="See the transformation in the lives of our students and graduates across East Africa."
        ministrySlug="bible-college"
      />

      <Footer />
    </div>
  );
}