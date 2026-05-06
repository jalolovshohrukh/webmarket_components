import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-[12px] leading-4 font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-primary",
        outline: "border border-gray-200 text-text-primary",
        success: "bg-success-50 text-success-700",
        danger: "bg-danger-50 text-danger-700",
        warning: "bg-warning-50 text-warning-700",
        info: "bg-info-50 text-info-700",
        violet: "bg-violet-50 text-violet-700",
        muted: "bg-gray-100 text-text-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
