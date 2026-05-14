import { Star, Quote } from "lucide-react";

type Review = {
  name: string;
  text: string;
  rating?: number;
};

const reviews: Review[] = [
  {
    name: "Marina Cerdà",
    rating: 5,
    text: "Las plantas están en un estado impecable y el equipo te asesora con muchísimo cariño. Salí con dos plantas y la sensación de haber estado en un pequeño oasis.",
  },
  {
    name: "Joan Oliver",
    rating: 5,
    text: "Hicieron el proyecto de paisajismo de nuestro patio en Palma. Profesionales, atentos y con muy buen gusto. El resultado superó lo que imaginábamos.",
  },
  {
    name: "Aina Ramis",
    rating: 5,
    text: "Es Berenar es mi pausa favorita en Palma. Desayunar entre plantas con productos locales no tiene precio. Café espectacular y trato familiar.",
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-border bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Reseñas en Google</p>
          <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl text-balance">
            Quienes nos visitan,
            <br />
            <em className="italic text-primary">vuelven.</em>
          </h2>
          <div className="divider-dot mt-8"><span /></div>
        </div>

        <div className="mt-14 grid gap-px bg-border sm:grid-cols-3">
          {reviews.map((r) => (
            <article key={r.name} className="flex flex-col bg-card p-8 lg:p-10">
              <Quote className="h-6 w-6 text-terracotta" strokeWidth={1.5} />
              <p className="mt-6 flex-1 font-display text-xl leading-relaxed text-foreground">
                {r.text}
              </p>
              <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                <p className="text-sm font-medium text-foreground">{r.name}</p>
                <div className="flex gap-0.5 text-terracotta">
                  {Array.from({ length: r.rating ?? 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
