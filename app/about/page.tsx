import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fff7eb] text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-12 px-6 py-6 lg:gap-20 lg:px-12 lg:py-10">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#003d7a] via-[#0055b8] to-[#004da8] px-6 py-10 shadow-[0_30px_80px_rgba(0,61,122,0.15)] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FCD34D] bg-[#FFD966] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#003d7a]">
              Our Story
            </span>
            <h1 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
              About Freedom Baptist Mission School
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50 sm:text-xl">
              Discover how we're transforming lives through Christ-centered education rooted in excellence, compassion, and Freedom.
            </p>
          </div>
        </section>

        {/* Who We Are & Our Story */}
        <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl">Who We Are</h2>
              <div className="mt-2 h-1 w-24 bg-gradient-to-r from-[#0055b8] to-[#16a34a]"></div>
            </div>
            <p className="text-lg leading-8 text-slate-700">
              Freedom Baptist Mission School is a Christ-centered early learning institution located in Kisii, Kenya, serving students from Kindergarten through Primary 3. We are part of the broader vision of Freedom Baptist Mission, which has been dedicated to reaching Kenya and beyond with the transformative message of Jesus Christ.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              Founded on the conviction that education is a sacred calling, our school exists to nurture not just academic excellence, but the spiritual formation and character development of our students. We believe that true education transforms the whole person—mind, heart, and spirit.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              Every decision we make, every lesson we teach, and every interaction we have is guided by our commitment to help children become Christ-centered learners equipped for life and service.
            </p>
          </div>
          <div className="rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,61,122,0.15)]">
            <img 
              src="https://images.unsplash.com/photo-1427504494785-cdda055acfe8?auto=format&fit=crop&w=600&q=80" 
              alt="Children learning together" 
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* Director's Message */}
        <section className="rounded-[32px] border-2 border-[#FFD966] bg-gradient-to-r from-[#FFFAED] to-[#FFF9E6] p-8 lg:p-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">💬</span>
              <h3 className="text-3xl font-bold text-slate-950">Director's Message</h3>
            </div>
            <div className="space-y-6 text-lg leading-8 text-slate-700">
              <p>
                <span className="font-semibold text-[#0055b8]">"Dear Parents and Friends,</span>
              </p>
              <p>
                Welcome to Freedom Baptist Mission School. Our school exists with a clear purpose: to provide your child with an education that is not only academically excellent but deeply rooted in Christian Freedom and values.
              </p>
              <p>
                In a world that often separates learning from Freedom, we believe education should integrate all areas of a child's development. We want every student to grow in knowledge, develop character, and most importantly, understand their value and purpose in God's design.
              </p>
              <p>
                As a parent, you're looking for a school you can trust—one that shares your values and will care for your child as if they were our own. That's exactly what we strive to be. Our teachers are not just educators; they are mentors, role models, and trusted partners in your child's journey.
              </p>
              <p>
                We invite you to visit our school, meet our team, and experience the warm, purposeful community we've built. We believe your child belongs here, learning not just to succeed in the world, but to serve it with Christ-centered conviction.
              </p>
              <p>
                <span className="font-semibold text-[#0055b8]">With warmth and purpose,
                <br />Director Benard Carry</span>"
              </p>
            </div>
          </div>
        </section>

        {/* Our Vision & Mission */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[32px] border-2 border-[#0055b8] bg-[#E7F3FF] p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <span className="text-5xl">🎯</span>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-950 mb-4">Our Vision</h3>
                <p className="text-lg leading-8 text-slate-700">
                  To raise a generation of Christ-centered leaders who pursue excellence, serve with compassion, and make a lasting impact in their communities and the world.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border-2 border-[#16a34a] bg-[#ECFDF5] p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <span className="text-5xl">📋</span>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-950 mb-4">Our Mission</h3>
                <p className="text-lg leading-8 text-slate-700">
                  To provide quality, Christ-centered early education that nurtures intellectual growth, spiritual formation, and character development in a safe, loving, and engaging community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl">Our Core Values</h2>
            <div className="mt-4 mx-auto h-1 w-24 bg-gradient-to-r from-[#0055b8] to-[#FFD966]"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "⛪",
                title: "Freedom-Centered",
                description: "Jesus Christ is the foundation of everything we do. We integrate biblical principles throughout our curriculum and community."
              },
              {
                icon: "📚",
                title: "Academic Excellence",
                description: "We maintain high academic standards while making learning joyful, engaging, and developmentally appropriate."
              },
              {
                icon: "❤️",
                title: "Compassionate Care",
                description: "Every child is valued, known, and loved. We create a safe environment where children can thrive emotionally and socially."
              },
              {
                icon: "🤝",
                title: "Community & Service",
                description: "We prepare students to be servant leaders who contribute meaningfully to their families, church, and communities."
              },
              {
                icon: "🌱",
                title: "Holistic Development",
                description: "We nurture the whole child—intellectually, emotionally, spiritually, and physically."
              },
              {
                icon: "🏠",
                title: "Family Partnership",
                description: "Parents are vital partners in education. We maintain open communication and work together in your child's development."
              },
              {
                icon: "✨",
                title: "Integrity & Honesty",
                description: "We model and teach truthfulness, responsibility, and ethical living in all we do."
              },
              {
                icon: "🌍",
                title: "Global Perspective",
                description: "We prepare children to understand and engage with the world through a Christian worldview."
              }
            ].map((value) => (
              <div key={value.title} className="rounded-[28px] border-2 border-[#E0E7FF] bg-gradient-to-br from-white to-[#F9FAFB] p-6 shadow-[0_4px_20px_rgba(0,61,122,0.08)] hover:shadow-[0_12px_35px_rgba(0,61,122,0.15)] transition">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-bold text-slate-950 mb-3">{value.title}</h4>
                <p className="text-sm leading-6 text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Statement of Freedom */}
        <section className="rounded-[32px] border-2 border-[#16a34a] bg-gradient-to-r from-[#ECFDF5] to-[#F0FDF4] p-8 lg:p-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🕊️</span>
              <h3 className="text-3xl font-bold text-slate-950">Statement of Freedom</h3>
            </div>
            <p className="text-lg leading-8 text-slate-700">
              Freedom Baptist Mission School is built upon the foundation of God's Word. We believe:
            </p>
            <ul className="space-y-4 text-lg leading-8 text-slate-700">
              <li className="flex items-start gap-4">
                <span className="text-[#16a34a] font-bold text-2xl">✓</span>
                <span><strong>In the God of the Bible:</strong> We believe in the eternal, omnipotent God revealed in Scripture—Father, Son, and Holy Spirit.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#16a34a] font-bold text-2xl">✓</span>
                <span><strong>In Jesus Christ:</strong> Jesus Christ is God's Son, sent to earth, died for our sins, rose from the dead, and offers salvation to all who believe in Him.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#16a34a] font-bold text-2xl">✓</span>
                <span><strong>In the Authority of Scripture:</strong> The Bible is God's inspired, authoritative Word and the foundation of our teaching and values.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#16a34a] font-bold text-2xl">✓</span>
                <span><strong>In Transformation:</strong> Education, combined with Freedom, has the power to transform lives and communities for God's glory.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Philosophy of Christian Education */}
        <section className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl">Why Christian Education Matters</h2>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#0055b8] to-[#FFD966]"></div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border-2 border-[#0055b8] bg-[#E7F3FF] p-8">
              <h3 className="text-2xl font-bold text-slate-950 mb-4">Integrated Learning</h3>
              <p className="text-lg leading-8 text-slate-700">
                In Christian education, we don't separate Freedom from academics. Your child learns that Freedom informs how we approach science, history, language, and mathematics. This creates a cohesive worldview where knowledge serves God's purposes.
              </p>
            </div>

            <div className="rounded-[32px] border-2 border-[#FFD966] bg-[#FFFAED] p-8">
              <h3 className="text-2xl font-bold text-slate-950 mb-4">Character Formation</h3>
              <p className="text-lg leading-8 text-slate-700">
                Beyond test scores, we invest in developing character—honesty, kindness, courage, and integrity. We believe children who understand they are made in God's image grow into responsible, compassionate leaders.
              </p>
            </div>

            <div className="rounded-[32px] border-2 border-[#16a34a] bg-[#ECFDF5] p-8">
              <h3 className="text-2xl font-bold text-slate-950 mb-4">Spiritual Foundation</h3>
              <p className="text-lg leading-8 text-slate-700">
                We help children understand their identity and purpose in Christ. They learn that education is not just about personal advancement but about becoming instruments of God's love and service in the world.
              </p>
            </div>

            <div className="rounded-[32px] border-2 border-[#0055b8] bg-[#F0F4FF] p-8">
              <h3 className="text-2xl font-bold text-slate-950 mb-4">Safe, Nurturing Community</h3>
              <p className="text-lg leading-8 text-slate-700">
                Christian education creates a community bound by shared values and Freedom. Children feel secure knowing their teachers care about them holistically and are invested in their complete development.
              </p>
            </div>
          </div>
        </section>

        {/* Connection to Freedom Baptist Mission */}
        <section className="rounded-[32px] border-2 border-[#0055b8] bg-gradient-to-br from-[#E7F3FF] to-[#F0F4FF] p-8 lg:p-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🌍</span>
              <h3 className="text-3xl font-bold text-slate-950">Connected to Freedom Baptist Mission</h3>
            </div>
            <p className="text-lg leading-8 text-slate-700">
              Freedom Baptist Mission School is part of Freedom Baptist Mission's vision to reach Kenya and beyond with the Gospel of Jesus Christ. Our mission in education aligns with the organization's broader commitment to:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white/80 p-6 border border-[#0055b8]/20">
                <h4 className="font-bold text-[#0055b8] mb-2">Spiritual Transformation</h4>
                <p className="text-slate-700">Helping communities encounter and follow Jesus Christ.</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-6 border border-[#0055b8]/20">
                <h4 className="font-bold text-[#0055b8] mb-2">Community Development</h4>
                <p className="text-slate-700">Strengthening families and communities through quality services.</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-6 border border-[#0055b8]/20">
                <h4 className="font-bold text-[#0055b8] mb-2">Empowerment</h4>
                <p className="text-slate-700">Equipping individuals with education and skills for meaningful life.</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-6 border border-[#0055b8]/20">
                <h4 className="font-bold text-[#0055b8] mb-2">Excellence</h4>
                <p className="text-slate-700">Demonstrating God's love through excellence in all we do.</p>
              </div>
            </div>
            <p className="text-lg leading-8 text-slate-700 mt-6">
              By choosing Freedom Baptist Mission School, you're partnering with an institution dedicated not just to academic excellence, but to the holistic development and spiritual formation of young Kenyans who will lead with integrity, compassion, and Freedom.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-[32px] border-2 border-[#FFD966] bg-gradient-to-br from-[#003d7a] to-[#0055b8] p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 sm:text-4xl">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
            Visit our school, meet our team, and see firsthand how Freedom Baptist Mission School can serve your family.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <a href="/#contact" className="inline-flex h-12 items-center justify-center rounded-full bg-[#FFD966] px-8 text-sm font-semibold text-[#003d7a] transition hover:bg-[#FFC933]">
              Contact Admissions
            </a>
            <a href="/#programs" className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#FFD966] bg-transparent px-8 text-sm font-semibold text-white transition hover:bg-white/10">
              Explore Programs
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
