import * as React from "react";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice, type Product } from "@/types/product";

export interface ProductCardCompactProps
  extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  href?: string;
  onToggleWishlist?: (product: Product) => void;
  inWishlist?: boolean;
}

/**
 * Smaller, denser ProductCard. Roughly 60% the visual weight of the
 * default ProductCard — fits 5–8 per row at desktop, 2–3 on mobile.
 * Use for category landings, “explore more” strips, search results.
 */
const ProductCardCompact = React.forwardRef<
  HTMLDivElement,
  ProductCardCompactProps
>(
  (
    { product, href, onToggleWishlist, inWishlist = false, className, ...props },
    ref
  ) => {
    const Wrapper = href ? "a" : "div";
    const wrapperProps = href ? { href } : {};
    return (
      <Card
        ref={ref}
        className={cn("group flex flex-col", className)}
        {...props}
      >
        <Wrapper
          {...wrapperProps}
          className="relative block aspect-square overflow-hidden bg-gray-50"
        >
          <img
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.badge && (
            <Badge variant="default" className="absolute left-1.5 top-1.5 text-[10px] px-1.5 py-0">
              {product.badge}
            </Badge>
          )}
          {onToggleWishlist && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onToggleWishlist(product);
              }}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={inWishlist}
              className={cn(
                "absolute right-1.5 top-1.5 grid size-7 place-items-center rounded-lg bg-background/90 backdrop-blur shadow-sm transition-colors",
                inWishlist
                  ? "text-primary"
                  : "text-text-tertiary hover:text-primary",
                "opacity-0 group-hover:opacity-100 focus-within:opacity-100 max-sm:opacity-100"
              )}
            >
              <Heart
                className={cn("size-3.5", inWishlist && "fill-current")}
                aria-hidden="true"
              />
            </button>
          )}
        </Wrapper>
        <div className="flex flex-col gap-0.5 p-2.5">
          <h3 className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
            {href ? (
              <a href={href} className="hover:text-primary transition-colors">
                {product.title}
              </a>
            ) : (
              product.title
            )}
          </h3>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[14px] font-semibold tabular-nums text-text-primary">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-[11px] text-text-tertiary line-through tabular-nums">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
        </div>
      </Card>
    );
  }
);
ProductCardCompact.displayName = "ProductCardCompact";

const ProductCardCompactSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn("flex flex-col", className)}
    aria-busy="true"
    aria-live="polite"
    {...props}
  >
    <Skeleton className="aspect-square w-full rounded-none" />
    <div className="flex flex-col gap-1.5 p-2.5">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3.5 w-1/2" />
    </div>
  </Card>
));
ProductCardCompactSkeleton.displayName = "ProductCardCompactSkeleton";

export { ProductCardCompact, ProductCardCompactSkeleton };
