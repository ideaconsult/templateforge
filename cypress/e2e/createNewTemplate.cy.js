const testURLRoot = "http://localhost:5173/templates";

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

  it("Creating New Template", () => {
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
        // statusCode: 201,
        body: {
          name: "name: test",
          author: "author: test",
          acknowledgment: "acknowledgment: test",
        },
      },
      {
        fixture: "json/bk_rcapi_template_default.json",
      }
    ).as("createNewTemplate");
  });
});
