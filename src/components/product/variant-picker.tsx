import { Label } from "@/components/ui/label";
import {
  ColorSwatchGroup,
  type ColorOption,
} from "@/components/ui/color-swatch";
import { SizeSelector, type SizeOption } from "@/components/ui/size-selector";
import { cn } from "@/lib/utils";

export interface VariantPickerProps {
  colors?: ColorOption[];
  selectedColor?: string;
  onColorChange?: (color: string) => void;
  colorLabel?: string;
  sizes?: SizeOption[];
  selectedSize?: string;
  onSizeChange?: (size: string) => void;
  sizeLabel?: string;
  sizeGuideHref?: string;
  className?: string;
}

function VariantPicker({
  colors,
  selectedColor,
  onColorChange,
  colorLabel = "Color",
  sizes,
  selectedSize,
  onSizeChange,
  sizeLabel = "Size",
  sizeGuideHref,
  className,
}: VariantPickerProps) {
  const colorName = colors?.find((c) => c.value === selectedColor)?.label;
  const sizeName = sizes?.find((s) => s.value === selectedSize)?.label;

  return (
    <div className={cn("space-y-5", className)}>
      {colors && colors.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <Label className="text-[13px] font-medium text-text-primary">
              {colorLabel}
            </Label>
            {colorName && (
              <span className="text-[13px] text-text-secondary">{colorName}</span>
            )}
          </div>
          <ColorSwatchGroup
            options={colors}
            value={selectedColor}
            onValueChange={onColorChange}
          />
        </div>
      )}
      {sizes && sizes.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <Label className="text-[13px] font-medium text-text-primary">
              {sizeLabel}
            </Label>
            {sizeName && (
              <span className="text-[13px] text-text-secondary">{sizeName}</span>
            )}
            {sizeGuideHref && (
              <a
                href={sizeGuideHref}
                className="ml-auto text-[12px] font-medium text-primary hover:text-brand-700"
              >
                Size guide
              </a>
            )}
          </div>
          <SizeSelector
            options={sizes}
            value={selectedSize}
            onValueChange={onSizeChange}
          />
        </div>
      )}
    </div>
  );
}

export { VariantPicker };
