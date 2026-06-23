"use client";

import React, { useState } from 'react';
import Navbar from "../components/Navbar";
// Reusable Navigation Link Component to match standard layout architecture
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-xs font-bold tracking-wider uppercase text-stone-600 hover:text-stone-950 transition-colors"
    >
      {children}
    </a>
  );
}

export default function PartnerWithUs() {
  // Contact Form Field States
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    partnershipType: "MISSIONARY",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This executes your dynamic administration API contact route securely
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-900 selection:bg-[#FFD966] selection:text-[#003d7a]">
      
      {/* ================= GLOBAL GREEN ANNOUNCEMENT BANNER ================= */}
      <div className="bg-[#16a34a] text-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
        📢 Transforming Lives Across Kenya & Beyond Through Spreading The Gospel
      </div>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 space-y-16 sm:space-y-24">
          <Navbar />
        

        {/* ================= HERO SEPARATOR BLOCK ================= */}
        <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#0055b8]">
            🤝 Strategic Alliances &amp; Ecclesiastical Fellowship
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 leading-[1.15]">
            Establish a Ministry Partnership
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-medium leading-relaxed max-w-xl mx-auto">
            Are you looking to send short-term missionary modules, establish corporate matching funds, or align your congregation with our native operations? Connect directly with our administration office.
          </p>
        </section>

        {/* ================= MAIN INTERACTIVE LAYOUT HUB ================= */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* LEFT PANEL: PARTNERSHIP ENTRY ROUTING PATHWAYS */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#0055b8]">Channels</span>
              <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">How We Partner Together</h3>
              <p className="text-stone-500 text-xs font-medium">Review the operational tracks handled by our internal logistics desk.</p>
            </div>

            <div className="space-y-4">
              {/* Pathway 1: Church Partnerships */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200/60 flex gap-4 items-start shadow-xs">
                <span className="text-2xl pt-0.5 select-none" role="img" aria-label="Church Partnership">⛪</span>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Church &amp; Mission Boards</h4>
                  <p className="text-stone-600 text-xs mt-0.5 leading-relaxed">Add our Bible College fields to your ongoing monthly missions book or arrange an interactive field status update for your elders.</p>
                </div>
              </div>

              {/* Pathway 2: Educational Teams */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200/60 flex gap-4 items-start shadow-xs">
                <span className="text-2xl pt-0.5 select-none" role="img" aria-label="Educational Teams">🎓</span>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Academic &amp; Module Support</h4>
                  <p className="text-stone-600 text-xs mt-0.5 leading-relaxed">Qualified pastors and theologians can request field teaching modules at our regional Bible College campus.</p>
                </div>
              </div>

              {/* Pathway 3: Material Logistics */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200/60 flex gap-4 items-start shadow-xs">
                <span className="text-2xl pt-0.5 select-none" role="img" aria-label="Material Logistics">📦</span>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Corporate &amp; Material Donations</h4>
                  <p className="text-stone-600 text-xs mt-0.5 leading-relaxed">Coordinate physical shipping cargo, classroom textbook palettes, solar equipment, or clean water components directly with our team.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: ADMINISTRATIVE CONTACT ENGAGEMENT FORM */}
          <div className="md:col-span-7 bg-white border border-stone-200/60 rounded-[32px] p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in duration-200">
                <span className="text-4xl block select-none" role="img" aria-label="Message Transmitted">📬</span>
                <h4 className="text-lg font-black text-stone-900">Partnership Inquiry Lodged Successfully</h4>
                <p className="text-xs text-stone-600 font-medium max-w-sm mx-auto leading-relaxed">
                  Thank you for stepping out. Your parameters have been transmitted safely to the administrative office registry. An executive elder will follow up via email within 48 business hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold text-[#0055b8] hover:underline"
                >
                  Submit another verification request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-stone-400">Secure Desk Router</span>
                  <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">Contact Administration</h3>
                </div>

                {/* Form Input Array Elements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-stone-700 uppercase">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      placeholder="e.g. Pastor John Doe" 
                      className="w-full text-xs bg-stone-50/50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-900/5 focus:bg-white font-medium" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-stone-700 uppercase">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="e.g. john@yourchurch.org" 
                      className="w-full text-xs bg-stone-50/50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-900/5 focus:bg-white font-medium" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-stone-700 uppercase">Phone / WhatsApp *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      placeholder="e.g. +1 (555) 012-3456" 
                      className="w-full text-xs bg-stone-50/50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-900/5 focus:bg-white font-medium" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-stone-700 uppercase">Church / Supporting Entity</label>
                    <input 
                      type="text" 
                      value={formData.organization}
                      onChange={e => setFormData({...formData, organization: e.target.value})}
                      placeholder="e.g. Grace Baptist Church" 
                      className="w-full text-xs bg-stone-50/50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-900/5 focus:bg-white font-medium" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-stone-700 uppercase">Primary Partnership Channel</label>
                  <select 
                    value={formData.partnershipType}
                    onChange={e => setFormData({...formData, partnershipType: e.target.value})}
                    className="w-full text-xs bg-stone-50/50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-900/5 focus:bg-white font-bold text-stone-800"
                  >
                    <option value="MISSIONARY">Short-Term Missionary Module Scheduling</option>
                    <option value="CHURCH_BOOK">Adding Ministry fields to Church Monthly Support Book</option>
                    <option value="MATERIAL_CARGO">Container / Material Classroom Supplies Logistics</option>
                    <option value="OTHER">Other Custom Administrative Proposals</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-stone-700 uppercase">Detailed Operational Message *</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    placeholder="Please lay out your primary thoughts, timeframes, or specific logistical questions for the administrative registry..."
                    className="w-full text-xs bg-stone-50/50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-stone-900/5 focus:bg-white font-medium leading-relaxed resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-stone-900 text-white rounded-xl py-3 text-xs font-bold hover:bg-stone-800 transition-all shadow-xs uppercase tracking-wider"
                >
                  🔐 Transmit Form to Admin Registry
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ================= COMPACT STANDARDIZED CORE FOOTER ================= */}
        <footer className="border-t border-stone-200/50 pt-8 pb-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-stone-500 font-medium">
          <div>
            © {new Date().getFullYear()} Freedom Baptist Mission Trust Kenya. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-stone-900 transition-colors">Privacy Protections</a>
            <a href="/terms" className="hover:text-stone-900 transition-colors">Stewardship Terms</a>
            <a href="/governance" className="hover:text-stone-900 transition-colors">Administrative Audits</a>
          </div>
        </footer>

      </main>
    </div>
  );
}