import * as React from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface SignInValue {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignInFormProps {
  onSubmit?: (value: SignInValue) => void | Promise<void>;
  onForgotPassword?: () => void;
  onSocialSignIn?: (provider: "google" | "apple" | "facebook") => void;
  socialProviders?: Array<"google" | "apple" | "facebook">;
  signUpHref?: string;
  error?: React.ReactNode;
  className?: string;
}

const providerLabels: Record<string, string> = {
  google: "Continue with Google",
  apple: "Continue with Apple",
  facebook: "Continue with Facebook",
};

function SignInForm({
  onSubmit,
  onForgotPassword,
  onSocialSignIn,
  socialProviders = ["google", "apple"],
  signUpHref,
  error,
  className,
}: SignInFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [showPwd, setShowPwd] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit?.({ email, password, remember });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className={cn("p-6 md:p-8", className)}>
      <div className="text-center">
        <h1 className="text-h3 font-semibold text-text-primary">Sign in</h1>
        <p className="mt-1 text-[13px] text-text-tertiary">
          Welcome back to Webmarket.
        </p>
      </div>

      {socialProviders.length > 0 && (
        <>
          <div className="mt-5 space-y-2">
            {socialProviders.map((p) => (
              <Button
                key={p}
                type="button"
                variant="secondaryOutlined"
                className="w-full"
                onClick={() => onSocialSignIn?.(p)}
              >
                {providerLabels[p]}
              </Button>
            ))}
          </div>
          <div className="my-5 flex items-center gap-3 text-[12px] text-text-tertiary">
            <Separator className="flex-1" />
            or sign in with email
            <Separator className="flex-1" />
          </div>
        </>
      )}

      <form onSubmit={submit} className="space-y-3">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          required
          iconLeft={<Mail />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type={showPwd ? "text" : "password"}
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          iconRight={
            <button
              type="button"
              aria-label={showPwd ? "Hide password" : "Show password"}
              onClick={() => setShowPwd((s) => !s)}
              className="pointer-events-auto grid place-items-center text-text-tertiary hover:text-text-primary"
            >
              {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          }
          error={error ? String(error) : undefined}
        />
        <div className="flex items-center justify-between">
          <CheckboxField
            label="Remember me"
            checked={remember}
            onCheckedChange={(c) => setRemember(c === true)}
          />
          {onForgotPassword && (
            <Button
              type="button"
              variant="text"
              size="sm"
              onClick={onForgotPassword}
              className="!px-0"
            >
              Forgot password?
            </Button>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          loading={submitting}
          disabled={!email || !password}
        >
          Sign in
        </Button>
      </form>

      {signUpHref && (
        <p className="mt-4 text-center text-[13px] text-text-secondary">
          New here?{" "}
          <a
            href={signUpHref}
            className="font-medium text-primary hover:text-brand-700"
          >
            Create an account
          </a>
        </p>
      )}
    </Card>
  );
}

export { SignInForm };
