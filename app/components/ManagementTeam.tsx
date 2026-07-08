"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Mail, Phone, MapPin, Building, Quote } from "lucide-react";

interface Manager {
  id: string;
  name: string;
  role: string;
  position?: string;
  imageUrl?: string;
  description?: string;
  bio?: string;
  department?: string;
  branch?: string;
  email?: string;
  phone?: string;
  status?: string;
}

const STATIC_MANAGEMENT: Manager[] = [
  { id: "m1", name: "Elder Samuel N.", role: "Executive Director", position: "Executive Director", imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80", description: "Visionary leader with 20+ years in evangelical ministry, guiding FBM's strategic expansion in church planting and theological education across Kenya.", bio: "Elder Samuel N. has dedicated over two decades to evangelical ministry, serving as the Executive Director of Freedom Baptist Mission. He oversees the strategic expansion of church planting initiatives and theological education programs across Kenya. His leadership has been instrumental in establishing multiple church plants and training centers that equip local leaders for sustainable ministry impact." },
];

export default function ManagementTeam() {
  const [team, setTeam] = useState<Manager[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchTeam = async () => {
      try {
        const snapshot = await getDocs(collection(db, "management"));
        const list: Manager[] = [];
        snapshot.forEach((doc) => list.push({ id: doc.id, ...(doc.data() as any) }));
        if (!cancelled) setTeam(list);
      } catch (err) {
        console.error("Error fetching management team:", err);
        if (!cancelled) setTeam([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTeam();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="text-center">
          <p className="text-sm text-slate-600">Loading management team...</p>
        </div>
      </section>
    );
  }

  const listToRender = (team && team.length > 0) ? team : STATIC_MANAGEMENT;
  const isSingle = listToRender.length === 1;

  if (isSingle) {
    const m = listToRender[0];
    return (
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-950">Management Team</h2>
          <p className="mt-2 text-sm text-slate-600">Meet the management team overseeing our mission and programs.</p>
        </div>

        {/* ── Profile Page Layout ── */}
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-xl">
          {/* Hero Image Area */}
          <div className="relative h-72 sm:h-80 md:h-96 bg-gradient-to-br from-[#0055b8] via-[#0b67d0] to-[#3b82f6]">
            <img
              src={m.imageUrl || "/placeholder-profile.jpg"}
              alt={m.name}
              className="h-full w-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0055b8]/80 via-transparent to-transparent" />
          </div>

          {/* Avatar - overlapping hero */}
          <div className="relative px-6 sm:px-10 pb-10">
            <div className="-mt-24 sm:-mt-28 md:-mt-32 flex justify-center">
              <div className="h-44 w-44 sm:h-52 sm:w-52 md:h-56 md:w-56 overflow-hidden rounded-full border-[6px] border-white bg-slate-100 shadow-2xl">
                <img
                  src={m.imageUrl || "/placeholder-profile.jpg"}
                  alt={m.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Name & Role */}
            <div className="mt-6 text-center">
              <h3 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                {m.name}
              </h3>
              {(m.role || m.position) && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  {m.role && (
                    <span className="inline-flex rounded-full bg-blue-50 px-6 py-2 text-sm font-bold uppercase tracking-wider text-[#0055b8] border border-blue-100">
                      {m.role}
                    </span>
                  )}
                  {m.position && m.position !== m.role && (
                    <span className="inline-flex rounded-full bg-indigo-50 px-6 py-2 text-sm font-semibold text-indigo-700 border border-indigo-100">
                      {m.position}
                    </span>
                  )}
                </div>
              )}

              {m.status && (
                <div className="mt-4">
                  <span className="rounded-full bg-green-50 px-5 py-1.5 text-sm font-bold text-green-700 border border-green-100">
                    {m.status}
                  </span>
                </div>
              )}
            </div>

            {/* About Section */}
            {(m.description || m.bio) && (
              <div className="mx-auto mt-10 max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">About</span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>
                {m.description && (
                  <p className="text-center text-base sm:text-lg leading-relaxed text-slate-700">
                    {m.description}
                  </p>
                )}
                {m.bio && (
                  <div className="mt-6 rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-slate-400">Biography</h4>
                    <p className="text-base leading-relaxed text-slate-700 whitespace-pre-line">
                      {m.bio}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Details Card */}
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-slate-50 border border-slate-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Contact & Information</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {m.department && (
                  <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <Building className="h-5 w-5 text-[#0055b8]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Department</p>
                      <p className="mt-1 font-semibold text-slate-900">{m.department}</p>
                    </div>
                  </div>
                )}

                {m.branch && (
                  <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <MapPin className="h-5 w-5 text-[#0055b8]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Branch</p>
                      <p className="mt-1 font-semibold text-slate-900">{m.branch}</p>
                    </div>
                  </div>
                )}

                {m.email && (
                  <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <Mail className="h-5 w-5 text-[#0055b8]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</p>
                      <p className="mt-1 break-all font-semibold text-slate-900">{m.email}</p>
                    </div>
                  </div>
                )}

                {m.phone && (
                  <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <Phone className="h-5 w-5 text-[#0055b8]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone</p>
                      <p className="mt-1 font-semibold text-slate-900">{m.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Ministry Quote */}
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border-l-4 border-[#0055b8] bg-gradient-to-r from-blue-50 to-white p-6 sm:p-8">
              <div className="flex gap-4">
                <Quote className="h-8 w-8 flex-shrink-0 text-[#0055b8]/30" />
                <div>
                  <p className="text-base sm:text-lg italic leading-relaxed text-slate-700">
                    &ldquo;Serving Christ faithfully through leadership, discipleship and ministry excellence.&rdquo;
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[#0055b8]">— {m.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── Multi-member grid layout ── */
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-950">Management Team</h2>
        <p className="mt-2 text-sm text-slate-600">Meet the management team overseeing our mission and programs.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {listToRender.map((m) => (
          <div
            key={m.id}
            className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="h-28 bg-gradient-to-r from-[#0055b8] via-[#0b67d0] to-[#3b82f6]" />

            <div className="px-6 pb-8">
              <div className="-mt-14 flex justify-center">
                <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg">
                  <img
                    src={m.imageUrl || "/placeholder-profile.jpg"}
                    alt={m.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-5 text-center">
                <h3 className="text-2xl font-black text-slate-900">{m.name}</h3>
                <span className="mt-3 inline-flex rounded-full bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#0055b8]">
                  {m.role}
                </span>
                {m.status && (
                  <div className="mt-3">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">{m.status}</span>
                  </div>
                )}
                {m.description && (
                  <p className="mt-5 text-sm leading-relaxed text-slate-700">{m.description}</p>
                )}
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                <div className="space-y-4">
                  {m.department && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Department</p>
                      <p className="mt-1 font-semibold text-slate-900">{m.department}</p>
                    </div>
                  )}
                  {m.branch && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Branch</p>
                      <p className="mt-1 font-semibold text-slate-900">{m.branch}</p>
                    </div>
                  )}
                  {m.email && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Email</p>
                      <p className="mt-1 break-all font-semibold text-slate-900">{m.email}</p>
                    </div>
                  )}
                  {m.phone && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone</p>
                      <p className="mt-1 font-semibold text-slate-900">{m.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border-l-4 border-[#0055b8] bg-blue-50 p-4">
                <p className="text-sm italic text-slate-700">
                  &ldquo;Serving Christ faithfully through leadership, discipleship and ministry excellence.&rdquo;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}