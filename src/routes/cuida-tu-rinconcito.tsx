import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, MapPin, Instagram, Bookmark, MessageCircle, Leaf, ArrowRight, Sparkles, Sun, Droplets } from "lucide-react";
import postalPlanta from "@/assets/edeen/postal-planta.png";
import postalRama from "@/assets/edeen/postal-rama.png";
import balconHero from "@/assets/edeen/balcon-hero.jpg";

export const Route = createFileRoute("/cuida-tu-rinconcito")({
  head: () => ({
    meta: [
      { title: "Cuida tu rinconcito — eDeen" },
      { name: "description", content: "Un consejo verde para que tu casa respire mejor. Continúa la experiencia eDeen desde casa, sin prisa." },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { property: "og:title", content: "Cuida tu rinconcito — eDeen" },
      { property: "og:description", content: "Un consejo verde para que tu casa respire mejor." },
      { property: "og:image", content: balconHero },
    ],
  }),
  component: RinconcitoPage,
});

// ---------- tracking ----------
function track(event: string, payload: Record<string, unknown> = {}) {
  try {
    const search = typeof window !== "undefined" ? window.location.search : "";
    const params = new URLSearchParams(search);
    const utm = {
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
    };
    const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
    if (w.dataLayer) w.dataLayer.push({ event, ...payload, ...utm });
    // eslint-disable-next-line no-console
    console.log("[track]", event, { ...payload, ...utm });
  } catch { /* noop */ }
}

// ---------- reveal-on-scroll ----------
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 800ms ease-out ${delay}ms, transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const dudas = [
  { title: "Hojas amarillas", answer: "Puede ser exceso de riego. Antes de volver a regar, toca la tierra: si sigue húmeda, espera unos días." },
  { title: "Hojas caídas", answer: "Puede necesitar agua, luz o adaptación. Observa si la tierra está seca y evita moverla demasiado de sitio." },
  { title: "No sé cuándo regar", answer: "Mete el dedo 2 cm en la tierra. Si está seca, toca regar. Si está húmeda, espera." },
];

const testQuestions = [
  { q: "¿Dónde está tu planta?", options: ["Interior con mucha luz", "Interior con poca luz", "Exterior"] },
  { q: "¿Qué te preocupa más?", options: ["Riego", "Luz", "Hojas", "Trasplante"] },
  { q: "¿Cuánto tiempo quieres dedicarle?", options: ["Muy poco", "Algo de tiempo", "Me gusta cuidarlas"] },
];

function RinconcitoPage() {
  return (
    <div className="rincon-scope">
      {/* Estilos scoped: corners suaves + sombras difuminadas, sin tocar el resto del sitio */}
      <style>{`
        .rincon-scope { background: #fbf8f2; color: var(--foreground); }
        .rincon-scope .soft, .rincon-scope .soft * { border-radius: 18px !important; }
        .rincon-scope .soft-sm, .rincon-scope .soft-sm * { border-radius: 12px !important; }
        .rincon-scope .pill-btn { border-radius: 999px !important; }
        .rincon-scope .shadow-soft { box-shadow: 0 30px 60px -40px rgba(1,105,175,.25), 0 8px 24px -16px rgba(184,137,99,.18); }
        .rincon-scope .shadow-card { box-shadow: 0 20px 50px -34px rgba(15,30,55,.22); }
        .rincon-scope .grain { background-image: radial-gradient(rgba(184,137,99,.06) 1px, transparent 1px); background-size: 14px 14px; }
        .rincon-scope .gradient-cream { background: radial-gradient(120% 80% at 50% 0%, #ffffff 0%, #fbf8f2 55%, #f4ede0 100%); }
        .rincon-scope .ink { color: #14304a; }
        .rincon-scope .ink-soft { color: #4b5b6f; }
        .rincon-scope ::selection { background: #cfe5f6; color: #0169af; }
      `}</style>

      <Hero />
      <ConsejoExpress />
      <MiniTest />
      <QuePasa />
      <SinPrisa />
      <Fidelizacion />
      <CierreEmocional />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={balconHero}
        alt="Balcón con plantas en macetas de terracota"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover animate-kenburns"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,48,74,.55) 0%, rgba(20,48,74,.25) 45%, rgba(20,48,74,.75) 100%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-24 sm:pt-32 lg:px-8 lg:pb-32 lg:pt-40">
        <Reveal>
          <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.32em] text-white/85">
            <Leaf className="h-3.5 w-3.5" strokeWidth={1.5} />
            eDeen · Una pausa contigo
          </div>
        </Reveal>

        <div className="mt-10 max-w-2xl">
          <div>
            <Reveal delay={80}>
              <h1 className="font-display text-[2.6rem] leading-[1.04] text-white sm:text-6xl lg:text-[4.5rem]">
                Cuida tu <em className="italic" style={{ color: "#cfe5f6" }}>rinconcito</em>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
                Un consejo verde para que tu casa respire mejor.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">
                Gracias por pasar por eDeen. Te dejamos este pequeño cuidado para que tu planta siga creciendo contigo, sin complicarte.
              </p>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#consejo"
                  onClick={() => track("hero_ver_consejo")}
                  className="pill-btn group inline-flex h-13 items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide text-white shadow-soft transition hover:translate-y-[-1px]"
                  style={{ background: "linear-gradient(135deg,#0169af 0%,#33a2ed 100%)" }}
                >
                  Empieza tu pausa
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" strokeWidth={1.6} />
                </a>
                <a
                  href="#dudas"
                  onClick={() => track("hero_duda_planta")}
                  className="pill-btn inline-flex h-13 items-center justify-center gap-2 border bg-white/15 px-7 py-3.5 text-sm font-medium tracking-wide text-white backdrop-blur transition hover:bg-white/25"
                  style={{ borderColor: "rgba(255,255,255,.35)" }}
                >
                  Tengo una duda con mi planta
                </a>
              </div>
            </Reveal>

            <Reveal delay={460}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.22em] text-white/85">
                <span className="inline-flex items-center gap-2"><Sun className="h-3.5 w-3.5" style={{ color: "#f1c9a4" }} strokeWidth={1.6} /> Sin prisa</span>
                <span className="inline-flex items-center gap-2"><Droplets className="h-3.5 w-3.5" style={{ color: "#9ad4f7" }} strokeWidth={1.6} /> Sin spam</span>
                <span className="inline-flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" style={{ color: "#cfe5f6" }} strokeWidth={1.6} /> Hecho contigo</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConsejoExpress() {
  return (
    <section id="consejo" className="px-5 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <article className="soft shadow-soft relative overflow-hidden border bg-white p-8 sm:p-14" style={{ borderColor: "rgba(20,48,74,.08)" }}>
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(51,162,237,.12), transparent 70%)" }} />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(184,137,99,.14), transparent 70%)" }} />
            <img src={postalRama} alt="" aria-hidden width={512} height={512} loading="lazy" className="absolute -right-3 -top-6 w-24 opacity-90 sm:w-28" />

            <p className="text-[0.7rem] uppercase tracking-[0.32em]" style={{ color: "#b88963" }}>Consejo express</p>
            <h2 className="mt-4 font-display text-3xl leading-[1.1] ink sm:text-[2.6rem]">
              Gira tu maceta <em className="italic" style={{ color: "#b88963" }}>¼ de vuelta</em> cada semana.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed ink-soft">
              Así recibirá la luz de forma más equilibrada y crecerá más uniforme.
            </p>

            <div className="soft-sm mt-9 flex items-start gap-3 border-t bg-[rgba(207,229,246,.35)] p-5" style={{ borderColor: "rgba(20,48,74,.08)" }}>
              <Leaf className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#0169af" }} strokeWidth={1.6} />
              <p className="text-sm ink">
                <span className="font-medium">Microtip:</span> hazlo siempre el mismo día de la semana para convertirlo en hábito.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function QuePasa() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="dudas" className="px-5 py-20 sm:py-28 lg:px-8" style={{ background: "linear-gradient(180deg, transparent, #f6efe1 60%, transparent)" }}>
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-center text-[0.7rem] uppercase tracking-[0.32em]" style={{ color: "#b88963" }}>¿Qué le pasa a tu planta?</p>
          <h2 className="mt-4 text-center font-display text-3xl ink sm:text-5xl">Observa, sin prisa.</h2>
        </Reveal>

        <div className="mt-12 space-y-4">
          {dudas.map((d, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={d.title} delay={i * 80}>
                <button
                  type="button"
                  onClick={() => { setOpen(isOpen ? null : i); if (!isOpen) track("duda_abierta", { duda: d.title }); }}
                  className="soft shadow-card group w-full border bg-white p-6 text-left transition hover:-translate-y-0.5 hover:shadow-soft"
                  style={{ borderColor: isOpen ? "rgba(1,105,175,.35)" : "rgba(20,48,74,.08)" }}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-xl ink">{d.title}</span>
                    <span
                      className="pill-btn inline-flex h-9 w-9 items-center justify-center transition"
                      style={{ background: isOpen ? "#0169af" : "rgba(207,229,246,.6)", color: isOpen ? "#fff" : "#0169af" }}
                    >
                      <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen ? "rotate-180" : "")} strokeWidth={1.8} />
                    </span>
                  </div>
                  <div className={"grid overflow-hidden transition-all duration-500 " + (isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <p className="min-h-0 text-base leading-relaxed ink-soft">{d.answer}</p>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SinPrisa() {
  return (
    <section className="px-5 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div
            className="soft shadow-soft relative overflow-hidden border p-10 text-center sm:p-16"
            style={{ background: "linear-gradient(135deg,#f6ece0 0%,#fbf6ec 100%)", borderColor: "rgba(184,137,99,.18)" }}
          >
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(184,137,99,.18), transparent 70%)" }} />
            <p className="text-[0.7rem] uppercase tracking-[0.32em]" style={{ color: "#b88963" }}>Te ayudamos</p>
            <h2 className="mt-4 font-display text-3xl ink sm:text-5xl">
              Te ayudamos <em className="italic" style={{ color: "#0169af" }}>sin prisa</em>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed ink-soft">
              En eDeen no queremos que te lleves una planta y te quedes con dudas. Si algo cambia, si una hoja se pone rara o si no sabes qué necesita, puedes volver con una foto y te orientamos.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://maps.google.com/?q=Calle+Joan+Mascar%C3%B3+i+Forn%C3%A9s+79,+07010+Palma"
                target="_blank" rel="noreferrer"
                onClick={() => track("como_llegar")}
                className="pill-btn inline-flex h-12 items-center justify-center gap-2 px-7 text-sm font-medium tracking-wide text-white shadow-soft transition hover:translate-y-[-1px]"
                style={{ background: "linear-gradient(135deg,#0169af 0%,#33a2ed 100%)" }}
              >
                <MapPin className="h-4 w-4" strokeWidth={1.6} /> Cómo llegar a eDeen
              </a>
              <button
                type="button"
                onClick={() => {
                  track("guardar_consejo");
                  if (typeof navigator !== "undefined" && navigator.share) {
                    navigator.share({ title: "Cuida tu rinconcito — eDeen", text: "Gira tu maceta ¼ de vuelta cada semana.", url: typeof window !== "undefined" ? window.location.href : undefined }).catch(() => {});
                  } else if (typeof window !== "undefined") { window.print(); }
                }}
                className="pill-btn inline-flex h-12 items-center justify-center gap-2 border bg-white px-7 text-sm font-medium tracking-wide ink transition hover:bg-white/70"
                style={{ borderColor: "rgba(20,48,74,.14)" }}
              >
                <Bookmark className="h-4 w-4" strokeWidth={1.6} /> Guardar este consejo
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MiniTest() {
  const [answers, setAnswers] = useState<(string | null)[]>([null, null, null]);
  const done = answers.every(Boolean);
  const recomendacion = useMemo(() => (done ? "Tu próximo cuidado recomendado: revisa la luz y el riego esta semana." : null), [done]);
  const progress = (answers.filter(Boolean).length / answers.length) * 100;

  return (
    <section className="px-5 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-center text-[0.7rem] uppercase tracking-[0.32em]" style={{ color: "#b88963" }}>Elige tu próximo cuidado</p>
          <h2 className="mt-4 text-center font-display text-3xl ink sm:text-5xl">Tres preguntas, sin más.</h2>
          <div className="mx-auto mt-8 h-1 w-full max-w-xs overflow-hidden bg-[rgba(20,48,74,.08)]" style={{ borderRadius: 999 }}>
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg,#33a2ed,#0169af)" }}
            />
          </div>
        </Reveal>

        <div className="mt-12 space-y-5">
          {testQuestions.map((tq, qi) => (
            <Reveal key={tq.q} delay={qi * 80}>
              <fieldset className="soft shadow-card border bg-white p-6 sm:p-7" style={{ borderColor: "rgba(20,48,74,.08)" }}>
                <legend className="px-2">
                  <span className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: "#729db9" }}>Paso {qi + 1}</span>
                  <span className="ml-3 font-display text-lg ink">{tq.q}</span>
                </legend>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {tq.options.map((opt) => {
                    const active = answers[qi] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          const next = [...answers]; next[qi] = opt; setAnswers(next);
                          track("test_respuesta", { pregunta: qi + 1, opcion: opt });
                        }}
                        className="pill-btn px-5 py-2.5 text-sm transition"
                        style={
                          active
                            ? { background: "linear-gradient(135deg,#0169af,#33a2ed)", color: "#fff", boxShadow: "0 10px 24px -14px rgba(1,105,175,.55)" }
                            : { background: "#fbf8f2", color: "#14304a", border: "1px solid rgba(20,48,74,.12)" }
                        }
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </Reveal>
          ))}
        </div>

        {recomendacion && (
          <div
            className="soft shadow-soft mt-10 border p-7 sm:p-9 animate-fade-up"
            style={{ background: "linear-gradient(135deg,#eef6fc 0%,#ffffff 100%)", borderColor: "rgba(1,105,175,.18)" }}
          >
            <p className="text-[0.7rem] uppercase tracking-[0.32em]" style={{ color: "#0169af" }}>Tu recomendación</p>
            <p className="mt-3 font-display text-2xl ink">{recomendacion}</p>
            <p className="mt-3 text-base ink-soft">Si quieres una recomendación más precisa, ven a vernos con una foto de tu planta.</p>
            <a
              href="https://wa.me/34000000000?text=Hola%20eDeen%2C%20quiero%20que%20me%20orient%C3%A9is%20con%20mi%20planta"
              target="_blank" rel="noreferrer"
              onClick={() => track("quiero_orientacion", { respuestas: answers })}
              className="pill-btn mt-6 inline-flex h-12 items-center justify-center gap-2 px-6 text-sm font-medium tracking-wide text-white shadow-soft transition hover:translate-y-[-1px]"
              style={{ background: "linear-gradient(135deg,#0169af 0%,#33a2ed 100%)" }}
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.6} /> Quiero que me orienten
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function Fidelizacion() {
  const [sent, setSent] = useState(false);
  return (
    <section className="px-5 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.32em]" style={{ color: "#b88963" }}>Sin prisa</p>
            <h2 className="mt-4 font-display text-3xl ink sm:text-5xl">
              Recibe un <em className="italic" style={{ color: "#0169af" }}>consejo verde</em> al mes
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed ink-soft">
              Solo ideas útiles para cuidar tus plantas y disfrutar más de tu rinconcito. Sin spam, sin prisas.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm ink-soft">
              <li className="flex items-center gap-2"><span className="pill-btn inline-block h-1.5 w-1.5" style={{ background: "#b88963" }} /> Un email al mes, breve.</li>
              <li className="flex items-center gap-2"><span className="pill-btn inline-block h-1.5 w-1.5" style={{ background: "#33a2ed" }} /> Consejos de temporada para Mallorca.</li>
              <li className="flex items-center gap-2"><span className="pill-btn inline-block h-1.5 w-1.5" style={{ background: "#0169af" }} /> Cero descuentos agresivos.</li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="soft shadow-soft border bg-white p-7 sm:p-9" style={{ borderColor: "rgba(20,48,74,.08)" }}>
            {!sent ? (
              <form
                className="grid gap-3 text-left"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  track("form_fidelizacion", { nombre: String(fd.get("nombre") ?? ""), email: String(fd.get("email") ?? "") });
                  setSent(true);
                }}
              >
                <label className="text-xs uppercase tracking-[0.22em] ink-soft">Tu nombre
                  <input required name="nombre" maxLength={80} placeholder="Anna" className="soft-sm mt-1.5 h-12 w-full border bg-[#fbf8f2] px-4 text-base ink placeholder:text-[#9aa6b3] focus:border-[#0169af] focus:bg-white focus:outline-none" style={{ borderColor: "rgba(20,48,74,.12)" }} />
                </label>
                <label className="text-xs uppercase tracking-[0.22em] ink-soft">Tu email
                  <input required name="email" type="email" maxLength={120} placeholder="anna@correo.com" className="soft-sm mt-1.5 h-12 w-full border bg-[#fbf8f2] px-4 text-base ink placeholder:text-[#9aa6b3] focus:border-[#0169af] focus:bg-white focus:outline-none" style={{ borderColor: "rgba(20,48,74,.12)" }} />
                </label>
                <label className="mt-1 flex items-start gap-2 text-xs ink-soft">
                  <input required type="checkbox" name="consent" className="mt-1" />
                  Acepto recibir consejos de eDeen y la política de privacidad.
                </label>
                <button
                  type="submit"
                  className="pill-btn mt-3 inline-flex h-12 items-center justify-center gap-2 px-6 text-sm font-medium tracking-wide text-white shadow-soft transition hover:translate-y-[-1px]"
                  style={{ background: "linear-gradient(135deg,#0169af 0%,#33a2ed 100%)" }}
                >
                  Quiero recibir consejos
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center pill-btn" style={{ background: "rgba(207,229,246,.6)", color: "#0169af" }}>
                  <Leaf className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <p className="font-display text-2xl ink">Gracias 🌿</p>
                <p className="mt-2 text-base ink-soft">Te escribiremos sin prisa, solo cuando tengamos algo útil que contarte.</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CierreEmocional() {
  return (
    <section className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <div className="divider-dot"><span /></div>
          <h2 className="mt-8 font-display text-3xl ink sm:text-5xl">
            Cuando quieras, vuelve a tu <em className="italic" style={{ color: "#0169af" }}>rincón verde</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg ink-soft">
            Si tienes dudas, si quieres inspiración o si simplemente te apetece respirar un rato entre plantas, en eDeen tienes tu sitio.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://maps.google.com/?q=Calle+Joan+Mascar%C3%B3+i+Forn%C3%A9s+79,+07010+Palma"
              target="_blank" rel="noreferrer"
              onClick={() => track("ver_ubicacion")}
              className="pill-btn inline-flex h-12 items-center justify-center gap-2 px-7 text-sm font-medium tracking-wide text-white shadow-soft transition hover:translate-y-[-1px]"
              style={{ background: "linear-gradient(135deg,#0169af 0%,#33a2ed 100%)" }}
            >
              <MapPin className="h-4 w-4" strokeWidth={1.6} /> Ver ubicación
            </a>
            <a
              href="https://www.instagram.com/edeen_espacionatural/"
              target="_blank" rel="noreferrer"
              onClick={() => track("ig_edeen")}
              className="pill-btn inline-flex h-12 items-center justify-center gap-2 border bg-white px-7 text-sm font-medium tracking-wide ink transition hover:bg-white/70"
              style={{ borderColor: "rgba(20,48,74,.14)" }}
            >
              <Instagram className="h-4 w-4" strokeWidth={1.6} /> Instagram de eDeen
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PostalFooter() {
  return (
    <footer className="border-t px-5 py-10 text-center lg:px-8" style={{ borderColor: "rgba(20,48,74,.08)", background: "#f6efe1" }}>
      <img src={postalPlanta} alt="" aria-hidden width={1024} height={1024} className="mx-auto mb-4 w-16 opacity-90" />
      <p className="font-display text-base ink">eDeen · Tu centro de jardinería en Palma</p>
      <p className="mt-1 text-xs ink-soft">Calle Joan Mascaró i Fornés 79, 07010 Palma</p>
    </footer>
  );
}
