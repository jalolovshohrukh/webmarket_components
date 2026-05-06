import * as React from "react";
import { Search } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const searchBarVariants = cva(
  "flex items-center w-full gap-2 rounded-xl px-1.5 transition-colors",
  {
    variants: {
      tone: {
        light:
          "bg-background border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        dark: "bg-gray-800 border border-transparent focus-within:border-primary",
      },
      size: {
        md: "h-11",
        lg: "h-12",
      },
    },
    defaultVariants: {
      tone: "light",
      size: "md",
    },
  }
);

export interface SearchBarProps
  extends Omit<
      React.FormHTMLAttributes<HTMLFormElement>,
      "onSubmit" | "onChange"
    >,
    VariantProps<typeof searchBarVariants> {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  buttonLabel?: string;
  inputName?: string;
  inputClassName?: string;
  onSubmit?: (query: string) => void;
  onChange?: (query: string) => void;
}

const SearchBar = React.forwardRef<HTMLFormElement, SearchBarProps>(
  (
    {
      tone,
      size,
      value,
      defaultValue,
      placeholder = "Search...",
      buttonLabel = "Search",
      inputName = "q",
      className,
      inputClassName,
      onSubmit,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = React.useState(defaultValue ?? "");
    const isControlled = value !== undefined;
    const current = isControlled ? value! : internal;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit?.(current);
    };

    const isDark = tone === "dark";

    return (
      <form
        ref={ref}
        role="search"
        onSubmit={handleSubmit}
        className={cn(searchBarVariants({ tone, size }), className)}
        {...props}
      >
        <span
          className={cn(
            "pl-3 flex items-center [&_svg]:size-4",
            isDark ? "text-gray-400" : "text-text-tertiary"
          )}
        >
          <Search aria-hidden="true" />
        </span>
        <input
          type="search"
          name={inputName}
          value={current}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "flex-1 h-full bg-transparent text-[14px] focus:outline-none",
            isDark
              ? "text-white placeholder:text-gray-400"
              : "text-text-primary placeholder:text-text-tertiary",
            inputClassName
          )}
        />
        <Button type="submit" variant="primary" size={size === "lg" ? "md" : "sm"}>
          {buttonLabel}
        </Button>
      </form>
    );
  }
);
SearchBar.displayName = "SearchBar";

export { SearchBar };
