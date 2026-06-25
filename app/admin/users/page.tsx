"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "../../components/AdminSidebar";
import { doc, getDoc, collection, onSnapshot, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../../lib/firebase";

export default function UserRolesPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [fetchingUsers, setFetchingUsers] = useState(true);
  const [activeToast, setActiveToast] = useState<string | null>(null);

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

  useEffect(() => {
    if (!isAdmin) return;

    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const users: any[] = [];
        snapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        setUsersList(users);
        setFetchingUsers(false);
      },
      (error) => {
        console.error("Error subscribing to users:", error);
        setFetchingUsers(false);
      }
    );

    return () => unsubscribe();
  }, [isAdmin]);

  const handleUpdateRole = async (userId: string, newRole: "admin" | "member") => {
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { role: newRole });
      triggerToast(`Successfully assigned role "${newRole}" to user.`);
    } catch (error: any) {
      console.error("Error updating user role:", error);
      triggerToast(`Failed to update role: ${error.message}`);
    }
  };

  const triggerToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => {
      setActiveToast(null);
    }, 4000);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF9]">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-lg">
          <p className="font-medium text-slate-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF9]">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-lg">
          <p className="font-medium text-red-600">
            {!user
              ? "You must be signed in to access the admin section."
              : 'Access denied. Your account must be assigned role: "admin" in Firestore.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminSidebar />

      <main className="ml-72 min-h-screen bg-[#F8FAFC] p-8">
        {/* Header Hero */}
        <div className="mb-8 overflow-hidden rounded-[32px] bg-gradient-to-r from-[#0055b8] via-[#0b67d0] to-[#3b82f6] p-8 text-white shadow-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-blue-100">
                Freedom Baptist Mission
              </p>
              <h1 className="text-4xl font-black lg:text-5xl">User Roles Management</h1>
              <p className="mt-3 max-w-2xl text-blue-100">
                Assign administrator or member roles to verified mission partners. Changes apply instantly to their access permissions.
              </p>
            </div>
          </div>
        </div>

        {/* Users Table Card */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-lg p-6 sm:p-8">
          <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Registered Directory</h2>
              <p className="text-xs text-slate-500 font-medium">Verify profiles and edit read/write role tokens.</p>
            </div>
            <span className="bg-blue-50 text-[#0055b8] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md shrink-0 w-fit">
              {usersList.length} Active Profiles
            </span>
          </div>

          {fetchingUsers ? (
            <div className="py-12 text-center text-slate-500 font-medium text-sm">
              Retrieving users registry...
            </div>
          ) : usersList.length === 0 ? (
            <div className="py-12 text-center text-slate-500 font-medium text-sm">
              No registered user profiles found in Firestore.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 pl-4">Partner Profile</th>
                    <th className="pb-3">Email Address</th>
                    <th className="pb-3">Firestore ID</th>
                    <th className="pb-3">Access Token / Role</th>
                    <th className="pb-3 pr-4 text-right">Assign Authority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {usersList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 pl-4 font-bold text-slate-900">
                        {item.name || "Anonymous Partner"}
                      </td>
                      <td className="py-4">{item.email || "No Email Registered"}</td>
                      <td className="py-4 font-mono text-[10px] text-slate-400">{item.id}</td>
                      <td className="py-4">
                        <span
                          className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            item.role === "admin"
                              ? "text-blue-700 bg-blue-50"
                              : "text-slate-600 bg-slate-100"
                          }`}
                        >
                          {item.role || "member"}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleUpdateRole(item.id, "member")}
                            disabled={item.role === "member" || item.id === user.uid}
                            className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                              item.role === "member"
                                ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            Member
                          </button>
                          <button
                            onClick={() => handleUpdateRole(item.id, "admin")}
                            disabled={item.role === "admin"}
                            className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                              item.role === "admin"
                                ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                                : "bg-[#0055b8] text-white border-transparent hover:bg-[#003d7a] shadow-xs"
                            }`}
                          >
                            Admin
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Toaster Feedback */}
        {activeToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <span>🛡️</span>
            <span>{activeToast}</span>
          </div>
        )}
      </main>
    </div>
  );
}
