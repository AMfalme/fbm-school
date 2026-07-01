"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { db } from "../../lib/firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

interface Donation {
  id?: string;
  reference: string;
  amount: number;
  currency: string;
  status: string;
  statusMessage: string;
  donorName: string;
  donorEmail: string;
  paymentMethod: string;
  paymentType: string;
  paidAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  gatewayResponse?: string;
  channel?: string;
}

export default function AdminDonationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
    if (isAdmin) {
      fetchDonations();
    }
  }, [isAdmin]);

  useEffect(() => {
    filterDonations();
  }, [searchTerm, statusFilter, donations]);

  const fetchDonations = async () => {
    try {
      const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
      const donationsRef = collection(db, "donations");
      const q = query(donationsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const donationsData: Donation[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        donationsData.push({
          id: doc.id,
          reference: data.reference,
          amount: data.amount,
          currency: data.currency || "USD",
          status: data.status || "pending",
          statusMessage: data.statusMessage || "",
          donorName: data.donorName || "Anonymous",
          donorEmail: data.donorEmail || "",
          paymentMethod: data.paymentMethod || "unknown",
          paymentType: data.paymentType || "one-time",
          paidAt: data.paidAt?.toDate(),
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          gatewayResponse: data.gatewayResponse,
          channel: data.channel,
        });
      });
      
      setDonations(donationsData);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const filterDonations = () => {
    let filtered = donations;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (donation) =>
          donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donation.donorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donation.reference.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((donation) => donation.status === statusFilter);
    }

    setFilteredDonations(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getPaystackDashboardUrl = (reference: string) => {
    return `https://dashboard.paystack.com/#/transactions/${reference}`;
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === "KES") {
      return `KSh ${amount.toFixed(2)}`;
    }
    return `$${amount.toFixed(2)}`;
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
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900">Donation Transactions</h1>
          <p className="mt-2 text-slate-600">View and manage all donation transactions</p>
        </div>

        {/* Filters */}
        <div className="rounded-3xl bg-white p-6 shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or reference..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Filter by Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 text-slate-900"
              >
                <option value="all">All Statuses</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <p className="text-sm font-bold text-slate-600">Total Donations</p>
            <p className="text-3xl font-black text-slate-900 mt-2">{donations.length}</p>
          </div>
          <div className="rounded-2xl bg-green-50 p-6 shadow-lg">
            <p className="text-sm font-bold text-green-600">Successful</p>
            <p className="text-3xl font-black text-green-700 mt-2">
              {donations.filter((d) => d.status === "success").length}
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-50 p-6 shadow-lg">
            <p className="text-sm font-bold text-yellow-600">Pending</p>
            <p className="text-3xl font-black text-yellow-700 mt-2">
              {donations.filter((d) => d.status === "pending").length}
            </p>
          </div>
          <div className="rounded-2xl bg-red-50 p-6 shadow-lg">
            <p className="text-sm font-bold text-red-600">Failed</p>
            <p className="text-3xl font-black text-red-700 mt-2">
              {donations.filter((d) => d.status === "failed").length}
            </p>
          </div>
        </div>

        {/* Donations Table */}
        <div className="rounded-3xl bg-white shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Donor</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredDonations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                      No donations found
                    </td>
                  </tr>
                ) : (
                  filteredDonations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono font-bold text-slate-900">{donation.reference}</div>
                        {donation.statusMessage && (
                          <div className="text-xs text-slate-500 mt-1">{donation.statusMessage}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-slate-900">{donation.donorName}</div>
                        <div className="text-xs text-slate-500">{donation.donorEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-emerald-700">
                          {formatCurrency(donation.amount, donation.currency)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900 capitalize">{donation.paymentMethod}</div>
                        <div className="text-xs text-slate-500 capitalize">{donation.paymentType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(donation.status)}`}>
                          {donation.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">
                          {donation.createdAt ? new Date(donation.createdAt).toLocaleDateString() : "N/A"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {donation.createdAt ? new Date(donation.createdAt).toLocaleTimeString() : ""}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={getPaystackDashboardUrl(donation.reference)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold text-[#0055b8] hover:text-[#003d7a]"
                        >
                          View on Paystack →
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}