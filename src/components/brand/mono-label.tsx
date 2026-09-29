import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function MonoLabel({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("tdr-label text-muted-foreground", className)} {...props} />;
}
