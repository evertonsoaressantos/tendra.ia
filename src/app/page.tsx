import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MonoLabel } from "@/components/brand/mono-label";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="tdr-container tdr-section flex flex-1 flex-col justify-center">
        <MonoLabel className="mb-6">Tendra.ai · Em construção</MonoLabel>
        <h1 className="tdr-display max-w-3xl">Clareza em<br />cada requisito.</h1>
        <p className="tdr-body mt-8 max-w-lg">Estamos preparando a Tendra.ai. As primeiras experiências serão construídas a partir daqui.</p>
        <Card className="mt-12 max-w-xl">
          <CardContent className="flex items-start gap-4">
            <Layers className="mt-1 size-6 shrink-0 text-sage" aria-hidden="true" />
            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Uma linguagem compartilhada</h2>
              <p className="leading-relaxed text-muted-foreground">Conheça as cores, a tipografia e os componentes que dão forma à Tendra.ai.</p>
              <Button render={<Link href="/design-system" />} nativeButton={false}>Explorar design system <ArrowRight aria-hidden="true" /></Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
