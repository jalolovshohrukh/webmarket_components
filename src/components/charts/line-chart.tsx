import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
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

export interface LineChartProps {
  data: Array<Record<string, unknown>>;
  config: ChartConfig;
  xKey: string;
  series?: string[];
  smooth?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  className?: string;
}

function LineChart({
  data,
  config,
  xKey,
  series,
  smooth = true,
  showGrid = true,
  showLegend = false,
  showXAxis = true,
  showYAxis = true,
  className,
}: LineChartProps) {
  const keys = series ?? Object.keys(config);
  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <RechartsLineChart data={data} margin={{ top: 12, right: 12, left: 4, bottom: 4 }}>
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
        {keys.map((key) => (
          <Line
            key={key}
            type={smooth ? "monotone" : "linear"}
            dataKey={key}
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
}

export { LineChart };
