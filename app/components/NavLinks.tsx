"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function NavLinks() {
  const [user, setUser] = useState<User | null>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  
    const router = useRouter();
  const handleLogout = async () => {
      try {
        await signOut(auth);
        router.push("/login");
      } catch (error) {
        console.error("Error logging out from admin panel:", error);
      }
    };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        setProfileMenuOpen(false);
        setIsAdmin(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const snapshot = await getDoc(userDocRef);
        const data = snapshot.exists() ? snapshot.data() : null;
        setIsAdmin(Boolean(data?.role === "admin"));
      } catch (error) {
        console.error("Error checking admin role:", error);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const initials = useMemo(() => {
    if (!user) return "U";
    const nameLabel = user.displayName || user.email || "User";
    return nameLabel
      .split(" ")
      .map((segment) => segment[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [user]);

  return (
    <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex">
      <a href="/" className="transition hover:text-[#0055b8]">
        Home
      </a>

      <div className="group relative">
        <button className="flex items-center gap-1 transition hover:text-[#0055b8]">
          Our Mission
          <span>▼</span>
        </button>

        <div className="absolute left-0 top-full hidden min-w-[200px] rounded-lg bg-white p-2 shadow-xl group-hover:block">
          <a href="/about" className="block rounded px-4 py-2 hover:bg-slate-100">Overview</a>
          <a href="/about/team" className="block rounded px-4 py-2 hover:bg-slate-100">Team</a>
        </div>
      </div>

      {/* Ministries Dropdown */}
      <div className="group relative">
        <button className=" flex items-center gap-1 transition hover:text-[#0055b8]">
          Ministries
          <span>▼</span>
        </button>

        <div className="absolute left-0 top-full hidden min-w-[280px] rounded-lg bg-white p-2 shadow-xl group-hover:block">
          <a href="/ministries/missionary-outreach" className="block rounded px-4 py-2 hover:bg-slate-100">
            Mission outreach
          </a>

          <a href="/church-planting" className="block rounded px-4 py-2 hover:bg-slate-100">
            Church Planting
          </a>

          <a href="/faith-academy" className="block rounded px-4 py-2 hover:bg-slate-100">
            FBM- Christian Faith Academy
          </a>

          <a href="/bible-college" className="block rounded px-4 py-2 hover:bg-slate-100">
            Bible College
          </a>

          <a href="/hospital-project" className="block rounded px-4 py-2 hover:bg-slate-100">
            Medical Ministry (Hospital Project)
          </a>
        </div>
      </div>

     
      <a href="/gallery" className="transition hover:text-[#0055b8]">
        Media
      </a>

      <a href="/give" className="transition hover:text-[#0055b8]">
        Donate
      </a>

      <a href="/contact" className="transition hover:text-[#0055b8]">
        Contact
      </a>

      {user ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-800"
            aria-label="Open profile menu"
          >
            {initials}
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 top-full z-10 mt-2 w-44 overflow-hidden rounded-3xl border border-slate-200 bg-white text-sm shadow-2xl">
              <a
                href="/dashboard"
                className="block px-4 py-3 text-slate-700 transition hover:bg-slate-50"
              >
                Dashboard
              </a>
              
              {isAdmin && (
                <a
                  href="/admin"
                  className="block border-t border-slate-200 px-4 py-3 text-slate-700 transition hover:bg-slate-50 font-semibold text-[#0055b8]"
                >
                  Admin Panel
                </a>
              )}
              <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full border-t border-slate-200 px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
                >
                  Logout
                </button>
            </div>
          )}
        </div>
      ) : (
        <a href="/login" className="transition hover:text-[#0055b8]">
          Login
        </a>
      )}
    </nav>
  );
}