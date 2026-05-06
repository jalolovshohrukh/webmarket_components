import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "size"
  > {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: number) => void;
  containerClassName?: string;
}

const sizeClasses = {
  sm: { wrap: "h-8", btn: "size-8 [&_svg]:size-3.5", input: "text-[13px]" },
  md: { wrap: "h-10", btn: "size-10 [&_svg]:size-4", input: "text-[14px]" },
  lg: { wrap: "h-12", btn: "size-12 [&_svg]:size-5", input: "text-[16px]" },
};

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      containerClassName,
      value,
      defaultValue = 0,
      min = -Infinity,
      max = Infinity,
      step = 1,
      size = "md",
      onValueChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<number>(defaultValue);
    const current = isControlled ? value : internal;
    const sz = sizeClasses[size];

    const set = (n: number) => {
      const clamped = Math.min(max, Math.max(min, n));
      if (!isControlled) setInternal(clamped);
      onValueChange?.(clamped);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === "" || raw === "-") {
        if (!isControlled) setInternal(0);
        return;
      }
      const parsed = Number(raw);
      if (!Number.isNaN(parsed)) set(parsed);
    };

    return (
      <div
        className={cn(
          "inline-flex items-stretch rounded-md border border-gray-200 bg-background overflow-hidden",
          sz.wrap,
          disabled && "opacity-60",
          containerClassName
        )}
      >
        <button
          type="button"
          aria-label="Decrease"
          disabled={disabled || current <= min}
          onClick={() => set(current - step)}
          className={cn(
            "grid place-items-center text-text-secondary hover:bg-muted hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40",
            sz.btn
          )}
        >
          <Minus />
        </button>
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          value={current}
          onChange={handleInput}
          disabled={disabled}
          className={cn(
            "w-12 text-center bg-transparent text-text-primary tabular-nums focus:outline-none border-x border-gray-200",
            sz.input,
            className
          )}
          {...props}
        />
        <button
          type="button"
          aria-label="Increase"
          disabled={disabled || current >= max}
          onClick={() => set(current + step)}
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
NumberInput.displayName = "NumberInput";

export { NumberInput };
