import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=unchecked]:bg-gray-200 data-[state=checked]:bg-primary",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block size-5 rounded-full bg-background shadow-sm ring-0 transition-transform",
        "data-[state=unchecked]:translate-x-0.5 data-[state=checked]:translate-x-[1.375rem]"
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export interface SwitchFieldProps
  extends React.ComponentPropsWithoutRef<typeof Switch> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  containerClassName?: string;
}

const SwitchField = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchFieldProps
>(({ label, description, containerClassName, id, ...props }, ref) => {
  const reactId = React.useId();
  const fieldId = id ?? reactId;
  return (
    <label
      htmlFor={fieldId}
      className={cn(
        "flex cursor-pointer items-start justify-between gap-4 select-none",
        props.disabled && "cursor-not-allowed opacity-60",
        containerClassName
      )}
    >
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
      <Switch ref={ref} id={fieldId} {...props} />
    </label>
  );
});
SwitchField.displayName = "SwitchField";

export { Switch, SwitchField };
