import * as React from "react";
import { Check, AlertCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StockState = "in" | "low" | "out" | "preorder" | "backorder";

export interface StockBadgeProps {
  state: StockState;
  count?: number;
  className?: string;
}

const stateConfig: Record<
  StockState,
  { variant: React.ComponentProps<typeof Badge>["variant"]; icon: React.ReactNode; label: string }
> = {
  in: { variant: "success", icon: <Check className="size-3" />, label: "In stock" },
  low: {
    variant: "warning",
    icon: <AlertCircle className="size-3" />,
    label: "Low stock",
  },
  out: {
    variant: "danger",
    icon: <X className="size-3" />,
    label: "Out of stock",
  },
  preorder: {
    variant: "info",
    icon: <Check className="size-3" />,
    label: "Pre-order",
  },
  backorder: {
    variant: "muted",
    icon: <AlertCircle className="size-3" />,
    label: "Backorder",
  },
};

function StockBadge({ state, count, className }: StockBadgeProps) {
  const cfg = stateConfig[state];
  const label =
    state === "low" && count !== undefined
      ? `Only ${count} left`
      : cfg.label;
  return (
    <Badge variant={cfg.variant} className={cn("gap-1", className)}>
      {cfg.icon}
      {label}
    </Badge>
  );
}

export { StockBadge };
