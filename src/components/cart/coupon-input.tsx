import * as React from "react";
import { Tag, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AppliedCoupon {
  code: string;
  description?: React.ReactNode;
}

export interface CouponInputProps {
  applied?: AppliedCoupon | null;
  onApply: (code: string) => void | Promise<void>;
  onRemove?: () => void;
  error?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

function CouponInput({
  applied,
  onApply,
  onRemove,
  error,
  loading,
  className,
}: CouponInputProps) {
  const [code, setCode] = React.useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    await onApply(code.trim());
    setCode("");
  };

  if (applied) {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-2 rounded-md border border-success-100 bg-success-50 p-3",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <Tag className="size-4 text-success-700" />
          <div>
            <div className="text-[13px] font-semibold text-success-700">
              {applied.code} applied
            </div>
            {applied.description && (
              <div className="text-[12px] text-success-700/80">
                {applied.description}
              </div>
            )}
          </div>
        </div>
        {onRemove && (
          <Button
            variant="ghost"
            size="iconSm"
            aria-label="Remove coupon"
            onClick={onRemove}
          >
            <X />
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={cn("flex items-start gap-2", className)}>
      <div className="flex-1">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Promo code"
          iconLeft={<Tag />}
          error={error ? String(error) : undefined}
        />
      </div>
      <Button
        type="submit"
        variant="secondary"
        loading={loading}
        disabled={!code.trim()}
      >
        Apply
      </Button>
    </form>
  );
}

export { CouponInput };
