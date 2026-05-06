import * as React from "react";
import { CreditCard, Wallet, Banknote, Landmark } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type PaymentMethodKind = "card" | "wallet" | "bank" | "cod" | "credit";

export interface PaymentMethod {
  id: string;
  kind: PaymentMethodKind;
  title: React.ReactNode;
  description?: React.ReactNode;
  brand?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface PaymentMethodPickerProps {
  methods: PaymentMethod[];
  value: string;
  onValueChange: (id: string) => void;
  className?: string;
}

const kindIcon: Record<PaymentMethodKind, React.ReactNode> = {
  card: <CreditCard className="size-4" />,
  wallet: <Wallet className="size-4" />,
  bank: <Landmark className="size-4" />,
  cod: <Banknote className="size-4" />,
  credit: <Wallet className="size-4" />,
};

function PaymentMethodPicker({
  methods,
  value,
  onValueChange,
  className,
}: PaymentMethodPickerProps) {
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
            htmlFor={`pay-${m.id}`}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
              checked
                ? "border-primary bg-secondary"
                : "border-gray-200 hover:bg-muted",
              m.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-background text-text-secondary">
              {m.brand ?? kindIcon[m.kind]}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium text-text-primary">
                  {m.title}
                </span>
                {m.badge && <Badge variant="muted">{m.badge}</Badge>}
              </div>
              {m.description && (
                <div className="mt-0.5 text-[12px] text-text-tertiary">
                  {m.description}
                </div>
              )}
            </div>
            <RadioGroupItem
              id={`pay-${m.id}`}
              value={m.id}
              disabled={m.disabled}
            />
          </label>
        );
      })}
    </RadioGroup>
  );
}

export { PaymentMethodPicker };
