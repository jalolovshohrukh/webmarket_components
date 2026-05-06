import * as React from "react";
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

export interface SparklineProps {
  data: number[] | Array<Record<string, unknown>>;
  dataKey?: string;
  variant?: "line" | "area";
  color?: string;
  height?: number;
  smooth?: boolean;
  className?: string;
}

function Sparkline({
  data,
  dataKey = "value",
  variant = "area",
  color = "hsl(var(--chart-1))",
  height = 32,
  smooth = true,
  className,
}: SparklineProps) {
  const series = React.useMemo(() => {
    if (data.length === 0) return [];
    if (typeof data[0] === "number") {
      return (data as number[]).map((v, i) => ({ i, [dataKey]: v }));
    }
    return data as Array<Record<string, unknown>>;
  }, [data, dataKey]);

  const id = React.useId().replace(/:/g, "");
  const gradId = `sparkline-grad-${id}`;

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {variant === "area" ? (
          <AreaChart data={series} margin={{ top: 1, right: 0, bottom: 1, left: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <Area
              type={smooth ? "monotone" : "linear"}
              dataKey={dataKey}
              stroke={color}
              strokeWidth={1.5}
              fill={`url(#${gradId})`}
              isAnimationActive={false}
              dot={false}
            />
          </AreaChart>
        ) : (
          <LineChart data={series} margin={{ top: 1, right: 0, bottom: 1, left: 0 }}>
            <Line
              type={smooth ? "monotone" : "linear"}
              dataKey={dataKey}
              stroke={color}
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export { Sparkline };
