"use client";

import { useState } from "react";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [donationType, setDonationType] = useState<string>("one-time");

  if (!isOpen) return null;

  const handleClose = () => {
    setCurrentStep(1);
    setDonationAmount("");
    setDonationType("one-time");
    onClose();
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    alert("Thank you for your generous donation! This would integrate with a payment processor.");
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Support Our Mission</h2>
            <p className="text-sm text-gray-500 mt-1">Step {currentStep} of 3</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-all ${
                  step <= currentStep ? "bg-emerald-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Choose Donation Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Choose Your Donation Type</h3>
                <p className="text-sm text-gray-600">Select how you would like to support our mission.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setDonationType("one-time")}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    donationType === "one-time"
                      ? "border-emerald-600 bg-emerald-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-3xl mb-3">💝</div>
                  <h4 className="font-bold text-gray-900">One-Time Gift</h4>
                  <p className="text-sm text-gray-600 mt-1">Make a single contribution to support our work</p>
                </button>

                <button
                  onClick={() => setDonationType("monthly")}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    donationType === "monthly"
                      ? "border-emerald-600 bg-emerald-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-3xl mb-3">🔄</div>
                  <h4 className="font-bold text-gray-900">Monthly Partner</h4>
                  <p className="text-sm text-gray-600 mt-1">Join our community of recurring supporters</p>
                </button>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>💡 Did you know?</strong> Monthly partners provide sustainable support that helps us plan long-term ministry initiatives and maintain consistent outreach programs.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Choose Amount */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Select Donation Amount</h3>
                <p className="text-sm text-gray-600">Choose an amount that works for you.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["$25", "$50", "$100", "$250"].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDonationAmount(amount)}
                    className={`p-4 rounded-xl border-2 transition-all font-bold ${
                      donationAmount === amount
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Or enter custom amount:</label>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>🌟 Every gift matters:</strong> Even small contributions help us provide medical care, education, and spiritual guidance to communities in need.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Review Your Donation</h3>
                <p className="text-sm text-gray-600">Please confirm your donation details.</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Donation Type</span>
                  <span className="text-sm font-bold text-gray-900">
                    {donationType === "one-time" ? "One-Time Gift" : "Monthly Partner"}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Amount</span>
                  <span className="text-sm font-bold text-emerald-700">
                    {donationAmount ? `$${donationAmount}` : "Not specified"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Payment Method</span>
                  <span className="text-sm font-bold text-gray-900">Credit/Debit Card</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>🔒 Secure Payment:</strong> Your donation is processed through our secure payment gateway. We accept all major credit cards and mobile money options.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Navigation Buttons */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
          )}
          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="flex-1 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-500 transition-colors"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-500 transition-colors"
            >
              💚 Complete Donation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}