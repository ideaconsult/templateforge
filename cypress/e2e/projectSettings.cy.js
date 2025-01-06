const testURLRoot = "http://localhost:5173/templates";

describe("choosing the project", () => {
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

  it("Clicking the Preferences button, Choosing the Project and then set to None-selected", () => {
    cy.get('[data-cy="preferences-btn"]').click();
    cy.get('[data-cy="select-btn"]').click();
    cy.get('[data-project="enanomapper"]').click();
    cy.get('[data-cy="ok-btn"]').click();

    cy.get('[data-cy="preferences-btn"]').click();
    cy.get('[data-cy="clean-btn"]').click();
    cy.get('[data-cy="ok-btn"]').click();
  });
});
