import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SupportUsPage() {
  return (
    <div className="min-h-screen bg-[#fff7eb] text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-20 px-6 py-6 lg:px-12 lg:py-10">
        <Navbar />

        <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#003d7a] via-[#0055b8] to-[#004da8] px-6 py-10 shadow-[0_30px_80px_rgba(0,61,122,0.15)] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FFD966] bg-[#FFD966] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#003d7a]">
              Support the school
            </span>
            <h1 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
              Support Freedom Baptist Mission School
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50 sm:text-xl">
              Because the school is mission-backed, your support has a strategic impact. Partner with us to provide quality classrooms, resources, and a welcoming place for children to learn.
            </p>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          {[
            {
              title: "Sponsor a child",
              description: "Give a child the opportunity to attend school with uniforms, books, and a stable learning environment.",
              icon: "👩‍🎓"
            },
            {
              title: "Donate desks & books",
              description: "Help us furnish classrooms and stock the library with learning materials children can use every day.",
              icon: "📚"
            },
            {
              title: "Building support",
              description: "Invest in safe classrooms, water, and facilities that make this school a strong place for learning.",
              icon: "🏗️"
            },
            {
              title: "Prayer support",
              description: "Stand with us spiritually as we raise up a school rooted in Christian freedom and academic excellence.",
              icon: "🙏"
            },
            {
              title: "Volunteer opportunities",
              description: "Join our team through teaching support, maintenance help, or community engagement projects.",
              icon: "🤝"
            }
          ].map((support) => (
            <div key={support.title} className="rounded-[28px] border-2 border-[#E0E7FF] bg-white p-8 shadow-[0_4px_20px_rgba(0,61,122,0.08)]">
              <div className="text-4xl mb-6">{support.icon}</div>
              <h2 className="text-2xl font-bold text-slate-950 mb-3">{support.title}</h2>
              <p className="text-sm leading-7 text-slate-600">{support.description}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[32px] border-2 border-[#16a34a] bg-[#ECFDF5] p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-950">Why your support matters</h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                As a mission-backed school, Freedom Baptist Mission School combines serious academic standards with a strong Christian foundation. Your gifts help us build trust and deliver real impact to families in Kisii.
              </p>
            </div>
            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0055b8]">Strategic impact areas</p>
              <ul className="mt-5 space-y-3 text-slate-700">
                <li>• Classroom furniture and learning resources</li>
                <li>• Teacher support and training</li>
                <li>• School facilities and safety improvements</li>
                <li>• Community-centered volunteer projects</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border-2 border-[#FFD966] bg-gradient-to-br from-[#FFFAED] to-[#FFF9E6] p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-950">Partner with our mission</h2>
          <p className="mt-4 text-lg leading-8 text-slate-700 max-w-3xl mx-auto">
            Support from caring families, churches, and partners makes this school possible. Join us in creating an excellent and stable learning environment that honors Christian values without feeling like a church website.
          </p>
          <a href="/contact" className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0055b8] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#003d7a]">
            Contact Us to Partner
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
