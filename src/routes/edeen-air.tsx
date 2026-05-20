import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Sprout,
  Flower2,
  Coffee,
  TreePine,
  Leaf,
} from "lucide-react";
import { RoomNavigator } from "@/components/scenic";

import jardin from "@/assets/edeen/drago-hero.jpg";
import recibidor from "@/assets/edeen/casa-recibidor.webp";
import salon from "@/assets/edeen/casa-salon-new.jpg";
import cocina from "@/assets/edeen/rosas-cocina.jpg";
import patio from "@/assets/edeen/casa-patio.jpg";
import terraza from "@/assets/edeen/casa-terraza.jpg";
import exteriorFooter from "@/assets/edeen/exterior-edeen.webp";

import card1 from "@/assets/edeen/service-plantas.jpg";
import card2 from "@/assets/edeen/service-berenar.jpg";
import card3 from "@/assets/edeen/service-floristeria.jpg";
import card4 from "@/assets/edeen/service-paisajismo.jpg";
import detail1 from "@/assets/edeen/textura-helecho.jpg";
import detail2 from "@/assets/edeen/maceta-1.jpg";
import detail3 from "@/assets/edeen/huerto.jpg";
import detail4 from "@/assets/edeen/planta-detalle-1.jpg";
import detail5 from "@/assets/edeen/maceta-3.jpg";
import detail6 from "@/assets/edeen/flores-secas.jpg";
import berenar1 from "@/assets/edeen/berenar-hero.jpg";
import berenar2 from "@/assets/edeen/berenar-cafe.jpg";
import berenar3 from "@/assets/edeen/berenar-reposteria.jpg";

export const Route = createFileRoute("/edeen-air")({
  head: () => ({
    meta: [
      { title: "eDeen — Tu centro de jardinería en Palma" },
      {
        name: "description",
        content:
          "eDeen, Espacio Natural. Centro de jardinería en Palma: plantas, paisajismo, floristería para eventos y la cafetería Es Berenar. Te tratamos como un invitado.",
      },
      { property: "og:title", content: "eDeen — Espacio Natural en Palma" },
      {
        property: "og:description",
        content:
          "Plantas, paisajismo, floristería y cafetería. Pasa, te invitamos.",
      },
      { property: "og:image", content: jardin },
    ],
    links: [
      { rel: "preload", as: "image", href: jardin, fetchpriority: "high" },
    ],
  }),
  component: EdeenAir,
});

/* ----------------------------- helpers ----------------------------- */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={
        "transition-all duration-700 ease-out " +
        (shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6") +
        " " +
        className
      }
    >
      {children}
    </div>
  );
}

/**
 * "Room" is now just a transparent scroll-snap container. The actual
 * background image lives in <RoomsBackdrop/> as a single fixed layer
 * that crossfades between rooms based on which section dominates the
 * viewport. This eliminates any visible seam between sections — the
 * camera stays still and the scenery dissolves softly from one room
 * to the next.
 */
function Room({
  index,
  registerRef,
  alt,
  children,
  className = "",
  id,
}: {
  index: number;
  registerRef: (idx: number, el: HTMLElement | null) => void;
  alt?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      ref={(el) => registerRef(index, el)}
      data-room-idx={index}
      className={"relative isolate " + className}
      aria-label={alt}
    >
      {children}
    </section>
  );
}

/**
 * Fixed backdrop for the house tour. Opacity is driven by direct DOM
 * updates (no React re-renders on scroll). registerImageRef wires each
 * div into the scroll loop in EdeenAir.
 */
function RoomsBackdrop({
  images,
  registerImageRef,
}: {
  images: string[];
  registerImageRef: (idx: number, el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#080c0a]"
    >
      {images.map((src, i) => (
        <div
          key={src}
          ref={(el) => registerImageRef(i, el)}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === 0 ? 1 : 0,
            willChange: "opacity",
            filter: (i === 0 || i === 3) ? "brightness(0.42) saturate(0.9)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

/* lightweight tracking helper for CTA clicks */
function trackCta(name: string) {
  // dataLayer for GTM / GA4 if present, plus a debug log
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "cta_click", cta: name, page: "edeen-air" });
  if (typeof w.gtag === "function") {
    w.gtag("event", "cta_click", { cta_name: name, page: "edeen-air" });
  }
}

/* ------------------------------ page ------------------------------- */

function EdeenAir() {
  const images = [jardin, recibidor, salon, cocina, patio, terraza, exteriorFooter];

  // Section refs for scroll position tracking
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  // Image div refs for direct DOM opacity updates (no re-renders)
  const imageEls = useRef<(HTMLDivElement | null)[]>([]);
  // Last rounded room index — only changes trigger setActiveRoom
  const lastRoundedRef = useRef(0);
  // State only for RoomNavigator (updates on room change, not every frame)
  const [activeRoom, setActiveRoom] = useState(0);

  const registerRef = useCallback((idx: number, el: HTMLElement | null) => {
    sectionsRef.current[idx] = el;
  }, []);

  const registerImageRef = useCallback(
    (idx: number, el: HTMLDivElement | null) => {
      imageEls.current[idx] = el;
    },
    []
  );

  useEffect(() => {
    let raf = 0;

    const applyProgress = (p: number) => {
      // Linear crossfade: opacity(i) = max(0, 1 - |p - i|)
      // At most 2 images visible at once, always summing to ≤ 1.
      imageEls.current.forEach((div, i) => {
        if (!div) return;
        div.style.opacity = Math.max(0, 1 - Math.abs(p - i)).toFixed(4);
      });
      // Only re-render React tree when the active room index changes.
      const rounded = Math.min(images.length - 2, Math.max(0, Math.round(p)));
      if (rounded !== lastRoundedRef.current) {
        lastRoundedRef.current = rounded;
        setActiveRoom(rounded);
      }
    };

    const compute = () => {
      const sy = window.scrollY;
      const sections = sectionsRef.current.filter(Boolean) as HTMLElement[];
      if (!sections.length) return;
      let p = 0;
      for (let i = 0; i < sections.length; i++) {
        const thisTop = sections[i].offsetTop;
        const nextTop =
          i + 1 < sections.length
            ? sections[i + 1].offsetTop
            : thisTop + sections[i].offsetHeight;
        if (sy <= nextTop || i === sections.length - 1) {
          const span = Math.max(1, nextTop - thisTop);
          p = i + Math.max(0, (sy - thisTop) / span);
          break;
        }
      }
      applyProgress(Math.min(p, sections.length - 1));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        compute();
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [images.length]);

  const rooms = ["El Jardín", "El Recibidor", "El Salón", "La Cocina", "El Patio", "La Terraza"];

  return (
    <div className="relative text-white">
      <RoomsBackdrop images={images} registerImageRef={registerImageRef} />
      <RoomNavigator rooms={rooms} progress={activeRoom} />

      {/* ============================== JARDÍN (entrada) ============================== */}
      <Room
        index={0}
        registerRef={registerRef}
        alt="El jardín de la casa eDeen"
        className="min-h-[100svh] flex flex-col"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-32 lg:px-8">
          <Reveal delay={120}>
            <p className="font-display italic text-lg sm:text-xl text-white/95">
              Pasa, te invitamos.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="mt-5 font-display text-[13vw] leading-[0.86] tracking-[-0.045em] sm:text-[9.5vw] lg:text-[8rem] text-balance text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              Tu espacio
              <br />
              natural en
              <br />
              <em className="not-italic text-[#f1ece4]">
                Palma.
              </em>
            </h1>
          </Reveal>
          <Reveal delay={340}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/95 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
              Somos eDeen — Espacio Natural. Un centro de jardinería en el que
              te recibimos como en casa: plantas, paisajismo, floristería y
              cafetería, con asesoramiento honesto y sin prisa.
            </p>
          </Reveal>
          <Reveal delay={440}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#recibidor"
                data-rounded="full"
                className="group inline-flex items-center gap-2 bg-[#0169af] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#0169af]/90"
              >
                Descubre eDeen
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <Link
                to="/contacto"
                data-rounded="full"
                className="inline-flex items-center gap-2 border border-[#33a2ed]/60 bg-[#33a2ed]/10 px-6 py-3.5 text-sm font-medium text-[#33a2ed] backdrop-blur transition hover:bg-[#33a2ed]/20"
              >
                Ven a visitarnos
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-8 pb-10 text-white/95">
          <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.4em]">
            <span>C/ Joan Mascaró i Fornés 79 · Palma · desde 2012</span>
            <span className="hidden sm:inline-flex items-center gap-2">
              Sigue bajando <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            </span>
          </div>
        </div>
      </Room>

      {/* ============================== RECIBIDOR (lo que hacemos) ============================== */}
      <Room
        id="recibidor"
        index={1}
        registerRef={registerRef}
        alt="El recibidor"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#33a2ed]">
                Lo que hacemos
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.035em] text-balance text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
                Todo lo que
                <br />
                <em className="not-italic text-[#f1ece4]">
                  necesita tu espacio verde.
                </em>
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-8 text-lg leading-relaxed text-white/95 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
                Plantas, paisajismo, floristería y la cafetería Es Berenar.
                Cuatro maneras de cuidarte — y un mismo equipo detrás de cada
                una de ellas.
              </p>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
            <FeatureCard
              className="lg:col-span-8"
              img={card1}
              icon={Sprout}
              eyebrow="Plantas"
              index="01"
              title="Elegidas una a una, para que vivan contigo."
              to="/servicios"
              ratio="aspect-[16/11]"
              big
            />
            <FeatureCard
              className="lg:col-span-4"
              img={card3}
              icon={Flower2}
              eyebrow="Floristería"
              index="02"
              title="Flores para bodas y celebraciones."
              to="/servicios"
              ratio="aspect-[16/11] lg:aspect-[4/5]"
            />
            <FeatureCard
              className="lg:col-span-4"
              img={card2}
              icon={Coffee}
              eyebrow="Es Berenar"
              index="03"
              title="Una cafetería que se siente como casa."
              to="/cafeteria"
              ratio="aspect-[16/11] lg:aspect-[4/5]"
            />
            <FeatureCard
              className="lg:col-span-8"
              img={card4}
              icon={TreePine}
              eyebrow="Paisajismo"
              index="04"
              title="Diseñamos, plantamos y cuidamos tu jardín."
              to="/servicios"
              ratio="aspect-[16/11]"
              big
            />
          </div>
        </div>
      </Room>

      {/* ============================== SALÓN (sobre nosotros) ============================== */}
      <Room
        index={2}
        registerRef={registerRef}
        alt="El salón"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-5xl px-5 lg:px-8 text-center">
          <Reveal>
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#33a2ed]">
              Cómo te tratamos
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.035em] text-balance text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
              Te tratamos
              <br />
              <em className="not-italic text-[#f1ece4]">
                como a un invitado.
              </em>
            </h3>
          </Reveal>
          <Reveal delay={180}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/95 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
              Desde 2012 acompañamos con cercanía y honestidad. No vendemos
              por vender: te asesoramos pensando en tu espacio, escuchamos sin
              prisa y te ayudamos a decidir con tranquilidad.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-3 text-left">
            {[
              {
                title: "Hospitalidad",
                body: "Si llegas sin saber lo que buscas, te ayudamos a encontrarlo. Sin prisa y sin presión.",
              },
              {
                title: "Autenticidad",
                body: "Te decimos si una planta no va a sobrevivir en tu rincón — siempre antes de que salga por la puerta.",
              },
              {
                title: "Cercanía",
                body: "Cuando vamos a tu jardín, lo tratamos como si fuera el nuestro. Porque a veces lo acaba siendo.",
              },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="border border-white/15 bg-white/5 p-6 backdrop-blur">
                  <Leaf className="h-5 w-5 text-[#33a2ed]" strokeWidth={1.5} />
                  <p className="mt-4 font-display text-lg text-white">{v.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <Link
              to="/sobre-nosotros"
              data-rounded="full"
              className="mt-12 inline-flex items-center gap-2 border border-[#33a2ed]/60 bg-[#33a2ed]/10 px-6 py-3.5 text-sm font-medium text-[#33a2ed] backdrop-blur transition hover:bg-[#33a2ed]/20"
            >
              Conoce el equipo <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </Room>

      {/* ============================== COCINA (números) ============================== */}
      <Room
        index={3}
        registerRef={registerRef}
        alt="La cocina"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#33a2ed]">
                eDeen en cifras
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.035em] text-balance text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
                Más de una década
                <br />
                <em className="not-italic text-[#f1ece4]">
                  cuidando Palma.
                </em>
              </h3>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-12 sm:grid-cols-3">
            {[
              { n: "2012", l: "Año de creación" },
              { n: "+13", l: "Años acompañando" },
              { n: "4", l: "Servicios bajo un mismo techo" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 100}>
                <div className="border-t border-white/30 pt-6">
                  <div className="font-display text-7xl sm:text-8xl tracking-[-0.04em] text-white">
                    {s.n}
                  </div>
                  <p className="mt-4 text-[0.7rem] uppercase tracking-[0.35em] text-white/95">
                    {s.l}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Room>

      {/* ============================== PATIO (galería) ============================== */}
      <Room
        index={4}
        registerRef={registerRef}
        alt="El patio interior"
        className="py-32 lg:py-40"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-end mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#33a2ed]">
                  Es Berenar
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h3 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.035em] text-balance text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
                  Es Berenar:
                  <br />
                  <em className="not-italic text-[#f1ece4]">
                    el sabor de la calma.
                  </em>
                </h3>
              </Reveal>
            </div>
            <Reveal delay={160} className="lg:col-span-5">
              <p className="text-lg leading-relaxed text-white/90">
                Un rincón donde el tiempo se detiene. Disfruta de productos
                locales, café artesano y nuestra repostería rodeado del frescor
                de eDeen. Abierto todos los días de 9:00 a 14:00.
              </p>
              <div className="mt-8">
                <Link
                  to="/cafeteria"
                  data-rounded="full"
                  onClick={() => trackCta("ven_a_berenar")}
                  className="group inline-flex items-center gap-2 border border-[#33a2ed]/70 bg-[#33a2ed]/15 px-7 py-4 text-sm font-medium text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-[#33a2ed]/30 hover:shadow-[0_10px_40px_-10px_rgba(51,162,237,0.6)]"
                >
                  Ven a berenar con nosotros
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Composición editorial: imagen principal + dos secundarias con detalles */}
          <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
            {/* Imagen principal */}
            <Reveal delay={0} className="lg:col-span-8">
              <figure className="group relative h-[60vh] min-h-[420px] w-full overflow-hidden">
                <img
                  src={berenar1}
                  alt="Mesa de desayuno en Es Berenar, entre plantas"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 lg:p-8 text-white">
                  <span className="text-[0.6rem] uppercase tracking-[0.4em] text-white/80">
                    El ritual
                  </span>
                  <p className="font-display text-2xl leading-tight tracking-[-0.02em] sm:text-3xl text-balance max-w-md [text-shadow:0_2px_14px_rgba(0,0,0,0.5)]">
                    Café de especialidad, repostería de la casa y producto local — servido sin prisa.
                  </p>
                </figcaption>
              </figure>
            </Reveal>

            {/* Columna lateral con dos imágenes apiladas */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
              <Reveal delay={120}>
                <figure className="group relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={berenar2}
                    alt="Detalle de café artesano en Es Berenar"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                </figure>
              </Reveal>
            </div>
          </div>

          {/* Línea editorial con detalles del lugar */}
          <Reveal delay={300}>
            <div className="mt-12 grid gap-8 border-t border-white/15 pt-10 sm:grid-cols-3">
              {[
                { k: "Horario", v: "Todos los días · 9:00 – 14:00" },
                { k: "Cocina", v: "Producto local, panes artesanos" },
                { k: "Ambiente", v: "Sin prisas, entre 14.000 m² de vivero" },
              ].map((d) => (
                <div key={d.k} className="flex flex-col gap-2">
                  <span className="text-[0.6rem] uppercase tracking-[0.35em] text-[#7fc4f5]">
                    {d.k}
                  </span>
                  <p className="font-display text-lg leading-snug text-white/95 text-balance">
                    {d.v}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Room>

      {/* ============================== TERRAZA (CTA final) ============================== */}
      <Room
        index={5}
        registerRef={registerRef}
        alt="La terraza al atardecer"
        className="min-h-[95svh] flex items-center"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8 py-32 lg:py-44 text-center text-white w-full">
          <Reveal>
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#33a2ed]">
              Te esperamos
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mx-auto mt-6 font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.88] tracking-[-0.045em] text-balance max-w-4xl text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              Ven a desconectar
              <br />
              <em className="not-italic text-[#f1ece4]">
                a eDeen.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-xl text-lg text-white/95 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
              C/ Joan Mascaró i Fornés 79, Palma — en la carretera de
              Establiments. Tienda de L–V de 9:00 a 18:00; sábados, domingos
              y festivos de 9:00 a 14:00.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.4)] italic">
              La puerta está abierta. Solo tienes que venir.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Link
                to="/contacto"
                data-rounded="full"
                onClick={() => trackCta("como_llegar")}
                className="group inline-flex items-center gap-2 bg-[#0169af] px-7 py-4 text-sm font-medium text-white transition hover:bg-[#0169af]/90"
              >
                Cómo llegar
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/cafeteria"
                data-rounded="full"
                onClick={() => trackCta("visitar_es_berenar")}
                className="inline-flex items-center gap-2 border border-[#33a2ed]/70 bg-[#33a2ed]/15 px-7 py-4 text-sm font-medium text-white backdrop-blur transition hover:bg-[#33a2ed]/30"
              >
                Visitar Es Berenar
              </Link>
            </div>
          </Reveal>
        </div>
      </Room>

      {/* ============================== FOOTER (air.inc-style) ============================== */}
      <EdeenAirFooter registerRef={registerRef} index={6} />
    </div>
  );
}

/* ----------------------------- subcomponents ----------------------------- */

function FeatureCard({
  className = "",
  img,
  icon: Icon,
  eyebrow,
  title,
  to,
  big = false,
  index,
  ratio = "aspect-[4/3]",
}: {
  className?: string;
  img: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  eyebrow: string;
  title: string;
  to: string;
  big?: boolean;
  index?: string;
  ratio?: string;
}) {
  return (
    <Reveal className={className}>
      <Link
        to={to}
        className="group relative block h-full w-full overflow-hidden border border-white/10 bg-black/20 backdrop-blur transition-all duration-500 hover:border-white/25 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
      >
        <div className={"w-full overflow-hidden " + ratio}>
          <img
            src={img}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.35em] text-white/95">
              <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
              {eyebrow}
            </div>
            {index && (
              <span className="font-display text-xs tracking-[0.2em] text-white/60">
                {index} / 04
              </span>
            )}
          </div>
          <div className="flex items-end justify-between gap-4">
            <h4
              className={
                "font-display leading-[1.05] tracking-[-0.025em] text-white text-balance [text-shadow:0_2px_14px_rgba(0,0,0,0.5)] " +
                (big ? "text-3xl sm:text-4xl lg:text-5xl max-w-md" : "text-2xl sm:text-[1.7rem] max-w-xs")
              }
            >
              {title}
            </h4>
            <span
              data-rounded="full"
              className="shrink-0 inline-flex h-11 w-11 items-center justify-center border border-white/30 bg-white/10 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-[#0169af]"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* ----------------------------- footer ----------------------------- */

/**
 * Air.inc-style footer that doubles as the closing "scene" of the
 * house tour. It sits over the terraza image (the last room remains
 * visible because the RoomsBackdrop is fixed), so there is no hard
 * cut between page and footer. As the user reaches the bottom, the
 * giant "eDeen" wordmark stretches in from the baseline — the same
 * ken-burns-meets-reveal language used by air.inc.
 */
function EdeenAirFooter({
  registerRef,
  index,
}: {
  registerRef: (idx: number, el: HTMLElement | null) => void;
  index: number;
}) {
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  const [reveal, setReveal] = useState(0); // 0 → 1 as the wordmark enters

  useEffect(() => {
    const el = wordmarkRef.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Start when top crosses 95% of viewport, finish when fully on screen.
      const start = vh * 0.95;
      const end = vh * 0.35;
      const t = (start - rect.top) / Math.max(1, start - end);
      setReveal(Math.min(1, Math.max(0, t)));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        compute();
      });
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
    };
  }, []);

  // air.inc-style transform: starts compressed and slightly below,
  // expands horizontally and rises into place.
  const scaleY = 0.55 + reveal * 0.45;
  const scaleX = 0.92 + reveal * 0.08;
  const translateY = (1 - reveal) * 60;
  const opacity = 0.15 + reveal * 0.85;

  return (
    <footer
      ref={(el) => registerRef(index, el)}
      data-room-idx={index}
      className="relative z-10 isolate"
    >
      {/* Soft scrim that improves text contrast over the exterior image
          while keeping the integrated, scenic feel: fully transparent at
          the very top (so it dissolves into the previous scene) and
          gradually deeper towards the wordmark and bottom bar. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,8,6,0) 0%, rgba(10,8,6,0.25) 22%, rgba(10,8,6,0.55) 60%, rgba(10,8,6,0.78) 100%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-24 pb-10 text-white">
        {/* Top row: claim + columns */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
              Pasa, te invitamos
            </p>
            <h3 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.9] tracking-[-0.035em] text-balance text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              Tu espacio natural,
              <br />
              <em className="not-italic text-[#f1ece4]">
                te espera en Palma.
              </em>
            </h3>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <FooterCol title="eDeen">
              <FooterLink to="/sobre-nosotros">Nosotros</FooterLink>
              <FooterLink to="/servicios">Servicios</FooterLink>
              <FooterLink to="/cafeteria">Es Berenar</FooterLink>
              <FooterLink to="/contacto">Contacto</FooterLink>
            </FooterCol>
            <FooterCol title="Visítanos">
              <li className="text-white/95">
                C/ Joan Mascaró i Fornés 79
                <br />
                07009 Palma
              </li>
              <li className="text-white/90 mt-2">L–V 9:00 – 18:00</li>
              <li className="text-white/90">S–D 9:00 – 14:00</li>
            </FooterCol>
            <FooterCol title="Síguenos">
              <FooterExt href="https://instagram.com/edeen.palma">
                Instagram
              </FooterExt>
              <FooterExt href="mailto:hola@edeen.es">hola@edeen.es</FooterExt>
              <FooterExt href="tel:+34971000000">+34 971 00 00 00</FooterExt>
            </FooterCol>
          </div>
        </div>

        {/* Giant wordmark — the air.inc move */}
        <div
          ref={wordmarkRef}
          className="relative mt-24 overflow-hidden"
          aria-hidden
        >
          <div
            className="font-display tracking-[-0.06em] leading-[0.78] text-white origin-bottom select-none [filter:drop-shadow(0_6px_30px_rgba(0,0,0,0.45))]"
            style={{
              fontSize: "clamp(6rem, 22vw, 22rem)",
              transform: `translateY(${translateY}px) scale(${scaleX}, ${scaleY})`,
              opacity,
              transition:
                "transform 120ms linear, opacity 200ms linear",
              willChange: "transform, opacity",
            }}
          >
            <span className="bg-gradient-to-b from-white via-white to-[#f1ece4] bg-clip-text text-transparent">
              e<em className="not-italic">D</em>een
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-[0.7rem] uppercase tracking-[0.35em] text-white/90 border-t border-white/25 pt-6">
          <span>© {new Date().getFullYear()} eDeen — Espacio Natural</span>
          <span>Centro de jardinería · Palma de Mallorca</span>
          <Link to="/edeen-air" className="hover:text-white transition">
            Volver al inicio ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/95">
        {title}
      </p>
      <ul className="mt-4 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        to={to}
        className="text-white/95 hover:text-white transition story-link"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterExt({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className="text-white/95 hover:text-white transition story-link"
      >
        {children}
      </a>
    </li>
  );
}
