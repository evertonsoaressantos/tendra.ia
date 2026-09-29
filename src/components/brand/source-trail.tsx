import { Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Source = { file: string; page?: number; href?: string };

export function SourceTrail({ sources, className }: { sources: Source[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2 font-mono text-xs leading-relaxed text-muted-foreground", className)}>
      <LinkIcon className="size-4 shrink-0" aria-hidden="true" />
      <span className="uppercase tracking-[0.08em]">Fonte</span>
      {sources.length === 0 ? <span>Sem fonte — revisão manual necessária.</span> : sources.map((source) => (
        <span key={`${source.file}-${source.page}`} className="min-w-0 break-words">
          {source.href ? <a className="inline-flex min-h-11 items-center underline underline-offset-4" href={source.href}>{source.file}{source.page ? ` · p. ${source.page}` : ""}</a> : <span>{source.file}{source.page ? ` · p. ${source.page}` : ""}</span>}
        </span>
      ))}
    </div>
  );
}
