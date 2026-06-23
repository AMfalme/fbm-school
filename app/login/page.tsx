"use client";

import React, { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot
} from 'firebase/firestore';
import { app, auth, db } from '../lib/firebase';

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

export default function AuthDashboardPage() {
  // Authentication states
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<"SIGN_IN" | "SIGN_UP">("SIGN_IN");
  
  // Auth Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    if (hasValidConfig) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          syncFirestoreProfile(firebaseUser.uid);
        } else {
          setUser(null);
        }
      });
      return () => unsubscribe();
    }

    setUser(null);
    setAuthError("Firebase configuration is missing. Login is disabled until valid credentials are provided.");
  }, []);

  const ensureUserDocument = async (uid: string, name?: string | null, emailAddress?: string | null) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const existingDoc = await getDoc(userDocRef);
      const payload: any = {
        name: name || "",
        email: emailAddress || "",
        lastLogin: new Date().toISOString(),
      };

      if (!existingDoc.exists()) {
        payload.role = "member";
        payload.totalContributed = 0;
        payload.activeSponsorships = 0;
        payload.collegeModulesSupported = 0;
        payload.createdAt = new Date().toISOString();
      }

      await setDoc(userDocRef, payload, { merge: true });
    } catch (error) {
      console.error("Error ensuring user document:", error);
    }
  };

  const syncFirestoreProfile = (uid: string) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          if (data.totalContributed !== undefined) setTotalContributed(data.totalContributed);
          if (data.activeSponsorships !== undefined) setActiveSponsorships(data.activeSponsorships);
          if (data.collegeModulesSupported !== undefined) setCollegeModulesSupported(data.collegeModulesSupported);
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

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoading(true);

    if (!hasValidConfig) {
      setAuthError("Cannot sign in because Firebase configuration is invalid.");
      setIsLoading(false);
      return;
    }

    // Real Firebase pipeline
    try {
      if (authMode === "SIGN_IN") {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        await ensureUserDocument(credential.user.uid, credential.user.displayName, credential.user.email);
        triggerToast("Welcome back to your partner desk!");
      } else {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await ensureUserDocument(credential.user.uid, fullName || credential.user.displayName, credential.user.email);
        triggerToast("Your partnership profile has been established!");
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication process met an unexpected rejection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setAuthError(null);
    setIsLoading(true);

    if (!hasValidConfig) {
      setAuthError("Cannot sign in with Google because Firebase configuration is invalid.");
      setIsLoading(false);
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      await ensureUserDocument(
        credential.user.uid,
        credential.user.displayName,
        credential.user.email
      );
      triggerToast("Welcome back via Google Sign-In!");
    } catch (err: any) {
      setAuthError(err.message || "Google connection could not establish securely.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      triggerToast("Logged out of partner session");
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

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a]">
      
      {/* Shared Global Top Banner */}
      <div className="bg-[#16a34a] text-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
        📢 Transforming Lives Across Kenya & Beyond Through Spreading The Gospel
      </div>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 space-y-12 sm:space-y-16">
        
        {/* ================= COMPACT STRUCTURAL NAVBAR ================= */}
        <nav className="flex items-center justify-between py-6 border-b border-slate-200/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="Shield Logo">🛡️</span>
            <div>
              <span className="block text-xs font-black uppercase tracking-widest text-slate-950">Freedom Baptist</span>
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mission Trust</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wider uppercase text-slate-600">
            <a href="/" className="hover:text-slate-950 transition-colors">Home</a>
            <a href="/about" className="hover:text-slate-950 transition-colors">Our Mission</a>
            <a href="/support-us" className="hover:text-slate-950 transition-colors">Support Us</a>
            <a href="/partner" className="hover:text-slate-950 transition-colors">Partner With Us</a>
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <button 
                onClick={handleLogout}
                className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all"
              >
                Log Out
              </button>
            )}
            <a 
              href="/support-us" 
              className="bg-stone-900 text-white rounded-xl py-1.5 px-4 text-xs font-bold hover:bg-stone-800 transition-all shadow-xs"
            >
              Give Online
            </a>
          </div>
        </nav>

        {/* ================= INTERACTIVE TOAST DISK ================= */}
        {activeToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <span>🛡️</span>
            <span>{activeToast}</span>
          </div>
        )}

        {/* ================= CONDITIONAL PAGE BODY: LOGIN SCREEN VS PARTNER DASHBOARD ================= */}
        {!user ? (
          <section className="max-w-md mx-auto space-y-8 py-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-slate-950">Mission Partner Portal</h1>
              <p className="text-xs text-slate-500 font-medium">Access your personal giving statements, missionary logs, and dynamic prayer boards.</p>
            </div>

            <div className="bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Toggle Switch between Sign In & Sign Up */}
              <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/40">
                <button
                  type="button"
                  onClick={() => { setAuthMode("SIGN_IN"); setAuthError(null); }}
                  className={`py-2 rounded-lg text-xs font-bold transition-all text-center ${
                    authMode === "SIGN_IN" ? "bg-white text-slate-950 shadow-xs" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode("SIGN_UP"); setAuthError(null); }}
                  className={`py-2 rounded-lg text-xs font-bold transition-all text-center ${
                    authMode === "SIGN_UP" ? "bg-white text-slate-950 shadow-xs" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Secure Auth Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {authError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-medium">
                    ⚠️ {authError}
                  </div>
                )}

                {authMode === "SIGN_UP" && (
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase">Full Partner Name</label>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. John Doe" 
                      className="w-full text-xs bg-slate-50/50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-900/5 focus:bg-white font-medium" 
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="john@example.com" 
                    className="w-full text-xs bg-slate-50/50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-900/5 focus:bg-white font-medium" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">Password</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full text-xs bg-slate-50/50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-900/5 focus:bg-white font-medium" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white rounded-xl py-3 text-xs font-bold hover:bg-slate-800 transition-all shadow-xs uppercase tracking-wider disabled:opacity-50"
                >
                  {isLoading ? "Synchronizing..." : authMode === "SIGN_IN" ? "Authorize Session" : "Establish Profile"}
                </button>
              </form>

              {/* Form Divider */}
              <div className="flex items-center gap-3 py-2">
                <span className="h-px bg-slate-200 w-full" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">Or Access With</span>
                <span className="h-px bg-slate-200 w-full" />
              </div>

              {/* Secure Google OAuth Endpoint Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3 text-xs font-bold text-slate-700 bg-[#FFFDF9] hover:bg-slate-50 transition-all shadow-xs"
              >
                {/* SVG Google Identity Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.78 0 3.39.61 4.65 1.8l3.47-3.47C17.99 1.25 15.19 0 12 0 7.35 0 3.39 2.67 1.48 6.56l4.13 3.2C6.55 6.94 9.04 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.48-1.12 2.74-2.38 3.58l3.71 2.88c2.17-2 3.42-4.94 3.42-8.61z" />
                  <path fill="#FBBC05" d="M5.61 9.76a7.22 7.22 0 0 1 0 4.48l-4.13 3.2a11.96 11.96 0 0 1 0-10.88l4.13 3.2z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.71-2.88c-1.03.69-2.35 1.1-4.25 1.1-2.96 0-5.45-1.9-6.39-4.72l-4.13 3.2C3.39 21.33 7.35 24 12 24z" />
                </svg>
                <span>Synchronize with Google</span>
              </button>
            </div>
          </section>
        ) : (
          <section className="space-y-12 py-4">
            
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
        )}

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