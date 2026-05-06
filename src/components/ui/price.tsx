import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatPrice, type Money } from "@/types/product";

const priceVariants = cva("inline-flex items-baseline gap-2 tabular-nums", {
  variants: {
    size: {
      sm: "text-[14px]",
      md: "text-[16px]",
      lg: "text-[20px]",
      xl: "text-[24px]",
    },
  },
  defaultVariants: { size: "md" },
});

export interface PriceProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof priceVariants> {
  current: Money;
  compare?: Money;
  /** Show a -XX% badge if compare > current. */
  showDiscount?: boolean;
  currency?: string;
}

function pctOff(current: number, compare: number): number {
  if (!compare || compare <= 0 || compare <= current) return 0;
  return Math.round(((compare - current) / compare) * 100);
}

const Price = React.forwardRef<HTMLSpanElement, PriceProps>(
  (
    {
      current,
      compare,
      size,
      showDiscount = true,
      className,
      ...props
    },
    ref
  ) => {
    const discount = compare ? pctOff(current.amount, compare.amount) : 0;
    return (
      <span
        ref={ref}
        className={cn(priceVariants({ size }), className)}
        {...props}
      >
        <span className="font-semibold text-text-primary">
          {formatPrice(current)}
        </span>
        {compare && discount > 0 && (
          <>
            <span className="text-text-tertiary line-through text-[0.85em] font-normal">
              {formatPrice(compare)}
            </span>
            {showDiscount && (
              <Badge variant="danger" className="ml-1 text-[10px] py-0 px-1.5">
                -{discount}%
              </Badge>
            )}
          </>
        )}
      </span>
    );
  }
);
Price.displayName = "Price";

export interface DiscountBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Percentage discount, e.g. 20 for "-20%". */
  percent: number;
  /** Override the label entirely (e.g. "SALE", "NEW"). */
  label?: string;
}

const DiscountBadge = React.forwardRef<HTMLSpanElement, DiscountBadgeProps>(
  ({ percent, label, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-danger px-2 py-0.5 text-[11px] font-bold leading-4 text-white shadow-sm",
        className
      )}
      {...props}
    >
      {label ?? `-${percent}%`}
    </span>
  )
);
DiscountBadge.displayName = "DiscountBadge";

export { Price, DiscountBadge };
