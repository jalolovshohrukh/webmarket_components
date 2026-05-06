import * as React from "react";
import { cn } from "@/lib/utils";

// Hand-rolled SVG-style grid heatmap (CSS grid actually). Recharts has no
// first-class heatmap; doing it ourselves keeps it themeable with our tokens
// and small.

export interface HeatmapDatum {
  x: string | number;
  y: string | number;
  value: number;
}

export interface HeatmapProps {
  data: HeatmapDatum[];
  /** Explicit X order. If omitted, derived from data in first-seen order. */
  xLabels?: Array<string | number>;
  /** Explicit Y order. If omitted, derived from data in first-seen order. */
  yLabels?: Array<string | number>;
  /** Min/max range for color scaling. If omitted, auto-derived. */
  range?: [number, number];
  /** Cell color at intensity 1. Defaults to brand orange. */
  color?: string;
  cellSize?: number;
  cellGap?: number;
  formatValue?: (v: number) => string;
  formatCell?: (d: HeatmapDatum) => string;
  className?: string;
}

function Heatmap({
  data,
  xLabels,
  yLabels,
  range,
  color = "hsl(var(--chart-1))",
  cellSize = 28,
  cellGap = 2,
  formatValue = (v) => v.toLocaleString(),
  formatCell,
  className,
}: HeatmapProps) {
  const xs = React.useMemo(
    () => xLabels ?? Array.from(new Set(data.map((d) => d.x))),
    [data, xLabels]
  );
  const ys = React.useMemo(
    () => yLabels ?? Array.from(new Set(data.map((d) => d.y))),
    [data, yLabels]
  );

  const lookup = React.useMemo(() => {
    const m = new Map<string, HeatmapDatum>();
    for (const d of data) m.set(`${d.x}|${d.y}`, d);
    return m;
  }, [data]);

  const [lo, hi] = React.useMemo(() => {
    if (range) return range;
    const vals = data.map((d) => d.value);
    return [Math.min(...vals, 0), Math.max(...vals, 0)] as [number, number];
  }, [data, range]);

  const intensity = (v: number) => {
    if (hi === lo) return 0.15;
    return Math.max(0.06, (v - lo) / (hi - lo));
  };

  return (
    <div className={cn("inline-block", className)}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `auto repeat(${xs.length}, ${cellSize}px)`,
          rowGap: cellGap,
          columnGap: cellGap,
        }}
      >
        <div />
        {xs.map((x) => (
          <div
            key={String(x)}
            className="text-center text-[10px] text-text-tertiary"
          >
            {String(x)}
          </div>
        ))}
        {ys.map((y) => (
          <React.Fragment key={String(y)}>
            <div className="pr-2 text-right text-[11px] text-text-tertiary">
              {String(y)}
            </div>
            {xs.map((x) => {
              const d = lookup.get(`${x}|${y}`);
              const op = d ? intensity(d.value) : 0.04;
              const title = d
                ? formatCell
                  ? formatCell(d)
                  : `${y} · ${x}: ${formatValue(d.value)}`
                : `${y} · ${x}: —`;
              return (
                <div
                  key={`${x}-${y}`}
                  title={title}
                  className="rounded-[3px] transition-colors hover:ring-1 hover:ring-primary"
                  style={{
                    width: cellSize,
                    height: cellSize,
                    background: color,
                    opacity: op,
                  }}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export { Heatmap };
