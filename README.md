# ⚽ FIFA World Cup 2026 — Booking

Projeto acadêmico desenvolvido para a disciplina de **Engenharia de Software (GCC188 — UFLA)**. Consiste em uma plataforma web construída com **Next.js 16, React 19, Tailwind CSS 4 e Prisma ORM**, criada para simular um sistema completo de reserva e venda de ingressos para a Copa do Mundo da FIFA 2026.

> 📄 **Documentação de Requisitos**: [`requisitos/Documento de Requisitos.md`](./requisitos/Documento%20de%20Requisitos.md)
>
> 📘 **Documentação Técnica Completa**: [`DOCUMENTACAO_TECNICA.md`](./DOCUMENTACAO_TECNICA.md)

---

## Equipe

| Nome | Papel |
|------|-------|
| Maria Rita Resende | Desenvolvedora |
| Luiz Phillip Resende | Desenvolvedor |
| Tainara de Fátima Matias Souza | Desenvolvedora |

---

## 1. CONTEXTO DO PROBLEMA E SOLUÇÃO

- **Descrição do problema:** A compra de ingressos para eventos de grande porte, como a Copa do Mundo, frequentemente gera frustração nos torcedores devido à altíssima demanda. Durante os picos de acesso, é comum que as plataformas apresentem instabilidade nos servidores e filas virtuais desorganizadas. Além disso, há uma grande falta de transparência na etapa de seleção de assentos, deixando o usuário sem saber se o lugar desejado ainda está realmente disponível até o momento de pagar.
- **Descrição da solução:** O sistema web propicia o cadastro de jogos, estádios e usuários. Realiza a venda de ingressos via web, permitindo a seleção visual de assentos e a atualização da disponibilidade, com finalização do pedido via reserva. Para o torcedor, o sistema entrega uma experiência de compra justa e fluida, através de um mapa interativo de assentos e um painel pessoal de reservas.

---

## 2. INSTRUÇÕES DE INSTALAÇÃO E USO

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm (incluído com o Node.js)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/LuizPhillipResende/fifa-world-cup-booking.git

# 2. Acesse o diretório do projeto
cd fifa-world-cup-booking

# 3. Instale as dependências
npm install

# 4. Gere o Prisma Client
npx prisma generate

# 5. Crie e aplique as migrações ao banco SQLite
npx prisma db push

# 6. (Opcional) Popule o banco com dados de exemplo
node prisma/seed.js

# 7. Inicie o servidor de desenvolvimento
npm run dev

# 8. (Opcional) Executar Testes Unitários (Jest)
npm run test

# 9. (Opcional) Executar Testes de Validação E2E (Playwright)
# Certifique-se de que o servidor (npm run dev) esteja rodando em outro terminal
npx playwright test
```

Acesse **`http://localhost:3000`** no navegador.

> **Nota:** O projeto utiliza **SQLite** como banco de dados (arquivo `prisma/dev.db`). Nenhuma instalação de banco de dados externo é necessária.

### Credenciais de teste (após executar o seed)

| E-mail | Senha |
|--------|-------|
| `joao@example.com` | `senha123` |

---

## 3. TECNOLOGIAS UTILIZADAS

| Categoria | Tecnologia | Versão |
|-----------|------------|--------|
| **Framework Full-Stack** | Next.js (App Router) | 16.2.7 |
| **Biblioteca UI** | React | 19.2.4 |
| **Linguagem** | JavaScript (ES6+) | — |
| **Estilização** | Tailwind CSS | 4.x |
| **ORM** | Prisma | 5.22.0 |
| **Banco de Dados** | SQLite | — |
| **Autenticação** | NextAuth.js (Credentials) | 4.24.14 |
| **Criptografia** | bcryptjs | 3.0.3 |
| **Ícones** | Lucide React | 1.21.0 |
| **Tipografia** | Google Fonts (Geist, Geist Mono) | — |
| **Linting** | ESLint + eslint-config-next | 9.x |
| **IDE** | VSCode | — |

---

## 4. ESTRUTURA DO PROJETO

```
fifa-world-cup-booking/
├── prisma/
│   ├── schema.prisma          # Esquema do banco de dados (6 modelos)
│   ├── seed.js                # Script de seed com dados iniciais
│   └── dev.db                 # Banco SQLite (gerado)
├── database/
│   └── 01_create_tables.sql   # Script SQL de referência
├── src/
│   ├── app/                   # Páginas (App Router) e API Routes
│   │   ├── layout.js          # Layout raiz (Header, Providers)
│   │   ├── page.js            # Página inicial — lista de jogos
│   │   ├── globals.css        # Design tokens + tema Tailwind
│   │   ├── login/page.js      # Tela de login
│   │   ├── cadastro/page.js   # Tela de cadastro de usuário
│   │   ├── estadios/page.js   # Tela de estádios (accordion)
│   │   ├── mapa-assentos/page.js  # Mapa interativo de assentos
│   │   ├── meu-painel/page.js     # Painel do torcedor
│   │   ├── sobre/page.js         # Página institucional
│   │   └── api/auth/
│   │       ├── [...nextauth]/route.js  # Configuração NextAuth
│   │       └── register/route.js       # API de registro
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Header.js          # Barra de navegação principal
│   │   ├── Sidebar.js         # Menu lateral responsivo
│   │   ├── Providers.js       # SessionProvider (NextAuth)
│   │   ├── MatchesClient.js   # Cards de jogos com filtros
│   │   └── StadiumsClient.js  # Lista de estádios (accordion)
│   └── lib/
│       └── prisma.js          # Singleton do Prisma Client
├── public/                    # Arquivos estáticos
├── requisitos/                # Documentação de requisitos e diagramas UML
├── Padrões Adotados/          # Regras de verificação e relatórios
├── package.json               # Dependências e scripts
├── next.config.mjs            # Configuração do Next.js
├── eslint.config.mjs          # Configuração do ESLint
├── postcss.config.mjs         # Configuração do PostCSS (Tailwind)
├── CHANGELOG.md               # Histórico de versões
├── DOCUMENTACAO_TECNICA.md    # Documentação técnica completa
└── README.md                  # Este arquivo
```

---

## 5. PRINCIPAIS FUNCIONALIDADES DO SISTEMA

### Autenticação
- **[RF001]** Realizar Login — Login obrigatório para acessar funcionalidades protegidas.

### Estádio (CRUD — 1 tabela)
- **[RF002]** Cadastrar Estádio — Registra um novo estádio com nome, cidade e capacidade.
- **[RF003]** Consultar Estádios — Lista todos os estádios com filtro por nome ou cidade.
- **[RF004]** Alterar Estádio — Edita as informações de um estádio existente.
- **[RF005]** Excluir Estádio — Remove um estádio sem jogos vinculados.

### Jogo (CRUD — 2 tabelas: `jogos` + `estadios`)
- **[RF006]** Cadastrar Jogo — Cadastra uma partida com times, data/hora e estádio.
- **[RF007]** Consultar Jogos — Lista todos os jogos cadastrados (visão do Administrador).
- **[RF008]** Alterar Jogo — Edita os dados de um jogo sem reservas confirmadas.
- **[RF009]** Excluir Jogo — Remove um jogo e seus assentos (sem reservas confirmadas).

### Reserva (CRUD — 4 tabelas: `reservas` + `usuarios` + `jogos` + `assentos`)
- **[RF010]** Consultar Reservas (Admin) — Relatório consolidado de todas as reservas do sistema.
- **[RF011]** Cadastrar Usuário — Auto-cadastro de novos torcedores na plataforma.
- **[RF012]** Realizar Reserva de Ingresso — Seleção de assento e reserva de ingresso por torcedor.
- **[RF013]** Consultar Minhas Reservas — Histórico de reservas do torcedor logado.
- **[RF014]** Cancelar Reserva — Cancelamento de reserva com antecedência mínima de 48h.
- **[RF015]** Consultar Jogos Disponíveis (Torcedor) — Lista de jogos futuros com assentos disponíveis.

---

## 6. REGRAS DE USO DO GIT

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

---

## 7. BOAS PRÁTICAS DE CODIFICAÇÃO E LEGIBILIDADE

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

---

## 8. INFRAESTRUTURA DE IMPLANTAÇÃO

O sistema foi arquitetado para ser implantado na nuvem, utilizando serviços modernos e escaláveis:

- **Plataforma de Hospedagem (Frontend e Backend):**
  - **Vercel**: O sistema Next.js será publicado na Vercel, que oferece integração nativa com o GitHub (CI/CD automático a cada push na branch `main`), escalabilidade global via Edge Network e facilidade de gerenciamento de Serverless Functions (onde rodam as APIs).

- **Banco de Dados (Desenvolvimento):**
  - **SQLite (Prisma)**: Em desenvolvimento, utiliza-se um banco SQLite local (`prisma/dev.db`) para simplicidade e zero configuração.

- **Banco de Dados (Produção):**
  - **Supabase / Vercel Postgres**: Para produção, o banco relacional (PostgreSQL) seria hospedado em uma dessas plataformas, oferecendo backups automáticos, alta disponibilidade e integração direta com o Prisma ORM.

- **Fluxo de CI/CD:**
  1. O desenvolvedor abre um Pull Request para a `main`.
  2. A Vercel gera um ambiente de *Preview* automático para testes.
  3. Após aprovação (Merge), o código é automaticamente colocado em *Produção* (Deploy).

---

## 📄 Licença

Este projeto é de uso acadêmico. Consulte o arquivo [LICENSE](./LICENSE) para detalhes.
