import * as React from "react";
import { ChevronDown, Search } from "lucide-react";
import { Flag, type FlagCode } from "@/components/brand/flag";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type CountryISO =
  | "TJ"
  | "RU"
  | "KZ"
  | "UZ"
  | "KG"
  | "UA"
  | "GB"
  | "US";

export type Country = {
  iso: CountryISO;
  name: string;
  flag: FlagCode;
  dialCode: string;
  /** Maximum digits in the national (post-dial-code) number. */
  maxLength: number;
};

export const countries: Country[] = [
  { iso: "TJ", name: "Tajikistan", flag: "tj", dialCode: "+992", maxLength: 9 },
  { iso: "RU", name: "Russia", flag: "ru", dialCode: "+7", maxLength: 10 },
  { iso: "KZ", name: "Kazakhstan", flag: "kz", dialCode: "+7", maxLength: 10 },
  { iso: "UZ", name: "Uzbekistan", flag: "uz", dialCode: "+998", maxLength: 9 },
  { iso: "KG", name: "Kyrgyzstan", flag: "kg", dialCode: "+996", maxLength: 9 },
  { iso: "UA", name: "Ukraine", flag: "ua", dialCode: "+380", maxLength: 9 },
  { iso: "GB", name: "United Kingdom", flag: "gb", dialCode: "+44", maxLength: 10 },
  { iso: "US", name: "United States", flag: "us", dialCode: "+1", maxLength: 10 },
];

const countryByIso = (iso: CountryISO) =>
  countries.find((c) => c.iso === iso) ?? countries[0];

export interface PhoneInputProps {
  value?: string;
  defaultValue?: string;
  country?: CountryISO;
  defaultCountry?: CountryISO;
  onChange?: (value: string, country: Country) => void;
  onCountryChange?: (country: Country) => void;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  containerClassName?: string;
  className?: string;
  id?: string;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      country: controlledCountry,
      defaultCountry = "TJ",
      onChange,
      onCountryChange,
      label,
      helperText,
      error,
      disabled,
      containerClassName,
      className,
      id,
    },
    ref
  ) => {
    const reactId = React.useId();
    const fieldId = id ?? reactId;
    const helperId = `${fieldId}-helper`;
    const isInvalid = Boolean(error);

    const [internalIso, setInternalIso] =
      React.useState<CountryISO>(defaultCountry);
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [search, setSearch] = React.useState("");

    const isCountryControlled = controlledCountry !== undefined;
    const isValueControlled = controlledValue !== undefined;
    const iso = isCountryControlled ? controlledCountry! : internalIso;
    const value = isValueControlled ? controlledValue! : internalValue;
    const country = countryByIso(iso);

    const setValue = (next: string, c: Country) => {
      if (!isValueControlled) setInternalValue(next);
      onChange?.(next, c);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value
        .replace(/\D/g, "")
        .slice(0, country.maxLength);
      setValue(digits, country);
    };

    const handleCountrySelect = (newIso: CountryISO) => {
      const next = countryByIso(newIso);
      if (!isCountryControlled) setInternalIso(newIso);
      onCountryChange?.(next);
      // Clip if the previous value is longer than new max
      if (value.length > next.maxLength) {
        setValue(value.slice(0, next.maxLength), next);
      } else {
        onChange?.(value, next);
      }
      setSearch("");
    };

    const filtered = countries.filter((c) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.iso.toLowerCase().includes(q)
      );
    });

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        {label && (
          <Label htmlFor={fieldId} className={cn(isInvalid && "text-danger")}>
            {label}
          </Label>
        )}
        <div
          className={cn(
            "flex h-10 items-stretch overflow-hidden rounded-md border bg-background transition-colors",
            "border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
            isInvalid &&
              "border-danger focus-within:border-danger focus-within:ring-danger/20",
            disabled &&
              "bg-gray-50 cursor-not-allowed opacity-70 focus-within:ring-0",
            className
          )}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                disabled={disabled}
                aria-label={`Country code: ${country.name} ${country.dialCode}`}
                className={cn(
                  "flex items-center gap-1.5 px-3 border-r border-gray-200 hover:bg-gray-50 transition-colors text-[13px] font-medium text-text-primary",
                  "focus:outline-none focus-visible:bg-gray-50",
                  disabled && "cursor-not-allowed hover:bg-transparent"
                )}
              >
                <Flag code={country.flag} className="h-3.5 w-5" />
                <span>{country.dialCode}</span>
                <ChevronDown className="size-3 text-text-tertiary" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-72 p-0 overflow-hidden"
            >
              <div className="border-b border-gray-200 p-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-text-tertiary" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                    autoFocus
                    placeholder="Search country..."
                    className="h-8 w-full rounded-md border border-gray-200 bg-background pl-8 pr-2 text-[13px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="max-h-72 overflow-y-auto py-1">
                {filtered.length === 0 ? (
                  <div className="px-3 py-4 text-center text-[13px] text-text-tertiary">
                    No matches
                  </div>
                ) : (
                  filtered.map((c) => {
                    const active = c.iso === iso;
                    return (
                      <button
                        key={c.iso}
                        type="button"
                        onClick={() => handleCountrySelect(c.iso)}
                        className={cn(
                          "flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] transition-colors",
                          active
                            ? "bg-secondary text-primary"
                            : "text-text-primary hover:bg-secondary/60 hover:text-primary"
                        )}
                      >
                        <Flag code={c.flag} className="h-3.5 w-5 shrink-0" />
                        <span className="flex-1 truncate">{c.name}</span>
                        <span className="text-text-tertiary tabular-nums">
                          {c.dialCode}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <input
            ref={ref}
            id={fieldId}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            placeholder={"0".repeat(country.maxLength)}
            maxLength={country.maxLength}
            aria-invalid={isInvalid || undefined}
            aria-describedby={helperText || error ? helperId : undefined}
            className={cn(
              "min-w-0 flex-1 bg-transparent px-3 text-[14px] text-text-primary placeholder:text-text-tertiary tabular-nums",
              "focus:outline-none",
              disabled && "cursor-not-allowed"
            )}
          />
        </div>
        {(error || helperText) && (
          <p
            id={helperId}
            className={cn(
              "text-[12px] leading-4",
              isInvalid ? "text-danger" : "text-text-tertiary"
            )}
          >
            {error ?? helperText ?? `Up to ${country.maxLength} digits`}
          </p>
        )}
      </div>
    );
  }
);
PhoneInput.displayName = "PhoneInput";
