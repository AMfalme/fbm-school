"use client";

import React, { useState } from 'react';

type Currency = 'USD' | 'KES' | 'EUR' | 'GBP';
type PaymentMethod = 'MPESA' | 'BANK' | 'PAYPAL';
type DonationType = 'church' | 'school' | 'bible_college' | 'sponsor' | 'desks' | 'building';

interface SupportTarget {
  id: DonationType;
  category: 'MINISTRY' | 'CHILDREN';
  title: string;
  emoji: string;
  description: string;
  baseAmountUSD: number;
  extendedImpact: string;
  isSubscription?: boolean;
}

interface CurrencyRate {
  rate: number;
  symbol: string;
}

export default function DonationHub() {
  // ============ STATE MANAGEMENT ============
  const [currency, setCurrency] = useState<Currency>('USD');
  const [selectedTarget, setSelectedTarget] = useState<DonationType>('sponsor');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('MPESA');
  const [customAmount, setCustomAmount] = useState<string>('35');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // ============ EXCHANGE RATES (4 CURRENCIES) ============
  const exchangeRates: Record<Currency, CurrencyRate> = {
    USD: { rate: 1.0, symbol: '$' },
    KES: { rate: 130.0, symbol: 'KSh ' },
    EUR: { rate: 0.92, symbol: '€' },
    GBP: { rate: 0.78, symbol: '£' }
  };

  // ============ UNIFIED SUPPORT TARGETS (6 ITEMS) ============
  const supportTargets: SupportTarget[] = [
    // --- SECTION A: MAIN MINISTRIES & INSTITUTIONS ---
    {
      id: 'church',
      category: 'MINISTRY',
      title: 'The Local Church Plant',
      emoji: '⛪',
      description: 'Support native pastoral outreach, Sunday school curriculum, community evangelism folders, and regional church multiplying works.',
      baseAmountUSD: 100,
      extendedImpact: 'Directly funds pastoral discipleship programs, sermon resources, and church planting infrastructure in underserved regions.'
    },
    {
      id: 'school',
      category: 'MINISTRY',
      title: 'The Christian School',
      emoji: '🏫',
      description: 'Invest directly into daily operations, administrative resources, and teacher salaries to maintain uncompromised academic standards.',
      baseAmountUSD: 75,
      extendedImpact: 'Covers teacher compensation, curriculum development, facility maintenance, and educational technology integration.'
    },
    {
      id: 'bible_college',
      category: 'MINISTRY',
      title: 'The Theological Bible College',
      emoji: '📜',
      description: 'Provision scholarship modules, historical books, and theological training tracks for local pastors answering the Gospel call.',
      baseAmountUSD: 150,
      extendedImpact: 'Funds full scholarships for pastoral students, theological library expansion, and seminary facility upgrades.'
    },
    // --- SECTION B: TARGETED CHILDREN & CLASSROOM IMPACT PILLARS ---
    {
      id: 'sponsor',
      category: 'CHILDREN',
      title: 'Sponsor a Child',
      emoji: '🤝',
      description: 'Give a child the opportunity to attend school with uniforms, books, and a stable learning environment.',
      baseAmountUSD: 35,
      extendedImpact: 'Covers full academic tuition fees, custom school uniform sets, standard textbook allocations, and daily balanced lunchtime meals.',
      isSubscription: true
    },
    {
      id: 'desks',
      category: 'CHILDREN',
      title: 'Donate Desks & Books',
      emoji: '📚',
      description: 'Help us furnish classrooms and stock the library with learning materials children can use every day.',
      baseAmountUSD: 50,
      extendedImpact: 'Provisions heavy-duty hardwood double-desks directly to active classrooms and funds foundational CBC reading readiness libraries.'
    },
    {
      id: 'building',
      category: 'CHILDREN',
      title: 'Building Support',
      emoji: '🏗️',
      description: 'Invest in safe classrooms, water, and facilities that make this school a strong place for learning.',
      baseAmountUSD: 150,
      extendedImpact: 'Directly funds brick manufacturing, stone masonry payrolls, protective classroom construction, and structural clean water filtration points.'
    }
  ];

  // ============ HELPER FUNCTIONS ============
  const getConvertedAmount = (baseUSD: number): string => {
    const target = exchangeRates[currency];
    const converted = Math.round(baseUSD * target.rate);
    return `${target.symbol}${converted.toLocaleString()}`;
  };

  const handleTargetSelection = (target: SupportTarget) => {
    setSelectedTarget(target.id);
    if (target.id !== 'sponsor') {
      const converted = Math.round(target.baseAmountUSD * exchangeRates[currency].rate);
      setCustomAmount(converted.toString());
    } else {
      setCustomAmount('35');
    }
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    const activeTarget = supportTargets.find(t => t.id === selectedTarget);
    if (activeTarget) {
      const converted = Math.round(activeTarget.baseAmountUSD * exchangeRates[newCurrency].rate);
      setCustomAmount(converted.toString());
    }
  };

  const getActiveTarget = () => supportTargets.find(t => t.id === selectedTarget);

  // ============ RENDER ============
  return (
    <div className="w-full bg-[#FFFDF9] text-slate-900">
      {/* ================= HERO INTRO SECTION ================= */}
      <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-8 pb-12 px-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0055b8]">
          💎 Financial Integrity • Audited Operational Expenditure Logs
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 leading-[1.1]">
          Partner with Us <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055b8] to-[#16a34a]">
            In the Harvest Fields
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
          Your financial stewardship directly provisions native church plants, fuels robust theological modules, and secures foundational Christian schooling.
        </p>
      </section>

      {/* ================= GLOBAL CURRENCY SELECTOR ================= */}
      <section className="flex justify-center items-center gap-4 max-w-3xl mx-auto mb-12 px-4">
        <span className="text-xs font-black uppercase text-slate-500">Preferred Currency:</span>
        <div className="grid grid-cols-4 gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200/50">
          {(Object.keys(exchangeRates) as Currency[]).map((cur) => (
            <button
              key={cur}
              onClick={() => handleCurrencyChange(cur)}
              className={`py-2 px-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-center ${
                currency === cur
                  ? 'bg-[#003d7a] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      </section>

      {/* ================= MAIN INTERACTIVE DONATION GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE: SUPPORT TARGET SELECTION CARDS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#0055b8]">Step 1 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Select Your Impact Area</h2>
              <p className="text-slate-500 text-xs font-medium">Choose a ministry focus to support and see the direct impact of your gift.</p>
            </div>

            {/* MINISTRY SECTION */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">Ministry & Institutions</h3>
              <div className="grid grid-cols-1 gap-3">
                {supportTargets.filter(t => t.category === 'MINISTRY').map((target) => {
                  const isActive = selectedTarget === target.id;
                  return (
                    <button
                      key={target.id}
                      onClick={() => handleTargetSelection(target)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-4 items-start focus:outline-none ${
                        isActive
                          ? 'border-[#16a34a] bg-emerald-50/30 shadow-md shadow-emerald-900/5'
                          : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <div className={`text-2xl p-3 rounded-xl shrink-0 ${
                        isActive ? 'bg-emerald-100' : 'bg-slate-50'
                      }`}>
                        {target.emoji}
                      </div>
                      <div className="space-y-1 w-full">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-black text-slate-950 text-sm">{target.title}</h4>
                          <span className="text-[10px] font-black tracking-tight text-slate-900 bg-slate-100 px-2 py-0.5 rounded whitespace-nowrap">
                            {getConvertedAmount(target.baseAmountUSD)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-tight font-medium">{target.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CHILDREN & CLASSROOM SECTION */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">Student & Classroom Impact</h3>
              <div className="grid grid-cols-1 gap-3">
                {supportTargets.filter(t => t.category === 'CHILDREN').map((target) => {
                  const isActive = selectedTarget === target.id;
                  return (
                    <button
                      key={target.id}
                      onClick={() => handleTargetSelection(target)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-4 items-start focus:outline-none ${
                        isActive
                          ? 'border-[#16a34a] bg-emerald-50/30 shadow-md shadow-emerald-900/5'
                          : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <div className={`text-2xl p-3 rounded-xl shrink-0 ${
                        isActive ? 'bg-emerald-100' : 'bg-slate-50'
                      }`}>
                        {target.emoji}
                      </div>
                      <div className="space-y-1 w-full">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-black text-slate-950 text-sm">{target.title}</h4>
                          <span className="text-[10px] font-black tracking-tight text-slate-900 bg-slate-100 px-2 py-0.5 rounded whitespace-nowrap">
                            {getConvertedAmount(target.baseAmountUSD)}{target.isSubscription ? '/mo' : ''}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-tight font-medium">{target.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRAYER SUPPORT */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 border-dashed flex items-start gap-4">
              <span className="text-2xl select-none pt-0.5">🙏</span>
              <div>
                <h4 className="font-black text-slate-950 text-sm">Prayer Support</h4>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed font-medium">
                  Stand with us spiritually as we raise up a school rooted in Christian freedom and academic excellence.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: DONATION FORM & PAYMENT GATEWAY */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-6 h-fit sticky top-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Step 2 &amp; 3</span>
              <h3 className="text-2xl font-black text-slate-950 tracking-tight">Amount &amp; Payment</h3>
            </div>

            {/* AMOUNT INPUT */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  Enter Gift Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    {exchangeRates[currency].symbol}
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0055b8]/10 focus:bg-white font-black text-slate-950"
                  />
                </div>
              </div>

              {getActiveTarget() && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs font-medium text-emerald-800">
                  <strong>Direct Impact:</strong> {getActiveTarget()!.extendedImpact}
                </div>
              )}
            </div>

            {/* PAYMENT METHOD SELECTOR */}
            <div className="space-y-3">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700">Payment Method</label>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200/40">
                {(['MPESA', 'BANK', 'PAYPAL'] as PaymentMethod[]).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2.5 px-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all text-center ${
                      paymentMethod === method
                        ? 'bg-white text-slate-900 shadow-xs border border-slate-100'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {method === 'MPESA' && '🟢 M-Pesa'}
                    {method === 'BANK' && '🏦 Bank'}
                    {method === 'PAYPAL' && '🌐 PayPal'}
                  </button>
                ))}
              </div>
            </div>

            {/* PAYMENT GATEWAY FORMS */}
            <div className="space-y-4 p-4 bg-[#FFFDF9] border border-slate-100 rounded-2xl">
              {paymentMethod === 'MPESA' && (
                <div className="space-y-3">
                  <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                    Triggers a secure STK Push verification PIN prompt directly to your phone via Safaricom's Daraja API.
                  </p>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-700 mb-2">Safaricom Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 0712345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#16a34a]/20"
                    />
                  </div>
                  <button type="button" className="w-full h-10 rounded-xl bg-[#16a34a] text-white text-xs font-black uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-md shadow-emerald-900/10">
                    ⚡ Execute M-Pesa STK Push
                  </button>
                </div>
              )}

              {paymentMethod === 'BANK' && (
                <div className="space-y-3 text-xs">
                  <p className="text-[11px] font-medium text-slate-500 leading-relaxed pb-2 border-b border-slate-100">
                    Transfer via domestic RTGS or international Swift routing into our audited treasury:
                  </p>
                  <div className="space-y-2 text-[11px]">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-slate-400 font-bold uppercase">Bank:</span>
                      <span className="col-span-2 font-bold text-slate-900">Kenya Commercial Bank (KCB)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-slate-400 font-bold uppercase">Branch:</span>
                      <span className="col-span-2 font-bold text-slate-900">Kisii Main Branch (011)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-slate-400 font-bold uppercase">Account:</span>
                      <span className="col-span-2 font-bold text-slate-900">Freedom Baptist Mission Trust</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-slate-400 font-bold uppercase">Number:</span>
                      <span className="col-span-2 font-mono font-black text-[#0055b8]">1234567890</span>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'PAYPAL' && (
                <div className="space-y-3">
                  <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                    Best choice for global partners and international supporters. Launches end-to-end tokenized connection.
                  </p>
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-center font-bold text-[11px] text-[#0055b8]">
                    🔒 Secure Currency Processing Line Active
                  </div>
                  <button type="button" className="w-full h-10 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-wider hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                    🌐 Secure PayPal Portal
                  </button>
                </div>
              )}
            </div>

            {/* CTA BUTTON */}
            <button type="button" className="w-full h-12 rounded-xl bg-slate-950 text-white text-xs font-black uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg">
              Complete {getActiveTarget()?.isSubscription ? 'Monthly Sponsorship' : 'Donation'}
            </button>
          </div>
        </div>
      </section>

      {/* ================= STEWARDSHIP GUARANTEES ================= */}
      <section className="bg-white border-t border-slate-100 mt-20 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#16a34a]">Mission Governance</span>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">Our Financial Stewardship Guarantees</h2>
            <p className="text-slate-600 font-medium text-xs">We strictly minimize overhead costs. Every resource is mapped transparently to field-level project deployment tracks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">100% Direct Allocation Policy</h4>
              <p className="text-xs text-slate-500 leading-relaxed">When you choose a specific area, your funds are ring-fenced by our accounting ledger to support only that specific ministry division.</p>
            </div>
            <div className="p-6 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">Audited Portfolios Access</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Regular patrons receive formal audited accounting records quarterly to view expenditure efficiency and ministry impact first-hand.</p>
            </div>
            <div className="p-6 bg-[#FFFDF9] border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-950 text-sm">No State/Ecumenical Compromise</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Freedom Baptist Mission operates entirely independent of government handouts or liberal religious council influence.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
