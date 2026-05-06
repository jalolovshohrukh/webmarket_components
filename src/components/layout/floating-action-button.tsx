import * as React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon shown inside the bubble. */
  icon?: React.ReactNode;
  /** Optional pill label rendered to the left of the icon (desktop only). */
  label?: React.ReactNode;
  /** Visual tone. */
  tone?: "primary" | "success" | "neutral";
  /** Pulse ring around the bubble. */
  pulse?: boolean;
  /** Position offset from the bottom — useful when stacking with a MobileNavBar. */
  bottomOffset?: number;
  /** Render as <a> instead of <button>. */
  href?: string;
  size?: "md" | "lg";
}

const toneClass = {
  primary: "bg-primary text-primary-foreground hover:bg-brand-200",
  success: "bg-success-500 text-white hover:bg-success-600",
  neutral: "bg-text-primary text-background hover:bg-text-secondary",
} as const;

const sizeClass = {
  md: "size-12 [&_svg]:size-5",
  lg: "size-14 [&_svg]:size-6",
} as const;

/**
 * Free-floating circular CTA bottom-right of the viewport. The de-facto
 * pattern for chat / WhatsApp / Telegram contact in marketplace apps.
 */
const FloatingActionButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  FloatingActionButtonProps
>(
  (
    {
      icon = <MessageCircle />,
      label,
      tone = "success",
      pulse = false,
      bottomOffset = 16,
      size = "lg",
      href,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const inner = (
      <>
        {pulse && (
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 -z-10 animate-ping rounded-full opacity-60",
              toneClass[tone]
            )}
          />
        )}
        {label && (
          <span className="hidden sm:inline-block whitespace-nowrap text-[13px] font-medium">
            {label}
          </span>
        )}
        <span className="grid place-items-center [&_svg]:shrink-0">
          {icon}
        </span>
        {children}
      </>
    );

    const cls = cn(
      "fixed right-4 z-30 inline-flex items-center justify-center gap-2 rounded-full shadow-lg transition-colors",
      "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
      label ? "px-4" : "",
      label ? "h-14" : sizeClass[size],
      toneClass[tone],
      className
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cls}
          style={{ bottom: bottomOffset }}
          aria-label={
            typeof label === "string"
              ? label
              : (props["aria-label"] as string | undefined)
          }
          {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {inner}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={cls}
        style={{ bottom: bottomOffset }}
        {...props}
      >
        {inner}
      </button>
    );
  }
);
FloatingActionButton.displayName = "FloatingActionButton";

// ---------------------------------------------------------------------------
// WhatsAppButton — pre-themed FloatingActionButton with the WhatsApp glyph.
// ---------------------------------------------------------------------------

export interface WhatsAppButtonProps
  extends Omit<FloatingActionButtonProps, "icon" | "tone" | "href" | "label"> {
  /** Phone in international format, no `+`. e.g., "992970400500". */
  phone: string;
  /** Pre-filled message text. */
  message?: string;
  label?: React.ReactNode;
}

const WhatsAppGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19.05 4.91A10 10 0 0 0 4.5 18l-1.5 5 5.13-1.35A10 10 0 1 0 19.05 4.91Zm-7 17a8 8 0 0 1-4.07-1.11l-.29-.17-3.04.8.81-2.97-.19-.31A8 8 0 1 1 12.05 21.9Zm4.66-6.05c-.25-.13-1.51-.74-1.74-.83-.23-.08-.4-.13-.57.13-.16.25-.65.83-.8 1-.15.17-.3.18-.55.06-.25-.13-1.07-.39-2.04-1.25a7.7 7.7 0 0 1-1.42-1.77c-.15-.25 0-.39.11-.51.11-.11.25-.3.37-.45.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.36-.78-1.86-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.78 2.71 4.32 3.8.6.26 1.07.41 1.44.53.6.19 1.16.16 1.6.1.49-.07 1.51-.62 1.72-1.21.21-.6.21-1.1.15-1.21-.06-.11-.23-.17-.48-.3Z" />
  </svg>
);

/**
 * WhatsApp click-to-chat floating button. Tap opens
 * https://wa.me/<phone>?text=<message>.
 */
function WhatsAppButton({
  phone,
  message,
  label,
  ...props
}: WhatsAppButtonProps) {
  const url = `https://wa.me/${phone.replace(/\D/g, "")}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
  return (
    <FloatingActionButton
      href={url}
      tone="success"
      icon={<WhatsAppGlyph className="size-6" aria-hidden />}
      label={label}
      aria-label={typeof label === "string" ? label : "Chat on WhatsApp"}
      {...props}
    />
  );
}

export { FloatingActionButton, WhatsAppButton };
