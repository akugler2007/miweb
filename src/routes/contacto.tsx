import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone, Clock, Mail, DoorOpen } from "lucide-react";
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

import hero4 from "@/assets/edeen/hero-4.jpg";
import casaTerraza from "@/assets/edeen/casa-terraza.jpg";
import casaJardin from "@/assets/edeen/casa-jardin.jpg";
import exteriorEdeen from "@/assets/edeen/exterior-edeen.jpg";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Toca el timbre — Contacto eDeen Palma de Mallorca" },
      {
        name: "description",
        content:
          "La puerta de la casa EDEEN siempre está abierta. Calle Joan Mascaró i Fornés 79, Palma de Mallorca. Llámanos al 971 433 422 o escríbenos.",
      },
      { property: "og:title", content: "Toca el timbre — Contacto eDeen" },
      { property: "og:image", content: hero4 },
      { property: "og:description", content: "La puerta siempre abierta en Palma de Mallorca." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { progress, registerRef, registerImageRef } = useScenicProgress();
  const images = [hero4, casaJardin, casaTerraza, exteriorEdeen, scenicFooterImage];

  return (
    <div className="relative text-white">
      <ScenicBackdrop images={images} registerImageRef={registerImageRef} />

      {/* HERO — toca el timbre */}
      <Scene
        index={0}
        registerRef={registerRef}
        alt="Toca el timbre"
        className="min-h-[100svh] flex flex-col"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-32 lg:px-8">
          <Reveal delay={120}>
            <p className="font-display italic text-lg sm:text-xl text-white/95">
              La puerta siempre está abierta.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="mt-5 font-display text-[13vw] leading-[0.86] tracking-[-0.045em] sm:text-[9.5vw] lg:text-[8rem] text-balance text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              Toca
              <br />
              el timbre.
              <br />
              <em className="not-italic text-[#f1ece4]">Te abrimos.</em>
            </h1>
          </Reveal>
          <Reveal delay={340}>
            <p className={"mt-8 max-w-xl " + sceneBody}>
              Pásate sin avisar, o cuéntanos antes qué te trae para
              tenerlo todo preparado. Como en cualquier casa de
              confianza: nos encanta recibir visita.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#formulario" className={scenePrimaryBtn}>
                Cuéntanos qué te trae
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="tel:971433422" className={sceneGhostBtn}>
                <Phone className="h-4 w-4" /> 971 433 422
              </a>
            </div>
          </Reveal>
        </div>
      </Scene>

      {/* INFO + FORMULARIO */}
      <Scene
        id="formulario"
        index={1}
        registerRef={registerRef}
        alt="Información y formulario"
        className="py-32 lg:py-44"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-6">
            {/* INFO */}
            <Reveal className="lg:col-span-2">
              <div className="h-full border border-white/15 bg-white/5 p-8 backdrop-blur lg:p-10">
                <p className={sceneEyebrow}>Te abrimos aquí</p>
                <h2 className={"mt-4 text-3xl sm:text-4xl " + sceneTitle}>
                  Donde está la casa.
                </h2>
                <div className="mt-8 space-y-6">
                  <InfoItem icon={MapPin} title="Dirección">
                    Calle Joan Mascaró i Fornés 79<br />
                    07010 Palma de Mallorca<br />
                    <span className="text-white/70 text-sm">Carretera de Establiments</span>
                  </InfoItem>
                  <InfoItem icon={Phone} title="Teléfono">
                    <a href="tel:971433422" className="hover:text-[#33a2ed] transition">971 433 422</a>
                  </InfoItem>
                  <InfoItem icon={Mail} title="Email">
                    <a href="mailto:info@edeen.es" className="hover:text-[#33a2ed] transition">info@edeen.es</a>
                  </InfoItem>
                  <InfoItem icon={Clock} title="Horario de visita">
                    <p className="font-medium text-white">Tienda</p>
                    <p>Lun–Vie · 9:00 – 18:00 (verano 9:00 – 14:00)</p>
                    <p>Sáb–Dom y festivos · 9:00 – 14:00</p>
                    <p className="mt-3 font-medium text-white">La cocina · Es Berenar</p>
                    <p>Todos los días · 9:00 – 14:00</p>
                  </InfoItem>
                </div>
              </div>
            </Reveal>

            {/* FORM */}
            <Reveal className="lg:col-span-3" delay={120}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Gracias por escribirnos. Te responderemos lo antes posible.");
                }}
                className="h-full border border-white/15 bg-white/5 p-8 backdrop-blur lg:p-10"
              >
                <p className={sceneEyebrow}>Cuéntanos qué te trae</p>
                <h2 className={"mt-4 text-3xl sm:text-4xl " + sceneTitle}>
                  Escríbenos como en una nota.
                </h2>
                <p className="mt-3 text-sm text-white/80">
                  Sin formularios complicados. Solo dinos qué te
                  apetece — te respondemos lo antes posible, en
                  persona.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field label="Cómo te llamas" id="name" type="text" required />
                  <Field label="Tu email" id="email" type="email" required />
                  <Field label="Teléfono (opcional)" id="phone" type="tel" />
                  <Field label="¿Qué te trae?" id="subject" type="text" />
                  <div className="sm:col-span-2">
                    <label htmlFor="how" className="mb-2 block text-sm font-medium text-white">
                      ¿Cómo nos conociste? <span className="text-white/50 font-normal">(opcional)</span>
                    </label>
                    <select
                      id="how"
                      className="w-full border border-white/25 bg-white/10 px-4 py-3 text-sm text-white outline-none ring-[#33a2ed]/40 focus:ring-2 backdrop-blur appearance-none"
                    >
                      <option value="" className="bg-[#0a0c0a] text-white">Elige una opción...</option>
                      <option value="instagram" className="bg-[#0a0c0a] text-white">Instagram</option>
                      <option value="google" className="bg-[#0a0c0a] text-white">Google</option>
                      <option value="recomendacion" className="bg-[#0a0c0a] text-white">Un amigo o familiar</option>
                      <option value="pasaba" className="bg-[#0a0c0a] text-white">Pasaba por aquí</option>
                      <option value="otra" className="bg-[#0a0c0a] text-white">De otra manera</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
                    Cuéntanos
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Una planta, un jardín, un evento, un café — lo que sea."
                    className="w-full border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none ring-[#33a2ed]/40 focus:ring-2 backdrop-blur"
                  />
                </div>

                <button
                  type="submit"
                  className={"mt-8 w-full justify-center sm:w-auto " + scenePrimaryBtn}
                >
                  Enviar mensaje
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </Scene>

      {/* MAPA */}
      <Scene
        index={2}
        registerRef={registerRef}
        alt="Mapa"
        className="py-32 lg:py-40"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          {/* Post-visit block */}
          <Reveal>
            <div className="mb-20 border border-white/15 bg-white/5 p-8 backdrop-blur lg:p-10 max-w-2xl">
              <p className={sceneEyebrow}>¿Ya has pasado por casa?</p>
              <h3 className="mt-4 font-display text-3xl text-white">
                Gracias por la visita.
              </h3>
              <p className="mt-4 text-white/80 leading-relaxed text-pretty">
                La puerta sigue abierta. Si algo no estuvo a la
                altura, cuéntanoslo — lo arreglamos. Y si la visita
                fue exactamente como esperabas, nos alegra saberlo
                también. Tu opinión hace que la casa mejore.
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className={"mt-6 inline-flex " + sceneGhostBtn}
              >
                Dejarnos una reseña <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <div className="mb-12 max-w-2xl">
            <Reveal>
              <p className={sceneEyebrow}>Cómo llegar</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className={"mt-6 text-5xl sm:text-6xl lg:text-7xl " + sceneTitle}>
                En la carretera de
                <br />
                <em className="not-italic text-[#f1ece4]">Establiments.</em>
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className={"mt-7 max-w-xl " + sceneBody}>
                A pocos minutos del centro de Palma. Aparcamiento
                gratuito en la puerta. Si vienes en bici o en
                transporte público, te decimos cómo.
              </p>
            </Reveal>
          </div>
          <Reveal delay={220}>
            <div className="overflow-hidden border border-white/15 bg-white/5 backdrop-blur">
              <iframe
                title="Mapa de eDeen en Palma de Mallorca"
                src="https://www.google.com/maps?q=Calle+Joan+Mascar%C3%B3+i+Forn%C3%A9s+79,+07010+Palma+de+Mallorca&output=embed"
                loading="lazy"
                className="h-[480px] w-full border-0 [filter:grayscale(0.2)_contrast(1.05)]"
              />
            </div>
          </Reveal>
        </div>
      </Scene>

      {/* CTA */}
      <Scene
        index={3}
        registerRef={registerRef}
        alt="Te esperamos"
        className="min-h-[70svh] flex items-center"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8 py-32 text-center text-white w-full">
          <Reveal>
            <DoorOpen className="mx-auto h-7 w-7 text-white/90" strokeWidth={1.4} />
          </Reveal>
          <Reveal delay={80}>
            <p className={"mt-6 " + sceneEyebrow}>Te esperamos</p>
          </Reveal>
          <Reveal delay={160}>
            <h2 className={"mx-auto mt-6 text-5xl sm:text-6xl lg:text-7xl max-w-3xl " + sceneTitle}>
              La puerta de la casa
              <br />
              <em className="not-italic text-[#f1ece4]">siempre está abierta.</em>
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Link to="/" className={scenePrimaryBtn}>
                Volver al recibidor <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Scene>
      <ScenicFooter registerRef={registerRef} index={4} />
    </div>
  );
}

function InfoItem({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-white/15 pb-5 last:border-b-0 last:pb-0">
      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-[#33a2ed] backdrop-blur">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-sm leading-relaxed text-white/85">
        <p className="mb-1 font-display text-xl text-white">{title}</p>
        {children}
      </div>
    </div>
  );
}

function Field({ label, id, type, required }: { label: string; id: string; type: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white">
        {label} {required && <span className="text-[#33a2ed]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        className="w-full border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none ring-[#33a2ed]/40 focus:ring-2 backdrop-blur"
      />
    </div>
  );
}
