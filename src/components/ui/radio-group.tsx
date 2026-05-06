import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-2", className)}
    {...props}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "aspect-square size-4 shrink-0 rounded-full border border-gray-300 bg-background text-primary",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1",
      "data-[state=checked]:border-primary",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle className="size-2 fill-current text-primary" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export interface RadioFieldProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupItem> {
  label: React.ReactNode;
  description?: React.ReactNode;
  containerClassName?: string;
}

const RadioField = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioFieldProps
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
      <RadioGroupItem ref={ref} id={fieldId} className="mt-0.5" {...props} />
      <div className="flex flex-col">
        <span className="text-[14px] leading-5 text-text-primary">{label}</span>
        {description && (
          <span className="text-[12px] leading-4 text-text-tertiary">
            {description}
          </span>
        )}
      </div>
    </label>
  );
});
RadioField.displayName = "RadioField";

export { RadioGroup, RadioGroupItem, RadioField };
