# Guia de validação — MVP Tendra.ai

Este guia distingue o que já existe do que será criado na implementação. Não é uma afirmação de que o MVP já funciona. [Modelo](data-model.md), [contrato da aplicação](contracts/application.md), [pipeline](contracts/pipeline.md) e [gates do plano](plan.md) são referências normativas desta fase.

## Estado atual

O repositório contém a aplicação Next.js, o catálogo visual, dependências fixadas, configuração de ambiente e 11 testes unitários iniciais. Não existem ainda banco operacional, autenticação funcional, worker ou integração IA do MVP. O progresso está em [setup-progress.md](validation/setup-progress.md). Com Node 24 e dependências do lockfile, estes comandos atuais verificam a base:

```sh
npm ci
npm run lint
npm run typecheck
npm run build
npm run dev
```

Abrir `http://localhost:3000/design-system`. O build pode precisar baixar as fontes configuradas; não interpretar falha de rede como erro de domínio. Lint, TypeScript, build e os testes unitários iniciais foram executados; isso não valida os fluxos do MVP. `npm run test:unit` está disponível. Configurações e scripts de integração/contrato/E2E existem, mas as suites de domínio e os serviços locais ainda estão pendentes.

## Ambiente a preparar durante a implementação

Pré-requisitos: Node 24, Docker, Supabase CLI, PostgreSQL com pgvector, ambiente privado de storage/Auth, container worker com LibreOffice/fontes fixadas, Tesseract por+eng, PDF.js/renderer e scanner ClamAV. Fixar versões/digests no lockfile/imagem; credenciais de migração separadas de runtime.

A implementação deve criar `.env.example` sem secrets, migrations, seeds sintéticos e os scripts abaixo. Segredos locais ficam em `.env.local` ignorado pelo Git; injetar no worker por ambiente, nunca no browser. Variáveis propostas:

- `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`: identidade/serviço; publicar somente valores destinados ao browser quando necessário.
- `SUPABASE_SECRET_KEY`: somente adapters restritos de convite/storage.
- `DATABASE_URL_APP`, `DATABASE_URL_WORKER_DOMAIN`: roles sem owner/BYPASSRLS.
- `DATABASE_URL_QUEUE`: consumo de fila, sem acesso geral ao domínio.
- `DATABASE_URL_MIGRATION`: somente migrações, fora dos processos web/worker.
- `OPENAI_API_KEY`, `GENERATION_MODEL`, `EMBEDDING_MODEL`: apenas worker, quando testes reais autorizados pelo gate de dados.
- `AI_MODE=fixture`, `PIPELINE_VERSION`, `APP_ORIGIN`, `SUPPORT_URL`: desenvolvimento determinístico e suporte.

Não apontar reset/seed para produção. Todos os comandos seguintes são **contratos de scripts a implementar**, não comandos disponíveis hoje:

```sh
supabase start
npm run db:migrate:local
npm run seed:pilot
npm run worker:dev
```

Em outro terminal, iniciar `npm run dev`. `seed:pilot` deve criar somente dados sintéticos: tenants A/B; Revisor, Aprovador e administrador sem papel de Aprovador em A; participantes em B; documentos pt/en com fontes completas/parciais/conflitantes/antigas/data ausente; RFP de 100 itens e fixtures pequenas de cada formato. Autenticação local e caixa de e-mail de teste fornecem convites sem mensagens a pessoas reais.

## Comandos de validação previstos

```sh
npm run test:unit
npm run test:integration
npm run test:contract
npm run test:e2e
npm run eval:rag:fixtures
npm run lint
npm run typecheck
npm run build
```

CI usa banco/storage/Auth locais e fixtures, jamais documentos de clientes. `npm run eval:rag:provider` será um comando separado para modelo real com orçamento limitado, corpus autorizado e relatório versionado; não é condição para testes determinísticos comuns, mas é gate para promover configuração real de IA. Não exibir secrets ou respostas no console do runner.

## Percurso de aceitação

1. Operador Tendra cadastra organização e primeiro administrador convidado. Pessoa não convidada não assume administração. Administrador atribui Revisor/Aprovador; sua própria administração não concede aprovação. Troca administrativa exige confirmação referenciada e preserva papéis/histórico.
2. Entrar em organização vazia: onboarding oferece upload e “Fazer depois”; criar RFP sem base é permitido com aviso. Ausência de contexto deixa editor manual, sem sugestão inventada.
3. Carregar PDF, DOCX, XLSX, PPTX e histórico importado. Sair/retornar mostra estados por arquivo. Arquivo inválido não interrompe outros; retry não duplica. Histórico importado nunca recebe aprovador inventado.
4. Carregar PDF digitalizado pt/en: original e texto extraído abrem para conferência; corrigir e confirmar versão. Antes disso não há indexação nem geração. Alteração concorrente de extração invalida confirmação com hash antigo.
5. Criar tarefa com nome/empresa/tipo/prazo/responsável. Prazo passado e responsável de B são rejeitados. Gerar itens em background, preservando IDs/ordem/perguntas; zero itens e falha parcial não habilitam entrega.
6. Abrir item e evidência exata (página/trecho/célula); fechar restaura foco e edição. Sugestão em idioma da pergunta usa fontes pt/en. Falta de data exibe atualidade desconhecida. OCR confidence não vira selo de certeza.
7. Editar com negrito/itálico/listas, autosave, original consultável/restaurável. Segunda sessão só consulta o mesmo item; outros itens podem ser editados. Desligar rede e esperar lease expirar: sessão antiga não sobrescreve nova revisão, conteúdo não salvo permanece recuperável na sessão.
8. Exercitar ausência total, parcial, conflito e todos os alertas: reconhecimento individual, resolução de fonte e lacunas; seis assuntos críticos exigem confirmação do Aprovador para a versão atual. Revisor não pode substituir essa confirmação. Declarar manualmente “não dispomos dessa informação” pode resolver a lacuna; testar autoria, alerta de ausência de fonte, aprovação separada e preservação da declaração na exportação.
9. Revisor marca Revisada, mas não aprova/exporta por API direta. Aprovador pode aprovar diretamente sugestão válida sem revisão prévia. Lease ativo, texto vazio, versão antiga, alerta ou lacuna pendente bloqueiam. Editar aprovado invalida aprovação atomicamente e volta a Em revisão. Toda edição/manual/restauração cria avaliação de risco pendente: introduzir multa/garantia exige avaliação concluída e confirmação da versão nova, inclusive se antes não havia alerta crítico.
10. Aprovar todos os itens e exportar DOCX e XLSX. Comparar IDs/perguntas/respostas/fontes com manifesto aprovado; manuais sem fonte identificados; texto original alterado não substitui versão final. Falha de renderer permite retry e não anuncia sucesso. Edição durante exportação torna job stale antes da publicação/download como entrega atual. Após encerramento, arquivo publicado anteriormente pode ser recuperado pelo Aprovador vigente durante 30 dias como histórico, sem regeneração; testar recusa de nova exportação pendente, papel revogado e expiração.
11. Consultar histórico: aprovador/data/fontes/versão permanecem; fonte indisponível é explícita. Reutilizar resposta aprovada >120 dias exige novo reconhecimento e nova aprovação, sem mudar a aprovação original.
12. Avaliar sugestão positiva/negativamente com justificativa. Inspecionar telemetria: apenas metadados/valores calculados, sem justificativa/pergunta/resposta/evidência. Sem observações, métricas mostram sem dados; Q-08 não ganha meta inventada.

## Matriz de testes por risco e requisito

| Requisitos | Tipo de teste / cenário | Evidência esperada |
| --- | --- | --- |
| F-01–04, FR-INPUT-01 | Integração/UI de onboarding, formatos, OCR, idade e base vazia | Estados corretos, versão confirmada, sem aprovação importada |
| F-09–12 | Integração de importação/polling/progresso, zero itens/parcial/retry | Total estável, processamento pronto só após conclusão, nenhum duplicado |
| F-18–20 | E2E teclado/foco/fontes/editor, save falho, lease e original | Navegação sem perda silenciosa, token obsoleto recusado |
| F-21–22 | Unidade e banco concorrente: alertas, seis categorias, gaps, revisão/aprovação | Gates determinísticos; ações por versão/pessoa/instante |
| F-23 | Contrato de feedback e sanitização | Polaridade mensurada; justificativa fora dos logs |
| F-26–27 | Integração+E2E de exportação, manifesto, histórico e idade | Só revisão vigente aprovada; histórico preservado |
| FR-ROLE-01 | Sessão viva após revogação, admin sem papel, troca falha | Permissão atual aplicada imediatamente; troca atômica |
| FR-SEC-01–04, SC-002–003 | Banco real, API, storage, vetores e worker com tenant/IDs forjados | Zero acesso cruzado e nenhuma ação crítica da IA |
| SC-004–009 | Fixtures de fórmulas/deduplicação/baseline/denominador zero | Dados mensuráveis, rótulo de fórmula proposta e no_data |
| SC-010 | Capturar logs, exceptions, eventos e traces com strings sentinela | Nenhum conteúdo/token/URL assinada |
| SC-011 | axe + teclado/leitor de tela em fluxos principais | Problemas corrigidos; automação não declara conformidade sozinha |
| SC-012 | Benchmark troca de itens na fixture de 100 | Relatório p50/p95; alvo continua proposto até P-02 |
| SC-013 | Avaliação humana de 100 perguntas representativas pt/en, ausência, lacunas, conflitos e seis assuntos críticos | ≥95 corretas; zero fatos não sustentados, fontes inventadas ou assuntos críticos omitidos |
| Constitution IV/VIII | Evals de suporte, conflito, recusa, prompt injection, falha externa | Sem fonte inventada, falha distinta de no_context |

## Casos adversariais e recuperação

- RLS com role real, sem tenant, contexto A→B no mesmo pool, joins e FKs cruzados; mesmo texto/chunk em A/B não permite recuperação cruzada.
- Upload válido de 50.000.000 bytes e 50.000.001; MIME divergente, ZIP bomb/traversal, PDF cifrado, malware, fórmula XLSX sem cache, conversão Office com fontes/tabelas/SmartArt; limitação não pode virar sucesso incompleto.
- Kill do worker antes/depois de gravar efeito e antes do ack; reentrega não duplica item/índice/exportação. Falha de enqueue faz rollback da mutação, sem estado órfão.
- Corridas save/approve, role change/approve, alert update/export e worker obsoleto/new version. Testar todas com barreiras determinísticas, não apenas sleeps.
- Restaurar banco e objetos em ambiente isolado, conferir hashes, vínculos e jobs. Registrar tempo/perda observados; não declarar RPO/RTO contratado sem P-04.

## Validação das decisões de dados do piloto

Verificar bloqueio de envio para destino não autorizado e mudança de país/provedor. Com relógio controlado, encerrar piloto sintético e testar recuperação autorizada antes de 30 dias, exclusão ativa ao completar o prazo, falha de exclusão explícita e expiração das cópias até 90 dias do encerramento. Restaurar backup em ambiente isolado e comprovar que conteúdo vencido não é republicado. Verificar as cópias aplicáveis dos provedores antes do piloto real; não usar apenas o teste local como prova.

## Critério para avançar

Todos os testes obrigatórios implementados e verdes; nenhuma falha de isolamento/workflow/rastreabilidade; comprovação de SC-013 (≥95/100 e zero falhas nos três critérios críticos) antes de release de geração real, P-03 antes de dados corporativos reais, P-04 antes de compromisso operacional. P-06 foi resolvida: validar o fluxo de declaração manual de informação indisponível. P-02 preserva metas/fórmulas propostas; Q-13 exige usuários reais antes de escala. Publicar relatório com versão do pipeline e limitações, não apenas print de chamada LLM bem-sucedida.
