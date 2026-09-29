"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, FileText, Moon, Sun, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/brand/logo";
import { MonoLabel } from "@/components/brand/mono-label";
import { SourceTrail } from "@/components/brand/source-trail";

const palette = [
  { name: "Sálvia Tendra", hex: "#6E7268", token: "--brand-sage", color: "bg-sage", use: "Identidade e foco" },
  { name: "Tinta profunda", hex: "#12140F", token: "--brand-ink", color: "bg-ink", use: "Títulos e ação primária" },
  { name: "Limão sinal", hex: "#C8F73D", token: "--brand-lime", color: "bg-lime", use: "Acento sobre tinta" },
  { name: "Compliance", hex: "#4B5046", token: "--state-ink", color: "bg-compliance", use: "Validado e aprovado" },
];
const neutrals = [
  { name: "Card", hex: "#FFFFFF", color: "bg-(--n-000)" },
  { name: "Página", hex: "#F5F6F1", color: "bg-(--n-050)" },
  { name: "Bordas", hex: "#E3E6DC", color: "bg-(--n-200)" },
  { name: "Metadados", hex: "#5D6157", color: "bg-(--n-400)" },
  { name: "Corpo", hex: "#3E4238", color: "bg-(--n-700)" },
];
const sections = [["marca", "Marca"], ["cores", "Cores"], ["tipografia", "Tipografia"], ["estrutura", "Estrutura"], ["componentes", "Componentes"], ["rastreabilidade", "Rastreabilidade"]];

function SectionHeading({ number, title, description }: { number: string; title: string; description: string }) {
  return <div className="mb-8 grid gap-3 sm:grid-cols-[56px_1fr]"><MonoLabel className="pt-2">{number}</MonoLabel><div><h2 className="tdr-title">{title}</h2><p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{description}</p></div></div>;
}

export function ComponentGallery() {
  const [dark, setDark] = useState(false);
  const [message, setMessage] = useState("Experimente os componentes. Os exemplos não salvam dados.");
  return (
    <>
      <nav aria-label="Seções do design system" className="flex flex-wrap gap-x-6 border-b py-4">
        {sections.map(([id, title]) => <a key={id} href={`#${id}`} className="tdr-nav-link text-muted-foreground">{title}</a>)}
      </nav>

      <section id="marca" className="tdr-section scroll-mt-8 border-b">
        <SectionHeading number="01" title="Uma marca. Quatro expressões." description="O selo de tender traduz precisão e rastreabilidade em três camadas concêntricas. Preserve a geometria, o alinhamento e a área de respiro." />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex min-h-44 flex-col items-start justify-between rounded-xl border bg-card p-8"><Logo /><MonoLabel className="mt-6">Principal · fundo claro</MonoLabel></div>
          <div className="dark flex min-h-44 flex-col items-start justify-between rounded-xl border bg-ink p-8"><Logo variant="ink" /><MonoLabel className="mt-6">Fundo tinta · acento limão</MonoLabel></div>
          <div className="flex min-h-44 flex-col items-start justify-between rounded-xl border bg-card p-8"><Logo variant="mono-ink" /><MonoLabel className="mt-6">Monocromático</MonoLabel></div>
          <div className="flex min-h-44 flex-col items-start justify-between rounded-xl border bg-card p-8"><Image src="/brand/logo/tendra-appicon-tinta.svg" width={56} height={56} alt="App icon Tendra.ai" /><MonoLabel className="mt-6">App icon · favicon</MonoLabel></div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">Nome oficial: <strong className="text-foreground">Tendra.ai</strong>. Sem gradientes, distorções ou sombras no símbolo. Favicons usam os arquivos originais, com geometria simplificada em 16 px.</p>
      </section>

      <section id="cores" className="tdr-section scroll-mt-8 border-b">
        <SectionHeading number="02" title="Cor com função definida." description="Papel e sálvia formam a base. Tinta estabelece hierarquia. Limão sinaliza os destaques. Os neutros têm fundo oliva, sem cinza puro." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {palette.map((color) => <div key={color.name} className="overflow-hidden rounded-xl border bg-card"><div className={`h-28 ${color.color}`} /><div className="space-y-2 p-5"><h3 className="font-semibold">{color.name}</h3><p className="font-mono text-xs text-muted-foreground">{color.hex}</p><p className="text-sm">{color.use}</p><code className="block break-all text-xs text-muted-foreground">{color.token}</code></div></div>)}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-5">{neutrals.map((color) => <div key={color.name}><div className={`mb-3 h-12 rounded-sm border ${color.color}`} /><p className="text-sm">{color.name}</p><p className="mt-1 font-mono text-xs text-muted-foreground">{color.hex}</p></div>)}</div>
        <div className="mt-8 flex h-3 overflow-hidden rounded-full" aria-label="Proporção de referência: 60% papel, 30% sálvia e 10% limão"><div className="w-3/5 border bg-paper" /><div className="w-3/10 bg-sage" /><div className="w-1/10 bg-lime" /></div>
        <p className="mt-3 font-mono text-xs text-muted-foreground">60 papel · 30 sálvia · 10 limão — direção visual, não uma cota por tela.</p>
        <div className="dark mt-8 grid gap-6 rounded-2xl bg-ink p-8 text-paper sm:grid-cols-[1fr_auto] sm:items-center"><div><h3 className="text-xl font-semibold text-paper">A regra do limão</h3><p className="mt-3 max-w-xl leading-relaxed text-(--ink-200)">Nunca use texto limão sobre fundo claro. Em campo tinta, ele pode destacar uma palavra ou sinalizar uma ação.</p></div><Badge variant="accent"><Check aria-hidden="true" />Tinta sobre limão</Badge></div>
      </section>

      <section id="tipografia" className="tdr-section scroll-mt-8 border-b">
        <SectionHeading number="03" title="Três famílias. Três funções." description="Títulos organizam. Texto explica. Metadados tornam a informação rastreável." />
        <div className="divide-y rounded-xl border bg-card">
          <div className="grid gap-6 p-6 sm:grid-cols-[200px_1fr]"><div><MonoLabel>Space Grotesk</MonoLabel><p className="mt-2 text-sm text-muted-foreground">Títulos e números<br />500 · 600 · 700</p></div><div><p className="tdr-display text-foreground">Clareza em cada detalhe.</p><p className="mt-4 font-mono text-xs text-muted-foreground">Display 56/58 · tracking −3,5%</p></div></div>
          <div className="grid gap-6 p-6 sm:grid-cols-[200px_1fr]"><div><MonoLabel>IBM Plex Sans</MonoLabel><p className="mt-2 text-sm text-muted-foreground">Corpo e interface<br />400 · 500 · 600</p></div><div><p className="tdr-body">Informação precisa, em uma leitura confortável. Cada resposta deve mostrar o conteúdo, o estado da revisão e o documento de origem.</p><p className="mt-4 font-mono text-xs text-muted-foreground">Corpo 17/28 · medida máxima 66ch</p></div></div>
          <div className="grid gap-6 p-6 sm:grid-cols-[200px_1fr]"><div><MonoLabel>IBM Plex Mono</MonoLabel><p className="mt-2 text-sm text-muted-foreground">IDs e rastreabilidade<br />400 · 500</p></div><div><p className="font-mono text-sm">REQ-084/210</p><p className="mt-3 break-words font-mono text-xs leading-relaxed tracking-[0.04em]">FONTE: DOCUMENTO_EXEMPLO.PDF · P. 12</p><p className="mt-4 font-mono text-xs text-muted-foreground">Metadados 12/19 · rótulos 11/15</p></div></div>
        </div>
      </section>

      <section id="estrutura" className="tdr-section scroll-mt-8 border-b">
        <SectionHeading number="04" title="Ritmo e estrutura." description="Alinhamento à esquerda, superfícies planas e respiro consistente. A interface organiza o conteúdo sem competir com ele." />
        <div className="grid gap-5 md:grid-cols-2">
          <Card><CardHeader><CardTitle><h3>Espaçamento</h3></CardTitle><CardDescription>Grid de 8 px com ajustes ópticos previstos no kit.</CardDescription></CardHeader><CardContent className="space-y-3">{[8, 16, 24, 32, 40, 48, 64, 72].map((value) => <div key={value} className="flex items-center gap-4"><span className="w-12 font-mono text-xs text-muted-foreground">{value} px</span><div className="h-3 bg-sage" style={{ width: value * 2 }} /></div>)}</CardContent></Card>
          <Card><CardHeader><CardTitle><h3>Geometria</h3></CardTitle><CardDescription>Borda de 1 px. Sombra apenas em camadas flutuantes.</CardDescription></CardHeader><CardContent className="grid grid-cols-2 gap-4">{[["Chip", "6"], ["Input", "8"], ["Botão", "9"], ["Painel", "12"], ["Card", "14"], ["Produto", "16"]].map(([label, radius]) => <div key={label} className="border border-input bg-muted p-4" style={{ borderRadius: `${radius}px` }}><p className="text-sm">{label}</p><p className="mt-1 font-mono text-xs text-muted-foreground">{radius} px</p></div>)}</CardContent></Card>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-muted-foreground"><span>Página: 1160 px</span><span>Margem: 40 px</span><span>Seções: 72 px</span><span>Cards: 20 px</span><span>Área de toque: ≥ 44 px</span></div>
      </section>

      <section id="componentes" className="tdr-section scroll-mt-8 border-b">
        <SectionHeading number="05" title="Componentes em uso." description="A mesma base usada no produto. Experimente os estados e compare a aplicação sobre papel e sobre tinta." />
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4"><MonoLabel>Prévia interativa</MonoLabel><Button variant="outline" aria-pressed={dark} onClick={() => setDark(!dark)}>{dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}{dark ? "Usar fundo claro" : "Usar fundo tinta"}</Button></div>
        <div className={dark ? "dark" : ""}>
          <div className="space-y-8 rounded-2xl border bg-background p-6 text-body sm:p-8">
            <div className="space-y-4"><h3 className="text-xl font-semibold">Ações</h3><div className="flex flex-wrap gap-3">
              <Button onClick={() => setMessage("Exemplo de ação primária acionado.")}><Upload aria-hidden="true" />Importar edital</Button>
              <Button variant="secondary" onClick={() => setMessage("Exemplo de ação secundária acionado.")}>Ver documentos</Button>
              <Button variant="ghost" onClick={() => setMessage("Exemplo de ação discreta acionado.")}>Ver detalhes <ArrowRight aria-hidden="true" /></Button>
              <Button disabled>Aprovar resposta</Button>
            </div></div>
            <Separator />
            <div className="space-y-4"><h3 className="text-xl font-semibold">Estados</h3><div className="flex flex-wrap gap-3"><Badge>Rascunho</Badge><Badge variant="outline">Em revisão</Badge><Badge variant="approved"><Check aria-hidden="true" />Aprovado</Badge><Badge variant="destructive">Sem fonte</Badge></div></div>
            <Separator />
            <div className="grid gap-8 md:grid-cols-2">
              <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setMessage("Formulário validado. Nenhum dado foi enviado ou salvo."); }}>
                <h3 className="text-xl font-semibold">Formulário</h3>
                <div className="space-y-2"><Label htmlFor="demo-name">Nome do edital</Label><Input id="demo-name" name="project" placeholder="Ex.: Questionário de segurança" required maxLength={80} aria-describedby="demo-help" /><p id="demo-help" className="text-sm text-muted-foreground">Campo de demonstração. Não envia dados.</p></div>
                <div className="space-y-2"><Label htmlFor="demo-invalid">Documento de origem</Label><Input id="demo-invalid" aria-invalid="true" aria-describedby="demo-error" placeholder="Nome do documento" /><p id="demo-error" className="text-sm text-destructive">Exemplo de erro: informe a fonte da resposta.</p></div>
                <Button type="submit">Testar formulário</Button>
              </form>
              <Card><CardHeader><FileText className="mb-2 size-6 text-muted-foreground" aria-hidden="true" /><CardTitle><h3>Um card, uma intenção.</h3></CardTitle><CardDescription>Conteúdo alinhado, espaço para leitura e hierarquia clara.</CardDescription></CardHeader><CardContent><p className="text-sm leading-relaxed">Sem sombra decorativa. O contorno e o contraste entre superfícies organizam a informação.</p><div className="mt-6"><Badge variant="outline">Exemplo visual</Badge></div></CardContent></Card>
            </div>
            <p role="status" className="min-h-12 border-t pt-4 text-sm text-muted-foreground">{message}</p>
          </div>
        </div>
      </section>

      <section id="rastreabilidade" className="tdr-section scroll-mt-8">
        <SectionHeading number="06" title="A fonte faz parte da resposta." description="Conteúdo, estado e origem ficam juntos. O exemplo abaixo demonstra a composição visual; não representa uma resposta real do produto." />
        <Card className="rounded-2xl"><CardHeader><div className="flex flex-wrap items-center justify-between gap-4"><MonoLabel>REQ-084/210 · Exemplo fictício</MonoLabel><Badge variant="outline">Em revisão</Badge></div><CardTitle className="mt-4"><h3>Como a informação foi verificada?</h3></CardTitle></CardHeader><CardContent className="space-y-6"><p className="tdr-body">O texto gerado deve ser acompanhado pelo documento de origem e pela revisão da pessoa responsável. A interface mantém esses elementos visíveis durante a leitura.</p><Separator /><SourceTrail sources={[{ file: "Documento_exemplo.pdf", page: 12 }]} /></CardContent></Card>
        <div className="mt-8 border-t pt-6"><MonoLabel>Voz da marca</MonoLabel><p className="mt-3 max-w-2xl leading-relaxed">Português do Brasil. Frases diretas. Botões com verbo e objeto. Números somente com origem verificável. A marca é sempre Tendra.ai.</p></div>
      </section>
    </>
  );
}
