import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleGroupVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      pills: "gap-1.5 flex-wrap",
      segmented: "rounded-md border border-gray-200 bg-background p-0.5 gap-0",
    },
  },
  defaultVariants: { variant: "pills" },
});

const toggleItemVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
  {
    variants: {
      variant: {
        pills:
          "rounded-full border border-gray-200 px-3.5 h-9 text-[13px] text-text-secondary hover:bg-muted hover:text-text-primary data-[state=on]:bg-secondary data-[state=on]:border-primary data-[state=on]:text-primary",
        segmented:
          "rounded-[5px] px-3 h-8 text-[13px] text-text-secondary hover:text-text-primary data-[state=on]:bg-muted data-[state=on]:text-text-primary",
      },
      size: {
        sm: "h-7 text-[12px] px-3",
        md: "",
        lg: "h-10 text-[14px] px-4",
      },
    },
    defaultVariants: { variant: "pills", size: "md" },
  }
);

type ToggleGroupContextValue = VariantProps<typeof toggleItemVariants>;
const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({});

type ToggleGroupProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Root
> &
  VariantProps<typeof toggleGroupVariants> &
  VariantProps<typeof toggleItemVariants>;

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(toggleGroupVariants({ variant }), className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleItemVariants>
>(({ className, variant, size, children, ...props }, ref) => {
  const ctx = React.useContext(ToggleGroupContext);
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleItemVariants({
          variant: variant ?? ctx.variant,
          size: size ?? ctx.size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
