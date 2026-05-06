import * as React from "react";
import { Cell, Pie, PieChart as RechartsPieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/charts/chart-container";
import { cn } from "@/lib/utils";
import type { PieChartDatum } from "@/components/charts/pie-chart";

export interface DonutChartProps {
  data: PieChartDatum[];
  config: ChartConfig;
  showLegend?: boolean;
  centerLabel?: React.ReactNode;
  centerValue?: React.ReactNode;
  innerRadius?: string | number;
  outerRadius?: string | number;
  className?: string;
}

function DonutChart({
  data,
  config,
  showLegend = true,
  centerLabel,
  centerValue,
  innerRadius = "60%",
  outerRadius = "80%",
  className,
}: DonutChartProps) {
  return (
    <ChartContainer config={config} className={cn("relative h-full w-full", className)}>
      <RechartsPieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="name" />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          stroke="hsl(var(--background))"
          strokeWidth={2}
          paddingAngle={1}
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={entry.fill ?? `var(--color-${entry.name})`}
            />
          ))}
        </Pie>
        {showLegend && <ChartLegend content={<ChartLegendContent nameKey="name" />} />}
        {(centerLabel || centerValue) && (
          <foreignObject x="0" y="0" width="100%" height="100%">
            <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center text-center">
              {centerValue && (
                <div className="text-h3 font-semibold tabular-nums text-text-primary">
                  {centerValue}
                </div>
              )}
              {centerLabel && (
                <div className="text-[12px] text-text-tertiary">
                  {centerLabel}
                </div>
              )}
            </div>
          </foreignObject>
        )}
      </RechartsPieChart>
    </ChartContainer>
  );
}

export { DonutChart };
