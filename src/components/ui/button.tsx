import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "tdr-button inline-flex shrink-0 items-center justify-center gap-2 rounded-md border font-sans text-[15px] leading-tight font-semibold whitespace-nowrap select-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground enabled:hover:border-(--primary-hover) enabled:hover:bg-(--primary-hover)",
        secondary: "border-input bg-transparent text-foreground enabled:hover:border-foreground",
        outline: "border-input bg-transparent text-foreground enabled:hover:border-foreground",
        accent: "border-lime bg-lime text-ink enabled:hover:border-(--accent-hover) enabled:hover:bg-(--accent-hover)",
        ghost: "border-transparent bg-transparent text-body enabled:hover:bg-muted enabled:hover:text-foreground",
        destructive: "border-destructive bg-transparent text-destructive enabled:hover:bg-destructive enabled:hover:text-card",
        link: "border-transparent bg-transparent text-foreground underline underline-offset-4 enabled:hover:decoration-sage",
      },
      size: {
        default: "min-h-11 px-[18px] py-3",
        sm: "min-h-11 px-3 py-2 text-sm",
        xs: "min-h-11 px-2 py-2 text-sm",
        lg: "min-h-[52px] gap-3 px-6 py-[15px] text-[17px] [&_svg]:size-5",
        icon: "size-11",
        "icon-xs": "size-11",
        "icon-sm": "size-11",
        "icon-lg": "size-[52px] [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({ className, variant = "default", size = "default", ...props }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
