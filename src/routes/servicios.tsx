import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, Sprout, Hammer, TreePine, Flower2, Leaf } from "lucide-react";
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

import plantasImg from "@/assets/edeen/planta-vivero.jpg";
import maceteriaImg from "@/assets/edeen/maceta-1.jpg";
import paisajismoImg from "@/assets/edeen/jardin-amplio.jpg";
import floristeriaImg from "@/assets/edeen/floristeria-bouquet.jpg";
import jardineriaImg from "@/assets/edeen/jardineria.jpg";
import pasilloPlantas from "@/assets/edeen/pasillo-plantas.jpg";
import vistaAerea from "@/assets/edeen/vista-aerea.jpg";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Las estancias de la casa — Servicios eDeen Mallorca" },
      {
        name: "description",
        content:
          "Cinco estancias bajo el mismo techo verde: vivero, macetería, paisajismo, floristería para bodas y mantenimiento de jardines en Palma de Mallorca.",
      },
      { property: "og:title", content: "Las estancias de la casa — eDeen" },
      { property: "og:image", content: paisajismoImg },
      {
        property: "og:description",
        content:
          "Una casa con cinco estancias verdes. Plantas, macetería, paisajismo, floristería y cuidado anual en Palma.",
      },
    ],
  }),
  component: ServiciosPage,
});

const services = [
  {
    icon: Sprout,
    eyebrow: "El vivero · Plantas",
    index: "01",
    title: "Pasea, mira, elige sin prisa.",
    desc: "Más de 14.000 m² para que recorras la casa a tu ritmo. Plantas de interior y exterior en pequeño, mediano y gran porte. Te explicamos sustratos, riego y tratamientos antes de que la planta cruce la puerta contigo.",
    anfitrion: "Si una planta no va a sobrevivir en tu rincón, te lo decimos antes de que pagues. Siempre.",
    bullets: ["Interior y exterior", "Tratamientos bio y químicos", "Sustratos y abonos", "Asesoramiento sin compromiso"],
    img: pasilloPlantas,
  },
  {
    icon: Hammer,
    eyebrow: "El armario · Macetería",
    index: "02",
    title: "La maceta es la ropa de la planta.",
    desc: "Una buena maceta no se nota cuando está llena. Se nota cuando está vacía — y te sigue gustando. Desde barro mallorquín de siempre hasta cerámica y fibras contemporáneas. Te ayudamos a elegir la pieza que va a envejecer bien contigo.",
    anfitrion: "Cuando alguien duda entre dos macetas, le pedimos que describa el rincón. La respuesta casi siempre nos da la solución.",
    bullets: ["Barro mallorquín", "Cerámica y fibras naturales", "Diseño contemporáneo", "Envíos a domicilio"],
    img: maceteriaImg,
  },
  {
    icon: TreePine,
    eyebrow: "Tu casa · Paisajismo",
    index: "03",
    title: "Diseñamos, plantamos y cuidamos tu jardín.",
    desc: "Empezamos por ir a verte. Queremos escuchar cómo vives el espacio antes de proponer nada. Después diseñamos, plantamos y mantenemos — siempre pensando en el clima mediterráneo de Mallorca y en que el jardín se cuide solo el máximo tiempo posible.",
    anfitrion: "Un jardín bien diseñado no te da trabajo: te da compañía. Ese es el objetivo que tenemos en cada proyecto.",
    bullets: ["Visita técnica gratuita", "Diseño y proyecto a medida", "Llave en mano", "Riego automático"],
    img: paisajismoImg,
  },
  {
    icon: Flower2,
    eyebrow: "El salón · Floristería",
    index: "04",
    title: "Para los días que se quedan grabados.",
    desc: "Composiciones florales para bodas, eventos corporativos y celebraciones. Cada arreglo se piensa con calma, escuchando primero el momento que vas a vivir, no el catálogo. No hacemos ramos genéricos — hacemos el tuyo.",
    anfitrion: "Las flores duran un día. El recuerdo del ambiente que creamos puede durar toda la vida.",
    bullets: ["Bodas y celebraciones", "Decoración integral", "Composiciones a medida", "Acompañamiento durante el evento"],
    img: floristeriaImg,
  },
  {
    icon: Leaf,
    eyebrow: "El cuidado · Mantenimiento",
    index: "05",
    title: "Si no tienes tiempo, lo hacemos por ti.",
    desc: "Cuando tu jardín necesita atención y tú no tienes tiempo, nosotros nos ocupamos. Mismo equipo, todo el año, sin que tengas que explicar nada dos veces. Para particulares, comunidades, hoteles y empresas.",
    anfitrion: "Trabajamos con algunos clientes desde hace más de diez años. Eso no pasa por casualidad — pasa porque cuidamos los jardines como si fueran nuestros.",
    bullets: ["Particulares y comunidades", "Hoteles y empresas", "Planes anuales", "Mismo equipo todo el año"],
    img: jardineriaImg,
  },
] as const;

function ServiciosPage() {
  const { progress, registerRef, registerImageRef } = useScenicProgress();
  const images = [paisajismoImg, plantasImg, maceteriaImg, paisajismoImg, floristeriaImg, jardineriaImg, vistaAerea, scenicFooterImage];

  return (
    <div className="relative text-white">
      <ScenicBackdrop images={images} registerImageRef={registerImageRef} />

      {/* HERO */}
      <Scene
        index={0}
        registerRef={registerRef}
        alt="Las estancias de la casa eDeen"
        className="min-h-[100svh] flex flex-col"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-32 lg:px-8">
          <Reveal delay={120}>
            <p className={"font-display italic text-lg sm:text-xl text-white/95"}>
              Las estancias de la casa.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="mt-5 font-display text-[13vw] leading-[0.86] tracking-[-0.045em] sm:text-[9.5vw] lg:text-[8rem] text-balance text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              Cinco estancias,
              <br />
              <em className="not-italic text-[#f1ece4]">un mismo cuidado.</em>
            </h1>
          </Reveal>
          <Reveal delay={340}>
            <p className={"mt-8 max-w-xl " + sceneBody}>
              EDEEN no es una tienda con secciones: es una casa con
              estancias. Cada una tiene su propio carácter, su propio
              equipo y su propia manera de recibirte. Entra con calma.
              No hay prisa por recorrerla.
            </p>
          </Reveal>
          <Reveal delay={440}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#servicio-01" className={scenePrimaryBtn}>
                Recorre las estancias
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link to="/contacto" className={sceneGhostBtn}>
                Cuéntanos qué te trae
              </Link>
            </div>
          </Reveal>
        </div>
      </Scene>

      {/* ESTANCIAS */}
      {services.map((s, i) => (
        <Scene
          key={s.eyebrow}
          id={`servicio-${s.index}`}
          index={i + 1}
          registerRef={registerRef}
          alt={s.eyebrow}
          className="py-32 lg:py-44"
        >
          <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
            <div className={"grid items-center gap-12 lg:grid-cols-12 " + (i % 2 === 1 ? "lg:[&>figure]:order-2" : "")}>
              <Reveal className="lg:col-span-7" delay={0}>
                <figure className="group relative h-[55vh] min-h-[380px] w-full overflow-hidden border border-white/10 bg-black/20 backdrop-blur">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-6 lg:p-8 text-white">
                    <span className="text-[0.6rem] uppercase tracking-[0.4em] text-white/85">
                      {s.index} / 05
                    </span>
                    <span className="inline-flex h-11 w-11 items-center justify-center border border-white/30 bg-white/10 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-[#0169af]">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
              <div className="lg:col-span-5">
                <Reveal>
                  <p className={"flex items-center gap-2 " + sceneEyebrow}>
                    <s.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {s.eyebrow}
                  </p>
                </Reveal>
                <Reveal delay={100}>
                  <h2 className={"mt-6 text-4xl sm:text-5xl lg:text-6xl " + sceneTitle}>
                    {s.title}
                  </h2>
                </Reveal>
                <Reveal delay={180}>
                  <p className={"mt-7 " + sceneBody}>{s.desc}</p>
                </Reveal>
                <Reveal delay={240}>
                  <ul className="mt-8 space-y-3">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-white/95">
                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/40 bg-white/10 text-[#33a2ed]">
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={300}>
                  <blockquote className="mt-8 border-l-2 border-[#33a2ed]/50 pl-5">
                    <p className="text-sm italic leading-relaxed text-white/65 text-pretty">
                      "{s.anfitrion}"
                    </p>
                    <cite className="mt-2 block text-[0.55rem] not-italic uppercase tracking-[0.3em] text-white/40">
                      El equipo de {s.eyebrow.split(" · ")[0].toLowerCase()}
                    </cite>
                  </blockquote>
                </Reveal>
                <Reveal delay={360}>
                  <Link to="/contacto" className={"mt-10 " + sceneGhostBtn}>
                    Cuéntanos tu proyecto <ArrowRight className="h-4 w-4" />
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </Scene>
      ))}

      {/* CTA FINAL */}
      <Scene
        index={services.length + 1}
        registerRef={registerRef}
        alt="Hablemos"
        className="min-h-[80svh] flex items-center"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8 py-32 text-center text-white w-full">
          <Reveal>
            <p className={sceneEyebrow}>¿Tienes un proyecto?</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className={"mx-auto mt-6 text-5xl sm:text-6xl lg:text-7xl max-w-3xl " + sceneTitle}>
              Cuéntanos qué imaginas
              <br />
              <em className="not-italic text-[#f1ece4]">y abrimos casa.</em>
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className={"mx-auto mt-8 max-w-xl " + sceneBody}>
              Cuéntanos qué imaginas. Si es pequeño, lo hacemos
              pequeño. Si es grande, también. Siempre con el mismo
              equipo y la misma manera de escuchar.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Link to="/contacto" className={scenePrimaryBtn}>
                Hablemos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/" className={sceneGhostBtn}>
                Volver al recibidor
              </Link>
            </div>
          </Reveal>
        </div>
      </Scene>
      <ScenicFooter registerRef={registerRef} index={services.length + 2} />
    </div>
  );
}
