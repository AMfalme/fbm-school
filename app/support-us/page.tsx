"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DonationHub from "../components/DonationHub";

export default function SupportUs() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#FFD966] selection:text-[#003d7a]">
      {/* Shared Global Green Announcement Banner Element */}
      <div className="bg-[#16a34a] text-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
        📢 Transforming Lives Across Kenya & Beyond Through Sound Biblical Ministry
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-24 sm:space-y-32">
        <Navbar />

        <DonationHub />
      </main>

      <Footer />
    </div>
  );
}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.1]">
            Partner with Us <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055b8] to-[#16a34a]">
              In the Harvest Fields
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Your financial stewardship directly provisions native church plants, fuels robust theological modules, and secures foundational Christian schooling.
          </p>
        </section>

        {/* ================= GLOBAL CURRENCY SELECTOR CONTROLLER ================= */}
        <section className="flex justify-center items-center gap-4 max-w-md mx-auto bg-slate-50 p-2 rounded-2xl border border-slate-200/50 shadow-inner">
          <span className="text-xs font-black uppercase text-slate-500 pl-2">Preferred Currency:</span>
          <div className="grid grid-cols-2 gap-1 w-full max-w-[200px]">
            <button
              onClick={() => handleCurrencyChange("USD")}
              className={`py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                currency === "USD" ? "bg-[#003d7a] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              💵 USD ($)
            </button>
            <button
              onClick={() => handleCurrencyChange("KES")}
              className={`py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                currency === "KES" ? "bg-[#003d7a] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🇰🇪 KES (Sh)
            </button>
          </div>
        </section>

        {/* ================= MAIN INTERACTIVE CHECKOUT GRID HUB ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE: DETAILED IMPACT & SPONSORSHIP TARGET CARDS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#0055b8]">Step 1 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Select giving Pillar</h2>
              <p className="text-slate-500 text-xs font-medium">Click on a ministry focus area to dynamically load its specific support frameworks.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {impactPillars.map((pillar) => {
                const isActive = selectedPillar === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => handlePillarSelection(pillar)}
                    className={`w-full text-left p-6 rounded-[32px] border-2 transition-all flex gap-5 items-start focus:outline-none ${
                      isActive 
                        ? "border-[#16a34a] bg-emerald-50/20 shadow-md shadow-emerald-900/5" 
                        : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                  >
                    <div className={`text-2xl p-4 rounded-2xl shrink-0 ${
                      isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-50 text-slate-700"
                    }`}>
                      {pillar.icon}
                    </div>
                    <div className="space-y-1.5 w-full">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-black text-slate-950 text-base">{pillar.title}</h4>
                        {pillar.id !== "PRAYER" && (
                          <span className="text-xs font-black tracking-tight text-slate-900 bg-slate-100 px-3 py-1 rounded-md">
                            Baseline: {currency === "USD" ? `$${pillar.baseAmountUSD}` : `KES ${pillar.baseAmountKES.toLocaleString()}`}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{pillar.description}</p>
                      {isActive && (
                        <p className="text-xs text-emerald-800 bg-emerald-100/40 p-3 rounded-xl border border-emerald-200/30 animate-in fade-in slide-in-from-top-2 duration-150">
                          🎯 <strong>Direct Outcome:</strong> {pillar.extendedImpact}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: API PAYMENT MODALITY CONNECTOR CONSOLE */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-[40px] p-6 sm:p-10 shadow-sm space-y-8">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Step 2 &amp; 3</span>
              <h3 className="text-2xl font-black text-slate-950 tracking-tight">Amount &amp; API Gateways</h3>
            </div>

            {/* Custom Support Allocation Fields */}
            {selectedPillar !== "PRAYER" ? (
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">Enter Partnership Gift Level</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    {currency === "USD" ? "USD ($)" : "KES (Sh)"}:
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-20 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0055b8]/10 font-black text-slate-950"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl text-center text-xs font-semibold text-emerald-800">
                🙏 Financial constraints are cleared. Your spiritual partnership is highly recognized across our regional church planting lines.
              </div>
            )}

            {/* API Endpoints Selector Switch Tabs */}
            {selectedPillar !== "PRAYER" && (
              <div className="space-y-5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">Select Processing Gateway</label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200/40">
                  <button
                    onClick={() => setPaymentMethod("MPESA")}
                    className={`py-2.5 px-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all text-center ${
                      paymentMethod === "MPESA" ? "bg-white text-emerald-700 shadow-xs border border-slate-100" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    🟢 M-Pesa SDK
                  </button>
                  <button
                    onClick={() => setPaymentMethod("BANK")}
                    className={`py-2.5 px-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all text-center ${
                      paymentMethod === "BANK" ? "bg-white text-[#0055b8] shadow-xs border border-slate-100" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    🏦 Bank Wire
                  </button>
                  <button
                    onClick={() => setPaymentMethod("PAYPAL")}
                    className={`py-2.5 px-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all text-center ${
                      paymentMethod === "PAYPAL" ? "bg-white text-blue-600 shadow-xs border border-slate-100" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    🌐 PayPal Node
                  </button>
                </div>

                {/* DYNAMIC API PANEL BOX RENDERING */}
                <div className="p-5 bg-[#FFFDF9] border border-slate-100 rounded-2xl animate-in fade-in duration-150">
                  
                  {/* API Gateway 1: M-Pesa Express STK Push */}
                  {paymentMethod === "MPESA" && (
                    <div className="space-y-4">
                      <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                        Triggers a secure, instant STK Push verification pin prompt directly to your phone via Safaricom's centralized Daraja API infrastructure.
                      </p>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-black uppercase text-slate-700">Safaricom Telephone Number</label>
                        <input type="tel" placeholder="e.g. 0712345678" className="w-full text-xs bg-white border border-slate-200 rounded-lg p-3 focus:outline-[#16a34a]" />
                      </div>
                      <button type="button" className="w-full h-11 rounded-xl bg-[#16a34a] text-white text-xs font-black uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-md shadow-emerald-900/10">
                        ⚡ Execute M-Pesa STK Push
                      </button>
                    </div>
                  )}

                  {/* API Gateway 2: Direct Banking Wire Profile */}
                  {paymentMethod === "BANK" && (
                    <div className="space-y-3 text-xs">
                      <p className="text-[11px] font-medium text-slate-500 leading-relaxed border-b border-slate-100 pb-2">
                        Transfer funds cleanly via domestic RTGS, electronic wire transfers, or international Swift routing numbers directly into our audited treasury:
                      </p>
                      <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100/50 text-[11px]">
                        <span className="text-slate-400 font-bold uppercase">Bank Title</span>
                        <span className="col-span-2 font-bold text-slate-900">Kenya Commercial Bank (KCB)</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100/50 text-[11px]">
                        <span className="text-slate-400 font-bold uppercase">Branch Base</span>
                        <span className="col-span-2 font-bold text-slate-900">Kisii Main Branch (011)</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100/50 text-[11px]">
                        <span className="text-slate-400 font-bold uppercase">Account Name</span>
                        <span className="col-span-2 font-bold text-slate-900">Freedom Baptist Mission Trust</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 py-1 text-[11px]">
                        <span className="text-slate-400 font-bold uppercase">Account No</span>
                        <span className="col-span-2 font-mono font-black text-[#0055b8]">1234567890</span>
                      </div>
                    </div>
                  )}

                  {/* API Gateway 3: PayPal Express Token Integration */}
                  {paymentMethod === "PAYPAL" && (
                    <div className="space-y-4">
                      <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                        Best choice for global partners, non-Kenyan congregations, and independent supporting Baptist associations. Launches an end-to-end tokenized connection.
                      </p>
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-center font-bold text-[11px] text-[#0055b8]">
                        🔒 Secure Currency Processing Line Active
                      </div>
                      <button type="button" className="w-full h-11 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-wider hover:bg-blue-700 transition-all flex items-center justify-center">
                        🌐 Route to Secure PayPal Portal
                      </button>
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================= STEWARDSHIP GUARANTEES & ADMINISTRATIVE LAW ================= */}
        <section className="bg-white border border-slate-100 rounded-[40px] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#16a34a]">Mission Governance</span>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">Our Financial Stewardship Guarantees</h2>
            <p className="text-slate-600 font-medium text-xs">We strictly minimize overhead costs. Every resource is mapped transparently to field-level project deployment tracks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">100% Direct Allocation Policy</h4>
              <p className="text-xs text-slate-500 leading-relaxed">When you choose a specific division card (e.g. Sponsoring a child), your funds are dynamically ring-fenced by our accounting ledger lines to support only that specific area.</p>
            </div>
            <div className="p-6 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">Audited Portfolios Access</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Supporting church missionary boards and regular patrons are issued formal, audited accounting records quarterly to view expenditure efficiency lines first-hand.</p>
            </div>
            <div className="p-6 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">No State/Ecumenical Compromise</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Freedom Baptist Mission operates entirely independent of government financial handouts or structural loans from liberal religious councils—preserving uncompromised biblical operations.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}