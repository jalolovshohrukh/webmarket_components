import * as React from "react";
import { Package, Truck, CheckCircle2, XCircle, Hourglass } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Timeline, type TimelineStep, type TimelineStatus } from "@/components/ui/timeline";
import { cn } from "@/lib/utils";

export type TrackingStage =
  | "placed"
  | "processing"
  | "shipped"
  | "out-for-delivery"
  | "delivered"
  | "cancelled";

export interface TrackingEvent {
  stage: TrackingStage;
  title: React.ReactNode;
  description?: React.ReactNode;
  at?: string | Date;
}

export interface OrderTrackingProps {
  events: TrackingEvent[];
  carrier?: string;
  trackingNumber?: string;
  className?: string;
}

const stageIcon: Record<TrackingStage, React.ReactNode> = {
  placed: <Package className="size-4" />,
  processing: <Hourglass className="size-4" />,
  shipped: <Truck className="size-4" />,
  "out-for-delivery": <Truck className="size-4" />,
  delivered: <CheckCircle2 className="size-4" />,
  cancelled: <XCircle className="size-4" />,
};

function OrderTracking({
  events,
  carrier,
  trackingNumber,
  className,
}: OrderTrackingProps) {
  const lastCompleteIdx = events.reduce(
    (acc, e, i) => (e.at ? i : acc),
    -1
  );

  const steps: TimelineStep[] = events.map((e, i) => {
    let status: TimelineStatus = "upcoming";
    if (e.stage === "cancelled") status = "complete";
    else if (i < lastCompleteIdx) status = "complete";
    else if (i === lastCompleteIdx) status = "current";

    const at =
      e.at instanceof Date ? e.at.toLocaleString() : e.at;

    return {
      id: `${e.stage}-${i}`,
      title: e.title,
      description: e.description,
      meta: at,
      status,
      icon: stageIcon[e.stage],
    };
  });

  return (
    <Card className={cn("p-5", className)}>
      {(carrier || trackingNumber) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-[13px]">
          {carrier && (
            <div>
              <span className="text-text-tertiary">Carrier:</span>{" "}
              <span className="font-medium text-text-primary">{carrier}</span>
            </div>
          )}
          {trackingNumber && (
            <div>
              <span className="text-text-tertiary">Tracking:</span>{" "}
              <span className="font-mono font-medium text-text-primary">
                {trackingNumber}
              </span>
            </div>
          )}
        </div>
      )}
      <Timeline steps={steps} orientation="vertical" />
    </Card>
  );
}

export { OrderTracking };
