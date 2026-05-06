import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { CornerDownLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  group?: string;
  keywords?: string;
  icon?: React.ReactNode;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
  emptyText?: React.ReactNode;
  className?: string;
  initialQuery?: string;
}

function searchScore(item: CommandItem, query: string): number {
  // Lower is better; -1 = no match. Title match beats description / keywords / group.
  if (!query) return 0;
  const q = query.toLowerCase();
  const label = item.label.toLowerCase();
  const labelIdx = label.indexOf(q);
  if (labelIdx !== -1) return labelIdx;

  // Word-boundary preference — match starts of words
  const words = label.split(/\W+/);
  for (let i = 0; i < words.length; i++) {
    if (words[i].startsWith(q)) return 100 + i;
  }

  const tail = `${item.description ?? ""} ${item.group ?? ""} ${item.keywords ?? ""}`.toLowerCase();
  const tailIdx = tail.indexOf(q);
  if (tailIdx !== -1) return 1000 + tailIdx;
  return -1;
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-sm bg-secondary px-0.5 font-semibold text-primary">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(
  (
    { open, onOpenChange, items, placeholder, emptyText, className, initialQuery },
    ref
  ) => {
    const [query, setQuery] = React.useState(initialQuery ?? "");
    const [activeIdx, setActiveIdx] = React.useState(0);
    const listRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (open) {
        setQuery(initialQuery ?? "");
        setActiveIdx(0);
      }
    }, [open, initialQuery]);

    const filtered = React.useMemo(() => {
      if (!query.trim()) return items;
      return items
        .map((item) => ({ item, score: searchScore(item, query) }))
        .filter((x) => x.score >= 0)
        .sort((a, b) => a.score - b.score)
        .map((x) => x.item);
    }, [items, query]);

    const grouped = React.useMemo(() => {
      const map = new Map<string, CommandItem[]>();
      for (const item of filtered) {
        const key = item.group ?? "";
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(item);
      }
      return Array.from(map.entries());
    }, [filtered]);

    const flatItems = filtered;

    React.useEffect(() => {
      setActiveIdx(0);
    }, [query]);

    React.useEffect(() => {
      if (!listRef.current) return;
      const el = listRef.current.querySelector(
        `[data-idx="${activeIdx}"]`
      ) as HTMLElement | null;
      el?.scrollIntoView({ block: "nearest" });
    }, [activeIdx]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(flatItems.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = flatItems[activeIdx];
        if (item) {
          item.onSelect();
          onOpenChange(false);
        }
      }
    };

    return (
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={cn(
              "fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            )}
          />
          <DialogPrimitive.Content
            ref={ref}
            className={cn(
              "fixed left-1/2 top-[18%] z-50 w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border border-gray-200 bg-background shadow-2xl",
              // Custom keyframe that preserves -translate-x-1/2 while scaling,
              // so the palette grows from its own center instead of drifting
              // horizontally.
              "data-[state=open]:animate-palette-in data-[state=closed]:animate-palette-out",
              className
            )}
          >
            <DialogPrimitive.Title className="sr-only">
              Search components
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Type to filter components. Use arrow keys to navigate, enter to select.
            </DialogPrimitive.Description>

            <div className="flex items-center gap-2.5 border-b border-gray-200 px-4 py-3">
              <Search className="size-4 shrink-0 text-text-tertiary" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder ?? "Search..."}
                className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
                aria-label="Search"
              />
              <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-gray-200 bg-gray-50 px-1.5 font-mono text-[10px] text-text-tertiary">
                esc
              </kbd>
            </div>

            <div
              ref={listRef}
              className="max-h-[60vh] min-h-[120px] overflow-y-auto p-1.5"
            >
              {flatItems.length === 0 ? (
                <div className="px-3 py-12 text-center text-[13px] text-text-tertiary">
                  {emptyText ?? `No results for "${query}"`}
                </div>
              ) : (
                (() => {
                  let runIdx = 0;
                  return grouped.map(([groupName, groupItems]) => (
                    <div key={groupName || "_"} className="mb-1 last:mb-0">
                      {groupName && (
                        <div className="px-2 pb-1 pt-2 text-[11px] uppercase tracking-wider text-text-tertiary">
                          {groupName}
                        </div>
                      )}
                      {groupItems.map((item) => {
                        const idx = runIdx++;
                        const isActive = idx === activeIdx;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            data-idx={idx}
                            onMouseEnter={() => setActiveIdx(idx)}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              item.onSelect();
                              onOpenChange(false);
                            }}
                            className={cn(
                              "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors",
                              isActive
                                ? "bg-muted text-text-primary"
                                : "text-text-secondary hover:bg-muted/60"
                            )}
                          >
                            {item.icon && (
                              <span className="shrink-0 text-text-tertiary [&_svg]:size-4">
                                {item.icon}
                              </span>
                            )}
                            <span className="min-w-0 flex-1">
                              <span className="block text-[13px] font-medium text-text-primary">
                                <Highlight text={item.label} query={query} />
                              </span>
                              {item.description && (
                                <span className="block truncate text-[12px] text-text-tertiary">
                                  <Highlight
                                    text={item.description}
                                    query={query}
                                  />
                                </span>
                              )}
                            </span>
                            {isActive && (
                              <CornerDownLeft className="size-3.5 shrink-0 text-text-tertiary" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ));
                })()
              )}
            </div>

            <div className="hidden items-center gap-3 border-t border-gray-200 bg-gray-50/50 px-4 py-2 text-[11px] text-text-tertiary sm:flex">
              <span className="flex items-center gap-1.5">
                <kbd className="inline-flex h-4 items-center rounded border border-gray-200 bg-background px-1.5 font-mono">
                  ↑
                </kbd>
                <kbd className="inline-flex h-4 items-center rounded border border-gray-200 bg-background px-1.5 font-mono">
                  ↓
                </kbd>
                navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="inline-flex h-4 items-center rounded border border-gray-200 bg-background px-1.5 font-mono">
                  ↵
                </kbd>
                select
              </span>
              <span className="ml-auto tabular-nums">
                {flatItems.length} {flatItems.length === 1 ? "result" : "results"}
              </span>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }
);
CommandPalette.displayName = "CommandPalette";

/** Hook: opens the palette on Cmd/Ctrl+K (or "/" outside an input). */
export function useCommandPaletteHotkey(onOpen: () => void) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inField =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
      } else if (e.key === "/" && !inField) {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpen]);
}

export { CommandPalette };
