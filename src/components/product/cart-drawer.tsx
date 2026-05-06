import * as React from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice, type Money, type Product } from "@/types/product";

export type CartLine = {
  product: Product;
  quantity: number;
};

export interface CartDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  lines: CartLine[];
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
  currency?: string;
  freeShippingThreshold?: number;
}

function lineSubtotal(line: CartLine): Money {
  return {
    amount: line.product.price.amount * line.quantity,
    currency: line.product.price.currency,
  };
}

function totalAmount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + lineSubtotal(l).amount, 0);
}

const CartDrawer = React.forwardRef<HTMLDivElement, CartDrawerProps>(
  (
    {
      open,
      onOpenChange,
      trigger,
      lines,
      onQuantityChange,
      onRemove,
      onCheckout,
      onContinueShopping,
      currency = "USD",
      freeShippingThreshold,
    },
    _ref
  ) => {
    const subtotal = totalAmount(lines);
    const itemCount = lines.reduce((s, l) => s + l.quantity, 0);
    const remaining =
      freeShippingThreshold !== undefined
        ? Math.max(0, freeShippingThreshold - subtotal)
        : 0;

    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
        <SheetContent
          side="right"
          className="w-full sm:max-w-md p-0 flex flex-col"
        >
          <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-gray-200">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <ShoppingBag className="size-5 text-primary" />
                Your cart
                {itemCount > 0 && (
                  <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[11px] font-semibold text-primary tabular-nums">
                    {itemCount}
                  </span>
                )}
              </SheetTitle>
            </SheetHeader>
          </div>

          {lines.length === 0 ? (
            <div className="flex-1 grid place-items-center">
              <EmptyState
                icon={<ShoppingBag />}
                title="Your cart is empty"
                description="Browse the catalog to find something you love."
                action={
                  <Button onClick={onContinueShopping}>Browse catalog</Button>
                }
              />
            </div>
          ) : (
            <>
              {freeShippingThreshold !== undefined && (
                <div className="px-5 py-3 bg-secondary/40 text-[12px] text-text-secondary">
                  {remaining > 0 ? (
                    <>
                      Add{" "}
                      <span className="font-semibold text-text-primary">
                        {formatPrice({ amount: remaining, currency })}
                      </span>{" "}
                      more for free shipping.
                    </>
                  ) : (
                    <span className="text-success-700 font-medium">
                      You qualify for free shipping!
                    </span>
                  )}
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${Math.min(100, freeShippingThreshold > 0 ? (subtotal / freeShippingThreshold) * 100 : 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              <ul className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
                {lines.map((line) => (
                  <li
                    key={line.product.id}
                    className="flex gap-3 items-start"
                  >
                    <div className="size-16 shrink-0 overflow-hidden rounded-md bg-gray-50">
                      <img
                        src={line.product.imageUrl}
                        alt={line.product.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-[13px] leading-tight text-text-primary line-clamp-2">
                          {line.product.title}
                        </h3>
                        <button
                          type="button"
                          aria-label="Remove"
                          onClick={() => onRemove?.(line.product.id)}
                          className="text-text-tertiary hover:text-danger transition-colors"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-md border border-gray-200">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() =>
                              onQuantityChange?.(
                                line.product.id,
                                Math.max(1, line.quantity - 1)
                              )
                            }
                            disabled={line.quantity <= 1}
                            className="grid size-7 place-items-center text-text-secondary hover:text-primary disabled:opacity-40"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="px-2 text-[12px] tabular-nums min-w-[24px] text-center">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() =>
                              onQuantityChange?.(
                                line.product.id,
                                line.quantity + 1
                              )
                            }
                            className="grid size-7 place-items-center text-text-secondary hover:text-primary"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-[14px] font-semibold text-text-primary tabular-nums">
                          {formatPrice(lineSubtotal(line))}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 px-5 py-4 space-y-3">
                <div className="flex items-center justify-between text-[13px] text-text-secondary">
                  <span>Subtotal</span>
                  <span className="tabular-nums">
                    {formatPrice({ amount: subtotal, currency })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[13px] text-text-secondary">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-[16px] font-semibold text-text-primary">
                  <span>Total</span>
                  <span className="tabular-nums">
                    {formatPrice({ amount: subtotal, currency })}
                  </span>
                </div>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={onCheckout}
                  iconRight={<Trash2 className="invisible" />}
                >
                  Go to checkout
                </Button>
                <Button
                  variant="text"
                  size="sm"
                  className="w-full"
                  onClick={onContinueShopping}
                >
                  Continue shopping
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    );
  }
);
CartDrawer.displayName = "CartDrawer";

export { CartDrawer };
