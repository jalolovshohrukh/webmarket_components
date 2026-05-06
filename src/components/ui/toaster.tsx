import {
  AlertTriangle,
  CheckCircle2,
  Info as InfoIcon,
  XCircle,
} from "lucide-react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Variant = "default" | "success" | "destructive" | "warning" | "info";

const iconStyles: Record<Variant, { icon: React.ElementType | null; color: string }> = {
  default: { icon: null, color: "" },
  success: { icon: CheckCircle2, color: "text-success-600" },
  destructive: { icon: XCircle, color: "text-danger-600" },
  warning: { icon: AlertTriangle, color: "text-warning-600" },
  info: { icon: InfoIcon, color: "text-info-600" },
};

export function Toaster() {
  const { toasts } = useToast();
  return (
    <ToastProvider duration={5000} swipeDirection="right">
      {toasts.map(({ id, title, description, action, variant, ...props }) => {
        const v = (variant ?? "default") as Variant;
        const { icon: Icon, color } = iconStyles[v];
        return (
          <Toast key={id} variant={v} {...props}>
            {Icon && (
              <span
                className={cn(
                  "mt-0.5 flex shrink-0 items-center justify-center [&_svg]:size-5",
                  color
                )}
                aria-hidden="true"
              >
                <Icon />
              </span>
            )}
            <div className="grid min-w-0 flex-1 gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
