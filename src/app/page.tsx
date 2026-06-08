"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Upload,
  Check,
  X,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Clock,
  Coins,
  Shield,
  TrendingUp,
  Percent,
  Smile,
} from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

// Room & Style assets mapping
const ROOM_TYPES = [
  { id: "living-room", name: "Living Room" },
  { id: "bedroom", name: "Bedroom" },
  { id: "kitchen", name: "Kitchen" },
  { id: "dining-room", name: "Dining Room" },
  { id: "home-office", name: "Home Office" },
  { id: "outdoor", name: "Outdoor" },
];

const STYLES = [
  { id: "modern", name: "Modern" },
  { id: "scandinavian", name: "Scandinavian" },
  { id: "luxury", name: "Luxury" },
  { id: "midcentury", name: "Midcentury" },
  { id: "coastal", name: "Coastal" },
  { id: "farmhouse", name: "Farmhouse" },
];

// Hash names from downloaded files
const ASSET_HASHES: Record<string, string> = {
  // Bedroom
  "bedroom-empty": "cd1cbaa3",
  "bedroom-modern": "716537fd",
  "bedroom-scandinavian": "a97964fa",
  "bedroom-midcentury": "e83bb0c5",
  "bedroom-luxury": "1e82d7ed",
  "bedroom-coastal": "9c00805f",
  "bedroom-farmhouse": "b560a658",
  // Living Room
  "living-room-empty": "33d43674",
  "living-room-modern": "c831fe91",
  "living-room-scandinavian": "9495b32c",
  "living-room-midcentury": "96596aa7",
  "living-room-luxury": "ec21bc78",
  "living-room-coastal": "23757a09",
  "living-room-farmhouse": "ebf3b249",
  // Kitchen
  "kitchen-empty": "10abcb2a",
  "kitchen-modern": "059f756d",
  "kitchen-scandinavian": "0573aa31",
  "kitchen-midcentury": "26718de3",
  "kitchen-luxury": "292527e2",
  "kitchen-coastal": "8bbdbd89",
  "kitchen-farmhouse": "8788a857",
  // Home Office
  "home-office-empty": "16f9d753",
  "home-office-modern": "30953252",
  "home-office-scandinavian": "ff6268b7",
  "home-office-midcentury": "1f60a9b5",
  "home-office-luxury": "dad8bea5",
  "home-office-coastal": "00c7ed28",
  "home-office-farmhouse": "599a72b9",
  // Dining Room
  "dining-room-empty": "933e30f9",
  "dining-room-modern": "605d88d7",
  "dining-room-scandinavian": "b55af28f",
  "dining-room-midcentury": "0fb0f1a4",
  "dining-room-luxury": "5d7a88ef",
  "dining-room-coastal": "4eef98ee",
  "dining-room-farmhouse": "935c1ba2",
  // Outdoor
  "outdoor-empty": "d1b88590",
  "outdoor-modern": "2731bda0",
  "outdoor-scandinavian": "98b14dcf",
  "outdoor-midcentury": "abf299ea",
  "outdoor-luxury": "d0409e92",
  "outdoor-coastal": "1a55c69a",
  "outdoor-farmhouse": "b662720d",
};

function getImagePath(room: string, style: string, isEmpty = false): string {
  const key = isEmpty ? `${room}-empty` : `${room}-${style}`;
  const hash = ASSET_HASHES[key];
  return `/demo/${key}.${hash}.webp`;
}

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState("living-room");
  const [selectedStyle, setSelectedStyle] = useState("modern");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How long does virtual staging take?",
      a: "Our advanced AI stages your images in under 15 seconds. Simply upload, choose a style, and your photo is ready immediately.",
    },
    {
      q: "Can I remove existing furniture from a photo?",
      a: "Yes! Our dashboard features a powerful furniture removal toggle. The AI clears out existing furniture and replaces it with your chosen staging style.",
    },
    {
      q: "Who owns the rights to the staged images?",
      a: "You do. You retain full ownership and usage rights of all raw uploads and AI-staged images generated through our platform.",
    },
    {
      q: "Which staging styles are available?",
      a: "We support over 50 design styles, including Modern, Scandinavian, Luxury, Midcentury, Coastal, Farmhouse, and Industrial.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes! You can upload a photo and preview the virtual staging result completely for free. No credit card or sign up is required to try it out.",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden bg-slate-50 py-20 lg:py-28">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Headline text */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1.5 text-xs font-semibold text-accent border border-orange-100/50">
                <Sparkles className="h-3.5 w-3.5 fill-current" />
                Next Generation Staging AI
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-primary leading-[1.15]">
                Virtual Staging <br />
                <span className="bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent">
                  with one click
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Upload a picture of an empty room and our AI will add realistic furniture within seconds. Starting at just $16/month.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Link
                  href="/login?signUp=true"
                  className="rounded-full bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 shadow-xl shadow-orange-500/20 transition-all hover:shadow-orange-500/30 flex items-center justify-center gap-2 group text-base"
                >
                  Upload image for free
                  <Upload className="h-4.5 w-4.5 transition-transform group-hover:translate-y-[-2px]" />
                </Link>
              </div>

              <p className="text-xs text-slate-500 font-medium tracking-wide">
                NO SIGN UP REQUIRED &bull; NO CREDIT CARD
              </p>
            </div>

            {/* Right: Interactive room demo carousel */}
            <div className="lg:col-span-7">
              <BeforeAfterSlider
                beforeImage={getImagePath(selectedRoom, selectedStyle, true)}
                afterImage={getImagePath(selectedRoom, selectedStyle)}
                aspectRatio="aspect-[4/3] sm:aspect-video"
                selectedRoom={selectedRoom}
                selectedStyle={selectedStyle}
                rooms={ROOM_TYPES}
                styles={STYLES}
                onRoomChange={setSelectedRoom}
                onStyleChange={setSelectedStyle}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Bar Section */}
      <section className="w-full bg-white border-y border-slate-100 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center items-center">
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">Under 15s</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Turnaround Time</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">$1 / image</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Average Cost</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">50+</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Design Styles</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">100%</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Realistic Staging</p>
            </div>
            <div className="col-span-2 md:col-span-1 space-y-1 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">10k+</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Happy Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Press Logos Section */}
      <section className="w-full bg-slate-50/50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Featured In & Trusted By</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-50 grayscale hover:opacity-75 transition-opacity">
            <Image src="/demo/housingwire.png" alt="Housing Wire" width={140} height={35} className="h-8 object-contain" />
            <Image src="/demo/realtor-magazine.png" alt="Realtor Magazine" width={140} height={35} className="h-8 object-contain" />
            <Image src="/demo/inman.png" alt="Inman" width={120} height={30} className="h-6 object-contain" />
            <Image src="/demo/techcrunch.png" alt="Tech Crunch" width={140} height={35} className="h-7 object-contain" />
          </div>
        </div>
      </section>

      {/* 4. Features / Value Props Section */}
      <section className="w-full py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              Why Real Estate Pros Choose Staging AI
            </h2>
            <p className="text-slate-600 text-base">
              Traditional staging is slow and costs thousands. Our AI provides an instant, premium alternative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Card 1 */}
            <div className="rounded-2xl border border-slate-100 p-8 space-y-5 shadow-sm hover:shadow-md transition-shadow">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent">
                <TrendingUp className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-bold text-primary">Maximize Buyer Interest</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Over 83% of buyers' agents say virtual staging makes it easier for buyers to visualize the property as their future home.
              </p>
            </div>
            {/* Card 2 */}
            <div className="rounded-2xl border border-slate-100 p-8 space-y-5 shadow-sm hover:shadow-md transition-shadow">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent">
                <Clock className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-bold text-primary">Faster Listing Speeds</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Upload raw photo listings and receive fully furnished versions in 15 seconds. Stage and list the exact same day.
              </p>
            </div>
            {/* Card 3 */}
            <div className="rounded-2xl border border-slate-100 p-8 space-y-5 shadow-sm hover:shadow-md transition-shadow">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent">
                <Coins className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-bold text-primary">Save Thousands of Dollars</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Physical staging can cost upwards of $2,000 per property. Virtual Staging AI stages your entire list starting at just $16.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="w-full bg-slate-50 py-20 lg:py-28 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              Staging In 3 Simple Steps
            </h2>
            <p className="text-slate-600 text-base">
              Furnish any listing in seconds with zero learning curve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector lines (Desktop) */}
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[2px] bg-slate-200 -z-10" />

            {/* Step 1 */}
            <div className="space-y-4 flex flex-col items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white font-bold shadow-md shadow-orange-500/20">
                1
              </span>
              <h3 className="text-lg font-bold text-primary pt-2">Upload Room Photo</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                Drag and drop your empty room image (JPG or PNG) directly into our upload zone.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 flex flex-col items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white font-bold shadow-md shadow-orange-500/20">
                2
              </span>
              <h3 className="text-lg font-bold text-primary pt-2">Choose Style & Room Type</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                Select from our design list (Modern, Scandinavian, Coastal, etc.) and define the room category.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 flex flex-col items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white font-bold shadow-md shadow-orange-500/20">
                3
              </span>
              <h3 className="text-lg font-bold text-primary pt-2">Download & Share</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                Preview your staged room using the before/after slider and download in high resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Competitor Comparison Section */}
      <section className="w-full py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              Virtual Staging AI vs. Traditional Methods
            </h2>
            <p className="text-slate-600 text-base">
              A quick look at how automated AI staging outperforms traditional alternatives.
            </p>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-100 shadow-xl">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-950 text-white font-bold text-sm">
                  <th className="px-6 py-4">Feature</th>
                  <th className="px-6 py-4 bg-accent/90">Virtual Staging AI</th>
                  <th className="px-6 py-4 text-slate-400">Traditional Staging</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr>
                  <td className="px-6 py-4 font-semibold text-primary">Cost per listing</td>
                  <td className="px-6 py-4 bg-accent/5 font-semibold text-accent">$1 - $2</td>
                  <td className="px-6 py-4 text-slate-500">$200 - $600</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-primary">Delivery speed</td>
                  <td className="px-6 py-4 bg-accent/5 font-semibold text-accent">Under 15 seconds</td>
                  <td className="px-6 py-4 text-slate-500">2 - 5 business days</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-primary">Revisions</td>
                  <td className="px-6 py-4 bg-accent/5 font-semibold text-accent">Free & Instant</td>
                  <td className="px-6 py-4 text-slate-500">Paid & takes days</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-primary">Furniture types</td>
                  <td className="px-6 py-4 bg-accent/5 font-semibold text-accent">50+ design styles</td>
                  <td className="px-6 py-4 text-slate-500">Limited catalog</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-primary">Setup process</td>
                  <td className="px-6 py-4 bg-accent/5 font-semibold text-accent">Upload on web</td>
                  <td className="px-6 py-4 text-slate-500">Coordination & design call</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. FAQ Accordion Section */}
      <section id="faq" className="w-full bg-slate-50 py-20 lg:py-28 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-base">
              Everything you need to know about our virtual staging platform.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(index)}
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
      </section>

      {/* 8. Final CTA Section */}
      <section className="w-full bg-primary py-24 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(255,101,0,0.15),transparent_60%)] pointer-events-none" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8 relative">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Ready to Stun Your Home Buyers?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Get instant virtual staging for your listings. Try it completely for free with no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Link
              href="/login?signUp=true"
              className="rounded-full bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98] text-base"
            >
              Upload image for free
            </Link>
            <Link
              href="/prices"
              className="rounded-full border border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-900 text-slate-300 font-semibold px-8 py-4 transition-all text-base"
            >
              View Pricing Plans
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm text-slate-400 font-medium pt-4 border-t border-slate-900 max-w-xl mx-auto">
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-accent" />
              15-sec turnaround
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-accent" />
              50+ staging styles
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-accent" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
