import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ComparisonValue = string | number | boolean | React.ReactNode;

export interface ComparisonRow {
  label: React.ReactNode;
  values: ComparisonValue[];
  highlight?: boolean;
}

export interface ComparisonGroup {
  label?: React.ReactNode;
  rows: ComparisonRow[];
}

export interface ComparisonTableProps {
  columnHeaders: React.ReactNode[];
  groups: ComparisonGroup[];
  className?: string;
}

function ComparisonTable({
  columnHeaders,
  groups,
  className,
}: ComparisonTableProps) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-xl border border-gray-200 bg-card",
        className
      )}
    >
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky left-0 z-10 w-44 border-b border-r border-gray-200 bg-card p-3 text-left text-text-tertiary"
            />
            {columnHeaders.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="min-w-[180px] border-b border-r border-gray-200 bg-card p-3 text-left font-semibold text-text-primary last:border-r-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((g, gi) => (
            <React.Fragment key={gi}>
              {g.label && (
                <tr>
                  <th
                    scope="rowgroup"
                    colSpan={columnHeaders.length + 1}
                    className="bg-muted/60 px-3 py-2 text-left text-[12px] uppercase tracking-wider text-text-tertiary"
                  >
                    {g.label}
                  </th>
                </tr>
              )}
              {g.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className={cn(
                    "border-b border-gray-200 last:border-b-0",
                    row.highlight && "bg-secondary/40"
                  )}
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 w-44 border-r border-gray-200 bg-card p-3 text-left font-medium text-text-secondary"
                  >
                    {row.label}
                  </th>
                  {row.values.map((v, vi) => (
                    <td
                      key={vi}
                      className="border-r border-gray-200 p-3 text-text-primary last:border-r-0"
                    >
                      <ComparisonCell value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComparisonCell({ value }: { value: ComparisonValue }) {
  if (value === true)
    return <Check className="size-4 text-success-500" aria-label="Yes" />;
  if (value === false)
    return <X className="size-4 text-text-tertiary" aria-label="No" />;
  if (value === null || value === undefined)
    return <span className="text-text-tertiary">—</span>;
  return <>{value}</>;
}

export { ComparisonTable };
