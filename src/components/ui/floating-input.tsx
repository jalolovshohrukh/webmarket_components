import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatingInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  helperText?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  showClear?: boolean;
  onClear?: () => void;
  containerClassName?: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    {
      className,
      type = "text",
      label,
      helperText,
      error,
      iconLeft,
      showClear,
      onClear,
      containerClassName,
      id,
      disabled,
      value,
      defaultValue,
      placeholder = " ",
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
        <div className="relative">
          {iconLeft && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-text-tertiary [&_svg]:size-4">
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
            placeholder={placeholder}
            className={cn(
              "peer h-12 w-full rounded-md border bg-background px-3 pt-4 pb-1 text-[14px] leading-5 text-text-primary placeholder:text-transparent",
              "transition-colors focus:outline-none focus-visible:outline-none",
              "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20",
              iconLeft && "pl-9",
              showClear && "pr-9",
              isInvalid &&
                "border-danger focus:border-danger focus:ring-danger/20",
              disabled &&
                "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-100",
              className
            )}
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 origin-left text-[14px] leading-5 text-text-tertiary transition-all",
              "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:text-primary",
              "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-text-secondary",
              iconLeft && "left-9",
              isInvalid && "peer-focus:text-danger text-danger",
              disabled && "text-gray-400"
            )}
          >
            {label}
          </label>
          {showClear && hasValue && !disabled && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear input"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded text-text-tertiary hover:text-text-primary hover:bg-gray-100"
            >
              <X className="size-4" />
            </button>
          )}
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
FloatingInput.displayName = "FloatingInput";

export { FloatingInput };
