import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fff7eb] text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-20 px-6 py-6 lg:px-12 lg:py-10">
        <Navbar />

        <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#003d7a] via-[#0055b8] to-[#004da8] px-6 py-10 shadow-[0_30px_80px_rgba(0,61,122,0.15)] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FFD966] bg-[#FFD966] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#003d7a]">
              Contact Us
            </span>
            <h1 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
              Connect with our team
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50 sm:text-xl">
              We are here to answer your questions about admissions, programs, campus visits, and how your child can join Christian Faith Academy.
            </p>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 rounded-[32px] border-2 border-[#0055b8] bg-[#E7F3FF] p-8 lg:p-12">
            <h2 className="text-4xl font-bold text-slate-950">Get in touch</h2>
            <p className="text-lg leading-8 text-slate-700">
              Our school office is ready to help you learn more about admissions, school life, and the support available for families.
            </p>
            <div className="space-y-4 text-slate-700">
              <div>
                <p className="font-semibold text-[#0055b8]">📞 Phone</p>
                <p>+254 (723) 456-7890</p>
              </div>
              <div>
                <p className="font-semibold text-[#0055b8]">📧 Email</p>
                <p>admissions@fbm-school.org</p>
              </div>
              <div>
                <p className="font-semibold text-[#0055b8]">📍 Location</p>
                <p>Kisii, Kenya | P.O Box 4183-40200</p>
              </div>
            </div>
            <a href="mailto:admissions@fbm-school.org" className="inline-flex items-center justify-center rounded-full bg-[#0055b8] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#003d7a]">
              Email Admissions
            </a>
          </div>

          <div className="rounded-[32px] border-2 border-[#16a34a] bg-[#ECFDF5] p-8 lg:p-12">
            <h2 className="text-4xl font-bold text-slate-950">Request a visit</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Schedule a campus visit to meet our team, see our classrooms, and feel the culture of Freedom-based learning for yourself.
            </p>
            <div className="mt-8 space-y-5">
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="font-semibold text-[#16a34a]">Step 1</p>
                <p className="text-sm text-slate-700">Send a short message with your preferred visit date.</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="font-semibold text-[#16a34a]">Step 2</p>
                <p className="text-sm text-slate-700">We confirm your spot and share directions to school.</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="font-semibold text-[#16a34a]">Step 3</p>
                <p className="text-sm text-slate-700">Meet Director Benard Carry and explore our classrooms.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border-2 border-[#FFD966] bg-gradient-to-br from-[#FFFAED] to-[#FFF9E6] p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "FAQ",
                description: "Quick answers to common admissions and school life questions."
              },
              {
                title: "Visit the school",
                description: "See the campus, meet teachers, and experience our supportive learning environment."
              },
              {
                title: "Ask about enrollment",
                description: "Find out which spots are available and how to register your child."
              }
            ].map((item) => (
              <div key={item.title} className="rounded-[28px] bg-white p-6 shadow-[0_10px_25px_rgba(0,61,122,0.08)]">
                <h3 className="text-xl font-semibold text-slate-950 mb-3">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-700">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
