import { ChevronRight, MessageCircle, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface SellerCardProps {
  name: string;
  href?: string;
  avatarUrl?: string;
  rating?: number;
  reviewCount?: number;
  shipsFrom?: string;
  responseTime?: string;
  verified?: boolean;
  onMessage?: () => void;
  className?: string;
}

function SellerCard({
  name,
  href,
  avatarUrl,
  rating,
  reviewCount,
  shipsFrom,
  responseTime,
  verified,
  onMessage,
  className,
}: SellerCardProps) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-start gap-3">
        <Avatar size="lg">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="truncate text-[15px] font-semibold text-text-primary">
              {href ? (
                <a href={href} className="hover:text-primary">
                  {name}
                </a>
              ) : (
                name
              )}
            </h4>
            {verified && (
              <Badge variant="info" className="gap-1">
                <ShieldCheck className="size-3" />
                Verified
              </Badge>
            )}
          </div>
          {rating !== undefined && (
            <div className="mt-1">
              <Rating
                value={rating}
                size="sm"
                showValue
                count={reviewCount}
              />
            </div>
          )}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] text-text-tertiary">
            {shipsFrom && <span>Ships from {shipsFrom}</span>}
            {responseTime && <span>Responds in {responseTime}</span>}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {href && (
          <Button variant="secondary" size="sm" asChild className="flex-1">
            <a href={href}>
              Visit shop
              <ChevronRight />
            </a>
          </Button>
        )}
        {onMessage && (
          <Button
            variant="primaryOutlined"
            size="sm"
            iconLeft={<MessageCircle />}
            onClick={onMessage}
          >
            Message
          </Button>
        )}
      </div>
    </Card>
  );
}

export { SellerCard };
