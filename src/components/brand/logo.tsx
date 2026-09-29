import Image from "next/image";
import { cn } from "@/lib/utils";

const variants = {
  paper: { symbol: "principal", word: "text-ink", accent: "text-sage" },
  ink: { symbol: "fundo-escuro", word: "text-paper", accent: "text-lime" },
  "mono-ink": { symbol: "mono-tinta", word: "text-ink", accent: "text-ink" },
  "mono-paper": { symbol: "mono-papel", word: "text-paper", accent: "text-paper" },
};

// Usa o símbolo SVG original e a composição tipográfica do Logo.jsx de referência.
export function Logo({ variant = "paper", className }: { variant?: keyof typeof variants; className?: string }) {
  const palette = variants[variant];
  return (
    <span aria-label="Tendra.ai" role="img" className={cn("inline-flex items-center gap-2.5 whitespace-nowrap", className)}>
      <Image src={`/brand/logo/tendra-simbolo-${palette.symbol}.svg`} alt="" width={32} height={32} aria-hidden="true" />
      <span aria-hidden="true" className={cn("font-heading text-[22px] font-bold tracking-[-0.025em]", palette.word)}>Tendra<span className={palette.accent}>.ai</span></span>
    </span>
  );
}
