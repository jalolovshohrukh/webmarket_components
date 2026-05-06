import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  /** The currently-applied theme — `system` is resolved to `light` or `dark`. */
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: "light" | "dark") {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export interface ThemeProviderProps {
  /** Initial theme if nothing is saved. Default: "system". */
  defaultTheme?: Theme;
  /** localStorage key. Default: `wm-theme`. */
  storageKey?: string;
  children: React.ReactNode;
}

/**
 * Portable theme provider. Persists the user's choice to localStorage,
 * applies `.dark` to `<html>`, syncs `color-scheme`, and reacts to system
 * preference changes when `theme = "system"`.
 *
 * Wrap your app once at the root.
 */
function ThemeProvider({
  defaultTheme = "system",
  storageKey = "wm-theme",
  children,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored === "light" || stored === "dark" || stored === "system") {
        return stored;
      }
    } catch {
      // ignore
    }
    return defaultTheme;
  });

  const resolvedTheme: "light" | "dark" = React.useMemo(
    () => (theme === "system" ? getSystemTheme() : theme),
    [theme]
  );

  // Apply on every change
  React.useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  // Persist
  React.useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {
      // ignore
    }
  }, [theme, storageKey]);

  // Re-apply when system preference changes (only matters when theme === "system")
  React.useEffect(() => {
    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme(mql.matches ? "dark" : "light");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme]);

  const value: ThemeContextValue = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: setThemeState,
      toggleTheme: () =>
        setThemeState(resolvedTheme === "dark" ? "light" : "dark"),
    }),
    [theme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/** Hook to read or change the active theme. Must be used inside <ThemeProvider>. */
function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

// ---------------------------------------------------------------------------
// ThemeToggle — drop-in 3-state switch (Light / Dark / System).
// ---------------------------------------------------------------------------

export interface ThemeToggleProps {
  /** Render as a 3-segment switch (default) or a single button that cycles. */
  variant?: "segmented" | "cycle";
  className?: string;
}

const order: Theme[] = ["light", "dark", "system"];
const labelFor: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};
const iconFor: Record<Theme, React.ReactNode> = {
  light: <Sun className="size-4" />,
  dark: <Moon className="size-4" />,
  system: <Monitor className="size-4" />,
};

function ThemeToggleControl({
  variant = "segmented",
  className,
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  if (variant === "cycle") {
    return (
      <button
        type="button"
        aria-label={`Theme: ${labelFor[theme]}`}
        onClick={() => {
          const idx = order.indexOf(theme);
          setTheme(order[(idx + 1) % order.length]);
        }}
        className={cn(
          "grid size-9 place-items-center rounded-md text-text-secondary hover:bg-muted hover:text-text-primary transition-colors",
          className
        )}
      >
        {iconFor[theme]}
      </button>
    );
  }
  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center rounded-md border border-gray-100 bg-background p-0.5",
        className
      )}
    >
      {order.map((t) => {
        const active = t === theme;
        return (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(t)}
            className={cn(
              "inline-flex h-7 items-center justify-center gap-1.5 rounded-[5px] px-2 text-[12px] font-medium transition-colors",
              active
                ? "bg-muted text-text-primary"
                : "text-text-tertiary hover:text-text-primary"
            )}
          >
            {iconFor[t]}
            <span className="hidden sm:inline">{labelFor[t]}</span>
          </button>
        );
      })}
    </div>
  );
}

export { ThemeProvider, useTheme, ThemeToggleControl };
