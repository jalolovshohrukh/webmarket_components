import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "primary" : "ghost",
        size: "iconMd",
      }),
      "h-9 w-9 rounded-md text-[13px]",
      isActive
        ? "bg-primary text-primary-foreground hover:bg-brand-200"
        : "text-text-primary",
      className
    )}
    {...props}
  />
);

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("gap-1 px-3 w-auto rounded-md", className)}
    {...props}
  >
    <ChevronLeft className="size-4" />
    <span>Prev</span>
  </PaginationLink>
);

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("gap-1 px-3 w-auto rounded-md", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="size-4" />
  </PaginationLink>
);

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center text-text-tertiary", className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);

// ---------------------------------------------------------------------------
// SmartPagination — convenience wrapper that builds the full pagination
// from `currentPage` + `totalPages` props with auto-truncation
// ---------------------------------------------------------------------------

export interface SmartPaginationProps extends React.ComponentProps<"nav"> {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  /** Number of pages around the current to always render. Default 1. */
  siblings?: number;
  /** Number of pages at start/end to always render. Default 1. */
  boundaries?: number;
}

function SmartPagination({
  currentPage,
  totalPages,
  onPageChange,
  siblings = 1,
  boundaries = 1,
  className,
  ...props
}: SmartPaginationProps) {
  const pages = React.useMemo(() => {
    const range = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const totalNumbers = siblings * 2 + boundaries * 2 + 3; // siblings + boundaries + current + 2 ellipses
    if (totalPages <= totalNumbers) {
      return range(1, totalPages);
    }
    const leftSibling = Math.max(currentPage - siblings, boundaries + 1);
    const rightSibling = Math.min(
      currentPage + siblings,
      totalPages - boundaries
    );
    const showLeftEllipsis = leftSibling > boundaries + 1;
    const showRightEllipsis = rightSibling < totalPages - boundaries;

    const result: (number | "...")[] = [];
    result.push(...range(1, boundaries));
    if (showLeftEllipsis) result.push("...");
    result.push(...range(leftSibling, rightSibling));
    if (showRightEllipsis) result.push("...");
    result.push(...range(totalPages - boundaries + 1, totalPages));
    return result;
  }, [currentPage, totalPages, siblings, boundaries]);

  const go = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange?.(page);
  };

  return (
    <Pagination className={className} {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={go(currentPage - 1)}
            className={cn(
              currentPage === 1 && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>
        {pages.map((p, i) =>
          p === "..." ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === currentPage}
                onClick={go(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={go(currentPage + 1)}
            className={cn(
              currentPage === totalPages && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  SmartPagination,
};
