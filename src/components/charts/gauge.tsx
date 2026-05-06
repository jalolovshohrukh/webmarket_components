import * as React from "react";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

export interface GaugeProps {
  value: number;
  min?: number;
  max?: number;
  label?: React.ReactNode;
  format?: (value: number) => React.ReactNode;
  size?: "sm" | "md" | "lg";
  thresholds?: { stop: number; color: string }[];
  /** Sweep angle. 180 = semi-circle, 270 = three-quarter. */
  sweep?: 180 | 270 | 360;
  className?: string;
}

const sizeMap = {
  sm: "h-24",
  md: "h-32",
  lg: "h-40",
};

function pickColor(
  value: number,
  thresholds: GaugeProps["thresholds"]
): string {
  if (!thresholds || thresholds.length === 0) return "hsl(var(--chart-1))";
  const sorted = [...thresholds].sort((a, b) => a.stop - b.stop);
  for (const t of sorted) if (value <= t.stop) return t.color;
  return sorted[sorted.length - 1].color;
}

function Gauge({
  value,
  min = 0,
  max = 100,
  label,
  format = (v) => `${Math.round(v)}%`,
  size = "md",
  thresholds,
  sweep = 180,
  className,
}: GaugeProps) {
  const clamped = Math.min(max, Math.max(min, value));
  const color = pickColor(clamped, thresholds);

  const startAngle = sweep === 360 ? 90 : sweep === 270 ? 225 : 180;
  const endAngle =
    sweep === 360 ? -270 : sweep === 270 ? -45 : 0;

  return (
    <div
      className={cn("relative w-full", sizeMap[size], className)}
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={min}
      aria-valuemax={max}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius="65%"
          outerRadius="100%"
          data={[{ value: clamped }]}
        >
          <PolarAngleAxis
            type="number"
            domain={[min, max]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: "hsl(var(--muted))" }}
            dataKey="value"
            cornerRadius={6}
            fill={color}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-h3 font-semibold tabular-nums text-text-primary">
          {format(clamped)}
        </div>
        {label && (
          <div className="text-[12px] text-text-tertiary">{label}</div>
        )}
      </div>
    </div>
  );
}

export { Gauge };
