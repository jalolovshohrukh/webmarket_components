import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export type GalleryImage = {
  src: string;
  alt: string;
};

export interface ProductGalleryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images: GalleryImage[];
}

const ProductGallery = React.forwardRef<HTMLDivElement, ProductGalleryProps>(
  ({ images, className, ...props }, ref) => {
    const [api, setApi] = React.useState<CarouselApi | null>(null);
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
      if (!api) return;
      const onSelect = () => setCurrent(api.selectedScrollSnap());
      onSelect();
      api.on("select", onSelect);
      return () => {
        api.off("select", onSelect);
      };
    }, [api]);

    const onThumbClick = (i: number) => api?.scrollTo(i);

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-4",
          className
        )}
        {...props}
      >
        {/* Thumbnails — column on lg, row below on mobile */}
        <div className="order-2 lg:order-1 flex shrink-0 gap-2 overflow-x-auto lg:flex-col lg:overflow-y-auto lg:max-h-[500px]">
          {images.map((img, i) => (
            <button
              key={img.src + i}
              type="button"
              onClick={() => onThumbClick(i)}
              aria-label={`Go to image ${i + 1}`}
              aria-current={current === i ? "true" : undefined}
              className={cn(
                "size-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                current === i
                  ? "border-primary"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <img
                src={img.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <Carousel
          className="order-1 lg:order-2 flex-1 w-full"
          setApi={setApi}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {images.map((img, i) => (
              <CarouselItem key={img.src + i}>
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={i === 0 ? "high" : "auto"}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  }
);
ProductGallery.displayName = "ProductGallery";

export interface ProductGallerySkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  thumbCount?: number;
}

const ProductGallerySkeleton = React.forwardRef<
  HTMLDivElement,
  ProductGallerySkeletonProps
>(({ thumbCount = 4, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-4",
      className
    )}
    aria-busy="true"
    aria-live="polite"
    {...props}
  >
    <div className="order-2 lg:order-1 flex shrink-0 gap-2 lg:flex-col">
      {Array.from({ length: thumbCount }).map((_, i) => (
        <Skeleton key={i} className="size-16 shrink-0 rounded-md" />
      ))}
    </div>
    <Skeleton className="order-1 lg:order-2 aspect-square w-full rounded-xl" />
  </div>
));
ProductGallerySkeleton.displayName = "ProductGallerySkeleton";

export { ProductGallery, ProductGallerySkeleton };
