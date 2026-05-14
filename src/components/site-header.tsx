import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const NAV = [
  { to: "/edeen-air", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/cafeteria", label: "Es Berenar" },
  { to: "/sobre-nosotros", label: "Sobre nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-500 will-change-transform">
      <div
        className={
          "relative flex w-full items-center justify-between gap-0 " +
          "h-14 px-4 sm:h-16 sm:px-6 lg:h-[72px] lg:px-10 " +
          "bg-white/10 supports-[backdrop-filter]:bg-white/8 backdrop-blur-xl backdrop-saturate-150 " +
          "border-0 border-none " +
          "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.28),0_0_24px_-6px_rgba(255,255,255,0.18),inset_0_1px_0_0_rgba(255,255,255,0.45),inset_0_-1px_0_0_rgba(255,255,255,0.08)] " +
          "transition-all duration-500 will-change-[backdrop-filter,background-color] transform-gpu opacity-95 " +
          (scrolled ? "h-12 sm:h-14 lg:h-[64px]" : "")
        }
        style={{
          WebkitBackdropFilter:
            "blur(20px) saturate(180%) brightness(1.05)",
          backdropFilter: "blur(20px) saturate(180%) brightness(1.05)",
        }}
      >
        {/* Liquid glass highlight + glow overlays */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* top inner highlight */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
          {/* soft glow band */}
          <div className="absolute inset-x-0 -bottom-6 h-12 bg-gradient-to-b from-white/15 to-transparent blur-xl" />
          {/* hairline reflection */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
        <div className="relative flex w-full items-center justify-between">
        <Link to="/edeen-air" className="flex items-center gap-2 text-foreground" aria-label="eDeen inicio">
          <Logo className="h-8 sm:h-9 lg:h-10 w-auto text-white drop-shadow transition-all duration-300" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={
                "rounded-full px-4 py-2 text-sm font-normal tracking-wide transition-colors " +
                (scrolled
                  ? "text-white/85 hover:text-white hover:bg-white/15"
                  : "text-white/90 hover:text-white hover:bg-white/15")
              }
              activeProps={{
                className: scrolled
                  ? "rounded-full px-4 py-2 text-sm font-medium text-white bg-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]"
                  : "rounded-full px-4 py-2 text-sm font-medium text-white bg-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]",
              }}
              activeOptions={{ exact: item.to === "/edeen-air" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
          className={
            "lg:hidden rounded-full p-2 transition " +
            "text-white hover:bg-white/15"
          }
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        </div>
      </div>

      {open && (
        <div
          className="lg:hidden mx-auto mt-2 max-w-7xl rounded-3xl border border-white/25 bg-white/10 p-2 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.35)]"
          style={{
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            backdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base text-white/90 hover:bg-white/15 hover:text-white"
                activeProps={{
                  className: "rounded-2xl px-4 py-3 text-base text-white bg-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]",
                }}
                activeOptions={{ exact: item.to === "/edeen-air" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
