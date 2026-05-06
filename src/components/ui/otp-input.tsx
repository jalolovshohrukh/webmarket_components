import * as React from "react";
import { cn } from "@/lib/utils";

export interface OtpInputProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
}

const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      length = 6,
      value,
      defaultValue = "",
      onChange,
      onComplete,
      autoFocus,
      disabled,
      invalid,
      className,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState(defaultValue.slice(0, length));
    const current = (isControlled ? value : internal).slice(0, length);
    const inputs = React.useRef<(HTMLInputElement | null)[]>([]);

    const update = (next: string) => {
      const trimmed = next.slice(0, length);
      if (!isControlled) setInternal(trimmed);
      onChange?.(trimmed);
      if (trimmed.length === length) onComplete?.(trimmed);
    };

    const handleChange = (i: number, raw: string) => {
      const digit = raw.replace(/\D/g, "").slice(-1);
      if (!digit) return;
      const arr = current.split("");
      arr[i] = digit;
      const merged = arr.join("").padEnd(i + 1, "");
      update(merged);
      if (i < length - 1) inputs.current[i + 1]?.focus();
    };

    const handleKeyDown = (
      i: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace") {
        if (current[i]) {
          const arr = current.split("");
          arr[i] = "";
          update(arr.join(""));
        } else if (i > 0) {
          inputs.current[i - 1]?.focus();
          const arr = current.split("");
          arr[i - 1] = "";
          update(arr.join(""));
        }
        e.preventDefault();
      } else if (e.key === "ArrowLeft" && i > 0) {
        inputs.current[i - 1]?.focus();
      } else if (e.key === "ArrowRight" && i < length - 1) {
        inputs.current[i + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
      if (!pasted) return;
      e.preventDefault();
      update(pasted);
      const idx = Math.min(pasted.length, length - 1);
      inputs.current[idx]?.focus();
    };

    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => (inputs.current[i] = el)}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={current[i] ?? ""}
            disabled={disabled}
            autoFocus={autoFocus && i === 0}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={cn(
              "h-12 w-10 rounded-md border bg-background text-center text-[18px] font-semibold tabular-nums text-text-primary",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              invalid
                ? "border-danger focus:border-danger focus:ring-danger/20"
                : "border-gray-200 focus:border-primary",
              disabled && "bg-gray-50 cursor-not-allowed"
            )}
          />
        ))}
      </div>
    );
  }
);
OtpInput.displayName = "OtpInput";

export { OtpInput };
