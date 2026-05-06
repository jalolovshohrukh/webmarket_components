import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/charts/chart-container";
import { cn } from "@/lib/utils";

export interface StackedBarChartProps {
  data: Array<Record<string, unknown>>;
  config: ChartConfig;
  xKey: string;
  series?: string[];
  grouped?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  radius?: number;
  className?: string;
}

function StackedBarChart({
  data,
  config,
  xKey,
  series,
  grouped = false,
  showGrid = true,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  radius = 4,
  className,
}: StackedBarChartProps) {
  const keys = series ?? Object.keys(config);
  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <RechartsBarChart data={data} margin={{ top: 12, right: 12, left: 4, bottom: 4 }}>
        {showGrid && <CartesianGrid vertical={false} strokeDasharray="3 3" />}
        {showXAxis && (
          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
        )}
        {showYAxis && (
          <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
        )}
        <ChartTooltip cursor content={<ChartTooltipContent />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {keys.map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            stackId={grouped ? undefined : "stack"}
            fill={`var(--color-${key})`}
            radius={
              grouped || i === keys.length - 1
                ? radius
                : ([0, 0, 0, 0] as [number, number, number, number])
            }
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}

export { StackedBarChart };
