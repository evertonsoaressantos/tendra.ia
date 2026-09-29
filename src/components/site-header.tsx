"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="border-b bg-card">
      <a href="#conteudo" className="sr-only fixed left-4 top-4 z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only">Pular para o conteúdo</a>
      <div className="tdr-container flex min-h-20 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
        <Link href="/" aria-label="Tendra.ai — início" className="inline-flex min-h-11 items-center"><Logo /></Link>
        <nav aria-label="Navegação principal" className="flex gap-6 text-muted-foreground">
          <Link href="/" className="tdr-nav-link" aria-current={pathname === "/" ? "page" : undefined}>Início</Link>
          <Link href="/design-system" className="tdr-nav-link" aria-current={pathname === "/design-system" ? "page" : undefined}>Design system</Link>
        </nav>
      </div>
    </header>
  );
}
