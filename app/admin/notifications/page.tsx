"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { db } from "../../lib/firebase";
import { collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

interface Notification {
  id: string;
  type: "new_user" | "new_message" | "new_donation";
  title: string;
  message: string;
  read: boolean;
  createdAt: Timestamp | null;
  link?: string;
}

export default function AdminNotificationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [fetchingNotifications, setFetchingNotifications] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");

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
    if (isAdmin && !fetchingNotifications) {
      fetchNotifications();
    }
  }, [isAdmin, filter]);

  const fetchNotifications = async () => {
    setFetchingNotifications(true);
    try {
      const { collection, getDocs, orderBy, query, where } = await import("firebase/firestore");
      let q = query(collection(db, "notifications"), orderBy("createdAt", "desc"));
      
      if (filter === "unread") {
        q = query(collection(db, "notifications"), where("read", "==", false), orderBy("createdAt", "desc"));
      }

      const snapshot = await getDocs(q);
      const notificationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];
      setNotifications(notificationsData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setFetchingNotifications(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { doc, updateDoc } = await import("firebase/firestore");
      const notificationRef = doc(db, "notifications", notificationId);
      await updateDoc(notificationRef, { read: true });
      
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { doc, updateDoc, collection, getDocs, where } = await import("firebase/firestore");
      const q = query(collection(db, "notifications"), where("read", "==", false));
      const snapshot = await getDocs(q);
      
      const updatePromises = snapshot.docs.map(doc => 
        updateDoc(doc.ref, { read: true })
      );
      
      await Promise.all(updatePromises);
      fetchNotifications();
    } catch (error) {
      console.error("Error marking all as read:", error);
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
    const date = timestamp.toDate();
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_user":
        return "👤";
      case "new_message":
        return "💬";
      case "new_donation":
        return "💚";
      default:
        return "📢";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "new_user":
        return "bg-blue-50 border-blue-200";
      case "new_message":
        return "bg-purple-50 border-purple-200";
      case "new_donation":
        return "bg-emerald-50 border-emerald-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <AdminSidebar />

      <main className="ml-64 min-h-screen bg-[#F8FAFC] p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Notifications</h1>
            <p className="mt-2 text-slate-600">
              {unreadCount > 0 
                ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                : "All notifications are read"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="rounded-xl bg-[#0055b8] px-4 py-2 text-sm font-bold text-white hover:bg-[#003d7a]"
            >
              Mark All as Read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
              filter === "all"
                ? "bg-[#0055b8] text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Notifications
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
              filter === "unread"
                ? "bg-[#0055b8] text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            Unread Only
          </button>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <span className="text-6xl block mb-4">🔔</span>
              <p className="text-lg">No notifications yet</p>
              <p className="text-sm mt-2">You'll be notified about new users, messages, and donations</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                  className={`rounded-2xl border-2 p-4 transition-all cursor-pointer ${
                    notification.read 
                      ? "bg-white border-slate-200 opacity-75" 
                      : `${getNotificationColor(notification.type)} border-current`
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-slate-600 mt-1">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <span className="flex-shrink-0 h-2 w-2 rounded-full bg-[#0055b8] mt-2"></span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          {formatDate(notification.createdAt)}
                        </span>
                        {notification.link && (
                          <a
                            href={notification.link}
                            className="text-xs font-bold text-[#0055b8] hover:underline"
                          >
                            View Details →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}