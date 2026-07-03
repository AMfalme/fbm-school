import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a]">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-24 sm:space-y-32">
        <Navbar />

        {/* ================= HEADER HERO ================= */}
        <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0055b8]">
            🌍 Independent • Biblical • Indigenous
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.1]">
           Our Identity, Calling,
           
         <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055b8] to-[#16a34a]">
               & Core Beliefs 
              
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Freedom Baptist Mission exists to spread the Gospel, plant churches, and teach the Gospel to people with no formal knowledge—building lasting faith communities across Kenya and beyond.
          </p>
        </section>

        {/* ================= CORE HISTORIC MANDATE ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#16a34a]/10 to-transparent rounded-[40px] blur-3xl -z-10" />
            <div className="aspect-[5/5] overflow-hidden rounded-[36px] bg-slate-100 shadow-[0_32px_64px_-12px_rgba(0,61,122,0.12)] border-4 border-white">
              <img 
                src="/school/about-hero.png" 
                alt="Missionary team fellowship and collaboration" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#16a34a]">The Philosophy</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Moving Beyond Temporary Relief Work
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              We believe lasting change in communities comes through spiritual growth. Our approach focuses on building strong, self-supporting local churches that can serve their communities for generations.
            </p>
            <p className="text-slate-600 leading-relaxed">
Based in Kisii, Kenya, Freedom Baptist Mission partners with local communities to: share the Gospel in rural areas, train pastors at our Bible College, and provide Christ-centered education for children. Learn more about our work on our <a href="/ministries/missionary-outreach" className="text-[#0055b8] font-bold underline">Missionary Outreach page</a>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-950 text-base">Self-Supporting</h4>
                <p className="text-xs text-slate-500 mt-1">We implement practical administrative models that allow local works to sustain themselves independent of external funds.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-950 text-base">Self-Propagating</h4>
                <p className="text-xs text-slate-500 mt-1">Every ministry pillar we construct is intentionally designed to train, seed, and launch secondary off-shoot works directly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= THE DETAILED ARMS SHOWCASE ================= */}
        <section className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0055b8]">Operational Ecosystem</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Our Primary Pillars of Impact</h2>
            <p className="text-slate-600 font-medium text-sm">A deep professional breakdown of the established systems driving the mission footprint forward daily.</p>
          </div>

          <div className="space-y-12">
            {/* Pillar A: Church Planting */}
            <div className="bg-white border border-slate-100 rounded-[40px] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group hover:shadow-md transition-all">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0055b8] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-md">
                  ⛪ Central Assembly & Extension Plants
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Church Planting</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The church is God's plan for reaching the world. We help establish healthy local churches focused on sound biblical teaching, caring community, and regular gatherings for prayer and worship.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Instead of establishing non-denominational groups, we systematically plant independent, fundamental Baptist churches that preserve absolute local body autonomy while maintaining warm, fraternal partnerships with sister assemblies.
                </p>
                <a href="/church-planting" className="inline-flex items-center gap-1 text-xs font-bold text-[#0055b8] hover:underline mt-2">
                  Learn About Our Church Plants →
                </a>
              </div>
              <div className="lg:col-span-5 aspect-[4/3] rounded-3xl overflow-hidden bg-slate-50 border-2 border-slate-100">
                <img 
                  src="church/construct.jpg" 
                  alt="Church assembly congregation gathering" 
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                />
              </div>
            </div>

            {/* Pillar B: Bible College */}
            <div className="bg-white border border-slate-100 rounded-[40px] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group hover:shadow-md transition-all">
              <div className="lg:col-span-5 order-last lg:order-first aspect-[4/3] rounded-3xl overflow-hidden bg-slate-50 border-2 border-slate-100">
                <img 
                  src="bible-college/class.jpeg" 
                  alt="Theological classroom lecturing framework" 
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                />
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-md">
                  📚 Advanced Theological Academy
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Bible College</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A high-caliber, localized academic training institution structured purely to qualify and equip native pastors, church planters, and gospel workers. The curriculum bypasses Western cultural imports, targeting deep biblical text immersion.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Students study core biblical subjects including Systematic Theology, Bible interpretation, Pastoral Epistles, and preaching. Each course includes practical field experience sharing the Gospel in local communities.
                </p>
                <a href="/bible-college" className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline mt-2">
                  Explore Academic Programs →
                </a>
              </div>
            </div>

            {/* Pillar C: The School */}
            <div className="bg-white border border-slate-100 rounded-[40px] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group hover:shadow-md transition-all">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md">
                  🎓 Foundational Community Schooling
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">The Academy (Christian Faith Academy)</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our official institutional childhood educational asset, actively training students from Kindergarten up to Primary 3. We recognize that early childhood conditioning dictates subsequent generational culture, which is why we approach education seriously.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  While strictly adhering to and exceeding standard national academic guidelines, our curericulum seamlessly implements a thorough biblical worldview into all modules—ensuring literacy, logic, and numbering readiness are grounded beautifully in uncompromised truth.
                </p>
                <a href="/school" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline mt-2">
                  Visit the School Portal →
                </a>
              </div>
              <div className="lg:col-span-5 aspect-[4/3] rounded-3xl overflow-hidden bg-slate-50 border-2 border-slate-100">
                <img 
                  src="school/bestcare.jpeg" 
                  alt="Young primary children learning in safe classrooms" 
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= COMPREHENSIVE DOCTRINAL STATEMENT ================= */}
        <section className="bg-gradient-to-br from-[#003d7a] to-[#004da8] rounded-[40px] text-white p-8 sm:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mb-16 -mr-16"></div>
          
          <div className="relative z-10 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#FFD966]">Our Core Beliefs</span>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">What We Uncompromisingly Believe</h2>
              <p className="text-xs text-blue-100/80">A direct, professional summary of Freedom Baptist Mission's strict operational doctrinal framework.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-[#FFD966] text-base">The Scriptures</h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">We believe in the absolute verbal, plenary inspiration of the Holy Scriptures in their original manuscripts; completely inerrant and our final rule of faith.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-[#FFD966] text-base">The True Godhead</h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">We believe in one God eternally existing in three distinct persons: God the Father, God the Son, and God the Holy Spirit, co-equal in power and glory.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-[#FFD966] text-base">Salvation by Grace</h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">We maintain that salvation is entirely by grace alone, separate from any human works or rituals, achieved solely via personal faith in Christ's substitutionary death.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-[#FFD966] text-base">The Local Church</h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">We define the local church as an autonomous, visible congregation of baptized believers associated by covenant of faith and fellowship of the gospel.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-[#FFD966] text-base">Total Separation</h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">We adhere to biblical separation from all forms of apostasy, modern ecumenical movements, compromise, and unscriptural theological unions.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-[#FFD966] text-base">The Great Commission</h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">We believe it is the explicit, urgent obligation of every true local assembly to pray for, finance, and actively send qualified men to preach to all nations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BOTTOM ENGAGEMENT FOR GLOBAL PARTNERS ================= */}
        <section className="bg-[#fff7eb] border-2 border-[#FFD966]/40 rounded-[40px] p-8 sm:p-16 text-center space-y-6 max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0055b8]">Verify Our Work First-Hand</span>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Ready to Support the Field Advancement?</h3>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto text-sm sm:text-base">
            We operate with complete systemic transparency. Independent church missions boards, supportive pastors, and prospective field workers can request detailed operational documents, field reports, and student catalogs anytime.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/support-us" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0055b8] px-6 text-xs font-bold text-white hover:bg-[#003d7a] transition-all">
              Partner via Support Us Portal
            </a>
            <a href="/" className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all">
              Return to Homepage
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}