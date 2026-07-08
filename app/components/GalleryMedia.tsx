"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { X } from "lucide-react";

interface MediaItem {
  id: string;
  photoUrl: string;
  title: string;
  description: string;
  category: string;
  status: string;
  iconUrl?: string;
  createdAt?: string;
  mediaType?: "image" | "video";
  gallery?: Array<{
    url: string;
    mediaType?: "image" | "video";
    description?: string;
  }>;
}

export default function GalleryMedia() {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<MediaItem["gallery"]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchMedia = async () => {
      try {
        const snapshot = await getDocs(collection(db, "media"));
        const list: MediaItem[] = [];
        snapshot.forEach((doc) => list.push({ id: doc.id, ...(doc.data() as any) }));
        if (!cancelled) setItems(list);
      } catch (err) {
        console.error("Error fetching gallery media:", err);
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMedia();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="text-center">
          <p className="text-sm text-slate-600">Loading uploaded media...</p>
        </div>
      </section>
    );
  }

  if (!items || items.length === 0) {
    return (
      <section className="py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-950">Uploaded Media</h2>
          <p className="mt-3 text-sm text-slate-600">No uploaded media found yet. The static gallery below still shows sample content.</p>
        </div>
      </section>
    );
  }
  // Group items by known categories and render each group with one-word headings
  const CATEGORY_ORDER = ["construction", "classroom", "church-community", "mission-projects", "conference", "bible-college", "hospital"];
  const CATEGORY_LABELS: Record<string, string> = {
    "construction": "Construction",
    "classroom": "FBM - Christian Faith Academy",
    "church-community": "Church",
    "mission-projects": "Mission Projects",
    "conference": "Conferences & Seminars",
    "bible-college": "Bible College",
    "hospital": "Mission Hospital",
  };

  const CATEGORY_DESCRIPTIONS: Record<string, string> = {
    "construction": "Track our ongoing campus development projects and infrastructure expansion initiatives.",
    "classroom": "Explore our educational facilities and learning environments at Christian Faith Academy.",
    "church-community": "Witness our community engagement, outreach programs, and spiritual impact in action.",
    "mission-projects": "Support and celebrate our diverse mission projects transforming communities across Kenya.",
    "conference": "Discover insights from our conferences and seminars equipping church leaders and believers.",
    "bible-college": "Follow our theological training and Bible college programs developing future ministry leaders.",
    "hospital": "Experience our medical ministry and compassionate healthcare reaching the underserved.",
  };

  const grouped: Record<string, MediaItem[]> = items.reduce((acc, it) => {
    const key = it.category || "other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(it);
    return acc;
  }, {} as Record<string, MediaItem[]>);

  return (
    <section className="space-y-10">
      {CATEGORY_ORDER.map((cat) => {
        const list = grouped[cat] || [];
        if (list.length === 0) return null;

        return (
          <div key={cat} className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-950">{CATEGORY_LABELS[cat] || cat}</h2>
              <p className="mt-2 text-sm text-slate-600">{CATEGORY_DESCRIPTIONS[cat]}</p>
              <div className="mt-3 h-1 w-24 bg-gradient-to-r from-[#FFD966] to-[#0055b8] mx-auto" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((item) => (
                <div key={item.id} className="rounded-[28px] border-2 border-[#E0E7FF] bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,61,122,0.08)] hover:shadow-[0_12px_35px_rgba(0,61,122,0.15)] transition">
                  <div className="aspect-video overflow-hidden">
                    {item.mediaType === "video" ? (
                      <video src={item.photoUrl} className="h-full w-full object-cover" controls />
                    ) : (
                      <img src={item.photoUrl} alt={item.title} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'completed' ? 'bg-[#16a34a] text-white' :
                        item.status === 'in-progress' ? 'bg-[#FFD966] text-[#003d7a]' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                     {(item.gallery ?? []).length > 0 && (
                       <button
                         onClick={() => {
                           setSelectedGallery([{url: item.photoUrl, mediaType: item.mediaType || "image"}, ...(item.gallery ?? [])]);
                           setGalleryModalOpen(true);
                         }}
                         className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
                       >
                         See More ({(item.gallery?.length ?? 0) + 1})
                       </button>
                     )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Gallery Modal */}
      {galleryModalOpen && selectedGallery && selectedGallery.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setGalleryModalOpen(false)}
        >
          <div
            className="max-h-[90vh] max-w-6xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Gallery</h3>
              <button
                onClick={() => setGalleryModalOpen(false)}
                className="rounded-full bg-slate-100 p-2 hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {selectedGallery.map((media, idx) => (
                <div key={idx} className="aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  {media.mediaType === "video" ? (
                    <video src={media.url} className="h-full w-full object-cover" controls autoPlay={idx === 0} />
                  ) : (
                    <img src={media.url} alt={`Gallery ${idx + 1}`} className="h-full w-full object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
