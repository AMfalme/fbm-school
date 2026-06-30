"use client";

import { useEffect, useState } from "react";

type NotificationType = "success" | "error" | "info";

interface NotificationProps {
  message: string;
  type?: NotificationType;
  duration?: number;
  onClose: () => void;
}

export default function Notification({ 
  message, 
  type = "success", 
  duration = 4000, 
  onClose 
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColors = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-blue-500"
  };

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️"
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-6 right-6 z-50 opacity-0 transition-opacity duration-300">
        <div className={`${bgColors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px]`}>
          <span className="text-xl">{icons[type]}</span>
          <p className="text-sm font-semibold flex-1">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className={`${bgColors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px]`}>
        <span className="text-xl">{icons[type]}</span>
        <p className="text-sm font-semibold flex-1">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Hook for using notifications globally
export function useNotification() {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
  } | null>(null);

  const showNotification = (message: string, type: NotificationType = "success") => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const NotificationComponent = notification ? (
    <Notification
      message={notification.message}
      type={notification.type}
      onClose={hideNotification}
    />
  ) : null;

  return {
    showNotification,
    hideNotification,
    NotificationComponent
  };
}