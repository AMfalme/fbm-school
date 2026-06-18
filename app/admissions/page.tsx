import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-[#fff7eb] text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-20 px-6 py-6 lg:px-12 lg:py-10">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#003d7a] via-[#0055b8] to-[#004da8] px-6 py-10 shadow-[0_30px_80px_rgba(0,61,122,0.15)] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FCD34D] bg-[#FFD966] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#003d7a]">
              Admissions Open
            </span>
            <h1 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
              Join Our Community
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50 sm:text-xl">
              We're excited to welcome new families to Christian Faith Academy. Discover our programs, requirements, and how to begin your child's educational journey with us.
            </p>
          </div>
        </section>

        {/* Classes Available */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl">Classes Available</h2>
            <div className="mt-4 mx-auto h-1 w-24 bg-gradient-to-r from-[#0055b8] to-[#FFD966]"></div>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              We offer comprehensive early education from Kindergarten through Primary 3, providing a strong foundation for lifelong learning.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                level: "Kindergarten",
                age: "4-5 years",
                description: "Foundation year focusing on social skills, basic literacy, and creative play in a nurturing environment.",
                capacity: "Limited spots"
              },
              {
                level: "Class 1",
                age: "5-6 years",
                description: "Introduction to formal learning with emphasis on reading readiness, numbers, and character development.",
                capacity: "Available"
              },
              {
                level: "Class 2",
                age: "6-7 years",
                description: "Building on foundational skills with increased focus on literacy, numeracy, and biblical studies.",
                capacity: "Available"
              },
              {
                level: "Class 3",
                age: "7-8 years",
                description: "Advanced primary preparation with comprehensive curriculum including science, social studies, and arts.",
                capacity: "Available"
              }
            ].map((classInfo) => (
              <div key={classInfo.level} className="rounded-[28px] border-2 border-[#E0E7FF] bg-gradient-to-br from-white to-[#F9FAFB] p-6 shadow-[0_4px_20px_rgba(0,61,122,0.08)] hover:shadow-[0_12px_35px_rgba(0,61,122,0.15)] transition">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-slate-950">{classInfo.level}</h3>
                  <p className="text-[#0055b8] font-semibold">{classInfo.age}</p>
                </div>
                <p className="text-sm leading-6 text-slate-600 mb-4">{classInfo.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    classInfo.capacity === 'Available' ? 'bg-[#ECFDF5] text-[#16a34a]' :
                    'bg-[#FFF9E6] text-[#F59E0B]'
                  }`}>
                    {classInfo.capacity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Age Requirements & Fees */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[32px] border-2 border-[#0055b8] bg-[#E7F3FF] p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <span className="text-4xl">📅</span>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-950 mb-4">Age Requirements</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
                    <span className="font-medium">Kindergarten</span>
                    <span className="text-[#0055b8]">4 years by September</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
                    <span className="font-medium">Class 1</span>
                    <span className="text-[#0055b8]">5 years by September</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
                    <span className="font-medium">Class 2</span>
                    <span className="text-[#0055b8]">6 years by September</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
                    <span className="font-medium">Class 3</span>
                    <span className="text-[#0055b8]">7 years by September</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  * Children must be toilet trained and able to communicate basic needs.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border-2 border-[#FFD966] bg-[#FFFAED] p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <span className="text-4xl">💰</span>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-950 mb-4">Fee Structure</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/80 rounded-lg">
                    <p className="text-sm text-slate-600 mb-2">For detailed fee information including:</p>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>• Registration fees</li>
                      <li>• Monthly tuition</li>
                      <li>• Activity fees</li>
                      <li>• Payment plans</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <a href="#contact" className="inline-flex items-center justify-center w-full bg-[#0055b8] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#003d7a] transition">
                      Contact for Fee Structure
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Uniform Information */}
        <section className="rounded-[32px] border-2 border-[#16a34a] bg-gradient-to-r from-[#ECFDF5] to-[#F0FDF4] p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">👔</span>
              <h3 className="text-3xl font-bold text-slate-950">School Uniform</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-xl font-semibold text-slate-950 mb-3">Daily Uniform</h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="text-[#16a34a]">✓</span>
                    Navy blue shorts/skirt with school logo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#16a34a]">✓</span>
                    White polo shirt with school emblem
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#16a34a]">✓</span>
                    White socks and black shoes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#16a34a]">✓</span>
                    School tie (for Classes 2-3)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-slate-950 mb-3">PE Uniform</h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="text-[#16a34a]">✓</span>
                    Navy blue tracksuit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#16a34a]">✓</span>
                    White sneakers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#16a34a]">✓</span>
                    School PE shirt
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-white/80 rounded-lg">
                  <p className="text-sm text-slate-600">
                    <strong>Uniform Supplier:</strong> Available at school office or designated suppliers in Kisii.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Term Dates */}
        <section className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl">Academic Calendar 2026</h2>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#0055b8] to-[#FFD966]"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[28px] border-2 border-[#0055b8] bg-[#E7F3FF] p-6">
              <div className="text-center mb-4">
                <span className="text-3xl">📚</span>
                <h3 className="text-xl font-bold text-slate-950 mt-2">Term 1</h3>
              </div>
              <div className="space-y-2 text-sm text-slate-700">
                <p><strong>Start:</strong> January 6, 2026</p>
                <p><strong>End:</strong> March 28, 2026</p>
                <p><strong>Break:</strong> April 1-12, 2026</p>
              </div>
            </div>

            <div className="rounded-[28px] border-2 border-[#16a34a] bg-[#ECFDF5] p-6">
              <div className="text-center mb-4">
                <span className="text-3xl">🌱</span>
                <h3 className="text-xl font-bold text-slate-950 mt-2">Term 2</h3>
              </div>
              <div className="space-y-2 text-sm text-slate-700">
                <p><strong>Start:</strong> April 13, 2026</p>
                <p><strong>End:</strong> June 27, 2026</p>
                <p><strong>Break:</strong> July 1-19, 2026</p>
              </div>
            </div>

            <div className="rounded-[28px] border-2 border-[#FFD966] bg-[#FFFAED] p-6">
              <div className="text-center mb-4">
                <span className="text-3xl">🎓</span>
                <h3 className="text-xl font-bold text-slate-950 mt-2">Term 3</h3>
              </div>
              <div className="space-y-2 text-sm text-slate-700">
                <p><strong>Start:</strong> July 20, 2026</p>
                <p><strong>End:</strong> October 31, 2026</p>
                <p><strong>Break:</strong> November 1-16, 2026</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border-2 border-[#0055b8] bg-gradient-to-r from-[#E7F3FF] to-[#F0F4FF] p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-950 mb-4">Important Dates</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-sm">
                <div className="p-3 bg-white/80 rounded-lg">
                  <p className="font-semibold text-[#0055b8]">Registration Deadline</p>
                  <p className="text-slate-600">December 15, 2025</p>
                </div>
                <div className="p-3 bg-white/80 rounded-lg">
                  <p className="font-semibold text-[#0055b8]">School Opens</p>
                  <p className="text-slate-600">January 6, 2026</p>
                </div>
                <div className="p-3 bg-white/80 rounded-lg">
                  <p className="font-semibold text-[#16a34a]">Mid-Term Break</p>
                  <p className="text-slate-600">Various dates</p>
                </div>
                <div className="p-3 bg-white/80 rounded-lg">
                  <p className="font-semibold text-[#FFD966]">Parent-Teacher Meetings</p>
                  <p className="text-slate-600">Monthly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Downloadable Admission Form */}
        <section className="rounded-[32px] border-2 border-[#FFD966] bg-gradient-to-br from-[#003d7a] to-[#0055b8] p-8 lg:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-5xl mb-4 block">📄</span>
            <h2 className="text-3xl font-bold text-white mb-4">Download Admission Form</h2>
            <p className="text-lg text-blue-50 mb-8">
              Ready to join our community? Download our admission form, fill it out, and submit it along with required documents.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <a
                href="/admission-form.pdf"
                download
                className="inline-flex items-center justify-center bg-[#FFD966] text-[#003d7a] px-8 py-4 rounded-full font-semibold hover:bg-[#FFC933] transition shadow-lg"
              >
                📥 Download Form
              </a>
              <a
                href="https://wa.me/254723456789?text=Hi%20I%27d%20like%20to%20inquire%20about%20admissions%20at%20Freedom%20Baptist%20Mission%20School"
                className="inline-flex items-center justify-center border-2 border-[#FFD966] bg-transparent text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* Required Documents */}
        <section className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-950 sm:text-5xl">Required Documents</h2>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#0055b8] to-[#FFD966]"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[28px] border-2 border-[#E0E7FF] bg-gradient-to-br from-white to-[#F9FAFB] p-6">
              <h3 className="text-xl font-bold text-slate-950 mb-4">Student Documents</h3>
              <ul className="space-y-3">
                {[
                  "Birth certificate copy",
                  "Medical records/immunization certificate",
                  "Recent passport-sized photos (2)",
                  "Previous school reports (if applicable)"
                ].map((doc) => (
                  <li key={doc} className="flex items-center gap-3">
                    <span className="text-[#16a34a] text-lg">✓</span>
                    <span className="text-slate-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border-2 border-[#E0E7FF] bg-gradient-to-br from-white to-[#F9FAFB] p-6">
              <h3 className="text-xl font-bold text-slate-950 mb-4">Parent/Guardian Documents</h3>
              <ul className="space-y-3">
                {[
                  "ID/Passport copies of both parents",
                  "Proof of residence",
                  "Emergency contact information",
                  "Parent consent forms"
                ].map((doc) => (
                  <li key={doc} className="flex items-center gap-3">
                    <span className="text-[#16a34a] text-lg">✓</span>
                    <span className="text-slate-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="rounded-[32px] border-2 border-[#16a34a] bg-gradient-to-r from-[#ECFDF5] to-[#F0FDF4] p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-slate-950">Application Process</h2>
              <div className="mt-4 mx-auto h-1 w-24 bg-gradient-to-r from-[#16a34a] to-[#0055b8]"></div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Download Form",
                  description: "Get our admission form from this page"
                },
                {
                  step: "2",
                  title: "Fill & Submit",
                  description: "Complete the form and gather required documents"
                },
                {
                  step: "3",
                  title: "Assessment",
                  description: "Schedule an assessment and school visit"
                },
                {
                  step: "4",
                  title: "Welcome!",
                  description: "Receive admission confirmation and join our family"
                }
              ].map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-16 h-16 bg-[#16a34a] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="rounded-[32px] border-2 border-[#FFD966] bg-gradient-to-br from-[#003d7a] to-[#0055b8] p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Questions About Admissions?
          </h2>
          <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
            Our admissions team is here to help you through every step of the process. Contact us today to learn more about joining Christian Faith Academy.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <a href="mailto:admissions@fbm-school.org" className="inline-flex items-center justify-center bg-[#FFD966] text-[#003d7a] px-8 py-4 rounded-full font-semibold hover:bg-[#FFC933] transition">
              📧 Email Admissions
            </a>
            <a href="https://wa.me/254723456789?text=Hi%20I%27d%20like%20to%20learn%20more%20about%20admissions" className="inline-flex items-center justify-center border-2 border-[#FFD966] bg-transparent text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition">
              💬 WhatsApp Chat
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}