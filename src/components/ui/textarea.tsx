import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      containerClassName,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId();
    const fieldId = id ?? reactId;
    const helperId = `${fieldId}-helper`;
    const isInvalid = Boolean(error);

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        {label && (
          <Label htmlFor={fieldId} className={cn(isInvalid && "text-danger")}>
            {label}
          </Label>
        )}
        <textarea
          id={fieldId}
          ref={ref}
          disabled={disabled}
          aria-invalid={isInvalid || undefined}
          aria-describedby={helperText || error ? helperId : undefined}
          className={cn(
            "min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-[14px] leading-5 text-text-primary placeholder:text-text-tertiary",
            "transition-colors focus:outline-none focus-visible:outline-none",
            "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20",
            isInvalid &&
              "border-danger focus:border-danger focus:ring-danger/20",
            disabled &&
              "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-100",
            className
          )}
          {...props}
        />
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
Textarea.displayName = "Textarea";

export { Textarea };
