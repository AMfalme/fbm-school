export default function NavLinks() {
  return (
    <nav className="uppercase hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex">
      <a href="/" className="uppercase transition hover:text-[#0055b8]">Home</a>
      <a href="/about" className="transition hover:text-[#0055b8]">Our Mission</a>
      <a href="/bible-college" className="uppercase transition hover:text-[#0055b8]">Bible College</a>
      <a href="/church-planting" className="uppercase transition hover:text-[#0055b8]">Church Planting</a>
      <a href="/faith-academy" className="uppercase transition hover:text-[#0055b8]">The School</a>
      <a href="/support-us" className="uppercase transition hover:text-[#0055b8]">Support Us</a>
    </nav>
  );
}
