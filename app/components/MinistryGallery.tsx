"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

interface MediaItem {
  id: string;
  photoUrl: string;
  title: string;
  description: string;
  category: string;
  mediaType: "image" | "video";
}

interface MinistryGalleryProps {
  categories: string[];
  title: string;
  subtitle?: string;
}

export default function MinistryGallery({ categories, title, subtitle }: MinistryGalleryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryMedia = async () => {
      try {
        const q = query(
          collection(db, "media"),
          where("category", "in", categories.length === 1 ? [categories[0]] : categories)
        );
        const querySnapshot = await getDocs(q);
        const items: MediaItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            photoUrl: data.photoUrl,
            title: data.title,
            description: data.description,
            category: data.category,
            mediaType: data.mediaType || "image",
          });
        });
        setMedia(items);
      } catch (error) {
        console.error("Error fetching gallery media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryMedia();
  }, [categories]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-slate-600 font-medium">Loading gallery...</div>
      </div>
    );
  }

  if (media.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden bg-slate-100">
                {item.mediaType === "video" ? (
                  <video
                    src={item.photoUrl}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    controls
                  />
                ) : (
                  <img
                    src={item.photoUrl}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}