export default function Logo() {
  return (
    <a href="/" className="inline-flex items-center gap-3 text-slate-950">
      <img src="/logo.png" alt="Freedom Baptist Mission School logo" className="h-11 w-11 rounded-2xl shadow-sm" />
      <div className="leading-tight">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0055b8]">Freedom Baptist</p>
        <p className="text-xs text-[#16a34a] font-semibold">Mission</p>
      </div>
    </a>
  );
}
