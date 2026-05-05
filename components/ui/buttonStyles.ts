import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export function buttonStyles({
  variant = "primary",
  size = "md",
  className
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "border border-gold bg-gold text-charcoal shadow-[0_14px_36px_rgba(200,169,106,0.18)] hover:bg-[#d8bd7e]",
    secondary:
      "border border-clay bg-clay text-white shadow-[0_14px_36px_rgba(182,106,80,0.16)] hover:bg-[#c87961]",
    outline:
      "border border-gold/70 bg-transparent text-gold hover:bg-gold hover:text-charcoal",
    ghost: "border border-transparent bg-transparent text-ivory hover:bg-surface hover:text-gold"
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "min-h-10 px-4 text-sm",
    md: "min-h-12 px-5 text-sm sm:px-6",
    lg: "min-h-14 px-7 text-base",
    icon: "size-11 p-0"
  };

  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );
}
