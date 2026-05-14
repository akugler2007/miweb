import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Coffee, Leaf, Sprout, Wheat, Volume2, Armchair, Trees, ChefHat } from "lucide-react";
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
  sceneAccentBtn,
} from "@/components/scenic";

import cafeInterior from "@/assets/edeen/cafe-interior.jpg";
import desayuno2 from "@/assets/edeen/cafe-desayuno-2.jpg";
import desayuno3 from "@/assets/edeen/cafe-desayuno-3.jpg";
import berenarHero from "@/assets/edeen/berenar-hero.jpg";
import berenarCafe from "@/assets/edeen/berenar-cafe.jpg";
import berenarReposteria from "@/assets/edeen/berenar-reposteria.jpg";

export const Route = createFileRoute("/cafeteria")({
  head: () => ({
    meta: [
      { title: "La cocina de la casa — Es Berenar | eDeen Palma" },
      {
        name: "description",
        content:
          "Es Berenar, la cocina de la casa EDEEN. Desayunos hechos al momento con producto local de los mercados mallorquines, panes artesanales y café de especialidad. Abierto cada día de 9:00 a 14:00.",
      },
      { property: "og:title", content: "La cocina de la casa — Es Berenar" },
      { property: "og:image", content: berenarHero },
      {
        property: "og:description",
        content:
          "La cocina de la casa EDEEN. Desayuna despacio, entre plantas, con producto local de Mallorca.",
      },
    ],
  }),
  component: CafeteriaPage,
});

const valores = [
  { icon: Sprout, title: "Producto local", desc: "Vamos cada semana a los mercados mallorquines a por fruta, verdura y panes frescos. Lo que se sirve aquí, viene de aquí." },
  { icon: ChefHat, title: "Cocinado al momento", desc: "Nada precocinado. Trabajamos al vapor, con mimo y con tiempo. Como cuando alguien cocina para ti en su casa." },
  { icon: Leaf, title: "Sin plásticos", desc: "Materiales naturales en mesa y barra. La cocina respeta el resto de la casa: 14.000 m² de verde alrededor." },
] as const;

const ambiente = [
  { icon: Volume2, title: "Sin ruido de fondo", desc: "Aquí se conversa en bajo y se piensa con calma. La música acompaña, no impone." },
  { icon: Armchair, title: "Quédate el tiempo que quieras", desc: "No hay turnos ni prisa por liberar mesa. Hemos tenido mesas que llevan dos horas y nadie las ha mirado mal. Así es como debería ser siempre." },
  { icon: Trees, title: "Entre plantas de verdad", desc: "14.000 m² de vivero alrededor. Una experiencia que no encontrarás en ninguna cafetería del centro de Palma." },
] as const;

const carta = [
  {
    icon: Wheat,
    title: "Tostadas",
    items: [
      ["Tostada de aguacate", "Aguacate, tomate, lima, semillas y AOVE.", "9,50 €"],
      ["Sobrasada y queso", "Sobrasada de Mallorca, queso de Maó y miel.", "8,90 €"],
      ["Salmón ahumado", "Queso fresco, salmón, eneldo y limón.", "10,50 €"],
      ["Vegetal", "Hummus casero, zanahoria, pepino y rúcula.", "8,50 €"],
    ],
  },
  {
    icon: Sprout,
    title: "Bowls y dulces",
    items: [
      ["Açaí bowl", "Açaí, plátano, granola, frutos rojos y coco.", "9,90 €"],
      ["Yogur con granola", "Granola de la casa y fruta de temporada.", "7,50 €"],
      ["Porridge de avena", "Leche vegetal, manzana asada y canela.", "7,90 €"],
      ["Bizcocho del día", "Casero, cada mañana.", "4,50 €"],
    ],
  },
  {
    icon: Coffee,
    title: "Huevos al momento",
    items: [
      ["Huevos benedictinos", "Brioche, huevos pochados, bacon y holandesa.", "11,50 €"],
      ["Huevos rotos", "Patata panadera y jamón ibérico.", "10,90 €"],
      ["Tortilla francesa", "Con ensalada y pan tostado.", "8,50 €"],
      ["Aguacate y huevo poché", "Sobre tostada de centeno.", "10,90 €"],
    ],
  },
  {
    icon: Leaf,
    title: "Cafés, zumos e infusiones",
    items: [
      ["Café de especialidad", "Espresso, cortado, americano o con leche.", "1,80 – 3,20 €"],
      ["Matcha latte", "Matcha ceremonial.", "4,50 €"],
      ["Chai latte casero", "Mezcla de especias hecha en casa.", "4,20 €"],
      ["Zumo natural del día", "Naranja o detox verde.", "3,80 – 5,50 €"],
    ],
  },
] as const;

function CafeteriaPage() {
  const { progress, registerRef, registerImageRef } = useScenicProgress();
  const images = [berenarHero, cafeInterior, desayuno2, berenarCafe, desayuno3, berenarReposteria, scenicFooterImage];

  return (
    <div className="relative text-white">
      <ScenicBackdrop images={images} registerImageRef={registerImageRef} />

      {/* HERO — pasa a la cocina */}
      <Scene
        index={0}
        registerRef={registerRef}
        alt="La cocina de la casa"
        className="min-h-[100svh] flex flex-col"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-32 lg:px-8">
          <Reveal delay={120}>
            <p className="font-display italic text-lg sm:text-xl text-white/95">
              La cocina de la casa · Es Berenar
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="mt-5 font-display text-[13vw] leading-[0.86] tracking-[-0.045em] sm:text-[9.5vw] lg:text-[8rem] text-balance text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              Pasa a
              <br />
              la cocina.
              <br />
              <em className="not-italic text-[#f1ece4]">El café está hecho.</em>
            </h1>
          </Reveal>
          <Reveal delay={340}>
            <p className={"mt-8 max-w-xl " + sceneBody}>
              En toda casa, la cocina es donde la gente se queda.
              Aquí el café lleva hecho desde las nueve. Producto de
              los mercados mallorquines, panes artesanales y una carta
              que cambia con la temporada. Cocinado al momento, con
              mimo y sin reloj.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#carta" className={scenePrimaryBtn}>
                Ver la carta
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <span className="inline-flex items-center gap-2 border border-white/40 bg-white/10 px-7 py-4 text-sm text-white backdrop-blur">
                <Clock className="h-4 w-4" />
                Todos los días · 9:00 – 14:00
              </span>
            </div>
          </Reveal>
        </div>
      </Scene>

      {/* LA COCINA — valores */}
      <Scene
        index={1}
        registerRef={registerRef}
        alt="Nuestra cocina"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className={sceneEyebrow}>Nuestra cocina</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className={"mt-6 text-5xl sm:text-6xl lg:text-7xl " + sceneTitle}>
                Producto fresco,
                <br />
                <em className="not-italic text-[#f1ece4]">como en casa.</em>
              </h2>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-3 lg:gap-6">
            {valores.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="h-full border border-white/15 bg-white/5 p-8 backdrop-blur">
                  <v.icon className="h-6 w-6 text-[#33a2ed]" strokeWidth={1.5} />
                  <h3 className="mt-6 font-display text-2xl text-white">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/85 text-pretty">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={320}>
            <blockquote className="mt-10 max-w-2xl border-l-2 border-[#33a2ed]/50 pl-6">
              <p className="text-lg italic leading-relaxed text-white/70 text-pretty">
                "Cada mañana vamos al mercado a ver qué hay. Lo que está bueno esa semana es lo que aparece en la carta. No tenemos proveedor de fruta congelada — aquí funciona al revés."
              </p>
              <cite className="mt-3 block text-[0.6rem] not-italic uppercase tracking-[0.35em] text-white/40">
                La cocina de Es Berenar
              </cite>
            </blockquote>
          </Reveal>
        </div>
      </Scene>

      {/* LA MESA — galería editorial */}
      <Scene
        index={2}
        registerRef={registerRef}
        alt="La mesa puesta"
        className="py-32 lg:py-40"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-end mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className={sceneEyebrow}>La mesa puesta</p>
              </Reveal>
              <Reveal delay={100}>
                <h3 className={"mt-6 text-5xl sm:text-6xl lg:text-7xl " + sceneTitle}>
                  Lo que vas
                  <br />
                  <em className="not-italic text-[#f1ece4]">a desayunar.</em>
                </h3>
              </Reveal>
            </div>
            <Reveal delay={160} className="lg:col-span-5">
              <p className={sceneBody}>
                Una carta corta, honesta y de temporada. Todo se
                prepara al momento, con producto local y panes
                artesanales mallorquines. Como cuando te ponen
                cubierto sin preguntar si te quedas.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
            <Reveal delay={0} className="lg:col-span-8">
              <figure className="group relative h-[60vh] min-h-[420px] w-full overflow-hidden">
                <img
                  src={berenarHero}
                  alt="Mesa de desayuno en Es Berenar"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-white">
                  <span className="text-[0.6rem] uppercase tracking-[0.4em] text-white/80">El ritual</span>
                  <p className="mt-2 font-display text-2xl leading-tight tracking-[-0.02em] sm:text-3xl text-balance max-w-md [text-shadow:0_2px_14px_rgba(0,0,0,0.5)]">
                    Café de especialidad, repostería de la casa y producto local — servido sin prisa.
                  </p>
                </figcaption>
              </figure>
            </Reveal>
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
              <Reveal delay={120}>
                <figure className="group relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={berenarCafe}
                    alt="Café artesano"
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                </figure>
              </Reveal>
              <Reveal delay={220}>
                <figure className="group relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={berenarReposteria}
                    alt="Repostería casera"
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </Scene>

      {/* TU SITIO — ambiente */}
      <Scene
        index={3}
        registerRef={registerRef}
        alt="Tu sitio"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <p className={sceneEyebrow}>Tu sitio en la mesa</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className={"mt-6 text-5xl sm:text-6xl lg:text-7xl " + sceneTitle}>
                Un sitio donde
                <br />
                <em className="not-italic text-[#f1ece4]">apetece quedarse.</em>
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className={"mt-7 " + sceneBody}>
                Si trabajas de cara al público, sabes lo que es
                necesitar silencio de verdad. En Es Berenar nadie te
                apura, no hay música a tope y el entorno verde hace
                el resto. Te guardamos sitio el tiempo que necesites.
              </p>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-3 lg:gap-6">
            {ambiente.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="h-full border border-white/15 bg-white/5 p-8 backdrop-blur">
                  <v.icon className="h-6 w-6 text-[#33a2ed]" strokeWidth={1.5} />
                  <h3 className="mt-6 font-display text-2xl text-white">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/85 text-pretty">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Scene>

      {/* CARTA */}
      <Scene
        id="carta"
        index={4}
        registerRef={registerRef}
        alt="La carta"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className={sceneEyebrow}>La carta</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className={"mt-6 text-5xl sm:text-6xl lg:text-7xl " + sceneTitle}>
                Para desayunar
                <br />
                <em className="not-italic text-[#f1ece4]">con calma.</em>
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-4 lg:grid-cols-2 lg:gap-6">
            {carta.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="h-full border border-white/15 bg-white/5 p-8 backdrop-blur lg:p-10">
                  <div className="flex items-center gap-3">
                    <c.icon className="h-5 w-5 text-[#33a2ed]" strokeWidth={1.5} />
                    <p className={sceneEyebrow}>{c.title}</p>
                  </div>
                  <ul className="mt-6 divide-y divide-white/15">
                    {c.items.map(([n, d, p]) => (
                      <li key={n} className="flex items-baseline justify-between gap-6 py-4">
                        <div>
                          <h4 className="font-display text-xl text-white">{n}</h4>
                          <p className="mt-1 text-sm text-white/80 text-pretty">{d}</p>
                        </div>
                        <span className="shrink-0 text-sm font-medium text-white/95">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={240}>
            <p className="mt-10 text-center text-sm text-white/80">
              Carta orientativa. Adaptamos opciones sin gluten, sin lactosa y veganas — pregúntanos al sentarte.
            </p>
          </Reveal>
        </div>
      </Scene>

      {/* TE GUARDAMOS SITIO */}
      <Scene
        index={5}
        registerRef={registerRef}
        alt="Te guardamos sitio"
        className="min-h-[80svh] flex items-center"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8 py-32 text-center text-white w-full">
          <Reveal>
            <p className={sceneEyebrow}>Te guardamos sitio</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className={"mx-auto mt-6 text-5xl sm:text-6xl lg:text-7xl max-w-3xl " + sceneTitle}>
              La mesa está puesta
              <br />
              <em className="not-italic text-[#f1ece4]">para tu próximo desayuno.</em>
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className={"mx-auto mt-8 max-w-xl " + sceneBody}>
              Sin reservas. Solo entra, escoge mesa y déjate cuidar.
              La cocina abre todos los días de 9:00 a 14:00.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-3 max-w-xl text-base italic text-white/55 [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">
              Y si te vas con ganas de repetir, la cocina abre mañana a las nueve.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Link to="/contacto" className={scenePrimaryBtn}>
                Cómo llegar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/" className={sceneAccentBtn}>
                Volver al recibidor
              </Link>
            </div>
          </Reveal>
        </div>
      </Scene>
      <ScenicFooter registerRef={registerRef} index={6} />
    </div>
  );
}

void sceneGhostBtn;
