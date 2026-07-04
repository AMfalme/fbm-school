import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a]">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-24 sm:space-y-32">
        <Navbar />

        {/* ================= HERO SECTION ================= */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-6 pb-12">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Called. Equipped. Sent.
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.1]">
              Preaching Truth. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055b8] to-[#16a34a]">
                Planting Churches.
              </span> <br />
              Equipping Leaders.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2eaf21] to-[#6e680c]">
              Spreading the Gospel.
              </span>
            </h1>

            <p className="max-w-xl text-lg text-slate-600 font-medium leading-relaxed">
              Freedom Baptist Mission spreads the Gospel, plants churches, and provides education support to needy students—ensuring no child travels long distances for quality, Christ-centered learning.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a href="partner" className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#0055b8] px-8 text-sm font-bold text-white shadow-xl shadow-blue-900/10 hover:bg-[#003d7a] transition-all transform hover:-translate-y-0.5">
                Become a Mission Partner
              </a>
              <a href="#ministries" className="inline-flex h-14 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-8 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
                Explore Our Core Arms
              </a>
            </div>
          </div>

          {/* Premium Overlapping Visual Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD966]/20 to-transparent rounded-[40px] blur-3xl -z-10" />
            <div className="relative w-full max-w-[440px]">
              {/* Main Image */}
              <div className="aspect-[3/4] overflow-hidden rounded-[36px] bg-slate-100 shadow-[0_32px_64px_-12px_rgba(0,61,122,0.18)] border-4 border-white">
                <img
                  src="/church/home.png"
                  alt="Mission outreach and community mobilization"
                  className="h-full w-full object-cover transform hover:scale-105 transition duration-700"
                />
              </div>
              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-xl max-w-[200px] hidden sm:block">
                <p className="text-3xl font-black text-[#16a34a]">100%</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Indigenous Leadership Focus</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HIGH-COMPETITION METRICS ================= */}
        <section className="bg-gradient-to-br from-[#003d7a] to-[#0055b8] rounded-[40px] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-6 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-[#FFD966]">01</span>
              <h3 className="text-lg font-bold mt-2">Evangelism & Church Planting</h3>
              <p className="text-xs text-blue-100/80 mt-1 max-w-xs mx-auto">Establishing independent Baptist churches deep in unreached locations.</p>
            </div>
            <div className="pt-6 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-[#FFD966]">02</span>
              <h3 className="text-lg font-bold mt-2">Theology - Bible College</h3>
              <p className="text-xs text-blue-100/80 mt-1 max-w-xs mx-auto">Comprehensive training preparing local leaders for effective ministry and church planting.</p>
            </div>
            <div className="pt-6 md:pt-0">
              <span className="text-4xl sm:text-5xl font-black block text-[#FFD966]">03</span>
              <h3 className="text-lg font-bold mt-2">Early Child Care</h3>
              <p className="text-xs text-blue-100/80 mt-1 max-w-xs mx-auto">Quality education close to home with support for families in need.</p>
            </div>
          </div>
        </section>

        {/* ================= BENTO GRID: STRATEGIC PILLARS ================= */}
        <section id="ministries" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0055b8]">Ministry Framework</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Our Established Work & Pillars
            </h2>
            <p className="text-slate-600 font-medium">
              We look not at things seen but things unseen, planting eternal churches rather than seeking fleeting relief.
            </p>
          </div>

          {/* Professional Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pillar 1: Mission Outreach */}
            <div className="lg:col-span-1 bg-white border border-slate-100 p-8 rounded-[36px] shadow-sm flex flex-col justify-between hover:shadow-xl transition-all group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl group-hover:scale-110 transition duration-300">🌍</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-950 tracking-tight">Mission Outreach</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Obeying the Great Commission, we go into Kenya and beyond to make disciples, baptizing them and teaching them to observe all that Christ commanded through evangelism and community development.
                  </p>
                </div>
              </div>
              <a href="/ministries/missionary-outreach" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0055b8] hover:gap-3 transition-all">
                Explore Outreach <span className="text-lg">→</span>
              </a>
            </div>

            {/* Pillar 2: Church Planting */}
            <div className="lg:col-span-1 bg-white border border-slate-100 p-8 rounded-[36px] shadow-sm flex flex-col justify-between hover:shadow-xl transition-all group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl group-hover:scale-110 transition duration-300">⛪</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-950 tracking-tight">Church Planting</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    We train pastors/church planter to have a desired knowledge of the word of God to plant local Baptist churches that are self-governing, self-supporting, and self-propagating across unreached communities.
                  </p>
                </div>
              </div>
              <a href="/church-planting" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0055b8] hover:gap-3 transition-all">
                View Church Plants <span className="text-lg">→</span>
              </a>
            </div>

            {/* Pillar 3: Bible College */}
            <div className="lg:col-span-1 bg-white border border-slate-100 p-8 rounded-[36px] shadow-sm flex flex-col justify-between hover:shadow-xl transition-all group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl group-hover:scale-110 transition duration-300">📚</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-950 tracking-tight">Bible College</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Fulfilling the Great Commission by thoroughly equipping local pastors and church planters with solid biblical theology, enabling them to handle the Word of Truth rightly as they plant churches and reach their communities for Christ.
                  </p>
                </div>
              </div>
              <a href="/bible-college" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0055b8] hover:gap-3 transition-all">
                View Academic Catalog <span className="text-lg">→</span>
              </a>
            </div>

            {/* Pillar 4: Christian Faith Academy */}
            <div className="lg:col-span-1 bg-white border border-slate-100 p-8 rounded-[36px] shadow-sm flex flex-col justify-between hover:shadow-xl transition-all group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl group-hover:scale-110 transition duration-300">🎓</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-950 tracking-tight">The FBM - Christian Faith Academy</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Foundational education from Pre-Primary to Junior School, integrating academic excellence with uncompromised biblical truth.
                  </p>
                </div>
              </div>
              <a href="/christian-faith-academy" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0055b8] hover:gap-3 transition-all">
                Go to School Portal <span className="text-lg">→</span>
              </a>
            </div>

            {/* Pillar 5: Mission Hospital */}
            <div className="lg:col-span-1 bg-white border border-slate-100 p-8 rounded-[36px] shadow-sm flex flex-col justify-between hover:shadow-xl transition-all group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl group-hover:scale-110 transition duration-300">🏥</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-950 tracking-tight">Mission Hospital</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    We utilize our healthcare ministry as a divine appointment to evangelize, witness, and share the life-changing Gospel with every patient who walks through our doors.
                  </p>
                </div>
              </div>
              <a href="/hospital-project" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0055b8] hover:gap-3 transition-all">
                Explore Medical Ministry <span className="text-lg">→</span>
              </a>
            </div>

            {/* Pillar 6: Mission Outreach (Local Church) */}
            <div className="lg:col-span-1 bg-white border border-slate-100 p-8 rounded-[36px] shadow-sm flex flex-col justify-between hover:shadow-xl transition-all group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-2xl group-hover:scale-110 transition duration-300">⛪</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-950 tracking-tight">Local Church</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    The heart of our ministry, focused on clear Bible teaching, discipleship, and sharing the Gospel in local communities.
                  </p>
                </div>
              </div>
              <a href="/ministries/missionary-outreach" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0055b8] hover:gap-3 transition-all">
                Access Church Profile <span className="text-lg">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ================= THE METHODOLOGY SECTION ================= */}
        <section className="bg-[#FFFDF9] border-2 border-slate-100 rounded-[40px] p-8 sm:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#16a34a]">The Great Commission</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              A Responsible Approach to Global Missions
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We are called to serve and reach Kenya and beyond through the Great Commission, discipleship, and church planting.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-emerald-100 text-emerald-800 p-1 rounded-full text-xs">✓</div>
                <div>
                  <h4 className="font-bold text-slate-950">Financial Integrity Standards</h4>
                  <p className="text-sm text-slate-500">Every resource is accounted for and optimized for verified groundwork development fields.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-emerald-100 text-emerald-800 p-1 rounded-full text-xs">✓</div>
                <div>
                  <h4 className="font-bold text-slate-950">Indigenous Multiplication</h4>
                  <p className="text-sm text-slate-500">We train local men and women to lead their own cultures to ensure permanent growth.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[32px] overflow-hidden aspect-[4/3] bg-slate-100 shadow-inner">
            <img
              src="bible-college/bible college.jpg"
              alt="Community building and long term structural works"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* ================= PARTNERSHIP CALL-TO-ACTION ================= */}
        <section id="partner" className="bg-[#fff7eb] border-2 border-[#FFD966]/40 rounded-[40px] p-8 sm:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-[#0055b8]">
              <span className="text-xl">🤝</span> Global Mission Network
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Partner with Us
            </h3>
            <p className="text-slate-600 leading-relaxed max-w-xl">
              Whether you are an independent Baptist church looking to support a missionary, a donor wanting to fund new church buildings, or a student ready for ministry training—your partnership makes a difference.
            </p>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-700">
              <p>📍 HQ: Kisii, Kenya | Box 4183-40200</p>
              <p>📧 Office: kenyafbmission@gmail.com</p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#003d7a] to-[#0055b8] p-8 rounded-[32px] text-white shadow-2xl flex flex-col justify-between">
            <div className="space-y-2">
              <h4 className="text-xl font-bold tracking-tight">Get Involved</h4>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Contact our team to receive our updates, financial reports, or current church planting project needs.
              </p>
            </div>
            <div className="mt-8 space-y-3">
              <a href="/partner" className="inline-flex w-full h-12 items-center justify-center rounded-xl bg-[#FFD966] text-sm font-bold text-[#003d7a] hover:bg-[#FFC933] transition-all shadow-lg shadow-yellow-500/10">
                Partner With Us
              </a>
              <a href="/contact" className="inline-flex w-full h-12 items-center justify-center rounded-xl border border-white/20 bg-transparent text-sm font-bold text-white hover:bg-white/5 transition-all">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}