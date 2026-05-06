import * as React from "react";
import { cn } from "@/lib/utils";
import iconUrl from "@/assets/webmarket-logo.png";
import wordmarkUrl from "@/assets/webmarket-wordmark.png";

type LogoVariant = "icon" | "wordmark";
type LogoTone = "auto" | "primary" | "white" | "dark";

export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: LogoVariant;
  tone?: LogoTone;
  /** Height in pixels (width is derived from aspect ratio). */
  size?: number;
}

// Source aspect ratios (from the PNG headers)
const aspect: Record<LogoVariant, number> = {
  icon: 122 / 122,
  wordmark: 538 / 122,
};

const toneClass: Record<LogoTone, string> = {
  auto: "bg-current", // inherits text color → adapts to light/dark
  primary: "bg-primary",
  white: "bg-white",
  dark: "bg-text-primary",
};

const Logo = React.forwardRef<HTMLSpanElement, LogoProps>(
  (
    { variant = "wordmark", tone = "auto", size = 28, className, style, ...props },
    ref
  ) => {
    const url = variant === "icon" ? iconUrl : wordmarkUrl;
    const height = size;
    const width = Math.round(size * aspect[variant]);

    return (
      <span
        ref={ref}
        role="img"
        aria-label="Webmarket"
        className={cn("inline-block shrink-0", toneClass[tone], className)}
        style={{
          width,
          height,
          WebkitMaskImage: `url(${url})`,
          maskImage: `url(${url})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          ...style,
        }}
        {...props}
      />
    );
  }
);
Logo.displayName = "Logo";

export { Logo };
