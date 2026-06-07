import { useState, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Upload, Loader2, Sparkles, RotateCcw } from "lucide-react";
import { stageImage } from "@/lib/stage-image.functions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import emptyLiving from "@/assets/empty-living.jpg";
import stagedLiving from "@/assets/staged-living.jpg";

const ROOM_TYPES = ["Living Room", "Bedroom", "Dining Room", "Kitchen", "Home Office", "Bathroom"];
const STYLES = ["Modern", "Scandinavian", "Industrial", "Mid-Century", "Coastal", "Minimalist"];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export function StagingApp() {
  const stage = useServerFn(stageImage);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [room, setRoom] = useState(ROOM_TYPES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState(50);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB");
      return;
    }
    const b64 = await fileToBase64(file);
    setPreview(b64);
    setResult(null);
  };

  const handleStage = async () => {
    if (!preview) return;
    setLoading(true);
    setResult(null);
    try {
      const { dataUrl } = await stage({ data: { imageBase64: preview, roomType: room, style } });
      setResult(dataUrl);
      setSlider(50);
      toast.success("Staging complete");
    } catch (e) {
      console.error(e);
      toast.error("Staging failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPreview(null);
    setResult(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <section id="app" className="border-t border-border bg-card/30 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            Try it free
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Stage your photo in seconds
          </h2>
          <p className="mt-3 text-muted-foreground">No sign up · No credit card</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Image area */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-glow)]">
            {!preview ? (
              <label
                htmlFor="file-input"
                className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-4 p-10 text-center transition hover:bg-muted/30"
              >
                <div className="rounded-full bg-primary/15 p-5">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Upload a photo of an empty room</p>
                  <p className="mt-1 text-sm text-muted-foreground">JPG or PNG, up to 10MB</p>
                </div>
                <input
                  ref={fileRef}
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </label>
            ) : result ? (
              <div className="relative aspect-[4/3] select-none overflow-hidden">
                <img src={preview} alt="Before" className="absolute inset-0 h-full w-full object-cover" />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
                >
                  <img src={result} alt="After" className="h-full w-full object-cover" />
                </div>
                <div
                  className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-lg"
                  style={{ left: `${slider}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={slider}
                  onChange={(e) => setSlider(Number(e.target.value))}
                  className="absolute inset-x-0 bottom-0 z-10 w-full cursor-ew-resize opacity-0"
                  style={{ height: "100%" }}
                />
                <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-1 text-xs text-white">Before</span>
                <span className="absolute right-3 top-3 rounded bg-primary px-2 py-1 text-xs text-white">After</span>
              </div>
            ) : (
              <div className="relative aspect-[4/3]">
                <img src={preview} alt="Your room" className="h-full w-full object-cover" />
                {loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Staging your room… (10–30s)</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Room type</label>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {ROOM_TYPES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Design style</label>
              <div className="grid grid-cols-2 gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`rounded-lg border px-3 py-2 text-sm transition ${
                      style === s
                        ? "border-primary bg-primary/15 text-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <Button
              onClick={handleStage}
              disabled={!preview || loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Staging…</>
              ) : (
                <><Sparkles className="mr-2 h-4 w-4" />Stage this room</>
              )}
            </Button>
            {preview && (
              <Button onClick={reset} variant="outline" className="w-full">
                <RotateCcw className="mr-2 h-4 w-4" />Upload different photo
              </Button>
            )}
            {result && (
              <a
                href={result}
                download="staged.jpg"
                className="block w-full rounded-md border border-border bg-background py-2 text-center text-sm font-medium hover:bg-muted"
              >
                Download staged image
              </a>
            )}
            <p className="text-xs text-muted-foreground">
              Powered by Replicate · FLUX Kontext Pro
            </p>
          </div>
        </div>

        {/* Demo before/after fallback when nothing uploaded */}
        {!preview && (
          <div className="mt-8 grid grid-cols-2 gap-4 opacity-70">
            <figure>
              <img src={emptyLiving} alt="Empty room example" loading="lazy" className="rounded-xl border border-border" />
              <figcaption className="mt-2 text-center text-xs text-muted-foreground">Before</figcaption>
            </figure>
            <figure>
              <img src={stagedLiving} alt="Staged room example" loading="lazy" className="rounded-xl border border-border" />
              <figcaption className="mt-2 text-center text-xs text-muted-foreground">After</figcaption>
            </figure>
          </div>
        )}
      </div>
    </section>
  );
}