import * as React from "react";
import { Search } from "lucide-react";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface AutocompleteOption<T = unknown> {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  data?: T;
}

export interface AutocompleteProps<T = unknown>
  extends Omit<InputProps, "onChange" | "onSelect" | "value" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: AutocompleteOption<T>[];
  onSelect?: (option: AutocompleteOption<T>) => void;
  emptyMessage?: React.ReactNode;
  loading?: boolean;
  panelClassName?: string;
}

function Autocomplete<T = unknown>({
  value,
  defaultValue = "",
  onValueChange,
  options,
  onSelect,
  emptyMessage = "No results",
  loading,
  iconLeft,
  panelClassName,
  containerClassName,
  ...inputProps
}: AutocompleteProps<T>) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;
  const [open, setOpen] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const setQuery = (q: string) => {
    if (!isControlled) setInternal(q);
    onValueChange?.(q);
    setOpen(true);
    setActiveIdx(0);
  };

  const choose = (opt: AutocompleteOption<T>) => {
    if (!isControlled) setInternal(opt.value);
    onValueChange?.(opt.value);
    onSelect?.(opt);
    setOpen(false);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIdx((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" && open && options[activeIdx]) {
      e.preventDefault();
      choose(options[activeIdx]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={wrapRef}
      className={cn("relative w-full", containerClassName)}
    >
      <Input
        value={current}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKey}
        iconLeft={iconLeft ?? <Search />}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        {...inputProps}
      />
      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute left-0 right-0 z-50 mt-1 max-h-72 overflow-auto rounded-md border border-gray-200 bg-card p-1 shadow-md",
            panelClassName
          )}
        >
          {loading ? (
            <div className="px-3 py-6 text-center text-[13px] text-text-tertiary">
              Loading...
            </div>
          ) : options.length === 0 ? (
            <div className="px-3 py-6 text-center text-[13px] text-text-tertiary">
              {emptyMessage}
            </div>
          ) : (
            options.map((opt, i) => (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={i === activeIdx}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(opt);
                }}
                className={cn(
                  "flex w-full flex-col items-start gap-0.5 rounded px-3 py-2 text-left text-[13px] transition-colors",
                  i === activeIdx
                    ? "bg-muted text-text-primary"
                    : "text-text-secondary hover:bg-muted hover:text-text-primary"
                )}
              >
                <span className="font-medium">{opt.label}</span>
                {opt.description && (
                  <span className="text-[12px] text-text-tertiary">
                    {opt.description}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
Autocomplete.displayName = "Autocomplete";

export { Autocomplete };
