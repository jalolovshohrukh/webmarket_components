import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export type Period = "day" | "week" | "month" | "quarter" | "year";

export interface PeriodToggleProps {
  value: Period;
  onValueChange: (value: Period) => void;
  options?: Period[];
  size?: "sm" | "md";
  className?: string;
}

const labels: Record<Period, string> = {
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year",
};

function PeriodToggle({
  value,
  onValueChange,
  options = ["day", "week", "month", "quarter", "year"],
  size = "sm",
  className,
}: PeriodToggleProps) {
  return (
    <ToggleGroup
      type="single"
      variant="segmented"
      size={size}
      value={value}
      onValueChange={(v: string) => v && onValueChange(v as Period)}
      className={cn(className)}
      aria-label="Period"
    >
      {options.map((p) => (
        <ToggleGroupItem key={p} value={p}>
          {labels[p]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export { PeriodToggle };
