import * as React from "react";
import { Bell, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Notification {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  date: string;
  href?: string;
  read?: boolean;
}

export interface NotificationBellProps {
  notifications: Notification[];
  onMarkAllRead?: () => void;
  onItemClick?: (n: Notification) => void;
  emptyMessage?: React.ReactNode;
  className?: string;
}

function NotificationBell({
  notifications,
  onMarkAllRead,
  onItemClick,
  emptyMessage = "You're all caught up.",
  className,
}: NotificationBellProps) {
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={
            unread > 0
              ? `${unread} unread notifications`
              : "Notifications"
          }
          className={cn(
            "relative grid size-9 place-items-center rounded-md text-text-secondary hover:bg-muted hover:text-text-primary transition-colors",
            className
          )}
        >
          <Bell className="size-4" />
          {unread > 0 && (
            <span className="absolute right-1 top-1 grid h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between gap-2 px-4 py-2.5">
          <DropdownMenuLabel className="p-0">
            Notifications
            {unread > 0 && (
              <Badge variant="default" className="ml-2">
                {unread}
              </Badge>
            )}
          </DropdownMenuLabel>
          {onMarkAllRead && unread > 0 && (
            <Button
              variant="text"
              size="sm"
              iconLeft={<Check />}
              onClick={onMarkAllRead}
              className="!px-2"
            >
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator className="m-0" />
        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center text-[13px] text-text-tertiary">
            {emptyMessage}
          </div>
        ) : (
          <ul className="max-h-80 overflow-auto">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <a
                  href={n.href ?? "#"}
                  onClick={(e) => {
                    if (!n.href) e.preventDefault();
                    onItemClick?.(n);
                  }}
                  className={cn(
                    "block px-4 py-3 text-left transition-colors hover:bg-muted",
                    !n.read && "bg-secondary/40"
                  )}
                >
                  <div className="flex items-start gap-2">
                    {!n.read && (
                      <span
                        className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
                        aria-hidden
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-medium text-text-primary">
                        {n.title}
                      </div>
                      {n.description && (
                        <div className="mt-0.5 line-clamp-2 text-[12px] text-text-secondary">
                          {n.description}
                        </div>
                      )}
                      <div className="mt-1 text-[11px] text-text-tertiary">
                        {n.date}
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { NotificationBell };
