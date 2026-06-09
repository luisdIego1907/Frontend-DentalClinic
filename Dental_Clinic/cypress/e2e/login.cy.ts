describe("Login", () => {
  const loginUrl = "/login";

  const loginApiUrl = "**/api/authorization/authorize";

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit(loginUrl);
  });

  it("debe mostrar el formulario de login correctamente", () => {
    cy.contains("Bienvenido").should("be.visible");
    cy.contains("Ingresa tus credenciales para continuar").should("be.visible");

    cy.get("[data-cy='login-form']").should("exist");
    cy.get("[data-cy='login-username']").should("be.visible");
    cy.get("[data-cy='login-password']").should("be.visible");
    cy.get("[data-cy='login-submit']").should("be.visible");
  });

  it("debe permitir escribir usuario y contraseña", () => {
    cy.get("[data-cy='login-username']")
      .type("admin")
      .should("have.value", "admin");

    cy.get("[data-cy='login-password']")
      .type("Admin123")
      .should("have.value", "Admin123");
  });

  it("debe mostrar y ocultar la contraseña", () => {
    cy.get("[data-cy='login-password']").should(
      "have.attr",
      "type",
      "password",
    );

    cy.get("[data-cy='toggle-password']").click();

    cy.get("[data-cy='login-password']").should("have.attr", "type", "text");

    cy.get("[data-cy='toggle-password']").click();

    cy.get("[data-cy='login-password']").should(
      "have.attr",
      "type",
      "password",
    );
  });

  it("no debe enviar el formulario si el usuario está vacío", () => {
    cy.intercept("POST", loginApiUrl).as("loginRequest");

    cy.get("[data-cy='login-password']").type("Admin123");
    cy.get("[data-cy='login-submit']").click();

    cy.get("[data-cy='login-username']").then(($input) => {
      const input = $input[0] as HTMLInputElement;
      expect(input.checkValidity()).to.eq(false);
    });

    cy.get("@loginRequest.all").should("have.length", 0);
  });

  it("no debe enviar el formulario si la contraseña está vacía", () => {
    cy.intercept("POST", loginApiUrl).as("loginRequest");

    cy.get("[data-cy='login-username']").type("admin");
    cy.get("[data-cy='login-submit']").click();

    cy.get("[data-cy='login-password']").then(($input) => {
      const input = $input[0] as HTMLInputElement;
      expect(input.checkValidity()).to.eq(false);
    });

    cy.get("@loginRequest.all").should("have.length", 0);
  });

  it("debe mostrar error cuando la contraseña es incorrecta", () => {
    cy.intercept("POST", "**/api/authorization/authorize", {
      statusCode: 401,
      body: {
        message: "Credenciales incorrectas",
      },
    }).as("loginRequest");

    cy.get("[data-cy='login-username']").type("admin");
    cy.get("[data-cy='login-password']").type("contrasena_mala");
    cy.get("[data-cy='login-submit']").click();

    cy.wait("@loginRequest")
      .its("request.body")
      .should((body) => {
        expect(body.username).to.eq("admin");
        expect(body.password).to.eq("contrasena_mala");
      });

    cy.get("[data-cy='login-error']")
      .should("be.visible")
      .and("contain", "Credenciales incorrectas");

    cy.location("pathname").should("eq", "/");
  });

  it("debe mostrar error cuando el usuario no existe", () => {
    cy.intercept("POST", loginApiUrl, {
      statusCode: 404,
      body: {
        message: "Credenciales incorrectas",
      },
    }).as("loginRequest");

    cy.get("[data-cy='login-username']").type("usuario_inexistente");
    cy.get("[data-cy='login-password']").type("Admin123");
    cy.get("[data-cy='login-submit']").click();

    cy.wait("@loginRequest");

    cy.get("[data-cy='login-error']")
      .should("be.visible")
      .and("contain", "Credenciales incorrectas");

    cy.location("pathname").should("eq", "/");
  });

  it("debe deshabilitar el botón mientras se envía el login", () => {
    cy.intercept("POST", loginApiUrl, {
      delay: 1000,
      statusCode: 200,
      body: {
        token: "fake-jwt-token",
        username: "admin",
        roles: ["Admin"],
      },
    }).as("loginRequest");

    cy.get("[data-cy='login-username']").type("admin");
    cy.get("[data-cy='login-password']").type("Admin123");
    cy.get("[data-cy='login-submit']").click();

    cy.get("[data-cy='login-submit']")
      .should("be.disabled")
      .and("contain", "Ingresando...");

    cy.wait("@loginRequest");
  });

  it("debe iniciar sesión correctamente con usuario Admin", () => {
    cy.intercept("POST", loginApiUrl, {
      statusCode: 200,
      body: {
        token: "fake-admin-token",
        username: "admin",
        roles: ["Admin"],
      },
    }).as("loginRequest");

    cy.get("[data-cy='login-username']").type("luisdi");
    cy.get("[data-cy='login-password']").type("123456");
    cy.get("[data-cy='login-submit']").click();

    cy.wait("@loginRequest")
      .its("request.body")
      .should((body) => {
        expect(body.username).to.eq("luisdi");
        expect(body.password).to.eq("123456");
      });

    cy.url().should("not.include", "/login");
  });

  it("debe iniciar sesión correctamente con usuario Odontólogo", () => {
    cy.intercept("POST", loginApiUrl, {
      statusCode: 200,
      body: {
        token: "fake-odontologo-token",
        username: "odontologo",
        roles: ["Odontologo"],
      },
    }).as("loginRequest");

    cy.get("[data-cy='login-username']").type("odontologo");
    cy.get("[data-cy='login-password']").type("Odonto123");
    cy.get("[data-cy='login-submit']").click();

    cy.wait("@loginRequest")
      .its("request.body")
      .should((body) => {
        expect(body.username).to.eq("odontologo");
        expect(body.password).to.eq("Odonto123");
      });

    cy.url().should("not.include", "/login");
  });

  it("debe iniciar sesión correctamente con usuario Recepcionista", () => {
    cy.intercept("POST", loginApiUrl, {
      statusCode: 200,
      body: {
        token: "fake-recepcion-token",
        username: "recepcionista",
        roles: ["Recepcionista"],
      },
    }).as("loginRequest");

    cy.get("[data-cy='login-username']").type("recepcionista");
    cy.get("[data-cy='login-password']").type("Recep123");
    cy.get("[data-cy='login-submit']").click();

    cy.wait("@loginRequest")
      .its("request.body")
      .should((body) => {
        expect(body.username).to.eq("recepcionista");
        expect(body.password).to.eq("Recep123");
      });

    cy.url().should("not.include", "/login");
  });
});
