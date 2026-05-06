import * as React from "react";
import { ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatPrice, type Money } from "@/types/product";

export interface OrderSummaryLine {
  id: string;
  label: React.ReactNode;
  value: Money | string | number | React.ReactNode;
  muted?: boolean;
  emphasized?: boolean;
  discount?: boolean;
}

export interface OrderSummaryProps {
  lines: OrderSummaryLine[];
  total: Money;
  itemCount?: number;
  ctaLabel?: string;
  onCheckout?: () => void;
  ctaDisabled?: boolean;
  loading?: boolean;
  footnote?: React.ReactNode;
  className?: string;
}

function renderValue(v: OrderSummaryLine["value"]) {
  if (v === null || v === undefined) return "—";
  if (typeof v === "object" && v !== null && "amount" in (v as Money)) {
    return formatPrice(v as Money);
  }
  if (typeof v === "number") return v.toLocaleString();
  return v as React.ReactNode;
}

function OrderSummary({
  lines,
  total,
  itemCount,
  ctaLabel = "Proceed to checkout",
  onCheckout,
  ctaDisabled,
  loading,
  footnote,
  className,
}: OrderSummaryProps) {
  return (
    <Card className={cn("p-5", className)}>
      <h3 className="text-h5 font-semibold text-text-primary">
        Order summary
      </h3>
      <dl className="mt-4 space-y-2 text-[13px]">
        {lines.map((line) => (
          <div key={line.id} className="flex items-center justify-between gap-4">
            <dt className={cn("text-text-secondary", line.muted && "text-text-tertiary")}>
              {line.label}
            </dt>
            <dd
              className={cn(
                "tabular-nums text-text-primary",
                line.muted && "text-text-tertiary",
                line.discount && "text-success-700",
                line.emphasized && "font-semibold"
              )}
            >
              {line.discount && "−"}
              {renderValue(line.value)}
            </dd>
          </div>
        ))}
      </dl>
      <Separator className="my-4" />
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[14px] font-semibold text-text-primary">
          Total {itemCount !== undefined && (
            <span className="text-text-tertiary font-normal">
              ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
          )}
        </span>
        <span className="text-h4 font-semibold tabular-nums text-text-primary">
          {formatPrice(total)}
        </span>
      </div>
      {onCheckout && (
        <Button
          variant="primary"
          size="lg"
          className="mt-4 w-full"
          iconLeft={<ShoppingBag />}
          disabled={ctaDisabled}
          loading={loading}
          onClick={onCheckout}
        >
          {ctaLabel}
        </Button>
      )}
      {footnote && (
        <p className="mt-3 text-center text-[12px] text-text-tertiary">
          {footnote}
        </p>
      )}
    </Card>
  );
}

export { OrderSummary };
