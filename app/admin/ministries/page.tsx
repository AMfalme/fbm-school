"use client";

import { useEffect, useState, useRef } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import MinistryMediaManager from "./library-management";
import { db } from "../../lib/firebase";
import { 
  collection, 
  getDocs, 
  getDoc,
  orderBy, 
  query, 
  where,
  Timestamp,
  doc,
  deleteDoc,
  setDoc,
  addDoc,
  serverTimestamp 
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Ministry {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  highlights: string[];
  icon: string;
  imageUrl?: string;
  profileImage?: string;
  status: "active" | "inactive" | "archived";
  order: number;
  subcategories?: SubCategory[];
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

interface SubCategory {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  images: MinistryImage[];
}

interface MinistryImage {
  id: string;
  url: string;
  caption: string;
  uploadedAt: string;
  mediaType?: "image" | "video";
}

interface MediaItem {
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

interface MediaLibrary {
  slug: string;
  items: MediaItem[];
  newFiles: File[];
  newPreviews: string[];
  newTitles: string[];
  newTypes: ("image" | "video")[];
  deletingIds: Set<string>;
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
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [showMediaManager, setShowMediaManager] = useState(false);
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);

  const profileInputRef = useRef<HTMLInputElement>(null);

  // Libraries keyed by slug for the edit form
  const [libraries, setLibraries] = useState<Map<string, MediaLibrary>>(new Map());
  const [loadingLibraries, setLoadingLibraries] = useState(false);
  const [newLibrarySlug, setNewLibrarySlug] = useState("");
  const [newLibraryFiles, setNewLibraryFiles] = useState<File[]>([]);
  const [newLibraryPreviews, setNewLibraryPreviews] = useState<string[]>([]);
  const [newLibraryTitles, setNewLibraryTitles] = useState<string[]>([]);
  const newLibraryFileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    highlights: [""],
    icon: "",
    imageUrl: "",
    profileImage: "",
    status: "active" as "active" | "inactive" | "archived",
    order: 0
  });

  // Profile image upload state
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>("");

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

  // Fetch media only for a specific slug
  const fetchMediaForSlug = async (slug: string) => {
    setLoadingLibraries(true);
    try {
      const q = query(
        collection(db, "ministry-media"),
        where("ministrySlug", "==", slug),
        orderBy("displayOrder", "asc")
      );
      const snapshot = await getDocs(q);
      const items: MediaItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.deleted) return;
        items.push({ id: doc.id, ...data } as MediaItem);
      });

      setLibraries(prev => {
        const next = new Map(prev);
        if (items.length > 0) {
          next.set(slug, {
            slug,
            items,
            newFiles: [],
            newPreviews: [],
            newTitles: [],
            newTypes: [],
            deletingIds: new Set(),
          });
        }
        return next;
      });
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoadingLibraries(false);
    }
  };

  const handleOpenModal = (ministry?: Ministry) => {
    if (ministry) {
      setEditingMinistry(ministry);
      setFormData({
        name: ministry.name,
        slug: ministry.slug,
        description: ministry.description,
        shortDescription: ministry.shortDescription || "",
        highlights: ministry.highlights?.length ? ministry.highlights : [""],
        icon: ministry.icon,
        imageUrl: ministry.imageUrl || "",
        profileImage: ministry.profileImage || "",
        status: ministry.status,
        order: ministry.order
      });
      if (ministry.profileImage) {
        setProfilePreview(ministry.profileImage);
      }

      // Load media from ministry subcategories so images are visible when editing
      const libs = new Map<string, MediaLibrary>();
      ministry.subcategories?.forEach((sc) => {
        const items: MediaItem[] = (sc.images || []).map((img) => ({
          id: img.id,
          ministrySlug: ministry.slug,
          photoUrl: img.url,
          title: img.caption || img.url.split("/").pop() || "",
          description: "",
          mediaType: img.mediaType || "image",
          displayOrder: 0,
          createdAt: null,
          updatedAt: null,
        }));
        libs.set(sc.id, {
          slug: sc.id,
          items,
          newFiles: [],
          newPreviews: [],
          newTitles: [],
          newTypes: [],
          deletingIds: new Set(),
        });
      });
      setLibraries(libs);

      // Also fetch any standalone ministry-media entries so they appear in the edit form
      fetchMediaForSlug(ministry.slug);
    } else {
      setEditingMinistry(null);
      setFormData({
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        highlights: [""],
        icon: "",
        imageUrl: "",
        profileImage: "",
        status: "active",
        order: ministries.length
      });
      setProfilePreview("");
      setLibraries(new Map());
    }
    resetUploads();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMinistry(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      shortDescription: "",
      highlights: [""],
      icon: "",
      imageUrl: "",
      profileImage: "",
      status: "active",
      order: 0
    });
    resetUploads();
    setLibraries(new Map());
    setNewLibrarySlug("");
    setNewLibraryFiles([]);
    setNewLibraryPreviews([]);
    setNewLibraryTitles([]);
    setProfileFile(null);
    setProfilePreview("");
  };

  const resetUploads = () => {
    setNewLibrarySlug("");
    setNewLibraryFiles([]);
    setNewLibraryPreviews([]);
    setNewLibraryTitles([]);
  };

  // Handle profile image selection
  const handleProfileImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  // ===== LIBRARY FILE HANDLING =====
  const handleLibraryFilesSelected = (slug: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setLibraries(prev => {
      const next = new Map(prev);
      const lib = next.get(slug);
      if (!lib) return prev;

      files.forEach((file) => {
        lib.newFiles.push(file);
        lib.newPreviews.push(URL.createObjectURL(file));
        const name = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        lib.newTitles.push(name);
        lib.newTypes.push(file.type.startsWith("video/") ? "video" : "image");
      });
      next.set(slug, { ...lib });
      return next;
    });

    const input = fileInputRefs.current.get(slug);
    if (input) input.value = "";
  };

  const removeLibraryNewFile = (slug: string, index: number) => {
    setLibraries(prev => {
      const next = new Map(prev);
      const lib = next.get(slug);
      if (!lib) return prev;
      URL.revokeObjectURL(lib.newPreviews[index]);
      lib.newFiles = lib.newFiles.filter((_, i) => i !== index);
      lib.newPreviews = lib.newPreviews.filter((_, i) => i !== index);
      lib.newTitles = lib.newTitles.filter((_, i) => i !== index);
      lib.newTypes = lib.newTypes.filter((_, i) => i !== index);
      next.set(slug, { ...lib });
      return next;
    });
  };

  const updateLibraryNewTitle = (slug: string, index: number, title: string) => {
    setLibraries(prev => {
      const next = new Map(prev);
      const lib = next.get(slug);
      if (!lib) return prev;
      lib.newTitles[index] = title;
      next.set(slug, { ...lib });
      return next;
    });
  };

  // Delete existing media item from a library
  const handleDeleteLibraryItem = async (slug: string, mediaId: string) => {
    if (!confirm("Are you sure you want to delete this media item? This action cannot be undone.")) return;

    setLibraries(prev => {
      const next = new Map(prev);
      const lib = next.get(slug);
      if (!lib) return prev;
      lib.deletingIds = new Set(lib.deletingIds).add(mediaId);
      next.set(slug, { ...lib });
      return next;
    });

    try {
      const { updateDoc, serverTimestamp: ts } = await import("firebase/firestore");
      const mediaRef = doc(db, "ministry-media", mediaId);
      await updateDoc(mediaRef, { deleted: true, deletedAt: ts(), updatedAt: ts() });

      setLibraries(prev => {
        const next = new Map(prev);
        const lib = next.get(slug);
        if (!lib) return prev;
        lib.items = lib.items.filter(item => item.id !== mediaId);
        lib.deletingIds = new Set([...lib.deletingIds].filter(id => id !== mediaId));
        next.set(slug, { ...lib });
        return next;
      });
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Failed to delete media. Please try again.");
      setLibraries(prev => {
        const next = new Map(prev);
        const lib = next.get(slug);
        if (!lib) return prev;
        lib.deletingIds = new Set([...lib.deletingIds].filter(id => id !== mediaId));
        next.set(slug, { ...lib });
        return next;
      });
    }
  };

  // New library (standalone) file handling
  const handleNewLibraryFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    files.forEach((file) => {
      newLibraryPreviews.push(URL.createObjectURL(file));
      const name = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      newLibraryTitles.push(name);
    });
    setNewLibraryFiles([...newLibraryFiles, ...files]);
    setNewLibraryPreviews([...newLibraryPreviews]);
    setNewLibraryTitles([...newLibraryTitles]);
    if (newLibraryFileInputRef.current) newLibraryFileInputRef.current.value = "";
  };

  const removeNewLibraryFile = (index: number) => {
    URL.revokeObjectURL(newLibraryPreviews[index]);
    setNewLibraryFiles(newLibraryFiles.filter((_, i) => i !== index));
    setNewLibraryPreviews(newLibraryPreviews.filter((_, i) => i !== index));
    setNewLibraryTitles(newLibraryTitles.filter((_, i) => i !== index));
  };

  const updateNewLibraryTitle = (index: number, title: string) => {
    const newTitles = [...newLibraryTitles];
    newTitles[index] = title;
    setNewLibraryTitles(newTitles);
  };

  // Highlights management
  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData({ ...formData, highlights: newHighlights });
  };

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, ""] });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData({ ...formData, highlights: newHighlights.length ? newHighlights : [""] });
  };

  const uploadFileToCloudinary = async (file: File, folder: string): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    try {
      const response = await fetch("/api/cloudinary-upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    let allUploadSuccess = true;

    try {
      const { setDoc, serverTimestamp } = await import("firebase/firestore");
      const cleanHighlights = formData.highlights.filter(h => h.trim() !== "");
      let profileImageUrl = formData.profileImage || "";

      if (profileFile) {
        const uploaded = await uploadFileToCloudinary(profileFile, `ministries/${formData.slug}/profile`);
        if (uploaded) profileImageUrl = uploaded;
      }

      // Build subcategories from libraries
      const subcategories: SubCategory[] = [];
      for (const [slug, lib] of libraries) {
        const existingSubcategory = editingMinistry?.subcategories?.find(sc => sc.id === slug);
        const images: MinistryImage[] = [];
        
        // Add existing images
        lib.items.forEach(item => {
          const existingImage = existingSubcategory?.images.find(img => img.id === item.id);
          images.push({
            id: item.id,
            url: item.photoUrl,
            caption: existingImage?.caption || item.title,
            uploadedAt: existingImage?.uploadedAt || new Date().toISOString()
          });
        });
        
        // Add newly uploaded images
        for (let i = 0; i < lib.newFiles.length; i++) {
          const file = lib.newFiles[i];
          const photoUrl = await uploadFileToCloudinary(file, `ministries/${slug}/gallery`);
          if (photoUrl) {
            images.push({
              id: `img-${Date.now()}-${i}`,
              url: photoUrl,
              caption: lib.newTitles[i] || file.name,
              uploadedAt: new Date().toISOString(),
              mediaType: file.type.startsWith("video/") ? "video" : "image"
            });
          } else {
            allUploadSuccess = false;
          }
        }
        
        subcategories.push({
          id: slug,
          title: existingSubcategory?.title || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          description: existingSubcategory?.description || "",
          coverImage: existingSubcategory?.coverImage || (images[0]?.url || ""),
          images
        });
      }

      const ministryData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        shortDescription: formData.shortDescription,
        highlights: cleanHighlights,
        icon: formData.icon,
        imageUrl: formData.imageUrl,
        profileImage: profileImageUrl,
        status: formData.status,
        order: formData.order,
        subcategories: subcategories.length > 0 ? subcategories : (editingMinistry?.subcategories || []),
        updatedAt: serverTimestamp()
      };

      if (editingMinistry) {
        const ministryRef = doc(db, "ministries", editingMinistry.id);
        await setDoc(ministryRef, ministryData, { merge: true });
      } else {
        const ministryRef = doc(collection(db, "ministries"));
        await setDoc(ministryRef, { ...ministryData, createdAt: serverTimestamp() });
      }

      // Upload new standalone library if any
      setUploadingMedia(true);
      
      if (newLibraryFiles.length > 0 && newLibrarySlug.trim()) {
        // When editing a ministry, use the ministry's slug instead of creating a new one
        const slug = editingMinistry ? editingMinistry.slug : generateSlug(newLibrarySlug);
        const newImages: MinistryImage[] = [];
        
        for (let i = 0; i < newLibraryFiles.length; i++) {
          const file = newLibraryFiles[i];
          const photoUrl = await uploadFileToCloudinary(file, `ministries/${slug}/gallery`);
          if (photoUrl) {
            newImages.push({
              id: `img-${Date.now()}-${i}`,
              url: photoUrl,
              caption: newLibraryTitles[i] || file.name,
              uploadedAt: new Date().toISOString(),
              mediaType: file.type.startsWith("video/") ? "video" : "image"
            });
          } else {
            allUploadSuccess = false;
          }
        }
        
        if (newImages.length > 0) {
          // Fetch current ministry data and add new subcategory
          const ministryRef = doc(db, "ministries", editingMinistry?.id || "");
          const ministrySnap = editingMinistry ? await getDoc(ministryRef) : null;
          const existingSubcats = ministrySnap?.data()?.subcategories || [];
          const newSubcategory: SubCategory = {
            id: slug,
            title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            description: "",
            coverImage: newImages[0].url,
            images: newImages
          };
          
          if (editingMinistry) {
            await setDoc(ministryRef, {
              subcategories: [...existingSubcats, newSubcategory],
              updatedAt: serverTimestamp()
            }, { merge: true });
          }
        }
      }

      if (!allUploadSuccess) {
        alert("Some media files failed to upload. You can add them later via the Media button.");
      }

      handleCloseModal();
      await fetchMinistries();
      alert(editingMinistry ? "Ministry updated successfully!" : "Ministry created successfully!");
    } catch (error) {
      console.error("Error saving ministry:", error);
      alert("Failed to save ministry. Please try again.");
    } finally {
      setSaving(false);
      setUploadingMedia(false);
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
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "inactive": return "bg-yellow-100 text-yellow-700";
      case "archived": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return "N/A";
    return timestamp.toDate().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const totalLibraryCount = libraries.size;
  const totalFileCount = Array.from(libraries.values()).reduce((acc, lib) => acc + lib.items.length, 0);

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
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{ministry.icon || "⛪"}</span>
                    {ministry.profileImage && (
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={ministry.profileImage} alt={ministry.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusColor(ministry.status)}`}>
                    {ministry.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1">{ministry.name}</h3>
                <p className="text-xs text-slate-500 font-mono mb-3">/{ministry.slug}</p>
                
                {ministry.shortDescription && (
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{ministry.shortDescription}</p>
                )}
                
                {ministry.highlights && ministry.highlights.length > 0 && ministry.highlights[0] !== "" && (
                  <div className="mb-3 space-y-1">
                    {ministry.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <span className="text-emerald-600 mt-0.5 shrink-0">•</span>
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                    {ministry.highlights.length > 3 && (
                      <p className="text-xs text-slate-400 pl-4">+{ministry.highlights.length - 3} more</p>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span>Order: {ministry.order}</span>
                  <span>Updated: {formatDate(ministry.updatedAt)}</span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/ministries/${ministry.slug}`}
                    className="flex-1 rounded-xl bg-purple-600 px-3 py-2 text-xs font-bold text-white hover:bg-purple-700 transition-colors text-center"
                  >
                    Manage Page
                  </Link>
                  <button
                    onClick={() => handleOpenModal(ministry)}
                    className="rounded-xl bg-[#0055b8] px-3 py-2 text-xs font-bold text-white hover:bg-[#003d7a] transition-colors"
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
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
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
                {/* ===== BASIC INFO ===== */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ministry Title *</label>
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
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
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
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                    />
                    <p className="text-xs text-slate-500 mt-1">URL: /ministries/{formData.slug}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Short Description *</label>
                  <input
                    type="text"
                    required
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="A brief one-line summary of this ministry"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    placeholder="Detailed description of this ministry..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 resize-none"
                  />
                </div>

                {/* ===== HIGHLIGHTS / BULLET POINTS ===== */}
                <div className="border-t border-slate-200 pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Highlights / Key Points</h3>
                      <p className="text-xs text-slate-500">Bullet points that summarize this ministry</p>
                    </div>
                    <button
                      type="button"
                      onClick={addHighlight}
                      className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      + Add Point
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-emerald-600 text-lg shrink-0">•</span>
                        <input
                          type="text"
                          value={highlight}
                          onChange={(e) => handleHighlightChange(index, e.target.value)}
                          placeholder="e.g. 14+ Local Churches Planted"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                        />
                        {formData.highlights.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeHighlight(index)}
                            className="text-red-500 hover:text-red-700 p-1 shrink-0"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ===== ICON, STATUS, ORDER ===== */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-200 pt-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Icon (Emoji)</label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="e.g. ⛪"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                    >
                      <option value="active" className="text-slate-900">Active</option>
                      <option value="inactive" className="text-slate-900">Inactive</option>
                      <option value="archived" className="text-slate-900">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      min="0"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                    />
                    <p className="text-xs text-slate-500 mt-1">Lower numbers appear first</p>
                  </div>
                </div>

                {/* ===== PROFILE IMAGE ===== */}
                <div className="border-t border-slate-200 pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Profile Image</h3>
                      <p className="text-xs text-slate-500">The main cover image for this ministry</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {profilePreview ? (
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img src={profilePreview} alt="Profile preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 shrink-0">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1">
                      <button
                        type="button"
                        onClick={() => profileInputRef.current?.click()}
                        className="rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800 transition-colors"
                      >
                        {profilePreview ? "Change Image" : "Upload Image"}
                      </button>
                      <input
                        ref={profileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageSelected}
                        className="hidden"
                      />
                      <p className="text-xs text-slate-400 mt-1">Recommended: 800x600px, JPG or PNG</p>
                    </div>
                    {profilePreview && (
                      <button
                        type="button"
                        onClick={() => { setProfileFile(null); setProfilePreview(""); setFormData({ ...formData, profileImage: "" }); }}
                        className="text-xs text-red-600 font-bold hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {/* ===== GALLERY MEDIA (Libraries) ===== */}
                <div className="border-t border-slate-200 pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Media Library</h3>
                      <p className="text-xs text-slate-500">
                        {editingMinistry
                          ? `Images associated with /${formData.slug}`
                          : "Add images to this ministry (saved after creation)"}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                      {totalFileCount} file{totalFileCount !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {loadingLibraries && (
                    <div className="text-center py-4 text-slate-500 text-sm">Loading media...</div>
                  )}

                  {!loadingLibraries && libraries.size > 0 && (
                    <div className="space-y-6 mb-6">
                      {Array.from(libraries.entries()).map(([slug, lib]) => {
                        const totalInLib = lib.items.length + lib.newFiles.length;
                        return (
                          <div key={slug} className="border border-slate-200 rounded-2xl p-4 bg-white">
                            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-lg">📁</span>
                                <div>
                                  <span className="text-sm font-bold text-slate-900">/{slug}</span>
                                  <p className="text-[10px] text-slate-500">{lib.items.length} uploaded · {lib.newFiles.length} new</p>
                                </div>
                              </div>
                              <span className="shrink-0 bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full">
                                {totalInLib} file{totalInLib !== 1 ? "s" : ""}
                              </span>
                            </div>

                            {lib.items.length > 0 && (
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-3">
                                {lib.items.map((item) => (
                                  <div key={item.id} className="relative group border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                                    <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                                      {item.mediaType === "video" ? (
                                        <video src={item.photoUrl} className="w-full h-full object-cover" />
                                      ) : (
                                        <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
                                      )}
                                    </div>
                                    <span className="absolute top-1 left-1 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">{item.mediaType}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteLibraryItem(slug, item.id)}
                                      disabled={lib.deletingIds.has(item.id)}
                                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                                    >
                                      {lib.deletingIds.has(item.id) ? "..." : "✕"}
                                    </button>
                                    <div className="p-1.5">
                                      <p className="text-[11px] text-slate-900 font-medium truncate">{item.title}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {lib.items.length === 0 && lib.newFiles.length === 0 && (
                              <p className="text-xs text-slate-400 text-center py-3">No files in this library yet</p>
                            )}

                            {lib.newFiles.length > 0 && (
                              <div className="border-t border-slate-100 pt-3 mb-3">
                                <p className="text-[11px] font-bold text-emerald-700 mb-2">New files to upload ({lib.newFiles.length})</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                  {lib.newFiles.map((file, idx) => (
                                    <div key={idx} className="relative group border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                                      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                                        {lib.newTypes[idx] === "video" ? (
                                          <video src={lib.newPreviews[idx]} className="w-full h-full object-cover" muted />
                                        ) : (
                                          <img src={lib.newPreviews[idx]} alt={lib.newTitles[idx]} className="w-full h-full object-cover" />
                                        )}
                                      </div>
                                      <span className="absolute top-1 left-1 bg-emerald-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">New</span>
                                      <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">{lib.newTypes[idx]}</span>
                                      <button
                                        type="button"
                                        onClick={() => removeLibraryNewFile(slug, idx)}
                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
                                      >
                                        ✕
                                      </button>
                                      <div className="p-1.5">
                                        <input
                                          type="text"
                                          value={lib.newTitles[idx]}
                                          onChange={(e) => updateLibraryNewTitle(slug, idx, e.target.value)}
                                          placeholder="Title..."
                                          className="w-full text-[11px] text-slate-900 font-medium bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#0055b8] focus:outline-none px-0.5 py-0.5"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="border-t border-slate-100 pt-3">
                              <button
                                type="button"
                                onClick={() => {
                                  const input = document.getElementById(`file-input-${slug}`) as HTMLInputElement;
                                  if (input) input.click();
                                }}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add to /{slug}
                              </button>
                              <input
                                id={`file-input-${slug}`}
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                onChange={(e) => handleLibraryFilesSelected(slug, e)}
                                className="hidden"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {!loadingLibraries && libraries.size === 0 && editingMinistry && (
                    <div className="text-center py-6 text-slate-500 border-2 border-dashed border-slate-200 rounded-xl mb-6">
                      <p className="text-sm">No media found for this ministry</p>
                      <p className="text-xs mt-1">Upload images below</p>
                    </div>
                  )}

                  {/* ===== ADD NEW LIBRARY ===== */}
                  <div className="border-t border-slate-200 pt-5 mt-2">
                    <h4 className="text-sm font-bold text-slate-900 mb-3">➕ Add New Media Library</h4>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Slug Title *</label>
                        <input
                          type="text"
                          value={newLibrarySlug}
                          onChange={(e) => setNewLibrarySlug(e.target.value)}
                          placeholder="e.g. bible-college, mission-trip-2025"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Slug: /{generateSlug(newLibrarySlug) || "(type to generate)"}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
 e                         <button
                            type="button"
                            onClick={() => newLibraryFileInputRef.current?.click()}
                            className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Choose Files
                          </button>
                          <input
                            ref={newLibraryFileInputRef}
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleNewLibraryFilesSelected}
                            className="hidden"
                          />
                          <span className="text-xs text-slate-400">
                            {newLibraryFiles.length > 0
                              ? `${newLibraryFiles.length} file${newLibraryFiles.length !== 1 ? "s" : ""} selected`
                              : "No files selected"}
                          </span>
                        </div>
                      </div>
                      {newLibraryFiles.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {newLibraryFiles.map((file, idx) => (
                            <div key={idx} className="relative group border border-slate-200 rounded-lg overflow-hidden bg-white">
                              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                                {file.type.startsWith("video/") ? (
                                  <video src={newLibraryPreviews[idx]} className="w-full h-full object-cover" muted />
                                ) : (
                                  <img src={newLibraryPreviews[idx]} alt={newLibraryTitles[idx]} className="w-full h-full object-cover" />
                                )}
                              </div>
                              <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                                {file.type.startsWith("video/") ? "video" : "image"}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeNewLibraryFile(idx)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                ✕
                              </button>
                              <div className="p-1.5">
                                <input
                                  type="text"
                                  value={newLibraryTitles[idx]}
                                  onChange={(e) => updateNewLibraryTitle(idx, e.target.value)}
                                  placeholder="Title..."
                                  className="w-full text-[11px] text-slate-900 font-medium bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#0055b8] focus:outline-none px-0.5 py-0.5"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ===== SUBMIT ===== */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || uploadingMedia}
                    className="flex-1 rounded-xl bg-[#0055b8] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#003d7a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving || uploadingMedia 
                      ? uploadingMedia ? "Uploading Media..." : "Saving..." 
                      : editingMinistry ? "Update Ministry" : "Create Ministry"}
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