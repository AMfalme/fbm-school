"use client";

import React, { useState } from "react";
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
  Mail,
  MessageSquare,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { section: "Dashboard", items: [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/media", label: "Media & Gallery", icon: ImageIcon },
    { href: "/admin/managements", label: "Management Team", icon: Church },
    { href: "/admin/users", label: "User Roles", icon: UserCog },
  ]},
  { section: "Donations", items: [
    { href: "/admin/donations", label: "Donations", icon: HandCoins },
    { href: "/admin/partners", label: "Partners", icon: HeartHandshake },
  ]},
  { section: "Messages", items: [
    { href: "/admin/contacts", label: "Contact Messages", icon: Mail },
    { href: "/admin/partners", label: "Partner Inquiries", icon: MessageSquare },
  ]},
  { section: "Notifications", items: [
    { href: "/admin/notifications", label: "All Notifications", icon: Bell },
  ]},
  { section: "Administration", items: [
    { href: "/admin/settings", label: "Site Settings", icon: Settings },
    { href: "/admin/ministries", label: "Ministries", icon: Church },
    { href: "/admin/logs", label: "Activity Logs", icon: ClipboardList },
  ]},
  { section: "Session & Navigation", items: [
    { href: "/", label: "Go to Homepage", icon: Home },
  ]},
];

export default function AdminSidebar({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error logging out from admin panel:", error);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="border-b border-slate-800 p-6">
        <div className="rounded-2xl bg-gradient-to-r from-[#0055b8] to-[#3b82f6] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-100">
            Freedom Baptist Mission
          </p>
          <h2 className="mt-2 text-xl font-black">Admin Portal</h2>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        {navItems.map((section) => (
          <div key={section.section} className="mb-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {section.section}
            </p>
            <nav className="flex flex-col gap-1">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileSidebar}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                      active
                        ? "bg-[#0055b8] text-white"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        ))}

        {/* Logout */}
        <div className="mt-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Session
          </p>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-400 transition hover:bg-red-950/30 hover:text-red-300"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-5">
        <div className="rounded-2xl bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-400">Ministry Status</p>
          <p className="mt-2 text-sm font-semibold text-emerald-400">System Online</p>
          <p className="mt-1 text-xs text-slate-500">Admin management portal active.</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button - Sticky */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg transition hover:bg-slate-800 lg:hidden"
        aria-label="Open admin menu"
        style={{ position: 'fixed' }}
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col overflow-y-auto bg-slate-950 text-white shadow-2xl ${
          className || ""
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <aside className="absolute left-0 top-0 h-screen w-72 overflow-y-auto bg-slate-950 text-white shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between border-b border-slate-800 p-4">
              <span className="text-sm font-semibold uppercase tracking-[0.24em]">Menu</span>
              <button
                type="button"
                onClick={closeMobileSidebar}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-200 transition hover:bg-slate-700 hover:text-white"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}