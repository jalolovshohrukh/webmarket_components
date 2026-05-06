import * as React from "react";
import { Package, Truck, Zap } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export type DeliveryMethodKind = "standard" | "express" | "pickup" | "same-day";

export interface DeliveryMethod {
  id: string;
  kind: DeliveryMethodKind;
  title: React.ReactNode;
  eta: React.ReactNode;
  price: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface DeliveryMethodPickerProps {
  methods: DeliveryMethod[];
  value: string;
  onValueChange: (id: string) => void;
  className?: string;
}

const kindIcon: Record<DeliveryMethodKind, React.ReactNode> = {
  standard: <Truck className="size-4" />,
  express: <Zap className="size-4" />,
  pickup: <Package className="size-4" />,
  "same-day": <Zap className="size-4" />,
};

function DeliveryMethodPicker({
  methods,
  value,
  onValueChange,
  className,
}: DeliveryMethodPickerProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className={cn("gap-2", className)}
    >
      {methods.map((m) => {
        const checked = m.id === value;
        return (
          <label
            key={m.id}
            htmlFor={`delivery-${m.id}`}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
              checked
                ? "border-primary bg-secondary"
                : "border-gray-200 hover:bg-muted",
              m.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-background text-text-secondary">
              {kindIcon[m.kind]}
            </span>
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-[14px] font-semibold text-text-primary">
                  {m.title}
                </div>
                <div className="text-[14px] font-semibold tabular-nums text-text-primary">
                  {m.price}
                </div>
              </div>
              <div className="mt-0.5 text-[13px] text-text-tertiary">
                {m.eta}
              </div>
              {m.description && (
                <div className="mt-1 text-[12px] text-text-tertiary">
                  {m.description}
                </div>
              )}
            </div>
            <RadioGroupItem
              id={`delivery-${m.id}`}
              value={m.id}
              disabled={m.disabled}
              className="mt-1"
            />
          </label>
        );
      })}
    </RadioGroup>
  );
}

export { DeliveryMethodPicker };
