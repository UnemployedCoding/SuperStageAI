"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import LogoIcon from "@/components/LogoIcon";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoIcon size={32} />
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Stage<span className="text-accent">Lumen</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Transform empty rooms into fully-furnished spaces in seconds. Affordable, beautiful virtual staging designed for real estate professionals.
            </p>

          </div>

          {/* Column 2: Product links */}
          <div className="col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Product</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
              </li>
              <li>
                <Link href="/prices" className="hover:text-white transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Business links */}
          <div className="col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Business</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/affiliate" className="hover:text-white transition-colors">Affiliates</Link>
              </li>
              <li>
                <Link href="/whitelabel" className="hover:text-white transition-colors">White Label</Link>
              </li>
              <li>
                <Link href="/our-api" className="hover:text-white transition-colors">API Access</Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Careers</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Stay Updated</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Get the latest updates on staging styles and features.
            </p>
            {subscribed ? (
              <div className="rounded-xl bg-slate-900 border border-emerald-950 px-4 py-3 text-emerald-400 text-sm font-medium">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-accent hover:bg-accent-hover px-4 py-2.5 text-white shadow-lg transition-colors flex items-center justify-center"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom footer bar */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} StageLumen. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>

          </div>
        </div>
      </div>
    </footer>
  );
}
