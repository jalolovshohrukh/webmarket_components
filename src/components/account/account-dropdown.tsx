import * as React from "react";
import {
  ChevronDown,
  Heart,
  LogOut,
  Package,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface AccountUser {
  name: string;
  email?: string;
  avatarUrl?: string;
}

export interface AccountAction {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  onSelect?: () => void;
  destructive?: boolean;
}

export interface AccountDropdownProps {
  user: AccountUser;
  actions?: AccountAction[];
  onSignOut?: () => void;
  showName?: boolean;
  className?: string;
}

const defaultActions: AccountAction[] = [
  { id: "profile", label: "Profile", icon: <User />, href: "#profile" },
  { id: "orders", label: "Orders", icon: <Package />, href: "#orders" },
  { id: "wishlist", label: "Wishlist", icon: <Heart />, href: "#wishlist" },
  { id: "settings", label: "Settings", icon: <Settings />, href: "#settings" },
];

function AccountDropdown({
  user,
  actions = defaultActions,
  onSignOut,
  showName = false,
  className,
}: AccountDropdownProps) {
  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-muted transition-colors",
            className
          )}
        >
          <Avatar size="sm">
            {user.avatarUrl && (
              <AvatarImage src={user.avatarUrl} alt={user.name} />
            )}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {showName && (
            <span className="text-[13px] font-medium text-text-primary">
              {user.name.split(" ")[0]}
            </span>
          )}
          <ChevronDown className="size-3.5 text-text-tertiary" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex items-center gap-2.5 px-2 py-2">
          <Avatar size="md">
            {user.avatarUrl && (
              <AvatarImage src={user.avatarUrl} alt={user.name} />
            )}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="truncate text-[13px] font-medium text-text-primary">
              {user.name}
            </div>
            {user.email && (
              <div className="truncate text-[12px] text-text-tertiary">
                {user.email}
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((a) =>
          a.href ? (
            <DropdownMenuItem key={a.id} asChild>
              <a href={a.href} onClick={a.onSelect}>
                {a.icon}
                {a.label}
              </a>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem key={a.id} onSelect={a.onSelect}>
              {a.icon}
              {a.label}
            </DropdownMenuItem>
          )
        )}
        {onSignOut && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onSignOut} className="text-danger">
              <LogOut />
              Sign out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { AccountDropdown };
