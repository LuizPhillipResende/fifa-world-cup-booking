# fifa-world-cup-booking

Projeto acadêmico para a disciplina de Engenharia de Software (UFLA - GCC188). Plataforma full-stack construída com React, JavaScript e Node.js para simular o processo de reserva e venda de ingressos para copa do mundo da FIFA 2026.

## 1. Contexto do Problema e Solução

**O Problema:** A venda de ingressos para eventos de grande porte, como a Copa do Mundo, enfrenta desafios críticos de alta concorrência. O sistema precisa garantir que o mesmo assento não seja vendido para múltiplos usuários simultaneamente, mantendo a integridade dos dados sob alta carga.

**A Solução:** Uma aplicação web escalável que permite aos usuários visualizar partidas, escolher assentos em tempo real e realizar a reserva. O sistema gerencia o fluxo de checkout, integrando lógica de backend (Node.js) para garantir a atomicidade das transações e uma interface responsiva (React) que fornece feedback imediato ao usuário.

## 2. Instruções para Uso

Para utilizar o sistema como usuário final (cliente):

1. Acesse o sistema através do seu navegador web.
2. Na página inicial, visualize a lista de partidas disponíveis.
3. Selecione a partida desejada para ver o mapa de assentos do estádio.
4. Clique nos assentos desejados (assentos em cinza ou vermelho já estão ocupados).
5. Clique em "Reservar" e preencha seus dados para finalizar a compra.
6. Uma confirmação será exibida na tela.

*(Nota: Como o sistema está em desenvolvimento, as instruções exatas de acesso à URL de produção serão adicionadas aqui futuramente).*

## 3. Instruções para DEVs

Siga as instruções abaixo para preparar seu ambiente e ser um DEV do projeto:

### 3.1 - Clone o projeto

Na sua máquina, aplique o seguinte comando no terminal:
```bash
git clone <URL_DO_SEU_REPOSITORIO>
```
*(Você também pode baixar o ZIP do projeto e descompactá-lo).*

### 3.2 - Instalação de dependências

Para o Frontend (React):
```bash
cd fifa-world-cup-booking/frontend
npm install
```

Para o Backend (Node.js):
```bash
cd fifa-world-cup-booking/backend
npm install
```

### 3.3 - Execução do projeto

Para iniciar o servidor Backend:
```bash
cd fifa-world-cup-booking/backend
npm start
```
O servidor rodará na porta 3000 (ou a porta configurada no `.env`).

Para iniciar o Frontend:
```bash
cd fifa-world-cup-booking/frontend
npm start
```
Em seguida, acesse o browser e digite a URL `http://localhost:3000` (ou a porta que o React alocar). Você deverá ver o sistema no seu browser.

## 4. Tecnologias

- **Frontend:**
  - React (versão 18.x.x)
  - JavaScript (ES6+)
  - HTML5 / CSS3
- **Backend:**
  - Node.js (versão 20.x.x)
  - Express.js (versão 4.x.x)
- **Banco de Dados:**
  - PostgreSQL (versão 15.x.x)
- **Outras:**
  - Git (Controle de Versão)
  - VSCode (IDE recomendada)

## 5. Organização do Projeto

Este projeto está organizado nas pastas descritas abaixo com as seguintes finalidades:

### Estrutura de Pastas

*   **`frontend/`**: Contém o código-fonte da aplicação React (Interface do Usuário).
    *   **`src/components/`**: Componentes reutilizáveis da interface do usuário (ex: botão de assento).
    *   **`src/pages/`**: Páginas principais da aplicação.
    *   **`public/`**: Arquivos estáticos e o `index.html`.
*   **`backend/`**: Contém o código-fonte da API Node.js.
    *   **`src/controllers/`**: Lógica de negócio e controle das rotas.
    *   **`src/models/`**: Definições das estruturas de dados e interação com o Banco de Dados.
    *   **`src/routes/`**: Definição dos endpoints da API.
*   **`docs/`**: Documentação do projeto, incluindo requisitos e modelagem.
    *   **`Padrões Adotados/`**: Documentos com padrões de projeto, como as regras de requisitos.
*   **`database/`**: Scripts de criação e população inicial do banco de dados relacional.