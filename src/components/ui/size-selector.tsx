import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export interface SizeOption {
  value: string;
  label: string;
  disabled?: boolean;
  outOfStock?: boolean;
}

export interface SizeSelectorProps {
  options: SizeOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SizeSelector = React.forwardRef<HTMLDivElement, SizeSelectorProps>(
  (
    { options, value, defaultValue, onValueChange, className, size = "md" },
    ref
  ) => (
    <ToggleGroup
      ref={ref}
      type="single"
      variant="pills"
      size={size}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(v: string) => v && onValueChange?.(v)}
      className={className}
    >
      {options.map((opt) => (
        <ToggleGroupItem
          key={opt.value}
          value={opt.value}
          disabled={opt.disabled || opt.outOfStock}
          className={cn(
            "min-w-[3rem] tabular-nums",
            opt.outOfStock &&
              "relative line-through decoration-text-tertiary text-text-tertiary"
          )}
        >
          {opt.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
);
SizeSelector.displayName = "SizeSelector";

export { SizeSelector };
