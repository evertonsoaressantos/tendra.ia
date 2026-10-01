# Tendra.ai Constitution

A Tendra.ai é uma plataforma B2B AI-native para apoiar empresas na resposta a RFPs e RFIs, utilizando conhecimento corporativo autorizado para recuperar informações, gerar sugestões de resposta, apresentar evidências e apoiar o processo de revisão e aprovação humana.

Como a plataforma processa informações corporativas potencialmente confidenciais e utiliza Inteligência Artificial para apoiar respostas que podem gerar compromissos técnicos, comerciais, jurídicos ou de compliance, confiança, segurança, rastreabilidade e controle humano são requisitos fundamentais do sistema.

Esta Constitution define os princípios obrigatórios de engenharia da Tendra.ai.

Toda especificação, plano técnico, tarefa e implementação MUST respeitar estes princípios.

## Core Principles

### I. Qualidade de Código

Todo código da Tendra.ai MUST priorizar:

- clareza;
- simplicidade;
- previsibilidade;
- legibilidade;
- testabilidade;
- manutenibilidade.

O código MUST possuir responsabilidades claras e evitar duplicações desnecessárias.

Abstrações MUST existir apenas quando reduzirem complexidade real ou duplicação significativa. Abstrações especulativas ou criadas apenas para possíveis necessidades futuras SHOULD ser evitadas.

Nomes de componentes, funções, variáveis, serviços e módulos MUST expressar claramente sua responsabilidade.

Regras de negócio MUST permanecer desacopladas da camada de apresentação sempre que possível.

Integrações externas, persistência, autenticação, processamento de documentos e componentes de IA MUST possuir limites claros.

Erros MUST ser tratados explicitamente.

Secrets, tokens, credenciais ou informações sensíveis MUST NOT ser hardcoded.

Código morto, dependências desnecessárias e implementações abandonadas MUST ser removidos.

Entre uma solução simples que atende ao requisito atual e uma arquitetura preparada para necessidades hipotéticas futuras, a solução simples SHOULD ser preferida.

### II. Arquitetura Modular e Manutenível

A arquitetura MUST permitir que partes importantes do sistema evoluam de forma independente.

Responsabilidades SHOULD possuir limites claros entre:

- interface e experiência;
- regras de negócio;
- autenticação e autorização;
- persistência;
- processamento de documentos;
- recuperação de conhecimento;
- RAG;
- interação com modelos de linguagem;
- geração de respostas;
- rastreabilidade;
- observabilidade.

Componentes de IA MUST NOT controlar diretamente regras críticas do sistema.

Regras relacionadas a:

- autenticação;
- autorização;
- isolamento entre organizações;
- permissões;
- estados de workflow;
- aprovação humana;
- autorização para exportação ou entrega;

MUST ser implementadas por mecanismos determinísticos.

Dependências entre módulos MUST ser explícitas.

Mudanças arquiteturais relevantes MUST ser documentadas.

### III. Testes como Requisito de Implementação

Toda mudança que altera comportamento do sistema MUST possuir testes proporcionais ao risco introduzido.

A estratégia de testes SHOULD considerar:

- testes unitários;
- testes de integração;
- testes de contrato;
- testes end-to-end;
- testes específicos para componentes de IA e RAG.

Correções de bugs SHOULD incluir teste de regressão sempre que possível.

Testes MUST validar comportamento e contratos observáveis, evitando dependência excessiva de detalhes internos de implementação.

Mocks, fixtures e dados controlados SHOULD ser utilizados quando necessários para tornar testes críticos determinísticos.

Falhas em testes obrigatórios MUST bloquear merge ou deploy até serem resolvidas.

Código considerado crítico para segurança, autorização, isolamento, aprovação ou rastreabilidade MUST possuir cobertura adequada ao risco.

### IV. IA Rastreável, Avaliável e Transparente sobre Incerteza

Toda funcionalidade baseada em IA MUST ser tratada como comportamento avaliável do produto.

Não é suficiente que uma chamada ao modelo execute tecnicamente. O resultado produzido MUST possuir critérios explícitos de qualidade.

Sempre que uma resposta utilizar informações recuperadas da base corporativa, o sistema MUST preservar a relação entre:

- informação apresentada;
- evidência utilizada;
- origem da evidência;
- contexto relevante da evidência.

Conteúdo gerado pela IA MUST permitir identificar as evidências utilizadas quando elas existirem.

O sistema MUST distinguir claramente entre:

- conteúdo sustentado por evidências;
- conteúdo com evidência insuficiente;
- conteúdo com evidências conflitantes;
- situações em que não existe contexto suficiente;
- conteúdo produzido manualmente por uma pessoa.

Ausência de evidência, baixa confiança, conflito entre fontes ou contexto insuficiente MUST ser explicitamente representados pelo sistema.

Essas situações MUST NOT ser mascaradas como informação confirmada.

A IA MUST NOT inventar informações para preencher lacunas de conhecimento.

Quando não houver informação suficiente para sustentar uma conclusão, o sistema MUST permitir um estado explícito de incerteza, ausência de contexto ou necessidade de intervenção humana.

Testes e avaliações de IA SHOULD considerar, conforme aplicável:

- grounding;
- faithfulness;
- relevância da recuperação;
- validade das fontes;
- presença de informações não suportadas;
- ausência de contexto;
- conflito entre fontes;
- isolamento entre organizações;
- cumprimento dos guardrails.

Mudanças em:

- prompts;
- modelos;
- estratégia de retrieval;
- chunking;
- embeddings;
- parâmetros relevantes;
- pipeline de RAG;

MUST ser tratadas como mudanças de comportamento e avaliadas proporcionalmente ao impacto.

### V. Human-in-the-Loop é Obrigatório

A IA da Tendra.ai atua como copiloto.

Ela pode:

- interpretar documentos;
- recuperar conhecimento;
- sintetizar informações;
- sugerir respostas;
- identificar lacunas;
- identificar conflitos;
- apresentar evidências.

A IA MUST NOT tomar autonomamente decisões finais que criem compromissos técnicos, comerciais, jurídicos ou de compliance em nome da organização.

A IA MUST NOT:

- aprovar sua própria resposta;
- inventar informações ausentes;
- assumir compromissos não presentes nas evidências;
- alterar ou ocultar evidências para justificar uma resposta;
- enviar uma RFP ou RFI ao destinatário final de forma autônoma.

Decisões finais relevantes MUST exigir ação humana explícita.

O sistema MUST preservar evidências suficientes para identificar quem realizou ações humanas críticas e quando elas ocorreram.

### VI. Segurança, Privacidade e Isolamento por Padrão

Segurança MUST ser considerada desde o início de qualquer funcionalidade.

Toda implementação MUST considerar:

- autenticação;
- autorização;
- RBAC quando aplicável;
- isolamento entre organizações;
- proteção contra acesso cruzado entre bases corporativas;
- criptografia quando aplicável;
- gerenciamento seguro de secrets;
- validação de arquivos e entradas;
- princípio do menor privilégio.

Uma organização MUST NOT acessar dados, documentos, respostas, fontes ou contexto pertencentes a outra organização.

Testes de isolamento e permissões MUST existir para fluxos críticos.

Logs, telemetria e ferramentas de observabilidade MUST seguir o princípio de minimização de dados.

Conteúdo corporativo confidencial MUST NOT ser incluído em logs, eventos analíticos ou telemetria quando metadados forem suficientes para cumprir o objetivo operacional.

Secrets, tokens, credenciais e dados sensíveis MUST NOT aparecer em logs.

### VII. Rastreabilidade e Auditoria

A Tendra.ai MUST permitir reconstruir decisões relevantes realizadas dentro do sistema.

Quando aplicável, o sistema SHOULD preservar:

- origem da resposta;
- evidências utilizadas;
- localização da evidência;
- relação entre evidência e resposta;
- estado da resposta;
- alterações humanas relevantes;
- ações de revisão;
- ações de aprovação;
- identidade de quem realizou ações críticas;
- momento em que essas ações ocorreram.

Uma resposta MUST NOT ser apresentada como sustentada por evidência quando essa relação não puder ser verificada.

Eventos críticos relacionados a:

- segurança;
- autenticação;
- autorização;
- processamento;
- revisão;
- aprovação;
- exportação;

SHOULD possuir registros suficientes para investigação e auditoria.

Auditoria MUST NOT comprometer os princípios de privacidade e minimização de dados definidos nesta Constitution.

### VIII. Falhas Devem Ser Explícitas e Seguras

Falhas MUST NOT produzir silenciosamente resultados incorretos.

Falhas em:

- processamento;
- retrieval;
- geração;
- persistência;
- autorização;
- armazenamento;
- integrações externas;

MUST resultar em estados explícitos e seguros.

O sistema SHOULD distinguir situações como:

- processamento;
- processamento concluído;
- falha;
- informação insuficiente;
- conflito de informações;
- necessidade de revisão humana.

Uma dependência externa indisponível MUST NOT fazer o sistema assumir que uma operação foi concluída com sucesso.

Quando houver dúvida entre continuar silenciosamente ou interromper uma operação potencialmente incorreta, o sistema SHOULD favorecer o comportamento mais seguro.

### IX. Observabilidade sem Comprometer Confidencialidade

Funcionalidades críticas MUST possuir mecanismos adequados de diagnóstico.

O sistema SHOULD permitir observar:

- falhas;
- erros de integração;
- latência;
- consumo de serviços de IA;
- falhas de retrieval;
- comportamento do pipeline de RAG;
- erros de autenticação e autorização;
- operações críticas realizadas pelos usuários.

Telemetria SHOULD priorizar eventos, estados, identificadores técnicos e metadados necessários para diagnóstico e métricas.

Conteúdo de RFPs, RFIs, documentos corporativos, perguntas, respostas ou evidências MUST NOT ser coletado por telemetria quando o objetivo puder ser atingido utilizando metadados.

Observabilidade MUST NOT criar um novo canal de exposição de informações confidenciais.

### X. Mudanças Pequenas, Reversíveis e Verificáveis

Mudanças SHOULD ser implementadas em unidades pequenas e compreensíveis.

Cada mudança SHOULD possuir:

- objetivo claro;
- requisito ou especificação relacionada;
- critérios verificáveis;
- testes adequados;
- impacto conhecido.

Mudanças não relacionadas SHOULD ser evitadas dentro da mesma implementação.

Refactors MUST preservar o comportamento existente, comprovado por testes sempre que possível.

Mudanças destrutivas em:

- banco de dados;
- APIs;
- contratos;
- formatos persistidos;

MUST possuir estratégia adequada de migração.

Quando o risco justificar, mudanças SHOULD possuir estratégia de rollback.

## XI. Definition of Done

Uma implementação somente pode ser considerada concluída quando:

- atende à especificação;
- respeita esta Constitution;
- possui código compreensível e manutenível;
- não introduz complexidade injustificada;
- possui testes adequados ao risco;
- todos os testes obrigatórios passam;
- erros relevantes são tratados;
- segurança e isolamento foram considerados;
- observabilidade adequada existe;
- documentação necessária foi atualizada.

Quando houver IA envolvida:

- o comportamento foi avaliado;
- evidências e rastreabilidade foram preservadas quando aplicáveis;
- incertezas não são mascaradas;
- guardrails continuam funcionando;
- controle humano continua preservado.

Código que apenas "funciona" tecnicamente não satisfaz a Definition of Done.

## Fluxo de Desenvolvimento e Revisão

Specs, planos e tarefas MUST registrar a verificação dos princípios aplicáveis antes
da implementação. Antes de merge ou deploy, a revisão MUST verificar os testes
obrigatórios e os critérios da Definition of Done. A avaliação MUST considerar o
risco e a aplicabilidade dos controles, preservando as distinções entre requisitos
MUST (obrigatórios), MUST NOT (proibidos) e SHOULD (recomendações).

Decisões específicas de produto e critérios de avaliação SHOULD permanecer nas
respectivas specs e planos, conforme a governança desta constituição.

## Governance

Esta Constitution possui autoridade sobre decisões ad hoc de implementação.

Specs, planos e tarefas MUST ser avaliados contra estes princípios antes da implementação.

Quando uma solução proposta violar um princípio desta Constitution, a implementação MUST:

1. ser alterada para cumprir o princípio; ou
2. possuir uma exceção explícita, documentada e tecnicamente justificada.

Exceções MUST ser raras e não podem ser utilizadas apenas para acelerar uma entrega.

Mudanças nesta Constitution MUST representar decisões conscientes sobre como a Tendra.ai será construída.

Regras obrigatórias MUST NOT ser enfraquecidas apenas para permitir que uma implementação existente seja considerada válida.

Decisões específicas de produto, UX, métricas, thresholds, layouts, papéis ou comportamentos experimentais SHOULD permanecer nas respectivas specs enquanto não representarem princípios permanentes de engenharia.

### Emendas e Versionamento

Emendas DEVEM incluir a alteração proposta, sua justificativa, os impactos nas specifications,
plans e tasks existentes e a aprovação do responsável pelo projeto. Após aprovação, a versão e a
data de última alteração DEVEM ser atualizadas, preservando a data de ratificação original. A
revisão DEVE identificar os artefatos dependentes que precisam de adequação e registrar esse
acompanhamento.

O versionamento DEVE seguir SemVer:

- MAJOR: remoção ou redefinição incompatível de princípios ou regras de governança.
- MINOR: adição de princípio, seção ou ampliação material de orientação compatível.
- PATCH: esclarecimento, correção textual ou ajuste sem mudança semântica.

**Projeto:** Tendra.ai

**Status:** Ativa

### Alterações da v1.1.0

- Revisado o Princípio IV para substituir a exigência absoluta de grounding por rastreabilidade, avaliação e transparência explícita sobre incerteza.
- Formalizado que ausência ou conflito de evidências nunca podem ser apresentados como informação confirmada.
- Reforçado o princípio de minimização de dados em logs, telemetria e observabilidade.
- Mantidos os demais princípios estruturais da Constitution v1.0.0.

**Version**: 1.1.0 | **Ratified**: 2026-09-29 | **Last Amended**: 2026-09-30
