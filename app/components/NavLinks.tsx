export default function NavLinks() {
  return (
    <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex">
      <a href="/" className="transition hover:text-[#0055b8]">Home</a>
      <a href="/about" className="transition hover:text-[#0055b8]">Our Mission</a>
      <a href="/bible-college" className="transition hover:text-[#0055b8]">Bible College</a>
      <a href="/church-planting" className="transition hover:text-[#0055b8]">Church Planting</a>
      <a href="/faith-academy" className="transition hover:text-[#0055b8]">The School</a>
      <a href="/support-us" className="transition hover:text-[#0055b8]">Support Us</a>
    </nav>
  );
}
