import { useRef, useState } from "react";

interface Props {
  before: string;
  after: string;
  label?: string;
}

export function BeforeAfter({ before, after, label }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div
        ref={ref}
        className="relative aspect-[4/3] w-full select-none overflow-hidden"
        onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
        onClick={(e) => move(e.clientX)}
      >
        <img
          src={before}
          alt={`${label ?? "Room"} before`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={after}
            alt={`${label ?? "Room"} after`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-[11px] font-semibold text-foreground shadow">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-primary px-2 py-1 text-[11px] font-semibold text-primary-foreground shadow">
          After
        </span>
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.4)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground shadow-lg">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 6 15 12 9 18" transform="translate(6 0)" />
            </svg>
          </div>
        </div>
      </div>
      {label && (
        <figcaption className="border-t border-border px-4 py-3 text-sm font-semibold text-foreground">
          {label}
        </figcaption>
      )}
    </figure>
  );
}