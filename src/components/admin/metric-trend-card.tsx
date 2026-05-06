import * as React from "react";
import { KpiCard, type KpiCardProps } from "@/components/admin/kpi-card";
import { cn } from "@/lib/utils";

export interface MetricTrendCardProps extends Omit<KpiCardProps, "trail"> {
  /** Chart node — Sparkline, AreaChart, BarChart, etc. */
  chart: React.ReactNode;
  chartHeight?: number;
}

const MetricTrendCard = React.forwardRef<
  HTMLDivElement,
  MetricTrendCardProps
>(({ chart, chartHeight = 80, className, ...props }, ref) => (
  <KpiCard
    ref={ref}
    {...props}
    className={cn(className)}
    trail={
      <div style={{ height: chartHeight }} className="-mx-1 -mb-1">
        {chart}
      </div>
    }
  />
));
MetricTrendCard.displayName = "MetricTrendCard";

export { MetricTrendCard };
