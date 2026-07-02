"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import AdminSidebar from "../../components/AdminSidebar";

interface Application {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  grade: string;
  message: string;
  submittedAt: any;
  status: string;
}

export default function AcademyApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const q = query(collection(db, "academy-applications"), orderBy("submittedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const apps: Application[] = [];
      querySnapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() } as Application);
      });
      setApplications(apps);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = filter === "all" 
    ? applications 
    : applications.filter(app => app.status === filter);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "reviewing": return "bg-amber-100 text-amber-800";
      case "accepted": return "bg-emerald-100 text-emerald-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <main className="lg:pl-72">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-950 tracking-tight">Academy Applications</h1>
            <p className="mt-2 text-slate-600">Manage Christian Faith Academy enrollment applications</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="text-2xl font-black text-[#0055b8]">{applications.length}</div>
              <div className="text-xs text-slate-600 mt-1">Total Applications</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="text-2xl font-black text-blue-600">{applications.filter(a => a.status === "new").length}</div>
              <div className="text-xs text-slate-600 mt-1">New</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="text-2xl font-black text-amber-600">{applications.filter(a => a.status === "reviewing").length}</div>
              <div className="text-xs text-slate-600 mt-1">Reviewing</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="text-2xl font-black text-emerald-600">{applications.filter(a => a.status === "accepted").length}</div>
              <div className="text-xs text-slate-600 mt-1">Accepted</div>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-6 flex flex-wrap gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filter === "all"
                  ? "bg-[#0055b8] text-white"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              All Applications
            </button>
            <button
              onClick={() => setFilter("new")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filter === "new"
                  ? "bg-[#0055b8] text-white"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              New
            </button>
            <button
              onClick={() => setFilter("reviewing")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filter === "reviewing"
                  ? "bg-[#0055b8] text-white"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Reviewing
            </button>
            <button
              onClick={() => setFilter("accepted")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filter === "accepted"
                  ? "bg-[#0055b8] text-white"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Accepted
            </button>
            <button
              onClick={() => setFilter("rejected")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filter === "rejected"
                  ? "bg-[#0055b8] text-white"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Rejected
            </button>
          </div>

          {/* Applications Table */}
          {loading ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <p className="text-slate-600">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <p className="text-slate-600">No applications found.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Student Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Parent/Guardian</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Submitted</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">{app.studentName}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{app.parentName}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          <div>{app.email}</div>
                          <div className="text-xs text-slate-500">{app.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{app.grade}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {app.submittedAt?.toDate?.()?.toLocaleDateString() || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                          {app.message || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}