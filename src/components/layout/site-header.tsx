import * as React from "react";
import { Heart, List, Menu, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchBar } from "@/components/forms/search-bar";
import { MainNav, type NavLink } from "@/components/layout/main-nav";

type ActionItem = {
  label: string;
  icon: React.ReactNode;
  href?: string;
  badgeCount?: number;
  onClick?: () => void;
};

export interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  navLinks?: NavLink[];
  actions?: ActionItem[];
  catalogLabel?: string;
  onCatalogClick?: () => void;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

const defaultBrand = (
  <span className="flex items-center text-white">
    <Logo variant="wordmark" size={28} />
  </span>
);

const defaultActions: ActionItem[] = [
  { label: "Profile", icon: <User aria-hidden="true" />, href: "#profile" },
  { label: "Wishlist", icon: <Heart aria-hidden="true" />, href: "#wishlist" },
  { label: "Cart", icon: <ShoppingCart aria-hidden="true" />, href: "#cart" },
];

function ActionLink({
  action,
  variant,
}: {
  action: ActionItem;
  variant: "stacked" | "row";
}) {
  const content = (
    <>
      <span className="relative inline-flex [&_svg]:size-5">
        {action.icon}
        {action.badgeCount && action.badgeCount > 0 ? (
          <span className="absolute -right-1.5 -top-1.5 grid min-w-[18px] place-items-center rounded-md bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
            {action.badgeCount}
          </span>
        ) : null}
      </span>
      <span className={cn(variant === "stacked" ? "text-[12px]" : "text-[14px]")}>
        {action.label}
      </span>
    </>
  );
  const className = cn(
    "inline-flex items-center text-white/90 hover:text-white transition-colors",
    variant === "stacked" ? "flex-col gap-1" : "flex-row gap-2"
  );
  if (action.href) {
    return (
      <a href={action.href} className={className}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={action.onClick} className={className}>
      {content}
    </button>
  );
}

const SiteHeader = React.forwardRef<HTMLElement, SiteHeaderProps>(
  (
    {
      brand = defaultBrand,
      navLinks = [],
      actions = defaultActions,
      catalogLabel = "Catalog",
      onCatalogClick,
      onSearch,
      searchPlaceholder = "Search products...",
      className,
      ...props
    },
    ref
  ) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-40 w-full bg-gray-900 text-white shadow-sm",
          className
        )}
        {...props}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 md:gap-4 md:px-6 lg:gap-6">
          {/* Mobile menu trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-gray-900 text-white border-gray-800">
              <SheetHeader>
                <SheetTitle className="text-white">Webmarket</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-3">
                <Button
                  variant="primaryOutlined"
                  className="border-white/30 text-white"
                  iconLeft={<List />}
                  onClick={() => {
                    setMobileOpen(false);
                    onCatalogClick?.();
                  }}
                >
                  {catalogLabel}
                </Button>
                <SearchBar
                  tone="dark"
                  onSubmit={(q) => {
                    setMobileOpen(false);
                    onSearch?.(q);
                  }}
                  placeholder={searchPlaceholder}
                />
                {navLinks.length > 0 && (
                  <MainNav
                    links={navLinks}
                    orientation="vertical"
                    tone="dark"
                  />
                )}
                <div className="mt-2 flex flex-col gap-1">
                  {actions.map((action) => (
                    <a
                      key={action.label}
                      href={action.href ?? "#"}
                      onClick={(e) => {
                        if (!action.href) e.preventDefault();
                        action.onClick?.();
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-white/90 hover:bg-white/10"
                    >
                      <span className="[&_svg]:size-5">{action.icon}</span>
                      <span className="text-[14px]">{action.label}</span>
                      {action.badgeCount && action.badgeCount > 0 ? (
                        <span className="ml-auto rounded-md bg-primary px-2 text-[12px] font-semibold">
                          {action.badgeCount}
                        </span>
                      ) : null}
                    </a>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Brand */}
          <a href="#" className="shrink-0">
            {brand}
          </a>

          {/* Catalog button — hidden on mobile (lives in sheet) */}
          <Button
            variant="primaryOutlined"
            size="md"
            className="hidden md:inline-flex border-white/30 text-white hover:bg-white/10"
            iconLeft={<List />}
            onClick={onCatalogClick}
          >
            {catalogLabel}
          </Button>

          {/* Search bar — hidden on small mobile */}
          <div className="hidden md:flex flex-1">
            <SearchBar
              tone="dark"
              onSubmit={onSearch}
              placeholder={searchPlaceholder}
            />
          </div>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-4 md:gap-6">
            {actions.map((action) => (
              <ActionLink key={action.label} action={action} variant="stacked" />
            ))}
          </div>
        </div>
      </header>
    );
  }
);
SiteHeader.displayName = "SiteHeader";

export { SiteHeader };
