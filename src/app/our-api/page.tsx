"use client";

import React from "react";
import { Terminal, Shield, Zap, Code } from "lucide-react";

export default function ApiPage() {
  const apis = [
    {
      icon: <Terminal className="h-6 w-6 text-accent" />,
      title: "Simple JSON API",
      description: "Trigger virtual staging with a simple HTTP POST request. Connect raw storage uploads directly into our API workflow.",
    },
    {
      icon: <Zap className="h-6 w-6 text-accent" />,
      title: "Sub-15s Generation",
      description: "Engineered for speed. Receive fully furnished staged room outputs via webhook notifications in under 15 seconds.",
    },
    {
      icon: <Code className="h-6 w-6 text-accent" />,
      title: "Comprehensive Styling Catalog",
      description: "Programmatically specify room type categories and design style parameters (Modern, Scandinavian, etc.).",
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Secure & Scalable",
      description: "Robust architecture with OAuth key authentication, rate limits configuration, and high concurrency support.",
    },
  ];

  return (
    <div className="bg-slate-50 py-20 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Virtual Staging Developer API
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Integrate virtual home staging directly into your real estate website, CRM, mobile app, or print workflow.
          </p>
          <div className="pt-4">
            <button
              onClick={() => alert("API developer registration form (Mock)")}
              className="rounded-full bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 shadow-lg shadow-orange-500/20 transition-all text-base"
            >
              Get Developer API Key
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {apis.map((api, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-8 flex gap-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 flex-shrink-0">
                {api.icon}
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-primary">{api.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{api.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* API Code Snippet example */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-primary text-center">Staging Request Example</h3>
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 overflow-x-auto text-sm text-slate-300 font-mono shadow-xl">
            <pre>{`curl -X POST "https://api.virtualstagingai.app/v1/stage" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image_url": "https://yourbucket.com/photos/empty-living-room.jpg",
    "room_type": "living-room",
    "style": "scandinavian",
    "furniture_removal": false
  }'`}</pre>
          </div>
        </div>

      </div>
    </div>
  );
}
