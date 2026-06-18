import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SpiritualLifePage() {
  return (
    <div className="min-h-screen bg-[#fff7eb] text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-20 px-6 py-6 lg:px-12 lg:py-10">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#16a34a] via-[#15803d] to-[#166534] px-6 py-10 shadow-[0_30px_80px_rgba(22,163,74,0.15)] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FFD966] bg-[#FFD966] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#003d7a]">
              Spiritual Life
            </span>
            <h1 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
              A strong Christian foundation for a serious school.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-green-50 sm:text-xl">
              Our spiritual life program supports academic excellence with values, prayer, chapel, and character formation—without making the school feel like a church website.
            </p>
          </div>
        </section>

        {/* Bible Lessons */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl">Bible Lessons & Spiritual Growth</h2>
            <div className="mt-4 mx-auto h-1 w-24 bg-gradient-to-r from-[#16a34a] to-[#FFD966]"></div>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              God's Word is central to our daily life. We teach children biblical truths in age-appropriate ways that help them understand and apply Scripture.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Daily Bible Stories",
                description: "Age-appropriate Bible stories that teach God's love, wisdom, and plan for our lives.",
                icon: "📖"
              },
              {
                title: "Memory Verses",
                description: "Learning and applying Scripture through fun memorization activities and songs.",
                icon: "🧠"
              },
              {
                title: "Prayer Time",
                description: "Teaching children to pray and developing a personal relationship with God.",
                icon: "🙏"
              },
              {
                title: "Character Lessons",
                description: "Biblical principles applied to everyday situations and decision-making.",
                icon: "❤️"
              }
            ].map((lesson) => (
              <div key={lesson.title} className="rounded-[28px] border-2 border-[#16a34a] bg-[#ECFDF5] p-6 text-center">
                <div className="text-4xl mb-4">{lesson.icon}</div>
                <h3 className="text-xl font-bold text-slate-950 mb-3">{lesson.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{lesson.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Chapel Services */}
        <section className="rounded-[32px] border-2 border-[#FFD966] bg-gradient-to-br from-[#FFFAED] to-[#FFF9E6] p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#FFD966] bg-[#FFD966] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#003d7a]">
                  Worship Together
                </span>
                <h2 className="mt-6 text-4xl font-bold text-slate-950 sm:text-5xl">
                  Chapel Services
                </h2>
              </div>
              <p className="text-lg leading-8 text-slate-700">
                Our weekly chapel services bring the school community together in worship, creating meaningful experiences that connect freedom with everyday life. These gatherings help children understand that worship is a joyful celebration of God's love.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#FFD966] text-2xl mt-1">🎵</span>
                  <div>
                    <h4 className="font-semibold text-slate-950">Worship Songs</h4>
                    <p className="text-sm text-slate-600">Learning to sing praises and worship God together</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FFD966] text-2xl mt-1">📖</span>
                  <div>
                    <h4 className="font-semibold text-slate-950">Bible Messages</h4>
                    <p className="text-sm text-slate-600">Age-appropriate teachings from God's Word</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FFD966] text-2xl mt-1">🙏</span>
                  <div>
                    <h4 className="font-semibold text-slate-950">Group Prayer</h4>
                    <p className="text-sm text-slate-600">Praying together as a school family</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(22,163,74,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1507692049790-de58290a4354?auto=format&fit=crop&w=600&q=80"
                alt="Children in worship"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Discipline Philosophy */}
        <section className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl">Discipline with Love</h2>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#0055b8] to-[#16a34a]"></div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border-2 border-[#0055b8] bg-[#E7F3FF] p-8">
              <h3 className="text-2xl font-bold text-slate-950 mb-4">Our Approach</h3>
              <p className="text-lg leading-8 text-slate-700 mb-6">
                Discipline at Christian Faith Academy is rooted in love, respect, and biblical principles. We believe children thrive when they understand expectations and feel secure in their relationships with teachers and peers.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#0055b8] font-bold text-lg mt-1">✓</span>
                  <span><strong>Prevention First:</strong> Creating environments where good behavior naturally occurs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0055b8] font-bold text-lg mt-1">✓</span>
                  <span><strong>Teaching Moments:</strong> Using mistakes as opportunities to learn and grow</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0055b8] font-bold text-lg mt-1">✓</span>
                  <span><strong>Restorative Practices:</strong> Helping children make amends and rebuild relationships</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0055b8] font-bold text-lg mt-1">✓</span>
                  <span><strong>Positive Reinforcement:</strong> Celebrating good choices and character growth</span>
                </li>
              </ul>
            </div>

            <div className="rounded-[32px] border-2 border-[#16a34a] bg-[#ECFDF5] p-8">
              <h3 className="text-2xl font-bold text-slate-950 mb-4">Biblical Foundation</h3>
              <p className="text-lg leading-8 text-slate-700 mb-6">
                Our discipline philosophy is guided by Proverbs 22:6: "Train up a child in the way he should go; even when he is old he will not depart from it."
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white/80 rounded-lg border border-[#16a34a]/20">
                  <p className="text-sm italic text-slate-600 mb-2">"Fathers, do not provoke your children to anger, but bring them up in the discipline and instruction of the Lord." - Ephesians 6:4</p>
                  <p className="text-sm text-slate-700">We discipline with patience and love, teaching rather than punishing.</p>
                </div>
                <div className="p-4 bg-white/80 rounded-lg border border-[#16a34a]/20">
                  <p className="text-sm italic text-slate-600 mb-2">"The Lord disciplines those he loves." - Hebrews 12:6</p>
                  <p className="text-sm text-slate-700">Our corrections come from a place of care and concern for each child's well-being.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Character Development */}
        <section className="rounded-[32px] border-2 border-[#0055b8] bg-gradient-to-r from-[#E7F3FF] to-[#F0F4FF] p-8 lg:p-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-slate-950">Character Development</h2>
              <div className="mt-4 mx-auto h-1 w-24 bg-gradient-to-r from-[#0055b8] to-[#FFD966]"></div>
              <p className="mt-4 text-lg text-slate-600">
                We help children develop character rooted in Christian freedom through intentional teaching and modeling of godly virtues.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  virtue: "Love",
                  description: "Caring for others and showing kindness in actions and words.",
                  icon: "❤️"
                },
                {
                  virtue: "Honesty",
                  description: "Speaking truth and living with integrity in all situations.",
                  icon: "✨"
                },
                {
                  virtue: "Respect",
                  description: "Valuing others, authority, and God's creation.",
                  icon: "🤝"
                },
                {
                  virtue: "Responsibility",
                  description: "Being dependable and taking ownership of choices and actions.",
                  icon: "🎯"
                },
                {
                  virtue: "Compassion",
                  description: "Showing empathy and helping those in need.",
                  icon: "🤗"
                },
                {
                  virtue: "Forgiveness",
                  description: "Extending grace and letting go of grudges.",
                  icon: "🌱"
                },
                {
                  virtue: "Gratitude",
                  description: "Being thankful and recognizing God's blessings.",
                  icon: "🙏"
                },
                {
                  virtue: "Courage",
                  description: "Standing for what's right and facing challenges with freedom.",
                  icon: "🦁"
                }
              ].map((virtue) => (
                <div key={virtue.virtue} className="rounded-[28px] border-2 border-[#E0E7FF] bg-white p-6 text-center shadow-[0_4px_20px_rgba(0,61,122,0.08)]">
                  <div className="text-3xl mb-3">{virtue.icon}</div>
                  <h3 className="text-xl font-bold text-slate-950 mb-3">{virtue.virtue}</h3>
                  <p className="text-sm leading-6 text-slate-600">{virtue.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prayer Culture */}
        <section className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl">Prayer Culture</h2>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#16a34a] to-[#FFD966]"></div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border-2 border-[#16a34a] bg-[#ECFDF5] p-8">
              <h3 className="text-2xl font-bold text-slate-950 mb-4">Daily Prayer Life</h3>
              <p className="text-lg leading-8 text-slate-700 mb-6">
                Prayer is woven throughout our school day, helping children develop a natural rhythm of communicating with God. We teach them that prayer is simply talking to their Heavenly Father.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#16a34a] font-bold text-lg mt-1">🌅</span>
                  <span><strong>Morning Prayer:</strong> Starting each day with gratitude and seeking God's guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#16a34a] font-bold text-lg mt-1">🍽️</span>
                  <span><strong>Meal Blessings:</strong> Thanking God for our food and provision</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#16a34a] font-bold text-lg mt-1">🙏</span>
                  <span><strong>Bedtime Prayers:</strong> Ending the day with reflection and trust in God's care</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#16a34a] font-bold text-lg mt-1">🎉</span>
                  <span><strong>Celebration Prayers:</strong> Praising God for achievements and special moments</span>
                </li>
              </ul>
            </div>

            <div className="rounded-[32px] border-2 border-[#FFD966] bg-[#FFFAED] p-8">
              <h3 className="text-2xl font-bold text-slate-950 mb-4">Teaching Children to Pray</h3>
              <p className="text-lg leading-8 text-slate-700 mb-6">
                We help children learn different types of prayer through simple, meaningful experiences that build their confidence in talking to God.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white/80 rounded-lg border border-[#FFD966]/30">
                  <h4 className="font-semibold text-[#F59E0B] mb-2">Praise & Thanksgiving</h4>
                  <p className="text-sm text-slate-600">Teaching children to worship God and express gratitude for His goodness.</p>
                </div>
                <div className="p-4 bg-white/80 rounded-lg border border-[#FFD966]/30">
                  <h4 className="font-semibold text-[#F59E0B] mb-2">Confession & Forgiveness</h4>
                  <p className="text-sm text-slate-600">Helping children understand God's forgiveness and learn to forgive others.</p>
                </div>
                <div className="p-4 bg-white/80 rounded-lg border border-[#FFD966]/30">
                  <h4 className="font-semibold text-[#F59E0B] mb-2">Requests & Intercession</h4>
                  <p className="text-sm text-slate-600">Praying for needs and learning to care about others' concerns.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service and Leadership */}
        <section className="rounded-[32px] border-2 border-[#0055b8] bg-gradient-to-br from-[#003d7a] to-[#0055b8] p-8 lg:p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-5xl mb-4 block">🌍</span>
            <h2 className="text-3xl font-bold text-white mb-4">Service and Leadership</h2>
            <p className="text-lg text-blue-50 mb-8">
              We prepare children to be servant leaders who make a positive impact in their communities and the world, following Jesus' example of loving service.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-left">
              {[
                {
                  title: "Community Service",
                  description: "Regular outreach projects helping neighbors and those in need.",
                  icon: "🤝"
                },
                {
                  title: "Environmental Care",
                  description: "Teaching stewardship of God's creation through conservation efforts.",
                  icon: "🌱"
                },
                {
                  title: "Peer Leadership",
                  description: "Older students mentoring younger ones and leading by example.",
                  icon: "👥"
                },
                {
                  title: "Mission Mindedness",
                  description: "Understanding our role in God's mission to reach the world.",
                  icon: "🌍"
                }
              ].map((service) => (
                <div key={service.title} className="rounded-[28px] bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-sm leading-6 text-blue-50">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-[32px] border-2 border-[#16a34a] bg-gradient-to-r from-[#ECFDF5] to-[#F0F4FF] p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-950 mb-4">
            See how spiritual life supports learning
          </h2>
          <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
            Experience a school where spiritual values and academic excellence work together to shape confident, caring students.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <a href="/admissions" className="inline-flex items-center justify-center bg-[#16a34a] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#15803d] transition">
              🌱 Apply Today
            </a>
            <a href="/contact" className="inline-flex items-center justify-center border-2 border-[#16a34a] bg-transparent text-[#16a34a] px-8 py-4 rounded-full font-semibold hover:bg-[#16a34a] hover:text-white transition">
              📞 Schedule a Visit
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}