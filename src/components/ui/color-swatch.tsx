import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ColorOption {
  value: string;
  label: string;
  hex: string;
  disabled?: boolean;
}

export interface ColorSwatchProps extends React.HTMLAttributes<HTMLButtonElement> {
  hex: string;
  selected?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const swatchSizes = {
  sm: "size-6",
  md: "size-8",
  lg: "size-10",
};

const ColorSwatch = React.forwardRef<HTMLButtonElement, ColorSwatchProps>(
  (
    { hex, selected, disabled, size = "md", label, className, ...props },
    ref
  ) => {
    const isLight = isLightColor(hex);
    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={selected}
        aria-label={label}
        title={label}
        disabled={disabled}
        className={cn(
          "relative grid place-items-center rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
          swatchSizes[size],
          selected
            ? "ring-2 ring-primary ring-offset-2 border-transparent"
            : "border-gray-200 hover:border-gray-300",
          disabled &&
            "cursor-not-allowed opacity-50 after:absolute after:inset-1 after:h-px after:w-full after:rotate-45 after:bg-text-tertiary after:content-['']",
          className
        )}
        style={{ backgroundColor: hex }}
        {...props}
      >
        {selected && (
          <Check
            className={cn(
              size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4",
              isLight ? "text-text-primary" : "text-white"
            )}
          />
        )}
      </button>
    );
  }
);
ColorSwatch.displayName = "ColorSwatch";

export interface ColorSwatchGroupProps {
  options: ColorOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ColorSwatchGroup = React.forwardRef<HTMLDivElement, ColorSwatchGroupProps>(
  (
    { options, value, defaultValue, onValueChange, size = "md", className },
    ref
  ) => {
    const [internal, setInternal] = React.useState<string | undefined>(
      defaultValue
    );
    const current = value ?? internal;

    const select = (next: string) => {
      if (value === undefined) setInternal(next);
      onValueChange?.(next);
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn("flex flex-wrap items-center gap-2", className)}
      >
        {options.map((opt) => (
          <ColorSwatch
            key={opt.value}
            hex={opt.hex}
            label={opt.label}
            size={size}
            selected={opt.value === current}
            disabled={opt.disabled}
            onClick={() => !opt.disabled && select(opt.value)}
          />
        ))}
      </div>
    );
  }
);
ColorSwatchGroup.displayName = "ColorSwatchGroup";

function isLightColor(hex: string) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return false;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.7;
}

export { ColorSwatch, ColorSwatchGroup };
