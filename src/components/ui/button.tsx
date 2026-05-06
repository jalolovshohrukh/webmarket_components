import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium whitespace-nowrap transition-colors select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-100 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-brand-200 active:bg-brand-700 disabled:bg-gray-200 disabled:text-gray-400",
        primaryOutlined:
          "bg-transparent text-primary border border-primary hover:bg-secondary active:bg-brand-tertiary disabled:border-gray-200 disabled:text-gray-400",
        secondary:
          "bg-secondary text-primary hover:bg-brand-tertiary active:bg-brand-100 disabled:bg-gray-100 disabled:text-gray-400",
        secondaryOutlined:
          "bg-transparent text-primary border border-brand-tertiary hover:bg-secondary active:bg-brand-tertiary disabled:border-gray-200 disabled:text-gray-400",
        text: "bg-transparent text-primary hover:text-brand-700 active:text-brand-700 disabled:text-gray-400 px-2",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:bg-gray-200 disabled:text-gray-400",
        ghost:
          "bg-transparent text-foreground hover:bg-muted disabled:text-gray-400",
      },
      size: {
        lg: "h-12 px-6 text-[16px] [&_svg]:size-5",
        md: "h-10 px-5 text-[14px] [&_svg]:size-4",
        sm: "h-8 px-4 text-[12px] [&_svg]:size-4",
        iconLg: "h-12 w-12 p-0 [&_svg]:size-5",
        iconMd: "h-10 w-10 p-0 [&_svg]:size-4",
        iconSm: "h-8 w-8 p-0 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      iconLeft,
      iconRight,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" aria-hidden="true" />
        ) : (
          <>
            {iconLeft}
            {children}
            {iconRight}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
