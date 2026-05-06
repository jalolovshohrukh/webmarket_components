import { Timeline, type TimelineStep } from "@/components/ui/timeline";
import { cn } from "@/lib/utils";

export type CheckoutStage = "cart" | "address" | "delivery" | "payment" | "review" | "done";

export interface CheckoutStepperProps {
  current: CheckoutStage;
  className?: string;
}

const order: CheckoutStage[] = [
  "cart",
  "address",
  "delivery",
  "payment",
  "review",
  "done",
];

const labels: Record<CheckoutStage, string> = {
  cart: "Cart",
  address: "Address",
  delivery: "Delivery",
  payment: "Payment",
  review: "Review",
  done: "Done",
};

function CheckoutStepper({ current, className }: CheckoutStepperProps) {
  const currentIdx = order.indexOf(current);
  const steps: TimelineStep[] = order
    .slice(0, -1)
    .map((stage, i) => ({
      id: stage,
      title: labels[stage],
      status:
        i < currentIdx
          ? "complete"
          : i === currentIdx
            ? "current"
            : "upcoming",
    }));

  return (
    <Timeline
      steps={steps}
      orientation="horizontal"
      className={cn("max-w-2xl", className)}
    />
  );
}

export { CheckoutStepper };
