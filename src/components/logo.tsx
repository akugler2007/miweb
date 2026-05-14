type LogoProps = { className?: string };

export function Logo({ className }: LogoProps) {
  return (
    <div className={"flex flex-col items-start leading-none " + (className ?? "")}>
      <span className="text-[0.55rem] uppercase tracking-[0.25em] opacity-80">
        Tu centro de jardinería
      </span>
      <div className="flex items-baseline gap-1">
        <svg viewBox="0 0 24 24" className="h-4 w-4 self-end" fill="currentColor" aria-hidden>
          <path d="M2 14c4-1 6-3 8-6 1 3 1 5 0 7-2 3-6 3-8-1zm12-2c2-3 5-4 8-4-1 3-3 5-6 6-2 0-2-1-2-2z" />
        </svg>
        <span className="font-display text-[1.65rem] font-semibold tracking-tight">
          e<span className="italic">D</span>een
        </span>
      </div>
      <span className="text-[0.55rem] uppercase tracking-[0.3em] opacity-70">
        Espacio Natural
      </span>
    </div>
  );
}
