# Contratos internos: documentos, RAG e jobs

Estes contratos ficam no servidor/worker; não oferecem ferramentas ao modelo. Versão inicial `v1`. Todos os objetos corporativos incluem org validada pelo handler e IDs de versões imutáveis.

## Documento extraído

Entrada: documentVersionId, expectedHash, extractorVersion. Saída:

- `extractionId`, `revision`, `method` native/ocr/mixed/office_rendition/spreadsheet;
- `sourceHash`, `renditionHash?`, `requiresConfirmation`, `units[]`;
- unidade: `id`, `text`, `language?`, `locator`, `warnings[]`;
- locator: PDF `{page, boxes, span}`; Office `{renditionId,page,boxes,span}`; XLSX `{sheet,range}`;
- `status`: complete/awaiting_confirmation/failed, `safeErrorCode?`.

Nenhum resultado parcial pode ser publicado como completo. OCR confidence pertence à extração, não à resposta. Confirmação é registro humano separado de saída do parser. Textos são domínio protegido. Links e macros nunca são seguidos/executados. Worker destrói temporários ao terminar e em recuperação após crash.

## Recuperação

Entrada: itemId, questionRevision, activeIndexVersion; tenant obtido de recurso persistido. Saída `RetrievalManifest` imutável com pipeline/model/dimension, candidatos autorizados, scores de ranking (não “probabilidade de verdade”), chunk/source/extraction IDs, locators e hashes. Busca não pode usar corpus de outra org nem documentos em quarentena/OCR pendente. Referências históricas incluem approvalId e aprovação original; novo item continua não aprovado.

Ranking inicial combina texto e vetor por reciprocal rank fusion. Distâncias vetoriais são diagnósticos; limiar de sustentação depende de avaliação P-01. Versionar parâmetros. Chunk sem texto verificável ou fonte indisponível não vira evidência verificada.

## Geração estruturada

Entrada do adapter: `question`, `language`, `evidenceCandidates[]` com IDs opacos e trechos autorizados, `schemaVersion`, `promptVersion`, `modelSnapshot`. Sem acesso a storage/banco, sem browser, function calls ou comandos de workflow.

Saída do modelo:

```text
status: supported | partial | no_context | conflict
claims: [{id, text, evidenceIds[]}]
gaps: [{id, description}]
conflicts: [{id, evidenceIds[], description}]
criticalCandidates: [liability | penalties | legal_guarantees |
                     data_protection | security_commitments | contractual_sla]
```

IDs de gaps/claims são normalizados pelo servidor para unicidade; modelo não escolhe IDs de entidades persistidas. Todos os campos são validados; propriedades extras, texto incompleto, recusa e truncamento geram resultado não publicável. `status` do modelo é sinal a validar, não estado de workflow nem autorização.

Validação determinística: schema, IDs no manifesto, tenant e versões, existência de trechos/hash, localizadores, nenhuma referência não fornecida. Claim sem evidência não pode ser publicada como sugestão sustentada. Verificação de suporte semântico é etapa avaliada separadamente, sujeita a SC-013: até comprovar atendimento aos critérios, apenas fixtures/sandbox. Se validador/serviço falhar, `failed`, não `no_context`.

Publicação: zero conteúdo sustentado → sem rascunho; parcial → texto sustentado + lacunas pendentes + baixa confiança; conflito → fontes e decisão humana; conteúdo manual tem autoria separada. Saída inválida não dispara loop ilimitado de “consertar JSON”. Nenhuma chamada de modelo cria revisão humana, reconhecimento ou aprovação.

## Alertas e avaliabilidade

- Idade de fonte: trusted updated_at, `now - updated_at >120 dias`; ausente → unknown_age. Não usar upload como atualização. Resposta histórica: aprovação da versão reutilizada >120 dias, separada da fonte.
- Críticos: seis categorias fixas. Regras bilíngues + classificador para paráfrases produzem candidatos; software cria alertas e exige confirmação humana. False negatives são medidos; nenhuma autodeclaração de confiança elimina alerta encontrado. Avaliar pergunta+resposta em cada geração, escrita manual, edição e restauração; resultado é vinculado à revisão/política. Aprovação e exportação atual ficam bloqueadas enquanto pending/failed; resultado obsoleto não altera a versão atual.
- Conflitos: preservar ambas as fontes, permitir decisão individual. Reconhecimento não remove o conflito da história.
- Lacunas: blocking flag calculado do conjunto atual; reconhecer low_confidence não resolve gaps. Completar manualmente exige identificação de trechos sem fonte e alerta pertinente.

Conjunto de avaliação com perguntas pt/en, fontes cruzadas, ausência total, cobertura parcial, contradições, idade 120/121 dias, data desconhecida, seis categorias críticas com paráfrases/negações, OCR, instruções maliciosas em documentos, IDs forjados e duplicação de texto em tenants. Medir recall@k de fontes rotuladas, validade de citação/localizador, unsupported claims, cobertura, falsos negativos críticos/conflitos, latência e tokens. Aplicar SC-013: pelo menos 95/100 perguntas corretas, sem fatos não sustentados, fontes inventadas ou assuntos críticos omitidos na amostra humana representativa. Calibrar parâmetros técnicos com exemplos separados da amostra de aceitação, para evitar validar apenas casos usados no ajuste. Invariantes de isolamento, papéis e fonte inventada são gates de tolerância zero nos testes controlados. Comparar baseline antes de promover mudança de prompt/modelo/retrieval e manter rollback da configuração. Avaliar adicionalmente o detector real sobre conteúdo manual, editado e restaurado em conjunto rotulado separado, cobrindo as seis categorias críticas e paráfrases pt/en, sem omissões dos riscos rotulados. Testar a integração com bloqueio pending/failed e descarte de resultados de revisão obsoleta; reportar separadamente, sem alterar o denominador de SC-013.

## Jobs

Payload comum: `{processingRunId, resourceId, inputVersion, pipelineVersion}`; tenant é resolvido do registro de execução confiável, não apenas do payload. Tipos: validate_upload, extract_document, index_document, extract_questions, generate_item, assess_answer_risk, render_export. Valores corporativos não trafegam na fila.

Estados: queued/processing/completed/failed; waiting-for-human é pausa do agregado, sem job ativo consumindo slot. Saída persistida sob CAS da versão e unique logical key. Publicação de index/item/export somente após transação íntegra. Retry transitório limitado a 3; backoff exponencial e jitter; permanent errors não repetidos automaticamente. 429 respeita retry-after. Reprocessamento não sobrescreve edição humana nem aprovação.

Job crash após gravação e antes de ack deve retornar resultado idempotente ao retomar. Tentativa obsoleta não publica depois de versão mais nova. Membro removido não recebe nova exportação; worker não herda autoridade permanente do solicitante. Falhas são categorizadas sem prompt/texto na exceção pública. A avaliação de risco de edição usa job por revisão/política com publicação CAS e pode escrever somente seu resultado/sinais, nunca decisões humanas.

## Manifesto de exportação e eventos

Manifesto: taskId, taskEpoch, format, ordered items com questionId/label, questionVersion, answerRevision, approvalId, evidence references, manual segments e rendererVersion. Ambos renderers consomem o mesmo contrato. Em XLSX, conteúdo textual é célula string; em DOCX, schema rico permitido, sem HTML/links arbitrários. Referências apresentam título/versão/página ou aba/células; links do produto exigem sessão.

Audit event: `{orgId,actorId,action,resourceId,revisionId?,result,at,correlationId}`. Telemetria: `{eventType,orgId,technicalIds,stage?,durationMs?,counts?,modelVersion?,tokens?,formulaVersion?}`. Allowlist rejeita chaves extras. Não incluir filenames, e-mails, perguntas, respostas, trechos, justificativas, tokens de sessão nem URLs assinadas. Logs de SDK/processos devem ser sanitizados antes de emissão.
