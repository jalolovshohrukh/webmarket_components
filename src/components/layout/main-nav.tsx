import * as React from "react";
import { cn } from "@/lib/utils";

export type NavLink = {
  label: string;
  href: string;
  active?: boolean;
};

export interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  links: NavLink[];
  orientation?: "horizontal" | "vertical";
  tone?: "light" | "dark";
}

const MainNav = React.forwardRef<HTMLElement, MainNavProps>(
  (
    { links, orientation = "horizontal", tone = "light", className, ...props },
    ref
  ) => (
    <nav
      ref={ref}
      aria-label="Main"
      className={cn(
        "flex",
        orientation === "horizontal"
          ? "flex-row items-center gap-1"
          : "flex-col gap-1",
        className
      )}
      {...props}
    >
      {links.map((link) => {
        const colorClasses =
          tone === "dark"
            ? "text-white/80 hover:text-white hover:bg-white/10"
            : "text-text-primary hover:bg-secondary hover:text-primary";
        const activeClasses =
          tone === "dark"
            ? "text-white bg-white/10"
            : "text-primary bg-secondary";
        return (
          <a
            key={link.href}
            href={link.href}
            aria-current={link.active ? "page" : undefined}
            className={cn(
              "inline-flex items-center px-3 py-2 rounded-md text-[14px] font-medium transition-colors",
              colorClasses,
              link.active && activeClasses,
              orientation === "vertical" && "w-full"
            )}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  )
);
MainNav.displayName = "MainNav";

export { MainNav };
