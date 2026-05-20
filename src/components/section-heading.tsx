type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
};

export function SectionHeading({ eyebrow, title, description, align = "center", invert }: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={"max-w-3xl " + alignCls}>
      {eyebrow && (
        <p
          className={
            "mb-4 text-xs uppercase tracking-[0.3em] " +
            (invert ? "text-white/70" : "text-[#0169af]")
          }
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={
          "font-display text-4xl leading-[1.1] sm:text-5xl text-balance " +
          (invert ? "text-white" : "text-foreground")
        }
      >
        {title}
      </h2>
      {description && (
        <p
          className={
            "mt-5 text-lg leading-relaxed " +
            (invert ? "text-white/80" : "text-muted-foreground")
          }
        >
          {description}
        </p>
      )}
    </div>
  );
}
