import * as React from "react";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Price } from "@/components/ui/price";
import { Rating } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { ProductGallery, type GalleryImage } from "@/components/product/product-gallery";
import { type Product } from "@/types/product";

export interface QuickViewProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  product: Product;
  images: GalleryImage[];
  rating?: number;
  reviewCount?: number;
  description?: string;
  onAddToCart?: (product: Product, quantity: number) => void;
  onToggleWishlist?: (product: Product) => void;
  inWishlist?: boolean;
}

const QuickView = React.forwardRef<HTMLDivElement, QuickViewProps>(
  (
    {
      open,
      onOpenChange,
      trigger,
      product,
      images,
      rating,
      reviewCount,
      description,
      onAddToCart,
      onToggleWishlist,
      inWishlist,
    },
    _ref
  ) => {
    const [qty, setQty] = React.useState(1);

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
          <div className="grid sm:grid-cols-2 gap-0">
            <div className="bg-gray-50 p-4 sm:p-6">
              <ProductGallery images={images} />
            </div>
            <div className="p-5 sm:p-6 flex flex-col gap-4">
              <DialogHeader>
                <DialogTitle className="text-h4 leading-snug">
                  {product.title}
                </DialogTitle>
              </DialogHeader>
              {rating !== undefined && (
                <Rating
                  value={rating}
                  count={reviewCount}
                  showValue
                  size="md"
                />
              )}
              <Price current={product.price} compare={product.comparePrice} size="xl" />
              {description && (
                <>
                  <Separator />
                  <p className="text-p1 text-text-secondary line-clamp-5">
                    {description}
                  </p>
                </>
              )}
              <Separator />
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-text-secondary">Qty</span>
                <div className="inline-flex items-center rounded-md border border-gray-200">
                  <button
                    type="button"
                    aria-label="Decrease"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="grid size-9 place-items-center text-text-secondary hover:text-primary disabled:opacity-40"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="px-3 text-[14px] tabular-nums min-w-[40px] text-center">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase"
                    onClick={() => setQty((q) => q + 1)}
                    className="grid size-9 place-items-center text-text-secondary hover:text-primary"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
              <div className="mt-auto flex flex-col sm:flex-row gap-2">
                <Button
                  size="lg"
                  className="flex-1"
                  iconLeft={<ShoppingCart />}
                  onClick={() => onAddToCart?.(product, qty)}
                >
                  Add to cart
                </Button>
                <Button
                  size="lg"
                  variant="primaryOutlined"
                  onClick={() => onToggleWishlist?.(product)}
                  aria-pressed={inWishlist}
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  iconLeft={
                    <Heart className={inWishlist ? "fill-current" : undefined} />
                  }
                >
                  Wishlist
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);
QuickView.displayName = "QuickView";

export { QuickView };
