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
  mpesaPaybill?: string;
  mpesaAccount?: string;
  mpesaAccountName?: string;
  mpesaPaymentMessage?: string;
  allowPaymentEdit?: boolean;
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
    mpesaPaybill: "522533",
    mpesaAccount: "8064880",
    mpesaAccountName: "Freedom Baptist Mission",
    mpesaPaymentMessage: "Please include your full name and donation purpose in the payment reference.",
    allowPaymentEdit: true,
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

      <main className="ml-0 lg:ml-64 min-h-screen bg-[#F8FAFC] p-8 pt-20 lg:pt-8">
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
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 text-slate-900"
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

          {/* Payment Edit Toggle */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Payment Information Edit Control</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Control whether payment information can be edited from the public donation page. When disabled, payment details are read-only for public users.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowPaymentEdit || false}
                  onChange={(e) => setSettings({ ...settings, allowPaymentEdit: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0055b8]"></div>
                <span className="ml-3 text-sm font-medium text-slate-700">
                  {settings.allowPaymentEdit ? "Enabled" : "Disabled"}
                </span>
              </label>
            </div>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-gray-700">
                <strong>ℹ️ How it works:</strong> When enabled, admins can edit payment information. When disabled, payment details are locked and cannot be modified from the public interface.
              </p>
            </div>
          </div>

          {/* M-Pesa Payment Settings Section */}
          <div className={`rounded-3xl bg-white p-6 shadow-lg ${!settings.allowPaymentEdit ? 'opacity-75' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">M-Pesa Payment Settings</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Configure Lipa Na M-Pesa payment details. These will be displayed to users for donations via M-Pesa.
                </p>
              </div>
              {!settings.allowPaymentEdit && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                  🔒 Read-Only Mode
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Paybill Number *</label>
                  <input
                    type="text"
                    value={settings.mpesaPaybill || ""}
                    onChange={(e) => setSettings({ ...settings, mpesaPaybill: e.target.value })}
                    placeholder="e.g. 522533"
                    disabled={!settings.allowPaymentEdit}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 text-slate-900 disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500 mt-1">M-Pesa paybill business number</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Account Number *</label>
                  <input
                    type="text"
                    value={settings.mpesaAccount || ""}
                    onChange={(e) => setSettings({ ...settings, mpesaAccount: e.target.value })}
                    placeholder="e.g. 8064880"
                    disabled={!settings.allowPaymentEdit}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20  text-slate-900 disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500 mt-1">Account number for the donation</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Account Name</label>
                  <input
                    type="text"
                    value={settings.mpesaAccountName || ""}
                    onChange={(e) => setSettings({ ...settings, mpesaAccountName: e.target.value })}
                    placeholder="e.g. Freedom Baptist Mission"
                    disabled={!settings.allowPaymentEdit}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 text-slate-900 disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500 mt-1">Name associated with the M-Pesa account</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Instructions Message</label>
                  <textarea
                    value={settings.mpesaPaymentMessage || ""}
                    onChange={(e) => setSettings({ ...settings, mpesaPaymentMessage: e.target.value })}
                    placeholder="Enter any important instructions for donors (e.g., include reference details)"
                    rows={3}
                    disabled={!settings.allowPaymentEdit}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 text-slate-900 disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500 mt-1">This message will be displayed to users during the donation process</p>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>ℹ️ M-Pesa Integration:</strong> These details will be displayed to users on the donation page. Users can donate via Lipa Na M-Pesa using the paybill and account number provided.
                </p>
              </div>
            </div>
          </div>

          {/* Bank Accounts Section */}
          <div className={`rounded-3xl bg-white p-6 shadow-lg ${!settings.allowPaymentEdit ? 'opacity-75' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Bank Accounts</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Bank accounts for receiving donations. These will be displayed on the donation page.
                </p>
              </div>
              {settings.allowPaymentEdit && (
                <button
                  onClick={handleAddBankAccount}
                  className="rounded-xl bg-[#0055b8] px-4 py-2 text-sm font-bold text-white hover:bg-[#003d7a]"
                >
                  + Add Account
                </button>
              )}
              {!settings.allowPaymentEdit && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                  🔒 Read-Only Mode
                </span>
              )}
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
                          disabled={!settings.allowPaymentEdit}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20  text-slate-900 disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Account Name *</label>
                        <input
                          type="text"
                          value={account.accountName}
                          onChange={(e) => handleUpdateBankAccount(index, "accountName", e.target.value)}
                          placeholder="e.g. Freedom Baptist Mission"
                          disabled={!settings.allowPaymentEdit}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20  text-slate-900 disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Account Number *</label>
                        <input
                          type="text"
                          value={account.accountNumber}
                          onChange={(e) => handleUpdateBankAccount(index, "accountNumber", e.target.value)}
                          placeholder="e.g. 0123456789"
                          disabled={!settings.allowPaymentEdit}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20  text-slate-900 disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Branch *</label>
                        <input
                          type="text"
                          value={account.branch}
                          onChange={(e) => handleUpdateBankAccount(index, "branch", e.target.value)}
                          placeholder="e.g. Kisii Branch"
                          disabled={!settings.allowPaymentEdit}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20  text-slate-900 disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">SWIFT Code (Optional)</label>
                        <input
                          type="text"
                          value={account.swiftCode}
                          onChange={(e) => handleUpdateBankAccount(index, "swiftCode", e.target.value)}
                          placeholder="e.g. EQBLKENA"
                          disabled={!settings.allowPaymentEdit}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20  text-slate-900 disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                    {settings.allowPaymentEdit && (
                      <button
                        onClick={() => handleRemoveBankAccount(index)}
                        className="text-xs font-bold text-red-600 hover:text-red-700"
                      >
                        Remove this account
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
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
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Site Description</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20  text-slate-900"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 text-slate-900"
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