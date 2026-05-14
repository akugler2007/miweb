import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Instagram,
  Film,
  Sun,
  MessageCircle,
  DoorOpen,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Compass,
  Sparkles,
  Coffee,
  HandHeart,
  Users,
  TrendingUp,
  LineChart,
  Repeat,
  Wallet,
  Heart,
  Target,
  Quote,
  Eye,
  Activity,
  MessageSquare,
  Calendar,
  PlayCircle,
  Send,
} from "lucide-react";

/* Imágenes reales de eDeen */
import imgPasilloPlantas from "@/assets/edeen/pasillo-plantas.jpg";
import imgCafeInterior from "@/assets/edeen/cafe-interior.jpg";
import imgExterior from "@/assets/edeen/exterior-edeen.jpg";
import imgRincon from "@/assets/edeen/rincon-edeen.jpg";
import imgPlantaDetalle from "@/assets/edeen/planta-detalle-1.jpg";
import imgMaceta from "@/assets/edeen/maceta-3.jpg";

export const Route = createFileRoute("/creativos")({
  head: () => ({
    meta: [
      { title: "Plan creativo & de medios — eDeen" },
      {
        name: "description",
        content:
          "Plan creativo anual de eDeen: atracción, experiencia y fidelización. Posicionamiento por experiencia, +30% engagement en Instagram y comunidad real. Presupuesto 12.000 €.",
      },
    ],
  }),
  component: CreativosPage,
});

const ANNUAL_BUDGET = 12000;

/* ---------------------------------------------------------------------------
   OBJETIVOS DEL BRIEFING
--------------------------------------------------------------------------- */
const briefingGoals = [
  { value: "Eje", label: "Posicionar la marca por la experiencia", icon: DoorOpen, primary: true },
  { value: "+30%", label: "Engagement en Instagram", icon: Instagram },
  { value: "+5%", label: "Ventas anuales", icon: TrendingUp },
  { value: "+10%", label: "Ticket medio", icon: Wallet },
  { value: "+15%", label: "Fidelización", icon: HandHeart },
  { value: "+10%", label: "Tráfico horario tarde", icon: Sun },
  { value: "Equipo", label: "Marketing interno: retención y satisfacción", icon: GraduationCap },
];

/* ---------------------------------------------------------------------------
   TRES BLOQUES
--------------------------------------------------------------------------- */
const blocks = [
  {
    n: "Bloque 1",
    title: "Atracción",
    italic: "cómo captar.",
    desc: "Visibilidad útil, no publicitaria. Convertimos a eDeen en un lugar al que apetece ir, no en un anuncio que se ignora.",
    icon: Compass,
    accent: "primary" as const,
  },
  {
    n: "Bloque 2",
    title: "Experiencia",
    italic: "lo que pasa dentro.",
    desc: "El centro es el verdadero medio. Cuidamos cada gesto del equipo y el momento de la compra para que la experiencia hable por sí sola.",
    icon: Sparkles,
    accent: "terracotta" as const,
  },
  {
    n: "Bloque 3",
    title: "Fidelización",
    italic: "para que vuelvan.",
    desc: "Una conversación útil después de la compra. Sin descuentos ni puntos: solo recordatorios honestos y comunidad real.",
    icon: Repeat,
    accent: "primary" as const,
  },
];

/* ---------------------------------------------------------------------------
   ACCIONES (6) — desarrolladas
--------------------------------------------------------------------------- */
type Action = {
  id: string;
  block: "Atracción" | "Experiencia" | "Fidelización";
  number: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  format: string;
  frequency: string;
  objective: string;
  goalLink: string; // qué objetivo del briefing impacta
  why: string;
  detail: string[]; // bullets desarrollo
  examples?: string[];
  cost: string;
  kpiTitle: string;
  kpiList: string[];
  accent: "primary" | "terracotta";
  icon: typeof Instagram;
};

const actions: Action[] = [
  {
    id: "01",
    block: "Atracción",
    number: "01",
    title: "‘Consejos del jardinero’",
    subtitle: "Sección semanal de reels en Instagram",
    image: imgPlantaDetalle,
    imageAlt: "Detalle de planta en eDeen, Palma de Mallorca.",
    format: "Reel vertical · 20–40 segundos · tono natural, sin tecnicismos",
    frequency: "1 reel a la semana · 48 piezas/año",
    objective: "Aumentar el engagement en Instagram +30 % construyendo a eDeen como referencia útil del cuidado de plantas.",
    goalLink: "+30 % Engagement Instagram",
    why: "El usuario interactúa con lo que le facilita la vida. Un reel breve, claro y resolutivo genera guardados, comentarios y reenvíos — las tres métricas que mueven el alcance orgánico real.",
    detail: [
      "Plano fijo o subjetivo grabado en el propio centro, con voz natural del equipo (no locución comercial).",
      "Estructura constante: pregunta → error frecuente → solución en 1 minuto.",
      "Cada pieza termina con una invitación abierta: ‘ven y te lo enseñamos’ — nunca una promo.",
      "Producción interna con móvil + un único día de grabación al mes (4 reels en 1 jornada).",
    ],
    examples: [
      "‘3 errores que matan tu monstera (y cómo evitarlos)’",
      "‘Qué hacer con tus plantas en octubre’",
      "‘3 plantas fáciles para piso pequeño en Palma’",
    ],
    cost: "≈ 2.400 €/año (jornada mensual de grabación + edición)",
    kpiTitle: "Engagement",
    kpiList: [
      "Engagement rate ≥ 6 % (vs ~3 % actual del sector local)",
      "Guardados/Compartidos por reel ≥ 80",
      "Crecimiento orgánico de seguidores +25 % en 12 meses",
    ],
    accent: "primary",
    icon: Instagram,
  },
  {
    id: "02",
    block: "Atracción",
    number: "02",
    title: "‘No venías a esto. Y te quedaste.’",
    subtitle: "Vídeo principal de campaña",
    image: imgPasilloPlantas,
    imageAlt: "Pasillo de plantas del centro eDeen.",
    format: "Vídeo de marca · 60–75 s para Instagram + corte 30 s para Stories y Reels",
    frequency: "1 pieza al año + 3 cortes derivados",
    objective: "Posicionar a eDeen como una experiencia, no como una tienda.",
    goalLink: "Posicionamiento por experiencia",
    why: "La marca no se posiciona explicándose, se posiciona mostrándose. Una pieza honesta es más memorable que diez anuncios. Refuerza el atributo central: aquí entras y te quedas.",
    detail: [
      "Narrativa real: una persona pasa por delante con prisa, entra a preguntar algo concreto y termina sentada en Es Berenar.",
      "Sin guion publicitario: situaciones rodadas con clientes reales o equipo del centro.",
      "Tipografía y paleta de la marca aplicadas solo al cierre, en un único rótulo.",
      "Distribución: orgánico en Instagram + boost limitado a 8 semanas (ventana de campaña).",
    ],
    cost: "≈ 2.200 €/año (producción + boost)",
    kpiTitle: "Posicionamiento",
    kpiList: [
      "Reproducciones completas ≥ 35 %",
      "Búsquedas branded ‘eDeen’ +50 % tras la ventana de campaña",
      "Recuerdo asistido en encuestas a clientes en tienda",
    ],
    accent: "primary",
    icon: Film,
  },
  {
    id: "03",
    block: "Atracción",
    number: "03",
    title: "‘Plan de tarde’",
    subtitle: "Activación de tráfico en horario de tarde",
    image: imgCafeInterior,
    imageAlt: "Interior de Es Berenar, la cafetería de eDeen.",
    format: "Reels y stories temáticos centrados en franja 16:00–20:00",
    frequency: "2 stories/semana + 1 reel/mes específico de tarde",
    objective: "Aumentar el tráfico en horario de tarde un +10 %.",
    goalLink: "+10 % Tráfico horario tarde",
    why: "La tarde es el hueco vacío del calendario emocional del cliente local. eDeen puede ocupar ese espacio sin esfuerzo, posicionándose como ‘plan que no requiere planificar’.",
    detail: [
      "Contenido orgánico con copies que activan el ‘ahora mismo’: ‘si no sabes qué hacer esta tarde…’.",
      "Mostramos siempre luz de tarde en el centro: el invernadero en hora dorada es el activo visual.",
      "Geolocalización + horarios visibles en cada pieza — sin CTA agresivo.",
      "No requiere inversión en pauta: aprovechamos el alcance generado por las acciones 01 y 02.",
    ],
    examples: [
      "‘Un sitio para desconectar sin plan, abierto hasta las 20 h’",
      "‘14.000 m² para pasear esta tarde, sin compromiso’",
      "‘La hora más bonita del invernadero es ahora’",
    ],
    cost: "Incluido en la producción de la acción 01",
    kpiTitle: "Tráfico tarde",
    kpiList: [
      "Visitas en franja 16–20 h +10 % (medido con conteo en puerta)",
      "Tickets emitidos por la tarde / total · evolución mensual",
      "Saves de stories de la franja ≥ 25 % por encima de la media",
    ],
    accent: "primary",
    icon: Sun,
  },
  {
    id: "04",
    block: "Experiencia",
    number: "04",
    title: "‘Te apunto al recordatorio’",
    subtitle: "Activación en el punto de venta",
    image: imgMaceta,
    imageAlt: "Maceta y planta lista para llevar de eDeen.",
    format: "Gesto verbal del equipo + QR discreto en mostrador",
    frequency: "Cada cliente que compra una planta",
    objective: "Convertir cada venta en el inicio de una relación, alimentando la fidelización y el ticket medio.",
    goalLink: "+15 % Fidelización · +10 % Ticket medio",
    why: "El momento posterior a la compra es cuando el cliente está más receptivo. Una frase natural del equipo (no un formulario) cierra el círculo de la experiencia y abre el canal directo.",
    detail: [
      "Frase guion para el equipo: ‘¿Quieres que te avisemos por WhatsApp cuando toque cuidarla? Sin spam, dos mensajes al mes’.",
      "El cliente escanea un QR del mostrador o da su número directamente.",
      "Se etiqueta el tipo de planta comprada para personalizar los recordatorios.",
      "El gesto refuerza el rol de anfitrión: nos preocupa lo que pasa después, no solo la venta.",
    ],
    cost: "≈ 80 € (impresión de tarjetas y QR en madera)",
    kpiTitle: "Adopción",
    kpiList: [
      "% de clientes que aceptan al pasar por caja ≥ 35 %",
      "Recompra a 90 días entre suscritos vs no suscritos",
      "Incremento de ticket medio en clientes recurrentes",
    ],
    accent: "terracotta",
    icon: DoorOpen,
  },
  {
    id: "05",
    block: "Experiencia",
    number: "05",
    title: "‘Recibir como anfitriones’",
    subtitle: "Formación interna del equipo",
    image: imgExterior,
    imageAlt: "Exterior del centro de jardinería eDeen.",
    format: "Sesión presencial · 2 h · materiales impresos",
    frequency: "2 sesiones/año (inicio + refuerzo a los 6 meses)",
    objective: "Asegurar coherencia de marca en cada interacción y mejorar la satisfacción del equipo.",
    goalLink: "Marketing interno · Posicionamiento",
    why: "El equipo es el medio más importante. Una persona que se siente parte del relato lo transmite sin esfuerzo. Esto reduce la rotación y eleva la calidad percibida.",
    detail: [
      "Bloque 1: cómo atender sin presionar. Lenguaje, distancia física, silencios.",
      "Bloque 2: cómo acompañar al cliente — del ‘qué busca’ al ‘qué necesita’.",
      "Bloque 3: cómo transmitir el concepto anfitrión/invitado en cada conversación.",
      "Entregable: una guía corta interna (10 páginas) que cada nueva incorporación recibe.",
    ],
    cost: "≈ 1.400 €/año (formador externo + materiales)",
    kpiTitle: "Equipo",
    kpiList: [
      "NPS interno del equipo ≥ 8/10",
      "Reducción de rotación voluntaria",
      "Menciones positivas al equipo en reseñas (Google, Instagram)",
    ],
    accent: "terracotta",
    icon: GraduationCap,
  },
  {
    id: "06",
    block: "Fidelización",
    number: "06",
    title: "‘El recordatorio de eDeen’",
    subtitle: "Sistema de fidelización por WhatsApp",
    image: imgRincon,
    imageAlt: "Rincón cuidado del centro eDeen.",
    format: "WhatsApp Business · mensajes editoriales cortos, sin enlaces de venta",
    frequency: "2 mensajes al mes (1 estacional + 1 personalizado por planta)",
    objective: "Aumentar la fidelización un +15 % construyendo una conversación útil a largo plazo.",
    goalLink: "+15 % Fidelización · +5 % Ventas",
    why: "El email se abre con resignación, el WhatsApp se lee. Aporta utilidad real (recordatorios de cuidado) en el canal donde el cliente ya está. Es más íntimo, más medible y tiene tasas de apertura por encima del 90 %, frente al 25–35 % típico de un newsletter.",
    detail: [
      "Mensaje 1 — estacional: ‘Llega el frío. Si tienes un ficus en casa, retíralo de la ventana. 1 min de lectura.’",
      "Mensaje 2 — personalizado: según la planta comprada (acción 04), recordatorio específico de riego o trasplante.",
      "Tono cercano, sin emojis comerciales, sin descuentos. La utilidad es la recompensa.",
      "Baja simple con la palabra ‘baja’. Transparencia total — la confianza es el activo.",
    ],
    cost: "≈ 300–600 €/año (plataforma WhatsApp Business API + plantillas)",
    kpiTitle: "Fidelización",
    kpiList: [
      "Tasa de lectura ≥ 90 %",
      "Tasa de baja < 2 % anual",
      "% de suscritos que vuelven al centro en 6 meses ≥ 60 %",
    ],
    accent: "primary",
    icon: MessageCircle,
  },
];

/* ---------------------------------------------------------------------------
   PRESUPUESTO 12.000 €
--------------------------------------------------------------------------- */
const budgetLines = [
  { label: "Producción de reels semanales (Acción 01)", amount: 2400, role: "Atracción" },
  { label: "Vídeo principal de campaña + boost (Acción 02)", amount: 2200, role: "Atracción" },
  { label: "Activación tráfico tarde (orgánico, Acción 03)", amount: 0, role: "Atracción" },
  { label: "Activación punto de venta — QR y materiales (Acción 04)", amount: 80, role: "Experiencia" },
  { label: "Formación interna del equipo (Acción 05)", amount: 1400, role: "Experiencia" },
  { label: "WhatsApp Business — fidelización (Acción 06)", amount: 600, role: "Fidelización" },
  { label: "Pauta orgánica en Meta (boost reels Acción 01)", amount: 1800, role: "Atracción" },
  { label: "Sesión fotográfica trimestral del centro", amount: 1500, role: "Experiencia" },
  { label: "Imprevistos y producción puntual", amount: 2020, role: "Reserva" },
];

/* ---------------------------------------------------------------------------
   MÉTRICAS EN 3 NIVELES
--------------------------------------------------------------------------- */
const metricLevels = [
  {
    n: "Nivel 01",
    title: "Adopción",
    italic: "¿se apuntan?",
    icon: Eye,
    accent: "primary" as const,
    desc: "Mide cuánta gente entra en cada acción. Es la primera señal de que el plan funciona.",
    items: [
      { label: "Suscriptores al WhatsApp", target: "1.500 en 12 meses", source: "Plataforma WhatsApp Business" },
      { label: "Aceptación en caja (Acción 04)", target: "≥ 35 %", source: "Conteo manual semanal del equipo" },
      { label: "Seguidores nuevos en Instagram", target: "+25 %", source: "Instagram Insights" },
      { label: "Asistencia a formaciones internas", target: "100 % equipo", source: "Lista interna" },
    ],
  },
  {
    n: "Nivel 02",
    title: "Comportamiento",
    italic: "¿hacen algo distinto?",
    icon: Activity,
    accent: "terracotta" as const,
    desc: "Mide cambios reales en cómo el cliente se relaciona con la marca: vuelve, gasta más, viene a otra hora.",
    items: [
      { label: "Engagement rate en reels", target: "≥ 6 %", source: "Instagram Insights mensual" },
      { label: "Tráfico tarde (16–20 h)", target: "+10 %", source: "Conteo en puerta + caja" },
      { label: "Recompra a 90 días entre suscritos", target: "+15 % vs no suscritos", source: "Cruce caja + base WhatsApp" },
      { label: "Ticket medio anual", target: "+10 %", source: "TPV / informe trimestral" },
      { label: "Ventas globales", target: "+5 %", source: "Cierre contable anual" },
    ],
  },
  {
    n: "Nivel 03",
    title: "Cualitativas",
    italic: "¿qué dicen de nosotros?",
    icon: MessageSquare,
    accent: "primary" as const,
    desc: "Mide la percepción real. Es la métrica más lenta, pero la única que confirma que el posicionamiento está calando.",
    items: [
      { label: "Reseñas Google con mención al equipo", target: "+30 % anual", source: "Google Business Profile" },
      { label: "Comentarios cualitativos en reels", target: "Análisis trimestral", source: "Lectura manual + nube de palabras" },
      { label: "Encuesta corta a 50 clientes/trimestre", target: "NPS ≥ 60", source: "Encuesta en caja + WhatsApp" },
      { label: "Satisfacción del equipo (NPS interno)", target: "≥ 8/10", source: "Encuesta semestral" },
    ],
  },
];

/* ===========================================================================
   PAGE
=========================================================================== */
function CreativosPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-cream pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <p className="eyebrow">eDeen · Plan creativo y de medios</p>
          <h1 className="mt-6 font-display text-5xl text-foreground sm:text-6xl lg:text-7xl text-balance">
            Atracción, experiencia
            <br />y <em className="italic text-primary">fidelización.</em>
          </h1>
          <div className="divider-dot mt-10"><span /></div>
          <p className="mt-10 text-lg leading-relaxed text-muted-foreground text-pretty">
            Un plan anual realista, con seis acciones bien desarrolladas y
            coherentes entre sí. Cada acción persigue un objetivo concreto
            del briefing y se mide con indicadores claros.
          </p>
          <div className="mt-10 inline-flex items-center gap-3 border border-border bg-card px-6 py-3">
            <Wallet className="h-4 w-4 text-terracotta" />
            <span className="text-sm text-foreground">
              Presupuesto anual · <strong>12.000 €</strong>
            </span>
          </div>
        </div>
      </section>

      {/* OBJETIVOS DEL BRIEFING */}
      <section className="border-t border-border bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <header className="mb-14 max-w-2xl">
            <p className="eyebrow">01 · Objetivos del briefing</p>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl text-balance">
              Qué tenemos que
              <em className="italic text-primary"> mover.</em>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
              Todas las acciones del plan responden a uno o varios de estos
              objetivos. Si una acción no impacta ninguno, no entra.
            </p>
          </header>

          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {briefingGoals.map((g) => (
              <article
                key={g.label}
                className={
                  "p-7 " + (g.primary ? "bg-primary text-primary-foreground" : "bg-card")
                }
              >
                <g.icon
                  className={"h-5 w-5 " + (g.primary ? "text-primary-foreground" : "text-terracotta")}
                  strokeWidth={1.5}
                />
                <p
                  className={
                    "mt-6 font-display text-3xl " +
                    (g.primary ? "italic" : "text-foreground")
                  }
                >
                  {g.value}
                </p>
                <div
                  className={
                    "mt-4 h-px w-10 " +
                    (g.primary ? "bg-primary-foreground/40" : "bg-border")
                  }
                />
                <p
                  className={
                    "mt-4 text-sm leading-relaxed text-pretty " +
                    (g.primary ? "text-primary-foreground/85" : "text-muted-foreground")
                  }
                >
                  {g.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRES BLOQUES */}
      <section className="border-t border-border bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <header className="mb-14 max-w-2xl">
            <p className="eyebrow">02 · Estructura del plan</p>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl text-balance">
              Tres bloques,
              <em className="italic text-primary"> una sola lógica.</em>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
              Captar, recibir, mantener. Pocas acciones, bien encadenadas.
              Cada bloque alimenta al siguiente.
            </p>
          </header>

          <div className="grid gap-px bg-border md:grid-cols-3">
            {blocks.map((b) => {
              const accentText = b.accent === "primary" ? "text-primary" : "text-terracotta";
              const accentBg = b.accent === "primary" ? "bg-primary" : "bg-terracotta";
              return (
                <article key={b.title} className="bg-card p-8 lg:p-10">
                  <div className="flex items-center gap-3">
                    <span className={"flex h-10 w-10 items-center justify-center text-white " + accentBg}>
                      <b.icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                      {b.n}
                    </p>
                  </div>
                  <h3 className="mt-7 font-display text-3xl text-foreground sm:text-4xl text-balance">
                    {b.title}
                  </h3>
                  <p className={"mt-2 font-display text-xl italic " + accentText}>
                    {b.italic}
                  </p>
                  <div className="rule mt-6 max-w-[3rem]" />
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
                    {b.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACCIONES — galería paginada */}
      <ActionsGallery />

      {/* PRESUPUESTO */}
      <section className="border-t border-border bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <header className="mb-14 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow">04 · Presupuesto</p>
              <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl text-balance">
                12.000 € al año.
                <br />
                <em className="italic text-primary">Bien gastados.</em>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
                Sin grandes inversiones publicitarias ni producciones costosas.
                El gasto se concentra en producir contenido propio de calidad,
                formar al equipo y abrir un canal directo con el cliente.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="border border-border bg-card p-7">
                <p className="eyebrow">Reparto por bloque</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    { label: "Atracción", value: 6400 },
                    { label: "Experiencia", value: 2980 },
                    { label: "Fidelización", value: 600 },
                    { label: "Reserva / imprevistos", value: 2020 },
                  ].map((b) => {
                    const pct = Math.round((b.value / ANNUAL_BUDGET) * 100);
                    return (
                      <li key={b.label}>
                        <div className="flex items-baseline justify-between gap-3 text-foreground">
                          <span>{b.label}</span>
                          <span className="text-muted-foreground">
                            {b.value.toLocaleString("es-ES")} € · {pct}%
                          </span>
                        </div>
                        <div className="mt-2 h-[3px] w-full bg-sand">
                          <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </header>

          <div className="overflow-x-auto border border-border bg-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border bg-cream">
                <tr className="text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                  <th className="px-6 py-4 font-medium">Partida</th>
                  <th className="px-6 py-4 font-medium">Bloque</th>
                  <th className="px-6 py-4 text-right font-medium">Importe</th>
                </tr>
              </thead>
              <tbody>
                {budgetLines.map((b) => (
                  <tr key={b.label} className="border-b border-border last:border-0">
                    <td className="px-6 py-4 font-display text-base text-foreground">{b.label}</td>
                    <td className="px-6 py-4 text-muted-foreground">{b.role}</td>
                    <td className="px-6 py-4 text-right font-display text-base text-foreground">
                      {b.amount === 0 ? "—" : `${b.amount.toLocaleString("es-ES")} €`}
                    </td>
                  </tr>
                ))}
                <tr className="bg-cream">
                  <td className="px-6 py-4 font-display text-lg text-foreground">Total anual</td>
                  <td className="px-6 py-4 text-muted-foreground">12 meses</td>
                  <td className="px-6 py-4 text-right font-display text-lg italic text-primary">
                    {ANNUAL_BUDGET.toLocaleString("es-ES")} €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* MÉTRICAS — 3 NIVELES */}
      <section className="border-t border-border bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <header className="mb-14 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">05 · Medición</p>
              <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl text-balance">
                Tres niveles para
                <em className="italic text-primary"> ver de verdad.</em>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
                No se mide lo mismo en el primer mes que en el sexto. La
                medición se ordena en tres niveles: primero la gente se
                apunta, después cambia su comportamiento y, por último,
                empieza a hablar de la marca.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="grid gap-px bg-border sm:grid-cols-2">
                <div className="bg-card p-6">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <p className="mt-4 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                    Revisión
                  </p>
                  <p className="mt-2 font-display text-2xl text-foreground">Trimestral</p>
                </div>
                <div className="bg-card p-6">
                  <LineChart className="h-5 w-5 text-terracotta" />
                  <p className="mt-4 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                    Horizonte
                  </p>
                  <p className="mt-2 font-display text-2xl text-foreground">12 meses</p>
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-px bg-border lg:grid-cols-3">
            {metricLevels.map((lv) => {
              const accentBg = lv.accent === "primary" ? "bg-primary" : "bg-terracotta";
              const accentText = lv.accent === "primary" ? "text-primary" : "text-terracotta";
              return (
                <article key={lv.title} className="bg-card p-8 lg:p-10">
                  <div className="flex items-center gap-3">
                    <span className={"flex h-10 w-10 items-center justify-center text-white " + accentBg}>
                      <lv.icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                      {lv.n}
                    </p>
                  </div>
                  <h3 className="mt-6 font-display text-3xl text-foreground text-balance">
                    {lv.title}
                  </h3>
                  <p className={"mt-1 font-display text-lg italic " + accentText}>
                    {lv.italic}
                  </p>
                  <div className="rule mt-5 max-w-[3rem]" />
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {lv.desc}
                  </p>

                  <ul className="mt-7 space-y-5">
                    {lv.items.map((it) => (
                      <li key={it.label} className="border-t border-border pt-4">
                        <p className="font-display text-base text-foreground">{it.label}</p>
                        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
                          <span className={"font-display text-base italic " + accentText}>
                            {it.target}
                          </span>
                          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                            {it.source}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
            Línea base medida en el mes 0. Cada trimestre se contrasta el
            avance, se ajusta la mezcla de canales y se documentan los
            aprendizajes en una hoja única compartida con el equipo.
          </p>
        </div>
      </section>

      {/* CIERRE */}
      <section className="border-t border-border bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <Quote className="mx-auto h-7 w-7 text-terracotta" strokeWidth={1.4} />
          <h2 className="mt-7 font-display text-4xl text-foreground sm:text-5xl text-balance">
            Pocas acciones. Bien hechas.
            <br />
            <em className="italic text-primary">Coherentes durante 12 meses.</em>
          </h2>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground text-pretty">
            Posicionar a eDeen por su experiencia no se consigue con un
            anuncio: se consigue con un equipo formado, una conversación
            que sigue después de la compra y un calendario de contenido
            que respeta al cliente.
          </p>
        </div>
      </section>
    </>
  );
}

/* ===========================================================================
   GALERÍA DE ACCIONES — selector por bloque + paginación
=========================================================================== */

type BlockId = "Todas" | "Atracción" | "Experiencia" | "Fidelización";

const blockTabs: { id: BlockId; label: string; icon: typeof Compass }[] = [
  { id: "Todas", label: "Todas las acciones", icon: Compass },
  { id: "Atracción", label: "Atracción", icon: Compass },
  { id: "Experiencia", label: "Experiencia", icon: Sparkles },
  { id: "Fidelización", label: "Fidelización", icon: Repeat },
];

function ActionsGallery() {
  const [block, setBlock] = useState<BlockId>("Todas");
  const [page, setPage] = useState(0);

  const filtered = useMemo(
    () => (block === "Todas" ? actions : actions.filter((a) => a.block === block)),
    [block],
  );

  const safePage = page >= filtered.length ? 0 : page;
  const current = filtered[safePage];

  const goPrev = () => setPage((p) => (p - 1 + filtered.length) % filtered.length);
  const goNext = () => setPage((p) => (p + 1) % filtered.length);

  return (
    <section className="border-t border-border bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <header className="mb-10 max-w-3xl">
          <p className="eyebrow">03 · Acciones</p>
          <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl text-balance">
            Seis acciones,
            <em className="italic text-primary"> ningún relleno.</em>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
            Cada acción explica para qué sirve, cómo se ejecuta, cuánto
            cuesta y cómo se mide. Filtra por bloque o navega por todas.
          </p>
        </header>

        {/* Selector */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-6">
          {blockTabs.map((t) => {
            const active = block === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setBlock(t.id);
                  setPage(0);
                }}
                className={
                  "pill inline-flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors " +
                  (active
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground hover:bg-primary-soft")
                }
              >
                <t.icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                {t.label}
              </button>
            );
          })}
          <span className="ml-auto text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            {filtered.length} acción{filtered.length === 1 ? "" : "es"}
          </span>
        </div>

        {/* Pieza */}
        {current && (
          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-12">
            {/* Imagen */}
            <figure className="relative bg-card lg:col-span-5">
              <div className="aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:h-full">
                <img
                  src={current.image}
                  alt={current.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                <div className="flex items-center justify-between">
                  <span className="pill inline-flex items-center gap-2 bg-card/90 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.24em] text-foreground backdrop-blur">
                    <current.icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                    Acción {current.number}
                  </span>
                  <span
                    className={
                      "pill px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-white backdrop-blur " +
                      (current.accent === "primary" ? "bg-primary/90" : "bg-terracotta/90")
                    }
                  >
                    {current.block}
                  </span>
                </div>
                <div className="max-w-md">
                  <h3
                    className="font-display text-3xl leading-tight text-white sm:text-4xl text-balance"
                    style={{ textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}
                  >
                    {current.title}
                  </h3>
                  <p
                    className="mt-3 font-display text-base italic text-white/90"
                    style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
                  >
                    {current.subtitle}
                  </p>
                </div>
              </figcaption>
            </figure>

            {/* Ficha */}
            <div className="flex flex-col bg-card p-8 lg:col-span-7 lg:p-10">
              <div className="flex items-center justify-between">
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Acción {String(safePage + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                </p>
                <span className="pill inline-flex items-center gap-2 border border-border bg-cream px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-foreground">
                  <Target className="h-3 w-3 text-primary" />
                  {current.goalLink}
                </span>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                    Formato
                  </p>
                  <p className="mt-2 text-sm text-foreground text-pretty">{current.format}</p>
                </div>
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                    Frecuencia
                  </p>
                  <p className="mt-2 text-sm text-foreground text-pretty">{current.frequency}</p>
                </div>
              </div>

              <div className="rule mt-7 max-w-[3rem]" />

              <div className="mt-6">
                <p className="text-[0.6rem] uppercase tracking-[0.24em] text-terracotta">
                  Objetivo
                </p>
                <p className="mt-2 font-display text-lg leading-snug text-foreground text-pretty">
                  {current.objective}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                  Por qué funciona
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {current.why}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                  Cómo se hace
                </p>
                <ul className="mt-3 space-y-2">
                  {current.detail.map((d) => (
                    <li key={d} className="flex gap-3 text-sm leading-relaxed text-foreground text-pretty">
                      <span
                        className={
                          "mt-2 h-1.5 w-1.5 shrink-0 rounded-full " +
                          (current.accent === "primary" ? "bg-primary" : "bg-terracotta")
                        }
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {current.examples && (
                <div className="mt-6 border border-border bg-cream p-5">
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                    Ejemplos de copy
                  </p>
                  <ul className="mt-3 space-y-2">
                    {current.examples.map((e) => (
                      <li key={e} className="font-display text-base italic text-foreground text-pretty">
                        “{e}”
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-7 grid gap-px bg-border sm:grid-cols-2">
                <div className="bg-cream p-5">
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                    Coste anual estimado
                  </p>
                  <p className="mt-2 font-display text-base text-foreground">{current.cost}</p>
                </div>
                <div className="bg-cream p-5">
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                    Cómo se mide · {current.kpiTitle}
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-foreground">
                    {current.kpiList.map((k) => (
                      <li key={k} className="text-pretty">— {k}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-end gap-2 pt-8">
                <button
                  onClick={goPrev}
                  aria-label="Acción anterior"
                  disabled={filtered.length < 2}
                  className="circle flex h-10 w-10 items-center justify-center border border-border bg-card text-foreground transition hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Acción siguiente"
                  disabled={filtered.length < 2}
                  className="circle flex h-10 w-10 items-center justify-center border border-border bg-card text-foreground transition hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-foreground"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Ir a la acción ${i + 1}`}
              className={
                "dot h-1.5 transition-all " +
                (i === safePage ? "w-8 bg-primary" : "w-1.5 bg-foreground/20 hover:bg-foreground/40")
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}