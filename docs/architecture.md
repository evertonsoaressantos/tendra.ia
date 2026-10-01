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
consumidor real. O código está no repositório público
`evertonsoaressantos/tendra.ia`, com `main` protegida por checks obrigatórios.
As fontes do design system ficam versionadas em `src/fonts`, evitando acesso à
rede durante o build da aplicação.

Começar com frontend e backend no mesmo projeto. Criar serviços separados apenas
quando tarefas demoradas, dependências específicas ou escala justificarem.
Chaves de provedores e credenciais ficam no servidor e nunca recebem o prefixo
`NEXT_PUBLIC_`. A base atual não depende de serviços externos nem de credenciais.

## Plano do primeiro MVP — 30/09/2026

Para validar a fundação local, a Supabase CLI fixada no projeto inicia apenas os
serviços usados no MVP (PostgreSQL, Auth, Storage, API e caixa de e-mail de teste)
em rede Docker vinculada a `127.0.0.1`. O banco de integração isolado usa uma
imagem pgvector fixada por digest e armazenamento temporário; a CI cria ambos
com dados sintéticos. Isso mantém os testes reproduzíveis sem infraestrutura
remota. O container web usa Node 24 fixado por digest e foi validado com build
de produção e healthcheck HTTP local. A imagem do worker compartilha o código e
as dependências do projeto, mas T005 apenas valida suas ferramentas de
documentos sem rede; a execução da fila entra em T021. ClamAV 1.4.6 roda em
container próprio, em rede interna sem porta pública. T053 define a atualização
e checagem das assinaturas, além do isolamento dos subprocessos que abrem
arquivos. Esse isolamento permite manter a web leve e impede que o healthcheck
de infraestrutura finja que os jobs já são processados.

A Constitution v1.1.0 está ativa. A especificação funcional e o design técnico estão
em [specs/001-review-rfp-rfi](../specs/001-review-rfp-rfi/plan.md). A aplicação ainda
contém a base e o catálogo visual; os componentes abaixo são decisões de planejamento,
não capacidades já implementadas.

- Manter Next.js 16.3.6/React/TypeScript e um único projeto modular. Acesso ao domínio
  passa por serviços de aplicação e DAL de servidor; componentes recebem DTOs mínimos.
- Adotar PostgreSQL/Supabase para persistência, Auth e Storage privado. Domínio usa
  roles restritas, RLS, contexto de tenant por transação e FKs compostas; chaves de
  serviço ficam isoladas, nunca como credencial geral de consultas corporativas.
- Executar Graphile Worker como processo do mesmo projeto para extração/OCR,
  indexação, RAG e exportação. Fila no PostgreSQL, enqueue transacional e efeitos
  idempotentes. OCR e duração dos jobs justificam esse processo separado.
- Preservar originais, extrações, localizadores e revisões imutáveis. PDF.js,
  LibreOffice headless, Tesseract e ExcelJS atendem os formatos do MVP. OCR só é
  publicado após conferência humana. Conversão Office é preview identificado.
- Usar pgvector e busca textual no mesmo banco; adapter pequeno para embeddings e
  geração estruturada. IA não controla permissões, estados, reconhecimentos,
  aprovação nem exportação. Modelo/prompt/retrieval são versionados e avaliados.
- Aprovação e exportação operam sobre versões estáveis; leases, locks e snapshots
  evitam decisões sobre texto alterado. Auditoria guarda IDs; conteúdo fica no domínio
  protegido, fora de telemetria.

As razões, alternativas e custos operacionais estão em
[research.md](../specs/001-review-rfp-rfi/research.md). Começar com busca vetorial exata;
considerar índice aproximado após benchmark. Aumentar workers quando CPU/fila
justificarem; separar serviços apenas com necessidade demonstrada. Não introduzir
Redis, Kubernetes, banco por tenant ou orquestrador de agentes preventivamente.

Metas de qualidade de IA, retenção/residência, orçamento/SLO e certas decisões de
produto continuam gates explícitos no plano. Desenvolver com dados sintéticos até
validar condições de uso de dados reais. As tarefas já estão em `specs/001-review-rfp-rfi/tasks.md`; o fechamento das
decisões pendentes antecede a implementação solicitada pelo usuário. Este registro
não altera requisitos da especificação.
