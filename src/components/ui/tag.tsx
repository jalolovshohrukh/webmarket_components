import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-full text-[12px] leading-4 font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-text-primary hover:bg-gray-200",
        outline:
          "border border-gray-200 bg-background text-text-primary hover:bg-muted",
        secondary: "bg-secondary text-primary hover:bg-brand-tertiary",
      },
      size: {
        sm: "h-6 px-2.5",
        md: "h-7 px-3",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onRemove">,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void;
  removeLabel?: string;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    { className, variant, size, onRemove, removeLabel = "Remove", children, ...props },
    ref
  ) => (
    <span
      ref={ref}
      className={cn(tagVariants({ variant, size }), className)}
      {...props}
    >
      <span className="truncate">{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={removeLabel}
          className="-mr-1 grid size-4 place-items-center rounded-full text-text-tertiary hover:bg-background/70 hover:text-text-primary"
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  )
);
Tag.displayName = "Tag";

export { Tag, tagVariants };
