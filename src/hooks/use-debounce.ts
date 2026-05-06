import * as React from "react";

/**
 * Debounced value. Returns `value` after `delayMs` of inactivity.
 *
 *   const [q, setQ] = React.useState("");
 *   const debounced = useDebounce(q, 300);
 *   React.useEffect(() => fetch(`/search?q=${debounced}`), [debounced]);
 */
export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

/**
 * Debounced callback. Returns a stable function reference whose underlying
 * call is delayed by `delayMs`. Cancels pending invocations on unmount.
 *
 *   const onResize = useDebouncedCallback(() => layoutGrid(), 150);
 */
export function useDebouncedCallback<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delayMs = 300
): (...args: Args) => void {
  const ref = React.useRef(fn);
  ref.current = fn;
  const timer = React.useRef<ReturnType<typeof setTimeout>>();
  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );
  return React.useCallback(
    (...args: Args) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => ref.current(...args), delayMs);
    },
    [delayMs]
  );
}
