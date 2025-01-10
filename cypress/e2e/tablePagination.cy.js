const testURLRoot = "http://127.0.0.1:50722/templates/";

describe("Table pagination functionality", () => {
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

  it("makes transition on the next page and then goes back", () => {
    cy.get('[data-cy="draft"]').click();
    cy.get('[data-cy="current-page-number"]').should("have.text", "1");
    cy.get('[data-cy="next-page"]').click();
    cy.get('[data-cy="current-page-number"]').should("have.text", "2");
    cy.get('[data-cy="previous-page"]').click();
    cy.get('[data-cy="current-page-number"]').should("have.text", "1");
  });
});
