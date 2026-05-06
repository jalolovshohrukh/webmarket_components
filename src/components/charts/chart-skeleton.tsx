import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface ChartSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio of the chart area, e.g., "16/9", "4/3", "1/1". */
  aspectRatio?: string;
  /** Fixed height in px (overrides aspectRatio). */
  height?: number;
  /** Show a horizontal legend strip below the chart. */
  withLegend?: boolean;
  /** Visual style — bars (vertical), line, area, donut, sparkline, generic. */
  variant?: "bars" | "line" | "area" | "donut" | "sparkline" | "generic";
}

/**
 * Generic loading state for any chart wrapper. Pass `variant` to hint at the
 * eventual chart's shape so the skeleton's silhouette matches the real layout.
 */
const ChartSkeleton = React.forwardRef<HTMLDivElement, ChartSkeletonProps>(
  (
    {
      aspectRatio = "16/9",
      height,
      withLegend,
      variant = "generic",
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex w-full flex-col gap-3", className)}
        aria-busy="true"
        aria-live="polite"
        {...props}
      >
        <div
          className="relative w-full overflow-hidden rounded-lg"
          style={{
            aspectRatio: height ? undefined : aspectRatio,
            height,
            ...style,
          }}
        >
          {variant === "bars" && (
            <div className="absolute inset-x-0 bottom-0 flex h-full items-end gap-2 px-2 pb-1">
              {[55, 70, 40, 85, 60, 75, 50].map((h, i) => (
                <Skeleton
                  key={i}
                  className="flex-1 rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          )}
          {(variant === "line" || variant === "area") && (
            <div className="absolute inset-0 flex items-end">
              <Skeleton className="h-full w-full" />
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,32 L14,26 L28,28 L42,18 L56,22 L70,12 L84,16 L100,8"
                  fill="none"
                  stroke="hsl(var(--background))"
                  strokeOpacity={0.6}
                  strokeWidth={1.5}
                />
              </svg>
            </div>
          )}
          {variant === "donut" && (
            <div className="absolute inset-0 grid place-items-center">
              <Skeleton className="aspect-square h-[80%] rounded-full" />
              <Skeleton className="absolute aspect-square h-[45%] rounded-full bg-background" />
            </div>
          )}
          {variant === "sparkline" && <Skeleton className="size-full" />}
          {variant === "generic" && <Skeleton className="size-full" />}
        </div>
        {withLegend && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Skeleton className="size-2.5 rounded-sm" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
ChartSkeleton.displayName = "ChartSkeleton";

export { ChartSkeleton };
