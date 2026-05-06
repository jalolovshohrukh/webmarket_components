import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

export interface ActiveFilter {
  id: string;
  label: React.ReactNode;
  group?: string;
}

export interface ActiveFiltersBarProps {
  filters: ActiveFilter[];
  onRemove: (id: string) => void;
  onClearAll?: () => void;
  resultsCount?: number;
  className?: string;
}

function ActiveFiltersBar({
  filters,
  onRemove,
  onClearAll,
  resultsCount,
  className,
}: ActiveFiltersBarProps) {
  if (filters.length === 0) return null;
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-muted/40 p-3",
        className
      )}
    >
      {resultsCount !== undefined && (
        <span className="text-[13px] font-medium text-text-primary">
          {resultsCount.toLocaleString()} results
        </span>
      )}
      {filters.map((f) => (
        <Tag
          key={f.id}
          variant="outline"
          onRemove={() => onRemove(f.id)}
          removeLabel={`Remove ${typeof f.label === "string" ? f.label : "filter"}`}
        >
          {f.group && <span className="text-text-tertiary">{f.group}:</span>}{" "}
          {f.label}
        </Tag>
      ))}
      {onClearAll && filters.length > 1 && (
        <Button
          variant="text"
          size="sm"
          onClick={onClearAll}
          className="ml-auto !px-2"
        >
          Clear all
        </Button>
      )}
    </div>
  );
}

export { ActiveFiltersBar };
