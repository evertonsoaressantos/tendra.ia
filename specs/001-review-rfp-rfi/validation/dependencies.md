# Dependências — T002

Metadados locais das dependências diretas após instalação. Licenças abaixo são inventário técnico, não parecer jurídico. Dependências transitivas e avisos de descontinuação devem continuar monitorados.

| Pacote | Versão instalada | Licença declarada | Node declarado |
| --- | --- | --- | --- |
| @base-ui/react | 1.8.0 | MIT | >=14.0.0 |
| @napi-rs/canvas | 1.0.9 | MIT | >= 10 |
| @supabase/ssr | 0.12.7 | MIT | não declarado |
| @supabase/supabase-js | 2.117.2 | MIT | >=22.0.0 |
| @tiptap/extension-bold | 3.31.4 | MIT | não declarado |
| @tiptap/extension-bullet-list | 3.31.4 | MIT | não declarado |
| @tiptap/extension-document | 3.31.4 | MIT | não declarado |
| @tiptap/extension-italic | 3.31.4 | MIT | não declarado |
| @tiptap/extension-list-item | 3.31.4 | MIT | não declarado |
| @tiptap/extension-ordered-list | 3.31.4 | MIT | não declarado |
| @tiptap/extension-paragraph | 3.31.4 | MIT | não declarado |
| @tiptap/extension-text | 3.31.4 | MIT | não declarado |
| @tiptap/pm | 3.31.4 | MIT | não declarado |
| @tiptap/react | 3.31.4 | MIT | não declarado |
| class-variance-authority | 0.7.1 | Apache-2.0 | não declarado |
| cn | 0.4.0 | MIT | >=20 |
| docx | 9.8.1 | MIT | >=10 |
| exceljs | 4.4.0 | MIT | >=8.3.0 |
| graphile-worker | 0.18.0 | MIT | >=22.18.0 |
| lucide-react | 1.48.0 | ISC | não declarado |
| next | 16.3.6 | MIT | >=20.9.0 |
| openai | 7.25.0 | Apache-2.0 | >=22.0.0 |
| pdfjs-dist | 6.3.289 | Apache-2.0 | >=22.13.0 || >=24 |
| pg | 8.23.1 | MIT | >= 16.0.0 |
| react | 19.2.8 | MIT | >=0.10.0 |
| react-dom | 19.2.8 | MIT | não declarado |
| server-only | 0.0.1 | MIT | não declarado |
| shadcn | 4.21.0 | MIT | >=20.18.1 |
| tw-animate-css | 1.4.0 | MIT | não declarado |
| zod | 4.6.5 | MIT | não declarado |
| @axe-core/playwright | 4.13.0 | MPL-2.0 | não declarado |
| @playwright/test | 1.63.0 | Apache-2.0 | >=20 |
| @tailwindcss/postcss | 4.3.3 | MIT | não declarado |
| @types/node | 24.19.0 | MIT | não declarado |
| @types/pg | 8.23.1 | MIT | não declarado |
| @types/react | 19.3.0 | MIT | não declarado |
| @types/react-dom | 19.3.0 | MIT | não declarado |
| eslint | 9.39.5 | MIT | ^18.18.0 || ^20.9.0 || >=21.1.0 |
| eslint-config-next | 16.3.6 | MIT | não declarado |
| tailwindcss | 4.3.3 | MIT | não declarado |
| tsx | 4.23.15 | MIT | >=18.0.0 |
| typescript | 5.9.3 | Apache-2.0 | >=14.17 |
| vitest | 5.0.3 | MIT | ^22.12.0 || ^24.0.0 || >=26.0.0 |

ExcelJS usa uuid v4 via CommonJS. Override localizado `exceljs → uuid 11.1.1` remove GHSA-w5hq-g745-h8pq sem downgrade do ExcelJS. Auditoria npm após instalação: zero vulnerabilidades reportadas. Isso não substitui validação de arquivos não confiáveis/sandbox da US3.

Smoke executado com sucesso em Node 24: exportação/reimportação XLSX com formatação condicional (exercita uuid) e texto iniciado por `=` preservado como string; geração DOCX; canvas PNG; imports PDF.js e Graphile Worker. Testes funcionais e isolamento dos parsers permanecem nas jornadas correspondentes.
