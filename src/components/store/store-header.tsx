import * as React from "react";
import {
  Calendar,
  MapPin,
  MessageCircle,
  Package,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";

export interface StoreHeaderProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  tagline?: React.ReactNode;
  logoUrl?: string;
  bannerUrl?: string;
  rating?: number;
  reviewCount?: number;
  productCount?: number;
  followerCount?: number;
  joinedYear?: number | string;
  shipsFrom?: string;
  verified?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
  /** Slot for tabs / sub-nav rendered below the header. */
  children?: React.ReactNode;
}

/**
 * Top-of-page header for a store / seller profile. Banner + logo +
 * primary actions + stats row. Pass tabs as `children` to dock a
 * <Tabs> sub-nav directly below it.
 */
const StoreHeader = React.forwardRef<HTMLElement, StoreHeaderProps>(
  (
    {
      name,
      tagline,
      logoUrl,
      bannerUrl,
      rating,
      reviewCount,
      productCount,
      followerCount,
      joinedYear,
      shipsFrom,
      verified,
      isFollowing,
      onFollow,
      onMessage,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const initials = name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <section
        ref={ref}
        className={cn("overflow-hidden rounded-xl border border-gray-100 bg-card", className)}
        {...props}
      >
        <div className="relative h-32 sm:h-40 bg-gradient-to-br from-secondary via-brand-tertiary to-brand-100">
          {bannerUrl && (
            <img
              src={bannerUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
            <Avatar
              size="xl"
              className="-mt-10 size-20 ring-4 ring-card sm:-mt-14 sm:size-24"
            >
              {logoUrl && <AvatarImage src={logoUrl} alt={name} />}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-h3 font-semibold text-text-primary">
                  {name}
                </h1>
                {verified && (
                  <Badge variant="info" className="gap-1">
                    <ShieldCheck className="size-3" />
                    Verified
                  </Badge>
                )}
              </div>
              {tagline && (
                <p className="mt-1 text-[14px] text-text-secondary">{tagline}</p>
              )}
              {rating !== undefined && (
                <div className="mt-2">
                  <Rating
                    value={rating}
                    size="md"
                    showValue
                    count={reviewCount}
                  />
                </div>
              )}
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {onFollow && (
                <Button
                  variant={isFollowing ? "secondaryOutlined" : "primary"}
                  size="md"
                  onClick={onFollow}
                  aria-pressed={isFollowing}
                  iconLeft={<Users />}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              )}
              {onMessage && (
                <Button
                  variant="secondaryOutlined"
                  size="md"
                  onClick={onMessage}
                  iconLeft={<MessageCircle />}
                >
                  Message
                </Button>
              )}
            </div>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
            {productCount !== undefined && (
              <Stat
                icon={<Package />}
                label="Products"
                value={productCount.toLocaleString()}
              />
            )}
            {followerCount !== undefined && (
              <Stat
                icon={<Users />}
                label="Followers"
                value={followerCount.toLocaleString()}
              />
            )}
            {shipsFrom && (
              <Stat icon={<MapPin />} label="Ships from" value={shipsFrom} />
            )}
            {joinedYear && (
              <Stat
                icon={<Calendar />}
                label="On Webmarket since"
                value={joinedYear}
              />
            )}
          </dl>
        </div>
        {children}
      </section>
    );
  }
);
StoreHeader.displayName = "StoreHeader";

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-md bg-muted text-text-secondary [&_svg]:size-4">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] uppercase tracking-wider text-text-tertiary">
          {label}
        </dt>
        <dd className="truncate text-[14px] font-semibold text-text-primary">
          {value}
        </dd>
      </div>
    </div>
  );
}

export { StoreHeader };
