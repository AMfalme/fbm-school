"use client";

import React, { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { auth, db } from '../lib/firebase';
import Navbar from '../components/Navbar';

const hasValidConfig = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.includes("mock");

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<"SIGN_IN" | "SIGN_UP">("SIGN_IN");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (hasValidConfig) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          
          // Check user role and redirect accordingly
          try {
            const { doc, getDoc } = await import("firebase/firestore");
            const userDocRef = doc(db, "users", firebaseUser.uid);
            const snapshot = await getDoc(userDocRef);
            const data = snapshot.exists() ? snapshot.data() : null;
            const isAdmin = data?.role === "admin";
            
            router.push(isAdmin ? '/admin' : '/dashboard');
          } catch (error) {
            console.error("Error checking user role:", error);
            router.push('/dashboard');
          }
        } else {
          setUser(null);
          setAuthLoading(false);
        }
      });
      return () => unsubscribe();
    }

    setUser(null);
    setAuthError("Firebase configuration is missing. Login is disabled until valid credentials are provided.");
    setAuthLoading(false);
  }, [router]);

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

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoading(true);

    if (!hasValidConfig) {
      setAuthError("Cannot sign in because Firebase configuration is invalid.");
      setIsLoading(false);
      return;
    }

    try {
      let credential;
      if (authMode === "SIGN_IN") {
        credential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        credential = await createUserWithEmailAndPassword(auth, email, password);
      }
      
      await ensureUserDocument(credential.user.uid, credential.user.displayName, credential.user.email);
      
      // Check user role and redirect accordingly
      try {
        const { doc, getDoc } = await import("firebase/firestore");
        const userDocRef = doc(db, "users", credential.user.uid);
        const snapshot = await getDoc(userDocRef);
        const data = snapshot.exists() ? snapshot.data() : null;
        const isAdmin = data?.role === "admin";
        
        router.push(isAdmin ? '/admin' : '/dashboard');
      } catch (error) {
        console.error("Error checking user role:", error);
        router.push('/dashboard');
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
      
      // Check user role and redirect accordingly
      try {
        const { doc, getDoc } = await import("firebase/firestore");
        const userDocRef = doc(db, "users", credential.user.uid);
        const snapshot = await getDoc(userDocRef);
        const data = snapshot.exists() ? snapshot.data() : null;
        const isAdmin = data?.role === "admin";
        
        router.push(isAdmin ? '/admin' : '/dashboard');
      } catch (error) {
        console.error("Error checking user role:", error);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setAuthError(err.message || "Google connection could not establish securely.");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
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

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a]">
      

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 space-y-12 sm:space-y-16">
        <Navbar />

        {/* ================= SECURE LOGIN FORM ================= */}
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