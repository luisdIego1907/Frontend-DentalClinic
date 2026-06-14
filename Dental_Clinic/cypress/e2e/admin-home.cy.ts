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

    cy.contains(
      "Resumen general de pacientes, citas y consultas registradas en el sistema de la clínica.",
    ).should("be.visible");

    cy.contains("Resumen administrativo").should("be.visible");
    cy.contains("Indicadores principales del sistema.").should("be.visible");

    cy.contains("Total Pacientes").should("be.visible");
    cy.contains("Pacientes registrados").should("be.visible");

    cy.contains("Citas Totales Hoy").should("be.visible");
    cy.contains("Agenda global del día").should("be.visible");

    cy.contains("Consultas Registradas").should("be.visible");
    cy.contains("Total de consultas en el sistema").should("be.visible");

    cy.contains("Acceso rápido").should("be.visible");
    cy.contains("Atajos a las áreas principales del panel.").should(
      "be.visible",
    );

    cy.contains("Ver Pacientes").should("be.visible");
    cy.contains("Lista de pacientes").should("be.visible");

    cy.contains("Ver Citas").should("be.visible");
    cy.contains("Agenda global").should("be.visible");

    cy.contains("Ver Consultas").should("be.visible");
    cy.contains("Historial clínico completo").should("be.visible");

    // Activity Feed
    cy.contains("Actividad reciente").should("be.visible");

    // Footer
    cy.get("footer").scrollIntoView().should("be.visible");

    cy.get("footer")
      .should("contain", "Clínica")
      .and("contain", "Dental")
      .and("contain", "Sistema interno de expediente digital")
      .and("contain", "© 2026 Clínica Dental. Todos los derechos reservados");

    cy.get("footer").find("a[aria-label='Instagram']").should("be.visible");

    cy.get("footer").find("a[aria-label='Facebook']").should("be.visible");
  });

  it("debe permitir navegar desde los accesos rápidos del home admin", () => {
    cy.contains("a", "Ver Pacientes").should("be.visible").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/patients");

    cy.go("back");

    cy.location("pathname", { timeout: 10000 }).should("eq", "/admin");

    cy.contains("a", "Ver Citas").should("be.visible").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/appointments");

    cy.go("back");

    cy.location("pathname", { timeout: 10000 }).should("eq", "/admin");

    cy.contains("a", "Ver Consultas").should("be.visible").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/consultations");
  });
});

export {};