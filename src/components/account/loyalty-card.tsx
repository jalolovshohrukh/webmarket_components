import * as React from "react";
import { Award, Gift } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface LoyaltyCardProps {
  tier: React.ReactNode;
  points: number;
  pointsToNext?: number;
  nextTier?: React.ReactNode;
  perks?: React.ReactNode[];
  onRedeem?: () => void;
  className?: string;
}

function LoyaltyCard({
  tier,
  points,
  pointsToNext,
  nextTier,
  perks,
  onRedeem,
  className,
}: LoyaltyCardProps) {
  const total = pointsToNext ? points + pointsToNext : points;
  const pct = pointsToNext ? (points / total) * 100 : 100;

  return (
    <Card
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-primary via-brand-200 to-brand-100 p-5 text-primary-foreground",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] uppercase tracking-wider opacity-90">
            <Award className="size-3.5" />
            Webmarket rewards
          </div>
          <div className="mt-1 text-h3 font-semibold">{tier}</div>
        </div>
        <Badge
          variant="secondary"
          className="bg-background/90 text-primary shadow-sm"
        >
          Member
        </Badge>
      </div>
      <div className="mt-5">
        <div className="flex items-baseline gap-1">
          <span className="text-h2 font-semibold tabular-nums">
            {points.toLocaleString()}
          </span>
          <span className="text-[13px] opacity-90">points</span>
        </div>
        {pointsToNext && nextTier && (
          <>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-background/30">
              <div
                className="h-full bg-background"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-1.5 text-[12px] opacity-90">
              {pointsToNext.toLocaleString()} more points to {nextTier}
            </p>
          </>
        )}
      </div>
      {perks && perks.length > 0 && (
        <ul className="mt-4 space-y-1 text-[13px]">
          {perks.map((perk, i) => (
            <li key={i} className="flex items-center gap-2">
              <Gift className="size-4 shrink-0 opacity-90" />
              {perk}
            </li>
          ))}
        </ul>
      )}
      {onRedeem && (
        <Button
          variant="secondary"
          className="mt-4 w-full bg-background text-primary hover:bg-background/90"
          onClick={onRedeem}
        >
          Redeem points
        </Button>
      )}
    </Card>
  );
}

export { LoyaltyCard };
