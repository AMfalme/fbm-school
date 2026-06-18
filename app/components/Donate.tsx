
"use client";

import React, { useState } from 'react';

type Currency = 'USD' | 'KES' | 'EUR' | 'GBP';

interface SupportTarget {
  id: string;
  category: 'MINISTRY' | 'CHILDREN';
  title: string;
  emoji: string;
  description: string;
  baseAmountUSD: number;
  isSubscription?: boolean;
}

export default function CompleteSupportSection() {
  // 1. Currency & Donation Amounts States
  const [currency, setCurrency] = useState<Currency>('USD');
  const [amounts, setAmounts] = useState<Record<string, string>>({
    church: "100",
    school: "75",
    bible_college: "150",
    sponsor: "35",
    desks: "50",
    building: "150"
  });

  // 2. Real-Time Exchange Rate Directory (Relative to 1 USD)
  const exchangeRates: Record<Currency, { rate: number; symbol: string }> = {
    USD: { rate: 1.0, symbol: '$' },
    KES: { rate: 130.0, symbol: 'KSh ' },
    EUR: { rate: 0.92, symbol: '€' },
    GBP: { rate: 0.78, symbol: '£' }
  };

  // 3. Merged Global Dataset: Core Institutions + Children's Impact Tiers
  const supportTargets: SupportTarget[] = [
    // --- SECTION A: MAIN MINISTRIES & INSTITUTIONS ---
    {
      id: 'church',
      category: 'MINISTRY',
      title: 'The Local Church Plant',
      emoji: '⛪',
      description: 'Support native pastoral outreach, Sunday school curriculum, community evangelism folders, and regional church multiplying works.',
      baseAmountUSD: 100
    },
    {
      id: 'school',
      category: 'MINISTRY',
      title: 'The Christian School',
      emoji: '🏫',
      description: 'Invest directly into daily operations, administrative resources, and teacher salaries to maintain uncompromised academic standards.',
      baseAmountUSD: 75
    },
    {
      id: 'bible_college',
      category: 'MINISTRY',
      title: 'The Theological Bible College',
      emoji: '📜',
      description: 'Provision scholarship modules, historical books, and theological training tracks for local pastors answering the Gospel call.',
      baseAmountUSD: 150
    },
    // --- SECTION B: TARGETED CHILDREN & CLASSROOM IMPACT PILLARS ---
    {
      id: 'sponsor',
      category: 'CHILDREN',
      title: 'Sponsor a child',
      emoji: '🤝',
      description: 'Give a child the opportunity to attend school with uniforms, books, and a stable learning environment.',
      baseAmountUSD: 35,
      isSubscription: true
    },
    {
      id: 'desks',
      category: 'CHILDREN',
      title: 'Donate desks & books',
      emoji: '📚',
      description: 'Help us furnish classrooms and stock the library with learning materials children can use every day.',
      baseAmountUSD: 50
    },
    {
      id: 'building',
      category: 'CHILDREN',
      title: 'Building support',
      emoji: '🏗️',
      description: 'Invest in safe classrooms, water, and facilities that make this school a strong place for learning.',
      baseAmountUSD: 150
    }
  ];

  // Helper function to dynamically output currency suggestions on the fly
  const getConvertedSuggested = (baseUSD: number) => {
    const target = exchangeRates[currency];
    const converted = Math.round(baseUSD * target.rate);
    return `${target.symbol}${converted.toLocaleString()}`;
  };

  const handleAmountChange = (id: string, value: string) => {
    setAmounts(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 bg-[#FFFDF9] rounded-[36px] border border-stone-200/60 shadow-xs space-y-12">
      
      {/* ================= GLOBAL CONTROLS HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-stone-200/50 pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900">Partner With Our Ministry</h2>
          <p className="text-stone-500 text-sm font-medium">Select your preferred currency to instantly adjust impact suggestions across our fields.</p>
        </div>
        
        {/* Central Currency Controller */}
        <div className="bg-stone-100 p-1.5 rounded-xl flex gap-1 border border-stone-200/60 shrink-0 shadow-xs">
          {(Object.keys(exchangeRates) as Currency[]).map((cur) => (
            <button
              key={cur}
              type="button"
              onClick={() => setCurrency(cur)}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                currency === cur 
                  ? 'bg-white text-stone-950 shadow-sm' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* ================= SECTION 1: CORE INSTITUTIONS ================= */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">1. Foundational Ministry Funds</h3>
          <p className="text-xs text-stone-500 font-medium">Fuel institutional operations and infrastructure to keep our focal ministries strong.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {supportTargets.filter(t => t.category === 'MINISTRY').map((item) => (
            <div 
              key={item.id} 
              className="p-6 rounded-2xl bg-white border border-stone-200/60 hover:border-stone-300 shadow-xs transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-8 flex items-start gap-4">
                <span className="text-3xl pt-0.5 select-none" role="img" aria-label={item.title}>{item.emoji}</span>
                <div>
                  <h4 className="text-base font-bold text-stone-900">{item.title}</h4>
                  <p className="text-stone-600 text-xs mt-1 leading-relaxed font-medium">{item.description}</p>
                  <span className="inline-block mt-2 text-[11px] bg-stone-50 border border-stone-100 text-stone-500 font-semibold px-2 py-0.5 rounded-md">
                    Suggested: {getConvertedSuggested(item.baseAmountUSD)}
                  </span>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 w-full">
                <div className="relative w-full">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                    {exchangeRates[currency].symbol}
                  </span>
                  <input
                    type="number"
                    value={amounts[item.id] || ""}
                    onChange={(e) => handleAmountChange(item.id, e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 bg-stone-50/50 border border-stone-200 rounded-xl text-xs font-black text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-950/5 focus:bg-white transition-all"
                  />
                </div>
                <button type="button" className="w-full bg-stone-900 text-white rounded-xl py-2.5 text-xs font-bold hover:bg-stone-800 transition-all shadow-xs px-4 whitespace-nowrap">
                  Support Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECTION 2: CLASSROOM & CHILD SPONSORSHIP ================= */}
      <div className="space-y-6 pt-4">
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">2. Student Sponsorship &amp; Classroom Pillars</h3>
          <p className="text-xs text-stone-500 font-medium">Directly resource academic supplies, physical items, and educational milestones for individual children.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {supportTargets.filter(t => t.category === 'CHILDREN').map((item) => (
            <div 
              key={item.id} 
              className="p-6 rounded-2xl bg-white border border-stone-200/60 hover:border-stone-300 shadow-xs transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-8 flex items-start gap-4">
                <span className="text-3xl pt-0.5 select-none" role="img" aria-label={item.title}>{item.emoji}</span>
                <div>
                  <h4 className="text-base font-bold text-stone-900">{item.title}</h4>
                  <p className="text-stone-600 text-xs mt-1 leading-relaxed font-medium">{item.description}</p>
                  <span className="inline-block mt-2 text-[11px] bg-stone-50 border border-stone-100 text-stone-500 font-semibold px-2 py-0.5 rounded-md">
                    Suggested: {getConvertedSuggested(item.baseAmountUSD)} {item.isSubscription && '/ month'}
                  </span>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 w-full">
                <div className="relative w-full">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                    {exchangeRates[currency].symbol}
                  </span>
                  <input
                    type="number"
                    value={amounts[item.id] || ""}
                    onChange={(e) => handleAmountChange(item.id, e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 bg-stone-50/50 border border-stone-200 rounded-xl text-xs font-black text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-950/5 focus:bg-white transition-all"
                  />
                </div>
                <button type="button" className="w-full bg-stone-900 text-white rounded-xl py-2.5 text-xs font-bold hover:bg-stone-800 transition-all shadow-xs px-4 whitespace-nowrap">
                  {item.isSubscription ? 'Sponsor Now' : 'Donate Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECTION 3: SPIRITUAL PARTNERSHIP ================= */}
      <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/60 border-dashed flex items-start gap-4">
        <span className="text-3xl select-none pt-0.5" role="img" aria-label="Prayer support">🙏</span>
        <div>
          <h3 className="text-base font-bold text-stone-900">Prayer support</h3>
          <p className="text-stone-600 text-xs mt-1 leading-relaxed font-medium">
            Stand with us spiritually as we raise up a school rooted in Christian freedom and academic excellence. Your faithful, continuous intercession for our teachers, pastors, and local children is the true foundation of this entire mission.
          </p>
        </div>
      </div>

    </div>
  );
}