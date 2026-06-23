"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MedicalMinistry() {
  // Central active state controller for the medical service matrices
  const [activeTab, setActiveTab] = useState<"services" | "outreach" | "admissions">("services");

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a] flex flex-col">
      {/* Dynamic Operational Alert Ticker */}
      <div className="bg-[#003d7a] text-center px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white z-50">
        🚑 EMERGENCY ALERT: 24/7 Outpatient, Diagnostics &amp; Maternity Services Are Fully Operational
      </div>

      <Navbar />

      <main className="flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-20 sm:space-y-28 w-full">
        {/* ================= HERO INTRODUCTORY HERO NODE ================= */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-800">
              🩺 Healing Hands • Christ-Centered Compassion
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.1]">
              Restoring Wholeness <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055b8] to-[#16a34a]">
                Through Medical Excellence
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              Our Medical Ministry blends professional, clinical care with compassionate Christian discipleship, offering accessible healthcare channels and high-quality medical services to the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => setActiveTab("services")}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#003d7a] px-6 text-xs font-bold text-white hover:bg-blue-800 transition-all shadow-sm"
              >
                Explore Clinical Services
              </button>
              <button 
                onClick={() => setActiveTab("outreach")}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
              >
                View Rural Outreaches
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-[32px] opacity-10 blur-xl"></div>
            <div className="relative border border-slate-100 bg-white p-4 rounded-[32px] shadow-md">
              <img 
                src="https://media.istockphoto.com/id/1458217316/photo/african-doctor-examining-a-young-patient.jpg?s=612x612&w=0&k=20&c=uVd6Zf9k2M42S8PylvFvB_y9wzW1Y69WlE7P8kXo56A=" 
                alt="Compassionate healthcare worker providing clinical assessment with dignity" 
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">Ministry Focus</span>
                <p className="text-xs text-slate-700 font-bold mt-1">Holistic Wellness, Maternity Protection &amp; Medical Camps</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CORE OPERATIONAL ATTRIBUTES SYSTEM ================= */}
        <section className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-[40px] text-white p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:gap-y-8 lg:divide-x divide-slate-800 text-center">
            <div className="pt-4 sm:pt-0">
              <span className="text-3xl font-black text-amber-400 block">24/7 Access</span>
              <p className="text-xs text-slate-300 font-medium mt-1">Uninterrupted emergency triage and inpatient support</p>
            </div>
            <div className="pt-6 sm:pt-0 lg:pl-4">
              <span className="text-3xl font-black text-emerald-400 block">Modern Labs</span>
              <p className="text-xs text-slate-300 font-medium mt-1">Advanced diagnostic imaging and clinical pathology</p>
            </div>
            <div className="pt-6 sm:pt-0 lg:pl-4">
              <span className="text-3xl font-black text-blue-400 block">Faith-Driven</span>
              <p className="text-xs text-slate-300 font-medium mt-1">Chaplaincy care integrated inside patient pathways</p>
            </div>
            <div className="pt-6 sm:pt-0 lg:pl-4">
              <span className="text-3xl font-black text-purple-400 block">Mobile Clinics</span>
              <p className="text-xs text-slate-300 font-medium mt-1">Reaching marginalized off-grid rural settlements</p>
            </div>
          </div>
        </section>

        {/* ================= TABBED INFORMATION PORTAL ENGINE ================= */}
        <section className="bg-white border border-slate-100 rounded-[40px] p-6 sm:p-10 shadow-sm space-y-10">
          
          {/* Tab Navigation Controls Bar */}
          <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
            <button
              onClick={() => setActiveTab("services")}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all focus:outline-none ${
                activeTab === "services" 
                  ? "bg-[#003d7a] text-white shadow-sm" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              🏥 Clinical Departments &amp; Labs
            </button>
            <button
              onClick={() => setActiveTab("outreach")}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all focus:outline-none ${
                activeTab === "outreach" 
                  ? "bg-[#003d7a] text-white shadow-sm" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              🌍 Medical Missions &amp; Camps
            </button>
            <button
              onClick={() => setActiveTab("admissions")}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all focus:outline-none ${
                activeTab === "admissions" 
                  ? "bg-[#003d7a] text-white shadow-sm" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              📋 Patient Admissions &amp; Partnering
            </button>
          </div>

          {/* TAB CONTENT: SERVICES */}
          {activeTab === "services" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-2xl font-black text-slate-950 tracking-tight">Comprehensive Hospital Capabilities</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Our facility delivers essential hospital interventions under strict regulatory standards. We combine exceptional clinical talent with reliable equipment setups to ensure optimal diagnoses.
                </p>
                <div className="p-4 bg-blue-50/50 border border-blue-200/60 rounded-2xl space-y-2">
                  <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">🔬 Modern Diagnostic Frameworks</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Laboratory &amp; Imaging:</strong> High-precision pathology tracking alongside ultra-low-radiation imaging arrays. Get comprehensive analytical workups quickly to fast-track correct treatment pipelines.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FFFDF9] border border-slate-100 p-5 rounded-2xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">24 Hours</span>
                    <span className="text-xs font-bold text-slate-400">Emergency</span>
                  </div>
                  <h4 className="font-bold text-slate-950 text-base">Outpatient &amp; Triage</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Immediate professional intervention for acute trauma, critical infection controls, and standard multi-specialty clinical consultations.
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-600">
                    💉 Focus: Rapid stabilizations &amp; disease tracking
                  </div>
                </div>

                <div className="bg-[#FFFDF9] border border-slate-100 p-5 rounded-2xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">Specialized</span>
                    <span className="text-xs font-bold text-slate-400">Maternal Care</span>
                  </div>
                  <h4 className="font-bold text-slate-950 text-base">Maternity &amp; Neonatal</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Comprehensive antenatal tracking, protective labor rooms, post-natal accommodation, and baby immunization programs within safe environments.
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-600">
                    👶 Focus: Child health and safe deliveries
                  </div>
                </div>

                <div className="bg-[#FFFDF9] border border-slate-100 p-5 rounded-2xl space-y-3 shadow-xs sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-purple-50 text-purple-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">Inpatient</span>
                    <span className="text-xs font-bold text-slate-400">Recovery Units</span>
                  </div>
                  <h4 className="font-bold text-slate-950 text-base">Wards &amp; Extended Pharmaceutical Care</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Well-ventilated recovery wards staffed by sensitive clinical nursing experts. Supported by a fully stocked internal pharmacy engine verifying cross-interaction limits.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: OUTREACH */}
          {activeTab === "outreach" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-2xl font-black text-slate-950 tracking-tight">Mobile Missions to Vulnerable Communities</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Our ministry doesn't stay behind hospital walls. We coordinate regular mobile camps to treat structural pathologies right where people are struggling.
                </p>
                <div>
                  <p className="text-xs text-slate-700 italic border-l-2 border-[#003d7a] pl-3 py-1 font-medium bg-slate-50">
                    "Heal the sick who are there, and say to them, 'The kingdom of God has come near to you.' We address deep systemic physical pain while sharing spiritual peace."
                  </p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  These outreaches distribute critical prescription supplies, run preventive screen checks for chronic diseases, provide dental checkups, and offer basic clean water training.
                </p>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3">
                  <span className="text-xl shrink-0">🏕️</span>
                  <div>
                    <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider">Free Health Camp Outlines</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">Deploying doctors, diagnostic toolsets, and free therapeutic prescriptions into marginalized neighborhoods quarterly.</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3">
                  <span className="text-xl shrink-0">🗣️</span>
                  <div>
                    <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider">Counseling &amp; Pastoral Integration</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">Every clinical intervention is accompanied by trained chaplains offering deep prayer support and holistic grief counseling.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: ADMISSIONS */}
          {activeTab === "admissions" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-2xl font-black text-slate-950 tracking-tight">Admissions Intake &amp; Institutional Support</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">Clear procedures ensuring streamlined onboarding paths for routine elective cases, direct referrals, or clinical aid programs.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 relative">
                  <span className="text-xs font-black text-[#003d7a] block">Step 01</span>
                  <h4 className="font-bold text-slate-950 text-sm mt-1">Triage &amp; Records</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Present government identification tokens, referral write-ups, or insurance verification elements at our central registry counter.
                  </p>
                </div>

                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 relative">
                  <span className="text-xs font-black text-[#003d7a] block">Step 02</span>
                  <h4 className="font-bold text-slate-950 text-sm mt-1">Clinical Assessment</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Undergo immediate preliminary checking by on-duty nursing officers to prioritize treatment placement based on case urgency metrics.
                  </p>
                </div>

                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 relative">
                  <span className="text-xs font-black text-[#003d7a] block">Step 03</span>
                  <h4 className="font-bold text-slate-950 text-sm mt-1">Care &amp; Discharge Plan</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Receive expert treatment pipelines followed by a comprehensive discharge setup covering home prescription schedules and follow-up reviews.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-black text-[#003d7a] uppercase block">Want to partner with our mission?</span>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">We welcome corporate medical sponsorships, specialized equipment donations, and visiting clinical volunteers.</p>
                </div>
                <a href="/medical-partnership.pdf" className="inline-flex h-10 items-center justify-center rounded-xl bg-[#003d7a] px-4 text-xs font-bold text-white hover:bg-blue-800 transition-all shrink-0 shadow-xs">
                  📥 Download Partnership Pack
                </a>
              </div>
            </div>
          )}
        </section>

        {/* ================= EXTRA GENERAL CAMPUS LIFE CAROUSEL ================= */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Inside Our Medical Ministry</h2>
            <p className="text-xs text-slate-500 font-medium">Glance into our sterile procedural zones, active diagnostic labs, and serene counseling areas.</p>
          </div>

          {/* Stacked programmatic imagery components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-xs bg-white p-3">
              <img 
                src="https://media.istockphoto.com/id/1312706413/photo/modern-hospital-laboratory.jpg?s=612x612&w=0&k=20&c=L_v4I_pYm2ZqS3y0uXWwW6vR47Hnpxp6_RzY6U8lS2A=" 
                alt="Modern, clean clinical laboratory setup with analysis tools" 
                className="w-full h-56 object-cover rounded-xl"
              />
              <div className="p-3">
                <h4 className="font-bold text-sm text-slate-950">High-Precision Diagnostic Labs</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Equipped with reliable pathology equipment to handle advanced tracking parameters with speedy turnarounds.</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-xs bg-white p-3">
              <div className="w-full h-56 bg-gradient-to-br from-blue-800 to-cyan-950 rounded-xl flex flex-col items-center justify-center p-6 text-center text-white relative">
                <span className="text-3xl mb-2">🕊️</span>
                <h4 className="font-bold text-sm">Whole-Person Spiritual Restoration</h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed max-w-xs">
                  Physical cures are incomplete without internal peace. We treat every incoming patient as a whole soul worthy of distinct honor, deep attention, and ongoing prayer support.
                </p>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-sm text-slate-950">Dignified, Compassionate Environments</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">A sanctuary for processing recovery under supportive, life-affirming staff care matrices.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CORE CALL TO ACTION MODULE ================= */}
        <section className="bg-amber-50 border border-amber-200/50 rounded-[40px] p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-black text-amber-800 uppercase tracking-widest block">📅 Partner with us to extend healthcare boundaries</span>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">Support or Access Exceptional Healthcare</h3>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Whether you are checking into our clinical facility for dedicated treatment pathways or seeking to fund an upcoming community mobile field outreach, we appreciate your alignment.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button 
              onClick={() => setActiveTab("admissions")}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#003d7a] px-5 text-xs font-bold text-white hover:bg-blue-800 transition-all shadow-xs"
            >
              Review Patient Intake Processes
            </button>
            <a href="mailto:medical@ministryhospital.org" className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all">
              📧 Contact the Medical Ministry Board
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}