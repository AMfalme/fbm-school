"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

interface MediaItem {
  id: string;
  photoUrl: string;
  title: string;
  subtitle?: string;
  description: string;
  category?: string;
  mediaType: "image" | "video";
}

interface MinistryInfo {
  id: string;
  name: string;
  label: string;
  color: string;
  textColor: string;
  path: string;
  description: string;
  stats: string[];
}

const ministries: MinistryInfo[] = [
  {
    id: "mission-outreach",
    name: "Mission Outreach",
    label: "🌍 Mission Outreach",
    color: "bg-emerald-50",
    textColor: "text-emerald-700",
    path: "/ministries/missionary-outreach",
    description: "Fulfilling the Great Commission by spreading the Gospel across Kenya and beyond. We train local men and women to evangelize, plant churches, and transform communities with the life-changing message of Christ.",
    stats: ["14+ Local Churches", "300+ Baptized Members", "5 Regions Reached", "100% Indigenous Leaders"]
  },
  {
    id: "church-planting",
    name: "Church Planting",
    label: "⛪ Church Planting",
    color: "bg-blue-50",
    textColor: "text-[#0055b8]",
    path: "/church-planting",
    description: "Training indigenous leaders to plant self-governing, self-supporting, and self-propagating Baptist churches that multiply within their own cultures, ensuring lasting spiritual growth across unreached communities.",
    stats: ["3 New Plants", "Self-Governing", "Self-Supporting", "Self-Propagating"]
  },
  {
    id: "bible-college",
    name: "Bible College",
    label: "📚 Bible College",
    color: "bg-amber-50",
    textColor: "text-amber-700",
    path: "/bible-college",
    description: "Empowering and training local pastors and church leaders with solid biblical teaching, sound theology, and a deep knowledge of the Word of God so they can successfully reach their communities for Christ.",
    stats: ["36 Credit Hours", "400+ Field Hours", "15+ Active Plants", "100% Vernacular"]
  },
  {
    id: "christian-faith-academy",
    name: "Christian Faith Academy",
    label: "🎓 Christian Faith Academy",
    color: "bg-purple-50",
    textColor: "text-purple-700",
    path: "/ministries/christian-faith-academy",
    description: "Foundational education from Pre-Primary to Junior School, integrating academic excellence with uncompromised biblical truth to nurture well-rounded individuals prepared for lifelong learning and service.",
    stats: ["PP1 to Grade 9", "CBC Aligned", "Christ-Centered", "Nurturing Community"]
  },
  {
    id: "mission-hospital",
    name: "Mission Hospital",
    label: "🏥 Mission Hospital",
    color: "bg-rose-50",
    textColor: "text-rose-700",
    path: "/hospital-project",
    description: "We utilize our healthcare services, deeds, and actions as a divine appointment to evangelize, witness, and share the life-changing Gospel with every patient who walks through our doors.",
    stats: ["24/7 Emergency", "Modern Labs", "Mobile Clinics", "Faith-Driven Care"]
  }
];

export default function About() {
  const [activeMinistry, setActiveMinistry] = useState<string>("mission-outreach");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mediaData, setMediaData] = useState<Record<string, MediaItem[]>>({});
  const [loading, setLoading] = useState(true);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ministries.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch media for all ministries
  useEffect(() => {
    const fetchAllMedia = async () => {
      try {
        const data: Record<string, MediaItem[]> = {};
        
        for (const ministry of ministries) {
          try {
            const q = query(
              collection(db, "ministry-media"),
              where("ministrySlug", "==", ministry.id),
              where("deleted", "!=", true)
            );
            const querySnapshot = await getDocs(q);
            const items: MediaItem[] = [];
            
            querySnapshot.forEach((doc) => {
              const docData = doc.data();
              items.push({
                id: doc.id,
                photoUrl: docData.photoUrl,
                title: docData.title,
                subtitle: docData.subtitle || "",
                description: docData.description,
                category: docData.category,
                mediaType: docData.mediaType || "image",
              });
            });

            // Fallback images if no media found
            if (items.length === 0) {
              const fallbackImages: Record<string, MediaItem[]> = {
                "mission-outreach": [
                  { id: "fallback-1", photoUrl: "/church/mission.jpg", title: "Mission Outreach", description: "Evangelism and community development", mediaType: "image" },
                  { id: "fallback-2", photoUrl: "/church/mgt.png", title: "Community Impact", description: "Sharing Christ's love locally", mediaType: "image" },
                  { id: "fallback-3", photoUrl: "/church/visit.jpg", title: "Medical Outreach", description: "Healthcare as ministry", mediaType: "image" },
                  { id: "fallback-4", photoUrl: "/bible-college/bible college.jpg", title: "Training", description: "Equipping local leaders", mediaType: "image" }
                ],
                "church-planting": [
                  { id: "fallback-1", photoUrl: "/church/construct.jpg", title: "Church Building", description: "Constructing places of worship", mediaType: "image" },
                  { id: "fallback-2", photoUrl: "/bible-college/class.jpeg", title: "Bible College", description: "Training pastors", mediaType: "image" },
                  { id: "fallback-3", photoUrl: "/church/prayer.jpg", title: "Prayer Meeting", description: "Community prayer", mediaType: "image" },
                  { id: "fallback-4", photoUrl: "/bible-college/graduation.jpg", title: "Graduates", description: "Sent out to serve", mediaType: "image" }
                ],
                "bible-college": [
                  { id: "fallback-1", photoUrl: "/bible-college/bible college.jpg", title: "Classroom", description: "Theological education", mediaType: "image" },
                  { id: "fallback-2", photoUrl: "/bible-college/class.jpeg", title: "Study", description: "Deep biblical learning", mediaType: "image" },
                  { id: "fallback-3", photoUrl: "/bible-college/graduation.jpg", title: "Graduation", description: "Commissioning leaders", mediaType: "image" },
                  { id: "fallback-4", photoUrl: "/bible-college/bible college 2.jpg", title: "Fellowship", description: "Community learning", mediaType: "image" }
                ],
                "christian-faith-academy": [
                  { id: "fallback-1", photoUrl: "/school/classroom.png", title: "Classroom", description: "Active learning", mediaType: "image" },
                  { id: "fallback-2", photoUrl: "/school/highlight.png", title: "Students", description: "Growing in knowledge", mediaType: "image" },
                  { id: "fallback-3", photoUrl: "/school/hi.png", title: "Playtime", description: "Balanced development", mediaType: "image" },
                  { id: "fallback-4", photoUrl: "/school/bestcare.jpeg", title: "Learning", description: "Biblical foundation", mediaType: "image" }
                ],
                "mission-hospital": [
                  { id: "fallback-1", photoUrl: "/church/visit.jpg", title: "Medical Visit", description: "Compassionate care", mediaType: "image" },
                  { id: "fallback-2", photoUrl: "/church/medical.png", title: "Facility", description: "Modern healthcare", mediaType: "image" },
                  { id: "fallback-3", photoUrl: "/church/management.png", title: "Management", description: "Organized ministry", mediaType: "image" },
                  { id: "fallback-4", photoUrl: "/church/outreach.jpg", title: "Outreach", description: "Mobile clinics", mediaType: "image" }
                ]
              };
              data[ministry.id] = fallbackImages[ministry.id] || [];
            } else {
              data[ministry.id] = items.slice(0, 4); // Limit to 4 images
            }
          } catch (error) {
            console.error(`Error fetching media for ${ministry.id}:`, error);
            data[ministry.id] = [];
          }
        }
        
        setMediaData(data);
      } catch (error) {
        console.error("Error fetching all media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMedia();
  }, []);

  const handleTabClick = (ministryId: string) => {
    setActiveMinistry(ministryId);
    const index = ministries.findIndex(m => m.id === ministryId);
    setCurrentSlide(index >= 0 ? index : 0);
  };

  const activeMinistryData = ministries.find(m => m.id === activeMinistry) || ministries[0];
  const displayMedia = mediaData[activeMinistry] || [];

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a]">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-24 sm:space-y-32">
        <Navbar />

        {/* ================= HEADER HERO ================= */}
        <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0055b8]">
            🌍 Independent • Biblical • Indigenous
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.1]">
           Our Identity, Calling
            
         <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055b8] to-[#16a34a]">
               & Core Beliefs 
              
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Freedom Baptist Mission exists to spread the Gospel, plant churches, and teach the Gospel to people with no formal knowledge—building lasting faith communities across Kenya and beyond.
          </p>
        </section>

        {/* ================= CORE HISTORIC MANDATE ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#16a34a]/10 to-transparent rounded-[40px] blur-3xl -z-10" />
            <div className="aspect-[5/5] overflow-hidden rounded-[36px] bg-slate-100 shadow-[0_32px_64px_-12px_rgba(0,61,122,0.12)] border-4 border-white">
              <img 
                src="/school/about-hero.png" 
                alt="Missionary team fellowship and collaboration" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#16a34a]">The Great Commission</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              A Responsible Approach to Global Missions
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              In obedience to the biblical mandate of Matthew 28:19-20, we are called to serve and reach Kenya and beyond through the Great Commission, discipleship, and church planting.
            </p>
            <p className="text-slate-600 leading-relaxed">
Based in Kisii, Kenya, Freedom Baptist Mission partners with local communities to: share the Gospel in rural areas, train pastors at our Bible College, and provide Christ-centered education for children. Learn more about our work on our <a href="/ministries/missionary-outreach" className="text-[#0055b8] font-bold underline">Missionary Outreach page</a>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-950 text-base">Self-Supporting</h4>
                <p className="text-xs text-slate-500 mt-1">Biblical Stewardship Standards: Every resource is faithfully managed as unto the Lord and optimized for verified groundwork development fields (Galatians 6:10).</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-950 text-base">Self-Propagating</h4>
                <p className="text-xs text-slate-500 mt-1">Indigenous Disciple-Making: We equip local men and women to lead their own cultures, fulfilling 2 Timothy 2:2 to ensure permanent, generational growth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= THE DETAILED ARMS SHOWCASE ================= */}
        <section className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0055b8]">Operational Ecosystem</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Our Primary Pillars of Impact</h2>
            <p className="text-slate-600 font-medium text-sm">A deep professional breakdown of the established systems driving the mission footprint forward daily.</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2">
            {ministries.map((ministry) => (
              <button
                key={ministry.id}
                onClick={() => handleTabClick(ministry.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeMinistry === ministry.id
                    ? `${ministry.color} ${ministry.textColor} shadow-md scale-105`
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {ministry.label}
              </button>
            ))}
          </div>

          {/* Ministry Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Content */}
            <div className="space-y-6">
              <div className={`inline-flex items-center gap-2 text-xs font-bold ${activeMinistryData.textColor} uppercase tracking-wider ${activeMinistryData.color} px-3 py-1 rounded-md`}>
                {activeMinistryData.label}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {activeMinistryData.name}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {activeMinistryData.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                {activeMinistryData.stats.map((stat, idx) => (
                  <div key={idx} className="p-4 bg-white border border-slate-100 rounded-xl">
                    <div className="text-lg font-black text-slate-900">{stat}</div>
                  </div>
                ))}
              </div>

              {/* CTA Link */}
              <a 
                href={activeMinistryData.path} 
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0055b8] hover:underline pt-2"
              >
                Learn More About {activeMinistryData.name} →
              </a>
            </div>

            {/* Right: Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              {displayMedia.slice(0, 4).map((item, idx) => (
                <a
                  key={item.id}
                  href={activeMinistryData.path}
                  className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-50 border-2 border-slate-100 hover:border-slate-300 transition-all"
                >
                  <img
                    src={item.photoUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-bold">{item.title}</p>
                    {item.subtitle && (
                      <p className="text-white/80 text-[10px]">{item.subtitle}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Auto-slide indicator */}
          <div className="flex justify-center gap-2 pt-4">
            {ministries.map((ministry, idx) => (
              <button
                key={ministry.id}
                onClick={() => handleTabClick(ministry.id)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-8 bg-[#0055b8]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`View ${ministry.name}`}
              />
            ))}
          </div>
        </section>

        {/* ================= COMPREHENSIVE DOCTRINAL STATEMENT ================= */}
        <section className="bg-gradient-to-br from-[#003d7a] to-[#004da8] rounded-[40px] text-white p-8 sm:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mb-16 -mr-16"></div>
          
          <div className="relative z-10 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#FFD966]">Our Core Beliefs</span>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">What We Uncompromisingly Believe</h2>
              <p className="text-xs text-blue-100/80">A direct, professional summary of Freedom Baptist Mission's strict operational doctrinal framework.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-[#FFD966] text-base">The Scriptures</h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">We believe in the absolute verbal, plenary inspiration of the Holy Scriptures in their original manuscripts; completely inerrant and our final rule of faith.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-[#FFD966] text-base">The True Godhead</h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">We believe in one God eternally existing in three distinct persons: God the Father, God the Son, and God the Holy Spirit, co-equal in power and glory.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-[#FFD966] text-base">Salvation by Grace</h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">We maintain that salvation is entirely by grace alone, separate from any human works or rituals, achieved solely via personal faith in Christ's substitutionary death.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-[#FFD966] text-base">The Local Church</h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">We define the local church as an autonomous, visible congregation of baptized believers associated by covenant of faith and fellowship of the gospel.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-[#FFD966] text-base">Total Separation</h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">We adhere to biblical separation from all forms of apostasy, modern ecumenical movements, compromise, and unscriptural theological unions.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-[#FFD966] text-base">The Great Commission</h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">We believe it is the explicit, urgent obligation of every true local assembly to pray for, finance, and actively send qualified men to preach to all nations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BOTTOM ENGAGEMENT FOR GLOBAL PARTNERS ================= */}
        <section className="bg-[#fff7eb] border-2 border-[#FFD966]/40 rounded-[40px] p-8 sm:p-16 text-center space-y-6 max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0055b8]">Verify Our Work First-Hand</span>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Ready to Support the Field Advancement?</h3>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto text-sm sm:text-base">
            We operate with complete systemic transparency. Independent church missions boards, supportive pastors, and prospective field workers can request detailed operational documents, field reports, and student catalogs anytime.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/support-us" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0055b8] px-6 text-xs font-bold text-white hover:bg-[#003d7a] transition-all">
              Partner via Support Us Portal
            </a>
            <a href="/" className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all">
              Return to Homepage
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}