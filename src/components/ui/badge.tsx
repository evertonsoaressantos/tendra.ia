import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-xs border px-2 py-1 font-mono text-[11px] leading-snug tracking-[0.03em] uppercase [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground",
        secondary: "border-input bg-secondary text-secondary-foreground",
        outline: "border-input text-body",
        approved: "border-lime bg-(--approved-bg) text-(--approved-fg)",
        accent: "border-lime bg-lime text-ink",
        destructive: "border-destructive text-destructive",
      },
    },
    defaultVariants: { variant: "secondary" },
  },
);

function Badge({ className, variant, ...props }: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
