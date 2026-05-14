import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  DoorOpen,
  PanelTop,
  Home,
  Sofa,
  UtensilsCrossed,
  TreePalm,
  BookOpen,
  Briefcase,
  ChefHat,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import imgExterior from "@/assets/edeen/casa-exterior.jpg";
import imgJardin from "@/assets/edeen/casa-jardin.jpg";
import imgRecibidor from "@/assets/edeen/casa-recibidor.jpg";
import imgSalon from "@/assets/edeen/casa-salon.jpg";
import imgPatio from "@/assets/edeen/casa-patio.jpg";
import imgTerraza from "@/assets/edeen/casa-terraza.jpg";
import imgCocina from "@/assets/edeen/casa-cocina.jpg";
import imgCafe from "@/assets/edeen/cafe-interior.jpg";
import imgPasillo from "@/assets/edeen/pasillo-plantas.jpg";
import imgRincon from "@/assets/edeen/rincon-edeen.jpg";
import imgIso from "@/assets/edeen/casa-isometrica.png";

export const Route = createFileRoute("/sientete-como-en-casa")({
  head: () => ({
    meta: [
      { title: "Siéntete como en casa — Campaña EDEEN" },
      {
        name: "description",
        content:
          "Recorrido inmersivo por la casa EDEEN: una campaña de marketing organizada como espacios de un mismo hogar, basada en el concepto anfitrión/invitado.",
      },
      { property: "og:title", content: "Siéntete como en casa — Campaña EDEEN" },
      {
        property: "og:description",
        content:
          "Una experiencia visual de las acciones de marketing de EDEEN, presentadas como estancias de una casa.",
      },
      { property: "og:image", content: imgExterior },
    ],
  }),
  component: SientetePage,
});

/* ----------------------------- types ----------------------------- */

type Room = {
  id: string;
  num: string;
  nav: string;
  icon: LucideIcon;
  bloque?: string;
  titulo: string;
  accion: string;
  copy: string;
  texto: string;
  objetivos: string[];
  conexion: string;
  image: string;
};

const ROOMS: Room[] = [
  {
    id: "puerta",
    num: "01",
    nav: "La puerta",
    icon: DoorOpen,
    bloque: "Posicionamiento digital",
    titulo: "La puerta",
    accion: "Instagram",
    copy: "Pasa, te lo explicamos fácil.",
    texto:
      "Instagram es el primer contacto con EDEEN. Reels útiles y cercanos que resuelven dudas reales sobre plantas y reducen la inseguridad antes de la visita.",
    objetivos: [
      "Aumentar engagement",
      "Reforzar posicionamiento digital",
      "Cercanía y utilidad",
      "Facilitar la decisión de compra",
    ],
    conexion:
      "La puerta debe ser fácil de abrir. EDEEN empieza hablando claro, sin tecnicismos y sin presión.",
    image: imgRecibidor,
  },
  {
    id: "ventana",
    num: "02",
    nav: "La ventana",
    icon: PanelTop,
    titulo: "La ventana",
    accion: "Tastant Mallorca",
    copy: "Así se ve EDEEN desde fuera.",
    texto:
      "Tastant Mallorca permite que nuevos públicos se asomen a EDEEN como plan local: plantas, cafetería, calma y un espacio diferente cerca de Palma.",
    objetivos: [
      "Visibilidad local",
      "EDEEN como experiencia",
      "Atraer nuevo público",
      "Tráfico a tienda y cafetería",
    ],
    conexion:
      "La ventana deja ver lo que hay dentro. Tastant muestra EDEEN a quienes todavía no lo conocen.",
    image: imgJardin,
  },
  {
    id: "recibidor",
    num: "03",
    nav: "El recibidor",
    icon: Home,
    bloque: "Tráfico al espacio",
    titulo: "El recibidor",
    accion: "Campaña de tarde",
    copy: "Después del día, entra en calma.",
    texto:
      "Posicionamos EDEEN como un refugio post-trabajo: cerca de Palma, con parking fácil, plantas, cafetería y un ambiente tranquilo para desconectar.",
    objetivos: [
      "Tráfico en horario de tarde",
      "Percepción de comodidad",
      "Asociación con calma",
      "Apoyo a ventas y cafetería",
    ],
    conexion:
      "El recibidor es el espacio que te hace sentir que ya has llegado. EDEEN quiere ser eso al final del día.",
    image: imgRincon,
  },
  {
    id: "salon",
    num: "04",
    nav: "El salón",
    icon: Sofa,
    bloque: "Experiencia de marca",
    titulo: "El salón",
    accion: "Tienda y cafetería",
    copy: "Quédate un rato. Estás en EDEEN.",
    texto:
      "Tienda y cafetería son el corazón de la experiencia. El cliente puede pasear, preguntar, tomar algo, inspirarse y decidir sin presión.",
    objetivos: [
      "Posicionamiento experiencial",
      "Concepto anfitrión / invitado",
      "Mayor permanencia en el espacio",
      "Confianza y fidelización",
    ],
    conexion:
      "El salón es donde las personas se quedan. La tienda y la cafetería cumplen esa función: acoger sin presionar.",
    image: imgSalon,
  },
  {
    id: "comedor",
    num: "05",
    nav: "La mesa del comedor",
    icon: UtensilsCrossed,
    titulo: "La mesa del comedor",
    accion: "Cross-selling",
    copy: "Te lo dejamos preparado para que cuidarla sea fácil.",
    texto:
      "Pequeñas recomendaciones en tienda ayudan al cliente a llevarse lo que necesita: planta, maceta, sustrato o abono adecuado. No es vender más, es asesorar mejor.",
    objetivos: [
      "Aumentar ticket medio",
      "Productos complementarios",
      "Mejor experiencia de compra",
      "Evitar errores de cuidado",
    ],
    conexion:
      "En una casa cuidada, alguien prepara lo que vas a necesitar. EDEEN hace lo mismo con sus recomendaciones.",
    image: imgCafe,
  },
  {
    id: "terraza",
    num: "06",
    nav: "La terraza",
    icon: TreePalm,
    bloque: "Engagement",
    titulo: "La terraza",
    accion: "Sorteo · Antes y después de tu rinconcito",
    copy: "Tu rincón también puede sentirse como en casa.",
    texto:
      "El sorteo transforma un balcón, terraza o rincón interior con plantas, asesoramiento, macetas y una propuesta sencilla de distribución.",
    objetivos: [
      "Engagement en Instagram",
      "Contenido emocional",
      "Mostrar valor del asesoramiento",
      "Inspirar futuras compras",
    ],
    conexion:
      "La casa EDEEN también inspira la casa del cliente. La experiencia sale del centro y llega a su rincón.",
    image: imgTerraza,
  },
  {
    id: "estanteria",
    num: "07",
    nav: "La estantería",
    icon: BookOpen,
    bloque: "Fidelización",
    titulo: "La estantería",
    accion: "Tarjetas con QR",
    copy: "Llévate una planta. Quédate con el cuidado.",
    texto:
      "Cada planta o servicio puede ir acompañado de una tarjeta con QR que lleva a consejos de cuidado. Así la relación continúa después de la compra.",
    objetivos: [
      "Fidelización",
      "Acompañar después de la compra",
      "Medir interés vía QR",
      "Apoyar ventas relacionadas",
    ],
    conexion:
      "En casa guardas en la estantería lo que quieres conservar. La tarjeta de EDEEN funciona igual: una guía sencilla a la que volver.",
    image: imgPatio,
  },
  {
    id: "despacho",
    num: "08",
    nav: "El despacho",
    icon: Briefcase,
    titulo: "El despacho",
    accion: "Landing en la web",
    copy: "Cuando tengas dudas, aquí está todo.",
    texto:
      "La web reúne cuidados por tipo de planta, dudas frecuentes, errores comunes, consejos de temporada y productos relacionados. Sustituye a WhatsApp como canal de ayuda postcompra.",
    objetivos: [
      "Centralizar la información",
      "Mejorar la fidelización",
      "Medir comportamiento digital",
      "Reducir dudas repetidas",
    ],
    conexion:
      "El despacho es el lugar donde se ordena la información. En EDEEN, la web cumple ese papel.",
    image: imgPasillo,
  },
  {
    id: "cocina",
    num: "09",
    nav: "La cocina",
    icon: ChefHat,
    bloque: "Marketing interno",
    titulo: "La cocina",
    accion: "Marketing interno",
    copy: "La casa también se cuida desde dentro.",
    texto:
      "Si el cliente debe sentirse bien recibido, el equipo también debe sentirse cuidado. Las acciones internas se centran en permanencia, pertenencia y buen ambiente.",
    objetivos: [
      "Reducir rotación",
      "Satisfacción del equipo",
      "Reforzar pertenencia",
      "Reconocer la permanencia",
    ],
    conexion:
      "Una casa no funciona solo por lo que se ve desde fuera. También necesita estar cuidada por dentro. En EDEEN, ese interior es el equipo.",
    image: imgCocina,
  },
];

/* Imágenes que se cruza-funden en el backdrop fijo, alineadas con cada sección
   en orden: portada, mapa, justificación, 9 estancias, mapa final, cierre. */
const BACKDROP_ORDER = [
  imgExterior, // 0 portada
  imgJardin, // 1 visión general
  imgRecibidor, // 2 ¿por qué una casa?
  ...ROOMS.map((r) => r.image), // 3..11 estancias
  imgJardin, // 12 mapa final
  imgExterior, // 13 cierre
];

/* ----------------------------- helpers ----------------------------- */

function useReveal<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        opacity: shown ? 1 : 0,
        transition: "opacity .9s ease-out, transform .9s ease-out",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

/* Backdrop fijo que mezcla las imágenes con desenfoque suave en función
   del progreso de scroll. Reproduce la sensación de cámara que se desplaza
   continuamente por una casa: nunca hay un corte limpio entre estancias. */
function CameraBackdrop({
  images,
  progress,
}: {
  images: string[];
  progress: number;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a1f33]"
    >
      {images.map((src, i) => {
        const distance = Math.abs(progress - i);
        const raw = Math.exp(-(distance * distance) / (2 * 0.85 * 0.85));
        const opacity = Math.min(1, raw * 1.3);
        const scale = 1.06 + Math.max(0, 0.06 - distance * 0.06);
        const translate = (progress - i) * 1.2; // sutil desplazamiento horizontal
        return (
          <div
            key={src + i}
            className="absolute inset-0 bg-cover bg-center will-change-[opacity,transform]"
            style={{
              backgroundImage: `url(${src})`,
              opacity,
              transform: `scale(${scale}) translateX(${translate}%)`,
              transition:
                "opacity 500ms ease-out, transform 1100ms ease-out",
            }}
          />
        );
      })}
      {/* Velo de unidad para garantizar legibilidad y un tono mediterráneo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,31,51,0.55) 0%, rgba(10,31,51,0.25) 35%, rgba(10,31,51,0.55) 75%, rgba(10,31,51,0.85) 100%)",
        }}
      />
    </div>
  );
}

/* Cápsula contenedora de cada sección — sólo registra ref e índice. */
function Stage({
  index,
  registerRef,
  id,
  className = "",
  children,
}: {
  index: number;
  registerRef: (idx: number, el: HTMLElement | null) => void;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      ref={(el) => registerRef(index, el)}
      data-stage-idx={index}
      className={"relative isolate scroll-mt-24 " + className}
    >
      {children}
    </section>
  );
}

/* ----------------------------- nav ----------------------------- */

function ProgressRail({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  const stages = useMemo(
    () => [
      { id: "portada", label: "Portada" },
      { id: "casa", label: "La casa" },
      { id: "porque", label: "¿Por qué?" },
      ...ROOMS.map((r) => ({ id: r.id, label: r.nav })),
      { id: "mapa", label: "Mapa final" },
      { id: "cierre", label: "Cierre" },
    ],
    [],
  );
  return (
    <nav
      aria-label="Recorrido por la casa EDEEN"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-2"
    >
      {stages.map((s, i) => {
        const active = i === current;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3 justify-end"
            title={s.label}
          >
            <span
              className={
                "text-[0.6rem] uppercase tracking-[0.32em] transition " +
                (active
                  ? "text-white opacity-100"
                  : "text-white/60 opacity-0 group-hover:opacity-100")
              }
            >
              {s.label}
            </span>
            <span
              className={
                "block h-px transition-all " +
                (active
                  ? "w-12 bg-white"
                  : "w-6 bg-white/40 group-hover:w-10 group-hover:bg-white/80")
              }
            />
          </a>
        );
      })}
      <span className="mt-3 text-right text-[0.55rem] uppercase tracking-[0.4em] text-white/55">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </nav>
  );
}

function MobileDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="xl:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-1.5 bg-black/40 backdrop-blur-md px-3 py-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={
            "h-1.5 transition-all " +
            (i === current ? "w-6 bg-white" : "w-1.5 bg-white/40")
          }
        />
      ))}
    </div>
  );
}

/* ----------------------------- page ----------------------------- */

function SientetePage() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [progress, setProgress] = useState(0);

  const registerRef = useCallback((idx: number, el: HTMLElement | null) => {
    sectionsRef.current[idx] = el;
  }, []);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const vh = window.innerHeight;
      const center = window.scrollY + vh / 2;
      const sections = sectionsRef.current.filter(Boolean) as HTMLElement[];
      if (!sections.length) return;
      let p = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = sections[i];
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (center >= top && center < bottom) {
          const local = (center - top) / Math.max(1, bottom - top);
          p = i + local;
          break;
        }
        if (i === sections.length - 1 && center >= bottom) {
          p = sections.length - 1;
        }
      }
      setProgress(p);
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

  const totalStages = BACKDROP_ORDER.length;
  const current = Math.min(totalStages - 1, Math.max(0, Math.round(progress)));

  return (
    <div className="relative text-white">
      <CameraBackdrop images={BACKDROP_ORDER} progress={progress} />
      <ProgressRail total={totalStages} current={current} />
      <MobileDots total={totalStages} current={current} />

      {/* 1 · PORTADA */}
      <Stage
        index={0}
        registerRef={registerRef}
        id="portada"
        className="min-h-[100svh] flex items-center"
      >
        <div className="relative z-10 mx-auto max-w-6xl w-full px-6 lg:px-10 py-32">
          <Reveal delay={80}>
            <p className="text-[0.65rem] uppercase tracking-[0.42em] text-white/85">
              Campaña EDEEN · Centro de jardinería · Palma
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="mt-6 font-display text-[14vw] leading-[0.92] tracking-[-0.03em] sm:text-[10vw] lg:text-[8.5rem] text-balance">
              Siéntete
              <br />
              <em className="not-italic bg-gradient-to-r from-white via-[#cfe5f6] to-[#33a2ed] bg-clip-text text-transparent">
                como en casa.
              </em>
            </h1>
          </Reveal>
          <Reveal delay={360}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/85">
              Una campaña de EDEEN basada en el concepto anfitrión / invitado.
              EDEEN no se comunica como una tienda más: se comporta como un
              buen anfitrión.
            </p>
          </Reveal>
          <Reveal delay={520}>
            <div className="mt-10 inline-block border border-white/30 bg-white/5 backdrop-blur-md px-6 py-4 max-w-xl">
              <p className="font-display italic text-xl md:text-2xl text-white text-balance">
                «Un lugar donde entrar sin prisa, quedarse a gusto y volver con
                ganas.»
              </p>
            </div>
          </Reveal>
          <Reveal delay={680}>
            <a
              href="#casa"
              data-rounded="full"
              className="group mt-12 inline-flex items-center gap-3 bg-white px-6 py-3.5 text-sm font-medium text-[#0169af] transition hover:bg-white/90"
            >
              Empieza el recorrido
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </Stage>

      {/* 2 · LA CASA EDEEN — VISTA GENERAL */}
      <Stage
        index={1}
        registerRef={registerRef}
        id="casa"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 grid gap-14 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/70">
                Idea visual de campaña
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] text-balance">
                La casa
                <br />
                <em className="not-italic bg-gradient-to-r from-white via-[#7fc4f5] to-[#33a2ed] bg-clip-text text-transparent">
                  EDEEN.
                </em>
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-8 text-lg leading-relaxed text-white/85">
                Cada acción del plan ocupa una estancia. Todas juntas
                construyen una misma experiencia: recibir, acompañar, cuidar y
                hacer que el cliente quiera volver.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-6 font-display italic text-xl text-[#cfe5f6]">
                «No son acciones sueltas. Son espacios de una misma casa.»
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={200}>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 p-3 md:p-4">
                <img
                  src={imgIso}
                  alt="Vista isométrica de la casa EDEEN con sus espacios"
                  width={1536}
                  height={1152}
                  className="w-full h-auto block"
                  loading="lazy"
                />
                <div className="absolute -top-3 -left-3 bg-[#0169af] text-white px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.3em]">
                  Mapa de la casa
                </div>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/85">
                {ROOMS.map((r) => (
                  <li key={r.id} className="flex items-center gap-2">
                    <r.icon className="h-4 w-4 text-[#33a2ed] shrink-0" strokeWidth={1.5} />
                    <span className="font-medium text-white">{r.nav}</span>
                    <span className="text-white/60">→ {r.accion}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Stage>

      {/* 3 · ¿POR QUÉ UNA CASA? */}
      <Stage
        index={2}
        registerRef={registerRef}
        id="porque"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <Reveal>
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/70">
              Justificación estratégica
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] text-balance">
              ¿Por qué
              <br />
              <em className="not-italic bg-gradient-to-r from-white via-[#cfe5f6] to-[#33a2ed] bg-clip-text text-transparent">
                una casa?
              </em>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-10 text-lg md:text-xl leading-relaxed text-white/85">
              Porque EDEEN parte del concepto anfitrión / invitado. Una casa es
              un lugar donde alguien abre la puerta, prepara el espacio, te
              hace sentir cómodo y se anticipa a lo que necesitas.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-14 inline-block border-l-2 border-[#33a2ed] pl-6 text-left">
              <p className="font-display italic text-2xl md:text-3xl text-balance text-white">
                «EDEEN no vende solo plantas. Prepara un lugar al que apetece
                entrar.»
              </p>
            </div>
          </Reveal>
          <Reveal delay={560}>
            <a
              href={`#${ROOMS[0].id}`}
              className="mt-16 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.4em] text-white/80 hover:text-white"
            >
              Entra en la casa <ArrowDown className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>
      </Stage>

      {/* 4..12 · ESTANCIAS */}
      {ROOMS.map((room, i) => (
        <Stage
          key={room.id}
          index={3 + i}
          registerRef={registerRef}
          id={room.id}
          className="min-h-[100svh] py-28 lg:py-40 flex items-center"
        >
          <RoomScene room={room} index={i} />
        </Stage>
      ))}

      {/* 13 · MAPA FINAL */}
      <Stage
        index={3 + ROOMS.length}
        registerRef={registerRef}
        id="mapa"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
          <div className="text-center">
            <Reveal>
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/70">
                Mapa final
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] text-balance">
                La casa
                <br />
                <em className="not-italic bg-gradient-to-r from-white via-[#7fc4f5] to-[#33a2ed] bg-clip-text text-transparent">
                  completa.
                </em>
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-white/85">
                Cada espacio cumple una función. Juntos construyen una
                experiencia coherente: recibir, acompañar, cuidar y hacer que
                el cliente quiera volver.
              </p>
            </Reveal>
          </div>

          <Reveal delay={320}>
            <div className="relative mt-14 bg-white/5 backdrop-blur-sm border border-white/20 p-3 md:p-4">
              <img
                src={imgIso}
                alt="Mapa final de la casa EDEEN"
                width={1536}
                height={1152}
                loading="lazy"
                className="w-full h-auto block"
              />
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ROOMS.map((r, i) => (
                <a
                  key={r.id}
                  href={`#${r.id}`}
                  className="group flex items-center gap-3 border border-white/15 bg-white/5 backdrop-blur px-4 py-3 hover:bg-white/10 hover:border-white/35 transition"
                >
                  <span
                    data-rounded="full"
                    className="flex h-9 w-9 items-center justify-center bg-[#0169af] text-white text-xs font-semibold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[0.6rem] uppercase tracking-[0.28em] text-[#cfe5f6]">
                      {r.nav}
                    </span>
                    <span className="block text-sm text-white truncate">
                      {r.accion}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/50 group-hover:text-white" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Stage>

      {/* 14 · CIERRE */}
      <Stage
        index={4 + ROOMS.length}
        registerRef={registerRef}
        id="cierre"
        className="min-h-[100svh] py-32 lg:py-44 flex items-center"
      >
        <div className="relative z-10 mx-auto max-w-4xl w-full px-6 lg:px-10 text-center">
          <Reveal>
            <MapPin
              className="mx-auto h-7 w-7 text-[#9ad4f7]"
              strokeWidth={1.4}
            />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-6 font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.02em] text-balance">
              Siéntete
              <br />
              <em className="not-italic bg-gradient-to-r from-white via-[#7fc4f5] to-[#33a2ed] bg-clip-text text-transparent">
                como en casa.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-10 text-lg md:text-xl leading-relaxed text-white/85">
              La campaña convierte el plan de marketing en una experiencia
              completa. No son acciones aisladas: son gestos de anfitrión.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-14 inline-block border border-white/25 bg-white/5 backdrop-blur px-8 py-6">
              <p className="font-display italic text-2xl md:text-3xl text-balance text-white">
                «EDEEN no se comunica como una tienda más. Se comporta como un
                buen anfitrión.»
              </p>
            </div>
          </Reveal>
          <Reveal delay={580}>
            <p className="mt-14 text-[0.65rem] uppercase tracking-[0.42em] text-white/60">
              Campaña EDEEN · Siéntete como en casa
            </p>
          </Reveal>
        </div>
      </Stage>
    </div>
  );
}

/* ----------------------------- room scene ----------------------------- */

function RoomScene({ room, index }: { room: Room; index: number }) {
  const Icon = room.icon;
  const isEven = index % 2 === 0;
  return (
    <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-10">
      <div
        className={
          "grid gap-12 lg:gap-20 items-center lg:grid-cols-12 " +
          (isEven ? "" : "lg:[&>*:first-child]:order-2")
        }
      >
        {/* Tarjeta visual flotante con icono y etiquetas */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative">
              <div
                className="relative aspect-[4/5] border border-white/20 bg-white/5 backdrop-blur-md overflow-hidden"
                style={{
                  boxShadow:
                    "0 40px 80px -30px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
                }}
              >
                {/* Etiqueta superior */}
                <div className="absolute left-5 top-5 flex items-center gap-2 bg-white/95 px-3 py-2">
                  <span
                    data-rounded="full"
                    className="h-2 w-2 bg-[#33a2ed] animate-pulse"
                  />
                  <span className="text-[0.65rem] uppercase tracking-[0.28em] text-[#0169af]">
                    Estancia {room.num}
                  </span>
                </div>

                {/* Icono central como símbolo de la estancia */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    data-rounded="full"
                    className="flex h-44 w-44 md:h-56 md:w-56 items-center justify-center bg-white/10 backdrop-blur-xl border border-white/30"
                    style={{
                      boxShadow:
                        "0 25px 60px -20px rgba(1,105,175,0.55), inset 0 0 0 1px rgba(255,255,255,0.18)",
                    }}
                  >
                    <Icon
                      className="h-20 w-20 md:h-24 md:w-24 text-white"
                      strokeWidth={1.1}
                    />
                  </div>
                </div>

                {/* Etiqueta inferior con la acción */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 px-4 py-3">
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-[#33a2ed]">
                    {room.nav}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {room.accion}
                  </p>
                </div>
              </div>

              {room.bloque && (
                <div className="absolute -top-3 -right-3 bg-[#0169af] text-white px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.3em]">
                  {room.bloque}
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Texto */}
        <div className="lg:col-span-7">
          <Reveal delay={120}>
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/70">
              {room.num} · {room.nav}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h2 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] text-balance">
              {room.titulo}
              <br />
              <em className="not-italic bg-gradient-to-r from-white via-[#7fc4f5] to-[#33a2ed] bg-clip-text text-transparent">
                {room.accion}.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p
              className="mt-7 font-display italic text-2xl md:text-3xl leading-snug text-balance"
              style={{ color: "#cfe5f6" }}
            >
              «{room.copy}»
            </p>
          </Reveal>
          <Reveal delay={400}>
            <p className="mt-7 text-lg leading-relaxed text-white/85 max-w-2xl">
              {room.texto}
            </p>
          </Reveal>

          <Reveal delay={500}>
            <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-2 max-w-2xl">
              {room.objetivos.map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-2 text-sm text-white/85"
                >
                  <span
                    data-rounded="full"
                    className="mt-2 h-1.5 w-1.5 bg-[#33a2ed] shrink-0"
                  />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-9 border-l-2 border-[#33a2ed] pl-5 max-w-2xl">
              <p className="text-[0.6rem] uppercase tracking-[0.32em] text-[#7fc4f5] mb-2">
                Conexión con la casa
              </p>
              <p className="font-display italic text-lg text-white/95 text-balance">
                {room.conexion}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}