import * as React from "react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, id, children, ...props }, ref) => (
    <>
      <select
        ref={ref}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error && id ? `${id}-error` : undefined}
        className={cn(
          "min-h-12 w-full rounded-lg border border-gold/25 bg-[#151515] px-4 text-sm text-ivory transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20",
          error && "border-clay focus:border-clay focus:ring-clay/20",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <p id={id ? `${id}-error` : undefined} className="mt-2 text-sm text-[#f1a28d]">
          {error}
        </p>
      ) : null}
    </>
  )
);

Select.displayName = "Select";
