import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Large decorative 404 */}
        <div className="relative">
          <div className="text-[12rem] sm:text-[16rem] font-black text-slate-100 select-none leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-6 shadow-xl border border-slate-100">
              <div className="text-5xl mb-4">🧭</div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Page Not Found
              </h1>
              <p className="text-slate-500 font-medium mt-2 max-w-xs mx-auto">
                The page you're looking for doesn't exist or has been moved to a new location.
              </p>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Link
            href="/"
            className="flex flex-col items-center gap-2 rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🏠</span>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">Home</span>
          </Link>

          <Link
            href="/about"
            className="flex flex-col items-center gap-2 rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">ℹ️</span>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">About Us</span>
          </Link>

          <Link
            href="/ministries/missionary-outreach"
            className="flex flex-col items-center gap-2 rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🌍</span>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">Ministries</span>
          </Link>

          <Link
            href="/contact"
            className="flex flex-col items-center gap-2 rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">✉️</span>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">Contact</span>
          </Link>

          <Link
            href="/partner"
            className="flex flex-col items-center gap-2 rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🤝</span>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">Partner</span>
          </Link>

          <Link
            href="/gallery"
            className="flex flex-col items-center gap-2 rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">📸</span>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">Gallery</span>
          </Link>
        </div>

        {/* Back navigation */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            <span>←</span> Go Back
          </button>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-[#0055b8] text-sm font-bold text-white hover:bg-[#003d7a] transition-all shadow-lg shadow-blue-900/10"
          >
            Dashboard <span>→</span>
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pt-4">
          Freedom Baptist Mission
        </p>
      </div>
    </div>
  );
}