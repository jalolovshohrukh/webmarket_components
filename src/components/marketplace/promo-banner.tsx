import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface PromoBannerProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  endsAt?: Date | string;
  imageUrl?: string;
  variant?: "primary" | "neutral" | "gradient";
  className?: string;
}

function useCountdown(endsAt: Date | string | undefined) {
  const target = React.useMemo(() => {
    if (!endsAt) return null;
    return endsAt instanceof Date ? endsAt : new Date(endsAt);
  }, [endsAt]);

  const compute = React.useCallback(() => {
    if (!target) return null;
    const ms = target.getTime() - Date.now();
    if (ms <= 0)
      return { d: 0, h: 0, m: 0, s: 0, expired: true };
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return { d, h, m, s, expired: false };
  }, [target]);

  const [state, setState] = React.useState(compute);

  React.useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setState(compute()), 1000);
    return () => clearInterval(id);
  }, [target, compute]);

  return state;
}

const variantClass = {
  primary:
    "bg-primary text-primary-foreground border-primary [&_p]:text-primary-foreground/90",
  neutral: "bg-card border-gray-200 text-text-primary",
  gradient:
    "bg-gradient-to-r from-primary via-brand-200 to-brand-100 text-primary-foreground border-transparent [&_p]:text-primary-foreground/90",
};

function PromoBanner({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  onCtaClick,
  endsAt,
  imageUrl,
  variant = "gradient",
  className,
}: PromoBannerProps) {
  const countdown = useCountdown(endsAt);
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6 md:p-8",
        variantClass[variant],
        className
      )}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-40 mix-blend-overlay"
        />
      )}
      <div className="relative z-10 flex flex-col gap-3 md:max-w-[60%]">
        {eyebrow && (
          <Badge variant="secondary" className="w-fit bg-background/90 text-primary">
            {eyebrow}
          </Badge>
        )}
        <h3 className="text-h3 font-semibold leading-tight">{title}</h3>
        {description && <p className="text-[14px] leading-5">{description}</p>}
        {countdown && !countdown.expired && (
          <div className="flex items-center gap-2 text-[12px] uppercase tracking-wider">
            <span>Ends in</span>
            <div className="flex items-center gap-1 font-mono text-[14px] tabular-nums">
              {countdown.d > 0 && (
                <CountdownChip value={countdown.d} unit="d" />
              )}
              <CountdownChip value={countdown.h} unit="h" />
              <CountdownChip value={countdown.m} unit="m" />
              <CountdownChip value={countdown.s} unit="s" />
            </div>
          </div>
        )}
        {ctaLabel && (
          <div className="mt-2">
            {ctaHref ? (
              <Button asChild variant="secondary">
                <a href={ctaHref}>{ctaLabel}</a>
              </Button>
            ) : (
              <Button variant="secondary" onClick={onCtaClick}>
                {ctaLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CountdownChip({ value, unit }: { value: number; unit: string }) {
  return (
    <span className="grid h-7 min-w-[2rem] place-items-center rounded-md bg-background/30 px-1.5 font-semibold backdrop-blur">
      {String(value).padStart(2, "0")}
      <span className="ml-0.5 text-[10px] font-normal opacity-80">{unit}</span>
    </span>
  );
}

export { PromoBanner };
