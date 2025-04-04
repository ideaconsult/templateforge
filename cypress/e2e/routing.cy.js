const testURLRoot = "http://127.0.0.1:50722/templates/";
const UUID = "8f85c8d4-f2c7-44cc-aed4-959d8694f7af";

describe("Navigation functionality", () => {
  beforeEach(() => {
    cy.visit(testURLRoot);
    cy.intercept(
      {
        method: "GET",
        url: "/template",
        hostname: "api-test.ramanchada.ideaconsult.net",
      },
      {
        fixture: "json/bk_rcapi_templates_generated.json",
      }
    ).as("getAllTemplates");
  });

  it("can navigate to the Home page by default", () => {
    cy.url().should("include", "/templates/");
  });

  it("can navigate to the Template page", () => {
    cy.get(".nonSelected td").eq(1).click();
    cy.get('[data-cy="View"]').click();
    cy.url().should("include", `/templates/${UUID}`);
  });

  it("can navigate to the Home page by pressing Back button", () => {
    cy.url({ timeout: 10000 }).should("include", "/templates/");
  });
});
