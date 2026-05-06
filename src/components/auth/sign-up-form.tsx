import * as React from "react";
import { Mail, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export interface SignUpValue {
  fullName: string;
  email: string;
  password: string;
  agree: boolean;
  newsletter: boolean;
}

export interface SignUpFormProps {
  onSubmit?: (value: SignUpValue) => void | Promise<void>;
  signInHref?: string;
  termsHref?: string;
  privacyHref?: string;
  error?: React.ReactNode;
  className?: string;
}

function passwordStrength(pwd: string): {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
} {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return {
    score: score as 0 | 1 | 2 | 3 | 4,
    label: ["Too short", "Weak", "Fair", "Good", "Strong"][score]!,
  };
}

const strengthColor = [
  "bg-gray-200",
  "bg-danger-500",
  "bg-warning-500",
  "bg-info-500",
  "bg-success-500",
];

function SignUpForm({
  onSubmit,
  signInHref,
  termsHref = "#terms",
  privacyHref = "#privacy",
  error,
  className,
}: SignUpFormProps) {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const strength = passwordStrength(password);
  const valid =
    fullName.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(email) &&
    strength.score >= 2 &&
    agree;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    try {
      await onSubmit?.({ fullName, email, password, agree, newsletter });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className={cn("p-6 md:p-8", className)}>
      <div className="text-center">
        <h1 className="text-h3 font-semibold text-text-primary">
          Create an account
        </h1>
        <p className="mt-1 text-[13px] text-text-tertiary">
          Join Webmarket to track orders and save favorites.
        </p>
      </div>

      <form onSubmit={submit} className="mt-5 space-y-3">
        <Input
          label="Full name"
          autoComplete="name"
          required
          iconLeft={<User />}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          required
          iconLeft={<Mail />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error ? String(error) : undefined}
          />
          {password && (
            <div className="mt-1.5">
              <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full",
                      i < strength.score
                        ? strengthColor[strength.score]
                        : "bg-gray-200"
                    )}
                  />
                ))}
              </div>
              <p className="mt-1 text-[11px] text-text-tertiary">
                Strength: {strength.label}
              </p>
            </div>
          )}
        </div>
        <CheckboxField
          checked={agree}
          onCheckedChange={(c) => setAgree(c === true)}
          label={
            <>
              I agree to the{" "}
              <a href={termsHref} className="text-primary hover:text-brand-700">
                Terms
              </a>{" "}
              and{" "}
              <a
                href={privacyHref}
                className="text-primary hover:text-brand-700"
              >
                Privacy Policy
              </a>
            </>
          }
        />
        <CheckboxField
          checked={newsletter}
          onCheckedChange={(c) => setNewsletter(c === true)}
          label="Send me product updates and promotions"
        />
        <Button
          type="submit"
          className="w-full"
          loading={submitting}
          disabled={!valid}
        >
          Create account
        </Button>
      </form>

      {signInHref && (
        <p className="mt-4 text-center text-[13px] text-text-secondary">
          Already have an account?{" "}
          <a
            href={signInHref}
            className="font-medium text-primary hover:text-brand-700"
          >
            Sign in
          </a>
        </p>
      )}
    </Card>
  );
}

export { SignUpForm };
