import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "min-h-11 w-full min-w-0 rounded-sm border border-input bg-card px-3.5 py-2.5 font-sans text-base text-foreground outline-none placeholder:text-muted-foreground transition-colors duration-(--duration-fast) disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-[0.42] aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
