import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Slide = { src: string; alt: string };

export function ImageCarousel({
  slides,
  aspect = "aspect-[16/10]",
}: {
  slides: Slide[];
  aspect?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5500, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((s) => (
            <div key={s.src} className="min-w-0 shrink-0 grow-0 basis-full">
              <figure className={`relative ${aspect} w-full overflow-hidden bg-sand`}>
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-6">
        <div className="flex gap-1.5">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Ir a la diapositiva ${i + 1}`}
              className={
                "dot h-1.5 transition-all " +
                (i === selected
                  ? "w-8 bg-primary"
                  : "w-1.5 bg-foreground/20 hover:bg-foreground/40")
              }
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Anterior"
            className="circle flex h-10 w-10 items-center justify-center border border-border bg-card text-foreground transition hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Siguiente"
            className="circle flex h-10 w-10 items-center justify-center border border-border bg-card text-foreground transition hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
