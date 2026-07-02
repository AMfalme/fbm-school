"use client";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import EnrollButton from "./EnrollButton";
import DonateButton from "./DonateButton";

export default function Navbar() {
  return (
    <header className="sticky top-4 z-[100] flex items-center justify-between gap-6 rounded-[28px] border border-white/80 bg-white/80 px-4 py-4 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-6">
      <Logo />
      <NavLinks />
      <div className="flex items-center gap-3">
        <DonateButton />
        <EnrollButton />
        <MobileMenu />
      </div>
    </header>
  );
}
