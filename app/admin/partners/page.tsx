"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { db } from "../../lib/firebase";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

interface Partner {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  partnershipType: string;
  message: string;
  status: string;
  createdAt: Timestamp | null;
}

export default function AdminPartnersPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [fetchingPartners, setFetchingPartners] = useState(false);

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
    if (isAdmin && !fetchingPartners) {
      fetchPartners();
    }
  }, [isAdmin]);

  const fetchPartners = async () => {
    setFetchingPartners(true);
    try {
      const { collection, getDocs, orderBy, query } = await import("firebase/firestore");
      const q = query(collection(db, "partner"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const partnersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Partner[];
      setPartners(partnersData);
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setFetchingPartners(false);
    }
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

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return "N/A";
    return timestamp.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getPartnershipTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      MISSIONARY: "Short-Term Missionary",
      CHURCH_BOOK: "Church Monthly Support",
      MATERIAL_CARGO: "Material/Container Logistics",
      OTHER: "Other Custom Proposal"
    };
    return labels[type] || type;
  };

  return (
    <div>
      <AdminSidebar />

      <main className="ml-64 min-h-screen bg-[#F8FAFC] p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900">Partner Inquiries</h1>
          <p className="mt-2 text-slate-600">View and manage partnership requests from churches and organizations</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg">
          {partners.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-lg">No partner inquiries yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Date</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Name</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Email</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Phone</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Organization</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Partnership Type</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Status</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map((partner) => (
                    <tr key={partner.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 text-sm text-slate-600">{formatDate(partner.createdAt)}</td>
                      <td className="py-4 text-sm font-medium text-slate-900">{partner.fullName}</td>
                      <td className="py-4 text-sm text-slate-600">{partner.email}</td>
                      <td className="py-4 text-sm text-slate-600">{partner.phone}</td>
                      <td className="py-4 text-sm text-slate-600">{partner.organization || "N/A"}</td>
                      <td className="py-4 text-sm text-slate-600">{getPartnershipTypeLabel(partner.partnershipType)}</td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          partner.status === "new" 
                            ? "bg-blue-100 text-blue-700" 
                            : partner.status === "read"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          {partner.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-600 max-w-xs truncate">{partner.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}