"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "../components/AdminSidebar";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../lib/firebase";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (!u) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", u.uid);
        const snapshot = await getDoc(userDocRef);
        const data = snapshot.exists() ? snapshot.data() : null;
        const adminStatus = Boolean(data?.role === "admin");
        setIsAdmin(adminStatus);

        if (!adminStatus) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
        setIsAdmin(false);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF9]">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-lg">
          <p className="font-medium text-slate-600">
            Checking permissions...
          </p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF9]">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-lg">
          <p className="font-medium text-red-600">
            {!user ? "You must be signed in to access the admin section." : "Access denied. Your account must be assigned role: \"admin\" in Firestore."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminSidebar />

      <main className="ml-64 min-h-screen bg-[#F8FAFC] p-8">
        {/* Hero */}
        <div className="mb-8 overflow-hidden rounded-[32px] bg-gradient-to-r from-[#0055b8] via-[#0b67d0] to-[#3b82f6] p-8 text-white shadow-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-blue-100">
                Freedom Baptist Mission
              </p>

              <h1 className="text-4xl font-black lg:text-5xl">
                Admin Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-blue-100">
                Manage donations, mission work, media, reports, staff,
                leadership and website content from one place.
              </p>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wider text-blue-100">
                Signed In
              </p>

              <p className="mt-1 font-semibold">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-lg shadow-blue-100">
            <p className="text-sm text-slate-500">Media Library</p>
            <h2 className="mt-2 text-4xl font-black text-[#0055b8]">0</h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg shadow-emerald-100">
            <p className="text-sm text-slate-500">Mission Reports</p>
            <h2 className="mt-2 text-4xl font-black text-emerald-600">0</h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg shadow-purple-100">
            <p className="text-sm text-slate-500">Management Team</p>
            <h2 className="mt-2 text-4xl font-black text-purple-600">0</h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg shadow-amber-100">
            <p className="text-sm text-slate-500">Registered Users</p>
            <h2 className="mt-2 text-4xl font-black text-amber-600">0</h2>
          </div>
        </section>

        {/* Donation Overview */}
        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 text-white shadow-xl">
            <p className="text-sm uppercase tracking-wider">
              Donations This Month
            </p>

            <h2 className="mt-3 text-4xl font-black">$0</h2>

            <p className="mt-2 text-emerald-100">
              Total donations received this month.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0055b8] to-[#0f77ff] p-6 text-white shadow-xl">
            <p className="text-sm uppercase tracking-wider">
              Annual Giving
            </p>

            <h2 className="mt-3 text-4xl font-black">$0</h2>

            <p className="mt-2 text-blue-100">
              Total donations received this year.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white shadow-xl">
            <p className="text-sm uppercase tracking-wider">
              Active Donors
            </p>

            <h2 className="mt-3 text-4xl font-black">0</h2>

            <p className="mt-2 text-orange-100">
              Individuals supporting the ministry.
            </p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-black text-slate-900">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-2xl bg-[#0055b8] px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]">
              Add Media
            </button>

            <button className="rounded-2xl bg-white px-5 py-3 font-semibold shadow-md transition hover:bg-slate-50">
              Create Report
            </button>

            <button className="rounded-2xl bg-white px-5 py-3 font-semibold shadow-md transition hover:bg-slate-50">
              Manage Users
            </button>

            <button className="rounded-2xl bg-white px-5 py-3 font-semibold shadow-md transition hover:bg-slate-50">
              Site Settings
            </button>
          </div>
        </section>

        {/* Ministry Impact */}
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-black text-slate-900">
            Ministry Impact
          </h2>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <p className="text-sm text-slate-500">Churches Planted</p>
              <h3 className="mt-2 text-4xl font-black text-[#0055b8]">0</h3>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <p className="text-sm text-slate-500">
                Missionaries Supported
              </p>
              <h3 className="mt-2 text-4xl font-black text-emerald-600">0</h3>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <p className="text-sm text-slate-500">Academy Students</p>
              <h3 className="mt-2 text-4xl font-black text-purple-600">0</h3>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <p className="text-sm text-slate-500">Prison Visits</p>
              <h3 className="mt-2 text-4xl font-black text-orange-600">0</h3>
            </div>
          </div>
        </section>

        {/* Management Modules */}
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-black text-slate-900">
            Management Modules
          </h2>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold">Media & Gallery</h3>

              <p className="mt-2 text-sm text-slate-600">
                Upload, organize and manage ministry photos and media.
              </p>

              <button className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-white">
                Open Module
              </button>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold">User Roles</h3>

              <p className="mt-2 text-sm text-slate-600">
                Assign administrator permissions and manage access.
              </p>

              <button className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-white">
                Open Module
              </button>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold">Management Team</h3>

              <p className="mt-2 text-sm text-slate-600">
                Maintain leadership, pastors and ministry staff profiles.
              </p>

              <button className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-white">
                Open Module
              </button>
            </div>
          </div>
        </section>

        {/* Recent Donations */}
        <section className="mt-10 rounded-3xl bg-white p-6 shadow-lg">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-black">Recent Donations</h2>

            <button className="rounded-xl bg-[#0055b8] px-4 py-2 text-white">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 text-left">Donor</th>
                  <th className="py-3 text-left">Amount</th>
                  <th className="py-3 text-left">Method</th>
                  <th className="py-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="py-5 text-slate-500">
                    No donations recorded yet
                  </td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-10 rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-black">
            Recent Activity
          </h2>

          <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
            No recent activity available yet.
          </div>
        </section>
      </main>
    </div>
  );
}