"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "../../components/AdminSidebar";
import {
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../../lib/firebase";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branch: string;
  bio: string;
  imageUrl: string;
  status: "active" | "inactive";
}

export default function TeamManagementPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<TeamMember, "id">>({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    branch: "",
    bio: "",
    imageUrl: "",
    status: "active",
  });

  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (!u) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", u.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          setIsAdmin(snap.data()?.role === "admin");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, "management"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: TeamMember[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<TeamMember, "id">),
      }));
      setMembers(data);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      department: "",
      email: "",
      phone: "",
      branch: "",
      bio: "",
      imageUrl: "",
      status: "active",
    });

    setEditingId(null);
    setShowForm(false);
    setImagePreview(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("folder", "management");

    try {
      const res = await fetch("/api/cloudinary-upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setFormData({ ...formData, imageUrl: data.secure_url });
        setImagePreview(data.secure_url);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await setDoc(doc(db, "management", editingId), formData, {
          merge: true,
        });
      } else {
        await addDoc(collection(db, "management"), formData);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving management member:", error);
      alert("Failed to save. Please try again.");
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);

    setFormData({
      name: member.name,
      position: member.position,
      department: member.department,
      email: member.email,
      phone: member.phone,
      branch: member.branch,
      bio: member.bio,
      imageUrl: member.imageUrl,
      status: member.status,
    });

    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;

    try {
      await deleteDoc(doc(db, "management", id));
    } catch (error) {
      console.error("Error deleting management member:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking permissions...
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-lg rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-xl font-bold text-red-700">
            Access Denied
          </h2>

          <p className="mt-3 text-red-600">
            Only administrators can access Team
            Management.
          </p>
        </div>
      </div>
    );
  }

  const activeMembers = members.filter(
    (m) => m.status === "active"
  ).length;

  const departments = new Set(
    members.map((m) => m.department)
  ).size;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="ml-72 flex-1 p-8">
      <div className="mb-8 overflow-hidden rounded-[32px] bg-gradient-to-r from-[#0055b8] via-[#0b67d0] to-[#3b82f6] p-8 text-white shadow-2xl">
  <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-50">
    Light To Life International Ministries
  </p>

  <h1 className="mt-3 text-4xl font-black lg:text-5xl">
    Team Management
  </h1>

  <p className="mt-4 max-w-3xl text-base leading-relaxed text-blue-50">
    Manage pastors, bishops, directors, ministry coordinators,
    missionaries and support staff across all ministry branches.
  </p>
</div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
  <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
    <p className="text-sm font-semibold text-slate-600">
      Total Team Members
    </p>

    <h3 className="mt-2 text-4xl font-black text-slate-900">
      {members.length}
    </h3>
  </div>

  <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
    <p className="text-sm font-semibold text-slate-600">
      Active Members
    </p>

    <h3 className="mt-2 text-4xl font-black text-green-600">
      {activeMembers}
    </h3>
  </div>

  <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
    <p className="text-sm font-semibold text-slate-600">
      Departments
    </p>

    <h3 className="mt-2 text-4xl font-black text-[#0055b8]">
      {departments}
    </h3>
  </div>
</div>

       <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
  <div>
    <h2 className="text-2xl font-bold text-slate-900">
      Ministry Directory
    </h2>

    <p className="mt-1 text-slate-700">
      Create, update and manage ministry leaders and staff.
    </p>
  </div>

  <button
    onClick={() => setShowForm(true)}
    className="rounded-2xl bg-[#0055b8] px-6 py-3 font-bold text-white shadow-lg transition hover:bg-[#003d7a]"
  >
    + Add Team Member
  </button>
</div>

        {showForm && (
          <div className="mb-8 rounded-3xl bg-white p-8 shadow">
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 md:grid-cols-2"
            >
              <input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-500 focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-blue-100"
                required
              />

              <input
                placeholder="Position"
                value={formData.position}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    position: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-500 focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-blue-100"
                required
              />

              <input
                placeholder="Department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-500 focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />

              <input
                placeholder="Branch"
                value={formData.branch}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    branch: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-500 focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />

              <input
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-500 focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />

              <input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-500 focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Team Member Photo
                </label>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-50">
                      {uploading ? "Uploading..." : "Choose Image"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>

                    {formData.imageUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, imageUrl: "" });
                          setImagePreview(null);
                        }}
                        className="rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {(imagePreview || formData.imageUrl) && (
                    <img
                      src={imagePreview || formData.imageUrl}
                      alt="Preview"
                      className="h-48 w-full rounded-2xl border border-slate-200 object-cover"
                    />
                  )}
                </div>
              </div>

              <textarea
                placeholder="Biography"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bio: e.target.value,
                  })
                }
                className="rounded-xl border p-3 md:col-span-2"
                rows={4}
              />

              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-[#0055b8] px-5 py-3 font-bold text-white"
                >
                  {editingId
                    ? "Update Member"
                    : "Create Member"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border px-5 py-3 font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={
                  member.imageUrl ||
                  "https://placehold.co/600x400"
                }
                alt={member.name}
                className="mb-4 h-56 w-full rounded-2xl object-cover"
              />

             <h3 className="text-xl font-bold text-slate-900">
  {member.name}
</h3>

<p className="font-semibold text-[#0055b8]">
  {member.position}
</p>

<p className="mt-2 text-sm text-slate-700">
  {member.department}
</p>

<p className="mt-1 text-sm text-slate-600">
  {member.branch}
</p>

<p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-700">
  {member.bio}
</p>

              <div className="mt-5 flex gap-3">
  <button
    onClick={() => handleEdit(member)}
    className="flex-1 rounded-xl border border-slate-300 bg-white py-2 font-semibold text-slate-800 transition hover:bg-slate-50"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(member.id)}
    className="flex-1 rounded-xl bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700"
  >
    Delete
  </button>
</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
