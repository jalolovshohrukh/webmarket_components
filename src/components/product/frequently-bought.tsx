import * as React from "react";
import { Plus, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { formatPrice, type Product } from "@/types/product";

export interface FrequentlyBoughtProps {
  anchor: Product;
  bundle: Product[];
  onAddBundle?: (selected: Product[]) => void;
  className?: string;
}

function FrequentlyBought({
  anchor,
  bundle,
  onAddBundle,
  className,
}: FrequentlyBoughtProps) {
  const [selected, setSelected] = React.useState<Set<string>>(
    () => new Set([anchor.id, ...bundle.map((p) => p.id)])
  );

  const toggle = (id: string) => {
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const all = [anchor, ...bundle];
  const total = all
    .filter((p) => selected.has(p.id))
    .reduce((sum, p) => sum + p.price.amount, 0);
  const selectedCount = selected.size;

  return (
    <Card className={cn("p-5", className)}>
      <h3 className="text-h4 font-semibold text-text-primary">
        Frequently bought together
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <ol className="flex flex-wrap items-start gap-3">
          {all.map((p, i) => (
            <React.Fragment key={p.id}>
              <li className="flex w-32 flex-col text-center">
                <label className="relative block cursor-pointer">
                  <Checkbox
                    checked={selected.has(p.id)}
                    onCheckedChange={() => toggle(p.id)}
                    className="absolute left-2 top-2 z-10"
                    aria-label={`Include ${p.title}`}
                  />
                  <div
                    className={cn(
                      "aspect-square overflow-hidden rounded-md border bg-gray-50 transition-colors",
                      selected.has(p.id)
                        ? "border-primary"
                        : "border-gray-200"
                    )}
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="size-full object-cover"
                    />
                  </div>
                </label>
                <div className="mt-2 line-clamp-2 text-[12px] text-text-secondary">
                  {p.title}
                </div>
                <div className="text-[13px] font-semibold text-text-primary">
                  {formatPrice(p.price)}
                </div>
              </li>
              {i < all.length - 1 && (
                <Plus
                  className="mt-12 size-4 shrink-0 text-text-tertiary"
                  aria-hidden
                />
              )}
            </React.Fragment>
          ))}
        </ol>
        <div className="rounded-lg border border-gray-200 bg-muted/40 p-4 md:min-w-[180px]">
          <div className="text-[12px] text-text-tertiary">
            Total ({selectedCount} {selectedCount === 1 ? "item" : "items"})
          </div>
          <div className="text-h3 font-semibold tabular-nums text-text-primary">
            {formatPrice({ amount: total, currency: anchor.price.currency })}
          </div>
          <Button
            variant="primary"
            size="sm"
            className="mt-3 w-full"
            iconLeft={<ShoppingCart />}
            disabled={selectedCount === 0}
            onClick={() =>
              onAddBundle?.(all.filter((p) => selected.has(p.id)))
            }
          >
            Add bundle
          </Button>
        </div>
      </div>
    </Card>
  );
}

export { FrequentlyBought };
