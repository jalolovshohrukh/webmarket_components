import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/ui/otp-input";
import { cn } from "@/lib/utils";

export interface OtpFormProps {
  destination: React.ReactNode;
  length?: number;
  resendSeconds?: number;
  onSubmit?: (code: string) => void | Promise<void>;
  onResend?: () => void | Promise<void>;
  onChangeDestination?: () => void;
  error?: React.ReactNode;
  className?: string;
}

function OtpForm({
  destination,
  length = 6,
  resendSeconds = 30,
  onSubmit,
  onResend,
  onChangeDestination,
  error,
  className,
}: OtpFormProps) {
  const [code, setCode] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(resendSeconds);

  React.useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (code.length < length) return;
    setSubmitting(true);
    try {
      await onSubmit?.(code);
    } finally {
      setSubmitting(false);
    }
  };

  const resend = async () => {
    await onResend?.();
    setSecondsLeft(resendSeconds);
  };

  return (
    <Card className={cn("p-6 md:p-8 max-w-md", className)}>
      <div className="text-center">
        <h1 className="text-h3 font-semibold text-text-primary">
          Enter verification code
        </h1>
        <p className="mt-2 text-[13px] text-text-secondary">
          We sent a {length}-digit code to{" "}
          <span className="font-medium text-text-primary">{destination}</span>.
        </p>
        {onChangeDestination && (
          <Button
            type="button"
            variant="text"
            size="sm"
            onClick={onChangeDestination}
            className="mt-1 !px-1"
          >
            Use a different one
          </Button>
        )}
      </div>
      <form onSubmit={submit} className="mt-6 space-y-5">
        <div className="flex justify-center">
          <OtpInput
            length={length}
            value={code}
            onChange={setCode}
            onComplete={(c) => {
              setCode(c);
              onSubmit?.(c);
            }}
            invalid={Boolean(error)}
            autoFocus
          />
        </div>
        {error && (
          <p className="text-center text-[12px] text-danger">{error}</p>
        )}
        <Button
          type="submit"
          className="w-full"
          loading={submitting}
          disabled={code.length < length}
        >
          Verify
        </Button>
      </form>
      <p className="mt-5 text-center text-[13px] text-text-secondary">
        Didn't receive a code?{" "}
        {secondsLeft > 0 ? (
          <span className="text-text-tertiary">
            Resend in {secondsLeft}s
          </span>
        ) : (
          <Button
            type="button"
            variant="text"
            size="sm"
            onClick={resend}
            className="!px-1"
          >
            Resend
          </Button>
        )}
      </p>
    </Card>
  );
}

export { OtpForm };
