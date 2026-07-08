"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Mail, Phone, MapPin, Building, ChevronRight } from "lucide-react";

interface Manager {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  description?: string;

  department?: string;
  branch?: string;
  email?: string;
  phone?: string;

  status?: string;
}

const STATIC_MANAGEMENT: Manager[] = [
  { id: "m1", name: "Elder Samuel N.", role: "Executive Director", imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80", description: "Visionary leader with 20+ years in evangelical ministry, guiding FBM's strategic expansion in church planting and theological education across Kenya." },
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

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-950">Management Team</h2>
        <p className="mt-2 text-sm text-slate-600">Meet the management team overseeing our mission and programs.</p>
      </div>

      <div
        className={
          isSingle
            ? "grid gap-8 grid-cols-1 justify-items-center"
            : "grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        }
      >
  {listToRender.map((m) => (
    isSingle ? (
      /* ── Single-member profile page layout ── */
      <div
        key={m.id}
        className="w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
      >
        {/* Hero Banner */}
        <div className="relative h-48 bg-gradient-to-r from-[#0055b8] via-[#0b67d0] to-[#3b82f6] overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        </div>

        <div className="px-8 pb-10">
          {/* Avatar - larger for single */}
          <div className="-mt-20 flex justify-center">
            <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-xl">
              <img
                src={m.imageUrl || "/placeholder-profile.jpg"}
                alt={m.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Name & Role */}
          <div className="mt-6 text-center">
            <h3 className="text-3xl font-black text-slate-900">
              {m.name}
            </h3>
            <span className="mt-4 inline-flex rounded-full bg-blue-50 px-6 py-2 text-sm font-bold uppercase tracking-wider text-[#0055b8]">
              {m.role}
            </span>

            {m.status && (
              <div className="mt-4">
                <span className="rounded-full bg-green-50 px-4 py-1.5 text-sm font-bold text-green-700">
                  {m.status}
                </span>
              </div>
            )}

            {m.description && (
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-700">
                {m.description}
              </p>
            )}
          </div>

          {/* Details Grid - two columns for single */}
          <div className="mt-8 rounded-2xl bg-slate-50 p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {m.department && (
                <div className="flex items-start gap-3">
                  <Building className="mt-0.5 h-5 w-5 text-[#0055b8]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Department</p>
                    <p className="mt-1 font-semibold text-slate-900">{m.department}</p>
                  </div>
                </div>
              )}

              {m.branch && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#0055b8]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Branch</p>
                    <p className="mt-1 font-semibold text-slate-900">{m.branch}</p>
                  </div>
                </div>
              )}

              {m.email && (
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-[#0055b8]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Email</p>
                    <p className="mt-1 break-all font-semibold text-slate-900">{m.email}</p>
                  </div>
                </div>
              )}

              {m.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-[#0055b8]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone</p>
                    <p className="mt-1 font-semibold text-slate-900">{m.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ministry Quote */}
          <div className="mt-8 rounded-2xl border-l-4 border-[#0055b8] bg-blue-50 p-6">
            <p className="text-base italic text-slate-700">
              &ldquo;Serving Christ faithfully through leadership, discipleship and ministry excellence.&rdquo;
            </p>
          </div>
        </div>
      </div>
    ) : (
      /* ── Multi-member card layout ── */
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
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                  {m.status}
                </span>
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
    )
  ))}
</div>
    </section>
  );
}
