# Design Detalhado do Software — FIFA World Cup Booking

**Projeto:** FIFA World Cup 2026 — Booking  
**Versão:** 1.0  
**Data:** Junho de 2026

---

## 1. Arquitetura Geral do Sistema

O sistema segue a arquitetura **monolítica full-stack** do Next.js 16 (App Router), onde frontend e backend coexistem no mesmo projeto.

```mermaid
graph TB
    subgraph "Navegador (Cliente)"
        CC["Client Components<br/>(React 19 + use client)"]
    end

    subgraph "Next.js 16 — App Router"
        SC["Server Components<br/>(SSR — pages)"]
        AR["API Routes<br/>(Route Handlers)"]
        MW["Middleware<br/>(Auth + Admin)"]
    end

    subgraph "Camada de Dados"
        PR["Prisma ORM 5.22"]
        DB["SQLite (dev) /<br/>PostgreSQL (prod)"]
    end

    CC -->|"fetch / signIn"| AR
    CC -->|"props (SSR)"| SC
    SC -->|"Prisma queries"| PR
    AR -->|"requireAuth / requireAdmin"| MW
    MW -->|"getServerSession"| AR
    AR -->|"Prisma queries"| PR
    PR -->|"SQL"| DB
```

### Camadas

| Camada | Responsabilidade | Exemplos |
|--------|-----------------|----------|
| **Client Components** | Interatividade, formulários, estado local, navegação | `Header`, `Sidebar`, `MatchesClient`, `StadiumsClient`, formulários de login/cadastro |
| **Server Components** | Busca de dados no servidor (SSR), renderização inicial | `page.js` (Home), `estadios/page.js` |
| **API Routes** | Endpoints REST, lógica de negócio, validações | `/api/auth/*`, `/api/stadiums/*`, `/api/reservations/*` |
| **Middleware** | Autenticação (`requireAuth`), autorização (`requireAdmin`) | `src/lib/auth.js` |
| **Prisma ORM** | Abstração do banco, queries type-safe, migrações | `src/lib/prisma.js`, `prisma/schema.prisma` |
| **Banco de Dados** | Persistência de dados | SQLite (dev) / PostgreSQL (prod) |

---

## 2. Diagrama de Componentes

```mermaid
graph TD
    subgraph "Layout Raiz (layout.js)"
        Providers["Providers (SessionProvider)"]
        Header["Header"]
        Sidebar["Sidebar"]
    end

    subgraph "Componentes UI Reutilizáveis (ui/)"
        Button["Button"]
        InputField["InputField"]
        StatCard["StatCard"]
        StatusBadge["StatusBadge"]
        SectionTitle["SectionTitle"]
        Card["Card"]
        AuthLayout["AuthLayout"]
        ConfirmModal["ConfirmModal"]
        DataTable["DataTable"]
    end

    subgraph "Páginas Públicas"
        Home["/ (Home)"]
        Login["/login"]
        Cadastro["/cadastro"]
        Estadios["/estadios"]
        MapaAssentos["/mapa-assentos"]
        MeuPainel["/meu-painel"]
        Sobre["/sobre"]
    end

    subgraph "Componentes de Dados (Client)"
        MatchesClient["MatchesClient"]
        StadiumsClient["StadiumsClient"]
        StadiumFormModal["StadiumFormModal"]
        GameFormModal["GameFormModal"]
    end

    subgraph "Páginas Admin (/admin)"
        AdminLayout["AdminLayout"]
        AdminSidebar["AdminSidebar"]
        AdminDash["/admin (Dashboard)"]
        AdminEst["/admin/estadios"]
        AdminJogos["/admin/jogos"]
        AdminRes["/admin/reservas"]
    end

    %% Dependências
    Header --> Sidebar
    Header --> Button
    Home --> MatchesClient
    MatchesClient --> Button
    Login --> AuthLayout
    Login --> InputField
    Login --> Button
    Cadastro --> AuthLayout
    Cadastro --> InputField
    Cadastro --> Button
    Estadios --> StadiumsClient
    StadiumsClient --> SectionTitle
    StadiumsClient --> StatCard
    StadiumsClient --> Card
    MapaAssentos --> Button
    MapaAssentos --> Card
    MeuPainel --> StatCard
    MeuPainel --> StatusBadge
    MeuPainel --> Card
    MeuPainel --> Button
    MeuPainel --> ConfirmModal
    Sobre --> SectionTitle
    Sobre --> StatCard
    Sobre --> Button

    AdminLayout --> AdminSidebar
    AdminEst --> DataTable
    AdminEst --> StadiumFormModal
    AdminEst --> ConfirmModal
    AdminJogos --> DataTable
    AdminJogos --> GameFormModal
    AdminJogos --> ConfirmModal
    AdminRes --> DataTable
    AdminRes --> StatCard
    AdminRes --> StatusBadge
    AdminDash --> StatCard
```

### Legenda

| Tipo | Marcação no código | Descrição |
|------|--------------------|-----------|
| **Server Component** | Sem diretiva (padrão) | Roda no servidor, pode fazer queries Prisma diretamente |
| **Client Component** | `"use client"` no topo | Roda no navegador, tem estado, eventos e hooks React |

**Server Components:** `layout.js`, `/` (Home), `/estadios`, `/admin/layout.js`, `/admin/page.js`, `/admin/estadios/page.js`, `/admin/jogos/page.js`, `/admin/reservas/page.js`  
**Client Components:** Todos os componentes em `components/` (incluindo a biblioteca UI local: `Button`, `InputField`, `Card`, `StatCard`, `StatusBadge`, `DataTable`, `ConfirmModal`), páginas de formulário (`/login`, `/cadastro`, `/mapa-assentos`, `/meu-painel`, `/sobre`).

---

## 3. Diagrama Entidade-Relacionamento

```mermaid
erDiagram
    User {
        String id PK "CUID"
        String name
        String email UK
        String password "bcrypt hash"
        String phone "nullable"
        String cpf UK "nullable"
        String role "ADMIN | FAN"
        DateTime createdAt
        DateTime updatedAt
    }

    Stadium {
        String id PK "CUID"
        String name
        String city
        String country
        Int capacity
        String image "nullable, URL"
    }

    Team {
        String id PK "CUID"
        String name
        String code UK "ex: BRA"
        String flag "nullable, URL"
        String groupId FK "nullable"
    }

    Group {
        String id PK "CUID"
        String name UK "ex: Grupo A"
    }

    Game {
        String id PK "CUID"
        DateTime date
        String phase "ex: Fase de Grupos"
        String homeTeamId FK "nullable"
        String awayTeamId FK "nullable"
        String stadiumId FK
        Float basePrice "default: 1105.0"
    }

    Reservation {
        String id PK "CUID"
        String userId FK
        String gameId FK
        String seatSector
        String seatRow
        String seatNumber
        String status "PENDING | CONFIRMED | CANCELLED"
        Float price
        DateTime createdAt
    }

    User ||--o{ Reservation : "has many"
    Game ||--o{ Reservation : "has many"
    Stadium ||--o{ Game : "hosts"
    Group ||--o{ Team : "contains"
    Team ||--o{ Game : "plays as home"
    Team ||--o{ Game : "plays as away"
```

### Constraints

- `User.email` — UNIQUE
- `User.cpf` — UNIQUE (nullable)
- `Team.code` — UNIQUE
- `Group.name` — UNIQUE
- `Reservation` — `@@unique([gameId, seatSector, seatRow, seatNumber])` — impede reserva duplicada do mesmo assento

---

## 4. Fluxo de Dados — Server Component → Client Component

```mermaid
sequenceDiagram
    participant Browser as Navegador
    participant SC as Server Component
    participant Prisma as Prisma ORM
    participant DB as SQLite/PostgreSQL
    participant CC as Client Component

    Browser->>SC: GET / (requisição da página)
    SC->>Prisma: prisma.game.findMany({ include: ... })
    Prisma->>DB: SELECT * FROM Game JOIN Team JOIN Stadium
    DB-->>Prisma: Resultados SQL
    Prisma-->>SC: Array de objetos Game
    SC->>CC: <MatchesClient games={games} />
    CC-->>Browser: HTML renderizado + hydration
    Note over Browser,CC: Interatividade (filtros, cliques) <br/> acontece no Client Component
```

---

## 5. Fluxo de Autenticação e Autorização

```mermaid
sequenceDiagram
    participant User as Usuário
    participant Login as /login (Client)
    participant NextAuth as NextAuth API
    participant Prisma as Prisma ORM
    participant DB as Banco
    participant JWT as JWT Token
    participant Admin as /admin/* (Server)

    User->>Login: Preenche e-mail + senha
    Login->>NextAuth: signIn("credentials", {email, password})
    NextAuth->>Prisma: prisma.user.findUnique({ where: { email } })
    Prisma->>DB: SELECT * FROM User WHERE email = ?
    DB-->>Prisma: User { id, name, email, password, role }
    Prisma-->>NextAuth: Objeto User
    NextAuth->>NextAuth: bcrypt.compare(password, user.password)
    alt Senha válida
        NextAuth->>JWT: Gera JWT { id, name, email, role }
        JWT-->>Login: Set-Cookie: next-auth.session-token
        Login-->>User: Redirect → /
    else Senha inválida
        NextAuth-->>Login: Error "Senha inválida"
        Login-->>User: Exibe mensagem de erro
    end

    Note over User,Admin: Acesso a rotas protegidas

    User->>Admin: GET /admin/estadios
    Admin->>NextAuth: getServerSession(authOptions)
    NextAuth->>JWT: Decodifica token
    JWT-->>NextAuth: { id, role: "ADMIN" }
    alt role === "ADMIN"
        NextAuth-->>Admin: Sessão válida
        Admin-->>User: Renderiza página Admin
    else role !== "ADMIN"
        NextAuth-->>Admin: Sessão sem permissão
        Admin-->>User: Redirect → /
    end
```

---

## 6. Fluxo de Reserva de Ingresso

```mermaid
sequenceDiagram
    participant Fan as Torcedor
    participant Home as / (Home)
    participant Mapa as /mapa-assentos
    participant API as API Routes
    participant Prisma as Prisma ORM
    participant DB as Banco
    participant Painel as /meu-painel

    Fan->>Home: Navega para Home
    Home->>Fan: Exibe lista de jogos (MatchesClient)
    Fan->>Home: Clica "Ver Ingressos" no jogo X
    Home->>Mapa: Redirect → /mapa-assentos?jogoId=xxx

    Mapa->>API: GET /api/games/xxx/seats
    API->>Prisma: Busca jogo + reservas existentes
    Prisma->>DB: SELECT reservations WHERE gameId = xxx
    DB-->>Prisma: Reservas existentes
    Prisma-->>API: Dados do jogo + mapa de assentos
    API-->>Mapa: { game, sectors: [{ seats: [...] }] }
    Mapa-->>Fan: Renderiza mapa com cores (verde/amarelo/vermelho)

    Fan->>Mapa: Clica no assento D-7 (verde = disponível)
    Mapa-->>Fan: Assento selecionado (roxo), resumo atualizado

    Fan->>Mapa: Clica "Confirmar Reserva"
    Mapa->>API: POST /api/reservations { gameId, sector, row, number }
    API->>API: requireAuth() — verifica sessão
    API->>Prisma: prisma.reservation.create(...)
    
    alt Assento disponível
        Prisma->>DB: INSERT INTO Reservation
        DB-->>Prisma: OK
        Prisma-->>API: Reserva criada
        API-->>Mapa: 201 Created
        Mapa-->>Fan: Redirect → /meu-painel (sucesso)
    else Assento já ocupado
        Prisma-->>API: Unique constraint violation
        API-->>Mapa: 409 Conflict
        Mapa-->>Fan: Erro "Assento já reservado"
    end

    Fan->>Painel: Acessa /meu-painel
    Painel->>API: GET /api/reservations
    API-->>Painel: Lista de reservas + stats
    Painel-->>Fan: Exibe reservas com StatCards e lista
```

---

## 7. Comunicação entre Componentes — Props Flow

### Páginas Públicas

| Componente Pai | Componente Filho | Props Passadas |
|----------------|-----------------|----------------|
| `layout.js` (Server) | `Providers` (Client) | `children` |
| `Providers` | `SessionProvider` | `children` |
| `layout.js` | `Header` (Client) | — (usa `useSession` internamente) |
| `Header` | `Sidebar` | `isOpen`, `onClose` |
| `/` Home (Server) | `MatchesClient` (Client) | `games` (array de Game com relações) |
| `/estadios` (Server) | `StadiumsClient` (Client) | `stadiums` (array de Stadium com games) |
| `/login` (Client) | `AuthLayout` | `title`, `subtitle`, `children` |
| `/login` | `InputField` | `label`, `icon`, `type`, `name`, `placeholder`, `required` |
| `/login` | `Button` | `variant`, `type`, `loading`, `loadingText`, `fullWidth` |

### Páginas Admin

| Componente Pai | Componente Filho | Props Passadas |
|----------------|-----------------|----------------|
| `/admin/layout.js` (Server) | `AdminSidebar` (Client) | — (usa `usePathname`) |
| `/admin/estadios` (Client) | `DataTable` | `columns`, `data`, `actions` |
| `/admin/estadios` | `StadiumFormModal` | `isOpen`, `onClose`, `stadium`, `onSuccess` |
| `/admin/estadios` | `ConfirmModal` | `isOpen`, `onClose`, `onConfirm`, `title`, `message` |

---

> **Documento gerado em Junho de 2026** — GCC188, Engenharia de Software, UFLA.
