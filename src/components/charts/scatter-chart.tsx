import {
  CartesianGrid,
  Scatter,
  ScatterChart as RechartsScatterChart,
  XAxis,
  YAxis,
  ZAxis,
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

export interface ScatterSeries {
  name: string;
  data: Array<Record<string, unknown>>;
}

export interface ScatterChartProps {
  series: ScatterSeries[];
  config: ChartConfig;
  xKey: string;
  yKey: string;
  zKey?: string;
  zRange?: [number, number];
  showLegend?: boolean;
  className?: string;
}

function ScatterChart({
  series,
  config,
  xKey,
  yKey,
  zKey,
  zRange = [60, 400],
  showLegend = true,
  className,
}: ScatterChartProps) {
  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <RechartsScatterChart margin={{ top: 12, right: 12, left: 4, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey={xKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          type="number"
          dataKey={yKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={32}
        />
        {zKey && (
          <ZAxis type="number" dataKey={zKey} range={zRange} />
        )}
        <ChartTooltip cursor={{ strokeDasharray: "3 3" }} content={<ChartTooltipContent />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Scatter
            key={s.name}
            name={s.name}
            data={s.data}
            fill={`var(--color-${s.name})`}
          />
        ))}
      </RechartsScatterChart>
    </ChartContainer>
  );
}

export { ScatterChart };
