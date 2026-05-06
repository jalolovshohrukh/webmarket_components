import * as React from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CookieConsentDecision = "accepted" | "rejected" | "customized";

export interface CookieConsentProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  acceptLabel?: string;
  rejectLabel?: string;
  customizeLabel?: string;
  /** Optional link to your full privacy / cookie policy. */
  policyHref?: string;
  policyLabel?: string;
  /** Where the decision is persisted. Defaults to `wm-cookie-consent`. */
  storageKey?: string;
  /** Called once the user makes a choice. */
  onDecide?: (decision: CookieConsentDecision) => void;
  /** Called when the customize button is clicked (open your settings panel). */
  onCustomize?: () => void;
  /** Position. */
  variant?: "bottom-banner" | "bottom-floating" | "card";
}

/**
 * GDPR / privacy notice banner. Self-managing — reads localStorage on mount
 * and only renders if the user hasn't decided yet. Fires `onDecide` with
 * "accepted" / "rejected" / "customized" once dismissed.
 */
function CookieConsent({
  title = "Cookies on Webmarket",
  description = "We use cookies to keep you signed in, remember your cart, and measure traffic. You can accept all, reject non-essential, or customize.",
  acceptLabel = "Accept all",
  rejectLabel = "Reject non-essential",
  customizeLabel = "Customize",
  policyHref = "#privacy",
  policyLabel = "Privacy policy",
  storageKey = "wm-cookie-consent",
  onDecide,
  onCustomize,
  variant = "bottom-floating",
  className,
  ...props
}: CookieConsentProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const v = window.localStorage.getItem(storageKey);
      if (!v) setOpen(true);
    } catch {
      // storage might be blocked; show the banner anyway
      setOpen(true);
    }
  }, [storageKey]);

  const decide = (decision: CookieConsentDecision) => {
    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({ decision, at: new Date().toISOString() })
      );
    } catch {
      // ignore storage failures
    }
    setOpen(false);
    onDecide?.(decision);
  };

  if (!open) return null;

  const wrapClass = cn(
    "z-40",
    variant === "bottom-banner" &&
      "fixed inset-x-0 bottom-0 border-t border-gray-100 bg-background",
    variant === "bottom-floating" &&
      "fixed inset-x-3 bottom-3 mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-background shadow-lg",
    variant === "card" && "rounded-xl border border-gray-100 bg-card",
    className
  );

  return (
    <aside
      role="region"
      aria-label="Cookie consent"
      className={wrapClass}
      {...props}
    >
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <span className="hidden sm:grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-primary [&_svg]:size-4">
          <Cookie />
        </span>
        <div className="flex-1 min-w-0">
          {title && (
            <div className="text-[14px] font-semibold text-text-primary">
              {title}
            </div>
          )}
          {description && (
            <p className="mt-0.5 text-[13px] leading-5 text-text-secondary">
              {description}{" "}
              {policyHref && (
                <a
                  href={policyHref}
                  className="font-medium text-primary hover:text-brand-700"
                >
                  {policyLabel}
                </a>
              )}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => decide("rejected")}
          >
            {rejectLabel}
          </Button>
          {onCustomize && (
            <Button
              variant="secondaryOutlined"
              size="sm"
              onClick={() => {
                onCustomize();
                decide("customized");
              }}
            >
              {customizeLabel}
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => decide("accepted")}
          >
            {acceptLabel}
          </Button>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={() => decide("rejected")}
          className="absolute right-2 top-2 grid size-7 place-items-center rounded-full text-text-tertiary hover:bg-muted hover:text-text-primary sm:hidden"
        >
          <X className="size-4" />
        </button>
      </div>
    </aside>
  );
}

/**
 * Imperative read of the stored consent decision. Returns `null` if the
 * user hasn't chosen yet, else `'accepted' | 'rejected' | 'customized'`.
 */
export function getCookieConsentDecision(
  storageKey = "wm-cookie-consent"
): CookieConsentDecision | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(storageKey);
    if (!v) return null;
    const parsed = JSON.parse(v) as { decision?: CookieConsentDecision };
    return parsed.decision ?? null;
  } catch {
    return null;
  }
}

/** Reset the stored decision (e.g., from a "manage cookies" link in the footer). */
export function resetCookieConsent(storageKey = "wm-cookie-consent") {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    // ignore
  }
}

export { CookieConsent };
