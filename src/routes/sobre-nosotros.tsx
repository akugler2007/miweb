import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, DoorOpen, HandHeart, Sparkles, Phone, Quote } from "lucide-react";
import {
  Reveal,
  Scene,
  ScenicBackdrop,
  ScenicFooter,
  scenicFooterImage,
  useScenicProgress,
  sceneEyebrow,
  sceneTitle,
  sceneBody,
  scenePrimaryBtn,
  sceneGhostBtn,
} from "@/components/scenic";

import hero1 from "@/assets/edeen/hero-1.jpg";
import hero2 from "@/assets/edeen/hero-2.jpg";
import mesaEventos from "@/assets/edeen/mesa-eventos.jpg";
import cocheVintage from "@/assets/edeen/coche-vintage.jpg";
import exteriorEdeen from "@/assets/edeen/exterior-edeen.jpg";
import casaJardin from "@/assets/edeen/casa-jardin.jpg";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({
    meta: [
      { title: "Quiénes te reciben — Sobre eDeen Espacio Natural" },
      {
        name: "description",
        content:
          "Detrás de la puerta de EDEEN hay un equipo. Empresa para el Desarrollo de Espacios Naturales, en Palma de Mallorca desde 2012. Te tratamos como a un invitado.",
      },
      { property: "og:title", content: "Quiénes te reciben — eDeen" },
      { property: "og:image", content: hero1 },
      {
        property: "og:description",
        content:
          "Misión, visión y valores de EDEEN. Una casa con anfitriones de verdad en Palma.",
      },
    ],
  }),
  component: AboutPage,
});

const valores = [
  {
    n: "01",
    icon: DoorOpen,
    title: "Compromiso",
    desc: "Con el entorno, contigo y con cada planta que sale por la puerta. Si algo falla, lo arreglamos.",
    ejemplo: "Si una planta no llega bien a casa, la cambiamos. Sin preguntas ni justificaciones.",
  },
  {
    n: "02",
    icon: HandHeart,
    title: "Autenticidad",
    desc: "Te asesoramos pensando en lo mejor para tu espacio. Sin venderte de más. Sin guion.",
    ejemplo: "No vamos a recomendarte la especie más cara si no es la adecuada para tu terraza. Así de simple.",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Buen rollo",
    desc: "Creamos un ambiente donde apetece quedarse. La casa abre la puerta con una sonrisa.",
    ejemplo: "Si estás un rato entre los pasillos sin comprar nada, perfecto. La casa está para recibir, no para facturar.",
  },
  {
    n: "04",
    icon: Phone,
    title: "Cercanía",
    desc: "Escuchamos antes de hablar. Nos implicamos en cada proyecto como si fuera el nuestro.",
    ejemplo: "Cuando terminamos un jardín, algunos clientes nos escriben meses después para contarnos cómo va. Eso es lo que buscamos.",
  },
] as const;

const anfitriones = [
  {
    area: "El vivero",
    voz: "Llevamos el vivero. Si una planta necesita más luz de la que tiene en tu rincón, te lo decimos antes de que pagues. Siempre.",
  },
  {
    area: "Paisajismo",
    voz: "Lo primero que pregunto no es cuánto quieres gastar, sino cómo vives tu espacio. El presupuesto viene después.",
  },
  {
    area: "Es Berenar",
    voz: "Cada mañana venimos con lo que encontramos en el mercado. Lo que se sirve aquí es lo que la temporada manda — nada más.",
  },
  {
    area: "Eventos",
    voz: "Una boda entre 14.000 m² de plantas es algo que no se olvida. Ni para el cliente ni para nosotros.",
  },
] as const;

function AboutPage() {
  const { progress, registerRef, registerImageRef } = useScenicProgress();
  const images = [hero1, hero2, casaJardin, exteriorEdeen, hero1, exteriorEdeen, exteriorEdeen, mesaEventos, cocheVintage, scenicFooterImage];

  return (
    <div className="relative text-white">
      <ScenicBackdrop images={images} registerImageRef={registerImageRef} />

      {/* HERO */}
      <Scene
        index={0}
        registerRef={registerRef}
        alt="Quiénes te reciben"
        className="min-h-[100svh] flex flex-col"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-32 lg:px-8">
          <Reveal delay={120}>
            <p className="font-display italic text-lg sm:text-xl text-white/95">
              Detrás de la puerta hay un equipo.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="mt-5 font-display text-[13vw] leading-[0.86] tracking-[-0.045em] sm:text-[9.5vw] lg:text-[8rem] text-balance text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              Quiénes
              <br />
              <em className="not-italic text-[#f1ece4]">te reciben.</em>
            </h1>
          </Reveal>
          <Reveal delay={340}>
            <p className={"mt-8 max-w-xl " + sceneBody}>
              Somos el equipo que abre la puerta de eDeen cada
              mañana. Desde 2012 en Palma, plantamos, diseñamos,
              cuidamos jardines y preparamos desayunos — siempre
              con la misma idea: que quien entra se sienta como en
              su propia casa.
            </p>
          </Reveal>
        </div>
      </Scene>

      {/* POR QUÉ HACEMOS CASA */}
      <Scene
        index={1}
        registerRef={registerRef}
        alt="Por qué hacemos casa"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <figure className="group relative h-[60vh] min-h-[420px] w-full overflow-hidden border border-white/10">
                <img
                  src={hero2}
                  alt="Detalle del centro eDeen"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </figure>
            </Reveal>
            <div className="lg:col-span-6">
              <Reveal>
                <p className={sceneEyebrow}>Por qué hacemos casa</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className={"mt-6 text-4xl sm:text-5xl lg:text-6xl " + sceneTitle}>
                  No competimos por producto.
                  <em className="not-italic text-[#f1ece4]"> Competimos por experiencia.</em>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <p className={"mt-7 " + sceneBody}>
                  EDEEN no busca destacar por precio ni por
                  ubicación. Lo que nos define es cómo te hacemos
                  sentir mientras estás con nosotros — y cuando ya
                  no estás. Por eso pensamos cada gesto como un
                  anfitrión piensa una visita: la puerta, la
                  bienvenida, el recorrido, lo que se ofrece, y
                  lo que queda después.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Scene>

      {/* LOS ANFITRIONES */}
      <Scene
        index={2}
        registerRef={registerRef}
        alt="Los anfitriones"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <p className={sceneEyebrow}>Las personas detrás de la puerta</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className={"mt-6 text-5xl sm:text-6xl lg:text-7xl " + sceneTitle}>
                Los que te
                <br />
                <em className="not-italic text-[#f1ece4]">reciben cada día.</em>
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className={"mt-7 max-w-xl " + sceneBody}>
                En eDeen no hay guiones. Cada estancia tiene su equipo,
                y cada persona del equipo te habla de lo que sabe — con
                honestidad y sin complicarte la vida.
              </p>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:gap-6">
            {anfitriones.map((a, i) => (
              <Reveal key={a.area} delay={i * 80}>
                <div className="h-full border border-white/15 bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-start gap-3">
                    <Quote className="mt-1 h-4 w-4 shrink-0 text-[#33a2ed]" strokeWidth={1.5} />
                    <p className="text-lg leading-relaxed text-white/90 italic text-pretty">
                      {a.voz}
                    </p>
                  </div>
                  <p className="mt-6 text-[0.6rem] uppercase tracking-[0.35em] text-white/60">
                    {a.area}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Scene>

      {/* MISIÓN */}
      <Scene
        index={3}
        registerRef={registerRef}
        alt="Misión"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-5xl px-5 lg:px-8 text-center">
          <Reveal>
            <p className={sceneEyebrow}>Misión</p>
          </Reveal>
          <Reveal delay={100}>
            <h3 className={"mt-6 text-5xl sm:text-6xl lg:text-7xl " + sceneTitle}>
              Acompañar a las personas
              <br />
              <em className="not-italic text-[#f1ece4]">a habitar sus espacios.</em>
            </h3>
          </Reveal>
          <Reveal delay={180}>
            <p className={"mx-auto mt-8 max-w-2xl " + sceneBody}>
              Ofrecemos plantas, soluciones de jardinería y
              asesoramiento honesto y cercano. Diseñamos un lugar
              donde clientes, familias y mascotas pueden compartir
              momentos en un ambiente singular. Como una casa
              abierta a quien la necesite.
            </p>
          </Reveal>
        </div>
      </Scene>

      {/* VISIÓN */}
      <Scene
        index={4}
        registerRef={registerRef}
        alt="Visión"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-5xl px-5 lg:px-8 text-center">
          <Reveal>
            <p className={sceneEyebrow}>Visión</p>
          </Reveal>
          <Reveal delay={100}>
            <h3 className={"mt-6 text-5xl sm:text-6xl lg:text-7xl " + sceneTitle}>
              Ser la casa
              <br />
              <em className="not-italic text-[#f1ece4]">de referencia en Palma.</em>
            </h3>
          </Reveal>
          <Reveal delay={180}>
            <p className={"mx-auto mt-8 max-w-2xl " + sceneBody}>
              Destacar por la confianza, la atención y el bienestar
              que generamos. Acompañar con cercanía y educación,
              ayudando a tomar decisiones con tranquilidad — para
              que cada visita se sienta como volver a casa.
            </p>
          </Reveal>
        </div>
      </Scene>

      {/* VALORES */}
      <Scene
        index={5}
        registerRef={registerRef}
        alt="Valores"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <p className={sceneEyebrow}>Cómo te recibimos</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className={"mt-6 text-5xl sm:text-6xl lg:text-7xl " + sceneTitle}>
                Cuatro gestos
                <br />
                <em className="not-italic text-[#f1ece4]">de anfitrión.</em>
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className={"mt-7 max-w-xl " + sceneBody}>
                Compromiso, autenticidad, buen rollo y cercanía. Los
                cuatro valores de EDEEN traducidos a la forma en que
                tratamos a cada invitado que cruza la puerta.
              </p>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {valores.map((v, i) => (
              <Reveal key={v.n} delay={i * 100}>
                <div className="h-full border border-white/15 bg-white/5 p-8 backdrop-blur flex flex-col">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-sm tracking-[0.3em] text-[#33a2ed]">{v.n}</p>
                    <v.icon className="h-5 w-5 text-white/80" strokeWidth={1.4} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-white">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/85 text-pretty">{v.desc}</p>
                  <p className="mt-5 text-xs leading-relaxed text-white/55 border-t border-white/10 pt-5 text-pretty italic">
                    {v.ejemplo}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Scene>

      {/* HISTORIA */}
      <Scene
        index={6}
        registerRef={registerRef}
        alt="Historia"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-5">
              <p className={sceneEyebrow}>Nuestra historia</p>
              <h2 className={"mt-6 text-5xl sm:text-6xl " + sceneTitle}>
                Desde 2012,
                <br />
                <em className="not-italic text-[#f1ece4]">levantando casa.</em>
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={120}>
              <div className="space-y-6 text-white/95 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
                <p>
                  EDEEN nace en Palma con una idea sencilla: que un
                  centro de jardinería puede ser, además, un lugar
                  donde te apetezca quedarte.
                </p>
                <p>
                  Empezamos con el vivero. Después llegó la
                  macetería, los proyectos de paisajismo, las flores
                  para bodas y, hace pocos años, Es Berenar — la
                  cocina de la casa, donde el desayuno se sirve
                  entre plantas y sin reloj.
                </p>
                <p>
                  Hoy somos un equipo que cuida más de 14.000 m² de
                  vivero y acompaña a particulares, hoteles y
                  empresas en cualquier rincón verde de la isla.
                </p>
                <p>
                  Y hay algo que no ha cambiado desde el primer día:
                  cuando alguien cruza la puerta, queremos que se
                  sienta bien. Que vuelva. Que lo recomiende a
                  alguien de confianza. Que sienta que ha estado en
                  casa.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Scene>

      {/* EVENTOS — abrir la casa */}
      <Scene
        index={7}
        registerRef={registerRef}
        alt="Eventos"
        className="py-32 lg:py-40"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <Reveal>
              <p className={sceneEyebrow}>Abrir la casa</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className={"mt-6 text-5xl sm:text-6xl lg:text-7xl " + sceneTitle}>
                También abrimos la casa
                <br />
                <em className="not-italic text-[#f1ece4]">para tus celebraciones.</em>
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className={"mt-7 max-w-xl " + sceneBody}>
                Bodas civiles, presentaciones, eventos corporativos
                o cenas de equipo. EDEEN se transforma en un
                escenario natural lleno de plantas, luz y silencio.
                Si lo imaginas, lo montamos contigo.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-4 max-w-xl text-base text-white/65 italic [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">
                Imagina celebrarlo rodeado de plantas, con el olor
                del jardín de fondo y el silencio que solo se
                encuentra fuera del centro de la ciudad.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            <Reveal delay={0}>
              <figure className="group relative aspect-[4/3] w-full overflow-hidden border border-white/10">
                <img
                  src={mesaEventos}
                  alt="Mesa preparada para evento"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </figure>
            </Reveal>
            <Reveal delay={140}>
              <figure className="group relative aspect-[4/3] w-full overflow-hidden border border-white/10">
                <img
                  src={cocheVintage}
                  alt="Detalle de eventos"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </figure>
            </Reveal>
          </div>
        </div>
      </Scene>

      {/* CITA + CTA */}
      <Scene
        index={8}
        registerRef={registerRef}
        alt="Lo que prometemos"
        className="min-h-[85svh] flex items-center"
      >
        <div className="relative z-10 mx-auto max-w-4xl px-5 lg:px-8 py-32 text-center text-white w-full">
          <Reveal>
            <p className={sceneEyebrow}>Lo que prometemos</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 font-display text-3xl italic sm:text-4xl lg:text-5xl text-balance text-[#f1ece4] [text-shadow:0_2px_18px_rgba(0,0,0,0.5)]">
              "Cuidamos cada planta como si fuera a salir
              <br />
              de casa con uno de los nuestros."
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Link to="/contacto" className={scenePrimaryBtn}>
                Ven a conocernos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/" className={sceneGhostBtn}>
                Volver al recibidor
              </Link>
            </div>
          </Reveal>
        </div>
      </Scene>
      <ScenicFooter registerRef={registerRef} index={9} />
    </div>
  );
}
