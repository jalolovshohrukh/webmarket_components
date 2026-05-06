import * as React from "react";

/**
 * `useState`-like hook backed by `localStorage`. Reactive across tabs via
 * the native `storage` event.
 *
 *   const [theme, setTheme] = useLocalStorage("theme", "system");
 *
 * SSR-safe — returns `initialValue` on the server.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const read = React.useCallback((): T => {
    if (typeof window === "undefined") return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initialValue : (JSON.parse(raw) as T);
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [value, setValue] = React.useState<T>(read);

  // Persist on change
  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota / privacy mode failures
    }
  }, [key, value]);

  // Cross-tab sync
  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      try {
        setValue(e.newValue === null ? initialValue : (JSON.parse(e.newValue) as T));
      } catch {
        // ignore
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, initialValue]);

  return [value, setValue];
}
