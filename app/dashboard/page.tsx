"use client";

import React, { useState, useEffect } from 'react';
import { 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  onSnapshot
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { auth, db } from '../lib/firebase';
import Navbar from '../components/Navbar';

// Check if Firebase is properly configured
const hasValidConfig = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.includes("mock");

interface GivingRecord {
  id: string;
  date: string;
  allocation: string;
  amount: string;
  currency: string;
  status: string;
}

interface PrayerRequest {
  id: string;
  title: string;
  location: string;
  need: string;
  prayersCount: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Dynamic Dashboard States
  const [totalContributed, setTotalContributed] = useState(135);
  const [activeSponsorships, setActiveSponsorships] = useState(1);
  const [collegeModulesSupported, setCollegeModulesSupported] = useState(2);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Hardcoded verified Frontline Prayer Targets
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([
    {
      id: "pr-1",
      title: "Narok Ridge Outpost Shell Assembly",
      location: "Rift Valley (Narok Line)",
      need: "Pray for spiritual safety against local syncretistic movements as core construction commences.",
      prayersCount: 42
    },
    {
      id: "pr-2",
      title: "Student Preacher Module Exam Weeks",
      location: "Bible Mission College Campus",
      need: "Pray for clarity, memory, and spiritual stamina for our 14 native candidates finishing homiletics.",
      prayersCount: 58
    },
    {
      id: "pr-3",
      title: "Primary Early Literacy Enrolments",
      location: "Christian Faith Academy",
      need: "Pray for deep, authentic integration of scriptural values as we welcome PP1 & PP2 classes.",
      prayersCount: 31
    }
  ]);

  // Giving history records registry mock data
  const [givingHistory] = useState<GivingRecord[]>([
    { id: "tx-1", date: "June 12, 2026", allocation: "Sponsor a child (PP1 Track)", amount: "35", currency: "USD", status: "Processed" },
    { id: "tx-2", date: "May 28, 2026", allocation: "Theological Bible College Library", amount: "150", currency: "USD", status: "Processed" },
    { id: "tx-3", date: "May 01, 2026", allocation: "The Local Church Plant Outpost", amount: "100", currency: "USD", status: "Processed" }
  ]);

  useEffect(() => {
    if (!hasValidConfig) {
      setUser(null);
      setLoading(false);
      router.push('/login');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setLoading(false);
        syncFirestoreProfile(firebaseUser.uid);
      } else {
        setUser(null);
        setLoading(false);
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const syncFirestoreProfile = (uid: string) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          if (data.totalContributed !== undefined) setTotalContributed(data.totalContributed);
          if (data.activeSponsorships !== undefined) setActiveSponsorships(data.activeSponsorships);
          if (data.collegeModulesSupported !== undefined) setCollegeModulesSupported(data.collegeModulesSupported);
          setIsAdmin(data.role === "admin");
        } else {
          // Initialize default fields if fresh account
          setDoc(userDocRef, {
            role: "member",
            totalContributed: 135,
            activeSponsorships: 1,
            collegeModulesSupported: 2,
            lastLogin: new Date().toISOString(),
            createdAt: new Date().toISOString()
          }, { merge: true }).catch(err => console.error("Error initializing profile:", err));
        }
      }, (error) => {
        console.error("Error syncing Firestore profile:", error);
      });
      
      return unsubscribe;
    } catch (err) {
      console.error("Error in syncFirestoreProfile:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (err: any) {
      console.error("Standard logout failure:", err);
    }
  };

  const triggerToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => {
      setActiveToast(null);
    }, 4000);
  };

  const handleIncrementPrayer = (id: string) => {
    setPrayerRequests(prev => prev.map(req => {
      if (req.id === id) {
        triggerToast(`You pledged prayer support for: ${req.title}`);
        return { ...req, prayersCount: req.prayersCount + 1 };
      }
      return req;
    }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF9]">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-lg">
          <p className="font-medium text-slate-600">
            Checking session...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a]">
      
      {/* Shared Global Top Banner */}
      <div className="bg-[#16a34a] text-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
        📢 Transforming Lives Across Kenya & Beyond Through Spreading The Gospel
      </div>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 space-y-12 sm:space-y-16">
        
        <Navbar />

        {/* ================= INTERACTIVE TOAST DISK ================= */}
        {activeToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <span>🛡️</span>
            <span>{activeToast}</span>
          </div>
        )}

        <section className="space-y-8 py-4">

          {/* Page Title & Dashboard Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/50 pb-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Partner Dashboard</h1>
              <p className="text-xs text-slate-500 font-medium mt-1">Monitor your giving history, commit to prayer targets, and view ministry impact.</p>
            </div>
            {isAdmin && (
              <a 
                href="/admin"
                className="inline-flex items-center gap-2 bg-[#0055b8] hover:bg-[#003d7a] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs shrink-0"
              >
                <span>⚙️</span> Go to Admin Panel
              </a>
            )}
          </div>

          {/* Admin Quick Link Banner */}
          {isAdmin && (
            <div className="bg-blue-50/50 border border-blue-100 rounded-[32px] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex gap-4 items-start">
                <div className="text-3xl bg-blue-50 text-[#0055b8] p-3 rounded-2xl shrink-0">🛡️</div>
                <div>
                  <h3 className="font-extrabold text-slate-950 text-sm">Administrator Account Verified</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1">You have administrative privileges. You can manage media assets, view mission reports, assign user roles, and update website content.</p>
                </div>
              </div>
              <a 
                href="/admin" 
                className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl py-2 px-4 text-xs font-bold text-center transition-all shrink-0"
              >
                Open Admin Panel
              </a>
            </div>
          )}
          
          {/* 1. DYNAMIC WELCOME BOARD */}
          <div className="bg-gradient-to-br from-[#003d7a] to-[#0055b8] rounded-[40px] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-3">
                <span className="inline-block bg-[#FFD966] text-[#003d7a] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md">
                  Mission Partnership Verified
                </span>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none">
                  Welcome, {user.displayName || user.email?.split("@")[0]}
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 max-w-xl font-medium leading-relaxed">
                  Thank you for standing as a core pillar of the Freedom Baptist Mission Trust. This portal allows you to manage allocations, read live prayer points, and track targeted developments on the ground.
                </p>
              </div>
              <div className="shrink-0 bg-white/10 p-5 rounded-2xl border border-white/10 min-w-[200px] text-left">
                <p className="text-[10px] font-black uppercase text-blue-200 tracking-wider">Registry User UID</p>
                <p className="text-[11px] font-mono font-bold text-white mt-1 break-all">{user.uid}</p>
              </div>
            </div>
          </div>

          {/* 2. DYNAMIC HISTORICAL METRICS PANEL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center gap-4">
              <div className="text-3xl bg-blue-50 text-[#0055b8] p-4 rounded-2xl">💰</div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Supported Portfolio</span>
                <p className="text-2xl font-black text-slate-950 mt-0.5">${totalContributed} USD</p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center gap-4">
              <div className="text-3xl bg-emerald-50 text-[#16a34a] p-4 rounded-2xl">🤝</div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Active Sponsorship Tracks</span>
                <p className="text-2xl font-black text-slate-950 mt-0.5">{activeSponsorships} Child</p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center gap-4">
              <div className="text-3xl bg-amber-50 text-amber-700 p-4 rounded-2xl">📚</div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Theological Modules Funded</span>
                <p className="text-2xl font-black text-slate-950 mt-0.5">{collegeModulesSupported} Modules</p>
              </div>
            </div>
          </div>

          {/* 3. DUAL GRID: PRAYER FEED VS ALUMNI LEDGER TRACKS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Live Frontline Prayer Wall */}
            <div className="lg:col-span-7 bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4 space-y-1">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-[#16a34a]">Frontline Operations</span>
                <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">Active Intercession Request Wall</h3>
                <p className="text-xs text-slate-500 font-medium">Click on 'Commit to pray' to let our native field agents know you are interceding.</p>
              </div>

              <div className="space-y-4">
                {prayerRequests.map((req) => (
                  <div key={req.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 flex flex-col justify-between hover:border-slate-200 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="font-bold text-slate-950 text-sm">{req.title}</h4>
                        <span className="text-[10px] font-bold text-[#0055b8] bg-blue-50 px-2 py-0.5 rounded-md">📍 {req.location}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{req.need}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200/50 pt-3">
                      <span className="text-[10px] font-bold text-slate-400">
                        🙏 Armed with {req.prayersCount} Committed Prayers
                      </span>
                      <button
                        onClick={() => handleIncrementPrayer(req.id)}
                        className="bg-white border border-slate-200 text-slate-700 hover:text-[#16a34a] hover:border-[#16a34a] text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl transition-all"
                      >
                        I Committed to Pray
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Giving Ledger Statement */}
            <div className="lg:col-span-5 bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4 space-y-1">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-[#0055b8]">Ledger Account</span>
                <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">Recent Allocations Statement</h3>
                <p className="text-xs text-slate-500 font-medium">Official receipts are managed directly through Safaricom M-Pesa or PayPal nodes.</p>
              </div>

              <div className="space-y-3">
                {givingHistory.map((rec) => (
                  <div key={rec.id} className="p-4 rounded-xl bg-slate-50/50 border border-slate-200/40 flex items-center justify-between text-xs hover:bg-slate-50 transition-all">
                    <div>
                      <p className="font-bold text-slate-950">{rec.allocation}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">{rec.date} • {rec.id}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-slate-950">{rec.currency} {rec.amount}</p>
                      <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                        {rec.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ================= COMPACT STANDARD FOOTER ================= */}
        <footer className="border-t border-slate-200/50 pt-8 pb-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-stone-500 font-medium">
          <div>
            © {new Date().getFullYear()} Freedom Baptist Mission Trust Kenya. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-stone-900 transition-colors">Privacy Protections</a>
            <a href="/terms" className="hover:text-stone-900 transition-colors">Stewardship Terms</a>
            <a href="/governance" className="hover:text-stone-900 transition-colors">Administrative Audits</a>
          </div>
        </footer>

      </main>
    </div>
  );
}
