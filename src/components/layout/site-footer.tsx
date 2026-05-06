import * as React from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";

export type FooterColumn = {
  heading: string;
  links: { label: string; href: string }[];
};

export interface SiteFooterProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  description?: React.ReactNode;
  columns?: FooterColumn[];
  social?: React.ReactNode;
  legal?: React.ReactNode;
}

const defaultBrand = (
  <span className="flex items-center text-text-primary">
    <Logo variant="wordmark" size={26} />
  </span>
);

const SiteFooter = React.forwardRef<HTMLElement, SiteFooterProps>(
  (
    {
      brand = defaultBrand,
      description,
      columns = [],
      social,
      legal,
      className,
      ...props
    },
    ref
  ) => (
    <footer
      ref={ref}
      className={cn(
        "border-t border-gray-200 bg-gray-50 text-text-secondary",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-3">
            <div>{brand}</div>
            {description && (
              <p className="text-p1 max-w-sm text-text-secondary">
                {description}
              </p>
            )}
            {social && <div className="flex items-center gap-3">{social}</div>}
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-h6 font-semibold text-text-primary mb-3">
                {col.heading}
              </h4>
              <ul className="space-y-2 text-p1">
                {col.links.map((link, i) => (
                  <li key={`${link.label}-${i}`}>
                    <a
                      href={link.href}
                      className="text-text-secondary hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {legal && (
          <div className="mt-10 border-t border-gray-200 pt-6 text-[12px] text-text-tertiary">
            {legal}
          </div>
        )}
      </div>
    </footer>
  )
);
SiteFooter.displayName = "SiteFooter";

export { SiteFooter };
