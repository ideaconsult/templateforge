const testURLRoot = "http://127.0.0.1:50722/templates/";

describe("choosing the project", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/projects.json",
        hostname: "enanomapper.adma.ai",
      },
      {
        fixture: "json/bk_rcapi_projects_default.json",
      }
    ).as("getAllProjects");

    cy.visit(testURLRoot);
  });

  it("clicks the Preferences button, shooses the Project and then set to None-selected", () => {
    cy.get('[data-cy="preferences-btn"]').click();
    cy.get('[data-cy="select-btn"]').click();
    cy.get('[data-project="enanomapper"]').click();
    cy.get('[data-cy="ok-btn"]').click();

    cy.get('[data-cy="preferences-btn"]').click();
    cy.get('[data-cy="clean-btn"]').click();
    cy.get('[data-cy="ok-btn"]').click();
  });
});
