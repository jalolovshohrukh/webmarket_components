import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatPrice, type Product } from "@/types/product";

export interface ProductCardMiniProps
  extends Omit<React.HTMLAttributes<HTMLAnchorElement>, "onSelect"> {
  product: Product;
  href?: string;
  /** Optional add-to-cart icon button on the right. */
  onAddToCart?: (product: Product) => void;
  /** Override the right-side action — if provided, replaces the add button. */
  trailing?: React.ReactNode;
  /** Show the dashed border (use as standalone). Default true. */
  bordered?: boolean;
}

/**
 * Tiny horizontal product chip. Thumbnail + title + price, ~56–80px tall.
 * Use for cart cross-sells, "frequently bought" suggestions, search-as-you-
 * type result rows, "recently viewed" inline strips, mention popovers.
 */
const ProductCardMini = React.forwardRef<HTMLDivElement, ProductCardMiniProps>(
  (
    {
      product,
      href,
      onAddToCart,
      trailing,
      bordered = true,
      className,
      ...props
    },
    ref
  ) => {
    const Wrapper = href ? "a" : "div";
    const wrapperProps = href ? { href } : {};
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 rounded-lg p-2 transition-colors",
          bordered ? "border border-gray-100 bg-card" : "hover:bg-muted/50",
          className
        )}
      >
        <Wrapper
          {...wrapperProps}
          className="relative block size-12 shrink-0 overflow-hidden rounded-md bg-gray-50 sm:size-14"
        >
          <img
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
            className="size-full object-cover"
          />
        </Wrapper>
        <div className="min-w-0 flex-1">
          <div className="line-clamp-1 text-[13px] font-medium text-text-primary">
            {href ? (
              <a
                href={href}
                {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                className="hover:text-primary transition-colors"
              >
                {product.title}
              </a>
            ) : (
              product.title
            )}
          </div>
          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span className="text-[13px] font-semibold tabular-nums text-text-primary">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-[11px] text-text-tertiary line-through tabular-nums">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
        </div>
        {trailing ??
          (onAddToCart && (
            <Button
              variant="secondary"
              size="iconSm"
              aria-label="Add to cart"
              onClick={() => onAddToCart(product)}
              className="shrink-0 rounded-full"
            >
              <Plus />
            </Button>
          ))}
      </div>
    );
  }
);
ProductCardMini.displayName = "ProductCardMini";

export interface ProductCardMiniSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

const ProductCardMiniSkeleton = React.forwardRef<
  HTMLDivElement,
  ProductCardMiniSkeletonProps
>(({ bordered = true, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-3 rounded-lg p-2",
      bordered && "border border-gray-100 bg-card",
      className
    )}
    aria-busy="true"
    aria-live="polite"
    {...props}
  >
    <Skeleton className="size-12 shrink-0 rounded-md sm:size-14" />
    <div className="min-w-0 flex-1 space-y-1.5">
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-3 w-1/3" />
    </div>
    <Skeleton className="size-8 shrink-0 rounded-full" />
  </div>
));
ProductCardMiniSkeleton.displayName = "ProductCardMiniSkeleton";

export { ProductCardMini, ProductCardMiniSkeleton };
