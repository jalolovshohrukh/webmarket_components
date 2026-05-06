import * as React from "react";
import { CheckCircle2, ChevronRight, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface OrderConfirmationProps {
  orderNumber: string;
  email?: string;
  estimatedDelivery?: React.ReactNode;
  shippingAddress?: React.ReactNode;
  trackingHref?: string;
  receiptHref?: string;
  total?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

function OrderConfirmation({
  orderNumber,
  email,
  estimatedDelivery,
  shippingAddress,
  trackingHref,
  receiptHref,
  total,
  className,
  children,
}: OrderConfirmationProps) {
  return (
    <Card className={cn("p-6 md:p-8", className)}>
      <div className="text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-success-50 text-success-700">
          <CheckCircle2 className="size-8" />
        </span>
        <h1 className="mt-4 text-h2 font-semibold text-text-primary">
          Thank you for your order!
        </h1>
        <p className="mt-2 text-p1 text-text-secondary">
          Order{" "}
          <span className="font-semibold text-text-primary">
            #{orderNumber}
          </span>{" "}
          has been placed.
        </p>
        {email && (
          <p className="mt-1 inline-flex items-center justify-center gap-1.5 text-[13px] text-text-tertiary">
            <Mail className="size-4" />
            We sent a receipt to {email}.
          </p>
        )}
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {estimatedDelivery && (
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="text-[12px] uppercase tracking-wider text-text-tertiary">
              Estimated delivery
            </div>
            <div className="mt-1 text-[14px] font-medium text-text-primary">
              {estimatedDelivery}
            </div>
          </div>
        )}
        {shippingAddress && (
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="text-[12px] uppercase tracking-wider text-text-tertiary">
              Shipping to
            </div>
            <div className="mt-1 text-[13px] text-text-primary">
              {shippingAddress}
            </div>
          </div>
        )}
        {total !== undefined && (
          <div className="rounded-lg border border-gray-200 p-4 md:col-span-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[14px] font-medium text-text-primary">
                Total paid
              </span>
              <span className="text-h4 font-semibold tabular-nums text-text-primary">
                {total}
              </span>
            </div>
          </div>
        )}
      </div>
      {children}
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        {trackingHref && (
          <Button asChild>
            <a href={trackingHref}>
              Track my order <ChevronRight />
            </a>
          </Button>
        )}
        {receiptHref && (
          <Button variant="secondary" asChild>
            <a href={receiptHref}>View receipt</a>
          </Button>
        )}
      </div>
    </Card>
  );
}

export { OrderConfirmation };
