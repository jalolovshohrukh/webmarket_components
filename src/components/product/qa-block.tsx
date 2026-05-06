import * as React from "react";
import { MessageSquare, ThumbsUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface QAEntry {
  id: string;
  question: string;
  answer?: React.ReactNode;
  answeredBy?: string;
  date?: string;
  helpfulCount?: number;
  answersCount?: number;
}

export interface QABlockProps {
  entries: QAEntry[];
  onAsk?: (question: string) => void;
  onSeeMore?: () => void;
  className?: string;
}

function QABlock({ entries, onAsk, onSeeMore, className }: QABlockProps) {
  const [draft, setDraft] = React.useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onAsk?.(draft.trim());
    setDraft("");
  };

  return (
    <div className={cn("space-y-4", className)}>
      {onAsk && (
        <Card className="p-4">
          <form onSubmit={submit} className="flex items-center gap-2">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask a question about this product…"
              iconLeft={<MessageSquare />}
            />
            <Button type="submit" disabled={!draft.trim()}>
              Ask
            </Button>
          </form>
        </Card>
      )}

      {entries.length === 0 ? (
        <Card className="p-8 text-center text-[13px] text-text-tertiary">
          No questions yet. Be the first to ask.
        </Card>
      ) : (
        <Accordion type="multiple" className="space-y-2">
          {entries.map((q) => (
            <AccordionItem
              key={q.id}
              value={q.id}
              className="rounded-xl border border-gray-200 bg-card px-4"
            >
              <AccordionTrigger className="text-left text-[14px] font-medium hover:no-underline">
                <span className="flex-1 pr-2">Q: {q.question}</span>
                {q.answersCount !== undefined && (
                  <span className="ml-2 text-[12px] font-normal text-text-tertiary">
                    {q.answersCount}{" "}
                    {q.answersCount === 1 ? "answer" : "answers"}
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                {q.answer ? (
                  <div className="space-y-2 pb-2">
                    <div className="rounded-md bg-muted/40 p-3 text-[13px] text-text-secondary">
                      <span className="font-medium text-text-primary">A: </span>
                      {q.answer}
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-text-tertiary">
                      <span>
                        {q.answeredBy && <>Answered by {q.answeredBy}</>}
                        {q.date && <span> · {q.date}</span>}
                      </span>
                      <Button variant="ghost" size="sm" iconLeft={<ThumbsUp />}>
                        Helpful{" "}
                        {q.helpfulCount !== undefined && `(${q.helpfulCount})`}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="pb-2 text-[13px] text-text-tertiary">
                    No answer yet.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {onSeeMore && (
        <Button variant="secondary" onClick={onSeeMore} className="w-full">
          Show more questions
        </Button>
      )}
    </div>
  );
}

export { QABlock };
