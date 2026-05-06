import { ShoppingCart } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export interface EmptyCartProps {
  onContinueShopping?: () => void;
  shopHref?: string;
  className?: string;
}

function EmptyCart({
  onContinueShopping,
  shopHref = "#shop",
  className,
}: EmptyCartProps) {
  return (
    <EmptyState
      icon={<ShoppingCart />}
      title="Your cart is empty"
      description="Browse the storefront to find products you love."
      action={
        onContinueShopping ? (
          <Button onClick={onContinueShopping}>Continue shopping</Button>
        ) : (
          <Button asChild>
            <a href={shopHref}>Continue shopping</a>
          </Button>
        )
      }
      className={className}
    />
  );
}

export { EmptyCart };
