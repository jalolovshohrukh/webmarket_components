import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkline } from "@/components/charts/sparkline";
import { cn } from "@/lib/utils";

export interface LeaderboardEntry {
  id: string;
  name: React.ReactNode;
  subtitle?: React.ReactNode;
  avatarUrl?: string;
  value: React.ReactNode;
  delta?: number;
  trend?: number[];
  href?: string;
}

export interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  title?: React.ReactNode;
  showSparkline?: boolean;
  showRank?: boolean;
  invertDelta?: boolean;
  className?: string;
}

function deltaTone(delta: number, invert: boolean) {
  if (delta === 0) return "text-text-tertiary";
  const positive = invert ? delta < 0 : delta > 0;
  return positive ? "text-success-700" : "text-danger-700";
}

function LeaderboardTable({
  entries,
  title,
  showSparkline = true,
  showRank = true,
  invertDelta = false,
  className,
}: LeaderboardTableProps) {
  return (
    <div className={cn("rounded-xl border border-gray-200 bg-card", className)}>
      {title && (
        <header className="border-b border-gray-200 px-4 py-3">
          <h3 className="text-[14px] font-semibold text-text-primary">
            {title}
          </h3>
        </header>
      )}
      <ul className="divide-y divide-gray-200">
        {entries.map((e, i) => {
          const initials =
            typeof e.name === "string"
              ? e.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()
              : "??";
          const Wrapper = e.href ? "a" : "div";
          const wrapperProps = e.href ? { href: e.href } : {};
          return (
            <li key={e.id}>
              <Wrapper
                {...wrapperProps}
                className={cn(
                  "flex items-center gap-3 px-4 py-3",
                  e.href && "hover:bg-muted/50 transition-colors"
                )}
              >
                {showRank && (
                  <span className="w-5 shrink-0 text-right text-[12px] tabular-nums text-text-tertiary">
                    {i + 1}
                  </span>
                )}
                <Avatar size="sm">
                  {e.avatarUrl && (
                    <AvatarImage src={e.avatarUrl} alt="" />
                  )}
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium text-text-primary">
                    {e.name}
                  </div>
                  {e.subtitle && (
                    <div className="truncate text-[12px] text-text-tertiary">
                      {e.subtitle}
                    </div>
                  )}
                </div>
                {showSparkline && e.trend && e.trend.length > 1 && (
                  <div className="hidden w-24 sm:block">
                    <Sparkline
                      data={e.trend}
                      height={24}
                      color="hsl(var(--chart-2))"
                    />
                  </div>
                )}
                <div className="text-right">
                  <div className="text-[13px] font-semibold tabular-nums text-text-primary">
                    {e.value}
                  </div>
                  {e.delta !== undefined && (
                    <div
                      className={cn(
                        "inline-flex items-center gap-0.5 text-[11px] tabular-nums",
                        deltaTone(e.delta, invertDelta)
                      )}
                    >
                      {e.delta > 0 ? (
                        <TrendingUp className="size-3" />
                      ) : e.delta < 0 ? (
                        <TrendingDown className="size-3" />
                      ) : null}
                      {e.delta > 0 ? "+" : ""}
                      {e.delta}%
                    </div>
                  )}
                </div>
              </Wrapper>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { LeaderboardTable };
