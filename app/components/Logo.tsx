"use client";

import { usePathname } from "next/navigation";

export default function Logo() {
  const pathname = usePathname();
  const isFaithAcademy = pathname?.startsWith("/faith-academy");
  const isChristianFaithAcademy = pathname?.startsWith("/ministries/christian-faith-academy");

  return (
    <a href="/" className="inline-flex items-center gap-3 text-slate-950">
      <img
        src={isChristianFaithAcademy ? "/FBM CFA logo.png" : isFaithAcademy ? "/logo.png" : "/fbm-logo.PNG"}
        alt={isChristianFaithAcademy ? "FBM Christian Faith Academy logo" : isFaithAcademy ? "Freedom Baptist Mission logo" : "FBM logo"}
        className="h-11 w-11 rounded-2xl shadow-sm"
      />
      {isChristianFaithAcademy && (
        <div className="leading-tight">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0055b8]">Freedom Baptist Mission</p>
          <p className="text-xs text-[#16a34a] font-semibold">Christian Faith Academy</p>
        </div>
      )}
    </a>
  );
}
