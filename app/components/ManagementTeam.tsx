"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

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
  { id: "m2", name: "Dr. Rebecca A.", role: "Academic Dean", imageUrl: "https://images.unsplash.com/photo-1545996124-1c1b6f107b3f?auto=format&fit=crop&w=800&q=80", description: "Doctorate holder in Christian Education, dedicated to advancing quality theological training and mentoring the next generation of faith leaders." },
  { id: "m3", name: "Mr. Peter K.", role: "Operations Manager", imageUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80", description: "Experienced project manager overseeing campus infrastructure development, resource allocation, and ensuring smooth execution of all operational initiatives." },
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
  console.log(listToRender);
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-950">Management Team</h2>
        <p className="mt-2 text-sm text-slate-600">Meet the management team overseeing our mission and programs.</p>
      </div>

      <div
        className={
          listToRender.length === 1
            ? "grid gap-8 grid-cols-1 justify-items-center"
            : "grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        }
      >
  {listToRender.map((m) => (
   <div
  key={m.id}
  className={
    listToRender.length === 1
      ? "group w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      : "group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  }
>
  {/* Leadership Banner */}
  <div className="h-28 bg-gradient-to-r from-[#0055b8] via-[#0b67d0] to-[#3b82f6]" />

  {/* Profile Content */}
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
      <h3 className="text-2xl font-black text-slate-900">
        {m.name}
      </h3>

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
        <p className="mt-5 text-sm leading-relaxed text-slate-700">
          {m.description}
        </p>
      )}
    </div>

    {/* Details */}
    <div className="mt-6 rounded-2xl bg-slate-50 p-5">
      <div className="space-y-4">
        {m.department && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Department
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {m.department}
            </p>
          </div>
        )}

        {m.branch && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Branch
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {m.branch}
            </p>
          </div>
        )}

        {m.email && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Email
            </p>

            <p className="mt-1 break-all font-semibold text-slate-900">
              {m.email}
            </p>
          </div>
        )}

        {m.phone && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Phone
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {m.phone}
            </p>
          </div>
        )}
      </div>
    </div>

    {/* Ministry Quote */}
    <div className="mt-6 rounded-2xl border-l-4 border-[#0055b8] bg-blue-50 p-4">
      <p className="text-sm italic text-slate-700">
        "Serving Christ faithfully through leadership,
        discipleship and ministry excellence."
      </p>
    </div>
  </div>
</div>
  ))}
</div>
    </section>
  );
}
