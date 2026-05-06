import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Atomic primitive — the pulse box every other skeleton is built from
// ---------------------------------------------------------------------------

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// SkeletonAvatar — for user / brand chips
// ---------------------------------------------------------------------------

const avatarSkeletonVariants = cva("animate-pulse bg-muted shrink-0", {
  variants: {
    size: {
      sm: "size-8",
      md: "size-10",
      lg: "size-12",
      xl: "size-16",
    },
    shape: {
      square: "rounded-md",
      rounded: "rounded-2xl",
    },
  },
  defaultVariants: { size: "md", shape: "rounded" },
});

export interface SkeletonAvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarSkeletonVariants> {}

function SkeletonAvatar({
  className,
  size,
  shape,
  ...props
}: SkeletonAvatarProps) {
  return (
    <div
      className={cn(avatarSkeletonVariants({ size, shape }), className)}
      aria-hidden="true"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// SkeletonText — multi-line text block; last line clipped to look natural
// ---------------------------------------------------------------------------

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  /** Width of the last line, default "60%" so the paragraph looks natural. */
  lastLineWidth?: string | number;
  lineHeight?: "sm" | "md" | "lg";
}

function SkeletonText({
  lines = 3,
  lastLineWidth = "60%",
  lineHeight = "md",
  className,
  ...props
}: SkeletonTextProps) {
  const h =
    lineHeight === "sm" ? "h-2.5" : lineHeight === "lg" ? "h-4" : "h-3";
  return (
    <div className={cn("space-y-2", className)} aria-hidden="true" {...props}>
      {Array.from({ length: lines }).map((_, i) => {
        const isLast = i === lines - 1;
        return (
          <Skeleton
            key={i}
            className={cn(h, !isLast && "w-full")}
            style={isLast ? { width: lastLineWidth } : undefined}
          />
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SkeletonHeading — title placeholder, optionally with a subtitle line
// ---------------------------------------------------------------------------

export interface SkeletonHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  withSubtitle?: boolean;
}

function SkeletonHeading({
  size = "md",
  withSubtitle = false,
  className,
  ...props
}: SkeletonHeadingProps) {
  const h = size === "sm" ? "h-4" : size === "lg" ? "h-7" : "h-5";
  return (
    <div className={cn("space-y-2", className)} aria-hidden="true" {...props}>
      <Skeleton className={cn(h, "w-3/4")} />
      {withSubtitle && <Skeleton className="h-3 w-1/2" />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SkeletonImage — image placeholder with controlled aspect ratio
// ---------------------------------------------------------------------------

const imageAspect = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  banner: "aspect-[16/5]",
} as const;

export interface SkeletonImageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  aspect?: keyof typeof imageAspect;
}

function SkeletonImage({
  aspect = "square",
  className,
  ...props
}: SkeletonImageProps) {
  return (
    <Skeleton
      className={cn(imageAspect[aspect], "w-full rounded-2xl", className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// ListItemSkeleton — avatar + 2-line text, common list row
// ---------------------------------------------------------------------------

export interface ListItemSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  avatarSize?: SkeletonAvatarProps["size"];
  showAction?: boolean;
}

function ListItemSkeleton({
  avatarSize = "md",
  showAction = false,
  className,
  ...props
}: ListItemSkeletonProps) {
  return (
    <div
      className={cn("flex items-center gap-3", className)}
      aria-hidden="true"
      {...props}
    >
      <SkeletonAvatar size={avatarSize} />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-3.5 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      {showAction && <Skeleton className="h-8 w-20 rounded-xl" />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FormFieldSkeleton — label + input placeholder
// ---------------------------------------------------------------------------

export interface FormFieldSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  withHelper?: boolean;
}

function FormFieldSkeleton({
  withHelper = false,
  className,
  ...props
}: FormFieldSkeletonProps) {
  return (
    <div
      className={cn("space-y-2 w-full", className)}
      aria-hidden="true"
      {...props}
    >
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-10 w-full rounded-md" />
      {withHelper && <Skeleton className="h-2.5 w-1/3" />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TableRowSkeleton — single row of cells
// ---------------------------------------------------------------------------

export interface TableRowSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
}

function TableRowSkeleton({
  columns = 4,
  className,
  ...props
}: TableRowSkeletonProps) {
  return (
    <div
      className={cn("flex items-center gap-4 py-3", className)}
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-3",
            i === 0 ? "w-32" : i === columns - 1 ? "w-16 ml-auto" : "flex-1"
          )}
        />
      ))}
    </div>
  );
}

export {
  Skeleton,
  SkeletonAvatar,
  SkeletonText,
  SkeletonHeading,
  SkeletonImage,
  ListItemSkeleton,
  FormFieldSkeleton,
  TableRowSkeleton,
};
