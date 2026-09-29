<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Diretrizes da Tendra.ai

- Ao recomendar arquitetura, considerar escalabilidade, manutenção, segurança,
  custo operacional e a fase atual do produto. Explicar os benefícios e os
  sinais concretos que justificam evoluir a solução.
- Começar com uma aplicação modular no mesmo projeto. Separar serviços ou
  pacotes quando houver necessidade demonstrada; evitar complexidade antecipada.
- Design system e MVP compartilham componentes e tokens. Manter o catálogo em
  `/design-system`; adicionar Storybook quando a quantidade de estados,
  colaboração ou testes visuais justificar.
- Consultar `docs/architecture.md` e `docs/design-system/README.md` antes de
  mudanças estruturais ou visuais. Registrar novas decisões nesses documentos.
