"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MinistryGallery from "../../components/MinistryGallery";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function ChristianFaithAcademy() {
  // Update page title
  useEffect(() => {
    document.title = "FBM - Christian Faith Academy";
  }, []);

  const [activeTab, setActiveTab] = useState("pre-primary");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    grade: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  const academyImages = [
    { src: "/school/highlight.png", alt: "Safe and nurturing school environment" },
    { src: "/school/classroom.png", alt: "Students in active classroom learning" },
    { src: "/school/hi.png", alt: "Students playing and socializing outdoors" },
  ];

  const tabs = [
    { id: "pre-primary", label: "Pre-Primary", grades: "Ages 4-6" },
    { id: "lower-primary", label: "Lower Primary", grades: "Grades 1-3" },
    { id: "upper-primary", label: "Upper Primary", grades: "Grades 4-6" },
    { id: "junior-secondary", label: "Junior Secondary", grades: "Grades 7-9" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === academyImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? academyImages.length - 1 : prev - 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: "", message: "" });

    try {
      await addDoc(collection(db, "academy-applications"), {
        ...formData,
        submittedAt: Timestamp.now(),
        status: "new"
      });
      setFormStatus({ type: "success", message: "Application submitted successfully! We will contact you soon." });
      setFormData({ studentName: "", parentName: "", email: "", phone: "", grade: "", message: "" });
    } catch (error) {
      setFormStatus({ type: "error", message: "Failed to submit application. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a] flex flex-col antialiased">
      <Navbar />

      {/* Hero Section */}
      <header className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Image */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-[32px] opacity-20 blur-lg" />
              <div className="relative border border-slate-100 bg-white p-3 rounded-[32px] shadow-md">
                <img
                  src="/school/classroom.png"
                  alt="Christian Faith Academy students learning"
                  className="w-full h-auto object-cover rounded-2xl"
                />
                <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Our Academy</span>
                  <p className="text-xs text-slate-700 font-semibold mt-1">Where Biblical Truth Meets Academic Excellence</p>
                </div>
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/10 uppercase tracking-wider">
                📖 Nurturing Mind & Spirit • Early Years Foundation
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-none">
                Christian <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055b8] to-[#16a34a]">
                  Faith Academy
                </span>
              </h1>
              <p className="text-xl font-semibold text-slate-700 mt-4">
                Excellence • Character • Faith
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
                Christian Faith Academy delivers an enriched Competency Based Curriculum (CBC) designed to foster deep personal discovery, rigorous foundational literacy, and an unwavering love for Christ.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <button
                  onClick={() => setActiveTab("admissions")}
                  className="rounded-xl bg-[#003d7a] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-800 transition-all"
                >
                  Begin Application Process
                </button>
                <button
                  onClick={() => setActiveTab("philosophy")}
                  className="rounded-xl bg-white border border-slate-200 px-5 py-3 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-all"
                >
                  Explore Freedom-Based Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Academy Highlights */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0055b8] block mb-2">Academy Overview</span>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">Why Choose Christian Faith Academy</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📚", value: "CBC Compliant", desc: "Fully integrated competency-based pathways" },
              { icon: "🎓", value: "PP1 to Grade 9", desc: "Complete early-years to junior school track" },
              { icon: "✝️", value: "Christ-Centered", desc: "Scripture woven into every subject" },
              { icon: "🏠", value: "Nurturing Community", desc: "Safe environment for character formation" }
            ].map((stat, idx) => (
              <div key={idx} className="group relative bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start gap-4">
                  <span className="text-2xl shrink-0">{stat.icon}</span>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 leading-tight">{stat.value}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{stat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Image Slider */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0055b8]">About Our Academy</span>
              <h2 className="text-4xl font-black text-slate-950 tracking-tight">
                Where Biblical Truth Shapes Young Minds
              </h2>
              <p className="leading-8 text-slate-600">
                Christian Faith Academy is the official institutional childhood educational asset of Freedom Baptist Mission. We actively train students from Kindergarten through Junior School, recognizing that early childhood conditioning dictates subsequent generational culture.
              </p>
              <p className="leading-8 text-slate-600">
                While strictly adhering to and exceeding standard national academic guidelines, our curriculum seamlessly implements a thorough biblical worldview into all modules—ensuring literacy, logic, and numbering readiness are grounded beautifully in uncompromised truth.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="glass-card rounded-xl p-4 bg-white border border-slate-200">
                  <div className="text-2xl font-black text-[#0055b8]">CBC</div>
                  <div className="text-xs text-slate-600 mt-1">Curriculum Aligned</div>
                </div>
                <div className="glass-card rounded-xl p-4 bg-white border border-slate-200">
                  <div className="text-2xl font-black text-[#16a34a]">PP1-G9</div>
                  <div className="text-xs text-slate-600 mt-1">Complete Pathway</div>
                </div>
              </div>
            </div>

            {/* Right: Image Slider */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                {academyImages.map((image, idx) => (
                  <div
                    key={idx}
                    className={`transition-opacity duration-500 ${idx === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                ))}
              </div>
              {/* Slider Controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                  aria-label="Previous slide"
                >
                  ←
                </button>
                <div className="flex gap-2">
                  {academyImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-[#0055b8]' : 'w-2 bg-slate-300'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                  aria-label="Next slide"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0055b8] block mb-2">Our Difference</span>
            <h2 className="text-4xl font-black text-slate-950 tracking-tight">Why Choose Christian Faith Academy</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">We combine academic excellence with biblical truth to nurture well-rounded individuals prepared for lifelong learning and service.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Academic Excellence",
                desc: "Rigorous CBC curriculum delivered by qualified educators who inspire curiosity and critical thinking."
              },
              {
                icon: "✝️",
                title: "Christian Values",
                desc: "Biblical worldview integrated across all subjects, fostering strong moral character and spiritual growth."
              },
              {
                icon: "👨‍🏫",
                title: "Qualified Teachers",
                desc: "Experienced Christian educators committed to nurturing each child's unique God-given potential."
              },
              {
                icon: "🌱",
                title: "Holistic Development",
                desc: "Balanced focus on academic, spiritual, physical, and social development for every learner."
              },
              {
                icon: "🛡️",
                title: "Safe Environment",
                desc: "Secure, supportive campus where children feel valued, protected, and free to explore."
              },
              {
                icon: "🤝",
                title: "Community Impact",
                desc: "Partnership with families to raise children who positively impact their communities."
              }
            ].map((item, idx) => (
              <div key={idx} className="group relative bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#0055b8]/5 to-transparent rounded-bl-full" />
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academics */}
      <section id="academics" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0055b8] block mb-2">Academic Programs</span>
            <h2 className="text-4xl font-black text-slate-950 tracking-tight">Our Curriculum Structure</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">A comprehensive 2-6-3-3 education system from Pre-Primary through Junior Secondary, aligned with Kenya's Competency Based Curriculum.</p>
          </div>

          {/* Level Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-6 py-3 font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#0055b8] text-white shadow-md scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <div className="text-sm">{tab.label}</div>
                <div className={`text-xs mt-0.5 ${activeTab === tab.id ? 'text-blue-100' : 'text-slate-500'}`}>{tab.grades}</div>
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
            {activeTab === "pre-primary" && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🌱</span>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Pre-Primary (PP1 & PP2)</h3>
                    <p className="text-slate-600 leading-relaxed">Building foundations for lifelong learning through play-based exploration, social development, and early literacy exposure.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">🎮 Play-Based Learning</h4>
                    <p className="text-sm text-slate-600">Structured play activities that develop motor skills, creativity, and social interaction.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">📖 Early Literacy</h4>
                    <p className="text-sm text-slate-600">Introduction to phonics, storytelling, and foundational reading skills through interactive methods.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">🔢 Numeracy Basics</h4>
                    <p className="text-sm text-slate-600">Hands-on number recognition, counting, and basic mathematical concepts.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">✝️ Spiritual Foundation</h4>
                    <p className="text-sm text-slate-600">Bible stories, memory verses, and character-building lessons integrated daily.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "lower-primary" && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📚</span>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Lower Primary (Grades 1-3)</h3>
                    <p className="text-slate-600 leading-relaxed">Solidifying foundational literacy, core numeracy, and environmental exploration through engaging, Christ-centered instruction.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">📝 Reading & Writing</h4>
                    <p className="text-sm text-slate-600">Transition from emergent reading to confident text engagement with comprehensive literacy programs.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">🔢 Mathematics</h4>
                    <p className="text-sm text-slate-600">Building numerical fluency through concrete-pictorial-abstract approaches.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">🔬 Science & Environment</h4>
                    <p className="text-sm text-slate-600">Exploring God's creation through hands-on experiments and environmental studies.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">🌍 Social Studies</h4>
                    <p className="text-sm text-slate-600">Understanding community, culture, and geography from a biblical perspective.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "upper-primary" && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🎓</span>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Upper Primary (Grades 4-6)</h3>
                    <p className="text-slate-600 leading-relaxed">Deepening textual mastery, exploring abstract concepts, and developing critical thinking through collaborative learning.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">📖 Advanced Literacy</h4>
                    <p className="text-sm text-slate-600">Comprehension, composition, and critical analysis of diverse text types.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">🧮 Problem Solving</h4>
                    <p className="text-sm text-slate-600">Advanced numeracy, fractions, geometry, and practical applications.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">🔬 Scientific Inquiry</h4>
                    <p className="text-sm text-slate-600">Hands-on experiments, scientific method, and understanding natural phenomena.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">💡 Project-Based Learning</h4>
                    <p className="text-sm text-slate-600">Collaborative projects developing research, presentation, and teamwork skills.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "junior-secondary" && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🌟</span>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Junior Secondary (Grades 7-9)</h3>
                    <p className="text-slate-600 leading-relaxed">Identifying talents, exploring career pathways, and preparing for secondary education with advanced biblical discipleship.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">🎯 Talent Development</h4>
                    <p className="text-sm text-slate-600">Identifying and nurturing individual strengths and career interests.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">📘 Subject Specialization</h4>
                    <p className="text-sm text-slate-600">In-depth study in Sciences, Arts, and Technical subjects.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">💼 Career Exploration</h4>
                    <p className="text-sm text-slate-600">Guidance on subject selection and future career pathways.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">✝️ Leadership Training</h4>
                    <p className="text-sm text-slate-600">Advanced biblical discipleship preparing students to be Christian leaders.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0055b8]">Our Philosophy</span>
              <h2 className="text-4xl font-black text-slate-950 tracking-tight">Christian Freedom-Based Learning</h2>
              <p className="leading-8 text-slate-600">
                True education avoids rigid, production-line factory schooling. We combine fixed biblical standards with structural individual agency, fostering internal self-governance and genuine character formation.
              </p>
              <blockquote className="border-l-4 border-[#0055b8] bg-slate-50 p-6 rounded-r-xl text-slate-700 italic">
                "Where the Spirit of the Lord is, there is liberty. We apply this principle to learning by guiding children to explore creation without fear of failure."
              </blockquote>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">🛡️ Internal Discipline</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Students are taught actions motivated by a clear love for God, replacing punitive performance anxiety with genuine character formation.</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">🎨 Independent Inquiry</h3>
                <p className="text-sm text-slate-600 leading-relaxed">We grant children safe spaces to ask deep questions, engage with object lessons, and investigate concepts first-hand.</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">📖 Biblical Integration</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Every subject is taught through the lens of Scripture, connecting academic learning with spiritual truth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section id="activities" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0055b8] block mb-2">Beyond the Classroom</span>
            <h2 className="text-4xl font-black text-slate-950 tracking-tight">School Life & Activities</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: "⚽", name: "Football" },
              { icon: "🎵", name: "Music" },
              { icon: "🎭", name: "Drama" },
              { icon: "📚", name: "Bible Club" },
              { icon: "🏕️", name: "Scouts" },
              { icon: "🎤", name: "Debate" },
              { icon: "🎨", name: "Art & Craft" },
              { icon: "👑", name: "Leadership" }
            ].map((activity) => (
              <div key={activity.name} className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-2">{activity.icon}</span>
                <h3 className="font-semibold text-slate-900 text-sm">{activity.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions with Form */}
      <section id="admissions" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0055b8] block mb-2">Join Our Community</span>
            <h2 className="text-4xl font-black text-slate-950 tracking-tight">Admissions & Enrollment</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Begin your child's journey with us. Submit an application and our admissions team will contact you within 48 hours.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Process Steps */}
            <div className="space-y-6">
              {[
                { step: "1", title: "Submit Application", desc: "Complete the enrollment form with accurate information about your child and family." },
                { step: "2", title: "Document Review", desc: "Provide birth certificate, immunization records, and previous academic reports." },
                { step: "3", title: "Assessment", desc: "A pressure-free evaluation to verify readiness and determine proper grade placement." },
                { step: "4", title: "Confirmation", desc: "Receive enrollment confirmation and begin your journey with Christian Faith Academy." }
              ].map((step) => (
                <div key={step.step} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0055b8] text-white flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Application Form */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Apply Now</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Student Name *</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-[#0055b8] focus:ring-2 focus:ring-[#0055b8]/20 outline-none"
                    placeholder="Enter student's full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Parent/Guardian Name *</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-[#0055b8] focus:ring-2 focus:ring-[#0055b8]/20 outline-none"
                    placeholder="Enter parent's full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-[#0055b8] focus:ring-2 focus:ring-[#0055b8]/20 outline-none"
                    placeholder="parent@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-[#0055b8] focus:ring-2 focus:ring-[#0055b8]/20 outline-none"
                    placeholder="+254 700 000 000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Grade Applying For *</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-[#0055b8] focus:ring-2 focus:ring-[#0055b8]/20 outline-none"
                  >
                    <option value="">Select grade level</option>
                    <option value="PP1">PP1 - Pre-Primary 1</option>
                    <option value="PP2">PP2 - Pre-Primary 2</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Additional Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-[#0055b8] focus:ring-2 focus:ring-[#0055b8]/20 outline-none resize-none"
                    placeholder="Any additional information..."
                  />
                </div>

                {formStatus.message && (
                  <div className={`rounded-lg p-4 text-sm ${formStatus.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    {formStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#0055b8] px-6 py-3 text-sm font-bold text-white hover:bg-[#003d7a] transition-colors shadow-md"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#0055b8] to-[#003d7a] py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-black mb-6">Ready to Join Christian Faith Academy?</h2>
          <p className="text-lg text-blue-100 mb-10">
            Give your child a strong foundation for lifelong learning, leadership, and character development grounded in biblical truth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#admissions" className="rounded-lg bg-white px-6 py-3 font-semibold text-[#0055b8] hover:bg-slate-100 transition-colors">
              Enroll Today
            </a>
            <a href="#contact" className="rounded-lg border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition-colors">
              Contact Admissions
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0055b8] block mb-2">Get in Touch</span>
            <h2 className="text-4xl font-black text-slate-950 tracking-tight">Contact Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
              <p className="text-sm text-slate-600">+254 (701) 940 540</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
              <div className="text-3xl mb-3">✉️</div>
              <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
              <p className="text-sm text-slate-600">kenyafbmission@gmail.com</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-semibold text-slate-900 mb-1">Location</h3>
              <p className="text-sm text-slate-600">Kisii, Kenya<br />P.O Box 4183-40200</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <MinistryGallery
        categories={["classroom"]}
        title="Christian Faith Academy Gallery"
        subtitle="See our students excellence in academics, character development, and biblical upbringing."
        ministrySlug="christian-faith-academy"
      />

      <Footer />
    </div>
  );
}
