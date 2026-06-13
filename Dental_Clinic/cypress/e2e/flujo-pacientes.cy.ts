/// <reference types="cypress" />

describe("Flujo de pacientes como administrador", () => {
  function loginAsAdmin() {
    cy.env(["adminUsername", "adminPassword"]).then((env) => {
      const username = String(env.adminUsername);
      const password = String(env.adminPassword);

      cy.visit("/");

      cy.get("[data-cy='login-username']").type(username);
      cy.get("[data-cy='login-password']").type(password);
      cy.get("[data-cy='login-submit']").click();

      cy.location("pathname", { timeout: 10000 }).should("eq", "/admin");
    });
  }

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    loginAsAdmin();
  });

  it("debe navegar a pacientes, paginar, buscar y abrir el detalle de Leo Torres", () => {
    cy.get("[data-cy='nav-patients']").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/patients");

    cy.get("[data-cy='patients-search']").should("be.visible");

    cy.get("[data-cy='patients-page-indicator']")
      .should("be.visible")
      .and("contain", "Página 1 de 4");

    cy.get("[data-cy='patients-next-page']").click();
    cy.get("[data-cy='patients-page-indicator']").should(
      "contain",
      "Página 2 de 4"
    );

    cy.get("[data-cy='patients-next-page']").click();
    cy.get("[data-cy='patients-page-indicator']").should(
      "contain",
      "Página 3 de 4"
    );

    cy.get("[data-cy='patients-next-page']").click();
    cy.get("[data-cy='patients-page-indicator']").should(
      "contain",
      "Página 4 de 4"
    );

    cy.get("[data-cy='patients-prev-page']").click();
    cy.get("[data-cy='patients-page-indicator']").should(
      "contain",
      "Página 3 de 4"
    );

    cy.get("[data-cy='patients-prev-page']").click();
    cy.get("[data-cy='patients-page-indicator']").should(
      "contain",
      "Página 2 de 4"
    );

    cy.get("[data-cy='patients-prev-page']").click();
    cy.get("[data-cy='patients-page-indicator']").should(
      "contain",
      "Página 1 de 4"
    );

    cy.get("[data-cy='patients-search']").clear().type("XXXX");

    cy.get("[data-cy='patients-empty-state']")
      .should("be.visible")
      .and("contain", "No se encontraron pacientes")
      .and("contain", "No existe ningún paciente que coincida con la búsqueda.");

    cy.get("[data-cy='patients-search']").clear().type("Leo Torres");

    cy.contains("[data-cy='patient-card']", "Leo Torres")
      .should("be.visible")
      .click();

    cy.location("pathname", { timeout: 10000 }).should(
      "match",
      /^\/patients\/\d+$/
    );

    cy.get("[data-cy='patient-detail']").should("be.visible");

    cy.get("[data-cy='patient-detail-name']")
      .should("be.visible")
      .and("contain", "Leo Torres");

    cy.get("[data-cy='patient-detail-id']")
      .should("be.visible")
      .and("contain", "55");

    cy.get("[data-cy='patient-detail-identification']")
      .should("be.visible")
      .and("contain", "P-10055");

    cy.get("[data-cy='patient-detail-phone']")
      .should("be.visible")
      .and("contain", "555-1055");

    cy.get("[data-cy='patient-detail-address']")
      .should("be.visible")
      .and("contain", "33 Elm Ridge Street, Springfield");
  });
});

export {};