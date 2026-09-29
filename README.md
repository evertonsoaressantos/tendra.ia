# Tendra.ai

Repositório privado: https://github.com/evertonsoaressantos/tendra.ia

Aplicação inicial com Next.js, React, TypeScript, Tailwind CSS e shadcn/ui.
Design system e MVP vivem no mesmo projeto e compartilham componentes.

## Executar

Requisito: Node.js 24 LTS (versão utilizada: 24.21.0).

```sh
npm ci
npm run dev
```

- Início: http://localhost:3000
- Design system: http://localhost:3000/design-system

Nesta máquina, Node.js e uv estão em `~/.local/bin`. Se o terminal já estava
aberto antes da instalação, abra um novo terminal ou execute:

```sh
source ~/.local/bin/env
```

## Verificar

```sh
npm run lint
npm run typecheck
npm run build
```

O build usa Webpack, pois o Turbopack encontrou uma restrição de portas no
ambiente de configuração. O desenvolvimento mantém o padrão do Next.js.

O build usa `next/font/google` para obter e hospedar localmente as fontes Space Grotesk, IBM Plex Sans e IBM Plex Mono;
a primeira compilação precisa de acesso à rede para baixá-las.

## Componentes

O shadcn usa Base UI com os padrões visuais oficiais da Tendra.ai. Os tokens
estão em `src/styles/tokens.css` e os aliases em `src/app/globals.css`. Os
componentes ficam em `src/components/ui`.

Veja as [regras e fontes do design system](docs/design-system/README.md).
O catálogo inclui cores, tipografia, botões, badges e formulário de demonstração,
com prévia clara/escura. Os exemplos não persistem nem enviam dados.

```sh
npx shadcn add nome-do-componente
```

## Spec Kit

Instalado a partir do pacote oficial `specify-cli==1.0.12`, publicado pelo
projeto https://github.com/github/spec-kit, com integração Codex em modo skills.
O CLI utiliza Python 3.12 gerenciado pelo uv, separado do Python do macOS.

Para reproduzir a instalação em outra máquina com uv:

```sh
uv tool install specify-cli==1.0.12 --python 3.12
specify version
```

Os templates e skills já estão incluídos no projeto. Para usar as skills,
abra uma nova conversa do Codex nesta pasta caso ainda não apareçam.
A sequência de trabalho é:

1. `$speckit-constitution`: estabelecer os princípios do projeto.
2. `$speckit-specify`: descrever uma funcionalidade.
3. `$speckit-plan`: planejar a implementação.
4. `$speckit-tasks`: dividir o trabalho em tarefas.
5. `$speckit-implement`: implementar.
6. `$speckit-converge`: conferir o resultado contra a especificação.

Essas instruções são usadas no chat do agente, não no terminal.
A constituição permanece no modelo oficial até definirmos os princípios.
O MVP ainda não possui funcionalidades, banco de dados ou autenticação definidos.

Veja [a organização e as decisões de arquitetura](docs/architecture.md).
