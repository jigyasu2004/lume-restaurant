import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, id, ...props }, ref) => (
    <>
      <textarea
        ref={ref}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error && id ? `${id}-error` : undefined}
        className={cn(
          "min-h-32 w-full resize-y rounded-lg border border-gold/25 bg-[#151515] px-4 py-3 text-sm text-ivory placeholder:text-mutedText transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20",
          error && "border-clay focus:border-clay focus:ring-clay/20",
          className
        )}
        {...props}
      />
      {error ? (
        <p id={id ? `${id}-error` : undefined} className="mt-2 text-sm text-[#f1a28d]">
          {error}
        </p>
      ) : null}
    </>
  )
);

Textarea.displayName = "Textarea";
