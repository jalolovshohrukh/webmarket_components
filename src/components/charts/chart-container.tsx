import * as React from "react";
import * as Recharts from "recharts";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// ChartConfig — maps a series dataKey to a label, color, and optional icon.
//
// Pass it to <ChartContainer config={...}> and the container injects
//   --color-<dataKey>: <hsl>
// CSS vars onto a wrapper div so charts can reference
//   stroke="var(--color-users)"
// without hardcoded hex. Themed light + dark via the existing --chart-1..8
// CSS vars.
// ---------------------------------------------------------------------------

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>;

type ChartContextValue = { config: ChartConfig };

const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used within <ChartContainer>");
  return ctx;
}

export interface ChartContainerProps
  extends React.ComponentProps<"div"> {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof Recharts.ResponsiveContainer
  >["children"];
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, children, config, ...props }, ref) => {
    const reactId = React.useId();
    const chartId = `chart-${(id || reactId).replace(/:/g, "")}`;

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          ref={ref}
          data-chart={chartId}
          className={cn(
            "flex aspect-video justify-center text-[12px]",
            "[&_.recharts-cartesian-axis-tick_text]:fill-text-tertiary",
            "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border",
            "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
            "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
            "[&_.recharts-layer]:outline-none",
            "[&_.recharts-polar-grid_line]:stroke-border",
            "[&_.recharts-radial-bar-background-sector]:fill-muted",
            "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
            "[&_.recharts-reference-line_line]:stroke-border",
            "[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
            "[&_.recharts-sector]:outline-none",
            "[&_.recharts-surface]:outline-none",
            className
          )}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          <Recharts.ResponsiveContainer>{children}</Recharts.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  }
);
ChartContainer.displayName = "ChartContainer";

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorEntries = Object.entries(config).filter(
    ([, v]) => v.color || ("theme" in v && v.theme)
  );
  if (colorEntries.length === 0) return null;
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorEntries
  .map(([key, v]) => {
    const color =
      "theme" in v && v.theme
        ? v.theme[theme as keyof typeof THEMES]
        : v.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// ChartTooltip — direct re-export so callers can write
//   <ChartTooltip content={<ChartTooltipContent ...>} />
// keeping API parity with shadcn's chart.
// ---------------------------------------------------------------------------

const ChartTooltip = Recharts.Tooltip;

interface TooltipPayloadItem {
  dataKey?: string | number;
  name?: string | number;
  value?: number | string;
  payload?: Record<string, unknown>;
  color?: string;
  fill?: string;
  [k: string]: unknown;
}

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: React.ReactNode;
  className?: string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
  formatter?: (
    value: number | string,
    name: string,
    item: TooltipPayloadItem,
    index: number,
    payload: TooltipPayloadItem["payload"]
  ) => React.ReactNode;
  labelFormatter?: (label: React.ReactNode, payload: TooltipPayloadItem[]) => React.ReactNode;
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(
  (
    {
      active,
      payload,
      className,
      label,
      hideLabel,
      hideIndicator,
      indicator = "dot",
      nameKey,
      labelKey,
      formatter,
      labelFormatter,
    },
    ref
  ) => {
    const { config } = useChart();
    if (!active || !payload || payload.length === 0) return null;

    const tooltipLabel = !hideLabel ? (
      <div className="font-medium text-text-primary">
        {labelFormatter
          ? labelFormatter(label, payload)
          : (() => {
              if (labelKey && payload[0]?.payload) {
                const v = (payload[0].payload as Record<string, unknown>)[
                  labelKey
                ];
                return v as React.ReactNode;
              }
              const key = String(payload[0]?.dataKey ?? "");
              return config[key]?.label ?? label;
            })()}
      </div>
    ) : null;

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-[12px] shadow-md",
          className
        )}
      >
        {tooltipLabel}
        <div className="grid gap-1.5">
          {payload.map((item, i) => {
            const key = String(nameKey ?? item.name ?? item.dataKey ?? "value");
            const itemConfig = config[key] ?? config[String(item.dataKey ?? "")];
            const color =
              (item.payload as { fill?: string })?.fill ||
              item.color ||
              `var(--color-${key})`;
            const Icon = itemConfig?.icon;
            return (
              <div
                key={String(item.dataKey ?? item.name ?? i)}
                className="flex w-full flex-wrap items-center gap-2 [&>svg]:size-2.5 [&>svg]:text-text-tertiary"
              >
                {formatter && item.value !== undefined && item.name ? (
                  formatter(item.value, String(item.name), item, i, item.payload)
                ) : (
                  <>
                    {Icon ? (
                      <Icon className="size-2.5" />
                    ) : !hideIndicator ? (
                      <span
                        className={cn(
                          "shrink-0 rounded-[2px]",
                          indicator === "dot" && "size-2.5 rounded-full",
                          indicator === "line" && "h-3 w-1",
                          indicator === "dashed" &&
                            "h-0 w-3 border-t-2 border-dashed"
                        )}
                        style={{
                          background:
                            indicator !== "dashed" ? color : "transparent",
                          borderColor: color,
                        }}
                      />
                    ) : null}
                    <div className="flex flex-1 items-center justify-between gap-2 leading-none">
                      <span className="text-text-secondary">
                        {itemConfig?.label ?? item.name ?? key}
                      </span>
                      {item.value !== undefined && (
                        <span className="font-mono font-medium tabular-nums text-text-primary">
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : item.value}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

// ---------------------------------------------------------------------------
// ChartLegend
// ---------------------------------------------------------------------------

const ChartLegend = Recharts.Legend;

export interface LegendPayloadItem {
  value?: string;
  type?: string;
  color?: string;
  dataKey?: string | number;
}

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    payload?: LegendPayloadItem[];
    verticalAlign?: "top" | "bottom";
    hideIcon?: boolean;
    nameKey?: string;
  }
>(({ className, payload, verticalAlign = "bottom", hideIcon, nameKey }, ref) => {
  const { config } = useChart();
  if (!payload || payload.length === 0) return null;
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4 text-[12px]",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item, i) => {
        const key = String(nameKey ?? item.dataKey ?? item.value ?? "value");
        const itemConfig = config[key];
        const Icon = itemConfig?.icon;
        return (
          <div
            key={`${item.value ?? key}-${i}`}
            className="flex items-center gap-1.5"
          >
            {!hideIcon &&
              (Icon ? (
                <Icon className="size-2.5" />
              ) : (
                <span
                  className="size-2.5 rounded-[2px]"
                  style={{ background: item.color }}
                />
              ))}
            <span className="text-text-secondary">
              {itemConfig?.label ?? item.value ?? key}
            </span>
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegendContent";

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  useChart,
};
