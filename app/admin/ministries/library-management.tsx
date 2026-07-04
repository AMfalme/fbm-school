"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, updateDoc, doc, query, where, orderBy, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface MinistryMedia {
  id: string;
  ministrySlug: string;
  photoUrl: string;
  title: string;
  subtitle?: string;
  description: string;
  mediaType: "image" | "video";
  displayOrder: number;
  createdAt: any;
  updatedAt: any;
}

interface MinistryMediaManagerProps {
  ministrySlug: string;
  ministryName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function MinistryMediaManager({ ministrySlug, ministryName, isOpen, onClose }: MinistryMediaManagerProps) {
  const [media, setMedia] = useState<MinistryMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  useEffect(() => {
    if (isOpen && ministrySlug) {
      fetchMinistryMedia();
    }
  }, [isOpen, ministrySlug]);

  const fetchMinistryMedia = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "ministry-media"),
        where("ministrySlug", "==", ministrySlug),
        orderBy("displayOrder", "asc")
      );
      const snapshot = await getDocs(q);
      const mediaItems: MinistryMedia[] = [];
      snapshot.forEach((doc) => {
        mediaItems.push({ id: doc.id, ...doc.data() } as MinistryMedia);
      });
      setMedia(mediaItems);
    } catch (error) {
      console.error("Error fetching ministry media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (): Promise<string | null> => {
    if (!selectedFile) return null;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("folder", `ministries/${ministrySlug}`);

      const response = await fetch("/api/cloudinary-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    setSaving(true);
    try {
      let photoUrl = "";
      
      // Upload file if selected
      if (selectedFile) {
        photoUrl = (await handleFileUpload()) || "";
        if (!photoUrl) {
          setSaving(false);
          return;
        }
      } else {
        alert("Please select a file to upload");
        setSaving(false);
        return;
      }

      await addDoc(collection(db, "ministry-media"), {
        ministrySlug,
        photoUrl,
        title,
        subtitle: subtitle.trim() || "",
        description,
        mediaType,
        displayOrder: media.length,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Reset form
      setTitle("");
      setSubtitle("");
      setDescription("");
      setSelectedFile(null);
      setMediaType("image");

      // Refresh list
      await fetchMinistryMedia();
      alert("Media added successfully!");
    } catch (error) {
      console.error("Error adding media:", error);
      alert("Failed to add media. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMedia = async (mediaId: string) => {
    if (!confirm("Are you sure you want to delete this media? This action cannot be undone.")) return;

    try {
      const { setDoc, serverTimestamp: ts } = await import("firebase/firestore");
      
      // Soft delete by marking as deleted (you can also use deleteDoc for hard delete)
      const mediaRef = doc(db, "ministry-media", mediaId);
      await updateDoc(mediaRef, {
        deleted: true,
        deletedAt: ts(),
        updatedAt: ts()
      });

      await fetchMinistryMedia();
      alert("Media deleted successfully!");
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Failed to delete media. Please try again.");
    }
  };

  const handleReorder = async (mediaId: string, direction: "up" | "down") => {
    const mediaIndex = media.findIndex(m => m.id === mediaId);
    if (mediaIndex === -1) return;

    const newMedia = [...media];
    const swapIndex = direction === "up" ? mediaIndex - 1 : mediaIndex + 1;

    if (swapIndex < 0 || swapIndex >= newMedia.length) return;

    // Swap displayOrder values
    const currentOrder = newMedia[mediaIndex].displayOrder;
    const swapOrder = newMedia[swapIndex].displayOrder;

    const { setDoc, serverTimestamp: ts } = await import("firebase/firestore");
    
    try {
      await setDoc(doc(db, "ministry-media", mediaId), {
        displayOrder: swapOrder,
        updatedAt: ts()
      }, { merge: true });

      await setDoc(doc(db, "ministry-media", newMedia[swapIndex].id), {
        displayOrder: currentOrder,
        updatedAt: ts()
      }, { merge: true });

      await fetchMinistryMedia();
    } catch (error) {
      console.error("Error reordering media:", error);
      alert("Failed to reorder media. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Media Library</h2>
            <p className="text-sm text-slate-600 mt-1">Manage images for {ministryName}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 hover:bg-slate-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Media Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add New Media</h3>
            <form onSubmit={handleAddMedia} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Classroom Learning"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Interactive lessons for young learners"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Describe this media..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 resize-none"
                  />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Media Type</label>
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as "image" | "video")}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Upload File *</label>
                  <input
                    type="file"
                    accept={mediaType === "image" ? "image/*" : "video/*"}
                    onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
                {selectedFile && (
                  <p className="text-xs text-slate-500 mt-1">Selected: {selectedFile.name}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={saving || uploading}
                className="w-full rounded-xl bg-[#0055b8] px-4 py-2 text-sm font-bold text-white hover:bg-[#003d7a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving || uploading ? "Uploading..." : "Add Media"}
              </button>
            </form>
          </div>

          {/* Media List */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Current Media ({media.length} items)
            </h3>
            {loading ? (
              <div className="text-center py-8 text-slate-500">Loading...</div>
            ) : media.length === 0 ? (
              <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                <p>No media uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {media.map((item, index) => (
                  <div key={item.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.mediaType === "video" ? (
                          <video src={item.photoUrl} className="w-full h-full object-cover" />
                        ) : (
                          <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{item.title}</h4>
                        {item.subtitle && (
                          <p className="text-xs text-slate-600 mt-1 line-clamp-1">{item.subtitle}</p>
                        )}
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-slate-500">Order: {item.displayOrder}</span>
                          <span className="text-xs text-slate-400">|</span>
                          <span className="text-xs text-slate-500 capitalize">{item.mediaType}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleReorder(item.id, "up")}
                        disabled={index === 0}
                        className="flex-1 rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ↑ Up
                      </button>
                      <button
                        onClick={() => handleReorder(item.id, "down")}
                        disabled={index === media.length - 1}
                        className="flex-1 rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ↓ Down
                      </button>
                      <button
                        onClick={() => handleDeleteMedia(item.id)}
                        className="flex-1 rounded-lg bg-red-50 px-2 py-1 text-xs font-bold text-red-700 hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

