import * as React from "react";
import { cn } from "@/lib/utils";

export interface LiveBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  label?: React.ReactNode;
  tone?: "danger" | "success" | "primary" | "info";
}

/**
 * Pulsing dot + label — for "Live now", flash sales, real-time stock
 * indicators. Pure CSS animation, no JS timers.
 */
const LiveBadge = React.forwardRef<HTMLSpanElement, LiveBadgeProps>(
  ({ label = "Live", tone = "danger", className, ...props }, ref) => {
    const dotColor = {
      danger: "bg-danger-500",
      success: "bg-success-500",
      primary: "bg-primary",
      info: "bg-info-500",
    }[tone];
    const textColor = {
      danger: "text-danger-700",
      success: "text-success-700",
      primary: "text-primary",
      info: "text-info-700",
    }[tone];
    const bgColor = {
      danger: "bg-danger-50",
      success: "bg-success-50",
      primary: "bg-secondary",
      info: "bg-info-50",
    }[tone];
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
          bgColor,
          textColor,
          className
        )}
        {...props}
      >
        <span className="relative grid size-2 place-items-center">
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 animate-ping rounded-full opacity-75",
              dotColor
            )}
          />
          <span
            aria-hidden
            className={cn("size-2 rounded-full", dotColor)}
          />
        </span>
        {label}
      </span>
    );
  }
);
LiveBadge.displayName = "LiveBadge";

export { LiveBadge };
