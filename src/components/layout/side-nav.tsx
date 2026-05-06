import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export type SideNavItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
};

export interface SideNavProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  items: SideNavItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function SideNavContent({ items }: { items: SideNavItem[] }) {
  return (
    <nav aria-label="Sidebar" className="flex flex-col gap-1">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-[14px] font-medium transition-colors",
            "text-text-secondary hover:bg-secondary hover:text-primary",
            item.active && "bg-secondary text-primary"
          )}
        >
          {item.icon && (
            <span className="[&_svg]:size-4 shrink-0">{item.icon}</span>
          )}
          <span className="truncate">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

const SideNav = React.forwardRef<HTMLElement, SideNavProps>(
  (
    { title = "Menu", items, open = false, onOpenChange, className, ...props },
    ref
  ) => {
    const isMobile = useIsMobile();

    if (isMobile) {
      return (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>{title}</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <SideNavContent items={items} />
            </div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <aside
        ref={ref}
        className={cn(
          "hidden lg:block w-64 shrink-0 border-r border-gray-200 bg-background p-4",
          className
        )}
        {...props}
      >
        {title && (
          <div className="text-h6 font-semibold text-text-primary mb-3">
            {title}
          </div>
        )}
        <SideNavContent items={items} />
      </aside>
    );
  }
);
SideNav.displayName = "SideNav";

export { SideNav };
