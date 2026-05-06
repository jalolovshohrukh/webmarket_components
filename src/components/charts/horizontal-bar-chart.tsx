import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/charts/chart-container";
import { cn } from "@/lib/utils";

export interface HorizontalBarChartProps {
  data: Array<Record<string, unknown>>;
  config: ChartConfig;
  yKey: string;
  series?: string[];
  showGrid?: boolean;
  radius?: number;
  yWidth?: number;
  className?: string;
}

function HorizontalBarChart({
  data,
  config,
  yKey,
  series,
  showGrid = true,
  radius = 4,
  yWidth = 80,
  className,
}: HorizontalBarChartProps) {
  const keys = series ?? Object.keys(config);
  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <RechartsBarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 12, left: 4, bottom: 4 }}
      >
        {showGrid && <CartesianGrid horizontal={false} strokeDasharray="3 3" />}
        <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis
          type="category"
          dataKey={yKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={yWidth}
        />
        <ChartTooltip cursor content={<ChartTooltipContent />} />
        {keys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            radius={radius}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}

export { HorizontalBarChart };
