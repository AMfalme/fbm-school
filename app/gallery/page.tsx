import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GalleryMedia from "../components/GalleryMedia";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#fff7eb] text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-20 px-6 py-6 lg:px-12 lg:py-10">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#FFD966] via-[#F59E0B] to-[#D97706] px-6 py-10 shadow-[0_30px_80px_rgba(245,158,11,0.15)] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#003d7a] bg-[#003d7a] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#FFD966]">
              Our Journey
            </span>
            <h1 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
              Building Dreams, Growing Freedom
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-orange-50 sm:text-xl">
              See our construction progress, student activities, and community involvement as we build a place where children can thrive in freedom and learning.
            </p>
          </div>
        </section>

        {/* Uploaded Media (Firestore) */}
        <GalleryMedia />

       

        {/* Classroom Setup */}
        <section className="rounded-[32px] border-2 border-[#0055b8] bg-gradient-to-r from-[#E7F3FF] to-[#F0F4FF] p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#0055b8] bg-[#E7F3FF] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#0055b8]">
                  Learning Spaces
                </span>
                <h2 className="mt-6 text-4xl font-bold text-slate-950 sm:text-5xl">
                  Classroom Setup
                </h2>
              </div>
              <p className="text-lg leading-8 text-slate-700">
                Our classrooms are designed to inspire curiosity and create a love for learning. Each space is carefully planned to support different learning styles and activities.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white/80 p-4 border border-[#0055b8]/20">
                  <h4 className="font-semibold text-[#0055b8] mb-2">Interactive Learning</h4>
                  <p className="text-sm text-slate-600">Whiteboards, projectors, and hands-on materials</p>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 border border-[#0055b8]/20">
                  <h4 className="font-semibold text-[#0055b8] mb-2">Comfortable Seating</h4>
                  <p className="text-sm text-slate-600">Child-sized furniture for focused learning</p>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 border border-[#0055b8]/20">
                  <h4 className="font-semibold text-[#0055b8] mb-2">Natural Light</h4>
                  <p className="text-sm text-slate-600">Large windows for bright, welcoming spaces</p>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 border border-[#0055b8]/20">
                  <h4 className="font-semibold text-[#0055b8] mb-2">Storage Solutions</h4>
                  <p className="text-sm text-slate-600">Organized spaces for books and learning materials</p>
                </div>
              </div>
            </div>
            <div className="rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,61,122,0.15)]">
              <img
                src="/school/class seats.jpeg"
                alt="Classroom setup"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Student Activities */}
        {/* <section className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl">Student Activities & Learning</h2>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#16a34a] to-[#FFD966]"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Outdoor Learning",
                description: "Exploring nature and God's creation through hands-on activities.",
                image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=400&q=80",
                icon: "🌳"
              },
              {
                title: "Arts & Crafts",
                description: "Creative expression through painting, drawing, and craft projects.",
                image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80",
                icon: "🎨"
              },
              {
                title: "Music & Movement",
                description: "Songs, rhythm activities, and physical development through play.",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80",
                icon: "🎵"
              },
              {
                title: "Group Activities",
                description: "Collaborative learning and social skills development.",
                image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80",
                icon: "👥"
              },
              {
                title: "Science Experiments",
                description: "Hands-on exploration of God's amazing world.",
                image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
                icon: "🔬"
              },
              {
                title: "Bible Stories",
                description: "Learning God's Word through stories and activities.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
                icon: "📖"
              },
              {
                title: "Physical Play",
                description: "Healthy development through games and outdoor activities.",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80",
                icon: "⚽"
              },
              {
                title: "Celebration Time",
                description: "Recognizing achievements and special milestones.",
                image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=400&q=80",
                icon: "🎉"
              }
            ].map((activity) => (
              <div key={activity.title} className="rounded-[28px] border-2 border-[#E0E7FF] bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,61,122,0.08)] hover:shadow-[0_12px_35px_rgba(0,61,122,0.15)] transition">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{activity.icon}</span>
                    <h3 className="text-lg font-bold text-slate-950">{activity.title}</h3>
                  </div>
                  <p className="text-sm leading-5 text-slate-600">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Church Involvement */}
        <section className="rounded-[32px] border-2 border-[#16a34a] bg-gradient-to-br from-[#ECFDF5] to-[#F0FDF4] p-8 lg:p-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-slate-950">Church & Community Involvement</h2>
              <div className="mt-4 mx-auto h-1 w-24 bg-gradient-to-r from-[#16a34a] to-[#0055b8]"></div>
              <p className="mt-4 text-lg text-slate-600">
                Our school is deeply connected to the local church and community, creating a supportive network for our students and families.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Freedom Baptist Mission Church Partnership",
                  description: "Close collaboration with our sponsoring church for spiritual guidance and community support.",
                  icon: "⛪"
                },
                {
                  title: "Community Outreach",
                  description: "Regular service projects helping neighbors and sharing God's love in practical ways.",
                  icon: "🤝"
                },
                {
                  title: "Family Ministry",
                  description: "Supporting families in their spiritual journey and parenting responsibilities.",
                  icon: "👨‍👩‍👧‍👦"
                },
                {
                  title: "Youth Programs",
                  description: "After-school activities and events that build faith and friendships.",
                  icon: "🎸"
                },
                {
                  title: "Prayer Ministry",
                  description: "Regular prayer meetings and support for families and community needs.",
                  icon: "🙏"
                },
                {
                  title: "Mission Projects",
                  description: "Teaching children about global missions and participating in outreach efforts.",
                  icon: "🌍"
                }
              ].map((involvement) => (
                <div key={involvement.title} className="rounded-[28px] border-2 border-[#16a34a]/20 bg-white/80 p-6 shadow-[0_4px_20px_rgba(22,163,74,0.08)]">
                  <div className="text-3xl mb-3">{involvement.icon}</div>
                  <h3 className="text-xl font-bold text-slate-950 mb-3">{involvement.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{involvement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="rounded-[32px] border-2 border-[#FFD966] bg-gradient-to-br from-[#003d7a] to-[#0055b8] p-8 lg:p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-5xl mb-4 block">🌅</span>
            <h2 className="text-3xl font-bold text-white mb-4">Our Future Vision</h2>
            <p className="text-lg text-blue-50 mb-8">
              We're building more than a school—we're creating a community where freedom, learning, and love come together to shape the next generation.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-left">
              {[
                {
                  title: "Growing Community",
                  description: "Expanding our reach to serve more families in faith-based education.",
                  icon: "🌱"
                },
                {
                  title: "Enhanced Facilities",
                  description: "Adding sports fields, gardens, and specialized learning spaces.",
                  icon: "🏗️"
                },
                {
                  title: "Technology Integration",
                  description: "Modern tools that enhance learning while maintaining our values.",
                  icon: "💻"
                },
                {
                  title: "Global Connections",
                  description: "Building partnerships for cultural exchange and mission work.",
                  icon: "🌍"
                }
              ].map((vision) => (
                <div key={vision.title} className="rounded-[28px] bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                  <div className="text-3xl mb-3">{vision.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{vision.title}</h3>
                  <p className="text-sm leading-6 text-blue-50">{vision.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-[32px] border-2 border-[#FFD966] bg-gradient-to-r from-[#FFFAED] to-[#FFF9E6] p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-950 mb-4">
            Be Part of Our Story
          </h2>
          <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
            Join us as we build a school that will impact generations. Your support and prayers make this vision possible.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <a href="/contact" className="inline-flex items-center justify-center bg-[#FFD966] text-[#003d7a] px-8 py-4 rounded-full font-semibold hover:bg-[#FFC933] transition">
              📞 Get Involved
            </a>
            <a href="/admissions" className="inline-flex items-center justify-center border-2 border-[#FFD966] bg-transparent text-[#F59E0B] px-8 py-4 rounded-full font-semibold hover:bg-[#FFD966] hover:text-[#003d7a] transition">
              🎓 Join Our Family
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}