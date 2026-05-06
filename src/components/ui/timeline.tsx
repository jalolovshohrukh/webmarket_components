import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type TimelineStatus = "complete" | "current" | "upcoming";

export interface TimelineStep {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  status: TimelineStatus;
  icon?: React.ReactNode;
}

export interface TimelineProps {
  steps: TimelineStep[];
  orientation?: "vertical" | "horizontal";
  className?: string;
}

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ steps, orientation = "vertical", className }, ref) => {
    if (orientation === "horizontal") {
      return (
        <ol
          ref={ref}
          className={cn("flex w-full items-start", className)}
          aria-label="Progress"
        >
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <li
                key={step.id}
                className={cn(
                  "relative flex flex-col items-center text-center",
                  !isLast && "flex-1"
                )}
              >
                <div className="flex w-full items-center">
                  <Dot status={step.status}>{step.icon}</Dot>
                  {!isLast && <Connector status={step.status} horizontal />}
                </div>
                <div className="mt-2 px-2">
                  <div
                    className={cn(
                      "text-[13px] font-medium",
                      step.status === "upcoming"
                        ? "text-text-tertiary"
                        : "text-text-primary"
                    )}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-[12px] text-text-tertiary">
                      {step.description}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      );
    }

    return (
      <ol
        ref={ref}
        className={cn("flex flex-col", className)}
        aria-label="Progress"
      >
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <li key={step.id} className="relative flex gap-3 pb-6 last:pb-0">
              <div className="flex flex-col items-center">
                <Dot status={step.status}>{step.icon}</Dot>
                {!isLast && <Connector status={step.status} />}
              </div>
              <div className="flex-1 pb-1">
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={cn(
                      "text-[14px] font-medium",
                      step.status === "upcoming"
                        ? "text-text-tertiary"
                        : "text-text-primary"
                    )}
                  >
                    {step.title}
                  </div>
                  {step.meta && (
                    <span className="text-[12px] text-text-tertiary">
                      {step.meta}
                    </span>
                  )}
                </div>
                {step.description && (
                  <div className="mt-0.5 text-[13px] text-text-secondary">
                    {step.description}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
);
Timeline.displayName = "Timeline";

function Dot({
  status,
  children,
}: {
  status: TimelineStatus;
  children?: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "relative z-10 grid size-7 shrink-0 place-items-center rounded-full border text-[11px] font-semibold",
        status === "complete" &&
          "bg-primary border-primary text-primary-foreground",
        status === "current" &&
          "bg-background border-primary text-primary ring-4 ring-primary/15",
        status === "upcoming" &&
          "bg-background border-gray-200 text-text-tertiary"
      )}
    >
      {children ?? (status === "complete" ? <Check className="size-4" /> : null)}
    </span>
  );
}

function Connector({
  status,
  horizontal,
}: {
  status: TimelineStatus;
  horizontal?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        horizontal ? "h-px flex-1" : "w-px flex-1 mt-1",
        status === "complete" ? "bg-primary" : "bg-gray-200"
      )}
    />
  );
}

export { Timeline };
