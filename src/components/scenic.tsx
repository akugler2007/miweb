import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import exteriorFooterImg from "@/assets/edeen/exterior-edeen.webp";

/**
 * Reveal — fade-up on scroll. Same language as edeen-air.
 */
export function Reveal({
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
 * Scene — transparent scroll-snap-style section that registers itself
 * with the parent ScenicPage so the fixed backdrop can crossfade.
 */
export function Scene({
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
      data-scene-idx={index}
      className={"relative isolate " + className}
      aria-label={alt}
    >
      {children}
    </section>
  );
}

/**
 * ScenicBackdrop — fixed layer that crossfades between scene images.
 * Opacity is driven directly via DOM refs (no React re-renders on scroll).
 * registerImageRef wires each image div into the hook's update loop.
 */
export function ScenicBackdrop({
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
          key={src + i}
          ref={(el) => registerImageRef(i, el)}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === 0 ? 1 : 0,
            willChange: "opacity",
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,12,10,0.10) 0%, rgba(8,12,10,0.10) 18%, rgba(8,12,10,0.28) 55%, rgba(8,12,10,0.46) 100%)",
        }}
      />
    </div>
  );
}

/**
 * useScenicProgress — scroll tracker with two outputs:
 *  • registerImageRef  → wires image divs for direct DOM opacity updates
 *                        (zero React re-renders per scroll frame)
 *  • progress (state)  → rounded integer, only updates on room change
 *                        (used by RoomNavigator)
 *  • registerRef       → wires section elements for scroll tracking
 */
export function useScenicProgress() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const imageEls = useRef<(HTMLDivElement | null)[]>([]);
  const lastRoundedRef = useRef(0);
  const [progress, setProgress] = useState(0);

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

    // Linear crossfade: at most 2 images visible at any time.
    // opacity(i) = max(0, 1 - |progress - i|)
    // → always sums to ≤ 1, no overlap, no gaussian bleed.
    const applyProgress = (p: number) => {
      imageEls.current.forEach((div, i) => {
        if (!div) return;
        const opacity = Math.max(0, 1 - Math.abs(p - i));
        div.style.opacity = opacity.toFixed(4);
      });

      // Only trigger React re-render when the active room changes.
      const rounded = Math.round(p);
      if (rounded !== lastRoundedRef.current) {
        lastRoundedRef.current = rounded;
        setProgress(p);
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
  }, []);

  return { progress, registerRef, registerImageRef };
}

/**
 * RoomNavigator — fixed right-side indicator showing which "estancia"
 * of the house the user is currently in. Driven by scroll progress.
 * On desktop shows the room name next to the active dot; on mobile
 * only dots are rendered to preserve space.
 */
export function RoomNavigator({
  rooms,
  progress,
}: {
  rooms: string[];
  progress: number;
}) {
  const activeIdx = Math.min(
    rooms.length - 1,
    Math.max(0, Math.round(progress))
  );

  return (
    <nav
      aria-label="Estancias de la casa"
      className="pointer-events-none fixed right-5 top-1/2 z-50 -translate-y-1/2 flex flex-col items-end gap-3.5 lg:right-8"
    >
      {rooms.map((room, i) => {
        const isActive = i === activeIdx;
        return (
          <div key={room} className="flex items-center gap-3">
            <span
              className={
                "hidden text-[0.52rem] uppercase tracking-[0.35em] text-white transition-all duration-500 ease-out lg:block " +
                (isActive
                  ? "translate-x-0 opacity-90"
                  : "pointer-events-none translate-x-2 opacity-0")
              }
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
            >
              {room}
            </span>
            <span
              className={
                "block rounded-full transition-all duration-300 " +
                (isActive
                  ? "h-2.5 w-2.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.55)]"
                  : "h-1.5 w-1.5 bg-white/35")
              }
            />
          </div>
        );
      })}
    </nav>
  );
}

/* shared text/UI tokens that mirror edeen-air ----------------------- */

export const sceneEyebrow =
  "text-[0.65rem] uppercase tracking-[0.4em] text-white/95";

export const sceneTitle =
  "font-display leading-[0.9] tracking-[-0.035em] text-balance text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]";

export const sceneBody =
  "text-lg leading-relaxed text-white/95 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]";

export const scenePrimaryBtn =
  "group inline-flex items-center gap-2 bg-white px-7 py-4 text-sm font-medium text-[#0169af] transition hover:bg-white/90";

export const sceneGhostBtn =
  "inline-flex items-center gap-2 border border-white/40 bg-white/10 px-7 py-4 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20";

export const sceneAccentBtn =
  "group inline-flex items-center gap-2 border border-[#33a2ed]/70 bg-[#33a2ed]/15 px-7 py-4 text-sm font-medium text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-[#33a2ed]/30 hover:shadow-[0_10px_40px_-10px_rgba(51,162,237,0.6)]";

/* ----------------------------- footer ----------------------------- */

/** Image that should be appended to a scenic page's images[] array so
 * that ScenicFooter receives the same exterior backdrop used in
 * /edeen-air. */
export const scenicFooterImage = exteriorFooterImg;

/**
 * ScenicFooter — same closing-scene footer used in /edeen-air. Sits as
 * the final scene over the page's ScenicBackdrop (so the exterior
 * footer image must be the last entry in `images`). The giant wordmark
 * stretches in from the baseline as it enters the viewport.
 */
export function ScenicFooter({
  registerRef,
  index,
}: {
  registerRef: (idx: number, el: HTMLElement | null) => void;
  index: number;
}) {
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  const [reveal, setReveal] = useState(0);

  useEffect(() => {
    const el = wordmarkRef.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
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

  const scaleY = 0.55 + reveal * 0.45;
  const scaleX = 0.92 + reveal * 0.08;
  const translateY = (1 - reveal) * 60;
  const opacity = 0.15 + reveal * 0.85;

  return (
    <footer
      ref={(el) => registerRef(index, el)}
      data-scene-idx={index}
      className="relative z-10 isolate"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,8,6,0) 0%, rgba(10,8,6,0.25) 22%, rgba(10,8,6,0.55) 60%, rgba(10,8,6,0.78) 100%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-24 pb-10 text-white">
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
            <ScenicFooterCol title="eDeen">
              <ScenicFooterLink to="/sobre-nosotros">Nosotros</ScenicFooterLink>
              <ScenicFooterLink to="/servicios">Servicios</ScenicFooterLink>
              <ScenicFooterLink to="/cafeteria">Es Berenar</ScenicFooterLink>
              <ScenicFooterLink to="/contacto">Contacto</ScenicFooterLink>
            </ScenicFooterCol>
            <ScenicFooterCol title="Visítanos">
              <li className="text-white/95">
                C/ Joan Mascaró i Fornés 79
                <br />
                07009 Palma
              </li>
              <li className="text-white/90 mt-2">L–V 9:00 – 18:00</li>
              <li className="text-white/90">S–D 9:00 – 14:00</li>
            </ScenicFooterCol>
            <ScenicFooterCol title="Síguenos">
              <ScenicFooterExt href="https://instagram.com/edeen.palma">
                Instagram
              </ScenicFooterExt>
              <ScenicFooterExt href="mailto:hola@edeen.es">
                hola@edeen.es
              </ScenicFooterExt>
              <ScenicFooterExt href="tel:+34971000000">
                +34 971 00 00 00
              </ScenicFooterExt>
            </ScenicFooterCol>
          </div>
        </div>

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
              transition: "transform 120ms linear, opacity 200ms linear",
              willChange: "transform, opacity",
            }}
          >
            <span className="bg-gradient-to-b from-white via-white to-[#f1ece4] bg-clip-text text-transparent">
              e<em className="not-italic">D</em>een
            </span>
          </div>
        </div>

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

function ScenicFooterCol({
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

function ScenicFooterLink({
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

function ScenicFooterExt({
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