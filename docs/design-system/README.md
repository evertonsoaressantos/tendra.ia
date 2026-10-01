# Design system da Tendra.ai

## Fontes e precedência

Referências consultadas na [pasta de marca do Drive](https://drive.google.com/drive/folders/1eB_3H3RYuIrdacUstXENFPVbnxsn87gt):

- [Identidade Visual Tendra.ai.pdf](https://drive.google.com/file/d/1vpsJh34c8_hwckIghjAX3p5batismsu9/view): marca, paleta, tipografia, proporções e uso correto.
- [Tendra.ai Design System.zip](https://drive.google.com/file/d/14mWKEAh7zYqSZoOoyswsoZhzAroLt1v_/view): tokens e componentes de referência para implementação. Recuperado em 29/09/2026; hash registrado em `source-manifest.json`.
- [Pasta tendra-design-system](https://drive.google.com/drive/folders/186nyqcJuYklxr80q3iUrGSj0ZFT21mYn): organização e diretrizes de uso.
- [Homepage Proposal.html](https://drive.google.com/file/d/1YK2m4t_ncqS2VJgvNV0wTPdaNcOLdKZ8/view): referência de aplicação. Seu conteúdo comercial não foi tratado como funcionalidade já implementada.

O pacote de componentes define os detalhes de interface. O PDF orienta a identidade.
Há diferenças entre os materiais, resolvidas provisoriamente de forma explícita:

| Tema | Diferença | Decisão aplicada |
| --- | --- | --- |
| Ação primária | PDF menciona sálvia; tokens e Button.jsx usam tinta | Tinta `#12140F`, hover `#2A2E24`; sálvia para identidade e foco |
| Escala de títulos | PDF chama 32 px de H2; tokens têm display 40 px, H1 32 px, H2 24 px | Escala completa dos tokens; HTML semântico independente do tamanho visual |
| Limão | PDF restringe a acento sobre tinta; kit admite preenchimento com texto tinta | Demonstrações de acento sobre tinta; nunca texto limão em fundo claro |
| Espaçamento | Texto diz grid 8 px; tokens também incluem 12 e 20 px | Preservar escala e medidas explícitas do kit, incluindo gap de cards de 20 px |
| Toque | Alguns tamanhos pequenos do kit têm 36 px | Controles interativos do projeto têm mínimo de 44 px, inclusive tamanhos compactos |
| Fundo escuro | Kit define superfícies inversas; não há tema shadcn completo | Aliases `.dark` derivados da escala tinta; erro escuro adaptado para `#F2A28F` para contraste |

## Marca

Nome visível: **Tendra.ai**. O identificador técnico do projeto continua `tendra-ia`.
Os SVGs e favicons originais estão em `public/brand`, com metadados preservados.
`Logo` compõe o símbolo original com a fonte real Space Grotesk, conforme o
componente do kit. Isso evita depender da fonte de fallback de um SVG externo
com elemento `<text>`. O favicon de 16 px usa a simplificação original.

Preservar respiro equivalente a 8/48 da altura do símbolo. Não distorcer,
rotacionar, aplicar gradiente ou sombra. Usar variantes claras/escuras adequadas.

## Tokens e integração com shadcn

- `src/styles/tokens.css`: valores do pacote, com referências de origem.
- `src/app/globals.css`: aliases semânticos do shadcn, integração com Tailwind,
  estados inversos, utilitários de layout e redução de movimento.
- `src/app/layout.tsx`: fontes oficiais via `next/font/google`, hospedadas junto
  ao app após o build. O navegador não precisa solicitar fontes ao Google.
- `src/components/ui`: componentes shadcn adaptados à marca, mantendo Base UI
  onde há comportamento interativo.
- `src/components/brand`: Logo, MonoLabel e SourceTrail.
- `/design-system`: catálogo navegável das decisões e componentes reais.

Tokens de raios do kit recebem o prefixo `--tdr-radius-*` para não colidir com
os nomes de tema do Tailwind. As classes `rounded-*` apontam para esses valores.
Novas telas devem consumir os aliases e componentes, sem duplicar estilos.
A paleta de gráficos ainda não foi definida; definir antes de adicionar gráficos.

## Regras de uso

| Elemento | Padrão |
| --- | --- |
| Página | Papel `#F5F6F1`, largura máxima 1160 px, padding 40 px (24 px no mobile) |
| Card | Branco, borda 1 px `#E3E6DC`, raio 14 px, padding 24 px, sem sombra |
| Títulos e números | Space Grotesk 500/600/700 |
| Corpo e UI | IBM Plex Sans 400/500/600; corpo 17 px / 1,65; máximo 66ch |
| IDs e fontes | IBM Plex Mono 400/500; metadados 12 px, rótulos 11 px |
| Raios | Chip 6, input 8, botão 9, painel 12, card 14, produto 16, aplicação 18 px |
| Ícones | Lucide, traço 2 px; 14/16/20/24 px conforme contexto |
| Hover | Mudança de cor ou borda em 140 ms; sem escala ou redução de opacidade |
| Foco | Borda sálvia e halo 3 px; indicador visível em links |
| Desabilitado | Opacidade 42%, cursor not-allowed, sem disparar ação |
| Movimento | 140/220/420 ms; respeitar prefers-reduced-motion |
| Sombra | Somente overlays, popovers e outras camadas flutuantes |

Proporção 60 papel / 30 sálvia / 10 limão é uma direção de composição.
Compliance `#4B5046` é um estado, não uma segunda cor primária.
Texto limão só em campo tinta. Texto sobre preenchimento limão é tinta.

## Conteúdo

Português do Brasil; títulos e botões em sentence case; caixa alta restrita a
rótulos técnicos em mono. Botões com verbo e objeto. Evitar emoji, promessas
sem fonte, métricas inventadas e alegações de conformidade não verificadas.
Respostas geradas devem manter conteúdo, revisão e fonte juntos. Os exemplos
do catálogo são fictícios e não representam capacidades implementadas do MVP.

## Verificação

Análise de código, checagem TypeScript e build de produção executados.
Contrastes recalculados a partir dos hexadecimais reais (não copiados dos
rótulos aproximados do guia):

| Par | Contraste |
| --- | --- |
| Corpo sobre papel | 9,47:1 |
| Metadados sobre papel | 5,84:1 |
| Papel sobre tinta | 17,07:1 |
| Tinta sobre limão | 14,86:1 |
| Metadados sobre card escuro | 10,35:1 |
| Erro sobre card claro | 6,11:1 |
| Erro adaptado sobre card escuro | 8,22:1 |

Isso verifica os pares de texto listados; não é uma auditoria completa de
acessibilidade. Tema inverso demonstrado no catálogo; preferência global de
tema e persistência não foram incluídas nesta etapa.

## Integração planejada do MVP — 30/09/2026

O [plano do MVP](../../specs/001-review-rfp-rfi/plan.md) mantém os componentes e tokens
atuais. Componentes específicos de revisão, fontes e conferência OCR ficam em
`src/components/features`; padrões reutilizáveis continuam em `src/components/ui` e
são demonstrados em `/design-system`. Não introduzir biblioteca visual paralela.

Planejar estados de salvamento, exclusividade de edição, alertas individuais,
fontes indisponíveis/antigas/sem data e texto OCR aguardando conferência. Alertas
combinam texto/ícone com cor; navegação por teclado, foco restaurado ao fechar a fonte
e anúncios de estado fazem parte da aceitação. O editor limita formatação a texto,
negrito, itálico e listas. A visualização Office deve dizer “prévia convertida”.

A área de trabalho de revisão usa split view em ≥1280 px, sequência lista/detalhe em
768–1279 px e consulta abaixo de 768 px, conforme spec. A largura máxima de 1160 px
continua padrão de páginas gerais; a tela de revisão pode ocupar a largura disponível
para acomodar os painéis, reutilizando espaçamentos/tokens. Validar o layout com
usuários e testes de acessibilidade antes de afirmar atendimento WCAG 2.2 AA.

Estas são decisões de implementação futura, sem alteração visual nesta etapa.

## Diretriz confirmada para implementação

Por instrução do usuário, toda interface e front-end devem seguir rigorosamente este design system. Primeiro reutilizar os componentes existentes; quando faltar um componente, buscar no shadcn usando a configuração `base-nova`/Base UI de `components.json`, adaptar à identidade e adicionar ao catálogo. Não introduzir estilos, bibliotecas ou propostas visuais fora da consistência do projeto. Esta regra vale também para login, administração, estados vazios, erros e telas operacionais do MVP.
