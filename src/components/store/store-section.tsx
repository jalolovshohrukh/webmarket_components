import * as React from "react";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";

export interface StoreSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  storeName: string;
  href?: string;
  logoUrl?: string;
  rating?: number;
  reviewCount?: number;
  /** Optional pitch under the name — "Free shipping over $50", etc. */
  tagline?: React.ReactNode;
  verified?: boolean;
  /** "Sponsored" / "Featured" / "Top seller" — small left-aligned chip. */
  eyebrow?: React.ReactNode;
  viewAllLabel?: string;
  /** The product strip / grid / carousel to render under the header. */
  children: React.ReactNode;
}

/**
 * Homepage feed unit for "shop this store". Compact store header (logo +
 * name + rating + view-all link) docked above whatever product
 * presentation you pass as children — typically a <ProductStrip> or a
 * grid of ProductCardCompact.
 */
const StoreSection = React.forwardRef<HTMLElement, StoreSectionProps>(
  (
    {
      storeName,
      href,
      logoUrl,
      rating,
      reviewCount,
      tagline,
      verified,
      eyebrow,
      viewAllLabel = "View shop",
      children,
      className,
      ...props
    },
    ref
  ) => {
    const initials = storeName
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <section
        ref={ref}
        className={cn(
          "overflow-hidden rounded-2xl border border-gray-100 bg-card",
          className
        )}
        {...props}
      >
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar size="lg" className="shrink-0">
              {logoUrl && <AvatarImage src={logoUrl} alt={storeName} />}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              {eyebrow && (
                <Badge variant="muted" className="mb-1">
                  {eyebrow}
                </Badge>
              )}
              <div className="flex items-center gap-1.5">
                <h3 className="truncate text-[15px] font-semibold text-text-primary">
                  {href ? (
                    <a href={href} className="hover:text-primary transition-colors">
                      {storeName}
                    </a>
                  ) : (
                    storeName
                  )}
                </h3>
                {verified && (
                  <ShieldCheck
                    className="size-4 shrink-0 text-info-500"
                    aria-label="Verified store"
                  />
                )}
              </div>
              {rating !== undefined && (
                <div className="mt-0.5">
                  <Rating
                    value={rating}
                    size="sm"
                    showValue
                    count={reviewCount}
                  />
                </div>
              )}
              {tagline && (
                <p className="mt-0.5 line-clamp-1 text-[12px] text-text-tertiary">
                  {tagline}
                </p>
              )}
            </div>
          </div>
          {href && (
            <a
              href={href}
              className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-primary hover:text-brand-700"
            >
              {viewAllLabel}
              <ChevronRight className="size-3.5" />
            </a>
          )}
        </header>
        <div className="p-4">{children}</div>
      </section>
    );
  }
);
StoreSection.displayName = "StoreSection";

export { StoreSection };
