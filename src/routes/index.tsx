import { createFileRoute } from "@tanstack/react-router";
import { Check, Zap, Wand2, Image as ImageIcon, ArrowRight, Sparkles } from "lucide-react";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { StagingApp } from "@/components/StagingApp";
import emptyLiving from "@/assets/empty-living.jpg";
import stagedLiving from "@/assets/staged-living.jpg";
import stagedBedroom from "@/assets/staged-bedroom.jpg";
import stagedDining from "@/assets/staged-dining.jpg";
import stagedOffice from "@/assets/staged-office.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Virtual Staging AI — Stage rooms in seconds" },
      { name: "description", content: "Upload an empty room and our AI adds beautiful furniture in seconds. Free to try, no signup." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster theme="dark" position="top-center" />
      <Nav />
      <Hero />
      <FeatureBar />
      <StagingApp />
      <Gallery />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          Virtual Staging <span className="text-primary">AI</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#app" className="hover:text-foreground">Try it</a>
          <a href="#gallery" className="hover:text-foreground">Gallery</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden md:inline-flex">Log in</Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Sign up</Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-accent blur-[140px]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Built on the same AI tech the pros use
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Virtual Staging<br />
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              with one click
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Upload a picture and our AI will <span className="font-semibold text-foreground">add furniture within seconds</span>.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#app">
              <Button size="lg" className="h-14 w-full bg-primary px-8 text-base text-primary-foreground hover:bg-primary/90 sm:w-auto">
                Upload image for <span className="ml-1 text-accent">free</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">No sign up · No credit card</p>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border shadow-2xl">
            <div className="grid grid-cols-2">
              <div className="relative">
                <img src={emptyLiving} alt="Empty room before staging" width={1280} height={832} className="h-full w-full object-cover" />
                <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">Before</span>
              </div>
              <div className="relative">
                <img src={stagedLiving} alt="Staged room after AI" width={1280} height={832} className="h-full w-full object-cover" />
                <span className="absolute right-3 top-3 rounded bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">After</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureBar() {
  const items = ["Low cost", "Instant results", "Furniture removal", "50+ design styles", "10,000+ users"];
  return (
    <div className="border-y border-border/50 bg-card/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-around gap-4 px-6 py-5 text-sm">
        {items.map((i) => (
          <span key={i} className="flex items-center gap-2 text-muted-foreground">
            <Check className="h-4 w-4 text-accent" />
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

function Gallery() {
  const items = [
    { src: stagedLiving, label: "Modern Living Room" },
    { src: stagedBedroom, label: "Scandinavian Bedroom" },
    { src: stagedDining, label: "Industrial Dining" },
    { src: stagedOffice, label: "Mid-Century Office" },
  ];
  return (
    <section id="gallery" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 max-w-2xl">
          <span className="text-sm font-medium text-primary">Gallery</span>
          <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            See the transformation
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real estate photos furnished by our AI in seconds across dozens of design styles.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <figure key={it.label} className="group overflow-hidden rounded-xl border border-border bg-card">
              <img src={it.src} alt={it.label} loading="lazy" className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
              <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">{it.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: ImageIcon, title: "Upload your photo", desc: "Drop in any picture of an empty or vacant room." },
    { icon: Wand2, title: "Pick a style", desc: "Choose from Modern, Scandinavian, Industrial and more." },
    { icon: Zap, title: "Download in seconds", desc: "Our AI adds tasteful furniture while keeping the room intact." },
  ];
  return (
    <section id="how" className="border-t border-border bg-card/30 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold tracking-tight md:text-5xl">How it works</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-medium text-muted-foreground">STEP {i + 1}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Starter", price: "$19", per: "/mo", desc: "For occasional listings", features: ["25 staged images / mo", "All design styles", "HD downloads"], cta: "Start free trial", featured: false },
    { name: "Pro", price: "$49", per: "/mo", desc: "For active agents", features: ["100 staged images / mo", "Furniture removal", "Priority rendering", "Commercial license"], cta: "Get Pro", featured: true },
    { name: "Agency", price: "$149", per: "/mo", desc: "For brokerages & teams", features: ["Unlimited staging", "Team seats", "API access", "Dedicated support"], cta: "Contact sales", featured: false },
  ];
  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Simple pricing</h2>
          <p className="mt-3 text-muted-foreground">Cancel anytime. First image free, no credit card required.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border p-8 ${
                p.featured
                  ? "border-primary bg-card shadow-[var(--shadow-glow)]"
                  : "border-border bg-card"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">{p.price}</span>
                <span className="text-muted-foreground">{p.per}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className={`mt-8 w-full ${p.featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`} variant={p.featured ? "default" : "outline"}>
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-gradient-to-br from-primary/20 via-card to-card p-12 text-center shadow-[var(--shadow-glow)]">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Stage your first room — free
        </h2>
        <p className="mt-3 text-muted-foreground">No signup. No credit card. Just upload and go.</p>
        <a href="#app">
          <Button size="lg" className="mt-8 h-14 bg-primary px-8 text-base text-primary-foreground hover:bg-primary/90">
            Try it now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Virtual Staging AI</p>
        <p>Made with AI · Photorealistic results in seconds</p>
      </div>
    </footer>
  );
}
