# Pesquisa e decisões técnicas

Data: 2026-09-30. Escopo: design, sem provisionar serviços ou enviar dados corporativos. Pesquisa de segurança/filas e processamento documental realizada em paralelo por agentes conforme a skill. Repositório e documentação oficial foram as fontes; escolhas abaixo são decisões deste plano, não garantias dos fornecedores.

## R-01 — Aplicação modular e runtime

**Decisão:** manter Next.js 16.3.6, React 19.2.8, TypeScript 5 e Node 24 do projeto. DAL de servidor e serviços de domínio compartilhados com worker Node. Route Handlers são adaptadores finos, não repositórios de regras.
**Motivo:** reutiliza o investimento atual e mantém autorização centralizada e DTOs mínimos. Guias instalados de Next.js foram lidos em `node_modules/next/dist/docs/01-app/02-guides/data-security.md` e `01-app/01-getting-started/15-route-handlers.md`; parâmetros/cookies assíncronos devem seguir essa versão, não exemplos antigos.
**Alternativas:** backend separado dobra contratos/deploys sem necessidade; regras dentro de componentes dificultam testes. **Trade-off:** dois entrypoints exigem separar imports exclusivos do Next do núcleo Node; uma release continua coordenada.

## R-02 — PostgreSQL, RLS e identidade

**Decisão:** Supabase gerenciado para PostgreSQL, Auth e Storage; SQL migrations + `pg`, sem ORM obrigatório. Role restrita por runtime, RLS `USING/WITH CHECK`, `FORCE`, tenant e ator em contexto local da transação, FKs compostas. Usuário vem de sessão verificada e memberships atuais no banco.
**Motivo:** menos fornecedores no piloto e transações explícitas para workflow. RLS nega por padrão sem política; owners e roles privilegiadas exigem cuidados específicos. [PostgreSQL RLS](https://www.postgresql.org/docs/18/ddl-rowsecurity.html).
**Alternativas:** banco por tenant complica operação; filtros apenas na aplicação são insuficientes; auth própria amplia risco; Clerk/Auth0 adicionam serviço.
**Trade-off:** Supabase é dependência operacional; tabelas corporativas ficam privadas e identidade interna é desacoplada. `FORCE RLS` não neutraliza superuser/BYPASSRLS. Membership atual é obrigatória mesmo com JWT válido.

Sessão SSR e validação de claims seguem a [documentação SSR](https://supabase.com/docs/guides/auth/server-side/creating-a-client) e [getClaims](https://supabase.com/docs/reference/javascript/auth-getclaims). Não confiar apenas em `getSession`; não cachear dados autenticados globalmente. Convites e troca de administrador são operações auditadas; criar conta não concede tenant nem papel.

## R-03 — Objetos privados e upload

**Decisão:** upload direto resumível para bucket privado de quarentena; intenção autorizada antes e conclusão validada depois. Chave opaca por org/documento/versão; limite 50.000.000 bytes também no serviço de storage. Preview e download exigem autorização atual; exportações são entregues por endpoint autenticado, sem URL pública permanente.
**Motivo:** não prender web a transferência/processamento longo. [Uploads resumíveis](https://supabase.com/docs/guides/storage/uploads/resumable-uploads) e [controle de acesso](https://supabase.com/docs/guides/storage/security/access-control).
**Alternativas:** proxy de todos os uploads pelo Next aumenta carga; S3 independente é viável mas adiciona configuração. **Trade-off:** service/S3 keys ignoram RLS; restringir a adapter de storage e operações administrativas, sem reutilizar como acesso ao domínio. [Autenticação S3](https://supabase.com/docs/guides/storage/s3/authentication). Não logar tokens/URLs assinadas. Credencial privilegiada nunca chega ao browser.

## R-04 — Fila no banco e worker

**Decisão:** Graphile Worker no mesmo PostgreSQL, com processo Node separado da web no mesmo projeto. Enqueue transacional pela função SQL, payload apenas de IDs. Três tentativas transitórias iniciais, efeitos idempotentes e concorrência pequena.
**Motivo:** OCR e geração de múltiplas respostas ultrapassam a duração de request. [Graphile Worker](https://worker.graphile.org/docs), [enqueue SQL](https://worker.graphile.org/docs/sql-add-job), [job keys](https://worker.graphile.org/docs/job-key).
**Alternativas:** BullMQ exige Redis; workflow SaaS adiciona fornecedor; fila caseira reinventa locking/retry. **Trade-off:** fila compete pelo banco; medir latência/volume antes de separar. `job_key` não equivale a exatamente uma execução: unique keys de efeitos e publicação por versão são obrigatórias. Role da fila é separada da conexão tenant-scoped do domínio.

## R-05 — Extração, OCR e visualização

**Decisão:** PDF.js para texto e visualizador PDF; LibreOffice headless para preview PDF imutável de DOCX/PPTX; ExcelJS para valores/endereço de células e grade XLSX; Tesseract por+eng para OCR por página. Referências preservam hash do original, versão da extração e localizador.
**Motivo:** reaproveitar o mesmo sistema de coordenadas no processamento e na verificação humana. [PDF.js Node](https://github.com/mozilla/pdf.js/blob/master/examples/node/getinfo.mjs), [PDF.js viewer](https://mozilla.github.io/pdf.js/getting_started/), [LibreOffice CLI](https://help.libreoffice.org/latest/en-US/text/shared/guide/start_parameters.html), [ExcelJS](https://github.com/exceljs/exceljs), [Tesseract](https://tesseract-ocr.github.io/tessdoc/Installation.html), [TSV/hOCR](https://github.com/tesseract-ocr/tessdoc/blob/main/Command-Line-Usage.md).
**Alternativas:** Mammoth não resolve fidelidade visual e HTML exige sanitização; parser PPTX próprio traz custo alto; OCR externo adiciona transmissão de arquivos. **Trade-off:** LibreOffice aumenta imagem/CPU e depende de fontes; preview convertido deve ser identificado como tal, não como paginação original. Fixar fontes e versão do conversor em container; perfil e temporários isolados por job. PDF.js no worker requer renderer de canvas compatível com Node para rasterização de OCR.

PDF misto bloqueia publicação do documento até conferência de todo trecho OCR. Texto corrigido mantém vínculo ao original e ao texto reconhecido. Fórmulas XLSX não são executadas; ausência de valor calculado e conteúdo visual não extraível devem ser explicitados, sem sucesso que omita perguntas. Arquivos protegidos/corrompidos falham com orientação de reenvio. ClamAV faz inspeção inicial no worker; base de assinaturas atualizada por operação controlada, antes de desabilitar rede dos parsers. Indisponibilidade do scanner mantém arquivo em quarentena, sem alegar ausência de malware. [ClamAV scanning](https://docs.clamav.net/manual/Usage/Scanning.html). Limites técnicos de tempo/memória/descompressão são proteção operacional, não novos limites comerciais de páginas.

## R-06 — RAG próprio pequeno, busca híbrida

**Decisão:** recuperação PostgreSQL full-text + pgvector exato, filtrada por tenant e extração pronta antes de ranking. Adapter pequeno de embeddings e geração, sem agentes autônomos. Baselines e parâmetros estão no [plano](plan.md).
**Motivo:** poucas peças, provenance sob controle e nenhuma base vetorial de terceiros contendo corpus integral. Busca exata permite baseline de recall antes de otimização aproximada. [pgvector](https://github.com/pgvector/pgvector).
**Alternativas:** SaaS de file search reduz código mas dificulta localização própria e controle de ciclo de vida; banco vetorial dedicado adiciona operação; ANN desde o início pode reduzir recall sob filtros. **Trade-off:** desempenho de busca exata deve ser medido; HNSW só após evidência, avaliação com tenant filter e comparação de recall.

## R-07 — Provedor/modelo e privacidade

**Decisão:** baseline reproduzível `gpt-4.1-mini-2025-04-14` via Responses API, saída estruturada validada; embeddings `text-embedding-3-small`. É baseline para avaliação, não alegação de melhor modelo atual. Modelo/prompt/schema/retrieval são versionados. A documentação confirma o snapshot e a saída estruturada; não demonstra qualidade no domínio Tendra. [Modelo](https://developers.openai.com/api/docs/models/gpt-4.1-mini), [embeddings](https://developers.openai.com/api/docs/models/text-embedding-3-small), [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs).
**Motivo:** contrato explícito e substituição localizada, sem enviar arquivos integrais ao provedor nem usar ferramentas de agentes. **Alternativas:** modelo maior depende de avaliação/custo; modelo local aumenta infraestrutura; provider alternativo exige mesmo contrato e testes. **Trade-off:** suporte a schema não prova grounding. Recusa, truncamento e resultado inválido são estados explícitos.

Usar `store:false`, requisições foreground no worker e somente trechos necessários. Isso não garante retenção zero: controles do provedor distinguem estado de aplicação, monitoramento de abuso e elegibilidade específica. Validar condições da conta/região antes de dados reais (P-03). [Controles de dados](https://developers.openai.com/api/docs/guides/your-data). Nenhuma chave ou chamada real foi necessária neste planejamento.

## R-08 — Editor e exportação

**Decisão:** editor Tiptap com schema mínimo, armazenado como JSON validado; sem HTML arbitrário. DOCX por `docx`, XLSX por ExcelJS, ambos a partir de manifesto de revisões aprovadas. [Tiptap](https://tiptap.dev/docs/editor/core-concepts/schema), [docx Packer](https://docx.js.org/api/classes/index.Packer.html).
**Motivo:** limitar superfície do editor e evitar transformação de texto corporativo em HTML/fórmulas executáveis. **Alternativas:** textarea não atende negrito/listas; editor próprio aumenta manutenção; reconverter arquivo de entrada contraria exportação padronizada.
**Trade-off:** rich text não autoriza copiar estilos arbitrários. Células exportadas como strings, nunca fórmulas construídas de conteúdo. DOCX/XLSX contêm mesmos IDs, respostas, referências e identificação de trechos manuais sem fonte; links ao produto continuam autenticados e o arquivo não contém URLs temporárias de storage.

## R-09 — Testes, operação e decisões pendentes

**Decisão:** Vitest, Playwright/axe, banco real isolado e conjunto RAG sintético rotulado; testes de segurança determinísticos bloqueiam CI. Testes reais de IA são gate separado por release de pipeline. [Vitest](https://vitest.dev/guide/), [Playwright](https://playwright.dev/docs/intro).
**Motivo:** mocks não provam RLS nem corridas transacionais. **Alternativas:** só E2E deixa falhas difíceis de localizar; só testes unitários não verificam contratos externos. **Trade-off:** jobs/container/DB tornam integração mais lenta, justificável pelo risco.

Incógnitas técnicas pesquisadas (runtime, dados/Auth/storage, fila, extração/OCR, fontes, RAG, exportação e validação) têm decisões neste documento. P-02–P-05 do plano continuam pendências de produto/operação. P-01 teve o critério de produto resolvido por SC-013: ≥95/100 perguntas corretas e zero fatos não sustentados, fontes inventadas ou assuntos críticos omitidos na amostra; construir o conjunto, calibrar e avaliar continuam trabalho técnico a executar. P-06 foi resolvida em esclarecimento posterior: declaração manual explícita de informação indisponível pode resolver a lacuna, com alerta de ausência de fonte, aprovação humana e preservação na exportação. Não são resolvidas por arquitetura nem escondidas como defaults. O plano pode gerar tarefas com gates; não pode declarar pronto um release dependente delas.

Esclarecimento posterior de P-03: piloto com dados reais, exterior permitido com autorização dos destinos pela empresa, recuperação de entregas por 30 dias, exclusão ativa após esse prazo e backups até 90 dias do encerramento. São requisitos de produto confirmados, não afirmações de capacidade atual dos fornecedores. Verificar implementação e condições dos provedores antes do piloto.
