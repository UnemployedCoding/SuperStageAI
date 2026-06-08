"use client";

import React from "react";
import Link from "next/link";
import { Percent, DollarSign, Award, Users } from "lucide-react";

export default function AffiliatePage() {
  const benefits = [
    {
      icon: <Percent className="h-6 w-6 text-accent" />,
      title: "30% Lifetime Commission",
      description: "Earn 30% recurring commission on every payment made by customers you refer, forever.",
    },
    {
      icon: <DollarSign className="h-6 w-6 text-accent" />,
      title: "Monthly Payouts",
      description: "Get paid automatically every month directly to your PayPal or bank account with no hassle.",
    },
    {
      icon: <Award className="h-6 w-6 text-accent" />,
      title: "Marketing Materials",
      description: "Access high-converting banner ads, email templates, and promotional copy to boost sales.",
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Dedicated Support",
      description: "Work with a dedicated affiliate manager to optimize your campaigns and maximize earnings.",
    },
  ];

  return (
    <div className="bg-slate-50 py-20 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Join the Staging AI Affiliate Program
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Recommend the world's leading virtual staging AI platform and earn 30% recurring lifetime commissions.
          </p>
          <div className="pt-4">
            <button
              onClick={() => alert("Affiliate signup form modal (Mock)")}
              className="rounded-full bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 shadow-lg shadow-orange-500/20 transition-all text-base"
            >
              Become an Affiliate Partner
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-8 space-y-4 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                {benefit.icon}
              </span>
              <h3 className="text-lg font-bold text-primary">{benefit.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Staging details */}
        <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,101,0,0.1),transparent_50%)]" />
          <div className="max-w-2xl space-y-6 relative">
            <h2 className="font-display text-3xl font-bold tracking-tight">How it works</h2>
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                1. <strong>Sign Up:</strong> Join our affiliate program in under 2 minutes through our partner portal.
              </p>
              <p>
                2. <strong>Promote:</strong> Share your unique affiliate link on your blog, social media networks, or directly with real estate agents.
              </p>
              <p>
                3. <strong>Earn:</strong> Earn a 30% recurring monthly commission on every subscription created through your link.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
