"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp,
  where,
  getCountFromServer
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import Navbar from "../components/Navbar";

interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  createdAt: Timestamp | null;
  purpose: string;
}

export default function DonationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalAmount: 0,
    thisMonthAmount: 0,
    thisYearAmount: 0,
    activeDonors: 0,
    pendingDonations: 0
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
          router.push("/dashboard");
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
  }, [router]);

  useEffect(() => {
    if (isAdmin) {
      fetchDonations();
    }
  }, [isAdmin]);

  const fetchDonations = async () => {
    try {
      const { collection, getDocs, query, orderBy, where, getCountFromServer } = await import("firebase/firestore");
      
      // Fetch all donations
      const q = query(collection(db, "donations"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const donationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Donation[];
      
      setDonations(donationsData);

      // Calculate statistics
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      let totalAmount = 0;
      let thisMonthAmount = 0;
      let thisYearAmount = 0;
      const uniqueDonors = new Set<string>();
      let pendingCount = 0;

      donationsData.forEach(donation => {
        const amount = donation.amount || 0;
        totalAmount += amount;
        uniqueDonors.add(donation.donorEmail);

        if (donation.createdAt) {
          const donationDate = donation.createdAt.toDate();
          
          if (donationDate.getMonth() === currentMonth && 
              donationDate.getFullYear() === currentYear) {
            thisMonthAmount += amount;
          }
          
          if (donationDate.getFullYear() === currentYear) {
            thisYearAmount += amount;
          }
        }

        if (donation.status === "pending") {
          pendingCount++;
        }
      });

      setStats({
        totalDonations: donationsData.length,
        totalAmount,
        thisMonthAmount,
        thisYearAmount,
        activeDonors: uniqueDonors.size,
        pendingDonations: pendingCount
      });

    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

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
            {!user ? "You must be signed in to access this page." : "Access denied. Admin privileges required."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-900">
      {/* Global Announcement Banner */}
      <div className="bg-[#16a34a] text-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
        📢 Transforming Lives Across Kenya & Beyond Through Spreading The Gospel
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-8">
        <Navbar />

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Donation Statistics</h1>
            <p className="mt-2 text-slate-600">Comprehensive overview of all donation activities</p>
          </div>
          <a
            href="/admin"
            className="inline-flex items-center gap-2 bg-[#0055b8] hover:bg-[#003d7a] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            ← Back to Admin
          </a>
        </div>

        {/* Statistics Cards */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 text-white shadow-xl">
            <p className="text-sm uppercase tracking-wider">
              Total Donations
            </p>
            <h2 className="mt-3 text-4xl font-black">{stats.totalDonations}</h2>
            <p className="mt-2 text-emerald-100">
              All time donations received
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0055b8] to-[#0f77ff] p-6 text-white shadow-xl">
            <p className="text-sm uppercase tracking-wider">
              Total Amount Raised
            </p>
            <h2 className="mt-3 text-4xl font-black">{formatCurrency(stats.totalAmount)}</h2>
            <p className="mt-2 text-blue-100">
              Cumulative donations to date
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white shadow-xl">
            <p className="text-sm uppercase tracking-wider">
              This Month
            </p>
            <h2 className="mt-3 text-4xl font-black">{formatCurrency(stats.thisMonthAmount)}</h2>
            <p className="mt-2 text-orange-100">
              Donations received this month
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-purple-500 to-purple-700 p-6 text-white shadow-xl">
            <p className="text-sm uppercase tracking-wider">
              This Year
            </p>
            <h2 className="mt-3 text-4xl font-black">{formatCurrency(stats.thisYearAmount)}</h2>
            <p className="mt-2 text-purple-100">
              Total donations in {new Date().getFullYear()}
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-rose-600 p-6 text-white shadow-xl">
            <p className="text-sm uppercase tracking-wider">
              Active Donors
            </p>
            <h2 className="mt-3 text-4xl font-black">{stats.activeDonors}</h2>
            <p className="mt-2 text-rose-100">
              Unique individuals who donated
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-slate-600 to-slate-800 p-6 text-white shadow-xl">
            <p className="text-sm uppercase tracking-wider">
              Pending Donations
            </p>
            <h2 className="mt-3 text-4xl font-black">{stats.pendingDonations}</h2>
            <p className="mt-2 text-slate-200">
              Awaiting confirmation
            </p>
          </div>
        </section>

        {/* Recent Donations Table */}
        <section className="rounded-3xl bg-white p-6 shadow-lg">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Recent Donations</h2>
            <span className="text-sm text-slate-500">
              Showing {donations.length} donation{donations.length !== 1 ? 's' : ''}
            </span>
          </div>

          {donations.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-lg">No donations recorded yet</p>
              <p className="text-sm mt-2">Donations will appear here once the Paystack integration is complete</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Date</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Donor</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Email</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Amount</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Method</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Purpose</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 text-sm text-slate-600">{formatDate(donation.createdAt)}</td>
                      <td className="py-4 text-sm font-medium text-slate-900">{donation.donorName}</td>
                      <td className="py-4 text-sm text-slate-600">{donation.donorEmail}</td>
                      <td className="py-4 text-sm font-bold text-slate-900">
                        {formatCurrency(donation.amount)}
                      </td>
                      <td className="py-4 text-sm text-slate-600">{donation.paymentMethod}</td>
                      <td className="py-4 text-sm text-slate-600 max-w-xs truncate">{donation.purpose}</td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          donation.status === "completed" 
                            ? "bg-green-100 text-green-700" 
                            : donation.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Information Note */}
        <section className="rounded-3xl border-2 border-blue-200 bg-blue-50 p-6">
          <div className="flex gap-4">
            <div className="text-3xl">ℹ️</div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">About This Page</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                This page displays comprehensive donation statistics and will replace the dashboard once the Paystack API integration is fully configured. 
                Currently, donation data is being collected but may show zero values until the payment gateway is properly connected.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}