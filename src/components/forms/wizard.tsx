import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Timeline,
  type TimelineStatus,
  type TimelineStep,
} from "@/components/ui/timeline";
import { cn } from "@/lib/utils";

export interface WizardStep {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Returns false (or rejects) to block forward navigation. */
  validate?: () => boolean | Promise<boolean>;
  content: React.ReactNode;
}

export interface WizardProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: WizardStep[];
  currentIndex?: number;
  defaultIndex?: number;
  onIndexChange?: (i: number) => void;
  onComplete?: () => void | Promise<void>;
  /** Show the timeline above the content. Default true. */
  showTimeline?: boolean;
  /** Orientation of the timeline. Default horizontal. */
  timelineOrientation?: "horizontal" | "vertical";
  /** Customize the labels on the next / previous / finish buttons. */
  labels?: {
    next?: string;
    previous?: string;
    finish?: string;
  };
}

/**
 * Multi-step form / onboarding / checkout wrapper. Pass an array of
 * `{ id, title, content, validate? }`; renders a timeline header,
 * the active step's content, and back/next buttons. Calls
 * `onComplete` when the last step's Next is clicked.
 *
 * Validation: each step can return a boolean (sync) or Promise<boolean>
 * (async) from `validate`. False blocks forward navigation.
 */
const Wizard = React.forwardRef<HTMLDivElement, WizardProps>(
  (
    {
      steps,
      currentIndex,
      defaultIndex = 0,
      onIndexChange,
      onComplete,
      showTimeline = true,
      timelineOrientation = "horizontal",
      labels,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = currentIndex !== undefined;
    const [internal, setInternal] = React.useState(defaultIndex);
    const i = isControlled ? currentIndex : internal;
    const setI = (next: number) => {
      const clamped = Math.max(0, Math.min(steps.length - 1, next));
      if (!isControlled) setInternal(clamped);
      onIndexChange?.(clamped);
    };

    const [submitting, setSubmitting] = React.useState(false);

    const onNext = async () => {
      const step = steps[i];
      if (step?.validate) {
        setSubmitting(true);
        try {
          const ok = await step.validate();
          if (!ok) return;
        } finally {
          setSubmitting(false);
        }
      }
      if (i < steps.length - 1) {
        setI(i + 1);
      } else {
        setSubmitting(true);
        try {
          await onComplete?.();
        } finally {
          setSubmitting(false);
        }
      }
    };

    const timelineSteps: TimelineStep[] = steps.map((s, idx) => {
      let status: TimelineStatus = "upcoming";
      if (idx < i) status = "complete";
      else if (idx === i) status = "current";
      return {
        id: s.id,
        title: s.title,
        description:
          timelineOrientation === "vertical" ? s.description : undefined,
        status,
      };
    });

    return (
      <div ref={ref} className={cn("space-y-5", className)} {...props}>
        {showTimeline && (
          <Timeline
            steps={timelineSteps}
            orientation={timelineOrientation}
          />
        )}
        <div>{steps[i]?.content}</div>
        <div className="flex items-center justify-between gap-2 pt-1">
          <Button
            variant="ghost"
            iconLeft={<ChevronLeft />}
            onClick={() => setI(i - 1)}
            disabled={i === 0 || submitting}
          >
            {labels?.previous ?? "Back"}
          </Button>
          <div className="text-[12px] tabular-nums text-text-tertiary">
            Step {i + 1} of {steps.length}
          </div>
          <Button
            variant="primary"
            iconRight={i < steps.length - 1 ? <ChevronRight /> : undefined}
            onClick={onNext}
            loading={submitting}
          >
            {i < steps.length - 1
              ? labels?.next ?? "Next"
              : labels?.finish ?? "Finish"}
          </Button>
        </div>
      </div>
    );
  }
);
Wizard.displayName = "Wizard";

export { Wizard };
