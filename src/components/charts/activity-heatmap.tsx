import * as React from "react";
import { cn } from "@/lib/utils";

// GitHub-style 7×N week grid (one cell per day) with month markers.

export interface ActivityHeatmapDay {
  date: string; // ISO yyyy-mm-dd
  value: number;
}

export interface ActivityHeatmapProps {
  /** Days of activity, oldest to newest. */
  days: ActivityHeatmapDay[];
  color?: string;
  cellSize?: number;
  cellGap?: number;
  showMonthLabels?: boolean;
  showWeekdayLabels?: boolean;
  formatTooltip?: (day: ActivityHeatmapDay) => string;
  className?: string;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function ActivityHeatmap({
  days,
  color = "hsl(var(--chart-1))",
  cellSize = 11,
  cellGap = 2,
  showMonthLabels = true,
  showWeekdayLabels = true,
  formatTooltip,
  className,
}: ActivityHeatmapProps) {
  const maxValue = React.useMemo(
    () => Math.max(1, ...days.map((d) => d.value)),
    [days]
  );

  // Group days into weeks. Week column = Sunday's index relative to first Sunday on or before days[0].
  const weeks = React.useMemo(() => {
    const cols: ActivityHeatmapDay[][] = [];
    if (days.length === 0) return cols;
    const first = new Date(days[0].date + "T00:00:00");
    const firstWeekStart = new Date(first);
    firstWeekStart.setDate(first.getDate() - first.getDay());
    const offset = Math.floor(
      (first.getTime() - firstWeekStart.getTime()) / (1000 * 60 * 60 * 24)
    );
    let current: ActivityHeatmapDay[] = Array(offset).fill(null);
    for (const d of days) {
      const date = new Date(d.date + "T00:00:00");
      const dow = date.getDay();
      while (current.length < dow) current.push(null as unknown as ActivityHeatmapDay);
      current.push(d);
      if (current.length === 7) {
        cols.push(current);
        current = [];
      }
    }
    if (current.length > 0) {
      while (current.length < 7) current.push(null as unknown as ActivityHeatmapDay);
      cols.push(current);
    }
    return cols;
  }, [days]);

  const intensity = (v: number) => Math.max(0.08, v / maxValue);

  // Month markers — emit when month changes between adjacent week columns.
  const monthMarkers = React.useMemo(() => {
    const out: { col: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, col) => {
      const firstReal = week.find(Boolean) as ActivityHeatmapDay | undefined;
      if (!firstReal) return;
      const m = new Date(firstReal.date + "T00:00:00").getMonth();
      if (m !== lastMonth) {
        out.push({ col, label: MONTHS[m] });
        lastMonth = m;
      }
    });
    return out;
  }, [weeks]);

  return (
    <div className={cn("inline-flex flex-col gap-1", className)}>
      {showMonthLabels && (
        <div
          className="grid text-[10px] text-text-tertiary"
          style={{
            gridTemplateColumns: `${showWeekdayLabels ? "24px " : ""}repeat(${
              weeks.length
            }, ${cellSize}px)`,
            columnGap: cellGap,
          }}
        >
          {showWeekdayLabels && <div />}
          {weeks.map((_, col) => {
            const marker = monthMarkers.find((mm) => mm.col === col);
            return (
              <div key={col} className="overflow-hidden whitespace-nowrap">
                {marker?.label ?? ""}
              </div>
            );
          })}
        </div>
      )}
      <div className="flex items-start gap-1">
        {showWeekdayLabels && (
          <div
            className="grid text-[10px] text-text-tertiary"
            style={{
              gridTemplateRows: `repeat(7, ${cellSize}px)`,
              rowGap: cellGap,
            }}
          >
            {WEEKDAYS.map((w, i) => (
              <div
                key={w}
                className="leading-none"
                style={{ height: cellSize }}
              >
                {i % 2 === 1 ? w : ""}
              </div>
            ))}
          </div>
        )}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, ${cellSize}px)`,
            gridTemplateRows: `repeat(7, ${cellSize}px)`,
            columnGap: cellGap,
            rowGap: cellGap,
            gridAutoFlow: "column",
          }}
        >
          {weeks.flatMap((week, col) =>
            week.map((d, row) => {
              if (!d) {
                return (
                  <div
                    key={`${col}-${row}`}
                    style={{ width: cellSize, height: cellSize }}
                  />
                );
              }
              const op = intensity(d.value);
              const title = formatTooltip
                ? formatTooltip(d)
                : `${d.date}: ${d.value.toLocaleString()}`;
              return (
                <div
                  key={`${col}-${row}`}
                  title={title}
                  className="rounded-[2px]"
                  style={{
                    width: cellSize,
                    height: cellSize,
                    background: color,
                    opacity: op,
                  }}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export { ActivityHeatmap };
