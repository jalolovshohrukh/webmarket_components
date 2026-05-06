import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  delta?: React.ReactNode;
  /** "good" / "bad" / "neutral" — drives the delta colour. */
  tone?: "good" | "bad" | "neutral";
}

const toneClass = {
  good: "text-success-700",
  bad: "text-danger-700",
  neutral: "text-text-tertiary",
} as const;

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ label, value, delta, tone = "neutral", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "min-w-0 rounded-lg border border-gray-200 bg-card p-3",
        className
      )}
      {...props}
    >
      <div className="text-[11px] text-text-tertiary">{label}</div>
      <div className="mt-0.5 text-h5 font-semibold tabular-nums text-text-primary">
        {value}
      </div>
      {delta !== undefined && (
        <div className={cn("mt-0.5 text-[12px] tabular-nums", toneClass[tone])}>
          {delta}
        </div>
      )}
    </div>
  )
);
StatCard.displayName = "StatCard";

export { StatCard };
