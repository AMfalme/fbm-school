"use client";

import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { Upload, X } from "lucide-react";

type MediaCategory = "construction" | "classroom" | "church-community" | "conference" | "bible-college" | "hospital" | "mission-projects";
type MediaStatus = "completed" | "in-progress" | "upcoming" | "planning" | "design-phase" | "future-phase" | null;

interface MediaItem {
  id: string;
  photoUrl: string;
  title: string;
  description: string;
  category: MediaCategory;
  status: MediaStatus;
  iconUrl?: string;
  videoUrl?: string;
  mediaType: "image" | "video";
  createdAt: string;
  gallery?: Array<{
    url: string;
    mediaType: "image" | "video";
    description?: string;
  }>;
}

const CATEGORIES: { value: MediaCategory; label: string }[] = [
  { value: "construction", label: "Construction Progress / Project" },
  { value: "classroom", label: "Classroom / Mission School (CFA)" },
  { value: "church-community", label: "Church & Community Involvement" },
  { value: "mission-projects", label: "Mission Projects" },
  { value: "conference", label: "Conferences & Seminars" },
  { value: "bible-college", label: "Bible College Activities" },
  { value: "hospital", label: "Mission Hospital & Medical Ministry" },
];

const STATUSES: { value: MediaStatus; label: string }[] = [
  { value: null, label: "No Status" },
  { value: "completed", label: "Completed" },
  { value: "in-progress", label: "In Progress" },
  { value: "upcoming", label: "Upcoming" },
  { value: "planning", label: "Planning" },
  { value: "design-phase", label: "Design Phase" },
  { value: "future-phase", label: "Future Phase" },
];

const STATIC_MEDIA: MediaItem[] = [
  {
    id: "static-1",
    photoUrl: "https://images.unsplash.com/photo-1486406146926-c627de92e4e4?auto=format&fit=crop&w=800&q=80",
    title: "Main Campus Construction",
    description: "Expansion of our central campus facilities including classrooms, dormitories, and administrative buildings to accommodate growing student enrollment and academic programs.",
    category: "construction",
    status: "in-progress",
    iconUrl: "",
    mediaType: "image",
    createdAt: new Date().toISOString(),
  },
  {
    id: "static-2",
    photoUrl: "https://images.unsplash.com/photo-1427504494785-cdbeadb3a6b7?auto=format&fit=crop&w=800&q=80",
    title: "Christian Faith Academy Classroom",
    description: "State-of-the-art learning environment at CFA designed to foster critical thinking, character development, and academic excellence for our students from grades 1-12.",
    category: "classroom",
    status: "completed",
    iconUrl: "",
    mediaType: "image",
    createdAt: new Date().toISOString(),
  },
  {
    id: "static-3",
    photoUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    title: "Community Outreach Event",
    description: "FBM's commitment to touching lives through community development programs, medical outreach clinics, and spiritual discipleship initiatives across underserved regions.",
    category: "church-community",
    status: "completed",
    iconUrl: "",
    mediaType: "image",
    createdAt: new Date().toISOString(),
  },
];

export default function AdminMediaPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "construction" as MediaCategory,
    status: null as MediaStatus,
    photoUrl: "",
    iconUrl: "",
    videoUrl: "",
    mediaType: "image" as "image" | "video",
  });
  const [previewPhoto, setPreviewPhoto] = useState<string>("");
  const [previewIcon, setPreviewIcon] = useState<string>("");
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [galleryTypes, setGalleryTypes] = useState<("image" | "video")[]>([]);
  const [expandedGallery, setExpandedGallery] = useState<string | null>(null);

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

        if (adminStatus) {
          fetchMedia();
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchMedia = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "media"));
      const items: MediaItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MediaItem);
      });
      setMedia(items.length > 0 ? items : STATIC_MEDIA);
    } catch (error) {
      console.error("Error fetching media:", error);
      setMedia(STATIC_MEDIA);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "fbm-media/photos");

      const response = await fetch("/api/cloudinary-upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.secure_url) {
        setFormData((prev) => ({ ...prev, photoUrl: result.secure_url }));
        setPreviewPhoto(result.secure_url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleIconChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "fbm-media/icons");

      const response = await fetch("/api/cloudinary-upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.secure_url) {
        setFormData((prev) => ({ ...prev, iconUrl: result.secure_url }));
        setPreviewIcon(result.secure_url);
      }
    } catch (error) {
      console.error("Icon upload failed:", error);
      alert("Icon upload failed");
    } finally {
      setUploading(false);
    }
  };

  const uploadGalleryFiles = async (): Promise<MediaItem["gallery"]> => {
    const uploaded: MediaItem["gallery"] = [];
    for (const file of galleryFiles) {
      try {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", "fbm-media/gallery");
        const response = await fetch("/api/cloudinary-upload", {
          method: "POST",
          body: fd,
        });
        const result = await response.json();
        if (result.secure_url) {
          uploaded.push({
            url: result.secure_url,
            mediaType: file.type.startsWith("video/") ? "video" : "image",
          });
        }
      } catch (error) {
        console.error("Error uploading gallery file:", error);
      }
    }
    return uploaded;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.photoUrl) {
      alert("Please fill all required fields and upload media");
      return;
    }

    try {
      const idToUse = editingId ?? Date.now().toString();
      const createdAt = editingId ? (media.find((m) => m.id === editingId)?.createdAt ?? new Date().toISOString()) : new Date().toISOString();

      setUploading(true);
      const gallery = await uploadGalleryFiles();

      const payload = {
        ...formData,
        mediaType: formData.mediaType || "image",
        createdAt,
        gallery: gallery && gallery.length > 0 ? gallery : undefined,
      };

      await setDoc(doc(db, "media", idToUse), payload);

      if (editingId) {
        setMedia((prev) => prev.map((m) => (m.id === editingId ? ({ id: editingId, ...(payload as any) } as MediaItem) : m)));
      } else {
        setMedia((prev) => [{ id: idToUse, ...(payload as any) } as MediaItem, ...prev]);
      }

      setFormData({
        title: "",
        description: "",
        category: "construction",
        status: null,
        photoUrl: "",
        iconUrl: "",
        videoUrl: "",
        mediaType: "image",
      });
      setPreviewPhoto("");
      setPreviewIcon("");
      setGalleryFiles([]);
      setGalleryPreviews([]);
      setGalleryTypes([]);
      setShowForm(false);
      setEditingId(null);
      alert("Media saved successfully!");
    } catch (error) {
      console.error("Error saving media:", error);
      alert("Failed to save media");
    }
  };

  const handleEdit = (item: MediaItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category as MediaCategory,
      status: item.status as MediaStatus,
      photoUrl: item.photoUrl,
      iconUrl: item.iconUrl || "",
      videoUrl: item.videoUrl || "",
      mediaType: item.mediaType,
    });
    setPreviewPhoto(item.photoUrl);
    setPreviewIcon(item.iconUrl || "");

    // Load existing gallery items into the form
    setGalleryFiles([]);
    setGalleryPreviews(item.gallery?.map(g => g.url) ?? []);
    setGalleryTypes(item.gallery?.map(g => g.mediaType || "image") ?? []);

    setShowForm(true);
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return;

    try {
      await deleteDoc(doc(db, "media", id));
      setMedia((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Failed to delete media");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF9]">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-lg">
          <p className="font-medium text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF9]">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-lg">
          <p className="font-medium text-red-600">Access denied.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />

      <main className="ml-0 lg:ml-72 min-h-screen w-full bg-[#F8FAFC] p-8 pt-20 lg:pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-black text-slate-950">Media & Gallery Management</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0055b8] px-4 py-2 font-bold text-white transition hover:bg-[#0b67d0]"
            >
              <Upload size={18} />
              {showForm ? "Cancel" : "Upload Media"}
            </button>
          </div>

          {/* Upload Form */}
          {showForm && (
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-slate-950">Upload New Media</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="e.g., Main Campus Construction"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value as MediaCategory,
                        }))
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                      placeholder="Brief description of the media"
                      rows={3}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 resize-none"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Status (Optional)
                    </label>
                    <select
                      value={formData.status || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value === "" ? null : (e.target.value as MediaStatus),
                        }))
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                    >
                      {STATUSES.map((status) => (
                        <option key={status.value || "null"} value={status.value || ""}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Media Type Selection */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Media Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.mediaType}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mediaType: e.target.value as "image" | "video",
                        }))
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  {/* Photo/Video Upload */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      {formData.mediaType === "image" ? "Photo Upload" : "Video Upload"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept={formData.mediaType === "image" ? "image/*" : "video/*"}
                      onChange={handlePhotoChange}
                      disabled={uploading}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                    />
                  </div>

                  {/* Icon Upload (for classrooms) */}
                  {formData.category === "classroom" && (
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Icon/SVG Upload (Optional)
                      </label>
                      <input
                        type="file"
                        accept="image/svg+xml,image/*"
                        onChange={handleIconChange}
                        disabled={uploading}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                      />
                    </div>
                  )}

                  {/* Gallery Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Related Media / Gallery
                    </label>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setGalleryFiles(files);
                        const previews = files.map((f) => URL.createObjectURL(f));
                        const types = files.map((f) => (f.type.startsWith("video/") ? "video" : "image"));
                        setGalleryPreviews(previews);
                        setGalleryTypes(types);
                      }}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                    />
                    {galleryPreviews.length > 0 && (
                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {galleryPreviews.map((src, idx) => (
                          <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                            {galleryTypes[idx] === "video" ? (
                              <video src={src} className="h-full w-full object-cover" muted />
                            ) : (
                              <img src={src} alt={`Gallery ${idx + 1}`} className="h-full w-full object-cover" />
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                URL.revokeObjectURL(galleryPreviews[idx]);
                                setGalleryFiles((prev) => prev.filter((_, i) => i !== idx));
                                setGalleryPreviews((prev) => prev.filter((_, i) => i !== idx));
                                setGalleryTypes((prev) => prev.filter((_, i) => i !== idx));
                              }}
                              className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Existing gallery preview when editing */}
                    {editingId && (() => {
                      const current = media.find((m: MediaItem) => m.id === editingId);
                      const existing = current?.gallery ?? [];
                      if (existing.length === 0) return null;
                      return (
                        <div className="mt-4">
                          <p className="text-xs font-bold text-slate-700 mb-2">Existing Gallery</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {existing.map((g, idx) => (
                              <div key={idx} className="aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                                {g.mediaType === "video" ? (
                                  <video src={g.url} className="h-full w-full object-cover" controls />
                                ) : (
                                  <img src={g.url} alt={`Gallery ${idx + 1}`} className="h-full w-full object-cover" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Preview */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {previewPhoto && formData.mediaType === "image" && (
                    <div>
                      <p className="mb-2 text-sm font-bold text-slate-700">Photo Preview:</p>
                      <img
                        src={previewPhoto}
                        alt="Preview"
                        className="h-48 w-full rounded-lg object-cover"
                      />
                    </div>
                  )}
                  {previewPhoto && formData.mediaType === "video" && (
                    <div>
                      <p className="mb-2 text-sm font-bold text-slate-700">Video Preview:</p>
                      <video
                        src={previewPhoto}
                        controls
                        className="h-48 w-full rounded-lg object-cover"
                      />
                    </div>
                  )}
                  {previewIcon && (
                    <div>
                      <p className="mb-2 text-sm font-bold text-slate-700">Icon Preview:</p>
                      <img
                        src={previewIcon}
                        alt="Icon Preview"
                        className="h-48 w-full rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full rounded-lg bg-[#0055b8] px-4 py-3 font-bold text-white transition hover:bg-[#0b67d0] disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Save Media"}
                </button>
              </form>
            </div>
          )}

          {/* Media Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {media.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  {item.mediaType === "video" ? (
                    <video
                      src={item.photoUrl}
                      className="h-full w-full object-cover"
                      controls
                    />
                  ) : (
                    <img
                      src={item.photoUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                  {item.iconUrl && (
                    <div className="absolute right-2 top-2 h-12 w-12 rounded-full bg-white p-1 shadow-md">
                      <img src={item.iconUrl} alt="Icon" className="h-full w-full" />
                    </div>
                  )}
                  <div className="absolute left-2 top-2 inline-block rounded-md bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                    {CATEGORIES.find((c) => c.value === item.category)?.label || item.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="mb-2 font-bold text-slate-950">{item.title}</h3>
                  <p className="mb-3 text-sm text-slate-600">{item.description}</p>

                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className={`inline-block rounded-md px-2 py-1 text-xs font-bold ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "in-progress"
                          ? "bg-blue-100 text-blue-700"
                          : item.status
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.status ? STATUSES.find((s) => s.value === item.status)?.label || "Unknown" : "No Status"}
                    </span>
                  </div>

                  {!item.id.startsWith("static-") && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 transition hover:bg-amber-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
                      >
                        <X size={14} />
                        Delete
                      </button>
                    </div>
                  )}

                  {(item.gallery ?? []).length > 0 && (
                    <button
                      onClick={() => setExpandedGallery(expandedGallery === item.id ? null : item.id)}
                      className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
                    >
                      {expandedGallery === item.id ? "Hide Gallery" : "View Gallery ({(item.gallery?.length ?? 0) + 1})"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Inline Gallery Expansion */}
          {expandedGallery && (() => {
            const expandedItem = media.find((m) => m.id === expandedGallery);
            if (!expandedItem) return null;
            const galleryItems = [{url: expandedItem.photoUrl, mediaType: expandedItem.mediaType, description: expandedItem.description}, ...(expandedItem.gallery ?? [])];
            return (
              <div className="mt-6 rounded-2xl border-2 border-[#0055b8] bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">{expandedItem.title}</h3>
                  <button
                    onClick={() => setExpandedGallery(null)}
                    className="rounded-full bg-slate-100 p-2 hover:bg-slate-200"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="mb-6 text-sm text-slate-600">{expandedItem.description}</p>
                <div className="grid gap-4 md:grid-cols-2">
                  {galleryItems.map((media, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                      <div className="aspect-video bg-slate-100">
                        {media.mediaType === "video" ? (
                          <video src={media.url} className="h-full w-full object-cover" controls />
                        ) : (
                          <img src={media.url} alt={`Media ${idx + 1}`} className="h-full w-full object-cover" />
                        )}
                      </div>
                      {media.description && (
                        <div className="p-3">
                          <p className="text-xs text-slate-600">{media.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </main>
    </div>
  );
}