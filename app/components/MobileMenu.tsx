export default function MobileMenu() {
  return (
    <details className="lg:hidden">
      <summary className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0055b8] bg-white text-[#0055b8] shadow-sm transition hover:bg-[#E7F3FF]">
        <span aria-hidden="true">☰</span>
        <span className="sr-only">Open navigation menu</span>
      </summary>
      <div className="mt-2 rounded-3xl border-2 border-[#E7F3FF] bg-white p-4 shadow-[0_18px_50px_rgba(0,61,122,0.12)]">
        <a href="/" className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#E7F3FF]">Home</a>
        <a href="/about" className="mt-2 block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#E7F3FF]">About</a>
        <a href="/admissions" className="mt-2 block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#E7F3FF]">Admissions</a>
        <a href="/academics" className="mt-2 block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#E7F3FF]">Academics</a>
        <a href="/spiritual-life" className="mt-2 block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#E7F3FF]">Spiritual Life</a>
        <a href="/gallery" className="mt-2 block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#E7F3FF]">Gallery</a>
        <a href="/support-us" className="mt-2 block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#E7F3FF]">Support Us</a>
        <a href="/contact" className="mt-2 block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#E7F3FF]">Contact</a>
        <a href="/admissions" className="mt-3 block rounded-2xl bg-[#0055b8] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#003d7a]">Enroll Now</a>
      </div>
    </details>
  );
}
