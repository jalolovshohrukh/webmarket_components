import * as React from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => void | Promise<void>;
  onBack?: () => void;
  signInHref?: string;
  error?: React.ReactNode;
  className?: string;
}

function ForgotPasswordForm({
  onSubmit,
  onBack,
  signInHref,
  error,
  className,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit?.(email);
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className={cn("p-6 md:p-8 max-w-md", className)}>
      {(onBack || signInHref) && (
        <Button
          type="button"
          variant="text"
          size="sm"
          iconLeft={<ArrowLeft />}
          className="!px-1"
          {...(signInHref ? { asChild: true } : { onClick: onBack })}
        >
          {signInHref ? <a href={signInHref}>Back to sign in</a> : "Back"}
        </Button>
      )}
      <h1 className="mt-2 text-h3 font-semibold text-text-primary">
        {sent ? "Check your inbox" : "Reset your password"}
      </h1>
      <p className="mt-1 text-[13px] text-text-secondary">
        {sent
          ? `We've sent a reset link to ${email}. The link expires in 1 hour.`
          : "Enter your email and we'll send you a link to reset your password."}
      </p>
      {!sent && (
        <form onSubmit={submit} className="mt-5 space-y-3">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            iconLeft={<Mail />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error ? String(error) : undefined}
          />
          <Button
            type="submit"
            className="w-full"
            loading={submitting}
            disabled={!/\S+@\S+\.\S+/.test(email)}
          >
            Send reset link
          </Button>
        </form>
      )}
      {sent && (
        <Button
          type="button"
          variant="secondary"
          className="mt-4 w-full"
          onClick={() => setSent(false)}
        >
          Use a different email
        </Button>
      )}
    </Card>
  );
}

export { ForgotPasswordForm };
