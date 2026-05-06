import * as React from "react";
import { ChevronRight, MapPin, Package, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

export interface StoreSummary {
  id: string;
  name: string;
  href?: string;
  logoUrl?: string;
  bannerUrl?: string;
  rating?: number;
  reviewCount?: number;
  productCount?: number;
  shipsFrom?: string;
  /** Short pitch / category line. */
  tagline?: React.ReactNode;
  verified?: boolean;
  tags?: string[];
}

export interface StoreCardProps extends React.HTMLAttributes<HTMLDivElement> {
  store: StoreSummary;
  onFollow?: (store: StoreSummary) => void;
  isFollowing?: boolean;
  variant?: "default" | "compact";
}

/**
 * Directory tile for a marketplace store / seller. Drop in a grid for an
 * "All shops" page, or stand alone in a sidebar.
 */
const StoreCard = React.forwardRef<HTMLDivElement, StoreCardProps>(
  (
    { store, onFollow, isFollowing, variant = "default", className, ...props },
    ref
  ) => {
    const initials = store.name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    const compact = variant === "compact";

    return (
      <Card ref={ref} className={cn("overflow-hidden", className)} {...props}>
        {!compact && (
          <div className="relative h-20 bg-gradient-to-br from-secondary via-brand-tertiary to-brand-100">
            {store.bannerUrl && (
              <img
                src={store.bannerUrl}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            )}
          </div>
        )}
        <div className={cn("p-4", !compact && "-mt-7")}>
          <div className="flex items-start gap-3">
            <Avatar
              size={compact ? "md" : "lg"}
              className={cn(
                !compact && "ring-4 ring-card",
                "shrink-0"
              )}
            >
              {store.logoUrl && (
                <AvatarImage src={store.logoUrl} alt={store.name} />
              )}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 pt-1">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate text-[15px] font-semibold text-text-primary">
                  {store.href ? (
                    <a href={store.href} className="hover:text-primary transition-colors">
                      {store.name}
                    </a>
                  ) : (
                    store.name
                  )}
                </h3>
                {store.verified && (
                  <ShieldCheck
                    className="size-4 shrink-0 text-info-500"
                    aria-label="Verified store"
                  />
                )}
              </div>
              {store.tagline && (
                <p className="mt-0.5 line-clamp-1 text-[12px] text-text-tertiary">
                  {store.tagline}
                </p>
              )}
              {store.rating !== undefined && (
                <div className="mt-1">
                  <Rating
                    value={store.rating}
                    size="sm"
                    showValue
                    count={store.reviewCount}
                  />
                </div>
              )}
            </div>
          </div>

          {(store.productCount !== undefined || store.shipsFrom) && (
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-text-tertiary">
              {store.productCount !== undefined && (
                <span className="inline-flex items-center gap-1">
                  <Package className="size-3.5" />
                  {store.productCount.toLocaleString()} products
                </span>
              )}
              {store.shipsFrom && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {store.shipsFrom}
                </span>
              )}
            </div>
          )}

          {store.tags && store.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {store.tags.map((t) => (
                <Tag key={t} variant="outline" size="sm">
                  {t}
                </Tag>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-2">
            {store.href && (
              <Button variant="secondary" size="sm" asChild className="flex-1">
                <a href={store.href}>
                  Visit shop
                  <ChevronRight />
                </a>
              </Button>
            )}
            {onFollow && (
              <Button
                variant={isFollowing ? "secondaryOutlined" : "primaryOutlined"}
                size="sm"
                onClick={() => onFollow(store)}
                aria-pressed={isFollowing}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }
);
StoreCard.displayName = "StoreCard";

export { StoreCard };
export { type StoreSummary as StoreCardData };
