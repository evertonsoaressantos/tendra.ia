# CI — verificação inicial

Em 2026-10-01, `.github/workflows/ci.yml` contém dois jobs locais e sintéticos:

- `quality`: npm ci, lint, typecheck, testes unitários, PostgreSQL/pgvector de integração, Supabase Auth/Storage e build Next.js.
- `infrastructure`: valida Compose, constrói web e ferramentas do worker, executa o check sem rede, aguarda os healthchecks web/ClamAV e consulta home e `/design-system`.

Os comandos foram verificados localmente; o workflow ainda não foi publicado nem executado pelo GitHub Actions. As suites de contrato, E2E e avaliação entram nos jobs quando os respectivos cenários existirem; nenhuma suite vazia é declarada aprovada.

O acesso autenticado ao repositório privado `evertonsoaressantos/tendra.ia` confirmou `main` como branch padrão. A consulta às APIs de proteção de `main` e de rulesets retornou HTTP 403: “Upgrade to GitHub Pro or make this repository public to enable this feature.” A [documentação do GitHub](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) confirma essa limitação para repositórios privados no plano Free. Assim, a exigência de checks obrigatórios antes de merge/deploy continua aberta; desenvolvimento e testes sintéticos locais não exigem merge. Não alterar visibilidade do repositório nem contratar um plano por conta própria.
