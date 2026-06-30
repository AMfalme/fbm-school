"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { db } from "../../lib/firebase";
import { 
  collection, 
  getDocs, 
  orderBy, 
  query, 
  Timestamp,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp 
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  category: "user" | "content" | "settings" | "donation" | "media" | "other";
  userId?: string;
  userName?: string;
  userEmail?: string;
  oldValue?: string;
  newValue?: string;
  metadata?: Record<string, any>;
  createdAt: Timestamp | null;
}

export default function AdminLogsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [fetchingLogs, setFetchingLogs] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (!u) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const { doc, getDoc } = await import("firebase/firestore");
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
    if (isAdmin && !fetchingLogs) {
      fetchLogs();
    }
  }, [isAdmin]);

  const fetchLogs = async () => {
    setFetchingLogs(true);
    try {
      const { collection, getDocs, orderBy, query } = await import("firebase/firestore");
      const q = query(collection(db, "activityLogs"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const logsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ActivityLog[];
      setLogs(logsData);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setFetchingLogs(false);
    }
  };

  const handleDeleteLog = async (logId: string) => {
    if (!confirm("Are you sure you want to delete this log entry?")) return;

    try {
      const { deleteDoc } = await import("firebase/firestore");
      await deleteDoc(doc(db, "activityLogs", logId));
      await fetchLogs();
      alert("Log deleted successfully!");
    } catch (error) {
      console.error("Error deleting log:", error);
      alert("Failed to delete log. Please try again.");
    }
  };

  const handleViewLog = (log: ActivityLog) => {
    setSelectedLog(log);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLog(null);
  };

  const handleClearOldLogs = async () => {
    const days = prompt("Delete logs older than how many days? (e.g., 30)");
    if (!days || isNaN(parseInt(days))) return;

    const daysNum = parseInt(days);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysNum);

    if (!confirm(`Delete all logs older than ${days} days?`)) return;

    try {
      const { collection, getDocs, query, where, deleteDoc, Timestamp } = await import("firebase/firestore");
      const q = query(collection(db, "activityLogs"), where("createdAt", "<", Timestamp.fromDate(cutoffDate)));
      const snapshot = await getDocs(q);
      
      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      
      await fetchLogs();
      alert(`Deleted ${snapshot.docs.length} old log entries`);
    } catch (error) {
      console.error("Error clearing old logs:", error);
      alert("Failed to clear old logs. Please try again.");
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "user":
        return "bg-blue-100 text-blue-700";
      case "content":
        return "bg-purple-100 text-purple-700";
      case "settings":
        return "bg-amber-100 text-amber-700";
      case "donation":
        return "bg-emerald-100 text-emerald-700";
      case "media":
        return "bg-pink-100 text-pink-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return "N/A";
    return timestamp.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  const filteredLogs = filterCategory === "all" 
    ? logs 
    : logs.filter(log => log.category === filterCategory);

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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Activity Logs</h1>
            <p className="mt-2 text-slate-600">Track all system activities and changes</p>
          </div>
          <button
            onClick={handleClearOldLogs}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 transition-colors"
          >
            Clear Old Logs
          </button>
        </div>

        {/* Filter */}
        <div className="mb-6 rounded-3xl bg-white p-4 shadow-lg">
          <div className="flex items-center gap-4">
            <label className="text-sm font-bold text-slate-700">Filter by Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
            >
              <option value="all">All Categories</option>
              <option value="user">User Activity</option>
              <option value="content">Content Changes</option>
              <option value="settings">Settings Changes</option>
              <option value="donation">Donation Activity</option>
              <option value="media">Media Activity</option>
              <option value="other">Other</option>
            </select>
            <button
              onClick={fetchLogs}
              className="rounded-xl bg-[#0055b8] px-4 py-2 text-sm font-bold text-white hover:bg-[#003d7a] transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          {filteredLogs.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-lg">No activity logs found</p>
              <p className="text-sm mt-2">Activity will be logged here as actions are performed</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Date/Time</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Category</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Action</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">User</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Description</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 text-sm text-slate-600">{formatDate(log.createdAt)}</td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getCategoryColor(log.category)}`}>
                          {log.category}
                        </span>
                      </td>
                      <td className="py-4 text-sm font-medium text-slate-900">{log.action}</td>
                      <td className="py-4 text-sm text-slate-600">
                        {log.userName || log.userEmail || "System"}
                      </td>
                      <td className="py-4 text-sm text-slate-600 max-w-md truncate">{log.description}</td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewLog(log)}
                            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteLog(log.id)}
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* View Log Modal */}
        {showModal && selectedLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleCloseModal}>
            <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-900">Activity Log Details</h2>
                <button
                  onClick={handleCloseModal}
                  className="rounded-full bg-slate-100 p-2 hover:bg-slate-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Action</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{selectedLog.action}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</p>
                    <span className={`inline-flex mt-1 rounded-full px-3 py-1 text-xs font-bold ${getCategoryColor(selectedLog.category)}`}>
                      {selectedLog.category}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</p>
                  <div className="mt-2 rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedLog.description}</p>
                  </div>
                </div>

                {selectedLog.userName && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">User Name</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{selectedLog.userName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">User Email</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{selectedLog.userEmail}</p>
                    </div>
                  </div>
                )}

                {selectedLog.oldValue && (
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Old Value</p>
                    <div className="mt-2 rounded-xl bg-red-50 p-4 border border-red-200">
                      <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedLog.oldValue}</p>
                    </div>
                  </div>
                )}

                {selectedLog.newValue && (
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Value</p>
                    <div className="mt-2 rounded-xl bg-emerald-50 p-4 border border-emerald-200">
                      <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedLog.newValue}</p>
                    </div>
                  </div>
                )}

                {selectedLog.metadata && Object.keys(selectedLog.metadata).length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Additional Information</p>
                    <div className="mt-2 rounded-xl bg-blue-50 p-4 border border-blue-200">
                      <pre className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {JSON.stringify(selectedLog.metadata, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500">
                    Log created on {formatDate(selectedLog.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}