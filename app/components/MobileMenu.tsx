
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { auth } from "../lib/firebase";
import DonationModal from "./DonationModal";

export default function MobileMenu() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [ministriesOpen, setMinistriesOpen] = useState(false);
  const [missionsOpen, setMissionsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    setMinistriesOpen(false);
    setMissionsOpen(false);
  };

  const handleDonateClick = () => {
    closeMenu();
    setIsDonationModalOpen(true);
  };

  const menuContent = (
    <div className="fixed inset-0 z-[999999] flex">
      {/* Backdrop */}
      <div
        onClick={closeMenu}
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
      />

      {/* Drawer */}
      <aside className="relative ml-auto h-screen w-full max-w-sm overflow-y-auto rounded-l-[32px] bg-slate-900 p-5 text-white shadow-2xl ring-1 ring-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-sm font-semibold uppercase tracking-[0.24em]">
            Menu
          </span>

          <button
            type="button"
            aria-label="Close mobile menu"
            onClick={closeMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-200 transition hover:bg-slate-700 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-3 text-sm font-semibold uppercase text-white">
          <div className="flex flex-col gap-2">
            <a
              href="/"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 transition hover:bg-slate-800"
            >
              Home
            </a>

            <a
              href="/about"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 transition hover:bg-slate-800"
            >
              Our Mission
            </a>

            {/* Ministries */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900">
              <button
                type="button"
                onClick={() => setMinistriesOpen(!ministriesOpen)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition hover:bg-slate-800"
              >
                Ministries
                {ministriesOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {ministriesOpen && (
                <div className="grid grid-cols-2 gap-1 border-t border-slate-800 p-2 text-[13px] normal-case">
                  <a
                    href="/ministries/missionary-outreach"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    Outreach
                  </a>

                  <a
                    href="/church-planting"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    Church Planting
                  </a>

                  <a
                    href="/faith-academy"
                    onClick={closeMenu}
                    className=" rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    FBM - Christian Faith Academy
                  </a>

                  <a
                    href="/bible-college"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    Bible College
                  </a>

                  <a
                    href="/hospital-project"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    Hospital
                  </a>
                </div>
              )}
            </div>

            {/* Mission Work */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900">
              <button
                type="button"
                onClick={() => setMissionsOpen(!missionsOpen)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition hover:bg-slate-800"
              >
                Mission Work
                {missionsOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {missionsOpen && (
                <div className="grid grid-cols-2 gap-1 border-t border-slate-800 p-2 text-[13px] normal-case">
                  <a
                    href="/missionaries"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    Missionaries
                  </a>

                  <a
                    href="/mission-fields"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    Mission Fields
                  </a>

                  <a
                    href="/mission-reports"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    Mission Reports
                  </a>

                  <a
                    href="/uganda-branch"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    Uganda Branch
                  </a>

                  <a
                    href="/kenya-branch"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    Kenya Branch
                  </a>
                </div>
              )}
            </div>

            <a
              href="/gallery"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 transition hover:bg-slate-800"
            >
              Media
            </a>

            <a
              href="/partner"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 transition hover:bg-slate-800"
            >
              Partner With Us
            </a>

            {user ? (
              <a
                href="/dashboard"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center rounded-xl border border-slate-700 px-4 py-3 text-center font-bold transition hover:border-slate-600 hover:bg-slate-800"
              >
                Dashboard
              </a>
            ) : (
              <a
                href="/login"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center rounded-xl border border-slate-700 px-4 py-3 text-center font-bold transition hover:border-slate-600 hover:bg-slate-800"
              >
                Login
              </a>
            )}
          </div>
        </nav>

        {/* Donate CTA */}
        <div className="mt-4 rounded-[24px] bg-[#0055b8] px-4 py-4 text-white shadow-lg shadow-slate-950/50">
          <p className="text-center text-xs uppercase tracking-[0.24em] text-slate-200">
            Make a Difference Today
          </p>

          <button
            onClick={handleDonateClick}
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#0055b8] transition hover:bg-slate-100 hover:text-slate-900"
          >
            Donate
          </button>
        </div>
      </aside>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label="Open mobile menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-white shadow-sm transition hover:border-slate-600 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
      >
        <Menu size={20} />
      </button>

      {mounted && open && createPortal(menuContent, document.body)}
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />
    </>
  );
}
