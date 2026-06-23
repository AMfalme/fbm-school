"use client";

import { useRouter } from "next/navigation";

export default function DonateButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push("/support-us")}
      className="hidden rounded-full bg-gradient-to-r from-[#16a34a] to-[#22c55e] px-6 py-2.5 text-sm font-bold text-white transition hover:shadow-lg hover:from-[#15803d] hover:to-[#16a34a] lg:inline-flex items-center gap-2 shadow-md"
    >
      <span>💚</span>
      Donate
    </button>
  );
}
