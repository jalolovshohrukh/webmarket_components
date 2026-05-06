import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-4 shrink-0 rounded-md border border-gray-300 bg-background transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1",
      "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
      "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      {props.checked === "indeterminate" ? (
        <Minus className="size-3" />
      ) : (
        <Check className="size-3" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export interface CheckboxFieldProps
  extends React.ComponentPropsWithoutRef<typeof Checkbox> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  containerClassName?: string;
}

const CheckboxField = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxFieldProps
>(({ label, description, containerClassName, id, ...props }, ref) => {
  const reactId = React.useId();
  const fieldId = id ?? reactId;
  return (
    <label
      htmlFor={fieldId}
      className={cn(
        "flex cursor-pointer items-start gap-2.5 select-none",
        props.disabled && "cursor-not-allowed opacity-60",
        containerClassName
      )}
    >
      <Checkbox ref={ref} id={fieldId} className="mt-0.5" {...props} />
      <div className="flex flex-col">
        {label && (
          <span className="text-[14px] leading-5 text-text-primary">
            {label}
          </span>
        )}
        {description && (
          <span className="text-[12px] leading-4 text-text-tertiary">
            {description}
          </span>
        )}
      </div>
    </label>
  );
});
CheckboxField.displayName = "CheckboxField";

export { Checkbox, CheckboxField };
