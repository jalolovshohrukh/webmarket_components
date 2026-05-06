import * as React from "react";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      className={cn(
        "flex flex-col items-center justify-center text-center px-6 py-12 gap-3",
        className
      )}
      {...props}
    >
      <div className="grid size-14 place-items-center rounded-2xl bg-secondary text-primary [&_svg]:size-7">
        {icon ?? <PackageOpen aria-hidden="true" />}
      </div>
      <h3 className="text-h4 font-semibold text-text-primary">{title}</h3>
      {description && (
        <p className="text-p1 text-text-secondary max-w-sm">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
