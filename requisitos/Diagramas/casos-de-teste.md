# Casos de Teste de Validação

Este documento descreve os casos de teste planejados (TV001 a TV005) focados na validação dos fluxos principais e alternativos exigidos pelos Requisitos Funcionais do sistema.

## RF001 - Realizar Login

| ID | Nome | Pré-condição | Passos | Resultado Esperado | Status |
|---|---|---|---|---|---|
| **TV001** | Fluxo Principal (Válido) | Usuário possui conta com email `joao@example.com` e senha `senha123`. | 1. Acessar `/login`<br>2. Preencher "joao@example.com" no e-mail<br>3. Preencher "senha123" na senha<br>4. Clicar em "Entrar" | O sistema autentica o usuário, cria a sessão de cookie HTTP-Only e o redireciona para a tela inicial ou painel com os controles desbloqueados. | ✅ Aprovado |
| **TV002** | Fluxo Alternativo (Inválido) | Usuário possui conta válida, mas erra a senha. | 1. Acessar `/login`<br>2. Preencher "joao@example.com"<br>3. Preencher "senha_errada"<br>4. Clicar em "Entrar" | O sistema barra a entrada (HTTP 401), não cria sessão e exibe a mensagem de erro "Senha inválida." na interface (Toast vermelho). | ✅ Aprovado |

---

## RF012 - Realizar Reserva de Ingresso

| ID | Nome | Pré-condição | Passos | Resultado Esperado | Status |
|---|---|---|---|---|---|
| **TV003** | Fluxo Principal (Assento Disponível) | Usuário `joao@example.com` logado. Jogo existe e o assento "Norte - A12" está livre. | 1. Acessar mapa do jogo<br>2. Selecionar o assento "A12" no setor "Norte"<br>3. Clicar em "Confirmar Reserva" | A reserva é inserida no banco, status fica "CONFIRMED" e o usuário é notificado com sucesso antes de ser redirecionado para o "Meu Painel". | ✅ Aprovado |
| **TV004** | Fluxo Alternativo (Já Reservado) | Usuário logado. Assento "Norte - A12" já foi reservado por outro usuário momentos antes. | 1. Acessar mapa do jogo<br>2. Selecionar "A12"<br>3. Clicar em "Confirmar" | O sistema tenta inserir no banco, a restrição de chave-única detecta choque e retorna erro "Assento já reservado ou vendido". Nenhuma nova reserva é gerada. | ✅ Aprovado |

---

## RF014 - Cancelar Reserva

| ID | Nome | Pré-condição | Passos | Resultado Esperado | Status |
|---|---|---|---|---|---|
| **TV005** | Fluxo Alternativo (Prazo Expirado < 48h) (RN19) | Usuário logado. Possui reserva ativa. A data atual está a menos de 48h do início do jogo. | 1. Acessar `/meu-painel`<br>2. Clicar em "Cancelar" na reserva correspondente ao jogo iminente<br>3. Confirmar alerta | A regra de negócio bloqueia o cancelamento. Status da reserva se mantém e a interface exibe erro: "cancelamento só é permitido com pelo menos 48h de antecedência". | ✅ Aprovado |
