"use client";

import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string; // e.g. "aspect-video", "aspect-[4/3]", etc.
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  aspectRatio = "aspect-video",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  // Set position on click
  const handleContainerClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none overflow-hidden rounded-2xl shadow-xl border border-slate-100 ${aspectRatio} group cursor-ew-resize`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={handleContainerClick}
    >
      {/* After Image (Full background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage}
          alt="Staged space"
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
          className="object-cover pointer-events-none"
        />
        <div className="absolute right-4 bottom-4 glass px-3 py-1.5 rounded-full text-xs font-semibold text-slate-800 shadow-sm pointer-events-none transition-opacity duration-300 opacity-90 group-hover:opacity-100 uppercase tracking-wider">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Clipped Overlay) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-75"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <Image
          src={beforeImage}
          alt="Empty space"
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
          className="object-cover pointer-events-none"
        />
        <div className="absolute left-4 bottom-4 glass px-3 py-1.5 rounded-full text-xs font-semibold text-slate-800 shadow-sm pointer-events-none transition-opacity duration-300 opacity-90 group-hover:opacity-100 uppercase tracking-wider">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line / Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-lg flex items-center justify-center transition-all duration-75"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Drag Button */}
        <div className="absolute w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-2xl flex items-center justify-center cursor-ew-resize transition-all duration-150 transform hover:scale-105 active:scale-95">
          <svg
            className="w-5 h-5 text-slate-600 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M8 9l-3 3 3 3m8-6l3 3-3 3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
