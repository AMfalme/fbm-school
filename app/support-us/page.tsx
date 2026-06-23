"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DonationHub from "../components/DonationHub";
import DonationModal from "../components/DonationModal";

export default function SupportUs() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal on page load if coming from donate button
    setShowModal(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a]">
      {/* Shared Global Green Announcement Banner Element */}
      <div className="bg-[#16a34a] text-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
        📢 Transforming Lives Across Kenya & Beyond Through Spreading The Gospel
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-24 sm:space-y-32">
        <Navbar />

        <DonationHub />
      </main>

      <Footer />

      {/* Donation Modal */}
      <DonationModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
