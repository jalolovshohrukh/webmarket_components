import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/charts/chart-container";
import { cn } from "@/lib/utils";

export interface RadialDatum {
  name: string;
  value: number;
  fill?: string;
}

export interface RadialChartProps {
  data: RadialDatum[];
  config: ChartConfig;
  max?: number;
  startAngle?: number;
  endAngle?: number;
  innerRadius?: string | number;
  outerRadius?: string | number;
  className?: string;
}

function RadialChart({
  data,
  config,
  max = 100,
  startAngle = 90,
  endAngle = -270,
  innerRadius = "30%",
  outerRadius = "100%",
  className,
}: RadialChartProps) {
  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <RadialBarChart
        data={data}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, max]}
          angleAxisId={0}
          tick={false}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="name" />} />
        <RadialBar
          dataKey="value"
          background
          cornerRadius={6}
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={entry.fill ?? `var(--color-${entry.name})`}
            />
          ))}
        </RadialBar>
      </RadialBarChart>
    </ChartContainer>
  );
}

export { RadialChart };
