import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { MonoLabel } from "@/components/brand/mono-label";
import { ComponentGallery } from "@/components/design-system/component-gallery";

export const metadata: Metadata = { title: "Design system" };

export default function DesignSystemPage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="tdr-container tdr-section">
        <div className="grid gap-8 border-b pb-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <MonoLabel>Brand & design system · v1.0</MonoLabel>
            <h1 className="tdr-display mt-6">Precisão, do<br />símbolo ao pixel.</h1>
            <p className="tdr-body mt-6">A linguagem visual da Tendra.ai. Uma base sóbria e consistente para transformar informação complexa em respostas claras.</p>
          </div>
          <p className="max-w-48 border-t-2 border-sage pt-4 font-mono text-xs leading-relaxed text-muted-foreground">Preciso. Robusto.<br />Ágil. Sóbrio.</p>
        </div>
        <ComponentGallery />
      </main>
    </>
  );
}
