const testURLRoot = "http://127.0.0.1:50722/templates/";

describe("Table column sorting functionality", () => {
  beforeEach(() => {
    cy.visit(testURLRoot);
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
  });

  it("makes sorting by a table column", () => {
    cy.get('[data-cy="draft"]').click();
    cy.get('[data-cy="Acknowledgment"]').click();
    cy.get('[data-cy="Acknowledgment"]').click();
    cy.get('[data-cy="Acknowledgment"]').click();
  });
});
