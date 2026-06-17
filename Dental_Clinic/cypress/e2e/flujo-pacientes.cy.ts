/// <reference types="cypress" />

type PageInfo = {
  currentPage: number;
  totalPages: number;
};

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

function parsePageIndicator(text: string): PageInfo {
  const match = text.match(/Página\s+(\d+)\s+de\s+(\d+)/i);

  if (!match) {
    throw new Error(`Formato inválido del indicador de página: "${text}"`);
  }

  const [, currentPageText, totalPagesText] = match;

  if (!currentPageText || !totalPagesText) {
    throw new Error(`No se pudo leer la paginación desde: "${text}"`);
  }

  const currentPage = Number(currentPageText);
  const totalPages = Number(totalPagesText);

  if (!Number.isInteger(currentPage) || !Number.isInteger(totalPages)) {
    throw new Error(`La paginación contiene valores inválidos: "${text}"`);
  }

  return {
    currentPage,
    totalPages,
  };
}

function getPageInfo(): Cypress.Chainable<PageInfo> {
  return cy
    .get("[data-cy='patients-page-indicator']")
    .should("be.visible")
    .invoke("text")
    .then(parsePageIndicator);
}

function assertPageInfo(expectedCurrentPage: number, expectedTotalPages: number) {
  cy.get("[data-cy='patients-page-indicator']")
    .should("be.visible")
    .and(
      "contain",
      `Página ${expectedCurrentPage} de ${expectedTotalPages}`,
    );
}

function validateDynamicPagination() {
  getPageInfo().then(({ currentPage, totalPages }) => {
    expect(currentPage).to.eq(1);
    expect(totalPages).to.be.greaterThan(0);

    if (totalPages === 1) {
      cy.get("[data-cy='patients-prev-page']").should("be.disabled");
      cy.get("[data-cy='patients-next-page']").should("be.disabled");
      return;
    }

    cy.get("[data-cy='patients-prev-page']").should("be.disabled");
    cy.get("[data-cy='patients-next-page']").should("not.be.disabled");

    for (let page = 2; page <= totalPages; page += 1) {
      cy.get("[data-cy='patients-next-page']")
        .should("not.be.disabled")
        .click();

      assertPageInfo(page, totalPages);
    }

    cy.get("[data-cy='patients-next-page']").should("be.disabled");

    for (let page = totalPages - 1; page >= 1; page -= 1) {
      cy.get("[data-cy='patients-prev-page']")
        .should("not.be.disabled")
        .click();

      assertPageInfo(page, totalPages);
    }

    cy.get("[data-cy='patients-prev-page']").should("be.disabled");
  });
}

describe("Flujo de pacientes como administrador", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    loginAsAdmin();
  });

  it("debe navegar a pacientes, paginar, buscar y abrir el detalle de Leo Torres", () => {
    const nonexistentSearch = `NO_EXISTE_CYPRESS_${Date.now()}`;

    cy.get("[data-cy='nav-patients']").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/patients");

    cy.get("[data-cy='patients-search']").should("be.visible");

    validateDynamicPagination();

    cy.get("[data-cy='patients-search']")
      .clear()
      .type(nonexistentSearch);

    cy.get("[data-cy='patients-empty-state']")
      .should("be.visible")
      .and("contain", "No se encontraron pacientes")
      .and("contain", "No existe ningún paciente que coincida con la búsqueda.");

    cy.get("[data-cy='patients-search']").clear().type("Leo Torres");

    cy.contains("[data-cy='patient-card']", "Leo Torres", {
      timeout: 10000,
    })
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