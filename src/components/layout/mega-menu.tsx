import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type MegaMenuItem = {
  label: string;
  href?: string;
  count?: number;
};

export type MegaMenuColumn = {
  heading?: string;
  items: MegaMenuItem[];
};

export type MegaMenuCategory = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  /** Featured image / banner shown next to the columns. */
  featured?: { imageUrl: string; title: string; href?: string };
  columns?: MegaMenuColumn[];
};

export interface MegaMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: MegaMenuCategory[];
  defaultCategoryId?: string;
}

const MegaMenu = React.forwardRef<HTMLDivElement, MegaMenuProps>(
  ({ categories, defaultCategoryId, className, ...props }, ref) => {
    const [activeId, setActiveId] = React.useState<string>(
      defaultCategoryId ?? categories[0]?.id ?? ""
    );
    const active = categories.find((c) => c.id === activeId);

    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 lg:grid-cols-[220px_1fr] overflow-hidden rounded-xl border border-gray-200 bg-card shadow-md",
          className
        )}
        {...props}
      >
        <ul
          role="tablist"
          aria-orientation="vertical"
          className="border-b border-gray-200 lg:border-b-0 lg:border-r lg:max-h-[480px] lg:overflow-y-auto"
        >
          {categories.map((cat) => {
            const isActive = cat.id === activeId;
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onMouseEnter={() => setActiveId(cat.id)}
                  onFocus={() => setActiveId(cat.id)}
                  className={cn(
                    "flex w-full items-center gap-2 px-4 py-2.5 text-left text-[14px] font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
                  )}
                >
                  {cat.icon && (
                    <span className="[&_svg]:size-4 shrink-0">{cat.icon}</span>
                  )}
                  <span className="flex-1 truncate">{cat.label}</span>
                  <ChevronRight className="size-3.5 opacity-50" />
                </button>
              </li>
            );
          })}
        </ul>

        <div role="tabpanel" className="p-5 min-h-[260px]">
          {active && (
            <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
              <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                {(active.columns ?? []).map((col, i) => (
                  <div key={col.heading ?? i} className="space-y-2">
                    {col.heading && (
                      <h4 className="text-h6 font-semibold text-text-primary">
                        {col.heading}
                      </h4>
                    )}
                    <ul className="space-y-1.5">
                      {col.items.map((item) => (
                        <li key={item.label}>
                          <a
                            href={item.href ?? "#"}
                            className="inline-flex items-center gap-2 text-[13px] text-text-secondary hover:text-primary transition-colors"
                          >
                            <span>{item.label}</span>
                            {item.count !== undefined && (
                              <span className="text-text-tertiary tabular-nums text-[11px]">
                                ({item.count})
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {active.featured && (
                <a
                  href={active.featured.href ?? "#"}
                  className="hidden lg:block group rounded-xl overflow-hidden border border-gray-200"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-gray-50">
                    <img
                      src={active.featured.imageUrl}
                      alt={active.featured.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-3 py-2.5 text-[13px] font-medium text-text-primary">
                    {active.featured.title}
                  </div>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);
MegaMenu.displayName = "MegaMenu";

export { MegaMenu };
