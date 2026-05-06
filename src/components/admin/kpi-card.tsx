import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  delta?: number;
  deltaLabel?: React.ReactNode;
  /** Inverts the delta colour — for metrics where down = good (e.g. churn). */
  invertDelta?: boolean;
  icon?: React.ReactNode;
  trail?: React.ReactNode;
  variant?: "default" | "compact" | "with-icon";
  loading?: boolean;
}

function deltaTone(delta: number, invert: boolean) {
  const positive = invert ? delta < 0 : delta > 0;
  if (delta === 0) return "text-text-tertiary";
  return positive ? "text-success-700" : "text-danger-700";
}

const KpiCard = React.forwardRef<HTMLDivElement, KpiCardProps>(
  (
    {
      label,
      value,
      delta,
      deltaLabel,
      invertDelta = false,
      icon,
      trail,
      variant = "default",
      loading,
      className,
      ...props
    },
    ref
  ) => {
    const compact = variant === "compact";
    return (
      <Card
        ref={ref}
        className={cn("p-4 md:p-5", compact && "p-3 md:p-4", className)}
        {...props}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div
              className={cn(
                "text-text-tertiary",
                compact ? "text-[11px]" : "text-[12px] uppercase tracking-wider"
              )}
            >
              {label}
            </div>
            <div
              className={cn(
                "mt-1 font-semibold tabular-nums text-text-primary",
                compact ? "text-h4" : "text-h2"
              )}
            >
              {loading ? (
                <span className="inline-block h-8 w-24 animate-pulse rounded bg-muted" />
              ) : (
                value
              )}
            </div>
            {(delta !== undefined || deltaLabel) && (
              <div
                className={cn(
                  "mt-1 flex items-center gap-1.5 text-[12px]",
                  delta !== undefined ? deltaTone(delta, invertDelta) : "text-text-tertiary"
                )}
              >
                {delta !== undefined && (
                  <>
                    {delta > 0 ? (
                      <TrendingUp className="size-3.5" />
                    ) : delta < 0 ? (
                      <TrendingDown className="size-3.5" />
                    ) : null}
                    <span className="font-medium tabular-nums">
                      {delta > 0 ? "+" : ""}
                      {delta}%
                    </span>
                  </>
                )}
                {deltaLabel && (
                  <span className="text-text-tertiary">{deltaLabel}</span>
                )}
              </div>
            )}
          </div>
          {(variant === "with-icon" || icon) && icon && (
            <span
              className={cn(
                "grid place-items-center rounded-lg bg-secondary text-primary [&_svg]:size-5",
                compact ? "size-9" : "size-11"
              )}
            >
              {icon}
            </span>
          )}
        </div>
        {trail && <div className="mt-3">{trail}</div>}
      </Card>
    );
  }
);
KpiCard.displayName = "KpiCard";

export interface KpiCardSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  withTrail?: boolean;
  trailHeight?: number;
}

const KpiCardSkeleton = React.forwardRef<HTMLDivElement, KpiCardSkeletonProps>(
  ({ withTrail, trailHeight = 64, className, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn("p-4 md:p-5", className)}
      aria-busy="true"
      aria-live="polite"
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="size-11 shrink-0 rounded-lg" />
      </div>
      {withTrail && (
        <Skeleton
          className="mt-3 w-full rounded-md"
          style={{ height: trailHeight }}
        />
      )}
    </Card>
  )
);
KpiCardSkeleton.displayName = "KpiCardSkeleton";

export { KpiCard, KpiCardSkeleton };
