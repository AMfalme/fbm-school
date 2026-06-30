"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  onAuthStateChanged, 
  User,
  updateProfile 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import Navbar from '../../components/Navbar';
import { useNotification } from '../../components/Notification';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  address: string;
  bio: string;
  occupation: string;
  church: string;
  emergencyContact: string;
  emergencyPhone: string;
  role: string;
  totalContributed: number;
  activeSponsorships: number;
  collegeModulesSupported: number;
  createdAt: string;
  lastLogin: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { showNotification, NotificationComponent } = useNotification();

  const [profile, setProfile] = useState<UserProfile>({
    uid: "",
    email: "",
    displayName: "",
    photoURL: "",
    phoneNumber: "",
    address: "",
    bio: "",
    occupation: "",
    church: "",
    emergencyContact: "",
    emergencyPhone: "",
    role: "member",
    totalContributed: 0,
    activeSponsorships: 0,
    collegeModulesSupported: 0,
    createdAt: "",
    lastLogin: ""
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchUserProfile(firebaseUser.uid);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchUserProfile = async (uid: string) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const snapshot = await getDoc(userDocRef);
      
      if (snapshot.exists()) {
        const data = snapshot.data();
        setProfile({
          ...profile,
          ...data,
          uid
        } as UserProfile);
      } else {
        // Initialize with Firebase Auth data
        setProfile({
          ...profile,
          uid,
          email: user?.email || "",
          displayName: user?.displayName || "",
          photoURL: user?.photoURL || ""
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      showNotification("Failed to load profile", "error");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showNotification("Please select an image file", "error");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification("Image size must be less than 5MB", "error");
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'fbm-school'); // You'll need to configure this in Cloudinary

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      const imageUrl = data.secure_url;

      // Update profile with new image URL
      setProfile(prev => ({
        ...prev,
        photoURL: imageUrl
      }));

      // Update Firebase Auth profile
      if (user) {
        await updateProfile(user, {
          photoURL: imageUrl
        });
      }

      // Save to Firestore immediately
      const userDocRef = doc(db, 'users', profile.uid);
      await setDoc(userDocRef, {
        photoURL: imageUrl,
        updatedAt: serverTimestamp()
      }, { merge: true });

      showNotification("Profile image updated successfully!", "success");
    } catch (error) {
      console.error("Error uploading image:", error);
      showNotification("Failed to upload image. Please try again.", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const userDocRef = doc(db, 'users', profile.uid);
      
      await setDoc(userDocRef, {
        ...profile,
        updatedAt: serverTimestamp()
      }, { merge: true });

      // Update Firebase Auth display name if changed
      if (user && user.displayName !== profile.displayName) {
        await updateProfile(user, {
          displayName: profile.displayName
        });
      }

      showNotification("Profile updated successfully!", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showNotification("Failed to update profile. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF9]">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-lg">
          <p className="font-medium text-slate-600">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900">
      {/* Global Announcement Banner */}
      <div className="bg-[#16a34a] text-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
        📢 Transforming Lives Across Kenya & Beyond Through Spreading The Gospel
      </div>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 space-y-8">
        <Navbar />
        {NotificationComponent}

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900">My Profile</h1>
            <p className="mt-2 text-slate-600">Manage your personal information and preferences</p>
          </div>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-[#0055b8] hover:bg-[#003d7a] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            ← Back to Dashboard
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Section */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Profile Image</h2>
            
            <div className="flex items-start gap-6">
              {/* Thumbnail Preview */}
              <div className="shrink-0">
                {profile.photoURL ? (
                  <div className="relative">
                    <img
                      src={profile.photoURL}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#0055b8]"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1.5 border-2 border-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-slate-200 flex items-center justify-center border-4 border-slate-300">
                    <span className="text-4xl">👤</span>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#0055b8] file:text-white
                    hover:file:bg-[#003d7a]
                    disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Recommended: Square image, max 5MB. JPG, PNG or GIF.
                </p>
                {uploadingImage && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0055b8]"></div>
                    <p className="text-xs text-blue-600 font-medium">Uploading...</p>
                  </div>
                )}
                {profile.photoURL && !uploadingImage && (
                  <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Profile image saved
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="displayName"
                  required
                  value={profile.displayName}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500 cursor-not-allowed"
                />
                <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+254 700 000 000"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={profile.occupation}
                  onChange={handleInputChange}
                  placeholder="e.g. Teacher, Engineer"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  placeholder="Your physical address"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Ministry Information */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Ministry Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Church/Community</label>
                <input
                  type="text"
                  name="church"
                  value={profile.church}
                  onChange={handleInputChange}
                  placeholder="Your church or community"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Emergency Contact Name</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={profile.emergencyContact}
                  onChange={handleInputChange}
                  placeholder="Emergency contact person"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Emergency Contact Phone</label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={profile.emergencyPhone}
                  onChange={handleInputChange}
                  placeholder="+254 700 000 000"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                />
              </div>
            </div>
          </div>

          {/* Giving Statistics (Read-only) */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0055b8] to-[#3b82f6] p-6 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Your Giving Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs uppercase tracking-wider text-blue-100">Total Contributed</p>
                <p className="text-3xl font-black mt-2">${profile.totalContributed}</p>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs uppercase tracking-wider text-blue-100">Active Sponsorships</p>
                <p className="text-3xl font-black mt-2">{profile.activeSponsorships}</p>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs uppercase tracking-wider text-blue-100">Modules Funded</p>
                <p className="text-3xl font-black mt-2">{profile.collegeModulesSupported}</p>
              </div>
            </div>

            <p className="text-xs text-blue-100 mt-4">
              Thank you for your generous support! These statistics are updated automatically.
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <a
              href="/dashboard"
              className="rounded-full border-2 border-slate-300 bg-white px-8 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </a>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-gradient-to-r from-[#0055b8] to-[#3b82f6] px-8 py-3 text-sm font-bold text-white transition hover:shadow-lg hover:from-[#003d7a] hover:to-[#0055b8] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}