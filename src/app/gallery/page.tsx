"use client";

import React, { useState } from "react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

// Staged gallery items mapping (using our downloaded assets hashes)
const GALLERY_ITEMS = [
  {
    id: 1,
    room: "living-room",
    roomName: "Living Room",
    style: "scandinavian",
    styleName: "Scandinavian",
    beforeHash: "33d43674",
    afterHash: "9495b32c",
  },
  {
    id: 2,
    room: "bedroom",
    roomName: "Bedroom",
    style: "modern",
    styleName: "Modern",
    beforeHash: "cd1cbaa3",
    afterHash: "716537fd",
  },
  {
    id: 3,
    room: "kitchen",
    roomName: "Kitchen",
    style: "luxury",
    styleName: "Luxury",
    beforeHash: "10abcb2a",
    afterHash: "292527e2",
  },
  {
    id: 4,
    room: "dining-room",
    roomName: "Dining Room",
    style: "farmhouse",
    styleName: "Farmhouse",
    beforeHash: "933e30f9",
    afterHash: "935c1ba2",
  },
  {
    id: 5,
    room: "home-office",
    roomName: "Home Office",
    style: "midcentury",
    styleName: "Midcentury",
    beforeHash: "16f9d753",
    afterHash: "1f60a9b5",
  },
  {
    id: 6,
    room: "outdoor",
    roomName: "Outdoor",
    style: "modern",
    styleName: "Modern",
    beforeHash: "d1b88590",
    afterHash: "2731bda0",
  },
  {
    id: 7,
    room: "living-room",
    roomName: "Living Room",
    style: "luxury",
    styleName: "Luxury",
    beforeHash: "33d43674",
    afterHash: "ec21bc78",
  },
  {
    id: 8,
    room: "bedroom",
    roomName: "Bedroom",
    style: "coastal",
    styleName: "Coastal",
    beforeHash: "cd1cbaa3",
    afterHash: "9c00805f",
  },
  {
    id: 9,
    room: "kitchen",
    roomName: "Kitchen",
    style: "modern",
    styleName: "Modern",
    beforeHash: "10abcb2a",
    afterHash: "059f756d",
  },
  {
    id: 10,
    room: "dining-room",
    roomName: "Dining Room",
    style: "scandinavian",
    styleName: "Scandinavian",
    beforeHash: "933e30f9",
    afterHash: "b55af28f",
  },
  {
    id: 11,
    room: "home-office",
    roomName: "Home Office",
    style: "scandinavian",
    styleName: "Scandinavian",
    beforeHash: "16f9d753",
    afterHash: "ff6268b7",
  },
  {
    id: 12,
    room: "outdoor",
    roomName: "Outdoor",
    style: "coastal",
    styleName: "Coastal",
    beforeHash: "d1b88590",
    afterHash: "1a55c69a",
  },
];

const ROOM_FILTERS = [
  { id: "all", name: "All Rooms" },
  { id: "living-room", name: "Living Room" },
  { id: "bedroom", name: "Bedroom" },
  { id: "kitchen", name: "Kitchen" },
  { id: "dining-room", name: "Dining Room" },
  { id: "home-office", name: "Home Office" },
  { id: "outdoor", name: "Outdoor" },
];

const STYLE_FILTERS = [
  { id: "all", name: "All Styles" },
  { id: "modern", name: "Modern" },
  { id: "scandinavian", name: "Scandinavian" },
  { id: "luxury", name: "Luxury" },
  { id: "midcentury", name: "Midcentury" },
  { id: "coastal", name: "Coastal" },
  { id: "farmhouse", name: "Farmhouse" },
];

export default function GalleryPage() {
  const [selectedRoom, setSelectedRoom] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    const matchesRoom = selectedRoom === "all" || item.room === selectedRoom;
    const matchesStyle = selectedStyle === "all" || item.style === selectedStyle;
    return matchesRoom && matchesStyle;
  });

  return (
    <div className="bg-slate-50 py-16 sm:py-20 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Before & After Gallery
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Browse through real listings transformed using our staging AI. Filter by room and design style to find inspiration.
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          {/* Room Filter Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 sm:w-20">
              Rooms:
            </span>
            <div className="flex flex-wrap gap-2">
              {ROOM_FILTERS.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all shadow-sm ${
                    selectedRoom === room.id
                      ? "bg-primary text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>
          </div>

          {/* Style Filter Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 sm:w-20">
              Styles:
            </span>
            <div className="flex flex-wrap gap-2">
              {STYLE_FILTERS.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all shadow-sm ${
                    selectedStyle === style.id
                      ? "bg-accent text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Masonry Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-lg transition-all space-y-4"
              >
                <BeforeAfterSlider
                  beforeImage={`/demo/${item.room}-empty.${item.beforeHash}.webp`}
                  afterImage={`/demo/${item.room}-${item.style}.${item.afterHash}.webp`}
                  beforeLabel="Empty"
                  afterLabel={item.styleName}
                  aspectRatio="aspect-[4/3]"
                />
                <div className="flex items-center justify-between px-1">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{item.roomName}</h3>
                    <p className="text-xs text-slate-400 font-medium">Staging: {item.styleName}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                    15s Render
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <p className="text-slate-400 text-lg font-semibold">No combinations found</p>
            <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
              Try adjusting your filter settings to see more virtual staging gallery images.
            </p>
            <button
              onClick={() => {
                setSelectedRoom("all");
                setSelectedStyle("all");
              }}
              className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-bold px-4 py-2.5 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
