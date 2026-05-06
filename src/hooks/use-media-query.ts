import * as React from "react";

/**
 * Reactive media query hook. Returns `true` while the query matches.
 *
 *   const isDesktop = useMediaQuery("(min-width: 1024px)");
 *
 * SSR-safe — returns `false` on the server.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (cb: () => void) => {
      if (typeof window === "undefined") return () => undefined;
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    [query]
  );
  const getSnapshot = React.useCallback(
    () =>
      typeof window === "undefined" ? false : window.matchMedia(query).matches,
    [query]
  );
  return React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => false
  );
}

// Common breakpoint helpers (match Tailwind defaults).
export const useIsSm = () => useMediaQuery("(min-width: 640px)");
export const useIsMd = () => useMediaQuery("(min-width: 768px)");
export const useIsLg = () => useMediaQuery("(min-width: 1024px)");
export const useIsXl = () => useMediaQuery("(min-width: 1280px)");
export const useIs2xl = () => useMediaQuery("(min-width: 1536px)");
export const usePrefersDark = () =>
  useMediaQuery("(prefers-color-scheme: dark)");
export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
