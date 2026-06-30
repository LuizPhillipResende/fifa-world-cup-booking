# Relatório de Avaliação e Verificação de Requisitos

**Sprint:** 1
**Data de Avaliação:** 22/06/2026
**Artefato Avaliado:** `requisitos/Documento de Requisitos.md`
**Critérios Base:** `Padrões Adotados/Regras_Verificacao_Analise_Requisitos.md`

---

## 1. Objetivo
Este relatório documenta a avaliação de conformidade dos Requisitos Funcionais (RFs) e Não Funcionais (RNFs) definidos para a Sprint 1, atestando se estes atendem às regras de qualidade de especificação predefinidas pela equipe.

## 2. Itens Avaliados e Resultados

Abaixo consta a checklist baseada no documento de diretrizes.

### 2.1 Nomenclatura e Identificação
- [x] **Regra 1:** Todos os Requisitos Funcionais usam o prefixo `RF-###` ou `[RF###]`.
- [x] **Regra 2:** Todos os Requisitos Não Funcionais usam o prefixo `RNF-###` ou `[NF###]`.
- **Status:** **APROVADO**. Os identificadores foram utilizados sequencialmente de `RF001` a `RF015` e `NF001` a `NF008` nas tabelas de especificação.

### 2.2 Limite de Extensão e Atomicidade (Concisão)
- [x] **Regra 3:** A descrição principal do requisito não ultrapassa 250 caracteres.
- [x] **Regra 4:** O requisito não utiliza "e" / "ou" conectando múltiplas ações distintas.
- **Status:** **APROVADO**. Os resumos na tabela descrevem exatamente o caso de uso. Ex: *"[RF002] O Administrador cadastra um novo estádio no sistema, informando nome, cidade e capacidade total."* Não há junção de CRUD na mesma frase (ex. "Cadastrar e Alterar").

### 2.3 Estrutura da Sentença e Remoção de Subjetividade
- [x] **Regra 5:** Todo RF se inicia com o verbo no infinitivo ou estrutura "O sistema deve / O [Ator] ...".
- [x] **Regra 6:** Termos vagos como "rápido" ou "amigável" não são utilizados.
- [x] **Regra 7:** RNFs de performance possuem métricas exatas (ex: *NF003 - máximo 3 segundos*).
- **Status:** **APROVADO**.

### 2.4 Rastreabilidade via GitHub Issues
- [x] **Regra 8:** Todo RF/RNF deve possuir uma issue rastreável.
- **Status:** **APROVADO**. As issues foram criadas no Backlog e a Tabela de Matriz de Rastreabilidade foi adicionada à Seção 5.5 do Documento de Requisitos.

## 3. Considerações Finais
A documentação atende a todos os critérios estabelecidos. Não foram encontradas não-conformidades ou ambiguidades nos requisitos durante a etapa de verificação. Os requisitos estão validados para entrar em desenvolvimento ativo.
