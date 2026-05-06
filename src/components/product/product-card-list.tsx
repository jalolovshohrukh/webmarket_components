import * as React from "react";
import { Heart, ShoppingCart, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";
import { formatPrice, type Product } from "@/types/product";

export interface ProductCardListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  href?: string;
  description?: React.ReactNode;
  seller?: string;
  deliveryEta?: string;
  reviewCount?: number;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  inWishlist?: boolean;
}

const ProductCardList = React.forwardRef<HTMLDivElement, ProductCardListProps>(
  (
    {
      product,
      href,
      description,
      seller,
      deliveryEta,
      reviewCount,
      onAddToCart,
      onToggleWishlist,
      inWishlist,
      className,
      ...props
    },
    ref
  ) => {
    const Wrapper = href ? "a" : "div";
    const wrapperProps = href ? { href } : {};
    return (
      <Card
        ref={ref}
        className={cn(
          "flex flex-col gap-4 p-4 sm:flex-row sm:p-5",
          className
        )}
        {...props}
      >
        <Wrapper
          {...wrapperProps}
          className="relative block w-full shrink-0 overflow-hidden rounded-lg bg-gray-50 sm:size-40"
        >
          <img
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
            className="aspect-square h-full w-full object-cover"
          />
          {product.badge && (
            <Badge className="absolute left-2 top-2">{product.badge}</Badge>
          )}
        </Wrapper>
        <div className="flex flex-1 flex-col">
          <h3 className="text-[15px] font-medium leading-tight text-text-primary">
            {href ? (
              <a href={href} className="hover:text-primary transition-colors">
                {product.title}
              </a>
            ) : (
              product.title
            )}
          </h3>
          {description && (
            <p className="mt-1 line-clamp-2 text-[13px] text-text-secondary">
              {description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-text-tertiary">
            {product.rating !== undefined && (
              <div className="flex items-center gap-1.5">
                <Rating
                  value={product.rating}
                  size="sm"
                  showValue
                  count={reviewCount}
                />
              </div>
            )}
            {seller && (
              <span>
                Sold by{" "}
                <span className="text-text-secondary">{seller}</span>
              </span>
            )}
            {deliveryEta && (
              <span className="inline-flex items-center gap-1">
                <Truck className="size-3.5" />
                {deliveryEta}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end justify-between gap-3 sm:w-44">
          <div className="text-right">
            <div className="text-h4 font-semibold text-text-primary">
              {formatPrice(product.price)}
            </div>
            {product.comparePrice && (
              <div className="text-[12px] text-text-tertiary line-through">
                {formatPrice(product.comparePrice)}
              </div>
            )}
          </div>
          <div className="flex w-full items-center gap-2">
            {onToggleWishlist && (
              <Button
                variant="ghost"
                size="iconMd"
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={inWishlist}
                onClick={() => onToggleWishlist(product)}
                className={cn(inWishlist && "text-primary")}
              >
                <Heart className={cn(inWishlist && "fill-current")} />
              </Button>
            )}
            {onAddToCart && (
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                iconLeft={<ShoppingCart />}
                onClick={() => onAddToCart(product)}
              >
                Add to cart
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }
);
ProductCardList.displayName = "ProductCardList";

export { ProductCardList };
