import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface MobileFilterTriggerProps {
  /** Number to show in the badge (e.g., active filter count). */
  count?: number;
  triggerLabel?: string;
  sheetTitle?: React.ReactNode;
  sheetSide?: "bottom" | "left" | "right";
  /** Filter UI — typically your `<FilterSidebar />`. */
  children: React.ReactNode;
  /** Footer buttons inside the sheet (Apply / Reset). */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Bottom sticky button that opens the catalog filter sheet on mobile.
 * Hides at `lg` and up — desktop uses an inline FilterSidebar instead.
 *
 * Pairs with the existing FilterSidebar:
 *
 *   <div className="lg:hidden"><MobileFilterTrigger count={5}>...</MobileFilterTrigger></div>
 *   <div className="hidden lg:block"><FilterSidebar ... /></div>
 */
function MobileFilterTrigger({
  count,
  triggerLabel = "Filters",
  sheetTitle = "Filters",
  sheetSide = "bottom",
  children,
  footer,
  className,
}: MobileFilterTriggerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="primary"
          iconLeft={<SlidersHorizontal />}
          className={cn(
            "fixed inset-x-1/2 bottom-4 z-30 -translate-x-1/2 shadow-lg lg:hidden",
            className
          )}
        >
          {triggerLabel}
          {count !== undefined && count > 0 && (
            <span className="ml-1 grid h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-foreground/20 px-1.5 text-[11px] font-semibold tabular-nums">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={sheetSide}
        className={cn(
          sheetSide === "bottom" &&
            "max-h-[85vh] rounded-t-2xl !p-0",
          sheetSide !== "bottom" && "w-full sm:max-w-sm !p-0"
        )}
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-gray-100 p-4">
            <SheetTitle>
              {sheetTitle}
              {count !== undefined && count > 0 && (
                <span className="ml-2 text-[12px] font-normal text-text-tertiary">
                  · {count} active
                </span>
              )}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
          {footer && (
            <div className="border-t border-gray-100 bg-background p-3">
              {footer}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { MobileFilterTrigger };
