# fifa-world-cup-booking

Projeto acadêmico para a disciplina de Engenharia de Software (UFLA - GCC188). Plataforma construída com Next.js, JavaScript e Node.js para simular o processo de reserva e venda de ingressos para copa do mundo da FIFA 2026.

> 📄 **Documentação de Requisitos**: [`requisitos/Documento de Requisitos.md`](./requisitos/Documento%20de%20Requisitos.md)


## Equipe
* Maria Rita Resende
* Luiz Phillip Resende
* Tainara de Fátima Matias Souza

## 1. CONTEXTO DO PROBLEMA E SOLUÇÃO
- **Descrição do problema:** Os torcedores enfrentam filas virtuais desorganizadas, instabilidade do sistema e falta de transparência na seleção de assentos ao comprar ingressos para eventos de grande porte.
- **Descrição da solução:** O sistema web deverá propiciar o cadastro de jogos, estádios e usuários. Realizar a venda de ingressos via web, permitindo a seleção visual de assentos e a atualização em tempo real da disponibilidade, com finalização do pedido no carrinho.

## 2. INSTRUÇÕES PARA USO
Para testar e usar a aplicação na sua máquina (como usuário final):
1. Instale o [Node.js](https://nodejs.org/) e o banco de dados [PostgreSQL](https://www.postgresql.org/).
2. Crie um banco de dados local chamado `ingressos_copa`.
3. Baixe o ZIP do repositório no GitHub ou faça o clone.
4. Execute os scripts SQL localizados na pasta `database/` para criar as tabelas.
5. Inicie a aplicação seguindo os passos de execução para desenvolvedores (abaixo).
6. Abra o navegador e acesse `http://localhost:3000` para utilizar o sistema.

## 3. INSTRUÇÕES PARA DEVS
Siga as instruções abaixo para preparar seu ambiente e ser um DEV do projeto:

3.1 - Clone o projeto na sua máquina aplicando o comando:
`git clone https://github.com/LuizPhillipResende/fifa-world-cup-booking.git`
  * 3.1.1 Você pode também baixar o zip do projeto pelo GitHub e extrair na sua máquina.

3.2 - Abra o terminal na raiz do projeto e execute o comando para instalar as bibliotecas:
```bash
npm install
```

3.3 - Para executar o projeto em modo de desenvolvimento:
```bash
npm run dev
```
Em seguida, acesse o browser e digite a URL `http://localhost:3000`. Você deverá ver o sistema no seu browser.

## 4. PRINCIPAIS FUNCIONALIDADES DO SISTEMA

O sistema implementa os seguintes requisitos funcionais:

### Autenticação
- **[RF001]** Realizar Login – Login obrigatório para acessar qualquer funcionalidade do sistema.

### Estádio (CRUD – 1 tabela)
- **[RF002]** Cadastrar Estádio – Registra um novo estádio com nome, cidade e capacidade.
- **[RF003]** Consultar Estádios – Lista todos os estádios com filtro por nome ou cidade.
- **[RF004]** Alterar Estádio – Edita as informações de um estádio existente.
- **[RF005]** Excluir Estádio – Remove um estádio sem jogos vinculados.

### Jogo (CRUD – 2 tabelas: `jogos` + `estadios`)
- **[RF006]** Cadastrar Jogo – Cadastra uma partida com times, data/hora e estádio.
- **[RF007]** Consultar Jogos – Lista todos os jogos cadastrados (visão do Administrador).
- **[RF008]** Alterar Jogo – Edita os dados de um jogo sem reservas confirmadas.
- **[RF009]** Excluir Jogo – Remove um jogo e seus assentos (sem reservas confirmadas).

### Reserva (CRUD – 4 tabelas: `reservas` + `usuarios` + `jogos` + `assentos`)
- **[RF010]** Consultar Reservas (Admin) – Relatório consolidado de todas as reservas do sistema.
- **[RF011]** Cadastrar Usuário – Auto-cadastro de novos torcedores na plataforma.
- **[RF012]** Realizar Reserva de Ingresso – Seleção de assento e reserva de ingresso por torcedor.
- **[RF013]** Consultar Minhas Reservas – Histórico de reservas do torcedor logado.
- **[RF014]** Cancelar Reserva – Cancelamento de reserva com antecedência mínima de 48h.
- **[RF015]** Consultar Jogos Disponíveis (Torcedor) – Lista de jogos futuros com assentos disponíveis.

## 4. TECNOLOGIAS

- **Full-Stack Framework:**
  - Next.js (App Router, Server Actions, API Routes)
  - JavaScript (ES6+)
  - React, HTML5 / CSS3
- **Banco de Dados:**
  - PostgreSQL (versão 15.x.x)
- **IDE:**
  - VSCode

## 5. ORGANIZAÇÃO DO PROJETO

Este projeto está organizado como um monólito Next.js (o Next.js cuida de todo o Backend e Frontend no mesmo projeto). As pastas principais têm as seguintes finalidades:

### Estrutura de Pastas

*   **`src/app/`**: Contém as páginas da Interface do Usuário (Frontend) e as rotas de API (Backend) em `src/app/api`.
*   **`src/components/`**: Componentes reutilizáveis da interface do usuário.
*   **`public/`**: Arquivos estáticos (imagens, ícones).
*   **`Padrões Adotados/`**: Documentação de Engenharia de Software e regras de requisitos.
*   **`database/`**: Scripts SQL de criação do banco de dados relacional.

## 6. REGRAS DE USO DO GIT

Para manter a organização do repositório e facilitar a colaboração, as seguintes regras de uso do Git devem ser seguidas pela equipe:

### 6.1. Padrão de Nomenclatura de Branches
- **`main`**: Branch principal, contém o código de produção. Apenas código estável e testado.
- **`develop`**: Branch de desenvolvimento. Todas as novas features convergem para cá antes de irem para a `main`.
- **`feature/nome-da-feature`**: Para desenvolvimento de novas funcionalidades (ex: `feature/tela-de-login`).
- **`bugfix/nome-do-bug`**: Para correção de bugs (ex: `bugfix/erro-no-carrinho`).

### 6.2. Mensagens de Commit (Conventional Commits)
As mensagens de commit devem ser claras e seguir o padrão:
- `feat:` Nova funcionalidade (ex: `feat: adiciona componente Header`)
- `fix:` Correção de bug (ex: `fix: corrige alinhamento da tabela de jogos`)
- `docs:` Alterações na documentação (ex: `docs: atualiza regras do git no README`)
- `style:` Formatação de código, ponto e vírgula, etc.
- `refactor:` Refatoração de código sem mudar seu comportamento.

### 6.3. Fluxo de Trabalho (Pull Requests)
- Nunca faça commits diretamente na branch `main`.
- Crie uma branch a partir da `develop` para trabalhar.
- Ao finalizar, crie um Pull Request (PR) apontando para a `develop`.
- Recomenda-se que o código seja revisado por outro membro da equipe antes do merge.

## 7. BOAS PRÁTICAS DE CODIFICAÇÃO E LEGIBILIDADE

Para garantir que o código seja limpo, de fácil manutenção e legível, a equipe deve seguir os seguintes padrões:

1. **Clean Code (Código Limpo):**
   - **Nomes Descritivos:** Variáveis, funções e componentes devem ter nomes em inglês (ou português padronizado) que descrevam exatamente o que fazem (ex: `getAvailableSeats` em vez de `getSeats`).
   - **Funções Pequenas:** Funções devem ter uma única responsabilidade (Princípio da Responsabilidade Única).
   - **Evitar Números Mágicos:** Valores constantes devem ser extraídos para variáveis com nomes claros (ex: `const MAX_SEATS = 100`).

2. **Padrões de Projeto (React/Next.js):**
   - **Componentização:** Dividir interfaces grandes em componentes menores e reutilizáveis (ex: extrair botões e modais para arquivos separados).
   - **Separação de Preocupações:** O código de UI (`page.js`) não deve misturar regras de negócio pesadas. Regras de banco de dados devem ficar em `actions` ou `api routes`.

3. **Comentários:**
   - Comentar apenas o "porquê" (lógica de negócios complexa) e não o "o quê" (o código já deve ser expressivo o suficiente).

4. **Estilo de Código (Linting e Formatação):**
   - Utilizar ESLint (configurado nativamente no Next.js) e Prettier para padronização automática da formatação (espaçamentos, ponto-e-vírgula, indentação).

## 8. INFRAESTRUTURA DE IMPLANTAÇÃO

O sistema foi arquitetado para ser implantado na nuvem, utilizando serviços modernos e escaláveis:

- **Plataforma de Hospedagem (Frontend e Backend):** 
  - **Vercel**: O sistema Next.js será publicado na Vercel, que oferece integração nativa com o GitHub (CI/CD automático a cada push na branch `main`), escalabilidade global via Edge Network e facilidade de gerenciamento de Serverless Functions (onde rodam as APIs).

- **Banco de Dados (Produção):**
  - **Supabase / Vercel Postgres**: O banco de dados relacional (PostgreSQL) será hospedado em uma dessas plataformas, oferecendo backups automáticos, alta disponibilidade e fácil integração com o Prisma ORM.

- **Fluxo de CI/CD:**
  1. O desenvolvedor abre um Pull Request para a `main`.
  2. A Vercel gera um ambiente de *Preview* automático para testes.
  3. Após aprovação (Merge), o código é automaticamente colocado em *Produção* (Deploy).

