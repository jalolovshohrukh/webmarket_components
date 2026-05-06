import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface SpecRow {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface SpecGroup {
  id: string;
  title: React.ReactNode;
  rows: SpecRow[];
}

export interface SpecTableProps {
  groups: SpecGroup[];
  defaultOpen?: string[];
  className?: string;
}

function SpecTable({ groups, defaultOpen, className }: SpecTableProps) {
  return (
    <Accordion
      type="multiple"
      defaultValue={defaultOpen ?? groups.map((g) => g.id)}
      className={cn("space-y-2", className)}
    >
      {groups.map((g) => (
        <AccordionItem
          key={g.id}
          value={g.id}
          className="rounded-xl border border-gray-200 bg-card px-4"
        >
          <AccordionTrigger className="text-[14px] font-semibold hover:no-underline">
            {g.title}
          </AccordionTrigger>
          <AccordionContent>
            <dl className="grid gap-x-6 gap-y-2 pb-2 text-[13px] sm:grid-cols-[200px_1fr]">
              {g.rows.map((row, i) => (
                <React.Fragment key={i}>
                  <dt className="text-text-tertiary">{row.label}</dt>
                  <dd className="text-text-primary">{row.value}</dd>
                </React.Fragment>
              ))}
            </dl>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export { SpecTable };
