"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// ─── Constants ─────────────────────────────────────────────────────────────────

const STYLE_DURATION = 3000; // 3 s per style (matches reference)
const PAUSE_AFTER_CLICK = 10000; // 10 s pause after user interaction
const TICK = 50;

// ─── Data ──────────────────────────────────────────────────────────────────────

const ROOM_TABS = [
  { id: "living-room", label: "Living Room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "kitchen", label: "Kitchen" },
  { id: "home-office", label: "Home Office" },
  { id: "dining-room", label: "Dining Room" },
  { id: "outdoor", label: "Outdoor" },
];

const STYLE_KEYS = ["original", "modern", "scandinavian", "luxury", "midcentury", "coastal", "farmhouse"] as const;
type StyleKey = typeof STYLE_KEYS[number];

const STYLE_LABELS: Record<StyleKey, string> = {
  original: "Original",
  modern: "Modern",
  scandinavian: "Scandinavian",
  luxury: "Luxury",
  midcentury: "Midcentury",
  coastal: "Coastal",
  farmhouse: "Farmhouse",
};

const ASSET_HASHES: Record<string, string> = {
  "bedroom-empty": "cd1cbaa3",
  "bedroom-modern": "716537fd",
  "bedroom-scandinavian": "a97964fa",
  "bedroom-midcentury": "e83bb0c5",
  "bedroom-luxury": "1e82d7ed",
  "bedroom-coastal": "9c00805f",
  "bedroom-farmhouse": "b560a658",
  "living-room-empty": "33d43674",
  "living-room-modern": "c831fe91",
  "living-room-scandinavian": "9495b32c",
  "living-room-midcentury": "96596aa7",
  "living-room-luxury": "ec21bc78",
  "living-room-coastal": "23757a09",
  "living-room-farmhouse": "ebf3b249",
  "kitchen-empty": "10abcb2a",
  "kitchen-modern": "059f756d",
  "kitchen-scandinavian": "0573aa31",
  "kitchen-midcentury": "26718de3",
  "kitchen-luxury": "292527e2",
  "kitchen-coastal": "8bbdbd89",
  "kitchen-farmhouse": "8788a857",
  "home-office-empty": "16f9d753",
  "home-office-modern": "30953252",
  "home-office-scandinavian": "ff6268b7",
  "home-office-midcentury": "1f60a9b5",
  "home-office-luxury": "dad8bea5",
  "home-office-coastal": "00c7ed28",
  "home-office-farmhouse": "599a72b9",
  "dining-room-empty": "933e30f9",
  "dining-room-modern": "605d88d7",
  "dining-room-scandinavian": "b55af28f",
  "dining-room-midcentury": "0fb0f1a4",
  "dining-room-luxury": "5d7a88ef",
  "dining-room-coastal": "4eef98ee",
  "dining-room-farmhouse": "935c1ba2",
  "outdoor-empty": "d1b88590",
  "outdoor-modern": "2731bda0",
  "outdoor-scandinavian": "98b14dcf",
  "outdoor-midcentury": "abf299ea",
  "outdoor-luxury": "d0409e92",
  "outdoor-coastal": "1a55c69a",
  "outdoor-farmhouse": "b662720d",
};

function imgPath(room: string, style: StyleKey) {
  const key = style === "original" ? `${room}-empty` : `${room}-${style}`;
  return `/demo/${key}.${ASSET_HASHES[key]}.webp`;
}

// Each "slide" = one room with its style images
const SLIDES = ROOM_TABS.map((room) => ({
  roomId: room.id,
  label: room.label,
  // "original" is first so the cycle starts with the empty room
  styles: (["original", "modern", "scandinavian", "luxury", "midcentury", "coastal", "farmhouse"] as StyleKey[]),
  originalSrc: imgPath(room.id, "original"),
  images: Object.fromEntries(
    (["modern", "scandinavian", "luxury", "midcentury", "coastal", "farmhouse"] as StyleKey[]).map((s) => [
      s,
      imgPath(room.id, s),
    ])
  ) as Record<string, string>,
}));

// ─── Style Pill Button ─────────────────────────────────────────────────────────
// Matches reference exactly: active+playing gets a white fill progress bar

function StyleButton({
  label,
  isSelected,
  isPlaying,
  progress, // 0–100
  onClick,
}: {
  label: string;
  isSelected: boolean;
  isPlaying: boolean;
  progress: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative flex overflow-hidden rounded-lg px-5 py-2 text-sm font-semibold capitalize",
        "backdrop-blur transition-colors duration-150",
        isSelected
          ? isPlaying
            ? "bg-white/60 text-slate-900"
            : "bg-white text-slate-900"
          : "bg-[#1b2034]/70 text-white hover:bg-white/80 hover:text-slate-900",
      ].join(" ")}
    >
      {label}
      {/* Progress fill — matches reference (white/60 overlay fills left→right) */}
      {isSelected && isPlaying && (
        <span
          className="absolute left-0 top-0 z-[-1] h-full bg-white/60 transition-none"
          style={{ width: `${progress}%` }}
        />
      )}
    </button>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [slideIndex, setSlideIndex] = useState(0);   // which room (thumbnail)
  const [styleIndex, setStyleIndex] = useState(0);   // which style (0 = first non-original style)
  const [progress, setProgress] = useState(0);       // 0–100
  const [isPlaying, setIsPlaying] = useState(true);

  const thumbsRef = useRef<HTMLDivElement>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef(Date.now());

  const slide = SLIDES[slideIndex];
  const styleKeys = slide.styles; // e.g. ["modern", "scandinavian", ...]
  const activeStyleKey = styleKeys[styleIndex] ?? styleKeys[0];
  const activeImageSrc = slide.images[activeStyleKey];

  // ── Resume after pause ──
  const resumeAfterDelay = useCallback(() => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    setIsPlaying(false);
    pauseTimerRef.current = setTimeout(() => {
      setIsPlaying(true);
      startTimeRef.current = Date.now();
    }, PAUSE_AFTER_CLICK);
  }, []);

  // ── Auto-cycle timer ──
  useEffect(() => {
    if (!isPlaying) return;

    startTimeRef.current = Date.now();
    setProgress(0);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / STYLE_DURATION) * 100);
      setProgress(pct);

      if (elapsed >= STYLE_DURATION) {
        // Advance style; wrap to next slide when all styles done
        setStyleIndex((prev) => {
          const next = (prev + 1) % styleKeys.length;
          if (next === 0) {
            setSlideIndex((s) => (s + 1) % SLIDES.length);
          }
          return next;
        });
        startTimeRef.current = Date.now();
        setProgress(0);
      }
    }, TICK);

    return () => clearInterval(interval);
  }, [isPlaying, styleKeys.length]);

  // ── Scroll active thumbnail into view ──
  useEffect(() => {
    const el = thumbsRef.current?.children[slideIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [slideIndex]);

  // ── Handlers ──
  const handleStyleClick = (idx: number) => {
    setStyleIndex(idx);
    setProgress(0);
    resumeAfterDelay();
  };

  const handleThumbClick = (idx: number) => {
    setSlideIndex(idx);
    setStyleIndex(0);
    setProgress(0);
    resumeAfterDelay();
  };

  const handleRoomTab = (idx: number) => {
    setSlideIndex(idx);
    setStyleIndex(0);
    setProgress(0);
    resumeAfterDelay();
  };

  return (
    <div className="bg-[#1b2034] min-h-screen text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">

        {/* ── Heading ── */}
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            <b>See the Transformation:</b>{" "}Before &amp; After Gallery
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            See how Virtual Staging AI transforms unappealing spaces into attractive,{" "}
            <b className="text-white">listing-ready homes in seconds.</b>
          </p>
        </div>

        {/* ── Room Tabs ── */}
        <div className="mb-5 overflow-hidden">
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {SLIDES.map((s, i) => (
              <button
                key={s.roomId}
                onClick={() => handleRoomTab(i)}
                className={[
                  "whitespace-nowrap rounded-xl border-2 border-[#2e4a8c] px-3 py-2 text-sm font-semibold md:px-6 md:py-3 md:text-base transition-colors",
                  i === slideIndex ? "bg-white text-[#1b2034]" : "bg-[#2e4a8c] text-white hover:bg-white/20",
                ].join(" ")}
              >
                {s.label}s
              </button>
            ))}
          </div>
        </div>

        {/* ── Main Image + Style Pills ── */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          {/* Base (original) image */}
          <Image
            src={slide.originalSrc}
            alt={`Empty ${slide.label}`}
            width={1080}
            height={720}
            sizes="(max-width: 1024px) 100vw, 1080px"
            priority
            className="w-full h-auto object-cover"
          />

          {/* Styled image overlay — hidden for 'original', visible for staged styles */}
          <div className="absolute inset-0">
            {styleKeys.map((styleKey, i) => (
              <div
                key={styleKey}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === styleIndex && styleKey !== "original" ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={slide.images[styleKey]}
                  alt={`${slide.label} ${styleKey}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1080px"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* Room label badge (top-left) */}
          <div className="absolute left-2 top-2 md:left-4 md:top-4 z-10">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase text-slate-800 shadow-lg">
              {slide.label}
            </span>
          </div>

          {/* Style pill buttons (bottom-right) */}
          <div className="absolute inset-x-2 bottom-2 md:inset-x-4 md:bottom-4 z-10">
            <div className="flex justify-end gap-2 flex-wrap">
              {styleKeys.map((styleKey, i) => (
                <StyleButton
                  key={styleKey}
                  label={STYLE_LABELS[styleKey]}
                  isSelected={i === styleIndex}
                  isPlaying={isPlaying}
                  progress={progress}
                  onClick={() => handleStyleClick(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Thumbnail Strip ── */}
        <div className="mt-4 overflow-hidden">
          <div ref={thumbsRef} className="-ml-4 flex overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {SLIDES.map((s, i) => {
              const isActive = i === slideIndex;
              return (
                <div
                  key={s.roomId}
                  onClick={() => handleThumbClick(i)}
                  className="relative ml-4 min-w-0 shrink-0 cursor-pointer transition-all duration-75"
                >
                  <div
                    className={[
                      "h-[72px] overflow-hidden rounded-xl border-2 my-2",
                      isActive
                        ? "border-blue-500 shadow-[0_0_0_8px_rgba(59,130,246,0.15)]"
                        : "border-slate-600/50 opacity-60 hover:opacity-100 hover:border-slate-400",
                    ].join(" ")}
                  >
                    <Image
                      src={s.originalSrc}
                      alt={s.label}
                      width={120}
                      height={72}
                      className="h-full w-full object-cover"
                      sizes="120px"
                    />
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
