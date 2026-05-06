import * as React from "react";
import { cn } from "@/lib/utils";

type Cols = 1 | 2 | 3 | 4 | 6 | 12;

const colsClass: Record<Cols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12",
};

const spanClass: Record<Cols, string> = {
  1: "col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-2 lg:col-span-3",
  4: "md:col-span-2 lg:col-span-3 xl:col-span-4",
  6: "md:col-span-3 lg:col-span-6",
  12: "md:col-span-4 lg:col-span-6 xl:col-span-12",
};

export interface DashboardGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  cols?: Cols;
  gap?: "sm" | "md" | "lg";
}

const gapClass = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
} as const;

const DashboardGrid = React.forwardRef<HTMLDivElement, DashboardGridProps>(
  ({ cols = 4, gap = "md", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid auto-rows-min",
        colsClass[cols],
        gapClass[gap],
        className
      )}
      {...props}
    />
  )
);
DashboardGrid.displayName = "DashboardGrid";

export interface DashboardItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  span?: Cols;
}

const DashboardItem = React.forwardRef<HTMLDivElement, DashboardItemProps>(
  ({ span = 1, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(span !== 1 && spanClass[span], className)}
      {...props}
    />
  )
);
DashboardItem.displayName = "DashboardItem";

export interface DashboardSectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const DashboardSection = React.forwardRef<
  HTMLElement,
  DashboardSectionProps
>(({ title, description, action, className, children, ...props }, ref) => (
  <section ref={ref} className={cn("space-y-3", className)} {...props}>
    {(title || description || action) && (
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          {title && (
            <h2 className="text-h4 font-semibold text-text-primary">{title}</h2>
          )}
          {description && (
            <p className="text-[13px] text-text-tertiary">{description}</p>
          )}
        </div>
        {action && <div className="flex items-center gap-2">{action}</div>}
      </header>
    )}
    {children}
  </section>
));
DashboardSection.displayName = "DashboardSection";

export { DashboardGrid, DashboardItem, DashboardSection };
