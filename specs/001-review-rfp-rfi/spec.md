# Feature Specification: MVP de Revisão e Aprovação de RFPs/RFIs

**Feature Branch**: `001-review-rfp-rfi`

**Created**: 2026-09-30

**Status**: Draft — aguardando esclarecimentos de produto

**Input**: Documento fornecido pelo usuário: “Tendra.ai — MVP de Revisão e Aprovação de RFPs/RFIs”.

A Tendra.ai ajuda pré-vendas, Bid Management, Segurança, Jurídico e especialistas a
transformar conhecimento corporativo autorizado em respostas rastreáveis, revisadas e
aprovadas por pessoas. O MVP valida redução de esforço sem comprometer confiança e
controle humano. A revisão estruturada item a item é a experiência principal.

## Clarifications

### Session 2026-09-30

- Q: Quando uma pergunta envolver multas, responsabilidade civil ou garantias jurídicas, como o MVP deve tratar a sugestão da IA? → A: Mostrar rascunho com alerta de alto risco; o Aprovador deve confirmar que realizou a validação necessária antes de aprovar.
- Q: Em quais formatos o Aprovador deve conseguir exportar as respostas finais aprovadas no MVP? → A: DOCX e XLSX, em modelos padronizados da Tendra.
- Q: Quais idiomas o MVP deve aceitar nos documentos e usar para sugerir respostas? → A: Documentos em português e inglês; respostas no idioma de cada pergunta, podendo usar fontes nos dois idiomas. A interface permanece em português do Brasil.
- Q: Como deve ser definido o primeiro administrador de uma organização no MVP? → A: A equipe Tendra cadastra a organização e convida o primeiro administrador indicado pela empresa.
- Q: Respostas de RFPs antigas importadas devem receber alguma aprovação automática dentro da Tendra? → A: Identificar como Histórico importado, sem aprovação automática. Pode apoiar sugestões, mas cada nova resposta exige aprovação humana.
- Q: O que deve acontecer quando duas pessoas tentarem editar a mesma resposta ao mesmo tempo? → A: Uma pessoa edita o item por vez; as demais podem consultá-lo e veem quem está editando. O item é liberado ao encerrar a edição ou após perda de conexão/inatividade. Itens diferentes permitem trabalho simultâneo.
- Q: Como uma resposta aprovada há mais de 120 dias deve ser tratada ao ser reutilizada em uma nova RFP? → A: Contar 120 dias desde a aprovação da versão reutilizada. Depois disso, mostrar alerta de conteúdo antigo, que deve ser reconhecido antes da nova aprovação. A aprovação original permanece preservada no histórico.
- Q: Como deve acontecer a troca do administrador de uma organização no MVP? → A: A equipe Tendra realiza a troca após confirmar a solicitação com a empresa, registrando quem saiu, quem assumiu e quando.
- Q: A organização deve poder iniciar uma RFP mesmo sem documentos prontos na base de conhecimento? → A: Permitir iniciar com base vazia, mostrando aviso. Sem contexto suficiente para sustentar qualquer parte da resposta, não gerar sugestões; permitir respostas manuais com os alertas e aprovações previstos. Não exigir quantidade mínima de documentos.
- Q: Qual meta de redução do tempo entre o upload da RFP e a exportação devemos adotar para avaliar o piloto? → A: Meta de redução de pelo menos 60%, comparando RFPs semelhantes com o tempo anterior informado pelo cliente. É um objetivo a validar no piloto, não um resultado garantido.

- Q: Quando um documento não tiver uma data de atualização confiável, como o MVP deve tratar sua idade e seu uso como fonte? → A: Mostrar “atualidade desconhecida”, permitir uso e exigir reconhecimento de alerta antes da aprovação.

- Q: O MVP deve processar PDFs digitalizados, nos quais o texto aparece apenas como imagem? → A: Aceitar também PDFs digitalizados, extraindo o texto das imagens e exigindo conferência humana antes de usar o conteúdo.

- Q: Quando as fontes sustentarem apenas parte de uma resposta, o MVP deve mostrar um rascunho parcial ou exigir preenchimento manual completo? → A: Mostrar somente a parte sustentada pelas fontes, indicar as lacunas e exigir seu tratamento antes da aprovação.

- Q: Quais assuntos devem exigir a validação adicional do Aprovador por serem considerados críticos no MVP? → A: Lista fixa ampliada: responsabilidade civil, multas, garantias jurídicas, proteção de dados, compromissos de segurança e níveis de serviço contratuais.

- Q: Qual deve ser o tamanho máximo de cada arquivo enviado ao MVP? → A: 50 MB por arquivo.

- Q: Uma resposta como “não dispomos dessa informação” pode resolver uma lacuna e compor a entrega final, desde que aprovada por um Aprovador? → A: Permitir declaração manual de informação indisponível, com reconhecimento do alerta de ausência de fonte e aprovação humana. O texto permanece na exportação.

- Q: Qual critério devemos exigir para liberar as sugestões de IA no piloto, em uma avaliação de 100 perguntas representativas revisadas por pessoas? → A: Pelo menos 95 das 100 perguntas com resposta ou indicação de ausência, lacuna ou conflito corretamente apresentada; zero afirmações sem sustentação apresentadas como fatos, nenhuma fonte inventada e nenhum assunto crítico omitido na amostra.

- Q: O primeiro piloto deve usar documentos corporativos reais ou apenas documentos fictícios e anonimizados? → A: Usar documentos corporativos reais desde o primeiro piloto, exigindo definir as condições de tratamento antes de iniciá-lo.

- Q: Os dados corporativos do piloto precisam permanecer no Brasil, inclusive durante o processamento pela IA? → A: Permitir armazenamento e processamento fora do Brasil, desde que os países e provedores sejam informados e autorizados pela empresa participante.

- Q: O que deve acontecer com os dados corporativos quando uma empresa encerrar o piloto? → A: Permitir recuperação das entregas por 30 dias; depois excluir o conteúdo dos sistemas ativos. Cópias de backup devem expirar em até 90 dias após o encerramento. A política deve abranger as cópias aplicáveis dos provedores.

## User Scenarios & Testing *(mandatory)*

Todos os requisitos F abaixo são P0 do MVP. As prioridades das jornadas indicam ordem
relativa de valor, sem retirar funcionalidades do escopo. Os testes independentes podem
usar documentos, tarefas e usuários previamente preparados.

### User Story 1 - Revisar respostas e conferir evidências (Priority: P1)

Como Revisor, quero conferir perguntas, sugestões, fontes e incertezas no mesmo contexto para corrigir respostas com segurança.

**Why this priority**: É a experiência central e permite avaliar confiança na sugestão.

**Independent Test**: Com uma tarefa processada, revisar um item, abrir sua fonte, editar e retornar sem perder conteúdo.

**Acceptance Scenarios**:

1. **Given** uma tarefa pronta, **When** o usuário seleciona um item, **Then** a pergunta, resposta, estado, todos os alertas, fontes e ações permitidas ficam visíveis (F-18).
2. **Given** uma resposta com evidência, **When** o usuário abre e fecha a fonte, **Then** o trecho correspondente é localizado e o mesmo contexto de revisão é restaurado (F-19).
3. **Given** uma edição em andamento, **When** o salvamento falha ou o usuário navega, **Then** o erro e o estado de salvamento são informados e o texto não é descartado (F-20).
4. **Given** uma sugestão editada, **When** o usuário consulta ou restaura o original, **Then** a sugestão original está disponível; restaurar é uma alteração sujeita às mesmas regras de aprovação (F-20).
5. **Given** um item sem contexto ou com vários alertas, **When** o usuário tenta revisar/aprovar, **Then** não há rascunho inventado e cada alerta obrigatório exige tratamento individual (F-21).

### User Story 2 - Aprovar e exportar com controle humano (Priority: P1)

Como Aprovador, quero aprovar cada resposta válida e exportar somente uma entrega completamente aprovada.

**Why this priority**: Impede compromissos sem autorização explícita.

**Independent Test**: Com itens preparados em diferentes estados, exercitar aprovação, edição posterior e exportação.

**Acceptance Scenarios**:

1. **Given** uma sugestão válida e alertas tratados, **When** um Aprovador aprova, **Then** o item pode ir diretamente para Aprovada, registrando pessoa e instante (F-22).
2. **Given** um Revisor, **When** ele tenta aprovar ou exportar, **Then** a ação é negada, inclusive por acesso direto.
3. **Given** um item aprovado, **When** a resposta é alterada, **Then** o usuário é informado, a aprovação é invalidada, o item volta a Em revisão e o evento é preservado.
4. **Given** um item não aprovado ou alerta pendente, **When** o Aprovador tenta exportar, **Then** o bloqueio mostra contagens, itens pendentes e acesso a eles (F-26).
5. **Given** todos os itens aprovados e nenhum alerta pendente, **When** o Aprovador exporta, **Then** a entrega contém IDs, perguntas, respostas finais aprovadas e evidências, identificando respostas manuais sem fonte; a sugestão original alterada não substitui a versão aprovada.
6. **Given** um item com termo crítico e rascunho disponível, **When** o Aprovador tenta aprovar sem confirmar a validação necessária, **Then** a aprovação é bloqueada e o alerta de alto risco permanece visível.
7. **Given** a validação necessária confirmada por um Aprovador para a versão atual, **When** ele aprova e os demais requisitos estão satisfeitos, **Then** a aprovação é permitida e a confirmação fica identificada por pessoa e instante.
8. **Given** uma confirmação de validação para um termo crítico, **When** a resposta é alterada, **Then** a nova versão exige outra confirmação antes da aprovação.

### User Story 3 - Construir conhecimento corporativo (Priority: P2)

Como usuário, quero adicionar documentos e RFPs passadas para disponibilizar conhecimento e avaliar sua atualidade.

**Why this priority**: Fornece contexto autorizado para futuras respostas.

**Independent Test**: Em organização vazia, adiar onboarding e depois carregar arquivos válidos e inválidos.

**Acceptance Scenarios**:

1. **Given** uma organização sem documentos, **When** o usuário entra, **Then** vê adicionar documentos como ação principal, pode adiar e recebe aviso ao criar tarefa com base vazia (F-01).
2. **Given** vários uploads, **When** um arquivo falha, **Then** os demais continuam, cada estado é visível e o arquivo com erro admite nova tentativa (F-02).
3. **Given** uma RFP passada, **When** o usuário a importa, **Then** ela é identificada como Histórico importado, sem inventar aprovador nem criar aprovação automática; respostas reutilizadas em novas tarefas exigem nova aprovação humana (F-03).
4. **Given** um documento com mais de 120 dias, **When** o usuário consulta a base, **Then** vê idade, atualização, responsável e indicação não dependente apenas de cor (F-04).

### User Story 4 - Criar e acompanhar uma RFP/RFI (Priority: P2)

Como responsável, quero importar perguntas e acompanhar processamento e completude sem aguardar na página.

**Why this priority**: Organiza o trabalho e torna falhas visíveis.

**Independent Test**: Criar uma tarefa, sair durante processamento e retornar ao painel.

**Acceptance Scenarios**:

1. **Given** um formulário de tarefa, **When** há prazo passado ou responsável de outra organização, **Then** o cadastro é rejeitado com explicação (F-09).
2. **Given** um documento processado, **When** o usuário retorna, **Then** vê quantidade de perguntas e estados atuais; selecionar a tarefa abre seus detalhes (F-10/F-12).
3. **Given** itens em estados diversos, **When** o usuário consulta o progresso, **Then** vê aprovados/total e contagens de sem contexto, sugeridos, revisados e aprovados, além de alertas pendentes (F-11).
4. **Given** falha de processamento, **When** o usuário consulta a tarefa, **Then** vê explicação simples, nova tentativa e caminho para suporte; não recebe sucesso aparente (F-12).

### User Story 5 - Consultar histórico e avaliar sugestões (Priority: P2)

Como usuário, quero consultar respostas aprovadas e registrar feedback sobre sugestões.

**Why this priority**: Permite recuperar conhecimento validado e medir utilidade.

**Independent Test**: Consultar um registro aprovado e enviar feedback positivo e negativo.

**Acceptance Scenarios**:

1. **Given** uma resposta aprovada, **When** o usuário consulta o histórico, **Then** vê pergunta, resposta, aprovador, data, origem, idade e fontes (F-27).
2. **Given** uma sugestão, **When** o usuário avalia, **Then** pode escolher positivo ou negativo e fornecer justificativa; telemetria não contém texto corporativo (F-23).
3. **Given** uma fonte posteriormente indisponível, **When** o usuário consulta o histórico, **Then** os metadados permanecem e a indisponibilidade é explícita (F-19).

### Edge Cases

A implementação deve considerar explicitamente:

- base vazia;
- arquivo inválido;
- arquivo acima do limite de 50 MB;
- falha individual de upload;
- falha de processamento;
- processamento parcial;
- texto extraído de PDF digitalizado aguardando conferência humana;
- texto ilegível ou extração incorreta em PDF digitalizado;
- ausência de contexto;
- baixa confiança;
- resposta parcialmente sustentada por fontes, com lacunas pendentes;
- múltiplos alertas simultâneos;
- fontes conflitantes;
- fonte antiga;
- fonte com atualidade desconhecida;
- documento posteriormente indisponível;
- resposta manual;
- resposta manual sem fonte;
- tentativa de aprovação com alerta pendente;
- tentativa de aprovação por Revisor;
- edição após aprovação;
- tentativa de exportação incompleta;
- tentativa de exportação por Revisor;
- falha durante salvamento de edição;
- navegação com conteúdo ainda não salvo.

Nenhum desses casos pode falhar silenciosamente.

---

Além dos casos acima, os seguintes resultados são exigidos como pressupostos de segurança:

- Zero perguntas identificadas não torna a tarefa exportável; explicar o resultado e permitir nova tentativa.
- Processamento parcial não equivale a conclusão: mostrar progresso confirmado e bloquear exportação até conclusão.
- Falha de salvamento impede aprovar uma versão ainda não salva e preserva o texto para recuperação.
- Edição é exclusiva por item, com consulta para os demais e identificação de quem edita. Liberação após perda de conexão/inatividade não permite que uma sessão antiga sobrescreva alterações posteriores; nenhuma aprovação pode referir-se a versão diferente.
- Fonte indisponível conserva metadados, mas não pode aparecer como evidência verificada se sua relação não puder ser conferida.
- Acesso a tarefas, documentos, evidências e histórico de outra organização é negado.

## Requirements *(mandatory)*

### Functional Requirements

Os identificadores F do documento original são preservados para rastreabilidade.
Cada requisito inclui os critérios de aceitação que delimitam sua validação.


#### F-01 — Onboarding no primeiro uso

##### User Story

Como usuário de uma empresa nova, quero ser orientado a adicionar conhecimento corporativo para que a Tendra.ai tenha contexto para gerar sugestões.

##### Critérios de aceitação

- Organização sem documentos visualiza onboarding.
- "Subir documentos" é a ação principal.
- Usuário pode escolher "Fazer depois".
- A quantidade de documentos enviados/processados é apresentada.
- Quando existir ao menos um documento pronto, a interface oferece criar a primeira RFP.
- Não há quantidade mínima de documentos para criar RFP/RFI. Base vazia ou sem documentos prontos gera aviso, mas não bloqueia a criação.
- Sem contexto suficiente para sustentar qualquer parte da resposta, nenhum rascunho é gerado; o editor permite resposta manual, sujeita aos alertas e à aprovação humana previstos.


#### F-02 — Adicionar documentos à base

##### User Story

Como usuário, quero adicionar documentos corporativos para que eles possam servir como contexto para futuras respostas.

##### Critérios de aceitação

Cada arquivo possui independentemente os estados:

- na fila;
- processando;
- aguardando conferência, para texto extraído de PDFs digitalizados;
- pronto;
- erro;
- em tratamento pelo suporte, quando aplicável.

Erro em um arquivo não interrompe os demais.

Arquivo com erro permite nova tentativa.

O usuário pode sair e retornar posteriormente.

Cada documento apresenta:

- nome;
- tipo;
- última atualização;
- idade;
- versão, quando disponível;
- status.


#### F-03 — Importar RFPs anteriores

##### User Story

Como usuário, quero adicionar RFPs respondidas anteriormente para reutilizar conhecimento histórico.

##### Critérios de aceitação

- Fluxo utiliza o mesmo mecanismo de upload da base.
- Documento é identificado como RFP passada.
- Conteúdo proveniente dessas RFPs deve ser identificado como "Histórico importado", sem aprovação automática.
- Esse conteúdo pode apoiar sugestões, mas cada resposta de uma nova tarefa exige aprovação humana explícita, mesmo quando reproduz uma resposta histórica sem alterações.
- Importar uma RFP passada não cria um registro de aprovação nem inclui suas respostas como aprovadas no histórico F-27.
- Não deve inventar um aprovador para conteúdo histórico.


#### F-04 — Visualizar base e aging

##### User Story

Como usuário, quero saber quais documentos estão disponíveis e sua idade para avaliar a atualidade do conhecimento utilizado.

##### Critérios de aceitação

A lista apresenta:

- nome;
- tipo;
- última atualização;
- idade;
- status;
- responsável pelo upload.

Documentos com mais de 120 dias sem atualização devem ser identificados.

Sem data de atualização confiável, apresentar “atualidade desconhecida” na base e nas referências de evidências, sem calcular uma idade nem usar a data do upload como atualização. O documento pode ser utilizado como fonte, sujeito ao alerta obrigatório descrito em 9.4.

O estado não pode depender exclusivamente de cor.


#### F-09 — Criar tarefa RFP/RFI

##### User Story

Como responsável por uma proposta, quero importar as perguntas de uma RFP/RFI para iniciar o processo de resposta.

##### Dados obrigatórios

- nome;
- empresa;
- tipo;
- prazo;
- responsável.

##### Critérios de aceitação

- Prazo passado gera erro.
- Responsável deve pertencer à organização.
- Nome inicialmente utiliza o nome do arquivo e pode ser alterado.
- Após processamento, a quantidade de perguntas identificadas é apresentada.
- A criação é permitida mesmo sem documentos prontos na base, após apresentar aviso de ausência de contexto; não há exigência de quantidade mínima.


#### F-10 — Painel de tarefas

##### User Story

Como usuário, quero visualizar todas as RFPs/RFIs em andamento para acompanhar trabalho, responsáveis e progresso.

##### Cada tarefa apresenta

- nome;
- empresa;
- tipo;
- quantidade de itens;
- completude;
- prazo;
- responsável;
- status.

Selecionar uma tarefa abre seus detalhes.


#### F-11 — Completude

##### User Story

Como responsável por uma RFP, quero entender rapidamente quanto trabalho já foi concluído e quanto ainda falta.

##### Critérios de aceitação

Apresentar quantidade de itens:

- sem contexto;
- sugeridos;
- revisados;
- aprovados.

A métrica principal de completude é:

`itens aprovados / total de itens`

Também deve ser possível identificar:

- itens com alerta pendente;
- estado de cada item.


#### F-12 — Status de processamento

##### User Story

Como usuário, quero acompanhar o processamento sem precisar permanecer esperando na página.

##### Critérios de aceitação

Estados:

- na fila;
- processando;
- aguardando conferência, para texto extraído de PDFs digitalizados;
- pronto;
- falha.

Quando disponível, apresentar quantidade já processada.

Em caso de falha:

- explicar o problema em linguagem simples;
- permitir nova tentativa;
- disponibilizar caminho para suporte.

Códigos técnicos não devem ser apresentados como mensagem principal.


#### F-18 — Revisão em split view

##### User Story

Como Revisor, quero navegar pelas perguntas e revisar cada resposta sem perder meu contexto.

##### Critérios de aceitação

A experiência apresenta:

**Área de navegação**

- ID;
- pergunta resumida;
- estado;
- alertas.

**Área de revisão**

- pergunta completa;
- resposta;
- alertas;
- fontes;
- ações.

Trocar de item não pode descartar conteúdo não salvo.

Devem existir formas de avançar e voltar entre itens.


#### F-19 — Fonte rastreável

##### User Story

Como Revisor, quero verificar exatamente de onde veio uma informação antes de confiar nela.

##### Critérios de aceitação

Respostas baseadas em conhecimento corporativo apresentam referências associadas.

Cada fonte apresenta:

- documento;
- página ou trecho;
- tipo;
- idade.

Selecionar a fonte abre o documento no trecho correspondente.

Fechar o documento retorna ao mesmo item e contexto.

Documento indisponível não remove os metadados históricos registrados.


#### F-20 — Editar resposta

##### User Story

Como Revisor, quero corrigir uma sugestão antes da aprovação.

##### Critérios de aceitação

O editor permite pelo menos:

- texto;
- negrito;
- itálico;
- listas.

Alterações são salvas automaticamente.

A interface informa o estado do salvamento.

Resposta alterada é identificada como editada.

O usuário pode:

- visualizar a sugestão original;
- restaurar a sugestão original.

Editar conteúdo aprovado remove sua aprovação.

A edição é exclusiva por item: somente uma pessoa pode editar uma resposta por vez.
As demais podem consultá-la e devem ver quem está editando. Pessoas diferentes podem
editar itens diferentes da mesma tarefa simultaneamente. A exclusividade termina ao
encerrar a edição ou após perda de conexão/inatividade; o prazo operacional de liberação
deve ser definido no planejamento e verificado nos testes de recuperação.

- Dado um item em edição, quando outra pessoa o abre, ela pode consultar, mas não alterar a resposta enquanto a edição estiver reservada.
- Dadas duas pessoas em itens diferentes, ambas podem editar e salvar sem bloquear a tarefa inteira.
- Ao encerrar a edição, as alterações confirmadas permanecem salvas e outra pessoa pode iniciar a edição.
- Após perda de conexão/inatividade e liberação do item, uma sessão antiga não pode sobrescrever alterações posteriores ao retornar; conteúdo ainda não salvo deve ser preservado para recuperação, com aviso explícito.
- Aprovar exige uma versão salva e estável: enquanto houver edição ativa, a aprovação permanece bloqueada, inclusive para quem está editando. Encerrar a edição permite aprovar quando todos os demais critérios forem satisfeitos.



#### F-21 — Alertas reconhecíveis

##### User Story

Como Revisor ou Aprovador, quero saber quais riscos preciso verificar antes de considerar uma resposta válida.

##### Critérios de aceitação

Enquanto existir alerta obrigatório pendente:

- revisão/aprovação correspondente permanece bloqueada;
- o motivo do bloqueio é informado.

Reconhecer um alerta registra:

- pessoa;
- data;
- horário.

Fontes conflitantes exigem decisão explícita.


#### F-22 — Revisar e aprovar

##### User Story

Como participante do processo, quero que revisão e aprovação representem ações distintas e controladas.

##### Regras

Revisor:

- pode marcar como Revisado;
- não pode Aprovar.

Aprovador:

- pode marcar como Revisado;
- pode Aprovar;
- pode aprovar diretamente uma sugestão válida.

##### Critérios de aceitação

A aprovação registra:

- aprovador;
- data;
- horário.

Depois da aprovação, o fluxo pode avançar para o próximo item pendente.

Não existe aprovação em lote.

Para itens com termo crítico, o Aprovador deve confirmar a validação necessária da
versão atual antes de aprovar, conforme a regra 9.5.


#### F-23 — Feedback por resposta

##### User Story

Como usuário, quero avaliar a qualidade da sugestão para que o produto possa medir e melhorar a utilidade das respostas.

##### Critérios de aceitação

Cada resposta permite:

- feedback positivo;
- feedback negativo;
- justificativa.

O feedback deve gerar telemetria sem armazenar o conteúdo corporativo da resposta.


#### F-26 — Exportação

##### User Story

Como Aprovador, quero exportar a RFP somente depois que todas as respostas estiverem devidamente aprovadas.

##### Quality Gate

Exportação somente pode ocorrer quando:

`100% dos itens = Aprovados`

e:

`alertas pendentes = 0`

##### Quando bloqueada

A interface apresenta:

- quantidade aprovada;
- quantidade pendente;
- itens pendentes;
- acesso direto aos itens que precisam de ação.

##### Quando liberada

Somente o Aprovador pode exportar.

O resultado deve utilizar exclusivamente a versão final aprovada, incluindo edições humanas, e preservar:

- pergunta;
- ID;
- resposta final aprovada;
- fontes/evidências utilizadas.

Resposta manual sem fonte deve permanecer identificada como tal. Declarações manuais aprovadas de informação indisponível também devem permanecer no texto exportado, sem omitir a pergunta correspondente.

O Aprovador deve poder escolher DOCX ou XLSX. Ambos utilizam modelos padronizados
da Tendra, sem obrigação de preservar a estrutura ou formatação do arquivo importado.
PDF e preenchimento do arquivo original não fazem parte da exportação deste MVP.

Para cada formato, os critérios de aceitação são:

- Com todos os itens aprovados e nenhum alerta pendente, o Aprovador consegue obter o arquivo no formato escolhido.
- O arquivo contém todos os IDs, perguntas, respostas finais aprovadas e referências das evidências, com identificação de respostas manuais sem fonte.
- Ambos os formatos representam a mesma versão aprovada dos itens; uma sugestão original alterada não substitui a resposta final.
- Os bloqueios de permissão, aprovação e alertas são aplicados igualmente a DOCX e XLSX.
- Uma falha na geração é informada, permite nova tentativa e não é apresentada como exportação concluída.


Não existe envio automático ao cliente.


#### F-27 — Histórico de respostas aprovadas

##### User Story

Como usuário, quero consultar respostas anteriormente aprovadas para recuperar conhecimento validado pela organização.

##### Critérios de aceitação

Cada registro apresenta:

- pergunta;
- resposta;
- aprovador;
- data;
- tarefa de origem;
- idade;
- fontes relacionadas.

As fontes continuam acessíveis através do mecanismo de rastreabilidade.

A idade da resposta histórica deve ser contada desde a aprovação da versão reutilizada.
Quando essa idade for maior que 120 dias, a reutilização continua permitida, mas o novo
item deve apresentar alerta de conteúdo antigo. Esse alerta exige reconhecimento
individual, registrado com pessoa e instante, antes da nova aprovação. Com exatamente
120 dias, o alerta por idade da resposta ainda não se aplica.

A aprovação original e sua data permanecem preservadas no histórico. Reutilizar a
resposta não atualiza a data de aprovação da versão de origem nem aprova o novo item.
Os alertas de idade das fontes são avaliados separadamente e permanecem visíveis quando
aplicáveis; reconhecer a idade da resposta não reconhece automaticamente outros alertas.

- Dada uma versão aprovada há mais de 120 dias, quando utilizada em uma nova tarefa, o item recebe o alerta e não pode ser aprovado enquanto seu reconhecimento estiver pendente.
- Dado o alerta reconhecido e os demais requisitos satisfeitos, o Aprovador pode aprovar a resposta na nova tarefa sem alterar o registro de aprovação de origem.


---
#### FR-INPUT-01 — Formatos de entrada confirmados

O upload da base, de RFPs anteriores e de novas tarefas deve aceitar PDF, DOCX, XLSX e PPTX.
O limite é de 50 MB por arquivo (50.000.000 bytes), inclusive para PDFs digitalizados, em todos esses fluxos. Arquivos com tamanho igual ao limite são aceitos se atenderem às demais validações. Acima do limite, o arquivo deve ser rejeitado antes do processamento, com mensagem informando o limite e orientação para reduzir ou dividir o arquivo; os demais arquivos do envio continuam independentemente.
Arquivos Google devem ser exportados pelo usuário antes do upload; colar um link do Drive
não substitui esse procedimento. Arquivos incompatíveis ou inválidos devem receber explicação
clara sem interromper o processamento dos demais arquivos.

PDFs digitalizados também são aceitos, em português e inglês. O texto extraído das imagens deve ser apresentado junto ao documento original para conferência humana por Revisor ou Aprovador da organização, permitindo corrigir erros de extração. Até a confirmação explícita, o documento permanece aguardando conferência, não fica pronto para uso como conhecimento e não inicia a geração de respostas para perguntas extraídas. A confirmação registra pessoa, instante e versão do texto conferido; não equivale à aprovação de respostas. Trechos ilegíveis ou falhas de extração devem ser informados, sem inventar conteúdo, permitindo correção ou reenvio.

A base de conhecimento, as RFPs anteriores e as novas tarefas devem aceitar documentos
em português e inglês. Cada sugestão deve ser redigida no idioma da pergunta correspondente,
podendo utilizar evidências em qualquer um desses dois idiomas. A interface permanece em pt-BR.
O acesso ao trecho original da evidência deve ser preservado mesmo quando seu idioma difere
do idioma da resposta. Suporte a outros idiomas não integra o escopo deste MVP.


**Critérios de aceitação**:

1. Dado um arquivo válido de cada um dos quatro formatos, quando enviado, seu processamento pode ser acompanhado individualmente.
2. Dado um link do Google ou formato incompatível, quando apresentado para importação, o usuário recebe orientação para enviar um arquivo exportado compatível.
3. Dada uma pergunta em português e evidência suficiente em inglês, quando uma sugestão é gerada, ela é apresentada em português com referência acessível ao trecho original em inglês.
4. Dada uma pergunta em inglês e evidência suficiente em português, quando uma sugestão é gerada, ela é apresentada em inglês com referência acessível ao trecho original em português.
5. Dada uma tarefa com perguntas em português e inglês, quando suas sugestões são geradas, cada resposta segue o idioma de sua respectiva pergunta.
6. Dada a ausência de contexto suficiente para sustentar qualquer parte da resposta em ambas as línguas aceitas, quando um item é processado, permanece aplicável a regra de não gerar rascunho sem contexto.
7. Dado um PDF digitalizado enviado à base, ao histórico importado ou a uma nova tarefa, quando o texto é extraído, o usuário pode compará-lo ao original e corrigi-lo; seu uso permanece bloqueado até a conferência humana explícita.
8. Dado o texto conferido e confirmado por Revisor ou Aprovador, quando o processamento prossegue, somente a versão conferida pode alimentar o conhecimento ou as perguntas da tarefa, preservando a referência às páginas originais. As respostas continuam sujeitas à aprovação humana separada.
9. Dado um trecho ilegível ou uma falha de extração, quando o processamento apresenta o resultado, o problema é informado e o documento não é apresentado como pronto; o usuário pode corrigir o texto ou reenviar o arquivo.
10. Dado um arquivo válido com exatamente 50.000.000 bytes, quando enviado, ele é aceito; com 50.000.001 bytes, é rejeitado antes do processamento com explicação do limite, sem impedir os demais arquivos válidos.


#### FR-ROLE-01 — Gestão de papéis na organização

Um administrador da organização deve conseguir consultar e atribuir ou alterar os papéis
Revisor e Aprovador de seus participantes dentro do produto. Alterações devem registrar
quem alterou, quando, quem foi afetado e os papéis anteriores e novos.

**Critérios de aceitação**:

1. Dado um administrador autorizado e um participante da mesma organização, quando altera seu papel, as ações permitidas passam a respeitar o novo papel.
2. Dado um participante sem permissão administrativa, quando tenta alterar papéis, a operação é negada.
3. Dado um participante de outra organização, quando um administrador tenta alterar seu papel, a operação é negada.
4. Dada a retirada do papel Aprovador, quando o participante tenta aprovar ou exportar novamente, a operação é negada e o histórico de suas aprovações anteriores permanece identificado.

A equipe Tendra cadastra a organização e convida o primeiro administrador indicado pela
empresa. A administração inicial fica vinculada à pessoa convidada e à organização
correspondente; criar uma conta ou verificar um e-mail não concede essa permissão por si só.
O primeiro acesso administrativo exige a identificação da pessoa convidada.

5. Dada uma organização cadastrada pela equipe Tendra, quando a pessoa indicada pela empresa aceita seu convite e se identifica, ela recebe administração somente daquela organização.
6. Dada uma pessoa não convidada como administradora, quando cria uma conta ou tenta assumir a administração inicial, a permissão administrativa não é concedida.

Pressuposto de menor privilégio: administrar papéis não concede automaticamente permissão
para aprovar ou exportar; essas ações exigem o papel Aprovador.

A troca do administrador é realizada pela equipe Tendra após confirmar a solicitação
com a empresa. Deve registrar a confirmação, a pessoa da equipe Tendra responsável pela
operação, o administrador anterior, o sucessor, a organização e o instante da troca.
Não há transferência administrativa autônoma pelos participantes no MVP.

- Sem confirmação da solicitação com a empresa, a troca não deve ocorrer.
- Concluída a troca, o sucessor pode administrar somente a organização indicada e o anterior perde a permissão administrativa nessa organização.
- A troca não concede nem remove automaticamente papéis de Revisor ou Aprovador; a gestão desses papéis continua separada.
- Se a troca falhar, o sistema não deve apresentá-la como concluída nem deixar a organização sem o administrador anterior por efeito de uma operação parcial.
- O histórico de ações do administrador anterior permanece identificado após a troca.

#### Atores e permissões

##### Administrador da organização

Gerencia os papéis dos participantes da própria organização conforme FR-ROLE-01.

##### Revisor

Pode:

- adicionar documentos à base;
- criar tarefas de RFP/RFI;
- visualizar sugestões;
- visualizar fontes;
- visualizar alertas;
- editar respostas;
- reconhecer alertas;
- marcar itens como revisados;
- consultar histórico.

Não pode:

- aprovar itens;
- exportar o documento final.


##### Aprovador

Possui todas as capacidades do Revisor e adicionalmente pode:

- aprovar itens;
- exportar o documento final.

O Aprovador pode aprovar diretamente uma resposta sugerida quando todas as condições necessárias forem satisfeitas.

Não é obrigatório que o item passe anteriormente pelo estado Revisada.

---

#### Estados e invalidação de aprovação

Cada item pode assumir os seguintes estados:

- Sem rascunho;
- Sugerida;
- Em revisão;
- Revisada;
- Aprovada.

Alterar uma resposta Aprovada deve:

1. informar que a aprovação será removida;
2. remover a aprovação;
3. retornar o item para Em revisão;
4. preservar o evento para auditoria.

---

#### Tratamento de alertas

Um item pode possuir mais de um alerta simultaneamente.

Todos os alertas aplicáveis devem permanecer visíveis.

Não existe ação de "reconhecer todos".

Cada alerta deve ser tratado individualmente.

##### 9.1 Sem contexto

Quando não houver contexto suficiente para sustentar qualquer parte da resposta:

- nenhum rascunho deve ser apresentado;
- o editor deve permanecer disponível;
- o usuário deve ser informado de que o preenchimento será manual.

Depois que uma resposta manual for escrita, aplica-se a regra de resposta manual sem fonte.


##### 9.2 Baixa confiança

Quando uma sugestão estiver marcada como baixa confiança:

- o rascunho permanece visível;
- a condição deve ser explicitamente apresentada;
- a fonte relacionada deve permanecer disponível;
- o alerta precisa ser reconhecido antes da aprovação.

Quando as fontes sustentarem apenas parte da resposta, apresentar somente o conteúdo sustentado, com suas evidências, e indicar explicitamente as lacunas. A IA não deve completar os trechos ausentes por inferência. A cobertura parcial gera alerta de baixa confiança e cada lacuna exige tratamento humano antes da aprovação; apenas reconhecer o alerta não resolve uma lacuna ainda pendente. Complementos manuais devem permanecer identificados, e trechos manuais sem fonte seguem a regra 9.6, sem atribuir a eles as evidências do trecho sugerido.

- Dadas fontes que sustentam apenas parte da resposta, quando o rascunho é apresentado, o usuário vê a parte sustentada e as lacunas, sem conteúdo inventado.
- Dada uma lacuna ainda pendente, quando um Aprovador tenta aprovar, a ação é bloqueada mesmo que o alerta de baixa confiança tenha sido reconhecido.
- Uma pessoa pode resolver uma lacuna registrando na resposta final uma declaração explícita de informação indisponível, como “não dispomos dessa informação”. A declaração é conteúdo manual sem fonte, com autoria registrada e alerta de ausência de fonte; não representa informação comprovada nem pode ser inserida autonomamente pela IA para encerrar a lacuna.
- Dada essa declaração manual, quando o alerta de ausência de fonte é reconhecido e todos os demais requisitos são satisfeitos, o Aprovador pode aprovar a resposta. A declaração permanece na versão final exportada, identificada como conteúdo manual sem fonte. Resolver a lacuna não aprova automaticamente o item nem dispensa outros alertas.
- Dadas as lacunas tratadas por uma pessoa e os demais requisitos satisfeitos, quando o Aprovador aprova, a versão final preserva a distinção entre conteúdo sustentado por fontes e complementos manuais sem fonte.


##### 9.3 Fontes conflitantes

Quando fontes se contradisserem:

- o conflito deve ser explicitamente apresentado;
- as fontes conflitantes devem ser acessíveis;
- o usuário deve escolher qual fonte considerar válida ou informar que utilizará uma resposta manual.

O alerta somente é considerado tratado após essa decisão.


##### 9.4 Fonte antiga

A idade da fonte deve permanecer visível.

Quando uma fonte ultrapassar o prazo de aging vigente, deve ser apresentada como fonte antiga.

Para o MVP, o prazo padrão é de 120 dias desde a última atualização.

O alerta deve ser reconhecido antes da aprovação.

Quando não houver data de atualização confiável, a fonte deve ser identificada como “atualidade desconhecida”, sem classificá-la como recente ou antiga. Seu uso é permitido, mas o item recebe um alerta obrigatório de atualidade desconhecida, tratado individualmente conforme F-21. O reconhecimento registra pessoa e instante e não elimina a indicação de incerteza. A data do upload não substitui a data de atualização.

- Dada uma fonte sem data de atualização confiável, quando utilizada em uma resposta, sua atualidade desconhecida fica visível e a aprovação é bloqueada enquanto o alerta estiver pendente.
- Dado o alerta reconhecido e os demais requisitos satisfeitos, o Aprovador pode aprovar a resposta; a fonte continua identificada como de atualidade desconhecida.


##### 9.5 Termo crítico

No MVP, a lista de assuntos críticos é fixa e comum a todas as organizações: responsabilidade civil, multas, garantias jurídicas, proteção de dados, compromissos de segurança e níveis de serviço contratuais. Não há configuração dessa lista por organização neste escopo.

Quando um item envolver qualquer um desses assuntos:

- o risco deve ser explicitamente apresentado;
- deve existir indicação de necessidade de validação adicional.

O rascunho deve permanecer visível, acompanhado de alerta de alto risco. Antes da
aprovação, um Aprovador deve confirmar explicitamente que realizou a validação necessária.
Essa confirmação deve registrar pessoa, data, horário e versão da resposta validada.
O reconhecimento feito por um Revisor não substitui essa confirmação do Aprovador.
Sem a confirmação, a aprovação permanece bloqueada e o motivo deve ser informado.
A confirmação não aprova automaticamente o item; a aprovação continua sendo ação explícita.
Alterar a resposta após a confirmação exige nova confirmação para a versão alterada. Toda resposta manual, edição ou restauração deve ser reavaliada quanto aos seis assuntos críticos, considerando a pergunta e a versão atual da resposta. Enquanto a avaliação dessa versão estiver pendente ou falhar, a aprovação permanece bloqueada. O resultado de uma versão anterior não pode liberar a versão atual.

- Dada uma resposta antes sem assunto crítico, quando uma pessoa inclui uma multa ou garantia jurídica, a nova versão exige avaliação e, identificado o assunto, alerta de alto risco e confirmação do Aprovador antes da aprovação.

- Para cada um dos seis assuntos críticos, dado um item que o envolva, quando a sugestão é apresentada, o alerta de alto risco fica visível e a aprovação exige confirmação da validação necessária por um Aprovador.
- Dado um item com mais de um desses assuntos, quando é validado, a confirmação deve abranger todos os assuntos críticos identificados na versão atual, sem dispensar o tratamento dos demais alertas.


##### 9.6 Resposta manual sem fonte

Uma resposta escrita manualmente sem evidência associada pode ser aprovada.

Entretanto:

- deve ser identificada como resposta manual;
- o autor deve ser registrado;
- a ausência de fonte deve permanecer explícita;
- um alerta deve ser reconhecido antes da aprovação.

---

#### Privacidade e telemetria

A interface deve emitir eventos necessários para medir comportamento e resultados do MVP.

Telemetria pode registrar:

- estados;
- tempos;
- tipos;
- IDs técnicos;
- quantidade de itens;
- tipos de alerta;
- percentual de alteração;
- resultado das ações.

Telemetria não deve registrar:

- texto das perguntas;
- texto das respostas;
- conteúdo dos documentos;
- conteúdo das evidências.

---

#### Requisitos transversais

##### Acessibilidade

Meta do MVP:

WCAG 2.2 AA.

A experiência principal de revisão deve suportar teclado.

Mudanças relevantes de estado devem ser acessíveis a tecnologias assistivas.

Nenhum estado deve depender exclusivamente de cor.


##### Responsividade

A experiência principal é desktop.

Split view é priorizado em telas ≥ 1280 px.

Entre 768 e 1279 px, revisão pode utilizar navegação sequencial entre lista e detalhe.

Abaixo de 768 px, o MVP deve priorizar consulta e não precisa permitir aprovação ou exportação.


##### Desempenho percebido

A navegação entre itens deve parecer imediata.

Listas extensas não devem bloquear a interface.

Ações de revisão não devem exigir reload completo da página.

---

#### Segurança e integridade das decisões

- **FR-SEC-01**: Somente usuários autenticados pertencentes à organização podem acessar seu conteúdo; nenhuma organização pode acessar dados de outra, incluindo resultados de geração, fontes e exportações.
- **FR-SEC-02**: Permissões, transições, invalidação de aprovação e condições de exportação devem ser verificadas por regras explícitas, independentes de decisões da IA. Ocultar uma ação na interface não substitui impedir seu uso não autorizado.
- **FR-SEC-03**: Revisões, reconhecimentos individuais, decisões sobre conflitos, aprovações, invalidações e exportações devem ser rastreáveis por pessoa, instante, tarefa/item e versão afetada, sem copiar conteúdo corporativo para logs ou analytics.
- **FR-SEC-04**: A IA não pode inventar evidências, aprovar respostas ou enviar a entrega automaticamente. Alterações na sugestão e nas fontes devem manter explícita a origem e a incerteza.
- **FR-SEC-05**: Dados corporativos reais do piloto somente podem ser enviados a países e provedores previamente informados e autorizados pela empresa participante. Sem autorização registrada para o destino, o envio deve ser bloqueado com motivo explícito. A autorização abrange os destinos usados para armazenamento e processamento, inclusive IA, e mudanças de destino exigem nova autorização.


- **FR-SEC-06**: Após o encerramento do piloto de uma organização, permitir a recuperação de suas entregas durante 30 dias, mantendo autenticação, isolamento e permissões de acesso. Recuperação significa baixar uma entrega imutável cuja geração e publicação foram concluídas antes do encerramento, com indicação explícita de versão histórica. Exige Aprovador com permissão vigente na mesma organização, arquivo disponível e prazo de 30 dias ainda não encerrado; não exige que a tarefa atual mantenha as aprovações do manifesto histórico. Alterações posteriores não tornam a entrega recuperada uma resposta atual. Gerar uma nova exportação ou baixar como entrega atual continua exigindo todos os critérios atuais de F-26. Jobs não publicados antes do encerramento não são recuperáveis como entrega histórica. Ao fim desse período, excluir o conteúdo corporativo dos sistemas ativos, incluindo documentos, extrações, chunks, embeddings, perguntas, respostas, evidências e arquivos de exportação. Cópias de backup devem expirar até 90 dias após o encerramento. Os prazos contam a partir do mesmo instante de encerramento registrado e abrangem as cópias aplicáveis dos provedores; a compatibilidade dessas condições deve ser verificada antes do piloto real. Preservação de histórico durante o uso não autoriza conservar seu conteúdo após esse prazo.
  - Dado um piloto encerrado, enquanto não transcorrerem 30 dias, o participante autorizado pode recuperar suas entregas; outra organização ou pessoa sem permissão não pode acessá-las.
  - Dado o término dos 30 dias, o conteúdo corporativo deixa de estar disponível nos sistemas ativos; falha de exclusão deve ser explicitada e tratada, nunca registrada como exclusão concluída.
  - Até 90 dias após o encerramento, as cópias de backup abrangidas pela política devem ter expirado. Uma restauração não pode republicar conteúdo cujo prazo de exclusão já venceu.

### Key Entities

- **Organização**: limite de acesso e propriedade da base, tarefas, pessoas e histórico.
- **Participante**: pessoa identificada vinculada à organização, com papel Revisor ou Aprovador; papéis atribuídos por um administrador da própria organização dentro do produto.
- **Documento de conhecimento**: arquivo autorizado, tipo, responsável pelo upload, atualização, idade, versão quando disponível e estado de processamento; distingue histórico importado.
- **Tarefa RFP/RFI**: nome, empresa destinatária, tipo, prazo, responsável, documento de perguntas, processamento e completude.
- **Item**: ID, pergunta, sugestão original, resposta atual, autoria, estado e vínculo à tarefa.
- **Evidência**: documento, trecho/página, tipo, idade e relação verificável com a resposta.
- **Alerta e tratamento**: tipo, condição pendente/tratada, item, decisão individual, pessoa e instante.
- **Revisão/aprovação**: ação humana vinculada à versão da resposta, responsável e instante; alterações invalidam aprovação vigente sem apagar o evento anterior.
- **Exportação**: entrega autorizada com itens e respostas aprovadas, evidências e identificação de conteúdo manual sem fonte.
- **Registro histórico**: versão aprovada, pergunta, origem, aprovador, data, idade e fontes; não equivale a aprovação automática de reutilizações.
- **Feedback**: avaliação positiva/negativa e justificativa associada à sugestão; conteúdo livre não deve ser copiado para analytics.

## Success Criteria *(mandatory)*

### Measurable Outcomes

As metas de produto são hipóteses de piloto, não resultados já demonstrados. Métricas
sem observações elegíveis são apresentadas como sem dados, nunca como sucesso.

- **SC-001**: Uma organização completa o percurso base → importação → sugestões → evidências → revisão → aprovação de 100% dos itens → exportação → histórico, sem chat ou decisões autônomas da IA.
- **SC-002**: 100% das tentativas avaliadas de aprovação por Revisor, exportação incompleta, exportação por Revisor e acesso entre organizações são negadas.
- **SC-003**: 100% das aprovações avaliadas identificam pessoa e instante; 100% das edições após aprovação invalidam a aprovação anterior.
- **SC-004**: Preservação média de pelo menos 70% do texto sugerido nas versões aprovadas com sugestão original. Proposta de medição: proporção de palavras originais preservadas em ordem, limitada a 100%, calculada por item; respostas inteiramente manuais ficam fora do denominador.
- **SC-005**: Mais de 80% das respostas aprovadas originalmente sugeridas com fontes preservam suas fontes sem substituição. Respostas sem fonte original ficam fora do denominador.
- **SC-006**: Pelo menos 80% dos feedbacks positivos ou negativos recebidos são positivos; informar também número de avaliações e cobertura dos itens avaliados.
- **SC-007**: Redução de pelo menos 60% do tempo upload → exportação frente ao baseline declarado pelo cliente para tarefas comparáveis, reportando amostra e baseline. Meta confirmada em Q-07, a validar no piloto; não constitui garantia de resultado.
- **SC-008**: Redução de 50% das horas de especialistas na revisão frente ao baseline declarado pelo cliente para tarefas comparáveis.
- **SC-009**: Medir criação da conta → primeiro rascunho revisável por organização; sem meta de aprovação enquanto Q-08 não for decidida.
- **SC-010**: Nenhum texto de pergunta, resposta, documento ou evidência aparece nos eventos de telemetria inspecionados nos cenários de aceitação.
- **SC-011**: Fluxos principais atendem à meta WCAG 2.2 AA, com operação por teclado, estados anunciados a tecnologias assistivas e indicadores que não dependem só de cor.
- **SC-012**: Proposta de meta para tornar “imediata” verificável: em tarefa com 100 itens já processados, 95% das trocas exibem o próximo item em até 1 segundo, sem perder edição e sem recarregar toda a página. A escala de 100 itens é cenário de avaliação, não limite comercial.


- **SC-013**: Antes de liberar sugestões de IA no piloto, avaliar 100 perguntas representativas com resultados esperados definidos e revisados por pessoas. Pelo menos 95 devem apresentar corretamente a resposta sustentada ou a condição de ausência de contexto, lacuna ou conflito. A amostra deve ter zero afirmações sem sustentação apresentadas como fatos, zero fontes inventadas e zero assuntos críticos omitidos. Qualquer falha nesses três critérios impede a liberação, mesmo com 95 ou mais acertos no total. Incluir português e inglês, fontes nos dois idiomas, ausência de contexto, cobertura parcial, conflitos e os seis assuntos críticos. Registrar os resultados e a configuração avaliada. O resultado vale para a amostra e não garante ausência de erros futuros; a aprovação humana por resposta continua obrigatória.

## Assumptions

### Hipóteses controladas e decisões pendentes

As hipóteses fornecidas pelo usuário não constituem decisões definitivas. Nenhuma questão
aberta pode ser resolvida por inferência durante a implementação. As fórmulas de SC-004
a SC-008 e o alvo de SC-012 são propostas de operacionalização para revisão no planejamento.

### 16. Registro de questões e decisões

Questões abertas não devem ser respondidas por inferência durante a implementação.

#### Q-01 — Termos críticos

Decisão confirmada pelo usuário: Mostrar rascunho com alerta de alto risco; o Aprovador deve confirmar que realizou a validação necessária antes de aprovar. A confirmação é registrada e vinculada à versão da resposta. A regra aplica-se à lista fixa de responsabilidade civil, multas, garantias jurídicas, proteção de dados, compromissos de segurança e níveis de serviço contratuais.

#### Q-04 — Histórico importado

Decisão confirmada pelo usuário: Identificar como Histórico importado, sem aprovação automática. Pode apoiar sugestões, mas cada nova resposta exige aprovação humana. Não inventar aprovador, data ou evento de aprovação para o conteúdo importado.

#### Q-05 — Gestão de papéis

Decisão confirmada pelo usuário: um administrador da organização gerencia os papéis Revisor e Aprovador dentro do produto. A gestão se limita aos participantes da própria organização. A equipe Tendra cadastra a organização e convida o primeiro administrador indicado pela empresa. A troca posterior também é realizada pela equipe Tendra, após confirmação com a empresa, com registro do responsável pela operação, antecessor, sucessor e instante.

#### Q-07 — Meta de ciclo

Decisão confirmada pelo usuário: Meta de redução de pelo menos 60%, comparando RFPs semelhantes com o tempo anterior informado pelo cliente. É um objetivo a validar no piloto, não um resultado garantido.

#### Q-08 — TTFV

Definir meta para time-to-first-value.


#### Q-10 — Formato de exportação

Decisão confirmada pelo usuário: DOCX e XLSX, em modelos padronizados da Tendra. Ambos preservam IDs, perguntas, respostas finais aprovadas e referências das evidências.

#### Q-11 — Quantidade mínima da base

Decisão confirmada pelo usuário: Permitir iniciar com base vazia, mostrando aviso. Sem contexto suficiente para sustentar qualquer parte da resposta, não gerar sugestões; permitir respostas manuais com os alertas e aprovações previstos. Não exigir quantidade mínima de documentos.

#### Q-12 — Idiomas

Decisão confirmada pelo usuário: Documentos em português e inglês; respostas no idioma de cada pergunta, podendo usar fontes nos dois idiomas. A interface permanece em português do Brasil.

#### Q-13 — Validação com usuários reais

Validar:

- deep-link;
- alertas reconhecíveis;
- fluxo Revisor/Aprovador;

com usuários reais antes de escalar o produto.


#### Q-14 — Arquivos Google

Decisão confirmada pelo usuário: Docs, Sheets e Slides entram por upload de arquivos previamente exportados. Os formatos aceitos são PDF, DOCX, XLSX e PPTX. Não há integração direta com Google Drive.

#### Q-15 — Conteúdo exportado

Decisão confirmada pelo usuário: exportar exclusivamente a versão final aprovada de cada resposta, incluindo as edições humanas. A sugestão original alterada não compõe a entrega como resposta.

#### Q-16 — Aging de respostas aprovadas

Decisão confirmada pelo usuário: Contar 120 dias desde a aprovação da versão reutilizada. Depois disso, mostrar alerta de conteúdo antigo, que deve ser reconhecido antes da nova aprovação. A aprovação original permanece preservada no histórico. A reutilização sempre exige aprovação humana na nova tarefa.

### 17. Assumptions

Até que questões não bloqueadoras sejam resolvidas:

- o MVP possui Revisor e Aprovador, com gestão de papéis por administrador da organização (decisão confirmada);
- aprovação continua exclusivamente humana;
- 120 dias é o aging padrão;
- respostas manuais sem fonte são permitidas mediante alerta;
- interface é pt-BR;
- produto é desktop-first;
- respostas aprovadas são o conteúdo utilizado na exportação;
- integrações externas permanecem fora do MVP.

Assumptions não substituem decisões definitivas.


### 18. Dependências para Implementação

Q-14 e Q-15 foram resolvidas pelo usuário, assim como Q-05. Os requisitos abaixo refletem essas decisões.

### Clarifications

As três escolhas foram confirmadas pelo usuário nesta etapa:

- **Q-14 — opção A**: upload de arquivos exportados em PDF, DOCX, XLSX e PPTX.
- **Q-15 — opção A**: exportação exclusivamente da versão final aprovada, incluindo edições humanas.
- **Q-05 — opção B**: administrador da organização gerencia os papéis dentro do produto.

Q-01 está resolvida: rascunho visível com alerta e confirmação de validação pelo Aprovador.
Q-10 está resolvida: exportação em DOCX e XLSX nos modelos padronizados da Tendra.
Q-12 está resolvida: documentos em português e inglês, sugestões no idioma de cada pergunta e fontes utilizáveis nos dois idiomas. Q-04 está resolvida: histórico importado sem aprovação automática, com aprovação humana exigida em cada nova resposta. Q-16 está resolvida: mais de 120 dias desde a aprovação da versão reutilizada geram alerta que exige reconhecimento antes da nova aprovação. Q-11 está resolvida: não há quantidade mínima de documentos; base vazia gera aviso sem impedir a criação. Q-07 está resolvida: meta de redução de pelo menos 60% no piloto, comparando tarefas semelhantes com o tempo anterior informado pelo cliente. Q-08 permanece métrica sem meta. Q-13 requer validação real antes de escalar.

### Pressupostos adicionais explícitos

- O primeiro piloto utilizará documentos corporativos reais. Antes de seu início, devem estar definidas as condições de tratamento desses dados, incluindo os destinos autorizados, o cumprimento de FR-SEC-06 e as condições de uso pelos provedores. Desenvolvimento e testes preparatórios podem utilizar dados sintéticos; isso não substitui a validação do piloto real.
- Armazenamento e processamento dos dados do piloto, inclusive pela IA, podem ocorrer fora do Brasil, desde que os países e provedores utilizados sejam informados e autorizados pela empresa participante antes do envio dos dados. A autorização deve ser registrada por organização, com responsável e instante. Uma mudança de país ou provedor exige nova autorização antes de enviar dados para o novo destino. A retenção/exclusão segue FR-SEC-06; as condições de uso dos dados pelos provedores ainda precisam ser verificadas.

- Uma resposta vazia não é aprovável; tarefa sem itens não atende ao fluxo de entrega.
- Todos os alertas obrigatórios pendentes bloqueiam revisão/aprovação; termos críticos exigem confirmação da validação necessária por um Aprovador, conforme Q-01.
- Reconhecer alerta não apaga sua existência nem sua decisão; alterar conteúdo que afete um tratamento exige nova avaliação desse tratamento.
- Contagens de alertas podem se sobrepor a estados; completude usa exclusivamente aprovados/total, sem somar categorias sobrepostas.
- Abaixo de 768 px, o recorte inicial é consulta, sem aprovação ou exportação; interface pt-BR.
- Identidade, vínculo organizacional e atribuição confiável de papéis são dependências para acesso real, sem escolher aqui tecnologia de autenticação.
- O limite de entrada é de 50 MB por arquivo, conforme FR-INPUT-01. Critérios de detecção e avaliação de baixa confiança e dos seis assuntos críticos precisam ser detalhados no planejamento antes de implementar os tratamentos afetados; não inventar metadados.

### Fora do escopo

Não implementar nesta spec:

- chat;
- assistente conversacional;
- exportação em PDF ou preenchimento do arquivo original preservando sua estrutura;
- envio automático;
- autoaprovação;
- aprovação multinível;
- aprovação em lote;
- integração direta com Google Drive;
- CRM;
- SharePoint;
- Slack;
- Teams;
- MCP;
- base pré-carregada de normas;
- fluxos específicos para licitações públicas;
- extensão para preenchimento automático de portais;
- atribuição individual de itens a especialistas;
- painel avançado de ROI;
- painel avançado de auditoria;
- funcionalidades P2;
- funcionalidades de parking lot.

---

### Constitution Check

Referência: Constituição Tendra.ai v1.1.0. Os requisitos preservam aprovação humana,
incerteza explícita, rastreabilidade, regras de autorização independentes da IA,
isolamento entre organizações, falhas explícitas e minimização de dados. Testes e
avaliações devem cobrir esses comportamentos proporcionalmente ao risco. Métricas de
aceitação não dispensam a validação de evidências, conflitos e ausência de contexto.
Nenhuma exceção constitucional é solicitada. Questões de produto pendentes não autorizam
contornar controles obrigatórios. Decisões de arquitetura pertencem ao planejamento.
