import * as React from "react";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
    tone: {
      primary: "text-primary",
      muted: "text-text-tertiary",
      current: "text-current",
      inverse: "text-primary-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "primary",
  },
});

export interface IconSpinnerProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "color">,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

const IconSpinner = React.forwardRef<SVGSVGElement, IconSpinnerProps>(
  ({ className, size, tone, label = "Loading", ...props }, ref) => (
    <Loader2
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size, tone }), className)}
      {...props}
    />
  )
);
IconSpinner.displayName = "IconSpinner";

export { IconSpinner, spinnerVariants };
