# CI — verificação inicial

Em 2026-10-01, `.github/workflows/ci.yml` contém dois jobs locais e sintéticos:

- `quality`: npm ci, lint, typecheck, testes unitários, PostgreSQL/pgvector de integração, Supabase Auth/Storage e build Next.js.
- `infrastructure`: valida Compose, constrói web e ferramentas do worker, executa o check sem rede, aguarda os healthchecks web/ClamAV e consulta home e `/design-system`.

Os comandos foram verificados localmente e nos runs de push e PR do commit
`0df48b9`: os jobs `quality` e `infrastructure` passaram em ambos os gatilhos
([run do PR](https://github.com/evertonsoaressantos/tendra.ia/actions/runs/36864627016),
[run do push](https://github.com/evertonsoaressantos/tendra.ia/actions/runs/36864622622)).
As suites de contrato, E2E e avaliação entram nos jobs quando os respectivos
cenários existirem; nenhuma suite vazia é declarada aprovada.

Com autorização explícita do usuário, o repositório passou a público no GitHub
Free. A proteção de `main` foi verificada pela API: exige os contextos `quality`
e `infrastructure`, com `strict=true`, aplica-se a administradores, exige
histórico linear e impede force push e exclusão. A integração permanece no
[PR #1 em draft](https://github.com/evertonsoaressantos/tendra.ia/pull/1);
não houve merge. A falha inicial do Docker build por download de fontes foi
corrigida incluindo os arquivos WOFF2 e licenças em `src/fonts`; o build Docker
local e os dois runs remotos passaram depois da correção.
