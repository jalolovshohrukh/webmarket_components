import {
  Area,
  AreaChart as RechartsAreaChart,
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

export interface AreaChartProps {
  data: Array<Record<string, unknown>>;
  config: ChartConfig;
  xKey: string;
  series?: string[];
  stacked?: boolean;
  smooth?: boolean;
  gradient?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  className?: string;
}

function AreaChart({
  data,
  config,
  xKey,
  series,
  stacked = false,
  smooth = true,
  gradient = true,
  showGrid = true,
  showLegend = false,
  showXAxis = true,
  showYAxis = true,
  className,
}: AreaChartProps) {
  const keys = series ?? Object.keys(config);
  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <RechartsAreaChart data={data} margin={{ top: 12, right: 12, left: 4, bottom: 4 }}>
        {gradient && (
          <defs>
            {keys.map((key) => (
              <linearGradient
                key={key}
                id={`area-${key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0.04}
                />
              </linearGradient>
            ))}
          </defs>
        )}
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
        <ChartTooltip cursor content={<ChartTooltipContent indicator="line" />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {keys.map((key) => (
          <Area
            key={key}
            type={smooth ? "monotone" : "linear"}
            dataKey={key}
            stackId={stacked ? "1" : undefined}
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            fill={gradient ? `url(#area-${key})` : `var(--color-${key})`}
            fillOpacity={gradient ? 1 : 0.4}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
}

export { AreaChart };
