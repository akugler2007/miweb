import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sprout,
  Flower2,
  TreePine,
  Coffee,
  Hammer,
  HeartHandshake,
  DoorOpen,
  Sofa,
  ChefHat,
  Sparkles,
  HandHeart,
  Phone,
} from "lucide-react";
import { HeroSlider } from "@/components/hero-slider";
import { Testimonials } from "@/components/testimonials";
import { MapEmbed } from "@/components/map-embed";
import { TrustStrip } from "@/components/trust-strip";

import plantasImg from "@/assets/edeen/planta-vivero.jpg";
import maceteriaImg from "@/assets/edeen/maceta-1.jpg";
import paisajismoImg from "@/assets/edeen/jardin-amplio.jpg";
import floristeriaImg from "@/assets/edeen/floristeria-bouquet.jpg";
import cafeteriaImg from "@/assets/edeen/cafe-desayuno-1.jpg";
import jardineriaImg from "@/assets/edeen/jardineria.jpg";

import paseo1 from "@/assets/edeen/pasillo-plantas.jpg";
import paseo2 from "@/assets/edeen/centro-jardineria.jpg";
import paseo3 from "@/assets/edeen/exterior-edeen.jpg";
import paseo4 from "@/assets/edeen/textura-helecho.jpg";
import paseo5 from "@/assets/edeen/huerto.jpg";
import paseo6 from "@/assets/edeen/rincon-edeen.jpg";

import cafeAmbiente from "@/assets/edeen/cafe-interior.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "eDeen — Siéntete como en casa | Centro de jardinería en Palma" },
      {
        name: "description",
        content:
          "Bienvenido a la casa EDEEN. Centro de jardinería en Palma con 14.000 m² de plantas, paisajismo, floristería y la cafetería Es Berenar. Te tratamos como a un invitado.",
      },
      { property: "og:title", content: "eDeen — Siéntete como en casa" },
      {
        property: "og:description",
        content:
          "La casa EDEEN abre la puerta. Plantas, paisajismo, floristería y cafetería entre plantas en Palma de Mallorca.",
      },
    ],
  }),
  component: HomePage,
});

const estancias = [
  {
    title: "El vivero",
    subtitle: "Plantas",
    img: plantasImg,
    to: "/servicios",
    icon: Sprout,
    desc: "Más de 14.000 m² para pasear y elegir. Te acompañamos sin prisa.",
  },
  {
    title: "El armario",
    subtitle: "Macetería",
    img: maceteriaImg,
    to: "/servicios",
    icon: Hammer,
    desc: "Del barro mallorquín a la pieza contemporánea. La ropa de tu planta.",
  },
  {
    title: "Tu casa",
    subtitle: "Paisajismo",
    img: paisajismoImg,
    to: "/servicios",
    icon: TreePine,
    desc: "Diseñamos, plantamos y cuidamos tu jardín como si fuera nuestro.",
  },
  {
    title: "El salón",
    subtitle: "Floristería",
    img: floristeriaImg,
    to: "/servicios",
    icon: Flower2,
    desc: "Bodas, eventos y celebraciones. Para los días que te quedan grabados.",
  },
  {
    title: "La cocina",
    subtitle: "Es Berenar",
    img: cafeteriaImg,
    to: "/cafeteria",
    icon: Coffee,
    desc: "Desayunos honestos, café de especialidad y producto local mallorquín.",
  },
  {
    title: "El cuidado",
    subtitle: "Mantenimiento",
    img: jardineriaImg,
    to: "/servicios",
    icon: HeartHandshake,
    desc: "Si no tienes tiempo, lo hacemos por ti. Planes anuales a tu medida.",
  },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <HeroSlider />

      {/* EL RECIBIDOR — bienvenida */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8 animate-fade-up">
          <p className="eyebrow">El recibidor · eDeen</p>
          <h1 className="mt-6 font-display text-5xl text-foreground sm:text-6xl lg:text-7xl text-balance">
            Pasa.
            <br />
            <em className="italic text-primary">Estás en casa.</em>
          </h1>
          <div className="divider-dot mt-10"><span /></div>
          <p className="mt-10 text-lg leading-relaxed text-muted-foreground text-pretty">
            EDEEN no es solo un centro de jardinería. Es una casa
            abierta en el corazón de Palma, donde alguien te recibe,
            te enseña los espacios sin prisa y te acompaña en cada
            decisión. Un lugar donde las plantas crecen — y las
            personas también.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/servicios"
              className="pill group inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Recorre las estancias
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contacto"
              className="pill inline-flex items-center gap-2 border border-border bg-card px-7 py-3.5 text-sm font-medium text-foreground transition hover:border-foreground"
            >
              Toca el timbre
            </Link>
          </div>
        </div>
      </section>

      {/* LAS ESTANCIAS — servicios como habitaciones */}
      <section className="border-t border-border bg-sand py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <header className="flex flex-col items-end justify-between gap-6 sm:flex-row mb-14">
            <div className="max-w-xl">
              <p className="eyebrow">Las estancias de la casa</p>
              <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl lg:text-6xl text-balance">
                Una casa con
                <em className="italic text-primary"> seis habitaciones verdes.</em>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
                Cada servicio de EDEEN es una estancia de la casa.
                Entras por una puerta, pero salen contigo varias
                ideas. Todo bajo el mismo techo, con el mismo equipo
                que te recibe.
              </p>
            </div>
            <Link
              to="/servicios"
              className="hidden items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all sm:inline-flex"
            >
              Ver todas las estancias <ArrowRight className="h-4 w-4" />
            </Link>
          </header>

          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {estancias.map((s) => (
              <Link
                to={s.to}
                key={s.title}
                className="group flex flex-col bg-card transition hover:bg-card/95"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-sand">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-3 p-7 lg:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <s.icon className="h-5 w-5 text-terracotta" strokeWidth={1.5} />
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                          {s.subtitle}
                        </p>
                        <h3 className="mt-1 font-display text-2xl text-foreground">{s.title}</h3>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                    {s.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO TE RECIBIMOS — gestos de anfitrión */}
      <TrustStrip
        background="background"
        eyebrow="Cómo te recibimos"
        title="Como anfitriones,"
        italic="no como vendedores."
        intro="EDEEN no compite por producto, precio ni ubicación. Compite por cómo te hace sentir. Antes, durante y después de tu visita."
        items={[
          {
            icon: DoorOpen,
            title: "Te abrimos la puerta",
            desc: "Te recibimos sin guion comercial. Escuchamos primero qué te trae y te dejamos espacio para mirar.",
          },
          {
            icon: HandHeart,
            title: "Te acompañamos",
            desc: "Te recomendamos lo que de verdad funciona en tu espacio. Sin venderte de más, con criterio honesto.",
          },
          {
            icon: Sparkles,
            title: "Nos anticipamos",
            desc: "Te explicamos riego, sustrato y cuidados para que la planta llegue viva al mes siguiente — y al año siguiente.",
          },
          {
            icon: Phone,
            title: "Seguimos cerca",
            desc: "Después de la visita seguimos contigo. Si algo no va bien, vuelve y lo solucionamos. Una casa no se cierra al salir.",
          },
        ]}
      />

      {/* LA COCINA — Es Berenar teaser */}
      <section className="border-t border-border bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-stretch gap-px bg-border lg:grid-cols-2">
            <div className="bg-card p-10 lg:p-16">
              <p className="eyebrow flex items-center gap-2">
                <ChefHat className="h-3.5 w-3.5" /> La cocina · Es Berenar
              </p>
              <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl text-balance">
                Pasa a la cocina.
                <br />
                <em className="italic text-primary">El café está hecho.</em>
              </h2>
              <div className="rule mt-8 max-w-[5rem]" />
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground text-pretty">
                Como en cualquier casa, la cocina es donde se queda
                la gente. Es Berenar es nuestra cafetería saludable:
                desayunos hechos al momento con producto local de los
                mercados mallorquines, panes artesanales y café de
                especialidad. Sin prisa, sin turnos, sin liberar
                mesa.
              </p>
              <Link
                to="/cafeteria"
                className="pill mt-10 inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-medium text-terracotta-foreground transition hover:opacity-90"
              >
                Conoce Es Berenar <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <figure className="overflow-hidden bg-sand">
              <img
                src={cafeAmbiente}
                alt="Cafetería Es Berenar entre plantas"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full min-h-[420px] w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* UN PASEO POR LA CASA */}
      <section className="border-t border-border bg-background py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Un paseo por la casa</p>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl lg:text-6xl text-balance">
              Cierra los ojos.
              <br />
              <em className="italic text-primary">Empuja la puerta.</em>
            </h2>
            <div className="divider-dot mt-8"><span /></div>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground text-pretty">
              Lo primero que se siente es el verde. Después el aroma
              a tierra mojada, el ruido suave de las hojas y, al
              fondo, el café de alguien que ha decidido tomarse un
              momento. Como cuando entras en casa de alguien que te
              estaba esperando.
            </p>
          </div>

          <div className="mt-16 grid gap-px bg-border lg:grid-cols-12">
            <figure className="overflow-hidden bg-sand lg:col-span-7 lg:row-span-2">
              <img src={paseo1} alt="Pasillo de plantas en eDeen" loading="lazy" decoding="async" sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto" />
            </figure>
            <figure className="overflow-hidden bg-sand lg:col-span-5">
              <img src={paseo4} alt="Detalle de helecho" loading="lazy" decoding="async" sizes="(min-width: 1024px) 42vw, 100vw" className="aspect-[16/10] h-full w-full object-cover" />
            </figure>
            <figure className="overflow-hidden bg-sand lg:col-span-5">
              <img src={paseo3} alt="Vista del exterior del centro de jardinería" loading="lazy" decoding="async" sizes="(min-width: 1024px) 42vw, 100vw" className="aspect-[16/10] h-full w-full object-cover" />
            </figure>
            <figure className="overflow-hidden bg-sand lg:col-span-4">
              <img src={paseo5} alt="Huerto y plantas aromáticas" loading="lazy" decoding="async" sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-square h-full w-full object-cover" />
            </figure>
            <figure className="overflow-hidden bg-sand lg:col-span-4">
              <img src={paseo6} alt="Rincón con flores en eDeen" loading="lazy" decoding="async" sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-square h-full w-full object-cover" />
            </figure>
            <figure className="overflow-hidden bg-sand lg:col-span-4">
              <img src={paseo2} alt="Centro de jardinería eDeen" loading="lazy" decoding="async" sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-square h-full w-full object-cover" />
            </figure>
          </div>

          <p className="mx-auto mt-14 max-w-xl text-center font-display text-2xl italic leading-relaxed text-primary text-balance">
            "No es un sitio donde compras plantas.
            Es una casa donde te apetece quedarte."
          </p>
        </div>
      </section>

      {/* TESTIMONIOS — voces de los invitados */}
      <Testimonials />

      {/* MAPA */}
      <MapEmbed />

      {/* LA PUERTA SIEMPRE ABIERTA */}
      <section className="border-t border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <Sofa className="mx-auto h-7 w-7 text-primary" strokeWidth={1.4} />
          <p className="eyebrow mt-6">Te esperamos</p>
          <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl text-balance">
            La puerta de la casa
            <em className="italic text-primary"> siempre está abierta.</em>
          </h2>
          <p className="mt-6 text-lg font-light text-muted-foreground">
            Calle Joan Mascaró i Fornés 79, Palma. En la carretera
            de Establiments. Pásate cuando quieras: hay café, hay
            verde, y siempre hay alguien para recibirte.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/contacto"
              className="pill inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Cómo llegar <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/sobre-nosotros"
              className="pill inline-flex items-center gap-2 border border-border bg-card px-7 py-3.5 text-sm font-medium text-foreground transition hover:border-foreground"
            >
              Conoce a quien te recibe
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
