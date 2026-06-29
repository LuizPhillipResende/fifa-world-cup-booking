describe("Fluxo Torcedor", () => {
  beforeEach(() => {
    // Fazer login como torcedor antes de cada teste
    cy.visit("/login");
    cy.get('input[name="email"]').type("test@fifa2026.com");
    cy.get('input[name="password"]').type("123456");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("deve conseguir visualizar os jogos, ir ao mapa de assentos e realizar reserva", () => {
    // 1. Home - ver jogos
    cy.contains("Ver Ingressos").first().click();

    // 2. Mapa de Assentos
    cy.url().should("include", "/mapa-assentos");

    // Escolher o primeiro assento que seja verde (Disponível)
    // O cypress vai clicar no primeiro botão com texto numérico e bg-#3fe971
    cy.get('button.bg-\\[\\#3fe971\\]').first().click();

    // 3. Resumo deve aparecer
    cy.contains("Total").should("be.visible");
    cy.contains("Confirmar Reserva").click();

    // 4. Redirecionar para o painel com a reserva aparecendo
    cy.url().should("include", "/meu-painel");
    cy.contains("Minhas Reservas").should("be.visible");
  });
});
