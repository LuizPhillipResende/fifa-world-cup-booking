describe("Autenticação", () => {
  it("deve permitir que um novo usuário se cadastre", () => {
    cy.visit("/cadastro");
    
    const uniqueEmail = `testuser_${Date.now()}@test.com`;

    cy.get('input[name="name"]').type("Usuário Teste Cypress");
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="phone"]').type("11999999999");
    cy.get('input[name="password"]').type("123456");
    cy.get('input[name="confirmPassword"]').type("123456");
    
    // Aceitar termos
    cy.contains("Li e aceito os").click();
    
    cy.get('button[type="submit"]').click();

    // Redireciona pro login com query string registered=true
    cy.url().should("include", "/login?registered=true");
  });

  it("deve permitir que o usuário faça login", () => {
    cy.visit("/login");

    cy.get('input[name="email"]').type("test@fifa2026.com"); // User do seed
    cy.get('input[name="password"]').type("123456");
    
    cy.get('button[type="submit"]').click();

    // Deve ser redirecionado pra home
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.contains("Sair").should("be.visible");
  });
});
