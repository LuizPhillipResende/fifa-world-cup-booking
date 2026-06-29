describe("Fluxo Administrador", () => {
  beforeEach(() => {
    // Fazer login como admin
    cy.visit("/login");
    cy.get('input[name="email"]').type("admin@fifa2026.com");
    cy.get('input[name="password"]').type("123456");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("deve permitir que o admin acesse o painel e crie um estádio", () => {
    // Acessar o admin
    cy.contains("Admin").click();
    cy.url().should("include", "/admin");

    // Ir para estádios
    cy.contains("Gerenciar Estádios").click();
    cy.url().should("include", "/admin/estadios");

    // Criar novo estádio
    cy.contains("Novo Estádio").click();
    cy.get('input[name="name"]').type("Estádio Cypress E2E");
    cy.get('input[name="city"]').type("São Paulo");
    cy.get('input[name="country"]').type("Brasil");
    cy.get('input[name="capacity"]').type("50000");

    cy.get('button[type="submit"]').contains("Salvar").click();

    // Verificar se apareceu na lista
    cy.contains("Estádio Cypress E2E").should("be.visible");
  });
});
