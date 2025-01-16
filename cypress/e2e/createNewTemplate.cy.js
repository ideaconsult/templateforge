const testURLRoot = "http://127.0.0.1:50722/templates/";

describe("Create New Template", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "/template",
        hostname: "api-test.ramanchada.ideaconsult.net",
      },
      {
        fixture: "json/bk_rcapi_template_default.json",
      }
    ).as("getAllTemplates");

    cy.visit(testURLRoot);
  });

  it("creats a new template", () => {
    cy.get('[data-cy="create-new-btn"]').click();
    cy.get('[data-cy="name-input"]').type("name: test");
    cy.get('[data-cy="author-input"]').type("author: test");
    cy.get('[data-cy="acknowledgment-input"]').type("acknowledgment: test");
    cy.get('[data-cy="create-new-btn-modal"]').click();

    cy.intercept(
      {
        method: "POST",
        url: "/template",
        hostname: "api-test.ramanchada.ideaconsult.net",
      },
      {
        fixture: "json/bk_rcapi_template_default.json",
      }
    ).as("createNewTemplate");
  });
});
