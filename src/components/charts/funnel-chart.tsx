import {
  Funnel,
  FunnelChart as RechartsFunnelChart,
  LabelList,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/charts/chart-container";
import { cn } from "@/lib/utils";

export interface FunnelDatum {
  name: string;
  value: number;
  fill?: string;
}

export interface FunnelChartProps {
  data: FunnelDatum[];
  config: ChartConfig;
  showLabels?: boolean;
  className?: string;
}

function FunnelChart({
  data,
  config,
  showLabels = true,
  className,
}: FunnelChartProps) {
  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <RechartsFunnelChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="name" />} />
        <Funnel dataKey="value" data={data} isAnimationActive>
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={entry.fill ?? `var(--color-${entry.name})`}
            />
          ))}
          {showLabels && (
            <LabelList
              position="right"
              fill="hsl(var(--foreground))"
              stroke="none"
              dataKey="name"
              className="text-[12px]"
            />
          )}
        </Funnel>
      </RechartsFunnelChart>
    </ChartContainer>
  );
}

export { FunnelChart };
