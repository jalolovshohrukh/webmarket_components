import * as React from "react";
import {
  AlertTriangle,
  RotateCw,
  ServerCrash,
  WifiOff,
  Search as SearchIcon,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ErrorStateVariant =
  | "404"
  | "500"
  | "offline"
  | "no-results"
  | "generic";

export interface ErrorStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: ErrorStateVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Override the icon entirely. */
  icon?: React.ReactNode;
  /** Primary action button. */
  action?: React.ReactNode;
  /** Secondary action button. */
  secondaryAction?: React.ReactNode;
  /** Convenience: render a Refresh button that calls this. */
  onRetry?: () => void;
  /** Convenience: render a "Go home" button linking to this. */
  homeHref?: string;
  /** Optional code (e.g., 404 / 500) shown above the title. */
  code?: React.ReactNode;
}

const defaults: Record<
  ErrorStateVariant,
  { icon: React.ReactNode; title: string; description: string; code?: string }
> = {
  "404": {
    icon: <SearchIcon />,
    title: "Page not found",
    description:
      "The page you're looking for doesn't exist or has been moved.",
    code: "404",
  },
  "500": {
    icon: <ServerCrash />,
    title: "Something went wrong",
    description:
      "Our servers hit an unexpected error. Try refreshing in a moment.",
    code: "500",
  },
  offline: {
    icon: <WifiOff />,
    title: "You're offline",
    description: "Check your connection and try again.",
  },
  "no-results": {
    icon: <SearchIcon />,
    title: "No results found",
    description: "Try a different search or clear the active filters.",
  },
  generic: {
    icon: <AlertTriangle />,
    title: "Something went wrong",
    description:
      "We couldn't complete that action. Please try again in a moment.",
  },
};

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      variant = "generic",
      title,
      description,
      icon,
      action,
      secondaryAction,
      onRetry,
      homeHref,
      code,
      className,
      ...props
    },
    ref
  ) => {
    const cfg = defaults[variant];
    const finalCode = code ?? cfg.code;
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "mx-auto flex w-full max-w-md flex-col items-center justify-center px-4 py-10 text-center",
          className
        )}
        {...props}
      >
        <span className="grid size-14 place-items-center rounded-full bg-secondary text-primary [&_svg]:size-6">
          {icon ?? cfg.icon}
        </span>
        {finalCode && (
          <div className="mt-4 text-[11px] font-mono font-semibold uppercase tracking-wider text-text-tertiary">
            Error {finalCode}
          </div>
        )}
        <h2 className="mt-1 text-h4 font-semibold text-text-primary">
          {title ?? cfg.title}
        </h2>
        <p className="mt-1 text-p1 text-text-secondary">
          {description ?? cfg.description}
        </p>
        {(action || secondaryAction || onRetry || homeHref) && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {action ??
              (onRetry && (
                <Button
                  variant="primary"
                  iconLeft={<RotateCw />}
                  onClick={onRetry}
                >
                  Try again
                </Button>
              ))}
            {secondaryAction ??
              (homeHref && (
                <Button variant="secondaryOutlined" iconLeft={<Home />} asChild>
                  <a href={homeHref}>Go home</a>
                </Button>
              ))}
          </div>
        )}
      </div>
    );
  }
);
ErrorState.displayName = "ErrorState";

export { ErrorState };
