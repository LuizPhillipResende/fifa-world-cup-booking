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
