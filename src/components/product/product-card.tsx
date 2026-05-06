import * as React from "react";
import { ArrowLeftRight, Eye, Heart, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { QuickTooltip } from "@/components/ui/tooltip";
import { formatPrice, type Product } from "@/types/product";

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  href?: string;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  inWishlist?: boolean;
  onQuickView?: (product: Product) => void;
  onCompare?: (product: Product) => void;
  inCompare?: boolean;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      product,
      href,
      onAddToCart,
      onToggleWishlist,
      inWishlist = false,
      onQuickView,
      onCompare,
      inCompare = false,
      className,
      ...props
    },
    ref
  ) => {
    const Wrapper = href ? "a" : "div";
    const wrapperProps = href ? { href } : {};
    return (
      <Card ref={ref} className={cn("flex flex-col group", className)} {...props}>
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
            <Badge variant="default" className="absolute left-3 top-3">
              {product.badge}
            </Badge>
          )}
          <div
            className={cn(
              "absolute right-3 top-3 flex flex-col gap-1.5",
              "transition-opacity duration-200",
              "opacity-0 group-hover:opacity-100 focus-within:opacity-100",
              "sm:opacity-0", // hidden by default on hover-capable devices
              "max-sm:opacity-100" // always visible on touch
            )}
          >
            {onToggleWishlist && (
              <QuickTooltip
                content={inWishlist ? "Remove from wishlist" : "Wishlist"}
                side="left"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onToggleWishlist(product);
                  }}
                  aria-label={
                    inWishlist ? "Remove from wishlist" : "Add to wishlist"
                  }
                  aria-pressed={inWishlist}
                  className={cn(
                    "grid size-9 place-items-center rounded-xl bg-background/90 backdrop-blur shadow-sm transition-colors",
                    inWishlist
                      ? "text-primary"
                      : "text-text-tertiary hover:text-primary"
                  )}
                >
                  <Heart
                    className={cn("size-4", inWishlist && "fill-current")}
                    aria-hidden="true"
                  />
                </button>
              </QuickTooltip>
            )}
            {onQuickView && (
              <QuickTooltip content="Quick view" side="left">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onQuickView(product);
                  }}
                  aria-label="Quick view"
                  className="grid size-9 place-items-center rounded-xl bg-background/90 backdrop-blur shadow-sm text-text-tertiary hover:text-primary transition-colors"
                >
                  <Eye className="size-4" />
                </button>
              </QuickTooltip>
            )}
            {onCompare && (
              <QuickTooltip
                content={inCompare ? "In compare" : "Add to compare"}
                side="left"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onCompare(product);
                  }}
                  aria-label={
                    inCompare ? "Remove from compare" : "Add to compare"
                  }
                  aria-pressed={inCompare}
                  className={cn(
                    "grid size-9 place-items-center rounded-xl bg-background/90 backdrop-blur shadow-sm transition-colors",
                    inCompare
                      ? "text-primary"
                      : "text-text-tertiary hover:text-primary"
                  )}
                >
                  <ArrowLeftRight className="size-4" />
                </button>
              </QuickTooltip>
            )}
          </div>
        </Wrapper>
        <div className="flex flex-col gap-2 p-4 flex-1">
          <h3 className="text-[14px] leading-5 text-text-primary line-clamp-2 min-h-[2.5rem]">
            {href ? (
              <a href={href} className="hover:text-primary transition-colors">
                {product.title}
              </a>
            ) : (
              product.title
            )}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-h5 font-semibold text-text-primary">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-[12px] text-text-tertiary line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
          {onAddToCart && (
            <Button
              variant="primary"
              size="sm"
              className="mt-auto w-full"
              iconLeft={<ShoppingCart />}
              onClick={() => onAddToCart(product)}
            >
              Add to cart
            </Button>
          )}
        </div>
      </Card>
    );
  }
);
ProductCard.displayName = "ProductCard";

export interface ProductCardSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  withWishlist?: boolean;
  withCta?: boolean;
}

const ProductCardSkeleton = React.forwardRef<
  HTMLDivElement,
  ProductCardSkeletonProps
>(
  (
    { className, withWishlist = true, withCta = true, ...props },
    ref
  ) => (
    <Card
      ref={ref}
      className={cn("flex flex-col", className)}
      aria-busy="true"
      aria-live="polite"
      {...props}
    >
      <div className="relative">
        <Skeleton className="aspect-square w-full rounded-none" />
        <Skeleton className="absolute left-3 top-3 h-5 w-12 rounded-md bg-muted" />
        {withWishlist && (
          <Skeleton className="absolute right-3 top-3 size-9 rounded-xl bg-muted" />
        )}
      </div>
      <div className="flex flex-col gap-2 p-4 flex-1">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-2/3" />
        <Skeleton className="h-5 w-1/3 mt-1" />
        {withCta && (
          <Skeleton className="h-8 w-full rounded-xl mt-auto" />
        )}
      </div>
    </Card>
  )
);
ProductCardSkeleton.displayName = "ProductCardSkeleton";

export { ProductCard, ProductCardSkeleton };
