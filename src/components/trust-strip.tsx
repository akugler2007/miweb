import type { LucideIcon } from "lucide-react";

type Item = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

type Props = {
  eyebrow: string;
  title: string;
  italic?: string;
  intro?: string;
  items: Item[];
  background?: "background" | "cream" | "sand";
};

export function TrustStrip({
  eyebrow,
  title,
  italic,
  intro,
  items,
  background = "cream",
}: Props) {
  const bg =
    background === "background"
      ? "bg-background"
      : background === "sand"
      ? "bg-sand"
      : "bg-cream";

  return (
    <section className={"border-t border-border py-24 lg:py-32 " + bg}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl text-balance">
            {title}
            {italic && (
              <>
                {" "}
                <em className="italic text-primary">{italic}</em>
              </>
            )}
          </h2>
          {intro && (
            <>
              <div className="divider-dot mt-8">
                <span />
              </div>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground text-pretty">
                {intro}
              </p>
            </>
          )}
        </div>

        <div className="mt-14 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <article key={it.title} className="bg-card p-8 lg:p-10">
              <span className="flex h-10 w-10 items-center justify-center bg-primary-soft text-primary">
                <it.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-display text-xl text-foreground text-balance">
                {it.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                {it.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}