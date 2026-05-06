import * as React from "react";
import { ArrowLeftRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export interface CompareBarProps
  extends React.HTMLAttributes<HTMLElement> {
  items: Product[];
  max?: number;
  onRemove: (id: string) => void;
  onCompare?: () => void;
  onClearAll?: () => void;
  /** Position offset when a MobileNavBar is also docked. */
  bottomOffset?: number;
}

/**
 * Sticky bottom tray showing products being compared. Auto-hides if `items`
 * is empty. Pairs with the `onCompare` callback on ProductCard / ProductCardList.
 *
 * Drop one at the root of your catalog page; lives above the MobileNavBar
 * if you set `bottomOffset`.
 */
const CompareBar = React.forwardRef<HTMLElement, CompareBarProps>(
  (
    {
      items,
      max = 4,
      onRemove,
      onCompare,
      onClearAll,
      bottomOffset = 0,
      className,
      ...props
    },
    ref
  ) => {
    if (items.length === 0) return null;
    const overflow = items.length - max;
    const visible = items.slice(0, max);
    return (
      <aside
        ref={ref}
        aria-label="Compare tray"
        className={cn(
          "fixed inset-x-0 z-30 px-3 pb-3 pointer-events-none",
          className
        )}
        style={{ bottom: bottomOffset }}
        {...props}
      >
        <div className="pointer-events-auto mx-auto flex max-w-screen-md items-center gap-2 rounded-2xl border border-gray-100 bg-card p-2 shadow-lg sm:gap-3 sm:p-3">
          <div className="flex flex-1 items-center gap-1.5 overflow-hidden">
            {visible.map((p) => (
              <div
                key={p.id}
                className="group relative size-12 shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-50 sm:size-14"
              >
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => onRemove(p.id)}
                  aria-label={`Remove ${p.title} from compare`}
                  className="absolute right-0.5 top-0.5 grid size-5 place-items-center rounded-full bg-background/90 text-text-secondary opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus-within:opacity-100 max-sm:opacity-100 hover:text-danger"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
            {overflow > 0 && (
              <div className="grid size-12 shrink-0 place-items-center rounded-md border border-dashed border-gray-100 bg-muted/40 text-[12px] font-semibold text-text-tertiary sm:size-14">
                +{overflow}
              </div>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {onClearAll && items.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="hidden sm:inline-flex !px-2"
              >
                Clear
              </Button>
            )}
            <Button
              variant="primary"
              size="sm"
              iconLeft={<ArrowLeftRight />}
              onClick={onCompare}
              disabled={items.length < 2}
            >
              Compare ({items.length})
            </Button>
          </div>
        </div>
      </aside>
    );
  }
);
CompareBar.displayName = "CompareBar";

export { CompareBar };
