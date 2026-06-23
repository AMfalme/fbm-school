import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ManagementTeam from "../../components/ManagementTeam";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a]">
      <div className="bg-[#16a34a] text-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
        📢 Transforming Lives Across Kenya & Beyond Through Spreading The Gospel
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Navbar />

        <header className="text-center">
          <h1 className="text-4xl font-black">Our Management Team</h1>
          <p className="mt-2 text-sm text-slate-600">The leadership responsible for mission strategy, education, and operations.</p>
        </header>

        <ManagementTeam />

      </main>

      <Footer />
    </div>
  );
}
