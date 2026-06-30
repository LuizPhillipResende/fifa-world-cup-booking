# Regras de Verificação e Análise de Requisitos

Para garantir a qualidade, padronização e clareza na especificação dos requisitos deste projeto (em conformidade com as diretrizes de Engenharia de Software), todos os membros da equipe devem obedecer estritamente às seguintes regras ao redigir os documentos de requisitos:

## 1. Nomenclatura e Identificação Única
Todo requisito deve possuir um identificador único, seguindo um padrão rígido que facilite a rastreabilidade:
- **Requisitos Funcionais:** Devem ser nomeados com o prefixo **`RF-`** seguido de um número sequencial de 3 dígitos (ex: `RF-001`, `RF-002`).
- **Requisitos Não Funcionais:** Devem ser nomeados com o prefixo **`RNF-`** seguido de um número sequencial de 3 dígitos (ex: `RNF-001`, `RNF-002`).
- O identificador não pode ser alterado ou reaproveitado caso um requisito seja excluído.

## 2. Limite de Extensão e Concisão (Evitando Ambiguidade)
Para evitar ambiguidades e garantir que cada requisito trate de apenas uma funcionalidade específica (atomicidade), a descrição de cada requisito deve ser concisa e objetiva:
- A descrição principal do requisito **não deve ultrapassar 250 caracteres**.
- O requisito **não deve conter** as conjunções "e" ou "ou" conectando duas ações distintas. Se uma sentença possui múltiplas ações (ex: *"O sistema deve cadastrar cliente **e** emitir relatório"*), ela obrigatoriamente deve ser dividida em dois requisitos separados (`RF-001: O sistema deve cadastrar cliente.` e `RF-002: O sistema deve emitir relatório.`).

## 3. Estrutura Obrigatória da Sentença e Remoção de Subjetividade
A redação do requisito deve seguir um formato padronizado, focando na ação que o sistema deve realizar, sem subjetividade:
- Todo requisito funcional deve obrigatoriamente iniciar com a estrutura: **"O sistema deve [verbo no infinitivo] ..."** ou **"O [Ator] deve ser capaz de [verbo no infinitivo] ..."**.
- O uso de termos vagos, abstratos ou não quantificáveis é estritamente proibido. Palavras como *"rápido"*, *"fácil"*, *"amigável"*, *"bom"* ou *"adequado"* não podem constar no texto. 
- Se o requisito for de performance (RNF), ele deve especificar a métrica exata (ex: *"O sistema deve carregar a lista de assentos em no máximo 2 segundos"* em vez de *"O sistema deve ser rápido"*).

## 4. Identificadores de Issues no GitHub

Para garantir rastreabilidade entre as issues do GitHub e os artefatos do projeto, todo **título de issue** deve começar com um identificador entre colchetes, seguindo o padrão abaixo:

| Prefixo | Categoria | Exemplo de título |
|---|---|---|
| `[RF###]` | Requisito Funcional | `[RF012] Realizar Reserva - Backend` |
| `[BP###]` | Boas Práticas de código | `[BP001] Adicionar comentários JSDoc nas APIs` |
| `[TU###]` | Teste Unitário | `[TU003] Teste unitário - RF012 Criar Reserva` |
| `[TV###]` | Teste de Validação (Caixa Preta) | `[TV001] Caso de teste - RF001 Realizar Login` |
| `[TA###]` | Teste Automatizado (Selenium/Playwright) | `[TA001] Selenium - script de login RF001` |
| `[DOC###]` | Documentação | `[DOC001] Atualizar README - seção de Testes` |
| `[REL###]` | Release / Tag Git (Baseline) | `[REL003] Tag v0.3 - Baseline 3` |

### Regras de uso dos identificadores de issues

- O número sequencial deve ter **3 dígitos** (`001`, `002`, ...).
- O identificador deve ser **único dentro de sua categoria** — nunca reutilize um número excluído.
- Issues do tipo `[RF###]` devem referenciar o mesmo identificador do Requisito Funcional correspondente no **Documento de Requisitos** (`requisitos/Documento de Requisitos.md`).
- Issues do tipo `[BP]`, `[TU]`, `[TV]`, `[TA]` e `[DOC]` devem mencionar na **descrição da issue** a qual RF ou critério de qualidade estão associadas.
- A coluna **Milestone** de cada issue deve sempre indicar a Sprint correspondente (`Sprint 1`, `Sprint 2`, `Sprint 3`...).

