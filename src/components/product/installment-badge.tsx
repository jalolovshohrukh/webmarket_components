import * as React from "react";
import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, type Money } from "@/types/product";

export interface InstallmentBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The monthly amount (computed by the consumer). */
  monthly: Money;
  months?: number;
  /** Localised "from" label. */
  fromLabel?: string;
  /** Localised "/month" suffix. */
  perMonthLabel?: string;
  variant?: "default" | "compact";
}

/**
 * Marketplace-style installment / financing badge.
 * "from 221 сомони/мес" — the visual signature of regional commerce sites.
 *
 * Drop into a ProductCard slot, a price block, or the cart summary.
 */
const InstallmentBadge = React.forwardRef<HTMLDivElement, InstallmentBadgeProps>(
  (
    {
      monthly,
      months,
      fromLabel = "from",
      perMonthLabel = "/mo",
      variant = "default",
      className,
      ...props
    },
    ref
  ) => {
    const compact = variant === "compact";
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md font-medium tabular-nums",
          compact
            ? "bg-secondary px-2 py-0.5 text-[11px] text-primary"
            : "bg-secondary px-2.5 py-1 text-[12px] text-primary",
          className
        )}
        {...props}
      >
        {!compact && <CreditCard className="size-3.5" />}
        <span>
          <span className="opacity-70 font-normal">{fromLabel}</span>{" "}
          <span>{formatPrice(monthly)}</span>
          <span className="opacity-70 font-normal">{perMonthLabel}</span>
          {months !== undefined && !compact && (
            <span className="opacity-70 font-normal"> · {months}m</span>
          )}
        </span>
      </div>
    );
  }
);
InstallmentBadge.displayName = "InstallmentBadge";

export { InstallmentBadge };
