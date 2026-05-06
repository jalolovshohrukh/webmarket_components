import { LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type ViewMode = "grid" | "list";

export interface ViewToggleProps {
  value: ViewMode;
  onValueChange: (value: ViewMode) => void;
  className?: string;
}

function ViewToggle({ value, onValueChange, className }: ViewToggleProps) {
  return (
    <ToggleGroup
      type="single"
      variant="segmented"
      value={value}
      onValueChange={(v: string) => v && onValueChange(v as ViewMode)}
      className={className}
      aria-label="View mode"
    >
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <LayoutGrid />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <List />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export { ViewToggle };
