import * as React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  removeAtMin?: boolean;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { wrap: "h-8", btn: "size-8 [&_svg]:size-3.5", display: "w-7 text-[13px]" },
  md: { wrap: "h-10", btn: "size-10 [&_svg]:size-4", display: "w-9 text-[14px]" },
};

const QuantityStepper = React.forwardRef<HTMLDivElement, QuantityStepperProps>(
  (
    {
      value,
      onChange,
      min = 1,
      max = 99,
      size = "md",
      removeAtMin,
      onRemove,
      disabled,
      className,
    },
    ref
  ) => {
    const sz = sizeMap[size];
    const decAction = () => {
      if (value <= min) {
        if (removeAtMin && onRemove) onRemove();
        return;
      }
      onChange(value - 1);
    };
    const showRemove = removeAtMin && value <= min;

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-stretch rounded-md border border-gray-200 bg-background",
          sz.wrap,
          disabled && "opacity-60",
          className
        )}
      >
        <button
          type="button"
          aria-label={showRemove ? "Remove" : "Decrease quantity"}
          disabled={disabled}
          onClick={decAction}
          className={cn(
            "grid place-items-center text-text-secondary hover:bg-muted hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40",
            showRemove && "text-danger hover:text-danger",
            sz.btn
          )}
        >
          {showRemove ? <Trash2 /> : <Minus />}
        </button>
        <span
          aria-live="polite"
          className={cn(
            "grid place-items-center font-medium tabular-nums text-text-primary",
            sz.display
          )}
        >
          {value}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          disabled={disabled || value >= max}
          onClick={() => onChange(value + 1)}
          className={cn(
            "grid place-items-center text-text-secondary hover:bg-muted hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40",
            sz.btn
          )}
        >
          <Plus />
        </button>
      </div>
    );
  }
);
QuantityStepper.displayName = "QuantityStepper";

export { QuantityStepper };
