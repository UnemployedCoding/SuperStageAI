"use client";

import React from "react";
import { Shield, Sparkles, Monitor, Cpu } from "lucide-react";

export default function WhitelabelPage() {
  const features = [
    {
      icon: <Monitor className="h-6 w-6 text-accent" />,
      title: "Your Domain & Branding",
      description: "Host virtual staging under your own subdomain (e.g., staging.yourbrand.com) with custom logos and brand colors.",
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Fully White-Labeled",
      description: "No mention of SuperStage AI anywhere. Completely branded client logins, dashboards, and downloads.",
    },
    {
      icon: <Cpu className="h-6 w-6 text-accent" />,
      title: "Custom AI Tuning",
      description: "Incorporate your own custom design catalogs, pre-selected furniture modules, and staging templates.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-accent" />,
      title: "Flexible Reseller Pricing",
      description: "Charge your customers whatever you want. Set up monthly subscription tiers or pay-per-credit pricing.",
    },
  ];

  return (
    <div className="bg-slate-50 py-20 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
            White-Label Staging Software
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Start your own AI virtual staging SaaS business today. Sell staging services to your clients under your own brand.
          </p>
          <div className="pt-4">
            <button
              onClick={() => alert("Whitelabel contact inquiry form (Mock)")}
              className="rounded-full bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 shadow-lg shadow-orange-500/20 transition-all text-base"
            >
              Request White-Label Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feat, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-8 flex gap-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 flex-shrink-0">
                {feat.icon}
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-primary">{feat.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
