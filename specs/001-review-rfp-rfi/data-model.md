# Modelo de dados — MVP Tendra.ai

Derivado de [spec.md](spec.md). PostgreSQL; UUIDs técnicos, timestamps UTC, datas de prazo sem horário interpretadas na timezone da organização (default operacional America/Sao_Paulo, explícito na UI). Conteúdo rico é JSON de schema restrito; texto derivado serve a busca/exportação, nunca a log.

## Invariantes de isolamento e integridade

Toda entidade corporativa possui `organization_id NOT NULL`; PK `id` e UNIQUE `(organization_id,id)` para FKs compostas. Usuário global de identidade é exceção, ligado por membership. Todas as referências corporativas, inclusive evidência→chunk, job→documento e item→tarefa, validam mesma organização. RLS habilitada/forçada, tenant ausente nega acesso. Roles runtime não são proprietárias. Índices começam por tenant nas consultas de domínio. Tenant do request é seletor a validar, não prova de autorização.

Versões publicadas são imutáveis; alteração cria nova versão. Checks de papel atuais ocorrem dentro da mesma transação de decisão. Não usar cascade que apague aprovação/auditoria ao mudar papel. Conteúdo e metadados têm políticas de acesso próprias; não duplicar conteúdo em eventos.

## Entidades e relacionamentos

| Entidade/tabela | Campos principais e regras |
| --- | --- |
| `organizations` | id, name, timezone, created_at, pilot_ended_at nullable, active_content_delete_at, backup_expire_by; prazos derivados do encerramento conforme FR-SEC-06; cadastro operacional Tendra |
| `memberships` | organization_id, user_id (Auth subject), role nullable `reviewer/approver`, is_admin, active, version; unique org/user. Admin não implica papel de produto; um administrador ativo por org no MVP |
| `admin_transfers` | org, previous_user, next_user, operator_id, confirmation_reference, created_at; troca atômica; confirmação não contém documentos de cliente em logs |
| `invitations` | org, intended_subject/email protegido, token_hash, expires_at, accepted_at, intended_capability, created_by; uso único e vínculo verificado; e-mail não determina tenant |
| `documents` | org, id, kind `knowledge/imported_history/questionnaire`, display_name, uploaded_by, current_version_id, status, support_reference nullable |
| `document_versions` | org, document_id, version, object_key, sha256, byte_size ≤50000000, verified_mime, source_updated_at nullable, updated_at_provenance, available, created_at; objetos imutáveis. Upload não é atualização da fonte |
| `extractions` | org, document_version_id, revision, extractor_version, rendition_key/hash nullable, units_json ou referências protegidas, ocr_required, status, confirmed_by/at, confirmed_hash; original preservado e OCR bruto separado de correções |
| `chunks` | org, extraction_id, index_version, ordinal, text protegido, token_count, locator JSON, source_hash; unique versão/ordinal. Só extração válida e OCR confirmado podem ficar search-ready |
| `chunk_embeddings` | org, chunk_id, model, dimensions, index_version, embedding; unique chunk/model/index_version. Nunca comparar vetores de espaços diferentes |
| `processing_runs` | org, resource_kind/id/version, stage, pipeline_version, status, attempt, progress_done/total nullable, safe_error_code, retryable, timestamps; unique logical_job_key |
| `rfp_tasks` | org, name, recipient_company, kind RFP/RFI, due_date, owner_user_id, questionnaire_version_id, processing_status, content_epoch; responsável precisa membership ativa; rejeitar prazo passado na criação |
| `items` | org, task_id, ordinal, original_label, question_text, question_language pt/en, question_locator, current_revision_id nullable, original_suggestion_id nullable, state, lock_epoch; unique task/ordinal, label original pode repetir |
| `suggestions` | org, item_id, pipeline_version, model_snapshot, prompt_version, retrieval_manifest, output protegido, status, created_at; sugestão original nunca sobrescrita por edição humana |
| `answer_revisions` | org, item_id, revision, rich_text, plain_text protegido, origin `suggested/manual/mixed`, author_user_id nullable para geração, suggestion_id nullable, previous_id, created_at; imutável |
| `evidence_links` | org, answer_revision_id/suggestion_id, claim_id, chunk_id nullable, historical_approval_id nullable, source_version_id, locator, quoted_span/hash, verification_status; fonte externa ao conjunto recuperado é inválida; indisponibilidade não apaga metadados |
| `gaps` | org, item_id, answer_revision_id, description protegida, status pending/resolved, resolution_type, resolved_by/at; resolution_type inclui manual_unavailable, vinculado à declaração manual na resposta e ao alerta de ausência de fonte; pending bloqueia gate |
| `alerts` | org, item_id, answer_revision_id, kind, source_ref nullable, critical_category nullable, condition_hash, active; tipos: low_confidence, conflict, old_source, unknown_age, critical, manual_no_source, old_answer |
| `alert_actions` | org, alert_id, revision_id, actor_id, action `acknowledge/select_source/manual/confirm_validation`, selected_source_id nullable, condition_hash, at; append-only, cada alerta individual, confirmação crítica só approver |
| `review_decisions` | org, item_id, revision_id, actor_id, kind `review/approve/invalidate`, previous_decision_id nullable, at; aprovação vigente projetada no item, invalidação não apaga histórico |
| `edit_leases` | org, item_id unique, holder_user_id, session_id, fencing_token monotônico, expires_at, last_activity_at; retomada exige novo token |
| `exports` | org, task_id, requested_by, format docx/xlsx, task_epoch, manifest JSON protegido, status, object_key nullable, sha256, created_at/completed_at, published_at nullable e imutável após publicação; manifesto lista revisões/aprovações/fontes imutáveis |
| `feedback` | org, suggestion_id, actor_id, polarity positive/negative, justification protegida nullable, created_at; métricas recebem apenas polaridade/IDs |
| `audit_events` | org, actor_kind/id, action, resource_kind/id, revision_id nullable, result, correlation_id, at; append-only, sem corpo corporativo |
| `metric_events` | org, event_type, technical_ids, numeric_measures, formula_version, at; allowlist sem textos livres |

Histórico F-27 é consulta de aprovações e revisões, não cópia de todos os textos em outra tabela. RFP antiga importada continua documento e não recebe `review_decisions.approve`. Conteúdo histórico também obedece FR-SEC-06: recuperação por 30 dias após encerramento, exclusão ativa ao fim do prazo e backups expirados até 90 dias. Não conservar texto corporativo em auditoria como forma de contornar a exclusão. Retenção de metadados sem conteúdo ainda depende de definição.

## Hierarquia da informação

- Organização é a fronteira de acesso e propriedade dos dados.
- Usuário de identidade pode ter vínculos em organizações; cada membership define capacidades naquele contexto. Administrador gerencia papéis e não recebe aprovação implicitamente.
- Organização → documentos → versões → extrações → chunks → embeddings. Originais e previews ficam no Storage privado; referências, hashes e relacionamentos ficam no PostgreSQL.
- Organização → tarefas RFP/RFI → itens/perguntas → sugestões e revisões de resposta → evidências, avaliações de risco, lacunas, alertas e decisões humanas.
- Evidências ligam uma revisão/sugestão às fontes versionadas da mesma organização. Não são cópias independentes sem origem.
- Tarefa → exportações → manifesto das revisões aprovadas. Histórico consulta as decisões e versões preservadas.
- Auditoria e métricas referenciam os recursos por IDs e não duplicam seu conteúdo.

## Proveniência e localizadores

PDF original: página 1-based, bounding boxes normalizadas, offsets e hash do trecho. OCR: mesmo original/página, caixas reconhecidas, versão corrigida e confirmação. DOCX/PPTX: original + hash do preview PDF derivado + página/caixas da conversão versionada; nunca alegar que paginação do preview é idêntica ao editor original. XLSX: nome/ID da aba, intervalo A1, valores capturados e contexto de cabeçalhos. Link de evidência resolve IDs no servidor, não URL fornecida pelo modelo.

## Transições

| Agregado | Transições e condições |
| --- | --- |
| Upload | intent → uploaded → validated → queued; erro de tamanho/tipo → rejected, sem job de extração |
| Documento/run | queued → processing → awaiting_confirmation (OCR) → processing → completed/ready; falha → failed; retry explícito preserva versões. `support` é acompanhamento do documento, não sucesso do job |
| Tarefa | queued → processing → awaiting_confirmation quando necessário → processing → ready; falha parcial → failed com progresso confirmado; zero itens nunca ready/exportável |
| Item | Sem rascunho → Sugerida por geração válida; qualquer edição salva → Em revisão; ação humana válida → Revisada; Aprovador pode ir direto de Sugerida/Em revisão/Revisada a Aprovada se gates satisfeitos |
| Item aprovado | Nova revisão → Em revisão + invalidate anterior + novo epoch; nunca mantém aprovação da revisão velha como vigente |
| Exportação | queued → processing → completed; failed admite retry; gate/epoch alterado → stale, exige nova exportação autorizada |

Avaliação de risco é registro separado por org/item/answer_revision_id/risk_policy_version, com status pending/completed/failed. Não altera o conteúdo imutável de answer_revisions. Nova versão inicia pending e somente resultado da mesma versão/política pode concluir. O estado histórico de publicação da exportação e seu published_at/hash permanecem preservados mesmo se a entrega atual ficar stale; recuperação histórica consulta essa evidência, não apenas status atual.

## Atomicidade

- Lock de tarefa primeiro, item(s) depois em ordem de ID; mesma ordem para save/approve/export. Autorização, versão, lease, alertas recalculados, decisão e auditoria na mesma transação.
- Save usa expectedRevision + leaseToken. Mismatch → conflito, nunca last-write-wins. Autosave sem mudança canônica é idempotente. Nova revisão preserva conteúdo anterior; relações de evidência alteradas exigem revalidação.
- Aprovação exige texto não vazio, versão salva, ausência de lease, avaliação de risco concluída para a versão/política atual, alertas tratados, lacunas resolvidas, confirmação crítica vinculada à versão e membership approver atual. Revisão não concede aprovação.
- Mudança de idade/indisponibilidade pode criar bloqueio atual sem apagar a decisão histórica. Contagens de aprovação e elegibilidade para exportação são calculadas separadamente; alertas podem se sobrepor.
- Gate de exportação exige total >0, processamento pronto, todos aprovados na versão atual, zero bloqueios. Manifesto criado sob locks curtos; publicação/download como entrega atual revalidam epoch e gate. Recuperação histórica segue contracts/lifecycle.md, consultando publicação anterior ao encerramento, prazo, arquivo e permissão vigente, sem validar epoch atual. Concorrência não mistura revisões.
- Enqueue via função SQL do Graphile Worker com a conexão transacional da mutação; grants apenas de enqueue para web. Consumidor usa credencial de fila separada e abre conexão de domínio restrita por tenant. O envelope confiável da fila, gravado apenas pelo enqueue autorizado, contém o mapeamento run/tenant/recurso; esse metadado permite iniciar a transação restrita sem leitura global de conteúdo. O handler confirma a associação no domínio antes de qualquer efeito.

## Índices e migrações

B-tree tenant/status/created_at para listas, tenant/task/ordinal para itens, tenant/resource/version para runs, tenant/item/revision para histórico, índices nas FKs e memberships user/active. Full-text por chunks; vetorial exato inicialmente, sem ANN prematuro. Índice de objetos por org/chave/hash sem deduplicação global entre tenants.

SQL migrations aditivas com RLS/grants na mesma entrega de tabelas. Testar rollback lógico e restore em banco descartável. Reindexação não remove coleção ativa antes da nova estar pronta. Separar credencial de migration/owner da aplicação e do worker.

Autorizações de destinos devem registrar por organização os países/provedores, responsável e instante (FR-SEC-05); validação antecede envio. O encerramento e a execução de exclusão precisam de estado verificável e tentativas idempotentes, sem copiar conteúdo para registros de diagnóstico. Aplicar os comandos e critérios definidos em contracts/lifecycle.md, preservando a política confirmada.
