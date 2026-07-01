  "use client";

  import { useState, useEffect } from "react";
  import { createPortal } from "react-dom";
  import { db } from "../lib/firebase";
  import { doc, getDoc } from "firebase/firestore";

  interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

  interface Settings {
    mpesaPaybill?: string;
    mpesaAccount?: string;
    mpesaAccountName?: string;
    mpesaPaymentMessage?: string;
    allowPaymentEdit?: boolean;
    bankAccounts?: Array<{
      bankName: string;
      accountName: string;
      accountNumber: string;
      branch: string;
    }>;
  }

  export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [donationAmount, setDonationAmount] = useState<string>("");
    const [donationType, setDonationType] = useState<string>("");
    const [donorName, setDonorName] = useState<string>("");
    const [donorEmail, setDonorEmail] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [currency, setCurrency] = useState<string>("USD");
    const [settings, setSettings] = useState<Settings>({});
    const [loadingSettings, setLoadingSettings] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => {
      setActiveToast(null);
    }, 4000);
  };

  useEffect(() => {
      if (isOpen) {
        fetchSettings();
      }
    }, [isOpen]);

    const fetchSettings = async () => {
      try {
        const { doc, getDoc } = await import("firebase/firestore");
        const settingsRef = doc(db, "settings", "configuration");
        const snapshot = await getDoc(settingsRef);
        
        if (snapshot.exists()) {
          const data = snapshot.data() as Settings;
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoadingSettings(false);
      }
    };

    if (!isOpen) return null;

    const handleClose = () => {
      setCurrentStep(1);
      setDonationAmount("");
      setDonationType("");
      setDonorName("");
      setDonorEmail("");
      setPaymentMethod("");
      setCurrency("USD");
      setIsProcessing(false);
      onClose();
    };

  const handleNext = () => {
    // Validation before proceeding
    if (currentStep === 1 && !donationType) {
      triggerToast("Please select a donation type to continue.");
      return;
    }
    
    if (currentStep === 2) {
      if (!donationAmount || parseFloat(donationAmount) <= 0) {
        triggerToast("Please enter a valid donation amount.");
        return;
      }
      if (!donorName.trim()) {
        triggerToast("Please enter your full name.");
        return;
      }
      if (!donorEmail.trim()) {
        triggerToast("Please enter your email address.");
        return;
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

    const handleBack = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    // Validation functions
    const canProceedFromStep1 = donationType !== "";
    const canProceedFromStep2 = donationAmount && parseFloat(donationAmount) > 0 && donorName.trim() !== "" && donorEmail.trim() !== "";

  const handlePaystackPayment = async () => {
    if (!donorName || !donorEmail || !donationAmount) {
      triggerToast("Please fill in all required fields");
      return;
    }

      setIsProcessing(true);

      console.log("Initiating payment with currency:", currency); // Debug log

      try {
        // Initialize Paystack transaction
        const response = await fetch("/api/paystack/initialize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
      body: JSON.stringify({
            email: donorEmail,
            amount: donationAmount,
            donorName: donorName,
            currency: currency, // Send user-selected currency
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to initialize payment");
        }

        // Load Paystack inline script
        const script = document.createElement("script");
        script.src = "https://js.paystack.co/v1/inline.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          // @ts-ignore - Paystack is loaded dynamically
          const paystack = window.PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
            email: donorEmail,
            amount: Math.round(parseFloat(donationAmount) * 100),
            ref: data.reference,
            currency: currency, // Use user-selected currency
            metadata: {
              donorName: donorName,
              donationType: donationType,
            },
            onClose: () => {
              setIsProcessing(false);
              triggerToast("Payment cancelled. You can try again.");
            },
            callback: (response: { reference: string }) => {
              // Verify payment on server
              verifyPayment(response.reference);
            },
          });

          paystack.openIframe();
        };

        script.onerror = () => {
          setIsProcessing(false);
          triggerToast("Failed to load payment gateway. Please try again.");
        };
      } catch (error) {
        setIsProcessing(false);
        console.error("Payment initialization error:", error);
        triggerToast(error instanceof Error ? error.message : "Failed to initialize payment. Please try again.");
      }
    };

    const verifyPayment = async (reference: string) => {
      try {
        const response = await fetch(`/api/paystack/verify/${reference}`);
        const data = await response.json();

        if (response.ok && data.success && data.status === "success") {
          triggerToast("Thank you for your generous donation! Your payment has been processed successfully.");
          setTimeout(() => {
            handleClose();
          }, 2000);
        } else {
          triggerToast("Payment verification failed. Please contact us if you were charged.");
          setIsProcessing(false);
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        triggerToast("Payment verification failed. Please contact us if you were charged.");
        setIsProcessing(false);
      }
    };

    const handleSubmit = async () => {
      if (!paymentMethod) {
        triggerToast("Please select a payment method");
        return;
      }

    // Always trigger Paystack API to handle the transaction
    // The payment method selection is for user preference and instructions
    await handlePaystackPayment();
  };

    const modalContent = (
      <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          {/* Header - Fixed */}
          <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200">
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

          {/* Progress Bar - Fixed */}
          <div className="flex-shrink-0 px-6 pt-4">
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

          {/* Scrollable Content Area */}
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

            {/* Step 2: Choose Amount & Personal Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Select Donation Amount</h3>
                  <p className="text-sm text-gray-600">Choose an amount that works for you.</p>
                </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currency === "USD" 
                  ? ["$25", "$50", "$100", "$250"].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDonationAmount(amount.replace("$", ""))}
                        className={`p-4 rounded-xl border-2 transition-all font-bold ${
                          donationAmount === amount.replace("$", "")
                            ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        {amount}
                      </button>
                    ))
                  : ["KSh 3,000", "KSh 5,000", "KSh 10,000", "KSh 25,000"].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDonationAmount(amount.replace("KSh ", "").replace(",", ""))}
                        className={`p-4 rounded-xl border-2 transition-all font-bold ${
                          donationAmount === amount.replace("KSh ", "").replace(",", "")
                            ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        {amount}
                      </button>
                    ))
                }
              </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Select Currency:</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none text-slate-900 mb-3"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="KES">KES - Kenyan Shilling</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Or enter custom amount ({currency}):</label>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                  step="0.01"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none text-slate-900"
                />
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>🌟 Every gift matters:</strong> Even small contributions help us provide medical care, education, and spiritual guidance to communities in need.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-base font-bold text-gray-900 mb-4">Your Information</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none text-slate-900"
                    />
                    <p className="text-xs text-gray-500 mt-1">We'll send you a receipt and donation confirmation</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Review Your Donation</h3>
                <p className="text-sm text-gray-600">Please confirm your donation details and select a payment method.</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Donor Name</span>
                  <span className="text-sm font-bold text-gray-900">{donorName || "Not provided"}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Donation Type</span>
                  <span className="text-sm font-bold text-gray-900">
                    {donationType === "one-time" ? "One-Time Gift" : "Monthly Partner"}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Amount</span>
                  <span className="text-sm font-bold text-emerald-700">
                    {donationAmount ? `${currency === "USD" ? "$" : "KSh "}${parseFloat(donationAmount).toFixed(2)}` : "Not specified"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Email</span>
                  <span className="text-sm font-bold text-gray-900">{donorEmail || "Not provided"}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-3">Select Payment Method</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentMethod("paystack")}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === "paystack"
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">💳</div>
                      <div>
                        <h5 className="font-bold text-gray-900">Pay with Card</h5>
                        <p className="text-xs text-gray-600 mt-1">Visa, Mastercard, or American Express</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("mpesa")}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === "mpesa"
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">📱</div>
                      <div>
                        <h5 className="font-bold text-gray-900">Pay with M-Pesa</h5>
                        <p className="text-xs text-gray-600 mt-1">Mobile money payment</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Payment Instructions */}
              {paymentMethod === "mpesa" && !loadingSettings && settings.mpesaPaybill && (
                <div className="p-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
                  <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">📱</span>
                    Pay via M-Pesa
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-emerald-100">
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Step 1: Go to M-Pesa Menu</p>
                      <p className="text-sm text-gray-700">Open your M-Pesa menu on your phone and select <strong>Lipa Na M-Pesa</strong></p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-emerald-100">
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Step 2: Enter Payment Details</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Paybill Number:</span>
                          <span className="text-lg font-black text-emerald-700">{settings.mpesaPaybill}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Account Number:</span>
                          <span className="text-lg font-black text-emerald-700">{settings.mpesaAccount}</span>
                        </div>
                        {settings.mpesaAccountName && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Account Name:</span>
                            <span className="text-lg font-black text-emerald-700">{settings.mpesaAccountName}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-emerald-100">
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Step 3: Enter Amount</p>
                      <p className="text-sm text-gray-700">Enter the donation amount: <strong className="text-emerald-700">{currency === "USD" ? "$" : "KSh "}{donationAmount || "0"}</strong></p>
                    </div>

                    {settings.mpesaPaymentMessage && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs text-gray-700">
                          <strong>⚠️ Important:</strong> {settings.mpesaPaymentMessage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bank transfer section removed - using Paystack for all transactions */}

                  {paymentMethod === "paystack" && (
                    <div className="p-6 bg-purple-50 border-2 border-purple-200 rounded-xl">
                      <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-2xl">💳</span>
                        Secure Card Payment
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-4 border border-purple-100">
                          <p className="text-sm text-gray-700">
                            <strong>🔒 Secure Payment:</strong> Your payment is secured by Paystack, a PCI-DSS compliant payment processor. We accept Visa, Mastercard, and American Express.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-purple-100">
                          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">What to expect:</p>
                          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                            <li>You'll be redirected to a secure payment page</li>
                            <li>Enter your card details on our secure server</li>
                            <li>Receive an instant payment confirmation</li>
                            <li>Get a receipt via email</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>✅ Thank you for your generosity!</strong> Your support helps us transform lives across Kenya and beyond through spreading the Gospel.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Navigation Buttons - Fixed */}
        <div className="flex-shrink-0 flex gap-3 p-6 border-t border-gray-200">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              disabled={isProcessing}
              className="flex-1 inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Back
            </button>
          )}
          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !canProceedFromStep1) ||
                (currentStep === 2 && !canProceedFromStep2)
              }
              className="flex-1 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!paymentMethod || isProcessing}
              className="flex-1 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>💚 Complete Donation</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Toast Notification
  {activeToast && (
    <div className="fixed bottom-6 right-6 z-[200] bg-slate-900 text-white text-sm font-bold px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-md">
      <span>💚</span>
      <span>{activeToast}</span>
    </div>
  )}

  // Use portal to render modal at the root level to avoid z-index and overflow issues
  if (typeof document !== "undefined") {
    return createPortal(
      <>
        {modalContent}
        {activeToast && (
          <div className="fixed bottom-6 right-6 z-[200] bg-slate-900 text-white text-sm font-bold px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-md">
            <span>💚</span>
            <span>{activeToast}</span>
          </div>
        )}
      </>,
      document.body
    );
  }

  return null;
}
