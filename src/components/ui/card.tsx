import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Skeleton,
  SkeletonHeading,
  SkeletonText,
} from "@/components/ui/skeleton";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-gray-100 bg-card text-card-foreground shadow-sm overflow-hidden",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 p-4 md:p-5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-h5 font-semibold tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-p1 text-text-secondary", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 md:p-5 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 md:p-5 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export interface CardSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  withFooter?: boolean;
  textLines?: number;
}

const CardSkeleton = React.forwardRef<HTMLDivElement, CardSkeletonProps>(
  ({ className, withFooter = false, textLines = 3, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-gray-100 bg-card overflow-hidden",
        className
      )}
      aria-busy="true"
      aria-live="polite"
      {...props}
    >
      <div className="p-4 md:p-5 space-y-3">
        <SkeletonHeading withSubtitle />
      </div>
      <div className="p-4 md:p-5 pt-0">
        <SkeletonText lines={textLines} />
      </div>
      {withFooter && (
        <div className="p-4 md:p-5 pt-0 flex items-center justify-end gap-2">
          <Skeleton className="h-9 w-20 rounded-xl" />
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
      )}
    </div>
  )
);
CardSkeleton.displayName = "CardSkeleton";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardSkeleton,
};
