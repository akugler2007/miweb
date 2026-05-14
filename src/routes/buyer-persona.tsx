import { createFileRoute } from "@tanstack/react-router";
import {
  User,
  MapPin,
  GraduationCap,
  Heart,
  Target,
  AlertCircle,
  Compass,
  Sparkles,
  Instagram,
  Youtube,
} from "lucide-react";
import carlaImg from "@/assets/persona-carla.jpg";
import cristinaImg from "@/assets/persona-cristina.jpg";

export const Route = createFileRoute("/buyer-persona")({
  head: () => ({
    meta: [
      { title: "Buyer Persona — eDeen" },
      {
        name: "description",
        content:
          "Conoce a las personas que viven y disfrutan eDeen: perfiles, motivaciones y necesidades.",
      },
      { property: "og:title", content: "Buyer Persona — eDeen" },
      {
        property: "og:description",
        content:
          "Perfiles editoriales de los clientes ideales del centro de jardinería eDeen en Palma.",
      },
    ],
  }),
  component: BuyerPersonaPage,
});

type Bar = { left: string; right: string; value: number };

type Persona = {
  name: string;
  role: string;
  age: string;
  gender: string;
  status: string;
  income: string;
  location: string;
  education: string;
  intro: string;
  motivations: string[];
  frustrations: string[];
  goals: string[];
  needs: string[];
  social: { instagram: string; youtube: string };
  personality: Bar[];
  accent: "primary" | "terracotta";
  photo: string;
  photoAlt: string;
};

const PERSONAS: Persona[] = [
  {
    name: "Carla López",
    role: "Responsable de administración",
    age: "45 años",
    gender: "Femenino",
    status: "Casada con hijos",
    income: "2.500 – 3.000 €/mes",
    location: "Carrer de Son Anglada, 12 · 07011 Palma",
    education: "Graduada en ADE",
    intro:
      "Profesional con estabilidad económica y familiar que ha priorizado mejorar su hogar. Tiene jardín o terraza pero no dispone del tiempo ni del conocimiento para gestionarlo sola. Valora la comodidad y la eficiencia: prefiere un lugar donde le asesoren bien y resolver todo en una sola visita.",
    motivations: [
      "Mantener su hogar cuidado y agradable",
      "Optimizar el tiempo en las tareas del hogar",
      "Tomar decisiones seguras sin riesgo de error",
      "Contar con un espacio exterior funcional",
    ],
    frustrations: [
      "No saber qué plantas elegir o cómo cuidarlas",
      "Malas experiencias con plantas que no han durado",
      "Falta de tiempo para investigar o aprender",
      "Decisiones sin asesoramiento profesional",
    ],
    goals: [
      "Tener jardín o terraza en buen estado todo el año",
      "Reducir el tiempo dedicado al mantenimiento",
      "Evitar errores en la compra de plantas",
      "Apoyo profesional cuando lo necesite",
    ],
    needs: [
      "Asesoramiento claro y personalizado en tienda",
      "Soluciones completas: producto + servicio",
      "Confianza en la calidad de los productos",
      "Acompañamiento en la toma de decisiones",
    ],
    social: {
      instagram: "Uso moderado · entretenimiento",
      youtube: "Uso frecuente · contenidos prácticos y consejos",
    },
    personality: [
      { left: "Práctica", right: "Detallista", value: 65 },
      { left: "Racional", right: "Reflexiva", value: 60 },
      { left: "Organizada", right: "Resolutiva", value: 40 },
    ],
    accent: "primary",
    photo: carlaImg,
    photoAlt: "Retrato de Carla López, 45 años, responsable de administración",
  },
  {
    name: "Cristina Nieto",
    role: "Dependiente en tienda de moda",
    age: "27 años",
    gender: "Femenino",
    status: "Soltera",
    income: "1.200 – 1.500 €/mes",
    location: "Carrer de Blanquerna, 32 · 07003 Palma",
    education: "Formación profesional en comercio",
    intro:
      "Trabaja de cara al público con horarios rotativos y un ritmo exigente. Comparte piso, así que valora especialmente su tiempo fuera de casa como momento de desconexión. No busca jardinería, sí entornos agradables y diferentes. Es Berenar encaja como un lugar para parar, relajarse y quedarse sin prisas.",
    motivations: [
      "Desconectar después del trabajo",
      "Encontrar lugares tranquilos y agradables",
      "Tener planes sencillos pero de calidad",
      "Estar en espacios donde se sienta cómoda",
    ],
    frustrations: [
      "Cafeterías ruidosas o con demasiada gente",
      "Espacios poco cuidados o sin identidad",
      "Lugares donde no apetece quedarse",
      "Experiencias que no cumplen lo esperado",
    ],
    goals: [
      "Tener sitios de referencia donde ir habitualmente",
      "Aprovechar el tiempo libre sin complicaciones",
      "Encontrar espacios donde relajarse de verdad",
    ],
    needs: [
      "Ambiente tranquilo y cómodo",
      "Entorno cuidado y agradable",
      "Quedarse sin presión de consumo rápido",
      "Experiencia distinta a las cafeterías convencionales",
    ],
    social: {
      instagram: "Uso diario · entretenimiento y descubrir lugares nuevos",
      youtube: "Uso frecuente · entretenimiento",
    },
    personality: [
      { left: "Sociable", right: "Cercana", value: 70 },
      { left: "Práctica", right: "Espontánea", value: 55 },
      { left: "Sensorial", right: "Emocional", value: 65 },
    ],
    accent: "terracotta",
    photo: cristinaImg,
    photoAlt: "Retrato de Cristina Nieto, 27 años, dependienta en tienda de moda",
  },
];

function BuyerPersonaPage() {
  return (
    <>
      {/* HERO editorial */}
      <section className="relative bg-cream pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <p className="eyebrow">eDeen · Quién nos visita</p>
          <h1 className="mt-6 font-display text-5xl text-foreground sm:text-6xl lg:text-7xl text-balance">
            Las personas que dan
            <em className="italic text-primary"> vida</em> a eDeen.
          </h1>
          <div className="divider-dot mt-10"><span /></div>
          <p className="mt-10 text-lg leading-relaxed text-muted-foreground text-pretty">
            Dos perfiles, dos formas de vivir el centro: quien busca cuidar su
            hogar con asesoramiento experto y quien busca un rincón tranquilo
            para desconectar entre plantas.
          </p>
        </div>
      </section>

      {/* PERSONAS */}
      <section className="border-t border-border bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl space-y-20 px-5 lg:space-y-28 lg:px-8">
          {PERSONAS.map((p, i) => (
            <PersonaCard key={p.name} persona={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

function PersonaCard({ persona, index }: { persona: Persona; index: number }) {
  const accentText = persona.accent === "primary" ? "text-primary" : "text-terracotta";
  const accentBg = persona.accent === "primary" ? "bg-primary" : "bg-terracotta";

  return (
    <article className="border border-border bg-card">
      {/* Cabecera de persona */}
      <header className="grid gap-px bg-border lg:grid-cols-12">
        <div className="bg-card lg:col-span-4">
          <img
            src={persona.photo}
            alt={persona.photoAlt}
            width={896}
            height={1152}
            loading="lazy"
            className="h-full max-h-[28rem] w-full object-cover lg:max-h-none"
          />
        </div>
        <div className="bg-card p-8 lg:col-span-8 lg:p-12">
          <p className="eyebrow">Buyer persona · 0{index + 1}</p>
          <h2 className="mt-5 font-display text-5xl text-foreground sm:text-6xl text-balance">
            {persona.name}
          </h2>
          <p className={"mt-3 font-display text-xl italic " + accentText}>
            {persona.role}
          </p>
          <div className="rule mt-7 max-w-[5rem]" />
          <p className="mt-7 text-base leading-relaxed text-muted-foreground text-pretty">
            {persona.intro}
          </p>
        </div>

        {/* Datos clave */}
        <dl className="grid grid-cols-2 gap-px border-t border-border bg-border lg:col-span-12 lg:grid-cols-4">
          <DataCell icon={<User className="h-4 w-4" />} label="Edad" value={persona.age} />
          <DataCell icon={<User className="h-4 w-4" />} label="Sexo" value={persona.gender} />
          <DataCell icon={<Heart className="h-4 w-4" />} label="Estado civil" value={persona.status} />
          <DataCell icon={<Sparkles className="h-4 w-4" />} label="Ingresos" value={persona.income} />
          <DataCell
            icon={<MapPin className="h-4 w-4" />}
            label="Ubicación"
            value={persona.location}
            wide
          />
          <DataCell
            icon={<GraduationCap className="h-4 w-4" />}
            label="Educación"
            value={persona.education}
            wide
          />
        </dl>
      </header>

      {/* Motivaciones / Frustraciones / Metas / Necesidades */}
      <section className="grid gap-px border-t border-border bg-border lg:grid-cols-2">
        <Block
          icon={<Compass className="h-4 w-4" />}
          title="Motivaciones"
          items={persona.motivations}
          accent={persona.accent}
        />
        <Block
          icon={<AlertCircle className="h-4 w-4" />}
          title="Frustraciones"
          items={persona.frustrations}
          accent={persona.accent}
        />
        <Block
          icon={<Target className="h-4 w-4" />}
          title="Metas y objetivos"
          items={persona.goals}
          accent={persona.accent}
        />
        <Block
          icon={<Heart className="h-4 w-4" />}
          title="Necesidades"
          items={persona.needs}
          accent={persona.accent}
        />
      </section>

      {/* Redes sociales + Personalidad */}
      <section className="grid gap-px border-t border-border bg-border lg:grid-cols-12">
        <div className="bg-card p-8 lg:col-span-5 lg:p-10">
          <p className="eyebrow">Redes sociales</p>
          <ul className="mt-6 space-y-5">
            <li className="flex items-start gap-4">
              <span className={"mt-0.5 flex h-9 w-9 items-center justify-center " + accentBg + " text-white"}>
                <Instagram className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-lg text-foreground">Instagram</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {persona.social.instagram}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className={"mt-0.5 flex h-9 w-9 items-center justify-center " + accentBg + " text-white"}>
                <Youtube className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-lg text-foreground">YouTube</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {persona.social.youtube}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-card p-8 lg:col-span-7 lg:p-10">
          <p className="eyebrow">Personalidad</p>
          <div className="mt-6 space-y-6">
            {persona.personality.map((bar) => (
              <PersonalityBar key={bar.left + bar.right} bar={bar} accent={persona.accent} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

function DataCell({
  icon,
  label,
  value,
  wide,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={"bg-card p-6 lg:p-8 " + (wide ? "col-span-2" : "")}>
      <div className="flex items-center gap-2 text-terracotta">
        {icon}
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
          {label}
        </p>
      </div>
      <p className="mt-3 font-display text-xl text-foreground text-balance">{value}</p>
    </div>
  );
}

function Block({
  icon,
  title,
  items,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  accent: "primary" | "terracotta";
}) {
  const accentBg = accent === "primary" ? "bg-primary" : "bg-terracotta";
  return (
    <div className="bg-card p-8 lg:p-10">
      <div className="flex items-center gap-3">
        <span className={"flex h-8 w-8 items-center justify-center " + accentBg + " text-white"}>
          {icon}
        </span>
        <h3 className="font-display text-2xl text-foreground">{title}</h3>
      </div>
      <div className="rule mt-6 max-w-[3rem]" />
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
            <span className={"mt-2 inline-block h-1.5 w-1.5 shrink-0 " + accentBg}
              style={{ borderRadius: 9999 }}
            />
            <span className="text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PersonalityBar({
  bar,
  accent,
}: {
  bar: Bar;
  accent: "primary" | "terracotta";
}) {
  const accentBg = accent === "primary" ? "bg-primary" : "bg-terracotta";
  return (
    <div>
      <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
        <span>{bar.left}</span>
        <span>{bar.right}</span>
      </div>
      <div className="mt-2 h-[3px] w-full bg-sand">
        <div
          className={"h-full " + accentBg + " transition-all"}
          style={{ width: `${bar.value}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}
