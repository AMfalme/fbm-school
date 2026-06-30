"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNotification } from "../components/Notification";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showNotification, NotificationComponent } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
        showNotification("Message sent successfully! We'll get back to you within 24-48 hours.", "success");
      } else {
        const errorMsg = data.error || "Failed to submit form. Please try again.";
        showNotification(errorMsg, "error");
        console.error("Contact form error:", errorMsg);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showNotification("Failed to submit form. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#fff7eb] text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-20 px-6 py-6 lg:px-12 lg:py-10">
        <Navbar />
        {NotificationComponent}

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

        {submitted ? (
          <section className="rounded-[32px] border-2 border-[#16a34a] bg-[#ECFDF5] p-8 lg:p-12">
            <div className="text-center space-y-4">
              <span className="text-6xl block">✅</span>
              <h2 className="text-4xl font-bold text-slate-950">Message Sent Successfully!</h2>
              <p className="text-lg text-slate-700">
                Thank you for reaching out. We will get back to you within 24-48 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-[#0055b8] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#003d7a]"
              >
                Send Another Message
              </button>
            </div>
          </section>
        ) : (
          <section className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6 rounded-[32px] border-2 border-[#0055b8] bg-[#E7F3FF] p-8 lg:p-12">
              <h2 className="text-4xl font-bold text-slate-950">Get in touch</h2>
              <p className="text-lg leading-8 text-slate-700">
                Our school office is ready to help you learn more about admissions, school life, and the support available for families.
              </p>
              <div className="space-y-4 text-slate-700">
                <div>
                  <p className="font-semibold text-[#0055b8]">📞 Phone</p>
                  <p>+254 (701) 940 540</p>
                </div>
                <div>
                  <p className="font-semibold text-[#0055b8]">📧 Email</p>
                  <p>kenyafbmission@gmail.com</p>
                </div>
                <div>
                  <p className="font-semibold text-[#0055b8]">📍 Location</p>
                  <p>Kisii, Kenya | P.O Box 4183-40200</p>
                </div>
              </div>
              <a href="mailto:kenyafbmission@gmail.com" className="inline-flex items-center justify-center rounded-full bg-[#0055b8] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#003d7a]">
                Email Admissions
              </a>
            </div>

            <div className="rounded-[32px] border-2 border-[#16a34a] bg-white p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-stone-400">Contact Form</span>
                  <h2 className="text-4xl font-bold text-slate-950">Send us a message</h2>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254 700 000 000"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-slate-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-slate-700">Message *</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-to-r from-[#0055b8] to-[#3b82f6] px-6 py-3.5 text-sm font-bold text-white transition hover:shadow-lg hover:from-[#003d7a] hover:to-[#0055b8] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </section>
        )}

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