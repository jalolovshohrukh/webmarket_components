import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Flag, type FlagCode } from "@/components/brand/flag";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type LanguageCode = "en" | "ru" | "tj";

type Language = {
  code: LanguageCode;
  flag: FlagCode;
  label: string;
  shortLabel: string;
};

export const languages: Language[] = [
  { code: "en", flag: "gb", label: "English", shortLabel: "EN" },
  { code: "ru", flag: "ru", label: "Русский", shortLabel: "RU" },
  { code: "tj", flag: "tj", label: "Тоҷикӣ", shortLabel: "TJ" },
];

export interface LanguageSwitcherProps {
  value?: LanguageCode;
  onChange?: (code: LanguageCode) => void;
  variant?: "full" | "compact";
  className?: string;
}

export function LanguageSwitcher({
  value,
  onChange,
  variant = "compact",
  className,
}: LanguageSwitcherProps) {
  const [internal, setInternal] = React.useState<LanguageCode>("en");
  const isControlled = value !== undefined;
  const current = isControlled ? value! : internal;
  const lang = languages.find((l) => l.code === current) ?? languages[0];

  const handleChange = (code: LanguageCode) => {
    if (!isControlled) setInternal(code);
    onChange?.(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Change language"
          className={cn(
            "inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] font-medium text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
            className
          )}
        >
          <Flag code={lang.flag} className="h-3.5 w-5" />
          <span>{variant === "full" ? lang.label : lang.shortLabel}</span>
          <ChevronDown className="size-3 opacity-60" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {languages.map((l) => {
          const active = l.code === current;
          return (
            <DropdownMenuItem
              key={l.code}
              onSelect={() => handleChange(l.code)}
              className={cn(
                "gap-2.5",
                active && "bg-secondary text-primary"
              )}
            >
              <Flag code={l.flag} className="h-3.5 w-5 shrink-0" />
              <span className="flex-1">{l.label}</span>
              {active && <Check className="size-3.5 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
