import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const neonButton = cva(
  "press inline-flex w-full items-center justify-center gap-2 rounded-full text-center font-semibold tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        slime:
          "bg-[image:var(--gradient-slime)] text-primary-foreground shadow-[0_0_26px_-8px_var(--slime)] hover:brightness-110",
        psy: "bg-[image:var(--gradient-psy)] text-secondary-foreground shadow-[0_0_26px_-8px_var(--psy)] hover:brightness-110",
        outline:
          "border border-slime/50 bg-transparent text-slime hover:bg-slime/10",
        ghost: "bg-surface-2 text-foreground hover:bg-surface-2/70",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-[15px]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "slime", size: "md" },
  },
);

export interface NeonButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButton> {
  asChild?: boolean;
}

export function NeonButton({
  className,
  variant,
  size,
  asChild,
  ...props
}: NeonButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(neonButton({ variant, size }), className)} {...props} />;
}
