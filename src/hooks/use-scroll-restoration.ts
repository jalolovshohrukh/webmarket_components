import * as React from "react";

/**
 * Scrolls the window to the top whenever `key` changes. Pair with whatever
 * route key your router exposes.
 *
 *   useScrollRestoration(routeId, { behavior: "instant" });
 */
export function useScrollRestoration(
  key: string | number,
  options: { behavior?: ScrollBehavior } = { behavior: "instant" }
) {
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: options.behavior });
  }, [key, options.behavior]);
}

/**
 * Imperatively scroll the window to the top.
 *
 *   <button onClick={() => scrollToTop()}>Top</button>
 */
export function scrollToTop(behavior: ScrollBehavior = "smooth") {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior });
}
