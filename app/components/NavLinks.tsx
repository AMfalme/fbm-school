export default function NavLinks() {
  return (
    <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex">
      <a href="/" className="transition hover:text-[#0055b8]">Home</a>
      <a href="/about" className="transition hover:text-[#0055b8]">About</a>
      <a href="/admissions" className="transition hover:text-[#0055b8]">Admissions</a>
      <a href="/academics" className="transition hover:text-[#0055b8]">Academics</a>
      <a href="/spiritual-life" className="transition hover:text-[#0055b8]">Spiritual Life</a>
      <a href="/gallery" className="transition hover:text-[#0055b8]">Gallery</a>
      <a href="/support-us" className="transition hover:text-[#0055b8]">Support Us</a>
      <a href="/contact" className="transition hover:text-[#0055b8]">Contact</a>
    </nav>
  );
}
