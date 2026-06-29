"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { db } from "../../lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

interface Settings {
  id?: string;
  emailRecipients: string[];
  bankAccounts: Array<{
    bankName: string;
    accountName: string;
    accountNumber: string;
    branch: string;
    swiftCode?: string;
  }>;
  paystackPublicKey?: string;
  paystackSecretKey?: string;
  siteName: string;
  siteDescription: string;
  contactPhone: string;
  contactEmail: string;
  updatedAt?: Date;
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    emailRecipients: ["kenyafbmission@gmail.com", "griffinmfalme@gmail.com"],
    bankAccounts: [],
    siteName: "Freedom Baptist Mission",
    siteDescription: "Transforming Lives Across Kenya & Beyond Through Spreading The Gospel",
    contactPhone: "+254 701 940 540",
    contactEmail: "kenyafbmission@gmail.com"
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
    if (isAdmin) {
      fetchSettings();
    }
  }, [isAdmin]);

  const fetchSettings = async () => {
    try {
      const { doc, getDoc } = await import("firebase/firestore");
      const settingsRef = doc(db, "settings", "configuration");
      const snapshot = await getDoc(settingsRef);
      
      if (snapshot.exists()) {
        const data = snapshot.data() as Settings;
        setSettings(data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { doc, setDoc, serverTimestamp } = await import("firebase/firestore");
      const settingsRef = doc(db, "settings", "configuration");
      
      await setDoc(settingsRef, {
        ...settings,
        updatedAt: new Date()
      }, { merge: true });

      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddBankAccount = () => {
    setSettings({
      ...settings,
      bankAccounts: [
        ...settings.bankAccounts,
        {
          bankName: "",
          accountName: "",
          accountNumber: "",
          branch: "",
          swiftCode: ""
        }
      ]
    });
  };

  const handleUpdateBankAccount = (index: number, field: string, value: string) => {
    const updatedAccounts = [...settings.bankAccounts];
    updatedAccounts[index] = { ...updatedAccounts[index], [field]: value };
    setSettings({ ...settings, bankAccounts: updatedAccounts });
  };

  const handleRemoveBankAccount = (index: number) => {
    const updatedAccounts = settings.bankAccounts.filter((_, i) => i !== index);
    setSettings({ ...settings, bankAccounts: updatedAccounts });
  };

  const handleAddEmail = () => {
    setSettings({
      ...settings,
      emailRecipients: [...settings.emailRecipients, ""]
    });
  };

  const handleUpdateEmail = (index: number, value: string) => {
    const updatedEmails = [...settings.emailRecipients];
    updatedEmails[index] = value;
    setSettings({ ...settings, emailRecipients: updatedEmails });
  };

  const handleRemoveEmail = (index: number) => {
    const updatedEmails = settings.emailRecipients.filter((_, i) => i !== index);
    setSettings({ ...settings, emailRecipients: updatedEmails });
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

      <main className="ml-64 min-h-screen bg-[#F8FAFC] p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900">Site Settings</h1>
          <p className="mt-2 text-slate-600">Manage email recipients, bank accounts, and site configuration</p>
        </div>

        <div className="space-y-6">
          {/* Email Recipients Section */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Email Notification Recipients</h2>
            <p className="text-sm text-slate-600 mb-4">
              These email addresses will receive notifications for new contact messages, partner inquiries, and donations.
            </p>
            
            <div className="space-y-3">
              {settings.emailRecipients.map((email, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleUpdateEmail(index, e.target.value)}
                    placeholder="email@example.com"
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
                  {settings.emailRecipients.length > 1 && (
                    <button
                      onClick={() => handleRemoveEmail(index)}
                      className="rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleAddEmail}
              className="mt-3 rounded-xl border-2 border-dashed border-slate-300 px-4 py-2 text-sm font-bold text-slate-600 hover:border-[#0055b8] hover:text-[#0055b8]"
            >
              + Add Email Address
            </button>
          </div>

          {/* Bank Accounts Section */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Bank Accounts</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Bank accounts for receiving donations. These will be displayed on the donation page.
                </p>
              </div>
              <button
                onClick={handleAddBankAccount}
                className="rounded-xl bg-[#0055b8] px-4 py-2 text-sm font-bold text-white hover:bg-[#003d7a]"
              >
                + Add Account
              </button>
            </div>

            {settings.bankAccounts.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                <p>No bank accounts configured yet. Add one to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {settings.bankAccounts.map((account, index) => (
                  <div key={index} className="rounded-2xl border border-slate-200 p-4 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Bank Name *</label>
                        <input
                          type="text"
                          value={account.bankName}
                          onChange={(e) => handleUpdateBankAccount(index, "bankName", e.target.value)}
                          placeholder="e.g. Equity Bank"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Account Name *</label>
                        <input
                          type="text"
                          value={account.accountName}
                          onChange={(e) => handleUpdateBankAccount(index, "accountName", e.target.value)}
                          placeholder="e.g. Freedom Baptist Mission"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Account Number *</label>
                        <input
                          type="text"
                          value={account.accountNumber}
                          onChange={(e) => handleUpdateBankAccount(index, "accountNumber", e.target.value)}
                          placeholder="e.g. 0123456789"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Branch *</label>
                        <input
                          type="text"
                          value={account.branch}
                          onChange={(e) => handleUpdateBankAccount(index, "branch", e.target.value)}
                          placeholder="e.g. Kisii Branch"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">SWIFT Code (Optional)</label>
                        <input
                          type="text"
                          value={account.swiftCode}
                          onChange={(e) => handleUpdateBankAccount(index, "swiftCode", e.target.value)}
                          placeholder="e.g. EQBLKENA"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveBankAccount(index)}
                      className="text-xs font-bold text-red-600 hover:text-red-700"
                    >
                      Remove this account
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Integration Section */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Payment Integration</h2>
            <p className="text-sm text-slate-600 mb-4">
              Configure payment gateway credentials. These will be used for processing donations.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Paystack Public Key</label>
                <input
                  type="text"
                  value={settings.paystackPublicKey || ""}
                  onChange={(e) => setSettings({ ...settings, paystackPublicKey: e.target.value })}
                  placeholder="pk_test_..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Paystack Secret Key</label>
                <input
                  type="password"
                  value={settings.paystackSecretKey || ""}
                  onChange={(e) => setSettings({ ...settings, paystackSecretKey: e.target.value })}
                  placeholder="sk_test_..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                />
              </div>
              <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl p-3">
                ⚠️ Note: Paystack integration is currently in skeleton mode. The actual payment processing will be implemented once you provide the API keys.
              </p>
            </div>
          </div>

          {/* Site Information Section */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Site Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Site Description</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-full bg-gradient-to-r from-[#0055b8] to-[#3b82f6] px-8 py-3 text-sm font-bold text-white transition hover:shadow-lg hover:from-[#003d7a] hover:to-[#0055b8] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save All Settings"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}