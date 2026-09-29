# Arquitetura inicial da Tendra.ai

## Decisão

Uma aplicação Next.js com App Router, React, TypeScript e Tailwind CSS.
Design system e MVP compartilham os componentes em `src/components/ui`.
O shadcn foi instalado com o preset `base-nova` e Base UI, e depois adaptado
aos materiais oficiais da Tendra.ai. Veja `design-system/README.md` para fontes,
regras e decisões de integração.

## Organização

- `src/app`: rotas, páginas e layouts; endpoints futuros em `src/app/api` quando necessários.
- `src/components/ui`: componentes do shadcn compartilhados pelo produto e pelo catálogo.
- `src/components/design-system`: demonstrações do catálogo, sem regras do produto.
- `src/styles/tokens.css`: tokens da identidade visual.
- `src/app/globals.css`: aliases shadcn/Tailwind e estilos globais.
- `src/components/brand`: logo, rótulos técnicos e rastreabilidade.
- `public/brand`: SVGs e favicons originais.
- `src/lib`: utilitários compartilhados; integrações de servidor devem usar `server-only`.
- `.specify`: infraestrutura do Spec Kit e princípios do projeto.
- `.agents/skills`: integração local do Spec Kit com o Codex.
- `specs`: especificações futuras, criadas conforme definirmos as funcionalidades.

## Evolução

Diretriz acordada em 29/09/2026: recomendar a arquitetura considerando o
crescimento do produto, manutenção, segurança e custo operacional. Apresentar
os motivos e as condições para cada evolução, sem antecipar infraestrutura
que o projeto ainda não necessita.

Manter uma aplicação modular: interfaces, regras de negócio e integrações
devem ter responsabilidades claras. Conforme as funcionalidades surgirem,
organizar regras por domínio e manter detalhes de provedores isolados.

O catálogo `/design-system` atende à fase atual. Storybook pode ser adicionado
no mesmo repositório quando a variedade de estados, colaboração ou testes
visuais justificar. Extrair uma biblioteca de UI apenas quando houver outro
consumidor real. O destino escolhido para o código é um repositório privado
no GitHub: `evertonsoaressantos/tendra.ia`. O repositório foi criado como privado;
a publicação inicial do código é realizada pelo Git com a branch `main`.

Começar com frontend e backend no mesmo projeto. Criar serviços separados apenas
quando tarefas demoradas, dependências específicas ou escala justificarem.
Chaves de provedores e credenciais ficam no servidor e nunca recebem o prefixo
`NEXT_PUBLIC_`. A base atual não depende de serviços externos nem de credenciais.

## Próxima etapa

Definir o público, o problema e as funcionalidades do MVP; então estabelecer a
constituição e elaborar a primeira especificação com o Spec Kit. O arquivo de
constituição ainda contém o modelo oficial, não princípios de produto aprovados.
