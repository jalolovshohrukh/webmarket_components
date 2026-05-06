import * as React from "react";
import { ImagePlus, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";

export interface ReviewFormValue {
  rating: number;
  title: string;
  body: string;
  photos: File[];
}

export interface ReviewFormProps {
  defaultValue?: Partial<ReviewFormValue>;
  onSubmit?: (value: ReviewFormValue) => void | Promise<void>;
  onCancel?: () => void;
  ratingLabels?: Record<number, string>;
  maxPhotos?: number;
  className?: string;
}

const defaultRatingLabels: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very good",
  5: "Excellent",
};

function ReviewForm({
  defaultValue,
  onSubmit,
  onCancel,
  ratingLabels = defaultRatingLabels,
  maxPhotos = 4,
  className,
}: ReviewFormProps) {
  const [rating, setRating] = React.useState(defaultValue?.rating ?? 0);
  const [title, setTitle] = React.useState(defaultValue?.title ?? "");
  const [body, setBody] = React.useState(defaultValue?.body ?? "");
  const [photos, setPhotos] = React.useState<File[]>(
    defaultValue?.photos ?? []
  );
  const [submitting, setSubmitting] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Array.from(e.target.files ?? []).slice(
      0,
      maxPhotos - photos.length
    );
    setPhotos((p) => [...p, ...next]);
  };

  const removePhoto = (i: number) => {
    setPhotos((p) => p.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || !body.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit?.({ rating, title, body, photos });
    } finally {
      setSubmitting(false);
    }
  };

  const valid = rating >= 1 && body.trim().length > 0;

  return (
    <Card className={cn("p-5", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="text-[13px] font-medium">Your rating</Label>
          <div className="mt-2 flex items-center gap-3">
            <Rating
              value={rating}
              interactive
              size="lg"
              onValueChange={setRating}
            />
            {rating > 0 && (
              <span className="text-[13px] text-text-secondary">
                {ratingLabels[rating]}
              </span>
            )}
          </div>
        </div>
        <Input
          label="Headline"
          placeholder="Sum up your review in a sentence"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          label="Your review"
          placeholder="What did you like? What didn't work for you?"
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <div>
          <Label className="text-[13px] font-medium">Add photos (optional)</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {photos.map((file, i) => (
              <div
                key={i}
                className="relative size-20 overflow-hidden rounded-md border border-gray-200"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  aria-label="Remove photo"
                  className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-background/80 text-text-secondary hover:bg-background"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
            {photos.length < maxPhotos && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="grid size-20 place-items-center rounded-md border border-dashed border-gray-200 text-text-tertiary hover:border-primary hover:text-primary"
              >
                <ImagePlus className="size-5" />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={onFiles}
                />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pt-1">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={submitting}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={!valid} loading={submitting}>
            Submit review
          </Button>
        </div>
      </form>
    </Card>
  );
}

export { ReviewForm };
