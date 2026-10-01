# Contrato de encerramento e recuperação do piloto

Fonte: FR-SEC-06 e correção de análise autorizada pelo usuário. Prazos 30/90 dias contam do mesmo pilot_ended_at em UTC. Nenhuma funcionalidade nova de exportação é autorizada por este contrato.

## Encerramento

Comando operacional `scripts/end-pilot.ts`: operador Tendra autenticado, organização explícita e confirmação da solicitação da empresa referenciada. Registrar ator/instante/organização, sem conteúdo confidencial. Repetição idempotente não reinicia os prazos. O comando não remove papéis vigentes e não apaga imediatamente os arquivos recuperáveis.

## Recuperação histórica

GET `/api/v1/exports/{id}/recover` exige sessão, membership ativa, papel Aprovador na organização, encerramento registrado e instante atual estritamente anterior a encerramento+30dias. Arquivo e manifesto devem ter sido gerados/publicados antes do encerramento, com hash verificável. Preservar published_at e identidade do artefato mesmo quando o estado de entrega atual mudar para stale.

Retornar o arquivo original, sem regeneração ou alteração do conteúdo. Na UI e no nome de download indicar “entrega histórica”, data e versão de origem. O gate de aprovação/epoch da tarefa atual não é consultado para autorizar essa recuperação. Edições posteriores não invalidam a existência da entrega passada e não passam a estar aprovadas por recuperá-la.

Nova exportação e download como entrega atual continuam em `/exports` e `/download`, sujeitos a F-26, versão/epoch/gate atuais. Arquivo nunca publicado, job falho ou publicação posterior ao encerramento não é elegível para recuperação histórica. Fonte corporativa atual não é exposta automaticamente junto ao arquivo: seus endpoints conservam autorização e disponibilidade próprias.

Negar acesso cruzado com 404, falta de papel com 403, ausência de encerramento ou artefato inelegível com 409 e conteúdo expirado com 410. Sem redirects/URLs públicas persistentes; auditar IDs e resultado, nunca conteúdo.

## Exclusão e restauração

Ao completar 30 dias, bloquear recuperação e eliminar conteúdo ativo em banco/storage/derivados conforme FR-SEC-06; falha gera estado operacional explícito e retry idempotente, nunca sucesso aparente. Backups e cópias aplicáveis devem expirar até encerramento+90dias. Restore executa política de expiração antes de reabrir tráfego; conteúdo vencido não é republicado.

Prazo de retenção dos metadados sem conteúdo permanece decisão separada P-03. Este contrato não autoriza retenção indefinida, uso para treinamento nem exceção para texto corporativo em auditoria.

## Aceitação

- Uma entrega publicada antes do encerramento continua recuperável por Aprovador vigente no dia 29 mesmo após edição da tarefa; UI/download identificam versão histórica e arquivo conserva hash.
- A mesma tarefa com edição pendente não permite nova exportação nem download como entrega atual.
- Revisor, Aprovador de outra organização e usuário com papel revogado são negados.
- No instante exato de 30 dias, não há recuperação; exclusão falha é visível operacionalmente.
- Entrega não publicada antes do encerramento não se torna recuperável por retry posterior.
- Repetir encerramento não renova prazo; restaurar backup não reativa conteúdo expirado; até 90 dias as cópias abrangidas expiraram.
