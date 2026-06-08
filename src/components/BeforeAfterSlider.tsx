"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [progress, setProgress] = useState(0);

  const hasDropdowns = onRoomChange && onStyleChange && rooms && styles && selectedRoom && selectedStyle;

  // Track latest reactive values via refs to avoid re-creating the auto-cycle interval
  const selectedRoomRef = useRef(selectedRoom);
  const selectedStyleRef = useRef(selectedStyle);
  const onRoomChangeRef = useRef(onRoomChange);
  const onStyleChangeRef = useRef(onStyleChange);

  useEffect(() => {
    selectedRoomRef.current = selectedRoom;
    selectedStyleRef.current = selectedStyle;
    onRoomChangeRef.current = onRoomChange;
    onStyleChangeRef.current = onStyleChange;
  }, [selectedRoom, selectedStyle, onRoomChange, onStyleChange]);

  // Auto-cycle room type and design style with synchronized progress indicators
  useEffect(() => {
    if (!hasDropdowns) return;

    const tickTime = 50; // ms for ultra-smooth progress rendering
    const duration = 4000; // 4 seconds per transition phase (empty -> staged or staged -> empty)
    const increment = (tickTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + increment;
        if (nextProgress >= 100) {
          // Trigger transition when progress reaches 100%
          setShowStaged((currentStaged) => {
            const nextStaged = !currentStaged;
            if (nextStaged) {
              // Fading in Staged image: transition to next design style
              if (styles && selectedStyleRef.current && onStyleChangeRef.current) {
                const currentIndex = styles.findIndex((s) => s.id === selectedStyleRef.current);
                const nextIndex = (currentIndex + 1) % styles.length;
                onStyleChangeRef.current(styles[nextIndex].id);
              }
            } else {
              // Fading in Empty image: transition to next room type
              if (rooms && selectedRoomRef.current && onRoomChangeRef.current) {
                const currentIndex = rooms.findIndex((r) => r.id === selectedRoomRef.current);
                const nextIndex = (currentIndex + 1) % rooms.length;
                onRoomChangeRef.current(rooms[nextIndex].id);
              }
            }
            return nextStaged;
          });
          return 0;
        }
        return nextProgress;
      });
    }, tickTime);

    return () => clearInterval(timer);
  }, [hasDropdowns, rooms, styles]);

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
          <div className="relative inline-flex items-center rounded-full bg-slate-200/60 backdrop-blur-sm px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 shadow-md border border-slate-100/30 cursor-pointer overflow-hidden transition-colors hover:bg-slate-200/80">
            {/* Progress Bar Background */}
            <div
              className="absolute inset-y-0 left-0 bg-white/90 -z-10 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
            <select
              value={selectedRoom}
              onChange={(e) => {
                onRoomChange(e.target.value);
                setProgress(0);
                setShowStaged(false);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
            <span className="relative z-10 mr-1.5 text-slate-800">{rooms.find((r) => r.id === selectedRoom)?.name}</span>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 h-3.5 w-3.5 text-slate-600" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path></svg>
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
          <div className="relative inline-flex items-center rounded-full bg-slate-200/60 backdrop-blur-sm px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 shadow-md border border-slate-100/30 cursor-pointer overflow-hidden transition-colors hover:bg-slate-200/80">
            {/* Progress Bar Background */}
            <div
              className="absolute inset-y-0 left-0 bg-white/90 -z-10 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
            <select
              value={selectedStyle}
              onChange={(e) => {
                onStyleChange(e.target.value);
                setProgress(0);
                setShowStaged(false);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            >
              {styles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
            <span className="relative z-10 mr-1.5 text-slate-800">{styles.find((s) => s.id === selectedStyle)?.name}</span>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 h-3.5 w-3.5 text-slate-600" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path></svg>
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
