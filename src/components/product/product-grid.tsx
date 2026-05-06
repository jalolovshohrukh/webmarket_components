import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/components/product/product-card";
import type { Product } from "@/types/product";

export interface ProductGridProps extends React.HTMLAttributes<HTMLDivElement> {
  products?: Product[];
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: ReadonlySet<string>;
  hrefFor?: (product: Product) => string | undefined;
  columns?: { sm?: number; md?: number; lg?: number; xl?: number };
}

const colMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

function buildColClass(prefix: string, count?: number) {
  if (!count) return "";
  const base = colMap[count];
  return base ? `${prefix}${base}` : "";
}

const ProductGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  (
    {
      products,
      onAddToCart,
      onToggleWishlist,
      wishlistIds,
      hrefFor,
      columns = { sm: 2, lg: 3, xl: 4 },
      className,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-4 md:gap-5",
        buildColClass("sm:", columns.sm),
        buildColClass("md:", columns.md),
        buildColClass("lg:", columns.lg),
        buildColClass("xl:", columns.xl),
        className
      )}
      {...props}
    >
      {products
        ? products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              href={hrefFor?.(p)}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              inWishlist={wishlistIds?.has(p.id)}
            />
          ))
        : children}
    </div>
  )
);
ProductGrid.displayName = "ProductGrid";

export interface ProductGridSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  columns?: ProductGridProps["columns"];
}

const ProductGridSkeleton = React.forwardRef<
  HTMLDivElement,
  ProductGridSkeletonProps
>(
  (
    { count = 8, columns = { sm: 2, lg: 3, xl: 4 }, className, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-4 md:gap-5",
        buildColClass("sm:", columns?.sm),
        buildColClass("md:", columns?.md),
        buildColClass("lg:", columns?.lg),
        buildColClass("xl:", columns?.xl),
        className
      )}
      aria-busy="true"
      aria-live="polite"
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
);
ProductGridSkeleton.displayName = "ProductGridSkeleton";

export { ProductGrid, ProductGridSkeleton };
