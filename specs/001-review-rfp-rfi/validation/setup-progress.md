# Setup — progresso e verificação

## Concluído

- T001: baseline e guias locais conferidos; ver baseline.md.
- T002: dependências novas fixadas, inventário de licenças/engines, smoke de bibliotecas e auditoria sem alertas; ver dependencies.md.
- T003: configuração validada, modo fixture padrão, credenciais por role, erros sem valores sensíveis e `.env.example` sem segredos.
- T004: suites configuradas, PostgreSQL/pgvector descartável por tmpfs em `infra/compose.test.yaml`, guard de URL local e 2 testes reais de conexão/extensão aprovados. A suite de integração foi ligada à CI.
- T005: Supabase CLI 2.119.0 fixada; configuração local mantém PostgreSQL/pgvector, Auth, Storage, API e Mailpit. `npm run test:services` passou com usuário e bucket privados sintéticos. A imagem web Node 24 fixada por digest construiu, ficou `healthy` e respondeu HTTP 200 na home e em `/design-system`. Da web, Auth e Storage retornaram HTTP 200 e a porta PostgreSQL ficou acessível. A imagem de ferramentas do worker construiu com LibreOffice, Tesseract eng/por, fontes e canvas em versões fixadas e passou sem rede. ClamAV oficial 1.4.6 fixado por digest ficou `healthy` em rede interna sem portas publicadas e varreu `/etc/hosts` com resultado limpo. O consumer real da fila continua na T021; a execução segura de parsers e a política de atualização/bloqueio das assinaturas continuam na T053.

## Verificações executadas

- 11 testes unitários passaram (configuração e bloqueio de destinos inseguros para testes destrutivos).
- 2 testes de integração PostgreSQL/pgvector e o smoke sintético de Auth/Storage passaram localmente.
- Lint, TypeScript e build de produção passaram após alterações.
- `git diff --check` passou.

## Parcial, não marcado como concluído

- E2E e contratos aguardam implementação das jornadas; o runner está configurado e não declara suite vazia como aprovada.
- T006: CI configurada para as suites disponíveis e smoke da infraestrutura, mas ainda não executada no GitHub. A proteção de `main` e os rulesets retornam HTTP 403 no repositório privado com o plano atual; ver [ci.md](ci.md). Nenhuma suite vazia foi declarada aprovada.

## Ambiente de containers desbloqueado — 2026-10-01

Docker Desktop está funcionando. O motor 29.8.1 responde em aarch64 e o container oficial `hello-world` foi baixado e executado com sucesso (exit 0), com remoção automática do container de teste. Docker Compose 5.5.1 está disponível. O impedimento de inicialização foi resolvido; T004 e T005 foram concluídas depois com os serviços locais e imagens do projeto.

O banco descartável de T004 foi posteriormente iniciado com `docker compose -f infra/compose.test.yaml up -d --wait`. Para repetir: `TEST_DATABASE_URL=postgresql://tendra_test:tendra_test_local_only@127.0.0.1:55432/tendra_test_pilot npm run test:integration`; encerrar com `docker compose -f infra/compose.test.yaml down`. O endereço é local e os dados residem em tmpfs, sem persistência após o container parar. Para os serviços Supabase locais, criar uma rede Docker com portas em `127.0.0.1`, executar `npx supabase start --network-id tendra-local --yes` e depois `npm run test:services`. Para as imagens: `docker compose -f infra/compose.yaml build web worker-tools`, `docker compose -f infra/compose.yaml run --rm worker-tools` e `docker compose -f infra/compose.yaml --profile scan up -d --no-build --wait web clamav`. O scanner usa assinaturas embutidas na imagem pinada para o smoke local; T053 deve atualizar/verificar sua validade antes de analisar conteúdo corporativo.

Nenhum serviço externo foi provisionado, nenhum convite foi enviado e nenhum dado corporativo foi processado. Políticas de treinamento/metadados e aceite de métricas continuam pendentes; autorização de início não foi interpretada como resposta às decisões de produto.

## Atualização — instalação de Docker autorizada

Docker Desktop 4.93.0 foi instalado em `/Applications/Docker.app` a partir do DMG oficial Apple Silicon. CLI verificada: Docker 29.8.1. Termos aceitos pelo usuário. O motor falhou inicialmente ao instalar Rosetta, conforme log do próprio Docker. A opção opcional de Rosetta foi desativada na interface. Em 2026-10-01, `docker desktop start --timeout 60` executado fora do sandbox iniciou backend e virtualização; `docker info` e o container oficial de teste comprovaram a recuperação. Nenhuma limpeza de dados ou restauração de fábrica foi necessária. A tentativa CLI de cópia falhou; cópia pelo Finder concluiu sem solicitação de senha. Não marcar T004/T005 concluídas apenas pela presença do aplicativo.

Diretriz do usuário sobre interface registrada em AGENTS.md, docs/design-system/README.md e tasks.md: design system obrigatório; componente ausente deve vir do shadcn e ser adaptado ao preset/tokens existentes.

Uma tentativa anterior fora do sandbox foi bloqueada por limite de uso na revisão automática. Na retomada, o escalonamento foi aprovado e a inicialização funcionou. Comandos Docker exigem acesso ao socket e diretórios do aplicativo fora do workspace; falha desse acesso no sandbox não deve ser confundida com falha da aplicação Tendra.
