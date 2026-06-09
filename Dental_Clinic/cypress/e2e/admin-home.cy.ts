/// <reference types="cypress" />

describe("Home Admin", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit("/");
  });

  it("debe iniciar sesión con admin y redirigir a /admin", () => {
    cy.env(["adminUsername", "adminPassword"]).then((env) => {
      const username = String(env.adminUsername);
      const password = String(env.adminPassword);

      cy.get("[data-cy='login-username']").type(username);
      cy.get("[data-cy='login-password']").type(password);
      cy.get("[data-cy='login-submit']").click();

      cy.location("pathname", { timeout: 10000 }).should("eq", "/admin");
    });
  });
});

export {};