import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fff7eb] text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-20 px-6 py-6 lg:px-12 lg:py-10">
        <Navbar />

        <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#003d7a] via-[#0055b8] to-[#004da8] px-6 py-10 shadow-[0_30px_80px_rgba(0,61,122,0.15)] sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-20">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FCD34D] bg-[#FFD966] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#003d7a]">
              Admissions Open
            </span>
            <h1 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
              Raising Christ-centered learners for life and service.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-50 sm:text-xl">
              Freedom Baptist Mission School nurtures curious minds and Freedomful hearts through quality early education grounded in Christian values and compassionate care.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a className="inline-flex h-12 items-center justify-center rounded-full bg-[#FFD966] px-8 text-sm font-semibold text-[#003d7a] transition hover:bg-[#FFC933]" href="#contact">
                Contact Admissions
              </a>
              <a className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#FFD966] bg-transparent px-8 text-sm font-semibold text-white transition hover:bg-white/10" href="/about">
                Learn more
              </a>
            </div>
          </div>

          <div className="mt-12 flex justify-center lg:mt-0 lg:w-[46%] lg:justify-end">
            <div className="relative w-full max-w-[420px] rounded-[32px] bg-white/95 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:p-7 backdrop-blur-sm">
              <div className="aspect-[4/3] overflow-hidden rounded-[28px] bg-slate-100">
                <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1542736667-069246bdbc7d?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
              </div>
              <div className="mt-5 rounded-[26px] border border-[#003d7a]/20 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Logo" className="h-12 w-12 rounded-2xl" />
                  <div>
                    <p className="text-sm font-semibold text-slate-950">Freedom Baptist Mission</p>
                    <p className="text-xs text-[#16a34a]">CBC to Primary</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-700">
                  <p className="flex items-center gap-2"><span className="text-lg text-[#16a34a]">✓</span> Christ-centered education</p>
                  <p className="flex items-center gap-2"><span className="text-lg text-[#16a34a]">✓</span> Safe, nurturing environment</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-4">
          <div className="rounded-[28px] border-2 border-[#003d7a] bg-[#E7F3FF] p-6 text-center">
            <p className="text-4xl font-black text-[#0055b8]">Kindergarten</p>
            <p className="mt-2 text-sm text-slate-700">to Primary 3</p>
          </div>
          <div className="rounded-[28px] border-2 border-[#16a34a] bg-[#ECFDF5] p-6 text-center">
            <p className="text-2xl font-semibold text-[#16a34a]">📍 Kisii, Kenya</p>
            <p className="mt-2 text-sm text-slate-700">P.O Box 4183-40200</p>
          </div>
          <div className="rounded-[28px] border-2 border-[#FFD966] bg-[#FFFAED] p-6 text-center">
            <p className="text-2xl font-semibold text-[#F59E0B]">🕊️ Christian</p>
            <p className="mt-2 text-sm text-slate-700">Freedom-based learning</p>
          </div>
          <div className="rounded-[28px] border-2 border-[#0055b8] bg-[#F0F4FF] p-6 text-center">
            <p className="text-2xl font-semibold text-[#0055b8]">✨ Now Enrolling</p>
            <p className="mt-2 text-sm text-slate-700">Limited spots available</p>
          </div>
        </section>

        <section id="programs" className="space-y-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0055b8]">Our Curriculum</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Holistic development grounded in Freedom
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              We combine academic excellence with character development, helping children grow intellectually, emotionally, spiritually, and socially.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Bible & Values", description: "Christian character formation, prayer, and biblical literacy." },
              { title: "Early Literacy", description: "Reading readiness and language development through engaging stories." },
              { title: "Numeracy & Logic", description: "Mathematical thinking and problem-solving foundations." },
              { title: "Creative & Physical", description: "Arts, music, play, and motor skill development." },
            ].map((program) => (
              <article key={program.title} className="rounded-[28px] border-2 border-[#E0E7FF] bg-gradient-to-br from-white to-[#F9FAFB] p-6 shadow-[0_4px_20px_rgba(0,61,122,0.08)] transition hover:-translate-y-2 hover:shadow-[0_12px_35px_rgba(0,61,122,0.15)] hover:border-[#0055b8]">
                <div className="mb-5 h-14 w-14 rounded-3xl bg-gradient-to-br from-[#FFD966] to-[#FFC933] p-3 text-center text-2xl font-bold text-[#003d7a]">✨</div>
                <h3 className="text-xl font-semibold text-slate-950">{program.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{program.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="rounded-[32px] border-2 border-[#0055b8] bg-gradient-to-r from-[#E7F3FF] to-[#F0F4FF] p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#0055b8] bg-[#E7F3FF] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#0055b8]">
                  Our Story
                </span>
                <h2 className="mt-6 text-4xl font-bold text-slate-950 sm:text-5xl">
                  About Freedom Baptist Mission School
                </h2>
              </div>
              <p className="text-lg leading-8 text-slate-700">
                Freedom Baptist Mission School is a Christ-centered early learning institution serving students from Kindergarten through Primary 3. As part of Freedom Baptist Mission's vision to reach Kenya and beyond, we provide quality education grounded in biblical principles and compassionate care.
              </p>
              <p className="text-lg leading-8 text-slate-700">
                We believe true education transforms the whole person—mind, heart, and spirit. Every child is valued, known, and loved as we nurture them to become Christ-centered learners equipped for life and service.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-white/80 p-4 border border-[#0055b8]/20">
                  <p className="font-semibold text-[#0055b8]">✓ Freedom-Centered</p>
                  <p className="mt-1 text-sm text-slate-600">Jesus at the foundation</p>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 border border-[#0055b8]/20">
                  <p className="font-semibold text-[#0055b8]">✓ Academically Excellent</p>
                  <p className="mt-1 text-sm text-slate-600">Rigorous & joyful learning</p>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 border border-[#0055b8]/20">
                  <p className="font-semibold text-[#0055b8]">✓ Holistically Nurturing</p>
                  <p className="mt-1 text-sm text-slate-600">Whole child development</p>
                </div>
              </div>
              <a href="/about" className="inline-flex h-12 items-center justify-center rounded-full bg-[#0055b8] px-8 text-sm font-semibold text-white transition hover:bg-[#003d7a]">
                Learn Our Full Story →
              </a>
            </div>
            <div className="rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,61,122,0.15)]">
              <img 
                src="https://images.unsplash.com/photo-1427504494785-cdda055acfe8?auto=format&fit=crop&w=600&q=80" 
                alt="Students learning" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section id="contact" className="grid gap-8 rounded-[32px] border-2 border-[#FFD966] bg-gradient-to-br from-[#FFFAED] to-[#FFF9E6] p-8 shadow-[0_20px_45px_rgba(255,217,102,0.2)]">
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-3xl">📞</span>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0055b8]">Get in Touch</p>
            </div>
            <h3 className="text-3xl font-bold text-slate-950 sm:text-4xl">Ready to join our school community?</h3>
            <p className="text-base leading-8 text-slate-700">
              Schedule a school visit, learn more about our programs, or start the enrollment process. We'd love to welcome your family to Freedom Baptist Mission School, where every child is valued and nurtured.
            </p>
            <div className="space-y-3 text-sm text-slate-700">
              <p><span className="font-semibold text-[#003d7a]">📱 Phone:</span> +254 (723) 456-7890</p>
              <p><span className="font-semibold text-[#003d7a]">📧 Email:</span> admissions@fbm-school.org</p>
              <p><span className="font-semibold text-[#003d7a]">📍 Location:</span> Kisii, Kenya | P.O Box 4183-40200</p>
            </div>
          </div>
          <div className="rounded-[28px] bg-gradient-to-br from-[#003d7a] to-[#0055b8] p-6 shadow-[0_10px_35px_rgba(0,61,122,0.2)]">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🎓</span>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#FFD966]">Start Enrollment</p>
            </div>
            <h4 className="text-2xl font-semibold text-white">Admissions Now Open</h4>
            <p className="mt-3 text-sm leading-7 text-blue-100">
              Limited spots available for CBC to Primary 3. Join us for a transformative educational journey rooted in Freedom and excellence.
            </p>
            <a href="/admissions" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#FFD966] px-5 py-3 text-sm font-semibold text-[#003d7a] transition hover:bg-[#FFC933] shadow-lg">
              ✓ Apply Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
