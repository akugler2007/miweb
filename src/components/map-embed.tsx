import { MapPin, ArrowRight, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function MapEmbed() {
  return (
    <section className="border-t border-border bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow">En el corazón de Palma</p>
          <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl lg:text-6xl text-balance">
            Un oasis para
            <em className="italic text-primary"> desconectar</em>.
          </h2>
          <div className="divider-dot mt-8"><span /></div>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground text-pretty">
            A pocos minutos del centro, en la carretera de Establiments,
            encontrarás un espacio donde el ruido se queda fuera y el verde
            lo cubre todo. Un momento de tranquilidad real.
          </p>
        </div>

        <div className="grid items-stretch gap-px bg-border lg:grid-cols-5">
          <div className="bg-card p-8 lg:col-span-2 lg:p-12">
            <p className="eyebrow">Visítanos</p>
            <h3 className="mt-5 font-display text-3xl text-foreground sm:text-4xl text-balance">
              Calle Joan Mascaró i Fornés 79,
              <em className="italic text-primary"> Palma.</em>
            </h3>
            <div className="rule mt-7 max-w-[5rem]" />

            <dl className="mt-8 space-y-5 text-sm">
              <div className="flex gap-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                <div>
                  <dt className="text-muted-foreground">Dirección</dt>
                  <dd className="mt-1 text-foreground">
                    Calle Joan Mascaró i Fornés 79, 07009 Palma
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                <div>
                  <dt className="text-muted-foreground">Teléfono</dt>
                  <dd className="mt-1 text-foreground">971 75 41 22</dd>
                </div>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=Calle+Joan+Mascaró+i+Fornés+79+Palma"
                target="_blank"
                rel="noreferrer"
                className="pill inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Abrir en Google Maps <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/contacto"
                className="pill inline-flex items-center gap-2 border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition hover:border-foreground"
              >
                Contactar
              </Link>
            </div>
          </div>

          <div className="relative min-h-[420px] bg-sand lg:col-span-3">
            <iframe
              title="Ubicación de eDeen en Palma de Mallorca"
              src="https://www.google.com/maps?q=Calle%20Joan%20Mascar%C3%B3%20i%20Forn%C3%A9s%2079%2C%20Palma&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale-[0.25]"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}