import { Check, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Address {
  id: string;
  recipientName: string;
  street: string;
  street2?: string;
  city: string;
  region?: string;
  postalCode: string;
  country: string;
  phone?: string;
  label?: string;
  isDefault?: boolean;
}

export interface AddressCardProps {
  address: Address;
  selected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

function AddressCard({
  address,
  selected,
  onSelect,
  onEdit,
  onDelete,
  className,
}: AddressCardProps) {
  return (
    <Card
      className={cn(
        "relative p-4 transition-colors",
        selected ? "border-primary ring-2 ring-primary/20" : "hover:bg-muted/40",
        onSelect && "cursor-pointer",
        className
      )}
      onClick={onSelect}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {address.label && (
            <span className="text-[12px] uppercase tracking-wider text-text-tertiary">
              {address.label}
            </span>
          )}
          {address.isDefault && <Badge variant="secondary">Default</Badge>}
        </div>
        {selected && (
          <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
            <Check className="size-3" />
          </span>
        )}
      </div>
      <div className="mt-2 space-y-0.5 text-[13px] text-text-secondary">
        <div className="font-medium text-text-primary">
          {address.recipientName}
        </div>
        <div>{address.street}</div>
        {address.street2 && <div>{address.street2}</div>}
        <div>
          {address.city}
          {address.region && `, ${address.region}`} {address.postalCode}
        </div>
        <div>{address.country}</div>
        {address.phone && (
          <div className="text-text-tertiary">{address.phone}</div>
        )}
      </div>
      {(onEdit || onDelete) && (
        <div className="mt-3 flex items-center gap-1">
          {onEdit && (
            <Button
              variant="text"
              size="sm"
              iconLeft={<Pencil />}
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="text"
              size="sm"
              iconLeft={<Trash2 />}
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-danger hover:text-danger"
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}

export { AddressCard };
