import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import exteriorFooter from "@/assets/edeen/exterior-edeen.webp";

/**
 * SiteFooter — same visual language as the EdeenAirFooter scene from
 * /edeen-air, but self-contained (its own background image + scrim) so
 * it works on every page regardless of whether the page uses the
 * scenic backdrop system.
 */
export function SiteFooter() {
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
    <footer className="relative isolate overflow-hidden">
      {/* Background image */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${exteriorFooter})` }}
      />
      {/* Scrim for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,8,6,0.35) 0%, rgba(10,8,6,0.5) 22%, rgba(10,8,6,0.65) 60%, rgba(10,8,6,0.82) 100%)",
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

        {/* Giant wordmark */}
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
