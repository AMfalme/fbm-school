"use client";

import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

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

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [step, setStep] = useState(1);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [selectedTarget, setSelectedTarget] = useState<SupportTarget | null>(null);
  const [amount, setAmount] = useState('100');

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const exchangeRates: Record<Currency, { rate: number; symbol: string }> = {
    USD: { rate: 1.0, symbol: '$' },
    KES: { rate: 130.0, symbol: 'KSh ' },
    EUR: { rate: 0.92, symbol: '€' },
    GBP: { rate: 0.78, symbol: '£' }
  };

  const supportTargets: SupportTarget[] = [
    { id: 'church', category: 'MINISTRY', title: 'The Local Church Plant', emoji: '⛪', description: 'Support native pastoral outreach and community evangelism.', baseAmountUSD: 100 },
    { id: 'school', category: 'MINISTRY', title: 'The Christian School', emoji: '🏫', description: 'Invest in daily operations and teacher salaries.', baseAmountUSD: 75 },
    { id: 'bible_college', category: 'MINISTRY', title: 'Bible College', emoji: '📜', description: 'Provision scholarships and theological training.', baseAmountUSD: 150 },
    { id: 'sponsor', category: 'CHILDREN', title: 'Sponsor a Child', emoji: '🤝', description: 'Give a child the opportunity to attend school.', baseAmountUSD: 35, isSubscription: true },
    { id: 'desks', category: 'CHILDREN', title: 'Donate Desks & Books', emoji: '📚', description: 'Help furnish classrooms with learning materials.', baseAmountUSD: 50 },
    { id: 'building', category: 'CHILDREN', title: 'Building Support', emoji: '🏗️', description: 'Invest in safe classrooms and facilities.', baseAmountUSD: 150 }
  ];

  const getConvertedAmount = (baseUSD: number) => {
    const target = exchangeRates[currency];
    const converted = Math.round(baseUSD * target.rate);
    return `${target.symbol}${converted.toLocaleString()}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-0 right-4 p-2 hover:bg-slate-100 rounded-full transition z-10 ml-auto block mt-4"
        >
          <X size={24} />
        </button>

        {/* STEP 1: Select Impact Area */}
        {step === 1 && (
          <div className="px-8 py-6 space-y-6">
            <div>
              <h2 className="text-3xl font-black text-slate-950">Choose Your Impact</h2>
              <p className="text-slate-600 mt-2">Select a ministry area where your donation will make a difference.</p>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {supportTargets.map((target) => (
                <button
                  key={target.id}
                  onClick={() => {
                    setSelectedTarget(target);
                    setAmount(target.baseAmountUSD.toString());
                    setStep(2);
                  }}
                  className="w-full p-4 text-left border-2 border-slate-200 rounded-2xl hover:border-[#0055b8] hover:bg-blue-50 transition group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{target.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-950">{target.title}</h3>
                      <p className="text-sm text-slate-600">{target.description}</p>
                    </div>
                    <ChevronRight size={20} className="text-slate-400 group-hover:text-[#0055b8]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Set Amount & Currency */}
        {step === 2 && selectedTarget && (
          <div className="px-8 py-6 space-y-6">
            <div>
              <h2 className="text-3xl font-black text-slate-950">Set Your Amount</h2>
              <p className="text-slate-600 mt-2">{selectedTarget.title}</p>
            </div>

            {/* Currency Selector */}
            <div className="flex gap-2 bg-slate-100 p-2 rounded-lg">
              {(Object.keys(exchangeRates) as Currency[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${
                    currency === cur
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Donation Amount</label>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{exchangeRates[currency].symbol}</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0055b8]"
                />
              </div>
            </div>

            {/* Suggested Amounts */}
            <div className="grid grid-cols-3 gap-2">
              {[25, 50, 100].map((baseUSD) => (
                <button
                  key={baseUSD}
                  onClick={() => setAmount((Math.round(baseUSD * exchangeRates[currency].rate)).toString())}
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-semibold transition"
                >
                  {getConvertedAmount(baseUSD)}
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 border-2 border-slate-300 rounded-lg font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2"
              >
                <ChevronLeft size={18} />
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-[#0055b8] text-white rounded-lg font-bold hover:bg-[#003d7a] transition flex items-center justify-center gap-2"
              >
                Continue
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Review & Donate */}
        {step === 3 && selectedTarget && (
          <div className="px-8 py-6 space-y-6">
            <div>
              <h2 className="text-3xl font-black text-slate-950">Confirm Your Donation</h2>
              <p className="text-slate-600 mt-2">Review your donation details before proceeding.</p>
            </div>

            {/* Review Summary */}
            <div className="border-2 border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{selectedTarget.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-slate-950">{selectedTarget.title}</h3>
                  <p className="text-slate-600">{selectedTarget.description}</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Amount:</span>
                  <span className="font-bold">{exchangeRates[currency].symbol}{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Currency:</span>
                  <span className="font-bold">{currency}</span>
                </div>
                {selectedTarget.isSubscription && (
                  <div className="flex justify-between text-amber-700 bg-amber-50 -mx-4 -mb-4 px-4 py-3 rounded-b-lg">
                    <span>Type:</span>
                    <span className="font-bold">Monthly Subscription</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 border-2 border-slate-300 rounded-lg font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2"
              >
                <ChevronLeft size={18} />
                Back
              </button>
              <a
                href={`/support-us?target=${selectedTarget.id}&amount=${amount}&currency=${currency}`}
                className="flex-1 py-3 bg-[#16a34a] text-white rounded-lg font-bold hover:bg-[#15803d] transition flex items-center justify-center gap-2"
              >
                <span>💚</span>
                Donate Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
