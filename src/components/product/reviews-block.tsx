import * as React from "react";
import { ThumbsUp, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface Review {
  id: string;
  authorName: string;
  authorAvatarUrl?: string;
  date: string | Date;
  rating: number;
  title?: React.ReactNode;
  body: React.ReactNode;
  photos?: string[];
  verifiedPurchase?: boolean;
  helpfulCount?: number;
  onHelpful?: () => void;
}

export interface ReviewsBlockProps {
  averageRating: number;
  totalReviews: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  reviews: Review[];
  onWriteReview?: () => void;
  onSeeMore?: () => void;
  className?: string;
}

function ReviewsBlock({
  averageRating,
  totalReviews,
  distribution,
  reviews,
  onWriteReview,
  onSeeMore,
  className,
}: ReviewsBlockProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        <Card className="p-5 text-center">
          <div className="text-h1 font-semibold tabular-nums text-text-primary">
            {averageRating.toFixed(1)}
          </div>
          <div className="mt-1 flex items-center justify-center">
            <Rating value={averageRating} size="md" />
          </div>
          <p className="mt-1 text-[13px] text-text-tertiary">
            Based on {totalReviews.toLocaleString()} reviews
          </p>
          {onWriteReview && (
            <Button
              variant="primary"
              size="sm"
              className="mt-4 w-full"
              onClick={onWriteReview}
            >
              Write a review
            </Button>
          )}
        </Card>
        <div className="flex flex-col justify-center gap-1.5">
          {([5, 4, 3, 2, 1] as const).map((stars) => {
            const count = distribution[stars] ?? 0;
            const pct = totalReviews ? (count / totalReviews) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-12 text-right text-[12px] text-text-secondary tabular-nums">
                  {stars} stars
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-warning-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-12 text-[12px] text-text-tertiary tabular-nums">
                  {count.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <ul className="space-y-4">
        {reviews.map((r) => (
          <li key={r.id}>
            <ReviewItem review={r} />
          </li>
        ))}
      </ul>

      {onSeeMore && reviews.length < totalReviews && (
        <Button variant="secondary" onClick={onSeeMore} className="w-full">
          Show more reviews
        </Button>
      )}
    </div>
  );
}

function ReviewItem({ review }: { review: Review }) {
  const initials = review.authorName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const dateStr =
    review.date instanceof Date
      ? review.date.toLocaleDateString()
      : review.date;

  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <Avatar size="md">
          {review.authorAvatarUrl && (
            <AvatarImage src={review.authorAvatarUrl} alt={review.authorName} />
          )}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[14px] font-medium text-text-primary">
              {review.authorName}
            </span>
            {review.verifiedPurchase && (
              <Badge variant="success" className="gap-1">
                <ShieldCheck className="size-3" />
                Verified buyer
              </Badge>
            )}
            <span className="text-[12px] text-text-tertiary">{dateStr}</span>
          </div>
          <div className="mt-1">
            <Rating value={review.rating} size="sm" />
          </div>
          {review.title && (
            <h4 className="mt-2 text-[14px] font-semibold text-text-primary">
              {review.title}
            </h4>
          )}
          <div className="mt-1 text-[13px] leading-5 text-text-secondary">
            {review.body}
          </div>
          {review.photos && review.photos.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {review.photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="size-16 rounded-md object-cover"
                />
              ))}
            </div>
          )}
          <div className="mt-3 flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              iconLeft={<ThumbsUp />}
              onClick={review.onHelpful}
            >
              Helpful{" "}
              {review.helpfulCount !== undefined && `(${review.helpfulCount})`}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export interface ReviewsBlockSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  reviewCount?: number;
}

const ReviewsBlockSkeleton = React.forwardRef<
  HTMLDivElement,
  ReviewsBlockSkeletonProps
>(({ reviewCount = 2, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-6", className)}
    aria-busy="true"
    aria-live="polite"
    {...props}
  >
    <div className="grid gap-6 md:grid-cols-[260px_1fr]">
      <Card className="p-5">
        <Skeleton className="mx-auto h-12 w-20" />
        <Skeleton className="mx-auto mt-3 h-4 w-32" />
        <Skeleton className="mx-auto mt-2 h-3 w-40" />
        <Skeleton className="mt-4 h-9 w-full rounded-md" />
      </Card>
      <div className="flex flex-col justify-center gap-1.5">
        {[5, 4, 3, 2, 1].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-2 flex-1 rounded-full" />
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </div>
    </div>
    <ul className="space-y-4">
      {Array.from({ length: reviewCount }).map((_, i) => (
        <li key={i}>
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-20 rounded-md" />
                </div>
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-4 w-3/5" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  </div>
));
ReviewsBlockSkeleton.displayName = "ReviewsBlockSkeleton";

export { ReviewsBlock, ReviewsBlockSkeleton, ReviewItem };
