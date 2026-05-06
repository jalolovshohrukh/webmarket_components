import { Plus } from "lucide-react";
import { AddressCard, type Address } from "@/components/checkout/address-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AddressBookProps {
  addresses: Address[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAdd?: () => void;
  className?: string;
}

function AddressBook({
  addresses,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
  onAdd,
  className,
}: AddressBookProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid gap-3 sm:grid-cols-2">
        {addresses.map((a) => (
          <AddressCard
            key={a.id}
            address={a}
            selected={selectedId === a.id}
            onSelect={onSelect ? () => onSelect(a.id) : undefined}
            onEdit={onEdit ? () => onEdit(a.id) : undefined}
            onDelete={onDelete ? () => onDelete(a.id) : undefined}
          />
        ))}
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="grid place-items-center rounded-xl border border-dashed border-gray-200 bg-card p-4 text-text-tertiary transition-colors hover:border-primary hover:text-primary"
          >
            <span className="flex flex-col items-center gap-2">
              <span className="grid size-9 place-items-center rounded-full bg-muted text-text-secondary">
                <Plus className="size-5" />
              </span>
              <span className="text-[13px] font-medium">
                Add a new address
              </span>
            </span>
          </button>
        )}
      </div>
      {!onAdd ? null : (
        <Button variant="secondary" iconLeft={<Plus />} onClick={onAdd} className="sm:hidden w-full">
          Add a new address
        </Button>
      )}
    </div>
  );
}

export { AddressBook };
