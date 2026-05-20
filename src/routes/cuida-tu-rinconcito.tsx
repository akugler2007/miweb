import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Instagram,
  MessageCircle,
  Leaf,
  ArrowRight,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import balconHero from "@/assets/edeen/balcon-hero.jpg";
import pasilloImg from "@/assets/edeen/pasillo-plantas.jpg";
import postalPlanta from "@/assets/edeen/postal-planta.png";
import postalRama from "@/assets/edeen/postal-rama.png";

export const Route = createFileRoute("/cuida-tu-rinconcito")({
  head: () => ({
    meta: [
      { title: "Cuida tu rinconcito — eDeen" },
      {
        name: "description",
        content: "Un regalo verde de eDeen. Para que tu planta siga creciendo contigo.",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { property: "og:title", content: "Cuida tu rinconcito — eDeen" },
      { property: "og:image", content: balconHero },
    ],
  }),
  component: RinconcitoPage,
});

/* ─── Tracking ───────────────────────────────────────────────────── */
function track(event: string, payload: Record<string, unknown> = {}) {
  try {
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    );
    const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
    if (w.dataLayer)
      w.dataLayer.push({
        event,
        ...payload,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
      });
  } catch { /* noop */ }
}

/* ─── WordReveal — air.inc signature animation ───────────────────── */
// Each word starts dim (0.12 opacity) and brightens as it scrolls into
// the top 55% of the viewport. Direct DOM updates via RAF — no re-renders.
function WordReveal({
  text,
  color,
  baseOpacity = 0.12,
  className = "",
}: {
  text: string;
  color?: string;
  baseOpacity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-w]"));

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      spans.forEach((sp) => {
        const top = sp.getBoundingClientRect().top;
        // p = 0 at bottom of viewport, 1 when word crosses 45% from top
        const p = Math.max(0, Math.min(1, (vh - top) / (vh * 0.55)));
        sp.style.opacity = String(baseOpacity + p * (1 - baseOpacity));
      });
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [baseOpacity]);

  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          data-w="1"
          style={{ opacity: baseOpacity, color: color || "inherit" }}
        >
          {word}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/* ─── StickySection — scroll-pinned with progress 0→1 ───────────── */
// Outer div is (multiplier × 100vh) tall. Inner is sticky at top:0,
// height 100vh. Children receive scroll progress as 0→1.
function StickySection({
  multiplier = 2.5,
  children,
}: {
  multiplier?: number;
  children: (progress: number) => React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;
      setProgress(p);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={outerRef} style={{ height: `${multiplier * 100}vh` }}>
      <div style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>
        {children(progress)}
      </div>
    </div>
  );
}

/* ─── FadeIn — intersection-triggered ───────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
  from = "bottom",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "scale";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold: 0.06, rootMargin: "0px 0px -32px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hiddenT = from === "scale" ? "scale(0.94)" : "translateY(28px)";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : hiddenT,
        transition: `opacity 0.9s cubic-bezier(.22,.9,.3,1) ${delay}ms, transform 1s cubic-bezier(.22,.9,.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ─── LineReveal — clip-path text slide-up ───────────────────────── */
function LineReveal({
  children,
  delay = 0,
  trigger = false,
}: {
  children: React.ReactNode;
  delay?: number;
  trigger?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    if (!trigger) {
      const t = setTimeout(() => setVis(true), delay + 80);
      return () => clearTimeout(t);
    }
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, trigger]);

  return (
    <div ref={wrapRef} style={{ overflow: "hidden" }}>
      <div
        style={{
          transform: vis ? "translateY(0)" : "translateY(108%)",
          opacity: vis ? 1 : 0,
          transition: `transform 1.1s cubic-bezier(.22,.9,.28,1) ${delay}ms, opacity .7s ease ${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────────────── */
const TEST_QUESTIONS = [
  {
    step: "01",
    q: "¿Dónde está tu planta?",
    options: ["Interior con mucha luz", "Interior con poca luz", "Exterior"],
  },
  {
    step: "02",
    q: "¿Qué te preocupa más?",
    options: ["Riego", "Luz", "Hojas amarillas", "Trasplante"],
  },
  {
    step: "03",
    q: "¿Cuánto tiempo quieres dedicarle?",
    options: ["Muy poco", "Algo de tiempo", "Me encanta cuidarlas"],
  },
];

const DUDAS = [
  {
    title: "Hojas amarillas",
    answer:
      "Puede ser exceso de riego. Antes de volver a regar, toca la tierra: si sigue húmeda, espera unos días.",
  },
  {
    title: "Hojas caídas o tristes",
    answer:
      "Puede necesitar agua, luz o adaptación. Observa si la tierra está seca y evita moverla demasiado de sitio.",
  },
  {
    title: "No sé cuándo regar",
    answer:
      "Mete el dedo 2 cm en la tierra. Si está seca, toca regar. Si está húmeda, espera.",
  },
];

/* ─── CSS ────────────────────────────────────────────────────────── */
const STYLES = `
  .rc { background: #f9f6f0; color: #12271a; overflow-x: clip; }

  /* Marquee */
  @keyframes rc-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .rc-marquee { animation: rc-marquee 30s linear infinite; }

  /* Float */
  @keyframes rc-float {
    0%,100%{transform:translateY(0) rotate(0deg)}
    40%{transform:translateY(-13px) rotate(2deg)}
    70%{transform:translateY(-7px) rotate(-1deg)}
  }
  .rc-float   { animation: rc-float 9s ease-in-out infinite; }
  .rc-float-b { animation: rc-float 13s ease-in-out infinite; animation-delay:-5s; }

  /* CTA — shimmer pill */
  @keyframes rc-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
  .rc-cta {
    display:inline-flex; align-items:center; gap:8px;
    padding:14px 30px; border-radius:999px;
    font-size:.875rem; font-weight:500; letter-spacing:.04em;
    color:#fff; cursor:pointer; border:none; text-decoration:none;
    background:linear-gradient(110deg,#0169af 30%,#33a2ed 50%,#0169af 70%);
    background-size:300% auto;
    animation:rc-shimmer 4s linear infinite;
    transition:filter .2s, transform .2s;
  }
  .rc-cta:hover { filter:brightness(1.12); transform:translateY(-2px); }

  /* Ghost on dark */
  .rc-ghost {
    display:inline-flex; align-items:center; gap:8px;
    padding:14px 30px; border-radius:999px;
    font-size:.875rem; font-weight:500; letter-spacing:.04em;
    color:#fff; text-decoration:none;
    border:1px solid rgba(255,255,255,.2);
    background:rgba(255,255,255,.07);
    backdrop-filter:blur(14px);
    transition:background .2s, transform .2s;
  }
  .rc-ghost:hover { background:rgba(255,255,255,.16); transform:translateY(-2px); }

  /* Ghost on light */
  .rc-ghost-dark {
    display:inline-flex; align-items:center; gap:8px;
    padding:14px 30px; border-radius:999px;
    font-size:.875rem; font-weight:500; letter-spacing:.04em;
    color:#12271a; text-decoration:none;
    border:1px solid rgba(18,39,26,.14);
    background:transparent;
    transition:background .2s, transform .2s;
  }
  .rc-ghost-dark:hover { background:rgba(18,39,26,.05); transform:translateY(-2px); }

  /* Quiz card — air.inc blur+scale transition */
  .rc-qcard {
    transition: opacity .44s ease, transform .5s cubic-bezier(.22,.9,.3,1), filter .44s ease;
  }
  .rc-qcard.out { opacity:0; transform:translateY(-26px) scale(1.02); filter:blur(8px); }
  .rc-qcard.in  { opacity:0; transform:translateY(34px) scale(0.96); filter:blur(8px); }
  .rc-qcard.on  { opacity:1; transform:none; filter:blur(0); }

  /* Accordion */
  .rc-body {
    display:grid; grid-template-rows:0fr;
    transition:grid-template-rows .42s cubic-bezier(.22,.9,.3,1), opacity .28s ease;
    opacity:0;
  }
  .rc-body.open { grid-template-rows:1fr; opacity:1; }

  /* Step bar pulse */
  @keyframes rc-pulse {
    0%,100%{box-shadow:0 0 0 0 rgba(51,162,237,.5)}
    50%{box-shadow:0 0 0 7px rgba(51,162,237,0)}
  }
  .rc-step-active { animation:rc-pulse 2s ease-in-out infinite; }

  /* Option button */
  .rc-opt {
    padding:10px 22px; border-radius:999px;
    font-size:.875rem; font-weight:500;
    cursor:pointer; border:1px solid rgba(18,39,26,.12);
    background:#f9f6f0; color:#12271a;
    transition:all .25s cubic-bezier(.22,.9,.3,1);
  }
  .rc-opt:hover { border-color:rgba(1,105,175,.38); background:rgba(207,229,246,.22); }
  .rc-opt.selected {
    background:linear-gradient(135deg,#0169af,#33a2ed);
    color:#fff; border-color:transparent;
    box-shadow:0 8px 24px -10px rgba(1,105,175,.5);
    transform:scale(1.04);
  }

  /* Hero fade-in */
  @keyframes rc-fadein { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
  .rc-hero-in { animation:rc-fadein 1.1s cubic-bezier(.22,.9,.3,1) both; }

  .rc ::selection { background:#cfe5f6; color:#0169af; }
`;

/* ─── Page ───────────────────────────────────────────────────────── */
function RinconcitoPage() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="rc">
        <Hero />
        <TresPreguntas />
        <ConsejoSticky />
        <DudasAccordion />
        <SinPrisa />
        <Cierre />
      </div>
    </>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────── */
function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = imgRef.current;
        if (el) el.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0b1c0e", minHeight: "100svh" }}
    >
      {/* Parallax image */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imgRef}
          src={balconHero}
          alt=""
          aria-hidden
          className="absolute inset-0 h-[125%] w-full object-cover"
          style={{ top: "-12%", willChange: "transform", objectPosition: "center 35%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(11,28,14,.82) 0%,rgba(11,28,14,.26) 44%,rgba(11,28,14,.92) 100%)",
          }}
        />
      </div>

      {/* Marquee */}
      <div className="relative z-10 border-b border-white/10">
        <div className="overflow-hidden py-3">
          <div className="rc-marquee flex whitespace-nowrap">
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className="shrink-0 text-[0.52rem] uppercase tracking-[0.55em] text-white/28"
              >
                eDeen · Cuida tu rinconcito · Tu planta, tu casa · Palma de Mallorca ·{" "}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-28 pt-16 lg:px-10 lg:pb-36 lg:pt-24">
        <div
          className="rc-hero-in flex items-center gap-2.5 text-[0.62rem] uppercase tracking-[0.42em] text-white/50"
          style={{ animationDelay: "120ms" }}
        >
          <Leaf className="h-3 w-3" style={{ color: "#7ddc95" }} strokeWidth={1.4} />
          eDeen · Un regalo verde para ti
        </div>

        {/* Massive heading — line-by-line reveal */}
        <div className="mt-10 max-w-4xl">
          <LineReveal delay={220}>
            <h1
              className="font-display leading-[0.87] tracking-[-0.05em] text-white"
              style={{ fontSize: "clamp(4rem,13vw,10rem)" }}
            >
              Cuida tu
            </h1>
          </LineReveal>
          <LineReveal delay={370}>
            <h1
              className="font-display leading-[0.87] tracking-[-0.05em]"
              style={{ fontSize: "clamp(4rem,13vw,10rem)", color: "#a8e6b4" }}
            >
              rinconcito.
            </h1>
          </LineReveal>
        </div>

        <div
          className="rc-hero-in mt-10 max-w-lg text-xl leading-relaxed text-white/72"
          style={{ animationDelay: "580ms" }}
        >
          Gracias por pasar por eDeen. Este pequeño espacio es tuyo — un
          consejo verde, sin prisa, para que tu planta siga creciendo contigo en casa.
        </div>

        <div
          className="rc-hero-in mt-11 flex flex-wrap gap-3"
          style={{ animationDelay: "760ms" }}
        >
          <a href="#preguntas" className="rc-cta" onClick={() => track("hero_cta")}>
            Empieza aquí <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#dudas" className="rc-ghost" onClick={() => track("hero_dudas")}>
            Tengo una duda
          </a>
        </div>

        {/* Stats pills */}
        <div
          className="rc-hero-in mt-14 flex flex-wrap gap-3"
          style={{ animationDelay: "960ms" }}
        >
          {["Desde 2012 en Palma", "14.000 m² de naturaleza", "Consejo sin coste"].map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.6rem] uppercase tracking-[0.32em] text-white/52 backdrop-blur"
            >
              <span style={{ color: "#7ddc95" }}>✦</span>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Floating deco */}
      <img
        src={postalRama}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-[7%] top-[20%] hidden w-24 opacity-10 rc-float lg:block"
      />

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 opacity-32">
        <span className="text-[0.5rem] uppercase tracking-[0.55em] text-white">Baja</span>
        <div
          className="h-9 w-px bg-gradient-to-b from-transparent to-white"
          style={{ animation: "rc-float 2.4s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}

/* ─── TRES PREGUNTAS ─────────────────────────────────────────────── */
function TresPreguntas() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([null, null, null]);
  const [phase, setPhase] = useState<"on" | "out" | "in">("on");
  const [done, setDone] = useState(false);

  const select = (qi: number, opt: string) => {
    if (phase !== "on") return;
    const next = [...answers];
    next[qi] = opt;
    setAnswers(next);
    track("test_respuesta", { pregunta: qi + 1, opcion: opt });
    if (qi < 2) {
      setPhase("out");
      setTimeout(() => {
        setStep(qi + 1);
        setPhase("in");
        requestAnimationFrame(() => requestAnimationFrame(() => setPhase("on")));
      }, 420);
    } else {
      setTimeout(() => setDone(true), 460);
    }
  };

  const reset = () => { setStep(0); setAnswers([null, null, null]); setDone(false); setPhase("on"); };

  return (
    <section
      id="preguntas"
      className="relative"
      style={{
        background: "linear-gradient(180deg,#f9f6f0 0%,#ece5d8 55%,#f9f6f0 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 py-32 lg:grid lg:min-h-screen lg:grid-cols-[1fr_500px] lg:items-center lg:gap-24 lg:px-10 lg:py-0">

        {/* Left — large word-reveal heading, pinned visually */}
        <div className="mb-20 lg:mb-0">
          <FadeIn>
            <p
              className="text-[0.62rem] uppercase tracking-[0.42em]"
              style={{ color: "#b88963" }}
            >
              Elige tu próximo cuidado
            </p>
          </FadeIn>

          <h2
            className="mt-6 font-display leading-[0.86] tracking-[-0.05em]"
            style={{ fontSize: "clamp(3.5rem,10vw,8rem)", color: "#12271a" }}
          >
            <WordReveal text="Tres" />
            <br />
            <WordReveal text="preguntas," />
            <br />
            <WordReveal text="sin más." color="#b88963" />
          </h2>

          {/* Step progress bars */}
          <div className="mt-12 flex items-center gap-3">
            {[0, 1, 2].map((i) => {
              const past = done || i < step;
              const active = !done && i === step;
              return (
                <div
                  key={i}
                  className={active ? "rc-step-active" : ""}
                  style={{
                    height: 4,
                    borderRadius: 999,
                    background: past
                      ? "#0169af"
                      : active
                        ? "linear-gradient(90deg,#0169af,#33a2ed)"
                        : "rgba(18,39,26,.10)",
                    width: active ? 56 : 30,
                    transition: "width .4s ease, background .4s ease",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Right — quiz card with blur transitions */}
        <div style={{ minHeight: 360 }}>
          {!done ? (
            <div className={`rc-qcard ${phase}`}>
              {TEST_QUESTIONS.map((tq, qi) =>
                qi === step ? (
                  <div
                    key={qi}
                    className="rounded-3xl border bg-white p-8 sm:p-10"
                    style={{
                      borderColor: "rgba(18,39,26,.07)",
                      boxShadow: "0 36px 80px -36px rgba(18,39,26,.14)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className="text-[0.58rem] uppercase tracking-[0.4em]"
                          style={{ color: "#729db9" }}
                        >
                          Paso {tq.step}
                        </span>
                        <p
                          className="mt-2 font-display text-2xl leading-tight sm:text-3xl"
                          style={{ color: "#12271a" }}
                        >
                          {tq.q}
                        </p>
                      </div>
                      <span
                        className="shrink-0 rounded-full px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.35em]"
                        style={{ background: "rgba(1,105,175,.08)", color: "#0169af" }}
                      >
                        {step + 1} / 3
                      </span>
                    </div>
                    <div className="mt-7 flex flex-wrap gap-2.5">
                      {tq.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`rc-opt${answers[qi] === opt ? " selected" : ""}`}
                          onClick={() => select(qi, opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ) : (
            <FadeIn from="scale">
              <div
                className="rounded-3xl p-8 sm:p-10"
                style={{
                  background: "linear-gradient(135deg,#eef6fc 0%,#effaf0 100%)",
                  border: "1px solid rgba(1,105,175,.14)",
                  boxShadow: "0 36px 80px -36px rgba(1,105,175,.2)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: "rgba(1,105,175,.1)" }}
                  >
                    <Leaf className="h-5 w-5" style={{ color: "#0169af" }} strokeWidth={1.4} />
                  </div>
                  <span
                    className="text-[0.62rem] uppercase tracking-[0.38em]"
                    style={{ color: "#0169af" }}
                  >
                    Tu recomendación
                  </span>
                </div>
                <p
                  className="mt-5 font-display text-2xl leading-tight sm:text-3xl"
                  style={{ color: "#12271a" }}
                >
                  Esta semana, revisa la luz y el riego de tu planta.
                </p>
                <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a5e50" }}>
                  Si quieres una orientación más precisa, ven a eDeen con una foto de tu planta.
                  Te miramos y te decimos exactamente qué necesita — sin coste.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/34971433422?text=Hola%20eDeen%2C%20quiero%20orientaci%C3%B3n%20con%20mi%20planta"
                    target="_blank"
                    rel="noreferrer"
                    className="rc-cta"
                    onClick={() => track("quiero_orientacion", { respuestas: answers })}
                  >
                    <MessageCircle className="h-4 w-4" /> Quiero orientación
                  </a>
                  <button type="button" onClick={reset} className="rc-ghost-dark">
                    Repetir
                  </button>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── CONSEJO — STICKY SCROLL (air.inc signature technique) ─────── */
// Section pins for 2.8× viewport heights. As you scroll through,
// words reveal, body text fades, and the image slides in from the right.
function ConsejoSticky() {
  // The heading words with their accent flag
  const WORDS = [
    { w: "Gira", accent: false },
    { w: "tu", accent: false },
    { w: "maceta", accent: false },
    { w: "¼ de vuelta", accent: true },
    { w: "cada", accent: false },
    { w: "semana.", accent: false },
  ];

  return (
    <StickySection multiplier={2.8}>
      {(p) => {
        // Phase thresholds
        const eyebrowVis = p > 0.03;
        const headingP = Math.max(0, Math.min(1, (p - 0.06) / 0.36)); // 6%–42%
        const bodyVis = p > 0.50;
        const imageP = Math.max(0, Math.min(1, (p - 0.58) / 0.28));   // 58%–86%
        const labelP = Math.max(0, Math.min(1, (p - 0.68) / 0.22));   // 68%–90%

        return (
          <div
            className="flex h-full items-center"
            style={{ background: "#ece5d8" }}
          >
            <div className="mx-auto w-full max-w-6xl px-5 lg:px-10">
              <div className="lg:grid lg:grid-cols-[1fr_360px] lg:items-center lg:gap-20">

                {/* Text */}
                <div>
                  {/* Eyebrow */}
                  <p
                    style={{
                      opacity: eyebrowVis ? 1 : 0,
                      transform: eyebrowVis ? "none" : "translateY(14px)",
                      transition: "opacity .65s ease, transform .75s cubic-bezier(.22,.9,.3,1)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.42em",
                      textTransform: "uppercase",
                      color: "#b88963",
                    }}
                  >
                    Consejo de la semana
                  </p>

                  {/* Heading — per-word progress (air.inc scroll-scrub) */}
                  <h2
                    className="mt-8 font-display leading-[0.88] tracking-[-0.046em]"
                    style={{ fontSize: "clamp(3rem,8.5vw,7rem)", color: "#12271a" }}
                  >
                    {WORDS.map((item, i) => {
                      const wP = Math.max(
                        0,
                        Math.min(1, (headingP - (i / WORDS.length) * 0.72) / 0.28)
                      );
                      return (
                        <span
                          key={i}
                          style={{
                            opacity: 0.1 + wP * 0.9,
                            color: item.accent ? "#b88963" : "inherit",
                            display: "inline",
                          }}
                        >
                          {item.w}
                          {i < WORDS.length - 1 ? " " : ""}
                        </span>
                      );
                    })}
                  </h2>

                  {/* Body */}
                  <div
                    style={{
                      opacity: bodyVis ? 1 : 0,
                      transform: bodyVis ? "none" : "translateY(22px)",
                      transition:
                        "opacity .7s cubic-bezier(.22,.9,.3,1), transform .8s cubic-bezier(.22,.9,.3,1)",
                    }}
                  >
                    <p
                      className="mt-7 max-w-lg text-lg leading-relaxed"
                      style={{ color: "#4a5e50" }}
                    >
                      Así recibirá la luz de forma más equilibrada y crecerá más uniforme.
                      Hazlo el mismo día de la semana — cinco segundos, una vez a la semana.
                    </p>
                    <div
                      className="mt-7 flex items-start gap-3 rounded-2xl border p-5"
                      style={{
                        background: "rgba(207,229,246,.2)",
                        borderColor: "rgba(1,105,175,.12)",
                      }}
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                        style={{ background: "rgba(1,105,175,.1)", color: "#0169af" }}
                      >
                        <Leaf className="h-4 w-4" strokeWidth={1.5} />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#4a5e50" }}>
                        <strong style={{ color: "#12271a" }}>Microtip:</strong> si tu
                        maceta es grande y pesada, apóyala en un platillo con ruedas y
                        gira el plato en su lugar.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image — slides in from right */}
                <div
                  className="hidden lg:block"
                  style={{
                    opacity: imageP,
                    transform: `translateX(${(1 - imageP) * 64}px)`,
                    position: "relative",
                  }}
                >
                  <div
                    className="rc-float-b overflow-hidden rounded-3xl"
                    style={{
                      aspectRatio: "3/4",
                      boxShadow: "0 44px 88px -44px rgba(18,39,26,.3)",
                    }}
                  >
                    <img
                      src={pasilloImg}
                      alt="Pasillo de plantas eDeen"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Floating label */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -16,
                      left: -16,
                      opacity: labelP,
                      transform: `translateY(${(1 - labelP) * 18}px)`,
                      background: "#fff",
                      borderRadius: 16,
                      border: "1px solid rgba(184,137,99,.18)",
                      padding: 16,
                      boxShadow: "0 14px 44px -20px rgba(18,39,26,.16)",
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={postalPlanta}
                        alt=""
                        aria-hidden
                        className="h-8 w-8 object-contain"
                      />
                      <div>
                        <p
                          style={{
                            fontSize: "0.6rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.35em",
                            color: "#b88963",
                          }}
                        >
                          eDeen tip
                        </p>
                        <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "#12271a" }}>
                          ¼ de vuelta · cada semana
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </StickySection>
  );
}

/* ─── DUDAS / FAQ ────────────────────────────────────────────────── */
function DudasAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="dudas"
      className="px-5 py-32 lg:px-8 lg:py-52"
      style={{
        background: "linear-gradient(180deg,#f9f6f0 0%,#ece5d8 50%,#f9f6f0 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-[0.62rem] uppercase tracking-[0.42em]" style={{ color: "#b88963" }}>
            ¿Qué le pasa a tu planta?
          </p>
        </FadeIn>

        <h2
          className="mt-5 font-display leading-[0.88] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3rem,8vw,6.5rem)", color: "#12271a" }}
        >
          <WordReveal text="Observa," />
          <br />
          <WordReveal text="sin prisa." color="#b88963" />
        </h2>

        <div className="mt-16 space-y-3">
          {DUDAS.map((d, i) => {
            const isOpen = open === i;
            return (
              <FadeIn key={d.title} delay={i * 80}>
                <div
                  className="overflow-hidden rounded-2xl border bg-white transition-all duration-300"
                  style={{
                    borderColor: isOpen ? "rgba(1,105,175,.28)" : "rgba(18,39,26,.07)",
                    boxShadow: isOpen
                      ? "0 16px 48px -24px rgba(1,105,175,.18)"
                      : "0 4px 18px -12px rgba(18,39,26,.07)",
                  }}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    onClick={() => {
                      setOpen(isOpen ? null : i);
                      if (!isOpen) track("duda_abierta", { duda: d.title });
                    }}
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-xl" style={{ color: "#12271a" }}>
                      {d.title}
                    </span>
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300"
                      style={{
                        background: isOpen ? "#0169af" : "rgba(207,229,246,.65)",
                        color: isOpen ? "#fff" : "#0169af",
                        transform: isOpen ? "rotate(180deg)" : "none",
                      }}
                    >
                      <ChevronDown className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                  </button>
                  <div className={`rc-body${isOpen ? " open" : ""}`}>
                    <div className="min-h-0">
                      <p
                        className="px-6 pb-6 text-base leading-relaxed"
                        style={{ color: "#4a5e50" }}
                      >
                        {d.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SIN PRISA — dark editorial section ────────────────────────── */
function SinPrisa() {
  return (
    <section
      className="relative overflow-hidden px-5 py-36 lg:px-8 lg:py-56"
      style={{ background: "#080f09" }}
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full"
        style={{
          background: "radial-gradient(closest-side,rgba(51,162,237,.07),transparent 70%)",
        }}
      />
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <FadeIn>
          <p className="text-[0.62rem] uppercase tracking-[0.42em] text-white/38">
            Siempre disponibles
          </p>
        </FadeIn>

        <h2
          className="mt-6 font-display leading-[0.88] tracking-[-0.045em]"
          style={{ fontSize: "clamp(3.2rem,10vw,8rem)" }}
        >
          <WordReveal text="Si tienes una duda," baseOpacity={0.07} color="rgba(255,255,255,0.9)" />
          <br />
          <WordReveal text="pásate." color="#8aff9e" baseOpacity={0.07} />
        </h2>

        <FadeIn delay={200}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/60">
            En eDeen no queremos que te quedes con dudas. Ven con una foto de tu planta
            y te orientamos sin coste — es parte de lo que hacemos.
          </p>
        </FadeIn>

        <FadeIn delay={340}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="https://maps.google.com/?q=Calle+Joan+Mascar%C3%B3+i+Forn%C3%A9s+79,+07010+Palma"
              target="_blank"
              rel="noreferrer"
              className="rc-cta"
              onClick={() => track("como_llegar")}
            >
              <MapPin className="h-4 w-4" /> Cómo llegar a eDeen
            </a>
            <a
              href="https://wa.me/34971433422?text=Hola%20eDeen%2C%20tengo%20una%20duda%20con%20mi%20planta"
              target="_blank"
              rel="noreferrer"
              className="rc-ghost"
              onClick={() => track("whatsapp_duda")}
            >
              <MessageCircle className="h-4 w-4" /> Escribirnos
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── CIERRE ─────────────────────────────────────────────────────── */
function Cierre() {
  const [sent, setSent] = useState(false);

  return (
    <section className="px-5 py-32 lg:px-8 lg:py-52" style={{ background: "#f9f6f0" }}>
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">

          {/* Newsletter copy */}
          <div>
            <FadeIn>
              <p
                className="text-[0.62rem] uppercase tracking-[0.42em]"
                style={{ color: "#b88963" }}
              >
                Sin prisa
              </p>
            </FadeIn>
            <h2
              className="mt-6 font-display leading-[0.9] tracking-[-0.04em]"
              style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", color: "#12271a" }}
            >
              <WordReveal text="Recibe un" />
              <br />
              <WordReveal text="consejo verde" color="#0169af" />
              <br />
              <WordReveal text="al mes." />
            </h2>
            <FadeIn delay={120}>
              <p
                className="mt-6 max-w-md text-base leading-relaxed"
                style={{ color: "#4a5e50" }}
              >
                Solo ideas útiles para cuidar tus plantas y disfrutar más de tu rinconcito.
                Sin spam, sin prisas.
              </p>
              <ul className="mt-6 space-y-3 text-sm" style={{ color: "#4a5e50" }}>
                {[
                  "Un email al mes, breve.",
                  "Consejos de temporada para Mallorca.",
                  "Cero descuentos agresivos.",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "#b88963" }}
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Form card */}
          <FadeIn from="scale" delay={100}>
            <div
              className="rounded-3xl border bg-white p-8 sm:p-10"
              style={{
                borderColor: "rgba(18,39,26,.07)",
                boxShadow: "0 32px 80px -36px rgba(18,39,26,.12)",
              }}
            >
              {!sent ? (
                <form
                  className="grid gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    track("form_fidelizacion", {
                      nombre: String(fd.get("nombre") ?? ""),
                      email: String(fd.get("email") ?? ""),
                    });
                    setSent(true);
                  }}
                >
                  <label
                    className="block text-[0.65rem] uppercase tracking-[0.24em]"
                    style={{ color: "#4a5e50" }}
                  >
                    Tu nombre
                    <input
                      required
                      name="nombre"
                      maxLength={80}
                      placeholder="Anna"
                      className="mt-2 h-12 w-full rounded-xl border bg-[#f9f6f0] px-4 text-sm outline-none transition focus:bg-white"
                      style={{ borderColor: "rgba(18,39,26,.12)", color: "#12271a" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#0169af")}
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "rgba(18,39,26,.12)")
                      }
                    />
                  </label>
                  <label
                    className="block text-[0.65rem] uppercase tracking-[0.24em]"
                    style={{ color: "#4a5e50" }}
                  >
                    Tu email
                    <input
                      required
                      name="email"
                      type="email"
                      maxLength={120}
                      placeholder="anna@correo.com"
                      className="mt-2 h-12 w-full rounded-xl border bg-[#f9f6f0] px-4 text-sm outline-none transition focus:bg-white"
                      style={{ borderColor: "rgba(18,39,26,.12)", color: "#12271a" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#0169af")}
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "rgba(18,39,26,.12)")
                      }
                    />
                  </label>
                  <label
                    className="flex items-start gap-2.5 text-xs leading-relaxed"
                    style={{ color: "#4a5e50" }}
                  >
                    <input required type="checkbox" name="consent" className="mt-0.5" />
                    Acepto recibir consejos de eDeen y la política de privacidad.
                  </label>
                  <button type="submit" className="rc-cta w-full justify-center">
                    Quiero recibir consejos
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center">
                  <div
                    className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ background: "rgba(1,105,175,.08)" }}
                  >
                    <Leaf className="h-6 w-6" style={{ color: "#0169af" }} strokeWidth={1.4} />
                  </div>
                  <p className="font-display text-2xl" style={{ color: "#12271a" }}>
                    Gracias 🌿
                  </p>
                  <p className="mt-3 text-sm" style={{ color: "#4a5e50" }}>
                    Te escribiremos sin prisa, solo cuando tengamos algo útil que contarte.
                  </p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>

        {/* Closing */}
        <FadeIn delay={60}>
          <div
            className="mt-32 border-t pt-24 text-center"
            style={{ borderColor: "rgba(18,39,26,.08)" }}
          >
            <img
              src={postalPlanta}
              alt=""
              aria-hidden
              className="rc-float mx-auto mb-10 w-14 opacity-55"
            />
            <h3
              className="font-display leading-[0.92] tracking-[-0.035em]"
              style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", color: "#12271a" }}
            >
              <WordReveal text="Cuando quieras, vuelve a tu" />
              <br />
              <WordReveal text="rincón verde." color="#0169af" />
            </h3>
            <FadeIn delay={120}>
              <p
                className="mx-auto mt-5 max-w-md text-base leading-relaxed"
                style={{ color: "#4a5e50" }}
              >
                Si tienes dudas, si quieres inspiración o si simplemente te apetece
                respirar entre plantas, en eDeen tienes tu sitio.
              </p>
            </FadeIn>
            <FadeIn delay={220}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <a
                  href="https://maps.google.com/?q=Calle+Joan+Mascar%C3%B3+i+Forn%C3%A9s+79,+07010+Palma"
                  target="_blank"
                  rel="noreferrer"
                  className="rc-cta"
                  onClick={() => track("ver_ubicacion")}
                >
                  <MapPin className="h-4 w-4" /> Ver ubicación
                </a>
                <a
                  href="https://www.instagram.com/edeen_espacionatural/"
                  target="_blank"
                  rel="noreferrer"
                  className="rc-ghost-dark"
                  onClick={() => track("ig_cierre")}
                >
                  <Instagram className="h-4 w-4" /> @edeen.palma
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                </a>
              </div>
            </FadeIn>
            <p
              className="mt-14 text-[0.58rem] uppercase tracking-[0.38em]"
              style={{ color: "rgba(18,39,26,.25)" }}
            >
              © {new Date().getFullYear()} eDeen · Espacio Natural · Palma de Mallorca
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
