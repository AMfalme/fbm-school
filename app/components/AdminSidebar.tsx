"use client";

import React from "react";
import {
  LayoutDashboard,
  ImageIcon,
  Users,
  UserCog,
  HeartHandshake,
  Settings,
  ClipboardList,
  HandCoins,
  Church,
  Home,
  LogOut,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminSidebar({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error logging out from admin panel:", error);
    }
  };

  return (
    <aside
      className={`fixed left-0 top-0 flex h-screen w-72 flex-col overflow-y-auto bg-slate-950 text-white shadow-2xl ${
        className || ""
      }`}
    >
      {/* Header */}
      <div className="border-b border-slate-800 p-6">
        <div className="rounded-2xl bg-gradient-to-r from-[#0055b8] to-[#3b82f6] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-100">
            Freedom Baptist Mission
          </p>

          <h2 className="mt-2 text-xl font-black">
            Admin Portal
          </h2>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Dashboard
        </p>

        <nav className="flex flex-col gap-1">
          <a
            href="/admin"
            className="flex items-center gap-3 rounded-xl bg-[#0055b8] px-4 py-3 font-medium text-white transition hover:bg-[#0b67d0]"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </a>

          <a
            href="/admin/media"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            <ImageIcon size={18} />
            Media & Gallery
          </a>

          <a
            href="/admin/managements"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            <Church size={18} />
            Management Team
          </a>

          <a
            href="/admin/users"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            <UserCog size={18} />
            User Roles
          </a>
        </nav>

        {/* Donations */}
        <div className="mt-8">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Donations
          </p>

          <nav className="flex flex-col gap-1">
            <a
              href="/admin/donations"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              <HandCoins size={18} />
              Donations
            </a>

            <a
              href="/admin/partners"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              <HeartHandshake size={18} />
              Partners
            </a>
          </nav>
        </div>

        {/* Administration */}
        <div className="mt-8">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Administration
          </p>

          <nav className="flex flex-col gap-1">
            <a
              href="/admin/settings"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              <Settings size={18} />
              Site Settings
            </a>

            <a
              href="/admin/logs"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              <ClipboardList size={18} />
              Activity Logs
            </a>

            <a
              href="/admin/missionaries"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              <Users size={18} />
              Missionaries
            </a>
          </nav>
        </div>

        {/* Session & Navigation */}
        <div className="mt-8">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Session & Navigation
          </p>

          <nav className="flex flex-col gap-1">
            <a
              href="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              <Home size={18} />
              Go to Homepage
            </a>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-400 transition hover:bg-red-950/30 hover:text-red-300"
            >
              <LogOut size={18} />
              Log Out
            </button>
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-5">
        <div className="rounded-2xl bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Ministry Status
          </p>

          <p className="mt-2 text-sm font-semibold text-emerald-400">
            System Online
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Admin management portal active.
          </p>
        </div>
      </div>
    </aside>
  );
}