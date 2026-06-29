# 📘 Documentação Técnica — FIFA World Cup 2026 Booking

**Projeto:** FIFA World Cup Booking  
**Disciplina:** Engenharia de Software (GCC188 — UFLA)  
**Equipe:** Maria Rita Resende, Luiz Phillip Resende, Tainara de Fátima Matias Souza  
**Data:** Junho de 2026

---

## Sumário

1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Tecnologias Utilizadas e Justificativas](#2-tecnologias-utilizadas-e-justificativas)
3. [Modelo de Dados (Prisma Schema)](#3-modelo-de-dados-prisma-schema)
4. [Componentes Criados](#4-componentes-criados)
5. [Componentes e Bibliotecas Externas Utilizados](#5-componentes-e-bibliotecas-externas-utilizados)
6. [Mapa Completo de Páginas e Rotas](#6-mapa-completo-de-páginas-e-rotas)
7. [Rotas de API (Backend)](#7-rotas-de-api-backend)
8. [Fluxo de Autenticação](#8-fluxo-de-autenticação)
9. [Design System e Paleta de Cores](#9-design-system-e-paleta-de-cores)
10. [Estrutura de Diretórios Detalhada](#10-estrutura-de-diretórios-detalhada)

---

## 1. Visão Geral da Arquitetura

O projeto adota a arquitetura **monolítica full-stack** do Next.js, onde frontend e backend coexistem no mesmo projeto. O Next.js 16 com **App Router** gerencia tanto as páginas renderizadas no servidor (Server Components) quanto as rotas de API (Route Handlers).

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVEGADOR                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React 19 (Client Components)                       │   │
│  │  • Header, Sidebar, MatchesClient, StadiumsClient   │   │
│  │  • Login, Cadastro, Mapa Assentos, Meu Painel       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP / fetch
┌─────────────────────▼───────────────────────────────────────┐
│                    NEXT.JS 16 (APP ROUTER)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Server Components (SSR)                             │   │
│  │  • page.js (Home) — busca jogos do banco             │   │
│  │  • estadios/page.js — busca estádios do banco        │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Routes (Route Handlers)                         │   │
│  │  • /api/auth/[...nextauth] — Login (NextAuth)        │   │
│  │  • /api/auth/register — Cadastro de usuário          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │ Prisma ORM
┌─────────────────────▼───────────────────────────────────────┐
│                    BANCO DE DADOS                            │
│  SQLite (prisma/dev.db)                                     │
│  6 tabelas: User, Stadium, Team, Group, Game, Reservation   │
└─────────────────────────────────────────────────────────────┘
```

### Padrões Arquiteturais Aplicados

| Padrão | Onde é aplicado |
|--------|----------------|
| **Server Components** | Páginas que buscam dados no banco (`/`, `/estadios`) são Server Components por padrão — a query roda no servidor, e o HTML é enviado pronto ao cliente. |
| **Client Components** | Páginas e componentes com interatividade (`"use client"`) como formulários, filtros e o mapa de assentos. |
| **Singleton Pattern** | O `PrismaClient` usa um singleton global (`src/lib/prisma.js`) para evitar múltiplas conexões em modo de desenvolvimento com hot-reload. |
| **Adapter Pattern** | O NextAuth utiliza o `PrismaAdapter` para abstrair as operações de persistência de sessão. |
| **Separation of Concerns** | As pages delegam a lógica de busca de dados ao servidor (Server Component) e passam os dados como `props` para Client Components que cuidam da interatividade. |

---

## 2. Tecnologias Utilizadas e Justificativas

### 2.1. Next.js 16 (App Router)

| Aspecto | Detalhe |
|---------|---------|
| **O que é** | Framework React full-stack que integra SSR, SSG, API Routes e roteamento por sistema de arquivos. |
| **Por que foi escolhido** | Permite construir frontend e backend no mesmo projeto, elimina a necessidade de um servidor separado (Express/Fastify), e oferece roteamento automático baseado na estrutura de pastas `app/`. É o framework React mais adotado pela indústria e pela Vercel. |
| **Como é utilizado** | Cada pasta dentro de `src/app/` representa uma rota. O `layout.js` define o layout raiz com Header e Providers. API Routes em `src/app/api/` servem como endpoints REST. |

### 2.2. React 19

| Aspecto | Detalhe |
|---------|---------|
| **O que é** | Biblioteca JavaScript para construção de interfaces de usuário reativas baseadas em componentes. |
| **Por que foi escolhido** | É a base do Next.js. A versão 19 traz melhorias de performance e suporte nativo a Server Components, permitindo separar a lógica de servidor e cliente de forma eficiente. |
| **Como é utilizado** | Todos os componentes de UI são escritos como componentes React funcionais. Componentes que necessitam de interatividade são marcados com a diretiva `"use client"`. |

### 2.3. JavaScript (ES6+)

| Aspecto | Detalhe |
|---------|---------|
| **O que é** | Linguagem de programação nativa da web para lógica de aplicação. |
| **Por que foi escolhido** | O projeto utiliza JavaScript puro (sem TypeScript) para simplificar o desenvolvimento acadêmico e reduzir a curva de aprendizagem da equipe, mantendo código moderno com ES6+ (arrow functions, destructuring, async/await, modules). |
| **Como é utilizado** | Utilizado em toda a base de código: componentes React, API Routes, seed do banco de dados e configurações. |

### 2.4. Tailwind CSS 4

| Aspecto | Detalhe |
|---------|---------|
| **O que é** | Framework CSS utility-first que permite estilizar componentes diretamente via classes utilitárias no HTML/JSX. |
| **Por que foi escolhido** | Acelera o desenvolvimento de UI sem necessidade de escrever arquivos CSS separados. Suporta design responsivo nativo (breakpoints `md:`, `lg:`, `xl:`), dark mode, e customização total via design tokens definidos em `@theme`. |
| **Como é utilizado** | As classes Tailwind são aplicadas diretamente nos componentes JSX. O design system personalizado é definido em `globals.css` com a diretiva `@theme`, criando variáveis como `--color-brand-primary`, `--color-bg-base`, etc. |

### 2.5. Prisma ORM 5.22

| Aspecto | Detalhe |
|---------|---------|
| **O que é** | ORM (Object-Relational Mapping) moderno para Node.js que gera um client tipado a partir de um schema declarativo. |
| **Por que foi escolhido** | Oferece schema declarativo legível (`schema.prisma`), migrações automáticas, e queries com API fluente (`findMany`, `create`, `delete`). Elimina a necessidade de escrever SQL manualmente e garante type-safety mesmo em JavaScript (via IntelliSense). |
| **Como é utilizado** | O schema em `prisma/schema.prisma` define os 6 modelos do sistema (User, Stadium, Team, Group, Game, Reservation). O Prisma Client é instanciado como singleton em `src/lib/prisma.js` e utilizado tanto nos Server Components quanto nas API Routes. |

### 2.6. SQLite

| Aspecto | Detalhe |
|---------|---------|
| **O que é** | Banco de dados relacional leve e embutido, armazenado em um único arquivo. |
| **Por que foi escolhido** | Não requer instalação de um servidor de banco de dados (como PostgreSQL ou MySQL). Ideal para desenvolvimento acadêmico: basta clonar o repositório e rodar. O arquivo `dev.db` é gerado automaticamente pelo Prisma. |
| **Como é utilizado** | Configurado via variável de ambiente `DATABASE_URL="file:./dev.db"` no arquivo `.env`. O Prisma gerencia todas as operações no arquivo SQLite de forma transparente. |

### 2.7. NextAuth.js 4.24

| Aspecto | Detalhe |
|---------|---------|
| **O que é** | Biblioteca de autenticação para Next.js que suporta múltiplos providers (Google, GitHub, Credentials, etc.). |
| **Por que foi escolhido** | Oferece solução completa de autenticação com gerenciamento de sessão (JWT), callbacks customizáveis e integração nativa com o Prisma via `PrismaAdapter`. Elimina a necessidade de implementar autenticação manualmente. |
| **Como é utilizado** | Configurado em `src/app/api/auth/[...nextauth]/route.js` com o provider `CredentialsProvider` (e-mail + senha). O `SessionProvider` envolve toda a aplicação via `Providers.js`. Sessões são gerenciadas via JWT. |

### 2.8. bcryptjs 3.0

| Aspecto | Detalhe |
|---------|---------|
| **O que é** | Biblioteca para hashing seguro de senhas usando o algoritmo bcrypt. |
| **Por que foi escolhido** | Essencial para segurança: nunca se deve armazenar senhas em texto puro. O bcrypt é o padrão da indústria para hashing de senhas, com salt automático e custo computacional configurável. |
| **Como é utilizado** | No registro (`/api/auth/register`), a senha é hasheada com `bcrypt.hash(password, 10)` antes de ser salva no banco. No login, `bcrypt.compare()` verifica a senha informada contra o hash armazenado. |

### 2.9. Lucide React 1.21

| Aspecto | Detalhe |
|---------|---------|
| **O que é** | Biblioteca de ícones SVG para React, fork do Feather Icons, com mais de 1.500 ícones. |
| **Por que foi escolhido** | Ícones leves, consistentes, com tree-shaking (importa apenas os ícones usados). Cada ícone é um componente React, facilitando a customização de tamanho e cor via props. |
| **Como é utilizado** | Ícones são importados e utilizados em toda a interface: `Menu`, `User`, `Plus` no Header; `Calendar`, `Clock`, `MapPin` nos cards de jogos; `ChevronDown`/`ChevronUp` no accordion de estádios; `Mail`, `Lock`, `Eye` nos formulários, entre outros. |

### 2.10. Google Fonts (Geist & Geist Mono)

| Aspecto | Detalhe |
|---------|---------|
| **O que é** | Fontes tipográficas modernas da Vercel, otimizadas para interfaces digitais. |
| **Por que foi escolhido** | Tipografia moderna e profissional, carregada automaticamente pelo Next.js via `next/font/google` (sem FOUT/FOIT). A Geist é uma fonte sem serifa clean, ideal para interfaces, enquanto a Geist Mono é usada para código. |
| **Como é utilizado** | Importadas e aplicadas como CSS variables (`--font-geist-sans`, `--font-geist-mono`) no `layout.js`. |

---

## 3. Modelo de Dados (Prisma Schema)

O banco de dados é definido no arquivo `prisma/schema.prisma` e contém **6 modelos** com os seguintes relacionamentos:

```
┌──────────┐       ┌──────────┐       ┌──────────┐
│  Group   │1────N │   Team   │N────N │   Game   │
│          │       │          │       │          │
│ id       │       │ id       │       │ id       │
│ name     │       │ name     │       │ date     │
│          │       │ code     │       │ phase    │
│          │       │ flag     │       │ basePrice│
│          │       │ groupId  │       │ homeTeam │
│          │       │          │       │ awayTeam │
└──────────┘       └──────────┘       │ stadium  │
                                      └─────┬────┘
                                            │N
┌──────────┐                          ┌─────┴────┐
│   User   │1────N  Reservation  N────│ Stadium  │
│          │       ┌──────────────┐   │          │
│ id       │       │ id           │   │ id       │
│ name     │       │ userId       │   │ name     │
│ email    │       │ gameId       │   │ city     │
│ password │       │ seatSector   │   │ country  │
│ phone    │       │ seatRow      │   │ capacity │
│ cpf      │       │ seatNumber   │   │ image    │
│          │       │ status       │   │          │
│          │       │ price        │   │          │
└──────────┘       └──────────────┘   └──────────┘
```

### Detalhamento dos Modelos

#### `User` — Usuário (Torcedor)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String (CUID) | Identificador único |
| `name` | String | Nome completo |
| `email` | String (unique) | E-mail (usado para login) |
| `password` | String | Hash bcrypt da senha |
| `phone` | String? | Telefone (opcional) |
| `cpf` | String? (unique) | CPF (opcional) |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Última atualização |
| `reservations` | Reservation[] | Reservas do usuário |

#### `Stadium` — Estádio
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String (CUID) | Identificador único |
| `name` | String | Nome do estádio |
| `city` | String | Cidade sede |
| `country` | String | País sede |
| `capacity` | Int | Capacidade total |
| `image` | String? | URL da imagem |
| `games` | Game[] | Jogos realizados no estádio |

#### `Team` — Seleção
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String (CUID) | Identificador único |
| `name` | String | Nome da seleção |
| `code` | String (unique) | Código FIFA (ex: BRA, ARG) |
| `flag` | String? | URL da bandeira (SVG) |
| `groupId` | String? | Grupo na fase de grupos |
| `gamesAsHome` | Game[] | Jogos como mandante |
| `gamesAsAway` | Game[] | Jogos como visitante |

#### `Group` — Grupo
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String (CUID) | Identificador único |
| `name` | String (unique) | Nome do grupo (ex: "Grupo A") |
| `teams` | Team[] | Seleções do grupo |

#### `Game` — Jogo/Partida
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String (CUID) | Identificador único |
| `date` | DateTime | Data e hora do jogo |
| `phase` | String | Fase do torneio |
| `homeTeamId` | String? | Seleção mandante (nullable para TBD) |
| `awayTeamId` | String? | Seleção visitante (nullable para TBD) |
| `stadiumId` | String | Estádio do jogo |
| `basePrice` | Float | Preço base do ingresso (R$ 1.105,00 padrão) |
| `reservations` | Reservation[] | Reservas para este jogo |

#### `Reservation` — Reserva de Ingresso
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String (CUID) | Identificador único |
| `userId` | String | Referência ao usuário |
| `gameId` | String | Referência ao jogo |
| `seatSector` | String | Setor do assento (ex: "Premium") |
| `seatRow` | String | Fileira do assento (ex: "D") |
| `seatNumber` | String | Número do assento (ex: "1") |
| `status` | String | Status: `PENDING`, `CONFIRMED`, `CANCELLED` |
| `price` | Float | Preço pago pelo ingresso |
| `createdAt` | DateTime | Data da reserva |

> **Restrição única:** `@@unique([gameId, seatSector, seatRow, seatNumber])` — Garante que o mesmo assento não pode ser reservado duas vezes para o mesmo jogo.

---

## 4. Componentes Criados

Abaixo estão descritos todos os **componentes React criados pela equipe**, localizados em `src/components/`.

---

### 4.1. `Header.js` — Barra de Navegação Principal

**Tipo:** Client Component (`"use client"`)  
**Arquivo:** `src/components/Header.js`

| Aspecto | Detalhe |
|---------|---------|
| **Responsabilidade** | Barra superior sticky que contém a marca (logo), links de navegação e botões de ação (Login/Cadastro). |
| **Estado local** | `isSidebarOpen` — controla a abertura/fechamento do menu lateral. |
| **Dependências** | `next/link`, `lucide-react` (Menu, User, Plus), `Sidebar.js` |

**Estrutura visual:**
- Logo "FIFA WC BOOKING" com link para a Home
- Menu hamburger (abre a Sidebar)
- Navegação desktop: Jogos, Estádios, Sobre
- Botões: "Entrar" (link para `/login`) e "Criar Conta" (link para `/cadastro`)

**Comportamento responsivo:** A navegação central é visível apenas em telas `md:` (768px+). Em telas menores, o acesso é pelo menu hamburger (Sidebar).

---

### 4.2. `Sidebar.js` — Menu Lateral Responsivo

**Tipo:** Client Component (`"use client"`)  
**Arquivo:** `src/components/Sidebar.js`

| Aspecto | Detalhe |
|---------|---------|
| **Responsabilidade** | Drawer lateral com navegação completa, dividida em seções "Principal" e "Torcedor", com transições suaves. |
| **Props** | `isOpen` (boolean), `onClose` (function) |
| **Dependências** | `next/link`, `next/navigation` (usePathname), `lucide-react` (X, Trophy, Home, CalendarDays, MapPin, Info, LogIn, Armchair, Ticket, Circle) |

**Seções de navegação:**
- **Principal:** Início (`/`), Jogos (`/jogos`), Estádios (`/estadios`), Sobre (`/sobre`)
- **Torcedor:** Login / Conta (`/login`), Mapa Assentos (`/mapa-assentos`), Meu Painel (`/meu-painel`)

**Comportamento:**
- Overlay escuro (`bg-black/60`) aparece ao abrir e fecha a sidebar ao clicar fora.
- Animação de slide lateral com `transform transition-transform duration-300`.
- Links ativos são destacados com fundo e borda roxos (`brand-primary`).
- Card informativo fixo no rodapé: "Copa 2026 — EUA · Canadá · México — Jun — Jul 2026".

---

### 4.3. `Providers.js` — Wrapper de Contexto (SessionProvider)

**Tipo:** Client Component (`"use client"`)  
**Arquivo:** `src/components/Providers.js`

| Aspecto | Detalhe |
|---------|---------|
| **Responsabilidade** | Envelopa a aplicação inteira com o `SessionProvider` do NextAuth, disponibilizando o contexto de sessão (autenticação) para todos os componentes filhos. |
| **Props** | `children` (ReactNode) |
| **Dependências** | `next-auth/react` (SessionProvider) |

**Por que é necessário:** O `SessionProvider` é um Client Component, mas o `layout.js` do Next.js é um Server Component. Por isso, é necessário extrair o Provider para um componente separado marcado com `"use client"`.

---

### 4.4. `MatchesClient.js` — Grid de Cards de Jogos

**Tipo:** Client Component (`"use client"`)  
**Arquivo:** `src/components/MatchesClient.js`

| Aspecto | Detalhe |
|---------|---------|
| **Responsabilidade** | Exibe os jogos em cards com sistema de filtros por grupo/fase, mostrando informações completas de cada partida. |
| **Props** | `games` (array de objetos Game com relações homeTeam, awayTeam, stadium) |
| **Estado local** | `activeTab` — filtro ativo (Todos, Grupo A, Grupo B, etc.) |
| **Dependências** | `next/link`, `next/image`, `lucide-react` (Calendar, Clock, MapPin) |

**Funcionalidades:**
- **Filtros por abas:** Todos, Grupo A–F, Oitavas, Quartas (tabs horizontais com scroll)
- **Cards de jogo** contendo:
  - Badge do grupo e fase
  - Bandeiras das seleções (via `next/image` com domínio `flagcdn.com`)
  - Data e hora formatados em pt-BR
  - Nome do estádio
  - Preço base do ingresso
  - Botão "Ver Ingressos" → link para `/mapa-assentos?jogoId={id}`
- **Contagem dinâmica:** "X jogos encontrados" atualiza com o filtro
- **Grid responsivo:** 1 coluna (mobile) → 2 (md) → 3 (lg) → 4 (xl) → 5 (2xl)

---

### 4.5. `StadiumsClient.js` — Lista de Estádios (Accordion)

**Tipo:** Client Component (`"use client"`)  
**Arquivo:** `src/components/StadiumsClient.js`

| Aspecto | Detalhe |
|---------|---------|
| **Responsabilidade** | Exibe a lista de estádios da Copa em formato accordion, com cards de estatísticas e detalhes expandíveis. |
| **Props** | `stadiums` (array de objetos Stadium com relação `games → homeTeam, awayTeam`) |
| **Estado local** | `expandedId` — ID do estádio com o accordion aberto (inicia com o primeiro estádio) |
| **Dependências** | `next/image`, `lucide-react` (ChevronDown, ChevronUp, MapPin, Users, CalendarDays, Calendar) |

**Funcionalidades:**
- **Cards de estatísticas:** Total de estádios, capacidade total, países sede
- **Accordion expandível:** Cada estádio tem header com miniatura, nome, país, cidade, capacidade e contagem de jogos
- **Corpo expandido:** Imagem grande do estádio, grid de informações detalhadas, lista de jogos no estádio
- **Interação:** Apenas um estádio é expandido por vez (clique alterna)

### 4.6. Biblioteca de UI Local (`src/components/ui/`)

Uma biblioteca de componentes reutilizáveis foi construída para manter a consistência visual em todo o projeto.
- **`Button.js`**: Botão padrão do sistema com suporte a `variant` (primary, secondary, danger, ghost), `size` (sm, md, lg), estado de loading e ícones.
- **`Card.js`**: Container padronizado (`bg-[#151a23] border-white/5 rounded-2xl`) com suporte a padding configurável e efeito hover.
- **`InputField.js`**: Campo de input com label em uppercase, suporte a ícone esquerdo, elemento direito (ex: botão olho) e exibição de erros de validação.
- **`StatCard.js`**: Card simplificado para exibição de KPIs (ex: total de usuários, receita), contendo ícone, label e valor destacado.
- **`StatusBadge.js`**: Badge pequeno e colorido para indicar status de reservas (`CONFIRMED`, `PENDING`, `CANCELLED`).
- **`DataTable.js`**: Tabela de dados responsiva para o painel admin, aceita colunas configuráveis, estado de loading (esqueleto) e render customizado das células.
- **`ConfirmModal.js`**: Modal de confirmação reutilizável para ações destrutivas (ex: "Tem certeza que deseja excluir?"), com overlay escuro e suporte a foco preso (trap).

### 4.7. Modais de Formulário (`src/components/`)
- **`StadiumFormModal.js`**: Modal com formulário para criar ou editar estádios (Admin).
- **`GameFormModal.js`**: Modal com formulário para criar ou editar jogos (Admin).


## 5. Componentes e Bibliotecas Externas Utilizados

Além dos componentes criados pela equipe, o projeto utiliza os seguintes componentes e APIs de bibliotecas externas:

### Componentes do Next.js

| Componente | Import | Uso |
|------------|--------|-----|
| `Link` | `next/link` | Navegação client-side sem reload completo da página. Usado em todos os componentes de navegação (Header, Sidebar, cards de jogos). |
| `Image` | `next/image` | Renderização otimizada de imagens com lazy loading, redimensionamento e formatos modernos (WebP). Usado para bandeiras das seleções, fotos dos estádios e imagens de fundo. |
| `Geist`, `Geist_Mono` | `next/font/google` | Carregamento otimizado das fontes Geist (sem FOUT). Aplicadas como CSS variables no layout raiz. |

### Hooks do Next.js

| Hook | Import | Uso |
|------|--------|-----|
| `useRouter` | `next/navigation` | Navegação programática (ex: redirecionamento após login bem-sucedido ou registro). |
| `usePathname` | `next/navigation` | Detecção da rota atual para highlight do link ativo na Sidebar. |

### Hooks do React

| Hook | Uso |
|------|-----|
| `useState` | Gerenciamento de estado local em todos os Client Components: filtro de abas (MatchesClient), accordion expandido (StadiumsClient), campos de formulário (Login, Cadastro), assento selecionado (Mapa Assentos), sidebar aberta (Header). |

### APIs do NextAuth

| API | Import | Uso |
|-----|--------|-----|
| `signIn` | `next-auth/react` | Dispara o fluxo de login com as credenciais do formulário. |
| `SessionProvider` | `next-auth/react` | Context Provider que disponibiliza a sessão para toda a árvore de componentes. |
| `NextAuth` | `next-auth` | Cria o Route Handler que gerencia login, logout e callbacks. |
| `CredentialsProvider` | `next-auth/providers/credentials` | Provedor de autenticação por e-mail/senha customizado. |
| `PrismaAdapter` | `@auth/prisma-adapter` | Adaptador para persistir sessões e dados de autenticação via Prisma. |

### APIs do Prisma

| API | Uso |
|-----|-----|
| `prisma.game.findMany()` | Busca todos os jogos com relações (homeTeam, awayTeam, stadium) para a Home. |
| `prisma.stadium.findMany()` | Busca todos os estádios com jogos relacionados para a página de Estádios. |
| `prisma.user.findUnique()` | Busca usuário por e-mail durante login e verificação de duplicidade no registro. |
| `prisma.user.create()` | Cria novo usuário no banco durante o registro. |

---

## 6. Mapa Completo de Páginas e Rotas

### 6.1. `/` — Página Inicial (Home)

| Aspecto | Detalhe |
|---------|---------|
| **Arquivo** | `src/app/page.js` |
| **Tipo** | Server Component (async) |
| **Rota** | `/` |
| **Componentes usados** | `MatchesClient` |
| **Dados** | Busca jogos do banco via Prisma (`prisma.game.findMany`) com `include` de `homeTeam`, `awayTeam`, `stadium` |

**Seções:**
1. **Hero Section** — Banner principal com gradientes, badge "Ingressos disponíveis agora", título estilizado "FIFA WORLD CUP 2026", descrição e estatísticas (104 jogos, 48 seleções, 16 estádios). Elemento decorativo com blur esverdeado de fundo.
2. **Próximos Jogos** — Seção delegada ao `MatchesClient` com filtros por grupo/fase e grid de cards de jogos.

---

### 6.2. `/login` — Tela de Login

| Aspecto | Detalhe |
|---------|---------|
| **Arquivo** | `src/app/login/page.js` |
| **Tipo** | Client Component (`"use client"`) |
| **Rota** | `/login` |
| **Componentes usados** | `lucide-react` (Mail, Lock, Eye), `next/link` |
| **Autenticação** | `signIn("credentials", ...)` do NextAuth |

**Funcionalidades:**
- Formulário com campos de e-mail e senha (com ícones inline)
- Botão de visualização de senha (ícone Eye)
- Link "Esqueci minha senha" (placeholder)
- Feedback visual de erro e estado de loading ("Entrando...")
- Redirecionamento para `/` após login bem-sucedido
- Link para cadastro: "Não tem conta? Criar conta grátis"

**Design:** Background com imagem do Unsplash em overlay, glassmorphism no card do formulário (`backdrop-blur-xl`), gradiente vertical de fade.

---

### 6.3. `/cadastro` — Tela de Cadastro de Usuário

| Aspecto | Detalhe |
|---------|---------|
| **Arquivo** | `src/app/cadastro/page.js` |
| **Tipo** | Client Component (`"use client"`) |
| **Rota** | `/cadastro` |
| **Componentes usados** | `lucide-react` (ArrowLeft, User, Mail, Phone, Lock, Eye, Circle, CheckCircle2), `next/link` |
| **API chamada** | `POST /api/auth/register` |

**Campos do formulário:**
- Nome completo (obrigatório)
- E-mail (obrigatório)
- Telefone (obrigatório)
- Senha (obrigatório, mín. 6 caracteres)
- Confirmação de senha (obrigatório)
- Checkbox de Termos de Uso (obrigatório)

**Validações client-side:**
- Senhas devem coincidir
- Termos de uso devem ser aceitos
- Campos obrigatórios (atributo HTML `required`)

**Fluxo:** Após cadastro bem-sucedido → redireciona para `/login?registered=true`.

---

### 6.4. `/estadios` — Estádios da Copa 2026

| Aspecto | Detalhe |
|---------|---------|
| **Arquivo** | `src/app/estadios/page.js` |
| **Tipo** | Server Component (async) |
| **Rota** | `/estadios` |
| **Componentes usados** | `StadiumsClient` |
| **Dados** | Busca estádios via Prisma com `include` de jogos (+ homeTeam, awayTeam), ordenados por capacidade decrescente |

**Seções renderizadas pelo `StadiumsClient`:**
1. **Header da página** — Título "ESTÁDIOS DA COPA 2026" com barra lateral roxa e subtítulo com contagem.
2. **Cards de estatísticas** — 3 cards: total de estádios, capacidade total, países sede.
3. **Lista accordion** — Cada estádio com:
   - Header colapsado: miniatura, nome, país (badge), cidade, capacidade, contagem de jogos
   - Corpo expandido: imagem grande, grid de detalhes (capacidade, país, cidade, jogos recebidos), lista de jogos no estádio (phase, times, data, preço)

---

### 6.5. `/mapa-assentos` — Mapa Interativo de Assentos

| Aspecto | Detalhe |
|---------|---------|
| **Arquivo** | `src/app/mapa-assentos/page.js` |
| **Tipo** | Client Component (`"use client"`) |
| **Rota** | `/mapa-assentos` (aceita `?jogoId=` como query param) |
| **Componentes usados** | `lucide-react` (ChevronDown, Calendar, MapPin), `next/link` |

**Layout:**
- **Área superior:** Informações do jogo selecionado (Brasil vs Argentina, data, estádio) com botão dropdown para trocar jogo.
- **Área esquerda — Mapa de assentos:**
  - Badge do setor ativo (Setor B — Premium, R$ 1.105)
  - Legenda com 4 estados: Disponível (verde), Reservado (amarelo), Vendido (vermelho escuro), Selecionado (roxo)
  - Indicador visual "CAMPO" com ícone
  - Grid 4×12 de assentos (fileiras D–G, colunas 1–12) com cores dinâmicas baseadas no status
- **Área direita — Resumo:**
  - Card com nome do jogo, data e estádio
  - Se um assento está selecionado: exibe setor, fileira, número e preço
  - Botão "Confirmar Reserva" (ativo se há assento selecionado, desabilitado caso contrário)
  - Link "Ver todos os jogos"

**Interação dos assentos:**
- Assentos disponíveis (verde) são clicáveis e mudam para roxo (selecionado)
- Assentos reservados (amarelo) e vendidos (vermelho) não são clicáveis
- Clicar novamente em um assento selecionado o desmarca
- Hover em assentos disponíveis aplica `scale-110` (micro-animação)

---

### 6.6. `/meu-painel` — Painel do Torcedor

| Aspecto | Detalhe |
|---------|---------|
| **Arquivo** | `src/app/meu-painel/page.js` |
| **Tipo** | Client Component (`"use client"`) |
| **Rota** | `/meu-painel` |
| **Componentes usados** | `lucide-react` (Ticket, CheckCircle2, Clock, Receipt, Eye, X), `next/link` |

**Seções:**
1. **Cabeçalho** — Saudação "Olá, João Silva — Copa do Mundo 2026" + link "Comprar Ingresso"
2. **Cards de estatísticas** — 4 cards:
   - Total de reservas (4)
   - Confirmadas (2) — verde
   - Pendentes (1) — laranja
   - Valor investido (R$ 3.650) — lilás
3. **Lista "Minhas Reservas"** — Cards com:
   - Ícones das bandeiras (placeholders coloridos)
   - Nome do jogo (Time1 vs Time2)
   - Detalhes: data, hora, categoria, assento
   - Preço e ID da reserva
   - Badge de status com ícone e cor (Confirmado/verde, Pendente/laranja, Cancelado/vermelho)
   - Botões de ação: "Ver" (ciano) e "Cancelar" (vermelho, oculto para cancelados)

> **Nota:** O dashboard do torcedor se integra dinamicamente com o backend usando o Prisma via Server Component para carregar dados reais e exibi-los no Client Component.

---

### 6.7. `/sobre` — Página Institucional (Sobre)

| Aspecto | Detalhe |
|---------|---------|
| **Arquivo** | `src/app/sobre/page.js` |
| **Tipo** | Client Component (`"use client"`) |
| **Rota** | `/sobre` |
| **Componentes usados** | `lucide-react` (Ticket, MapPin, ShieldCheck, Zap, Globe), `next/image` |

**Seções:**
1. **Hero** — Imagem de fundo (Unsplash, campo de futebol) com overlay, badge "FIFA World Cup 2026", título "SOBRE O FIFA WC BOOKING", descrição institucional.
2. **Sobre a Plataforma** — Texto explicativo em duas colunas:
   - Coluna esquerda: 3 parágrafos descritivos
   - Coluna direita: 4 feature cards (Compra Segura, Mapa de Assentos, Anti-fraude, Rápido e Seguro)
3. **Copa do Mundo FIFA 2026** — 4 cards de estatísticas (48 seleções, 104 jogos, 16 estádios, 5M+ torcedores)
4. **Call to Action** — Card gradiente com convite "Pronto para viver a Copa?" e botões "Criar Conta Grátis" e "Ver Jogos"

---

### 6.8. Árvore de Páginas Administrativas (`/admin/*`)

Todas as páginas sob a rota `/admin` utilizam um **Layout customizado** (`src/app/admin/layout.js`) e são protegidas pela função utilitária `requireAdmin()` (Server-Side) presente em `src/lib/auth.js`. O layout injeta o menu lateral exclusivo de administradores (`AdminSidebar`).

#### `/admin` — Dashboard
- Visão geral com cartões de estatísticas (Total de Estádios, Jogos Agendados, Ingressos Vendidos, Receita Total).
- Listagem dos "Próximos Jogos" e "Reservas Recentes".

#### `/admin/estadios` — Gestão de Estádios
- Tabela interativa listando os estádios (Nome, Local, Capacidade, Ações).
- Integração com `StadiumFormModal` para criar e atualizar.
- Chamadas para API `/api/stadiums`.

#### `/admin/jogos` — Gestão de Jogos
- Tabela de jogos (Confronto, Data, Estádio, Fase, Ações).
- Regra de negócio que impede exclusão se houver reservas confirmadas.
- Integração com `GameFormModal` para criação e edição.

#### `/admin/reservas` — Gestão de Reservas
- Tabela com listagem consolidada de todas as reservas do sistema.
- Ações para confirmar reservas manuais, cancelar, ou apagar os registros do banco de dados para liberar os assentos.

---

## 7. Rotas de API (Backend)

### 7.1. `POST /api/auth/register` — Cadastro de Novo Usuário

| Aspecto | Detalhe |
|---------|---------|
| **Arquivo** | `src/app/api/auth/register/route.js` |
| **Método HTTP** | POST |
| **Content-Type** | `application/json` |

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123",
  "phone": "11999999999",
  "cpf": "12345678901"
}
```

**Respostas:**
| Status | Descrição |
|--------|-----------|
| `201 Created` | Usuário criado com sucesso. Retorna `{ message, user: { id, email } }`. |
| `400 Bad Request` | Campos obrigatórios ausentes ou e-mail já em uso. |
| `500 Internal Server Error` | Erro inesperado no servidor. |

**Lógica:**
1. Valida campos obrigatórios (`name`, `email`, `password`)
2. Verifica se o e-mail já está cadastrado (`prisma.user.findUnique`)
3. Gera hash bcrypt da senha (`bcrypt.hash(password, 10)`)
4. Cria o usuário no banco (`prisma.user.create`)

---

### 7.2. `GET/POST /api/auth/[...nextauth]` — Autenticação NextAuth

| Aspecto | Detalhe |
|---------|---------|
| **Arquivo** | `src/app/api/auth/[...nextauth]/route.js` |
| **Métodos HTTP** | GET, POST (catch-all) |

**Configurações do NextAuth (`authOptions`):**

| Configuração | Valor |
|--------------|-------|
| **Adapter** | `PrismaAdapter(prisma)` |
| **Session Strategy** | JWT |
| **Custom Sign-in Page** | `/login` |
| **Provider** | `CredentialsProvider` (e-mail + senha) |
| **Secret** | `process.env.NEXTAUTH_SECRET` ou fallback de desenvolvimento |

**Fluxo de autenticação:**
1. O formulário de login envia `email` e `password` via `signIn("credentials", ...)`
2. O `authorize` busca o usuário no banco por e-mail
3. Compara a senha informada com o hash armazenado (`bcrypt.compare`)
4. Se válido, retorna `{ id, name, email }` — o NextAuth gera um JWT
5. O callback `jwt` injeta o `user.id` no token
6. O callback `session` expõe o `token.id` na sessão

---

## 8. Fluxo de Autenticação

```
┌─────────────┐     ┌─────────────────┐     ┌──────────────────────┐
│  /cadastro  │     │     /login      │     │  Páginas protegidas  │
│  (Register) │     │   (Sign In)     │     │  (/meu-painel, etc)  │
└──────┬──────┘     └────────┬────────┘     └──────────┬───────────┘
       │                     │                         │
       │ POST                │ signIn()                │ useSession()
       │ /api/auth/register  │ credentials             │
       │                     │                         │
       ▼                     ▼                         ▼
┌──────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Cria user   │     │  NextAuth        │     │  SessionProvider │
│  no banco    │     │  authorize()     │     │  verifica JWT    │
│  (bcrypt     │     │  → findUnique    │     │  → user logado?  │
│   hash)      │     │  → bcrypt.compare│     │                  │
└──────┬───────┘     └────────┬─────────┘     └──────────────────┘
       │                     │
       │ 201 Created         │ JWT Token
       │                     │ (cookie)
       ▼                     ▼
  Redirect →            Redirect →
  /login               /  (Home)
```

---

## 9. Design System e Paleta de Cores

O design system é definido em `src/app/globals.css` usando a diretiva `@theme` do Tailwind CSS 4:

### Paleta de Cores

| Token | Valor | Uso | Amostra |
|-------|-------|-----|---------|
| `--color-brand-primary` | `#7c3aed` | Roxo principal — botões primários, destaques, CTAs | 🟣 |
| `--color-brand-primary-hover` | `#6d28d9` | Hover do roxo principal | 🟣 |
| `--color-brand-secondary` | `#10b981` | Verde/Sucesso — badges, preços, indicadores positivos | 🟢 |
| `--color-bg-base` | `#0b0e14` | Fundo geral da aplicação (dark mode) | ⬛ |
| `--color-bg-sidebar` | `#0f131a` | Fundo da sidebar | ⬛ |
| `--color-bg-card` | `#151a23` | Fundo de cards, inputs e seções | ⬛ |
| `--color-text-primary` | `#f8fafc` | Texto principal (branco quase puro) | ⬜ |
| `--color-text-secondary` | `#94a3b8` | Texto secundário (cinza) | 🔘 |
| `--color-border-subtle` | `#1e293b` | Bordas sutis | 🔘 |

### Cores Complementares (usadas inline)

| Cor | Valor | Uso |
|-----|-------|-----|
| Ciano | `text-cyan-400` | Destaques numéricos, textos especiais, logo "BOOKING" |
| Amarelo | `#f59e0b` | Status "Reservado" no mapa de assentos |
| Vermelho | `#991b1b` | Status "Vendido" no mapa de assentos |
| Verde (assentos) | `#3fe971` | Status "Disponível" no mapa de assentos |
| Lilás | `#d6b4e7` | Placeholders de bandeiras, valor investido |
| Laranja | `text-orange-500` | Status "Pendente" nas reservas |

### Tipografia

| Fonte | Variável CSS | Uso |
|-------|-------------|-----|
| **Geist** (sans-serif) | `--font-geist-sans` | Fonte principal para textos e títulos |
| **Geist Mono** (monospace) | `--font-geist-mono` | Código e dados técnicos |

### Padrões de Design

| Padrão | Descrição |
|--------|-----------|
| **Dark Mode** | Tema escuro como padrão (classe `dark` no `<html>`). |
| **Glassmorphism** | Card de login/cadastro com `backdrop-blur-xl` e `bg-card-bg/80`. |
| **Gradientes** | Hero da Home com gradiente horizontal `from-bg-base via-[#0f171e] to-[#162521]`. |
| **Micro-animações** | Hover em assentos (`scale-110`), transições de cor (`transition-colors`), slide da sidebar (`transition-transform duration-300`). |
| **Responsividade** | Breakpoints Tailwind: `md:` (768px), `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px). |

---

## 10. Estrutura de Diretórios Detalhada

```
fifa-world-cup-booking/
│
├── .env                           # Variável DATABASE_URL para o Prisma
├── .gitignore                     # Arquivos ignorados pelo Git
├── CHANGELOG.md                   # Histórico de versões do projeto
├── LICENSE                        # Licença do projeto
├── README.md                      # Documentação principal do repositório
├── DOCUMENTACAO_TECNICA.md        # Este documento
├── package.json                   # Scripts npm e dependências
├── package-lock.json              # Lock das dependências (versionamento exato)
├── next.config.mjs                # Config do Next.js (domínios de imagens)
├── eslint.config.mjs              # Config do ESLint (regras de lint)
├── postcss.config.mjs             # Config do PostCSS (plugin Tailwind)
├── jsconfig.json                  # Aliases de importação (@ → src/)
├── dev.db                         # Banco SQLite (cópia na raiz)
│
├── prisma/
│   ├── schema.prisma              # Definição dos 6 modelos do banco
│   ├── seed.js                    # Script de população com dados iniciais
│   └── dev.db                     # Banco SQLite gerado pelo Prisma
│
├── database/
│   └── 01_create_tables.sql       # Script SQL de referência (PostgreSQL)
│
├── requisitos/
│   ├── Documento de Requisitos.md # Especificação detalhada (RF + NF)
│   ├── Diagrama_UseCase_Administrador.png  # Diagrama UML - Admin
│   ├── Diagrama_UseCase_Torcedor.png       # Diagrama UML - Torcedor
│   └── Protótipo de Engenharia de Software.pdf  # Protótipos de alta fidelidade
│
├── Padrões Adotados/
│   ├── Regras_Verificacao_Analise_Requisitos.md  # Regras de V&V
│   └── Relatorio_Avaliacao_Sprint1.md             # Relatório da Sprint 1
│
├── public/                        # Assets estáticos (favicon, imagens)
│
└── src/
    ├── app/
    │   ├── layout.js              # Layout raiz: <html>, <body>, Header, Providers
    │   ├── page.js                # Home: Hero + MatchesClient (Server Component)
    │   ├── globals.css            # Design tokens Tailwind (@theme) + reset
    │   ├── favicon.ico            # Ícone do site
    │   │
    │   ├── login/
    │   │   └── page.js            # Formulário de login (Client Component)
    │   │
    │   ├── cadastro/
    │   │   └── page.js            # Formulário de cadastro (Client Component)
    │   │
    │   ├── estadios/
    │   │   └── page.js            # Lista de estádios (Server → StadiumsClient)
    │   │
    │   ├── mapa-assentos/
    │   │   └── page.js            # Mapa de assentos interativo (Client Component)
    │   │
    │   ├── meu-painel/
    │   │   └── page.js            # Painel do torcedor com reservas (Client Component)
    │   │
    │   ├── sobre/
    │   │   └── page.js            # Página institucional (Client Component)
    │   │
    │   └── api/
    │       └── auth/
    │           ├── [...nextauth]/
    │           │   └── route.js   # Configuração e handler do NextAuth
    │           └── register/
    │               └── route.js   # API de registro de novo usuário
    │
    ├── components/
    │   ├── Header.js              # Barra de navegação superior (Client)
    │   ├── Sidebar.js             # Menu lateral responsivo (Client)
    │   ├── Providers.js           # SessionProvider wrapper (Client)
    │   ├── MatchesClient.js       # Grid de jogos com filtros (Client)
    │   └── StadiumsClient.js      # Accordion de estádios (Client)
    │
    └── lib/
        └── prisma.js              # Singleton do PrismaClient
```

---

> **Documento gerado em Junho de 2026** para fins acadêmicos na disciplina GCC188 — Engenharia de Software (UFLA).
