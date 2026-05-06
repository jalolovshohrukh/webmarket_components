import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  showClear?: boolean;
  onClear?: () => void;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      helperText,
      error,
      iconLeft,
      iconRight,
      showClear,
      onClear,
      containerClassName,
      id,
      disabled,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId();
    const inputId = id ?? reactId;
    const helperId = `${inputId}-helper`;
    const isInvalid = Boolean(error);
    const hasValue =
      value !== undefined
        ? String(value).length > 0
        : defaultValue !== undefined
          ? String(defaultValue).length > 0
          : false;

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        {label && (
          <Label htmlFor={inputId} className={cn(isInvalid && "text-danger")}>
            {label}
          </Label>
        )}
        <div className="relative flex items-center">
          {iconLeft && (
            <span className="pointer-events-none absolute left-3 flex items-center text-text-tertiary [&_svg]:size-4">
              {iconLeft}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            disabled={disabled}
            aria-invalid={isInvalid || undefined}
            aria-describedby={helperText || error ? helperId : undefined}
            value={value}
            defaultValue={defaultValue}
            className={cn(
              "h-10 w-full rounded-md border bg-background px-3 text-[14px] leading-5 text-text-primary placeholder:text-text-tertiary",
              "transition-colors focus:outline-none focus-visible:outline-none",
              "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20",
              iconLeft && "pl-9",
              (iconRight || showClear) && "pr-9",
              isInvalid &&
                "border-danger focus:border-danger focus:ring-danger/20",
              disabled &&
                "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-100",
              className
            )}
            {...props}
          />
          {showClear && hasValue && !disabled ? (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear input"
              className="absolute right-2 flex h-6 w-6 items-center justify-center rounded text-text-tertiary hover:text-text-primary hover:bg-gray-100"
            >
              <X className="size-4" />
            </button>
          ) : iconRight ? (
            <span className="pointer-events-none absolute right-3 flex items-center text-text-tertiary [&_svg]:size-4">
              {iconRight}
            </span>
          ) : null}
        </div>
        {(error || helperText) && (
          <p
            id={helperId}
            className={cn(
              "text-[12px] leading-4",
              isInvalid ? "text-danger" : "text-text-tertiary"
            )}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
