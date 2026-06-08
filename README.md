# fifa-world-cup-booking
Projeto acadêmico para a disciplina de Engenharia de Software (UFLA - GCC188). Plataforma full-stack construída com React, JavaScript e Node.js para simular o processo de reserva e venda de ingressos para copa do mundo da FIFA 2026.

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

3.2 - Abra o terminal, navegue até as pastas respectivas e execute o comando `npm install` para instalar as bibliotecas e outras dependências:
```bash
cd frontend && npm install
cd ../backend && npm install