import * as React from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Visual tone — switches the confirm button + icon. */
  tone?: "default" | "destructive";
  icon?: React.ReactNode;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  /** Hide the cancel button entirely. */
  hideCancel?: boolean;
}

/**
 * "Are you sure?" specific Dialog variant — eliminates the boilerplate
 * around DialogHeader / DialogFooter / loading state. Defaults to a
 * destructive-tinted confirm when `tone="destructive"` is set.
 */
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  tone = "default",
  icon,
  loading,
  onConfirm,
  onCancel,
  hideCancel,
}: ConfirmDialogProps) {
  const isDestructive = tone === "destructive";
  const finalConfirmLabel =
    confirmLabel ?? (isDestructive ? "Delete" : "Confirm");
  const finalIcon =
    icon ??
    (isDestructive ? <Trash2 className="size-5" /> : <AlertTriangle className="size-5" />);

  const handleConfirm = async () => {
    await onConfirm();
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-full",
              isDestructive ? "bg-danger-50 text-danger-700" : "bg-warning-50 text-warning-700"
            )}
          >
            {finalIcon}
          </span>
          <div className="flex-1 min-w-0">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          </div>
        </div>
        <DialogFooter>
          {!hideCancel && (
            <Button
              variant="ghost"
              onClick={handleCancel}
              disabled={loading}
            >
              {cancelLabel}
            </Button>
          )}
          <Button
            variant={isDestructive ? "destructive" : "primary"}
            onClick={handleConfirm}
            loading={loading}
          >
            {finalConfirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ConfirmDialog };
