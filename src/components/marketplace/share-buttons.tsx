import * as React from "react";
import { Check, Copy, Facebook, Mail, Share2, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ShareTarget =
  | "whatsapp"
  | "telegram"
  | "facebook"
  | "twitter"
  | "email"
  | "copy"
  | "native";

export interface ShareButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string;
  title?: string;
  text?: string;
  /** Targets to render (in order). Defaults: native (mobile) / whatsapp / telegram / facebook / twitter / copy. */
  targets?: ShareTarget[];
  variant?: "default" | "compact";
  onShared?: (target: ShareTarget) => void;
}

const labels: Record<ShareTarget, string> = {
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  facebook: "Facebook",
  twitter: "X / Twitter",
  email: "Email",
  copy: "Copy link",
  native: "Share",
};

function buildShareUrl(target: ShareTarget, opts: { url: string; title?: string; text?: string }) {
  const text = opts.text ?? opts.title ?? "";
  const u = encodeURIComponent(opts.url);
  const t = encodeURIComponent(text);
  switch (target) {
    case "whatsapp":
      return `https://wa.me/?text=${t}%20${u}`;
    case "telegram":
      return `https://t.me/share/url?url=${u}&text=${t}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
    case "email":
      return `mailto:?subject=${t}&body=${u}`;
    default:
      return undefined;
  }
}

const TelegramGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9.78 18.65l.28-4.21 7.68-6.92c.34-.31-.07-.46-.52-.19l-9.5 5.99-4.1-1.28c-.88-.25-.89-.86.2-1.27l16.04-6.18c.73-.33 1.43.18 1.15 1.27l-2.73 12.86c-.19.91-.74 1.13-1.5.71l-4.13-3.05-1.99 1.93c-.23.23-.42.42-.85.42l.07-.08z" />
  </svg>
);

const WhatsAppGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.05 4.91A10 10 0 0 0 4.5 18l-1.5 5 5.13-1.35A10 10 0 1 0 19.05 4.91Zm-3.34 11.18c-.21.59-1.23 1.14-1.72 1.21-.44.06-1 .09-1.6-.1-.37-.12-.84-.27-1.44-.53-2.54-1.09-4.19-3.63-4.32-3.8-.13-.17-1.03-1.36-1.03-2.6s.65-1.85.88-2.1c.23-.25.5-.31.67-.31h.49c.16.01.37-.06.57.43.21.5.72 1.73.78 1.86.06.13.1.27.02.44-.09.17-.13.27-.25.42-.12.15-.26.34-.37.45-.11.12-.26.26-.11.51a7.7 7.7 0 0 0 1.42 1.77c.97.86 1.79 1.12 2.04 1.25.25.12.4.11.55-.06.15-.17.64-.75.8-1 .17-.26.34-.21.57-.13.23.09 1.49.7 1.74.83.25.13.42.19.48.3.06.11.06.61-.15 1.21Z" />
  </svg>
);

function iconFor(t: ShareTarget) {
  switch (t) {
    case "whatsapp":
      return <WhatsAppGlyph className="size-4" />;
    case "telegram":
      return <TelegramGlyph className="size-4" />;
    case "facebook":
      return <Facebook className="size-4" />;
    case "twitter":
      return <Twitter className="size-4" />;
    case "email":
      return <Mail className="size-4" />;
    case "copy":
      return <Copy className="size-4" />;
    case "native":
      return <Share2 className="size-4" />;
  }
}

const ShareButtons = React.forwardRef<HTMLDivElement, ShareButtonsProps>(
  (
    {
      url,
      title,
      text,
      targets,
      variant = "default",
      onShared,
      className,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);
    const hasNative =
      typeof navigator !== "undefined" && "share" in navigator;
    const finalTargets =
      targets ??
      (hasNative
        ? ["native", "copy"]
        : ["whatsapp", "telegram", "facebook", "twitter", "copy"]);

    const handle = async (t: ShareTarget) => {
      if (t === "native" && hasNative) {
        try {
          await (navigator as Navigator & {
            share?: (data: ShareData) => Promise<void>;
          }).share?.({ url, title, text });
          onShared?.(t);
        } catch {
          // user cancelled — ignore
        }
        return;
      }
      if (t === "copy") {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
          onShared?.(t);
        } catch {
          // ignore
        }
        return;
      }
      const href = buildShareUrl(t, { url, title, text });
      if (href) {
        window.open(href, "_blank", "noopener,noreferrer");
        onShared?.(t);
      }
    };

    const compact = variant === "compact";

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center gap-2", className)}
        {...props}
      >
        {finalTargets.map((t) => {
          const isCopy = t === "copy";
          const showCopied = isCopy && copied;
          return (
            <Button
              key={t}
              variant={isCopy ? "secondaryOutlined" : "secondary"}
              size="sm"
              onClick={() => handle(t)}
              iconLeft={
                showCopied ? <Check className="text-success-500" /> : iconFor(t)
              }
              aria-label={labels[t]}
              className={compact ? "!px-2.5" : undefined}
            >
              {!compact && (showCopied ? "Copied!" : labels[t])}
            </Button>
          );
        })}
      </div>
    );
  }
);
ShareButtons.displayName = "ShareButtons";

export { ShareButtons };
