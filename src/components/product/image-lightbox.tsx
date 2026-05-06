import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LightboxImage {
  src: string;
  alt?: string;
}

export interface ImageLightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: LightboxImage[];
  /** Initial index to display. */
  index?: number;
  onIndexChange?: (i: number) => void;
}

/**
 * Full-screen image lightbox with zoom + pan + arrow-key / button navigation.
 *
 * Click image to toggle 1x ↔ 2x. When zoomed, drag (or single-finger swipe)
 * pans. Arrow keys / chevron buttons step between images. Pinch zoom on
 * mobile is left to the browser (works natively on the underlying `<img>`).
 */
function ImageLightbox({
  open,
  onOpenChange,
  images,
  index = 0,
  onIndexChange,
}: ImageLightboxProps) {
  const [internalIdx, setInternalIdx] = React.useState(index);
  const i = onIndexChange ? index : internalIdx;
  const setI = (next: number) => {
    const clamped = (next + images.length) % Math.max(1, images.length);
    if (onIndexChange) onIndexChange(clamped);
    else setInternalIdx(clamped);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const [zoom, setZoom] = React.useState(1);
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const dragRef = React.useRef<{
    startX: number;
    startY: number;
    panX: number;
    panY: number;
  } | null>(null);

  React.useEffect(() => {
    if (open) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  }, [open, i]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI(i + 1);
      else if (e.key === "ArrowLeft") setI(i - 1);
      else if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(4, z + 0.5));
      else if (e.key === "-") setZoom((z) => Math.max(1, z - 0.5));
      else if (e.key === "0") {
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, i, images.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (images.length === 0) return null;
  const current = images[i] ?? images[0];

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom === 1) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    setPan({
      x: dragRef.current.panX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.panY + (e.clientY - dragRef.current.startY),
    });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragRef.current) {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      dragRef.current = null;
    }
  };
  const toggleZoom = () => {
    if (zoom === 1) {
      setZoom(2);
    } else {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogPrimitive.Title className="sr-only">
            {current.alt ?? "Image"}
          </DialogPrimitive.Title>
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="text-[13px] tabular-nums opacity-80">
              {i + 1} / {images.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
                aria-label="Zoom out"
                className="grid size-9 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-30"
                disabled={zoom <= 1}
              >
                <ZoomOut className="size-5" />
              </button>
              <span className="min-w-[3rem] text-center text-[13px] tabular-nums opacity-80">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(4, z + 0.5))}
                aria-label="Zoom in"
                className="grid size-9 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-30"
                disabled={zoom >= 4}
              >
                <ZoomIn className="size-5" />
              </button>
              <DialogPrimitive.Close
                aria-label="Close"
                className="ml-2 grid size-9 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </DialogPrimitive.Close>
            </div>
          </div>

          {/* Image stage */}
          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <img
              src={current.src}
              alt={current.alt ?? ""}
              draggable={false}
              onDoubleClick={toggleZoom}
              onClick={zoom === 1 ? toggleZoom : undefined}
              className={cn(
                "max-h-full max-w-full object-contain transition-transform",
                zoom === 1 ? "cursor-zoom-in" : "cursor-grab",
                dragRef.current && "cursor-grabbing transition-none"
              )}
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                transformOrigin: "center",
              }}
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setI(i - 1)}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white/90 backdrop-blur transition-colors hover:bg-white/20"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setI(i + 1)}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white/90 backdrop-blur transition-colors hover:bg-white/20"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="overflow-x-auto px-4 py-3">
              <div className="mx-auto flex w-fit items-center gap-2">
                {images.map((img, idx) => (
                  <button
                    key={img.src + idx}
                    type="button"
                    onClick={() => setI(idx)}
                    aria-label={`Show image ${idx + 1}`}
                    className={cn(
                      "size-14 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                      idx === i
                        ? "border-primary"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img
                      src={img.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export { ImageLightbox };
