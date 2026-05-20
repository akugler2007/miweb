import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import hero1 from "@/assets/edeen/hero-1.jpg";
import hero2 from "@/assets/edeen/hero-2.jpg";
import hero3 from "@/assets/edeen/hero-3.jpg";
import hero4 from "@/assets/edeen/hero-4.jpg";
import hero5 from "@/assets/edeen/hero-5.jpg";

const SLIDES = [hero1, hero2, hero3, hero4, hero5];

export function HeroSlider() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate min-h-[92svh] w-full overflow-hidden">
      {SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden={i !== idx}
          className={
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] " +
            (i === idx ? "opacity-100 animate-kenburns" : "opacity-0")
          }
        />
      ))}

      {/* Velo para legibilidad */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/10 to-black/45"
      />

      {/* Texto + CTAs */}
      <div className="relative z-20 mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-5 pb-28 pt-32 lg:px-8 lg:pb-32">
        <p
          className="text-[0.7rem] font-medium uppercase tracking-[0.32em]"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          eDeen · Centro de jardinería en Palma
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl text-white sm:text-6xl lg:text-7xl text-balance">
          Plantas, paisajismo y un café
          <br />
          <em className="italic">entre flores</em>.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
          Más de 14.000 m² en el corazón de Palma para reconectar con la
          naturaleza, encontrar tu próxima planta y desayunar despacio.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            to="/servicios"
            className="pill group inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Descubre eDeen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contacto"
            className="pill inline-flex items-center gap-2 border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <MapPin className="h-4 w-4" /> Cómo llegar
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Diapositiva ${i + 1}`}
            className={
              "dot h-1.5 transition-all " +
              (i === idx ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70")
            }
          />
        ))}
      </div>
    </section>
  );
}