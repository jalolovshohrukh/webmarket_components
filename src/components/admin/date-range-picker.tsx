import * as React from "react";
import { CalendarDays } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  endOfMonth,
  format,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type { DateRange };

export interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  align?: "start" | "center" | "end";
  className?: string;
  triggerClassName?: string;
  numberOfMonths?: 1 | 2;
  disabled?: boolean;
}

const presets = [
  { label: "Today", get: () => ({ from: new Date(), to: new Date() }) },
  {
    label: "Yesterday",
    get: () => ({ from: subDays(new Date(), 1), to: subDays(new Date(), 1) }),
  },
  {
    label: "Last 7 days",
    get: () => ({ from: subDays(new Date(), 6), to: new Date() }),
  },
  {
    label: "Last 30 days",
    get: () => ({ from: subDays(new Date(), 29), to: new Date() }),
  },
  {
    label: "This month",
    get: () => ({ from: startOfMonth(new Date()), to: new Date() }),
  },
  {
    label: "Last month",
    get: () => {
      const last = subMonths(new Date(), 1);
      return { from: startOfMonth(last), to: endOfMonth(last) };
    },
  },
  {
    label: "Last 90 days",
    get: () => ({ from: subDays(new Date(), 89), to: new Date() }),
  },
];

function formatRange(r: DateRange | undefined) {
  if (!r?.from) return "Select date range";
  if (!r.to || r.to.getTime() === r.from.getTime())
    return format(r.from, "MMM d, yyyy");
  return `${format(r.from, "MMM d")} – ${format(r.to, "MMM d, yyyy")}`;
}

function DateRangePicker({
  value,
  defaultValue,
  onValueChange,
  align = "start",
  className,
  triggerClassName,
  numberOfMonths = 2,
  disabled,
}: DateRangePickerProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<DateRange | undefined>(
    defaultValue
  );
  const current = isControlled ? value : internal;

  const handleSelect = (next: DateRange | undefined) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondaryOutlined"
          size="sm"
          iconLeft={<CalendarDays />}
          disabled={disabled}
          className={cn("font-normal text-text-primary", triggerClassName)}
        >
          {formatRange(current)}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className={cn("w-auto max-w-[calc(100vw-2rem)] p-0", className)}
      >
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-row gap-1 overflow-x-auto border-b border-gray-200 p-2 md:flex-col md:overflow-y-auto md:border-b-0 md:border-r md:min-w-[140px]">
            {presets.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handleSelect(p.get())}
                className="whitespace-nowrap rounded-md px-2.5 py-1.5 text-left text-[13px] text-text-secondary transition-colors hover:bg-muted hover:text-text-primary"
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="p-3">
            <DayPicker
              mode="range"
              selected={current}
              onSelect={handleSelect}
              numberOfMonths={numberOfMonths}
              defaultMonth={current?.from ?? new Date()}
              showOutsideDays
              className="rdp-themed"
              styles={{
                day: {
                  borderRadius: 6,
                  height: 36,
                  width: 36,
                },
              }}
              modifiersClassNames={{
                selected:
                  "bg-primary text-primary-foreground hover:!bg-brand-200",
                range_start: "rounded-r-none",
                range_end: "rounded-l-none",
                range_middle:
                  "!bg-secondary !text-primary rounded-none hover:!bg-brand-tertiary",
                today: "ring-1 ring-primary/40",
                outside: "!text-text-tertiary opacity-60",
                disabled: "opacity-30 cursor-not-allowed",
              }}
              classNames={{
                months: "flex flex-col md:flex-row gap-4",
                month: "space-y-2",
                caption: "flex items-center justify-between px-1",
                caption_label: "text-[13px] font-medium",
                nav: "flex items-center gap-1",
                nav_button:
                  "size-7 grid place-items-center rounded-md text-text-secondary hover:bg-muted hover:text-text-primary",
                table: "w-full border-collapse",
                head_row: "flex",
                head_cell:
                  "size-9 text-[11px] uppercase tracking-wider text-text-tertiary grid place-items-center",
                row: "flex",
                cell: "size-9 text-center text-[13px] p-0",
                day: "size-9 p-0 grid place-items-center hover:bg-muted hover:text-text-primary rounded-md transition-colors",
              }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { DateRangePicker };
