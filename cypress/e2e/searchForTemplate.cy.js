const testURLRoot = "http://127.0.0.1:50722/templates/";

describe("Searching for the template", () => {
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

  it("Find template by searching", () => {
    cy.get(".search").click().type("hts_metadata_test_finalized");
    cy.get(".nonSelected td").eq(1).click();
  });
});
