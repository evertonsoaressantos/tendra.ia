# Baseline de implementação — 2026-09-30

T001 concluída. Início solicitado pelo usuário após informação das decisões pendentes; o início não aprova políticas de tratamento nem metas propostas.

| Checklist | Total | Atendidos | Abertos | Estado |
| --- | --- | --- | --- | --- |
| requirements.md | 16 | 12 | 4 | Pendências de produto preservadas |

## Ambiente observado

- Node v24.21.0; npm 11.19.0; Next.js 16.3.6; React 19.2.8.
- Projeto único; páginas existentes `/` e `/design-system`; nenhum fluxo do MVP implementado neste baseline.
- `npm run lint`: passou.
- `npm run typecheck`: passou.
- `npm run build`: passou (webpack, duas páginas existentes e not-found).
- Docker não encontrado no PATH nem nos caminhos usuais de Docker Desktop/Homebrew. Isso impede comprovar o ambiente de integração até que um runtime esteja disponível.
- Consulta npm no sandbox falhou em DNS; consulta com acesso externo aprovado funcionou. Nenhum dado corporativo foi enviado.

## Documentação consultada

- AGENTS.md, docs/architecture.md e docs/design-system/README.md.
- Constitution, spec, plan, tasks, research, data-model, contratos e quickstart da feature.
- Guias instalados do Next: data-security, route-handlers, testing/vitest e testing/playwright.
- Testes de Server Components assíncronos devem usar E2E; regras de domínio continuam independentes do Next.

## Preservação

Alterações preexistentes em constitution, arquitetura, design system e specs foram preservadas. Checklist não foi alterado. Não houve deploy, convites reais ou provisionamento de serviços.
