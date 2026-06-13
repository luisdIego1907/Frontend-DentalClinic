/// <reference types="cypress" />

describe("Home Admin", () => {
  
   function loginAsAdmin() {
    cy.env(["adminUsername", "adminPassword"]).then((env) => {
      const username = String(env.adminUsername);
      const password = String(env.adminPassword);

      cy.visit("/");

      cy.get("[data-cy='login-username']", { timeout: 10000 })
        .should("be.visible")
        .and("not.be.disabled")
        .clear()
        .type(username);

      cy.get("[data-cy='login-password']", { timeout: 10000 })
        .should("be.visible")
        .and("not.be.disabled")
        .clear()
        .type(password);

      cy.get("[data-cy='login-submit']")
        .should("be.visible")
        .and("not.be.disabled")
        .click();

      cy.location("pathname", { timeout: 10000 }).should("eq", "/admin");
    });
  }

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    loginAsAdmin();
  });

  it("debe mostrar el header, footer y contenido principal del home admin", () => {
    // Header
    cy.get("header").should("be.visible");

    cy.get("[data-cy='header-logo-home']")
      .should("be.visible")
      .and("contain", "Clínica")
      .and("contain", "Dental");

    cy.get("[data-cy='nav-home']")
      .should("be.visible")
      .and("contain", "Inicio");

    cy.get("[data-cy='nav-patients']")
      .should("be.visible")
      .and("contain", "Pacientes");

    cy.get("[data-cy='nav-appointments']")
      .should("be.visible")
      .and("contain", "Citas");

    cy.get("header")
      .should("contain", "Administrador")
      .and("contain", "ADMIN");

    // Contenido principal del Home Admin
    cy.contains("Administración", { timeout: 10000 }).should("be.visible");

    cy.contains("Total Pacientes").should("be.visible");
    cy.contains("Pacientes registrados").should("be.visible");

    cy.contains("Citas Totales Hoy").should("be.visible");
    cy.contains("Agenda global del día").should("be.visible");

    cy.contains("Consultas del Mes").should("be.visible");
    cy.contains("Total consultas registradas").should("be.visible");

    cy.contains("Acceso Rápido").should("be.visible");

    cy.contains("Ver Pacientes").should("be.visible");
    cy.contains("Lista de Pacientes").should("be.visible");

    cy.contains("Ver citas").should("be.visible");
    cy.contains("Agenda global").should("be.visible");

    cy.contains("Ver Consultas").should("be.visible");
    cy.contains("Historial clínico completo").should("be.visible");

    // Footer
    cy.get("footer").scrollIntoView().should("be.visible");

    cy.get("footer")
      .should("contain", "Clínica")
      .and("contain", "Dental")
      .and("contain", "Sistema interno de expediente digital")
      .and("contain", "© 2026 Clínica Dental. Todos los derechos reservados");

    cy.get("footer a[href='https://www.instagram.com/']")
      .should("be.visible")
      .and("have.attr", "target", "_blank");

    cy.get("footer a[href='https://www.facebook.com/']")
      .should("be.visible")
      .and("have.attr", "target", "_blank");
  });

  it("debe permitir navegar desde los accesos rápidos del home admin", () => {
    cy.contains("Ver Pacientes")
      .should("be.visible")
      .click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/patients");

    cy.go("back");

    cy.contains("Ver citas")
      .should("be.visible")
      .click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/appointments");

    cy.go("back");

    cy.contains("Ver Consultas")
      .should("be.visible")
      .click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/consultations");
  });
});

export {};