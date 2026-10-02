# Contrato da aplicação — v1

Contrato de design dos Route Handlers e da UI; não é uma API pública para integrações. Todos os caminhos abaixo começam por `/api/v1`. Schema JSON estrito será compartilhado por handlers, testes e client. Nenhum handler permite editar estado diretamente.

## Convenções

- Autenticação de sessão no servidor em cada request. `organizationId` vem da rota/contexto e precisa de membership ativa, nunca de confiança no payload. Recursos de outro tenant retornam 404; 401 sem sessão; 403 sem capacidade no tenant conhecido.
- UUID para IDs, ISO 8601 UTC para instantes; prazo `YYYY-MM-DD`. Payloads rejeitam propriedades desconhecidas, tipos incompatíveis e strings vazias quando obrigatórias. Não aceitar campos actor/approved/status enviados como autoridade pelo cliente.
- GET autenticado: `Cache-Control: private, no-store`; nenhuma resposta corporativa em CDN compartilhada. Mutações verificam Origin/CSRF e não aceitam GET para efeitos. DTO mínimo; erro `{code,message,correlationId,details?}` com details limitados a IDs/contagens, nunca stack/SQL/conteúdo.
- 400 formato, 413 tamanho, 422 validação de negócio/arquivo, 409 versão/lease/gate, 429 limitação com retry-after, 503 dependência indisponível. 202 significa aceito, não concluído.
- Mutações repetíveis exigem `Idempotency-Key`, vinculada a org/ator/operação/hash do pedido. Mesmo token e mesmo pedido retornam efeito original; payload diferente →409. Expiração operacional do registro deve cobrir a janela de retry; não usar token como substituto de unique constraints de domínio.
- Listas usam cursor opaco com ordenação estável por created_at/id, default 25 e máximo 100; filtros de status não removem tenant. Strings de busca não vão para logs.

## Interfaces

| Método/caminho | Entrada e retorno essenciais | Autorização/gate |
| --- | --- | --- |
| GET `/organizations/{org}/session` | identidade mínima, capacidades atuais | membership ativa; não retorna secrets |
| GET `/organizations/{org}/members` | lista de participantes elegíveis | membership; DTO mínimo para responsáveis |
| PATCH `/organizations/{org}/members/{user}/role` | role reviewer/approver, expectedVersion → membership | admin da org; papel não concede administração |
| POST `/organizations/{org}/uploads` | filename, byteSize, mime, purpose knowledge/imported_history/questionnaire → uploadId, objectKey opaca, autorização restrita de upload | reviewer/approver; ≤50000000; bucket privado |
| POST `/uploads/{id}/complete` | checksum declarado → documentId, processingRunId | mesmo tenant; validar bytes/hash/MIME reais e chave antes de enqueue |
| GET `/documents` | purpose/status/cursor → DTOs de status, nome, atualização, idade ou desconhecida, responsável | reviewer/approver |
| GET `/documents/{id}/extraction` | texto por unidades, localizador/preview, revision, requiresConfirmation | reviewer/approver; protege texto OCR |
| PATCH `/documents/{id}/extraction` | expectedRevision, unidades corrigidas → nova revision | reviewer/approver; CAS, não confirma automaticamente |
| POST `/documents/{id}/extraction/confirm` | extractionRevision, hash → runId | reviewer/approver; versão atual conferida; uma confirmação não aprova respostas |
| POST `/processing-runs/{id}/retry` | expectedVersion → runId | reviewer/approver; erro retryable e recurso atual, sem duplicação |
| GET `/processing-runs/{id}` | stage/status/progress/safeError/retryable | tenant; distinguir awaiting_confirmation e failed |
| POST `/tasks` | name, company, kind, dueDate, ownerId, questionnaireDocumentId → taskId, runId | reviewer/approver; responsável mesma org, prazo válido; base vazia avisa e permite |
| GET `/tasks` | lista com nome, empresa, tipo, prazo, responsável, total, aprovados, progresso, alertas, status | reviewer/approver |
| GET `/tasks/{id}/items` | itens resumidos, contagens e cursor | reviewer/approver; zero itens não é 100% |
| GET `/items/{id}` | pergunta, currentRevision, originalSuggestion, evidências, gaps, alerts, capabilities, leaseHolder | reviewer/approver; capacidades são informativas, servidor sempre revalida |
| POST `/items/{id}/lease` | expectedRevision → token, expiresAt | reviewer/approver; um editor ativo por item |
| POST `/items/{id}/lease/renew` | token, sessionId → expiresAt | titular, sessão e token atuais; limite de inatividade |
| DELETE `/items/{id}/lease` | token | titular; cliente faz flush antes; cancelamento não perde revisão persistida |
| PUT `/items/{id}/answer` | expectedRevision, leaseToken, richText → revision, state, invalidatedApproval | reviewer/approver; save atômico; marca avaliação de risco da nova revisão como pending; mantém evidências só onde relação permanece válida |
| POST `/items/{id}/restore-original` | expectedRevision, leaseToken → revision | mesmo gate de save; restauração é edição |
| POST `/alerts/{id}/actions` | expectedRevision, conditionHash, action, sourceId? → actionId | reviewer/approver; `confirm_validation` só approver; uma ação por alerta |
| POST `/gaps/{id}/resolve` | expectedRevision, resolução referindo complemento manual/fonte → gap | reviewer/approver; admite declaração manual explícita de informação indisponível na resposta, mantendo alerta de ausência de fonte e aprovação separada |
| POST `/items/{id}/review` | expectedRevision → decisionId/state | reviewer/approver; sem alertas obrigatórios/lacunas/edição pendentes |
| POST `/items/{id}/approve` | expectedRevision → approvalId/state | approver atual; versão salva não vazia, sem lease, avaliação de risco concluída da mesma versão/política, todos os gates |
| POST `/suggestions/{id}/feedback` | polarity, justification? → feedbackId | reviewer/approver; justificativa fora de telemetria |
| GET `/evidence/{id}` | documento/versão/localizador/idade/availability + preview autorizado | reviewer/approver; IDs tenant-checked, sem aceitar URL arbitrária |
| GET `/documents/{id}/content` | original/preview autorizado; suporte a Range | reviewer/approver; attachment original, preview sandbox; conteúdo não executável |
| POST `/tasks/{id}/exports` | format docx/xlsx → exportId, status queued | approver; snapshot/gate atômico |
| GET `/exports/{id}` | status, reasonCode, formato, createdAt | approver; failed/stale explícitos |
| GET `/exports/{id}/download` | stream autenticado | approver atual; revalidar tenant, epoch e gate; sem token público persistente |
| GET `/exports/{id}/recover` | stream autenticado do arquivo histórico imutável, com identificação histórica | approver atual da org, publicação anterior ao encerramento e dentro dos 30 dias; sem exigir gate atual, sem regenerar; ver lifecycle.md |
| GET `/history` | pergunta, resposta aprovada, aprovador, data, tarefa, fontes, idade | reviewer/approver; histórico importado não aparece como aprovação |

Todas as rotas abreviadas recebem contexto de organização validado. O worker nunca chama endpoints de aprovação. Provisionar organização/primeiro admin e transferir admin são comandos operacionais restritos `provision-organization` e `transfer-admin`, com operador autenticado, confirmação externa referenciada e auditoria; não expostos como cadastro público.

## Sessão e acesso

Login por e-mail/OTP em `/auth`, restrito aos vínculos/convites provisionados; autenticar uma identidade não cria membership ou concede papel. Falhas e expiração de código são explícitas; códigos de uso único não são reutilizáveis. O retorno de autenticação usa `/auth/callback` conforme o fluxo do provedor escolhido no plano. POST `/auth/logout` exige validação Origin/CSRF, encerra a sessão pelo provedor e remove cookies; nenhuma saída por GET. Sessão expirada exige nova autenticação e não permite retornar conteúdo protegido. Testes de identidade cobrem esses estados, papel revogado e isolamento com sessão ainda existente.

## UI e estados observáveis

- Onboarding com upload principal e “Fazer depois”; mostrar documentos prontos; base vazia não bloqueia tarefa. Upload múltiplo tem status/retry independente.
- Editor exibe salvando/salvo/erro, aviso de edição de aprovado, titular de lease e original restaurável. Troca de item mantém buffer até save confirmado; falha impede descarte silencioso. Refresh/fechar usa aviso de alterações não salvas; recuperação na sessão não equivale a promessa de armazenamento offline.
- ≥1280px: lista+detalhe; 768–1279: sequência lista/detalhe; <768: consulta. Bloqueio de permissão continua no servidor; viewport não é controle de segurança.
- Fonte abre página/trecho ou intervalo de células; fechamento restaura item, seleção e foco. Preview Office é identificado como convertido. Fonte indisponível mantém metadados com aviso.
- OCR abre original e texto lado a lado, correção e confirmação de versão. Sem autoaceite por score.
- Cada alerta tem tratamento individual. Sem “reconhecer todos”, aprovação em lote ou envio automático. Bloqueios mostram contagens, motivos e links aos itens.
- Teclado, foco, regiões de status e texto/ícone além de cor; reutilizar tokens/UI em `/design-system`. Meta WCAG 2.2 AA requer testes manuais além de automação.

## Casos de contrato indispensáveis

Trocar org/ID em todos os endpoints; papel revogado com sessão viva; erro de save/retry; token de lease expirado; aprovação vs edição concorrente; exportação vs edição; bytes exatamente no limite/acima; OCR não confirmado; citação forjada; falha externa não retorna sucesso. Todos possuem resultado observável e erro estável, sem texto confidencial em logs.
