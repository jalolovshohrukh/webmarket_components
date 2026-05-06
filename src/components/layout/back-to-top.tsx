import * as React from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BackToTopProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Scroll distance (px) at which the button appears. Default 400. */
  threshold?: number;
  /** Position from bottom (px). Default 16. */
  bottomOffset?: number;
  /** Right offset (px). Default 16. */
  rightOffset?: number;
  /** Smooth scroll behaviour. Default true. */
  smooth?: boolean;
  /** Optional override for the scrollable container; defaults to the window. */
  scrollTarget?: () => Window | HTMLElement | null;
}

/**
 * Auto-showing "scroll to top" button. Renders once you've scrolled past
 * `threshold` px and disappears when you're back near the top.
 */
const BackToTop = React.forwardRef<HTMLButtonElement, BackToTopProps>(
  (
    {
      threshold = 400,
      bottomOffset = 16,
      rightOffset = 16,
      smooth = true,
      scrollTarget,
      className,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const target = scrollTarget?.() ?? window;
      const getY = () =>
        target instanceof Window
          ? window.scrollY
          : (target as HTMLElement).scrollTop;
      const onScroll = () => setVisible(getY() > threshold);
      onScroll();
      target.addEventListener("scroll", onScroll, { passive: true });
      return () => target.removeEventListener("scroll", onScroll);
    }, [threshold, scrollTarget]);

    const onClick = () => {
      const target = scrollTarget?.() ?? window;
      if (target instanceof Window) {
        window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
      } else {
        (target as HTMLElement).scrollTo({
          top: 0,
          behavior: smooth ? "smooth" : "auto",
        });
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Back to top"
        onClick={onClick}
        className={cn(
          "fixed z-30 grid size-11 place-items-center rounded-full border border-gray-100 bg-background text-text-secondary shadow-md transition-all hover:text-text-primary",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
          className
        )}
        style={{ bottom: bottomOffset, right: rightOffset }}
        {...props}
      >
        <ArrowUp className="size-4" />
      </button>
    );
  }
);
BackToTop.displayName = "BackToTop";

export { BackToTop };
