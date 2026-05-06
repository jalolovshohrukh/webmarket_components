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

export interface PieChartDatum {
  name: string;
  value: number;
  fill?: string;
  [k: string]: unknown;
}

export interface PieChartProps {
  data: PieChartDatum[];
  config: ChartConfig;
  showLegend?: boolean;
  showLabels?: boolean;
  className?: string;
}

function PieChart({
  data,
  config,
  showLegend = true,
  showLabels = false,
  className,
}: PieChartProps) {
  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <RechartsPieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="name" />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="80%"
          label={showLabels}
          stroke="hsl(var(--background))"
          strokeWidth={2}
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={entry.fill ?? `var(--color-${entry.name})`}
            />
          ))}
        </Pie>
        {showLegend && <ChartLegend content={<ChartLegendContent nameKey="name" />} />}
      </RechartsPieChart>
    </ChartContainer>
  );
}

export { PieChart };
