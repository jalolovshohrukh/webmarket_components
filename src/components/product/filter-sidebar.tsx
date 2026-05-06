import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "@/components/ui/checkbox";
import { RadioGroup, RadioField } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Rating } from "@/components/ui/rating";

export type FilterOption = {
  value: string;
  label: string;
  count?: number;
};

export interface FilterSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  priceRange?: [number, number];
  priceMin?: number;
  priceMax?: number;
  priceStep?: number;
  onPriceChange?: (range: [number, number]) => void;
  currency?: string;

  brands?: FilterOption[];
  selectedBrands?: string[];
  onBrandsChange?: (brands: string[]) => void;

  categories?: FilterOption[];
  selectedCategories?: string[];
  onCategoriesChange?: (cats: string[]) => void;

  rating?: number | null;
  onRatingChange?: (rating: number | null) => void;

  availability?: "any" | "in-stock" | "on-sale";
  onAvailabilityChange?: (a: "any" | "in-stock" | "on-sale") => void;

  onClear?: () => void;
}

function formatMoney(amount: number, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

const FilterSidebar = React.forwardRef<HTMLDivElement, FilterSidebarProps>(
  (
    {
      priceRange,
      priceMin = 0,
      priceMax = 1000,
      priceStep = 10,
      onPriceChange,
      currency = "USD",
      brands = [],
      selectedBrands = [],
      onBrandsChange,
      categories = [],
      selectedCategories = [],
      onCategoriesChange,
      rating,
      onRatingChange,
      availability = "any",
      onAvailabilityChange,
      onClear,
      className,
      ...props
    },
    ref
  ) => {
    const toggle = (
      list: string[],
      value: string,
      handler?: (next: string[]) => void
    ) => {
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      handler?.(next);
    };

    const range = priceRange ?? [priceMin, priceMax];

    return (
      <aside
        ref={ref}
        className={cn(
          "w-full max-w-xs rounded-xl border border-gray-200 bg-card p-4",
          className
        )}
        {...props}
      >
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-h6 font-semibold text-text-primary">Filters</h2>
          {onClear && (
            <Button
              variant="text"
              size="sm"
              onClick={onClear}
              className="px-1 text-text-secondary"
            >
              Clear all
            </Button>
          )}
        </div>

        <Accordion
          type="multiple"
          defaultValue={["price", "categories", "rating", "availability"]}
        >
          <AccordionItem value="price">
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-1">
                <Slider
                  min={priceMin}
                  max={priceMax}
                  step={priceStep}
                  value={range}
                  onValueChange={(v) =>
                    onPriceChange?.([v[0]!, v[1]!] as [number, number])
                  }
                />
                <div className="flex items-center justify-between text-[12px] text-text-secondary">
                  <span className="tabular-nums">
                    {formatMoney(range[0], currency)}
                  </span>
                  <span className="tabular-nums">
                    {formatMoney(range[1], currency)}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {categories.length > 0 && (
            <AccordionItem value="categories">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pt-1">
                  {categories.map((c) => (
                    <li
                      key={c.value}
                      className="flex items-center justify-between gap-2"
                    >
                      <CheckboxField
                        label={c.label}
                        checked={selectedCategories.includes(c.value)}
                        onCheckedChange={() =>
                          toggle(
                            selectedCategories,
                            c.value,
                            onCategoriesChange
                          )
                        }
                      />
                      {c.count !== undefined && (
                        <span className="text-[12px] tabular-nums text-text-tertiary">
                          {c.count}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {brands.length > 0 && (
            <AccordionItem value="brand">
              <AccordionTrigger>Brand</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pt-1">
                  {brands.map((b) => (
                    <li
                      key={b.value}
                      className="flex items-center justify-between gap-2"
                    >
                      <CheckboxField
                        label={b.label}
                        checked={selectedBrands.includes(b.value)}
                        onCheckedChange={() =>
                          toggle(selectedBrands, b.value, onBrandsChange)
                        }
                      />
                      {b.count !== undefined && (
                        <span className="text-[12px] tabular-nums text-text-tertiary">
                          {b.count}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value="rating">
            <AccordionTrigger>Rating</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                {[4, 3, 2, 1].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() =>
                      onRatingChange?.(rating === r ? null : r)
                    }
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] transition-colors",
                      rating === r
                        ? "bg-secondary text-primary"
                        : "hover:bg-gray-100 text-text-secondary"
                    )}
                  >
                    <Rating value={r} size="sm" />
                    <span>& up</span>
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="availability">
            <AccordionTrigger>Availability</AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                value={availability}
                onValueChange={(v) =>
                  onAvailabilityChange?.(v as "any" | "in-stock" | "on-sale")
                }
                className="pt-1"
              >
                <RadioField value="any" label="Any" />
                <RadioField value="in-stock" label="In stock" />
                <RadioField value="on-sale" label="On sale" />
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
    );
  }
);
FilterSidebar.displayName = "FilterSidebar";

export { FilterSidebar };
