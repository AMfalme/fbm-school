import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-[#fff7eb] text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-20 px-6 py-6 lg:px-12 lg:py-10">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#003d7a] via-[#0055b8] to-[#004da8] px-6 py-10 shadow-[0_30px_80px_rgba(0,61,122,0.15)] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FCD34D] bg-[#FFD966] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#003d7a]">
              Academic Excellence
            </span>
            <h1 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
              Strong Academics, Strong Character
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50 sm:text-xl">
              Our curriculum combines rigorous academics with character formation, preparing students for excellence in both knowledge and Freedom.
            </p>
          </div>
        </section>

        {/* CBC Integration */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl">CBC Curriculum Integration</h2>
            <div className="mt-4 mx-auto h-1 w-24 bg-gradient-to-r from-[#0055b8] to-[#FFD966]"></div>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              We follow Kenya's Competency-Based Curriculum (CBC) while integrating Christian values and character development throughout learning.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[28px] border-2 border-[#0055b8] bg-[#E7F3FF] p-6">
              <div className="text-center mb-4">
                <span className="text-4xl">🎯</span>
                <h3 className="text-xl font-bold text-slate-950 mt-2">Core Competencies</h3>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-[#0055b8]">✓</span>
                  Communication & Collaboration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#0055b8]">✓</span>
                  Critical Thinking & Problem Solving
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#0055b8]">✓</span>
                  Creativity & Imagination
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#0055b8]">✓</span>
                  Digital Literacy
                </li>
              </ul>
            </div>

            <div className="rounded-[28px] border-2 border-[#16a34a] bg-[#ECFDF5] p-6">
              <div className="text-center mb-4">
                <span className="text-4xl">🌱</span>
                <h3 className="text-xl font-bold text-slate-950 mt-2">Learning Areas</h3>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-[#16a34a]">✓</span>
                  Languages (English, Kiswahili)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#16a34a]">✓</span>
                  Mathematics
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#16a34a]">✓</span>
                  Science & Technology
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#16a34a]">✓</span>
                  Social Studies
                </li>
              </ul>
            </div>

            <div className="rounded-[28px] border-2 border-[#FFD966] bg-[#FFFAED] p-6">
              <div className="text-center mb-4">
                <span className="text-4xl">🕊️</span>
                <h3 className="text-xl font-bold text-slate-950 mt-2">Christian Integration</h3>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-[#F59E0B]">✓</span>
                  Biblical Worldview
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#F59E0B]">✓</span>
                  Character Formation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#F59E0B]">✓</span>
                  Service Learning
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#F59E0B]">✓</span>
                  Prayer & Worship
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Subjects Taught */}
        <section className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl">Subjects Taught</h2>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#0055b8] to-[#FFD966]"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                subject: "English Language",
                description: "Reading, writing, speaking, and listening skills with emphasis on comprehension and communication.",
                icon: "📖"
              },
              {
                subject: "Kiswahili",
                description: "Mother tongue development and cultural understanding through language and literature.",
                icon: "🗣️"
              },
              {
                subject: "Mathematics",
                description: "Number sense, problem-solving, geometry, and logical thinking through hands-on activities.",
                icon: "🔢"
              },
              {
                subject: "Science",
                description: "Exploration of God's creation through experiments, observation, and environmental studies.",
                icon: "🔬"
              },
              {
                subject: "Social Studies",
                description: "Kenyan history, geography, civics, and cultural understanding with a Christian perspective.",
                icon: "🌍"
              },
              {
                subject: "Christian Religious Education",
                description: "Bible stories, Christian values, prayer, and understanding God's plan for our lives.",
                icon: "⛪"
              },
              {
                subject: "Creative Arts",
                description: "Music, art, drama, and crafts to develop imagination and self-expression.",
                icon: "🎨"
              },
              {
                subject: "Physical Education",
                description: "Motor skills, games, and healthy living habits for physical development.",
                icon: "⚽"
              },
              {
                subject: "Life Skills",
                description: "Personal hygiene, safety, nutrition, and practical living skills.",
                icon: "🌱"
              }
            ].map((subject) => (
              <div key={subject.subject} className="rounded-[28px] border-2 border-[#E0E7FF] bg-gradient-to-br from-white to-[#F9FAFB] p-6 shadow-[0_4px_20px_rgba(0,61,122,0.08)] hover:shadow-[0_12px_35px_rgba(0,61,122,0.15)] transition">
                <div className="text-3xl mb-3">{subject.icon}</div>
                <h3 className="text-xl font-bold text-slate-950 mb-3">{subject.subject}</h3>
                <p className="text-sm leading-6 text-slate-600">{subject.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Literacy Focus */}
        <section className="rounded-[32px] border-2 border-[#0055b8] bg-gradient-to-r from-[#E7F3FF] to-[#F0F4FF] p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#0055b8] bg-[#E7F3FF] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#0055b8]">
                  Literacy Excellence
                </span>
                <h2 className="mt-6 text-4xl font-bold text-slate-950 sm:text-5xl">
                  Literacy at Our Core
                </h2>
              </div>
              <p className="text-lg leading-8 text-slate-700">
                Reading and writing are foundational to all learning. Our literacy program emphasizes phonics, comprehension, vocabulary development, and a love for books. We believe that strong literacy skills open doors to understanding God's Word and the world around us.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white/80 p-4 border border-[#0055b8]/20">
                  <h4 className="font-semibold text-[#0055b8] mb-2">Reading Readiness</h4>
                  <p className="text-sm text-slate-600">Phonics, sight words, and comprehension strategies</p>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 border border-[#0055b8]/20">
                  <h4 className="font-semibold text-[#0055b8] mb-2">Writing Skills</h4>
                  <p className="text-sm text-slate-600">Handwriting, creative writing, and communication</p>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 border border-[#0055b8]/20">
                  <h4 className="font-semibold text-[#0055b8] mb-2">Language Development</h4>
                  <p className="text-sm text-slate-600">Vocabulary building and oral expression</p>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 border border-[#0055b8]/20">
                  <h4 className="font-semibold text-[#0055b8] mb-2">Bible Literacy</h4>
                  <p className="text-sm text-slate-600">Understanding and applying God's Word</p>
                </div>
              </div>
            </div>
            <div className="rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,61,122,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80"
                alt="Children reading together"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Christian Worldview Integration */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl">Christian Worldview Integration</h2>
            <div className="mt-4 mx-auto h-1 w-24 bg-gradient-to-r from-[#16a34a] to-[#0055b8]"></div>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              Freedom is not separate from learning—it's the foundation that gives meaning and purpose to everything we teach.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Creation & Science",
                description: "Exploring God's creation through scientific discovery and wonder.",
                icon: "🌟"
              },
              {
                title: "Character & Ethics",
                description: "Teaching honesty, kindness, and integrity as reflections of God's character.",
                icon: "❤️"
              },
              {
                title: "Community & Service",
                description: "Learning to love and serve others as Jesus taught us to do.",
                icon: "🤝"
              },
              {
                title: "Purpose & Calling",
                description: "Understanding each child's unique gifts and God's plan for their life.",
                icon: "🎯"
              }
            ].map((item) => (
              <div key={item.title} className="rounded-[28px] border-2 border-[#16a34a] bg-[#ECFDF5] p-6 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-950 mb-3">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Co-curricular Activities */}
        <section className="rounded-[32px] border-2 border-[#FFD966] bg-gradient-to-br from-[#FFFAED] to-[#FFF9E6] p-8 lg:p-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-slate-950">Co-curricular Activities</h2>
              <div className="mt-4 mx-auto h-1 w-24 bg-gradient-to-r from-[#FFD966] to-[#0055b8]"></div>
              <p className="mt-4 text-lg text-slate-600">
                Learning extends beyond the classroom through activities that develop the whole child.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  activity: "Music & Worship",
                  description: "Singing, rhythm activities, and learning worship songs that glorify God.",
                  icon: "🎵"
                },
                {
                  activity: "Arts & Crafts",
                  description: "Creative expression through drawing, painting, and hands-on projects.",
                  icon: "🎨"
                },
                {
                  activity: "Sports & Games",
                  description: "Physical development through team sports, games, and outdoor activities.",
                  icon: "⚽"
                },
                {
                  activity: "Nature Studies",
                  description: "Exploring God's creation through gardening, nature walks, and environmental care.",
                  icon: "🌳"
                },
                {
                  activity: "Community Service",
                  description: "Learning to serve others through helping projects and outreach activities.",
                  icon: "🌱"
                },
                {
                  activity: "Cultural Activities",
                  description: "Celebrating Kenyan culture, traditions, and Christian festivals together.",
                  icon: "🇰🇪"
                }
              ].map((activity) => (
                <div key={activity.activity} className="rounded-[28px] border-2 border-[#E0E7FF] bg-white p-6 shadow-[0_4px_20px_rgba(0,61,122,0.08)]">
                  <div className="text-3xl mb-3">{activity.icon}</div>
                  <h3 className="text-xl font-bold text-slate-950 mb-3">{activity.activity}</h3>
                  <p className="text-sm leading-6 text-slate-600">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Assessment & Progress */}
        <section className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl">Assessment & Progress Tracking</h2>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#0055b8] to-[#FFD966]"></div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border-2 border-[#0055b8] bg-[#E7F3FF] p-8">
              <h3 className="text-2xl font-bold text-slate-950 mb-4">Continuous Assessment</h3>
              <p className="text-lg leading-8 text-slate-700 mb-6">
                We use ongoing assessment methods that support learning rather than just measuring it. Our approach includes:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#0055b8] font-bold text-lg mt-1">•</span>
                  <span>Observation of daily activities and participation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0055b8] font-bold text-lg mt-1">•</span>
                  <span>Project-based assessments and portfolios</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0055b8] font-bold text-lg mt-1">•</span>
                  <span>Regular parent-teacher communication</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0055b8] font-bold text-lg mt-1">•</span>
                  <span>CBC-aligned progress reports</span>
                </li>
              </ul>
            </div>

            <div className="rounded-[32px] border-2 border-[#16a34a] bg-[#ECFDF5] p-8">
              <h3 className="text-2xl font-bold text-slate-950 mb-4">Individualized Support</h3>
              <p className="text-lg leading-8 text-slate-700 mb-6">
                Every child learns differently. We provide personalized support to ensure each student reaches their full potential:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#16a34a] font-bold text-lg mt-1">•</span>
                  <span>Small class sizes for individual attention</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#16a34a] font-bold text-lg mt-1">•</span>
                  <span>Differentiated instruction methods</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#16a34a] font-bold text-lg mt-1">•</span>
                  <span>Extra support for those who need it</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#16a34a] font-bold text-lg mt-1">•</span>
                  <span>Enrichment opportunities for advanced learners</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-[32px] border-2 border-[#FFD966] bg-gradient-to-br from-[#003d7a] to-[#0055b8] p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experience Our Academic Excellence
          </h2>
          <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
            Schedule a school visit to see our curriculum in action and meet our dedicated teaching team.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <a href="/admissions" className="inline-flex items-center justify-center bg-[#FFD966] text-[#003d7a] px-8 py-4 rounded-full font-semibold hover:bg-[#FFC933] transition">
              📚 Learn About Admissions
            </a>
            <a href="/contact" className="inline-flex items-center justify-center border-2 border-[#FFD966] bg-transparent text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition">
              📞 Contact Us Today
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}