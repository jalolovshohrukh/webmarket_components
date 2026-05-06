import * as React from "react";
import { ChevronRight, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type OrderStatus =
  | "placed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export interface OrderHistoryEntry {
  id: string;
  orderNumber: string;
  placedAt: string | Date;
  status: OrderStatus;
  total: React.ReactNode;
  itemCount: number;
  thumbnails: string[];
  href?: string;
}

export interface OrderHistoryRowProps {
  order: OrderHistoryEntry;
  onTrack?: () => void;
  onReorder?: () => void;
  className?: string;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; variant: React.ComponentProps<typeof Badge>["variant"] }
> = {
  placed: { label: "Placed", variant: "info" },
  processing: { label: "Processing", variant: "info" },
  shipped: { label: "Shipped", variant: "warning" },
  delivered: { label: "Delivered", variant: "success" },
  cancelled: { label: "Cancelled", variant: "muted" },
  returned: { label: "Returned", variant: "muted" },
};

function OrderHistoryRow({
  order,
  onTrack,
  onReorder,
  className,
}: OrderHistoryRowProps) {
  const placed =
    order.placedAt instanceof Date
      ? order.placedAt.toLocaleDateString()
      : order.placedAt;
  const status = statusConfig[order.status];

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-muted text-text-secondary">
            <Package className="size-4" />
          </span>
          <div>
            <div className="text-[13px] text-text-tertiary">
              Order #{order.orderNumber} · {placed}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-semibold text-text-primary">
                {order.total}
              </span>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {order.thumbnails.slice(0, 4).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="size-12 rounded-md border border-gray-200 object-cover"
            />
          ))}
          {order.thumbnails.length > 4 && (
            <span className="grid size-12 place-items-center rounded-md border border-gray-200 bg-muted text-[12px] text-text-tertiary">
              +{order.thumbnails.length - 4}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onReorder && (
            <Button variant="secondary" size="sm" onClick={onReorder}>
              Reorder
            </Button>
          )}
          {onTrack && (
            <Button variant="primaryOutlined" size="sm" onClick={onTrack}>
              Track
            </Button>
          )}
          {order.href && (
            <Button variant="ghost" size="iconSm" asChild aria-label="View order">
              <a href={order.href}>
                <ChevronRight />
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

const OrderHistoryRowSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn("p-4", className)}
    aria-busy="true"
    aria-live="polite"
    {...props}
  >
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Skeleton className="size-9 shrink-0 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-44" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="size-12 rounded-md" />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
    </div>
  </Card>
));
OrderHistoryRowSkeleton.displayName = "OrderHistoryRowSkeleton";

export { OrderHistoryRow, OrderHistoryRowSkeleton };
