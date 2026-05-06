import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Field label rendered above the control. */
  label?: React.ReactNode;
  /** Helper text below the control (also reserved for error). */
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  /** Wrap a single form control. The wrapper auto-wires htmlFor / aria-describedby. */
  children: React.ReactElement<{
    id?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    required?: boolean;
  }>;
  /** Optional id; auto-generated if omitted. */
  id?: string;
  /** Right-aligned hint to the right of the label (e.g., "Optional", "max 280"). */
  labelExtra?: React.ReactNode;
}

/**
 * Generic field wrapper for any form control. Wires the label, helper text,
 * error message, and ARIA attributes into a single composition so consumers
 * stop hand-writing them.
 *
 *   <FormField label="Email" error={errors.email} required>
 *     <Input type="email" />
 *   </FormField>
 *
 * Works with any control that accepts `id`, `aria-describedby`, `aria-invalid`,
 * `required` — Input, Textarea, FloatingInput, native <input>, etc.
 */
const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      helperText,
      error,
      required,
      children,
      id,
      labelExtra,
      className,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId();
    const fieldId = children.props.id ?? id ?? reactId;
    const helperId = `${fieldId}-helper`;
    const isInvalid = Boolean(error);

    const child = React.cloneElement(children, {
      id: fieldId,
      "aria-describedby": error || helperText ? helperId : undefined,
      "aria-invalid": isInvalid || undefined,
      required: required ?? children.props.required,
    });

    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
        {(label || labelExtra) && (
          <div className="flex items-baseline justify-between gap-2">
            {label && (
              <Label
                htmlFor={fieldId}
                className={cn(isInvalid && "text-danger")}
              >
                {label}
                {required && (
                  <span aria-hidden className="ml-0.5 text-danger">
                    *
                  </span>
                )}
              </Label>
            )}
            {labelExtra && (
              <span className="text-[11px] text-text-tertiary">
                {labelExtra}
              </span>
            )}
          </div>
        )}
        {child}
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
FormField.displayName = "FormField";

export { FormField };
