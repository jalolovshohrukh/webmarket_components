import * as React from "react";
import { Heart } from "lucide-react";
import { QuantityStepper } from "@/components/forms/quantity-stepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice, type Money } from "@/types/product";

export interface CartLineItem {
  id: string;
  title: React.ReactNode;
  imageUrl: string;
  price: Money;
  comparePrice?: Money;
  quantity: number;
  variant?: string;
  href?: string;
  stockHint?: React.ReactNode;
  giftWrapped?: boolean;
}

export interface CartLineItemProps {
  item: CartLineItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onSaveForLater?: (id: string) => void;
  className?: string;
}

function CartLineItemRow({
  item,
  onQuantityChange,
  onRemove,
  onSaveForLater,
  className,
}: CartLineItemProps) {
  const lineTotal = {
    amount: item.price.amount * item.quantity,
    currency: item.price.currency,
  };
  return (
    <div
      className={cn(
        "flex items-start gap-4 border-b border-gray-200 py-4 last:border-b-0",
        className
      )}
    >
      <a
        href={item.href}
        className="block size-20 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50"
      >
        <img
          src={item.imageUrl}
          alt=""
          className="size-full object-cover"
          loading="lazy"
        />
      </a>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-[14px] font-medium text-text-primary">
            {item.href ? (
              <a href={item.href} className="hover:text-primary">
                {item.title}
              </a>
            ) : (
              item.title
            )}
          </h4>
          <div className="text-right">
            <div className="text-[14px] font-semibold tabular-nums text-text-primary">
              {formatPrice(lineTotal)}
            </div>
            {item.comparePrice && (
              <div className="text-[12px] text-text-tertiary line-through tabular-nums">
                {formatPrice({
                  amount: item.comparePrice.amount * item.quantity,
                  currency: item.comparePrice.currency,
                })}
              </div>
            )}
          </div>
        </div>
        {item.variant && (
          <div className="mt-0.5 text-[12px] text-text-tertiary">
            {item.variant}
          </div>
        )}
        {item.giftWrapped && (
          <Badge variant="secondary" className="mt-1">
            Gift wrapped
          </Badge>
        )}
        {item.stockHint && (
          <div className="mt-1 text-[12px] text-warning-700">
            {item.stockHint}
          </div>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <QuantityStepper
            value={item.quantity}
            onChange={(q) => onQuantityChange(item.id, q)}
            size="sm"
            min={1}
            removeAtMin
            onRemove={() => onRemove(item.id)}
          />
          <div className="ml-auto flex items-center gap-0.5">
            {onSaveForLater && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSaveForLater(item.id)}
                aria-label="Save for later"
                className="!px-2 sm:!px-3"
              >
                <Heart />
                <span className="hidden sm:inline">Save for later</span>
              </Button>
            )}
            <Button
              variant="text"
              size="sm"
              onClick={() => onRemove(item.id)}
              className="!px-2"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CartLineItemRow };
