import * as React from "react";
import { Heart, ShoppingCart, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import { formatPrice, type Product } from "@/types/product";

export interface WishlistGridProps {
  items: Product[];
  onRemove: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  emptyAction?: React.ReactNode;
  className?: string;
}

function WishlistGrid({
  items,
  onRemove,
  onAddToCart,
  emptyAction,
  className,
}: WishlistGridProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={<Heart />}
        title="Your wishlist is empty"
        description="Heart your favourite products to find them here later."
        action={emptyAction}
        className={className}
      />
    );
  }

  return (
    <ul
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {items.map((p) => (
        <li key={p.id}>
          <Card className="flex h-full flex-col">
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              <img
                src={p.imageUrl}
                alt={p.title}
                loading="lazy"
                className="size-full object-cover"
              />
              {p.badge && (
                <Badge className="absolute left-3 top-3">{p.badge}</Badge>
              )}
              <button
                type="button"
                onClick={() => onRemove(p)}
                aria-label="Remove from wishlist"
                className="absolute right-3 top-3 grid size-9 place-items-center rounded-xl bg-background/90 text-text-secondary shadow-sm backdrop-blur transition-colors hover:text-danger"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="line-clamp-2 text-[14px] text-text-primary">
                {p.title}
              </h3>
              <div className="text-h5 font-semibold text-text-primary">
                {formatPrice(p.price)}
              </div>
              {onAddToCart && (
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-auto w-full"
                  iconLeft={<ShoppingCart />}
                  onClick={() => onAddToCart(p)}
                >
                  Add to cart
                </Button>
              )}
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export { WishlistGrid };
