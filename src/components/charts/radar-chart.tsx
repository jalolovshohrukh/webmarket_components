import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartsRadarChart,
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

export interface RadarChartProps {
  data: Array<Record<string, unknown>>;
  config: ChartConfig;
  axisKey: string;
  series?: string[];
  showLegend?: boolean;
  className?: string;
}

function RadarChart({
  data,
  config,
  axisKey,
  series,
  showLegend = false,
  className,
}: RadarChartProps) {
  const keys = series ?? Object.keys(config);
  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <RechartsRadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={axisKey} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {keys.map((key) => (
          <Radar
            key={key}
            dataKey={key}
            stroke={`var(--color-${key})`}
            fill={`var(--color-${key})`}
            fillOpacity={0.25}
          />
        ))}
      </RechartsRadarChart>
    </ChartContainer>
  );
}

export { RadarChart };
