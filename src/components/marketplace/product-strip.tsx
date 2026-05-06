import * as React from "react";
import { ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export interface ProductStripProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  products: Product[];
  viewAllHref?: string;
  viewAllLabel?: string;
  emptyMessage?: React.ReactNode;
  onAddToCart?: (p: Product) => void;
  onToggleWishlist?: (p: Product) => void;
  className?: string;
}

function ProductStrip({
  title,
  subtitle,
  products,
  viewAllHref,
  viewAllLabel = "View all",
  emptyMessage = "Nothing here yet.",
  onAddToCart,
  onToggleWishlist,
  className,
}: ProductStripProps) {
  return (
    <section className={cn("space-y-3", className)}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <h3 className="text-h4 font-semibold text-text-primary">{title}</h3>
          {subtitle && (
            <p className="text-[13px] text-text-tertiary">{subtitle}</p>
          )}
        </div>
        {viewAllHref && (
          <a
            href={viewAllHref}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:text-brand-700"
          >
            {viewAllLabel} <ChevronRight className="size-3.5" />
          </a>
        )}
      </div>
      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center text-[13px] text-text-tertiary">
          {emptyMessage}
        </div>
      ) : (
        <Carousel opts={{ align: "start", dragFree: true }}>
          <CarouselContent className="-ml-3">
            {products.map((p) => (
              <CarouselItem
                key={p.id}
                className="pl-3 basis-[60%] sm:basis-[40%] md:basis-[30%] lg:basis-[22%]"
              >
                <ProductCard
                  product={p}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </section>
  );
}

export { ProductStrip };
