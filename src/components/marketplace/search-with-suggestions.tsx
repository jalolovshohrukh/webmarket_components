import * as React from "react";
import { Clock, Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface Suggestion {
  value: string;
  label: React.ReactNode;
  group?: "recent" | "trending" | "category";
  icon?: React.ReactNode;
  meta?: React.ReactNode;
}

export interface SearchWithSuggestionsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onSelectSuggestion?: (suggestion: Suggestion) => void;
  suggestions: Suggestion[];
  placeholder?: string;
  loading?: boolean;
  className?: string;
}

const groupIcon: Record<NonNullable<Suggestion["group"]>, React.ReactNode> = {
  recent: <Clock className="size-3.5" />,
  trending: <TrendingUp className="size-3.5" />,
  category: <Search className="size-3.5" />,
};

const groupLabel: Record<NonNullable<Suggestion["group"]>, string> = {
  recent: "Recent",
  trending: "Trending",
  category: "Categories",
};

function SearchWithSuggestions({
  value,
  defaultValue = "",
  onValueChange,
  onSubmit,
  onSelectSuggestion,
  suggestions,
  placeholder = "Search the marketplace...",
  loading,
  className,
}: SearchWithSuggestionsProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;
  const [open, setOpen] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const setQuery = (q: string) => {
    if (!isControlled) setInternal(q);
    onValueChange?.(q);
    setActiveIdx(0);
    setOpen(true);
  };

  const choose = (s: Suggestion) => {
    if (!isControlled) setInternal(s.value);
    onValueChange?.(s.value);
    onSelectSuggestion?.(s);
    setOpen(false);
  };

  const grouped = React.useMemo(() => {
    const groups: Record<string, Suggestion[]> = {};
    suggestions.forEach((s) => {
      const key = s.group ?? "all";
      (groups[key] ||= []).push(s);
    });
    return groups;
  }, [suggestions]);

  const flat = React.useMemo(
    () =>
      Object.values(grouped).reduce<Suggestion[]>(
        (acc, list) => acc.concat(list),
        []
      ),
    [grouped]
  );

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIdx((i) => Math.min(flat.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && flat[activeIdx]) choose(flat[activeIdx]);
      else onSubmit?.(current);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  let runIdx = 0;

  return (
    <div ref={wrapRef} className={cn("relative w-full", className)}>
      <Input
        value={current}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKey}
        iconLeft={<Search />}
        placeholder={placeholder}
        showClear
        onClear={() => setQuery("")}
        role="combobox"
        aria-expanded={open}
      />
      {open && (suggestions.length > 0 || loading) && (
        <div
          role="listbox"
          className="absolute left-0 right-0 z-50 mt-1 max-h-96 overflow-auto rounded-md border border-gray-200 bg-card shadow-md"
        >
          {loading && (
            <div className="px-3 py-6 text-center text-[13px] text-text-tertiary">
              Searching…
            </div>
          )}
          {Object.entries(grouped).map(([key, items]) => (
            <div key={key} className="py-1">
              {key !== "all" && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-wider text-text-tertiary">
                  {groupIcon[key as keyof typeof groupIcon]}
                  {groupLabel[key as keyof typeof groupLabel]}
                </div>
              )}
              {items.map((s) => {
                const i = runIdx++;
                return (
                  <button
                    key={s.value}
                    type="button"
                    role="option"
                    aria-selected={i === activeIdx}
                    onMouseEnter={() => setActiveIdx(i)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      choose(s);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] transition-colors",
                      i === activeIdx
                        ? "bg-muted text-text-primary"
                        : "text-text-secondary hover:bg-muted hover:text-text-primary"
                    )}
                  >
                    {s.icon && (
                      <span className="text-text-tertiary [&_svg]:size-4">
                        {s.icon}
                      </span>
                    )}
                    <span className="flex-1 truncate">{s.label}</span>
                    {s.meta && (
                      <span className="text-[12px] text-text-tertiary">
                        {s.meta}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { SearchWithSuggestions };
