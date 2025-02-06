const testURLRoot = "http://127.0.0.1:50722/templates/";
const fixture = "json/templates_generated.json";
const uuid = "396fc51e-dd55-451f-a6dd-913177abb667";
const project = "enanomapper";

describe("Generate Excel File", () => {
  beforeEach(() => {
    cy.visit(testURLRoot);
    cy.intercept(
      {
        method: "GET",
        url: "/template",
        hostname: "api-test.ramanchada.ideaconsult.net",
      },
      {
        fixture,
      }
    ).as("getAllTemplates");

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
  });

  it("can generate excel file", () => {
    cy.intercept({
      method: "GET",
      url: `/template/${uuid}?format=xlsx&project=${project}`,
      hostname: "api-test.ramanchada.ideaconsult.net",
    }).as("generateExcelFile");

    cy.get('[data-cy="preferences-btn"]').click();
    cy.get('[data-cy="select-btn"]').click();
    cy.get(`[data-project='${project}']`).click();
    cy.get('[data-cy="ok-btn"]').click();

    cy.get('[data-cy="draft"]').click();
    cy.get(".nonSelected td").eq(1).click();

    cy.get('[data-cy="Generate Excel Template"]').click();

    cy.wait("@generateExcelFile").then((interception) => {
      expect(interception.state).to.equal("Complete");
    });
  });
});
