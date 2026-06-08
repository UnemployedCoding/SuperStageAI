"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  aspectRatio?: string;
  interval?: number; // auto-fade timer interval, default 3000ms
  
  // Optional Dropdown Selectors (for interactive hero)
  selectedRoom?: string;
  selectedStyle?: string;
  rooms?: Array<{ id: string; name: string }>;
  styles?: Array<{ id: string; name: string }>;
  onRoomChange?: (room: string) => void;
  onStyleChange?: (style: string) => void;

  // Optional Static Labels (for gallery cards)
  staticRoomLabel?: string;
  staticStyleLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  aspectRatio = "aspect-video",
  interval = 3000,
  selectedRoom,
  selectedStyle,
  rooms,
  styles,
  onRoomChange,
  onStyleChange,
  staticRoomLabel,
  staticStyleLabel,
}: BeforeAfterSliderProps) {
  const [showStaged, setShowStaged] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowStaged((prev) => !prev);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, beforeImage, afterImage]);

  // Reset staging state to empty when the images change (e.g. user selects a new room)
  useEffect(() => {
    setShowStaged(false);
  }, [beforeImage, afterImage]);

  const hasDropdowns = onRoomChange && onStyleChange && rooms && styles && selectedRoom && selectedStyle;

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl shadow-xl border border-slate-100 ${aspectRatio}`}>
      
      {/* Before Image (Base layer) */}
      <div className="absolute inset-0">
        <Image
          src={beforeImage}
          alt="Empty space"
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
          className="object-cover"
        />
      </div>

      {/* After Image (Fade overlay) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          showStaged ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={afterImage}
          alt="Staged space"
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
          className="object-cover"
        />
      </div>

      {/* Top-left: Staging status indicator badge */}
      <div className="absolute top-4 left-4 z-10 rounded-full bg-slate-900/60 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white select-none pointer-events-none transition-colors duration-300">
        {showStaged ? "Staged" : "Empty"}
      </div>

      {/* Bottom-left: Room Selector (or Static Room Label) */}
      <div className="absolute bottom-4 left-4 z-20">
        {hasDropdowns ? (
          <div className="relative inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 shadow-md border border-slate-100/50 hover:bg-white transition-colors cursor-pointer">
            <select
              value={selectedRoom}
              onChange={(e) => onRoomChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
            <span className="mr-1.5">{rooms.find((r) => r.id === selectedRoom)?.name}</span>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </div>
        ) : (
          staticRoomLabel && (
            <div className="rounded-full bg-slate-900/60 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-white uppercase tracking-wider select-none pointer-events-none">
              {staticRoomLabel}
            </div>
          )
        )}
      </div>

      {/* Bottom-right: Style Selector (or Static Style Label) */}
      <div className="absolute bottom-4 right-4 z-20">
        {hasDropdowns ? (
          <div className="relative inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 shadow-md border border-slate-100/50 hover:bg-white transition-colors cursor-pointer">
            <select
              value={selectedStyle}
              onChange={(e) => onStyleChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
              {styles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
            <span className="mr-1.5">{styles.find((s) => s.id === selectedStyle)?.name}</span>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </div>
        ) : (
          staticStyleLabel && (
            <div className="rounded-full bg-white/90 backdrop-blur-sm px-4 py-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider select-none pointer-events-none">
              {staticStyleLabel}
            </div>
          )
        )}
      </div>

    </div>
  );
}
