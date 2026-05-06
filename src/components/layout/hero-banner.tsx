import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export type HeroSlide = {
  id: string;
  imageUrl: string;
  alt?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  align?: "left" | "right" | "center";
};

export interface HeroBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  slides: HeroSlide[];
  /** Auto-advance interval in ms. 0 disables. Default 6000. */
  autoplayMs?: number;
  /** Aspect ratio for the banner. */
  aspect?: "banner" | "video" | "tall";
  /** Show navigation arrows. */
  showArrows?: boolean;
}

const aspectClass = {
  banner: "aspect-[16/5]",
  video: "aspect-video",
  tall: "aspect-[3/1] sm:aspect-[16/5]",
};

const HeroBanner = React.forwardRef<HTMLDivElement, HeroBannerProps>(
  (
    {
      slides,
      autoplayMs = 6000,
      aspect = "banner",
      showArrows = true,
      className,
      ...props
    },
    ref
  ) => {
    const [api, setApi] = React.useState<CarouselApi | null>(null);
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(slides.length);

    React.useEffect(() => {
      if (!api) return;
      const onSelect = () => setCurrent(api.selectedScrollSnap());
      onSelect();
      setCount(api.scrollSnapList().length);
      api.on("select", onSelect);
      api.on("reInit", onSelect);
      return () => {
        api.off("select", onSelect);
      };
    }, [api]);

    React.useEffect(() => {
      if (!api || !autoplayMs) return;
      const t = setInterval(() => {
        if (!document.hidden) api.scrollNext();
      }, autoplayMs);
      return () => clearInterval(t);
    }, [api, autoplayMs]);

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        aria-roledescription="carousel"
        aria-label="Promotional banner"
        {...props}
      >
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          className="overflow-hidden rounded-2xl"
        >
          <CarouselContent>
            {slides.map((s) => {
              const align = s.align ?? "left";
              return (
                <CarouselItem key={s.id}>
                  <div
                    className={cn(
                      "relative w-full overflow-hidden rounded-2xl bg-gray-100",
                      aspectClass[aspect]
                    )}
                  >
                    <img
                      src={s.imageUrl}
                      alt={s.alt ?? s.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />
                    <div
                      className={cn(
                        "relative z-10 flex h-full flex-col justify-center p-6 sm:p-10 lg:p-14 max-w-2xl text-white",
                        align === "right" && "ml-auto text-right",
                        align === "center" && "mx-auto text-center"
                      )}
                    >
                      {s.eyebrow && (
                        <span className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-white/80">
                          {s.eyebrow}
                        </span>
                      )}
                      <h2 className="text-h2 sm:text-h1 font-semibold leading-tight">
                        {s.title}
                      </h2>
                      {s.description && (
                        <p className="mt-2 max-w-md text-[14px] sm:text-[16px] text-white/85">
                          {s.description}
                        </p>
                      )}
                      {s.ctaLabel && (
                        <div className={cn("mt-5 sm:mt-6", align === "center" && "mx-auto")}>
                          <Button
                            size="lg"
                            asChild={Boolean(s.ctaHref)}
                          >
                            {s.ctaHref ? (
                              <a href={s.ctaHref}>{s.ctaLabel}</a>
                            ) : (
                              <span>{s.ctaLabel}</span>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {showArrows && slides.length > 1 && (
            <>
              <CarouselPrevious className="left-3 bg-white/80 backdrop-blur" />
              <CarouselNext className="right-3 bg-white/80 backdrop-blur" />
            </>
          )}
        </Carousel>

        {count > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "h-1.5 rounded-full bg-white/50 transition-all",
                  current === i ? "w-6 bg-white" : "w-1.5 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
HeroBanner.displayName = "HeroBanner";

export { HeroBanner };
