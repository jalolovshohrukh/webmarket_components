import * as React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
} as const;

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Numeric rating, 0–max. Default max = 5. */
  value: number;
  max?: number;
  size?: keyof typeof sizeMap;
  /** Show "(123)" review count alongside. */
  count?: number;
  /** Show "4.5" numeric label alongside. */
  showValue?: boolean;
  /** When true, allows clicking to set rating. */
  interactive?: boolean;
  onValueChange?: (value: number) => void;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value,
      max = 5,
      size = "md",
      count,
      showValue = false,
      interactive = false,
      onValueChange,
      className,
      ...props
    },
    ref
  ) => {
    const [hover, setHover] = React.useState<number | null>(null);
    const display = hover ?? value;

    return (
      <div
        ref={ref}
        role={interactive ? "radiogroup" : "img"}
        aria-label={interactive ? "Rate" : `Rated ${value} out of ${max}`}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      >
        <div
          className="inline-flex items-center"
          onMouseLeave={interactive ? () => setHover(null) : undefined}
        >
          {Array.from({ length: max }).map((_, i) => {
            const filled = display >= i + 1;
            const half = !filled && display >= i + 0.5;
            const star = (
              <span
                className={cn(
                  "relative inline-flex",
                  sizeMap[size],
                  filled || half
                    ? "text-warning-500"
                    : "text-gray-300"
                )}
                aria-hidden="true"
              >
                {half ? (
                  <>
                    <Star className={cn(sizeMap[size], "absolute inset-0 fill-current text-gray-300")} />
                    <StarHalf className={cn(sizeMap[size], "absolute inset-0 fill-current text-warning-500")} />
                  </>
                ) : (
                  <Star
                    className={cn(
                      sizeMap[size],
                      filled && "fill-current"
                    )}
                  />
                )}
              </span>
            );
            if (interactive) {
              return (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={value === i + 1}
                  aria-label={`${i + 1} star${i + 1 > 1 ? "s" : ""}`}
                  onMouseEnter={() => setHover(i + 1)}
                  onClick={() => onValueChange?.(i + 1)}
                  className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  {star}
                </button>
              );
            }
            return <React.Fragment key={i}>{star}</React.Fragment>;
          })}
        </div>
        {showValue && (
          <span className="text-[13px] font-medium text-text-primary tabular-nums">
            {value.toFixed(1)}
          </span>
        )}
        {count !== undefined && (
          <span className="text-[12px] text-text-tertiary tabular-nums">
            ({count.toLocaleString()})
          </span>
        )}
      </div>
    );
  }
);
Rating.displayName = "Rating";

export { Rating };
