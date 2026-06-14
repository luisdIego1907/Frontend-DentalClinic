/// <reference types="cypress" />

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

    cy.get("[data-cy='login-submit']", { timeout: 10000 })
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/admin");
  });
}

describe("Flujo de pacientes como administrador", () => {
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
      "Página 2 de 4",
    );

    cy.get("[data-cy='patients-next-page']").click();
    cy.get("[data-cy='patients-page-indicator']").should(
      "contain",
      "Página 3 de 4",
    );

    cy.get("[data-cy='patients-next-page']").click();
    cy.get("[data-cy='patients-page-indicator']").should(
      "contain",
      "Página 4 de 4",
    );

    cy.get("[data-cy='patients-prev-page']").click();
    cy.get("[data-cy='patients-page-indicator']").should(
      "contain",
      "Página 3 de 4",
    );

    cy.get("[data-cy='patients-prev-page']").click();
    cy.get("[data-cy='patients-page-indicator']").should(
      "contain",
      "Página 2 de 4",
    );

    cy.get("[data-cy='patients-prev-page']").click();
    cy.get("[data-cy='patients-page-indicator']").should(
      "contain",
      "Página 1 de 4",
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
      /^\/patients\/\d+$/,
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

describe("Flujo completo de pacientes", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    loginAsAdmin();
  });

  it("registra, edita y elimina un paciente", () => {
    const unique = Date.now().toString().slice(-9);

    const patient = {
      identification: unique,
      firstName: `Cypress${unique}`,
      lastName: "Paciente",
      birthDate: "2000-01-01",
      phone: "8888-8888",
      email: `cypress${unique}@test.com`,
      gender: "Masculino",
      status: "Activo",
      address: "Direccion inicial Cypress",
    };

    const editedPatient = {
      firstName: `Editado${unique}`,
      lastName: "Paciente",
      phone: "89999999",
      address: "Direccion editada Cypress",
    };

    cy.get("[data-cy='nav-patients']").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/patients");

    cy.contains("a,button", "Registrar Paciente")
      .should("be.visible")
      .click();

    cy.location("pathname", { timeout: 10000 }).should(
      "eq",
      "/patients/register",
    );

    cy.get("[data-cy='register-patient-page']").should("be.visible");

    cy.get("[data-cy='patient-identification-input']")
      .clear()
      .type(patient.identification);

    cy.get("[data-cy='patient-first-name-input']")
      .clear()
      .type(patient.firstName);

    cy.get("[data-cy='patient-last-name-input']")
      .clear()
      .type(patient.lastName);

    cy.get("[data-cy='patient-birth-date-input']")
      .clear()
      .type(patient.birthDate);

    cy.get("[data-cy='patient-phone-input']")
      .clear()
      .type(patient.phone);

    cy.get("[data-cy='patient-email-input']")
      .clear()
      .type(patient.email);

    cy.get("[data-cy='patient-gender-input']").select(patient.gender);

    cy.get("[data-cy='patient-status-input']").select(patient.status);

    cy.get("[data-cy='patient-address-input']")
      .clear()
      .type(patient.address);

    cy.get("[data-cy='patient-save-button']").click();

    cy.get("[data-cy='register-patient-success-message']", {
      timeout: 10000,
    })
      .should("be.visible")
      .and("contain", "Paciente registrado correctamente");

    cy.visit("/patients");

    cy.get("[data-cy='patients-search']")
      .should("be.visible")
      .clear()
      .type(patient.firstName);

    cy.contains(
      "[data-cy='patient-card-identification']",
      patient.identification,
      { timeout: 10000 },
    )
      .should("be.visible")
      .parents("[data-cy='patient-card']")
      .as("createdPatientCard");

    cy.get("@createdPatientCard").click();

    cy.location("pathname", { timeout: 10000 }).should(
      "match",
      /^\/patients\/\d+$/,
    );

    cy.get("[data-cy='patient-detail']").should("be.visible");

    cy.get("[data-cy='patient-detail-identification']").should(
      "contain",
      patient.identification,
    );

    cy.get("[data-cy='patient-detail-name']")
      .should("contain", patient.firstName)
      .and("contain", patient.lastName);

    cy.get("[data-cy='patient-detail-edit-button']")
      .should("be.visible")
      .click();

    cy.get("[data-cy='patient-edit-form']").should("be.visible");

    cy.get("[data-cy='patient-edit-first-name-input']")
      .clear()
      .type(editedPatient.firstName);

    cy.get("[data-cy='patient-edit-last-name-input']")
      .clear()
      .type(editedPatient.lastName);

    cy.get("[data-cy='patient-edit-phone-input']")
      .clear()
      .type(editedPatient.phone);

    cy.get("[data-cy='patient-edit-address-input']")
      .clear()
      .type(editedPatient.address);

    cy.get("[data-cy='patient-edit-save-button']").click();

    cy.get("[data-cy='patient-detail-success-message']", {
      timeout: 10000,
    })
      .should("be.visible")
      .and("contain", "Paciente actualizado correctamente");

    cy.get("[data-cy='patient-detail-name']")
      .should("contain", editedPatient.firstName)
      .and("contain", editedPatient.lastName);

    cy.get("[data-cy='patient-detail-address']").should(
      "contain",
      editedPatient.address,
    );

    cy.get("[data-cy='patient-detail-back-link']").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/patients");

    cy.get("[data-cy='patients-search']")
      .clear()
      .type(editedPatient.firstName);

    cy.contains(
      "[data-cy='patient-card-identification']",
      patient.identification,
      { timeout: 10000 },
    )
      .should("be.visible")
      .parents("[data-cy='patient-card']")
      .as("editedPatientCard");

    cy.contains("button", "Eliminar pacientes")
      .as("deletePatientsButton")
      .should("be.disabled");

    cy.get("@editedPatientCard")
      .find("[data-cy='patient-select-checkbox']")
      .check({ force: true });

    cy.get("@deletePatientsButton").should("not.be.disabled");

    cy.on("window:confirm", () => true);

    cy.get("@deletePatientsButton").click();

    cy.get("[data-cy='patients-search']")
      .clear()
      .type(editedPatient.firstName);

    cy.contains(
      "[data-cy='patient-card-identification']",
      patient.identification,
      { timeout: 10000 },
    ).should("not.exist");
  });
});

export {};