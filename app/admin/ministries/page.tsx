"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import MinistryMediaManager from "./library-management";
import { db } from "../../lib/firebase";
import { 
  collection, 
  getDocs, 
  orderBy, 
  query, 
  Timestamp,
  doc,
  deleteDoc,
  setDoc,
  serverTimestamp 
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

interface Ministry {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  imageUrl?: string;
  status: "active" | "inactive" | "archived";
  order: number;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export default function AdminMinistriesPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [fetchingMinistries, setFetchingMinistries] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);
  const [saving, setSaving] = useState(false);
  const [showMediaManager, setShowMediaManager] = useState(false);
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "",
    imageUrl: "",
    status: "active" as "active" | "inactive" | "archived",
    order: 0
  });

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
    if (isAdmin && !fetchingMinistries) {
      fetchMinistries();
    }
  }, [isAdmin]);

  const fetchMinistries = async () => {
    setFetchingMinistries(true);
    try {
      const { collection, getDocs, orderBy, query } = await import("firebase/firestore");
      const q = query(collection(db, "ministries"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      const ministriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Ministry[];
      setMinistries(ministriesData);
    } catch (error) {
      console.error("Error fetching ministries:", error);
    } finally {
      setFetchingMinistries(false);
    }
  };

  const handleOpenModal = (ministry?: Ministry) => {
    if (ministry) {
      setEditingMinistry(ministry);
      setFormData({
        name: ministry.name,
        slug: ministry.slug,
        description: ministry.description,
        icon: ministry.icon,
        imageUrl: ministry.imageUrl || "",
        status: ministry.status,
        order: ministry.order
      });
    } else {
      setEditingMinistry(null);
      setFormData({
        name: "",
        slug: "",
        description: "",
        icon: "",
        imageUrl: "",
        status: "active",
        order: ministries.length
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMinistry(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      icon: "",
      imageUrl: "",
      status: "active",
      order: 0
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { setDoc, serverTimestamp } = await import("firebase/firestore");
      
      if (editingMinistry) {
        // Update existing ministry
        const ministryRef = doc(db, "ministries", editingMinistry.id);
        await setDoc(ministryRef, {
          ...formData,
          updatedAt: serverTimestamp()
        }, { merge: true });
        alert("Ministry updated successfully!");
      } else {
        // Create new ministry
        const ministryRef = doc(collection(db, "ministries"));
        await setDoc(ministryRef, {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        alert("Ministry created successfully!");
      }

      handleCloseModal();
      await fetchMinistries();
    } catch (error) {
      console.error("Error saving ministry:", error);
      alert("Failed to save ministry. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleOpenMediaManager = (ministry: Ministry) => {
    setSelectedMinistry(ministry);
    setShowMediaManager(true);
  };

  const handleCloseMediaManager = () => {
    setShowMediaManager(false);
    setSelectedMinistry(null);
  };

  const handleDeleteMinistry = async (ministryId: string, ministryName: string) => {
    if (!confirm(`Are you sure you want to delete "${ministryName}"? This action cannot be undone.`)) return;

    try {
      const { deleteDoc } = await import("firebase/firestore");
      await deleteDoc(doc(db, "ministries", ministryId));
      await fetchMinistries();
      alert("Ministry deleted successfully!");
    } catch (error) {
      console.error("Error deleting ministry:", error);
      alert("Failed to delete ministry. Please try again.");
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-yellow-100 text-yellow-700";
      case "archived":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return "N/A";
    return timestamp.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

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

      <main className="ml-0 lg:ml-64 min-h-screen bg-[#F8FAFC] p-8 pt-20 lg:pt-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Ministries Management</h1>
            <p className="mt-2 text-slate-600">Create and manage ministry pages and content</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="rounded-xl bg-[#0055b8] px-4 py-2 text-sm font-bold text-white hover:bg-[#003d7a] transition-colors"
          >
            + Add Ministry
          </button>
        </div>

        {/* Ministries Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ministries.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500">
              <p className="text-lg">No ministries created yet</p>
              <p className="text-sm mt-2">Click "Add Ministry" to create your first ministry page</p>
            </div>
          ) : (
            ministries.map((ministry) => (
              <div key={ministry.id} className="rounded-3xl bg-white p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{ministry.icon || "⛪"}</div>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusColor(ministry.status)}`}>
                    {ministry.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{ministry.name}</h3>
                <p className="text-xs text-slate-500 font-mono mb-3">/{ministry.slug}</p>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">{ministry.description}</p>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span>Order: {ministry.order}</span>
                  <span>Updated: {formatDate(ministry.updatedAt)}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(ministry)}
                    className="flex-1 rounded-xl bg-[#0055b8] px-3 py-2 text-xs font-bold text-white hover:bg-[#003d7a] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleOpenMediaManager(ministry)}
                    className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
                  >
                    Media
                  </button>
                  <button
                    onClick={() => handleDeleteMinistry(ministry.id, ministry.name)}
                    className="rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Media Library Manager */}
        {showMediaManager && selectedMinistry && (
          <MinistryMediaManager
            ministrySlug={selectedMinistry.slug}
            ministryName={selectedMinistry.name}
            isOpen={showMediaManager}
            onClose={handleCloseMediaManager}
          />
        )}

        {/* Add/Edit Ministry Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleCloseModal}>
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-900">
                  {editingMinistry ? "Edit Ministry" : "Add New Ministry"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="rounded-full bg-slate-100 p-2 hover:bg-slate-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ministry Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setFormData({ 
                        ...formData, 
                        name,
                        slug: editingMinistry ? formData.slug : generateSlug(name)
                      });
                    }}
                    placeholder="e.g. Bible College"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. bible-college"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
                  <p className="text-xs text-slate-500 mt-1">This will be used in the URL: /ministries/{formData.slug}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    placeholder="Describe this ministry..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Icon (Emoji)</label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="e.g. ⛪"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    min="0"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
                  <p className="text-xs text-slate-500 mt-1">Lower numbers appear first</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 rounded-xl bg-[#0055b8] px-4 py-2 text-sm font-bold text-white hover:bg-[#003d7a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "Saving..." : editingMinistry ? "Update Ministry" : "Create Ministry"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}