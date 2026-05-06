import * as React from "react";
import { cn } from "@/lib/utils";

export interface SearchResultsHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  query?: React.ReactNode;
  total: number;
  page?: number;
  perPage?: number;
  /** Right-aligned slot — typically <SortDropdown> + <ViewToggle>. */
  actions?: React.ReactNode;
  /** Loading state prefix while results are still being fetched. */
  loading?: boolean;
}

/**
 * "Showing 1–20 of 482 results for 'wireless headphones'" header for
 * catalog / search results pages. Numbers are tabular and inline with the
 * sort + view toggle slot on the right.
 */
const SearchResultsHeader = React.forwardRef<
  HTMLDivElement,
  SearchResultsHeaderProps
>(
  (
    {
      query,
      total,
      page = 1,
      perPage = 20,
      actions,
      loading,
      className,
      ...props
    },
    ref
  ) => {
    const start = total > 0 ? (page - 1) * perPage + 1 : 0;
    const end = Math.min(page * perPage, total);
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between",
          className
        )}
        {...props}
      >
        <div className="text-[13px] text-text-secondary">
          {loading ? (
            <span className="text-text-tertiary">Searching…</span>
          ) : total === 0 ? (
            <>
              No results
              {query && (
                <>
                  {" "}for{" "}
                  <span className="font-semibold text-text-primary">
                    “{query}”
                  </span>
                </>
              )}
            </>
          ) : (
            <>
              <span>Showing</span>{" "}
              <span className="font-semibold tabular-nums text-text-primary">
                {start.toLocaleString()}–{end.toLocaleString()}
              </span>{" "}
              <span>of</span>{" "}
              <span className="font-semibold tabular-nums text-text-primary">
                {total.toLocaleString()}
              </span>{" "}
              <span>results</span>
              {query && (
                <>
                  {" "}for{" "}
                  <span className="font-semibold text-text-primary">
                    “{query}”
                  </span>
                </>
              )}
            </>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        )}
      </div>
    );
  }
);
SearchResultsHeader.displayName = "SearchResultsHeader";

export { SearchResultsHeader };
