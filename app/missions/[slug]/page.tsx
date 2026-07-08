"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MinistryGallery from "../../components/MinistryGallery";
import { db } from "../../lib/firebase";
import { doc, getDoc, collection, query, where, orderBy, getDocs } from "firebase/firestore";
import Link from "next/link";

interface MediaItem {
  id: string;
  ministrySlug: string;
  photoUrl: string;
  title: string;
  subtitle?: string;
  description: string;
  mediaType: "image" | "video";
  displayOrder: number;
}

// Ministry configuration mapping - matches admin/ministries/[slug] slugs
const MINISTRY_CONFIGS: Record<string, { 
  title: string; 
  collection: string; 
  heroImage: string; 
  publicUrl: string; 
  icon: string; 
} > = {
  "bible-college": { 
    title: "Bible College", 
    collection: "bible-college", 
    heroImage: "/bible-college/bible college.jpg",
    publicUrl: "/bible-college",
    icon: "📜"
  },
  "church-planting": { 
    title: "Church Planting", 
    collection: "church-planting", 
    heroImage: "/bible-college/mission bible college.png",
    publicUrl: "/church-planting",
    icon: "🌱"
  },
  "faith-academy": { 
    title: "Christian Faith Academy", 
    collection: "faith-academy", 
    heroImage: "/school/classroom.png",
    publicUrl: "/faith-academy",
    icon: "📖"
  },
  "hospital-project": { 
    title: "Hospital Project", 
    collection: "hospital-project", 
    heroImage: "/church/visit.jpg",
    publicUrl: "/hospital-project",
    icon: "🏥"
  },
  "missionary-outreach": { 
    title: "Missionary Outreach", 
    collection: "missionary-outreach", 
    heroImage: "/church/academic.jpg",
    publicUrl: "/ministries/missionary-outreach",
    icon: "⚜️"
  },
};

async function fetchMediaBySlug(slug: string): Promise<MediaItem[]> {
  try {
    const q = query(
      collection(db, "ministry-media"),
      where("ministrySlug", "==", slug),
      orderBy("displayOrder", "asc")
    );
    const snapshot = await getDocs(q);
    const items: MediaItem[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.deleted) return;
      items.push({ 
        id: doc.id, 
        ...data 
      } as MediaItem);
    });
    return items;
  } catch (error) {
    console.error("Error fetching media:", error);
    return [];
  }
}

export default function MissionPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const config = MINISTRY_CONFIGS[slug];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);
  const [ministryData, setMinistryData] = useState<any>(null);

  useEffect(() => {
    if (!slug || !config) return;
    
    const loadData = async () => {
      try {
        const docRef = doc(db, config.collection, "page-content");
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setData(snapshot.data());
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    const loadMedia = async () => {
      const media = await fetchMediaBySlug(slug);
      setMediaLibrary(media);
    };

    const loadMinistryData = async () => {
      try {
        const ministriesRef = collection(db, "ministries");
        const q = query(ministriesRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setMinistryData(querySnapshot.docs[0].data());
        }
      } catch (error) {
        console.error("Error loading ministry data:", error);
      }
    };

    loadData();
    loadMedia();
    loadMinistryData();
  }, [slug, config]);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9] p-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="font-medium text-slate-600">
            Unknown ministry: {slug}
          </h2>
          <p className="mt-2 text-slate-500">
            Available ministries: 
            {Object.keys(MINISTRY_CONFIGS).map(s => (
              <span key={s} className="px-2 py-1 bg-slate-100 rounded ml-1 text-xs">{s}</span>
            ))}
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-20">
          <p className="text-slate-600">Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/missions" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
              ← Back to Missions
            </Link>
            <h1 className="text-3xl font-black text-slate-900 mt-2">
              {config.icon} {config.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Content from <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">{config.collection}/page-content</code>
            </p>
          </div>
          <a 
            href={config.publicUrl} 
            target="_blank" 
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            View Public Page ↗
          </a>
        </div>

        {/* Content Display */}
        <div className="space-y-8">
          {/* Hero Section */}
          <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-xs font-medium text-amber-800 uppercase tracking-wider">
              {config.icon} {config.title}
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.1]">
              {data?.title || config.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              {data?.subtitle || "Content managed via admin panel."}
            </p>
          </section>

          {/* Stats Section */}
          {data?.stats?.length > 0 && (
            <section className="bg-gradient-to-br from-[#003d7a] to-[#004da8] rounded-[40px] text-white p-8 sm:p-12 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
                {data.stats.map((stat: any, i: number) => (
                  <div key={i} className="pt-4 md:pt-0">
                    <span className="text-4xl sm:text-5xl font-black block text-[#FFD966]">{stat.value}</span>
                    <h4 className="text-sm font-bold mt-2 text-blue-100">{stat.label}</h4>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Curriculum Items / Process Steps */}
          {Array.isArray(data?.curriculumItems) && data.curriculumItems.length > 0 && (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.curriculumItems.map((item: any) => (
                <div key={item.id} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-600 mt-1">{item.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Gallery Records */}
          {Array.isArray(data?.galleryRecords) && data.galleryRecords.length > 0 && (
            <section className="bg-white border border-slate-100 rounded-[40px] p-6 sm:p-10 shadow-sm space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  {data.title || "Archive Gallery"}
                </h2>
                <p className="text-xs text-slate-500">Archive of key milestones and events.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.galleryRecords.map((record: any) => (
                    <button 
                      key={record.id} 
                      className="w-full text-left bg-[#FFFDF9] border border-slate-100 rounded-3xl p-4 shadow-sm space-y-4 group hover:shadow-md"
                    >
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50">
                        <img 
                          src={record.url} 
                          alt={record.title} 
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform"
                        />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mt-2">{record.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{record.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Media Library Display */}
          {mediaLibrary.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Media Library</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {mediaLibrary.map((item) => (
                  <div 
                    key={item.id} 
                    className="relative group border border-slate-200 rounded-lg overflow-hidden bg-slate-50"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                      <img 
                        src={item.photoUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-102"
                      />
                    </div>
                    <span className="absolute top-1 left-1 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                      {item.mediaType}
                    </span>
                    <div className="p-2">
                      <p className="text-[11px] text-slate-900 font-medium truncate">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <MinistryGallery 
        categories={[slug]} 
        title={`${config.title} Gallery`} 
        ministryData={ministryData}
      />
      <Footer />
    </div>
  );
}