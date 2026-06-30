"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { db } from "../../lib/firebase";
import { collection, getDocs, orderBy, query, Timestamp, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: Timestamp | null;
}

export default function AdminContactsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [fetchingContacts, setFetchingContacts] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showModal, setShowModal] = useState(false);

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
    if (isAdmin && !fetchingContacts) {
      fetchContacts();
    }
  }, [isAdmin]);

  const fetchContacts = async () => {
    setFetchingContacts(true);
    try {
      const { collection, getDocs, orderBy, query } = await import("firebase/firestore");
      const q = query(collection(db, "contact"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const contactsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Contact[];
      setContacts(contactsData);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setFetchingContacts(false);
    }
  };

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setShowModal(true);
    // Mark as read
    if (contact.status === "new") {
      const contactRef = doc(db, "contact", contact.id);
      updateDoc(contactRef, { status: "read" }).catch(err => 
        console.error("Error updating contact status:", err)
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
    // Refresh contacts to update status
    fetchContacts();
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

  return (
    <div>
      <AdminSidebar />

      <main className="ml-64 min-h-screen bg-[#F8FAFC] p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900">Contact Submissions</h1>
          <p className="mt-2 text-slate-600">View and manage contact form submissions from visitors</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg">
          {contacts.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-lg">No contact submissions yet</p>
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
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Subject</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Status</th>
                    <th className="py-3 text-left text-sm font-bold text-slate-700">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 text-sm text-slate-600">{formatDate(contact.createdAt)}</td>
                      <td className="py-4 text-sm font-medium text-slate-900">{contact.fullName}</td>
                      <td className="py-4 text-sm text-slate-600">{contact.email}</td>
                      <td className="py-4 text-sm text-slate-600">{contact.phone || "N/A"}</td>
                      <td className="py-4 text-sm text-slate-600">{contact.subject}</td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          contact.status === "new" 
                            ? "bg-blue-100 text-blue-700" 
                            : contact.status === "read"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-600 max-w-xs truncate">{contact.message}</td>
                      <td className="py-4">
                        <button
                          onClick={() => handleViewContact(contact)}
                          className="rounded-lg bg-[#0055b8] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#003d7a] transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* View Contact Modal */}
        {showModal && selectedContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleCloseModal}>
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-900">Contact Details</h2>
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
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{selectedContact.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{selectedContact.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{selectedContact.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{selectedContact.subject}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</p>
                  <span className={`inline-flex mt-1 rounded-full px-3 py-1 text-xs font-bold ${
                    selectedContact.status === "new" 
                      ? "bg-blue-100 text-blue-700" 
                      : selectedContact.status === "read"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {selectedContact.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</p>
                  <div className="mt-2 rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500">
                    Submitted on {formatDate(selectedContact.createdAt)}
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
