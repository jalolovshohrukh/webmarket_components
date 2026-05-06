import * as React from "react";
import { cn } from "@/lib/utils";

export interface MobileNavItem {
  id: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  href?: string;
  onSelect?: () => void;
  badge?: number | string;
  active?: boolean;
}

export interface MobileNavBarProps
  extends React.HTMLAttributes<HTMLElement> {
  items: MobileNavItem[];
  activeId?: string;
  onItemClick?: (item: MobileNavItem) => void;
  /** Show labels under each icon. Defaults to true. */
  showLabels?: boolean;
  /** Visually float above the page content with rounded corners + shadow. */
  floating?: boolean;
}

/**
 * Bottom tab bar for mobile. Fixed to the bottom of the viewport, respects
 * iOS safe-area-inset-bottom, hides on `lg+` (the desktop sidebar nav takes
 * over there). Drop it once at the root of a page.
 */
const MobileNavBar = React.forwardRef<HTMLElement, MobileNavBarProps>(
  (
    {
      items,
      activeId,
      onItemClick,
      showLabels = true,
      floating = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 lg:hidden",
          floating ? "px-3 pb-3" : "",
          className
        )}
        style={{ paddingBottom: floating ? undefined : "env(safe-area-inset-bottom)" }}
        {...props}
      >
        <ul
          className={cn(
            "grid bg-background",
            floating
              ? "rounded-2xl border border-gray-200 shadow-lg"
              : "border-t border-gray-200"
          )}
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map((item) => {
            const isActive =
              item.active ?? (activeId !== undefined && item.id === activeId);
            const inner = (
              <>
                <span
                  className={cn(
                    "relative grid place-items-center [&_svg]:size-5 transition-colors",
                    isActive ? "text-primary" : "text-text-tertiary"
                  )}
                >
                  {item.icon}
                  {item.badge !== undefined &&
                    item.badge !== 0 &&
                    item.badge !== "" && (
                      <span
                        className={cn(
                          "absolute -right-2 -top-1 grid h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground"
                        )}
                      >
                        {typeof item.badge === "number" && item.badge > 99
                          ? "99+"
                          : item.badge}
                      </span>
                    )}
                </span>
                {showLabels && (
                  <span
                    className={cn(
                      "mt-0.5 truncate text-[10.5px] font-medium leading-tight transition-colors",
                      isActive ? "text-primary" : "text-text-tertiary"
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </>
            );

            const wrapperCls = cn(
              "flex flex-col items-center justify-center gap-0 py-2 min-h-12 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1",
              isActive ? "" : "hover:text-text-primary"
            );

            const onClick = (e: React.MouseEvent) => {
              if (!item.href) e.preventDefault();
              item.onSelect?.();
              onItemClick?.(item);
            };

            return (
              <li key={item.id} className="relative">
                {item.href ? (
                  <a
                    href={item.href}
                    onClick={onClick}
                    aria-label={
                      typeof item.label === "string" ? item.label : undefined
                    }
                    aria-current={isActive ? "page" : undefined}
                    className={wrapperCls}
                  >
                    {inner}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onClick}
                    aria-label={
                      typeof item.label === "string" ? item.label : undefined
                    }
                    aria-current={isActive ? "page" : undefined}
                    className={cn(wrapperCls, "w-full")}
                  >
                    {inner}
                  </button>
                )}
                {isActive && !floating && (
                  <span
                    aria-hidden
                    className="absolute inset-x-4 top-0 h-0.5 rounded-b-full bg-primary"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
);
MobileNavBar.displayName = "MobileNavBar";

export { MobileNavBar };
