"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, HelpCircle, ChevronDown, Flame } from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [enterprisePhotos, setEnterprisePhotos] = useState(150);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Pricing plans definition
  const plans = [
    {
      name: "Basic",
      photos: 6,
      monthlyPrice: 29,
      yearlyPrice: 16,
      features: [
        "6 staging renders per month",
        "High resolution downloads",
        "50+ design styles available",
        "All room types supported",
        "Standard support",
      ],
      cta: "Choose Basic",
      popular: false,
    },
    {
      name: "Standard",
      photos: 20,
      monthlyPrice: 49,
      yearlyPrice: 19,
      features: [
        "20 staging renders per month",
        "High resolution downloads",
        "Furniture removal tool included",
        "50+ design styles available",
        "Priority email support",
      ],
      cta: "Choose Standard",
      popular: false,
    },
    {
      name: "Professional",
      photos: 60,
      monthlyPrice: 99,
      yearlyPrice: 39,
      features: [
        "60 staging renders per month",
        "High resolution downloads",
        "Furniture removal tool included",
        "Unlimited custom revisions",
        "Priority email + chat support",
        "No watermark",
      ],
      cta: "Choose Professional",
      popular: true,
    },
  ];

  // Dynamic Enterprise values
  const getEnterprisePrice = (photos: number) => {
    if (photos === 150) return { monthly: 199, yearly: 79 };
    if (photos === 300) return { monthly: 349, yearly: 139 };
    if (photos === 500) return { monthly: 499, yearly: 199 };
    return { monthly: 899, yearly: 349 }; // 1000 photos
  };

  const enterprisePrice = getEnterprisePrice(enterprisePhotos);

  const pricingFaqs = [
    {
      q: "Can I upgrade or downgrade my plan at any time?",
      a: "Yes! You can easily upgrade, downgrade, or cancel your subscription at any time from your billing dashboard. Remaining credits will be adjusted accordingly.",
    },
    {
      q: "Do staging credits roll over to the next month?",
      a: "Staging credits reset at the end of each billing cycle to ensure our servers maintain peak performance for all active users.",
    },
    {
      q: "Is payment secure?",
      a: "Absolutely. We use Stripe to handle all subscription management and billing. Your credit card information is never stored on our servers.",
    },
    {
      q: "What is your refund policy?",
      a: "If you are not satisfied with your purchase, contact our support team within 14 days of subscribing, and we will issue a full refund if you have used less than 3 staging credits.",
    },
  ];

  return (
    <div className="bg-slate-50 py-20 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Stage all your listings for a fraction of the cost of physical staging. Cancel or change plans at any time.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <span className={`text-sm font-semibold ${billingCycle === "monthly" ? "text-primary" : "text-slate-400"}`}>
              Billed Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="relative inline-flex h-7 w-14 items-center rounded-full bg-primary transition-colors focus:outline-none"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  billingCycle === "yearly" ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-semibold ${billingCycle === "yearly" ? "text-accent font-bold" : "text-slate-400"}`}>
                Billed Yearly
              </span>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                Save up to 50%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            const ratePerPhoto = (price / plan.photos).toFixed(2);
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 bg-white transition-all ${
                  plan.popular
                    ? "border-accent ring-2 ring-accent/15 shadow-xl md:-translate-y-2 z-10"
                    : "border-slate-200 shadow-sm hover:shadow-md"
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                    <Flame className="h-3 w-3 fill-current" />
                    Best Value
                  </span>
                )}

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-primary">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-primary">${price}</span>
                    <span className="text-sm text-slate-500 font-semibold">/month</span>
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Billed Annually (${price * 12}/yr)
                    </p>
                  )}
                  <div className="border-t border-slate-100 pt-4 space-y-2">
                    <p className="text-sm font-bold text-slate-700">{plan.photos} photos / month</p>
                    <p className="text-xs text-slate-400 font-medium">Just ${ratePerPhoto} per staged photo</p>
                  </div>
                </div>

                <ul className="mt-8 space-y-4 flex-grow text-sm text-slate-600 font-medium">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/login?signUp=true&plan=${plan.name.toLowerCase()}&billing=${billingCycle}`}
                  className={`mt-8 block w-full rounded-xl py-3 text-center text-sm font-bold transition-all ${
                    plan.popular
                      ? "bg-accent hover:bg-accent-hover text-white shadow-lg shadow-orange-500/20"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}

          {/* Enterprise Card with photo credits slider */}
          <div className="relative flex flex-col rounded-2xl border border-slate-200 p-8 bg-white shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Enterprise</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-primary">
                  ${billingCycle === "monthly" ? enterprisePrice.monthly : enterprisePrice.yearly}
                </span>
                <span className="text-sm text-slate-500 font-semibold">/month</span>
              </div>
              {billingCycle === "yearly" && (
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Billed Annually (${enterprisePrice.yearly * 12}/yr)
                </p>
              )}

              {/* Slider selector section */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-700">{enterprisePhotos} photos / month</span>
                  <span className="text-xs text-slate-400 font-semibold">
                    ${(
                      (billingCycle === "monthly" ? enterprisePrice.monthly : enterprisePrice.yearly) /
                      enterprisePhotos
                    ).toFixed(2)}{" "}
                    per photo
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="1"
                  value={
                    enterprisePhotos === 150
                      ? 0
                      : enterprisePhotos === 300
                      ? 1
                      : enterprisePhotos === 500
                      ? 2
                      : 3
                  }
                  onChange={(e) => {
                    const idx = parseInt(e.target.value);
                    const photoSteps = [150, 300, 500, 1000];
                    setEnterprisePhotos(photoSteps[idx]);
                  }}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>150</span>
                  <span>300</span>
                  <span>500</span>
                  <span>1000+</span>
                </div>
              </div>
            </div>

            <ul className="mt-8 space-y-4 flex-grow text-sm text-slate-600 font-medium">
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Custom API access available</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Watermark removal config</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>White label integration options</span>
              </li>
            </ul>

            <Link
              href={`/login?signUp=true&plan=enterprise&photos=${enterprisePhotos}&billing=${billingCycle}`}
              className="mt-8 block w-full rounded-xl py-3 text-center text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all"
            >
              Choose Enterprise
            </Link>
          </div>
        </div>

        {/* Pricing FAQs Accordion */}
        <div className="max-w-3xl mx-auto pt-16 border-t border-slate-200 space-y-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center text-primary tracking-tight">
            Pricing FAQ
          </h2>
          <div className="space-y-4">
            {pricingFaqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-primary hover:bg-slate-50/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? "transform rotate-180 text-accent" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-40 border-t border-slate-100" : "max-h-0"
                    }`}
                  >
                    <p className="px-6 py-5 text-sm text-slate-500 leading-relaxed bg-slate-50/20">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
