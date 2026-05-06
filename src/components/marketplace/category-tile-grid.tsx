import * as React from "react";
import { cn } from "@/lib/utils";

export interface CategoryTile {
  id: string;
  label: string;
  href?: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  count?: number;
}

export interface CategoryTileGridProps {
  tiles: CategoryTile[];
  columns?: 2 | 3 | 4 | 5 | 6;
  size?: "sm" | "md" | "lg";
  className?: string;
  onTileClick?: (tile: CategoryTile) => void;
}

const colsClass: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
};

const sizeClass = {
  sm: "aspect-[4/3] p-3",
  md: "aspect-square p-4",
  lg: "aspect-square p-5",
};

function CategoryTileGrid({
  tiles,
  columns = 4,
  size = "md",
  className,
  onTileClick,
}: CategoryTileGridProps) {
  return (
    <div className={cn("grid gap-3", colsClass[columns], className)}>
      {tiles.map((tile) => {
        const Inner = (
          <>
            {tile.imageUrl && (
              <img
                src={tile.imageUrl}
                alt=""
                className="absolute inset-0 size-full object-cover opacity-60 transition-opacity group-hover:opacity-80"
              />
            )}
            <div className="relative z-10 flex h-full flex-col">
              {tile.icon && (
                <div className="mb-auto grid size-9 place-items-center rounded-lg bg-background/80 text-text-primary [&_svg]:size-5">
                  {tile.icon}
                </div>
              )}
              <div className="mt-auto">
                <div className="text-[14px] font-semibold text-text-primary leading-tight">
                  {tile.label}
                </div>
                {tile.count !== undefined && (
                  <div className="mt-0.5 text-[12px] text-text-tertiary">
                    {tile.count.toLocaleString()} items
                  </div>
                )}
              </div>
            </div>
          </>
        );

        const className = cn(
          "group relative overflow-hidden rounded-xl border border-gray-200 bg-card transition-colors hover:border-primary/40",
          sizeClass[size]
        );

        return tile.href ? (
          <a key={tile.id} href={tile.href} className={className}>
            {Inner}
          </a>
        ) : (
          <button
            key={tile.id}
            type="button"
            onClick={() => onTileClick?.(tile)}
            className={cn(className, "text-left")}
          >
            {Inner}
          </button>
        );
      })}
    </div>
  );
}

export { CategoryTileGrid };
