import * as React from "react";
import { MapPin, Package, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface DeliveryOption {
  id: string;
  type: "ship" | "pickup";
  title: React.ReactNode;
  eta: React.ReactNode;
  price?: React.ReactNode;
  description?: React.ReactNode;
}

export interface DeliveryCardProps {
  address?: React.ReactNode;
  onChangeAddress?: () => void;
  options: DeliveryOption[];
  className?: string;
}

const typeIcon = {
  ship: <Truck className="size-4" />,
  pickup: <Package className="size-4" />,
};

function DeliveryCard({
  address,
  onChangeAddress,
  options,
  className,
}: DeliveryCardProps) {
  return (
    <Card className={cn("p-4", className)}>
      {address && (
        <>
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 size-4 shrink-0 text-text-tertiary" />
            <div className="flex-1 text-[13px]">
              <div className="text-text-tertiary">Deliver to</div>
              <div className="font-medium text-text-primary">{address}</div>
            </div>
            {onChangeAddress && (
              <Button variant="text" size="sm" onClick={onChangeAddress}>
                Change
              </Button>
            )}
          </div>
          <Separator className="my-3" />
        </>
      )}
      <ul className="space-y-2">
        {options.map((opt) => (
          <li
            key={opt.id}
            className="flex items-start gap-2.5 rounded-md p-1"
          >
            <span className="mt-0.5 grid size-7 place-items-center rounded-full bg-muted text-text-secondary">
              {typeIcon[opt.type]}
            </span>
            <div className="flex-1 text-[13px]">
              <div className="font-medium text-text-primary">{opt.title}</div>
              <div className="text-text-tertiary">{opt.eta}</div>
              {opt.description && (
                <div className="mt-0.5 text-text-tertiary">{opt.description}</div>
              )}
            </div>
            {opt.price !== undefined && (
              <span className="text-[13px] font-medium text-text-primary">
                {opt.price}
              </span>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export { DeliveryCard };
