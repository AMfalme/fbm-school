"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

interface Manager {
  id: string;
  name: string;
  role: string;
  image?: string;
  description?: string;
}

const STATIC_MANAGEMENT: Manager[] = [
  { id: "m1", name: "Elder Samuel N.", role: "Executive Director", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80", description: "Visionary leader with 20+ years in evangelical ministry, guiding FBM's strategic expansion in church planting and theological education across Kenya." },
  { id: "m2", name: "Dr. Rebecca A.", role: "Academic Dean", image: "https://images.unsplash.com/photo-1545996124-1c1b6f107b3f?auto=format&fit=crop&w=800&q=80", description: "Doctorate holder in Christian Education, dedicated to advancing quality theological training and mentoring the next generation of faith leaders." },
  { id: "m3", name: "Mr. Peter K.", role: "Operations Manager", image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80", description: "Experienced project manager overseeing campus infrastructure development, resource allocation, and ensuring smooth execution of all operational initiatives." },
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

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-950">Team</h2>
        <p className="mt-2 text-sm text-slate-600">Meet the management team overseeing our mission and programs.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listToRender.map((m) => (
          <div key={m.id} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm text-left">
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-950">{m.name}</h3>
                <p className="text-sm font-semibold text-slate-600">{m.role}</p>
                {m.description && <p className="mt-2 text-sm text-slate-600">{m.description}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
